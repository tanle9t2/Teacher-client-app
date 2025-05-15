import styled from "styled-components";

const StyledWarningText = styled.p`
  color: #b91c1c;
  background-color: #fee2e2;
  padding: 10px 16px;
  border-radius: 6px;
  font-weight: bold;
  font-size: 14px;
`;

export default function WarningText({ text }) {
    return <StyledWarningText>⚠️ {text}</StyledWarningText>;
}