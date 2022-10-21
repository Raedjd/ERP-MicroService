
import React, {useState} from "react";
import { getToken} from "../../../../auth/RoutsData";
import axios from "axios";
import IconButton from "@mui/material/IconButton";

export default function ShowLike({idPost}) {
    const [score,setScore]=useState([]);
    React.useEffect(()=>{
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL}/love/lovebypost/${idPost}`,
            headers: {
                'Authorization': 'Bearer ' + getToken()
            }
        }).then((response)=>{
            setScore(response.data.map((s)=>s.nbrLike))

        })
    },[])
    const s = Object.keys(score).map((key) => score[key]);
    const sum = s.reduce((accumulator, value) => {
        return accumulator + value;
    }, 0);

    return(

        <IconButton aria-label="add to favorites">
          {sum}
        </IconButton>

    )
}