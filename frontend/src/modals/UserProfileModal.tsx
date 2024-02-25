import { Add, Camera, CameraAlt, Close, Edit } from '@mui/icons-material'
import React, { useState } from 'react'
import { projectMembers } from '../data/data'
import { Tooltip } from '@mui/material'
import Loader from '../common/Loader'

function UserProfileModal(props:any) {
    const {setUserProfileModal}=props
    const [editState,setEditState] = useState<Boolean>(false)
    // function to close this modal
    const handleModalClose=()=>{
      setEditState(false)
      setUserProfileModal(false)    
    }

  return (
    <div className='top-0 left-0 absolute w-[100vw] h-[100vh] bg-[#00000054] flex justify-center items-center'>
    <div className='bg-C55 rounded-[8px] p-5 w-[600px]' >
      <div className='flex flex-row items-center justify-between'>
      <div className='font-bold text-[20px] text-C11'>
        My  Profile
      </div>
      <button className='cursor-pointer'
      onClick={handleModalClose}
      >
        <Close sx={{fontSize:20,fontWeight:800}}/>
      </button>
      </div> 
      <div className='flex flex-col text-[14px]'>
        <div className='mx-auto w-[150px] h-[150px] rounded-[8px]  flex justify-center my-2 items-center border-4 border-C44'>
          <img src="" alt="profileimage " />
        </div>
      {
        editState&&
        <div className='flex justify-center mb-4'>
          <Tooltip title="Remove and Add New Profile Picture" placement='bottom' arrow>
          <button  className='text-C11 gap-[2px] flex flex-row items-center bg-inactiveC11 font-bold text-[10px] px-2 py-1 rounded-full'>
          <CameraAlt sx={{fontSize:13}}/>
          <span>Choose File</span>
          </button>
          </Tooltip>
        </div>
      }  
      {
        !editState&&
      <div className='flex justify-end gap-4 my-2'>
        <Tooltip title="Edit Profile" placement='left' arrow>
        <button
         onClick={()=>setEditState(true)}
         className='flex flex-row items-center gap-1 hover:bg-[#012b3927] p-1 rounded-[4px]'>
          <Edit sx={{fontSize:18}}/>
        </button>
        </Tooltip>
        {/* <button className={`bg-[#012b39f2] hover:bg-[#012B39] rounded-[4px] font-semibold text-white  text-[10px] py-1 px-3`} >Edit Profile</button> */}
      </div>
      }  
      {
        !editState?
      <div className='flex flex-col'>
        <div className='flex flex-row items-center justify-between p-1 px-5 my-1 gap-x-2 bg-C44 rounded-[4px]'>
          <div className='w-1/2 font-bold text-C11'>First Name</div>
          <div className='w-1/2 font'>John</div>
        </div>
        <div className='flex flex-row items-center justify-between p-1 px-5 my-1 gap-x-2 bg-C44 rounded-[4px]'>
          <div className='w-1/2 font-bold text-C11'>Last Name</div>
          <div className='w-1/2 '>Joseph</div>
        </div>
        <div className='flex flex-row items-center justify-between p-1 px-5 my-1 gap-x-2 bg-C44 rounded-[4px]'>
          <div className='w-1/2 font-bold text-C11'>Username</div>
          <div className='w-1/2 '>JJoseph112</div>
        </div>
        <div className='flex flex-row items-center justify-between p-1 px-5 my-1 gap-x-2 bg-C44 rounded-[4px]'>
          <div className='w-1/2 font-bold text-C11'>Role</div>
          <div className='w-1/2 '>Designer</div>
        </div>
        <div className='flex flex-row items-start justify-between p-1 px-5 my-1 gap-x-2 bg-C44 rounded-[4px]'>
          <div className='w-1/2 font-bold text-C11'>Bio</div>
          <div className='w-1/2 '>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet repellat magni doloribus at quos commodi id tenetur suscipit. Ipsum consequatur exercitationem saepe aliquam, quas modi animi ex cum quos repellendus.</div>
        </div>
      </div>:
        <div className='flex flex-col gap-2'>
        <div className='flex flex-row gap-2'>
          <div className='flex flex-col flex-1'>
            <div  className=" text-C11 text-[10px] font-bold  w-fit  select-none">First Name</div>
            <input type="text" className='bg-C44 rounded-[4px]  p-2 text-[14px]' />
          </div>
          <div className='flex flex-col flex-1 '>
            <div  className=" text-C11 text-[10px] font-bold  w-fit  select-none">Last Name</div>
            <input type="text" className='bg-C44 rounded-[4px]  p-2 text-[14px]' />
          </div>
        </div> 

        <div className='flex flex-row gap-2'>
        <div className='flex flex-col flex-1'>
          <div  className=" text-C11 text-[10px] font-bold  w-fit  select-none">Email</div>
          <input type="text" className='bg-C44 rounded-[4px]  p-2 text-[14px]' />
        </div>
        <div className='flex flex-col flex-1'>
          <div  className=" text-C11 text-[10px] font-bold  w-fit  select-none">Username</div>
          <input type="text" className='bg-C44 rounded-[4px]  p-2 text-[14px]' />
        </div>
          
        </div> 


        <div className='flex flex-row gap-2'>
        <div className='flex flex-col flex-1 '>
          <div  className=" text-C11 text-[10px] font-bold  w-fit  select-none">Date Of Birth</div>
          <input type="Date" className='bg-C44 rounded-[4px]  p-2 text-[14px] cursor-pointer' />
        </div>
        <div className='flex flex-col flex-1 '>
          <div  className=" text-C11 text-[10px] font-bold  w-fit  select-none">Role</div>
          <input type="text" className='bg-C44 rounded-[4px]  p-2 text-[14px]' />
        </div>
        </div>
        <div className='flex flex-col '>
          <div  className=" text-C11 text-[10px] font-bold  w-fit  select-none">Bio</div>
          <textarea  rows={5} className= 'flex-1 bg-C44 rounded-[8px]  p-2 text-[14px] resize-none' />
        </div>
      </div>
      }
      </div>
      {
      editState&&
      <div className='flex justify-end gap-4 mt-4'>
      <button className={` hover:bg-[#012b3927] rounded-[8px] text-C11 font-bold text-[12px] py-2 px-5`} onClick={()=>setEditState(false)}>Cancel</button>
        <button className={`bg-[#012b39f2] hover:bg-[#012B39] rounded-[8px] text-white font-bold text-[12px] py-2 px-5`} >Save</button>
      </div>
      }
    </div>


  </div>
  )
}

export default UserProfileModal
