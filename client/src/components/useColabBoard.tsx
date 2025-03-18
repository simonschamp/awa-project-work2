import { useState, useEffect } from "react";

interface Comment {
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

interface Card {
  id: string;
  title: string;
  content: string;
  titleColor: string;
  contentColor: string;
  createdAt: string;
  updatedAt: string;
  estimateOfTime: number; // Estimated hour time the work should be completed
  logTime: number; // manually logged tim in hours
  completedAt?: string;
  doneTime?: number; // Time (hr) between start and finish
  comments: Comment[];
}

interface Column {
  id: string;
  title: string;
  cards: Card[];
}

const useColabBoard = () => {
  const [columns, setColumns] = useState<Column[]>([
    { id: crypto.randomUUID(), title: "New task", cards: [] },
    { id: crypto.randomUUID(), title: "On going", cards: [] },
    { id: crypto.randomUUID(), title: "Completed", cards: [] },
  ]);

  const API_URL = "http://localhost:8000/columns";

  // Method for loading columns from MongoDB to the page
  const loadColumns = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Columns not fetched");
      }
      const data = await response.json(); // parse to JSON
      setColumns(data);
    } catch (error) {
      console.error("Error loading columns:", error);
    }
  };

  useEffect(() => {
    loadColumns();
  }, []);

  //Method for saving columns from MongoDB
  const saveColumns = async () => {
    try {
      console.log("Saving columns:", columns);
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ columns }),
      });
      const data = await response.json(); // response parse to JSON
      console.log("Saved response:", data);
      if (!response.ok) {
        throw new Error(
          `Failed to save columns: ${data.error || response.statusText}`
        );
      }
      console.log("Columns saved successfully:", data);
    } catch (error) {
      console.error("Error saving columns:", error);
    }
  };

  // Initialize the timestamp
  const getTheTimestamp = () => new Date().toISOString();

  // Add column to the board
  const addColumnToBoard = (title: string) => {
    const newColumn: Column = {
      id: crypto.randomUUID(),
      title,
      cards: [],
    };
    // saving the new colums to the variable column
    setColumns((allColumns) => [...allColumns, newColumn]);
  };

  // Method to update  clumn title
  const updateTitleOfColumn = (columnId: string, newTitle: string) => {
    setColumns(
      columns.map((column) =>
        column.id === columnId ? { ...column, title: newTitle } : column
      )
    );
  };
  // Method for deleting a column from the ColabBoard
  const deleteColumnFromBoard = (id: string) => {
    setColumns((allColumns) => allColumns.filter((column) => column.id !== id));
  };

  // Method for adding new card to a particular column
  const addCardToColumn = (
    columnId: string,
    title: string,
    content: string,
    estimateOfTime: number
  ) => {
    const newCard: Card = {
      id: crypto.randomUUID(),
      title,
      content,
      titleColor: "#ffffff",
      contentColor: "#ffffff",
      createdAt: getTheTimestamp(),
      updatedAt: getTheTimestamp(),
      estimateOfTime,
      logTime: 0, //Defualted at 0
      comments: [],
    };
    setColumns(
      columns.map((column) =>
        column.id === columnId
          ? { ...column, cards: [...column.cards, newCard] }
          : column
      )
    );
  };
  // Methods to calculate work progress percentage, by comparing actual vs. estimated time
  // Progress = (time elapsed / estimated time) x 100
  //Method to determine time difference in hrs
  const calculateTheDoneTime = (createdAt: string, completedAt: string) => {
    const startTime = new Date(createdAt).getTime();
    const endTime = new Date(completedAt).getTime();
    return Math.max((endTime - startTime) / (1000 * 60 * 60), 0);
  };

  // Method to indicate when card is done
  const markTheCardWhenDone = (columnId: string, cardId: string) => {
    setColumns(
      columns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              cards: column.cards.map((card) =>
                card.id === cardId
                  ? {
                      ...card,
                      completedAt: getTheTimestamp(),
                      doneTime: calculateTheDoneTime(
                        card.createdAt,
                        getTheTimestamp()
                      ),
                    }
                  : card
              ),
            }
          : column
      )
    );
  };

  // Method for logging the time
  const logTheTime = (columnId: string, cardId: string, time: number) => {
    setColumns(
      columns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              cards: column.cards.map((card) =>
                card.id === cardId
                  ? { ...card, logTime: card.logTime + time }
                  : card
              ),
            }
          : column
      )
    );
  };

  // Method for updating card's title or content
  const updateColumnCard = (
    columnId: string,
    cardId: string,
    newTitle: string,
    newContent: string
  ) => {
    setColumns((allColumns) =>
      allColumns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              cards: column.cards.map((card) =>
                card.id === cardId
                  ? {
                      ...card,
                      title: newTitle,
                      content: newContent,
                      updatedAt: getTheTimestamp(),
                    }
                  : card
              ),
            }
          : column
      )
    );
  };

  // Method for deleting a card from the board
  const deleteCardFromBoard = (columnId: string, cardId: string) => {
    setColumns((allColumns) =>
      allColumns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              cards: column.cards.filter((card) => card.id !== cardId),
            }
          : column
      )
    );
  };

  // Method for setting card colors
  const setColorOfCard = (
    columnId: string,
    cardId: string,
    titleColor: string,
    contentColor: string
  ) => {
    setColumns((allColumns) =>
      allColumns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              cards: column.cards.map((card) =>
                card.id === cardId
                  ? { ...card, titleColor, contentColor }
                  : card
              ),
            }
          : column
      )
    );
  };
  // Method for adding comment to card
  const addCommentToTheCard = (
    columnId: string,
    cardId: string,
    commentText: string
  ) => {
    setColumns(
      columns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              cards: column.cards.map((card) =>
                card.id === cardId
                  ? {
                      ...card,
                      comments: [
                        ...card.comments,
                        {
                          id: crypto.randomUUID(),
                          text: commentText,
                          createdAt: getTheTimestamp(),
                          updatedAt: getTheTimestamp(),
                        },
                      ],
                    }
                  : card
              ),
            }
          : column
      )
    );
  };

  // Method for updating comments
  const updateTheComment = (
    columnId: string,
    cardId: string,
    commentId: string,
    newText: string
  ) => {
    setColumns(
      columns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              cards: column.cards.map((card) =>
                card.id === cardId
                  ? {
                      ...card,
                      comments: card.comments.map((comment) =>
                        comment.id === commentId
                          ? {
                              ...comment,
                              text: newText,
                              updatedAt: getTheTimestamp(),
                            }
                          : comment
                      ),
                    }
                  : card
              ),
            }
          : column
      )
    );
  };

  // Method for deleting comments
  const deleteTheComment = (
    columnId: string,
    cardId: string,
    commentId: string
  ) => {
    setColumns(
      columns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              cards: column.cards.map((card) =>
                card.id === cardId
                  ? {
                      ...card,
                      comments: card.comments.filter(
                        (comment) => comment.id !== commentId
                      ),
                    }
                  : card
              ),
            }
          : column
      )
    );
  };

  return {
    columns,
    saveColumns,
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
  };
};

export default useColabBoard;
