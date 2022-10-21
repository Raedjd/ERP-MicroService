
import {Box, Fab, Icon, styled, Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import axios from "axios";
import {getToken} from "../../../auth/RoutsData";


const StyledTable = styled(Table)(() => ({
    whiteSpace: "pre",
    "& thead": {
        "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
    },
    "& tbody": {
        "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
    },
}));


export default function ProductbyUser({userAdd}) {
    function SimpleDialog(props) {
        const { onClose, selectedValue, ...other } = props;

        function handleClose() {
            onClose(selectedValue);
        }

        return (
            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" {...other}>


                <Box width="100%" overflow="auto">

                    <StyledTable>

                        <TableHead>
                            <TableRow>


                                <TableCell align="left">Avatar</TableCell>
                                <TableCell align="center">First Name</TableCell>
                                <TableCell align="center">Last Name</TableCell>
                                <TableCell align="center">Role</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                                    <TableRow>

                                        <TableCell align="center"><ListItemAvatar>
                                            <Avatar src={userImageAction}>

                                            </Avatar>
                                        </ListItemAvatar></TableCell>
                                        <TableCell align="center">{userAction.firstName}</TableCell>
                                        <TableCell align="center">{userAction.lastName}</TableCell>
                                        <TableCell align="center">{userAction.role}</TableCell>

                                    </TableRow>

                        </TableBody>
                    </StyledTable>


                </Box>

            </Dialog>
        );
    }

    SimpleDialog.propTypes = {
        open: PropTypes.bool,
        onClose: PropTypes.func,
        selectedValue: PropTypes.string,
    };


    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('user02@gmail.com');

    const handleClickOpen = () => setOpen(true);

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };
    const [userAction,setUserAction]=useState({});
    const [userImageAction,setUserImageAction]=useState("");
    React.useEffect(()=>{
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL}/user/findOne/${userAdd}`,
            headers: {
                'Authorization': 'Bearer ' + getToken()
            }
        }).then((response)=>{
            setUserAction(response.data);
            setUserImageAction(response.data.image.imageUrl)

        })
    },[])

    return (
        <Box>

            <Fab variant="extended" aria-label="Delete" className="button"  onClick={handleClickOpen}>
                <Icon>visibility</Icon>
            </Fab>
            <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose}/>
        </Box>
    );
}
