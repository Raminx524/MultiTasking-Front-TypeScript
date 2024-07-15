import React, { useEffect, useMemo, useState } from "react";
import api from "../services/api.service";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Pin, PinOff } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUserContext } from "@/contexts/auth.context";
import DeleteDialog from "@/components/dialogs/DeleteDialog";
import CreateDialog from "@/components/dialogs/CreateDialog";
import { toast } from "@/components/ui/use-toast";
import Loader from "@/components/ui/Loader";

function TasksPage() {
  const { user } = useUserContext();
  const navigate = useNavigate();
  if (user === null || !localStorage.getItem("MultiTask-Token"))
    return <Navigate to="/" />;
  const [tasks, setTasks] = useState(null);
  const [pinnedTasks, setPinnedTasks] = useState(null);
  const [unpinnedTasks, setUnpinnedTasks] = useState(null);
  const [loading, setLoading] = useState(true);

  async function handleDelete(id) {
    try {
      await api.delete(`/task/${id}`);
      setTasks((prevTasks) => {
        const newTasks = prevTasks.filter((task) => task._id !== id);
        return newTasks;
      });
      toast({ title: "Task deleted successfully!" });
    } catch (err) {
      toast({ title: "Something went wrong!" });
    }
  }

  async function pinHandler(taskId, currentStatus) {
    try {
      const res = await api.patch(`/task/${taskId}`, {
        isPinned: !currentStatus,
      });
      setTasks((prevTasks) => {
        return prevTasks.map((task) => {
          if (task._id === taskId) return res.data;
          return task;
        });
      });
      if (currentStatus) toast({ title: "Task Unpinned successfully!" });
      else toast({ title: "Task pinned successfully!" });
    } catch (err) {
      toast({ title: "Something went wrong!" });
    }
  }

  useEffect(() => {
    async function getTasks() {
      try {
        const res = await api.get("/task");
        setTasks(res.data);
      } catch (err) {
        toast({ title: "Oops, Something went wrong!" });
        navigate("/");
      }
    }
    getTasks();
  }, []);

  useMemo(() => {
    if (tasks) {
      setPinnedTasks(tasks.filter((task) => task.isPinned === true));
      setUnpinnedTasks(tasks.filter((task) => task.isPinned === false));
      setLoading(false);
    }
  }, [tasks]);

  if (loading) return <Loader />;
  return (
    <main className="p-4">
      <div className="flex w-full gap-16 sm:gap-20 md:gap-24 lg:gap-28 px-4 mb-4 items-center">
        <h1 className="text-4xl">My Tasks</h1>
        <CreateDialog setTasks={setTasks} />
      </div>
      <div className="flex flex-col gap-10">
        <div>
          <h2 className="text-xl pb-3">Pinned Tasks:</h2>
          <ul className="flex flex-wrap gap-3">
            {pinnedTasks.length > 0 ? (
              pinnedTasks.map((pinnedTask) => {
                return (
                  <li key={pinnedTask._id}>
                    <Card className="max-w-96 h-full">
                      <CardHeader>
                        <CardTitle>{pinnedTask.title}</CardTitle>
                        <CardDescription>
                          {pinnedTask.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>{pinnedTask.body}</p>
                      </CardContent>
                      <CardFooter className="flex justify-evenly">
                        <Link to={pinnedTask._id}>See More..</Link>
                        <PinOff
                          className="hover:cursor-pointer"
                          onClick={() => pinHandler(pinnedTask._id, true)}
                        />
                        <DeleteDialog
                          id={pinnedTask._id}
                          handleDelete={handleDelete}
                        />
                      </CardFooter>
                    </Card>
                  </li>
                );
              })
            ) : (
              <li>No Pinned Tasks</li>
            )}
          </ul>
        </div>

        <div>
          <h2 className="text-xl pb-3">Other Tasks:</h2>
          <ul className="flex flex-wrap gap-3">
            {unpinnedTasks.length > 0 ? (
              unpinnedTasks.map((task) => {
                return (
                  <li key={task._id}>
                    <Card className="max-w-96 h-full flex flex-col">
                      <CardHeader className="flex-grow">
                        <CardTitle>{task.title}</CardTitle>
                        <CardDescription>{task.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>{task.body}</p>
                      </CardContent>
                      <CardFooter className="flex justify-evenly">
                        <Link to={task._id}>See More..</Link>
                        <Pin onClick={() => pinHandler(task._id, false)} />
                        <DeleteDialog
                          id={task._id}
                          handleDelete={handleDelete}
                        />
                      </CardFooter>
                    </Card>
                  </li>
                );
              })
            ) : (
              <li>No Other Tasks</li>
            )}
          </ul>
        </div>
      </div>
    </main>
  );
}

export default TasksPage;
