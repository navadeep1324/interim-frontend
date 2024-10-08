"use client";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "next/image";
import { Button } from 'react-bootstrap';
import FormComponent from "./homeformcomponent";
import Inlogo from '../public/images/Inlogo.png';
import { FaFacebook, FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa'; // Social media icons
export default function ServicepageFooter() {
  const [journeyData, setJourneyData] = useState([]);
  const [heading, setHeading] = useState('');
  const [footerAboveFormData, setFooterAboveFormData] = useState({});
  const [footerMainData, setFooterMainData] = useState({});

  useEffect(() => {
    async function fetchFooterData() {
      try {
        const res = await fetch('https://admin.interimhc.comapi/alzheimer-s-and-dementia?populate[maincontent][populate]=*');
        const result = await res.json();

        // Extracting "Begin your Senior’s Journey with us!" section
        const journeyHeadingComponent = result.data.attributes.maincontent.find(section => section.__component === "components.begin-your-senior-s-journey-with-us-heading");
        if (journeyHeadingComponent) {
          setHeading(journeyHeadingComponent.Heading);
        }

        const journeyContent = result.data.attributes.maincontent.filter(section => section.__component === "layout.begin-your-senior-s-journey-with-us");
        setJourneyData(journeyContent);

        // Extracting footer above form section
        const footerAboveFormComponent = result.data.attributes.maincontent.find(section => section.__component === "components.footer-above-from");
        if (footerAboveFormComponent) {
          setFooterAboveFormData(footerAboveFormComponent);
        }

        // Extracting footer main section
        const footerMainComponent = result.data.attributes.maincontent.find(section => section.__component === "components.footer-main");
        if (footerMainComponent) {
          setFooterMainData(footerMainComponent);
        }
      } catch (error) {
        console.error('Error fetching footer data:', error);
      }
    }
    fetchFooterData();
  }, []);

  return (
    <div>
      <div className="footersection1">
        <Container>
          <Row className="py-5">
            <Col><h2 className="footerh2">{heading || "Begin your Senior’s Journey with us!"}</h2></Col>
          </Row>
          <Row>
            {journeyData.map((item, index) => (
              <Col md="4" key={index}>
                {item.image?.data?.attributes && (
                  <img 
                    src={`http://localhost:1337${item.image.data.attributes.url}`} 
                    alt={`Journey ${index + 1}`} 
                    width={item.image.data.attributes.width}
                    height={item.image.data.attributes.height}
                  />
                )}
                <p className="footerp py-4">{item.description}</p>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
      <div className="contactsecbg"></div>
      <div className="footersec py-5">
        <Container>
          <Row>
            <Col md={6}>
              <h2 className="servicefooterh2">{footerAboveFormData.Heading}</h2>
              <p className="py-4">{footerAboveFormData.description}</p>
            </Col>
            <Col md={6} className="formcoloum py-5 px-5">
              <FormComponent />
            </Col>
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
