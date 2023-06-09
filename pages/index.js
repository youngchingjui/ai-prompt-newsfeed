import Newsfeed from "../components/Newsfeed"
import getPosts from "../lib/getPosts"

const MyApp = ({ posts }) => <Newsfeed posts={posts} />

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

  return { props: { posts: serializedPosts }, revalidate: 1 }
}

export default MyApp
