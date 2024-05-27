import React, { useEffect, useState } from 'react'
import APIResponseStatus from '../common/APIResponseStatus'
import { Close } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { changeTaskStatus } from '../services/taskServices'

function ChangeStatusModal(props:any) {
    const {setTaskStatusModal,activeTask,triggerRerender}=props
    const[updateTaskStatus,setUpdateTaskStatus]=useState<string>("not-updated")
    const[currentStatus,setCurrentStatus] = useState<string>(activeTask?.taskStatus)

    useEffect(()=>{
        if(currentStatus==="Completed"){
            setCurrentStatus("In Progress")
        }
        else{
            setCurrentStatus("Completed")
        }

    },[activeTask])


    const handleUpdate =async()=>{
      // console.log("Perform registration logic");
      setUpdateTaskStatus("update-loading")
      await changeTaskStatus(activeTask?._id,currentStatus).then((res:any)=>{
        console.log("(inreact)CHANGE TASK STATUS BY ID RESULT : ",res)
        if(res?.updateStatus){
          setUpdateTaskStatus("update-success")
          triggerRerender()
        }
      }).catch((err:any)=>{
        console.log("(inreact)CHANGE TASK STATUS BY ID ERROR :",err)
        setUpdateTaskStatus("update-failure")
      })
      
    }

    const handleModalClose =()=>{
        setTaskStatusModal(false)
    }
  return (
    <div className='top-0 left-0 absolute w-[100vw] h-[100vh] bg-[#00000054] flex justify-center items-center'>
    <div className='bg-C55 rounded-[8px] p-5 w-[90%] md:w-[500px] shadow-xl' >
      <div className='flex flex-row items-center justify-between'>
      <div className='font-bold text-[20px] text-C11'>
        Update Task Status
      </div>
      {updateTaskStatus!=="update-success"?
      <button className='cursor-pointer'
      onClick={handleModalClose}
      >
        <Close sx={{fontSize:20,fontWeight:800}}/>
      </button>:null
       }
      </div> 
      {updateTaskStatus==="not-updated"?
      <div className="mt-4 mb-6 text-[14px]">
        {activeTask?.taskStatus==="In Progress"?
        <span>Do you confirm to mark this  task as <strong>Completed</strong>?</span>:
        <span>Do you confirm change task as <strong>In Progress</strong>?</span>
        }
        
      </div>:
      updateTaskStatus==="update-loading"?
      null:
      updateTaskStatus==="update-success"?
      <APIResponseStatus status={true} message="Task Status Updated"/>
      :updateTaskStatus==="update-failure"?
      <APIResponseStatus status={false} message="Updation Failed"/>
      :null


      } 
      <div className='flex justify-end gap-4 mt-2'>
        {
          updateTaskStatus==="not-updated"?
          <>
        <button className={` bg-inactiveC11 rounded-[8px] text-C11 font-bold text-[12px] py-2 px-5`}  onClick={handleModalClose}>Not Sure</button>
        <button className={` bg-C11 rounded-[8px] text-C55 font-bold text-[12px] py-2 px-5`} onClick={handleUpdate}>Update</button>
          </>:
           updateTaskStatus==="update-loading"?
           <div className="flex justify-center text-[16px] font-light mx-auto ">
           <div>Updating Task Status...</div>
           </div>:
           updateTaskStatus==="update-success"?
           <button className={` bg-inactiveC11 rounded-[8px] text-C11 font-bold text-[12px] py-2 px-5`}  onClick={handleModalClose}>Back To Task</button>:
           updateTaskStatus==="update-failure"?
           <button className={` bg-inactiveC11 rounded-[8px] text-C11 font-bold text-[12px] py-2 px-5`}  onClick={handleModalClose}>Close</button>:
           null
        }
      </div> 
    </div>
  </div>
  )
}

export default ChangeStatusModal
