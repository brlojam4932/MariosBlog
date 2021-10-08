import { useState } from "react";
import BlogList from "./BlogList";
import CondRen from "./condRend";
import useFetch from "./useFetch";
// here we set up a watch something...
// npx json-server --watch src/data/db.json --port 8000

const Home = () => {
  //let names = "mario";

  //useState("mario");
  // this is a hook
  const [names, setNames] = useState("mario");
  const [age, setAge] = useState(25);


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

  const { data: blogs , isPending, error } = useFetch('http://localhost:8000/blogs');

  /*
  const handleDelete = (id) => {
    // if blog Id is not equal to Id, it remians in array; else is moved to newBlogs
    const newBlogs = blogs.filter((blog) => blog.id !== id);
    setBlogs(newBlogs);
  };
  */

  // logical && evaluates the left first -if false, it does not evaluate the right side; hence Null(false) - - if true, it evaluates the right side and prints to the screen
  return (
    <div className="home">
      { error && <div>{ error} </div> }
      {isPending && <div>Loading...</div>}
      {blogs && <BlogList
        blogs={blogs} 
        title="All Blogs!"/>}

      {isPending && <div>Loading...</div>}
      {blogs && <BlogList
        blogs={blogs.filter((blog) => blog.author === "mario")}
        title="Mario's Blogs" />}

      <button onClick={() => setNames("Luigi")}>Change name</button>
      <p>{names} </p>
      <CondRen />
    </div>

  );
};

export default Home;

