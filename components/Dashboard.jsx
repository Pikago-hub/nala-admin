/* eslint-disable */

'use client'
import { useRouter } from 'next/navigation';

//import {auth} from '../../firebase/initFirebase'
//import {useAuthState} from 'react-firebase-hooks/auth'
import React, { useState } from "react";
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
//import { firestore} from "../../firebase/initFirebase";
/*import {
    addDoc,
    collection,
    getFirestore,
  } from "firebase/firestore";
  import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
  } from 'firebase/auth'
*/

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
    const handleOpen = () => {
      if(isPicked === 'meteorite'){
        //console.log('here')
        setOpen(true);}
        if(isPicked === 'tool'){
          //console.log('here')
          setOpenEdu(true);}
    }
    const handleClose = () => setOpen(false);
    const handleCloseEdu = () => setOpenEdu(false);
    //const[user, loading] = useAuthState(auth)
    const logout = async () => {
        //setUser(null)
        //await signOut(auth)
        router.push('/')
      }
      const handleChange = (event) => {
        setName(event.target.value);
      };
    //const [coordinates, setCoordinates] = useState<GeoPoint>(new GeoPoint(35, Math.floor(Math.random() * (-99 - -94 + 1)) + -94));
  
  const [isMeteorite, setIsMeteorite] = useState(false);
  const [isPicked, setIsPicked] = useState('default');
  const pickingMeteorite = () =>{
    //setIsTool(false)
    setIsPicked('meteorite')
    //setIsMeteorite(true)
    console.log(isPicked)
}
const [isTool, setIsTool] = useState(false);
  const pickingTool = () =>{
    //setIsMeteorite(false)
    //setIsTool(true)
    setIsPicked('tool')
    console.log(isPicked)
}
  const [name, setName] = useState("");
  
  const [picture, setPicture] = useState("https://www.nhm.ac.uk/content/dam/nhmwww/discover/three-types-of-meteorites/iron-meteorite-dark-fusion-crust-two-column.jpg.thumb.768.768.jpg");
  //convert lat and long to number
  //and then set coordinates to (lat, long)
  const addNewMeteorite = (e) => {
    /*
    e.preventDefault();
    setCoordinates(new GeoPoint(parseInt(latitude), parseInt(longitude)))
    console.log(coordinates)
    addMeteorite({
        coordinates,
        
        name,
        description,
        visible,
        picture
    });
    //console.log("successfully added a new Meteorite");
    alert("successfully added a new Meteorite")
    */
  };
  //const meteoriteCollection = collection(firestore, "Meteorites");
  
  // ADD A NEW DOCUMENT TO YOUR COLLECTION
   const addMeteorite = async (meteoriteData) => {
    
    /*
    const newMeteorite = await addDoc(meteoriteCollection, { ...meteoriteData });
    console.log(`The new meteorite was created at ${newMeteorite.path}`);
    */
  };
/*
    if(loading){
        return <div>Loading...</div>
    }
    console.log(user)
    if(!user){
        router.push('/')
        return <div>Please sign in to continue </div>
    }
    */
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
        
       
        
        {isPicked === 'meteorite' && <MeteoriteTable />}
        { isPicked === 'tool' && <EducatorToolTable /> }
        <button onClick={logout}>Sign Out</button>
      </div>
    
    );
  }

 export default AdminDashBoard

 const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
    {
      id: 'population',
      label: 'Population',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'size',
      label: 'Size\u00a0(km\u00b2)',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'density',
      label: 'Density',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
        id:'actions',
        label: 'Actions',
        minWidth: 170,
        align:'right',

    }
  ];
  
  function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
  }
  
  const rows = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
  ];
  
   function MeteoriteTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
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
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                    //console.log(index, + 'sdsd', row)
                    const values = row
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column, index) => {
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
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
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

  function EducatorToolTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
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
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                    //console.log(index, + 'sdsd', row)
                    const values = row
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column, index) => {
                        const value = row[column.id];
                        //console.log(index)
                        return (
                          <TableCell key={column.id} align={column.align}>
                            { column.id === 'actions'
                              ? <div><Button onClick={()=>{console.log(values)}}>Edit I</Button> <Button>Delete </Button></div>
                              : value}
                          </TableCell>
                        );
                      })}
                      
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
