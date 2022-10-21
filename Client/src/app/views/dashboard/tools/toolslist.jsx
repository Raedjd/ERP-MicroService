import {
    Box,
    Card, Fab,
    styled,
    Table,
    TableBody,
    TableCell,
    TableHead, TablePagination,
    TableRow,

} from '@mui/material';

import React, {useState} from "react";
import { fetchToolssData} from "../../../auth/RoutsData";
import ToolsbyUser from "./SimpleDialogUserTools";
import FormDialogToolsupdate from "./FormDialogToolsupdate";
import FormDialogToolsdelete from "./FormDialogToolsdelete";




const CardHeader = styled(Box)(() => ({
    display: 'flex',
    paddingLeft: '24px',
    paddingRight: '24px',
    marginBottom: '12px',
    alignItems: 'center',
    justifyContent: 'space-between',
}));

const Title = styled('span')(() => ({
    fontSize: '1rem',
    fontWeight: '500',
    textTransform: 'capitalize',
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



const Toolslist = ({iduser}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const [toolsData,setToolsData]=useState({});
    React.useEffect(()=>{
        fetchToolssData().then((response)=>{
            setToolsData(response.data);

        })
    },[])
    const tools = Object.keys(toolsData).map((key) => toolsData[key]);



    return (
        <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
            <CardHeader>
                <Title>All Tools</Title>

            </CardHeader>

            <Box width="100%" overflow="auto">

                <StyledTable>

                    <TableHead>
                        <TableRow>
                            <TableCell align="center"></TableCell>
                            <TableCell align="center">Name </TableCell>
                            <TableCell align="center">Number </TableCell>
                            <TableCell align="center">date Added</TableCell>
                            <TableCell align="center">Added by</TableCell>
                            <TableCell align="center">Update </TableCell>
                            <TableCell align="center">Delete </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tools
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((t, index) => (
                                <TableRow key={index}>
                                    <TableCell align="center">   <Fab variant="extended" aria-label="Delete" className="button"  >{index+1}   </Fab></TableCell>
                                    <TableCell align="center">{t.nameTools}</TableCell>
                                    <TableCell align="center">{t.nbrTools}</TableCell>
                                    <TableCell align="center">{t.dateCreation}</TableCell>
                                 <TableCell align="center" ><ToolsbyUser key={index}  userAdd={t.userid}></ToolsbyUser></TableCell>
                                    <TableCell align="center"><FormDialogToolsupdate key={index} idTools={t.id}  Add={t.userid}></FormDialogToolsupdate></TableCell>
                                       <TableCell align="center"><FormDialogToolsdelete key={index} idtool={t.id}  Add={t.userid}></FormDialogToolsdelete></TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </StyledTable>

                <TablePagination
                    sx={{ px: 2 }}
                    page={page}
                    component="div"
                    rowsPerPage={rowsPerPage}
                    count={tools.length}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    nextIconButtonProps={{ "aria-label": "Next Page" }}
                    backIconButtonProps={{ "aria-label": "Previous Page" }}
                />
            </Box>
        </Card>
    );
};

export default Toolslist;