import styled from "styled-components";
import Input from "./Input";

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

function FormCreate({ value, setValue, handleOnAdd }) {
    return (
        <SectionContainer>
            <Header>
                <div style={{ display: 'flex', flex: '1', alignItems: 'center' }}>
                    <TitleLabel>New section:</TitleLabel>
                    <TitleInput value={value} onChange={(e) => setValue(e.target.value)} type="text" placeholder="Enter a Title" />
                </div>
            </Header>
            <ObjectiveSection>
                <ObjectiveLabel>What will students be able to do at the end of this section?</ObjectiveLabel>
                <ObjectiveInput type="text" placeholder="Enter a Learning Objective" />

            </ObjectiveSection>
            <Footer>
                <CancelButton>Cancel</CancelButton>
                <AddButton onClick={() => handleOnAdd()}>Add Section</AddButton>
            </Footer >
        </SectionContainer >
    );
}

export default FormCreate
