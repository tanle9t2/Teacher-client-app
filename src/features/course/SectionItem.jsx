import styled from "styled-components";
import { FaPen } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import FormCreate from "../../ui/FormCreate";
import LectureItem from "./LectureItem";

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

function SectionItem({ idxSection, isEdit, lectures, name, content, setValue, handleAddContent, handleAddSubContent }) {
    if (isEdit)
        return <FormCreate value={name} setValue={setValue} />

    return (
        <div>
            <SectionTitle>Section {idxSection + 1}: {name}
                <Icon>
                    <FaPen />
                </Icon>
                <Icon>
                    <RiDeleteBinFill />
                </Icon>
            </SectionTitle>
            <LectureList>
                {lectures.map(({ name, subContents }, idx) => <LectureItem
                    handleAddSubContent={handleAddSubContent}
                    handleAddContent={handleAddContent}
                    subContents={subContents} content={content} name={name} idxSection={idxSection} idxLecture={idx} />)}
                <Button primary>+ Curriculum item</Button>
            </LectureList>
        </div>
    )
}

export default SectionItem
