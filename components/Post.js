import Image from "next/image"
import Link from "next/link"
import Container from "react-bootstrap/Container"
import ListGroup from "react-bootstrap/ListGroup"

import LikeButton from "./LikeButton"
import PromptText from "./PromptText"

const Post = ({ post, index, isLiked }) => {
  if (!post) {
    return null
  }

  const { prompt, image_url, likes, views, id } = post

  return (
    <Link
      href={`/post/${id}`}
      style={{ color: "inherit", textDecoration: "none" }}
    >
      <ListGroup.Item className="border-0 px-0 py-2 mb-3">
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "1000px",
            maxHeight: "50vh",
            overflow: "hidden",
          }}
        >
          <Image
            src={image_url}
            fill={true}
            alt={prompt}
            style={{ objectFit: "cover" }}
            priority={index < 3}
          />
        </div>
        <Container>
          <PromptText>{prompt}</PromptText>
          <div>
            <LikeButton
              key={isLiked} // Resets state when isLiked is loaded
              postId={id}
              likes={likes}
              isLikedInit={isLiked}
            />
          </div>
        </Container>
      </ListGroup.Item>
    </Link>
  )
}

export default Post
