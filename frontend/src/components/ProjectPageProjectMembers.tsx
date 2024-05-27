import { Delete, Group, Person, PersonAddAlt1 } from '@mui/icons-material'
import React from 'react'
import { colors } from '../Constants'
import { Tooltip } from '@mui/material'

function ProjectPageProjectMembers(props:any) {
  const {setRemoveMemberModal,setViewMemberModal,setAddMemberModal,activeProject,myProfiledata}=props
  return (
    <>
    <div className="w-full lg:w-1/2 ">
        <div className="flex flex-row justify-between gap-2 py-1 ">
          <div className='flex flex-row items-center'>
          <div>
            <Group sx={{ fontSize: 25 }} />
          </div>
          <div className="font-bold text-[18px] ml-1">Project Members</div>
          </div>
          {
          activeProject?.projectManager._id === myProfiledata?._id&&
          <Tooltip title={"Add New Member"} arrow placement="left">
                <button
                  onClick={() => setAddMemberModal(true)}
                  className=" text-C55 flex flex-row items-center px-2 rounded-[4px] text-[12px] cursor-pointer "
                >
                  <PersonAddAlt1 sx={{ fontSize: 18, color: colors.C11 }}/>
                </button>
            </Tooltip>
          }
          
        </div>
        <div className="p-1 flex flex-col gap-2 py-4 overflow-y-auto max-h-[400px]">
          {activeProject?.projectMembers?.map((node: any) => (
            <div className="flex flex-row group rounded-[4px]  text-[12px] max-w-full break-words hover:bg-C44  transition-all " key={node._id}>
              <div
                className={`min-w-[10px] group-hover:min-w-[80px] duration-200 flex justify-center items-center bg-C11 p-1 rounded-[4px] group-hover:rounded-l-[4px] group-hover:rounded-r-[0px] `}
              >
                <div className="hidden text-C55 font-semibold group-hover:flex duration-[1s] px-1">
                {`${node.role}`}
                </div>
              </div>
              <div className='flex flex-row items-center justify-between flex-1 px-2'>
              <div className='flex flex-row items-center'>
              <Person sx={{ fontSize: 12, color: colors.C11 }} />
              <Tooltip title="View Profile" arrow placement="right">
                <button onClick={()=>setViewMemberModal({[`isOpen`]:true,[`memberData`]:node})} className="p-2 break-words cursor-pointer hover:underline underline-offset-2">{`${node.firstName} ${node.lastName}`}</button>
              </Tooltip>
                </div> 
              {/* Project manager privilege */}
              {
                ((activeProject?.projectManager._id === myProfiledata?._id)&&(node?._id !== myProfiledata?._id))?
              <Tooltip title="Remove member" arrow placement="left">
                <button 
                onClick={()=>setRemoveMemberModal({[`isOpen`]:true,[`memberData`]:node})}
                className="text-transparent break-words cursor-pointer group-hover:text-C11 "> 
                <Delete sx={{fontSize:18}} />
                </button>
              </Tooltip>
              :null
              }
              </div>
            </div>
          
          ))}
        </div>
      </div>

    
    </>
  )
}

export default ProjectPageProjectMembers
