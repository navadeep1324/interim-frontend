"use client";
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import styles from './page.module.css';
import Inlogo from '../public/images/Inlogo.png';
import Image from "next/image";
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function SanjoseNavbarDesktopComponent() {
  const [showDropdown, setShowDropdown] = useState(false);

  // Handle hover on "Services" text
  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  // Handle click to redirect to services page on click of "Services" text
  const handleServiceTextClick = (e) => {
    e.preventDefault();
    window.location.href = "/service-areas/san-jose/services";
  };

  return (
    <Navbar expand="lg" className={styles.headerbg}>
      <Container>
        <Navbar.Brand href="/">
          <Image src={Inlogo} width={161} height={70} alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/service-areas/" className="navLinkTitles px-3">Service Areas</Nav.Link>
            
            {/* NavDropdown for desktop */}
            <NavDropdown
              title={<span onClick={handleServiceTextClick}>Services</span>} // Add onClick to the title
              id="navbarScrollingDropdown"
              className="navLinkTitles"
              show={showDropdown}
              onMouseEnter={handleMouseEnter} // Hover to open dropdown
              onMouseLeave={handleMouseLeave} // Leave to close dropdown
            >
              <NavDropdown.Item href="/service-areas/san-jose/services/alzheimers-dementia-care" className='navLinkTitles'>Alzheimers Dementia Care</NavDropdown.Item>
              <NavDropdown.Item href="/service-areas/san-jose/services/companion-care" className='navLinkTitles'>Companion Care</NavDropdown.Item>
              <NavDropdown.Item href="/service-areas/san-jose/services/personal-care" className='navLinkTitles'>Personal Care</NavDropdown.Item>
              <NavDropdown.Item href="/service-areas/san-jose/services/respite-care" className='navLinkTitles'>Respite Care</NavDropdown.Item>
              <NavDropdown.Item href="/service-areas/san-jose/services/veteran-care" className='navLinkTitles'>Veteran Care</NavDropdown.Item>
              <NavDropdown.Item href="/service-areas/san-jose/services/24-hour-care" className='navLinkTitles'>24 Hour Care</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="https://www.interimhealthcare.com/careers" className="navLinkTitles px-3" target="_blank">Careers</Nav.Link>
            <Nav.Link href="/contact-us" className="navLinkTitles px-3">Contact Us</Nav.Link>
            <Button className={styles.buttonhome} href="tel:+1 408-286-6888">+1 408-286-6888</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
