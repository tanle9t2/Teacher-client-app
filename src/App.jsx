import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import GlobalStyles from "./styles/GlobalStyle";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import CreateCoursePage from "./pages/CreateCoursePage";
import { Toaster } from "react-hot-toast";
import MangeCoures from "./features/course/MangeCoures";
import MangeCourseLayout from "./ui/MangeCourseLayout";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <AppLayout />
            }
          >
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/course/create" element={<CreateCoursePage />} />
          <Route path="/course/create" element={<CreateCoursePage />} />

          <Route
            path="/instructor/course/:courseId/manage/"
            element={
              <MangeCourseLayout />
            }
          >
            <Route index element={<Navigate replace to="curriculum" />} />
            <Route index path="curriculum" element={<MangeCoures />} />
          </Route>

        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  )
}

export default App
