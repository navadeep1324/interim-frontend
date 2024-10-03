"use client";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SanjoseNavbarComponent from "../../../sanjosenavcomponent";
import FormComponent from "../../../homeformcomponent";
import SubcityCaregiversComponent from "../../../SubCityCaregiversComponent";
import Image from "next/image";
import Button from 'react-bootstrap/Button';
import SanJoseservicesComponent from "../../../sanjoseservicecomponent";
import SanJoseFooter from "../../../footersanjose";
import CaregiverCityComponent from "../../../caregiversComponentMainCity";

export default function LosGatosPage() {
    const [content, setContent] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("https://api.interimhc.com/api/los-gatos-californias?populate[maincontent][populate]=*");
            const data = await response.json();
            setContent(data.data[0].attributes.maincontent);
        };
        fetchData();
    }, []);

    if (!content) {
        return <p>Loading...</p>;
    }

    const renderWithLineBreaks = (text) => {
        if (!text) return null;
        return text.split("\n").map((line, index) => (
            <React.Fragment key={index}>
                {line}
                {index < text.split("\n").length - 1 && <br />}
            </React.Fragment>
        ));
    };


    const renderTextContent = (content) => {
        if (!Array.isArray(content)) {
            return null; // Return null if content is not an array
        }
    
        return content.map((item, idx) => {
            if (item.type === "link") {
                const isExternalLink = item.url.startsWith("http") || item.url.startsWith("tel");
                return (
                    <a
                        key={idx}
                        href={item.url}
                        className="phone-link"
                        target={isExternalLink ? "_blank" : "_self"}
                        rel={isExternalLink ? "noopener noreferrer" : undefined}
                    >
                        {item.children[0]?.text}
                    </a>
                );
            } else if (item.type === "text") {
                // Handle new lines in text by splitting and wrapping in paragraphs
                return item.text.split("\n").map((line, i) => (
                    <React.Fragment key={i}>
                        {line}
                        {i < item.text.split("\n").length - 1 && <br />}
                    </React.Fragment>
                ));
            } else if (item.type === "paragraph" || item.type === "list-item") {
                return (
                    <p key={idx} className="py-3">
                        {renderTextContent(item.children)}
                    </p>
                );
            } else if (item.type === "list") {
                return (
                    <ul key={idx} style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                        {item.children?.map((listItem, index) => (
                            <li key={index}>
                                {renderTextContent(listItem.children)}
                            </li>
                        ))}
                    </ul>
                );
            }
        });
    };
    

    return (
        <div>
            <SanjoseNavbarComponent />
            <div className="section1subcity py-5">
                <Container fluid className="px-5">
                    <Row>
                        <Col md={8} className="sanjose-banner">
                            <h2 className="subcityheading">{content[0]?.Heading}</h2>
                            <p className="py-3">{renderWithLineBreaks(content[0]?.subHeading)}</p>
                            <p>Reach us today at <a href="tel:4082866888" className="phone-link">+1 (408) 286-6888</a> for detailed information!</p>
                            <SubcityCaregiversComponent />
                        </Col>
                        <Col md={4} className="formcoloumcity">
                            <FormComponent />
                        </Col>
                    </Row>
                </Container>
            </div>
            <div style={{ backgroundColor: '#015979', height: '145px' }}></div>
            <div>
                <SanJoseservicesComponent />
            </div>
            <CaregiverCityComponent />
            <div>
                <Container fluid>
                    <Row className="py-5">
                        <Col md={6} style={{ paddingRight: '25px' }} className="px-0">
                            <Image
                                src={`https://api.interimhc.com${content[1]?.image?.data?.attributes?.url}`}
                                width={626}
                                height={525}
                                alt="Los Gatos Image 1"
                            />
                        </Col>
                        <Col md={6} style={{ paddingLeft: '25px' }}>
                            <h2 className="heading2">{content[1]?.Heading}</h2>
                            {renderTextContent(content[1]?.description || [])}
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="section3subcity py-5">
                <div>
                    <Container>
                        <Row>
                            <Col>
                                <h2 className="heading2" style={{ color: '#ffff', textAlign: 'center' }}>{content[2]?.Heading}</h2>
                                <p className="py-3" style={{ color: '#ffff', textAlign: 'center' }}>
                                    {renderWithLineBreaks(content[2]?.subHeading)}
                                </p>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div>
                    <Container className="section4subcity py-5">
                        <Row>
                            <Col md={6} className="px-5">
                                <h5 className="head5evergreen">The Services we offer include:</h5>
                                {renderTextContent(content[2]?.description || [])}
                            </Col>
                            <Col md={6} className="px-0">
                                <Image
                                    src={`https://api.interimhc.com${content[2]?.img?.data?.attributes?.url}`}
                                    width={626}
                                    height={525}
                                    alt="Los Gatos Image 2"
                                />
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
            <div className="py-5">
                <Container>
                    <Row>
                        <Col md={6} style={{ paddingRight: '25px' }}>
                            <Image
                                src={`https://api.interimhc.com${content[3]?.image?.data?.attributes?.url}`}
                                width={595}
                                height={780}
                                alt="Los Gatos Image 3"
                            />
                        </Col>
                        <Col md={6} style={{ paddingLeft: '25px' }}>
                            <h2 className="heading2">{content[3]?.Heading}</h2>
                            {renderTextContent(content[3]?.description || [])}
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="section5city py-5">
                <Container>
                    <Row>
                        <Col>
                            <h2 className="heading2city py-3">{content[4]?.Heading}</h2>
                            {renderTextContent(content[4]?.description || [])}
                        </Col>
                    </Row>
                </Container>
            </div>
            <SanJoseFooter />
        </div>
    );
}
