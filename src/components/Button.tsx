import { Link } from "react-router-dom"
type Prop={
    title:string,
    path:string,
    handleOnClickOrChange:()=>void
}

const Button = ({title,path}:Prop) => {
  return (
    <button type="button" className="bg-gradient-to-r from-pink-700 to-pink-600 py-3 px-5 rounded-lg font-poppins">   
         <Link to={path} className="no-underline inline-block text-white">
            {title}
         </Link>

    </button>
  )
}

export default Button
