
import styled from "styled-components";
import { useAssignment } from "./useAssignment";
import Spinner from "../../ui/Spinner";
import PdfViewer from "../../ui/PdfViewer";
import { useUpdateGrade } from "./useUpdateGrade";
import { useEffect, useRef, useState } from "react";
import { useAddComment } from "./useAddComment";


// Styled Components for the UI
const Container = styled.div`
 padding: 20px;
 font-family: Arial, sans-serif;
background-color:var(--white-color);
height:100%;
`;

const SectionHeader = styled.div`
 font-size: 18px;
 font-weight: bold;
 margin-bottom: 10px;
`;

const QuestionList = styled.ul`
 gap: 10px;
 width: 100%;
`;

const QuestionRow = styled.li`
 display:flex;
margin:20px 0;
 & > * {
 padding: 10px;
 border-bottom: 1px solid #ddd;
 }
`;

const Cell = styled.div`
 display: flex;
 align-items: center;
`;
const Avatar = styled.img`
  width: 40px;
  height: 40px;
  margin-right:20px;
  border-radius: 50%;
`;

const QuestionDetails = styled.div`
 display: flex;
 flex-direction: column;
 width:100%;
`;


const AuthorInfo = styled.div`

 color: #6c63ff;

`;



const GradeInput = styled.input`
 padding: 8px;
 margin-right: 10px;
 border: 1px solid #ccc;
 border-radius: 4px;
`;

const CommentInput = styled.textarea`
 width: 100%;
 padding: 8px;
 margin-top: 10px;
 border: 1px solid #ccc;
 border-radius: 4px;
 resize: vertical;
`;

const SubmitButton = styled.button`
 padding: 8px 16px;
 margin-top: 10px;
 background-color: #6c63ff;
 color: white;
 border: none;
 border-radius: 4px;
 cursor: pointer;
 &:hover {
 background-color: #5a52cc;
 }
`;

// React Component
function AssignmentDetail() {
    const { isLoading, submission } = useAssignment()
    const { isPending, updateGrade } = useUpdateGrade()
    const { createCommnent } = useAddComment()
    const [newMark, setNewMark] = useState(null)
    const [newComment, setNewComment] = useState(null)
    const commentInputRef = useRef(null)
    useEffect(() => {
        if (!isLoading) {
            setNewMark(submission.mark)
        }
    }, [isLoading, submission])
    if (isLoading) return <Spinner />
    const { id, answer, studentInfo, content, comments } = submission;
    function handleOnUpdateGrade() {
        updateGrade({ submissionId: id, mark: newMark })
    }
    function handleOnChangeMark(e) {
        const regex = /^\d*$/;
        const value = e.target.value
        if (regex.test(value) && value <= 10) {
            setNewMark(value)
        }
    }
    function handleCommentChange(e) {
        setNewComment(e.target.value)
    }
    function handleAddComment(e) {
        if (e.key === 'Enter') {
            if (newComment && newComment !== "") {
                createCommnent({ submissionId: id, content: newComment, userInfo: { id: "a0a0dbd6-3be9-4a57-94aa-7e752f09c786" } },
                    { onSuccess: () => setNewComment("") }
                )
            }
        }
    }
    return (
        <Container>
            <SectionHeader>Question</SectionHeader>
            <PdfViewer pdfUrl={content.resourceUrl} />
            <SectionHeader style={{ marginTop: "20px" }}>
                Answer
            </SectionHeader>
            <div>
                <div style={{ display: 'flex', alignItems: "center", marginBottom: "30px" }}>
                    <Avatar src={studentInfo.avt ? studentInfo.avt : "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"} />
                    <p>{studentInfo.name}</p>
                </div>
                <p>{answer}</p>
                <label>Grade: </label>
                <GradeInput
                    onChange={(e) => handleOnChangeMark(e)}
                    type="text"
                    disabled={isPending}
                    value={newMark}
                    // onChange={(e) => handleGradeChange(question.id, e.target.value)}
                    placeholder="Enter grade (e.g., 8/10)"
                />
                <SubmitButton onClick={() => handleOnUpdateGrade()} disabled={isPending}>
                    Confirm
                </SubmitButton>
            </div>
            <SectionHeader style={{ marginTop: "20px" }}>
                Comments
            </SectionHeader>
            <CommentInput
                value={newComment}
                ref={commentInputRef}
                onKeyDown={handleAddComment}
                onChange={(e) => handleCommentChange(e)}
                placeholder="Add your comment or answer..."
            />
            <QuestionList>
                {comments.map(({ userInfo, content }) =>
                    <QuestionRow >

                        <div style={{ display: 'flex', alignItems: "center" }}>
                            <Avatar src={userInfo.avt ? studentInfo.avt : "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"} />

                        </div>

                        <QuestionDetails>
                            <p>{userInfo.name}</p>
                            <AuthorInfo >
                                {content}
                            </AuthorInfo>
                        </QuestionDetails>


                    </QuestionRow>
                )}
            </QuestionList>
        </Container >
    );
};

export default AssignmentDetail;