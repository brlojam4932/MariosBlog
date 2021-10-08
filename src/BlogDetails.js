import { useParams } from "react-router";
import useFetch from "./useFetch";

// use of custom hook here, to fetch the url
const BlogDetails = () => {
  const { id } = useParams();
  const { data: blog, error, isPending } = useFetch('http://localhost:8000/blogs/' + id);

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

        </article>
      ) }

    </div>
  );
}

export default BlogDetails;