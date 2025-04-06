import { useState } from "react";
import { FaChartBar, FaComment, FaQuestionCircle, FaVideo, FaWrench } from "react-icons/fa";
import styled from "styled-components";

const SidebarContainer = styled.div`
  width: ${(props) => (props.expanded ? "250px" : "60px")};
  height: 100vh;
  background: #1a1a1f;
  color: white;
  padding: 10px;
  position: fixed;
  transition: width 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &:hover {
    width: 250px;
  }
`;

const Logo = styled.div`
  font-size: ${(props) => (props.expanded ? "24px" : "0px")};
  font-weight: bold;
  padding: 10px;
  transition: font-size 0.3s ease-in-out;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  gap: 10px;
  width: 100%;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  span {
    display: ${(props) => (props.expanded ? "block" : "none")};
    white-space: nowrap;
    transition: opacity 0.3s ease-in-out;
    opacity: ${(props) => (props.expanded ? 1 : 0)};
  }
`;

function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  return (
    <SidebarContainer
      expanded={expanded}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <Logo expanded={expanded}>udemy</Logo>

      <MenuItem expanded={expanded}>
        <FaVideo size={20} />
        <span>Courses</span>
      </MenuItem>
      <MenuItem expanded={expanded}>
        <FaComment size={20} />
        <span>Communication</span>
      </MenuItem>
      <MenuItem expanded={expanded}>
        <FaChartBar size={20} />
        <span>Performance</span>
      </MenuItem>
      <MenuItem expanded={expanded}>
        <FaWrench size={20} />
        <span>Tools</span>
      </MenuItem>
      <MenuItem expanded={expanded}>
        <FaQuestionCircle size={20} />
        <span>Resources</span>
      </MenuItem>
    </SidebarContainer>
  );
}

export default Sidebar;
