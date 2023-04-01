import Link from "next/link"
import { signIn, useSession } from "next-auth/react"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"

import ProfileButton from "./ProfileButton"

const Header = () => {
  const { data: session } = useSession()

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>
        <Link href="/">AI Asks</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          {session ? (
            <ProfileButton user={session.user} />
          ) : (
            <Nav.Item>
              <Nav.Link onClick={() => signIn()}>Sign in</Nav.Link>
            </Nav.Item>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header
