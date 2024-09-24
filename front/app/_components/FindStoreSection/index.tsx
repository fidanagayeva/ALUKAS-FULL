import { FaHome } from 'react-icons/fa';

export default function FindStoreSection() {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="bg-pink-100 p-6 w-full max-w-6xl flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <FaHome className="text-black text-[1.5rem]" />
          <p className="text-[1.5rem] font-sans">Find Shops Near You</p>
        </div>
        <button className="ml-4 border border-black bg-white text-black py-2 px-4 font-medium transition duration-300 ease-in-out hover:bg-black hover:text-white">
          Find Store
        </button>
      </div>
    </div>
  );
}
