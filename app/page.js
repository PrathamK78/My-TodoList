"use client"
import React, { useState } from 'react';

const Page = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [mainTask, setMainTask] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      // If editIndex is not null, update the task
      const updatedTask = { title, desc };
      const updatedTasks = [...mainTask];
      updatedTasks[editIndex] = updatedTask;
      setMainTask(updatedTasks);
      setEditIndex(null); // Reset editIndex
    } else {
      // If editIndex is null, add a new task
      setMainTask([...mainTask, { title, desc }]);
    }
    setTitle("");
    setDesc("");
  };

  const deleteHandler = (i) => {
    const copyTask = [...mainTask];
    copyTask.splice(i, 1);
    setMainTask(copyTask);
  };

  const editTask = (i) => {
    setEditIndex(i);
    setTitle(mainTask[i].title);
    setDesc(mainTask[i].desc);
  };

  let renderTask = <h2>No Task Available !!</h2>;

  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => (
      <li key={i} className='flex items-center justify-between mb-8'>
        {editIndex === i ? ( // Check if the task is being edited
          <div>
            <input
              type='text'
              className='text-2xl border-black-800 border-2 rounded-lg px-4 py-2 m-5'
              placeholder='Enter task here:'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type='text'
              className='text-2xl border-zinc-800 border-2 rounded-lg px-4 py-2 m-5'
              placeholder='Enter description here:'
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
        ) : (
          <div className='flex justify-between mb-5 w-2/3'>
            <h5 className='text-2xl font-semibold'>{t.title}</h5>
            <h6 className='text-lg font-medium'>{t.desc}</h6>
          </div>
        )}
        <div>
          {editIndex === i ? (
            <button
              onClick={() => submitHandler}
              className='bg-green-500 text-white px-4 py-2 rounded font-bold mb-5 mr-4'
            >
              Done
            </button>
          ) : (
            <button
              onClick={() => editTask(i)}
              className='bg-blue-500 text-white px-4 py-2 rounded-2xl font-mono  mb-5 mr-4'
            >
              Edit
            </button>
          )}
          <button
            onClick={() => deleteHandler(i)}
            className='bg-red-500 text-white px-4 py-2 rounded-2xl font-mono mb-5'
          >
            Delete
          </button>
        </div>
      </li>
    ));
  }

  return (
    <>
      <h1 className='bg-blue-400 text-white font-bold p-5 text-5xl italic font-mono text-center'>
        My TodoList
      </h1>
      <form onSubmit={submitHandler}>
        <input
          type='text'
          className='text-2xl border-zinc-800 border-2 font-mono rounded-2xl px-4 py-2 m-5'
          placeholder='Enter task here:'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type='text'
          className='text-2xl border-zinc-800 border-2 rounded-2xl font-mono px-4 py-2 m-5'
          placeholder='Enter description:'
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button className='bg-red-100 text-black px-4 py-2 text-2xl font-mono text-center rounded-2xl m-5'>
          {editIndex !== null ? 'Update Task' : 'Add Task'}
        </button>
      </form>
      <hr />
      <div className='p-8 bg-slate-200 font-mono text-center'>
        <ul>{renderTask}</ul>
      </div>
    </>
  );
};

export default Page;
