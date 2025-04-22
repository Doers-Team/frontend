export default function Home() {
  return (
    <div className="flex flex-col justify-center mt-50">
      <div className="flex justify-center mt-5">
        <button className="h-15 w-30 m-5 bg-link text-bg text-xl rounded-xl">Button</button>
        <button className="h-15 w-30 m-5 bg-info text-bg text-xl rounded-xl">Button</button>
        <button className="h-15 w-30 m-5 bg-success text-bg text-xl rounded-xl">Button</button>
        <button className="h-15 w-30 m-5 bg-warning text-bg text-xl rounded-xl">Button</button>
        <button className="h-15 w-30 m-5 bg-danger text-bg text-xl rounded-xl">Button</button>
      </div>
    </div>
  );
}
