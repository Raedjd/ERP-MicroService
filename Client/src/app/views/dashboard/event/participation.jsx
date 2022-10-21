
import axios from "../../../../axios";
import {fetchEventsData, fetchUserData, getToken} from "../../../auth/RoutsData";
import {Icon,  Fab} from "@mui/material";
import {useState} from "react";
import React from "react";



export default function Participation({idEvent, userId}) {
    const [isTrue,setIstrue]=useState(false)
    const participationEvent = async (e) => {
        e.preventDefault();
        await axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}/event/participation/${userId}/${idEvent}`,
            headers: {
                'Authorization': 'Bearer ' + getToken()
            }
        }).then((response)=>{
            setIstrue(true)
        })

    }
    const [idData,setIdData]=useState({});
    React.useEffect(()=>{
        fetchEventsData().then((response)=>{
            setIdData(response.data.map((e)=>e.users.map((i)=>i.id)));


        })
    },[])

    const [userData,setUserData]=useState("");

    React.useEffect(()=>{
        fetchUserData().then((response)=>{
            setUserData(response.data.id);


        })
    },[])
    const ids= Object.keys(idData).map((key) => idData[key]);




    const [participantsData,setParticapantsData]=useState({});
    React.useEffect(()=>{
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL}/event/findOne/${idEvent}`,
            headers: {
                'Authorization': 'Bearer ' + getToken()
            }
        }).then((response)=>{
            setParticapantsData(response.data.users);



        })
    },[])
    const participants = Object.keys(participantsData).map((key) => participantsData[key]);
 const part= participants.map((i)=>i.id)

    return (
        <Fab color="primary" aria-label="Add" className="button" onClick={participationEvent} disabled={ isTrue || part.includes(userId)}  >
            <Icon>add</Icon>
        </Fab>
    );
}