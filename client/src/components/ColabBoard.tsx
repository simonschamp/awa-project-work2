/*import React, { useEffect } from "react";
import { useState } from "react";
import "../styles/ColabBoard.css";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

interface Card {
  id: number;
  title: string;
  content: string;
  comments: string[];
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
  }, []);

  // Original columns in the ColabBoard
  const [columns, setColumns] = useState<Column[]>([
    { id: 1, title: "New task", tasks: [] },
    { id: 2, title: "On going", tasks: [] },
    { id: 3, title: "Completed", tasks: [] },
  ]);

  const [inputComent, setInputComment] = useState<string>("");

  // Method for deleting a column
  const deleteSpecificColumn = (columnId: number) => {
    setColumns((priorColumns) =>
      priorColumns.filter((column) => column.id !== columnId)
    );
  };

  /*const createUniqueId = () => {
  return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}*/

// Adding new columns
/*const addNewColumn = (title: string) => {
    if (columns.some((column) => column.title === title)) {
      alert("Column already exists");
    }
    setColumns((priorColumns) => [
      ...priorColumns,
      { id: Date.now(), title, tasks: [] },
    ]);
  };

  // To add a new card to the column
  const addNewCardToTheColumn = (columnId: number) => {
    const newExpectedTask: Card = {
      id: Date.now(), // special id using timing
      title: `Title...`,
      content: `Content...`,
      comments: [],
    };

    setColumns((priorColumns) =>
      priorColumns.map((column) =>
        column.id === columnId
          ? { ...column, tasks: [...column.tasks, newExpectedTask] }
          : column
      )
    );
  };

  // After studying the example in Chatgpt.com I decided to implement the drag-and-drop method below.

  // method to implement drag-end for reordering or moving
  const implementDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    // When droped outside the droppable zone, landingPlace is null
    if (!destination) return;

    // When dropped in the same position, null changes
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    // Locate the origin and  the landing column
    const originColumn = columns.find(
      (column) => column.id === parseInt(source.droppableId)
    );
    const landingPlaceColumn = columns.find(
      (column) => column.id === parseInt(destination.droppableId)
    );
    if (!originColumn || !landingPlaceColumn) return;

    // Rearranging cards in the same column
    if (source.droppableId === destination.droppableId) {
      const rearrangedTasks = Array.from(originColumn.tasks);
      const [shiftedTask] = rearrangedTasks.splice(source.index, 1);
      rearrangedTasks.splice(destination.index, 0, shiftedTask);

      setColumns((priorColumns) =>
        priorColumns.map((column) =>
          column.id === originColumn.id
            ? { ...column, tasks: rearrangedTasks }
            : column
        )
      );
    } else {
      // Dropping to a different column
      const originTasks = Array.from(originColumn.tasks);
      const [shiftedTask] = originTasks.splice(source.index, 1);

      const landingPlaceTasks = Array.from(landingPlaceColumn.tasks);
      landingPlaceTasks.splice(destination.index, 0, shiftedTask);

      setColumns((priorColumns) =>
        priorColumns.map((column) =>
          column.id === originColumn.id
            ? { ...column, tasks: originTasks }
            : column.id === landingPlaceColumn.id
            ? { ...column, tasks: landingPlaceTasks }
            : column
        )
      );
    }
  };

  // To edit the card content
  const cardContentEditting = (
    columnId: number,
    taskId: number,
    newTitle: string,
    newMessage: string
  ) => {
    setColumns((priorColumns) =>
      priorColumns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              tasks: column.tasks.map((task) =>
                task.id === taskId
                  ? { ...task, title: newTitle, content: newMessage }
                  : task
              ),
            }
          : column
      )
    );
  };

  // Adding comments to cards
  const addingCommentsToCard = (columnId: number, taskId: number) => {
    if (inputComent.trim() === "") return;

    setColumns((priorColumns) =>
      priorColumns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              tasks: column.tasks.map((task) =>
                task.id === taskId
                  ? {
                      ...task,
                      comments: [...task.comments, inputComent], // This adds a new comment
                    }
                  : task
              ),
            }
          : column
      )
    );
    setInputComment(""); // This Clears comment after adding it
  };

  return (
    <div>
    {/*This is the very latest version */ //}
/*<DragDropContext onDragEnd={implementDragEnd}>
        <h2>Welcome to Colab Board</h2>
        {!jwt ? (
          <p>Please log in to the system</p>
        ) : (
          <>
          
            
            {/* This button will add new column to the board*/ //}
/* <button
              className="add-column-btn"
              onClick={() => addNewColumn("New Column")}
            >
              Add new Column
            </button>
            <div className="col-div">
              {columns.map((column) => (
                <Droppable
                  droppableId={String(column.id)}
                  key={column.id}
                  isDropDisabled={false}
                  isCombineEnabled={false}
                  ignoreContainerClipping={true}
                >
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      <div className="inner-col-div" key={column.id}>
                        <h2>{column.title}</h2>
                        <button
                          className="delete-col-btn"
                          onClick={() => deleteSpecificColumn(column.id)}
                        >
                          Delete column
                        </button>
                        

                        {/*Button that add new card to column */ //}
/*<button
                          onClick={() => addNewCardToTheColumn(column.id)}
                        >
                          Add new card
                        </button>

                        {/* This block displays card in the column */ //}
/*<div className="card-div">
                          {column.tasks.length === 0 ? (
                            <p>There are no cards</p>
                          ) : (
                            column.tasks.map((task, index) => (
                              <Draggable
                                draggableId={String(task.id)}
                                index={index}
                                key={task.id}
                              >
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="draggable-card"
                                  >
                                    <CardToBeEditted
                                      key={task.id}
                                      columnId={column.id}
                                      task={task}
                                      onEditting={cardContentEditting}
                                      setColumns={setColumns}
                                    />

                                    <div>
                                      <div>
                                        {task.comments.length === 0 ? (
                                          <p>No comments added</p>
                                        ) : (
                                          task.comments.map(
                                            (comment, index) => (
                                              <p key={index}>{comment}</p>
                                            )
                                          )
                                        )}
                                      </div>
                                      <textarea
                                        className="comment-input"
                                        value={inputComent}
                                        onChange={(e) =>
                                          setInputComment(e.target.value)
                                        }
                                        placeholder="Incert a comment"
                                      />
                                      <button
                                        onClick={() =>
                                          addingCommentsToCard(
                                            column.id,
                                            task.id
                                          )
                                        }
                                      >
                                        Add Comment
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            ))
                          )}
                          {provided.placeholder}
                        </div>
                      </div>
                    </div>
                  )}
                </Droppable>
              ))}
            </div>{" "}
          </>
        )}
      </DragDropContext>
    </div>
  );
};

interface CardToBeEdittedProp {
  columnId: number;
  task: Card;
  onEditting: (
    columnId: number,
    taskId: number,
    newTitle: string,
    newMessage: string
  ) => void;
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
}
// Method to delete card from a column
const deleteCardFromTheColumn = (
  columnId: number,
  taskId: number,
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>
) => {
  setColumns((priorColumns) =>
    priorColumns.map((column) =>
      column.id === columnId
        ? {
            ...column,
            // The task with the specified taskId is deleted
            tasks: column.tasks.filter((task) => task.id !== taskId),
          }
        : column
    )
  );
};

const CardToBeEditted: React.FC<CardToBeEdittedProp> = ({
  columnId,
  task,
  onEditting,
  setColumns,
}) => {
  const [isModifying, setIsModifying] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(task.title);
  const [newMessage, setNewMessage] = useState<string>(task.content);

  // State for storing colors
  const [cardTitleColor, setCardTitleColor] = useState<string>("#000000");
  const [cardTextareaColor, setCardTextareaColor] = useState<string>("#000000");
  const [cardBackgroundColor, setCardBackgroundColor] =
    useState<string>("#FFFFFF");

  const performSave = () => {
    onEditting(columnId, task.id, newTitle, newMessage);
    setIsModifying(false);
  };
  const performDelete = () => {
    deleteCardFromTheColumn(columnId, task.id, setColumns);
  };
  return (
    <div className="card-background" style={{ color: cardBackgroundColor }}>
      {isModifying ? (
        <div className="textarea-div">
          <input
            className="input"
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="title"
            style={{ color: cardTitleColor }}
          />
          <textarea
            className="textarea"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            rows={3}
            placeholder="Message here..."
            style={{ color: cardTextareaColor }}
          />
          <div>
            {/*color picker applicable to card's title and content */ //}
/* <label>
              Title color:
              <input
                type="color"
                value={cardTitleColor}
                onChange={(e) => setCardTitleColor(e.target.value)}
              />
            </label>
            <label>
              {" "}
              Text color:
              <input
                type="color"
                value={cardTextareaColor}
                onChange={(e) => setCardTextareaColor(e.target.value)}
              />
            </label>
            <label>
              Card background color:
              <input
                type="color"
                value={cardBackgroundColor}
                onChange={(e) => setCardBackgroundColor(e.target.value)}
              />
            </label>
          </div>
          <button onClick={performSave}>Save</button>
        </div>
      ) : (
        <div className="title-content-div">
          <h3 className="card-title" style={{ color: cardTitleColor }}>
            {task.title}
          </h3>
          <p className="card-content" style={{ color: cardTextareaColor }}>
            {task.content}
          </p>
          <button
            className="card-edit-btn"
            onClick={() => setIsModifying(true)}
          >
            Edit card
          </button>
          <button className="card-delete-btn" onClick={performDelete}>
            Delete card
          </button>
        </div>
      )}
    </div>
  );
};

export default ColabBoard;
*/
