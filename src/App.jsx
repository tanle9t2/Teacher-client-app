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
import MangeContentPage from "./pages/MangeContentPage";
import ManageBasicInfoCourse from "./features/course/ManageBasicInfoCourse";
import ManageInformationCoursePage from "./pages/ManageInformationCoursePage";
import CommunicationLayout from "./ui/CommunicationLayout";
import AssignmentPage from "./pages/AssignmentPage"
import AnnouncementPage from "./pages/AnnouncementPage"
import AssignmentDetail from "./features/assisgnment/AssignmentDetail";
import Authentication from "./pages/Authentication";
import LoginSection from "./features/Authentication/LoginSection"
import RegisterSection from "./features/Authentication/RegisterSection"
import ProtectedRouter from "./pages/ProtectedRouter";
import { AuthProvider } from "./context/AuthContext";
import { CourseBasicInfoProvider } from "./context/CourseBasicInfoContext";
import NotificationMain from "./features/notification/NotificationMain";
import Notification from "./features/notification/Notification";
import Profile from "./pages/Profile";
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
        <AuthProvider>
          <Routes>


            <Route
              element={
                <ProtectedRouter>
                  <AppLayout />
                </ProtectedRouter>

              }
            >
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/instructor/communication/" element={<CommunicationLayout />}>
                <Route index element={<Navigate replace to="assginments" />} />
                <Route path="answer/:answerId" element={<AssignmentDetail />} />
                <Route path="assginments" element={<AssignmentPage />} />

                <Route element={<AnnouncementPage />}>
                  <Route path="announcements" element={<NotificationMain />} />
                  <Route path="announcements/:courseId" element={<Notification />} />
                </Route>

              </Route>
            </Route>
            <Route path="/course/create" element={<CreateCoursePage />} />


            <Route
              path="/instructor/course/:courseId/manage/"
              element={
                <CourseBasicInfoProvider>
                  <MangeCourseLayout />
                </CourseBasicInfoProvider>
              }
            >
              <Route index element={<Navigate replace to="curriculum" />} />
              <Route index path="curriculum" element={<MangeContentPage />} />
              <Route index path="basics" element={<ManageInformationCoursePage />} />
            </Route>
            <Route path="/auth" element={<Authentication />}>
              <Route path="login" element={<LoginSection />} />
              <Route path="register" element={<RegisterSection />} />
            </Route>
          </Routes>
        </AuthProvider>
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
    </QueryClientProvider >
  )
}

export default App
