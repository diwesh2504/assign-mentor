import {useState,useEffect} from "react";

function D(props){
    
    return (
        props.students.map((s)=>{
            return (
                <tr>
                <td>{s.id}</td>
                <td>{s.name}</td>
                </tr>
            )
        })
    )

}
export default function Display(){
    const [mentors,setMentors]=useState([]);
    const [students,setStudents]=useState([]);
    const [flag,setFlag]=useState(0)
    function fetchData(){
        fetch(`http://localhost:4040/getmentor`)
        .then(data=>data.json())
        .then(d=>{setMentors(d)})
    }
    const handleClick=()=>{
        let sel=document.getElementById("mentor_select");
        let mentor=sel.options[sel.selectedIndex];
        mentors.forEach((m)=>{
            if(m.id==mentor.value)
                setStudents(m.students);
        })
        setFlag(flag+1);
    }
    useEffect(()=>{
        fetchData();
    },[flag])
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-1 col-md-3 col-lg-3"></div>
                <div className="col-sm-10 col-md-6 col-lg-6">
                <form>
                    <div className="form-row">
                    <div className="col-auto my-1">
                    <label htmlFor="mentor_select">Select Mentor</label>
                        <select className="custom-select mr-sm-2" id="mentor_select">
                            {mentors.map((m)=>{
                                return <option value={m.id}>{m.name}</option>
                            })}
                        </select>
                    </div>
                    <div className="col-auto my-1">
                        <button style={{position:"absolute",bottom:"1px"}} type="button" onClick={handleClick} className="btn btn-success">Show</button>
                    </div>
                    </div>
                </form>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Student ID</th>
                        <th scope="col">Student Name</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            students.length!==0? <D students={students}/>:<p>No students to show</p>
                        }
                    </tbody>
                       
                </table>
                </div>
                <div className="col-sm-1 col-md-3 col-lg-3"></div>
            </div>
        </div>
    )
}