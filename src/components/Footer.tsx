import { FacebookOutlined } from "@mui/icons-material";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import Button from "./Button";

type LinksBoxProp = {
  title: string;
  links: string[];
};
const LinksBox = ({ title, links }: LinksBoxProp) => {
  return (
    <div className="py-5 px-5">
      <h5 className="dark:text-white text-black font-poppins font-semibold pb-3">
        {title}
      </h5>
      <ul className="p-0 m-0">
        {links.map((item, i) => (
          <li key={i}>
            <a
              href={`/${item}`}
              className="no-underline dark:text-white text-black font-poppins text-sm"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="dark:bg-black border-t dark:border-zinc-900 border-slate-200  py-8 px-2">
      <div className="flex md:flex-row flex-col justify-evenly items-center">
        <div className="flex flex-col ">
          <h5 className="font-poppins dark:text-white text-black">Logo</h5>
          <div className="flex justify-evenly items-center">
            <input
              type="email"
              placeholder="Email"
              className="w-full font-poppins rounded-md h-10 outline me-2"
            />
            <Button title="Send" path="/" handleOnClickOrChange={()=>(0)}/>
          </div>
        </div>
        <div className="flex justify-center items-center ">
          <LinksBox
            title="Our Team"
            links={["About", "Contact", "Privacy Policy"]}
          />
          <LinksBox
            title="Quick Links"
            links={["Resell NFTs", "Buy NFTs", "My Profile"]}
          />
        </div>
      </div>

      <div className="flex md:flex-row flex-col justify-center pt-5 border-t dark:border-zinc-900 items-center font-poppins ">
        <p className="dark:text-white text-black text-sm me-2">
          All Copyrights And Trademarks.
        </p>
        <div className="flex">
          <div className="mx-2">
            <FacebookOutlined fontSize="medium" />
          </div>
          <div className="mx-2">
            <XIcon fontSize="medium" />
          </div>
          <div className="mx-2">
            <InstagramIcon fontSize="medium" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
