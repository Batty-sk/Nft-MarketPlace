import React,{useState} from 'react'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import MoreHorizSharpIcon from '@mui/icons-material/MoreHorizSharp';
type Prop ={

}
const Pagination = () => {
    const [currentPageNo,updateCurrentPageNo] = useState(1)
    const handleClickPrevious = ()=>{
        
    }
    const handleClickNext = ()=>{
        
    }

    const handleDirectChange = (no:number)=>{
        
    }
  return (
    <div className='flex m-auto'>
    <KeyboardDoubleArrowLeftIcon fontSize={'large'} className='cursor-pointer me-3'/>
    <ul className='flex justify-center items-center font-poppins'>
        <li>1</li>
        <li>2</li>
    </ul>
    <div className='flex justify-center items-end'>
            <MoreHorizSharpIcon fontSize='small' />
        </div>
    <KeyboardDoubleArrowRightIcon fontSize='large' className='cursor-pointer ms-3'/>
    </div>
  )
}

export default Pagination
