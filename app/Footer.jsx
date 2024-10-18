"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "next/image";
import { Button } from 'react-bootstrap';
import Inlogo from '../public/images/Inlogo.png';
export default function Footer() {
    const [footerData, setFooterData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFooterData = async () => {
            try {
                const response = await axios.get("https://admin.interimhc.com/api/homes?populate[maincontent][populate]=*");
                setFooterData(response.data.data[0].attributes);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchFooterData();
    }, []);

    if (loading) return // <div>Loading...</div>;
    if (error) return <div>Error loading data</div>;

    return (
        <div className="mainfootersection">
            <div className="footersection1">
                <Container>
                    <Row className="middlealign footerrow">
                        <Col>
                            <h2 className="footerh2">
                                {footerData?.maincontent?.find(content => content.__component === "components.begin-your-senior-s-journey-with-us-heading")?.Heading || "Begin your Senior’s Journey with us!"}
                            </h2>
                        </Col>
                    </Row>
                    <Row className="footerrow middlealign">
                        {footerData?.maincontent?.filter(content => content.__component === "layout.begin-your-senior-s-journey-with-us").map((item, index) => (
                            <Col md="4" key={index} className="footercol" >
                                <Image
                                    src={`https://admin.interimhc.com${item?.image?.data?.attributes?.url}`}
                                    width={item?.image?.data?.attributes?.width || 200}
                                    height={item?.image?.data?.attributes?.height || 100}
                                    alt={item?.image?.data?.attributes?.alternativeText || 'Image'}
                                />
                                <p className="footerp py-4 mx-3">{item?.description || "No description available"}</p>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
            <div className="Awardsec">
                <Container>
                    {/* First Award */}
<Row className="footerrow middlealign">
  {footerData?.maincontent
    ?.filter((content) => content.__component === "components.home-page-awards")
    .slice(0, 1) // Only the first award
    .map((award, index) => (
      <Col md={4} key={index} className="footercol">
        <Image
          className="award-image"
          src={`https://admin.interimhc.com${award?.Img?.data?.attributes?.url}`}
          width={award?.Img?.data?.attributes?.width || 200}
          height={award?.Img?.data?.attributes?.height || 100}
          alt={award?.Img?.data?.attributes?.alternativeText || "Award Image"}
        />
        <p
          className="py-3"
          style={{ color: "#004b66", fontWeight: "600", textAlign: "center" }}
        >
          {award?.Heading || "No heading"}
        </p>
      </Col>
    ))}
</Row>

{/* Second Award */}
<Row className="footerrow middlealign">
  {footerData?.maincontent
    ?.filter((content) => content.__component === "components.home-page-awards")
    .slice(1, 2) // Only the second award
    .map((award, index) => (
      <Col md={4} key={index} className="footercol">
        <Image
          className="award-image"
          src={`https://admin.interimhc.com${award?.Img?.data?.attributes?.url}`}
          width={award?.Img?.data?.attributes?.width || 200}
          height={award?.Img?.data?.attributes?.height || 100}
          alt={award?.Img?.data?.attributes?.alternativeText || "Award Image"}
        />
        <p
          className="py-3"
          style={{ color: "#004b66", fontWeight: "600", textAlign: "center" }}
        >
          {award?.Heading || "No heading"}
        </p>
      </Col>
    ))}
</Row>

{/* Third Award */}
<Row className="footerrow middlealign">
  {footerData?.maincontent
    ?.filter((content) => content.__component === "components.home-page-awards")
    .slice(2, 3) // Only the third award
    .map((award, index) => (
      <Col md={4} key={index} className="footercol">
        <Image
          className="award-image"
          src={`https://admin.interimhc.com${award?.Img?.data?.attributes?.url}`}
          width={award?.Img?.data?.attributes?.width || 200}
          height={award?.Img?.data?.attributes?.height || 100}
          alt={award?.Img?.data?.attributes?.alternativeText || "Award Image"}
        />
        <p
          className="py-3"
          style={{ color: "#004b66", fontWeight: "600", textAlign: "center" }}
        >
          {award?.Heading || "No heading"}
        </p>
      </Col>
    ))}
</Row>
{/* First Award */}
<Row className="footerrow middlealign">
  {footerData?.maincontent
    ?.filter((content) => content.__component === "components.home-page-awards")
    .slice(0, 1) // Only the first award
    .map((award, index) => (
      <Col md={4} key={index} className="footercol">
        <Image
          className="award-image"
          src={`https://admin.interimhc.com${award?.Img?.data?.attributes?.url}`}
          width={award?.Img?.data?.attributes?.width || 200}
          height={award?.Img?.data?.attributes?.height || 100}
          alt={award?.Img?.data?.attributes?.alternativeText || "Award Image"}
        />
        <p
          className="py-3"
          style={{ color: "#004b66", fontWeight: "600", textAlign: "center" }}
        >
          {award?.Heading || "No heading"}
        </p>
      </Col>
    ))}
</Row>

{/* Second Award */}
<Row className="footerrow middlealign">
  {footerData?.maincontent
    ?.filter((content) => content.__component === "components.home-page-awards")
    .slice(1, 2) // Only the second award
    .map((award, index) => (
      <Col md={4} key={index} className="footercol">
        <Image
          className="award-image"
          src={`https://admin.interimhc.com${award?.Img?.data?.attributes?.url}`}
          width={award?.Img?.data?.attributes?.width || 200}
          height={award?.Img?.data?.attributes?.height || 100}
          alt={award?.Img?.data?.attributes?.alternativeText || "Award Image"}
        />
        <p
          className="py-3"
          style={{ color: "#004b66", fontWeight: "600", textAlign: "center" }}
        >
          {award?.Heading || "No heading"}
        </p>
      </Col>
    ))}
</Row>

{/* Third Award */}
<Row className="footerrow middlealign">
  {footerData?.maincontent
    ?.filter((content) => content.__component === "components.home-page-awards")
    .slice(2, 3) // Only the third award
    .map((award, index) => (
      <Col md={4} key={index} className="footercol">
        <Image
          className="award-image"
          src={`https://admin.interimhc.com${award?.Img?.data?.attributes?.url}`}
          width={award?.Img?.data?.attributes?.width || 200}
          height={award?.Img?.data?.attributes?.height || 100}
          alt={award?.Img?.data?.attributes?.alternativeText || "Award Image"}
        />
        <p
          className="py-3"
          style={{ color: "#004b66", fontWeight: "600", textAlign: "center" }}
        >
          {award?.Heading || "No heading"}
        </p>
      </Col>
    ))}
</Row>

                </Container>
            </div>
            {/* Footer Section */}
            <div className="Footer1 py-5" style={{ backgroundColor: '#FEF7F2' }}>
                <Container>
                    <Row >
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
