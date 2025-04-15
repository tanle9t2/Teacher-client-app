import { useNavigate } from "react-router";
import { useUser } from "../features/Authentication/useUser";
import { useEffect } from "react";

import styled from "styled-components";
import Spinner from "../ui/Spinner";
const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  background-color: var(--color-grey-50);
  align-items: center;
`;

function ProtectedRouter({ children }) {
  const { isLoading, user } = useUser();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isLoading && !user) {
        navigate("/auth/login");
      }
    },
    [isLoading, navigate, user]
  );
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  if (user) return children;
}

export default ProtectedRouter;
