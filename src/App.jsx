import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminLayout } from "./components/layout/AdminLayout";
import { SidebarProvider } from "./contexts/SidebarContext";
import { UserFilterProvider } from "./contexts/UserFilterContext";
import { CourseSidebarProvider } from "./contexts/CourseSidebarContext";
// Import all assessment components
import MultipleChoiceQuiz from "./components/assessments/MultipleChoiceQuiz";
import TrueFalseQuiz from "./components/assessments/TrueFalseQuiz";
import FillInBlanks from "./components/assessments/FillInBlanks";
import MatchingPairs from "./components/assessments/MatchingPairs";
import DropdownSelection from "./components/assessments/DropdownSelection";
import NumericCalculation from "./components/assessments/NumericCalculation";
import ShortAnswerQuestions from "./components/assessments/ShortAnswerQuestions";
import EssayQuestions from "./components/assessments/EssayQuestions";
import CaseStudyAnalysis from "./components/assessments/CaseStudyAnalysis";
import DragDropExercise from "./components/assessments/DragDropExercise";
import HotspotImageQuiz from "./components/assessments/HotspotImageQuiz";
import ScenarioSimulation from "./components/assessments/ScenarioSimulation";
import FileUploadAssignment from "./components/assessments/FileUploadAssignment";
import ProjectSubmission from "./components/assessments/ProjectSubmission";
import ProcturedExamination from "./components/assessments/ProcturedExamination";
import AssessmentCategories from "./components/courses/AssessmentCategories";

// Import pages
import Dashboard from "./pages/Dashboard.jsx";
import Courses from "./pages/Courses.jsx";
import Groups from "./pages/Groups.jsx";
import Users from "./pages/Users";
import Reports from "./pages/Reports.jsx";
import Resources from "./pages/Resources.jsx";
import Messages from "./pages/Messages.jsx";
import Help from "./pages/Help.jsx";
import ModuleAssessments from "./pages/ModuleAssessments.jsx";
import DebateInstructorPage from "./pages/DebateInstructorPage";
import Catalog from "./pages/Catalog.jsx";
import CategoryDetail from "./pages/CategoryDetail.jsx";
import CourseDetail from "./pages/CourseDetail.jsx";
import CourseNewsPage from "./pages/courses/CourseNewsPage";
import Profile from "./pages/Profile.jsx";
import GroupDetail from "./pages/GroupDetail.jsx";
import GroupCatalog from "./pages/GroupCatalog.jsx";
import TaskManagement from "./pages/TaskManagement";
import AnnouncementManagement from "./pages/AnnouncementManagement";
import CalendarManagement from "./pages/CalendarManagement.jsx";
import ModuleUnits from "./pages/ModuleUnits.jsx";
import CourseLessons from "./pages/CourseLessons.jsx";
import LessonContent from "./pages/LessonContent.jsx";
import CourseCreation from "./pages/CourseCreation.jsx";
import CourseBuilder from "./pages/CourseBuilder.jsx";
import UnitsBuilder from "./pages/UnitsBuilder";
import UnitCreator from "./pages/UnitCreator";
import AssessmentsBuilder from "./pages/AssessmentsBuilder";

// Import group pages
import GroupOverviewPage from "./pages/groups/GroupOverviewPage";
import GroupNewsPage from "./pages/groups/GroupNewsPage";
import GroupCalendarPage from "./pages/groups/GroupCalendarPage";
import GroupMembersPage from "./pages/groups/GroupMembersPage";
import GroupAdminsPage from "./pages/groups/GroupAdminsPage";
import GroupResourcesPage from "./pages/groups/GroupResourcesPage";
import GroupForumsPage from "./pages/groups/GroupForumsPage";
import GroupAboutPage from "./pages/groups/GroupAboutPage";
import GroupChatPage from "./pages/groups/GroupChatPage";
import GroupRssFeeds from "./pages/groups/GroupRssFeeds";

import AssessmentCreator from "./pages/AssessmentCreator";

import QuizInstructorPage from "./pages/QuizInstructorPage";

import EssayInstructorPage from "./pages/EssayInstructorPage";
import AssignmentInstructorPage from "./pages/AssignmentInstructorPage";
import SurveyInstructorPage from "./pages/SurveyInstructorPage";

// Import course components
import CourseAttendance from "./components/courses/CourseAttendance";
import CourseEdit from "./pages/CourseEdit";
import EditModulePage from './pages/EditModulePage';
import LessonMod1Dreams from './pages/LessonMod1Dreams';
import LessonMod2 from './pages/LessonMod2';
import LessonMod3Protection from './pages/LessonMod3Protection';
import Chatbot from './pages/Chatbot.jsx';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <UserFilterProvider>
            <CourseSidebarProvider>
              <Routes>
                <Route path="/" element={<AdminLayout />}>
                  {/* Main pages */}
                  <Route index element={<Dashboard />} />
                  <Route path="courses" element={<Courses />} />
                  <Route path="courses/create" element={<CourseCreation />} />
                  <Route path="/courses/edit/:courseId" element={<CourseEdit />} />
                  <Route path="/courses/:courseId/modules/:moduleId/edit" element={<EditModulePage />} />
                  <Route path="courses/builder/:courseId" element={<CourseBuilder />} />
                  <Route path="courses/builder/:courseId/modules/:moduleId/units" element={<UnitsBuilder />} />
                  <Route path="courses/builder/:courseId/modules/:moduleId/units/creator" element={<UnitCreator />} />
                  <Route path="courses/builder/:courseId/modules/:moduleId/units/creator/:unitId" element={<UnitCreator />} />
                  <Route path="courses/builder/:courseId/modules/:moduleId/assessments" element={<AssessmentsBuilder />} />
                  <Route path="courses/builder/:courseId/modules/:moduleId/assessments/creator" element={<AssessmentCreator />} />
                  <Route path="courses/builder/:courseId/modules/:moduleId/assessments/creator/:assessmentId" element={<AssessmentCreator />} />
                  <Route path="courses/view/:courseId/*" element={<CourseDetail />} />
                  <Route path="courses/view/:courseId/news" element={<CourseNewsPage />} />
                  <Route path="courses/view/:courseId/attendance" element={<CourseAttendance />} />
                  <Route path="courses/modules/:moduleId/assessments" element={<ModuleAssessments />} />
                  <Route path="courses/modules/:moduleId/assignments/:assignmentId" element={<AssignmentInstructorPage />} />
                  <Route path="courses/modules/:moduleId/debates/:debateId" element={<DebateInstructorPage />} />
                  <Route path="courses/modules/:moduleId/quizzes/:quizId" element={<QuizInstructorPage />} />
                  <Route path="courses/modules/:moduleId/essays/:essayId" element={<EssayInstructorPage />} />
                  <Route path="courses/modules/:moduleId/surveys/:surveyId" element={<SurveyInstructorPage />} />
                  <Route path="courses/modules/:moduleId/units" element={<ModuleUnits />} />
                  <Route path="courses/modules/1/lessons" element={<LessonMod1Dreams />} />
                  <Route path="courses/modules/2/lessons" element={<LessonMod2 />} />
                  <Route path="courses/modules/3/lessons" element={<LessonMod3Protection />} />
                  <Route path="catalog" element={<Catalog />} />
                  <Route path="catalog/:categoryId" element={<CategoryDetail />} />
                  <Route path="catalog/:courseId/:moduleId/:unitId" element={<CourseLessons />} />
                  <Route path="catalog/:courseId/:moduleId/:unitId/:lessonId" element={<LessonContent />} />
                  <Route path="groups" element={<Groups />} />
                  <Route path="groups/catalog" element={<GroupCatalog />} />
                  
                  {/* Group Detail Routes */}
                  <Route path="groups/view/:groupId" element={<GroupDetail />}>
                    <Route path="overview" element={<GroupOverviewPage />} />
                    <Route path="about" element={<GroupAboutPage />} />
                    <Route path="news" element={<GroupNewsPage />} />
                    <Route path="calendar" element={<GroupCalendarPage />} />
                    <Route path="members" element={<GroupMembersPage />} />
                    <Route path="admins" element={<GroupAdminsPage />} />
                    <Route path="resources" element={<GroupResourcesPage />} />
                    <Route path="forums" element={<GroupForumsPage />} />
                    <Route path="chat" element={<GroupChatPage />} />
                    <Route path="rss" element={<GroupRssFeeds />} />
                  </Route>
                  
                  <Route path="users" element={<Users />} />
                  <Route path="reports" element={<Reports />} />
                  <Route path="resources" element={<Resources />} />
                  <Route path="messages" element={<Messages />} />
                  <Route path="help" element={<Help />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="chatbot" element={<Chatbot />} />
                  
                  {/* New Instructor Dashboard Routes */}
                  <Route path="tasks" element={<TaskManagement />} />
                  <Route path="announcements" element={<AnnouncementManagement />} />
                  <Route path="calendar" element={<CalendarManagement />} />
                  
                  {/* Assessment Routes */}
                  <Route path="assessment/multiple-choice" element={<MultipleChoiceQuiz />} />
                  <Route path="assessment/true-false" element={<TrueFalseQuiz />} />
                  <Route path="assessment/fill-blanks" element={<FillInBlanks />} />
                  <Route path="assessment/matching" element={<MatchingPairs />} />
                  <Route path="assessment/dropdown" element={<DropdownSelection />} />
                  <Route path="assessment/numeric" element={<NumericCalculation />} />
                  <Route path="assessment/shortanswer" element={<ShortAnswerQuestions />} />
                  <Route path="assessment/essay" element={<EssayQuestions />} />
                  <Route path="assessment/casestudy" element={<CaseStudyAnalysis />} />
                  <Route path="assessment/drag-drop" element={<DragDropExercise />} />
                  <Route path="assessment/hotspot" element={<HotspotImageQuiz />} />
                  <Route path="assessment/scenario" element={<ScenarioSimulation />} />
                  <Route path="assessment/file-upload" element={<FileUploadAssignment />} />
                  <Route path="assessment/project-submission" element={<ProjectSubmission />} />
                  <Route path="assessment/proctored" element={<ProcturedExamination />} />
                </Route>
              </Routes>
            </CourseSidebarProvider>
          </UserFilterProvider>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;