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


function Home() {
  return (
    <AppContainer>
      <MainContent>

        <CourseData />


      </MainContent>
    </AppContainer>
  );
};


export default Home
