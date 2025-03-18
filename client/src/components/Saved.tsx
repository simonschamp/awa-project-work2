import React, { useState } from "react";
import useColabBoard from "./useColabBoard";
import EditfulText from "./EditfulText";
import "../styles/ColabBoard2.css";
import EditfulComment from "./EditfulComment";
import ProgressControl from "./ProgressControl";
import { DropResult } from "react-beautiful-dnd";

// Utility method for converting timestamps into readable objects
const formattingTheDate = (timeString?: string): string => {
  return timeString
    ? new Intl.DateTimeFormat("en-US", {
        dateStyle: "short",
        timeStyle: "short",
      }).format(new Date(timeString))
    : "Not/Availlable";
};

const ColabBoard2 = () => {
  // initialize useColabBoard component
  const {
    columns,
    setColumns,
    addColumnToBoard,
    updateTitleOfColumn,
    deleteColumnFromBoard,
    addCardToColumn,
    updateColumnCard,
    deleteCardFromBoard,
    setColorOfCard,
    addCommentToTheCard,
    updateTheComment,
    deleteTheComment,
    markTheCardWhenDone,
    logTheTime,
  } = useColabBoard();

  // State for new column title
  const [newColumnTitle, setNewColumnTitle] = useState("");
  // State for search keywords
  const [searchWord, setSearchWord] = useState("");

  //After studying the drag-and-drop method in Chatgpt, I decided to implement the drad/drop method below
  const onDragAtEnd = (result: DropResult) => {
    const { source, destination, type } = result;

    if (!destination) return;

    if (type === "COLUMN") {
      //Handling column re-positioning
      const newColumns = [...columns];
      const [movingColumn] = newColumns.splice(source.index, 1);
      newColumns.splice(destination.index, 0, movingColumn);
      setColumns(newColumns);
    } else {
      // Moving cards  from one column to another
      const sourcePointColumn = columns.find(
        (column) => column.id === source.droppableId
      )!;
      const destinationColumn = columns.find(
        (column) => column.id === destination.droppableId
      )!;
      const newSourcePointCards = [...sourcePointColumn.cards];
      const [movingCard] = newSourcePointCards.splice(source.index, 1);

      if (sourcePointColumn === destinationColumn) {
        // moving cards within the same column
        newSourcePointCards.splice(destination.index, 0, movingCard);
        setColumns(
          columns.map((column) =>
            column.id === sourcePointColumn.id
              ? { ...column, cards: newSourcePointCards }
              : column
          )
        );
      } else {
        // moving cards to another column
        const newDestinationCards = [...destinationColumn.cards];
        newDestinationCards.splice(destination.index, 0, movingCard);
        setColumns((priorColumns) =>
          priorColumns.map((column) =>
            column.id === sourcePointColumn.id
              ? { ...column, cards: newSourcePointCards }
              : column.id === destinationColumn.id
              ? { ...column, cards: newDestinationCards }
              : column
          )
        );
      }
    }
  };

  // Method to filter the cards that match search terms
  const filterMatchingCards = (title: string, content: string) => {
    return (
      title.toLowerCase().includes(searchWord.toLowerCase()) ||
      content.toLowerCase().includes(searchWord.toLowerCase())
    );
  };

  return (
    <div>
      <h2>ColabBoard2</h2>

      {/*Search field */}
      <label>
        Perform search:
        <input
          className="search-cards"
          type="text"
          placeholder="Search the cards..."
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
        />
      </label>

      <input
        type="text"
        value={newColumnTitle}
        onChange={(e) => setNewColumnTitle(e.target.value)}
        placeholder="Add new title..."
      />

      <button
        onClick={() => {
          addColumnToBoard(newColumnTitle);
          setNewColumnTitle("");
        }}
      >
        Add new column
      </button>

      <div className="column-div">
        {columns.map((column) => (
          <div className="inner-column-div" key={column.id}>
            {/*<h3>{column.title}</h3>*/}
            <EditfulText
              text={column.title}
              onSave={(newText) => updateTitleOfColumn(column.id, newText)}
            />
            <button
              className="delete-column-btn"
              onClick={() => deleteColumnFromBoard(column.id)}
            >
              Delete Column
            </button>
            <button
              className="add-new-card-btn"
              onClick={() =>
                addCardToColumn(column.id, "Title...", "Content...", 2)
              }
            >
              Add new card
            </button>
            {column.cards
              .filter((card) => filterMatchingCards(card.title, card.content))
              .map((card) => (
                <>
                  <EditableCard
                    key={card.id}
                    columnId={column.id}
                    card={card}
                    updateColumnCard={updateColumnCard}
                    deleteCardFromBoard={deleteCardFromBoard}
                    setColorOfCard={setColorOfCard}
                  />
                  <p className="timestamp-paragraph">
                    Card created at: {formattingTheDate(card.createdAt)}
                  </p>
                  {card.createdAt !== card.updatedAt && (
                    <p className="timestamp-paragraph">
                      Card updated at: {formattingTheDate(card.updatedAt)}
                    </p>
                  )}
                  <p className="time-estimate-paragraph">
                    Estimation of time: {card.estimateOfTime} hrs
                  </p>
                  <p className="logged-time">Time logged: {card.logTime} hrs</p>
                  {card.completedAt ? (
                    <p className="time-estimate-paragraph">
                      {" "}
                      {/*Completed at: {formattingTheDate(card.completedAt)}{" "}*/}
                      {new Date(card.completedAt).toLocaleString()}
                    </p>
                  ) : (
                    <label>
                      Click if Done
                      <button
                        className="done"
                        onClick={() => markTheCardWhenDone(column.id, card.id)}
                      >
                        Done:
                      </button>
                    </label>
                  )}

                  {/*Log the time form */}
                  <input
                    type="number"
                    placeholder="Hours used"
                    min={0}
                    step={0.1}
                    onChange={(e) =>
                      logTheTime(column.id, card.id, parseFloat(e.target.value))
                    }
                  />
                  <button onClick={() => logTheTime(column.id, card.id, 1)}>
                    +1 hr
                  </button>

                  {/*Progress control*/}
                  <div className="relative overflow-visible">
                    <ProgressControl
                      estimateOfTime={card.estimateOfTime || 0}
                      logTime={card.logTime || 0}
                      doneTime={card.doneTime || 0}
                      isFinished={!!card.completedAt}
                    />
                  </div>
                  {/*Add comment input field */}
                  <input
                    className="card-comment-input"
                    type="text"
                    placeholder="Add comment to the card..."
                    onKeyDown={(e) => {
                      if (
                        e.key === "Enter" &&
                        e.currentTarget.value.trim() !== ""
                      ) {
                        addCommentToTheCard(
                          column.id,
                          card.id,
                          e.currentTarget.value
                        );
                        e.currentTarget.value = "";
                      }
                    }}
                  />
                  {/* Display existing comments*/}
                  {card.comments.map((comment) => (
                    <>
                      <EditfulComment
                        key={comment.id}
                        text={comment.text}
                        onSave={(newText) =>
                          updateTheComment(
                            column.id,
                            card.id,
                            comment.id,
                            newText
                          )
                        }
                        onDelete={() =>
                          deleteTheComment(column.id, card.id, comment.id)
                        }
                      />
                      <p className="timestamp-paragraph">
                        Comment added at: {formattingTheDate(comment.createdAt)}
                      </p>
                      {comment.createdAt !== comment.updatedAt && (
                        <p className="timestamp-paragraph">
                          Comment updated at:{" "}
                          {formattingTheDate(comment.updatedAt)}
                        </p>
                      )}
                    </>
                  ))}
                </>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

interface EditableCardProps {
  columnId: string;
  card: {
    id: string;
    title: string;
    content: string;
    titleColor: string;
    contentColor: string;
  };
  updateColumnCard: (
    columnId: string,
    cardId: string,
    title: string,
    content: string
  ) => void;
  deleteCardFromBoard: (columnId: string, cardId: string) => void;
  setColorOfCard: (
    columnId: string,
    cardId: string,
    titleColor: string,
    contentColors: string
  ) => void;
}

const EditableCard: React.FC<EditableCardProps> = ({
  columnId,
  card,
  updateColumnCard,
  deleteCardFromBoard,
  setColorOfCard,
}) => {
  // State for modifying card title and content

  const [isModifying, setIsModifying] = useState(false);
  const [newTitle, setNewTitle] = useState(card.title);
  const [newContent, setNewContent] = useState(card.content);
  const [titleColor, setTitleColor] = useState(card.titleColor);
  const [contentColor, setContentColor] = useState(card.contentColor);

  return (
    <div className="card-div">
      {isModifying ? (
        <>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Insert title..."
          />
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Content here..."
          />
          <button
            onClick={() => {
              updateColumnCard(columnId, card.id, newTitle, newContent);
              setIsModifying(false);
            }}
          >
            Save
          </button>
        </>
      ) : (
        <>
          <h3
            id="card-title-background-color"
            onClick={() => setIsModifying(true)}
            style={{ backgroundColor: titleColor, padding: "1px" }}
          >
            {card.title}
          </h3>
          <p
            id="card-content-background-color"
            onClick={() => setIsModifying(true)}
            style={{ backgroundColor: contentColor, padding: "10px" }}
          >
            {card.content}
          </p>
        </>
      )}
      <label>
        Set-title-color
        <input
          className="set-titlecolor-btn"
          type="color"
          value={titleColor}
          onChange={(e) => {
            setTitleColor(e.target.value);
            setColorOfCard(columnId, card.id, e.target.value, contentColor);
          }}
        />
      </label>

      <label>
        Set-content-color
        <input
          className="set-Contentcolor-btn"
          type="color"
          value={contentColor}
          onChange={(e) => {
            setContentColor(e.target.value);
            setColorOfCard(columnId, card.id, e.target.value, titleColor);
          }}
        />
      </label>

      <button
        className="delete-card-btn"
        onClick={() => deleteCardFromBoard(columnId, card.id)}
      >
        Delete card
      </button>
    </div>
  );
};

export default ColabBoard2;

//Draggable droppable

//After studying the drag-and-drop method in Chatgpt, I decided to implement the drad/drop method below
const onDragAtEnd = (result: DropResult) => {
  const { source, destination, type } = result;

  if (!destination) return;

  if (type === "COLUMN") {
    //Handling column re-positioning
    const newColumns = [...columns];
    const [movingColumn] = newColumns.splice(source.index, 1);
    newColumns.splice(destination.index, 0, movingColumn);
    setColumns(newColumns);
  } else {
    // Moving cards  from one column to another
    const sourcePointColumn = columns.find(
      (column) => column.id === source.droppableId
    )!;
    const destinationColumn = columns.find(
      (column) => column.id === destination.droppableId
    )!;
    const newSourcePointCards = [...sourcePointColumn.cards];
    const [movingCard] = newSourcePointCards.splice(source.index, 1);

    if (sourcePointColumn === destinationColumn) {
      // moving cards within the same column
      newSourcePointCards.splice(destination.index, 0, movingCard);
      setColumns(
        columns.map((column) =>
          column.id === sourcePointColumn.id
            ? { ...column, cards: newSourcePointCards }
            : column
        )
      );
    } else {
      // moving cards to another column
      const newDestinationCards = [...destinationColumn.cards];
      newDestinationCards.splice(destination.index, 0, movingCard);
      setColumns((priorColumns) =>
        priorColumns.map((column) =>
          column.id === sourcePointColumn.id
            ? { ...column, cards: newSourcePointCards }
            : column.id === destinationColumn.id
            ? { ...column, cards: newDestinationCards }
            : column
        )
      );
    }
  }
};
