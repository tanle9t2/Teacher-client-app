import styled from "styled-components";
import Button from "./Button";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom";
const Sidebar = styled.div`
  width: 300px;
  padding: 4rem 4.8rem 6.4rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-right: 20px;
`;

const SidebarTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Checklist = styled.ul`
  list-style: none;
  padding: 0;
`;

const ChecklistItem = styled.li`
  display: flex;
  align-items: center;
  margin: 10px 0;
  font-size: 16px;
  color: ${props => (props.checked ? '#666' : '#000')};


  input[type="checkbox"] {
    margin-right: 10px;
  }
`;
const SubmitButton = styled(Button)`
  background-color: #6b46c1;
  color: #fff;
  padding: 12px 24px;
  font-size: 16px;
`;
const CircleOutline = styled.span`
        border: 1px solid #303141;
    border-radius: 100rem;
    flex-shrink: 0;
    display: inline-flex
;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    margin: 0.1rem 0 0 0;
    margin-right:10px;
`
function SiderbarManageCourse() {
    return (
        <Sidebar>
            <SidebarTitle>Create your content</SidebarTitle>
            <Checklist>
                <Link to="curriculum">
                    <ChecklistItem>
                        <CircleOutline aria-label="Completed">
                            <svg style={{ "width": "1.6rem", "height": " 1.6rem" }} aria-hidden="true" focusable="false">
                                <TiTick />
                            </svg>
                        </CircleOutline>
                        Curriculum
                    </ChecklistItem>
                </Link>
                <Link to="basics">
                    <ChecklistItem >
                        <CircleOutline aria-label="Completed">
                            <svg style={{ "width": "1.6rem", "height": " 1.6rem" }} aria-hidden="true" focusable="false">
                                <TiTick />
                            </svg>
                        </CircleOutline>
                        Course landing page
                    </ChecklistItem>
                </Link>
            </Checklist>
        </Sidebar >
    )
}

export default SiderbarManageCourse
