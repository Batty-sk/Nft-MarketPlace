const Banner = ({ title }: { title: string }) => {
  return (
    <div className="bg-gradient-to-r from-pink-600 to-pink-700 w-3/4 minmd:3/4 xl:w-3/4 px-8 py-16 rounded-lg overflow-hidden relative">
      <h1 className="dark:text-white text-white text-3xl leading-10 font-poppins font-semibold">
        {title}
      </h1>

     <div className="absolute w-48 h-48 rounded-full bg-white opacity-20 -top-10 -left-10" />
     <div className="absolute w-72 h-72 rounded-full bg-white opacity-20 -bottom-52 -right-10" />
    </div>
  );
};

export default Banner;
