import { NavLink } from "react-router-dom";
import LoginForm from "./LoginForm";
import SwitchLoginType from "./SwitchLoginType";
import { BiLogoGooglePlus } from "react-icons/bi";
import styled from "styled-components";
const StyledLoginSection = styled.div`
  display:grid;
  grid-template-columns:0.4fr 0.6fr;
`
const Wrapper = styled.div`
  width:50%;
  display:flex;
  flex-direction:column;
  justify-content:center;
  padding-left:100px;
`
const LargeText = styled.h1`
  font-size:32px;
  font-weight:bold;
`

function LoginSection() {
  return (
    <StyledLoginSection>
      <img src="https://frontends.udemycdn.com/components/auth/desktop-illustration-x1.webp" />
      <Wrapper>
        <div className="py-4">
          <LargeText >Log in to continue your learning journey</LargeText>

        </div>

        <LoginForm />
        <SwitchLoginType>
          <p>Don't have an account ?</p>
          <NavLink
            className="text-purple-600 px-2 font-semibold"
            to="/auth/register"
          >
            Register
          </NavLink>
        </SwitchLoginType>

      </Wrapper>
    </StyledLoginSection >
  );
}

export default LoginSection;
