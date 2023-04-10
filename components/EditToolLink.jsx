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
const EditToolLink = (props) => {
  const [description, setDescription] = useState(props.data.description);
  const [name, setName] = useState(props.data.name);
  const [percent, setPercent] = useState(0);
  const [visible, setVisible] = useState(props.data.visible);
  const [picture, setPicture] = useState(props.data.picture);
  const [pdf, setPdf] = useState(props.data.pdf);
  const [link, setLink] = useState(props.data.link);
  const [id, setId] = useState(props.data._id)
 
  const [file, setFile] = useState("");
  const [filePdf, setFilePdf] = useState("");
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
function handleChangePdf(event) {
    setFilePdf(event.target.files[0]);
}
  const editMeteorite = async (e) => {
    
    e.preventDefault();
    if (filePdf === "" && file === "" ) {
                    alert("Please upload something");
        return;
                }
        const db = firestore
      
     
     
    const citiesRef = collection(db, "Educational Resources");
    

    const q = query(citiesRef, where("_id", "==", data._id));
    
    if(filePdf !== ""){
        const storageRef2 = ref(storage, `/EducationalDocuments/${filePdf.name}` )
        const uploadTask2 = uploadBytesResumable(storageRef2, filePdf); 
        uploadTask2.on(
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
                               getDownloadURL(uploadTask2.snapshot.ref).then((url) => {
                                const pdf2 = "" + url
                                try{
                                    const cool = onSnapshot(q, (querySnapshot) => {
                                    querySnapshot.forEach((doc) =>{
                                      
                                      updateDoc(doc.ref, {
                                      pdf: pdf2
                                      
                                    });
                                    
                                    
                                    })
                                    
                                    
                                  })
                                  alert("successfully updated pdf");
                                }catch(e){
                                  alert("something went wrong, try again")
                                }
                                                              
            });     
                      
          }
            );    
    }
    
    
    if(file !== ""){
        const storageRef = ref(storage, `/EducationalDocuments/${file.name}` )
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
                          try{
                              const cool = onSnapshot(q, (querySnapshot) => {
                              querySnapshot.forEach((doc) =>{
                                
                                updateDoc(doc.ref, {
                                picture: picture2
                                
                              });
                              
                              
                              })
                              
                              
                            })
                            alert("successfully updated picture");
                          }catch(e){
                            alert("something went wrong, try again")
                          }
                                                    
      });               
    }
      );

    }
    
        
        
    
props.setReload(!props.reload)

  
  
  };

    return(
        <form onSubmit={(e) => editMeteorite(e)} style={{
             width: '50%',
             margin: 'auto',
             textAlign:'center',
            
            
             
           }}>
               <Card >
             <CardHeader  title="Edit an Educational Tool: " />
             <CardContent>
               <div>
                 
                
                
               
                
                <TextField
                  
                fullWidth
                id="desc"
                type="desc"
                label="current picture link"
                
                margin="normal"
                value={picture}
                //onChange={(e) => setPicture(e.target.value)}
                
              />
              <TextField
                  
                  fullWidth
                  id="desc"
                  type="desc"
                  label="current pdf link"
                  
                  margin="normal"
                  value={pdf}
                  //onChange={(e) => setPicture(e.target.value)}
                  
                />
          
            
                
               
               
                   <br></br>
                   <label>New Picture:  </label>
                   <input type="file" onChange={handleChange} accept="/image/*" />
                   <br></br>
                   <label>New Pdf:  </label>
                   <input type="file" onChange={handleChangePdf} accept="/pdf/*" />
               </div>
             </CardContent>
             <CardActions>
             <Button variant="outlined" onClick={editMeteorite}>Edit Tool</Button>
               </CardActions>
               
             </Card>
       
      
           
               </form>
    )
    
    
}

export default EditToolLink;