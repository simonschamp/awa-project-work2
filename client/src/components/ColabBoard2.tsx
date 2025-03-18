import { useState } from "react";
import useColabBoard from "./useColabBoard";
import EditfulText from "./EditfulText";
import "../styles/ColabBoard2.css";
import EditfulComment from "./EditfulComment";
import ProgressControl from "./ProgressControl";
import EditableCard from "./EditableCard";

// Utility method for converting timestamps into readable objects
const formattingTheDate = (timeString?: string): string => {
  return timeString
    ? new Intl.DateTimeFormat("en-US", {
        dateStyle: "short",
        timeStyle: "short",
      }).format(new Date(timeString))
    : "N/A";
};

const ColabBoard2 = () => {
  // initialize useColabBoard component
  const { variable } = useColabBoard();

  // State for new column title
  const [newColumnTitle, setNewColumnTitle] = useState("");
  // State for search keywords
  const [searchWord, setSearchWord] = useState("");

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
      <button onClick={variable.saveColumns}>Save Board</button>
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
          variable.addColumnToBoard(newColumnTitle);
          setNewColumnTitle("");
        }}
      >
        Add new column
      </button>
      <div className="column-div">
        {variable.columns.map((column) => (
          <div className="inner-column-div" key={column.id}>
            {/*<h3>{column.title}</h3>*/}
            <EditfulText
              text={column.title}
              onSave={(newText) =>
                variable.updateTitleOfColumn(column.id, newText)
              }
            />
            <button
              className="delete-column-btn"
              onClick={() => variable.deleteColumnFromBoard(column.id)}
            >
              Delete Column
            </button>
            <button
              className="add-new-card-btn"
              onClick={() =>
                variable.addCardToColumn(column.id, "Title...", "Content...", 2)
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
                    updateColumnCard={variable.updateColumnCard}
                    deleteCardFromBoard={variable.deleteCardFromBoard}
                    setColorOfCard={variable.setColorOfCard}
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
                        onClick={() =>
                          variable.markTheCardWhenDone(column.id, card.id)
                        }
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
                      variable.logTheTime(
                        column.id,
                        card.id,
                        parseFloat(e.target.value)
                      )
                    }
                  />
                  <button
                    onClick={() => variable.logTheTime(column.id, card.id, 1)}
                  >
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
                        variable.addCommentToTheCard(
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
                          variable.updateTheComment(
                            column.id,
                            card.id,
                            comment.id,
                            newText
                          )
                        }
                        onDelete={() =>
                          variable.deleteTheComment(
                            column.id,
                            card.id,
                            comment.id
                          )
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

export default ColabBoard2;
