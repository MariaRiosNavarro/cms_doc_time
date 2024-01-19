const Loading = () => {
  return (
    <div className="h-screen flex items-center justify-center gap-8">
      <span className="loading loading-spinner text-primary w-[10%]"></span>
      <span className="loading loading-spinner text-secondary w-[10%]"></span>
      <span className="loading loading-spinner text-accent w-[10%]"></span>
    </div>
  );
};

export default Loading;
