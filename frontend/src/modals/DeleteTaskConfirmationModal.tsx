import { Close } from '@mui/icons-material'
import React, { useState } from 'react'
import { deleteTaskById } from '../services/taskServices'
import APIResponseStatus from '../common/APIResponseStatus'
import { Link } from 'react-router-dom'

function DeleteTaskConfirmationModal(props:any) {

    const {setDeleteTaskModal,activeTask}=props
    const[deleteTaskStatus,setDeleteTaskStatus]=useState<string>("not-deleted")


    const handleDelete =async()=>{
      // console.log("Perform registration logic");
      setDeleteTaskStatus("delete-loading")

      await deleteTaskById(activeTask?._id).then((res:any)=>{
        console.log("(inreact)DELETE TASK BY ID RESULT : ",res)
        if(res?.deleteStatus){
          setDeleteTaskStatus("delete-success")
        }
      }).catch((err:any)=>{
        console.log("(inreact)DELETE TASK BY ID ERROR :",err)
        setDeleteTaskStatus("delete-failure")
      })
      
    }

    const handleModalClose =()=>{
        setDeleteTaskModal(false)
    }
  return (
    <div className='top-0 left-0 absolute w-[100vw] h-[100vh] bg-[#00000054] flex justify-center items-center'>
    <div className='bg-C55 rounded-[8px] p-5 w-[90%] md:w-[500px] shadow-xl' >
      <div className='flex flex-row items-center justify-between'>
      <div className='font-bold text-[20px] text-C11'>
        Delete Task
      </div>
      {deleteTaskStatus!=="delete-success"?
      <button className='cursor-pointer'
      onClick={handleModalClose}
      >
        <Close sx={{fontSize:20,fontWeight:800}}/>
      </button>:null
       }
      </div> 
      {deleteTaskStatus==="not-deleted"?
      <div className="mt-4 mb-6 text-[14px]">
        This process is irreversible !!<br/>
        Are you sure you want to remove " <strong>{activeTask?.taskTitle}</strong> " from <strong>{activeTask?.project?.projectName}</strong> ? 
      </div>:
      deleteTaskStatus==="delete-loading"?
      null:
      deleteTaskStatus==="delete-success"?
      <APIResponseStatus status={true} message="Task Deleted"/>
      :deleteTaskStatus==="delete-failure"?
      <APIResponseStatus status={false} message="Deletion Failed"/>
      :null


      } 
      <div className='flex justify-end gap-4 mt-2'>
        {
          deleteTaskStatus==="not-deleted"?
          <>
        <button className={` bg-inactiveC11 rounded-[8px] text-C11 font-bold text-[12px] py-2 px-5`}  onClick={handleModalClose}>Not Sure</button>
        <button
         className={`hover:bg-inactiveRed rounded-[8px] text-highPriority font-bold text-[12px] py-2 px-5`} 
         onClick={handleDelete}>Delete</button>
          </>:
           deleteTaskStatus==="delete-loading"?
           <div className="flex justify-center text-[16px] font-light mx-auto ">
           <div>Deleting Task...</div>
           </div>:
           deleteTaskStatus==="delete-success"?
           <Link to={`/project-page?id=${activeTask?.project?._id}`}>
           <div className={` bg-inactiveC11 rounded-[8px] text-C11 font-bold text-[12px] py-2 px-5`}>
              Go Back To Project
           </div>
           </Link>:
           deleteTaskStatus==="delete-failure"?
           <button className={` bg-inactiveC11 rounded-[8px] text-C11 font-bold text-[12px] py-2 px-5`}  onClick={handleModalClose}>Close</button>:
           null
        }
      </div> 
    </div>
  </div>
  )
}

export default DeleteTaskConfirmationModal
