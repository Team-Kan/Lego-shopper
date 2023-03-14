//api router for node mailer
const express = require("express");
const { sendMail } = require("../db/mail");


const router = express.Router();

router.post('/mail', async(req, res, next) => {
    try {
        const { client, content } = req.body;
        const response = await sendMail(client, content);
        console.log("the response on the api side is: ", response);
        res.send({ message: 'message sent successfully'});
    } catch (error) {
        next(error);
    }
})

module.exports = router;