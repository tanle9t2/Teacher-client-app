import styled from "styled-components";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router";

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

const UserLabel = styled.span`
  font-size: 14px;
`;

const NotificationIcon = styled.div`
  width: 30px;
  height: 30px;
  background-color: #6b21a8;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Sidebar />
      <Main>
        <Container>
          <Header>
            <UserInfo>
              <UserLabel>Student</UserLabel>
              <NotificationIcon>LT</NotificationIcon>
            </UserInfo>
          </Header>

          <Outlet />
        </Container>
      </Main>

    </StyledAppLayout>
  );
}

export default AppLayout;
