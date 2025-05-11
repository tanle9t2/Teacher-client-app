import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { BiLogoGooglePlus } from "react-icons/bi";
import { useAuth } from "../../context/AuthContext";

// Styled Components
const StyledForm = styled.form`
  width: 100%;
`;

const FormRowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.75rem 0;
  font-size: 1.5rem;
`;

const StyledLabel = styled.label`
  font-weight: bold;
  padding-right: 0.75rem;
`;

const StyledInput = styled.input`
  border: 1px solid #ccc;
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 0.5rem;
  width: 100%;
  font-size: 1.5rem;
`;

const StyledError = styled.p`
  color: red;
`;

const StyledButton = styled.button`
  font-size: 1.5rem;
  padding: 1rem;
  background-color: #9333ea;
  color: white;
  width: 100%;
  border-radius: 0.5rem;
  cursor: pointer;
  border: none;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ForgotPassword = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 1.5rem;
  margin: 1rem 0;
`;

const SocialLogin = styled.div`
  display: flex;
  align-items: center;
  font-size: 2rem;
  padding: 0.75rem 0;

  svg {
    font-size: 3rem;
    margin-left: 1rem;
    cursor: pointer;
  }
`;

const FormRow = ({ label, children }) => (
  <FormRowWrapper>
    <StyledLabel>{label}</StyledLabel>
    {children}
  </FormRowWrapper>
);

const Input = ({ ...props }) => (
  <>
    <StyledInput
      type={props.type}
      defaultValue={props.valueInput}
      onChange={props.onChange}
      {...(props.register ? { ...props.register(props.name, props.option) } : null)}
    />
    {props.error && <StyledError>{props.error}</StyledError>}
  </>
);

const Button = ({ children, onClick, disabled = false }) => (
  <StyledButton onClick={onClick} disabled={disabled}>
    {children}
  </StyledButton>
);

// Main LoginForm
function LoginForm() {
  const { defaultUserLogin, redirectGoogleLogin } = useAuth();
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  function logging({ usernameOrEmail, password }) {
    defaultUserLogin({ usernameOrEmail, password });
  }

  function error() {
    // handle error
  }

  return (
    <>
      <StyledForm onSubmit={handleSubmit(logging, error)}>
        <FormRow label="Username/Email">
          <Input
            name="usernameOrEmail"
            register={register}
            option={{ required: "username is required" }}
            error={errors?.usernameOrEmail?.message}
          />
        </FormRow>
        <FormRow label="Password">
          <Input
            type="password"
            name="password"
            register={register}
            option={{ required: "password is required" }}
            error={errors?.password?.message}
          />
        </FormRow>
        <ForgotPassword>
          <NavLink to="/">Forgot password</NavLink>
        </ForgotPassword>
        <div>
          <Button>Login</Button>
        </div>
      </StyledForm>
      <SocialLogin>
        <p>Login with</p>
        <p onClick={redirectGoogleLogin}>
          <BiLogoGooglePlus />
        </p>
      </SocialLogin>
    </>
  );
}

export default LoginForm;
