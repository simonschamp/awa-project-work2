import { useEffect } from "react";
import { useState } from "react";
import "../styles/ColabBoard.css";

interface Card {
  id: number;
  content: string;
}

interface Column {
  id: number;
  title: string;
  tasks: Card[];
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

  // To add a new card to the column
  const addNewCardToTheColumn = (columnId: number, content: string) => {
    const initiateTask: Card = {
      id: Date.now(), // special id using timing
      content,
    };

    setColumns((priorColumns) =>
      priorColumns.map((column) =>
        column.id === columnId
          ? { ...column, tasks: [...column.tasks, initiateTask] }
          : column
      )
    );
  };
  // To edit the card content
  const cardContentEditting = (
    columnId: number,
    taskId: number,
    newMessage: string
  ) => {
    setColumns((priorColumns) =>
      priorColumns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              tasks: column.tasks.map((task) =>
                task.id === taskId ? { ...task, content: newMessage } : task
              ),
            }
          : column
      )
    );
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

                {/*Button that add new card to column */}
                <button
                  onClick={() =>
                    addNewCardToTheColumn(
                      column.id,
                      `Fresh Card: ${column.title}`
                    )
                  }
                >
                  Add new card
                </button>
                {/* This block displays card in the column */}
                <div className="card-div">
                  {column.tasks.length === 0 ? (
                    <p>There are no cards</p>
                  ) : (
                    column.tasks.map((task) => (
                      <CardToBeEditted
                        key={task.id}
                        columnId={column.id}
                        task={task}
                        onEditting={cardContentEditting}
                      />
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

interface CardToBeEdittedProp {
  columnId: number;
  task: Card;
  onEditting: (columnId: number, taskId: number, newMessage: string) => void;
}

const CardToBeEditted: React.FC<CardToBeEdittedProp> = ({
  columnId,
  task,
  onEditting,
}) => {
  const [isModifying, setIsModifying] = useState<boolean>(false);
  const [newMessage, setNewMessage] = useState<string>(task.content);

  const performSave = () => {
    onEditting(columnId, task.id, newMessage);
    setIsModifying(false);
  };

  return (
    <div>
      {isModifying ? (
        <div className="textarea-div">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            rows={3}
            placeholder="Message here..."
          />
          <button onClick={performSave}>Save</button>
        </div>
      ) : (
        <div>
          <p>{task.content}</p>
          <button onClick={() => setIsModifying(true)}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default ColabBoard;
