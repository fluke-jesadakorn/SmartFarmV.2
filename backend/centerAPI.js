const express = require('express');
const app = express();
const fileRoute = express.Router();
const protectRoute = express.Router();
const registerRoute = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const PORT = process.env.PORT || 5001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

fileRoute.get("/", (req, res, next) => {
    res.end('CanRun')
});

registerRoute.get('/', (req, res, next) => {
    const user = { id : 3 };
    const token = jwt.sign({ user }, "mySecret");
    res.json({
        token:token
    })
})



protectRoute.post('/', (req, res, next) => {
    // const token = req.body.token;
    // const secret = "mySecret"
    // jwt.verify(token, secret, ()=>{
    //     res.end('login success')
    // })
    const body = req.body;
    console.log(body);
    
    if(body.isLogin === 'true'){
        res.end("login success" + "Your Token is : " + body.token);
    }
});

app.use('/file', fileRoute);
app.use('/register', registerRoute);
app.use('/protect', protectRoute);

app.listen(PORT, () => console.log(`Center API Running on port : ${PORT}`));