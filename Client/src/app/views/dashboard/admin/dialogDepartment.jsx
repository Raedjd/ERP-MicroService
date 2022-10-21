
import {Box, Fab, Icon} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import React, {useState} from 'react';
import axios from "../../../../axios";
import {getToken} from "../../../auth/RoutsData";

export default function FormDialogDep({idDep}) {
    const [open, setOpen] = React.useState(false);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    const [nameDepart,setNameDepart]=useState('');
    const updateDepartment = async (e) => {
        e.preventDefault();

        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}/dep/update/${idDep}`,

            data: {
                nameDepart: nameDepart

            },
            headers: {
                'Authorization': 'Bearer ' + getToken()
            }
        }).then((response)=>{
            window.location.reload();
        })

    }
    return (
        <Box>
            <Fab variant="outlined" aria-label="Edit" className="button" onClick={handleClickOpen}>
                <Icon>edit_icon</Icon>

            </Fab>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Update department</DialogTitle>
                <form >
                <DialogContent>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="New name of department"
                        type="text"
                        fullWidth
                        id="nameDepart"
                        onChange={(e) =>setNameDepart(e.target.value)}
                        value={nameDepart}

                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" color="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={updateDepartment}   color="primary" disabled={!nameDepart}>
                        update
                    </Button>

                </DialogActions>
            </form>
            </Dialog>
        </Box>
    );
}
