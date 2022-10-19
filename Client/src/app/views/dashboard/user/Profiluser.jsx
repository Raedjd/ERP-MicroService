import { Stack } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Breadcrumb, SimpleCard } from "app/components";
import Profilform from "./profilform";


const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
}));


const Profiluser = () => {
    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "Upadate", path: "/profil" }, { name: "Profil" }]} />
            </Box>

            <Stack spacing={3}>
                <SimpleCard title="Profil">
                    <Profilform />
                </SimpleCard>


            </Stack>
        </Container>
    );
};


export default Profiluser;
