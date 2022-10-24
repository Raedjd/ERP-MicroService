import {Box, Icon, IconButton, styled, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import SimpleTable from "../../material-kit/tables/SimpleTable";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {useEffect, useState} from "react";
import axios from "axios";
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import AddUser from './AddUser';
import { Add, CheckCircleOutline, DoDisturbOff, DoDisturbOn, Edit, PlusOneOutlined } from "@mui/icons-material";
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




const Listusers = ( {email}) => {
    const [usersData, setUsersData] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    useEffect(() => {
        fetchUsers();
    }, []);
    const fetchUsers = async () => {
        try {
            const data = await axios.get(
                `http://localhost:8085/api/auth/findAllUsers`
            );
            setUsersData(data.data);
        } catch (err) {
            console.log(err);
        }
    };

    const sendEmail= async () => {
        await axios({
            method: "post",
            url: `http://localhost:5000/api/send_email`,
            data: {
                email:email
            },
        }).then((response)=>{
            window.location.reload();
        })
    };

    return (

        <Container>
            {showAdd && <AddUser setAddShow={setShowAdd}/>}

            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "List", path: "/users" }, { name: "Users" }]} />
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
                <SupervisedUserCircleIcon style={{ marginRight: "16px" }} /> Add User
            </button>
            <SimpleCard title="Users Table">
                <Box width="100%" overflow="auto">
                    <StyledTable>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">username</TableCell>
                                <TableCell align="left">email</TableCell>
                                <TableCell align="left">role</TableCell>
                                <TableCell align="left">Send invitation</TableCell>
                                <TableCell align="left">
                                    Edit
                                </TableCell>
                                <TableCell align="left">Delete</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>

                            {usersData &&
                                usersData.map((e, i) => (<TableRow key={i}>
                                    <TableCell align="left">{e.username}</TableCell>
                                    <TableCell align="left" style={{textOverflow: 'ellipsis',overflow: 'hidden',whiteSpace: 'nowrap' }}>{e.email}</TableCell>
                                    <TableCell align="left">{e.roles[0].name}</TableCell>
                                    <TableCell align="left">
                                    <CheckCircleOutline style={{ color: "green", cursor: "pointer" }} key={i}  email={e.email} onClick={ () => {sendEmail()}} ></CheckCircleOutline>
                                 

                                    </TableCell>
                                    <TableCell align="left">
                                        <EditIcon/>
                                    </TableCell>
                                    <TableCell align="left">
                                        <DeleteForeverIcon
                                            style={{ color: "red", cursor: "pointer" }}
                                            onClick={() => {
                                                axios.delete(
                                                    `http://localhost:8085/api/auth/delete/${e.id}`
                                                );
                                                window.location.reload();
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>))}

                        </TableBody>
                    </StyledTable>
                </Box>
            </SimpleCard>


        </Container>
    );
};

export default Listusers;
