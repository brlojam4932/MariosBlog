import { useState, useEffect } from "react";
import BlogList from "./BlogList";
import CondRen from "./condRend";

const Home = () => {
  //let names = "mario";

  //useState("mario");
  // this is a hook
  const [names, setNames] = useState("mario");
  const [age, setAge] = useState(25);

  const [blogs, setBlogs] = useState([
    { title: "My new website", body: "lorem ipsum...", author: "mario", id: 1 },
    { title: "Welcome Party", body: "lorem ipsum...", author: "ben", id: 2 },
    {
      title: "Web Dev top tips",
      body: "lorem ipsum...",
      author: "mario",
      id: 3
    }
  ]);

  const handleClick = (e) => {
    console.log("hello ninjas", e);
  };

  const handleClickMeAgain = (name, e) => {
    console.log("Hello " + name, e.target);
  };

  const handleThirdButton = () => {
    //names = "luigi";
    //console.log(names);
    setNames("luigi");
    setAge(51);
    console.log("you already clicked");
  };

  const handleDelete = (id) => {
    // if blog Id is not equal to Id, it remians in array; else is moved to newBlogs
    const newBlogs = blogs.filter((blog) => blog.id !== id);
    setBlogs(newBlogs);
  };

  useEffect(() => {
    console.log("use effeect run");
    console.log(names);
  }, [names]);

  return (
    <div className="home">
      <h2>Hompage</h2>
      <p>
        {names} is {age} years old{" "}
      </p>
      <button onClick={handleClick}>Click Me</button>
      <button
        onClick={(e) => {
          handleClickMeAgain("mario", e);
        }}
      >
        Click Me Again
      </button>
      <button onClick={handleThirdButton}>Third Button</button>

      <div className="home">
        <BlogList
          blogs={blogs}
          title="All Blogs!"
          handleDelete={handleDelete}
        />
        <br />

        <BlogList
          blogs={blogs.filter((blog) => blog.author === "mario")}
          title="Mario's Blogs"
          handleDelete={handleDelete}
        />
        <br />
        <button onClick={() => setNames("Luigi")}>Change name</button>
        <p>{names} </p>

        <br />
        <CondRen />
      </div>
    </div>
  );
};

export default Home;
