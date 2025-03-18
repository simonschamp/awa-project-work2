import React from "react";

interface ProgressControlProps {
  estimateOfTime: number;
  logTime: number;
  doneTime?: number;
  isFinished: boolean;
}

const ProgressControl: React.FC<ProgressControlProps> = ({
  estimateOfTime,
  logTime,
  doneTime,
  isFinished,
}) => {
  // Calculating log time and Done time progresses
  const safeNumber = (value: number) => (isNaN(value) ? 0 : value);
  const progressOnLog = Math.min(
    (safeNumber(logTime) / safeNumber(estimateOfTime)) * 100,
    100
  );
  const progressOnDone = doneTime
    ? Math.min((safeNumber(doneTime) / safeNumber(estimateOfTime)) * 100, 100)
    : 0;

  if (!estimateOfTime || estimateOfTime <= 0) {
    console.error("Invalid estimateOfTime:", estimateOfTime);
    return null;
  }

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#d1d5db", // default color gray
        borderRadius: "9px",
        height: "20px",
        overflow: "hidden",
        position: "relative",
        marginTop: "6px",
      }}
    >
      {/* Time that is logged */}
      <div
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
