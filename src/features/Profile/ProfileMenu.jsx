import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  cursor: pointer;
  padding: 1.5rem;
  color: white;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Avatar = styled.img`
  object-fit: cover;
  border-radius: 9999px;
  width: 4rem;
  height: 4rem;
`;

const Menu = styled.div`
  position: absolute;
  z-index: 1000;
  top: 80%;
  right: 0;
  width: 20rem;
  background-color: #f3f4f6;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const UserInfo = styled.div`
  padding-left: 0.5rem;
  overflow: hidden;
`;

const UserName = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: black;
`;

const UserEmail = styled.p`
  font-size: 1.5rem;
  color: #4b5563;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Nav = styled.nav`
  flex: 1;
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledLink = styled(NavLink)`
  font-size: 1.5rem;
  color: #1f2937;

  &:hover {
    color: #7c3aed;
  }
`;

const Logout = styled.p`
  font-size: 1.5rem;
  color: #1f2937;
  cursor: pointer;

  &:hover {
    color: #7c3aed;
  }
`;

const Footer = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #d1d5db;
`;

const BusinessTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
`;

const BusinessDescription = styled.p`
  font-size: 1.5rem;
  color: #4b5563;
`;

// Component
function ProfileMenu({ user }) {
  const [showMenu, setShowMenu] = useState(false);
  const { logout } = useAuth();

  return (
    <Container
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
    >
      <Avatar
        src={
          user.avt ??
          "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
        }
      />

      {showMenu && (
        <Menu>
          <UserSection>
            <Avatar
              src={
                user.avt ??
                "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
              }
            />
            <UserInfo>
              <UserName>
                {user.firstName} {user.lastName}
              </UserName>
              <UserEmail>{user.email}</UserEmail>
            </UserInfo>
          </UserSection>

          <Nav>
            <NavList>

              <li>
                <StyledLink to="/profile">Edit profile</StyledLink>
              </li>
              <li>
                <StyledLink to="/help-support">Help and Support</StyledLink>
              </li>
              <li>
                <Logout onClick={() => logout()}>Log out</Logout>
              </li>
            </NavList>
          </Nav>

          <Footer>
            <BusinessTitle>Udemy Business</BusinessTitle>
            <BusinessDescription>
              Bring learning to your company
            </BusinessDescription>
          </Footer>
        </Menu>
      )}
    </Container>
  );
}

export default ProfileMenu;
