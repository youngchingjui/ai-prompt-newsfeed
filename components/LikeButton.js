import { useSession } from "next-auth/react"
import { useRef, useState } from "react"
import Button from "react-bootstrap/Button"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"

import updateLike from "../lib/updateLike"

const LikeButton = ({ postId, likes, isLikedInit }) => {
  const [isLiked, setIsLiked] = useState(isLikedInit)
  const [likeCount, setLikeCount] = useState(likes)
  const prevLikeCountRef = useRef(likeCount)
  const prevIsLikedRef = useRef(isLiked)
  const { data: session } = useSession()

  const handleLikeClick = async () => {
    // Optimistically update the state
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)
    setIsLiked(!isLiked)

    const result = await updateLike({
      postId,
      userId: session.user.id,
      isLiked,
    })
    if (!result.success) {
      // Revert state if network call fails
      setLikeCount(prevLikeCountRef.current)
      setIsLiked(prevIsLikedRef.current)
    } else {
      // Update previous state on success
      prevLikeCountRef.current = likeCount
      prevIsLikedRef.current = isLiked
    }
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
