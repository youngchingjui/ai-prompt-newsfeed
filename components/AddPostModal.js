import axios from "axios"
import { useState } from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Modal from "react-bootstrap/Modal"

const AddPostModal = ({ show, handleCloseModal }) => {
  const [prompt, setPrompt] = useState("")
  const [image, setImage] = useState(null)

  const handleSaveClick = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("prompt", prompt)

    if (image) {
      const fileStream = image.slice(0, image.size, image.type)
      formData.append("image", fileStream, image.name)
    }

    try {
      const response = await axios.post("/api/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      })

      console.log("response", response)

      if (!response.statusText == "OK") {
        throw new Error("Error saving post")
        return
      }

      // Reset form state
      setPrompt("")
      setImage(null)
    } catch (error) {
      console.error(error)
    }
    handleCloseModal()
  }

  return (
    <Modal show={show} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form encType="multipart/form-data">
          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Form.Group>
          <Form.Group controlId="prompt">
            <Form.Label>Prompt</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Enter the prompt used to generate the image, ie 'A person is walking down the street --ar 16:9 --v 5'"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSaveClick}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddPostModal
