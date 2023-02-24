/* eslint-disable */

'use client'

import { v4 as uuid } from 'uuid';
import { Button, TextField, Card, CardContent, CardActions, CardHeader,  } from '@mui/material'
import { GeoPoint } from 'firebase/firestore';
import {  useState, useId } from 'react';
import { collection, addDoc, doc, query, where, onSnapshot, updateDoc } from "firebase/firestore"; 
import {firestore }from '../utils/firebase'
const EditTool = (props) => {
  const [description, setDescription] = useState(props.data.description);
  const [title, setTitle] = useState(props.data.title);
  const [visible, setVisible] = useState(props.data.visible);
  const [link, setLink] = useState(props.data.link);
  const [category, setCategory] = useState(props.data.category);
  const [standard, setStandard] = useState(props.data.standard);
  const [picture, setPicture] = useState(props.data.picture);
  const [id, setId] = useState(props.data._id)

  const data = props.data
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

  const editTool = async (e) => {
    
    e.preventDefault();
    //console.log(new GeoPoint(parseInt(latitude), parseInt(longitude)))
    
    //let _id = uuid().toString();
    const db = firestore
      
     
     
    const citiesRef = collection(db, "Educational Resources");
    

    const q = query(citiesRef, where("_id", "==", data._id));
    const cool = onSnapshot(q, (querySnapshot) => {
    querySnapshot.forEach((doc) =>{
     //doc.data
      updateDoc(doc.ref, {
      description: description,
      title: title,
      link: link,
      category: category,
      standard: standard,
      visible: visible,
      picture: picture
    });
    })
  })
  alert("successfully updated educational tool");
    
    
  };

    return(
        <form onSubmit={(e) => editTool(e)} style={{
             width: '50%',
             margin: 'auto',
             textAlign:'center',
             //display: 'inline-block',
            
             
           }}>
               <Card >
             <CardHeader  title="Edit Educational Tool: " />
           
             <CardContent>
               <div>
                 <TextField
                   
                   fullWidth
                   id="lat"
                   type="latitude"
                   label="Title"
                   
                   margin="normal"
                   value={title}
                   onChange={(e) => setTitle(e.target.value)}
                   
                 />
                 <TextField
                  
                   fullWidth
                   id="lat"
                   type="longitude"
                   label="Description"
                   
                   margin="normal"
                   value={description}
                   onChange={(e) => setDescription(e.target.value)}
                   
                 />
                 <TextField
                  
                  fullWidth
                  id="name"
                  type="name"
                  label="Link"
                  
                  margin="normal"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  
                />
                {/*
                <TextField
                  
                  fullWidth
                  id="desc"
                  type="desc"
                  label="Picture"
                  
                  margin="normal"
                  value={picture}
                  onChange={(e) => setPicture(e.target.value)}
                  
                />
                <br></br>
                <input type="file" onChange={handleChange} accept="/image/*" />
                
                
                <br></br>
        */}
                
                <label>Visible: </label>
                 <select value={visible} onChange={(e) => setVisible(e.target.value)}>
                   <option value=""> </option>
                   <option value="True">True</option>
                   <option value="False">False</option>
                   </select>
                   <br></br>
                   <label>Category: </label>
                 <select value={category} onChange={(e) => setCategory(e.target.value)}>
                   <option value=""> </option>
                   <option value="Activity">Activity</option>
                   <option value="External">External Resource</option>
                   </select>
                   <br></br>
               <label>Educational Standard: </label>
                 <select value={standard} onChange={(e) => setStandard(e.target.value)}>
                    <option value=""> </option>
                   <option value="Elementary"> Elementary School Resources </option>
                   <option value="Middle">Middle School Resources</option>
                   <option value="High">High School Resources</option>
                   <option value="University">University Level Resources</option>
                   <option value="All">Learning for all Ages</option>
                   </select>
               </div>
             </CardContent>
             <CardActions>
             <Button variant="outlined" onClick={editTool}>Edit Tool</Button>
               </CardActions>
               
               
             </Card>
             </form>
       
      
           
    )
    
    
}

export default EditTool;