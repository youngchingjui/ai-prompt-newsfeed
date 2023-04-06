import ListGroup from "react-bootstrap/ListGroup"

import useLikes from "../lib/hooks/useLikes"
import isPostLiked from "../lib/isPostLiked"
import AddPostButton from "./AddPostButton"
import Post from "./Post"

const Newsfeed = ({ posts }) => {
  const likes = useLikes()

  return (
    <div className="d-flex justify-content-center">
      <div className="col-lg-6 col-md-8 col-sm-12 px-0">
        <ListGroup>
          {posts.map((post, index) => (
            <Post
              key={post.id}
              post={post}
              isLiked={isPostLiked({ post_id: post.id, likes })}
              index={index}
            />
          ))}
        </ListGroup>
        <AddPostButton />
      </div>
    </div>
  )
}

export default Newsfeed
