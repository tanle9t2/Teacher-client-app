import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// import HeaderMenu from "./HeaderMenu";
// import UserAvatar from "../features/authentication/UserAvatar";

const StyleHeader = styled.header`
  position:fixed;
  top:0;
  left:0;
  right:0;
  background-color: #1d1e27;
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  align-items: center;
  gap: 2.4rem;
  min-height:50px;
`;
const Text = styled.div`
  color:var(--white-color);
  font-weight:bold;
`

function Header({ children }) {
  const navigate = useNavigate()
  return (
    <StyleHeader>
      <Text style={{ cursor: "pointer" }} onClick={() => navigate("/")}>Back to course</Text>
      {children}
    </StyleHeader>
  );
}

export default Header;
