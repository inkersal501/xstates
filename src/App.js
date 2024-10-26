import './App.css';
import { useEffect, useState } from "react";
import axios from 'axios';
import Dropdown from './Components/Dropdown';
 
function App() {
  
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");

  const [states, setStates] = useState([]);
  const [state, setState] = useState("");
  const [stateDisabled, setStateDisabled] = useState(true);

  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");
  const [cityDisabled, setcityDisabled] = useState(true);

  const [showSelected, setShowSelected] = useState(false);
  
  useEffect(()=>{

    const getCountries = async ()=>{
      try {
        const data = await axios.get("https://crio-location-selector.onrender.com/countries");
        setCountries(data.data);        
        // console.log(data);
      } catch (error) {
        alert("Error fetching contries data");
      } 
    }; 
    getCountries();
  }, []);

  useEffect(()=>{

    const getStates = async ()=>{
      try {
        const data = await axios.get(`https://crio-location-selector.onrender.com/country=${country}/states`);
        setStates(data.data);
        setStateDisabled(false);        
        // console.log(data);
      } catch (error) {
        alert("Error fetching States data");
      } 
    }; 
    if(country!=="")
      getStates();
  }, [country]);

  useEffect(()=>{

    const getCities = async ()=>{
      try {
        const data = await axios.get(`https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`);
        setCities(data.data); 
        setcityDisabled(false);       
        // console.log(data);
      } catch (error) {
        alert("Error fetching City data");
      } 
    }; 
    if(state!=="")
      getCities();
    //eslint-disable-next-line
  }, [state]);

  useEffect(()=>{
    if(country!=="" && state!=="" && city!=="")
      setShowSelected(true);
    //eslint-disable-next-line
  }, [city]);

  return (
    <div className="App">
      <h1>Select Location</h1>

      <div style={{display:"flex", gap:"20px", width:"100%", justifyContent:'center'}}>
        <div style={{width:"30%"}}>
          <Dropdown data={countries} defaultValue={"Select Country"} onChange={setCountry} value={country} disabled={false}/>
        </div>
        <div style={{width:"15%"}}>
          <Dropdown data={states} defaultValue={"Select State"} onChange={setState} disabled={stateDisabled}/>
        </div>
        <div style={{width:"15%"}}>
          <Dropdown data={cities} defaultValue={"Select City"} onChange={setCity} disabled={cityDisabled}/>
        </div>
      </div>
      <div>
        {showSelected && <h1><span style={{fontSize:"1.5rem"}}>You Selected</span> {city}, <span style={{color:"grey",fontSize:"1.5rem"}}>{state}, {country}</span></h1>}
      </div>
    </div>
  );
}

export default App;
