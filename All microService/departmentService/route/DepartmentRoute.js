const Department = require("../model/Department");
const router = require("express").Router();

//create cart
router.post("/", async (req, res) => {
  const newDepratment = new Department(req.body);
  try {
    const savedDepratment = await newDepratment.save();
    res.status(201).json(savedDepratment);
  } catch (err) {
    res.status(500).json(err);
  }
});
//update cart
router.put("/:id", async (req, res) => {
  try {
    const updatedDepartment = await Department.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedDepartment);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete cart
router.delete("/:id", async (req, res) => {
  try {
    await Department.findByIdAndDelete(req.params.id);
    res.status(200).json("Department has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});
//get all carts
router.get("/all", async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
