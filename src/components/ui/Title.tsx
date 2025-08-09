export default function Title(props : { title: string; desc: string }) {
    const {title, desc} = props;
  return (
    <>
      <div className="inner-title text-center relative mb-8">
        <h2 className="relative z-10 inline-block bg-background text-3xl font-bold text-text-primary px-[20px]">
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
