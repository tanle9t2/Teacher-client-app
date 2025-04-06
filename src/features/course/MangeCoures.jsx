import styled from "styled-components";

import { useReducer } from "react";
import SectionItem from "./SectionItem";
// Styled Components
const Container = styled.div`
  display: flex;
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
`;



const MainContent = styled.div`
  flex: 1;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  border: 1px solid #e8ecef;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 20px;
  background-color:#f6f7f9;
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
  const [sections, dispatch] = useReducer(reducer, initialState)
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
  console.log(sections)
  return (
    <MainContent>
      <Title>Curriculum</Title>
      <Section>
        {sections.map(({ name, lectures, content, isEdit }, idx) => <SectionItem

          handleAddSubContent={handleAddSubContent}
          handleAddContent={handleAddContent} name={name}
          lectures={lectures} content={content} isEdit={isEdit} idxSection={idx} />)}
      </Section>
      <Button>+ Section</Button>
    </MainContent>

  );
}

export default MangeCoures
