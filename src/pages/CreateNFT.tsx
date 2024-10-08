import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useState } from "react";

import { Input,Button } from "../components";


const CreateNFT = () => {

    const [formFields,updateFormFields]=useState({title:'',price:0.0,description:''})
  return (
    <main className="p-10 dark:bg-black bg-white  w-full flex flex-col justify-center items-center mb-10">
        <div className="flex flex-col justify-center items-center md:w-3/5 w-full">
      <div className="flex justify-start w-full">
        <h1 className="font-poppins dark:text-white text-black text-2xl font-semibold">
          Create NFT
        </h1>
      </div>

      <div className="flex flex-col justify-center items-center w-full   py-14 px-8 rounded-lg ">
        <div className="w-full  bg-slate-100 shadow-md rounded-md flex justify-center p-8">
        <div className="upload-image w-8/12 border-2 border-gray-500 border-dotted dark:border-white flex py-8 px-8 flex-col items-center rounded-lg">
            <p className="font-semibold font-poppins dark:text-white text-black">Upload: SVG, PNG, JPG </p>
            <AddPhotoAlternateIcon  style={{fontSize:170,color:''}}/>
            <p className="font-semibold font-poppins dark:text-white text-black">Drag & Drop Or </p>
            <p><a href="" className="underline font-semibold text-sm"> Browse A File From Your Computer </a></p>
        </div>
        </div>

        <div className="mt-4 w-full">
            <Input title="Title" inputType="text" handleOnChange={(e)=>{updateFormFields(prev=>({...prev,title:e.target.value}))}}  placeHolder="Title"/>
            <Input title="Description" inputType="textarea" handleOnChange={(e)=>{updateFormFields(prev=>({...prev,description:e.target.value}))}}  placeHolder="Write something about ur NFT ..."/>
            <Input title="Price" inputType="price" handleOnChange={(e)=>{updateFormFields(prev=>({...prev,price:+(e.target.value)}))}}  placeHolder="Price"/>
            <div className="flex mt-8">
              <Button title="Create" path="/" handleOnClickOrChange={()=>{}} />
            </div> 
        </div>

        <div></div>
      </div>
      </div>
    </main>
  );
};

export default CreateNFT;
