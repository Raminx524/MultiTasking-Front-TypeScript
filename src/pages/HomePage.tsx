import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth.context";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const { loggedInUser } = useAuth();
  const navigate = useNavigate();
  function getStartedHandler() {
    if (!loggedInUser) return navigate("/login");
    return navigate("/task");
  }
  return (
    <div className="min-h-screen flex flex-col items-center">
      <header className="w-full  py-6 px-4 text-center">
        <h1 className="text-4xl font-bold">Welcome to MultiTasking</h1>
        <p className="text-xl mt-2">Your productivity partner</p>
      </header>

      <main className="w-full max-w-4xl px-6 py-10 flex flex-col items-center md:flex-row  md:items-baseline md:justify-between">
        <section className="rounded-lg shadow-md p-8 mb-8 max-w-96 min-h-72 border">
          <h2 className="text-2xl font-bold mb-4">Get Started</h2>
          <p className="text-lg">
            Create, manage, and complete your tasks efficiently with our
            intuitive Task app. Stay organized and increase your productivity
            with ease.
          </p>
        </section>

        <section className="rounded-lg shadow-md p-8 max-w-96 min-h-72 border">
          <h2 className="text-2xl font-bold mb-4">Features</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Easy task creation and management</li>
            <li>Organize tasks by importance</li>
            <li>Set deadlines and reminders (Future Feature)</li>
            <li>Track your progress</li>
            <li>Simple and user-friendly interface</li>
          </ul>
        </section>
      </main>
      <span className="mx-auto">
        <Button onClick={getStartedHandler} className="mb-6">
          Get Started
        </Button>
      </span>
    </div>
  );
}

export default HomePage;
