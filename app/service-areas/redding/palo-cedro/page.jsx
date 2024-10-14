"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "next/image";
import "bootstrap-icons/font/bootstrap-icons.css";
import FormComponent from "../../../homeformcomponent";
import CitypageFooter from "../../../CitypageFooter";
import ReddingservicesComponent from "../../../reddingservicesComponent";
import Accordion from "react-bootstrap/Accordion";
import SubcityCaregiversComponent from "../../../SubCityCaregiversComponent";
import Cupertinomain from "/public/images/Cupertinomain.png";
import Cupertino1 from "/public/images/Cupertino1.png";
import Cupertino2 from "/public/images/Cupertino2.png";
import ReddingNavbarComponent from "../../../reddingnavcomponent";
import Head from "next/head";
import CaregiverCityComponent from "../../../caregiversComponentMainCity";

const API_URL = "https://admin.interimhc.com";

export default function PaloCedroComponent() {
  const [data, setData] = useState(null);
  const [seoData, setSeoData] = useState(null);

  // Fetch SEO and content data from Strapi
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/palo-cedros?populate[maincontent][populate]=*&populate[seo]=*`
        );
        setData(response.data.data[0].attributes); // Fetch content data
        if (response.data.data[0].attributes.seo.length > 0) {
          setSeoData(response.data.data[0].attributes.seo[0]); // Fetch the first SEO data object
        }
      } catch (error) {
        console.error("Error fetching data from Strapi", error);
      }
    };
    fetchData();
  }, []);

  // Set meta title and description dynamically
  useEffect(() => {
    if (seoData) {
      document.title = seoData.metaTitle || "Default Title";

      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", seoData.metaDescription || "Default Description");
      } else {
        const newMetaDescription = document.createElement("meta");
        newMetaDescription.name = "description";
        newMetaDescription.content = seoData.metaDescription || "Default Description";
        document.head.appendChild(newMetaDescription);
      }
    }
  }, [seoData]);

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {/* Set SEO meta tags */}
      <Head>
        <title>{seoData?.metaTitle || "Default Title"}</title>
        <meta name="description" content={seoData?.metaDescription || "Default Description"} />
      </Head>

      <ReddingNavbarComponent />

      {/* Section 1 - Banner */}
      <div className="section1subcity py-5">
        <Container fluid className="px-5">
          <Row>
            <Col md={7} className="reddingsubcity-banner">
              <h2 className="subcityheading">In Home Care for Seniors in Palo Cedro, California</h2>
              <p className="py-3">
                In the golden years of life, when every moment counts, Interim HealthCare stands as a light of hope and compassion for seniors. Our mission is simple yet profound: to ensure that the elderly are not just cared for, but cherished, respected, and loved.
              </p>
              <br />
              <p>
                For more info, reach us at <a href="tel:530-221-1212" className="phone-link">+1 530-221-1212</a> and give your loved ones a comfortable life.
              </p>
              <SubcityCaregiversComponent />
            </Col>
            <Col md={4} className="formcoloumcity">
              <FormComponent />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 2 - Services */}
      <div>
        <ReddingservicesComponent />
      </div>
      {/* <CaregiverCityComponent /> */}

      {/* Section 3 - Senior Care */}
      <div>
        <Container fluid>
          <Row className="py-5">
            <Col md={6}>
              <Image src={Cupertinomain} alt="Main Image" />
            </Col>
            <Col md={6} className="redding-col2">
              <h2 className="heading2">Senior In Home Care in Palo Cedro, CA</h2>
              <p className="py-3">
                Located in Shasta County, <a href="https://en.wikipedia.org/wiki/Palo_Cedro,_California" className="phone-link" target="_blank">Palo Cedro</a> is a city present in California, US. According to a survey done by AARP more than <a href="https://www.aarp.org/home-family/your-home/info-2021/home-and-community-preferences-survey.html" className="phone-link" target="_blank">77%</a> of aging adults prefer to stay at home during their golden years. This helps them remain in the comfort of their own homes and stay independent. Interim Healthcare is here to serve seniors in Palo Cedro for their well-being and quality of life. Whether it's assistance with daily activities, medical care, or companionship, we are here to help them thrive in the place they call home.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 4 - Unique Care */}
      <div className="reddingsection3subcity py-5">
        <Container>
          <Row>
            <Col>
              <h2 className="heading2" style={{ color: '#ffff', textAlign: 'center' }}>What Sets Interim Healthcare Apart?</h2>
              <p className="py-3" style={{ color: '#ffff', textAlign: 'center' }}>
                We take care of your loved ones like our family and cherish them throughout their journey.
              </p>
            </Col>
          </Row>
        </Container>

        <Container className="section4subcity py-5">
          <Row>
            <Col md={8} className="px-5">
              <h5 className="heading5subcity">A closer look at what makes us stand out:</h5>
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }} className="py-4">
                <li><p>Customized Care Plans</p></li>
                <li><p>Experienced and Compassionate Caregivers</p></li>
                <li><p>Comprehensive Services</p></li>
                <li><p>Focus on quality and safety</p></li>
                <li><p>Experience and expertise</p></li>
                <li><p>Engaging Activities and Socialization</p></li>
              </ul>
            </Col>
            <Col md={4}>
              <Image src={Cupertino1} alt="Cupertino Image 1" />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 5 - The Right Choice */}
      <div className="py-5">
        <Container>
          <Row>
            <Col md={6} style={{ paddingRight: '25px' }}>
              <Image src={Cupertino2} alt="Cupertino Image 2" />
            </Col>
            <Col md={6}>
              <h2 className="heading2">The Right Choice for Palo Cedro Families</h2>
              <p className="py-3">
                Choosing in-home care services is a deeply personal decision. We travel the extra mile to make elders feel heard and valued. Our commitment to preserving their dignity and providing quality care makes us a trusted partner for families. The home care services we offer include:
              </p>
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                <li><p>Companion care</p></li>
                <li><p>Personal care</p></li>
                <li><p>Hospice care</p></li>
                <li><p>Specialty care</p></li>
              </ul>
              <p className="py-3">
                We’re dedicated to providing your loved ones with the care and compassion they deserve, right in the comfort of their own homes. Because for us, “they are like our own family.”
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 6 - Compassionate Care */}
      <div className="section5city py-5">
        <Container>
          <Row>
            <Col>
              <h2 className="heading2city py-3">Experience Compassionate Care at Home!</h2>
              <p style={{ textAlign: 'center' }}>
                Whether your loved ones need assistance with daily activities, companionship, or specialized medical support, we're here for them every step of the way. Call us today at <a href="tel:530-221-1212" className="phone-link">+1 530-221-1212</a> to schedule a free consultation and discover how we can make a difference in the life of your aging adult. Begin your path to enhanced home care today!
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 7 - FAQ */}
      <div className="py-5">
        <Container>
          <h2 className="heading2" style={{ textAlign: 'center' }}>Frequently Asked Questions</h2>
          <Accordion className="py-3">
            <Accordion.Item eventKey="0">
              <Accordion.Header>What services do you offer for senior in-home care in Palo Cedro, CA?</Accordion.Header>
              <Accordion.Body>
                We offer a range of services including assistance with daily activities, personal care, medical care, and companionship. Our goal is to support seniors in living independently.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>How can Interim Healthcare assist with home hospice care?</Accordion.Header>
              <Accordion.Body>
                Our home hospice care services address the physical, emotional, and spiritual needs of both seniors and their families. We provide pain management and emotional support with daily activities.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>What sets Interim Healthcare apart from other in-home care providers?</Accordion.Header>
              <Accordion.Body>
                We prioritize personalized care tailored to each individual’s needs and preferences. Our dedicated team ensures that seniors receive the highest level of respect, dignity, and comfort.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Container>
      </div>

      {/* Footer */}
      <CitypageFooter />
    </div>
  );
}
