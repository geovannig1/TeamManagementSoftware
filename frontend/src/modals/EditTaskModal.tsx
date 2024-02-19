import { Close } from '@mui/icons-material';
import React from 'react'

function EditTaskModal(props:any) {
    const{setEditTaskModal,data}=props;

    // function to close this modal
    const handleModalClose=()=>{
        setEditTaskModal(false)    
    }
  return (
<div className='top-0 left-0 absolute w-[100vw] h-[100vh] bg-[#00000054] flex justify-center items-center'>
    <div className='bg-C55 rounded-[8px] p-5 w-[700px]' >
    <div className='flex flex-row items-center justify-between'>
      <div className='font-bold text-[20px] text-C11'>
        Edit Task Info
      </div>
      <button className='cursor-pointer'
      onClick={handleModalClose}
      >
        <Close sx={{fontSize:20,fontWeight:800}}/>
      </button>
      </div>
      <div className='my-1 mt-2 text-[14px] flex flex-row gap-2'>
        <div className='flex flex-col flex-1 gap-2'>
        <div className='flex flex-col gap-1'>
          <div  className=" text-C11 text-[10px] font-bold  w-fit  select-none">Task Name</div>
          <input type="text" className='bg-C44 rounded-[8px]  p-2 text-[14px]' />
        </div>
        <div className='flex flex-col gap-1'>
          <div  className=" text-C11 text-[10px] font-bold  w-fit  select-none">Task Description</div>
          <textarea  rows={5} className='bg-C44 rounded-[8px]  p-2 text-[14px] resize-none' />
        </div>
        </div>


      </div>
      <div className='flex justify-end gap-4 mt-4'>
      <button className={` hover:bg-[#012b3927] rounded-[8px] text-C11 font-bold text-[12px] py-2 px-5`} onClick={handleModalClose}>Cancel</button>
        <button className={`bg-[#012b39f2] hover:bg-[#012B39] rounded-[8px] text-white font-bold text-[12px] py-2 px-5`} >Save</button>
      </div>
    </div>
  </div>
  )
}

export default EditTaskModal
