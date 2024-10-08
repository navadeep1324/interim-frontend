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
            const response = await fetch("https://admin.interimhc.com/api/los-gatos-californias?populate[maincontent][populate]=*");
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
            <div>
                <SanJoseservicesComponent />
            </div>
            <CaregiverCityComponent />
            <div>
                <Container fluid>
                    <Row className="py-5">
                        <Col md={6} style={{ paddingRight: '25px' }} className="px-0">
                            <Image
                                src={`https://admin.interimhc.com${content[1]?.image?.data?.attributes?.url}`}
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
                            <Col md={7} className="px-5">
                                <h5 className="head5evergreen">The Services we offer include:</h5>
                                {renderTextContent(content[2]?.description || [])}
                                <p>Interim HealthCare upholds the highest standards of care with support that promotes dignity, and well-being for elders receiving our senior care services in Los Gatos, CA. </p>
                            </Col>
                            <Col md={5} className="px-0">
                                <Image
                                    src={`https://admin.interimhc.com${content[2]?.img?.data?.attributes?.url}`}
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
                                src={`https://admin.interimhc.com${content[3]?.image?.data?.attributes?.url}`}
                                width={595}
                                height={780}
                                alt="Los Gatos Image 3"
                            />
                        </Col>
                        <Col md={6} style={{ paddingLeft: '25px' }}>
                            <h2 className="heading2">{content[3]?.Heading}</h2>
                            {/* <p className="py-1">{renderTextContent(content[3]?.description || [])}</p> */}
                            <p className="py-2">At Interim, we offer a range of payment options to ensure that seniors in Los Gatos, CA, can access the care they deserve without undue financial burden.  </p>
                            <p>We offer: </p>
                            <p><b>Medicare Coverage Guidance </b></p>
                            <p>Navigating Medicare coverage can be complex therefore our team helps elders understand their benefits and maximize coverage for essential services. </p>
                        <p><b>Medicaid Assistance </b></p>
                        <p>We assist seniors in navigating the application process of Medicaid and ensuring they receive the home care benefits they are entitled to. </p>
                       <p><b>Private Pay Option </b></p>
                       <p>We offer flexible private pay options, and our transparent pricing ensures that elders receive the care they require without hidden costs or surprises. </p>
                       <p><b>Long-Term Care Insurance Support </b></p>
                       <p>Many elders have long-term care insurance policies that can cover home care services. We help them claim it to maximize the benefits. </p>
                      <p><b>Veterans Benefits Coordination </b></p>
                      <p>Veterans and their spouses may be eligible for benefits that cover home care services. We assist them in accessing those VA benefits. </p>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="section5city py-5">
                <Container>
                    <Row>
                        <Col>
                            <h2 className="heading2city py-3">{content[4]?.Heading}</h2>
                           {/* <p style={{ textAlign: 'center' }} className="py-0">{renderTextContent(content[4]?.description || [])} </p> */}
                       <p style={{ textAlign: 'center' }}>Experience the difference with our home care services in Los Gatos, California. From dementia care to diabetes care, we provide a wide range of services to help your loved ones recover from illness and manage chronic conditions effectively. Contact us today at <a href="tel:4082866888" className="phone-link">+1 (408) 286-6888</a> to learn more about our range of home care services. Reach out now and let us brighten your seniors lives with warmth and support. </p>
                        </Col>
                    </Row>
                </Container>
            </div>
            <SanJoseFooter />
        </div>
    );
}
