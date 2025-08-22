import { useNavigate } from "react-router-dom";

export default function Title(props : { title: string; desc: string, link?: string }) {
    const {title, desc, link} = props;
    const navigate = useNavigate();
  return (
    <>
      <div className="inner-title text-center relative 2xl:mb-8 xs:mb-2 lg:mb-4 cursor-pointer"
        onClick={() => {
          if (link) {
            navigate(`/${link}`); // Navigate to the specified link
          }
        }}
      >
        <h2 className="relative z-10 inline-block bg-background text-3xl font-bold text-text-primary px-[20px] hover:text-accent transition-all duration-300 xs:text-[26px] lg:scale-95 3xl:scale-100">
          {title}
        </h2>
        <div className="line absolute top-[20px] left-[25%] bg-border h-1 w-1/2 mx-auto mb-4"></div>
        <p className="text-text-secondary text-base lg:text-lg pt-[10px] xs:scale-90 lg:scale-95 3xl:scale-100 ">
          {desc}
        </p>
      </div>
    </>
  );
}
