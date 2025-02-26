

const ErrorBoundaryPage = (error: unknown) => {
  console.log("Error occured", error);
  return (
    <div className="error-boundary">
      <p className="error-msg">
        There was an error, please check the error and try again!
      </p>
    </div>
  );
};

export default ErrorBoundaryPage;
