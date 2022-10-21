import {Avatar,  Card, Grid,Table, TableCell, TableHead} from "@mui/material";
import {Box, styled} from "@mui/system";
import {Breadcrumb, SimpleCard} from "app/components";
import Settings from "./settings";
import Setting from "./setting";

import {fetchUserData} from "../../../auth/RoutsData";
import  React ,{useState} from "react";
const Container = styled("div")(({theme}) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: {margin: "16px"},
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: {marginBottom: "16px"},
    },
}));
const ContentBox = styled('div')(({theme}) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {margin: '16px'},
}));

const Title = styled('span')(() => ({
    fontSize: '1.2rem',
    fontWeight: '500',
    marginLeft: '2.5rem',
    textTransform: 'capitalize',
}));
const ProductTable = styled(Table)(() => ({
    minWidth: 400,
    whiteSpace: 'pre',
    '& small': {
        width: 50,
        height: 15,
        borderRadius: 500,
        boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
    },
    '& td': { borderBottom: 'none' },
    '& td:first-of-type': { paddingLeft: '16px !important' },
}));


const Profiluser = () => {
    const [userData,setUserData]=useState({});
    const [avatarData,setAvatarData]=useState("");

    React.useEffect(()=>{
        fetchUserData().then((response)=>{
            setUserData(response.data);
            setAvatarData(response.data.image.imageUrl)
        })
    },[])

    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{name: "Upadate", path: "/profil"}, {name: "Profil"}]}/>
            </Box>

            <ContentBox className="analytics">
                <Grid container spacing={3}>
                    <Grid item lg={3.3} md={7} sm={10} xs={12}>
                        <Card sx={{ px: 3, py: 2, mb: 3, bgcolor:"#e6e6e6"  }}>


                                <Avatar src={avatarData}    sx={{ width: 200, height: 200}} />
                            <Title>{userData.firstName} {userData.lastName}</Title>

                        </Card>

                    </Grid>
                    <Grid item lg={8.7} md={8} sm={10} xs={12}>


                            <Card sx={{ px: 3, py: 2, mb: 3, bgcolor:"#e6e6e6" }}>
                            <Box overflow="auto">
                                <ProductTable>
                                    <TableHead>

                                            <TableCell sx={{ px: 3 }} colSpan={4}>
                                                Username: {userData.username}
                                            </TableCell>
                                            <TableCell sx={{ px: 3 }} colSpan={4}>
                                                Birthdate: {userData.birthdate}
                                            </TableCell>

                                    </TableHead>
                                    <TableHead>

                                        <TableCell sx={{ px: 3 }} colSpan={4}>
                                            Mail: {userData.mail}
                                        </TableCell>
                                        <TableCell sx={{ px: 3 }} colSpan={4}>
                                            Phone:{userData.phone}
                                        </TableCell>

                                    </TableHead>
                                    <TableHead>
                                        <TableCell sx={{ px: 3 }} colSpan={4}>
                                            Role: {userData.role}
                                        </TableCell>
                                        <TableCell sx={{ px: 3 }} colSpan={4}>
                                            Name: {userData.nationnality}
                                        </TableCell>

                                    </TableHead>
                                    <TableHead>
                                        <TableCell sx={{ px: 3 }} colSpan={4}>
                                            Post: {userData.poste}
                                        </TableCell>

                                        <TableCell sx={{ px: 3 }} colSpan={4}>
                                            Start Date: {userData.dateCreation}
                                        </TableCell>

                                    </TableHead>

                                </ProductTable>
                            </Box>

                        </Card>
                    </Grid>
                    <Grid item lg={6} md={5} sm={10} xs={12}>
                        <SimpleCard title="Settings">
                            <Settings/>
                        </SimpleCard>

                    </Grid>
                    <Grid item lg={6} md={8} sm={10} xs={12}>
                        <SimpleCard>
                            <Setting/>
                        </SimpleCard>

                    </Grid>
                </Grid>
            </ContentBox>


        </Container>
);
};


export default Profiluser;
