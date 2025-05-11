import { BsCartFill } from "react-icons/bs";
import { AuthenticationHeader } from "../../utils/helper";
import CartSummary from "../Cart/CartSummary";
import { NavLink } from "react-router-dom";
import LearningSummary from "../Learning/LearningSummary";
import ProfileMenu from "../Profile/ProfileMenu";
import Notification from "../Notification/Notification";

function AuthenticatedNavbar({ user }) {

  return (
    <div className="relative flex items-center space-x-4">
      <nav className="hidden font-bold md:flex space-x-4 items-center">
        <NavLink className="text-gray-600 text-xl hover:text-gray-900">
          Instructor
        </NavLink>
        <NavLink
          to="/learning"
          className="relative z-[1000] text-gray-600 hover:text-gray-900"
        >
          <LearningSummary />
        </NavLink>
        <NavLink
          to="/cart"
          className="relative z-[1000] px-4 text-gray-600 flex justify-center items-center"
        >
          <CartSummary />
        </NavLink>
        <span className=" text-gray-600">

        </span>
      </nav>
      <ProfileMenu user={user} />
    </div>
  );
}

export default AuthenticatedNavbar;
