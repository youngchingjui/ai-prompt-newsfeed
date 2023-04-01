import { useSession } from "next-auth/react"
import { useState } from "react"
import Button from "react-bootstrap/Button"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"

import updateLikeCount from "../lib/updateLikeCount"

const LikeButton = ({ postId, likes }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(likes)
  const { data: session } = useSession()

  const handleLikeClick = async () => {
    const newLikeCount = isLiked ? likeCount - 1 : likeCount + 1
    setIsLiked(!isLiked)
    setLikeCount(newLikeCount)
    updateLikeCount(postId, newLikeCount)
  }

  const renderTooltip = (props) => (
    <Tooltip id="like-tooltip" {...props}>
      Sign in to like this post.
    </Tooltip>
  )

  const disabledButton = (
    <Button variant="outline-secondary">{likeCount} Likes</Button>
  )

  if (!session) {
    return (
      <OverlayTrigger placement="top" overlay={renderTooltip}>
        {disabledButton}
      </OverlayTrigger>
    )
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
