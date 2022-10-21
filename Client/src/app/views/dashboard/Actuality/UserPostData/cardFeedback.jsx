import React, { useState } from 'react';

import Avatar from "@mui/material/Avatar";
import {Divider, Grid, Paper, TextareaAutosize} from "@mui/material";
import axios from "../../../../../axios";
import {fetchUserData, getToken} from "../../../../auth/RoutsData";
import {dateParser} from "../../utilis";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


export default function FeedbackComment({idPost}) {
    const [isUpdated, setIsUpdated] = useState(true);
    const [com, setCom] = useState("");
    const updateItem = () => {
        setIsUpdated(false);
    };

    const [userData,setUserData]=useState("");
    React.useEffect(()=>{
        fetchUserData().then((response)=>{
            setUserData(response.data.id);


        })
    },[])

    const [feedback,setFeedback]=useState([]);
    React.useEffect(()=>{
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL}/comment/commentbypost/${idPost}`,
            headers: {
                'Authorization': 'Bearer ' + getToken()
            }
        }).then((response)=>{
            setFeedback(response.data)

        })
    },[])

    const feedbacks = Object.keys(feedback).map((key) => feedback[key]).sort((a,b)=>b.id-a.id)

return(
        feedbacks
                .map((f, index) => (
                <Paper style={{ padding: "40px 20px" }} key={index}>
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                            <Avatar alt="Remy Sharp"  src={f.user.image.imageUrl} />
                        </Grid>

                        <Grid justifyContent="left" item xs zeroMinWidth>
                            <h4 style={{ margin: 0, textAlign: "left" }}>{f.user.username}</h4>
                            {dateParser(f.dateCreation)}
                            <p style={{ textAlign: "left" }}>
                                <TextareaAutosize
                                    aria-label="minimum height"
                                    minRows={3}
                                    placeholder={f.comment}
                                    style={{ width: 480 }}
                                    disabled={isUpdated || f.user.id!==userData}
                                    onChange={(e) =>setCom(e.target.value)}
                                    value={com}


                                />
                                <small hidden={f.user.id!==userData}>
                                    <Button variant="outlined" color="inherit" size="small"
                                            onClick={() => {
                                                axios({
                                                    method: "delete",
                                                    url: `${process.env.REACT_APP_API_URL}/comment/delete/${f.id}`,
                                                })
                                                    .then((response) => {
                                                        window.location.reload();
                                                    })

                                            }}>
                                        <DeleteIcon></DeleteIcon>
                                    </Button>

                                <Button variant="outlined" color="inherit" size="small" onClick={updateItem}
                                      >
                                    <EditIcon></EditIcon>
                                </Button>
                                    <small hidden={isUpdated || f.user.id!==userData} >
                                        <Button variant="outlined" color="inherit" size="small"
                                                onClick={() => {
                                                    axios({
                                                        method: "put",
                                                        url: `${process.env.REACT_APP_API_URL}/comment/update/${f.id}`,
                                                        data: {
                                                            comment: com
                                                        },
                                                        headers: {
                                                            'Authorization': 'Bearer ' + getToken()
                                                        },

                                                    })
                                                        .then((res) => {
                                                        })
                                                    window.location.reload();
                                                } }>
                                            update
                                        </Button>
                                    </small>

                                </small>
                            </p>

                        </Grid>
                    </Grid>
                    <Divider variant="fullWidth" style={{ margin: "30px 0" }} />

                </Paper>
                ))



    )
}