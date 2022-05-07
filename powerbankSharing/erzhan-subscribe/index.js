const PaymentMethod = require("../models/PaymentMethod");
const Powerbank = require("../models/Powerbank");
const Price = require("../models/Price");
const PromoCode = require("../models/PromoCode");
const PromoCodeUser = require("../models/PromocodeUser");
const RentLog = require("../models/RentLog");
const Station = require("../models/Station");
const User = require("../models/User");
const axios = require("axios");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const moment = require("moment");
var xml2js = require("xml2js");

const handler = async (event) => {
  console.log(JSON.stringify(event));
  let powerbanks_count = 0;
  if (event.state.state.reported) {
    powerbanks_count = Object.keys(event.state.state.reported).length - 2;
  }

  let powerbanks = event.state.state.reported;

  const [station, created] = await Station.findOrCreate({
    where: {
      code: event.thingName,
    },
    defaults: {
      isActive: 1,
      totalSlot: powerbanks_count,
    },
  });

  if (!created) {
    station.isActive = 1;
    if (powerbanks_count > 0) {
      station.totalSlot = powerbanks_count;
    }
    station.changed("updatedAt", true);
    await station.save();
  }

  for (let i = 1; i <= powerbanks_count; i++) {
    const powerbank_object = powerbanks["PowerBank" + i];
    if (powerbank_object.State) {
      const [powerbank, created] = await Powerbank.findOrCreate({
        where: {
          code: powerbank_object.ID,
        },
        defaults: {
          stationId: station.id,
          slotNumber: i,
          battery: powerbank_object.LevelBat,
        },
      });

      if (!created) {
        await Powerbank.update(
          {
            stationId: station.id,
            slotNumber: i,
            battery: powerbank_object.LevelBat,
          },
          {
            where: {
              code: powerbank_object.ID,
            },
          }
        );

        const rentLog = await RentLog.findOne({
          where: {
            powerbankId: powerbank.id,
            toStationId: null,
            endedAt: null,
          },
          include: [
            {
              model: User,
            },
            {
              model: PaymentMethod,
            },
            {
              model: PromoCode,
            },
          ],
        });

        if (rentLog) {
          console.log("test started");
          rentLog.toStationId = station.id;
          rentLog.endedAt = moment();
          await rentLog.save();

          const startedAt = moment(rentLog.startedAt);
          const endedAt = moment(rentLog.endedAt);

          if (endedAt.diff(startedAt, "minutes") > 5) {
            console.log("more than 5 minutes");
            // payment begin
            let privatePem = fs.readFileSync(
              path.resolve(__dirname, "./certs/beepower-private-key.pem"),
              "utf-8"
            );

            let amount;

            if (endedAt.diff(startedAt, "minutes") > 155) {
              const price = await Price.findOne({
                where: {
                  frequency: "day",
                },
              });
              amount =
                Math.ceil(endedAt.diff(startedAt, "days", true)) * price.amount;
            } else {
              const price = await Price.findOne({
                where: {
                  frequency: "minute",
                },
              });
              amount =
                Math.ceil(endedAt.diff(startedAt, "minutes", true)) *
                price.amount;
            }

            const promoCodeUser = await PromoCodeUser.findOne({
              where: {
                userId: rentLog.userId,
                isUsed: false,
              },
              include: [
                {
                  model: PromoCode,
                },
              ],
            });

            if (rentLog.promoCodeId > 0) {
              amount = amount - rentLog.PromoCode.amount;
            } else if (promoCodeUser) {
              amount = amount - promoCodeUser.promoCode.amount;
              await PromoCodeUser.update(
                {
                  isUsed: true,
                },
                {
                  where: {
                    id: promoCodeUser.id,
                  },
                }
              );

              await User.update(
                {
                  bonuses:
                    rentLog.user.bonuses - promoCodeUser.promoCode.amount,
                },
                {
                  where: {
                    id: rentLog.user.id,
                  },
                }
              );
            }

            rentLog.amount = amount;
            await rentLog.save();

            if (amount > 0) {
              console.log("beginning signing");

              let xml_string = `<merchant cert_id="9bcc0248" name="beepower"><order order_id="00000${rentLog.id}" amount="${amount}" currency="398"><department main="51" abonent_id="${rentLog.userId}" card_id="${rentLog.PaymentMethod.accountId}" amount="${amount}"/></order></merchant>`;

              let key = privatePem;
              let sig = crypto
                .sign("SHA1", Buffer.from(xml_string), {
                  key: key,
                  padding: crypto.constants.RSA_PKCS1_PADDING,
                })
                .reverse()
                .toString("base64");

              let xml_string2 = `<document><merchant cert_id="9bcc0248" name="beepower"><order order_id="00000${rentLog.id}" amount="${amount}" currency="398"><department main="51" abonent_id="${rentLog.userId}" card_id="${rentLog.PaymentMethod.accountId}" amount="${amount}"/></order></merchant><merchant_sign cert_id="9bcc0248" type="RSA">${sig}</merchant_sign></document>`;

              console.log("step before sending axios");
              const response = await axios.get(
                "https://pci-demo.wooppay.com/linking/transaction?xml=" +
                  encodeURIComponent(xml_string2)
              );
              let body = decodeURIComponent(response.data);
              var parser = new xml2js.Parser(options);
              body = body.replace("\ufeff", "");

              let parsedXml = "";
              parser.parseString(body, function (err, result) {
                parsedXml = result;
                console.log("error: ", err);
                console.log("result: ", result);
              });
              console.log(parsedXml);
              if (response.status !== 200) {
                return {
                  statusCode: 400,
                  body: "Ошибка сервиса Wooppay",
                };
              }
              // payment end
            }
          }
        }
      }
    } else {
      await Powerbank.update(
        {
          stationId: null,
        },
        {
          where: {
            stationId: station.id,
            slotNumber: i,
          },
        }
      );
    }
  }

  const stations = await Station.findAll();

  stations.forEach(async (station) => {
    if (moment().diff(moment(station.updatedAt), "minutes") > 11) {
      station.changed("updatedAt", true);
      station.isActive = 0;
      await station.save();
    }
  });
};

exports.handler = handler;
