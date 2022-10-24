const sendEmail =require("./email")

module.exports.email_rh= async (req ,res) => {
    const {email} = req.body;

    try{

        sendEmail(email)
       return res.status(200)
    } catch (err) {
        return res.status(500).json({ msg: err });
    }
}