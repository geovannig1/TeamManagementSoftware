import { Close } from '@mui/icons-material'
import React, { useState } from 'react'
import { deleteProjectById } from '../services/projectServices'
import { Link } from 'react-router-dom'
import APIResponseStatus from '../common/APIResponseStatus'

function DeleteProjectConfirmationModal(props:any) {
    const {setDeleteProjetModal,activeProject,}=props
    const[deleteProjectStatus,setDeleteProjectStatus]=useState<string>("not-deleted")

    const handleModalClose =()=>{
        setDeleteProjetModal(false)
    }

    const handleDelete =async()=>{
      // console.log("Perform registration logic");
      setDeleteProjectStatus("delete-loading")

      await deleteProjectById(activeProject?._id).then((res:any)=>{
        console.log("(inreact)DELETE PROJECT BY ID RESULT : ",res)
        if(res?.deleteStatus){
          setDeleteProjectStatus("delete-success")
        }
      }).catch((err:any)=>{
        console.log("Catch block falllllllll",err)
        setDeleteProjectStatus("delete-failure")
      })
      
    }


  return (
    <div className='top-0 left-0 absolute w-[100vw] h-[100vh] bg-[#00000054] flex justify-center items-center'>
    <div className='bg-C55 rounded-[8px] p-5 w-[90%] md:w-[500px] shadow-xl' >
      <div className='flex flex-row items-center justify-between'>
      <div className='font-bold text-[20px] text-C11'>
        Delete Project
      </div>
      {deleteProjectStatus!=="delete-success"?
      <button className='cursor-pointer'
      onClick={handleModalClose}
      >
        <Close sx={{fontSize:20,fontWeight:800}}/>
      </button>:null
       }
      </div>  
      {
      deleteProjectStatus==="not-deleted"?
      <div className="mt-4 mb-6 text-[14px]">
      Are you sure you want to delete the project " <strong>{activeProject?.projectName}</strong> " ? 
      </div>:
       deleteProjectStatus==="delete-loading"?null
       :deleteProjectStatus==="delete-success"?
       <APIResponseStatus status={true} message="Project Deleted"/>
       :deleteProjectStatus==="delete-failure"?
       <APIResponseStatus status={false} message="Deletion Failed"/>
       :null
      }

      <div className='flex justify-end gap-4 mt-2'>
        {
          deleteProjectStatus==="not-deleted"?
          <>
            <button className={` bg-inactiveC11 rounded-[8px] text-C11 font-bold text-[12px] py-2 px-5`}  onClick={handleModalClose}>Not Sure</button>
            <button className={`hover:bg-inactiveRed rounded-[8px] text-highPriority font-bold text-[12px] py-2 px-5`} onClick={handleDelete}>Delete</button>
          </>:
          deleteProjectStatus==="delete-loading"?
          <div className="flex justify-center text-[16px] font-light mx-auto ">
          <div>Deleting Project...</div>
          </div>:
          deleteProjectStatus==="delete-success"?
          <Link to={`/dashboard`}>
          <div className={` bg-inactiveC11 rounded-[8px] text-C11 font-bold text-[12px] py-2 px-5`}>
             Go Back To Dashboard
          </div>
          </Link>:
          deleteProjectStatus==="delete-failure"?
          <button className={` bg-inactiveC11 rounded-[8px] text-C11 font-bold text-[12px] py-2 px-5`}  onClick={handleModalClose}>Close</button>:
          null

        }
      </div> 
    </div>
  </div>
  )
}

export default DeleteProjectConfirmationModal
