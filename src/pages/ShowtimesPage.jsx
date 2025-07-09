```jsx
import * as React from 'react';
import { Box, Typography, Container, Grid, Paper, Button } from '@mui/material';

const ShowtimesPage = () => {
  const theatres = [
    { name: "Cinema A", location: "123 Main St", showtimes: [{ time: "7:00 PM" }, { time: "9:30 PM" }] },
    { name: "Cinema B", location: "456 Oak Ave", showtimes: [{ time: "8:00 PM" }, { time: "10:00 PM" }] },
  ];

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>Showtimes</Typography>
      <Grid container spacing={3}>
        {theatres.map((theatre) => (
          <Grid item xs={12} sm={6} key={theatre.name}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6">{theatre.name}</Typography>
              <Typography variant="body1">{theatre.location}</Typography>
              <Box>
                {theatre.showtimes.map((showtime) => (
                  <Button key={showtime.time} variant="contained" size="small">
                    {showtime.time}
                  </Button>
                ))}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ShowtimesPage;
```