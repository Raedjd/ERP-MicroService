const Department = require("../model/Department");
const router = require("express").Router();
const axios = require("axios");
//create department
router.post("/", async (req, res) => {
  const newDepratment = new Department(req.body);
  try {
    const savedDepratment = await newDepratment.save();
    res.status(201).json(savedDepratment);
  } catch (err) {
    res.status(500).json(err);
  }
});
//update department
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

//delete department
router.delete("/:id", async (req, res) => {
  try {
    await Department.findByIdAndDelete(req.params.id);
    res.status(200).json("Department has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});
//get all departments
router.get("/all", async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get number of employees for each department
router.get("/EmployeePerDepartment", async (req, res) => {
  const departmentss = await Department.find();
  console.log(departmentss);
  const departments = departmentss.map((e) => e.title);
  console.log(departments);
  const employees = await axios(
    "http://localhost:8762/employee-service/employee/all"
  );
  console.log(employees);
  const arr = [];
  departments.forEach((department) => {
    let obj = {
      department: department,
      employees: [],
      nbEmployees: 0,
    };
    const employeestoInject = employees.data.filter((employee) => {
      return employee.department === department;
    });
    obj = {
      ...obj,
      employees: employeestoInject,
      nbEmployees: employeestoInject.length,
    };
    arr.push(obj);
  });
  res.status(200).json(arr);
});

module.exports = router;
