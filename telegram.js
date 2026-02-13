const axios = require("axios");

const TOKEN = "8563787195:AAEC0LjlE86522VzomR8l3VDk-_EnSsXbnY";
const CHAT_ID = "-1003525466390";

async function sendTelegram(message) {
  const url =
    `https://api.telegram.org/bot${TOKEN}/sendMessage`;

  try {
    await axios.post(url, {
      chat_id: GROUP_ID,
      text: message
    });
  } catch (err) {
    console.log(
      "Telegram Error:",
      err.message
    );
  }
}

module.exports = sendTelegram;
