import { useState, useEffect } from "react";
import BlogList from "./BlogList";
import CondRen from "./condRend";
// here we set up a watch something...
// npx json-server --watch src/data/db.json --port 8000

const Home = () => {
  //let names = "mario";

  //useState("mario");
  // this is a hook
  const [names, setNames] = useState("mario");
  const [age, setAge] = useState(25);

  const [blogs, setBlogs] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null); // we store the error in a state; to output to the browser

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

  /*
  const handleDelete = (id) => {
    // if blog Id is not equal to Id, it remians in array; else is moved to newBlogs
    const newBlogs = blogs.filter((blog) => blog.id !== id);
    setBlogs(newBlogs);
  };
  */

  useEffect(() => {
    setTimeout(()=> {
      fetch('http://localhost:8000/blogs')
      .then(res => {
        //console.log(res); // response object

        // this allows us to get back a "response" from the object
        // if the data does not exist, the response is not okay
        // ex. fetch('http://localhost:8000/blah blah blah')
        if(!res.ok) { // if response is NOT ok
          throw Error("could not fetch the data for that resource")
        }
        return res.json();
      })
      .then(data => {
        //console.log(data);
        setBlogs(data);
        setIsPending(false); 
        setError(null); // here, we remove the loading message
      })
      .catch(err => { // this catch block catches network errors, it fires a function
        //console.log(err.message) this can catch some network errors but not all
        setIsPending(false);
        setError(err.message); // this sets our own custom error message but we need to get rid of the loading... message once it's loaded with  setError(null), above
      })
    }, 1000) // setTimeout is just a simulation so we simulate a longer timeframe to fetch data
   
  }, []);

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

