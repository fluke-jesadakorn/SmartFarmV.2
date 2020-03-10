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

//st: settime
//oo: onOff
//gt: get Time
//ws: water state

const waterOnOff = (OnOff) => {
	let ack = new Buffer("oo0" + OnOff.toString())
	if (NBIoT.NbIP !== null) {
		server.send(ack, 0, ack.length, NBIoT.NBPort, NBIoT.NbIP, function (err, bytes) {
			console.log("sent ACK : " + ack.toString() + ' to NBIoT');
		})
	} else {
		console.log('Please Wait For NBIoT Connected First');
	}
}

const setTimeOnOff = (time) => {
	let ack = new Buffer("st" + time.toString());
	if (NBIoT.NbIP !== null) {
		server.send(ack, 0, ack.length, NBIoT.NBPort, NBIoT.NbIP, function (err, bytes) {
			console.log("sent OnOff : " + ack.toString() + 'to NBIoT');
		})
	} else {
		console.log('Please Wait For NBIoT Connected First');
	}
}

const getLastData = () => {
	let convert = +NBIoT.NBMsg;
	convert = convert / 6.7;
	if (convert > 100) {
		convert = 100;
	}
	convert = Math.round(convert);
	return "ความชื้นขณะนี้ : " + convert.toString() + "%";
}

const setHumidity = (humidity) => {
	let convert = +humidity;
	convert = humidity * 6.7;
	convert = Math.round(convert);
	let ack = new Buffer("hm" + convert.toString());
	if (NBIoT.NbIP !== null) {
		server.send(ack, 0, ack.length, NBIoT.NBPort, NBIoT.NbIP, function (err, bytes) {
			console.log("sent humidity : " + ack.toString() + '% to NBIoT');
		})
	} else {
		console.log('Please Wait For NBIoT Connected First');
	}
}

const getOnOffTime = () => {
	let ack = new Buffer("gt");
	if (NBIoT.NbIP !== null) {
		server.send(ack, 0, ack.length, NBIoT.NBPort, NBIoT.NbIP, function (err, bytes) {
			console.log("Time before water on : " + ack.toString() + 'minute');
		})
		return NBIoT.NBMsg;
	} else {
		console.log('Please Wait For NBIoT Connected First');
	}
}

const getWaterState = () => {
	let ack = new Buffer("ws");
	if (NBIoT.NbIP !== null) {
		server.send(ack, 0, ack.length, NBIoT.NBPort, NBIoT.NbIP, function (err, bytes) {
			console.log("status water is : " + ack.toString());
		})
		return NBIoT.NBMsg;
	} else {
		console.log('Please Wait For NBIoT Connected First');
	}
}
module.exports = { waterOnOff, setTimeOnOff, getLastData, setHumidity, getOnOffTime, getWaterState }