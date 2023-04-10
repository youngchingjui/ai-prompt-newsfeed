import { useRef, useState } from "react"
import Overlay from "react-bootstrap/Overlay"
import Tooltip from "react-bootstrap/Tooltip"

const PromptText = ({ children, props }) => {
  const [copied, setCopied] = useState(false)
  const textTarget = useRef(null)

  const handleCopy = () => {
    navigator.clipboard.writeText("/imagine prompt:" + children)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <>
      <p
        style={{
          color: "#888",
          fontSize: "18px",
          lineHeight: "1.2",
          marginBottom: "1rem",
          marginTop: "0.5rem",
          cursor: "pointer",
        }}
        onClick={handleCopy}
        ref={textTarget}
        {...props}
      >
        {children}
      </p>
      <Overlay target={textTarget.current} show={copied} placement="top">
        {(props) => <Tooltip {...props}>Copied!</Tooltip>}
      </Overlay>
    </>
  )
}

export default PromptText
