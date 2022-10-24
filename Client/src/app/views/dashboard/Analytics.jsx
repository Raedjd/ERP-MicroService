import {Button, Card, Grid, Icon, styled, TextField, useTheme} from '@mui/material';
import {Fragment, useEffect} from 'react';
import Campaigns from './shared/Campaigns';
import DoughnutChart from './shared/Doughnut';
import RowCards from './shared/RowCards';
import StatCards from './shared/StatCards';
import StatCards2 from './shared/StatCards2';
import TopSellingDepartment from './shared/TopSellingDepartment';
import UpgradeCard from './shared/UpgradeCard';
import {Span} from "../../components/Typography";

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  marginRight: '.5rem',
  textTransform: 'capitalize',
}));

const SubTitle = styled('span')(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
}));

const H4 = styled('h4')(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: '500',
  marginBottom: '16px',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
}));




const Analytics = () => {
  const { palette } = useTheme();

  return (
    <Fragment>
      <ContentBox className="analytics">
        <Grid container spacing={3}>
          <Grid item lg={8} md={8} sm={12} xs={12}>

            <TopSellingDepartment />

          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Card sx={{ px: 3, py: 2, mb: 3 }}>
              <Title>Add department</Title>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <TextField
                    type="text"
                    name="Name"
                    id="standard-basic"
                    label="Name of departemnt"

                />

              </Grid>
              <Button color="primary" variant="contained" type="submit">
                <Icon>send</Icon>
                <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
              </Button>

            </Card>
            <Card sx={{ px: 3, py: 2, mb: 3 }}>
              <Title>Add Role</Title>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <TextField
                    type="text"
                    name="role"
                    id="standard-basic"


                    label="Name of role"

                />
                <Button color="primary" variant="contained" type="submit">
                  <Icon>send</Icon>
                  <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
                </Button>
              </Grid>

            </Card>

            <Card sx={{ px: 3, py: 2, mb: 3 }}>
              <Title>Add Role</Title>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <TextField
                    type="text"
                    name="username"
                    id="standard-basic"


                    label="Username "

                />
                <TextField
                    name="password"
                    type="password"
                    label="Password"

                />
                <TextField
                    type="password"
                    name="confirmPassword"

                    label="Confirm Password"


                />
                <Button color="primary" variant="contained" type="submit">
                  <Icon>send</Icon>
                  <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
                </Button>
              </Grid>

            </Card>

          </Grid>
        </Grid>
      </ContentBox>
    </Fragment>
  );
};

export default Analytics;
