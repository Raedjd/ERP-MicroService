
import {Box, Fab} from '@mui/material';

import React, { useState } from 'react';
import axios from "../../../../axios";
import {getToken} from "../../../auth/RoutsData";


export default function ScoreEvent({idEvent}) {
    const [rating,setRating]=useState({});
    React.useEffect(()=>{
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL}/rating/ratingbyevent/${idEvent}`,
            headers: {
                'Authorization': 'Bearer ' + getToken()
            }
        }).then((response)=>{
          setRating(response.data.map((s)=>s.scoreRating))


        })
    },[])
    const score = Object.keys(rating).map((key) => rating[key]);
    const sum = score.reduce((accumulator, value) => {
        return accumulator + value;
    }, 0);

    return (
        <Box>

            <Fab variant="extended" aria-label="Delete" className="button"  >
                {sum}
            </Fab>

        </Box>
    );
}
