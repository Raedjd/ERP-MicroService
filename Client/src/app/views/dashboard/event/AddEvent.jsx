import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const AddEvent = ({ setAddShow }) => {



    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const [place,setPlace]=useState("");
    const [startDate,setStartDate]=useState("");
    const [endDate,setEndDate]=useState("");
    const addEvent = async (e) => {
        e.preventDefault();
        await axios({
            method: "post",
            url: `http://localhost:8762/event-service/event/add`,

            data: {
                title:title,
                description:description,
                place:place,
                startDate:startDate,
                endDate:endDate,



            },

        }).then((response)=>{
            window.location.reload();
        })

    }

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
                    <h2>Add Event : </h2>
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
                        <label>Title:</label>
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
                        <label>Description:</label>
                        <input
                            type="text"
                            name="description"
                            onChange={(e) =>setDescription(e.target.value)}
                            value={description}
                            style={{ width: "100%", fontSize: "18px", marginBottom: "16px" }}
                        />
                    </div>
                    <div
                        className="form-lins"
                        style={{ display: "flex", flexDirection: "column" }}
                    >
                        <label>Place:</label>
                        <input
                            type="text"
                            name="place"
                            onChange={(e) =>setPlace(e.target.value)}
                            value={place}
                            style={{ width: "100%", fontSize: "18px", marginBottom: "16px" }}
                        />
                    </div>
                    <div
                        className="form-lins"
                        style={{ display: "flex", flexDirection: "column" }}
                    >
                        <label>Start date:</label>
                        <input
                            type="datetime-local"
                            name="startDate"
                            onChange={(e) =>setStartDate(e.target.value)}
                            value={startDate}
                            style={{ width: "100%", fontSize: "18px", marginBottom: "16px" }}
                        />
                    </div>
                    <div
                        className="form-lins"
                        style={{ display: "flex", flexDirection: "column" }}
                    >
                        <label>End date:</label>
                        <input
                            type="datetime-local"
                            name="endDate"
                            onChange={(e) =>setEndDate(e.target.value)}
                            value={endDate}
                            style={{ width: "100%", fontSize: "18px", marginBottom: "16px" }}
                        />
                    </div>


                    <button
                        type="submit"
                        onClick={addEvent}
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

export default AddEvent;
