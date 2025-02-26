/*
import { useEffect, useState } from "react";
const Home = () => {
  const [jwt, setJwt] = useState<string | null>(null);
  

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setJwt(localStorage.getItem("token"));
    }
  }, [jwt]);
  return (
    <div>
      <h2>Welcome to Colab Board</h2>

      {!jwt ? (
        <p>Please login to the system</p>
      ) : (
        <p>You can add new columns</p>
      )}
    </div>
  );
};

export default Home;
*/