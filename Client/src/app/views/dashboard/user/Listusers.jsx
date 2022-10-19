import {Box, Icon, IconButton, styled, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import SimpleTable from "../../material-kit/tables/SimpleTable";


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
    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "List", path: "/users" }, { name: "Users" }]} />
            </Box>

            <SimpleCard title="Simple Table">
                <Box width="100%" overflow="auto">
                    <StyledTable>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="center">Company</TableCell>
                                <TableCell align="center">Start Date</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Amount</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>

                                <TableRow >
                                    <TableCell align="left"></TableCell>


                                </TableRow>

                        </TableBody>
                    </StyledTable>
                </Box>
            </SimpleCard>


        </Container>
    );
};

export default Listusers;
