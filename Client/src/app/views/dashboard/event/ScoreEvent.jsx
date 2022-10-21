import {Box, Fab} from '@mui/material';


import axios from "../../../../axios";
import React, { useState} from "react";



export default function ScoreEvent({idEvent}) {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [rating,setRating]=useState();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(()=>
        axios({
            method: 'GET',
            url: `http://localhost:8762/event-service/rating/ratingbyevent/${idEvent}`,

        }).then((response)=>{
            setRating(response.data)

        }),[])


    return (
        <Box>
            {rating}

        </Box>
    );
}