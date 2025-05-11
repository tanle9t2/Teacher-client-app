import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCourses } from '../course/useCourses';
import Spinner from '../../ui/Spinner';
import Pagination from "../../ui/Pagination";

// Styled Components
const CourseListSection = styled.div`
  margin-bottom: 20px;
`;

const CourseList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CourseItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-bottom: 10px;
  cursor: pointer;
  background-color: #f9f9f9;
  &:hover {
    background-color: #e6e6fa;
  }
`;

const CourseImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 10px;
`;

const CourseName = styled.span`
  font-size: 16px;
  font-weight: bold;
`;
const Image = styled.img`
  width:100%;
  height:100px;
  max-height:100px;
`
const Banner = styled.div`
    overflow: hidden;
    position: relative;
    width: 17.8rem;
    height: 100%;
    margin-right:20px;
`

const NotificationMain = () => {
    // Mock course data (replace with API fetch in a real app)
    const { isLoading, courses, totalPages } = useCourses()
    if (isLoading) return <Spinner />

    return (
        <CourseListSection>
            <CourseList>
                {courses.map((course) => (
                    <Link to={`${course.id}`}>
                        <CourseItem key={course.id}>
                            <Banner>
                                <Image src={course.banner || "CourseBannerDefault.webp"} />
                            </Banner>
                            <CourseName>{course.name}</CourseName>
                        </CourseItem>
                    </Link>
                ))}
            </CourseList>
            <Pagination pages={totalPages} />
        </CourseListSection>
    );
};

export default NotificationMain;