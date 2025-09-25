import React from 'react';

export default function TaskCard({ title }: { title: string }) {
  return (
    <div className="bg-white p-2 rounded shadow cursor-pointer hover:bg-gray-50">
      {title}
    </div>
  );
}
