
import {Box, Fab, Icon} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import React, {useState} from 'react';
import axios from "../../../../axios";
import {fetchUserData, getToken} from "../../../auth/RoutsData";

export default function FormDialogEventdelete({idEvent, Add}) {
    const [open, setOpen] = React.useState(false);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    const deleteEvent = async (e) => {
        e.preventDefault();

        await axios({
            method: "delete",
            url: `${process.env.REACT_APP_API_URL}/event/delete/${idEvent}`,
            headers: {
                'Authorization': 'Bearer ' + getToken()
            }
        }).then((response)=>{
            window.location.reload();
        })

    }

    const [yes,setYes]=useState(false);
    React.useEffect(()=>{
        fetchUserData().then((response)=>{
            setYes(response.data.id==Add);


        })
    },[])


    return (
        <Box>
            <Fab variant="outlined" aria-label="Delete" className="button" onClick={handleClickOpen} disabled={!yes}>
                <Icon>delete</Icon>

            </Fab>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Are sure?</DialogTitle>

                <DialogActions>
                    <Button variant="outlined" color="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={deleteEvent}   color="primary" >
                        Delete
                    </Button>

                </DialogActions>

            </Dialog>
        </Box>
    );
}
