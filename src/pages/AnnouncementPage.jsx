
import styled from "styled-components";
import { Outlet } from "react-router-dom";
// Styled Components
const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
  max-width: 1000px;
  margin: 0 auto;
`;

const Header = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;
function AnnouncementPage() {
    return (
        <Container>
            <Header>Announcements</Header>
            <Outlet />
        </Container>
    );
}

export default AnnouncementPage
