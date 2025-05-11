import { useNavigate } from "react-router";

import { useEffect } from "react";

import styled from "styled-components";
import Spinner from "../ui/Spinner";
import { useAuth } from "../context/AuthContext";
const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  background-color: var(--color-grey-50);
  align-items: center;
`;

function ProtectedRouter({ children }) {
  const { isLoading, user } = useAuth();
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
