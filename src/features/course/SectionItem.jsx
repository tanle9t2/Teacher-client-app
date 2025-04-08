import styled from "styled-components";
import { FaPen } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import FormCreate from "../../ui/FormCreate";
import LectureItem from "./LectureItem";
import { useState } from "react";
import { useUpdateSection } from "./useUpdateSection";

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  display:flex;
`;


const LectureList = styled.div`
  padding-left:50px;
`
const Icon = styled.span`
  margin: 0 7px;
  cursor: pointer;  
`
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
const StyledSectionItem = styled.div`
  margin:20px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
`
function SectionItem({ section, idxSection, handleAddSubContent, handleAddContent }) {
  const [isEdit, setIsEdit] = useState(false)
  const { id, name, contentList: contents } = section;
  const { updateSection } = useUpdateSection()
  function handleOnChangeName(value) {
    updateSection({ id: section.id, name: value }, {
      onSuccess: () => {
        setIsEdit((prev) => !prev)
      }
    })
  }

  if (isEdit)
    return <FormCreate value={name} setIsEdit={setIsEdit} handleOnAdd={handleOnChangeName} />

  return (
    <StyledSectionItem>
      <SectionTitle>Section {idxSection + 1}: {name}
        <Icon onClick={() => setIsEdit(prev => !prev)}>
          <FaPen />
        </Icon>
        <Icon>
          <RiDeleteBinFill />
        </Icon>
      </SectionTitle>
      <LectureList>
        {contents.map((content, idx) => <LectureItem
          key={content.id}
          content={content}
          handleAddSubContent={handleAddSubContent}
          handleAddContent={handleAddContent}
          idxSection={id} idxLecture={idx} />)}
        <Button primary>+ Curriculum item</Button>
      </LectureList>
    </StyledSectionItem>
  )
}

export default SectionItem
