import { PendingActions } from "@mui/icons-material";
import React from "react";
import { dummyTasks } from "../data/data";
import { Tooltip } from "@mui/material";

function ProjectPageMyTasks() {
  return (
    <>
      <div className="w-1/2 ">
        <div className="flex flex-row items-center justify-between gap-2 py-1">
          <div className="flex flex-row ">
          <PendingActions sx={{ fontSize: 25 }} />
          <div className="font-bold text-[18px] ml-2">My Tasks</div> 
          </div>
          <div className="flex flex-row gap-1 px-1">
            <Tooltip title="High Priority" arrow placement="left">
              <div className="w-[15px] h-[15px] rounded-full bg-highPriority"></div>
            </Tooltip>
            <Tooltip title="Medium Priority" arrow placement="top">
              <div className="w-[15px] h-[15px] rounded-full bg-mediumPriority"></div>
            </Tooltip>
            <Tooltip title="Low Priority" arrow placement="right">
              <div className="w-[15px] h-[15px] rounded-full bg-lowPriority"></div>

            </Tooltip>
          </div>
        </div>
        <div className="p-1 flex flex-col gap-2 py-4 overflow-y-auto max-h-[400px]">
          {dummyTasks?.map((node: any) => (
            <Tooltip title="View Task" arrow placement="right">
            <div className="flex flex-row group rounded-[4px]  text-[12px] max-w-full break-words hover:bg-C44 cursor-pointer transition-all ">
              <div
                className={`min-w-[10px] group-hover:min-w-[80px] duration-200 flex justify-center items-center  ${
                  node.priority === "high"
                    ? "bg-highPriority"
                    : node.priority === "medium"
                    ? "bg-mediumPriority"
                    : "bg-lowPriority"
                } p-1 rounded-[4px] group-hover:rounded-l-[4px] group-hover:rounded-r-[0px] `}
              >
                <div className="hidden text-C11 font-semibold group-hover:flex duration-[1s]">
                  {node.taskID}
                </div>
              </div>

              <div
                className={`hidden group-hover:flex  min-w-[10px] group-hover:min-w-[80px] duration-200 justify-center items-center p-1   group-hover:rounded-r-[0px] bg-[#dedede] `}
              >
                <div className="hidden text-C11 font-semibold group-hover:flex duration-[1s]">
                  Completed
                </div>
              </div>
              <div className="p-2 max-w-[80%] break-words">{node.taskName}</div>
            </div>
            </Tooltip>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProjectPageMyTasks;
