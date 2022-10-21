import {Autocomplete, Button, Card, Grid, Icon, styled} from '@mui/material';
import React, {Fragment , useState} from 'react';
import TopSellingDepartment from './TopSellingDepartment';
import {Span} from "../../../components/Typography";
import axios from "../../../../axios";
import {fetchDepartmentData, fetchUserData, getToken} from "../../../auth/RoutsData";
import {SimpleCard} from "../../../components";
import {Navigate} from "react-router-dom";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

const TextField = styled(TextValidator)(() => ({
    width: "100%",
    marginBottom: "16px",
}));



const ContentBox = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
}));



export const Admin = () => {

    const [state, setState] = useState({ date: new Date() });

    React.useEffect(() => {
        ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
            if (value !== state.password) return false;

            return true;
        });
        return () => ValidatorForm.removeValidationRule("isPasswordMatch");
    }, [state.password]);


    const handleChange = (event) => {
        event.persist();
        setState({ ...state, [event.target.name]: event.target.value });
    };


    const {
        namedepartment,
        username,
        password,
        confirmPassword,
        email,

    } = state;





        const addDepartment = async (e) => {
            e.preventDefault();
            const departSuccess = document.querySelector(".depart");

            await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}/dep/add`,

                data: {
                    nameDepart: namedepartment

                },
                headers: {
                    'Authorization': 'Bearer ' + getToken()
                }
            }).then((response)=>{
                console.log(response);
                departSuccess.innerHTML =response.data;
                window.location.reload();
            })

        }

   const suggestions = [
       { label: 'Admin' },
       { label: 'RH' },
       { label: 'Enginner' },
       { label: 'Intern' },

   ];

   const [depData,setDepData]=useState([{}]);
   React.useEffect(()=>{
       fetchDepartmentData().then((response)=>{
           setDepData(response.data);
       })
   },[])

    const [role,setRole]=useState("");
    const [nameDep,setNameDep]=useState("");
   const addUser = async (e) => {
       e.preventDefault();
       const userSuccess = document.querySelector(".user");
       await axios({
           method: "post",
           url: `${process.env.REACT_APP_API_URL}/user/add/${nameDep}`,

           data: {
               username:username,
               mail:email,
               password:password,
               role:role


           },
           headers: {
               'Authorization': 'Bearer ' + getToken()
           }
       }).then((response)=>{
           console.log(response);
            userSuccess.innerHTML=response.data;

       })

   }

    const [rl,setRl]=useState(true);
    React.useEffect(()=>{
        fetchUserData().then((response)=>{
            setRl(response.data.role=="Admin")
        })
    },[])
    return  (
        <div hidden={!rl}>
            <Fragment >
                <ContentBox className="analytics">
                    <Grid container spacing={3}>
                        <Grid item lg={9} md={8} sm={10} xs={12}>
                            <SimpleCard title="All departments">
                                <TopSellingDepartment />
                            </SimpleCard>

                        </Grid>

                        <Grid item lg={3} md={8} sm={10} xs={12}>
                            <Card sx={{ px: 3, py: 2, mb: 3 }}>
                                <ValidatorForm onSubmit={addDepartment} onError={() => null}>
                                    <Grid container spacing={6}>
                                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                                            <TextField
                                                type="text"
                                                name="namedepartment"
                                                id="standard-basic"
                                                value={namedepartment || ""}
                                                onChange={handleChange}
                                                errorMessages={["this field is required"]}
                                                label="Name of department"
                                                validators={["required"]}
                                                sx={{ width: 200}}
                                            />



                                        </Grid>
                                    </Grid>

                                    <Button style={{background:"#FF4500"}} variant="contained" type="submit">
                                        <Icon>send</Icon>
                                        <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
                                    </Button>
                                    <div className="depart text-success"></div>
                                </ValidatorForm>
                            </Card>

                            <Card sx={{ px: 3, py: 2, mb: 3 }}>
                                <ValidatorForm onSubmit={addUser} onError={() => null}>
                                    <Grid container spacing={6}>
                                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                                            <TextField
                                                type="text"
                                                name="username"
                                                id="standard-basic"
                                                value={username || ""}
                                                onChange={handleChange}
                                                errorMessages={["this field is required"]}
                                                label="Username(Min length 4,Max length 9)"
                                                validators={["required", "minStringLength: 4", "maxStringLength: 9"]}
                                                sx={{ width: 200}}
                                            />
                                            <TextField
                                                type="email"
                                                name="email"
                                                label="Email (@newaccess.ch)"
                                                value={email || ""}
                                                onChange={handleChange}
                                                validators={["required", 'matchRegexp:^[A-Za-z0-9]+(.|_)+[A-Za-z0-9]+@+newaccess.ch$']}
                                                errorMessages={["this field is required", "email is not valid"]}
                                                sx={{ width: 200}}
                                            />
                                            <Autocomplete
                                                options={suggestions}
                                                getOptionLabel={(option) => option.label}
                                                onChange={(e , v) => setRole(v.label) }
                                                renderInput={(params) => (
                                                    <TextField {...params} label="Role" variant="outlined" fullWidth
                                                               sx={{ width: 200}}
                                                               errorMessages={["this field is required"]}
                                                               onChange={handleChange}
                                                               value={role || ""}
                                                               validators={["required"]}

                                                    />
                                                ) }
                                            />
                                            <Autocomplete
                                                options={depData}
                                                getOptionLabel={(option) => option.nameDepart}
                                                onChange={(e , v) => setNameDep(v.nameDepart) }

                                                renderInput={(params) => (
                                                    <TextField {...params} label="Assign to department" variant="outlined" fullWidth
                                                               sx={{ width: 200}}
                                                               errorMessages={["this field is required"]}
                                                               onChange={handleChange}
                                                               value={nameDep || ""}
                                                               validators={["required"]}

                                                    />
                                                )}
                                            />
                                            <TextField
                                                name="password"
                                                type="password"
                                                label="Password"
                                                value={password || ""}
                                                onChange={handleChange}
                                                validators={["required", "minStringLength: 6"]}
                                                errorMessages={["this field is required","Min Length: 6"]}
                                                sx={{ width: 200}}
                                            />
                                            <TextField
                                                type="password"
                                                name="confirmPassword"
                                                onChange={handleChange}
                                                label="Confirm Password"
                                                value={confirmPassword || ""}
                                                validators={["required", "isPasswordMatch"]}
                                                errorMessages={["this field is required", "password didn't match"]}
                                                sx={{ width: 200}}
                                            />

                                        </Grid>
                                    </Grid>

                                    <Button style={{background:"#FF4500"}} variant="contained" type="submit">
                                        <Icon>send</Icon>
                                        <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
                                    </Button>
                                    <div className="user text-success"></div>
                                </ValidatorForm>
                            </Card>


                        </Grid>
                    </Grid>
                </ContentBox>
            </Fragment>

        </div>


    )

};

export default Admin;
