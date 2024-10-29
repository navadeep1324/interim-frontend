"use client";
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Expect1 from "/public/images/Expect1.webp";
import Expect2 from "/public/images/Expect2.webp"
import Expect3 from "/public/images/Expect3.webp";
import Image from "next/image";
import contactbgimg from "/public/images/contactbgimg.png";
import FormComponent from "./homeformcomponent";
import Inlogo from '../public/images/Inlogo.png';
import { Button } from 'react-bootstrap';
import { FaFacebook, FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa'; // Social media icons
export default function RenoFooter() {
        
    return (

        <div>
               <div className="footersection1 py-5 Awardsec"> 
                <Container>
                    <Row>
                        <Col><h2 className="footerh2 py-3">Begin your Senior’s Journey with us!
                        </h2></Col>
                    </Row>
                    <Row className="footerrow middlealign ">
                        <Col md="4" className="footercol footer-all"><Image className="award-image" src={Expect1}/>
                        <p className="footerp py-4 mx-3">Contact your local Interim Healthcare office to set up a free initial assessment.</p></Col>
                        <Col md="4" className="footercol footer-all"><Image className="award-image" src={Expect2}/>
                        <p className="footerp py-4 mx-3">Our team shall craft a care plan which is best suited to your loved ones’ needs.
                        </p></Col>
                        <Col md="4" className="footercol footer-all"><Image className="award-image" src={Expect3}/>
                        <p className="footerp py-4 mx-3">Our compassionate and trained caregivers shall come to your home to provide the selected services.
                        </p></Col>
                    </Row>
                </Container>
            </div>
            
            
              {/* Footer Section */}
              <div className="Footer1 py-5" style={{ backgroundColor: '#FEF7F2' }}>
                <Container>
                    <Row>
                        {/* First Column: Logo and Buttons */}
                        <Col md={4}>
                            <Image
                                src={Inlogo}
                                width={161}
                                height={70}
                                alt="Company Logo"
                            />
                            <Button className="Contactbtn py-3 my-4 Contactbtn-footer " href="/service-areas" >Find a Location</Button>
                            <Button className="Contactbtn py-3 my-4 Contactbtn-footer" target="_blank" href="https://www.interimhealthcare.com/careers">Careers</Button>
                        </Col>

                        {/* Second Column: Services */}
                        <Col md={4}>
                            <h5 className="footer-services"> Services</h5>
                            <ul style={{ listStyleType: 'none', padding: 0 }}>
                                <li><a href="/service-areas/reno/services/alzheimers-dementia-care"  className="footer-list-services">Alzheimers Dementia Care</a></li>
                                <li><a href="service-areas/reno/services/companion-care" className="footer-list-services">Companion Care</a></li>
                                <li><a href="/service-areas/reno/services/personal-care" className="footer-list-services">Personal Care</a></li>
                                <li><a href="/service-areas/reno/services/respite-care" className="footer-list-services">Respite Care</a></li>
                                <li><a href="/service-areas/reno/services/veteran-care" className="footer-list-services">Veteran Care</a></li>
                                <li><a href="/service-areas/reno/services/24-hour-care" className="footer-list-services">24 Hour Care</a></li>
                            </ul>
                        </Col>

                        {/* Third Column: Address and Social Media */}
                        <Col md={4}>
                        <h5 className="footer-services "> Get In Touch</h5>
                            <p className="py-3">5470 Kietzke Ln #300,<br></br>
                            Reno, NV 89511, USA</p>
                            <p className="py-2"><a href="tel:775-335-3155">+1 775-335-3155</a></p>
                            <div className="social-icons">
                                <a href="https://www.facebook.com/InterimHealthCareRenoNV" target="_blank" rel="noopener noreferrer" >
                                    <FaFacebook size={30} />
                                </a>
                                <a href="https://www.instagram.com/interim_reno/" target="_blank" rel="noopener noreferrer">
                                    <FaInstagram size={30} />
                                </a>
                                <a href="https://x.com/InterimReno" target="_blank" rel="noopener noreferrer">
                                    <FaTwitter size={30} />
                                </a>
                                <a href="https://www.linkedin.com/company/interim-health-care-of-reno-nv/" target="_blank" rel="noopener noreferrer">
                                    <FaLinkedin size={30} />
                                </a>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Copyright Section */}
            <div className="corprights py-3" style={{ backgroundColor: '#d9534f' }}>
                <Container>
                    <Row>
                        <Col>
                            <p style={{ color: '#fff', textAlign: 'center' }}>Copyright ©2024 | All Rights Reserved</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}
