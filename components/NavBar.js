/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { signOut } from '../utils/auth';

export default function NavBar() {
  const router = useRouter();
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <div className="mr-5" style={{ position: 'absolute', left: '2%' }}>
          <Image src="/apple-tree.png" width="30px" height="30px" />
        </div>
        <Link passHref href="/">
          <Navbar.Brand>Zues&apos; Garden</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/">
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link passHref href="/plants/plants">
              <Nav.Link>My Plants</Nav.Link>
            </Link>
            <Link passHref href="/beds/beds">
              <Nav.Link>Beds</Nav.Link>
            </Link>
            <Link passHref href="/tasks/tasks">
              <Nav.Link>Tasks</Nav.Link>
            </Link>
            <Link passHref href="/plants/perenualPlants/perenualApi">
              <Nav.Link>Browse More Plants</Nav.Link>
            </Link>
            <Button variant="danger" onClick={() => { signOut(router); }} style={{ position: 'absolute', right: '3%' }}>
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
