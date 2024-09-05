export default function Loading() {
  return (
    <div className="flex flex-row gap-12 items-center w-full h-full justify-center">
      <div className="skeleton h-[300px] w-[300px]"></div>
      <div className="flex flex-col gap-6">
        <div className="skeleton h-8 w-[300px]"></div>
        <div className="skeleton h-8 w-[300px]"></div>
        <div className="skeleton h-8 w-[300px]"></div>
        <div className="skeleton h-8 w-[300px]"></div>
      </div>
    </div>
  );
}
