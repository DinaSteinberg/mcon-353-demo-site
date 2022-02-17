import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

export const TodoInput = () => {

    return (<div id = "todo_input">
        <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
        '& button': { m: 1 }
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="ToDo Title" variant="outlined" />
      <TextField id="outlined-basic" label="ToDo Description" variant="outlined" />
      <Button variant="text" size="small"><AddIcon /></Button>
      
    </Box>
    </div>);
}

