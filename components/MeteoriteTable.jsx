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

import Modal from '@mui/material/Modal';
import EditMeteorite from './EditMeteorite';
import EditMeteoriteLink from './EditMeteoriteLink';
import AddLinkIcon from '@mui/icons-material/AddLink';

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


function MeteoriteTable(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [open, setOpen] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openEditLink, setOpenEditLink] = React.useState(false);
    const [data1, setData1] = React.useState({});
    const [meteorites, setMeteorites] = React.useState([]);
    const [reload, setReload] = React.useState(false);
    const handleOpen = () => {
     
        setOpen(true);
      }
       
    const handleClose = () => setOpen(false);
    const handleOpenEdit = (data) => {
     
      setOpenEdit(true)
      setData1(data)
    }
    const handleOpenEditLink = (data) => {
     
      setOpenEditLink(true)
      setData1(data)
    }
    const handleCloseEditLink = () => setOpenEditLink(false);
  const handleCloseEdit = () => setOpenEdit(false);
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const deleteMeteorite = async(data) =>{
      const db = firestore
      
     //alert('are you sure you want to delete this')
     
    const citiesRef = collection(db, "Meteorites");
    

  const q = query(citiesRef, where("_id", "==", data1._id));
  const cool = onSnapshot(q, (querySnapshot) => {
    querySnapshot.forEach((doc) =>{
     //doc.data
      deleteDoc(doc.ref);
      alert('successfully deleted a meteorite')
      handleClose()
      setReload(!reload)
    })
  }
  
  )
  
 
    }
    useEffect(() => {
      const getData = () => {
         getMeteorites()
         //getTools()
  
      };
  
      getData();
    }, [reload]);
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
    const areYouSure = (data) => {
      handleOpen()
      setData1(data)
    }
    //const data = props.data

    console.log('dsds',meteorites)
    return (
      <div>
      <div>
        ______________
      </div>
      <Card>
      <Paper sx={{ width: '95%', overflow: 'hidden', margin:'auto' }}>
        <TableContainer sx={{ maxHeight: 580 }}>
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
                    Location
                    
                   
                  </TableCell>
                  <TableCell>
                    Nation
                    
                   
                  </TableCell>
                  <TableCell>
                    Type
                    
                   
                  </TableCell>
                  <TableCell>
                    Clan
                    
                   
                  </TableCell>
                  <TableCell>
                    Class
                    
                   
                  </TableCell>
                  <TableCell>
                    Group
                    
                   
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
              
                {meteorites.map(
    (row, index) => (
      <TableRow
        id={row._id}
        key={row._id}
        //selected={selectedResources.includes(name)}
        //position={index}
      >
        
        <TableCell> [{row.coordinates._lat},{row.coordinates._long}]</TableCell>

        <TableCell>{row.name}</TableCell>
        <TableCell>{row.description}</TableCell>
        <TableCell>{row.location}</TableCell>
        <TableCell>{row.nation}</TableCell>
        <TableCell>{row.type}</TableCell>
        <TableCell>{row.clazz}</TableCell>
        <TableCell>{row.clan}</TableCell>
        <TableCell>{row.group}</TableCell>

        <TableCell>{row.visible}</TableCell>
        <TableCell>
        <div><Button onClick={() => {handleOpenEdit(row)}}>Edit</Button> <Button onClick={()=> {areYouSure(row)}}>Delete</Button>
        <Button onClick={()=> {handleOpenEditLink(row)}}><AddLinkIcon></AddLinkIcon></Button>
        </div>
        </TableCell>
      </TableRow>
    )
  )}
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
        <Button onClick={deleteMeteorite}>Yes</Button>
        <Button onClick={handleClose} >No</Button>
      </CardActions>
    </Card>
        
         
        
      </Modal>
      {
      <Modal
        open={ openEdit}
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
        
        <EditMeteorite data={data1} setReload={setReload} reload={reload}/>
        
         
        
      </Modal>
    }
    {
      <Modal
        open={ openEditLink}
        onClose={handleCloseEditLink}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{position:'absolute',
        //top:'10%',
        //left:'10%',
        overflowY:'auto',
        height:'100%',
        display:'block'}}
      >
        
        <EditMeteoriteLink data={data1} setReload={setReload} reload={reload}/>
        
         
        
      </Modal>
    }
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={meteorites.length}
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

  export default MeteoriteTable