"use client";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import styles from './page.module.css';
import Inlogo from '../public/images/Inlogo.png';
import Image from "next/image";
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function NavbarComponent() {
  return (
    <Navbar expand="lg" className={styles.headerbg}>
      <Container>
        <Navbar.Brand href="/">  <Image
              src={Inlogo}
              width={161}
              height={70}
              alt="Picture of the author"
            /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/service-areas/" className="navLinkTitles px-3">Service Areass</Nav.Link>
            {/* <Nav.Link href="#" className="navLinkTitles px-3">About Us</Nav.Link> */}
            {/* <NavDropdown title="Services" id="navbarScrollingDropdown" className='navLinkTitles'>
              <NavDropdown.Item href="/Alzheimers-Dementia-Care" className='navLinkTitles'> Alzheimers Dementia Care</NavDropdown.Item>
              <NavDropdown.Item href="/CompanionCare" className='navLinkTitles'>Companion Care</NavDropdown.Item>
              <NavDropdown.Item href="/Personal-Care" className='navLinkTitles'>Personal Care</NavDropdown.Item>
              <NavDropdown.Item href="/Respite-Care" className='navLinkTitles'>Respite Care</NavDropdown.Item>
              <NavDropdown.Item href="/Veteran-Care" className='navLinkTitles'>Veteran Care</NavDropdown.Item>
              <NavDropdown.Item href="/24-Hour-Care" className='navLinkTitles'>24 Hour Care</NavDropdown.Item>
            </NavDropdown> */}
            <Nav.Link href="https://www.interimhealthcare.com/careers" className="navLinkTitles px-3" target="_blank" >Careers</Nav.Link>
            <Nav.Link href="/contact-us" className="navLinkTitles px-3">Contact Us</Nav.Link>
            <Button className={styles.buttonhome} href="/service-areas">
            Find Location
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>

    </Navbar>
  );
}