import {Autocomplete, Box, Fab, Icon, styled} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import React , {useState} from "react";
import {fetchDepartmentData, fetchUserData, getToken} from "../../../auth/RoutsData";
import axios from "../../../../axios";

export default function FormDialogEvent() {
    const [open, setOpen] = React.useState(false);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }
    const [userData,setUserData]=useState("");
    const [rl,setRl]=useState(true);
    React.useEffect(()=>{
        fetchUserData().then((response)=>{
            setUserData(response.data);
            setRl(response.data.role=="RH");

        })
    },[])

    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const [place,setPlace]=useState("");
    const [startDate,setStartDate]=useState("");
    const [endDate,setEndDate]=useState("");
    const addEvent = async (e) => {
        e.preventDefault();
        await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}/event/add`,

            data: {
                title:title,
                description:description,
                place:place,
                startDate:startDate,
                endDate:endDate,
                userid:userData.id


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

            <Fab variant="extended" aria-label="Delete" className="button" onClick={handleClickOpen} disabled={!rl}>
                <Icon sx={{ mr: 4 }}>add_circle_outline</Icon>
                Add event (Except that HR)
            </Fab>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form >
                    <DialogTitle id="form-dialog-title">Add Event</DialogTitle>

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
                        <Button onClick={addEvent} color="primary" disabled={!title || !description || !place || !startDate || !endDate}>
                            save
                        </Button>

                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
}