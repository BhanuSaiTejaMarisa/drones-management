const sendEmail = require("../util/sendEmail");
const router = require("express").Router();


router.post("/", async (req, res) => {
    try {
        await sendEmail({
            to: "bhanu3475@gmail.com",
            from: "bhanusaitejamarisa@gmail.com",
            subject: "SendGrid Email testing",
            text: "Working Fine"
        });
        res.sendStatus(200)
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
})
module.exports = router;