
import {Box, styled, Table, TableBody, TableCell, TableHead, TableRow, Fab, Icon} from '@mui/material';

import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';

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


export default function Tool({tools}) {

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
                                <TableCell align="left">ID</TableCell>
                                <TableCell align="center">Name of Tools</TableCell>
                                <TableCell align="center">Number of tools</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {toolss
                                .map((t, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="left">{index+1}</TableCell>
                                        <TableCell align="center">{t.nameTools}</TableCell>
                                        <TableCell align="center">{t.nbrTools}</TableCell>

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

    const fetchToolsByDep=(authRequest)=> {
        return axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL}/tools/toolsbydepart/${tools}`,
            headers: {
                'Authorization': 'Bearer ' + getToken()
            }
        })
    }
    const [toolsData,setToolsData]=useState({});

    React.useEffect(()=>{
        fetchToolsByDep().then((response)=>{
            setToolsData(response.data);
        })
    },[])
    const toolss = Object.keys(toolsData).map((key) => toolsData[key]);
    return (
        <Box>



            <Fab variant="extended" aria-label="Delete" className="button"  onClick={handleClickOpen}>
                <Icon>visibility</Icon>
            </Fab>
            <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose}/>
        </Box>
    );
}

