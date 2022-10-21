import {
  Box,  Fab,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import {fetchDepartmentData} from "../../../auth/RoutsData";

import Products from "./SimpleDialogProduct";
import Users from "./SimpleDialogUsers";
import Tool from "./SimpleDialogTools";
import FormDialogDep from "./dialogDepartment";


const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));


const TopSellingDepartment = () => {


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [depData,setDepData]=useState({});
  React.useEffect(()=>{
    fetchDepartmentData().then((response)=>{
      setDepData(response.data);
    })
  },[])

  const departments = Object.keys(depData).map((key) => depData[key]);
  return (


        <Box width="100%" overflow="auto">

          <StyledTable>

            <TableHead>
              <TableRow>
                <TableCell align="left">Number</TableCell>
                <TableCell align="center">Name </TableCell>
                <TableCell align="center">Creation Date</TableCell>
                <TableCell align="center">Users </TableCell>
                <TableCell align="center">Products </TableCell>
                <TableCell align="center">Tools </TableCell>
                <TableCell align="center">Update </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {departments
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((dep, index) => (
                      <TableRow key={index}>


                          <TableCell align="left">   <Fab variant="extended" aria-label="Delete" className="button"  >{index+1}   </Fab></TableCell>
                        <TableCell align="center">   <Fab variant="extended" aria-label="Delete" className="button"  >{dep.nameDepart}  </Fab></TableCell>
                        <TableCell align="center">   <Fab variant="extended" aria-label="Delete" className="button"  >{dep.dateCreation} </Fab></TableCell>
                        <TableCell align="center"><Users key={index}  user={dep.id} ></Users></TableCell>
                        <TableCell align="center">  <Products   key={index}  product={dep.id} ></Products></TableCell>
                        <TableCell align="center">  <Tool   key={index}  tools={dep.id} ></Tool></TableCell>
                        <TableCell align="center"><FormDialogDep key={index}  idDep={dep.id}></FormDialogDep></TableCell>
                      </TableRow>
                  ))}
            </TableBody>
          </StyledTable>

          <TablePagination
              sx={{ px: 2 }}
              page={page}
              component="div"
              rowsPerPage={rowsPerPage}
              count={departments.length}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={handleChangeRowsPerPage}
              nextIconButtonProps={{ "aria-label": "Next Page" }}
              backIconButtonProps={{ "aria-label": "Previous Page" }}
          />
        </Box>

  );
};


export default TopSellingDepartment;