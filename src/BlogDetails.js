import { useHistory, useParams } from "react-router";
import useFetch from "./useFetch";

// use of custom hook here, to fetch the url
const BlogDetails = () => {
  const { id } = useParams();
  const { data: blog, error, isPending } = useFetch('http://localhost:8000/blogs/' + id);
  const history = useHistory();

  // we create a function to associate the onClick delete button
  const handleDelete = () => {
    fetch('http://localhost:8000/blogs/' + blog.id, { // I think we can use either id or blog.id
      method: "DELETE"
    }).then(() => {
      history.push('/'); // push takes us back to home page

    })
  }

  // the && operator only evaluates the right side if the left side is true
  return (
    <div className="blog-details">
      { isPending && <div>Loading...</div>  }
      { error && <div>{ error}</div> }
      { blog && (
        <article>
          <h2>{ blog.title}</h2>
          <p>Written by { blog.author } </p>
          <div>{ blog.body }</div>
          <button onClick={handleDelete} >delete</button>

        </article>
      ) }

    </div>
  );
}

export default BlogDetails;