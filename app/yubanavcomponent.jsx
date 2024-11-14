"use client";
import React, { useState, useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import styles from './page.module.css';
import Inlogo from '../public/images/Inlogo.png';
import Image from "next/image";
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function YubaNavbarComponent() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleServiceClick = (e) => {
    e.preventDefault();
    window.location.href = "/service-areas/yuba/services"; // Redirect to the Services page
  };

  const handleToggleClick = () => {
    setShowDropdown(!showDropdown); // Toggle the dropdown
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false); // Close dropdown when clicking outside
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            
            {/* NavDropdown with click handling */}
            <NavDropdown
              title={
                <span style={{ cursor: 'pointer' }} onClick={handleServiceClick}>
                  Services
                </span>
              }
              id="navbarScrollingDropdown"
              className="navLinkTitles"
              show={showDropdown}
              onClick={handleToggleClick} // Toggle dropdown on click
              ref={dropdownRef}
            >
              <NavDropdown.Item href="/service-areas/yuba/services/alzheimers-dementia-care" className='navLinkTitles'>Alzheimer's & Dementia Care</NavDropdown.Item>
              <NavDropdown.Item href="/service-areas/yuba/services/companion-care" className='navLinkTitles'>Companion Care</NavDropdown.Item>
              <NavDropdown.Item href="/service-areas/yuba/services/personal-care" className='navLinkTitles'>Personal Care</NavDropdown.Item>
              <NavDropdown.Item href="/service-areas/yuba/services/respite-care" className='navLinkTitles'>Respite Care</NavDropdown.Item>
              <NavDropdown.Item href="/service-areas/yuba/services/veteran-care" className='navLinkTitles'>Veteran Care</NavDropdown.Item>
              <NavDropdown.Item href="/service-areas/yuba/services/24-hour-care" className='navLinkTitles'>24 Hour Care</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="https://www.interimhealthcare.com/careers" className="navLinkTitles px-3" target="_blank">Careers</Nav.Link>
            <Nav.Link href="/contact-us" className="navLinkTitles px-3">Contact Us</Nav.Link>
            <Button className={styles.buttonhome} href="tel:+1 530-673-0300">+1 530-673-0300</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
