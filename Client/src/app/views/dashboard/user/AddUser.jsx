import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
const AddUser = ({setAddShow}) => {
    const [userName,setUserName]=useState("");
    const [role,setRole]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const sendData = async (e) => {
        e.preventDefault();
        await axios({
            method: "post",
            url: `http://localhost:8085/api/auth/signup`,
            data: {
                username: userName,
                email: email,
                role: [
                    role
                ],
                password: password
            },
        }).then((response)=>{
            window.location.reload();
        })
    };
    const options = [
        {value: '', text: '--Choose an option--'},
        {value: 'admin', text: 'Admin'},
        {value: 'user', text: 'Executer'},
        {value: 'manager', text: 'Manager'},
    ];

    const [selected, setSelected] = useState(options[0].value);
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
                    <h2>Add User: </h2>
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
                        <label>UserName:</label>
                        <input
                            type="text"
                            name="userName"
                            onChange={(e) =>setUserName(e.target.value)}
                            value={userName}
                            style={{ width: "100%", fontSize: "18px", marginBottom: "16px" }}
                        />
                    </div>
                    <div
                        className="form-lins"
                        style={{ display: "flex", flexDirection: "column" }}
                    >
                        <label>Role:</label>
                        <select value={selected} style={{ width: "700px", fontSize: "18px", marginBottom: "16px" }}
                                onChange={(e) =>{
                                    setSelected(e.target.value);
                                    setRole(e.target.value)
                                }}>
                            {options.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.text}
                                </option>
                            ))}
                        </select>
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
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            onChange={(e) =>setPassword(e.target.value)}
                            value={password}
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

export default AddUser;
