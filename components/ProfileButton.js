import { useRouter } from "next/router"
import { signOut } from "next-auth/react"
import { useState } from "react"
import Dropdown from "react-bootstrap/Dropdown"

function ProfileButton({ user }) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  function handleProfileClick() {
    setIsOpen(!isOpen)
  }

  function handleProfilePageClick() {
    router.push("/profile")
    setIsOpen(false)
  }

  return (
    <Dropdown>
      <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
        <span className="ml-2">{user.name}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={handleProfilePageClick}>
          View Profile
        </Dropdown.Item>
        <Dropdown.Item onClick={() => signOut()}>Sign out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default ProfileButton
