import { NavLink } from "react-router-dom";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import { useAuth } from "../../context/AuthContext";

function RegisterForm() {
  const { register, handleSubmit, formState, getValues } = useForm();
  const { errors } = formState;

  const { register: registerUser } = useAuth();

  function registerr({
    firstName,
    lastName,
    email,
    username,
    password,
    repeatPassword,
  }) {
    registerUser({
      firstName,
      lastName,
      email,
      username,
      password,
      repeatPassword,
    });
  }

  function error() { }

  return (
    <Form onSubmit={handleSubmit(registerr, error)}>
      <FormRow label="First name">
        <Input
          name="firstName"
          register={register}
          option={{
            required: "First name is required",
          }}
          error={errors?.firstName?.message}
        />
      </FormRow>
      <FormRow label="Last name">
        <Input
          name="lastName"
          register={register}
          option={{
            required: "Last name is required",
          }}
          error={errors?.lastName?.message}
        />
      </FormRow>
      <FormRow label="Username">
        <Input
          name="username"
          register={register}
          option={{
            required: "Username is required",
          }}
          error={errors?.username?.message}
        />
      </FormRow>

      <FormRow label="Email">
        <Input
          name="email"
          register={register}
          option={{
            required: "Email is required",
          }}
          error={errors?.email?.message}
        />
      </FormRow>

      <FormRow label="Password">
        <Input
          type="password"
          name="password"
          register={register}
          option={{
            required: "Password is required",
          }}
          error={errors?.password?.message}
        />
      </FormRow>
      <FormRow label="Repeat Password">
        <Input
          type="password"
          name="repeatPassword"
          register={register}
          option={{
            required: "Repeat Password is required",
            validate: (value) =>
              value === getValues().password || "password doesn't match",
          }}
          error={errors?.repeatPassword?.message}
        />
      </FormRow>

      {/* <FormRow
        label="Name"
        type="text"
        name="name"
        register={register}
        option={{
          required: "name is required",
        }}
        error={errors?.name?.message}
      />
      <FormRow
        label="Username"
        type="username"
        name="username"
        register={register}
        option={{
          required: "username is required",
        }}
        error={errors?.username?.message}
      />
      <FormRow
        label="Email"
        type="email"
        name="email"
        register={register}
        option={{
          required: "email is required",
        }}
        error={errors?.email?.message}
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
      <FormRow
        label="Repeat Password"
        type="password"
        name="repeatPassword"
        register={register}
        option={{
          required: "repeat password is required",
          validate: (value) =>
            value === getValues().password || "password doesn't match",
        }}
        error={errors?.repeatPassword?.message}
      /> */}
      <div className="flex justify-end text-2xl my-4">
        <NavLink to="/">Forgot password</NavLink>
      </div>
      <div className="flex">
        <Button>Register</Button>
      </div>
    </Form>
  );
}

export default RegisterForm;
