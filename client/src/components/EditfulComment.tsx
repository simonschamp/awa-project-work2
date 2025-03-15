import React, { useState, useRef, useEffect } from "react";
import "../styles/EditfulComment.css";

interface EditfulCommentProps {
  text: string;
  onSave: (newText: string) => void;
  onDelete: () => void;
}

const EditfulComment: React.FC<EditfulCommentProps> = ({
  text,
  onSave,
  onDelete,
}) => {
  // State for editing comment
  const [isModifying, setIsModifying] = useState(false);
  const [value, setValue] = useState(text);
  const inputRefType = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isModifying && inputRefType.current) {
      inputRefType.current.focus();
    }
  }, [isModifying]);

  const executeSave = () => {
    if (value.trim() !== "") {
      onSave(value);
    }
    setIsModifying(false);
  };

  const executeKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeSave();
    } else if (e.key === "Escape") {
      setIsModifying(false);
      setValue(text);
    }
  };

  return (
    <div className="editful-comment">
      {isModifying ? (
        <input
          ref={inputRefType}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={executeSave}
          onKeyDown={executeKeyDown}
        />
      ) : (
        <span onDoubleClick={() => setIsModifying(true)}>{text}</span>
      )}
      <button onClick={onDelete} className="comment-delete-btn">
        ✖
      </button>
    </div>
  );
};

export default EditfulComment;
