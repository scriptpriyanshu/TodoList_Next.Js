"use client";

import React, { useEffect, useState } from "react";
const Todo = () => {
  const [todo, setTodo] = useState([]);

  const getTasks = () => {
    const todo = localStorage.getItem("todo");
    if (todo) {
      return JSON.parse(todo);
    } else {
      return [];
    }
  };

  useEffect(() => {
    const tasks = getTasks();
    if (Array.isArray(tasks)) {
      setTodo(tasks);
    } else {
      alert("Tasks retrieved from localStorage is not an array.");
    }
  }, []);

  const saveTasks = (todo) => {
    localStorage.setItem("todo", JSON.stringify(todo));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newTodo = event.target.todoInput.value;

    if (newTodo.trim() !== "") {
      const updatedTodo = [...todo, newTodo];
      setTodo(updatedTodo);
      saveTasks(updatedTodo);
    }

    event.target.todoInput.value = "";
  };

  const btnClicked = (index) => {
    const updatedTodo = [...todo];
    updatedTodo.splice(index, 1);
    setTodo(updatedTodo);
    saveTasks(updatedTodo);
  };

  return (
    <div className="flex flex-col bg-[#123C69] justify-center items-center w-full h-screen">
      <h1 className="text-5xl text-white p-5 flex gap-5">
        Itodo
        <img
          width={45}
          src="https://cdn-icons-png.flaticon.com/512/2387/2387635.png"
          alt=""
        />
      </h1>
      <div className="container custom-scrollbar overflow-y-scroll w-2/4 h-5/6 bg-[#AC3B61] rounded-lg flex flex-col">
        <form onSubmit={handleSubmit}>
          <div className="flex bg-[#EDC7B7] justify-center rounded-lg m-10">
            <input
              placeholder="Enter your Todo 🎯"
              name="todoInput"
              className="text-xl bg-transparent font-bold w-full h-14 px-6 outline-none font-mono"
              type="text"
            />
            <button className="bg-[#123C69] w-1/3 rounded-tr-lg rounded-br-lg text-xl font-bold text-[#EEE2DC]">
              Add
            </button>
          </div>
        </form>
        <div>
          <ul className="flex flex-col items-center">
            {todo.map((item, index) => (
              <li
                key={index}
                className="pl-6 bg-[#123C69] items-center text-xl font-semibold w-10/12 rounded-lg h-14 m-2 text-white flex justify-between"
              >
                <h1>{item}</h1>
                <button
                  onClick={() => {
                    btnClicked(index);
                  }}
                  className="w-1/5 h-full text-[#AC3B61] hover:bg-[#EEE2DC]  transition-all rounded-tr-lg rounded-br-lg text-5xl bg-[#EDC7B7]"
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Todo;
