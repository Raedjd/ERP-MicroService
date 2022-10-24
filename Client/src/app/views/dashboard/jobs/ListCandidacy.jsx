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
import WorkIcon from '@mui/icons-material/Work';
import PreviewIcon from "@mui/icons-material/Preview";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Breadcrumb, SimpleCard } from "app/components";
import axios from "axios";
import { useState, useEffect } from "react";
import SimpleTable from "../../material-kit/tables/SimpleTable";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import {useLocation} from 'react-router-dom';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Switch from '@mui/material/Switch';
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

const ListCandidacy = () => {
    const [jobsData, setJobsData] = useState([]);
    const location = useLocation();
    useEffect(() => {
        console.log(location.state.id);
        fetchCandidacies();
    }, []);
    const fetchCandidacies = async () => {
        try {
            const data = await axios.get(
                `http://localhost:8086/api/Candidacy/findByJob/${location.state.id}`
            );
            console.log(data);
            setJobsData(data.data);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: "List", path: "/Candidacies" },
                        { name: "Candidacies" },
                    ]}
                />
            </Box>
            <SimpleCard title="Candidacies Table">
                <Box width="100%" overflow="auto">
                    <StyledTable>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Full Name</TableCell>
                                <TableCell align="center">Phone Number</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">linkedinPath</TableCell>
                                <TableCell align="center">accepted</TableCell>
                                <TableCell align="center">resume</TableCell>
                                <TableCell rowSpan={2} align="center">
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {jobsData &&
                                jobsData.map((ee, i) => (
                                    <TableRow key={i}>
                                        <TableCell align="left">{ee.fullName}</TableCell>
                                        <TableCell align="center">{ee.phoneNumber}</TableCell>
                                        <TableCell align="left">{ee.email}</TableCell>
                                        <TableCell align="center" style={{textOverflow: 'ellipsis',overflow: 'hidden',whiteSpace: 'nowrap' }}>{ee.linkedinPath}</TableCell>
                                        <TableCell align="center">
                                            <Switch
                                                color="warning"
                                                checked={ee.accepted}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                                onChange={async (event: React.ChangeEvent<HTMLInputElement>) => {console.log(event.target.checked);
                                                    if (event.target.checked === true){
                                                        await axios({
                                                            method: "put",
                                                            url: `http://localhost:8086/api/Candidacy/acceptCandidacy/${ee.id}`,
                                                        }).then((response)=>{
                                                            window.location.reload();
                                                        })}
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center" style={{textOverflow: 'ellipsis',overflow: 'hidden',whiteSpace: 'nowrap' }}>{ee.resumeName}</TableCell>
                                        <TableCell align="center">
                                            <PictureAsPdfIcon
                                                color="success"
                                                onClick={async (e) => {
                                                    e.preventDefault();
                                                    console.log(ee.id);
                                                    window.open(`http://localhost:8086/api/Candidacy/downloadResume/${ee.id}`,"_blank");
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

export default ListCandidacy;
