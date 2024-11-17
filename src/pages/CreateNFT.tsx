import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { useContext } from "react";
import { ContractContext } from "../contexts/ContractContext";
import { Input, Button } from "../components";
import SnackBar from "../components/SnackBar";
import { snackBarProp } from "./DetailsNfts";

interface PreviewFile extends File {
  preview: string;
}

var arr;
console.log("arr", arr);

interface FormFields {
  title: string;
  price: number;
  description: string;
}

type createNftProps = {
  image: File;
  name: string;
  description: string;
  price: number;
};

const CreateNFT: React.FC = () => {
  const { handleUploadImageToIpfs } = useContext(ContractContext);
  const [snackBar, updateSnackBar] = useState<snackBarProp>({
    message: "",
    open: false,
  });

  const handleCreateNFT = async ({
    image,
    name,
    description,
    price,
  }: createNftProps) => {
    const res = await handleUploadImageToIpfs(image, name, description, price);
    if (res) {
      updateSnackBar({
        message: "NFT Created Successfully!",
        open: true,
        style:
          "font-poppins font-semibold md:ps-4 md:pe-4 md:p-3 p-2 text-green-500 bg-slate-50",
      });
      return;
    }
    updateSnackBar({
      message: "Something Went Wrong Please Try Again Later!",
      open: true,
      style:
        "font-poppins font-semibold md:ps-4 md:pe-4 md:p-3 p-2 text-red-500 bg-black",
    });
  };

  const [formFields, updateFormFields] = useState<FormFields>({
    title: "",
    price: 0.0,
    description: "",
  });

  const [image, setImage] = useState<PreviewFile | any>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".svg"],
    },
    multiple: false,
    onDrop: (acceptedFiles) => {
      const uploadedFile = acceptedFiles[0];
      if (uploadedFile) {
        console.log("uploaded file", uploadedFile);
        setImage(
          Object.assign(uploadedFile, {
            preview: URL.createObjectURL(uploadedFile),
          })
        );
      }
    },
  });

  return (
    <main className="p-10 dark:bg-black bg-white w-full flex flex-col justify-center items-center mb-10">
      <div className="flex flex-col justify-center items-center md:w-3/5 w-full">
        <div className="flex justify-start w-full">
          <h1 className="font-poppins dark:text-white text-black text-2xl font-semibold">
            Create NFT
          </h1>
        </div>

        <div className="flex flex-col justify-center items-center w-full py-16 px-8">
          <div className="w-full bg-[#eff7f6] rounded-md flex justify-center">
            <div
              {...getRootProps()}
              className="upload-image w-full border-2 border-gray-500 border-dotted dark:border-white flex py-8 px-8 flex-col items-center"
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className="font-semibold font-poppins dark:text-white text-black">
                  Drop the files here...
                </p>
              ) : (
                <div className="text-center">
                  {image ? (
                    <>
                      <img
                        src={image.preview}
                        alt="Preview"
                        className="w-32 h-32 object-cover mb-4"
                      />
                      <p className="font-semibold font-poppins dark:text-white text-black">
                        File Uploaded: {image.name}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-semibold font-poppins dark:text-white text-black">
                        Upload: SVG, PNG, JPG
                      </p>
                      <AddPhotoAlternateIcon style={{ fontSize: 170 }} />
                      <p className="font-semibold font-poppins dark:text-white text-black">
                        Drag & Drop Or{" "}
                      </p>
                      <p>
                        <Link to="" className="underline font-semibold text-sm">
                          {" "}
                          Browse A File From Your Computer{" "}
                        </Link>
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 w-full">
            <Input
              title="Title"
              inputType="text"
              handleOnChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                updateFormFields((prev) => ({
                  ...prev,
                  title: e.target.value,
                }));
              }}
              placeHolder="Title"
            />
            <Input
              title="Description"
              inputType="textarea"
              handleOnChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                updateFormFields((prev) => ({
                  ...prev,
                  description: e.target.value,
                }));
              }}
              placeHolder="Description ..."
            />
            <Input
              title="Price"
              inputType="price"
              handleOnChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                updateFormFields((prev) => ({
                  ...prev,
                  price: parseFloat(e.target.value),
                }));
              }}
              placeHolder="Price"
            />
            <div className="flex mt-8">
              <Button
                title="Create"
                path=""
                handleOnClickOrChange={() => {
                  console.log("handling image uploadation...");
                  handleCreateNFT({
                    image,
                    name: formFields.title,
                    description: formFields.description,
                    price: formFields.price,
                  });
                  //yea
                }}
              />
            </div>
          </div>

          <div></div>
        </div>
      </div>
    </main>
  );
};

export default CreateNFT;
