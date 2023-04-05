import Image from "next/image"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"

import BackButton from "../../components/BackButton"
import LikeButton from "../../components/LikeButton"
import PromptText from "../../components/PromptText"
import getPost from "../../lib/getPost"
import getPostPaths from "../../lib/getPostPaths"

function PostPage({ post }) {
  // Render a loading state if the data is not yet available
  if (!post) {
    return <div>Loading...</div>
  }

  // Destructure the post data
  const { id, prompt, author, image_url, source, likes } = post

  return (
    <Container>
      <Row>
        <Col>
          <BackButton />
        </Col>
      </Row>
      <Row>
        <Col className="px-0">
          <Image
            src={image_url}
            alt={prompt}
            width={1}
            height={1}
            priority
            sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
            style={{ height: "100%", width: "100%" }} //The point is right there!
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <PromptText>{prompt}</PromptText>
          {author && <p>By {author}</p>}
          {source && <p>Source: {source}</p>}
        </Col>
      </Row>
      <Row>
        <Col>
          <LikeButton postId={id} likes={likes} />
        </Col>
      </Row>
    </Container>
  )
}

export async function getStaticProps({ params }) {
  // Fetch the data for the specified post ID
  const postData = await getPost(params.postId)

  // Convert the Date object to a string
  const serializedPosts = JSON.parse(
    JSON.stringify(postData, (key, value) => {
      if (key === "created_at" && value instanceof Date) {
        return value.toISOString()
      }
      return value
    })
  )

  // Return the data as props
  return { props: { post: serializedPosts[0] }, revalidate: 1 }
}

export async function getStaticPaths() {
  // Define the post IDs that exist
  const postIds = await getPostPaths()

  // Generate the paths for each post ID
  const paths = postIds.map((postId) => ({
    params: { postId: postId.id.toString() },
  }))

  // Return the paths
  return { paths, fallback: false }
}

export default PostPage
