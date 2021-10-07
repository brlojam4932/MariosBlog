import { useState } from "react";

/////////////CONDITIONAL RENDERING////////////

const CondRen = () => {
  const employees = ["Anthony", "George", "Julie"];
  // we use a state variable
  //const isLoggedIn = false;
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      <button onClick={() => setLoggedIn(!isLoggedIn)}>
        {isLoggedIn ? "Log out" : "Log in"}
      </button>

      {employees.length > 0 && (
        <div>
          <h1> Employee List: </h1>
          {employees.map((employee) => (
            <li> {employee} </li>
          ))}
        </div>
      )}
      {isLoggedIn ? (
        <h1> Hello, Anthony </h1>
      ) : (
        <div>
          <h1>Please log into your account</h1>
        </div>
      )}
    </div>
  );
};

export default CondRen;
