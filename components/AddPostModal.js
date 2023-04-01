import { useState } from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Modal from "react-bootstrap/Modal"

import createPostFormData from "../lib/createPostFormData"
import savePostData from "../lib/savePostData"
import SaveButton from "./SaveButton"

const AddPostModal = ({ show, handleCloseModal }) => {
  const [prompt, setPrompt] = useState("")
  const [image, setImage] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSaveClick = async (e) => {
    e.preventDefault()

    setIsSubmitting(true)

    const formData = createPostFormData(prompt, image)
    await savePostData(formData)

    setIsSubmitting(false)

    // Clear the fields
    setPrompt("")
    setImage(null)

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
        <SaveButton onClick={handleSaveClick} isSubmitting={isSubmitting} />
      </Modal.Footer>
    </Modal>
  )
}

export default AddPostModal
