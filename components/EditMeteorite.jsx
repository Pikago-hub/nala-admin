/* eslint-disable */

'use client'

import { v4 as uuid } from 'uuid';
import { Button, TextField, Card, CardContent, CardActions, CardHeader,  } from '@mui/material'
import { GeoPoint } from 'firebase/firestore';
import {  useState, useId } from 'react';
import { collection, addDoc, doc, query } from "firebase/firestore"; 
import {firestore }from '../utils/firebase'
const EditMeteorite = () => {
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [visible, setVisible] = useState("");
  const [nation, setNation] = useState("");
  const [state, setState] = useState("");
  const [picture, setPicture] = useState("");
  const [id, setId] = useState("")
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
// ADD A NEW DOCUMENT TO YOUR COLLECTION
const addMeteorite = async (meteoriteData) => {
    
  const db = firestore
    const q = query(collection(db, "Meteorites"));
try{
const querySnapshot = await addDoc(q, meteoriteData);
}catch(err){
  alert(err)
}
  //const newMeteorite = await addDoc(meteoriteCollection, { ...meteoriteData });
  //console.log(`The new meteorite was created at ${newMeteorite.path}`);
  
};

  const addNewMeteorite = (e) => {
    
    //e.preventDefault();
    //console.log(new GeoPoint(parseInt(latitude), parseInt(longitude)))
    const coordinates = new GeoPoint(parseInt(latitude), parseInt(longitude))
    let _id = uuid().toString();
    
    addMeteorite({
        _id,
        coordinates,
        state,
        name,
        description,
        nation,
        visible,
        picture
    });
    
    //console.log("successfully added a new Meteorite");
    //alert("successfully added a new Meteorite")
    
    
  };

    return(
        <form onSubmit={(e) => addNewMeteorite(e)} style={{
             //width: '50%',
             //margin: 'auto',
            // textAlign:'center',
             //display: 'inline-block',
            
             
           }}>
               <Card >
             <CardHeader  title="Add a new Meteorite: " />
             <CardContent>
               <div>
                 <TextField
                   inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                   fullWidth
                   id="lat"
                   type="latitude"
                   label="latitude"
                   
                   margin="normal"
                   value={latitude}
                   onChange={(e) => setLatitude(e.target.value)}
                   
                 />
                 <TextField
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                   fullWidth
                   id="lat"
                   type="longitude"
                   label="longitude"
                   
                   margin="normal"
                   value={longitude}
                   onChange={(e) => setLongitude(e.target.value)}
                   
                 />
                 <TextField
                  
                  fullWidth
                  id="name"
                  type="name"
                  label="name"
                  
                  margin="normal"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  
                />
                <TextField
                  
                  fullWidth
                  id="desc"
                  type="desc"
                  label="description"
                  
                  margin="normal"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  
                />
                <TextField
                  
                  fullWidth
                  id="desc"
                  type="desc"
                  label="picture"
                  
                  margin="normal"
                  value={picture}
                  onChange={(e) => setPicture(e.target.value)}
                  
                />
                <label>Visible:  </label>
                 <select value={visible} onChange={(e) => setVisible(e.target.value)}>
                   <option value=""> </option>
                   <option value="True">True</option>
                   <option value="False">False</option>
                   </select>
                   <br></br>
                   <label>Nation:  </label>
                 <select value={nation} onChange={(e) => setNation(e.target.value)}>
                   <option value="">n/a </option>
                   <option value="Cherokee">Cherokee</option>
                   <option value="Chickasaw">Chickasaw</option>
                   <option value="Choctaw">Choctaw</option>
                   </select>
                   <br></br>
                   <label>State:  </label>
                 <select value={state} onChange={(e) => setState(e.target.value)}>
                   <option value=""> </option>
                   <option value="Oklahoma">Oklahoma</option>
                   
                   </select>
               </div>
             </CardContent>
             <CardActions>
             
               </CardActions>
             </Card>
       
      
           <Button variant="outlined" onClick={addNewMeteorite}>Add Meteorite</Button>
               </form>
    )
    
    
}

export default EditMeteorite;