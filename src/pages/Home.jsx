import styled from "styled-components";
import CourseData from "../features/course/CourseData";

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  font-family: Arial, sans-serif;
`;



const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
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

function Home() {
  return (
    <AppContainer>
      <MainContent>
        <Header>
          <UserInfo>
            <UserLabel>Student</UserLabel>
            <NotificationIcon>LT</NotificationIcon>
          </UserInfo>
        </Header>

        <CourseData />


      </MainContent>
    </AppContainer>
  );
};


export default Home
