import React, { useState,useEffect} from 'react'
import Search from "@mui/icons-material/Search";
import { filterednftsData } from '@/constants';

type Prop={
    nftsData:filterednftsData[]|null,
    searchDataResult:React.Dispatch<React.SetStateAction<filterednftsData[] | null>>
}
const SearchBar = ({nftsData,searchDataResult}:Prop) => {
    const [searchTerm,updateSearchTerm]=useState('')

    const handleInputChange = (text:string)=>{
        const result  = nftsData?.filter((item,index)=>item.tokenData.name.startsWith(text))
        if (result?.length){
            searchDataResult(result)
        }
        console.log("result",result)
    }

    useEffect(()=>{
        const timer = setTimeout(() => {
            handleInputChange(searchTerm)
        }, 800);

        return ()=>clearTimeout(timer)

    },[searchTerm])

  return (
    <div className="w-72 max-w-80 min-w-52 flex items-center justify-center">
    <Search fontSize="large" className="cursor-pointer"/>
    <input type="search" name="search" id="" onChange={(e)=>{
        updateSearchTerm(e.target.value)
    }} placeholder="Search..." className="h-10 max-h-10 border-2 rounded-md dark:bg-slate-200   w-full ms-2" />
  </div>
  )
}

export default SearchBar
