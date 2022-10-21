
import {alpha, Box, Fab, Icon, styled, Switch, Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import axios from "axios";
import {getToken} from "../../../auth/RoutsData";
import {pink} from "@mui/material/colors";
const StyledTable = styled(Table)(() => ({
    whiteSpace: "pre",
    "& thead": {
        "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
    },
    "& tbody": {
        "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
    },
}));


const GreenSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
        color: pink[600],
        '&:hover': {
            backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
        },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: pink[600],
    },
}));

const label = { inputProps: { 'aria-label': 'Switch demo' } };
export default function Users({user}) {

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
                                <TableCell align="left"></TableCell>
                                <TableCell align="left">Avatar</TableCell>
                                <TableCell align="center">First Name</TableCell>
                                <TableCell align="center">Last Name</TableCell>
                                <TableCell align="center">Role</TableCell>
                                <TableCell align="center">Blocked</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users
                                .map((u, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="center">{index+1}</TableCell>
                                        <TableCell align="center"><ListItemAvatar>
                                            <Avatar src={u.image.imageUrl}>

                                            </Avatar>
                                        </ListItemAvatar></TableCell>
                                        <TableCell align="center">{u.firstName}</TableCell>
                                        <TableCell align="center">{u.lastName}</TableCell>
                                        <TableCell align="center">{u.role}</TableCell>
                                        <TableCell align="center">
                                            {u.isBlocked ? (<Switch {...label} color="warning" checked={u.isBlocked}
                                                                    onClick={() => {
                                                                        axios({
                                                                            method: "put",
                                                                            url: `${process.env.REACT_APP_API_URL}/user/blocked/${u.id}`,

                                                                            data: {
                                                                                isBlocked:false

                                                                            },
                                                                            headers: {
                                                                                'Authorization': 'Bearer ' + getToken()
                                                                            }

                                                                        })
                                                                            .then((response) => {
                                                                                window.location.reload();
                                                                            })


                                                                    }}
                                            />):(<Switch {...label} color="warning"
                                                                       onClick={() => {
                                                                           axios({
                                                                               method: "put",
                                                                               url: `${process.env.REACT_APP_API_URL}/user/blocked/${u.id}`,

                                                                               data: {
                                                                                   isBlocked:true

                                                                               },
                                                                               headers: {
                                                                                   'Authorization': 'Bearer ' + getToken()
                                                                               }

                                                                           })
                                                                               .then((response) => {

                                                                               })


                                                                       }}
                                            />)}
                                            </TableCell>

                                    </TableRow>
                                ))}
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

    const fetchUserByDep=(authRequest)=> {
        return axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL}/user/userbydepart/${user}`,
            headers: {
                'Authorization': 'Bearer ' + getToken()
            }
        })
    }
    const [userData,setUserData]=useState({});

    React.useEffect(()=>{
        fetchUserByDep().then((response)=>{
            setUserData(response.data);
        })
    },[])
    const users = Object.keys(userData).map((key) => userData[key]);
    return (
        <Box>

            <Fab variant="extended" aria-label="Delete" className="button"  onClick={handleClickOpen}>
                <Icon>visibility</Icon>
            </Fab>
            <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose}/>
        </Box>
    );
}

