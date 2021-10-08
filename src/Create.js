import { useState } from "react";
import { useHistory } from 'react-router-dom';

const Create = () => {

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("mario");
  const [isPending, setIsPending] = useState(false); // request is halted until it's requested by the form
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    // we create an object onSubmit, in order to save the blog into the JSON file
    const blog = { title, body, author };
    //console.log(blog);

    setIsPending(true); //...pending is set to true once the request begins

    // asynchronous call and it returns a promise - we stringify the new blog and save it to JSON
    fetch('http://localhost:8000/blogs', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog)
    }).then(() => { // returns a promise
      console.log('new blog added');
      setIsPending(false); // set fetching to false once it's completed
      // history.go(-1); // to navigate back in history
      history.push('/'); // push to home
    })
    
  }

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Blog author:</label>
        <select
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
          <option value="mario">mario</option>
          <option value="yoshi">yoshi</option>
        </select>

        { !isPending && <button>Add Blog</button> }
        {isPending && <button disabled>Adding...Blog</button> }
      </form>
    </div>

  );
}

export default Create;

// web forms / controlled inputs / input fields
// track their values, store into states in sync

// button: if is pending NOT true => add a blog
// button: if isPending true => disable button; adding...blog

/*
<p>{ title }</p> 
        <p>{ body }</p> 
        <p>{ author }</p> 
*/
