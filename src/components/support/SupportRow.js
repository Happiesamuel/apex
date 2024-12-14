function SupportRow({ children, title }) {
  return (
    <div className="flex items-center gap-3 text-sm text-zinc-300 mx-3">
      <div className="flex items-center gap-2">
        <p className="text-5xl">&#183;</p>
        <p> {title}</p>
      </div>
      {children}
    </div>
  );
}

export default SupportRow;
