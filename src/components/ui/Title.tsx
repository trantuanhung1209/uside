import { useNavigate } from "react-router-dom";

export default function Title(props : { title: string; desc: string, link?: string }) {
    const {title, desc, link} = props;
    const navigate = useNavigate();
  return (
    <>
      <div className="inner-title text-center relative mb-8 cursor-pointer scale-[1.01]"
        onClick={() => {
          if (link) {
            navigate(`/${link}`); // Navigate to the specified link
          }
        }}
      >
        <h2 className="relative z-10 inline-block bg-background text-3xl font-bold text-text-primary px-[20px] hover:text-accent transition-all duration-300 scale-[1.01]">
          {title}
        </h2>
        <div className="line absolute top-[20px] left-[25%] bg-border h-1 w-1/2 mx-auto mb-4"></div>
        <p className="text-text-secondary text-lg pt-[10px]">
          {desc}
        </p>
      </div>
    </>
  );
}
