import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { isDarkMode } = useDarkMode();
  const url = !isDarkMode ? "/logo-light.png" : "/logo-dark.png";
  return (
    <StyledLogo>
      <Link to="dashboard">
        <Img src={url} alt="Logo" />
      </Link>
    </StyledLogo>
  );
}

export default Logo;
