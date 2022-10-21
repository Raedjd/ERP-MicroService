
import {
    Button,

    Grid,
    Icon,

    styled,
} from "@mui/material";
import { Span } from "app/components/Typography";
import React, { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import axios from "../../../../axios";
import {fetchUserData, getToken} from "../../../auth/RoutsData";



const TextField = styled(TextValidator)(() => ({
    width: "100%",
    marginBottom: "16px",
}));

const Setting = () => {

/////////////////////////////////////////////////////////////////////////////////////:
    const [userData,setUserData]=useState({});

    React.useEffect(()=>{
        fetchUserData().then((response)=>{
            setUserData(response.data);
        })
    },[])

    const id=userData.id;
    const [state, setState] = useState({ date: new Date() });


    useEffect(() => {
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



    const [image, setImage] = useState("");

    const handleUpdatePDP = async (e) => {
        e.preventDefault();
        if (!image) return console.log("No files were uploaded.");

        if (!image.size > 1024 * 1024) console.log("Size too large.");

        let data = new FormData();
        data.append("multipartFile", image);
       await axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}/cloudinary/upload/${id}`,
            data,
            headers: { "content-type": "multipartFile/form-data",
           'Authorization': 'Bearer ' + getToken()},

        })
            .then((res) => {
                 console.log(res.data);
                window.location.reload();
            })
    };

    const [oldPassword,setOldPassword]=useState('');


    const changePassword = async (e) => {
        e.preventDefault();
        const change = document.querySelector(".password");
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}/user/changepwd/${id}`,

            data: {
                oldPassword:oldPassword,
                newPassword:password

            },
            headers: {
                'Authorization': 'Bearer ' + getToken()
            }
        }).then((response)=>{
            console.log(response);
            change.innerHTML=response.data;

        })

    }
    const {

        password,
        confirmPassword,

    } = state;

    return (

        <div>
            <form onSubmit={handleUpdatePDP} >
                <Grid container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>


                        <input
                            name="avatar"
                            type="file"
                            accept=".jpg, .jpeg, .png, .jfif"
                            onChange={(e) => setImage(e.target.files[0])}


                        />


                    </Grid>
                </Grid>
                <p>Image size should be under 1024MB .</p>

                <Button style={{background:"#FF4500"}} variant="contained" type="submit">
                    <Icon>send</Icon>
                    <Span sx={{ pl: 1, textTransform: "capitalize" }}>Change avatar</Span>
                </Button>
            </form>
         <ValidatorForm onSubmit={changePassword}  onError={() => null}>
                <Grid container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <TextField
                            name="oldpassword"
                            type="password"
                            label="Old password"
                            onChange={(e) =>setOldPassword(e.target.value)}
                            value={oldPassword}
                            validators={["required"]}
                            errorMessages={["this field is required"]}
                            sx={{ width: 400}}
                        />


                        <TextField
                            name="password"
                            type="password"
                            label="Password"
                            value={password }
                            onChange={handleChange}
                            validators={["required"]}
                            errorMessages={["this field is required"]}
                            sx={{ width: 400}}
                        />
                        <TextField
                            type="password"
                            name="confirmPassword"
                            onChange={handleChange}
                            label="Confirm Password"
                            value={confirmPassword }
                            validators={["required", "isPasswordMatch"]}
                            errorMessages={["this field is required", "password didn't match"]}
                            sx={{ width: 400}}
                        />

                    </Grid>
                </Grid>

                <Button style={{background:"#FF4500"}} variant="contained" type="submit">
                    <Icon>send</Icon>
                    <Span sx={{ pl: 1, textTransform: "capitalize" }}>Change password</Span>
                </Button>
             <div className="password text-success"></div>
            </ValidatorForm>

        </div>

    );
};



export default Setting;
