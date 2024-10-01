"use client";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "next/image";
import { Button } from 'react-bootstrap';
import Inlogo from '../public/images/Inlogo.png';
import { FaFacebook, FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa'; // Social media icons
export default function CitypageFooter() {
    const [footerData, setFooterData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:1337/api/subcity-caregivers-section?populate[footerabove][populate]=BeginSeniorsJourney.image');
                const json = await res.json();
                setFooterData(json.data.attributes.footerabove);
                console.log(json.data.attributes.footerabove); // Check if the data is correctly fetched
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    if (!footerData) return <div>Loading...</div>;

    // Find the relevant components in footerData
    const footerMain = footerData.find(item => item.__component === "components.footer-main");

    return (
        <div>
            <div className="footersection1 py-5"> 
                <Container>
                    <Row>
                        <Col>
                            <h2 className="footerh2">
                                {footerData.find(item => item.__component === "components.begin-your-senior-s-journey-with-us-heading")?.Heading || "Begin your Senior’s Journey with us!"}
                            </h2>
                        </Col>
                    </Row>
                    <Row style={{ paddingTop: '3em' }}>
                        {footerData.filter(item => item.__component === "components.subcity-caregivers").map((item, index) => (
                            <Col md="4" key={index}>
                  <Image
    src={`http://localhost:1337${item.BeginSeniorsJourney.image.data.attributes.url}`}
    alt={item.BeginSeniorsJourney.image.data.attributes.alternativeText || "Image"}
    width={300} // Fixed width
    height={220} // Fixed height or dynamically fetched
    unoptimized
    quality={100}
    style={{ width: "300px", height: "auto" }} // Inline fixed width
    className="fixed-width-image"
/>


                                <p className="footerp py-4 mx-3">
                                    {item.BeginSeniorsJourney.description}
                                </p>
                            </Col>
                        ))}
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
                                <li><a href="/service-areas/redding/services/alzheimers-dementia-care"  className="footer-list-services">Alzheimers Dementia Care</a></li>
                                <li><a href="service-areas/redding/services/companion-care" className="footer-list-services">Companion Care</a></li>
                                <li><a href="/service-areas/redding/services/personal-care" className="footer-list-services">Personal Care</a></li>
                                <li><a href="/service-areas/redding/services/respite-care" className="footer-list-services">Respite Care</a></li>
                                <li><a href="/service-areas/redding/services/veteran-care" className="footer-list-services">Veteran Care</a></li>
                                <li><a href="/service-areas/redding/services/24-hour-care" className="footer-list-services">24 Hour Care</a></li>
                            </ul>
                        </Col>

                        {/* Third Column: Address and Social Media */}
                        <Col md={4}>
                        <h5 className="footer-services "> Get In Touch</h5>
                            <p className="py-3">1647 Court St,<br></br>
                            Redding, CA 96001</p>
                            <p className="py-2"><a href="tel:530-221-1212">+1 530-221-1212</a></p>
                            <div className="social-icons">
                                <a href="https://www.facebook.com/InterimHealthCareRedding/" target="_blank" rel="noopener noreferrer" >
                                    <FaFacebook size={30} />
                                </a>
                                <a href="https://www.instagram.com/interimhc_reddingca/" target="_blank" rel="noopener noreferrer">
                                    <FaInstagram size={30} />
                                </a>
                                <a href="https://x.com/InterimRedding" target="_blank" rel="noopener noreferrer">
                                    <FaTwitter size={30} />
                                </a>
                                <a href="https://www.linkedin.com/company/interim-health-care-of-redding-ca/" target="_blank" rel="noopener noreferrer">
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
