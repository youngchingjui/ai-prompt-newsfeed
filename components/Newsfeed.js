import ListGroup from "react-bootstrap/ListGroup"

import Post from "./Post"

const Newsfeed = ({ posts }) => (
  <ListGroup>
    {posts.map((post) => (
      <Post key={post.id} post={post} />
    ))}
  </ListGroup>
)

export default Newsfeed
