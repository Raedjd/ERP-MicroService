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
import AddJob from "./AddJob";
import EditJob from "./EditJob";
import AddCandidacy from "./AddCandidacy";
import {useNavigate} from 'react-router-dom';
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

const ListJobs = () => {
  const [jobsData, setJobsData] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateJob, setUpdateJob] = useState();
  const [showAddCandidacy , setAddShowCandidacy] = useState(false);
  const [jobId, setJobId]= useState();
  const navigate = useNavigate();
  useEffect(() => {
    fetchJobs();
  }, []);
  const fetchJobs = async () => {
    try {
      const data = await axios.get(
        "http://localhost:8086/api/job/findAll"
      );
      console.log(data);
      setJobsData(data.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container>
        {showAdd && <AddJob setAddShow={setShowAdd} />}
        {showUpdate && <EditJob job={updateJob} setShowUpdate={setShowUpdate}  />}
        {showAddCandidacy && <AddCandidacy setAddShowCandidacy={setAddShowCandidacy} jobId={jobId}/>}
      <Box className="breadcrumb">
        <Breadcrumb
            routeSegments={[
              { name: "List", path: "/Jobs" },
              { name: "Jobs" },
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
        <WorkIcon style={{ marginRight: "16px" }} /> Add job annonce
      </button>
      <SimpleCard title="Jobs Table">
        <Box width="100%" overflow="auto">
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell align="left">Title</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">salary</TableCell>
                <TableCell align="center">status</TableCell>
                <TableCell align="center">Creation Date</TableCell>
                <TableCell align="center">Expiration Date</TableCell>
                <TableCell align="center">managerId</TableCell>
                  <TableCell rowSpan={2} align="center">
                      Action
                  </TableCell>
                  <TableCell align="center">Candidacy</TableCell>
                  <TableCell align="center">Candidacies</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {jobsData &&
                  jobsData.map((e, i) => (
                  <TableRow key={i}>
                    <TableCell align="left" style={{textOverflow: 'ellipsis',overflow: 'hidden',whiteSpace: 'nowrap' }}>{e.title}</TableCell>
                    <TableCell align="center" style={{textOverflow: 'ellipsis',overflow: 'hidden',whiteSpace: 'nowrap' }}>{e.description}</TableCell>
                    <TableCell align="center">{e.salary}</TableCell>
                    <TableCell align="center">{e.status?"True":"False"}</TableCell>
                    <TableCell align="center">{e.creationDate}</TableCell>
                    <TableCell align="center">{e.expirationDate}</TableCell>
                    <TableCell align="center">{e.managerId}</TableCell>
                       <TableCell align="center">
                           <EditIcon  style={{ marginRight: "16px" }} onClick={async () => {
                               setUpdateJob(e);
                               setShowUpdate(true)
                           }} />
                           <DeleteForeverIcon
                               style={{ color: "red", cursor: "pointer" }}
                               onClick={() => {
                                   axios.delete(
                                       `http://localhost:8086/api/job/delete/${e.id}`
                                   );
                                   window.location.reload();
                               }}
                           />
                       </TableCell>
                      <TableCell align="center">
                          <CreateNewFolderIcon
                             color="success"
                             onClick={async () => {
                                 setJobId(e.id);
                                 setAddShowCandidacy(true)
                             }}
                          />
                      </TableCell>
                      <TableCell align="center">
                          <RemoveRedEyeIcon
                              color="secondary"
                              style={{  cursor: "pointer" }}
                              onClick={async ()=>{
                                  navigate('/dashboard/jobs/candidacies',{state:{id:e.id}});
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

export default ListJobs;
