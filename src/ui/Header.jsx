import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// import HeaderMenu from "./HeaderMenu";
// import UserAvatar from "../features/authentication/UserAvatar";

const StyleHeader = styled.header`
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

function Header({ coureName }) {
  const navigate = useNavigate()
  return (
    <StyleHeader>
      <Text style={{ cursor: "pointer" }} onClick={() => navigate("/")}>Back to course</Text>
      {coureName && <Text>{coureName}</Text>}
      {/* <UserAvatar />

      <HeaderMenu /> */}
    </StyleHeader>
  );
}

export default Header;
