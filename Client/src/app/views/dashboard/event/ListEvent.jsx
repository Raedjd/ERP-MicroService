import {
    Box,
    Icon,
    IconButton,
    styled,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Breadcrumb, SimpleCard } from "app/components";
import axios from "axios";
import React, {useState} from "react";
import EditIcon from '@mui/icons-material/Edit';
import AddEvent from "./AddEvent";
import EventRating from "./EventRating";
import ScoreEvent from "./ScoreEvent";
import EditEvent from "./EditEvent";
const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
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

const ListEvent = () => {

    const [showAdd, setShowAdd] = useState(false);
    const [EventsData,setEventsData]=useState({});

    React.useEffect(()=>{
        axios({
            method: 'GET',
            url: `http://localhost:8762/event-service/event/findAll`,

        }).then((response)=>{
            setEventsData(response.data);


        })
    },[])
    console.log(EventsData)
    const events = Object.keys(EventsData).map((key) => EventsData[key]);

    return (
        <Container>
            {showAdd && <AddEvent setAddShow={setShowAdd} />}
            <Box className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: "List", path: "/events" },
                        { name: "Events" },
                    ]}
                />
            </Box>
            <button
                onClick={() => setShowAdd(true)}
                style={{
                    marginBottom: "15px",
                    padding: "5px 15px",
                    backgroundColor: "green",
                    fontSize: "14px",
                    color: "white",
                    cursor: "pointer",
                    border: "none",
                    outline: "none",
                    borderRadius: "5px",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <PersonAddIcon style={{ marginRight: "16px" }} /> add event
            </button>

            <SimpleCard title="Events Table">
                <Box width="100%" overflow="auto">
                    <StyledTable>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Title</TableCell>
                                <TableCell align="center">Description</TableCell>
                                <TableCell align="center">Place</TableCell>
                                <TableCell align="center">Start Date</TableCell>
                                <TableCell align="center">End Date</TableCell>
                                <TableCell align="center">Created_At</TableCell>
                                <TableCell align="center">Rating</TableCell>
                                <TableCell align="center">Score of Rating</TableCell>
                                <TableCell align="right">Update</TableCell>
                                <TableCell align="right">Delete</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {events  &&
                            events .map((e, i) => (
                                <TableRow key={i}>
                                    <TableCell align="left">{e.title}</TableCell>
                                    <TableCell align="center">{e.description}</TableCell>
                                    <TableCell align="center">{e.place}</TableCell>
                                    <TableCell align="center">{e.startDate}</TableCell>
                                    <TableCell align="center">{e.endDate}</TableCell>
                                    <TableCell align="center">{e.dateCreation}</TableCell>
                                    <TableCell align="center"><EventRating key={i}  idEvent={e.id} /></TableCell>
                                    <TableCell align="center"><ScoreEvent key={i}  idEvent={e.id} /></TableCell>
                                    <TableCell align="right">

                                            {showAdd && <EditEvent setAddShow={setShowAdd} key={i}  idEvent={e.id} />}


                                                <EditIcon  style={{ marginRight: "16px" }} onClick={() => setShowAdd(true)} />


                                    </TableCell>
                                    <TableCell align="right">
                                        <DeleteForeverIcon
                                            style={{ color: "red", cursor: "pointer" }}
                                            onClick={() => {
                                                axios.delete(
                                                    `http://localhost:8762/event-service/event/delete/${e.id}`
                                                );
                                                window.location.reload();
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </StyledTable>
                </Box>
            </SimpleCard>
        </Container>
    );
};

export default ListEvent;
