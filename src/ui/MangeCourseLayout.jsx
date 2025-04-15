import { Outlet } from "react-router-dom";
import styled from "styled-components";
import SiderbarManageCourse from "./SiderbarManageCourse";
import Header from "./Header";

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
function MangeCourseLayout({ coureName }) {
  return (
    <>
      <Header coureName={coureName} />
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
