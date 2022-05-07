const PaymentMethod = require("../models/PaymentMethod");
const jwt = require("jsonwebtoken");
const constants = require("../constants");

module.exports.handler  = async (event) => {
  let user;
  if (
    event.headers.Authorization &&
    event.headers.Authorization.split(" ")[0] === "Bearer"
  ) {
    const token = event.headers.Authorization.split(" ")[1];
    user = jwt.verify(token, constants.jwt.secret, function (err, decoded) {
      return decoded;
    });
    if (user === undefined) {
      return {
        statusCode: 400,
        body: "Неправильный токен",
      };
    }
  } else {
    return {
      statusCode: 400,
      body: "Не отправили токен",
    };
  }

  await PaymentMethod.destroy({
    where: {
      id: event.queryStringParameters.cardId,
    },
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true }),
  };
};

