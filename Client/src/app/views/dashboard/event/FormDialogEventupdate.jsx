
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

export default function FormDialogEventupdate({idEvent, Add}) {
    const [open, setOpen] = React.useState(false);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const [place,setPlace]=useState("");
    const [startDate,setStartDate]=useState("");
    const [endDate,setEndDate]=useState("");
    const updateEvent = async (e) => {
        e.preventDefault();

        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}/event/update/${idEvent}`,

            data: {
                title:title,
                description:description,
                place:place,
                startDate:startDate,
                endDate:endDate,

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


    return (
        <Box>
            <Fab variant="outlined" aria-label="Edit" className="button" onClick={handleClickOpen} disabled={!yes}>
                <Icon>edit_icon</Icon>

            </Fab>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Update product</DialogTitle>
                <form >
                    <DialogContent>

                        <TextField
                            autoFocus
                            margin="dense"
                            id="title"
                            label="Title"
                            type="text"
                            fullWidth
                            onChange={(e) =>setTitle(e.target.value)}
                            value={title}

                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="description"
                            label="Description"
                            type="text"
                            fullWidth
                            onChange={(e) =>setDescription(e.target.value)}
                            value={description}

                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="place"
                            label="Place"
                            type="text"
                            fullWidth
                            onChange={(e) =>setPlace(e.target.value)}
                            value={place}

                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="startdate"
                            label="Start date"
                            type="datetime-local"
                            fullWidth
                            onChange={(e) =>setStartDate(e.target.value)}
                            value={startDate}

                        />

                        <TextField
                            autoFocus
                            margin="dense"
                            id="enddate"
                            label="End date"
                            type="datetime-local"
                            fullWidth
                            onChange={(e) =>setEndDate(e.target.value)}
                            value={endDate}

                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" color="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button onClick={updateEvent}   color="primary"  disabled={!title || !description || !place || !startDate || !endDate}>
                            update
                        </Button>

                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
}
