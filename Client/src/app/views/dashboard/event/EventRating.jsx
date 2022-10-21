import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Typography from '@mui/material/Typography';
import axios from "axios";

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
        color: '#ff3d47',
    },
});

export default function EventRating({idEvent}) {
    return (
        <Box
            sx={{
                '& > legend': { mt: 2 },
            }}
        >

            <StyledRating
                name="customized-color"
                defaultValue={0}
                getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
                precision={0.5}
                icon={<FavoriteIcon fontSize="inherit" />}
                emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                onClick={(e) => {
                    axios({
                        method: "post",
                        url: `http://localhost:8762/event-service/rating/add/${idEvent}`,
                        data: {
                            scoreRating:e.target.value


                        },


                    })
                    window.location.reload();
                }}

            />

        </Box>
    );
}
