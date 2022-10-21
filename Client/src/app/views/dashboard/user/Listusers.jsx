import {
    Box,
    Fab,
    styled,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import React, {useState} from "react";
import {fetchUsersData} from "../../../auth/RoutsData";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";



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




const Listusers = () => {


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const [usersData,setUsersData]=useState({});
    React.useEffect(()=>{
        fetchUsersData().then((response)=>{
            setUsersData(response.data);

        })
    },[])
    const users = Object.keys(usersData).map((key) => usersData[key]);

    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "List", path: "/users" }, { name: "Users" }]} />
            </Box>

            <SimpleCard title="All users">
                <Box width="100%" overflow="auto">

                    <StyledTable>

                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Number</TableCell>
                                <TableCell align="left">Avatar</TableCell>
                                <TableCell align="center">First name</TableCell>
                                <TableCell align="center">Last name</TableCell>
                                <TableCell align="center">Mail</TableCell>
                                <TableCell align="center">Nationality</TableCell>
                                <TableCell align="center">Birthdate</TableCell>
                                <TableCell align="center">Phone</TableCell>
                                <TableCell align="center">Post </TableCell>
                                <TableCell align="center">Start Job</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((u, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="left">   <Fab variant="extended" aria-label="Delete" className="button"  >{index+1}   </Fab></TableCell>
                                        <TableCell align="center"><ListItemAvatar>
                                            <Avatar src={u.image.imageUrl}>
                                            </Avatar>
                                        </ListItemAvatar></TableCell>
                                        <TableCell align="center">{u.firstName}</TableCell>
                                        <TableCell align="center">{u.lastName}</TableCell>
                                        <TableCell align="center">{u.mail}</TableCell>
                                        <TableCell align="center">{u.nationnality}</TableCell>
                                        <TableCell align="center">{u.birthdate}</TableCell>
                                        <TableCell align="center">{u.phone}</TableCell>
                                        <TableCell align="center">{u.poste}</TableCell>
                                        <TableCell align="center">{u.dateCreation}</TableCell>

                                    </TableRow>
                                ))}
                        </TableBody>
                    </StyledTable>

                    <TablePagination
                        sx={{ px: 2 }}
                        page={page}
                        component="div"
                        rowsPerPage={rowsPerPage}
                        count={users.length}
                        onPageChange={handleChangePage}
                        rowsPerPageOptions={[5, 10, 25]}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        nextIconButtonProps={{ "aria-label": "Next Page" }}
                        backIconButtonProps={{ "aria-label": "Previous Page" }}
                    />
                </Box>
            </SimpleCard>


        </Container>
    );
};

export default Listusers;
