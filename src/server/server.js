let express = require("express");
const bodyParser = require("body-parser");
let app = express();
let cors = require("cors");
const axios = require("axios");
app.use(cors());
app.use(bodyParser.json());

const pushMoreUrl = "https://pushmore.io/webhook/34LQgwoNxStyVqk9Tk3dmiwM";

app.post("/send-telegram-message", async (req, res) => {
  const { sender, repoUrl } = req.body;

  try {
    const response = await axios.post(pushMoreUrl, {
      sender: sender,
      repoUrl: repoUrl,
    });
    if (response.statusText !== "OK") {
      throw new Error("Response is not OK");
    }
    res.status(200).send("OK");
  } catch (error) {
    res.status(500).send("Errore invio messaggio a Telegram " + error);
  }
});

const PORT = 5500;
app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});
