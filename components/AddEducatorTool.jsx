/* eslint-disable */

'use client'

import { Button, TextField, Card, CardContent, CardActions, CardHeader,  } from '@mui/material'
import { useState } from 'react';
import { collection, addDoc, doc, query } from "firebase/firestore"; 
import {firestore }from '../utils/firebase'


const AddEducatorTool = () => {
  const [description, setDescription] = useState("");
  const [visible, setVisible] = useState("");
  const [title, setTitle] = useState("");
  const [pdfLink, setpdfLink] = useState("");
  const [category, setCategory] = useState("")
  const addTool = async (data) => {
    
    const db = firestore
      const q = query(collection(db, "Educational Resources"));
  
  const querySnapshot = await addDoc(q, data);
    //const newMeteorite = await addDoc(meteoriteCollection, { ...meteoriteData });
    //console.log(`The new meteorite was created at ${newMeteorite.path}`);
    
  };
    const addNewTool = (e) => {
      
      e.preventDefault();
     // setCoordinates(new GeoPoint(parseInt(latitude), parseInt(longitude)))
      //console.log(coordinates)
      //console.log(new GeoPoint(parseInt(latitude), parseInt(longitude)))
      //const coordinates = new GeoPoint(parseInt(latitude), parseInt(longitude))
      addTool({
          title,
          description,
          pdfLink,
          category
          
      });
      
      //console.log("successfully added a new Meteorite");
      alert("successfully added a new Tool")
      
    };
  

    return(
        <form onSubmit={(e) => addNewTool(e)} style={{
             //width: '50%',
             //margin: 'auto',
            // textAlign:'center',
             //display: 'inline-block',
            
             
           }}>
               <Card >
             <CardHeader  title="Add a new Educator Tool: " />
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
                  label="PDF"
                  
                  margin="normal"
                  value={pdfLink}
                  onChange={(e) => setpdfLink(e.target.value)}
                  
                />
                <TextField
                  
                  fullWidth
                  id="desc"
                  type="desc"
                  label="Category"
                  
                  margin="normal"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  
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
           <Button variant="outlined" onClick={addNewTool}>Add Tool</Button>
               </form>
    )
    
    
}

export default AddEducatorTool;