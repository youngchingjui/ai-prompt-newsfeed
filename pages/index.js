import "bootstrap/dist/css/bootstrap.min.css"

import Container from "react-bootstrap/Container"

import Newsfeed from "../components/Newsfeed"
import { getPosts } from "../lib/getPosts"

const MyApp = ({ posts }) => (
  <Container>
    <Newsfeed posts={posts} />
  </Container>
)

export async function getStaticProps() {
  const posts = await getPosts()

  // Convert the Date object to a string
  const serializedPosts = JSON.parse(
    JSON.stringify(posts, (key, value) => {
      if (key === "created_at" && value instanceof Date) {
        return value.toISOString()
      }
      return value
    })
  )

  return { props: { posts: serializedPosts } }
}

export default MyApp
