import React from 'react';
import jsPDF from 'jspdf';
import Papa from 'papaparse';

export default function StatusReporter() {
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('QuickTask Board Status', 10, 10);
    doc.save('status.pdf');
  };

  const generateCSV = () => {
    const csv = Papa.unparse([{ Column: 'To Do', Tasks: 5 }]); // example
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'status.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-4 flex gap-2">
      <button onClick={generatePDF} className="bg-green-500 text-white px-4 py-2 rounded">
        Export PDF
      </button>
      <button onClick={generateCSV} className="bg-indigo-500 text-white px-4 py-2 rounded">
        Export CSV
      </button>
    </div>
  );
}
