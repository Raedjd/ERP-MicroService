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
import AddEmployee, { getUserName } from "./AddSalary";
import AddSalary from "./AddSalary";
import UpdateSalary from "./UpdateSalary";
import { Edit } from "@mui/icons-material";

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

const ListSalary = () => {
  const [salaryData, setSalaryData] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateid, setUpdateid] = useState(false);
  useEffect(() => {
    fetchSalary();
  }, [showAdd,showUpdate]);
  const fetchSalary = async () => {
    try {
      let data = await axios.get(
        "http://localhost:8762/salary-management-service/salary/findAll"
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
      {showAdd && <AddSalary setAddShow={setShowAdd} />}
      {showUpdate && <UpdateSalary setShowUpdate={setShowUpdate} id={updateid} />}
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "List", path: "/salary" },
            { name: "salarys" },
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

      <SimpleCard title="Salary Table">
        <Box width="100%" overflow="auto">
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell align="left">employee</TableCell>
                <TableCell align="left">date</TableCell>
                <TableCell align="center">Net pay</TableCell>
                <TableCell align="center">Gross Pay</TableCell>
                <TableCell align="center">Deducations</TableCell>
                <TableCell align="center">tax</TableCell>
                <TableCell align="center">overTime</TableCell>
                <TableCell align="center">bonus</TableCell>
                <TableCell align="center">other payements</TableCell>
                <TableCell align="center">other deducations</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {salaryData &&
                salaryData.map((e, i) => (
                  <TableRow key={i}>
                    <TableCell align="left">{e.user}</TableCell>
                    <TableCell align="left">{e.date}</TableCell>
                    <TableCell align="center">{e.netPay ? e.netPay: 0}</TableCell>
                    <TableCell align="center">{e.grossPay ? e.grossPay: 0}</TableCell>
                    <TableCell align="center">{e.deducations ? e.deducations: 0}</TableCell>
                    <TableCell align="center">{e.tax ? e.tax: 0}</TableCell>
                    <TableCell align="center">{e.overTime ? e.overTime: 0}</TableCell>
                    <TableCell align="center">{e.bonus ? e.bonus: 0}</TableCell>
                    <TableCell align="center">{e.otherPayments ? e.otherPayements: 0}</TableCell>
                    <TableCell align="center">{e.otherDeducation ? e.otherDecuctions: 0}</TableCell>
                    <TableCell align="right">
                      <DeleteForeverIcon
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={async () => {
                          await axios.delete(
                            `http://localhost:8762/salary-management-service/salary/delete/${e.id}`
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

export default ListSalary;
