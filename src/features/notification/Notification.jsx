import React, { useState } from 'react';
import styled from 'styled-components';
import { useCreateNotificatoin } from './useCreateNotification';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';


// Styled Components
const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
  max-width: 1000px;
  margin: 0 auto;
`;

const Header = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;
const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  resize: vertical;
`;

const PlaceholderImage = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
`;

const PlaceholderText = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const PlaceholderSubText = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
`;

const LearnMoreLink = styled.a`
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const ComposeSection = styled.div`
  margin-top: 20px;
`;


const StudentListSection = styled.div`
  margin-top: 20px;
`;

const StudentList = styled.ul`
  list-style: none;
  padding: 0;
`;

const StudentItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const SendButton = styled.button`
  margin-top: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const UploadArea = styled.div`
  display: grid;
  grid-template-columns: 0.4fr auto;
  margin-top: 20px;
`;

const UploadText = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center; /* 👈 Add this */
  border-radius: 4px;
`;

const UploadBox = styled.div`
  text-align: center;
  margin-top: 10px;
  max-height: 42.2rem;
  width: 458px;
  height: 250px;
  border: 1px dashed #ccc;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9f9f9;
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


// React Component
const Notification = () => {
  const [notificationContent, setNotificationContent] = useState('');

  const [uploadedImage, setUploadedImage] = useState(null);
  const [previouslyUploadedImages, setPreviouslyUploadedImages] = useState(null);
  const { isPending, createNotification } = useCreateNotificatoin()
  const { courseId } = useParams()


  const handleSendNotification = () => {
    const plainText = notificationContent.replace(/<[^>]+>/g, '').trim();
    if (!plainText) {
      toast.error('Please write a notification');
      return;
    }
    if (uploadedImage) {
      setPreviouslyUploadedImages([...previouslyUploadedImages, uploadedImage]);
    }
    createNotification({ content: notificationContent, courseId }, {
      onSuccess: () => {
        setNotificationContent('');
        setUploadedImage(null);
        toast.success("Successfully send notification to student")
      }
    })


  };
  return (
    <Container>
      <Header>Announcements</Header>
      <ComposeSection>
        <TextArea
          placeholder="Write your announcement here..."
          value={notificationContent}
          onChange={(e) => setNotificationContent(e.target.value)}
        />
        <SendButton disabled={isPending} onClick={handleSendNotification}>Send Notification</SendButton>
      </ComposeSection>
    </Container>
  );
};

export default Notification;