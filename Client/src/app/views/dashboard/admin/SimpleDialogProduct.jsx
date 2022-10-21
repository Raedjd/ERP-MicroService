
import {Box, styled, Table, TableBody, TableCell, TableHead, TableRow, Fab, Icon} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import axios from "axios";
import {getToken} from "../../../auth/RoutsData";


const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

export default function Products({product}) {

function SimpleDialog(props) {
  const { onClose, selectedValue, ...other } = props;

  function handleClose() {
    onClose(selectedValue);
  }

  return (
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" {...other}>


        <Box width="100%" overflow="auto">

          <StyledTable>

            <TableHead>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell align="center">Name of product</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products
                  .map((prod, index) => (
                      <TableRow key={index}>
                        <TableCell align="left">{index+1}</TableCell>
                        <TableCell align="center">{prod.nameProduct}</TableCell>

                      </TableRow>
                  ))}
            </TableBody>
          </StyledTable>


        </Box>

      </Dialog>
  );
}

SimpleDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
};


  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('user02@gmail.com');

  const handleClickOpen = () => setOpen(true);

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const fetchProductByDep=(authRequest)=> {
    return axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}/product/productbydepart/${product}`,
      headers: {
        'Authorization': 'Bearer ' + getToken()
      }
    })
  }
  const [prodData,setProdData]=useState({});

  React.useEffect(()=>{
    fetchProductByDep().then((response)=>{
      setProdData(response.data);
    })
  },[])
const products = Object.keys(prodData).map((key) => prodData[key]);
  return (
      <Box>



        <Fab variant="extended" aria-label="Delete" className="button"  onClick={handleClickOpen}>
          <Icon>visibility</Icon>
        </Fab>
        <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose}/>
      </Box>
  );
}

