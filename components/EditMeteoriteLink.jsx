/* eslint-disable */

'use client'

import { v4 as uuid } from 'uuid';
import { Button, TextField, Card, CardContent, CardActions, CardHeader,  } from '@mui/material'
import { GeoPoint } from 'firebase/firestore';
import {  useState, useId } from 'react';
import {storage }from '../utils/firebase';
import { collection, addDoc, doc, query, where, onSnapshot, updateDoc } from "firebase/firestore"; 
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {firestore }from '../utils/firebase'
const EditMeteoriteLink = (props) => {
  const [description, setDescription] = useState(props.data.description);
  const [name, setName] = useState(props.data.name);
  const [visible, setVisible] = useState(props.data.visible);
  const [type, setType] = useState(props.data.type);
  const [clazz, setClazz] = useState(props.data.clazz);
  const [clan, setClan] = useState(props.data.clan);
  const [group, setGroup] = useState(props.data.group);
  const [nation, setNation] = useState(props.data.nation);
  const [location, setLocation] = useState(props.data.location);
  const [picture, setPicture] = useState(props.data.picture);
  const [id, setId] = useState(props.data._id)
  const [latitude, setLatitude] = useState(props.data.coordinates._lat);
  const [longitude, setLongitude] = useState(props.data.coordinates._long);
  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);
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
function handleChange(event) {
    setFile(event.target.files[0]);
}
  const editMeteorite = async (e) => {
    e.preventDefault();
     if (file === "") {
         alert("Please upload an image first!");
        return;
                }
    
    //console.log(new GeoPoint(parseInt(latitude), parseInt(longitude)))
    //let _id = uuid().toString();
    const db = firestore
    const citiesRef = collection(db, "Meteorites");
    

    const q = query(citiesRef, where("_id", "==", data._id));
    const storageRef = ref(storage, `/Meteorites/${file.name}` )
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
                        const picture2 = "" + url
                        
                        console.log('sdsddf', picture2)
                        //pictureHelper(pictureUrl)
                        //setUrl(pictureUrl)
                       // console.log(url)
                       try{
                        const cool = onSnapshot(q, (querySnapshot) => {
                            querySnapshot.forEach((doc) =>{
                              //const coordinates = new GeoPoint(parseInt(latitude), parseInt(longitude))
                              const coordinates = new GeoPoint(parseFloat(latitude), parseFloat(longitude))
                             //doc.data
                              updateDoc(doc.ref, {
                              description: description,
                              name: name,
                              nation: nation,
                              location: location,
                              picture: picture2,
                              coordinates: coordinates,
                              visible: visible,
                              type: type,
                              clazz : clazz,
                              clan: clan,
                              group: group
                            });
    
    
                        })
                        
                        
                      })
                      alert('successfully updated ')
                      //clear() 
                      }catch(e){
                        alert(e)
                      }
                    
                        
    })
})
props.setReload(!props.reload)
;
     
     
    /*
    try{
    const cool = onSnapshot(q, (querySnapshot) => {
    querySnapshot.forEach((doc) =>{
      //const coordinates = new GeoPoint(parseInt(latitude), parseInt(longitude))
      const coordinates = new GeoPoint(parseFloat(latitude), parseFloat(longitude))
     //doc.data
      updateDoc(doc.ref, {
      description: description,
      name: name,
      nation: nation,
      location: location,
      picture: picture,
      coordinates: coordinates,
      visible: visible,
      type: type,
      clazz : clazz,
      clan: clan,
      group: group
    });
    
    
    })
    
    
  })
  alert("successfully updated meteorite");
}catch(e){
  alert("something went wrong, try again")
}
*/
//props.setReload(!props.reload)
//handleClose()
//window.reload()
  
  
  
    
  };

    return(
        <form onSubmit={(e) => editMeteorite(e)} style={{
             width: '50%',
             margin: 'auto',
             textAlign:'center',
             //display: 'inline-block',
            
             
           }}>
               <Card >
             <CardHeader  title="Edit a Meteorite: " />
             <CardContent>
               <div>
                 
                
                
               
                {
                <TextField
                  
                  fullWidth
                  id="desc"
                  type="desc"
                  label="current picture link"
                  
                  margin="normal"
                  value={picture}
                  //onChange={(e) => setPicture(e.target.value)}
                  
                />
          }
            
                
               
               
                   <br></br>
                   <label>New Picture:  </label>
                   <br></br>
                   <input type="file" onChange={handleChange} accept="/image/*" />
                   
               </div>
             </CardContent>
             <CardActions>
             <Button variant="outlined" onClick={editMeteorite}>Edit Meteorite</Button>
               </CardActions>
               
             </Card>
       
      
           
               </form>
    )
    
    
}

export default EditMeteoriteLink;