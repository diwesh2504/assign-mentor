import React from "react";
import Snackbar from "@material-ui/core/Snackbar";

export default function ChangeMentor(){
    const [students,setStudents]=React.useState([]);
    const [mentors,setMentors]=React.useState([]);
    const [open,setOpen]=React.useState(false);
    const [mess,setMess]=React.useState("");
    const [flag,setFlag]=React.useState(0);
    const snackbarClose = ()=> {
     setOpen(false);
      };
    function fetchData(){
        fetch("https://assign-mentor-b.herokuapp.com/getstudents")
        .then(data=>data.json())
        .then(d=>{setStudents(d)})
        fetch("https://assign-mentor-b.herokuapp.com/getmentors")
        .then(data=>data.json())
        .then(d=>{setMentors(d)})
    }
    React.useEffect(()=>{
        fetchData()
    },[flag])

    const handleChange=async (e)=>{
            let student_id=e.target.id.split(",")[0];
            let sel=document.getElementById(`mentor_change${student_id}`);
            let mentor=sel.options[sel.selectedIndex];
            let old_mentor_id=e.target.id.split(",")[1];
            let student_name=e.target.id.split(",")[2];
            let send_data={mentor_name:mentor.text,mentor_id:mentor.value,old_mentor_id,student_name};
            console.log("Check send data",send_data)
            let r=await fetch(`https://assign-mentor-b.herokuapp.com/changementor/${student_id}`,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
              },
              body:JSON.stringify(send_data)
            }
            );
            let txt=await r.text();  //Snackbar 
            setMess(txt);
            setOpen(true);
            setFlag(flag+1);
    }
        return (
        <div className="container">
            <div className="row">
                <div className="col-sm-2 col-md-3 col-lg-3"></div>
                <div className="col-sm-8 col-md-6 col-lg-6">
                    <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Mentor</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        students.map((s)=>{
                           return (<tr>
                                <td>{s.id}</td>
                                <td>{s.name}</td>
                                <td>{s.mentor_name}</td>
                                <td>
                                    <div>
                                        <select style={{width:"18rem"}} class="form-control-sm" id={`mentor_change${s.id}`}>
                                            {mentors.map((m)=>{
                                                if(m.id!==s.mentor_id)
                                                  return <option value={m.id}>{m.name}</option>;
                                            })}
                                        </select>
                                        <button id={`${s.id},${s.mentor_id},${s.name}`} type="button" onClick={handleChange} className="btn btn-primary btn-sm">Assign/Change</button>
                                    </div>
                                </td>
                            </tr>)
                        })
                    }
                    </tbody>
                    </table>
        
                </div>
                <div className="col-sm-2 col-md-3 col-lg-3"></div>
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