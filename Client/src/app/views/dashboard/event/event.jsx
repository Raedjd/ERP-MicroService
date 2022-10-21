import { Stack } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Breadcrumb, SimpleCard } from "app/components";
import Eventcalender from "./eventcalender";





const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
}));


const Event= () => {
    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "Products", path: "/add && liste" }, { name: "Products" }]} />
            </Box>

            <Stack spacing={3}>
                <SimpleCard title="Add product">
                    <Eventcalender/>
                </SimpleCard>



            </Stack>
        </Container>
    );
};


export default Event;
