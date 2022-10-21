
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


export default function EventByparticipant({idEvent}) {
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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {participants
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
    const [participantsData,setParticapantsData]=useState({});
    React.useEffect(()=>{
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL}/event/findOne/${idEvent}`,
            headers: {
                'Authorization': 'Bearer ' + getToken()
            }
        }).then((response)=>{
            setParticapantsData(response.data.users);


        })
    },[])
    const participants = Object.keys(participantsData).map((key) => participantsData[key]);

    return (
        <Box>

            <Fab variant="extended" aria-label="Delete" className="button"  onClick={handleClickOpen}>
                <Icon>visibility</Icon>
            </Fab>
            <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose}/>
        </Box>
    );
}
