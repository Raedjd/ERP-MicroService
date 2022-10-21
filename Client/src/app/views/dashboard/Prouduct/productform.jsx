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


export default function FormDialogProduct() {
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
            setRl(response.data.role=="Enginner");

        })
    },[])
    const [depData,setDepData]=useState([{}]);
    React.useEffect(()=>{
        fetchDepartmentData().then((response)=>{
            setDepData(response.data);
        })
    },[])
    const [nameProduct,setNameProduct]=useState("");
    const [nameDep,setNameDep]=useState("");
    const addProduct = async (e) => {
        e.preventDefault();
        await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}/product/add/${nameDep}`,

            data: {
                nameProduct:nameProduct,
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
                Add product(Except that Enginner)
            </Fab>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form >
                <DialogTitle id="form-dialog-title">Add product</DialogTitle>

                <DialogContent>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="product"
                        label="Name of product"
                        type="text"
                        fullWidth
                        onChange={(e) =>setNameProduct(e.target.value)}
                        value={nameProduct}
                        sx={{ width: 400}}
                    />
                    <Autocomplete
                        options={depData}
                        getOptionLabel={(option) => option.nameDepart}
                        onChange={(e , v) => setNameDep(v.nameDepart) }
                        renderInput={(params) => (
                            <TextField {...params} label="Assign to department" variant="outlined" fullWidth
                                       sx={{ width: 400}}


                            />
                        )}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" color="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={addProduct} color="primary" disabled={!nameProduct || !nameDep}>
                        save
                    </Button>

                </DialogActions>
            </form>
            </Dialog>
        </Box>
    );
}