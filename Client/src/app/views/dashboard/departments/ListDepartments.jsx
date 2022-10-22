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
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import PreviewIcon from "@mui/icons-material/Preview";
import { Breadcrumb, SimpleCard } from "app/components";
import axios from "axios";
import { useState, useEffect } from "react";
import SimpleTable from "../../material-kit/tables/SimpleTable";
import AddDep from "./AddDep";
import EmplPerDep from "./EmplPerDep";
// import AddEmployee from "./AddEmployee";

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

const ListDepratments = () => {
  const [departmentsData, setdepartmentsData] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [deps, setDeps] = useState(false);
  const [emp, setEmp] = useState([]);
  const [tit, setTit] = useState("");
  useEffect(() => {
    fetchEmployee();
  }, []);
  const fetchEmployee = async () => {
    try {
      const data = await axios.get(
        "http://localhost:3001/departments/EmployeePerDepartment"
      );
      console.log(data);
      setdepartmentsData(data.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container>
      {showAdd && <AddDep setAddShow={setShowAdd} />}
      {deps && <EmplPerDep setAddsShow={setDeps} title={tit} employees={emp} />}
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
        <DomainAddIcon style={{ marginRight: "16px" }} /> add department
      </button>

      <SimpleCard title="Departments Table">
        <Box width="100%" overflow="auto">
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell align="center">Depratment Name</TableCell>
                <TableCell align="center">Nbr of Employees</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {departmentsData &&
                departmentsData.map((e, i) => (
                  <TableRow key={i}>
                    <TableCell align="center">{e.department}</TableCell>
                    <TableCell align="center">{e.nbEmployees}</TableCell>
                    <TableCell align="center">
                      <PreviewIcon
                        onClick={() => {
                          setDeps(true);
                          setEmp([...e.employees]);
                          setTit(e.department);
                        }}
                        style={{ color: "blue", cursor: "pointer" }}
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

export default ListDepratments;
