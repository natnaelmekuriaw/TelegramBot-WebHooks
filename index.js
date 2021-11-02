require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser')
const axios = require('axios')

const { TOKEN, SERVER_URL } = process.env
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`
const URI = `/webhook/${TOKEN}`
const WEBHOOK_URL = SERVER_URL + URI

var username, password;
var authentication;

// var users = [{
//     username, password,authentication
// }]
// var i;


const app = express();
app.use(bodyParser.json());

const init = async () => {
const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`)
    console.log(res.data);
}

app.post(URI, async (req, res) => {
    console.log(req.body)

    const chatId = req.body.message.chat.id;
    var text = req.body.message.text;
    
    console.log('text', text)
if(!authentication){
    if (!username) {
        if (text === 'natnael') {
            text = 'Please enter password:';
            username = true;
        }
        else {
            text = '🔝 Main Menu';
        }
    }
    else {
        if (text === '2315') {
            text = 'Logged in successfully'
            password = true;
        }
        else {
            text = 'Incorrect password!\ please try again'
        }
    }
    }
else {
    text = 'You are already logged in\n Logout if you went to login again!'
    }
    authentication = username && password;
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
         chat_id: chatId,
         text: text
     })
     res.send()

   // return res.send("Sorry! the bot is still in development")

})

app.listen(process.env.PORT || 5000, async () => {
    console.log('App running on port', process.env.PORT || 5000)
    await init()
})

//console.log("Hey node is running")