import styled from "styled-components";

import { useReducer } from "react";
import SectionItem from "./SectionItem";
import { useCourse } from "./useCourse";
import Spinner from "../../ui/Spinner";
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
  const [dispatch] = useReducer(reducer, initialState)
  if (isLoading) return <Spinner />
  const { sections } = course;
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
  console.log(course);
  return (
    <MainContent>
      <Title>Curriculum</Title>
      <div>
        {sections.map((section, idx) => <SectionItem
          key={section.id}
          section={section}
          handleAddSubContent={handleAddSubContent}
          handleAddContent={handleAddContent} name={name}
          idxSection={idx} />)}
      </div>
      <Button>+ Section</Button>
    </MainContent>

  );
}

export default MangeCoures
