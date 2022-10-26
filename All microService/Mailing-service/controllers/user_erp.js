const sendEmail =require("./email")

module.exports.email_rh= async (req ,res) => {
    const {email} = req.body;

    try{

        sendEmail(email)
    } catch (err) {
        return res.status(500).json({ msg: err });
    }
}