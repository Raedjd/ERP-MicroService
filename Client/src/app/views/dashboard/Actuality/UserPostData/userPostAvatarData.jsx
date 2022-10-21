
import Avatar from '@mui/material/Avatar';
import React, { useState } from 'react';
import axios from "axios";
import {getToken} from "../../../../auth/RoutsData";

export default function UserPostAvatarData({userAdd}) {
    const [userImageAction,setUserImageAction]=useState("");
    React.useEffect(()=>{
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL}/user/findOne/${userAdd}`,
            headers: {
                'Authorization': 'Bearer ' + getToken()
            }
        }).then((response)=>{
            setUserImageAction(response.data.image.imageUrl)

        })
    },[])


        return (
            <Avatar src={userImageAction}   >
            </Avatar>
        );
    }





