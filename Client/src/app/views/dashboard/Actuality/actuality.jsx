import { Stack } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Breadcrumb, SimpleCard } from "app/components";
import PostbyUser from "./post";
import PostCard from "./cardPost";
const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
}));

const AppForm = () => {



    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "Posts", path: "/add && liste" }, { name: "Posts" }]} />
            </Box>

            <Stack spacing={3}>
                <SimpleCard title="Add post">
                  <PostbyUser></PostbyUser>
                </SimpleCard>
                 <PostCard></PostCard>
            </Stack>
        </Container>
    );
};



export default AppForm;
