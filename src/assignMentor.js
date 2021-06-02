import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
export default function AssignMentor(){
    const [students,setStudents]=React.useState([]);
    const [mentors,setMentors]=React.useState([]);
    const [open,setOpen]=React.useState(false);
    const [mess,setMess]=React.useState("");
    const [flag,setFlag]=React.useState(0);
    const snackbarClose = ()=> {
        setOpen(false);
         };
    function fetchData(){
        fetch("http://localhost:4040/getstudents")
        .then(data=>data.json())
        .then(d=>{setStudents(d);/*console.log(d)*/})
        fetch("http://localhost:4040/getmentors")
        .then(data=>data.json())
        .then(d=>{setMentors(d);/*console.log(d)*/})
    }
    async function assign(){
        try{
            let temp_json={},temp_array=[];
            let selected=document.querySelectorAll('input[type="checkbox"]:checked')
            let mentor_id=document.querySelector('input[type="radio"]:checked').id;
            console.log(mentor_id);
            if(mentor_id==null){
                throw "Select Mentor!"
            }
            let mentor_name=document.querySelector('input[type="radio"]:checked').value;
            let men=mentor_id+"-"+mentor_name;
            selected.forEach((s)=>{
                temp_json={name:s.value,id:s.id,m_name:mentor_name};
                temp_array.push(temp_json);
            })
            let r=await fetch(`http://localhost:4040/addstudents/${men}`,{
                method:"POST",
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                  },
                  body:JSON.stringify(temp_array)
                }
            );
            let txt=await r.text();  //Snackbar 
            setMess(txt);
            setOpen(true);
            setFlag(flag+1);
        }catch(err){
            console.log(err);
            setMess(`${err}`);
            setOpen(true);
            setFlag(flag+1);
        }
    }
    React.useEffect(()=>{
        fetchData();
    },[flag])
    function withoutMentors(){
        let c=0;
        students.forEach((s)=>{
            if(s.mentor_name==""){
                c++;
            }
        })
        if(c==0)
            return true;
        else
            return false;
    }
    return (
        <div className="container">
            <div className="row" style={{marginTop:"5%",marginLeft:"10%"}}>
                <div className="col-lg-3 col-sm-4">
                    <h6>List of Students</h6>
                    {students.map((s)=>{
                        if(s.mentor_name==""){
                            return (
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value={s.name} id={s.id}/>
                                    <label class="form-check-label" for={s.id}>
                                         {s.name}
                                    </label>
                                </div>
                             )
                        }
                    })} 
                </div>
                <div className="col-lg-3 col-sm-4">
                        <h6 >Select Mentor</h6>
                        {mentors.map((s)=>{
                            return (
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="mentor" value={s.name} id={s.id}/>
                                    <label class="form-check-label" for={s.id}>
                                        {s.name}
                                    </label>
                                </div>
                                )
                        })}
                </div>
                <div className="col-lg-3 col-sm-4">
                    <button style={{marginTop:"20%"}} type="button" onClick={assign} disabled={withoutMentors()} class="btn btn-primary btn-block">Assign</button>
                </div>
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
