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
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            }
        });

        const emailInfo = {
            from: process.env.EMAIL,
            to: `${client.email}`,
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


const getHTMLMessage = async (client, content) => {
    return `
    <h1>Hi, ${client.name}!</h1>
    <h1>Thank you for your order!</h1>
    <p>Order details: </p>
    <ul>${content.products}</ul>
    `;
}

module.exports = { sendMail };