import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
    Autocomplete,
    Button,
    Checkbox, Fab,
    FormControlLabel,
    Grid,
    Icon,
    Radio,
    RadioGroup,
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

const Toolsform = () => {
    const [state, setState] = useState({ date: new Date() });





    const {
        username,
        firstName,
        creditCard,
        mobile,
        password,
        confirmPassword,
        gender,
        date,
        email,
    } = state;
    const AutoComplete = styled(Autocomplete)(() => ({
        width: 300,
        marginBottom: '16px',
    }));

    return (
        <div>
            <ValidatorForm  onError={() => null}>

                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    <TextField
                        type="text"
                        name="tools"
                        label=" Name of tools"
                        id="standard-basic"

                    />
                    <TextField
                        type="text"
                        name="tools"
                        label=" number of tools"
                        id="standard-basic"

                    />

                </Grid>




                <Button color="primary" variant="contained" type="submit">
                    <Icon>send</Icon>
                    <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add tools</Span>
                </Button>
            </ValidatorForm>


        </div>
    );
};

export default Toolsform;