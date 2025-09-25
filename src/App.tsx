import React, { useState } from 'react';
import Board from './components/Board';
import StatusReporter from './components/StatusReporter';
import { importBoard, exportBoard } from './utils/storage';

export default function App() {
  const [tasks, setTasks] = useState<Record<string, string[]>>(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : {};
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-4">Taskurai</h1>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => exportBoard()}
          className="bg-yellow-500 px-3 py-1 rounded text-white"
        >
          Export JSON
        </button>
        <input
          type="file"
          onChange={(e) => e.target.files && importBoard(e.target.files[0], setTasks)}
          className="border rounded px-2 py-1"
        />
      </div>
      <Board />
      <StatusReporter />
    </div>
  );
}
