import { BsCartFill } from "react-icons/bs";
import { IoNotifications } from "react-icons/io5";

function AuthenticatedNavbar() {
  return (
    <div className="flex items-center space-x-4">
      <span className="px-4 text-gray-600 flex justify-center items-center">
        <BsCartFill />
        (3)
      </span>
      <span className="px-4 text-gray-600">
        <IoNotifications />
      </span>
      <div className="w-14 h-14 p-4 bg-gray-800 text-white rounded-full flex items-center justify-center">
        LT
      </div>
    </div>
  );
}

export default AuthenticatedNavbar;
