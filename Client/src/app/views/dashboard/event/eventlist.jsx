import {
    Box,
    Card, Fab,
    styled,
    Table,
    TableBody,
    TableCell,
    TableHead, TablePagination,
    TableRow,

} from '@mui/material';

import React, {useState} from "react";
import {fetchEventsData, fetchUserData,} from "../../../auth/RoutsData";
import EventbyUser from "./SimpleDialogUserevent";
import FormDialogEventupdate from "./FormDialogEventupdate";
import FormDialogEventdelete from "./FormDialogEventdelete";
import Participation from "./participation";
import DoneEvent from "./done";
import EventDescription from "./descriptionEvent";

const CardHeader = styled(Box)(() => ({
    display: 'flex',
    paddingLeft: '24px',
    paddingRight: '24px',
    marginBottom: '12px',
    alignItems: 'center',
    justifyContent: 'space-between',
}));

const Title = styled('span')(() => ({
    fontSize: '1rem',
    fontWeight: '500',
    textTransform: 'capitalize',
}));


const StyledTable = styled(Table)(({ theme }) => ({
    whiteSpace: "pre",
    "& thead": {
        "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
    },
    "& tbody": {
        "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
    },
}));



const Eventlist = ({iduser}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const [EventsData,setEventsData]=useState({});
    React.useEffect(()=>{
        fetchEventsData().then((response)=>{
            setEventsData(response.data);

        })
    },[])
    const events = Object.keys(EventsData).map((key) => EventsData[key]);

    const [userData,setUserData]=useState("");
    React.useEffect(()=>{
        fetchUserData().then((response)=>{
            setUserData(response.data);


        })
    },[])

    return (
        <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
            <CardHeader>
                <Title>All Events</Title>

            </CardHeader>

            <Box width="100%" overflow="auto">

                <StyledTable>

                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Number</TableCell>
                            <TableCell align="center">Title</TableCell>
                            <TableCell align="center">Place</TableCell>
                            <TableCell align="center">Description</TableCell>
                            <TableCell align="center">date Added</TableCell>
                            <TableCell align="center">Start event</TableCell>
                            <TableCell align="center">End event</TableCell>
                            <TableCell align="center">Added by</TableCell>
                            <TableCell align="center">Update </TableCell>
                            <TableCell align="center">Delete</TableCell>
                            <TableCell align="center">Participation</TableCell>
                            <TableCell align="center">Done</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {events
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((e, index) => (
                                <TableRow key={index}>
                                    <TableCell align="center">   <Fab variant="extended" aria-label="Delete" className="button"  >{index+1}   </Fab></TableCell>
                                    <TableCell align="center">{e.title}</TableCell>
                                    <TableCell align="center">{e.place}</TableCell>
                                    <TableCell align="center"><EventDescription key={index} idEvent={e.id} ></EventDescription> </TableCell>
                                    <TableCell align="center">{e.dateCreation}</TableCell>
                                    <TableCell align="center">{e.startDate}</TableCell>
                                    <TableCell align="center">{e.endDate}</TableCell>
                                  <TableCell align="center" ><EventbyUser key={index}  userAdd={e.userid}></EventbyUser></TableCell>
                                   <TableCell align="center"><FormDialogEventupdate key={index} idEvent={e.id}  Add={e.userid}></FormDialogEventupdate></TableCell>
                                   <TableCell align="center"><FormDialogEventdelete key={index} idEvent={e.id}  Add={e.userid}></FormDialogEventdelete></TableCell>
                                    <TableCell align="center"><Participation key={index} idEvent={e.id}  userId={userData.id}></Participation></TableCell>
                                    <TableCell align="center"><DoneEvent key={index} idEvent={e.id} Add={e.userid}></DoneEvent></TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </StyledTable>

                <TablePagination
                    sx={{ px: 2 }}
                    page={page}
                    component="div"
                    rowsPerPage={rowsPerPage}
                    count={events.length}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    nextIconButtonProps={{ "aria-label": "Next Page" }}
                    backIconButtonProps={{ "aria-label": "Previous Page" }}
                />
            </Box>
        </Card>
    );
};

export default Eventlist;