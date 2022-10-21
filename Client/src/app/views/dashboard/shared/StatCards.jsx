import { Box, Card, Grid, Icon, IconButton, styled, Tooltip } from '@mui/material';
import { Small } from 'app/components/Typography';
import React, {useState} from "react";
import axios from "../../../../axios";
import {getToken} from "../../../auth/RoutsData";

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '24px !important',
  background: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: { padding: '16px !important' },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  '& small': { color: theme.palette.text.secondary },
  '& .icon': { opacity: 0.6, fontSize: '44px', color: theme.palette.primary.main },
}));

const Heading = styled('h6')(({ theme }) => ({
  margin: 0,
  marginTop: '4px',
  fontSize: '14px',
  fontWeight: '500',
  color: theme.palette.primary.main,
}));

const StatCards = () => {
  const [countUsers,setCountUsers]=useState('');
  React.useEffect(()=>{
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}/user/countusers`,
      headers: {
        'Authorization': 'Bearer ' + getToken()
      }
    }).then((response)=>{
    setCountUsers(response.data)


    })
  },[])
  const [countDepart,setCountDepart]=useState('');
  React.useEffect(()=>{
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}/dep/countdepartments`,
      headers: {
        'Authorization': 'Bearer ' + getToken()
      }
    }).then((response)=>{
      setCountDepart(response.data)


    })
  },[])

  const [countEvent,setCountEvent]=useState('');
  React.useEffect(()=>{
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}/event/countevents`,
      headers: {
        'Authorization': 'Bearer ' + getToken()
      }
    }).then((response)=>{
      setCountEvent(response.data)


    })
  },[])
  const [countTools,setCountTools]=useState('');
  React.useEffect(()=>{
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}/tools/counttools`,
      headers: {
        'Authorization': 'Bearer ' + getToken()
      }
    }).then((response)=>{
      setCountTools(response.data)


    })
  },[])
  const [countPosts,setCountPosts]=useState('');
  React.useEffect(()=>{
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}/post/countposts`,
      headers: {
        'Authorization': 'Bearer ' + getToken()
      }
    }).then((response)=>{
      setCountPosts(response.data)


    })
  },[])
  const [countProds,setCountProds]=useState('');
  React.useEffect(()=>{
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}/product/countproducts`,
      headers: {
        'Authorization': 'Bearer ' + getToken()
      }
    }).then((response)=>{
      setCountProds(response.data)


    })
  },[])

  return (
    <Grid container spacing={3} sx={{ mb: '24px' }}>

        <Grid item xs={10} md={6} >
          <StyledCard elevation={6}>
            <ContentBox>
              <Icon className="icon">group</Icon>
              <Box ml="12px">
                <Small>Users</Small>
                <Heading>{countUsers}</Heading>
              </Box>
            </ContentBox>
          </StyledCard>
        </Grid>

      <Grid item xs={10} md={6} >
        <StyledCard elevation={6}>
          <ContentBox>
            <Icon className="icon">account_balance</Icon>
            <Box ml="12px">
              <Small>Departments</Small>
              <Heading>{countDepart}</Heading>
            </Box>
          </ContentBox>
        </StyledCard>
      </Grid>

      <Grid item xs={10} md={6} >
        <StyledCard elevation={6}>
          <ContentBox>
            <Icon className="icon">cake</Icon>
            <Box ml="12px">
              <Small>Events</Small>
              <Heading>{countEvent}</Heading>
            </Box>
          </ContentBox>
        </StyledCard>
      </Grid>
      <Grid item xs={10} md={6} >
        <StyledCard elevation={6}>
          <ContentBox>
            <Icon className="icon">build</Icon>
            <Box ml="12px">
              <Small>Tools</Small>
              <Heading>{countTools}</Heading>
            </Box>
          </ContentBox>
        </StyledCard>
      </Grid>

      <Grid item xs={10} md={6} >
        <StyledCard elevation={6}>
          <ContentBox>
            <Icon className="icon">local_parking</Icon>
            <Box ml="12px">
              <Small>Products</Small>
              <Heading>{countProds}</Heading>
            </Box>
          </ContentBox>
        </StyledCard>
      </Grid>
      <Grid item xs={10} md={6} >
        <StyledCard elevation={6}>
          <ContentBox>
            <Icon className="icon">border_color</Icon>
            <Box ml="12px">
              <Small>Posts</Small>
              <Heading>{countPosts}</Heading>
            </Box>
          </ContentBox>
        </StyledCard>
      </Grid>

    </Grid>
  );
};

export default StatCards;
