import './App.css';
import {useEffect, useState} from "react";
import {MdClose} from "react-icons/md";
import axios from "axios";
axios.defaults.baseURL="http://localhost:8080/"
function App() {
  const [addSection,setAddSection]=useState(false);
  const [formData,setFormData]=useState({
    name:"",
    rollNo:"",
    favoriteFruit:"",
  })
  const [dataList,setDataList]=useState([])
   const handleOnChange=(e)=>{
    const {value,name}=e.target
    setFormData((preve)=>{
      return{
        ...preve,
        [name]:value
      }
    })
   }
   //create 
  const handleSubmit=async(e)=>{
    e.preventDefault()
    const data=await axios.post("/create",formData)
    console.log(data)
    if(data.data.success) {
      setAddSection(false);
      alert(data.data.message);
      getFetchData();
    }
  }
  //get
  const getFetchData=async()=>{
    const data=await axios.get("/")
    console.log(data)
    console.log(data)
    if(data.data.success) {
      setDataList(data.data.data);
    }
  }
  useEffect(()=>{
    getFetchData() 
  },[])
  //delete
  const handleOnDelete=async(id)=>{
    const data=await axios.delete("/delete/"+id)
    if(data.data.success){
      getFetchData()
      alert(data.data.message)
    }
  }
  return (
    <>
      <div className="container">
        <button className="btn btn-add" onClick={()=>setAddSection(true)}>
          Add
        </button>
        {
          addSection && (
            <div className="addContainer">
            <form onSubmit={handleSubmit}>
            <div className="close-btn" onClick={()=>setAddSection(false)}><MdClose/></div>
              <label htmlFor="name">Name : </label>
              <input type="text" id="name" name="name" onChange={handleOnChange}/>
              <label htmlFor="rollNo">Roll Number : </label>
              <input type="number" id="rollNo" name="rollNo"  onChange={handleOnChange}/>
              <label htmlFor="favoriteFruit">Favorite Fruit : </label>
              <input type="text" id="favoriteFruit" name="favoriteFruit"  onChange={handleOnChange}/>
              <button className="btn">Submit</button>
            </form>
          </div>
          )
        }
        <div className='tableContainer'>
          <table>
            <thead>
            <tr>
              <th>Name</th>
              <th>Roll Number</th>
              <th>Favorite Fruit</th>
              <th>
            
              </th>
            </tr>
            </thead>
            <tbody>
              {
                dataList.map ((el)=>{
                  return(
                    <tr>
                      <td>{el.name}</td>
                      <td>{el.rollNo}</td>
                      <td>{el.favoriteFruit}</td>
                      <td>
                      <button className='btn btn-edit'>Edit</button>
                <button className='btn btn-delete' onClick={(()=>handleOnDelete(el._id))}>Delete</button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>

      </div>
    </>
  );
}

export default App;
