// utils/whatsapp.js
require('dotenv').config();
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioSandboxNumber = `whatsapp:${process.env.TWILIO_SANDBOX_NUMBER}`;

const client = twilio(accountSid, authToken);

async function sendWhatsAppMessage(to, body) {
    try {
        const message = await client.messages.create({
            from: twilioSandboxNumber,
            to: `whatsapp:${to}`,
            body: body,
        });
        console.log(`WhatsApp message sent to ${to} via Sandbox: ${message.sid}`);
        return message;
    } catch (error) {
        console.error('Error sending WhatsApp message via Sandbox:', error);
        return null;
    }
}

module.exports = { sendWhatsAppMessage };