import FavoriteIcon from "@mui/icons-material/Favorite";
import React, {useState} from "react";
import {fetchUserData, getToken} from "../../../../auth/RoutsData";
import axios from "axios";
import IconButton from "@mui/material/IconButton";


export default function LikePost({idPost}) {



    const [userData,setUserData]=useState({});
    React.useEffect(()=>{
        fetchUserData().then((response)=>{
            setUserData(response.data);


        })
    },[])

    const [love,setLove]=useState([]);
    React.useEffect(()=>{
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL}/love/lovebypost/${idPost}`,
            headers: {
                'Authorization': 'Bearer ' + getToken()
            }
        }).then((response)=>{
            setLove(response.data.map((i)=>i.user.id))

        })
    },[])
    const l = Object.keys(love).map((key) => love[key]);
   const exit=l.includes(userData.id)

    return(
        <div hidden={exit}>
            <IconButton aria-label="add to favorites"
                        onClick={(e) => {
                            axios({
                                method: "post",
                                url: `${process.env.REACT_APP_API_URL}/love/add/${userData.id}/${idPost}`,
                                data: {
                                    nbrLike:1


                                },
                                headers: {
                                    'Authorization': 'Bearer ' + getToken()
                                }

                            })
                            window.location.reload();
                        }}>
                <FavoriteIcon />
            </IconButton>

        </div>

    )
}