const isPostLiked = ({ post_id, likes }) => {
  // Return true if post_id is in likes
  return likes.some((like) => like.post_id === post_id)
}

export default isPostLiked
