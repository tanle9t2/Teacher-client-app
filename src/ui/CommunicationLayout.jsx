import { useState } from "react";
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
  padding-left: 10px;
`
const Main = styled.div`
    background-color:#f6f7f9;
`
const NavItem = styled.li`
    padding: 10px;
    ${props => props.isActive && " background-color:var(--white-color); border-left:5px solid var(--primary-color)"}
`
function CommunicationLayout() {
    const [active, setIsActive] = useState("Assingments")
    return (
        <StyledCommunicationLayout>
            <NavList>
                <NavItem onClick={() => setIsActive("Assingments")} isActive={active === "Assingments"}>
                    <Link>
                        Assignments
                    </Link>
                </NavItem>
                <NavItem onClick={() => setIsActive("Announcements")} isActive={active === "Announcements"}>
                    <Link>
                        Announcements
                    </Link>
                </NavItem>
            </NavList>
            <Main>
                <Outlet />
            </Main>
        </StyledCommunicationLayout>
    )
}

export default CommunicationLayout
