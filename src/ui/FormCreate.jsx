import styled from "styled-components";
import Input from "./Input";
import { useState } from "react";
import toast from "react-hot-toast";

const SectionContainer = styled.div`
  border: 1px solid #d3d3d3;
  border-radius: 8px;
  padding: 16px;
  width: 100%;
  box-sizing: border-box;
  background-color:var(--white-color);
`;

// Header section with title input and character count
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const TitleLabel = styled.label`
  font-weight: bold;
  margin-right: 8px;
`;

const TitleInput = styled(Input)`
  flex: 1;
  padding: 8px;
  border: 1px solid #d3d3d3;
  border-radius: 4px;
  font-size: 16px;
  width:100%;
`;


// Learning objective section
const ObjectiveSection = styled.div`
  margin-bottom: 16px;
`;

const ObjectiveLabel = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const ObjectiveInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #d3d3d3;
  border-radius: 4px;
  font-size: 16px;
`;

// Footer with buttons
const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const CancelButton = styled.button`
  padding: 8px 16px;
  border: none;
  background: none;
  color: #666;
  cursor: pointer;
  font-size: 14px;
`;

const AddButton = styled.button`
  padding: 8px 16px;
  border: none;
  background: #6b46c1; /* Purple color from the image */
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
`;

function FormCreate({ value, setIsEdit, handleOnAdd, title = "New Lecture", children }) {
  const [state, setState] = useState(value)
  function handleOnConfirm() {
    const validate = (state.length > 0 && state.trim() === '') || state === "";
    if (validate)
      toast.error("Please input name")
    else
      handleOnAdd(state)
  }
  return (
    <SectionContainer>
      <Header>
        <div style={{ display: 'flex', flex: '1', alignItems: 'center' }}>
          <TitleLabel>{title}:</TitleLabel>
          <TitleInput value={state} onChange={(e) => setState(e.target.value)} type="text" placeholder="Enter a Title" />

        </div>

      </Header>
      {children}
      <Footer>
        <CancelButton onClick={() => setIsEdit(false)}>Cancel</CancelButton>
        <AddButton onClick={() => handleOnConfirm()}>Save Section</AddButton>
      </Footer >

    </SectionContainer >
  );
}

export default FormCreate
