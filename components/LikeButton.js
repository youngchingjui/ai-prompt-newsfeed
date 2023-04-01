import { useState } from "react"
import Button from "react-bootstrap/Button"

import updateLikeCount from "../lib/updateLikeCount"

const LikeButton = ({ postId, likes }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(likes)

  const handleLikeClick = async () => {
    const newLikeCount = isLiked ? likeCount - 1 : likeCount + 1
    setIsLiked(!isLiked)
    setLikeCount(newLikeCount)
    updateLikeCount(postId, newLikeCount)
  }

  return (
    <Button
      variant={isLiked ? "primary" : "outline-primary"}
      onClick={handleLikeClick}
    >
      {likeCount} Likes
    </Button>
  )
}

export default LikeButton
