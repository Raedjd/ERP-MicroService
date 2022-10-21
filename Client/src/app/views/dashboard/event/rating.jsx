import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import React, {useState} from "react";
import {styled} from "@mui/material";
import Rating from "@mui/material/Rating";
import axios from "../../../../axios";
import {fetchUserData, getToken} from "../../../auth/RoutsData";

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
        color: '#ff3d47',
    },
});

export default function EventRating({idEvent}) {



    const [userData,setUserData]=useState({});
    React.useEffect(()=>{
        fetchUserData().then((response)=>{
            setUserData(response.data);


        })
    },[])

    const [ratings,setRatings]=useState({});
    const [score,setScore]=useState({});
    React.useEffect(()=>{
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL}/rating/ratingbyevent/${idEvent}`,
            headers: {
                'Authorization': 'Bearer ' + getToken()
            }
        }).then((response)=>{
            setRatings(response.data)
            setScore(response.data.map((s)=>s.scoreRating))

        })
    },[])
const rat= Object.keys(ratings).map((key) => ratings[key]);
    const r=rat.filter((e)=>e.event.done===true)
    const s = Object.keys(score).map((key) => score[key]);
    const sum = s.reduce((accumulator, value) => {
        return accumulator + value;
    }, 0);
   const arr= r.map((u)=>u.user.id)
   const exit= arr.includes(userData.id)

    return(
       exit ? (<StyledRating
               name="customized-color"
               defaultValue={0}
               getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
               precision={0.5}
               icon={<FavoriteIcon fontSize="inherit" />}
               emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}



           />):(
      <StyledRating
            name="customized-color"
            defaultValue={0}
            getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
            precision={0.5}
            icon={<FavoriteIcon fontSize="inherit" />}
            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}

            onClick={(e) => {
                axios({
                    method: "post",
                    url: `${process.env.REACT_APP_API_URL}/rating/add/${userData.id}/${idEvent}`,
                    data: {
                        scoreRating:e.target.value


                    },
                    headers: {
                        'Authorization': 'Bearer ' + getToken()
                    }

                })
                window.location.reload();
            }}

        />
        )
    )
}