import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { Breadcrumb, SimpleCard } from "app/components";
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

const EmplPerDep = ({ setAddsShow, employees, title }) => {
  useEffect(() => {
    console.log(employees, title);
  }, []);
  return (
    <div
      className="addEmpWrapper"
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.3)",
        zIndex: "10000000000",
      }}
    >
      <div
        className="addEmpContainer"
        style={{
          padding: "15px 30px",
          backgroundColor: "white",
          borderRadius: "8px",
          minWidth: "350px",
          width: "80%",
        }}
      >
        <div
          className="addEmpFirst"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Employees of {title}: </h2>
          <CloseIcon
            onClick={() => setAddsShow(false)}
            style={{ cursor: "pointer" }}
          />
        </div>
        <SimpleCard title="Employees Table">
          <Box width="100%" overflow="auto">
            <StyledTable>
              <TableHead>
                <TableRow>
                  <TableCell align="center">First Name</TableCell>
                  <TableCell align="center">Last Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Phone</TableCell>
                  <TableCell align="center">Role</TableCell>
                  <TableCell align="center">Department</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {employees &&
                  employees.map((e, i) => (
                    <TableRow key={i}>
                      <TableCell align="center">{e.firstName}</TableCell>
                      <TableCell align="center">{e.lastName}</TableCell>
                      <TableCell align="center">{e.email}</TableCell>
                      <TableCell align="center">{e.phone}</TableCell>
                      <TableCell align="center">{e.jobTitle}</TableCell>
                      <TableCell align="center">{e.department}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </StyledTable>
          </Box>
        </SimpleCard>
      </div>
    </div>
  );
};

export default EmplPerDep;
