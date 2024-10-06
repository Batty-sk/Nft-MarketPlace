import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useState } from "react";

import { Input } from "../components";
const CreateNFT = () => {
    const [formFields,updateFormFields]=useState({title:'',price:0.0,description:''})
  return (
    <main className="p-10 dark:bg-black bg-white  w-full flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center md:w-3/5 w-full">
      <div className="flex justify-start w-full">
        <h1 className="font-poppins dark:text-white text-black text-2xl font-semibold">
          Create NFT
        </h1>
      </div>

      <div className="flex flex-col justify-center items-center w-full   shadow-md shadow-gray-300  dark:shadow-pink-600 mt-10 py-14 px-8 rounded-lg dark:bg-zinc-900 bg-slate-100 ">
        <div className="upload-image border-4 border-gray-500 border-dotted dark:border-white flex py-8 px-8 flex-col items-center rounded-lg">
            <p className="font-semibold font-poppins dark:text-white text-black">Upload: SVG, PNG, JPG </p>
            <AddPhotoAlternateIcon  style={{fontSize:300}}/>
            <p className="font-semibold font-poppins dark:text-white text-black">Drag & Drop Or <a href="" className="underline"> Browse A File From Your Computer </a></p>
        </div>

        <div className="mt-4 w-full">
            <Input title="Title" inputType="text" handleOnChange={(e)=>{updateFormFields(prev=>({...prev,title:e.target.value}))}}  placeHolder="Name"/>
            <Input title="Description" inputType="textarea" handleOnChange={(e)=>{updateFormFields(prev=>({...prev,description:e.target.value}))}}  placeHolder="Description"/>
            <Input title="Price" inputType="price" handleOnChange={(e)=>{updateFormFields(prev=>({...prev,price:+(e.target.value)}))}}  placeHolder="Price"/>


        </div>

        <div></div>
      </div>
      </div>
    </main>
  );
};

export default CreateNFT;
