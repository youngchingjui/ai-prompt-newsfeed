import { useState } from "react"
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"
import Row from "react-bootstrap/Row"
import { FaCopy } from "react-icons/fa"

import generatePermutations from "../../lib/generatePermutations"

const PromptText = ({ index, text }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = (text) => {
    navigator.clipboard.writeText("/imagine prompt:" + text)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <li key={index} style={{ paddingTop: 5, paddingBottom: 5 }}>
      <InputGroup>
        <Form.Control type="text" value={text} readOnly />
        <Button variant="outline-secondary" onClick={() => handleCopy(text)}>
          {copied ? "Copied!" : <FaCopy />}
        </Button>
      </InputGroup>
    </li>
  )
}

const PermutationGenerator = () => {
  const [input, setInput] = useState("")
  const [permutations, setPermutations] = useState([])

  const handleInputChange = (e) => {
    setInput(e.target.value)
    setPermutations(generatePermutations(e.target.value))
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="8">
          <h1>Permutation Generator</h1>
          <Form>
            <Form.Group controlId="samplePrompt">
              <Form.Label>Prompt</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={input}
                onChange={handleInputChange}
                placeholder="Example: origami adorable {orange, black} {rabbit, pig, dragon}, skyrim, kawaii, paper craft, cinematic, white background, high detail, HD, ultra detailed"
              />
              <Form.Text muted>
                Use curly brackets to define options. Separate multiple options
                with commas.
              </Form.Text>
            </Form.Group>
            <h3 className="mt-3">Permutations</h3>
            <ol>
              {permutations &&
                permutations.length > 0 &&
                permutations.map((prompt, index) => (
                  <PromptText key={index} text={prompt} />
                ))}
            </ol>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default PermutationGenerator
