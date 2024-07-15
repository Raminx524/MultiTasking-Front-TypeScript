import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/services/api.service";
import { toast } from "../ui/use-toast";

function CreateDialog(props) {
  const { setTasks } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [todos, setTodos] = useState("");
  async function handleCreateTask(e) {
    e.preventDefault();
    const newTask = {
      title,
      description,
      body,
      todoList: todos.split(",").map((title) => {
        return { title };
      }),
    };
    try {
      const res = await api.post("/task", newTask);
      setTasks((prevTasks) => {
        return [...prevTasks, res.data];
      });
      toast({ title: "Task created Successfully!" });
    } catch (err) {
      toast({ title: "Something Went Wrong! Try again later." });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-primary">
          Create Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleCreateTask}>
          <div className="grid grid-cols-4 items-center  gap-4">
            <Label htmlFor="title" className="text-left">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center  gap-4">
            <Label htmlFor="description" className="text-left">
              Description
            </Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center  gap-4">
            <Label htmlFor="body" className="text-left">
              Body
            </Label>
            <Input
              id="body"
              value={body}
              onChange={(e) => {
                setBody(e.target.value);
              }}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center  gap-4">
            <Label htmlFor="todos" className="text-left">
              Todos
            </Label>
            <Input
              id="todos"
              value={todos}
              onChange={(e) => {
                setTodos(e.target.value);
              }}
              className="col-span-3"
            />
          </div>
          <DialogClose asChild>
            <Button type="submit">Add Task</Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateDialog;
