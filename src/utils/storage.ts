const STORAGE_KEY = 'quicktask-board-columns';

export const loadBoard = (): string[] | null => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
};

export const saveBoard = (columns: string[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(columns));
};

export const exportBoard = () => {
  const data = localStorage.getItem('tasks');
  const blob = new Blob([data || '{}'], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'board.json';
  a.click();
  URL.revokeObjectURL(url);
};

export const importBoard = (file: File, setTasks: (tasks: Record<string, string[]>) => void) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const content = e.target?.result as string;
    const json = JSON.parse(content);
    setTasks(json);
    localStorage.setItem('tasks', JSON.stringify(json));
  };
  reader.readAsText(file);
};
