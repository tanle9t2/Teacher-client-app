import styled from "styled-components"
import SelectedBox from "../../ui/SelectedBox"

// import { useCourseFilter } from "./useCourseFilter"
import Spinner from "../../ui/Spinner"
import { useState } from "react"

import { useCourseFilter } from "./useCourseFilter"
import { useAssignments } from "./useAssignments"
import Pagination from "../../ui/Pagination"
import { useNavigate, useSearchParams } from "react-router-dom"
import { convertDate } from "../../utils/helper"

const StyledAssignmentData = styled.div`
      padding-right:20px;
`
const Header = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
`
const Heading = styled.h1`
    font-size:26px;
    font-weight:bold;
`
const DropdownWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
    margin-left:30px;
`;

const Dropdown = styled.select`
  padding: 8px;
  font-size: 16px;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  &:focus {
    outline: none;
    border-color: #6c63ff;
  }
`;

const CourseList = styled.div`
  margin-top: 20px;
`;

const CourseItem = styled.div`
  padding: 10px;
  margin: 5px 0;
  background-color: #f9f9f9;
  border-radius: 4px;

`;

const Content = styled.div`
  margin:20px 0;
`
const Table = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr; // Defines the Cell widths
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled.div`
  display: contents; // Allows child elements to participate in the grid
  &:not(:last-child) > * {
    border-bottom: 1px solid #ddd;
  }
`;

const TableHeader = styled.div`
  display: contents;
  & > * {
    font-weight: bold;
    border-bottom: 2px solid #333;
    padding: 10px;
  }
`;

const Cell = styled.div`
  padding: 10px;
  text-align: left;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const NameAssignment = styled.div`
  display: flex;
  flex-direction: Cell;
`;

const LargeText = styled.span`
font-size: 14px;
  font-weight: bold;
  display: -webkit-box;
  -webkit-line-clamp: 2;         /* Limit to 2 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%; /* or set a specific width like 200px */
`;
const SmallText = styled.span`
    font-size: 12px;
    color: #666;
    display: -webkit-box;
  -webkit-line-clamp: 2;         /* Limit to 2 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
    max-width: 100%; /* or set a specific width like 200px */
`;

const sortList = ["Newsest first", "Oldest first"]
function AssignmentData() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { isLoading, filters } = useCourseFilter();
  const { isLoading: loadingAssignments, assignments, totalPages } = useAssignments()
  const [selectedCategory, setSelectedCategory] = useState("ALL courses");
  const [sort, setSort] = useState("Newsest first");
  const navigate = useNavigate()

  if (isLoading || loadingAssignments) return <Spinner />
  function handleCategoryChange(e) {
    console.log(e.target.value)
    if (e.target.value === "ALL courses") {
      searchParams.delete("courseId")
      setSearchParams(searchParams);
      setSelectedCategory("ALL courses")
      return;
    }

    searchParams.set("courseId", e.target.value)
    setSearchParams(searchParams)
    setSelectedCategory(e.target.value);
  };
  function handleOnChangeSort(e) {
    searchParams.set("sortField", "createdAt")
    searchParams.set("orderBy", e.target.value === "Newsest first" ? "DESC" : "ASC")
    setSearchParams(searchParams)
    setSort(e.target.value)
  }
  return (
    <StyledAssignmentData>
      <Header>
        <Heading as="h1">Assignments</Heading>
        <DropdownWrapper>
          <Dropdown value={selectedCategory} onChange={handleCategoryChange}>
            <option value={null}>ALL courses</option>
            {filters.map(f => <option value={f.id} >{f.name}</option>)}
          </Dropdown>
        </DropdownWrapper>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ marginRight: "10px", fontWeight: "bold" }}>Sort By:</span>
          <DropdownWrapper>
            <Dropdown value={sort} onChange={handleOnChangeSort}>

              {sortList.map(f => <option value={f} >{f}</option>)}
            </Dropdown>
          </DropdownWrapper>
        </div>
      </Header>
      <Content>

        {assignments && <Table>
          <TableHeader>
            <Cell>User</Cell>
            <Cell>Name Assignment</Cell>
            <Cell>Created Time</Cell>
            <Cell>Short Ans</Cell>
          </TableHeader>
          {assignments.map(({ id, studentInfo, content, createdAt, answer }) => (
            <TableRow onClick={() => navigate(`/instructor/communication/answer/${id}`)} key={id}>
              <Cell>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar src={studentInfo.avt ? studentInfo.avt : "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"} />
                  <p style={{ marginLeft: "15px" }}>
                    {studentInfo.name}
                  </p>
                </div>
              </Cell>
              <Cell>
                <NameAssignment>
                  <LargeText>{content.name}</LargeText>
                  {/* {learner.dueDate && <SmallText>{learner.dueDate}</SmallText>} */}
                </NameAssignment>
              </Cell>
              <Cell>{convertDate(createdAt)}</Cell>
              <Cell>
                <SmallText>
                  {answer}
                </SmallText>
              </Cell>
            </TableRow>
          ))}
        </Table>}
        <Pagination pages={totalPages} />
        {!assignments || !assignments.length && <p>No results</p>}
      </Content>

    </StyledAssignmentData>
  )
}

export default AssignmentData
