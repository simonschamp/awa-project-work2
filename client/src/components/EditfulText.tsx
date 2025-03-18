
import React, { useState, useRef, useEffect } from "react";

interface EditfulTextProps {
  text: string;
  onSave: (newText: string) => void;
  className?: string;
  isManyline?: boolean;
}

const EditfulText: React.FC<EditfulTextProps> = ({
  text,
  onSave,
  className,
  isManyline = false,
}) => {
  // State for modification
  const [isModifying, setIsModifying] = useState(false);
  const [value, setValue] = useState(text);
  const inputRefType = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

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
    if (e.key === "Enter" && !isManyline) {
      e.preventDefault();
      executeSave();
    } else if (e.key === "Escape") {
      setIsModifying(false);
      setValue(text);
    }
  };

  return (
    <div onDoubleClick={() => setIsModifying(true)} className={className}>
      {isModifying ? (
        isManyline ? (
          <textarea
            ref={inputRefType as React.RefObject<HTMLTextAreaElement>}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={executeSave}
            onKeyDown={executeKeyDown}
            rows={3}
            className="powerfull"
          />
        ) : (
          <input
            ref={inputRefType as React.RefObject<HTMLInputElement>}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={executeSave}
            onKeyDown={executeKeyDown}
            className="powerfull"
          />
        )
      ) : (
        <span>{text || "Double-click to add title"}</span>
      )}
    </div>
  );
};

export default EditfulText;
