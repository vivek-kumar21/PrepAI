const Loading = () => {
  return (
    <div>
      <div className="flex justify-center items-center py-2">
        <div className="flex flex-row gap-2">
          <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
          <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce [animation-delay:-.3s]"></div>
          <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce [animation-delay:-.5s]"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
