require("dotenv").config()
const twilio = require("twilio")

const accountSid = process.env.ACCOUNT_ASID
const authToken = process.env.AUTH_TOKEN

console.log(process.env.ACCOUNT_ASID)
const client = twilio(accountSid, authToken)

const options = {
    body: 'Hola lau te amoooo!',
    mediaUrl: [ 'https://www.chetu.com/img/twilio/partner/twilio-logo.png' ],
    from: 'whatsapp:+14155238886',
    to: 'whatsapp:+5491161718866'
 }

 ;(async () => {
    try {
        const message = await client.messages.create(options)
        console.log(message)
    } catch (error) {
        console.log(error)
    }
})()
