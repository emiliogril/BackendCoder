require("dotenv").config()
const twilio = require("twilio")

const accountSid = process.env.ACCOUNT_ASID
const authToken = process.env.AUTH_TOKEN

console.log(process.env.ACCOUNT_ASID)
const client = twilio(accountSid, authToken)

// ACc564d09fcf986d3bb20a4296e1da8133
// 7e2ef38c1db9fe3d4292fe638af560fa

const options = {
    body: 'Hola soy un WSP desde Node.js!',
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
