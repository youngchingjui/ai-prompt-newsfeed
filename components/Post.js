import Image from "next/image"
import { Badge } from "react-bootstrap"
import ListGroup from "react-bootstrap/ListGroup"

const Post = ({ post }) => {
  const { title, content, imageUrl, likes, views } = post
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
          src={imageUrl}
          fill={true}
          alt={title}
          style={{ objectFit: "cover" }}
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
        {content}
      </p>
      <div>
        <Badge variant="secondary" className="mr-2">
          {likes} likes
        </Badge>
        <Badge variant="secondary">{views} views</Badge>
      </div>
    </ListGroup.Item>
  )
}

export default Post
