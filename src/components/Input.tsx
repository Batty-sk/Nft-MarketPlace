import React from 'react'

type InputProps = {

    title:string,
    inputType:string,
    placeHolder:string,
    handleOnChange:(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>void,

}

const Input = ({title,inputType,handleOnChange,placeHolder}:InputProps) => {

let jsxElement =<></>

switch(inputType){
    case 'textarea':
        jsxElement=<textarea rows={5} onChange={handleOnChange} className='w-full outline-none   font-poppins bg-[#eff7f6]' placeholder={placeHolder}/>
        break;
    case 'price':
        jsxElement= <div className='flex items-center justify-center'><input onChange={handleOnChange} type={'number'} placeholder={placeHolder} className='w-full h-10   font-poppins  outline-none me-2  bg-[#eff7f6]'></input> <p className='p-3'>ETH</p> </div>
        break;
    default:
        jsxElement=<input onChange={handleOnChange} type={inputType} placeholder={placeHolder} className='w-full  h-10  outline-none   bg-[#eff7f6] font-poppins ' />

}
  return (
    <div className='font-poppins  font-semibold dark:text-white text-black '>
        <p className='pb-1 pt-5 '>{title}</p>
        <div className='bg-[#eff7f6] shadow-sm border font-normal text-sm'>
        {jsxElement}
        </div>
    </div>
  )
}

export default Input
