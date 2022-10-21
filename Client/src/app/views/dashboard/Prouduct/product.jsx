import { Stack } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Breadcrumb, SimpleCard } from "app/components";
import Productlist from "./productlist";
import FormDialogProduct from "./productform";

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
                    <FormDialogProduct/>
                 <Productlist/>
                </SimpleCard>


            </Stack>
        </Container>
    );
};


export default Product;
