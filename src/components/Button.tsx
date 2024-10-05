
type Prop={
    title:string,
    path:string
}

const Button = ({title,path}:Prop) => {
  return (
    <button type="button" className="bg-gradient-to-r from-pink-700 to-pink-600 py-3 px-5 rounded-sm font-poppins">   
         <a href={path} className="no-underline inline-block text-white">
            {title}
         </a>

    </button>
  )
}

export default Button
