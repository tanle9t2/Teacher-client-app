import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useBasicsInfoCourse } from './useBasicsInfoCourse';
import Spinner from '../../ui/Spinner';
import SelectedBox from '../../ui/SelectedBox';
import { useCategories } from './useCategories';
import { useUpdateBasicsInfo } from './useUpdateBasicsInfo';
import { formatWithDots } from '../../utils/helper';

// Styled Components
const Container = styled.div`
    flex: 1;
    background-color: #fff;
    border-radius: 4px;
    padding: 20px;
`;

const Heading = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 20px;
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  resize: vertical;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const UploadBox = styled.div`
  text-align: center;
  margin-top: 10px;
  max-height: 42.2rem;
  width:458px;
  height:250px;
`;
const Image = styled.img`
  width:100%;
  height:100%;
`
const UploadText = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

const UploadButton = styled.button`
  background-color: #6b48ff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
`;

const CharacterCount = styled.span`
  font-size: 12px;
  color: #666;
  float: right;
`;
const UploadArea = styled.div`
    display:grid;
    grid-template-columns: 0.4fr auto;
`
function ManageBasicInfoCourse() {
  const { isLoading, course } = useBasicsInfoCourse()
  const { isLoading: loadingCategory, categories } = useCategories()
  const [name, setName] = useState(null)
  const [price, setPrice] = useState(null)
  const [description, setDescription] = useState(null)
  const [level, setLevel] = useState(null)
  const [banner, setBanner] = useState(null)
  const [category, setCategory] = useState(null)
  const { isPending, updateBasicsInfor } = useUpdateBasicsInfo()

  const uploadRef = useRef(null)
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      updateBasicsInfor({ name, description, price });

      // Some browsers require this returnValue to show a confirmation
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [description, price, name, updateBasicsInfor]);
  if (isLoading || loadingCategory) return <Spinner />
  const { name: coureName, level: courseLevel, levels, banner: courseBanner, price: coursePrice, category: courseCate, description: courseDescription } = course;
  function handleOnChangeLevel(e) {
    const level = e.target.value;
    updateBasicsInfor({ level }, {
      onSuccess: () => setLevel(level)
    })
  }

  function handleOnChangeBanner(e) {
    const file = e.target.files[0];
    if (file) {
      updateBasicsInfor({ file }, {
        onSuccess: () => setBanner(file)
      })

    }
  }
  function handleOnChangeCategory(e) {
    if (e.target.value) {
      const category = e.target.value;
      updateBasicsInfor({ category }, {
        onSuccess: () => setCategory(category)
      })
    }

  }
  return (
    <Container>
      <Heading>Course landing page</Heading>
      <Description>
        Your course landing page is crucial to your success on Udemy. If it’s done right, it can also help you gain visibility in the search engines.
        Here Google As you complete this section, think about creating a compelling Course Landing Page that demonstrates why someone
        would want to enroll in your course. Learn more about creating your course landing page and course title standards.
      </Description>

      <Section>
        <Label>Course title</Label>
        <Input
          value={name || coureName} type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Your title should be a mix of attention-grabbing, informative, and optimized for search" />
        <CharacterCount>55</CharacterCount>
      </Section>

      <Section>
        <Label>Description</Label>
        <TextArea
          value={description || courseDescription}
          onChange={(e) => setDescription(e.target.value)}
          rows="5"
          placeholder="Insert your course description here. Descriptions should have minimum 200 words."
        />
      </Section>
      <Section>
        <Label>Price</Label>
        <Input
          value={formatWithDots(price) || formatWithDots(coursePrice) || ""} type="text"
          onChange={(e) => {
            const regex = /^\d*$/;
            const value = e.target.value.replaceAll(".", "");
            if (regex.test(value))
              setPrice(value)
          }}
          placeholder="Your title should be a mix of attention-grabbing, informative, and optimized for search" />
        <CharacterCount>55</CharacterCount>
      </Section>
      <Section>
        <Label>Basic info</Label>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <SelectedBox handleOnChange={handleOnChangeLevel} state={level || courseLevel} data={levels} defaultValue={"Select level --"} />
          <SelectedBox handleOnChange={handleOnChangeCategory} state={category || courseCate.id} data={categories} defaultValue={"Choose a category"} />
        </div>

      </Section>

      <Section>
        <Label>What is primarily taught in your course?</Label>
        <Input type="text" placeholder="e.g. Landscape Photography" />
      </Section>

      <Section>
        <Label>Course image</Label>
        <UploadArea>

          <UploadBox>
            {
              <Image src={banner ? URL.createObjectURL(banner) : courseBanner} />
            }
          </UploadBox>

          <div style={{ margin: "10px 20px" }}>
            <UploadText>
              Upload your image here. It must meet our course image quality standards to be accepted. Important guidelines: 750x422 pixels; .jpg, .jpeg, .gif, or .png. off, important text on the image.
            </UploadText>
            <UploadButton disabled={isPending} onClick={() => uploadRef.current.click()}>{isPending ? "Uploading ..." : "Upload file"}</UploadButton>
            <input
              onChange={handleOnChangeBanner}
              accept="image/*"
              type="file"
              ref={uploadRef}
              id="fileInput"
              style={{ display: "none" }} // Hide the default file input
            />
          </div>

        </UploadArea>
      </Section>
    </Container >
  );

}
export default ManageBasicInfoCourse;