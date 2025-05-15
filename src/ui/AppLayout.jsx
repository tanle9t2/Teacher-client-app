import styled from "styled-components";
import Sidebar from "./Sidebar";
import { Link, Outlet } from "react-router";
import ProfileMenu from "../features/Profile/ProfileMenu";
import { useAuth } from "../context/AuthContext";

const StyledAppLayout = styled.div`
  display: grid;
  /* grid-template-columns: 26rem 1fr; */
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding:0 0 4.8rem 5rem;
`;
const Container = styled.div`
  gap: 3.2rem;
`;
const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px 20px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UserLabel = styled(Link)`
  font-size: 14px;
`;

function AppLayout() {
  const { user } = useAuth();
  return (
    <StyledAppLayout>
      <Sidebar />
      <Main>
        <Container>
          <Header>
            <UserInfo>
              <UserLabel>Student</UserLabel>
              <ProfileMenu user={user} />
            </UserInfo>
          </Header>

          <Outlet />
        </Container>
      </Main>

    </StyledAppLayout>
  );
}

export default AppLayout;
