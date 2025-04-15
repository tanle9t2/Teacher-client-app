import styled from "styled-components";
import { useCourses } from "./useCourses";
import Spinner from "../../ui/Spinner";
import CourseItem from "./CourseItem";
import Pagination from "../../ui/Pagination";
import { useNavigate, useSearchParams } from "react-router-dom";
import Input from "../../ui/Input";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";

const Section = styled.div`
  background-color: white;
  display:flex;
  justify-content:space-between;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: #6b21a8;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin-left:10px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #5b1891;
  }
`;

const ResourceSection = styled.div`
  
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;



const StyledCourseData = styled.div`
  flex: 1;
  padding: 20px;
`;
function CourseData() {
  const { isLoading, courses, totalPages } = useCourses()
  const [searchParams, setSearchParams] = useSearchParams()
  const [kw, setKw] = useState("")
  const navigate = useNavigate()
  if (isLoading) return <Spinner />
  function handleOnSearch() {
    if (searchParams && searchParams !== "") {
      searchParams.set("kw", kw)
      setSearchParams(searchParams)
    }
  }
  function handleKeyDownEnter(e) {
    if (e.key === "Enter") {
      handleOnSearch()
    }
  }
  return (
    <StyledCourseData>
      <Section>
        <Title>Jump Into Course Creation</Title>
        <Button onClick={() => navigate('/course/create')}>Create Your Course</Button>
      </Section>
      <Section>
        <p style={{ fontSize: '14px', color: '#666', textAlign: 'center' }}>
          Based on your experience, we think these resources will be helpful.
        </p>
      </Section>
      <Section>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Input value={kw} onKeyDown={handleKeyDownEnter} onChange={(e) => setKw(e.target.value)} placeholder="Search your course" />
          <Button onClick={() => handleOnSearch()} style={{ height: "100%" }} ><IoSearch /></Button>
        </div>
      </Section>
      <ResourceSection>
        {courses.map(({ name, banner, description, id }) => <CourseItem key={id} id={id} name={name} banner={banner} description={description} />)}
      </ResourceSection>
      <Pagination pages={totalPages} />
    </StyledCourseData>
  )
}

export default CourseData
