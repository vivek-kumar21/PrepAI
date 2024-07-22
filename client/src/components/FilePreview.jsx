import { FaFileAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const FilePreview = ({ file, removeFile }) => {
  return (
    <div className="flex items-center justify-between gap-2 mt-5 border rounded-md p-2 border-teal-300">
      <div className="flex items-center gap-2">
        <FaFileAlt className="text-teal-600 text-3xl" />
        <div className="text-left">
          <h2>{file.name}</h2>
          <h2 className="text-[12px] text-gray-400">
            {file?.type} / {(file.size / 1024 / 1024).toFixed(2)}MB
          </h2>
        </div>
      </div>
      <IoClose className="text-red-500 text-2xl cursor-pointer" onClick={() => removeFile()} />
    </div>
  );
};

export default FilePreview;
