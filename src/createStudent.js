import React from "react";
import Snackbar from "@material-ui/core/Snackbar";

export default function CreateStudent(){
    const [open,setOpen]=React.useState(false);
    const [mess,setMess]=React.useState("");
    const snackbarClose=()=>{
        setOpen(false);
    }
    const handleSubmit=async (e)=>{
        e.preventDefault();
        var send_student_data={
            "stud_name":document.getElementById("stud_name").value,
            "stud_year":document.getElementById("stud_year").value
        }
        console.log(send_student_data);
        var r=await fetch('https://assign-mentor-b.herokuapp.com/createstudent',{
            method:"POST",
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
              },
              body:JSON.stringify(send_student_data)
            }
        );
        var txt=await r.text();
         setMess(txt);
         setOpen(true);
 
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-4 col-lg-4 col-xl-4"></div>
                <div className="col-sm-4 col-lg-4 col-xl-4">
                    <p>Create Student</p>
                    <form onSubmit={handleSubmit}> 
                    <div style={{marginTop:"10px"}}>
                        <label for="stud_name" className="">Name</label>
                            <div className="">
                            <input type="text" id="stud_name" className="form-control"/>  
                            </div>
                    </div>
                    <div style={{marginTop:"10px"}}>
                        <label for="stud_year" className="">Year</label>
                        <div className="">
                            <input type="text" id="stud_year" className="form-control"/>  
                        </div>
                    </div>
                    <button type="submit" style={{marginTop:"10px"}} className="btn btn-primary">Create</button>
                    </form>
                </div>
                <div className="col-sm-4 col-lg-4 col-xl-4"></div>
            </div>
            <Snackbar
                anchorOrigin={{
                         vertical: 'bottom',
                        horizontal: 'center',
                }}
                open={open}
                autoHideDuration={1500}
                 onClose={snackbarClose}
                message={mess}/>
        </div>
    )
}