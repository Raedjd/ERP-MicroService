import { Grid, styled, useTheme } from '@mui/material';
import { Fragment } from 'react';

import StatCards from './shared/StatCards';


const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));



const Analytics = () => {


  return (
      <Fragment>
        <ContentBox className="analytics">
          <Grid container spacing={3}>
            <Grid item lg={10} md={8} sm={12} xs={12}>
              <StatCards />
            </Grid>


          </Grid>
        </ContentBox>
      </Fragment>
  );
};

export default Analytics;