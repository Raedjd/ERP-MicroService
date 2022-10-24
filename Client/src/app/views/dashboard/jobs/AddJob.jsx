import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const AddJob = ({ setAddShow }) => {
  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");
  const [salary,setSalarye]=useState("");
  const [expirationDate,setExpirationDate]=useState("");
  const [managerId,setManagerId]=useState(1);
  const sendData = async (e) => {
      e.preventDefault();
      await axios({
          method: "post",
          url: `http://localhost:8086/api/job/add`,

          data: {
              title:title,
              description:description,
              salary:salary,
              expirationDate:expirationDate,
              managerId:managerId
          },

      }).then((response)=>{
          window.location.reload();
      })
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
          <h2>Add Job: </h2>
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
                <label>Job Title:</label>
                <input
                    type="text"
                    name="title"
                    onChange={(e) =>setTitle(e.target.value)}
                    value={title}
                    style={{ width: "100%", fontSize: "18px", marginBottom: "16px" }}
                />
            </div>
            <div
                className="form-lins"
                style={{ display: "flex", flexDirection: "column" }}
            >
                <label>Job Description:</label>
                <textarea
                    name="description"
                    onChange={(e) =>setDescription(e.target.value)}
                    value={description}
                    style={{ width: "700px", fontSize: "18px", marginBottom: "16px" }}
                />
            </div>
            <div
                className="form-lins"
                style={{ display: "flex", flexDirection: "column" }}
            >
                <label>Job salary:</label>
                <input
                    type="text"
                    name="salary"
                    onChange={(e) => setSalarye(e.target.value)}
                    value={salary}
                    style={{ width: "100%", fontSize: "18px", marginBottom: "16px" }}
                />
            </div>
            <div
                className="form-lins"
                style={{ display: "flex", flexDirection: "column" }}
            >
                <label>Expiration Date:</label>
                <input
                    type="datetime-local"
                    name="expirationDate"
                    onChange={(e) =>setExpirationDate(e.target.value)}
                    value={expirationDate}
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

export default AddJob;
