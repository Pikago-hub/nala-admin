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
import EditMeteorite from './EditMeteorite';
import AddEducatorTool from './AddEducatorTool';
import AddMeteorite from './AddMeteorite'
import Typography from '@mui/material';
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
    //const [openEdit, setOpenEdit] = React.useState(false);
    const [data1, setData1] = React.useState({});
    const handleOpen = () => {
     
        setOpen(true);
      }
       
    const handleClose = () => setOpen(false);
    const handleOpenEdit = () => {
     
      //setOpenEdit(true);
    }
     
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
    })
  }
  )
    }
    const areYouSure = (data) => {
      handleOpen()
      setData1(data)
    }
    const data = props.data
    console.log('jj',data)
    return (
      <div>
      <div>
        ______________
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
                    State
                    
                   
                  </TableCell>
                  <TableCell>
                    Nation
                    
                   
                  </TableCell>
                  <TableCell>
                    Picture
                    
                   
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
              
                {data.map(
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
        <TableCell>{row.state}</TableCell>
        <TableCell>{row.nation}</TableCell>
        <TableCell>{row.picture}</TableCell>
        <TableCell>{row.visible}</TableCell>
        <TableCell>
        <div><Button onClick={handleOpenEdit(row)}>Edit</Button> <Button onClick={()=> {areYouSure(row)}}>Delete</Button></div>
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
      {/*
      <Modal
        open={ openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <Box sx={style}></Box>
        
         
        
      </Modal>
    */}
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

  export default MeteoriteTable