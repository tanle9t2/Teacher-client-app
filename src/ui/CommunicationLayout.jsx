import { Link, Outlet } from "react-router-dom"
import styled from "styled-components";
const StyledCommunicationLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  /* grid-template-columns: auto 1fr; */
  height: 100vh;
`;
const NavList = styled.ul`
  background-color:#f6f7f9;
  padding-left: 40px;
`
const Main = styled.div`
    background-color:#f6f7f9;
`
function CommunicationLayout() {
    return (
        <StyledCommunicationLayout>
            <NavList>
                <li>
                    <Link>
                        Assignments
                    </Link>
                </li>
                <li>
                    <Link>
                        Announcements
                    </Link>
                </li>
            </NavList>
            <Main>
                <Outlet />
            </Main>
        </StyledCommunicationLayout>
    )
}

export default CommunicationLayout
