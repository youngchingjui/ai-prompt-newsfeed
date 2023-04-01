import { useState } from "react"
import Button from "react-bootstrap/Button"
import { FiPlus } from "react-icons/fi"

import AddPostModal from "./AddPostModal"

const AddPostButton = () => {
  const [showModal, setShowModal] = useState(false)

  const handleShowModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)

  return (
    <>
      <div className="position-fixed bottom-0 end-0 mb-3 me-3">
        <Button variant="primary" onClick={handleShowModal}>
          <FiPlus className="me-2" />
          Add Post
        </Button>
      </div>
      <AddPostModal show={showModal} handleCloseModal={handleCloseModal} />
    </>
  )
}

export default AddPostButton
