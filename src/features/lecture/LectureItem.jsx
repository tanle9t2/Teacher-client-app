import styled from "styled-components"
import { FaPen } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import { useRef, useState } from "react";
import { MdSlowMotionVideo } from "react-icons/md";
import { IoDocumentText } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { useCreateSubContent } from "./useCreateSubContent";
import FormCreate from "../../ui/FormCreate";
import { useUpdateContent } from "./useUpdateContent";
import { getFileType } from "../../utils/helper";
import toast from "react-hot-toast";
import Spinner from "../../ui/Spinner";
import { useDeleteSubContent } from "./useDeleteSubContent";
import { flushSync } from "react-dom";

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
  margin:10px 0;
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
const ProgressContainer = styled.div`
  margin-top: 1rem;
  width: 100%;
  height: 1rem;
  background-color: #e5e7eb; /* Tailwind gray-200 */
  border-radius: 9999px;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  height: 100%;
  background-color: #2563eb; /* Tailwind blue-600 */
  transition: width 0.3s ease;
  width: ${({ progress }) => progress}%;
`;
function LectureItem({ idxLecture, content }) {

    const [state, setState] = useState(content);
    const { id, subContents, name, resource } = state;

    const [isEditName, setIsEditName] = useState(false)
    const [isAddContent, setIsAddContent] = useState(false);


    const [uploadProgress, setUploadProgress] = useState(0);
    const [selectFile, setSelectedFile] = useState(null);
    const [removeSubId, setRemoveSubId] = useState([]);
    //state of content


    const [isCollpaseSection, setIsCollapseSection] = useState(resource ? true : false)
    //mutation
    const { isPending, uploadFile } = useCreateSubContent()
    const { isPending: pendingUploadContent, updateContent } = useUpdateContent()
    const { deleteSubContent } = useDeleteSubContent()


    const fileInputRef = useRef(null);
    const videoInputRef = useRef(null);
    const subContentRef = useRef(null);
    const replaceContentRef = useRef(null)


    const handleClickFile = () => {
        fileInputRef.current.click();
    };
    const handleOnClickReplace = () => {
        replaceContentRef.current.click();
    }
    const handleClickVideo = () => {
        videoInputRef.current.click();
    };
    const handleClickSubResource = () => {
        subContentRef.current.click();
    };

    const handleRemoveSubContent = (subId) => {
        setRemoveSubId(prev => [...prev, subId])
        deleteSubContent({ subId }, {
            onSuccess: () => {
                toast.success("Successfully delete sub contain")
                setState(prev => ({ ...prev, subContents: prev.subContents.filter(s => s.id !== subId) }))
            },
            onSettled: () => setRemoveSubId(prev => prev.filter(item => item !== subId))
        })
    }
    const handleOnChangeReplaceRef = (e) => {
        const file = e.target.files[0]; // Get the first file
        if (file) {
            const type = getFileType(file)
            updateContent({ id, type, file }, {
                onSuccess: ({ data }) => {
                    const { data: content } = data
                    toast.success("Successfully update resource")
                    flushSync(() => {
                        setState(prev => ({ ...prev, resource: content.resource }))
                    })
                }
            })
        }
    }
    console.log(state)
    const handleOnChangeName = (value) => {
        updateContent({ id, name: value }, {
            onSuccess: () => {
                setState(prev => ({ ...prev, name: value }))
                setIsEditName(false)
            }
        })
    }

    function handleOnChangeContent(e) {
        const file = e.target.files[0]; // Get the first file
        if (file) {
            updateContent({ id, type: e.target.name, file }, {
                onSuccess: ({ data }) => {
                    const { data: content } = data
                    setState(prev => ({ ...prev, resource: content.resource }))
                }
            })
        }
    }
    function handleOnChangeSubcontent(e) {
        const file = e.target.files[0]; // Get the first file
        if (!file) return
        setSelectedFile(file)
        uploadFile({ mainContentId: id, type: "LESSON", file, setUploadProgress }, {
            onSuccess: ({ data }) => {
                flushSync(() => {
                    setState(prev => ({
                        ...prev,
                        subContents: [...prev.subContents, data.data]
                    }))
                })
            }
        })
    }
    if (pendingUploadContent) return <Spinner />
    if (isEditName) return <FormCreate value={name} setIsEdit={setIsEditName} handleOnAdd={handleOnChangeName} />


    return (
        <StyledLectureItem>
            <div style={{ display: "flex", padding: "10px", justifyContent: "space-between" }}>
                <LectureTitle>Lecture {idxLecture + 1}: {name}
                    <Icon>
                        <FaPen onClick={() => setIsEditName(true)} />
                    </Icon>
                    <Icon>
                        <RiDeleteBinFill />
                    </Icon>
                </LectureTitle>
                <div style={{ display: "flex", alignItems: "center" }}>
                    {!isAddContent && !resource && <div style={{ display: "flex", alignItems: "center" }}>
                        <Button onClick={() => setIsAddContent(prev => !prev)}>+ Content</Button>
                    </div>}
                    {isAddContent && !resource && <>
                        <Button onClick={() => setIsAddContent(prev => !prev)}>Select content type</Button>

                    </>}
                    {content && <p style={{ "cursor": "pointer" }} onClick={() => setIsCollapseSection(prev => !prev)}>{isCollpaseSection ? <IoIosArrowDown /> : <IoIosArrowUp />}</p>}

                </div>
            </div>
            {isAddContent && !resource &&
                <Content>
                    <p>
                        Select the main type of content. Files and links can be added as resources.
                    </p>
                    <div style={{ display: "flex", paddingTop: "10px" }}>
                        <Square onClick={handleClickFile}>
                            <div style={{ display: "flex", alignItems: "center", height: "6rem" }}>
                                <MdSlowMotionVideo />
                                <input
                                    name="VIDEO"
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
                                    name="FILE"
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
            {isCollpaseSection && resource &&
                <>
                    <InforContent>
                        <InforHeader>Filename</InforHeader>
                        <InforHeader>Type</InforHeader>

                        <InforHeader></InforHeader>
                    </InforContent>
                    <InforRow>
                        <p>{resource.name}</p>
                        <p>{resource.type}</p>

                        <p style={{ color: "var(--primary-color)", cursor: "pointer" }} onClick={handleOnClickReplace}>Replace</p>
                        <input
                            onChange={handleOnChangeReplaceRef}
                            accept=".doc, .docx, .xls, .xlsx, .pdf, video/*"
                            type="file"
                            ref={replaceContentRef}
                            id="fileInput"
                            style={{ display: "none" }} // Hide the default file input
                        />
                    </InforRow>
                </>
            }
            {
                (isCollpaseSection) &&
                <SubContent>
                    {
                        isPending && (
                            <div style={{ width: " 100%", margin: "10px 0" }}>
                                <p style={{ margin: "10px 0" }}>{selectFile.name} </p>
                                <ProgressContainer>
                                    <ProgressBar progress={uploadProgress} />
                                </ProgressContainer>
                            </div>
                        )
                    }
                    <div >
                        {subContents.map(({ name, id }) =>
                            <p key={id} style={{ margin: "10px 0", display: "flex" }}>{name}
                                <Icon>
                                    <RiDeleteBinFill onClick={() => handleRemoveSubContent(id)} />
                                </Icon>
                                {
                                    removeSubId.includes(id) && <span>Deleting ....</span>
                                }
                            </p>
                        )}
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
