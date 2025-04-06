import styled from "styled-components"
import { FaPen } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import { useRef, useState } from "react";
import { MdSlowMotionVideo } from "react-icons/md";
import { IoDocumentText } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
const LectureTitle = styled.div`
  display:flex;
`
const StyledLectureItem = styled.div`
  align-items: center;
  justify-content: space-between;
  background-color: var(--white-color);
  border-radius: 4px;
  margin: 10px 0;
  border:1px solid black;
`;
const Icon = styled.span`
  margin: 0 7px;
  cursor: pointer;  
`
const Button = styled.button`
  background-color: ${props => props.primary ? '#6b46c1' : '#fff'};
  color: ${props => props.primary ? '#fff' : '#6b46c1'};
  border: ${props => props.primary ? 'none' : '1px solid #6b46c1'};
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight:bold;
  margin-right: 10px;
  &:hover {
    opacity: 0.9;
  }
`;
const Content = styled.div`
    padding:10px 0;
    border-top:1px solid black;
    display:flex;
    flex-direction:column;
    align-items:center;
`
const SubContent = styled.div`
    padding:10px 10px;
    border-top:1px solid black;
    display:flex;
    flex-direction:column;
    align-items:flex-start;
`

const Square = styled.div`
    width: 7rem;
    height:5rem;
    display:flex;
    flex-direction:column;
    align-items:center;
    background-color:#f6f7f9;
    border:1px solid black;
    margin:0 10px;
    cursor: pointer;
`
const InforContent = styled.div`
    display:grid;
    padding:10px;
    border-top:1px solid black;
    grid-template-columns:0.4fr 0.2fr 0.2fr 0.2fr;
`
const InforHeader = styled.p`
    font-weight:bold;
`
const InforRow = styled.div`
    display:grid;
    padding:10px;
    grid-template-columns:0.4fr 0.2fr 0.2fr 0.2fr;
`

function LectureItem({ idxSection, idxLecture, name, content, subContents, handleAddSubContent, handleAddContent }) {
    const [isAddContent, setIsAddContent] = useState(false);
    const [isAddSubContent, setIsSubContent] = useState(false);
    const fileInputRef = useRef(null);
    const videoInputRef = useRef(null);
    const subContentRef = useRef(null);
    const handleClickFile = () => {
        fileInputRef.current.click();
        handleAddContent();
    };
    const handleClickVideo = () => {
        videoInputRef.current.click();
    };
    const handleClickSubResource = () => {
        subContentRef.current.click();
    };
    function handleOnChangeContent(e) {
        const file = e.target.files[0]; // Get the first file
        if (file) {
            handleAddContent(file, idxSection)
        }
    }
    function handleOnChangeSubcontent(e) {
        const file = e.target.files[0]; // Get the first file
        if (file) {
            handleAddSubContent(file, idxSection, idxLecture)
        }
    }
    return (
        <StyledLectureItem>
            <div style={{ display: "flex", padding: "10px", justifyContent: "space-between" }}>
                <LectureTitle>Lecture {idxLecture + 1}: {name}
                    <Icon>
                        <FaPen />
                    </Icon>
                    <Icon>
                        <RiDeleteBinFill />
                    </Icon>
                </LectureTitle>
                <div style={{ display: "flex", alignItems: "center" }}>
                    {!isAddContent && !content && <div style={{ display: "flex", alignItems: "center" }}>
                        <Button onClick={() => setIsAddContent(prev => !prev)}>+ Content</Button>

                    </div>}
                    {isAddContent && !content && <Button onClick={() => setIsAddContent(prev => !prev)}>Select content type</Button>}
                    <p style={{ "cursor": "pointer" }} onClick={() => setIsSubContent(prev => !prev)}>{!isAddSubContent ? <IoIosArrowDown /> : <IoIosArrowUp />}</p>
                </div>
            </div>
            {isAddContent && !content &&
                <Content>
                    <p>
                        Select the main type of content. Files and links can be added as resources.
                    </p>
                    <div style={{ display: "flex", paddingTop: "10px" }}>
                        <Square onClick={handleClickFile}>
                            <div style={{ display: "flex", alignItems: "center", height: "6rem" }}>
                                <MdSlowMotionVideo />
                                <input
                                    onChange={handleOnChangeContent}
                                    accept="video/*"

                                    type="file"
                                    ref={fileInputRef}
                                    id="fileInput"
                                    style={{ display: "none" }} // Hide the default file input
                                />
                            </div>
                            <p>Video</p>
                        </Square>
                        <Square onClick={handleClickVideo}>
                            <div style={{ display: "flex", alignItems: "center", height: "6rem" }}>
                                <IoDocumentText />
                                <input
                                    onChange={handleOnChangeContent}
                                    accept=".doc, .docx, .xls, .xlsx, .pdf"
                                    type="file"
                                    ref={videoInputRef}
                                    id="fileInput"
                                    style={{ display: "none" }} // Hide the default file input
                                />
                            </div>
                            <p>File</p>
                        </Square>
                    </div>
                </Content>
            }
            {content &&
                <>
                    <InforContent>
                        <InforHeader>Filename</InforHeader>
                        <InforHeader>Type</InforHeader>

                        <InforHeader></InforHeader>
                    </InforContent>
                    <InforRow>
                        <p>{content.name}</p>
                        <p>{content.type.startsWith("video/") ? "Video" : "File"}</p>

                        <p>Replace</p>
                    </InforRow>
                </>


            }
            {
                (isAddSubContent || content) &&
                <SubContent>
                    <div >
                        {subContents.map((file) => <p style={{ margin: "10px 0" }}>{file.name}</p>,)}
                    </div>
                    <Button onClick={handleClickSubResource}>+ Resourse
                        <input
                            onChange={handleOnChangeSubcontent}
                            accept=".doc, .docx, .xls, .xlsx, .pdf"
                            type="file"
                            ref={subContentRef}
                            id="fileInput"
                            style={{ display: "none" }} // Hide the default file input
                        />
                    </Button>
                </SubContent>
            }


        </StyledLectureItem>
    )
}

export default LectureItem
