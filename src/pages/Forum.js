import React, { useState } from "react";

// NOTE: The posts are not persistent and will be lost when the component unmounts.
// Could store the posts in localStorage, within the parent component, in a context, etc...
function Forum(props) {
  const [post, setPost] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [posts, setPosts] = useState([]);

  const handleInputChange = (event) => {
    setPost(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // Trim the post text.
    const postTrimmed = post.trim();

    if(postTrimmed === "") {
      setErrorMessage("A post cannot be empty.");
      return;
    }

    // Create post.
    setPosts([ ...posts, { username: props.username, text: postTrimmed }]);

    // Reset post content.
    setPost("");
    setErrorMessage("");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>New Post</legend>
          <div className="form-group">
            <textarea name="post" id="post" className="form-control" rows="3"
              value={post} onChange={handleInputChange} />
          </div>
          {errorMessage !== null &&
            <div className="form-group">
              <span className="text-danger">{errorMessage}</span>
            </div>
          }
          <div className="form-group">
            <input type="button" className="btn btn-danger mr-5" value="Cancel"
              onClick={() => { setPost(""); setErrorMessage(null); }} />
            <input type="submit" className="btn btn-primary" value="Post" />
          </div>
        </fieldset>
      </form>

      <hr />
      <h1>Forum</h1>
      <div>
      {
        posts.length === 0 ?
          <span className="text-muted">No posts have been submitted.</span>
          :
          posts.map((x) =>
            <div className="border my-3 p-3" style={{ whiteSpace: "pre-wrap" }}>
              <h3 className="text-primary">{x.username}</h3>
              {x.text}
            </div>
          )
      }
      </div>
    </div>
  );
}

export default Forum;
