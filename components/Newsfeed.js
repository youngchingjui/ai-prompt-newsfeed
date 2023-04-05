import ListGroup from "react-bootstrap/ListGroup"

import AddPostButton from "./AddPostButton"
import Post from "./Post"

const Newsfeed = ({ posts }) => (
  <div className="d-flex justify-content-center">
    <div className="col-lg-6 col-md-8 col-sm-12 px-0">
      <ListGroup>
        {posts.map((post, index) => (
          <Post key={post.id} post={post} index={index} />
        ))}
      </ListGroup>
      <AddPostButton />
    </div>
  </div>
)

export default Newsfeed
