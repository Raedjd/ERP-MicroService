import { Stack } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Breadcrumb, SimpleCard } from "app/components";
import Toolsform from "./toolsform";
import Toolslist from "./toolslist";



const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
}));


const Tools = () => {
    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "Tools", path: "/add && liste" }, { name: "Tools" }]} />
            </Box>

            <Stack spacing={3}>
                <SimpleCard title="Tools">
                 <Toolsform/>
                </SimpleCard>
                <SimpleCard title="List tools">
                    <Toolslist/>
                </SimpleCard>


            </Stack>
        </Container>
    );
};


export default Tools;
