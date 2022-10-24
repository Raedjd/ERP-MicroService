import {Box, Icon, IconButton, styled, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import SimpleTable from "../../material-kit/tables/SimpleTable";
import {useEffect, useState} from "react";
import axios from "axios";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AddRole from './AddRole'
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

const Profiluser = () => {
    const [rolesData, setRolesData] = useState([]);
    useEffect(() => {
        fetchRoles();
    }, []);
    const fetchRoles = async () => {
        try {
            const data = await axios.get(
                `http://localhost:8085/api/auth/findAllRoles`
            );
            setRolesData(data.data);
        } catch (err) {
            console.log(err);
        }
    };
    const [showAdd, setShowAdd] = useState(false);
    return (
        <Container>
            {showAdd && <AddRole setAddShow={setShowAdd}/>}
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "List", path: "/users" }, { name: "Roles" }]} />
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
                <ManageAccountsIcon style={{ marginRight: "16px" }} /> Add Role
            </button>
            <SimpleCard title="Roles Table">
                <Box width="100%" overflow="auto">
                    <StyledTable>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">ID</TableCell>
                                <TableCell align="center">Role</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>

                            {rolesData &&
                                rolesData.map((e, i) => (
                                    <TableRow key={i}>
                                <TableCell align="left">{e.id}</TableCell>
                                <TableCell align="center">{e.name}</TableCell>
                            </TableRow> ))}

                        </TableBody>
                    </StyledTable>
                </Box>
            </SimpleCard>


        </Container>

    );
};


export default Profiluser;
