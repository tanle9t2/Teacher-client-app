import styled from "styled-components";

// import HeaderMenu from "./HeaderMenu";
// import UserAvatar from "../features/authentication/UserAvatar";

const StyleHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  align-items: center;
  gap: 2.4rem;
  justify-content: end;
`;

function Header() {
  return (
    <StyleHeader>
      {/* <UserAvatar />

      <HeaderMenu /> */}
    </StyleHeader>
  );
}

export default Header;
