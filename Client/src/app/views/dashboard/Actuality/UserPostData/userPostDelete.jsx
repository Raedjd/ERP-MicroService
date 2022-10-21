import React, { useState } from 'react';
import axios from "axios";
import {fetchUserData, getToken} from "../../../../auth/RoutsData";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
export default function UserPostDelete({userAdd,idPost}) {
    const [userDataId,setUserDataId]=useState(false);

    React.useEffect(()=>{
        fetchUserData().then((response)=>{
            setUserDataId(response.data.id==userAdd);

        })
    },[])

    const deletePost = async (e) => {
        e.preventDefault();
        await axios({
            method: "delete",
            url: `${process.env.REACT_APP_API_URL}/post/delete/${idPost}`,
            headers: {
                'Authorization': 'Bearer ' + getToken()},



        })
            .then((res) => {
                window.location.reload();
            })
    };

    return (
        <div type="submit" hidden={!userDataId} onClick={deletePost}>
            <IconButton aria-label="share"  >
                <DeleteIcon></DeleteIcon>
            </IconButton>
        </div>
    );
}
