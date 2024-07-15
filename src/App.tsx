import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage.js";
import LoginPage from "./pages/LoginPage.js";
import RegisterPage from "./pages/RegisterPage.js";
import { UserProvider } from "./contexts/auth.context.js";
import Navbar from "./components/Navbar.js";
import TasksPage from "./pages/TasksPage.js";
import TaskDetailsPage from "./pages/TaskDetailsPage.js";
import AboutPage from "./pages/AboutPage.js";
import ContactPage from "./pages/ContactPage.js";
import { ThemeProvider } from "@/components/theme-provider.js";
import NotFoundPage from "./pages/NotFoundPage.js";

function App() {
  const location = useLocation();
  const noNavbarRoutes = ["/login", "/register"];

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <UserProvider>
        {!noNavbarRoutes.includes(location.pathname) && <Navbar />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/task">
            <Route index element={<TasksPage />} />
            <Route path=":taskId" element={<TaskDetailsPage />} />
          </Route>
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
