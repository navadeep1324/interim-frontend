"use client";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "next/image";
import Button from "react-bootstrap/Button";
import SanjoseNavbarComponent from "../../../sanjosenavcomponent";
import FormComponent from "../../../homeformcomponent";
import SubcityCaregiversComponent from "../../../SubCityCaregiversComponent";
import CitypageFooter from "../../../CitypageFooter";
import SanJoseservicesComponent from "../../../sanjoseservicecomponent";
import SanJoseFooter from "../../../footersanjose";
import CaregiverCityComponent from "../../../caregiversComponentMainCity";

export default function SanJoseCupertinoComponent() {
    const [cupertinoData, setCupertinoData] = useState(null);

    useEffect(() => {
        async function fetchCupertinoData() {
            const response = await fetch(
                "https://admin.interimhc.com/api/cupertino-cas?populate[maincontent][populate]=*"
            );
            const data = await response.json();
            console.log(data); // For debugging
            setCupertinoData(data.data[0].attributes.maincontent);
        }

        fetchCupertinoData();
    }, []);

    if (!cupertinoData) {
        return <div>Loading...</div>;
    }

    const getFullImageUrl = (relativeUrl) => {
        return `https://admin.interimhc.com${relativeUrl}`;
    };

    // Render content with links
    const renderTextContent = (content) => {
        return content?.children?.map((item, idx) => {
            if (item.type === "link") {
                const isExternalLink = item.url.startsWith("http");
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
            } else if (item.bold) {
                return <b key={idx}>{item.text}</b>;
            } else {
                return <span key={idx}>{item.text}</span>;
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
                            <h2 className="subcityheading">{cupertinoData[0]?.Heading}</h2>
                            <p className="py-3">{cupertinoData[0]?.subHeading}</p>
                            <p>
                                For a quick consultation, give us a call at{" "}
                                <a href="tel:4082866888" className="phone-link">
                                    +1 (408) 286-6888
                                </a>{" "}
                                and let us help you with the right care plan!
                            </p>
                            <SubcityCaregiversComponent />
                        </Col>
                        <Col md={4} className="formcoloumcity">
                            <FormComponent />
                        </Col>
                    </Row>
                </Container>
            </div>

            <div style={{ backgroundColor: "#015979", height: "145px" }}></div>
            <div>
                <SanJoseservicesComponent />
            </div>
            <CaregiverCityComponent />

        {/* Section rendering description with links */}
        <div>
            <Container fluid>
            <Row className="py-5">
                <Col md={6} className="px-0">
                <Image
                    src={getFullImageUrl(cupertinoData[2].image?.data?.attributes.url)}
                    alt="Cupertino Main Image"
                    width={600}
                    height={400}
                />
                </Col>
                <Col md={6} style={{ paddingLeft: "25px" }}>
                <h2 className="heading2">{cupertinoData[2]?.Heading}</h2>
                {cupertinoData[2]?.description.map((desc, index) => (
                    <p className="py-3" key={index}>
                    {renderTextContent(desc)}
                    </p>
                ))}
                </Col>
            </Row>
            </Container>
        </div>

            <div className="section3subcity py-5">
                <Container>
                    <Row>
                        <Col>
                            <h2 className="heading2" style={{ color: "#ffff", textAlign: "center" }}>
                                {cupertinoData[3]?.Heading}
                            </h2>
                            <p className="py-3" style={{ color: "#ffff", textAlign: "center" }}>
                                {cupertinoData[3]?.subHeading}
                            </p>
                        </Col>
                    </Row>
                </Container>
                <Container className="section4subcity py-5">
                    <Row>
                        <Col md={8} className="px-5">
                            <h5 className="heading5subcity">
                                {cupertinoData[3]?.description[0]?.children[0]?.text}
                            </h5>
                            {cupertinoData[3]?.description.map((desc, index) => (
                                <p className="py-1" key={index}>
                                    {renderTextContent(desc)}
                                </p>
                            ))}
                        </Col>
                        <Col md={4}>
                            {cupertinoData[3]?.img?.data?.attributes?.url && (
                                <Image
                                    src={getFullImageUrl(cupertinoData[3].img.data.attributes.url)}
                                    alt="Cupertino Image"
                                    width={cupertinoData[3].img.data.attributes.width || 500} // Provide default width if not available
                                    height={cupertinoData[3].img.data.attributes.height || 500} // Provide default height if not available
                                />
                            )}
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Another section with images and content */}
            <div className="py-5">
                <Container>
                    <Row>
                        <Col md={6} style={{ paddingRight: "25px" }}>
                            <Image
                                src="/images/Cupertino2.png"
                                alt="Cupertino Image 2"
                                width={500}
                                height={300}
                            />
                        </Col>
                        <Col md={6} style={{ paddingLeft: "25px" }}>
                            <h2 className="heading2">{cupertinoData[4]?.Heading}</h2>
                            {/* {cupertinoData[4]?.description.map((desc, index) => (
                    <p className="py-3" key={index}>
                    {renderTextContent(desc)}
                    </p>
                ))} */}
                            <p className="">Our mission is to make in home care affordable for all elders living in Cupertino, CA. We believe that everyone deserves access to high-quality home care services, regardless of their financial situations. Our knowledgeable staff is here to assist your aging adults every step of the way with these services:
                            </p>
                            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }} className="py-4">
                                <li><p>Medicaid assistance</p></li>
                                <li><p>Self-pay options</p></li>
                                <li><p>Long-term Care Insurance plans</p></li>
                                <li><p>Veteran benefits guidance</p></li> </ul>
                            <p>We are committed to bridging the gap between quality home care and affordability in Cupertino, California. Our goal is rooted in the belief that every elder deserves access to exceptional care in their golden years.</p>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className="section5city py-5">
                <Container>
                    <Row>
                        <Col>
                            <h2 className="heading2city py-3">{cupertinoData[5]?.Heading}</h2>
                            {cupertinoData[5]?.description.map((desc, index) => (
                                <p style={{ textAlign: "center" }} key={index}>
                                    {renderTextContent(desc)}
                                </p>
                            ))}
                        </Col>
                    </Row>
                </Container>
            </div>

            <SanJoseFooter />
        </div>
    );
}
