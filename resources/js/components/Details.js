import React,{useEffect, useState} from 'react'
import {useHistory,useParams} from 'react-router-dom'

export default function Details() {


    const [cities,setCities] = useState([]);
    const [name,setName] = useState("");
    const [firstName,setFirstName] = useState("");
    const [email,setEmail] = useState("");
    const [street,setStreet] = useState("");
    const [zipcode,setZipCode] = useState("");
    const [city,setCity] = useState("");
    const [userInfo,setUserInfo] = useState([]);
    const history = useHistory();
    

    let {id} = useParams();

    //console.log("id",useParams());

    async function fetchCities() {
        let response = await axios("http://localhost:8000/citydetails");
        let citiesInfo = response.data;
        setCities(citiesInfo);
      }

      async function fetchUserInfo(userId) {
        let response = await axios("http://localhost:8000/details/"+userId);
        let userInfo = response.data;
        console.log(userInfo);
        //setUserInfo(userInfo);
        setName(userInfo.name);
        setFirstName(userInfo.first_name);
        setEmail(userInfo.email_id);
        setStreet(userInfo.street);
        setZipCode(userInfo.zip_code);
        setCity(userInfo.city_id);
      }

    useEffect(() => {
       fetchCities();

       fetchUserInfo(id);

    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("name",name);

        const user = {
            name,
            firstName,
            email,street,zipcode,city
        }

        if(!id) {
        axios.post("http://localhost:8000/saveuser",{user})
             .then((res) => {
                 console.log(res);
                 let msg = res.data.msg;

                 if(msg == "success") {
                     history.push("/address");
                 }
             })
        }
        else {
            axios.put("http://localhost:8000/update/"+id,user)
                .then(res => {
                    console.log(res.data);
                    let msg = res.data.msg;

                    if(msg == "success") {
                        history.push("/address");
                    }
                })
        }
    }


    return (
        <div className="container pt-5">
            <div className="">
                <form onSubmit={handleSubmit}>
            <div className="form-group row">
                <label  className="col-sm-2 col-form-label">Name</label>
                <div className="col-sm-10">
                <input type="text" className="form-control" value={name || ""}
                  placeholder="Name" onChange={e => setName(e.target.value)} />

            </div>
             </div>
             <div className="form-group row">
                <label  className="col-sm-2 col-form-label">First Name</label>
                <div className="col-sm-10">
                <input type="text" className="form-control"  placeholder="First Name"
                       value={firstName || ""} onChange={e => setFirstName(e.target.value)} />

            </div>
             </div>

             <div className="form-group row">
                <label  className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                <input type="email" className="form-control"  placeholder="Email" value={email || ""}  onChange={e => setEmail(e.target.value)}/>

            </div>
             </div>

             <div className="form-group row">
                <label  className="col-sm-2 col-form-label">Street</label>
                <div className="col-sm-10">
                <input type="text" className="form-control"  placeholder="Street" value={street || ""} onChange={e => setStreet(e.target.value)}/>

            </div>
             </div>

             <div className="form-group row">
                <label  className="col-sm-2 col-form-label">Zip Code</label>
                <div className="col-sm-10">
                <input type="text" className="form-control"  placeholder="Zip Code" value={zipcode || ""} onChange={e => setZipCode(e.target.value)} />

            </div>
             </div>
  
             <div className="form-group row">
                <label  className="col-sm-2 col-form-label">City</label>
                <div className="col-sm-10">
                    {cities.length ? 
                <select className="form-control" onChange={e => setCity(e.target.value)} value={city || ""}>
                    <option value="">Select City</option>
                    {cities.map(data => (
                        <option key={data.id} value={data.id}>{data.city_name}</option>
                    ))}
                </select>
                : "Loading...."}

            </div>
             </div>

             <div className="form-group row">
                <div className="col-sm-10">
                <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </div>
            </form> 
  
  </div>
        </div>
    )
}
