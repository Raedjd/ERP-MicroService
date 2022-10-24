import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

export const getUserName = (e)=>{
  return `${e.firstName} ${e.lastName} ${e.jobTitle}`
}

const Comments = ({ setAddShow, id }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [datatosend, setDatatosend] = useState({
  });
  useEffect(() => {
    fetchEmployee();
  }, []);
  const fetchEmployee = async () => {
    const data = await axios.get(`http://localhost:8762/leave-management-service/comment/findAll`);
    setEmployees(data.data.filter(data => data.leave.id === id));
  };

  const onChangeSelect = (e) => {
    setDatatosend({ content: e});
  };


  const sendData = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const send = await axios.post(
        `http://localhost:8762/leave-management-service/comment/add/${id}`,
        {userId:1, content: datatosend.content}
        
      );
      setAddShow(false);
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
            
              display: "flex",
              flexDirection: "column-reverse"
       
          }}
        >
          <h2>Add Comment : </h2>
          <CloseIcon
            onClick={() => setAddShow(false)}
            style={{ cursor: "pointer" }}
          />
        </div>
        {employees.map((comment)=>{
          return <p style={{backgroundColor :"#80808036", padding: "16px",padding: "16px", borderRadius: "25px"}}>{comment.content}</p>
        })}
        <form >
        <div
            className="form-lins"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label>*Comment :</label>
            <textarea
              onChange={(e) => {onChangeSelect(e.target.value );console.log(e.target.value)}}
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

export default Comments;
