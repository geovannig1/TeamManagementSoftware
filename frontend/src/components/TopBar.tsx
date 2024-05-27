import { CloseRounded, Logout, MenuRounded } from '@mui/icons-material'
import { Menu } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Logo from '../common/Logo';
import { Link } from 'react-router-dom';
import { colors } from '../Constants';

function TopBar(props:any) {
    const{setUserProfileModal,setLogoutModal,activePage}=props
//   const [menuOpen,setMenuOpen] = useState<Boolean>(false)
const myProfiledata = useSelector(
    (state: any) => state.authReducer.myUserProfile
  );  
  return (
    <div className='w-full px-4  flex flex-row justify-between md:hidden  items-center bg-C55'>
       <button className="flex justify-center py-2 cursor-pointer"
       onClick={()=>setUserProfileModal(true)}
      >
      {
        myProfiledata&&
        <div 
        className={`w-[35px] h-[35px] rounded-full flex justify-center items-center text-center text-[11px] font-semibold text-white p-[2px] bg-inactiveC11 hover:bg-C11 transition-all duration-[0.5s]` }>
          <div className='bg-C11 flex items-center justify-center min-w-full min-h-full text-center  border-C44 rounded-full border-[2px]'>
          {`${myProfiledata?.firstName[0].toUpperCase()}${myProfiledata?.lastName[0].toUpperCase()}`}
          </div>
        </div>
      }
      </button>
    
      <Link to="/dashboard">
        <div className="flex justify-center  cursor-pointer  w-[40px]">
          <Logo size={"0.6"} color={colors.C11} />
        </div>
      </Link> 
      
      {
      activePage==="dashboard"?
      <button className="flex justify-center py-4 cursor-pointer"
      onClick={()=>setLogoutModal(true)}
      >
        <Logout sx={{ fontSize: 20, color: colors.C11 }} />
      </button>
    :null
    }
    </div>
  )
}

export default TopBar
