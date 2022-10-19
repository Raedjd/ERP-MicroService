import { Stack } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Breadcrumb, SimpleCard } from "app/components";
import Productform from "./productform";
import Productlist from "./productlist";




const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
}));


const Product = () => {
    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "Products", path: "/add && liste" }, { name: "Products" }]} />
            </Box>

            <Stack spacing={3}>
                <SimpleCard title="Add product">
                 <Productform/>
                </SimpleCard>
                <SimpleCard title="List products">
                 <Productlist/>
                </SimpleCard>


            </Stack>
        </Container>
    );
};


export default Product;
