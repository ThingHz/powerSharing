const protobuf = require("protobufjs"); 

module.exports.handler = async (event) => {
  console.log(event)
  console.log('test')
  await protobuf.load("pbReturnReply.proto").then(function(root) {
    var PushPowerbank = root.lookupType("powerBankReturnReplyPackage.Report");
    var proto_Buf = Buffer.from(event.pi,'base64').toString('hex');
    console.log("buffer: ", proto_Buf)
    var decoded_buffer = Buffer.from(proto_Buf,'hex');
    const decodedMsg = PushPowerbank.decode(decoded_buffer);
    console.log(decodedMsg);
  });
  
  return {
    statusCode: 200,
    body: "Success",

  };
};

