import "bootstrap/dist/css/bootstrap.min.css"

import Container from "react-bootstrap/Container"

import Timeline from "../components/Timeline"
import { posts } from "../data/mockData"

const MyApp = ({ posts }) => (
  <Container>
    <Timeline posts={posts} />
  </Container>
)

export const getStaticProps = async (ctx) => {
  return {
    props: { posts },
  }
}

export default MyApp
