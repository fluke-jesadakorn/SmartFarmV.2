require('dotenv').config()
const serverType = 'Line';
const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const app = express()
const PORT = process.env.PORT || 5006
const LineToken = process.env.LINE_TOKEN;
const serverWithSSL = require('./globalHttpsConf')
const NBServ = require('./NBServ')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post('/webhook', async (req, res) => {
    let reply_token = req.body.events[0].replyToken;
    let msg = req.body.events[0].message.text;
    reply(reply_token, msg);
    res.sendStatus(200);
})

serverWithSSL(PORT, app, serverType);

async function reply(reply_token, msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer {${LineToken}}`,
        'responseType': 'json',
    }

    let resMessage = async (msg) => {
        if (msg === 'ดูความชื้น' || msg == "1") {
            return NBServ.getLastData() + "%";
        }
        else if (msg === 'ปิดน้ำ' || msg == "2") {
            NBServ.waterOnOff(0);
            return "ปิดน้ำแล้ว";
        }
        else if (msg === 'เปิดน้ำ' || msg == "3") {
            await NBServ.waterOnOff(1);
            return "เปิดน้ำแล้ว";
        }
        else if (msg.substring(0, 18) === 'ตั้งเวลาเปิดปิดน้ำ' || msg.substring(0, 1) == "4") {
            if (msg.length === 20) {
                NBServ.setTimeOnOff(msg.substring(18))
                return "ตั้งเวลาเปิดปิดน้ำ " + msg.substring(19, 21) + " ช.ม.";
            }
            else if (msg.length === 3) {
                NBServ.setTimeOnOff(msg.substring(2))
                return "ตั้งเวลาเปิดปิดน้ำ " + msg.substring(2, 3) + " ช.ม.";
            }
            else {
                return "โปรดตั้งค่าดังรูปแบบนี้ [ตั้งเวลาเปิดปิดน้ำ 2 หรือ 4 2] หมายถึงเปิด 2 ช.ม. ปิด 2 ช.ม.";
            }
        }
        else if (msg.substring(0, 26) === "ตั้งความชื้นดินเพื่อปิดน้ำ" || msg.substring(0, 1) === "5") {
            NBServ.setHumidity(msg.substring(2));
            return "ตั้งความชื้นดินเพื่อปิดน้ำ : " + msg.substring(2, 4) + "%";
        }
        else if (msg == 'ดูเวลาที่เหลือก่อนรดน้ำ' || msg == '6') {
            return "เวลาที่เหลือก่อนปิดน้ำ : " + NBServ.getOnOffTime();
        }
        else if (msg == 'ดูสถานะการรดน้ำ' || msg == '7') {
            return "สถานะของการรดน้ำ : " + NBServ.getWaterState();
        }
        else if (msg == 'ดูคำสั่ง' || msg == 'help' || msg == '?') {
            return (
                `1. ดูความชื้น 
                \n2. ปิดน้ำ 
                \n3. เปิดน้ำ 
                \n4. ตั้งเวลา {เวลาที่จะตั้งค่าให้ปิดเปิด(ช.ม.)} 
                \n5. ตั้งความชื้นดินเพื่อปิดน้ำ {ความชื้นที่จะตั้งค่าให้ปิด(%)(แนะนำ 90%)} 
                \n6. ดูเวลาที่เหลือก่อนรดน้ำ 
                \n7. ดูสถานะการรดน้ำ`
            )
        }
        else {
            return 'โปรดพิมพ์ว่า "?" หรือ "ดูคำสั่ง" เพื่อดูคำสั่งทั้งหมด'
        }
    }

    onBot = async (command) => {
        console.log(command);
    }

    offBot = async (command) => {
        console.log(command);
    }

    let body = await JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: await resMessage(msg)
        }]
    })

    axios({
        method: 'POST',
        headers: headers,
        data: body,
        url: 'https://api.line.me/v2/bot/message/reply',
    }).catch((error) => {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
        console.log(error.config);
    });
}