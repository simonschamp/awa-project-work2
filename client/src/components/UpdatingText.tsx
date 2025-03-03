/*import React, { useEffect } from "react";
import { useState } from "react";
import "../styles/ColabBoard.css";
//import { Key } from "@mui/icons-material";
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

  // Method for updating column title
  const columnTitleUpdating = (columnId: number, newTitle: string) => {
    setColumns((priorColumns) =>
      priorColumns.map((column) =>
        column.id === columnId ? { ...column, title: newTitle } : column
      )
    );
  };
  // Method for updating task title
  const taskTitleUpdating = (
    columnId: number,
    taskId: number,
    newTitle: string
  ) => {
    setColumns((priorColumns) =>
      priorColumns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              tasks: column.tasks.map((task) =>
                task.id === taskId ? { ...task, title: newTitle } : task
              ),
            }
          : column
      )
    );
  };

  // Method for task content update
  const taskContentUpdating = (
    columnId: number,
    taskId: number,
    newContent: string
  ) => {
    setColumns((priorColumns) =>
      priorColumns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              tasks: column.tasks.map((task) =>
                task.id === taskId ? { ...task, content: newContent } : task
              ),
            }
          : column
      )
    );
  };

  return (
    <div>
      <h2>Colab Board</h2>
      <div className="component-update">
        {columns.map((column) => (
          <ColumnComponentUpdate
            key={column.id}
            column={column}
            columnTitleUpdating={columnTitleUpdating}
            taskTitleUpdating={taskTitleUpdating}
            taskContentUpdating={taskContentUpdating}
          />
        ))}
      </div>
    </div>
  ); 

  // Column component props
  interface ColumnComponentsProps {
    column: Column;
    columnTitleUpdating: (columnId: number, newTitle: string) => void;
    taskTitleUpdating: (
      columnId: number,
      taskId: number,
      newTitle: string
    ) => void;
    taskContentUpdating: (
      columnId: number,
      taskId: number,
      newContent: string
    ) => void;
  }

  const ColumnComponentUpdate: React.FC<ColumnComponentsProps> = ({
    column,
    columnTitleUpdating,
    taskTitleUpdating,
    taskContentUpdating,
  }) => {
    return (
      <div>
        <EditTitle
          title={column.title}
          onSave={(newTitle) => columnTitleUpdating(column.id, newTitle)}
        />
        {column.tasks.map((task) => (
          <TaskComponent
            key={task.id}
            columnId={column.id}
            task={task}
            taskTitleUpdating={taskTitleUpdating}
            taskContentUpdating={taskContentUpdating}
          />
        ))}
      </div>
    );
  };

  // Edit title props
  interface EditTitleProps {
    title: string;
    onSave: (newTitle: string) => void;
  }

  const EditTitle: React.FC<EditTitleProps> = ({ title, onSave }) => {
    // State for card title editing
    const [isModifying, setIsModifying] = useState<boolean>(false);
    const [newTitle, setNewTitle] = useState<string>(title);

    const implementDoubleClick = () => setIsModifying(true);

    const implementBlur = () => {
      setIsModifying(false);
      if (newTitle !== title) onSave(newTitle);
    };

    const implementChange = (e: React.ChangeEvent<HTMLInputElement>) =>
      setNewTitle(e.target.value);
    const implementKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        setIsModifying(false);
        if (newTitle !== title) onSave(newTitle);
      }
    };
    return (
      <div onDoubleClick={implementDoubleClick}>
        {isModifying ? (
          <input
            type="text"
            value={newTitle}
            onBlur={implementBlur}
            onChange={implementChange}
            onKeyDown={implementKeyPress}
          />
        ) : (
          <h2>{title}</h2>
        )}
      </div>
    );
  };

  // Card title and content props
  interface TaskProps {
    columnId: number;
    task: Card;
    taskTitleUpdating: (
      columnId: number,
      taskId: number,
      newTitle: string
    ) => void;
    taskContentUpdating: (
      columnId: number,
      taskId: number,
      newContent: string
    ) => void;
  }

  const TaskComponent: React.FC<TaskProps> = ({
    columnId,
    task,
    taskTitleUpdating,
    taskContentUpdating,
  }) => {
    return (
      <div>
        <EditTitle
          title={task.title}
          onSave={(newTitle) => taskTitleUpdating(columnId, task.id, newTitle)}
        />
        <EditContent
          content={task.content}
          onSave={(newContent) =>
            taskContentUpdating(columnId, task.id, newContent)
          }
        />
      </div>
    );
  };
  // interface for edit content props
  interface EditContentProps {
    content: string;
    onSave: (newContent: string) => void;
  }

  const EditContent: React.FC<EditContentProps> = ({ content, onSave }) => {
    // State for card content editing
    const [isModifying, setIsModifying] = useState<boolean>(false);
    const [newContent, setNewContent] = useState<string>(content);

    const implementDoubleClick = () => setIsModifying(true);

    const implementBlur = () => {
      setIsModifying(false);
      if (newContent !== content) onSave(newContent);
    };

    const implementChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
      setNewContent(e.target.value);

    const implementKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        setIsModifying(false);
        if (newContent !== content) onSave(newContent);
      }
    };
    return (
      <div onDoubleClick={implementDoubleClick}>
        {isModifying ? (
          <textarea
            value={newContent}
            onBlur={implementBlur}
            onChange={implementChange}
            onKeyDown={implementKeyPress}
          />
        ) : (
          <p>{content}</p>
        )}
      </div>
    );
  };
*/
