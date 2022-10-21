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
import {fetchProductsData, fetchUserData} from "../../../auth/RoutsData";
import ProductbyUser from "./SimpleDialogUser";
import FormDialogProdupdate from "./FormDialogProdupdate";
import FormDialogProddelete from "./FormDialogProddelete";


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



const Productlist = ({iduser}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const [productsData,setProductsData]=useState({});
    React.useEffect(()=>{
        fetchProductsData().then((response)=>{
            setProductsData(response.data);

        })
    },[])
    const products = Object.keys(productsData).map((key) => productsData[key]);

    const [userData,setUserData]=useState("");
    React.useEffect(()=>{
        fetchUserData().then((response)=>{
            setUserData(response.data);


        })
    },[])

    return (
        <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
            <CardHeader>
                <Title>All products</Title>

            </CardHeader>

            <Box width="100%" overflow="auto">

                <StyledTable>

                    <TableHead>
                        <TableRow>
                            <TableCell align="center"></TableCell>
                            <TableCell align="center">Name </TableCell>
                            <TableCell align="center">date Added</TableCell>
                            <TableCell align="center">Added by</TableCell>
                            <TableCell align="center">Update </TableCell>
                            <TableCell align="center">Delete </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((p, index) => (
                                <TableRow key={index}>
                                    <TableCell align="center">   <Fab variant="extended" aria-label="Delete" className="button"  >{index+1}   </Fab></TableCell>
                                    <TableCell align="center">{p.nameProduct}</TableCell>
                                    <TableCell align="center">{p.dateCreation}</TableCell>
                                    <TableCell align="center" ><ProductbyUser key={index}  userAdd={p.userid}></ProductbyUser></TableCell>
                                    <TableCell align="center"><FormDialogProdupdate key={index} idProd={p.id}  Add={p.userid}></FormDialogProdupdate></TableCell>
                                    <TableCell align="center"><FormDialogProddelete key={index} idProd={p.id}  Add={p.userid}></FormDialogProddelete></TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </StyledTable>

                <TablePagination
                    sx={{ px: 2 }}
                    page={page}
                    component="div"
                    rowsPerPage={rowsPerPage}
                    count={products.length}
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

export default Productlist;