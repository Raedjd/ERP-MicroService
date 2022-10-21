import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Icon,
  Radio,
  RadioGroup,
  styled,
} from "@mui/material";
import { Span } from "app/components/Typography";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import {FileDownloadDone, FileUpload} from "@mui/icons-material";

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const Profilform = () => {
  const [state, setState] = useState({ date: new Date() });

  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== state.password) return false;

      return true;
    });
    return () => ValidatorForm.removeValidationRule("isPasswordMatch");
  }, [state.password]);





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

  return (
    <div>
      <ValidatorForm  onError={() => null}>

          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="FirstName"
              label="First Name"
              id="standard-basic"

              errorMessages={["this field is required"]}
              label="FirstName "
              validators={["required", "minStringLength: 4", "maxStringLength: 9"]}
            />

            <TextField
              type="text"
              name="LastName"
              label="Last Name"

              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <TextField
                type="date"
                name="date"


                validators={["required"]}
                errorMessages={["this field is required"]}
            />
            <TextField
                type="text"
                name="LastName"
                label="Nationality"

                validators={["required"]}
                errorMessages={["this field is required"]}
            />
            <TextField
                type="text"
                name="mobile"

                label="Mobile Nubmer"

                validators={["required"]}
                errorMessages={["this field is required"]}
            />
          </Grid>




        <Button color="primary" variant="contained" type="submit">
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>Update profil</Span>
        </Button>
      </ValidatorForm>

      <ValidatorForm  onError={() => null}>

        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
          <input
              type="file"
              name="Password"
              label="Change avatar"

          />
        </Grid>

        <Button color="primary" variant="contained" type="submit">
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>Change avatar</Span>
        </Button>
      </ValidatorForm>
      <ValidatorForm  onError={() => null}>

        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
          <TextField
              type="text"
              name="Password"
              label="Password"
              id="standard-basic"

              errorMessages={["this field is required"]}
              label="Password "
              validators={["required", "minStringLength: 4", "maxStringLength: 9"]}
          />

          <TextField
              type="text"
              name="Confirm password"
              label="Confirm password"

              validators={["required"]}
              errorMessages={["this field is required"]}
          />

        </Grid>




        <Button color="primary" variant="contained" type="submit">
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>Change password</Span>
        </Button>
      </ValidatorForm>


    </div>
  );
};

export default Profilform;
