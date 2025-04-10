import styled from "styled-components";

import { useEffect, useReducer, useState } from "react";
import SectionItem from "../section/SectionItem";
import { useCourse } from "./useCourse";
import Spinner from "../../ui/Spinner";
import { useCreateSection } from "../section/useCreateSection";
import FormCreate from "../../ui/FormCreate";
import { useParams } from "react-router-dom";
// Styled Components
const Container = styled.div`
  display: flex;
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
`;



const MainContent = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;


const InfoText = styled.p`
  font-size: 14px;
  color: #666;
`;

const Button = styled.button`
  background-color: ${props => props.primary ? '#6b46c1' : '#fff'};
  color: ${props => props.primary ? '#fff' : '#6b46c1'};
  border: ${props => props.primary ? 'none' : '1px solid #6b46c1'};
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight:bold;
  margin-right: 10px;
  &:hover {
    opacity: 0.9;
  }
`;

const Section = styled.div`
  padding: 10px;
  margin-bottom: 20px;
`;
const initialState = [
  {
    name: "Introduce",
    content: null,
    lectures: [
      {
        name: "B1",
        content: null,
        subContents: [

        ]
      }
    ],
    isEdit: false
  }
]
function reducer(state, action) {
  switch (action.type) {
    case "addContent": {
      const { file, idx } = action.payload;
      return state.map((section, index) => index === idx ? { ...section, content: file } : section);
    }
    case "addSubContent": {
      const { file, idxSection, idxLecture } = action.payload;
      const newSubContent = [...state[idxSection].lectures[idxLecture].subContents, file]
      const updateLecture = state[idxSection].lectures.map((lecture, index) => idxSection === index ? { ...lecture, subContents: newSubContent } : lecture)
      return state.map((section, index) => index === idxSection ? { ...section, lectures: updateLecture } : section);
    }
    default:
      throw new Error("Unknow action");
  }
}
function MangeCoures() {
  const { isLoading, course } = useCourse()
  const { courseId } = useParams();
  const [dispatch] = useReducer(reducer, initialState)
  const [isAddSection, setIsAddSection] = useState(false)
  const { isPending, createSection } = useCreateSection()
  const [sections, setSections] = useState([])
  useEffect(() => {
    if (!isLoading && course) {
      setSections(course.sections)
    }
  }, [course, isLoading])

  if (isLoading) return <Spinner />
  function handleAddContent(file, idx) {

    dispatch({
      type: "addContent", payload: {
        file, idx
      }
    })
  }
  function handleAddSubContent(file, idxSection, idxLecture) {

    dispatch({
      type: "addSubContent", payload: {
        file, idxSection, idxLecture
      }
    })
  }
  function handleCreateSection(value) {
    createSection({ name: value, courseId }, {
      onSuccess: ({ data }) => {
        setIsAddSection(false);
        setSections(prev => [...prev, data])
      }
    })
  }
  function handleRemoveSection(id) {
    setSections(prev => prev.filter(item => item.id !== id))
  }
  return (
    <MainContent>
      <Title>Curriculum</Title>
      <div style={{ margin: "10px 0" }}>
        {sections.map((section, idx) => <SectionItem
          key={section.id}
          section={section}
          handleRemoveSection={handleRemoveSection}
          handleAddSubContent={handleAddSubContent}
          handleAddContent={handleAddContent} name={name}
          idxSection={idx} />)}
        {
          isAddSection && <FormCreate title="New Section" value={""} setIsEdit={setIsAddSection} handleOnAdd={handleCreateSection} />
        }
      </div>
      <Button onClick={() => setIsAddSection(true)} disabled={isPending}>+ Section</Button>
    </MainContent>

  );
}

export default MangeCoures
