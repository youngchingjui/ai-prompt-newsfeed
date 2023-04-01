import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"
import Modal from "react-bootstrap/Modal"
import Row from "react-bootstrap/Row"

import styles from "./index.module.css"

const PostImageModal = ({ imageUrl, prompt, altText, onHide, ...props }) => {
  return (
    <Modal
      className={styles.postImageModal}
      centered
      onHide={onHide}
      {...props}
    >
      <div className={styles.closeButton} onClick={onHide}>
        X
      </div>
      <Row>
        <Col xs={12} md={8} className={styles.modalImageContainer}>
          <Image
            src={imageUrl}
            alt={altText}
            fluid
            className={styles.modalImage}
          />
        </Col>
        <Col xs={12} md={4}>
          <div className={styles.prompt}>{prompt}</div>
        </Col>
      </Row>
    </Modal>
  )
}

export default PostImageModal
