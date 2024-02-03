import { useState, useEffect } from "react";
import "./App.css";

const API_ENDPOINT = "https://jsonplaceholder.typicode.com/todos";

async function fetchTODOList() {
  // Simulate a 1-second delay
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const response = await fetch(API_ENDPOINT);
  return response.json();
}

function Loading() {
  return <h2>🌀 Loading...</h2>;
}

function TODOList({ tasks }) {
  return (
    <div className="todo-list">
      <ul>
        {tasks.slice(0, 10).map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTODOList()
      .then((result) => {
        setTasks(result);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching TODO list:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <main>
      <h1>TODO</h1>
      {isLoading ? <Loading /> : <TODOList tasks={tasks} />}
    </main>
  );
}
