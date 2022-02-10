import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import * as React from 'react';

export default () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 128,
          height: 128,
        },
      }}
    >
      <Paper elevation={0} >{"Hello World"}</Paper>
      <Paper />
      <Paper elevation={3} />
    </Box>
  );
}