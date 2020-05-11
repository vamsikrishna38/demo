import React, {useEffect,useState} from 'react'
import axios from 'axios';
import {Link,useHistory} from 'react-router-dom';


export default function Address() {

  const [users,setUsers] = useState([]);
  const history = useHistory();

  async function fetchData() {
    let response = await axios("http://localhost:8000/addressdetails");
    let userinfo = response.data;
    setUsers(userinfo);
  }

  async function exportXml() {
    let res = await axios("http://localhost:8000/exportxml",{responseType:"blob"})
    .then((res) =>  {
    
        console.log(res.data);
      const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'file.xml'); //or any other extension
    document.body.appendChild(link);
    link.click();

  });
}

async function exportJson() {
  let res = await axios("http://localhost:8000/exportjson",{responseType:"application/json"})
  .then((res) =>  {
  
      console.log(res.data);
     const url = window.URL.createObjectURL(new Blob([ JSON.stringify(res.data)]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'usersinfo.json'); //or any other extension
    document.body.appendChild(link);
    link.click();

});
}
    useEffect(() => {
      fetchData();

      
    },[])
    return (
        <div className="container pt-5">
            <div className="row">
<div>

<div className="float-right" >
  <Link className="btn btn-primary" to="/details" role="button" style={{margin:10}}>Add New</Link>
  <a className="btn btn-primary" href="#" role="button" style={{margin:10}} onClick={e => exportXml()}>Export Xml</a>
  <a className="btn btn-primary" href="#" role="button" style={{margin:10}} onClick={e => exportJson()}>Export Json</a>
</div>


</div>

            <table className="table">
  <thead className="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">First Name</th>
      <th scope="col">Email</th>
      <th scope="col">Street</th>
      <th scope="col">Zip</th>
      <th scope="col">City</th>
      <th scope="col">Edit</th>
    </tr>
  </thead>
  <tbody>
    {users.map(data => (
      <tr scope="row" key={data.id}>
        <td>{data.id}</td>
        <td>{data.name}</td>
        <td>{data.first_name}</td>
        <td>{data.email_id}</td>
        <td>{data.street}</td>
        <td>{data.zip_code}</td>
        <td>{data.city.city_name}</td>
        <td><button className="btn btn-primary btn-xs" onClick={e => history.push("/edit/"+data.id) } ><span className="fa fa-pencil"></span></button></td>
      </tr>
    ))}
    
  
   
  </tbody>
</table>


            </div>
            
        </div>
    )
}
