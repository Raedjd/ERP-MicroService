import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

export const getUserName = (e)=>{
  return `${e.firstName} ${e.lastName} ${e.jobTitle}`
}

const UpdateSalary = ({ setShowUpdate, id }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [datatosend, setDatatosend] = useState({
  });
  useEffect(() => {
    fetchEmployee();
  }, []);
  const fetchEmployee = async () => {
    const data = await axios.get("http://localhost:8762/employee-service/employee/all");
    setEmployees([{userId: 0, firstName: "", lastName:"", jobTitle: ""}, ...data.data]);
    const salaryData = (await axios.get(`http://localhost:8762/salary-management-service/salary/find/${id}`)).data
    setDatatosend({
      ...salaryData
    })
  };
  const onChangeForm = (e) => {
    e.preventDefault();
    setDatatosend({ ...datatosend, [e.target.name]: e.target.value });
    console.log(datatosend);
  };
  const onChangeSelect = (e) => {
    e.preventDefault();
    setDatatosend({ ...datatosend, userId: e.target.value });
  };
  const sendData = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const send = await axios.put(
        `http://localhost:8762/salary-management-service/salary/update/${id}`,
        datatosend
      );
      setShowUpdate(false);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  return (
    <div
      className="addEmpWrapper"
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.3)",
        zIndex: "10000000000",
      }}
    >
      <div
        className="addEmpContainer"
        style={{
          padding: "15px 30px",
          backgroundColor: "white",
          borderRadius: "8px",
          minWidth: "350px",
        }}
      >
        <div
          className="addEmpFirst"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Update salary : </h2>
          <CloseIcon
            onClick={() => setShowUpdate(false)}
            style={{ cursor: "pointer" }}
          />
        </div>
        <form>
        <div
            className="form-lins"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label>*Employee :</label>
            <select
              style={{ marginBottom: "24px" }}
              onChange={(e) => onChangeSelect(e)}
              value={datatosend.userId}
            >
              {employees &&
                employees.map((e) => <option value={e.id}>{getUserName(e)}</option>)}
            </select>
          </div>
          <div
            className="form-lins"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label>*Date:</label>
            <input
              value={datatosend.date }
              type="date"
              name="date"
              onChange={(e) => onChangeForm(e)}
              style={{ width: "100%", fontSize: "18px", marginBottom: "16px" }}
            />
          </div>
          <div
            className="form-lins"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label>*basic salary:</label>
            <input
              type="number"
              name="basicSalary"
              onChange={(e) => onChangeForm(e)}
              value={datatosend.basicSalary ?datatosend.basicSalary: 0}
              style={{ width: "100%", fontSize: "18px", marginBottom: "16px" }}
            />
          </div>
          <div
            className="form-lins"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label>*tax: </label>
            <input
              type="number"
              name="tax"
              value={datatosend.tax ?datatosend.tax: 0}
              onChange={(e) => onChangeForm(e)}
              style={{ width: "100%", fontSize: "18px", marginBottom: "16px" }}
            />
          </div>
          <div
            className="form-lins"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label>overTime:</label>
            <input
              type="number"
              name="overTime"
              onChange={(e) => onChangeForm(e)}
              value={datatosend.overTime ?datatosend.overTime: 0}
              style={{ width: "100%", fontSize: "18px", marginBottom: "16px" }}
            />
          </div>
          <div
            className="form-lins"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label>bonus:</label>
            <input
              type="number"
              name="bonus"
              value={datatosend.bonus ?datatosend.bonus: 0}
              onChange={(e) => onChangeForm(e)}
              style={{ width: "100%", fontSize: "18px", marginBottom: "16px" }}
            />
          </div>
          <div
            className="form-lins"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label>other payement:</label>
            <input
              type="number"
              name="otherPayements"
              onChange={(e) => onChangeForm(e)}
              style={{ width: "100%", fontSize: "18px", marginBottom: "16px" }}
              value={datatosend.otherPayements ?datatosend.otherPayements: 0}
              
            />
          </div>
          <div
            className="form-lins"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label>other Decuctions:</label>
            <input
              type="number"
              name="otherDecuctions"
              value={datatosend.otherDecuctions ?datatosend.otherDecuctions: 0}
              onChange={(e) => onChangeForm(e)}
              style={{ width: "100%", fontSize: "18px", marginBottom: "16px" }}
            />
          </div>

         

          <button
            type="submit"
            onClick={(e) => sendData(e)}
            style={{
              cursor: "pointer",
              backgroundColor: "green",
              padding: "8px",
              color: "white",
              outline: "none",
              border: "none",
              borderRadius: "5px",
              fontSize: "14px",
            }}
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateSalary;
