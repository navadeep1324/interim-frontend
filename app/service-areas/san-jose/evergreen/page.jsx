"use client";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SanjoseNavbarComponent from "../../../sanjosenavcomponent";
import FormComponent from "../../../homeformcomponent";
import SubcityCaregiversComponent from "../../../SubCityCaregiversComponent";
import SanJoseservicesComponent from "../../../sanjoseservicecomponent";
import SanJoseFooter from "../../../footersanjose";
import CaregiverCityComponent from "../../../caregiversComponentMainCity";
import Head from "next/head";
export default function EvergreenComponent() {
    const [data, setData] = useState(null);
    const [seoData, setSeoData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('https://admin.interimhc.com/api/evergreen-cas?populate[maincontent][populate]=*&populate[seo]=*');
                const json = await res.json();
                setData(json.data[0].attributes.maincontent);
                setSeoData(json.data[0].attributes.seo);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
// Dynamically set the meta title and description once the seoData is fetched
useEffect(() => {
    if (seoData && Array.isArray(seoData) && seoData.length > 0) {
      const seo = seoData[0]; // Access the first element of the seoData array
      console.log("SEO Data received:", seo); // Log seoData for debugging
      document.title = seo.metaTitle || "Default Title";
      
      // Set meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", seo.metaDescription || "Default Description");
      } else {
        const newMetaDescription = document.createElement("meta");
        newMetaDescription.name = "description";
        newMetaDescription.content = seo.metaDescription || "Default Description";
        document.head.appendChild(newMetaDescription);
      }
    } else {
      console.log("No SEO Data received"); // Log if seoData is not available
    }
  }, [seoData]);
  
    if (!data) return // // <div>Loading...</div>;

    const getImageUrl = (imageData) => {
        return imageData?.formats?.large?.url
            ? `https://admin.interimhc.com${imageData.formats.large.url}`
            : imageData?.url
            ? `https://admin.interimhc.com${imageData.url}`
            : '/fallback-image.jpg'; // Fallback image
    };

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
            } else {
                return <span key={idx}>{item.text}</span>; // Render text as a span for inline text rendering
            }
        });
    };

    return (
        <div>
            <SanjoseNavbarComponent />
            <div className="section1subcity py-5">
                <Container fluid className="px-5">
                    <Row >
                        <Col md={7} className="sanjose-banner">
                            <h2 className="subcityheading">{data[0]?.Heading}</h2>
                            <p className="py-3">{data[0]?.subHeading}</p>
                            <p>For a quick consultation, give us a call at <a href="tel:4082866888" className="phone-link">+1 408 286-6888</a> and let us help you with the right care plan!</p>
                            <SubcityCaregiversComponent />
                        </Col>
                        <Col md={4} className="formcoloumcity">
                            <FormComponent />
                        </Col>
                    </Row>
                </Container>
            </div>

           
            
            <SanJoseservicesComponent />
            {/* <CaregiverCityComponent /> */}

            <div className="section-left-img-right-content py-5">
                <Container fluid>
                    <Row className="middlealign">
                        <Col md={6}  className="px-0">
                            {data[1]?.image?.data && (
                                <img 
                                    src={getImageUrl(data[1].image.data.attributes)} 
                                    alt={data[1]?.Heading || "Default Alt Text"} 
                                    width={2559} 
                                    height={1578}
                                />
                            )}
                        </Col>
                        <Col md={6} className="sanjose-col">
                            <h2 className="heading2">{data[1]?.Heading}</h2>
                            {data[1]?.description.map((desc, index) => (
                                <p key={index} className="py-3">{renderTextContent(desc)}</p>
                            ))}
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className="section3subcity py-5">
                <Container>
                    <Row>
                        <Col>
                            <h2 className="heading2" style={{ color: '#ffff', textAlign: 'center' }}>
                                {data[2]?.Heading}
                            </h2>
                            <p className="py-3" style={{ color: '#ffff', textAlign: 'center' }}>{data[2]?.subHeading}</p>
                        </Col>
                    </Row>
                </Container>
                <Container className="section4subcity py-5">
                    <Row>
                        <Col md={7} className="px-5">
                            <h5 className="head5evergreen">{data[2]?.description[0]?.children[0]?.text}</h5>
                            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }} className="py-4">
                <li>
                <p>Exceptional in-home care tailored to your loved one's unique needs. From round-the-clock 24-hour home care to respite care, our meticulously trained caregivers are devoted to enhancing their quality of life. </p>
                </li>
                <li>
                <p>Assistance with <a href="https://www.medicare.gov/" className="phone-link" target="_blank">Medicare</a> insurance coverage to ensure your seniors receive the best and affordable home care plan to help them age with renewed confidence and peace of mind.  </p>
                </li>
                <li>
                <p>Seamless assistance for eligible veterans or surviving spouses to avail  <a href="https://www.benefits.va.gov/" className="phone-link" target="_blank">Veteran Benefits</a>. Our team ensures they receive the best in-home care that befits their noble contributions. </p>
                </li>
                 </ul>
                            <p>
                                Contact us today at <a href="tel:+1 408-286-6888" className="phone-link">+1 408-286-6888</a> to learn more about our comprehensive senior care services in Evergreen, Ca.
                            </p>
                        </Col>
                        <Col md={5} className="px-0">
                            {data[2]?.img?.data && (
                                <img 
                                    src={getImageUrl(data[2].img.data.attributes)} 
                                    alt={data[2]?.Heading || "Default Alt Text"} 
                                    width={1878} 
                                    height={1575}
                                />
                            )}
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className="py-5">
                <Container>
                    <Row >
                        <Col md={4} >
                            {data[3]?.image?.data && (
                                <img 
                                    src={getImageUrl(data[3].image.data.attributes)} 
                                    alt={data[3]?.Heading || "Default Alt Text"} 
                                    width={595}
                                    height={780}
                                />
                            )}
                        </Col>
                        <Col md={8} className="sanjose-col">
                            <h2 className="heading2">{data[3]?.Heading}</h2>
                            {data[3]?.description.map((desc, index) => (
                                <p key={index} className="py-3">{renderTextContent(desc)}</p>
                            ))}
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className="section5city py-5">
                <Container>
                    <Row>
                        <Col>
                            <h2 className="heading2city py-3">{data[4]?.Heading}</h2>
                            {/* <p style={{ textAlign: 'center' }}>{data[4]?.description[0]?.children[0]?.text}</p> */}
                            <p style={{ textAlign: 'center' }}>At Interim Healthcare, what sets us apart is the flexibility of our services. Whether your seniors require assistance for a few hours a day or continuous assistance, we can tailor our support to meet their specific needs. As your loved ones' requirements evolve over time, we'll be there to adapt our services, ensuring they receive the right level of care. By choosing our in-home care services, you'll not only alleviate the burden of caregiving but also witness a positive transformation in your loved ones' aging experience. Take the first step towards enhancing your seniors' well-being and independence. Call us today at <a href="tel:+1 408-286-6888" className="phone-link">+1 408-286-6888</a> to learn more about our customizable care plans and how we can support your elderly loved ones living in Evergreen, CA. </p>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Head>
        <title>{seoData?.[0]?.metaTitle || "Default Title"}</title>
        <meta name="description" content={seoData?.[0]?.metaDescription || "Default Description"} />
      </Head>
            <SanJoseFooter />
        </div>
    );
}
