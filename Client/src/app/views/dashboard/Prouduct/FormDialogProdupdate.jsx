
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

export default function FormDialogProdupdate({idProd, Add}) {
    const [open, setOpen] = React.useState(false);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    const [nameProduct,setNameProduct]=useState('');
    const updateProduct = async (e) => {
        e.preventDefault();

        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}/product/update/${idProd}`,

            data: {
                nameProduct: nameProduct

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
                            id="name"
                            label="New name of department"
                            type="text"
                            fullWidth
                            id="nameProduct"
                            onChange={(e) =>setNameProduct(e.target.value)}
                            value={nameProduct}

                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" color="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button onClick={updateProduct}   color="primary" disabled={!nameProduct}>
                            update
                        </Button>

                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
}
