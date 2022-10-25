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
import {
  Add,
  CheckCircleOutline,
  DoDisturbOff,
  DoDisturbOn,
  Edit,
  PlusOneOutlined,
} from "@mui/icons-material";
import AddEntretien from "./AddEntretien";
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

const ListEntretien = () => {
  const [entretienData, setEntretienData] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  useEffect(() => {
    fetchEntretien();
  }, []);
  const fetchEntretien = async () => {
    try {
      const data = await axios.get(
        "http://localhost:8762/entretien-service/entretien/all"
      );
      console.log(data);
      setEntretienData(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      {showAdd && <AddEntretien setAddShow={setShowAdd} />}
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
        <PersonAddIcon style={{ marginRight: "16px" }} /> add entretien
      </button>

      <SimpleCard title="Employees Table">
        <Box width="100%" overflow="auto">
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell align="left">Role</TableCell>
                <TableCell align="center">Candidature</TableCell>
                <TableCell align="center">Employee</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Link</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {entretienData &&
                entretienData.map((e, i) => (
                  <TableRow key={i}>
                    <TableCell align="left">{e.roleEntretien}</TableCell>
                    <TableCell align="center">{e.candidature}</TableCell>
                    <TableCell align="center">{e.employee}</TableCell>
                    <TableCell align="center">{e.dateEntretien}</TableCell>
                    <TableCell align="center">{e.lienEntretien}</TableCell>
                    <TableCell align="right">
                      <DeleteForeverIcon
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => {
                          axios.delete(
                            `http://localhost:8762/entretien-service/entretien/delete/${e.id}`
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

export default ListEntretien;
