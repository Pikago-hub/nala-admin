/* eslint-disable */

'use client';

import { useState, useEffect} from 'react';
import styles from '../styles'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const goToWebsite= () =>{

  }
  const handleClose = () => {
    setAnchorEl(null);
  };
  const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);
  
    useEffect(() => {
      const media = window.matchMedia(query);
      if (media.matches !== matches) {
        setMatches(media.matches);
      }
      const listener = () => setMatches(media.matches);
      window.addEventListener("resize", listener);
      return () => window.removeEventListener("resize", listener);
    }, [matches, query]);
  
    return matches;
  };
  const flexBetween = "flex items-center justify-between";
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
  const isTopOfPage = true; 
  const navbarBackground = isTopOfPage ? "bg-black drop-shadow" : "bg-primary-black drop-shadow";
  return(
  //<motion.nav
  //variants={navVariants}
  //initial='show'
  //whileInView='show'
  //no double text, 
  <nav
  className={`${styles.xPaddings} py-8 relative bg-black `}
  >
    <div className='absolute w-[50%] inset-0 gradient-01  '/>
    <div className={`${styles.innerWidth} mx-auto flex justify-between gap-8`}>
      
      
        <img
            src="/name_logo.png"
            alt="logo"
            className="w-auto h-12 object-contain mt-0"
          />
      
         { <h2 className='font-extrabold text-[24px] leading-[30px] text-white'>NaMe | Native Meteorites</h2>
}   
      <div>
        
      <a target="blank" href = "https://na-la.vercel.app">
     
        <ArrowOutwardIcon style={{color:'white'}} />
      
      </a>
      
    </div>
      
    </div>
   
  </nav>
      
      
)};

export default Navbar;
{/*
  <nav
  className={`${styles.xPaddings} py-8 relative bg-black `}
  >
    <div className='absolute w-[50%] inset-0 gradient-01  '/>
    <div className={`${styles.innerWidth} mx-auto flex justify-between gap-8`}>
    {//<Link href="/" > <h2 className='font-extrabold text-[24px] leading-[30px] text-white'>NaMe Interactive Map Tool</h2></Link>
}     <img
            src="/name_logo.png"
            alt="headset"
            className="w-14 h-auto object-contain"
          />
          
      <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MenuIcon/>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Link href="/"  style={{ textDecoration: "none", color: "black" }}><MenuItem onClick={handleClose}>   Home  </MenuItem></Link>
        <Link href="/educational_tools"  style={{ textDecoration: "none", color: "black" }}><MenuItem onClick={handleClose}>   Educational Tools  </MenuItem></Link>
        <Link href="/find_meteorites_by_location/map/Oklahoma"  style={{ textDecoration: "none", color: "black" }}><MenuItem onClick={handleClose}>  Interactive Map  </MenuItem></Link>
        
      </Menu>
    </div>
      
    </div>
   
  </nav>
      */}