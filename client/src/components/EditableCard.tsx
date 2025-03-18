import { useState } from "react";

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
  export default EditableCard