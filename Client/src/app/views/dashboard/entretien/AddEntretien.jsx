import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const AddEntretien = ({ setAddShow }) => {
  const [dep, setDep] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [datatosend, setDatatosend] = useState({
    employee: "",
    candidature: "",
    lienEntretien: "",
    roleEntretien: "",
    dateEntretien: "",
  });
  useEffect(() => {
    fetchDep();
    fetchRole();
  }, []);
  const fetchDep = async () => {
    const data = await axios.get(
      "http://localhost:8762/employee-service/employee/all"
    );
    setDep(data.data);
  };
  const fetchRole = async () => {
    const data = await axios.get(
      "http://localhost:8762/job-service/api/job/findAll"
    );
    setRoles(data.data);
  };
  const onChangeForm = (e) => {
    e.preventDefault();
    setDatatosend({ ...datatosend, [e.target.name]: e.target.value });
    console.log(datatosend);
  };
  const onChangeSelect = (e) => {
    e.preventDefault();
    setDatatosend({ ...datatosend, employee: e.target.value });
  };
  const onChangeSelect1 = (e) => {
    e.preventDefault();
    setDatatosend({ ...datatosend, roleEntretien: e.target.value });
    console.log(datatosend);
  };
  const sendData = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const send = await axios.post(
        "http://localhost:8762/entretien-service/entretien/add",
        datatosend
      );
      console.log(send);
      window.location.reload();
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
          <h2>Add Entretien : </h2>
          <CloseIcon
            onClick={() => setAddShow(false)}
            style={{ cursor: "pointer" }}
          />
        </div>
        <form>
          <div
            className="form-lins"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label>Candidature:</label>
            <input
              type="text"
              name="candidature"
              onChange={(e) => onChangeForm(e)}
              style={{ width: "100%", fontSize: "18px", marginBottom: "16px" }}
            />
          </div>
          <div
            className="form-lins"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label>Employee :</label>
            <select
              style={{ marginBottom: "24px" }}
              onChange={(e) => onChangeSelect(e)}
            >
              {dep &&
                dep.map((e) => (
                  <option value={e.value}>
                    {e.firstName} {e.lastName}
                  </option>
                ))}
            </select>
          </div>

          <div
            className="form-lins"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label>Job :</label>
            <select
              style={{ marginBottom: "24px" }}
              onChange={(e) => onChangeSelect1(e)}
            >
              {roles &&
                roles.map((e) => <option value={e.title}>{e.title}</option>)}
            </select>
          </div>
          <div
            className="form-lins"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label>Link:</label>
            <input
              type="text"
              name="lienEntretien"
              onChange={(e) => onChangeForm(e)}
              style={{ width: "100%", fontSize: "18px", marginBottom: "16px" }}
            />
          </div>

          <div
            className="form-lins"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label>Date:</label>
            <input
              type="datetime-local"
              name="dateEntretien"
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
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEntretien;
