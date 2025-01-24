const LoadingCard = () => {
    return (
    <div className="flex flex-col h-auto justify-center items-center gap-2 m-1.5 w-full animate-pulse">
      <div className="w-full h-48 bg-gray-300 rounded-lg"></div>
      <div className="w-1/2 h-4 bg-gray-300 rounded-md mt-1"></div>
    </div>
    );
  };
  
  export default LoadingCard;  