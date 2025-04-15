import { useNavigate } from "react-router-dom";

function Logo() {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate("/")} className="w-[10rem] cursor-pointer">
      <img
        className="w-full h-full object-contain"
        src="https://frontends.udemycdn.com/frontends-homepage/staticx/udemy/images/v7/logo-udemy.svg"
      />
    </div>
  );
}

export default Logo;
