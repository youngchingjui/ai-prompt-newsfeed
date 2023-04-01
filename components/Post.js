import Image from "next/image"
import Badge from "react-bootstrap/Badge"
import ListGroup from "react-bootstrap/ListGroup"

import LikeButton from "./LikeButton"

const Post = ({ post, index }) => {
  const { prompt, image_url, likes, views, id } = post

  return (
    <ListGroup.Item>
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
        />
      </div>
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
        <LikeButton postId={id} likes={likes} />
      </div>
    </ListGroup.Item>
  )
}

export default Post
