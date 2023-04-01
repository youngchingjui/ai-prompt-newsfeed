import ListGroup from "react-bootstrap/ListGroup"

import AddPostButton from "./AddPostButton"
import Post from "./Post"

const Newsfeed = ({ posts }) => (
  <div className="container-fluid">
    <div className="row justify-content-center">
      <div className="col-lg-6 col-md-8 col-sm-10">
        <h1>AI Prompt Newsfeed</h1>
        <ListGroup>
          {posts.map((post, index) => (
            <Post key={post.id} post={post} index={index} />
          ))}
        </ListGroup>
        <AddPostButton />
      </div>
    </div>
  </div>
)

export default Newsfeed
