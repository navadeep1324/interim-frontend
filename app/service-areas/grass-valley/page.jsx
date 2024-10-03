"use client";
import React, { useEffect, useState } from "react";
import CityNavbarComponent from "../../citynavcomponent";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap-icons/font/bootstrap-icons.css";
import FormComponent from "../../homeformcomponent";
import Image from "next/image";
import GrassValleyserviceComponent from "../../grantpassservicecomponent";
import CaregiverCityComponent from "../../caregiversComponentMainCity";
import GrassValleyNavComponent from "../../grassvalleynavcomponent";
import GrassValleyFooterComponent from "../../footergrassvalley";

export default function GrassValleyComponent() {
    const [data, setData] = useState(null); // State for API data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        fetch("https://api.interimhc.com/api/grass-valleys?populate[maincontent][populate]=*")
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData?.data?.[0]?.attributes?.maincontent) {
                    console.log(responseData.data[0].attributes.maincontent); // Log the data to inspect the structure
                    setData(responseData.data[0].attributes.maincontent);
                } else {
                    throw new Error("Invalid data structure received");
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setError(error.message);
                setLoading(false);
            });
    }, []);
    

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

// Add this console log to check the full structure of data[4]
console.log("Data[4] object: ", data[4]);

// Modify the getImageUrl function to provide a fallback message
const getImageUrl = (imageData) => {
    if (imageData && imageData.url) {
        return `https://api.interimhc.com${imageData.url}`; // Ensure this matches your Strapi instance URL
    }
    return ""; // Return an empty string if there's no image
};




    // Helper function to render paragraph content with links and bold text
    const renderTextWithLinksAndBold = (description) => {
        return description?.map((para, index) => {
            return (
                <p key={index}>
                    {para.children?.map((child, childIndex) => {
                        if (child.type === "link") {
                            return (
                                <a key={childIndex} href={child.url} target="_blank" rel="noopener noreferrer">
                                    {child.children?.[0]?.text}
                                </a>
                            );
                        }
                        if (child.bold) {
                            return <strong key={childIndex}>{child.text}</strong>;
                        }
                        return child.text;
                    })}
                </p>
            );
        });
    };

    // Helper function to render list items and avoid empty bullets
    const renderListItems = (list) => {
        return list?.map((listItem, index) => {
            const text = listItem.children?.[0]?.text;
            // Ensure only non-empty text is rendered
            if (text && text.trim()) {
                return <li key={index}>{text}</li>;
            }
            return null; // Skip empty list items
        });
    };

    return (
        <div>
            <GrassValleyNavComponent />

            {/* Banner Section */}
            <div className="section1banner">
                <Container>
                    <Row className="py-3">
                        <Col md={7} className="py-5" style={{ paddingRight: "4%" }}>
                            <h1>{data[0]?.Heading}</h1>
                            <p className="py-3">{data[0]?.subHeading}</p>
                            <p>
                                Choose us and let them thrive. Call us at <a href="tel:530-272-0300" className="phone-link">+1 530-272-0300</a>
                            </p>
                            <div className="flex py-5" style={{ paddingRight: "8%" }}>
                                <div className="iconhome"><i className="bi bi-geo-alt"></i></div>
                                <div className="icontext px-2"><b>Serving:</b></div>
                                <div className="citynames">Nevada County | Grass Valley | Nevada City</div>
                            </div>
                        </Col>
                        <Col md={5} className="formcoloumcity">
                            <FormComponent />
                        </Col>
                    </Row>
                </Container>
            </div>

            <div style={{ backgroundColor: '#015979', height: '145px' }}></div>

            <GrassValleyserviceComponent />
            <CaregiverCityComponent />

            {/* Section 2 (Left Image, Right Content) */}
            <div className="section2city">
                <Container fluid>
                    <Row className="py-4">
                        <Col md={6} className="px-0">
                            <Image
                                src={getImageUrl(data[1]?.image?.data?.attributes)} // Fetch image dynamically
                                alt="City Image"
                                width={data[1]?.image?.data?.attributes?.width}
                                height={data[1]?.image?.data?.attributes?.height}
                            />
                        </Col>
                        <Col md={6} style={{ paddingLeft: '3em', paddingRight: '3em' }}>
                            <h2 className="heading2 py-4">{data[1]?.Heading}</h2>
                            <div className="py-2">{renderTextWithLinksAndBold(data[1]?.description)}</div>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Section 3 (Right Image, Left Content) */}
            <div className="section3city py-5">
                <Container fluid>
                    <Row>
                        <Col md={6} style={{ paddingRight: '3em', paddingLeft: '3em' }}>
                            <h2 className="heading2 py-4">{data[2]?.Heading}</h2>
                            <div>{renderTextWithLinksAndBold(data[2]?.description)}</div>
                        </Col>
                        <Col md={6}>
                            <Image
                                src={getImageUrl(data[2]?.image?.data?.attributes)} // Fetch image dynamically
                                alt="City Image"
                                width={data[2]?.image?.data?.attributes?.width}
                                height={data[2]?.image?.data?.attributes?.height}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Section 4 */}
            <div className="py-5">
                <Container>
                    <Row>
                        <Col md={4}>
                            <Image
                                src={getImageUrl(data[3]?.image?.data?.attributes)} // Fetch image dynamically
                                alt="City Image"
                                width={data[3]?.image?.data?.attributes?.width}
                                height={data[3]?.image?.data?.attributes?.height}
                            />
                        </Col>
                        <Col md={8} style={{ paddingLeft: '3em' }}>
                            <h2 className="heading2">{data[3]?.Heading}</h2>
                            <div>{renderTextWithLinksAndBold(data[3]?.description)}</div>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Section 5 */}
            <div className="section4city py-5">
                <Container>
                    <Row className="py-3">
                        <Col md={2}></Col>
                        <Col md={8}>
                            <h2 className="heading2" style={{ textAlign: 'center' }}>{data[4]?.Heading}</h2>
                            <p style={{ textAlign: 'center' }} className="py-2">{data[4]?.subHeading}</p>
                        </Col>
                        <Col md={2}></Col>
                    </Row>
                    <Row className="py-4">
                    <Col md={6}>
    <Image
        src={getImageUrl(data[4]?.img?.data?.attributes)} // Corrected image access path
        alt="Service Image"
        width={data[4]?.img?.data?.attributes?.width}
        height={data[4]?.img?.data?.attributes?.height}
    />
</Col>



                        <Col md={6} style={{ paddingLeft: '3em' }}>
                            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }} className="py-2">
                                {renderListItems(data[4]?.description?.[0]?.children)}
                            </ul>
                            {renderTextWithLinksAndBold(data[4]?.description)}
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Section 6 */}
            <div className="section5city py-5">
                <Container>
                    <Row>
                        <Col>
                            <h2 className="heading2city py-3">{data[5]?.Heading}</h2>
                            <div style={{ textAlign: 'center' }}>{renderTextWithLinksAndBold(data[5]?.description)}</div>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Final Section */}
            <div className="section6city py-5">
                <Container>
                    <Row>
                        <Col md={2}></Col>
                        <Col md={8}>
                            <h2 className="heading2citysub">{data[6]?.Heading}</h2>
                            <p style={{ color: '#ffff', textAlign: 'center' }} className="py-2">
                                {data[6]?.description?.[0]?.children?.[0]?.text}
                            </p>
                        </Col>
                        <Col md={2}></Col>
                    </Row>
                    <Row className="subcitysec py-5 px-5 my-4">
                        {/* Render City Names */}
                        {data[6]?.description.slice(2).map((city, index) => (
                            <Col md={4} key={index}>
                                <div className="flex py-2">
                                    <div className="iconcity"><i className="bi bi-chevron-right"></i></div>
                                    <div><p style={{ color: '#004b66' }}><b>{city.children?.[1]?.text}</b></p></div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>

            <GrassValleyFooterComponent />
        </div>
    );
}
