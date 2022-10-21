import {
    Card, CardActions,
    CardContent, CardHeader, CardMedia,
    Grid,

} from "@mui/material";
import {styled} from "@mui/system";
import { fetchPostsData} from "../../../auth/RoutsData";
import  React ,{useState} from "react";
import Typography from "@mui/material/Typography";

import UserPostAvatarData from "./UserPostData/userPostAvatarData";
import UserPostNameData from "./UserPostData/userPostNameData";
import {dateParser} from "../utilis";
import UserPostEdit from "./UserPostData/userPostEdit";
import UserPostDelete from "./UserPostData/userPostDelete";
import LikePost from "./UserPostData/likePost";
import ShowLike from "./UserPostData/showLike";
import FeedbackPost from "./UserPostData/posDetails";

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



export default function  PostCard ({userAdd}){


    const [postsData,setPostsData]=useState({});
    React.useEffect(()=>{
        fetchPostsData().then((response)=>{
            setPostsData(response.data);

        })
    },[])
    const posts = Object.keys(postsData).map((key) => postsData[key]).sort((a,b)=>b.id-a.id);



    return (
        <Container>
            <ContentBox className="analytics">
                <Grid container spacing={3}>
                    {posts.map((p, index) => (

                    <Grid item lg={4} md={6} sm={10} xs={14} sx={{ bgcolor:"#fafafa"  }} key={index}  >


                            <Card sx={{ maxWidth: 345 }}>
                                <CardHeader
                                    avatar={
                                  <UserPostAvatarData  userAdd={p.userid}></UserPostAvatarData>
                                    }

                                    title={<UserPostNameData  userAdd={p.userid}></UserPostNameData>}
                                    subheader={dateParser(p.dateCreation)}
                                />
                                <CardMedia
                                    component="img"
                                    height="194"
                                    image={p.image.imageUrl}
                                />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        {p.description}
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing>

                                    <LikePost  userAdd={p.userid} idPost={p.id} ></LikePost>
                                    <ShowLike idPost={p.id} ></ShowLike>
                                    <UserPostEdit  userAdd={p.userid} idPost={p.id} ></UserPostEdit>
                                    <UserPostDelete userAdd={p.userid} idPost={p.id}></UserPostDelete>
                                 <FeedbackPost idPost={p.id}></FeedbackPost>
                                </CardActions>

                            </Card>

                    </Grid>

                    ))}
                </Grid>
            </ContentBox>


        </Container>
    );
};