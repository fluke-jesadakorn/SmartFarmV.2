const dgram = require("dgram");
const server = dgram.createSocket("udp4");
const NbIoTPort = 5003;

var NBIoT = {
	NbIP: null,
	NBPort: null,
	NBMsg: null,
}

server.on("error", (err) => {
	console.log("server error:\n" + err.name + err.message + err.stack);
	//server.close()
})

server.on("message", async (msg, rinfo) => {
	console.log("server got: " + msg + " from " + rinfo.address + ":" + rinfo.port);

	NBIoT.NbIP = rinfo.address;
	NBIoT.NBPort = rinfo.port;
	NBIoT.NBMsg = msg.toString();

	// let ack = new Buffer("1")
	// server.send(ack, 0, ack.length, rinfo.port, rinfo.address, function (err, bytes) {
	// 	console.log("sent ACK. 0 ")
	// })
})

server.on("listening", function () {
	var address = server.address()
	console.log("NB Iot API Start On : " + address.address + ":" + address.port)
})

server.bind({
	address: '0.0.0.0',
	port: NbIoTPort,
	exclusive: true
});

const waterOnOff = (OnOff) => {
	let ack = new Buffer("oo0"+OnOff.toString())
	if(NBIoT.NbIP !== null){
		server.send(ack, 0, ack.length, NBIoT.NBPort, NBIoT.NbIP, function (err, bytes) {
			console.log("sent ACK : " + ack.toString() + ' to NBIoT');
		})
	}else{
		console.log('Please Wait For NBIoT Connected First');
	}
}

const setTimeOnOff = (time) => {
	let ack = new Buffer("st"+time.toString());	
	if(NBIoT.NbIP !== null){
		server.send(ack, 0, ack.length, NBIoT.NBPort, NBIoT.NbIP, function (err, bytes) {
			console.log("sent OnOff : " + ack.toString() + 'to NBIoT');
		})
	}else{
		console.log('Please Wait For NBIoT Connected First');
	}
}

const getLastData = () => {
	let convert = +NBIoT.NBMsg
	convert = convert/6.7;
	return convert.toString();
}
module.exports = {waterOnOff, setTimeOnOff, getLastData}