import { useEffect } from "react";
import { useState } from "react";
import "../styles/ColabBoard.css";

interface Task {
  id: number;
  content: string;
}

interface Column {
  id: number;
  title: string;
  tasks: Task[];
}

const ColabBoard = () => {
  const [jwt, setJwt] = useState<string | null>(null);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setJwt(localStorage.getItem("token"));
    }
  }, [jwt]);

  // Original columns in the ColabBoard
  const [columns, setColumns] = useState<Column[]>([
    { id: 1, title: "New task", tasks: [] },
    { id: 2, title: "On going", tasks: [] },
    { id: 3, title: "Completed", tasks: [] },
  ]);

  // Adding new columns

  const addNewColumn = (title: string) => {
    setColumns((priorColumns) => [
      ...priorColumns,
      { id: priorColumns.length + 1, title, tasks: [] },
    ]);
  };

  return (
    <div>
      <h2>Welcome to Colab Board</h2>
      {!jwt ? (
        <p>Please log in to the system</p>
      ) : (
        <>
          {/* This button will add new column to the board*/}
          <button onClick={() => addNewColumn("New Column")}>
            Add new Column
          </button>
          <div className="col-div">
            {columns.map((column) => (
              <div className="inner-col-div" key={column.id}>
                <h2>{column.title}</h2>
                <div>
                  {column.tasks.length === 0 ? (
                    <p>No tasks in this column</p>
                  ) : (
                    column.tasks.map((task) => (
                      <div key={task.id}>{task.content}</div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>{" "}
        </>
      )}
    </div>
  );
};

export default ColabBoard;
