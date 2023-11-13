const sgMail = require('@sendgrid/mail')
const myMail = process.env.MY_MAIL
const sendgridAPIKey = process.env.SENDGRID_API_KEY

sgMail.setApiKey(sendgridAPIKey)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: myMail,
        subject: 'Thanks from joining in!',
        text: `Welcome to the app, ${name}. Let me know how the app.`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: myMail,
        subject: 'Cancelation of subscription',
        text: `Hello ${name}, I wanted to know what is the reason of the cancelation?`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}