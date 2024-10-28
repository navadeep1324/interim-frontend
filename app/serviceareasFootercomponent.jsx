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
import award1 from "/public/images/award1.png"
import award2 from "/public/images/award2.png"
import award3 from "/public/images/award3.png"
import Sanjoseservice1 from "/public/images/Sanjoseservice1.png";
import Sanjoseservice2 from "/public/images/Sanjoseservice2.png";
import Sanjoseservice3 from "/public/images/Sanjoseservice3.png";
import { FaFacebook, FaLinkedin, FaYoutube } from 'react-icons/fa'; // Social media icons

export default function ServiceAreasFooter() {
        
    return (

        <div>
        
            <div className="footersection1 py-5"> 
                <Container>
                    <Row>
                        <Col><h2 className="footerh2">Begin your Senior’s Journey with us!
                        </h2></Col>
                    </Row>
                    <Row style={{paddingTop:'3em'}}>
                        <Col md="4"><Image src={Expect1}/>
                        <p className="footerp py-4 mx-3">Contact your local Interim Healthcare office to set up a free initial assessment.</p></Col>
                        <Col md="4"><Image src={Expect2}/>
                        <p className="footerp py-4 mx-3">Our team shall craft a care plan which is best suited to your loved ones’ needs.
                        </p></Col>
                        <Col md="4"><Image src={Expect3}/>
                        <p className="footerp py-4 mx-3">Our compassionate and trained caregivers shall come to your home to provide the selected services.
                        </p></Col>
                    </Row>
                </Container>
            </div>
            <div className="Awardsec py-5">
                <Container>
                    <Row>
                        <Col md={4}>
            
                      <Image src={award1} alt="aqard1" style={{alignContent:'center'}}/>
                      <p className="py-3" style={{color:'#004b66',fontWeight:'600',textAlign:'center'}}>National Association of Home Care and Hospice</p>
                      
                        </Col>
                        <Col md={4}>
                        <Image src={award2} alt="aqard1" style={{alignContent:'center'}}/>
                      <p className="py-3" style={{color:'#004b66',fontWeight:'600',textAlign:'center'}}>The Partnership for Quality Home Health                      </p>
                      
                        </Col>
                        <Col md={4}>
                        <Image src={award3} alt="aqard1" style={{alignContent:'center'}}/>
                      <p className="py-3" style={{color:'#004b66',fontWeight:'600',textAlign:'center'}}>Staffing Industry Analysts                     </p>
                      
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
                            <Button className="Contactbtn py-3 my-4 Contactbtn-footer"  target="_blank" href="https://www.interimhealthcare.com/careers">Careers</Button>
                        </Col>

                        {/* Second Column: Services */}
                        <Col md={4}>
                            <h5 className="footer-services"> Services</h5>
                            <ul style={{ listStyleType: 'none', padding: 0 }}>
                                <li><a className="footer-list-services">Alzheimers Dementia Care</a></li>
                                <li><a  className="footer-list-services">Companion Care</a></li>
                                <li><a  className="footer-list-services">Personal Care</a></li>
                                <li><a  className="footer-list-services">Respite Care</a></li>
                                <li><a  className="footer-list-services">Veteran Care</a></li>
                                <li><a className="footer-list-services">24 Hour Care</a></li>
                            </ul>
                        </Col>

                        {/* Third Column: Address and Social Media */}
                        <Col md={4}>
                        <h5 className="footer-services "> Get In Touch</h5>
                            {/* <p className="py-3">901 Campisi Way Suite 360,<br></br>
                            Campbell, CA 95008</p> */}
                            <p className="py-2"><a href="mailto:Support@interimhc.com">Support@interimhc.com</a></p>
                            {/* <div className="social-icons">
                                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" >
                                    <FaFacebook size={30} />
                                </a>
                                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                                    <FaLinkedin size={30} />
                                </a>
                                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                                    <FaYoutube size={30} />
                                </a>
                            </div> */}
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="corprights py-3">
                <Container>
                    <Row>
                        <Col><p style={{color:'#fff', textAlign:'center'}}>Copyright ©2024 | All Rights Reserved</p></Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}