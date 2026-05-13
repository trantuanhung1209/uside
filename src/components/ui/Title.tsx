import { useNavigate } from "react-router-dom";

export default function Title(props : { title: string; desc: string, link?: string }) {
    const {title, desc, link} = props;
    const navigate = useNavigate();
  return (
    <>
      <div
        className={`inner-title text-center relative 2xl:mb-8 xs:mb-3 lg:mb-5 ${link ? "cursor-pointer" : ""}`}
        role={link ? "button" : undefined}
        tabIndex={link ? 0 : undefined}
        onClick={() => {
          if (link) {
            navigate(`/${link}`); // Navigate to the specified link
          }
        }}
        onKeyDown={(event) => {
          if (link && (event.key === "Enter" || event.key === " ")) {
            event.preventDefault();
            navigate(`/${link}`);
          }
        }}
      >
        <h2 className="relative z-1 inline-block bg-background text-3xl font-bold text-text-primary px-5 hover:text-accent transition-all duration-300 xs:text-[26px] lg:text-[30px] 3xl:text-3xl">
          {title}
        </h2>
        <div className="line absolute top-[20px] left-[12%] sm:left-[20%] lg:left-[25%] bg-border h-1 w-3/4 sm:w-3/5 lg:w-1/2 mx-auto mb-4"></div>
        <p className="text-text-secondary text-base lg:text-lg pt-3 max-w-3xl mx-auto leading-relaxed px-2">
          {desc}
        </p>
      </div>
    </>
  );
}
