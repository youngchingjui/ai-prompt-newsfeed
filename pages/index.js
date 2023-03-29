import "bootstrap/dist/css/bootstrap.min.css"

import Container from "react-bootstrap/Container"

import Newsfeed from "../components/Newsfeed"
import { posts } from "../data/mockData"

const MyApp = ({ posts }) => (
  <Container>
    <Newsfeed posts={posts} />
  </Container>
)

export const getStaticProps = async (ctx) => {
  return {
    props: { posts },
  }
}

export default MyApp
