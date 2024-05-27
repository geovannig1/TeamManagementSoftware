import React, { useEffect, useRef, useState } from "react";
import ErrorBox from "../common/ErrorBox";
import {
  AttachFile,
  Close,
  FolderZip,
  Image,
  InsertDriveFile,
  UploadFile,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import axios from "axios";
import { CLOUDINARY_CLOUDNAME } from "../env/environment";
import { addMediaToProject } from "../services/projectServices";
import { acceptedFileTypes } from "../Constants";

function ProjectPageAddMediaModal(props: any) {
  const { setAddMediaModal, activeProject, triggerRerender } = props;
  const fileInputRef = useRef<any>(null);
  const [fileList, setFileList] = useState<any>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
    }, 5000);

    // Clear the timeout if the component unmounts or if there's a new error
    return () => clearTimeout(timer);
  }, [error]);

  const handleFileUpload = () => {
    const fileInput = fileInputRef.current;
    if (fileInput.files.length > 0) {
      setFileList((prevList: any) => [...prevList, ...fileInput.files]);
    }
    console.log("FILE ADDED")
  };

  const removeItemFromFileList = (node: any) => {
    let newList = fileList.filter((item: any) => item !== node);
    setFileList(newList);
  };

  const handleModalClose = () => {
    setFileList([]);
    setAddMediaModal(false);
  };

  const uploadToCloudinary = async()=>{
    try {
      const uploadPromises = fileList.map(async (file: any) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "image_preset");
  
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUDNAME}/auto/upload`,
          data
        );
  
        return {
          mediaType: file.type,
          mediaURL: response.data.secure_url,
          mediaName: file.name,
          mediaSize: file.size,
        };
      });
  
      // Wait for all uploads to complete before returning
      const uploadedMediaData = await Promise.all(uploadPromises);
  
      return uploadedMediaData;
    } catch (error:any) {
      console.log("ERROR IN UPLOADING TO CLOUDINARY", error);
      setLoading(false);
      setError(error?.message || "Could not Upload To Cloud");
    }
}

  const handleSubmit = async () => {
    if(fileList.length===0){
      setError("Add atleast one media")
    }
    else{
      setLoading(true);
      try {
        await uploadToCloudinary().then(async(res:any)=>{
          console.log("MEDIA UPLOAD RESULT : ",res)
          await addMediaToProject(activeProject?._id,res).then((res:any)=>{
            console.log("(INREACT) UPLOAD MEDIA RESULT: ", res);
            if(res.addSuccess){
              setLoading(false);
              setFileList([]);
              setAddMediaModal(false);
              triggerRerender();
            }
            else{
              setLoading(false);
              setError("Something went wrong");
            }
    
          }).catch((err:any)=>{
            console.log("(INREACT) UPLOAD MEDIA ERROR: ", err);
    
          })
        }).catch((err:any)=>{
          console.log("MEDIA UPLOAD ERROR INCLOUDINARY : ",err)
        })
  
      } catch (err:any) {
        setLoading(false);
        setError(err?.message || "Something went wrong");
      }
    }
  };
  

  return (
    <div className="top-0 left-0 absolute w-[100vw] h-[100vh] bg-[#00000054] flex justify-center items-center">
      <div className="bg-C55 rounded-[8px] p-5 w-[90%] md:min-w-[550px] max-w-[550px] shadow-xl">
        <div className="flex flex-row items-center justify-between">
          <div className="font-bold text-[20px] text-C11">
            Add New Media To Project
          </div>
          <button className="cursor-pointer" onClick={handleModalClose}>
            <Close sx={{ fontSize: 20, fontWeight: 800 }} />
          </button>
        </div>
        <div className="my-4 text-[14px] flex flex-row gap-2 ">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept={acceptedFileTypes}
            onChange={handleFileUpload}
          />
          {
            !loading?
          <button
          disabled={loading?true:false}
            className={`${loading?"cursor-not-allowed":"cursor-pointer"} bg-C44 flex flex-col gap-2 items-center text-inactiveC11 transition-colors duration-[0.5s] justify-center border-inactiveC11 border-2 hover:bg-C44 rounded-[8px]  hover:text-gray-400 font-bold text-[12px] py-2 px-5 cursor-pointer w-full min-h-[100px]`}
            onClick={() => {
              fileInputRef.current.click();
            }} // Trigger file input click on button click
          >
            <div className="flex justify-center w-fit">
              <UploadFile sx={{ fontSize: 40 }} />
            </div>
            <span>Browse Files To Upload</span>
          </button>:
          <div className="bg-C44 flex flex-col gap-2  items-center text-inactiveC11 transition-colors duration-[0.5s] justify-center border-inactiveC11 border-2 hover:bg-C44 rounded-[8px]  hover:text-gray-400 font-bold text-[12px] py-2 px-5 cursor-pointer w-full min-h-[100px]">
            <div className="mx-auto">Uploading Media...</div>
          </div>

          }
        </div>
        {fileList.length > 0 && (
          <div className="flex flex-col w-full gap-1 max-h-[150px] overflow-y-auto">
            {fileList?.map((node: any) => (
              <div className="flex items-center justify-between flex-row gap-1 px-2 py-1 text-[12px] font-semibold bg-gray-100     hover:bg-inactiveC11 text-C11 rounded-[4px]">
                <div className="flex flex-row gap-1 item-center">
                  <div className="w-fit">
                    {node.type === "image/jpeg" ? (
                      <Image sx={{ fontSize: 15 }} />
                    ) : node.type === "application/pdf" ? (
                      <InsertDriveFile sx={{ fontSize: 15 }} />
                    ) : node.type === "application/x-zip-compressed" ? (
                      <FolderZip sx={{ fontSize: 15 }} />
                    ) : (
                      <AttachFile sx={{ fontSize: 15 }} />
                    )}
                  </div>
                  <div className=' max-w-[400px] text-ellipsis truncate'>{node.name}</div>
                </div>

                <Tooltip title="Remove File" arrow placement="right">
                  <button onClick={() => removeItemFromFileList(node)}>
                    <Close sx={{ fontSize: 15 }} />
                  </button>
                </Tooltip>
              </div>
            ))}
          </div>
        )}
        {error && (
          <div className="mt-2">
            <ErrorBox message={error} />
          </div>
        )}

        <div className="flex justify-end gap-4 mt-2">
          <button
            disabled={loading?true:false}
            className={`${loading?"cursor-not-allowed":"cursor-pointer"} hover:bg-[#012b3927] rounded-[8px] text-C11 font-bold text-[12px] py-2 px-5`}
            onClick={handleModalClose}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading?true:false}
            className={`${loading?"cursor-not-allowed":"cursor-pointer"} bg-[#012b39f2] hover:bg-[#012B39] rounded-[8px] text-white font-bold text-[12px] py-2 px-5`}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectPageAddMediaModal;
