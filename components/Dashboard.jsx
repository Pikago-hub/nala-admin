/* eslint-disable */

'use client'
import { useRouter } from 'next/navigation';

//import {auth} from '../../firebase/initFirebase'
//import {useAuthState} from 'react-firebase-hooks/auth'
import React, { useState, useEffect } from "react";
import { Button, TextField, Card, CardContent, CardActions, CardHeader,  } from '@mui/material'
//import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import AddMeteorite from './AddMeteorite';
import AddEducatorTool from './AddEducatorTool';
import MeteoriteTable from './MeteoriteTable';
import EditTool from './EditTool';
import AddLinkIcon from '@mui/icons-material/AddLink';
import Dialog from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
//import  TableComponent  from '../components'
//import { GeoPoint } from "firebase/firestore";
import { firestore, auth} from "../utils/firebase";
import {
  collection, deleteDoc, doc, DocumentData, getDocs, limit, query, QueryDocumentSnapshot, updateDoc, where, getDoc, onSnapshot}
   from "firebase/firestore";
  import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
  } from 'firebase/auth'
  import { useAuthState } from 'react-firebase-hooks/auth';


  /*
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
*/
 const AdminDashBoard = () => {
    const router = useRouter()
    const [open, setOpen] = React.useState(false);
    const [openEdu, setOpenEdu] = React.useState(false);
    const [meteorites, setMeteorites] = useState([])
    const [tools, setTools] = useState([])
    const [reload, setReload] = React.useState(false);

    const handleOpen = () => {
      if(isPicked === 'meteorite'){
        setOpen(true);}
        if(isPicked === 'tool'){
          setOpenEdu(true);}
    }
    const handleClose = () => setOpen(false);
    const handleCloseEdu = () => setOpenEdu(false);
    const[user, loading] = useAuthState(auth)
    const logout = async () => {
        //setUser(null)
        await signOut(auth)
        router.push('/')
      }
      const handleChange = (event) => {
        setName(event.target.value);
      };
  const [isPicked, setIsPicked] = useState('default');
  const pickingMeteorite = () =>{
    setIsPicked('meteorite')
}

  const pickingTool = () =>{
    setIsPicked('tool')
}
  const [name, setName] = useState("");
  
  useEffect(() => {
    const getData = () => {
       //getMeteorites()
       getTools()

    };

    getData();
  }, [reload]);
  
  
  
  
  /*
  const getMeteorites = async () => {
    const db = firestore
    const q = query(collection(db, "Meteorites"));
const querySnapshot = await getDocs(q);
console.log(querySnapshot)
let newArray = []
querySnapshot.forEach((doc) => {
  let newData = doc.data() 
  newArray.push(newData)
}

);
  setMeteorites(newArray)
  };
  */
  const getTools = async () => {
    const db = firestore
    const q = query(collection(db, "Educational Resources"));
const querySnapshot = await getDocs(q);
console.log(querySnapshot)
let newArray = []
querySnapshot.forEach((doc) => {
  let newData = doc.data() 
  newArray.push(newData)
}

);
  setTools(newArray)
  };
  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
    if(loading){
        return <div>Loading...</div>
    }
    
    console.log(user)
    if(!user){
        router.push('/')
        return <div>Please sign in to continue </div>
    }
    
    return (
        <div className="bg-white" style={{
            width: '100%',
            margin: 'auto',
          
            textAlign :'center',
           
          }}>
            <div>
              ______________
            </div>
            <Grid container spacing={2}>
  <Grid item xs={6} md={8}>
  <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Pick One</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={name}
          label="Meteorites/Tools"
          onChange={handleChange}
        >
          <MenuItem onClick={pickingMeteorite} value={'Meteorite'}>Meteorite</MenuItem>
          <MenuItem onClick={pickingTool} value={'Instructor Tool'}>Instructor Tool</MenuItem>
          
        </Select>
      </FormControl>
  </Grid>
  <Grid item xs={6} md={4}>
    <Button onClick={handleOpen}>Add a {name}</Button>
  </Grid>
  
</Grid>
     <Modal
        open={ open}
        onClose={handleClose}
        //scroll="body"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        style={{position:'absolute',
        //top:'10%',
        //left:'10%',
        overflowY:'auto',
        height:'100%',
        display:'block'}}
      >
         
        {<AddMeteorite />
 }
       
      </Modal>
      <Modal
        open={openEdu}
        onClose={handleCloseEdu}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddEducatorTool />
         
        
      </Modal>
        
       
        
        {isPicked === 'meteorite' && <MeteoriteTable  reload={reload} setReload={setReload} />}
        { isPicked === 'tool' && <EducatorToolTable data={tools}/> }
        <Button variant="outlined" onClick={logout}>Sign Out</Button>
       
      </div>
    
    );
  }

 export default AdminDashBoard

 
  
  
  
   

  function EducatorToolTable(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [open, setOpen] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [data1, setData1] = React.useState({});
    const data  = props.data
    console.log('sdsdsd', data)
    const handleOpen = () => {
     
      setOpen(true);
    }
     
  const handleClose = () => setOpen(false);
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
    const areYouSure = (data) => {
      handleOpen()
      setData1(data)
    }
    const handleEdit = (data) => {
      setOpenEdit(true)
      setData1(data)
    }
    const handleCloseEdit = () => setOpenEdit(false);
    const deleteTool = async(data) =>{
      const db = firestore
      
     
     
    const citiesRef = collection(db, "Educational Resources");
    

  const q = query(citiesRef, where("_id", "==", data1._id));
  const cool = onSnapshot(q, (querySnapshot) => {
    querySnapshot.forEach((doc) =>{
     //doc.data
      deleteDoc(doc.ref);
    })
  })
  alert('successfully deleted a meteorite')
  handleClose()
}
  
    return (
      <div>
      <div>
        ______________
      </div>
      <Paper sx={{ width: '95%', overflow: 'hidden' , margin:'auto'}}>
        <TableContainer sx={{ maxHeight: 580}}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
              <TableCell>
                    Title
                    
                   
                  </TableCell>
                  <TableCell>
                    Category
                    
                   
                  </TableCell>
                  <TableCell>
                    Description
                    
                   
                  </TableCell>
                  <TableCell>
                    Link
                    
                   
                  </TableCell>
                  <TableCell>
                    Educational Standards
                    
                   
                  </TableCell>
                  
                  <TableCell>
                    Visible
                    
                   
                  </TableCell>
                  <TableCell>
                    Actions
                    
                   
                  </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                  
                    <TableRow
                      id={row._id}
                      key={row._id}
                      //selected={selectedResources.includes(name)}
                      //position={index}
                    >
                      
                      <TableCell> {row.title}</TableCell>
              
                      <TableCell>{row.category}</TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell>{row.link}</TableCell>
                      <TableCell>{row.standard}</TableCell>
                      
                      <TableCell>{row.visible}</TableCell>
                      <TableCell>
                      <div><Button onClick={()=>{handleEdit(row)}}>Edit</Button> <Button onClick={()=> {areYouSure(row)}}>Delete</Button>
                      <Button onClick={()=> console.log('ere')}><AddLinkIcon></AddLinkIcon></Button>
                      </div>
                      </TableCell>
                    </TableRow>
                  
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Modal
        open={ open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <Card sx={{ minWidth: 500, }}>
      
      <CardContent>
        
        Are you sure you want to delete this?
      </CardContent>
      <CardActions>
        <Button onClick={deleteTool}>Yes</Button>
        <Button onClick={handleClose} >No</Button>
      </CardActions>
    </Card>
        
         
        
      </Modal>
      <Modal
        open={ openEdit }
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{position:'absolute',
        //top:'10%',
        //left:'10%',
        overflowY:'auto',
        height:'100%',
        display:'block'}}
      >
        <EditTool data={data1}/>
      </Modal>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
        
      </div>
    );
  }
