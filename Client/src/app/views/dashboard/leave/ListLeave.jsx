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
import { useState, useEffect } from "react";
import  { getUserName } from "./AddLeave";
import AddLeave from "./AddLeave";
import UpdateSalary from "./UpdateSalary";
import { Add, CheckCircleOutline, DoDisturbOff, DoDisturbOn, Edit, PlusOneOutlined } from "@mui/icons-material";
import Comments from "./Comments";

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

const ListLeave = () => {
  const [salaryData, setSalaryData] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateid, setUpdateid] = useState(false);
  const[showComment, setShowComment] =useState(false);
  useEffect(() => {
    fetchSalary();
  }, [showAdd,showUpdate]);
  const fetchSalary = async () => {
    try {
      let data = await axios.get(
        "http://localhost:8762/leave-management-service/leave/findAll"
      );
      const salaries = data.data
      data = await axios.get(
        "http://localhost:8762/employee-service/employee/all"
      );
      const employees = data.data
      const test = salaries.map((salary) => {
        
      return {
        ...salary,
        user: salary.userId ? getUserName(employees.find(emp => emp.id == salary.userId)) : ""
      }})
      setSalaryData(test);
    } catch (err) {
      console.log({ err });
    }
  };
  return (
    <Container>
      {showAdd && <AddLeave setAddShow={setShowAdd} />}
      {showComment && <Comments setAddShow={setShowComment} id={updateid} />}
      {showUpdate && <UpdateSalary setShowUpdate={setShowUpdate} id={updateid} />}

      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "List", path: "/leave" },
            { name: "leave" },
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
        <PersonAddIcon style={{ marginRight: "16px" }} /> add leave
      </button>

      <SimpleCard title="leaves Table">
        <Box width="100%" overflow="auto">
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell align="left">employee</TableCell>
                <TableCell align="left">start_date</TableCell>
                <TableCell align="center">end_date</TableCell>
                <TableCell align="center">Payed</TableCell>
                <TableCell align="center">type</TableCell>
                <TableCell align="center">status</TableCell>
                <TableCell align="center">comments</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {salaryData &&
                salaryData.map((e, i) => (
                  <TableRow key={i}>
                    <TableCell align="left">{e.user}</TableCell>
                    <TableCell align="left">{e.start_date}</TableCell>
                    <TableCell align="center" >{e.end_date}</TableCell>
                    <TableCell align="center">{e.payed ? "yes" : "no"}</TableCell>
                    <TableCell align="center">{e.type}</TableCell>
                        
                    <TableCell align="center" style={{ width:100, height: 70, backgroundColor: e.status==="declined"? "red" : e.status==="pending" ? "yellow": "green", cursor: "pointer" }}>{e.status}</TableCell>
                    <TableCell align="center">
                      <CheckCircleOutline style={{ color: "green", cursor: "pointer" }}  onClick={async () => {
                          await axios.put(
                            `http://localhost:8762/leave-management-service/leave/approve/${e.id}`
                          );
                          fetchSalary();
                        }} />
                      <DoDisturbOn   style={{ color: "red", cursor: "pointer" }}  onClick={async () => {
                          await axios.put(
                            `http://localhost:8762/leave-management-service/leave/decline/${e.id}`
                          );
                          fetchSalary();
                        }}/>
                    </TableCell>
                    <TableCell align="right">
                      <DeleteForeverIcon
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={async () => {
                          await axios.delete(
                            `http://localhost:8762/leave-management-service/leave/delete/${e.id}`
                          );
                          fetchSalary();
                        }}
                      />
                      <Edit
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={async () => {
                          setUpdateid(e.id);
                          setShowUpdate(true)
                        }}
                      />
                      <Add  onClick={() =>{
                          setUpdateid(e.id);
                          setShowComment(true)}}/>
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

export default ListLeave;
