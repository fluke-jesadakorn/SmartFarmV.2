const dgram = require("dgram")
const server = dgram.createSocket("udp4")
const NbIoTPort = 5003;
let stateNBiot = {
	ip:'',
	port:0000,
}
server.on("error", (err) => {
	console.log("server error:\n" + err.name + err.message + err.stack);
	//server.close()
})

server.on("close", (err) => {
	console.log("server close:\n" + err.stack);
	//server.close()
})

server.on("message", (msg, rinfo) => {
	console.log("server got: " + msg + " from " + rinfo.address + ":" + rinfo.port);
	stateNBiot.ip = rinfo.address
	stateNBiot.port = rinfo.port

	console.log(stateNBiot);
	
	var ack = new Buffer("1")
	server.send(ack, 0, ack.length, rinfo.port, rinfo.address, function (err, bytes) {
		console.log("sent ACK. 0 ")
	})
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

