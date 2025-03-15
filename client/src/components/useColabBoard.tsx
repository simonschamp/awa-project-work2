import { useState } from "react";

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
  comments: Comment[];
}

interface Column {
  id: string;
  title: string;
  cards: Card[];
}

const useColabBoard = () => {
  const [columns, setColumns] = useState<Column[]>([
    { id: "1", title: "New task", cards: [] },
    { id: "2", title: "On going", cards: [] },
    { id: "3", title: "Completed", cards: [] },
  ]);

  // Initialize the time stamp
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
    content: string
  ) => {
    const newCard: Card = {
      id: crypto.randomUUID(),
      title,
      content,
      titleColor: "#fff",
      contentColor: "#fff",
      createdAt: getTheTimestamp(),
      updatedAt: getTheTimestamp(),
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
  };
};

export default useColabBoard;
