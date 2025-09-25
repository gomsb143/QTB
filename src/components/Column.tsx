import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

export default function Column({
  title,
  tasks,
  setTasks,
}: {
  title: string;
  tasks: string[];
  setTasks: (tasks: string[]) => void;
}) {
  const addTask = () => {
    const taskTitle = prompt('Task title');
    if (taskTitle) setTasks([...tasks, taskTitle]);
  };

  return (
    <Droppable droppableId={title}>
      {(provided) => (
        <div
          className="bg-gray-100 p-2 rounded w-64 flex-shrink-0"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h2 className="font-bold mb-2">{title}</h2>
          <div className="flex flex-col gap-2 mb-2">
            {tasks.map((t, index) => (
              <Draggable key={t} draggableId={t} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskCard title={t} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
          <button onClick={addTask} className="text-blue-500">
            + Add Task
          </button>
        </div>
      )}
    </Droppable>
  );
}
