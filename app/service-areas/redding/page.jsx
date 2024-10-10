"use client";
import React, { useEffect, useState } from "react";
import CityNavbarComponent from "../../citynavcomponent";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap-icons/font/bootstrap-icons.css";
import FormComponent from "../..//homeformcomponent";
import Image from "next/image";
import CaregiverCityComponent from "../..//caregiversComponentMainCity";
import CitypageFooter from "../../CitypageFooter";
import ReddingNavbarComponent from "../../reddingnavcomponent";
import ReddingservicesComponent from "../../reddingservicesComponent";

export default function ReddingComponent() {
    const [data, setData] = useState(null); // State for API data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        fetch("https://admin.interimhc.com/api/reddings?populate[maincontent][populate]=*")
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData?.data?.[0]?.attributes?.maincontent) {
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

    // Helper function to get image URL (if images are available)
    const getImageUrl = (imageData) => {
        return imageData ? `https://admin.interimhc.com${imageData.url}` : "";
    };

    // Helper to render paragraph content
// Helper to render paragraph content with links, all having the "phone-link" class
const renderDescription = (description) => {
    return description?.map((para, index) => {
        let text = para.children?.[0]?.text || "";  // Get the text content
        const part2 = para.children?.[1]?.text || "";  // Handle any additional text part

        // Replace full phrases in text with corresponding links
        Object.keys(textLinks).forEach((linkKey) => {
            const link = `<a href="${textLinks[linkKey]}" class="phone-link" target="_blank" rel="noopener noreferrer">${linkKey}</a>`;
            text = text.replace(linkKey, link); // Replace matching phrases with links that have class "phone-link"
        });

        return (
            <div key={index}>
                <p dangerouslySetInnerHTML={{ __html: text }}></p> {/* Render text with links */}
                <p key={`${index}-part2`}>
                    {part2}
                </p>
            </div>
        );
    });
};


// Mapping for specific text to URLs
const textLinks = {
    "Census Bureau": "https://data.census.gov/vizwidget?g=160XX00US0659920&infoSection=Older%20Population",
    "employment rate at 54.8%": "https://data.census.gov/profile/Redding_city,_California?g=160XX00US0659920#employment",
    "Enhancing the daily lives": "https://your-website.com/enhancing-lives",
};

    // City links mapping with '#' for all cities for now
    const cityLinks = {
        "Anderson": "/service-areas/redding/anderson",
        "Bella vista": "/service-areas/redding/bella-vista",
        "Burney": "/service-areas/redding/burney",
        "Castle": "/service-areas/redding/castle-hill",
        "Corning": "/service-areas/redding/corning",
        "Cottonwood": "/service-areas/redding/cottonwood",
        "Dunsmuir": "/service-areas/redding/dunsmuir",
        "Hat Creek": "/service-areas/redding/hat-creek",
        "Lake Shastina": "/service-areas/redding/shastina",
        "Montague": "/service-areas/redding/montague",
        "Rancho Tehama": "/service-areas/redding/rancho-tehama",
        "Round Mt": "/service-areas/redding/round-mt",
        "Shasta Lake City": "/service-areas/redding/shastina",
        "Tehama County": "/service-areas/redding/rancho-tehama",
        "Fall River": "/service-areas/redding/fall-river",
        "Hornbrook": "/service-areas/redding/hornbook",
        "Los Molinos": "/service-areas/redding/molino",
        "Mt. Shasta": "/service-areas/redding/mt-shasta",
        "Red Bluff": "/service-areas/redding/red-bluff",
        "Shasta": "/service-areas/redding/shasta",
        "Shingletown": "/service-areas/redding/shingle-town",
        "Weed": "/service-areas/redding/weed",
        "Johnson Park": "/service-areas/redding/johnson-park",
        "Montgomery Creek": "/service-areas/redding/montgomery-creek",
        "Palo Cedro": "/service-areas/redding/palo-cedro",
        "Redding": "/service-areas/redding/",
        "Shasta County": "#",
        "Siskiyou County": "#",
        "Yreka": "/service-areas/redding/yreka",
    };

    return (
        <div>
            <ReddingNavbarComponent />
            {/* Banner Section */}
            <div className="section1bannersanjose">
                <Container>
                    <Row className="section1row">
                        <Col md={7} className="py-5">
                            <h1>{data[0]?.Heading}</h1>
                            <p className="py-3">{data[0]?.subHeading}</p>
                            <p>
                                Contact our care team today at <a href="tel:530-221-1212" className="phone-link">+1 530-221-1212</a> to schedule a free consultation.
                            </p>
                            <div className="flex py-3">
                                <div className="iconhome">
                                    <i className="bi bi-geo-alt"></i>
                                </div>
                                <div className="icontext px-2">
                                    <b>Serving:</b>
                                </div>
                                <div className="citynames">
                                    Shasta County | Tehama County | Siskiyou County
                                </div>
                            </div>
                        </Col>
                        <Col md={5} className="formcoloumcity">
                            <FormComponent />
                        </Col>
                    </Row>
                </Container>
            </div>

            
            {/* Service Component */}
            <div>
                <ReddingservicesComponent />
            </div>

            {/* Caregiver Section */}
            <div className="sectioncaregiversbg">
                <CaregiverCityComponent />
            </div>

            <div className="section2city">
    <Container fluid>
        <Row className="py-4 g-4">
            <Col md={6} xs={12} className="px-0">
                <Image
                    src={getImageUrl(data[1]?.image?.data?.attributes)}
                    alt="City Image"
                    width={data[1]?.image?.data?.attributes?.width}
                    height={data[1]?.image?.data?.attributes?.height}
                    className="img-fluid"
                />
            </Col>
            <Col md={6} className="sanjose-col">
                <h2 className="heading2 py-4">{data[1]?.Heading}</h2>
                <p className="py-2">{renderDescription(data[1]?.description)}</p> {/* Render description with links */}
            </Col>
        </Row>
    </Container>
</div>


            <div className="section3city py-5">
                <Container fluid>
                    <Row className="row-reverse-mobile">
                        <Col md={6} className="sanjose-col">
                            <h2 className="heading2sanjose py-4">{data[2]?.Heading}</h2>
                            <p>{data[2]?.description?.[0]?.children?.[0]?.text}</p>
                            <h5 className="heading5subcity">Key reasons why Interim Healthcare is the best choice:    </h5>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }} className="py-4">
                <li><p><b>Quality of Living:</b>Enhancing the daily lives of those we care for. </p>  </li>
                <li><p><b>Comfort for Families:  </b>Providing peace of mind through reliable care.</p>  </li>
                <li><p><b>Veterans Support: </b>Dedicated services for our veterans. </p>  </li>
                <li><p><b>Ease of Payments: </b>Flexible payment options to fit your needs. </p>  </li>
                <li><p><b>End-of-Life Care: </b>Compassionate support during life's final stages. </p>  </li>
                
             </ul>

                        </Col>
                        <Col md={6} xs={12} className="px-3">
                            <Image
                                src={getImageUrl(data[2]?.image?.data?.attributes)}
                                alt="City Image"
                                width={data[2]?.image?.data?.attributes?.width}
                                height={data[2]?.image?.data?.attributes?.height}
                                className="img-fluid"
                            />
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Section 4 (Why Families Prefer Our Home Care Services) */}
            <div className="section4city py-5">
                <Container>
                    <Row className="py-3 g-4">
                        <Col md={2}></Col>
                        <Col md={8} xs={12}>
                            <h2 className="heading2" style={{ textAlign: 'center' }}>
                                {data[4]?.Heading}
                            </h2>
                            <p style={{ textAlign: 'center' }} className="py-2">
                                {data[4]?.subHeading}
                            </p>
                        </Col>
                        <Col md={2}></Col>
                    </Row>
                    <Row className="py-4 g-4">
                        <Col md={6} xs={12} className="px-3">
                            <Image
                                src={getImageUrl(data[4]?.img?.data?.attributes)}
                                alt="Service Image"
                                width={data[4]?.img?.data?.attributes?.width}
                                height={data[4]?.img?.data?.attributes?.height}
                                className="img-fluid"
                            />
                        </Col>
                        {/* <Col md={6} xs={12} style={{ paddingLeft: '3em', paddingRight: '3em' }}>
                            {renderDescription(data[4]?.description)}
                        </Col> */}
                       <Col md={6} xs={12} style={{ paddingLeft: '3em', paddingRight: '3em' }}>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }} className="py-4">
                <li><p><b>Comfort and Reassurance: </b></p>  
                <p>Seniors feel at ease, knowing their care is personalized to meet their unique needs. </p>
                </li>
                <li><p><b>Respect and Value: </b></p>  
                <p>Our approach ensures that seniors are treated with dignity, with their preferences and wishes always respected.</p>
                </li>
                <li><p><b>Independence and Confidence:s</b></p>  
                <p>With the right support, seniors can maintain their independence, boosting their confidence in daily life. s</p>
                </li>
                <li><p><b>Sense of Dignity: </b></p>  
                <p>Our services help seniors retain their dignity, making them feel respected and valued. </p>
                </li>
                <li><p><b>Familiarity and Belonging:  </b></p>  
                <p>We create a safe and healthy atmosphere that fosters a sense of belonging and comfort. </p>
                </li>
                
                
             </ul>
                            </Col>
                    </Row>
                </Container>
            </div>
            

            {/* Section 5 */}
            <div className="section5city py-5">
                <Container>
                    <Row>
                        <Col>
                            <h2 className="heading2city py-3">{data[5]?.Heading}</h2>
                            <p style={{ textAlign: 'center' }}>
                                {data[5]?.description?.[0]?.children?.[0]?.text}
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Section 6 */}
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

                    {/* Dynamically Render the Cities as Links */}
                    <Row className="subcitysec py-5 px-5 my-4">
                        {data[6]?.description?.slice(2).map((city, index) => {
                            const cityName = city?.children?.[0]?.text || ""; // Extract city name
                            const linkUrl = cityLinks[cityName] || "#"; // Use the link or fallback to '#'

                            return cityName ? (
                                <Col md={4} key={index}>
                                    <div className="flex py-2">
                                        <div className="iconcity">
                                            <i className="bi bi-chevron-right"></i>
                                        </div>
                                        <div>
                                            <p style={{ color: '#004b66' }}>
                                                <b>
                                                    <a href={linkUrl} style={{ color: '#004b66', textDecoration: 'none' }}>
                                                        {cityName}
                                                    </a>
                                                </b>
                                            </p>
                                        </div>
                                    </div>
                                </Col>
                            ) : null;
                        })}
                    </Row>
                </Container>
            </div>

            <CitypageFooter />
        </div>
    );
}
