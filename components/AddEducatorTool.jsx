/* eslint-disable */

'use client'

import { Button, TextField, Card, CardContent, CardActions, CardHeader, Alert } from '@mui/material'
import { useState } from 'react';
import {storage }from '../utils/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, doc, query, where, onSnapshot, updateDoc } from "firebase/firestore"; 

import {firestore }from '../utils/firebase'
import { v4 as uuid } from 'uuid';

const AddEducatorTool = () => {
  const [description, setDescription] = useState("");
  const [visible, setVisible] = useState("");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [category, setCategory] = useState("")
  const [standard, setStandard] = useState("")
  const [pdf, setPdf] = useState("")
 
  //const [picture, setPicture] = useState("")
  const [file, setFile] = useState("");
  const [filePdf, setFilePdf] = useState("");
  const [percent, setPercent] = useState(0);
  function handleChange(event) {
    setFile(event.target.files[0]);
}
function handleChangePdf(event) {
  setFilePdf(event.target.files[0]);
}
  const addTool = async (data) => {
    
    const db = firestore
      const q = query(collection(db, "Educational Resources"));
  try{
  const querySnapshot = await addDoc(q, data);
  
  }catch(err){
    alert(err)
  }
 
  };
    const addNewTool = (e) => {
      
      const _id = uuid().toString();
      let picture2 = "cool";
      let pdf2 = 'cool';
       if (!file) {
                    alert("Please upload an image first!");
        return;
                }
        const storageRef = ref(storage, `/EducationalDocuments/${file.name}` )
        const storageRef2 = ref(storage, `/EducationalDocuments/${filePdf.name}` )
                // progress can be paused and resumed. It also exposes progress updates.
                // Receives the storage reference and the file to upload.
                const uploadTask = uploadBytesResumable(storageRef, file);
                const uploadTask2 = uploadBytesResumable(storageRef2, filePdf);
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
                            try{
                              addTool({
                                _id,
                                title,
                                description,
                                link,
                                category,
                                standard,
                                visible,
                                picture,
                                pdf
                                
                            });
                            
                            //alert('successfully added a new instructor tool')
                             // clear()
                            }catch(e){
                              alert(e)
                            }
                    
                            
                            //picture2 = "" + url
                            //console.log('sdsddf', picture)
                            //pictureHelper(pictureUrl)
                            //setUrl(pictureUrl)
                           // console.log(url)
                           
                            
        });

       
                  
      }
        );
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
                              //const picture = "" + url
                              const x = "" + url
                              console.log('sdsdsfdsfssdfdsx',x)
                              const db = firestore
                              const citiesRef = collection(db, "Educational Resources");
                              const q = query(citiesRef, where("_id", "==", _id));
                              const cool = onSnapshot(q, (querySnapshot) => {
                                querySnapshot.forEach((doc) =>{
                                  //const coordinates = new GeoPoint(parseInt(latitude), parseInt(longitude))
                                  console.log('here')
                                 //doc.data
                                  updateDoc(doc.ref, {
                                    //description: description,
                                    //title: title,
                                    //link: link,
                                    //category: category,
                                    //standard: standard,
                                   // visible: visible,
                                    //picture: picture,
                                    pdf:x
                                });
                                
                                
                                })
                                
                                alert('successfully added a new instructor tool')
                                clear() 
                              })
                              //setPdf(x)
                              //pdf2 = "" + url
                              //console.log('sdsddf', picture)
                              //pictureHelper(pictureUrl)
                              //setUrl(pictureUrl)
                             // console.log(url)
                             
                              
          });
  
         
                    
        }
          );
          //console.log('sdsd', picture, 'sds', pdf)
        



      
      
      
      
    };
    const clear = () =>{
      setDescription("");
      setTitle("");
      setLink("");
      setCategory("");
      setStandard("");
      
    }
  

    return(
        <form onSubmit={(e) => addNewTool(e)} style={{
             width: '50%',
             margin: 'auto',
            textAlign:'center',
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
          */}
          <br></br>
          <label>Picture: </label>
                <input type="file" onChange={handleChange} accept="/image/*" />
                <br></br>
                <br></br>
                <label>Pdf: </label>
                <input type="file" onChange={handleChangePdf} accept="/pdf/*" />
                <br></br>
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
             <Button variant="outlined" onClick={addNewTool}>Add Tool</Button>
               </CardActions>
             </Card>
       
     
      
           
               </form>
    )
    
    
}

export default AddEducatorTool;