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
import SimpleTable from "../../material-kit/tables/SimpleTable";
import AddEmployee from "./AddEmployee";
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

const ListEmployee = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  useEffect(() => {
    fetchEmployee();
  }, []);
  const fetchEmployee = async () => {
    try {
      const data = await axios.get(
        "http://localhost:8762/employee-service/employee/all"
      );
      console.log(data);
      setEmployeeData(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  
  return (
    <Container>
      {showAdd && <AddEmployee setAddShow={setShowAdd} />}
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "List", path: "/employees" },
            { name: "Employees" },
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
        <PersonAddIcon style={{ marginRight: "16px" }} /> add employee
      </button>

      <SimpleCard title="Employees Table">
        <Box width="100%" overflow="auto">
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell align="left">First Name</TableCell>
                <TableCell align="center">Last Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Phone</TableCell>
                <TableCell align="center">Role</TableCell>
                <TableCell align="center">Department</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {employeeData &&
                employeeData.map((e, i) => (
                  <TableRow key={i}>
                    <TableCell align="left">{e.firstName}</TableCell>
                    <TableCell align="center">{e.lastName}</TableCell>
                    <TableCell align="center">{e.email}</TableCell>
                    <TableCell align="center">{e.phone}</TableCell>
                    <TableCell align="center">{e.jobTitle}</TableCell>
                    <TableCell align="center">{e.department}</TableCell>
                    <TableCell align="right">
                      <DeleteForeverIcon
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => {
                          axios.delete(
                            `http://localhost:8762/employee-service/employee/delete/${e.id}`
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

export default ListEmployee;
