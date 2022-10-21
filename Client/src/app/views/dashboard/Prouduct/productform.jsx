
import {

    Button,

    Grid,
    Icon,

    styled,
} from "@mui/material";
import { Span } from "app/components/Typography";
import React, { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import {FileDownloadDone, FileUpload} from "@mui/icons-material";

const TextField = styled(TextValidator)(() => ({
    width: "100%",
    marginBottom: "16px",
}));

const Productform = () => {


    return (
        <div>
            <ValidatorForm  onError={() => null}>

                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    <TextField
                        type="text"
                        name="product"
                        label=" Name of product"
                        id="standard-basic"

                    />


                </Grid>




                <Button color="primary" variant="contained" type="submit">
                    <Icon>send</Icon>
                    <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add product</Span>
                </Button>
            </ValidatorForm>


        </div>
    );
};

export default Productform;