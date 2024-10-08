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
        jsxElement=<textarea rows={5} onChange={handleOnChange} className='w-full font-normal border-2 border-gray-300 rounded-md' placeholder={placeHolder}/>
        break;
    case 'price':
        jsxElement= <div className='flex items-center justify-center'><input onChange={handleOnChange} type={'number'} placeholder={placeHolder} className='w-full font-normal h-10 border-2 border-gray-300 rounded-md me-2'></input> <p>ETH</p> </div>
        break;
    default:
        jsxElement=<input onChange={handleOnChange} type={inputType} placeholder={placeHolder} className='w-full font-normal h-10 border-2 border-gray-300  rounded-md' />

}
  return (
    <div className='font-poppins font-semibold dark:text-white text-black'>
        <p className='pb-2 pt-5 '>{title}</p>
        {jsxElement}
    </div>
  )
}

export default Input
