import React from "react";
import { Snackbar } from "@mui/material";
import { snackBarProp } from "@/pages/DetailsNfts";


type Props = {
  msg: string;
  open: boolean;
  handleClose:React.Dispatch<React.SetStateAction<snackBarProp>>;
  styles?:string
};

const SnackBar = ({ msg, open, handleClose,styles }: Props) => {

    const handleCloseSnackBar = ()=>{
        handleClose({message:msg,open:false})
    }

  return (
    <div className="fixed">
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      onClose={handleCloseSnackBar}
      autoHideDuration={3000}
      style={{borderRadius:"20%"}}
      key={msg}
    >   
    <p className={styles?styles:"font-poppins text-black p-2 ps-4 pe-4 bg-gray-100 min-w-fit "}>{msg}</p>
    </Snackbar>
    </div>
  );
};

export default SnackBar;
