import api from "@/services/api.service";
import React, { useEffect, useState } from "react";
import { Navigate, useParams, useNavigate, Link } from "react-router-dom";
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
import EditDialog from "@/components/dialogs/EditDialog";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/Loader";
import { Button } from "@/components/ui/button";

function TaskDetailsPage() {
  const { user } = useUserContext();
  const navigate = useNavigate();
  if (user === null || !localStorage.getItem("MultiTask-Token"))
    return <Navigate to="/" />;
  const [task, setTask] = useState(null);
  const { taskId } = useParams();

  async function handleTodoIsComplete(status, todoId) {
    const updatedTaskTodos = task.todoList.map((todo) => {
      if (todo._id === todoId) {
        return { ...todo, isComplete: status };
      }
      return todo;
    });
    try {
      const res = await api.patch(`/task/${task._id}`, {
        todoList: updatedTaskTodos,
      });
      setTask(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/task/${id}`);
      navigate(-1);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    async function getTask() {
      try {
        const res = await api.get(`task/${taskId}`);
        setTask(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getTask();
  }, []);
  if (task === null) return <Loader />;
  return (
    <div className="flex justify-center">
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <p>{task.title}</p>{" "}
            <Link to="/task">
              <Button className="block">Back</Button>
            </Link>
          </CardTitle>
          <CardDescription>{task.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{task.body}</p>
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <p className="text-xl border-b-2">Todos:</p>
          <ul className="flex flex-col w-full">
            {task.todoList.map((todo) => (
              <li
                key={todo._id}
                className="flex w-full justify-between items-center"
              >
                <p>{todo.title}</p>
                <Input
                  className="w-4"
                  type="checkbox"
                  name="isComplete"
                  id="isComplete"
                  checked={todo.isComplete}
                  onChange={(e) =>
                    handleTodoIsComplete(e.target.checked, todo._id)
                  }
                />
              </li>
            ))}
          </ul>
          <div className="flex gap-4 self-center mt-4">
            <EditDialog task={task} setTask={setTask} />
            <DeleteDialog id={task._id} handleDelete={handleDelete} />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default TaskDetailsPage;
