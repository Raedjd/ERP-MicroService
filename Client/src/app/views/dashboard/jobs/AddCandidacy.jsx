import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
const AddCandidacy = ({ setAddShowCandidacy ,jobId}) => {
  const [fullName,setFullName]=useState("");
  const [phoneNumber,setPhoneNumber]=useState("");
  const [email,setEmail]=useState("");
  const [linkedinPath,setLinkedinPath]=useState("");
  const [resume,setResume]=useState("");
  const sendData = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('fullName',fullName)
      formData.append('phoneNumber',phoneNumber)
      formData.append('email',email)
      formData.append('phoneNumber',phoneNumber)
      formData.append('linkedinPath', linkedinPath);
      formData.append('resume',resume);
      const response = await axios({
          method: "post",
          url: `http://localhost:8086/api/Candidacy/add/${jobId}`,
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
      }).then(response => {
          //console.log(response.status);
          window.location.reload();
      }).catch(err => console.warn(err));
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
          <h2>Add Candidacy: </h2>
          <CloseIcon
            onClick={() => setAddShowCandidacy(false)}
            style={{ cursor: "pointer" }}
          />
        </div>
        <form>
            <div
                className="form-lins"
                style={{ display: "flex", flexDirection: "column" }}
            >
                <label>FullName:</label>
                <input
                    type="text"
                    name="fullName"
                    onChange={(e) =>setFullName(e.target.value)}
                    value={fullName}
                    style={{ width: "100%", fontSize: "18px", marginBottom: "16px" }}
                />
            </div>
            <div
                className="form-lins"
                style={{ display: "flex", flexDirection: "column" }}
            >
                <label>Phone Number:</label>
                <input
                    type="text"
                    name="phoneNumber"
                    onChange={(e) =>setPhoneNumber(e.target.value)}
                    value={phoneNumber}
                    style={{ width: "700px", fontSize: "18px", marginBottom: "16px" }}
                />
            </div>
            <div
                className="form-lins"
                style={{ display: "flex", flexDirection: "column" }}
            >
                <label>Email:</label>
                <input
                    type="text"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    style={{ width: "100%", fontSize: "18px", marginBottom: "16px" }}
                />
            </div>
            <div
                className="form-lins"
                style={{ display: "flex", flexDirection: "column" }}
            >
                <label>Linkedin Path:</label>
                <input
                    type="text"
                    name="linkedinPath"
                    onChange={(e) =>setLinkedinPath(e.target.value)}
                    value={linkedinPath}
                    style={{ width: "100%", fontSize: "18px", marginBottom: "16px" }}
                />
            </div>
            <div
                className="form-lins"
                style={{ display: "flex", flexDirection: "column" }}
            >
                <label>Resume:</label>
                <input
                    type="file"
                    name="resume"
                    onChange={(e) =>setResume(e.target.files[0])}
                    style={{ width: "100%", fontSize: "18px", marginBottom: "16px" }}
                />
            </div>
          <button
            type="submit"
            onClick={(e) => sendData(e)}
            style={{
              cursor: "pointer",
              backgroundColor: "green",
              padding: "20px",
              color: "white",
              outline: "none",
              border: "none",
              borderRadius: "5px",
              fontSize: "14px", textAlign: "center",
                width: "300px",
                height: "40px",
                margin: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCandidacy;
