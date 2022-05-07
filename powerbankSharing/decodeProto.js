const protobuf = require("protobufjs"); 

 async function run() {
  event = { msg: 'ewogICJtc2ciOiAiMDgwMTEwMDIxODAyMjAwMjI4MkEzNTY2NjZDMjQxIgp9' }
  console.log('test')
  console.log(event.msg)
    const root = await protobuf.load('test.proto');
    var sensorTmessage = root.lookupType("sensorT");
    //var proto_Buf = Buffer.from('0801356666C241','base64').toString('hex');
    //console.log("buffer: ", proto_Buf)
    var proto_Buf = Buffer.from(event.msg,'base64').toString('hex');
    console.log(proto_Buf);
    var decoded_buffer = Buffer.from("0801100218022002282A356666C241",'hex');
    console.log(decoded_buffer)
    const decodedMsg = sensorTmessage.decode(decoded_buffer);
    console.log(decodedMsg);
  }
  run().catch(err => console.log(err));
