import React from "react";
import "../styles/ProgressControl.css";

interface ProgressControlProps {
  estimateOfTime: number;
  logTime: number;
  doneTime?: number;
  isFinished: boolean;
}

// After stydying the function in Chatgpt, I decided to implement the methods below.

const ProgressControl: React.FC<ProgressControlProps> = ({
  estimateOfTime,
  logTime,
  doneTime,
  isFinished,
}) => {
  // Handling zero or negative estimateOfTime
  if (!estimateOfTime || estimateOfTime <= 0) {
    return <div className="progress-error">Invalid estimate time</div>;
  }
  // Calculating log time and Done time progresses
  const safeNumber = (value: number) => (isNaN(value) ? 0 : value);
  const progressOnLog = Math.min(
    (safeNumber(logTime) / safeNumber(estimateOfTime)) * 100,
    100
  );
  const progressOnDone = doneTime
    ? Math.min((safeNumber(doneTime) / safeNumber(estimateOfTime)) * 100, 100)
    : 0;

  return (
    <div className="process-control">
      {/* Time that is logged */}
      <div
        className="logged-time"
        style={{
          width: `${progressOnLog}%`,
          backgroundColor: "rgba(96, 165, 250, 0.5)", // blue with opacity
          position: "absolute",
          left: "0",
          top: "0",
          bottom: "0",
        }}
      />

      {/* Time indicating Done */}
      {isFinished && (
        <div
          style={{
            width: `${progressOnDone}%`,
            backgroundColor:
              isFinished && doneTime && doneTime <= estimateOfTime
                ? "green"
                : "red",
            position: "absolute",
            left: "0",
            top: "0",
            bottom: "0",
          }}
        />
      )}

      <span
        style={{
          position: "absolute",
          inset: "0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "12px",
          fontWeight: "bold",
          color: "black",
        }}
      >
        {doneTime ? `${doneTime.toFixed(0)}h Done / ` : ""}
        {logTime.toFixed(0)}h Logged / {estimateOfTime}h Est.
      </span>
    </div>
  );
};

export default ProgressControl;
