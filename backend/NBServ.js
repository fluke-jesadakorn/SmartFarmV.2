const express = require('express')
const dgram = require("dgram")
const server = dgram.createSocket("udp4")
const socketIO = require('socket.io')
const bodyParser = require('body-parser')
const sc = express()
const SocketIOPort = 5001;
const NbIoTPort = 5003;
const axios = require('axios');

sc.use(bodyParser.json())
sc.use(bodyParser.urlencoded({
	extended: true
}))
const app = sc.listen(SocketIOPort, function (err, result) {
	console.log('SocketIO API Start On http://localhost:' + SocketIOPort);
})

const io = socketIO.listen(app);
var store = { 
	moi: [], nbip: [], nbport: [] 
};
function LineSw(data) {
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

function listen() {
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
		io.sockets.emit('nb', LineSw({ type: "getMoi" }))
		axios.post("/api/addData", { data: LineSw({ type: "getMoi" }) })

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
	},()=>console.log(`NBIoT running on port : ${NbIoTPort}`));
}

function sendSw(sw) {
	let res = sw == true ? sw = "1" : sw = "0";
	server.send(res, 0, res.length, store.nbport, store.nbip, function (err, bytes) {
		console.log("res is : " + res + "to " + store.nbip + ": " + store.nbport)
	})
}

listen()
