const axios = require("axios");

const TOKEN = process.env.TOKEN;
const CHAT_ID = process.env.CHAT_ID;

async function sendTelegram(message) {
  const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

  try {
    await axios.post(url, {
      chat_id: CHAT_ID,
      text: message
    });
  } catch (error) {
    console.log("Telegram Error:", error.message);
  }
}

module.exports = sendTelegram;
