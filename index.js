const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  delay,
  Browsers
} = require("@whiskeysockets/baileys");

const Pino = require("pino");
const readline = require("readline");

const ADMIN_NUMBER = "251917018181@s.whatsapp.net";
const BOT_NUMBER = "251959071@s.whatsapp.net";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (q) => new Promise((res) => rl.question(q, res));

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("./auth_info_baileys");

  const sock = makeWASocket({
    auth: state,
    logger: Pino({ level: "silent" }),
    browser: Browsers.ubuntu("Chrome"),
    printQRInTerminal: false
  });

  if (!sock.authState.creds.registered) {
    console.log("\n📞 Enter BOT number (example: 2519xxxxxxx)");
    const number = await question("Number: ");
    const cleanNumber = number.replace(/[^0-9]/g, "");

    await delay(3000);
    const code = await sock.requestPairingCode(cleanNumber);

    console.log("\n🔑 PAIRING CODE:", code);
    console.log("👉 WhatsApp > Settings > Linked Devices");
    console.log("👉 Link with phone number");
    console.log("👉 Enter this code\n");
  }

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "close") {
      const shouldReconnect =
        lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      if (shouldReconnect) startBot();
    } else if (connection === "open") {
      console.log("✅ BOT CONNECTED SUCCESSFULLY");
      rl.close();
    }
  });

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message) return;

    const sender = msg.key.participant || msg.key.remoteJid;
    const isAdmin = sender === ADMIN_NUMBER;

    let text = "";
    if (msg.message.conversation) text = msg.message.conversation;
    else if (msg.message.extendedTextMessage?.text)
      text = msg.message.extendedTextMessage.text;

    if (isAdmin && text?.toLowerCase() === "menu") {
      await sock.sendMessage(sender, {
        text: "🛠 ADMIN MENU\n• add product\n• edit product"
      });
      return;
    }

    if (!isAdmin && text?.toLowerCase() === "menu") {
      await sock.sendMessage(sender, {
        text: "🛒 MENU\n1️⃣ Products\n2️⃣ Contact"
      });
    }
  });
}

startBot();
