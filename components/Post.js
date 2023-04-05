import Image from "next/image"
import { useState } from "react"
import Container from "react-bootstrap/Container"
import ListGroup from "react-bootstrap/ListGroup"

import LikeButton from "./LikeButton"
import PostImageModal from "./PostImageModal"

const Post = ({ post, index }) => {
  const { prompt, image_url, likes, views, id } = post
  const [showImage, setShowImage] = useState(false)

  return (
    <>
      <ListGroup.Item border={false} className="border-0 px-0 py-2">
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "300px",
            overflow: "hidden",
          }}
        >
          <Image
            src={image_url}
            fill={true}
            alt={prompt}
            style={{ objectFit: "cover" }}
            priority={index < 3}
            onClick={() => setShowImage(true)}
          />
        </div>
        <Container>
          <p
            style={{
              color: "#888",
              fontSize: "18px",
              lineHeight: "1.2",
              marginBottom: "1rem",
            }}
          >
            {prompt}
          </p>
          <div>
            <LikeButton postId={id} likes={likes} isLikedInit={is_liked} />
          </div>
        </Container>
      </ListGroup.Item>
      <PostImageModal
        imageUrl={image_url}
        prompt={prompt}
        show={showImage}
        onHide={() => setShowImage(false)}
      />
    </>
  )
}

export default Post
