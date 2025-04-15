import { NavLink } from "react-router-dom";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import useLogin from "./useLogin";
import Spinner from "../../ui/Spinner";
import { BiLogoGooglePlus } from "react-icons/bi";

function LoginForm() {
  const { isLoading, login } = useLogin();

  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  function logging({ usernameOrEmail, password }) {
    console.log(usernameOrEmail, password)
    login({ usernameOrEmail, password });
  }
  // function error({ usernameOrEmail, password }) {
  // console.log(err);
  // toast.error(err.message);
  // }
  return (
    <>
      <Form onSubmit={handleSubmit(logging)}>
        <FormRow
          label="Username"
          type="username"
          name="usernameOrEmail"
          register={register}
          option={{
            required: "username / email are required",
          }}
          error={errors?.usernameOrEmail?.message}
        />
        <FormRow
          label="Password"
          type="password"
          name="password"
          register={register}
          option={{
            required: "password is required",
          }}
          error={errors?.password?.message}
        />
        <div className="flex justify-end text-2xl my-4">
          <NavLink to="/">Forgot password</NavLink>
        </div>
        <div className="flex">
          {isLoading ? (
            <Spinner />
          ) : (
            <Button variation="primary" size="fit" disabled={isLoading}>Login</Button>
          )}
        </div>
      </Form>
      <div className="flex items-center text-4xl py-3">
        <p>Login with </p>
        <p className="pl-3 text-7xl cursor-pointer">
          <BiLogoGooglePlus />
        </p>
      </div>
    </>
  );
}

export default LoginForm;
