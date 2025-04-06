import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ImagePlaceholder = styled.div`
  width: 200px;
  height: 150px;
  background-color: #e0e0e0;
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;

const TextContent = styled.div`
  flex: 1;
`;

const Heading = styled.h3`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Link = styled.p`
  color: #6b21a8;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;
const Description = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp:1;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const StyledCourseItem = styled.div`
    display:flex;
    margin: 10px 0;
    box-shadow:var(--shadow-md);
`
const Banner = styled.div`
    overflow: hidden;
    position: relative;
    width: 11.8rem;
    height: 100%;
    margin-right:20px;
`
function CourseItem({ id, banner, name, description }) {
    const navigate = useNavigate();
    return (
        <StyledCourseItem>
            <Banner>
                <img src={banner || "CourseBannerDefault.webp"} />
            </Banner>
            <TextContent>
                <Heading>{name}</Heading>
                <Description>
                    {description || "Create a really attractive description"}
                </Description>
                <Link onClick={() => navigate(`/instructor/course/${id}/manage/curriculum`)}>Edit/Manage Course</Link>
            </TextContent>
        </StyledCourseItem>
    )
}

export default CourseItem
