import {Box, Fab, Icon} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import React, {useState} from 'react';
import axios from "../../../../axios";
import {fetchUserData, getToken} from "../../../auth/RoutsData";

export default function FormDialogToolsupdate({idTools, Add}) {
    const [open, setOpen] = React.useState(false);
    function handleClickOpen() {
        setOpen(true);
    }
    function handleClose() {
        setOpen(false);
    }
    const [nameTools,setNameTools]=useState('');
    const [nbrTools,setNbrTools]=useState('');
    const updateTools = async (e) => {
        e.preventDefault();
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}/tools/update/${idTools}`,
            data: {
                nameTools: nameTools,
                nbrTools:nbrTools
            },
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
    console.log(yes)
    return (
        <Box>
            <Fab variant="outlined" aria-label="Edit" className="button" onClick={handleClickOpen} disabled={!yes}>
                <Icon>edit_icon</Icon>
            </Fab>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Update tools</DialogTitle>
                <form >
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="New name of tools"
                            type="text"
                            fullWidth
                            id="nameTools"
                            onChange={(e) =>setNameTools(e.target.value)}
                            value={nameTools}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="New number of tools"
                            type="number"
                            fullWidth
                            id="numberTools"
                            onChange={(e) =>setNbrTools(e.target.value)}
                            value={nbrTools}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" color="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button onClick={updateTools}   color="primary" disabled={!nameTools}>
                            update
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
}