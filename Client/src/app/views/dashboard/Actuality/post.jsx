import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import {Fab, Icon} from "@mui/material";
import TextField from "@mui/material/TextField";

import axios from "../../../../axios";
import {fetchUserData, getToken} from "../../../auth/RoutsData";
import {useState} from "react";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function PostbyUser() {
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
            setUserData(response.data);;

        })
    },[])
    const [image, setImage] = useState("");
const [description,setDescription]=useState("");
    const addPost = async (e) => {
        e.preventDefault();

        if (!image.size > 1024 * 1024) console.log("Size too large.");

        let data = new FormData();
        data.append("multipartFile", image);
        data.append("description", description);
        data.append("userid", userData.id);

        await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}/cloudinary/addpost`,
             data,
            headers: { "content-type": "multipartFile/form-data",
                'Authorization': 'Bearer ' + getToken()},

        })
            .then((res) => {
                console.log(res.data);
                window.location.reload();
            })
    };


    return (
        <div>

            <Fab variant="extended"  aria-label="Delete" className="button" onClick={handleClickOpen} >
                <Icon sx={{ mr: 4 }}>add_circle_outline</Icon>
                Add post
            </Fab>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >

                <form>
                    <DialogTitle>{"Add post (File is required)"}</DialogTitle>
                <DialogContent>


                        <TextField
                            autoFocus
                            margin="dense"
                            id="title"
                            type="text"
                            fullWidth
                            sx={{ width: 550}}
                             placeholder={"Write here..."}
                            onChange={(e) =>setDescription(e.target.value)}
                            value={description}

                        />
                    <input
                        name="avatar"
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    <p>File size should be under 1024MB .</p>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" color="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button  color="primary" onClick={addPost} disabled={!description} >
                        save
                    </Button>
                </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}

