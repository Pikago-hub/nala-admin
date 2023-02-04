/* eslint-disable */

'use client'

import { Button, TextField, Card, CardContent, CardActions, CardHeader,  } from '@mui/material'
import { GeoPoint } from 'firebase/firestore';
import { useState } from 'react';
import { collection, addDoc, doc, query } from "firebase/firestore"; 
import {firestore }from '../utils/firebase'
const AddMeteorite = () => {
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [visible, setVisible] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  //const [coordinates, setCoordinates] = useState(new GeoPoint(parseInt(latitude), parseInt(longitude)))
// ADD A NEW DOCUMENT TO YOUR COLLECTION
const addMeteorite = async (meteoriteData) => {
    
  const db = firestore
    const q = query(collection(db, "Meteorites"));

const querySnapshot = await addDoc(q, meteoriteData);
  //const newMeteorite = await addDoc(meteoriteCollection, { ...meteoriteData });
  //console.log(`The new meteorite was created at ${newMeteorite.path}`);
  
};
  const addNewMeteorite = (e) => {
    
    e.preventDefault();
   // setCoordinates(new GeoPoint(parseInt(latitude), parseInt(longitude)))
    //console.log(coordinates)
    console.log(new GeoPoint(parseInt(latitude), parseInt(longitude)))
    const coordinates = new GeoPoint(parseInt(latitude), parseInt(longitude))
    addMeteorite({
        coordinates,
        
        name,
        description,
        visible,
        
    });
    
    //console.log("successfully added a new Meteorite");
    alert("successfully added a new Meteorite")
    
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
                <label>Visible</label>
                 <select value={visible} onChange={(e) => setVisible(e.target.value)}>
                   <option value=""> </option>
                   <option value="True">True</option>
                   <option value="False">False</option>
                   </select>
               
               </div>
             </CardContent>
             <CardActions>
             
               </CardActions>
             </Card>
       
       {/*
                 <label>Meteorite latitude:</label>
                 <input
                   type="text"
                   required
                   value={latitude}
                   onChange={(e) => setLatitude(e.target.value)}
                 />
                 <label>Meteorite longitude:</label>
                 <input
                   type="text"
                   required
                   value={longitude}
                   onChange={(e) => setLongitude(e.target.value)}
                 />
                 <label>Meteorite name:</label>
                 <textarea
                   required
                   value={name}
                   onChange={(e) => setName(e.target.value)}
                 ></textarea>
                 
                 <label>Meteorite description:</label>
                 <textarea
                   required
                   value={description}
                   onChange={(e) => setDescription(e.target.value)}
                 ></textarea>
         
                 <label>Visible</label>
                 <select value={visible} onChange={(e) => setVisible(e.target.value)}>
                   <option value=""> </option>
                   <option value="True">True</option>
                   <option value="False">False</option>
                   </select>
         
                 <button >Add Meteorite</button>
                 */
       }
           <Button variant="outlined" onClick={addNewMeteorite}>Add Meteorite</Button>
               </form>
    )
    
    
}

export default AddMeteorite;