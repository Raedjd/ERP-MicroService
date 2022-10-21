import React, { useState } from 'react';
import axios from "axios";
import { fetchUserData, getToken} from "../../../../auth/RoutsData";
import Feedback from '@mui/icons-material/Feedback';
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {TransitionProps} from "@mui/material/transitions";
import Slide from "@mui/material/Slide";
import FeedbackComment from "./cardFeedback";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function FeedbackPost({userAdd,idPost}) {
    const [userDataId,setUserDataId]=useState(false);

    React.useEffect(()=>{
        fetchUserData().then((response)=>{
            setUserDataId(response.data.id==userAdd);

        })
    },[])

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [userData,setUserData]=useState("");
    React.useEffect(()=>{
        fetchUserData().then((response)=>{
            setUserData(response.data);


        })
    },[])


    const [feedback,setFeedback]=useState("");
    const idUser=userData.id
    const addFeedback = async (e) => {
        e.preventDefault();
        await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}/comment/add/${idUser}/${idPost}`,

            data: {
                comment:feedback

            },
            headers: {
                'Authorization': 'Bearer ' + getToken()
            }
        }).then((response)=>{
            window.location.reload();
        })

    }

    return (
        <div>

            <div   onClick={handleClickOpen}>
                <IconButton aria-label="feedback" >
                 <Feedback></Feedback>
                </IconButton>
            </div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >

                <form>
                    <DialogTitle>{"Add Feedback"}</DialogTitle>
                    <DialogContent>


                        <TextField
                            autoFocus
                            margin="dense"
                            id="title"
                            label="Feedback"
                            type="text"
                            fullWidth
                            onChange={(e) =>setFeedback(e.target.value)}
                            value={feedback}
                            sx={{ width: 530}}
                            placeholder={"Write here..."}

                        />

                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" color="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button  color="primary" onClick={addFeedback}  >
                            save
                        </Button>
                    </DialogActions>
                </form>
                <FeedbackComment idPost={idPost}></FeedbackComment>

            </Dialog>
        </div>
    )
}