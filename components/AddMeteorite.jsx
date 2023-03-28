/* eslint-disable */

'use client'

import { v4 as uuid } from 'uuid';
import { Button, TextField, Card, CardContent, CardActions, CardHeader,  } from '@mui/material'
import { GeoPoint } from 'firebase/firestore';
import {  useState, useId } from 'react';
import {storage }from '../utils/firebase';
import { collection, addDoc, doc, query } from "firebase/firestore"; 
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {firestore }from '../utils/firebase'
import { async } from '@firebase/util';
const AddMeteorite = () => {
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [visible, setVisible] = useState("");
  const [nation, setNation] = useState("");
  const [location, setLocation] = useState("");
  //const [picture, setPicture] = useState("");
  const [url, setUrl] = useState("");
  const [id, setId] = useState("")
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [type, setType] = useState("");
  const [clan, setClan] = useState("");
  const [clazz, setClazz] = useState("");
  const [group, setGroup] = useState("");
  const [file, setFile] = useState("");
 const [percent, setPercent] = useState(0);
 // Handle file upload event and update state
 function handleChange(event) {
      setFile(event.target.files[0]);
}
// ADD A NEW DOCUMENT TO YOUR COLLECTION
const addMeteorite = async (meteoriteData) => {
    
  const db = firestore
    const q = query(collection(db, "Meteorites"));
try{
const querySnapshot = await addDoc(q, meteoriteData);
}catch(err){
  alert(err)
}

  
};


  const addNewMeteorite = (e) => {

    const coordinates = new GeoPoint(parseFloat(latitude), parseFloat(longitude))
    let _id = uuid().toString();
    //let picture = "";
     if (file === "") {
                  alert("Please upload an image first!");
      return;
              }
      
       
              //const storageRef = ref(storage, `/files/${file.name}`);
         const storageRef = ref(storage, `/Meteorites/${file.name}` )
              // progress can be paused and resumed. It also exposes progress updates.
              // Receives the storage reference and the file to upload.
              const uploadTask = uploadBytesResumable(storageRef, file);
       
              uploadTask.on(
                  "state_changed",
                  (snapshot) => {
                      const percent = Math.round(
                          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                      );
       
                      // update progress
                      setPercent(percent);
      //console.log('sadsd', percent)
                  },
                  (err) => console.log(err),
                     () => {
                         // download url
                         getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                          const picture = "" + url
                          
                          console.log('sdsddf', picture)
                          //pictureHelper(pictureUrl)
                          //setUrl(pictureUrl)
                         // console.log(url)
                         try{
                          addMeteorite({
                            _id,
                            coordinates,
                            location,
                            name,
                            description,
                            nation,
                            type,
                            clan,
                            clazz,
                            group,
                            visible,
                            picture
                        });
                        alert('successfully added a new meteorite')
                        clear() 
                        }catch(e){
                          alert(e)
                        }
                          
      });
     
       
                
   }
     );

    
    
  
  };
  
  const clear = () =>{
    setDescription("");
    setClan("");
    setClazz("");
    setGroup("");
    setType("");
    setLatitude("");
    setLongitude("");
    setLocation("");
    setName("");
    setVisible("");
    setNation("");
    setLocation("");
  }


    return(
        <form onSubmit={(e) => addNewMeteorite(e)} style={{
             width: '50%',
             margin: 'auto',
             textAlign:'center',
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
                {
                <TextField
                  
                  fullWidth
                  id="desc"
                  type="desc"
                  label="type"
                  
                  margin="normal"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  
                />
          }
               <TextField
                  
                  fullWidth
                  id="desc"
                  type="desc"
                  label="class"
                  
                  margin="normal"
                  value={clazz}
                  onChange={(e) => setClazz(e.target.value)}
                  
                />
                <TextField
                  
                  fullWidth
                  id="desc"
                  type="desc"
                  label="clan"
                  
                  margin="normal"
                  value={clan}
                  onChange={(e) => setClan(e.target.value)}
                  
                />
                <TextField
                  
                  fullWidth
                  id="desc"
                  type="desc"
                  label="group"
                  
                  margin="normal"
                  value={group}
                  onChange={(e) => setGroup(e.target.value)}
                  
                />
                <br></br>
                <input type="file" onChange={handleChange} accept="/image/*" />
                
                
                <br></br>
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
                   <label>Location:  </label>
                 <select value={location} onChange={(e) => setLocation(e.target.value)}>
                   <option value=""> </option>
                   <option value="Oklahoma, USA">Oklahoma, USA</option>
                   <option value="Texas, USA">Texas, USA</option>
                   </select>
               </div>
             </CardContent>
             <CardActions>
             <Button variant="outlined" onClick={addNewMeteorite}>Add Meteorite</Button>
               </CardActions>
             </Card>
       
      
           
               </form>
    )
    
    
}

export default AddMeteorite;