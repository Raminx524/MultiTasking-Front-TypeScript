import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/services/api.service";
import { FilePen } from "lucide-react";
import { toast } from "../ui/use-toast";

function EditDialog(props) {
  const { task, setTask } = props;
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [body, setBody] = useState(task.body);
  const [todos, setTodos] = useState(
    task.todoList.map((todo) => todo.title).join(",")
  );

  async function handleEdit(e) {
    e.preventDefault();
    const updatedTask = {
      title,
      description,
      body,
      todoList: todos.split(",").map((title) => {
        return { title };
      }),
    };
    try {
      const res = await api.patch(`/task/${task._id}`, updatedTask);
      setTask(res.data);
      toast({ title: "Task Changes Saved Successfully!" });
    } catch (err) {
      toast({ title: "Something Went Wrong! Try again later." });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <FilePen />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>Edit {task.title}</DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleEdit}>
          <div className="grid grid-cols-4 items-center gap-4">
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
          <div className="grid grid-cols-4 items-center gap-4">
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
          <div className="grid grid-cols-4 items-center gap-4">
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
          <div className="grid grid-cols-4 items-center gap-4">
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
            <Button type="submit">Save changes</Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditDialog;
