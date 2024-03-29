//database function/transporter for nodemailer
//https://nodemailer.com/about/
//https://github.com/danielforkner/nodemailer-microservice/blob/main/mailFunctions.js

const nodemailer = require("nodemailer");

const sendMail = async(client, content) => {
    const mailSentResponse = await sendMailHandler(client, content);
    console.log("email sent, emailResponse: ", mailSentResponse);
}

const sendMailHandler = async(client, content) => {
    return new Promise((resolve, reject) => {
    
        const transport = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const emailInfo = {
            from: process.env.EMAIL,
            to: `${content.email}`,
            subject: "Order Confirmation from REKANSTRUCTED",
            html: getHTMLMessage(client, content),
        }

        const emailResponse = transport.sendMail(emailInfo,
            (err, result) => {
                if(err) {
                    console.error('error sending mail');
                    reject(err);
                } else {
                    transport.close();
                    resolve(result.response);
                }
            })
    })
}


const getHTMLMessage = (client, content) => {
    return `
    <h1>Hi, ${content.name}!</h1>
    <h1>Thank you for your order!</h1>
    <img src="https://media.giphy.com/media/l4q7VhGsL6BnXJrc4/giphy.gif"/>
    <p>Order details: </p>
    <ul>${content.htmlStr}</ul>
    <p>Order total: $${content.total}</p>
    `;
}

module.exports = { sendMail };