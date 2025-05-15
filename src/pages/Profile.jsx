import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import ProfileDetail from "../features/Profile/ProfileDetail";
const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
  max-width: 1000px;
  margin: 0 auto;
`;
function Profile() {
  const { user } = useAuth();
  return (
    <Container>
      <ProfileDetail user={user} />
    </Container>
  );
}

export default Profile;
