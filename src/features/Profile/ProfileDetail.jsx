import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import useUpdateUserProfile from "./useUpdateUserProfile";


const Heading = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const Tab = styled.div`
  display: flex;
  gap: 2rem;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 2rem;

  button {
    padding-bottom: 0.5rem;
    border-bottom: 2px solid black;
    font-size: 2rem;
    font-weight: 500;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const ImageWrapper = styled.div`
  padding: 1rem;
  font-size: 1.5rem;

  .preview {
    border: 1px solid #d1d5db;
    background-color: #f9fafb;
    padding: 1rem;
    border-radius: 0.375rem;
    height: 30rem;
    width: 30rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .file-input {
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 30rem;

    input[type="file"] {
      display: none;
    }

    .file-label {
      flex: 1;
      border: 1px solid #d1d5db;
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      cursor: pointer;
      color: #374151;
      font-size: 1.25rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;
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
function ProfileDetail({ user }) {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const { updateUserProfile } = useUpdateUserProfile();
  const [image, setImage] = useState(user.avt);
  const [imageUploadFile, setImageUploadFile] = useState();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(URL.createObjectURL(file));
      setImageUploadFile(file);
    } else {
      toast.error("Only image is allowed");
    }
  };

  function success(data) {
    const formData = new FormData();
    formData.append("sex", data.sex);
    formData.append("lastName", data.lastname);
    formData.append("firstName", data.firstname);
    formData.append("phoneNumber", data.phonenumber);
    formData.append("dob", data.date);

    if (imageUploadFile) {
      formData.append("image", imageUploadFile);
    }
    toast.success("Updating...");
    updateUserProfile(formData, {
      onSuccess: () => toast.success("Updated"),
    });
  }

  return (
    <>
      <Heading>Profile & settings</Heading>

      <Tab>
        <button>Udemy profile</button>
      </Tab>

      <StyledForm onSubmit={handleSubmit(success)}>
        <GridContainer>
          <div>
            <FormRow label="Username">
              <Input disabled valueInput={user.username} name="username" />
            </FormRow>
            <FormRow label="Email">
              <Input disabled valueInput={user.email} name="email" />
            </FormRow>
            <FormRow label="First name">
              <Input
                valueInput={user.firstName}
                name="firstname"
                register={register}
                option={{ required: "First name is required" }}
                error={errors?.firstname?.message}
              />
            </FormRow>
            <FormRow label="Last name">
              <Input
                valueInput={user.lastName}
                name="lastname"
                register={register}
                option={{ required: "Last name is required" }}
                error={errors?.lastname?.message}
              />
            </FormRow>
            <FormRow label="Phone number">
              <Input
                valueInput={user.phoneNumber}
                name="phonenumber"
                register={register}
              />
            </FormRow>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <FormRow label="Sex">
                <div style={{ display: "flex" }}>
                  <label style={{ marginRight: "1rem" }}>
                    <span style={{ marginRight: "0.5rem" }}>Male</span>
                    <input
                      defaultChecked={user.sex === true}
                      value="male"
                      type="radio"
                      {...register("sex")}
                    />
                  </label>
                  <label>
                    <span style={{ marginRight: "0.5rem" }}>Female</span>
                    <input
                      defaultChecked={user.sex === false}
                      value="female"
                      type="radio"
                      {...register("sex")}
                    />
                  </label>
                </div>
              </FormRow>
              <FormRow label="Date of birth">
                <Input
                  valueInput={user.dob}
                  name="date"
                  type="date"
                  register={register}
                />
              </FormRow>
            </div>
          </div>

          <ImageWrapper>
            <p className="font-semibold text-gray-700">Image preview</p>
            <div className="preview">
              {image ? (
                <div style={{ textAlign: "center" }}>
                  <img
                    src={image}
                    alt="Preview"
                    style={{ width: "20rem", height: "20rem", objectFit: "cover" }}
                  />
                  <button
                    onClick={() => {
                      setImage(null);
                      setImageUploadFile(null);
                    }}
                    style={{
                      padding: "1rem",
                      width: "100%",
                      backgroundColor: "#7c3aed",
                      fontWeight: "bold",
                      color: "white",
                      fontSize: "1.25rem",
                      borderRadius: "0.375rem",
                      marginTop: "1rem",
                    }}
                  >
                    Remove Image
                  </button>
                </div>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 14c1.656 0 3-1.344 3-3S13.656 8 12 8s-3 1.344-3 3 1.344 3 3 3zM21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              )}
            </div>

            <div className="file-input">
              <label className="file-label">
                <input
                  {...register("image")}
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {imageUploadFile?.name ?? "No image selected"}
              </label>
            </div>
          </ImageWrapper>
        </GridContainer>

        <div style={{ padding: "2.5rem 0", fontWeight: "bold" }}>
          <Button>Update</Button>
        </div>
      </StyledForm>
    </>
  );
}

export default ProfileDetail;
