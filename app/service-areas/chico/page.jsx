"use client";
import React, { useEffect, useState } from "react";
import CityNavbarComponent from "../../citynavcomponent";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap-icons/font/bootstrap-icons.css";
import FormComponent from "../../homeformcomponent";
import Image from "next/image";
import Button from 'react-bootstrap/Button';
import ChicoFooter from "../../footerchico";
import SanJoseservicesComponent from "../../sanjoseservicecomponent";
import ChicoNavbarComponent from "../../chiconavcomponent";
import CaregiverCityComponent from "../../caregiversComponentMainCity";
import ChicoserviceComponent from "../../chicoservicecomponent";
import Head from "next/head";

export default function ChicoComponent() {
    const [data, setData] = useState(null); // State for API data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [seoData, setSeoData] = useState(null);

    useEffect(() => {
        fetch("https://admin.interimhc.com/api/chicos?populate[maincontent][populate]=*&populate[seo]=*")
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData?.data?.[0]?.attributes?.maincontent) {
                    setData(responseData.data[0].attributes.maincontent);
                    setSeoData(responseData.data[0].attributes.seo);
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

    // Helper function to render paragraph content
    const renderDescription = (description) => {
        return description?.map((para, index) => (
            <p key={index}>
                {para.children?.[0]?.text || ""}
            </p>
        ));
    };
     const renderListItems = (list) => {
            return list.map((listItem, index) => (
              <li key={index}>
                {listItem.children?.[0]?.text}
              </li>
            ));
          };
          

    return (
        <div>
            <ChicoNavbarComponent />
            
            {/* Banner Section */}
            <div className="section1banner">
                <Container>
                    <Row className="py-3">
                        <Col md={7} className="py-5" style={{paddingRight:"4%"}}>
                            <h1>{data[0]?.Heading}</h1>
                            <p className="py-3">{data[0]?.subHeading}</p>
                            <p>
                            To schedule your care appointment, call us <a href="tel:530-899-9777" className="phone-link">+1 530-899-9777</a> and let us help you with the right care plan!

              </p>
                            <div className="flex py-5" style={{paddingRight:"8%"}}>
                                <div className="iconhome"><i className="bi bi-geo-alt"></i></div>
                                <div className="icontext px-2"><b>Serving:</b></div>
                                <div className="citynames">Oroville (and outlying areas) | Paradise | Magalia | Durham | Biggs | Forest Ranch | Cohasset | Willows | Orland | Capay | Corning</div>
                            </div>
                        </Col>
                        <Col md={5} className="formcoloumcity">
                            <FormComponent />
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* <div style={{ backgroundColor: '#015979', height: '145px' }}></div> */}

            <div>
                <ChicoserviceComponent />
            </div>


            {/* <CaregiverCityComponent/> */}

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
                            <p className="py-2">{renderDescription(data[1]?.description)}</p>
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
                            <p>{renderDescription(data[2]?.description)}</p>
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
                            <p>{renderDescription(data[3]?.description)}</p>
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
                                src={getImageUrl(data[4]?.img?.data?.attributes)} // Fetch image dynamically
                                alt="Service Image"
                                width={data[4]?.img?.data?.attributes?.width}
                                height={data[4]?.img?.data?.attributes?.height}
                            />
                        </Col>
                        <Col md={6} style={{ paddingLeft: '3em' }}>
                           
                            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }} className="py-2">
                            {renderListItems(data[4]?.description?.[0]?.children)} </ul>
                            {renderDescription(data[4]?.description)}
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
                            <p style={{ textAlign: 'center' }}>{renderDescription(data[5]?.description)}</p>
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
                                    <div><p style={{ color: '#004b66' }}><b>{city.children?.[0]?.text}</b></p></div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
            <Head>
        <title>{seoData?.[0]?.metaTitle || "Default Title"}</title>
        <meta name="description" content={seoData?.[0]?.metaDescription || "Default Description"} />
      </Head>        
            < ChicoFooter/>
        </div>
    );
}
