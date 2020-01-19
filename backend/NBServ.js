const express = require('express')
const dgram = require("dgram")
const server = dgram.createSocket("udp4")
const NbIoTPort = 5003;
const app = express()

var store = {
	moi: [], nbip: [], nbport: []
};

module.exports = function LineSw(data) {
	switch (data.type) {
		case "setMoi": {
			store.moi = data.payload
		}
		case "setNbip": {
			store.nbip = data.payload
		}
		case "setNbPort": {
			store.nbport = data.payload
		}
		case "getMoi": return store.moi
	}
}

server.on("error", function (err) {
	console.log("server error:\n" + err.stack);
	//server.close()
})

server.on("close", function (err) {
	console.log("server close:\n" + err.stack);
	//server.close()
})

server.on("message", (msg, rinfo) => {
	console.log("server got: " + msg + " from " + rinfo.address + ":" + rinfo.port);
	LineSw({
		type: "setMoi",
		payload: msg.toString()
	})

	LineSw({
		type: "setNbip",
		payload: rinfo.address
	})
	LineSw({
		type: "setNbPort",
		payload: rinfo.port
	})

	// var ack = new Buffer("1")
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
