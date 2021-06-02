import './App.css';
import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Button, Toolbar } from '@material-ui/core';
import Display from './display';
import AssignMentor from "./assignMentor";
import CreateMentor from "./createMentor";
import CreateStudent from "./createStudent";
import ChangeMentor from './changeMentor';



function DefaultView(){
  return (
    <div style={{marginTop:"50px"}}>Please select an action from the App Bar to continue </div>
  )
}
function App() {
  const [anchorEl,setAnchorEl]=React.useState(null);
  const [action,setAction]=React.useState("");

  const handleButton=(event)=>{
    setAnchorEl(event.currentTarget);
    
  }
  const handleClose=(e)=>{
    setAction(e.target.id);
    setAnchorEl(null);
  }
  return (
    <>
      <h1 className="display-4">Mentor Assigning</h1>
      <AppBar position="static">
      <Toolbar>
      <Button id="btn" aria-controls="simple-menu" aria-haspopup="true" variant="outlined" onClick={handleButton} >Choose Action</Button>
      <Menu
        id="simple-menu"
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem id="create_mentor" onClick={handleClose}>Create Mentor</MenuItem>
        <MenuItem id="create_student"onClick={handleClose}>Create Student</MenuItem>
        <MenuItem id="assign_mentor"onClick={handleClose}>Assign Student to Mentor</MenuItem>
        <MenuItem id="change_mentor"onClick={handleClose}>Assign/Change Mentor</MenuItem>
        <MenuItem id="display" onClick={handleClose}>Display Student</MenuItem>
      </Menu>
      </Toolbar>
      </AppBar>
      <div>
        {action===""?<DefaultView/>:""}
        {action==="create_mentor"?<CreateMentor/>:""}
        {action==="assign_mentor"?<AssignMentor/>:""}
        {action==="create_student"?<CreateStudent/>:""}
        {action==="change_mentor"?<ChangeMentor/>:""}
        {action==="display" ?<Display/>:""}
      </div>
    </>
  );
}

export default App;
