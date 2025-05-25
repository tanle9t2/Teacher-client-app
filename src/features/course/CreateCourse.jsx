import { useState } from "react";
import styled from "styled-components";

import Input from "../../ui/Input";
import SelectedBox from "../../ui/SelectedBox";
import { useCategories } from "./useCategories";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import { useCreateCourse } from "./useCreateCourse";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


const Container = styled.div`
  font-family: Arial, sans-serif;

  text-align: center;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 30px;
  border-bottom: 1px solid #ddd;
  background: white;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  display: flex;
  align-items: center;
  color: black;
`;

const LogoIcon = styled.span`
  color: #a855f7;
  font-size: 30px;
  margin-right: 5px;
`;

const StepIndicator = styled.div`
  font-size: 16px;
  color: #333;
`;

const ExitButton = styled.a`
  color: #a855f7;
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;



const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  color: #666;
  margin-bottom: 20px;
`;


const MainContainer = styled.div`

    max-width:800px;
    margin:auto;
    margin-top:100px;
`


const ProgressBarContainer = styled.div`
  width: 100%;
  background: #e5e7eb;
  height: 4px;
`;

const ProgressBar = styled.div`
  width: ${(props) => props.progress}%;
  height: 4px;
  background: #a855f7;
  transition: width 0.3s ease-in-out;
`;
const FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 15px 30px;
  border-top: 1px solid #ddd;
  box-shadow:var(--shadow-md);
`;


const PreviousButton = styled(Button)`
  color: #a855f7;
  border: 2px solid #a855f7;
  background: transparent;
  padding: 10px 20px;
  min-width:106px;
  &:hover {
    background: #f3e8ff;
  }
`;

const ContinueButton = styled(Button)`
  color: white;
  background: ${(props) => (props.disabled ? "#e5e7eb" : "#a855f7")};
  border: none;
  padding: 10px 20px;
  min-width:106px;
  &:hover {
    background: ${(props) => (props.disabled ? "#e5e7eb" : "#9333ea")};
  }
`;
const CustomInput = styled(Input)`
    width:100%;
`
const Phase1 = ({ title, setTitle }) => {
  return <>
    <Title>How about a working title?</Title>
    <Subtitle>It's okay if you can't think of a good title now. You can change it later.</Subtitle>
    <CustomInput placeholder="e.g Spring boot course" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
  </>
}

const Phase2 = ({ category, setCategory }) => {
  const { isLoading, categories } = useCategories()
  if (isLoading) return <Spinner />
  function handleOnChange(event) {
    const categoryId = event.target.value;
    const newCate = categories.filter(c => c.id === categoryId)[0];
    setCategory(newCate)
  }

  return <>
    <Title className="">What category best fits the knowledge you'll share?</Title>
    <Subtitle>If you're not sure about the right category, you can change it later.</Subtitle>
    <SelectedBox handleOnChange={handleOnChange} state={category} data={categories} defaultValue={"Choose a category"} />
  </>
}
function CreateCourse() {
  const [title, setTitle] = useState(null);
  const [category, setCategory] = useState(null)
  const [step, setStep] = useState(1)
  const progress = (step / 2) * 100;
  const { isLoading, createCourse } = useCreateCourse()
  const { user } = useAuth();
  const navigate = useNavigate()
  if (isLoading) return <Spinner />
  function handleOnNext() {
    if (step + 1 > 2) return;
    setStep(prev => prev + 1)
  }
  function handleOnPrev() {
    if (step - 1 <= 0) return;
    setStep(prev => prev - 1)
  }
  function isActiveNext() {
    if (step === 1) {
      return !title
    }
    if (step === 2) {
      return !category;
    }
  }
  function handleOnCreate() {
    createCourse({ name: title, categoryId: category.id, teacherId: user.id },
      {
        onSuccess: () => {
          navigate("/")
        }
      }
    )
  }
  return (
    <Container>
      <Header>
        <Logo>
          <LogoIcon>⌂</LogoIcon> Open Course
        </Logo>
        <StepIndicator>Step {step} of {2}</StepIndicator>
        <ExitButton onClick={() => navigate(-1)} href="#">Exit</ExitButton>
      </Header>
      <ProgressBarContainer>
        <ProgressBar progress={progress} />
      </ProgressBarContainer>
      <MainContainer>
        {step === 1 && < Phase1 title={title} setTitle={setTitle} />}
        {step === 2 && <Phase2 category={category} setCategory={setCategory} />}
      </MainContainer>
      <FooterContainer>
        <PreviousButton disabled={step === 1} onClick={() => handleOnPrev()}>Previous</PreviousButton>
        {step === 1 && <ContinueButton disabled={isActiveNext()} onClick={() => handleOnNext()}>
          Continue
        </ContinueButton>}
        {step === 2 && <ContinueButton disabled={isActiveNext()} onClick={() => handleOnCreate()}>
          Finish
        </ContinueButton>}
      </FooterContainer>
    </Container>
  );
}

export default CreateCourse
