import { TiDelete } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDeleteCourse } from "./useDeleteCourse";
import Spinner from "../../ui/Spinner";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";

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
    position:relative;
    margin: 10px 0;
    box-shadow:var(--shadow-md);
`
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
const DeleteButton = styled.div`
    position:absolute;
    right:5px;
    cursor: pointer;
`
function CourseItem({ id, banner, name, description }) {
  const navigate = useNavigate();
  const { isLoading, deleteCourse } = useDeleteCourse()
  if (isLoading) return <Spinner />
  return (
    <StyledCourseItem>
      <Banner>
        <Image src={banner || "CourseBannerDefault.webp"} />
      </Banner>
      <TextContent>
        <Heading>{name}</Heading>
        <Description>
          {description || "Create a really attractive description"}
        </Description>
        <Link onClick={() => navigate(`/course/${id}/manage/curriculum`)}>Edit/Manage Course</Link>
      </TextContent>
      <Modal>
        <Modal.OpenButton opens="delete">
          <DeleteButton>
            <TiDelete fontSize={"30px"} />
          </DeleteButton>
        </Modal.OpenButton>
        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="sản phẩm"
            onConfirm={() => deleteCourse(id)}
            disabled={isLoading}
          />
        </Modal.Window>
      </Modal>


    </StyledCourseItem>
  )
}

export default CourseItem
