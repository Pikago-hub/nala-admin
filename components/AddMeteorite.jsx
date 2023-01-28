/* eslint-disable */

'use client'

import { Button, TextField, Card, CardContent, CardActions, CardHeader,  } from '@mui/material'
import { useState } from 'react';
const AddMeteorite = () => {
    const [description, setDescription] = useState("");
  const [visible, setVisible] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [picture, setPicture] = useState("https://www.nhm.ac.uk/content/dam/nhmwww/discover/three-types-of-meteorites/iron-meteorite-dark-fusion-crust-two-column.jpg.thumb.768.768.jpg");
    return(
        <form onSubmit={(e) => addNewMeteorite(e)} style={{
             width: '50%',
             margin: 'auto',
             textAlign:'center',
             display: 'inline-block',
            
             
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
           <button >Add Meteorite</button>
               </form>
    )
    
    
}

export default AddMeteorite;