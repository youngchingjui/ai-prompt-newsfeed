import Button from "react-bootstrap/Button"
import Spinner from "react-bootstrap/Spinner"

const SaveButton = ({ isSubmitting, ...props }) => {
  return (
    <Button variant="primary" disabled={isSubmitting} {...props}>
      {isSubmitting ? (
        <Spinner animation="border" size="sm" className="me-2" />
      ) : (
        "Submit"
      )}
    </Button>
  )
}

export default SaveButton
