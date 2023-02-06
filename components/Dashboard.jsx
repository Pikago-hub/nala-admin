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
//import  TableComponent  from '../components'
//import { GeoPoint } from "firebase/firestore";
import { firestore, auth} from "../utils/firebase";
import {
  collection, deleteDoc, doc, DocumentData, getDocs, limit, query, QueryDocumentSnapshot, updateDoc, where, getDoc}
   from "firebase/firestore";
  import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
  } from 'firebase/auth'
  import { useAuthState } from 'react-firebase-hooks/auth';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
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

 const AdminDashBoard = () => {
    const router = useRouter()
    const [open, setOpen] = React.useState(false);
    const [openEdu, setOpenEdu] = React.useState(false);
    const [meteorites, setMeteorites] = useState([])
    const [tools, setTools] = useState([])
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
       getMeteorites()
       getTools()

    };

    getData();
  }, []);
  
  
  
  
  
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
              mnfslkdfkjsdfjkjsfdkjsdfkjlsdfjksf
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
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}><AddMeteorite /></Box>
         
        
      </Modal>
      <Modal
        open={openEdu}
        onClose={handleCloseEdu}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}><AddEducatorTool /></Box>
         
        
      </Modal>
        
       
        
        {isPicked === 'meteorite' && <MeteoriteTable data={meteorites} />}
        { isPicked === 'tool' && <EducatorToolTable data={tools}/> }
        <Button variant="outlined" onClick={logout}>Sign Out</Button>
       
      </div>
    
    );
  }

 export default AdminDashBoard

 
  
  
  
   function MeteoriteTable(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
    const data = props.data
    console.log('jj',data)
    return (
      <div>
      <div>
        kjdlvfksdjfsdnf
        djfkdsfjkljdsfjkl 
        dnjf
      </div>
      <Card>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                
                  <TableCell>
                    Coordinates
                    
                   
                  </TableCell>
                  <TableCell>
                    Name
                    
                   
                  </TableCell>
                  <TableCell>
                    Description
                    
                   
                  </TableCell>
                  <TableCell>
                    Actions
                    
                   
                  </TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {/*data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                    //console.log(index, + 'sdsd', row)
                    const values = row
                    console.log('dsff', row)
                  return (
                    
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {
                        columns.map((column, index) => {
                          //const value = row[column.id];
                          //console.log(index)
                          return (
                            <TableCell key={column.id} align={column.align}>
                             jkkkj
                            </TableCell>
                          );
                        })
                      }
                      {/*columns.map((column, index) => {
                        const value = row[column.id];
                        //console.log(index)
                        return (
                          <TableCell key={column.id} align={column.align}>
                            { column.id === 'actions'
                              ? <div><Button onClick={()=>{console.log(values)}}>Edit M</Button> <Button>Delete</Button></div>
                              : value}
                          </TableCell>
                        );
                      })}
                      
                    </TableRow>
                    
                  );
                })}*/}
                {data.map(
    (row, index) => (
      <TableRow
        id={row.id}
        key={row.id}
        //selected={selectedResources.includes(name)}
        //position={index}
      >
        
        <TableCell> [{row.coordinates._lat},{row.coordinates._long}]</TableCell>

        <TableCell>{row.name}</TableCell>
        <TableCell>{row.shortDescription}</TableCell>
        <TableCell>
        <div><Button onClick={()=>{console.log(row)}}>Edit M</Button> <Button>Delete</Button></div>
        </TableCell>
      </TableRow>
    )
  )}
            </TableBody>
          </Table>
        </TableContainer>
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
      </Card>
      </div>
    );
  }

  function EducatorToolTable(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const data  = props.data
    console.log('sdsdsd', data)
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    return (
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
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
                    Pdf Link
                    
                   
                  </TableCell>
                  <TableCell>
                    Actions
                    
                   
                  </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                  
                    <TableRow
                      id={row.id}
                      key={row.id}
                      //selected={selectedResources.includes(name)}
                      //position={index}
                    >
                      
                      <TableCell> {row.title}</TableCell>
              
                      <TableCell>{row.category}</TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell>{row.pdfLink}</TableCell>
                      <TableCell>
                      <div><Button onClick={()=>{console.log(row)}}>Edit I</Button> <Button>Delete</Button></div>
                      </TableCell>
                    </TableRow>
                  
                ))}
            </TableBody>
          </Table>
        </TableContainer>
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
    );
  }
