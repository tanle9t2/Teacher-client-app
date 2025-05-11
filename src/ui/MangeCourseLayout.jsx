import { Outlet } from "react-router-dom";
import styled from "styled-components";
import SiderbarManageCourse from "./SiderbarManageCourse";
import Header from "./Header";
import { useCourseBasicInforContext } from "../context/CourseBasicInfoContext";
import Button from "./Button";

const StyledMangeCourseLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  height: 100vh;
  padding-top:50px;
`;
const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;
const Text = styled.div`
  color:var(--white-color);
  font-weight:bold;
`
function MangeCourseLayout() {
  const { course, handleOnUpdate } = useCourseBasicInforContext();
  if (!course) return;
  const { name, publish, totalDuration } = course;
  return (
    <>
      <Header >
        <Text>{name}</Text>
        <Text>{Math.ceil(totalDuration / 60)} min</Text>
        <Text style={{ background: publish ? 'green' : 'red', padding: "2px 25px", borderRadius: "5px" }}>{publish ? "Publish" : "Hide"}</Text>
        <Button onClick={() => handleOnUpdate()} style={{ marginLeft: "auto", padding: "2px 25px" }}>Save</Button>
      </Header >
      <StyledMangeCourseLayout>
        <SiderbarManageCourse />
        <Main>
          <Container>
            <Outlet />
          </Container>
        </Main>
      </StyledMangeCourseLayout>
    </>
  )
}

export default MangeCourseLayout
