import logo from './logo.svg';
import birdhouses from './birdhouses_painting.jpg';
import bridge from './bridge_painting.jpg';
import family from './my_family.jpg';
import nieces from './my_nieces.jpg';
import sunset from './sunset_painting.jpg';
import kids from './the_kids.jpg';
import { Button, Slider } from "@mui/material";
import './App.css';
import React, {useState} from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


function Papers ()  {
  return (
    <Box
      sx={{
        textAlign:'center',
        verticalAlign: 'middle',
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 300,
          height: 350,
        },
      }}
    >
      <Paper elevation={0} ><br/>Hello World</Paper>
      <Paper />
      <Paper elevation={3} />
    </Box>
  );
}

function App() {
  const[value, setValue] = useState(55);

  function onSliderChange(event){
    const newValue = event.target.value;
    console.log(newValue);
    setValue(newValue);
  }
  


  return (
    <div className="App">
      <header className="App-header">
        <p>
        <img class="float_left" width = "600rpm"  src = "https://previews.123rf.com/images/plotulit/plotulit1707/plotulit170700010/81425917-gitaar-aquarel-achtergrond-gitaar-ge%C3%A3%C2%AFsoleerd-.jpg" />
        <div>
        <h1>Dina Steinberg</h1>
        <h3>Computer Programming Student in Touro</h3>
        </div>
        </p>
        <div class ="Bio">
          <h3>The scoop on Dina</h3>
          <p>
            Dina works in BYA Elementary school as a second and third grade assistant, and in
            Bnos Yisroel Elementary as a computer teacher/SuccessMaker overseer. She is also
            a dedicated and very busy college student. She has worked with multiple Programming
            languages and coding environments, and hopes to keep on learning more. She is currently 
            seeking a software development internship.<br/>
            Dina loves music, art, and her family. Check out her paintings and her family below!          
          </p>
        </div>
        <StandardImageList/>

        <p>Check out some of Dina's profiles:</p>
        <Links/>
        <InfoAccordion/>
        <Slider style={{ marginTop: "500px"}} value = {value} onChange={onSliderChange}/>//Don't call it with () because you want a function reference, not call. Call means you want to execute it right now.
      </header>
    </div>
    
  );
}

function StandardImageList() {
      return (
        <ImageList sx={{ width: 500, height: 450 }} variant="woven" cols={3} gap={8}>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=161&fit=crop&auto=format`}
                srcSet={`${item.img}?w=161&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
  );
}

const itemData = [
  {
    img: bridge,
    title: 'Bridge',
  },
  {
    img: sunset,
    title: 'Sunset',
  },
  {
    img: birdhouses,
    title: 'Birdhouse',
  },
  {
    img: family,
    title: 'My family',
  },
  {
    img: nieces,
    title: 'My nieces',
  },
  {
    img: kids,
    title: 'The kids',
  },
];

function Links(){
  return(
    <Box
    sx={{
      textAlign:'center',
      verticalAlign: 'middle',
      display: 'flex',
      flexWrap: 'wrap',
      padding: '30px',
      '& > *': {
        m: 1,
      },
    }}
  >
    <Button variant="contained" href = 'https://github.com/DinaSteinberg'>Git Hub link</Button>
    <Button variant="contained" href = 'https://www.linkedin.com/in/dinasteinberg/'>LinkedIn link</Button>
  </Box>
  );
}

function InfoAccordion() {
  return (
    <div class="Accordion">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Projects</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Dina has worked on multiple projects throughout her college carreer. Click on her
            GitHub link above to see her projects. They include:
            <ul>
              <li>A website she designed from scratch using HTML and CSS</li>
              <li>An Android App she coded. Unfortunately there is no API attached to it,
                but the UI is completely functional
              </li>
              <li>A robust Java program, called University Portal that enables
                communication between students and teachers in a school framework
              </li>
              <li>A DataBase created using SQL DDL that is designed to keep track of 
                credit cards and the information associated with them
              </li>
            </ul>
            Among others!
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Coding Languages</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Dina has experience is a few coding languages:<br/>
            -HTML and CSS<br/>
            -JavaScript<br/>
            -Java<br/>
            -Python<br/>
            And she is currently learning C# and the properties of programming languages.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Favorite Part of Coding</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Dina really enjoys coding. She was introduced to it in a STEM class she took in her high school.
            She then attended Girl Who Code and she had even more fun. When college came and it was time for
            her to choose her career path, she knew it had to be computer science. Now that Dina is learning all about
            coding, she is loving it. Her favorite part of coding is obviously when her program compiles :). But she also really
            likes the logic of programming and building up a working application.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default App;
