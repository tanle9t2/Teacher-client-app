import styled from "styled-components";
import { FaPen } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import FormCreate from "../../ui/FormCreate";
import LectureItem from "./LectureItem";
import { useState } from "react";
import { useUpdateSection } from "./useUpdateSection";
import { useCreateContent } from "./useCreateContent";

import Spinner from "../../ui/Spinner";
import { useDeleteSection } from "./useDeleteSection";
import toast from "react-hot-toast";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete"


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
  margin:10px 0 ;
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
function SectionItem({ section, idxSection, handleRemoveSection, handleAddSubContent, handleAddContent }) {
  const { id, name, contentList } = section;

  const [isEdit, setIsEdit] = useState(false)
  const [isAdd, setisAdd] = useState(false)

  const { updateSection } = useUpdateSection()
  const { createContent } = useCreateContent()
  const { isPending, deleteSection } = useDeleteSection()

  const [nameS, setNameS] = useState(name)
  const [contents, setContents] = useState(contentList)
  const [typeContent, setTypeContent] = useState("LESSON")
  function handleOnClickRemove() {
    deleteSection({ id }, {
      onSuccess: () => {
        toast.success("Successfully delete section")
        handleRemoveSection(id)
      }
    })
  }
  function handleOnChangeName(value) {
    if (isEdit)
      updateSection({ id: section.id, name: value }, {
        onSuccess: () => {
          setNameS(value)
          setIsEdit((prev) => !prev)
        }
      })
    if (isAdd)
      createContent({ name: value, typeContent, sectionId: id }, {
        onSuccess: ({ data }) => {
          setContents(prev => [...prev, data.data])
          setisAdd(false)
        }
      })

  }
  if (isPending) return <Spinner />


  if (isEdit)
    return <FormCreate title="New Section" value={nameS} setIsEdit={setIsEdit} handleOnAdd={handleOnChangeName} />

  return (
    <StyledSectionItem>
      <SectionTitle>Section {idxSection + 1}: {nameS}
        <Icon onClick={() => setIsEdit(prev => !prev)}>
          <FaPen />
        </Icon>
        <Icon>
          <Modal>
            <Modal.OpenButton opens="delete">
              <RiDeleteBinFill />
            </Modal.OpenButton>
            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="course"
                onConfirm={() => handleOnClickRemove()}

              />
            </Modal.Window>
          </Modal>


        </Icon>
      </SectionTitle>
      <LectureList>
        {contents?.map((content, idx) => <LectureItem
          key={content.id}
          content={content}
          handleAddSubContent={handleAddSubContent}
          handleAddContent={handleAddContent}
          idxSection={id} idxLecture={idx} />)}
        {isAdd && <FormCreate value={""} setIsEdit={setisAdd} handleOnAdd={handleOnChangeName}>
          <div style={{ display: "flex" }}>
            <Button primary={typeContent === "EXERCISE"} onClick={() => setTypeContent("EXERCISE")}>Exercise</Button>
            <Button primary={typeContent === "LESSON"} onClick={() => setTypeContent("LESSON")}>Lesson</Button>
          </div>
        </FormCreate>}
        <Button onClick={() => setisAdd(true)} primary>+ Curriculum item</Button>
      </LectureList>

    </StyledSectionItem>
  )
}

export default SectionItem
