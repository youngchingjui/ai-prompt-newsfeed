import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"

const Header = () => {
  const { data: session } = useSession()

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>
        <Link href="/">AI Asks</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Item>
            <Link href="/">Home</Link>
          </Nav.Item>
          <Nav.Item>
            <Link href="/about">About</Link>
          </Nav.Item>
        </Nav>
        <Nav>
          {session ? (
            <Nav.Item>
              <Nav.Link onClick={() => signOut()}>Sign out</Nav.Link>
            </Nav.Item>
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
