import {Autocomplete, Box, Fab, Icon} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import React , {useState} from "react";
import {fetchDepartmentData, fetchUserData, getToken} from "../../../auth/RoutsData";
import axios from "../../../../axios";


export default function FormDialogTools() {
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
            setRl(response.data.role==="Admin");

        })
    },[])
    const [depData,setDepData]=useState([{}]);
    React.useEffect(()=>{
        fetchDepartmentData().then((response)=>{
            setDepData(response.data);
        })
    },[])
    const [nameTools,setNameTools]=useState("");
    const [nbrTools,setNbrTools]=useState();
    const [nameDep,setNameDep]=useState("");
    const addTools = async (e) => {
        e.preventDefault();
        await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}/tools/add/${nameDep}`,

            data: {
                nameTools:nameTools,
                nbrTools:nbrTools,
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
                Add tools(Except that Admin)
            </Fab>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form >
                    <DialogTitle id="form-dialog-title">Add tools</DialogTitle>

                    <DialogContent>

                        <TextField
                            autoFocus
                            margin="dense"
                            id="tools"
                            label="Name of tools"
                            type="text"
                            fullWidth
                            onChange={(e) =>setNameTools(e.target.value)}
                            value={nameTools}


                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="tools"
                            label="number of tools"
                            type="number"
                            fullWidth
                            onChange={(e) =>setNbrTools(e.target.value)}
                            value={nbrTools}

                        />


                        <Autocomplete
                            options={depData}
                            getOptionLabel={(option) => option.nameDepart}
                            onChange={(e , v) => setNameDep(v.nameDepart) }
                            renderInput={(params) => (
                                <TextField {...params} label="Assign to department" variant="outlined" fullWidth



                                />
                            )}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" color="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button onClick={addTools} color="primary" disabled={!nameTools || !nbrTools || !nameDep}>
                            save
                        </Button>

                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
}