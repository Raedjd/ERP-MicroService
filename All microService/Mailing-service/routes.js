const router = require("express").Router();
const emailController = require("./controllers/user_erp");
router.post("/send_email", emailController.email_rh);
module.exports = router;