import React, { useState, useEffect } from 'react';
import Column from './Column';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { loadBoard, saveBoard } from '../utils/storage';

const DEFAULT_COLUMNS = ['To Do', 'Doing', 'Done'];

export default function Board() {
  const [columns, setColumns] = useState<string[]>(() => loadBoard() || DEFAULT_COLUMNS);
  const [tasks, setTasks] = useState<Record<string, string[]>>(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    saveBoard(columns);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [columns, tasks]);

  const addColumn = () => {
    if (columns.length < 5) {
      const newCol = prompt('Enter column name') || 'New Column';
      setColumns([...columns, newCol]);
      setTasks({ ...tasks, [newCol]: [] });
    } else alert('Maximum 5 columns allowed.');
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;

    const sourceTasks = Array.from(tasks[sourceCol] || []);
    const [moved] = sourceTasks.splice(source.index, 1);

    if (sourceCol === destCol) {
      sourceTasks.splice(destination.index, 0, moved);
      setTasks({ ...tasks, [sourceCol]: sourceTasks });
    } else {
      const destTasks = Array.from(tasks[destCol] || []);
      destTasks.splice(destination.index, 0, moved);
      setTasks({ ...tasks, [sourceCol]: sourceTasks, [destCol]: destTasks });
    }
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 overflow-x-auto mb-4">
          {columns.map((col) => (
            <Column
              key={col}
              title={col}
              tasks={tasks[col] || []}
              setTasks={(newTasks) => setTasks({ ...tasks, [col]: newTasks })}
            />
          ))}
          {columns.length < 5 && (
            <button
              onClick={addColumn}
              className="flex-shrink-0 bg-blue-500 text-white px-4 py-2 rounded h-12 self-start"
            >
              + Add Column
            </button>
          )}
        </div>
      </DragDropContext>
    </div>
  );
}
