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

export default function JohnsonParkComponent() {
  const [data, setData] = useState(null);
  const [seoData, setSeoData] = useState(null);

  // Fetch SEO and content data from Strapi
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/johnson-parks?populate[maincontent][populate]=*&populate[seo]=*`
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
    //     //    // return <p>Loading...</p>;
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
      <div className="section1subcity">
        <Container fluid>
          <Row>
            <Col md={7} className="reddingsubcity-banner">
              <h2 className="subcityheading">Senior In-Home Care in Johnson Park, CA</h2>
              <p className="py-3">
                Every progressive society ensures all its members live with utmost safety and comfort. As seniors constitute a significant portion of the living community in Johnson Park, California, Interim Healthcare works passionately to uplift their lives during their golden years.
              </p>
              <br />
              <p>
                For more details about our services, call us at <a href="tel:530-221-1212" className="phone-link">+1 530-221-1212</a>
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

      {/* Section 3 - Demand for Senior Home Care */}
      <div>
        <Container fluid>
          <Row className="py-5">
            <Col md={6}>
              <Image src={Cupertinomain} alt="Main Image" />
            </Col>
            <Col md={6} className="redding-col2">
              <h2 className="heading2">Demand for Senior Home Care in Johnson Park, CA</h2>
              <p className="py-3">
                <a href="https://en.wikipedia.org/wiki/Johnson_Park,_California" className="phone-link" target="_blank">Johnson Park</a> is a census-designated town in the Shasta County of California. Consisting of a small community of 686 residents, it has a quiet and peaceful living environment. As around <a href="https://data.census.gov/profile/Johnson_Park_CDP,_California?g=160XX00US0637442#populations-and-people" className="phone-link" target="_blank">17% of its residents are seniors</a>, there is a need for a dependable home care provider to help them overcome daily challenges associated with <a href="https://data.census.gov/profile/Johnson_Park_CDP,_California?g=160XX00US0637442#health" className="phone-link" target="_blank">ambulation and independent living</a>.
              </p>
              <p>
                Interim Healthcare takes the lead to uplift senior living in Johnson Park and has been serving residents of this locality for over two decades. With Interim Healthcare, no day is the same for your elderly loved one, as we gradually help them overcome their challenges one step at a time.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 4 - Why Choose Us */}
      <div className="reddingsection3subcity py-5">
        <Container>
          <Row>
            <Col>
              <h2 className="heading2" style={{ color: '#ffff', textAlign: 'center' }}>Why Choose Us for Your Senior Family Member?</h2>
              <p className="py-3" style={{ color: '#ffff', textAlign: 'center' }}>
                There are several factors which set us apart from other home care companies across the nation. Together, each of these contribute to helping us emerge as one of the most preferred senior home care providers in Johnson Park.
              </p>
            </Col>
          </Row>
        </Container>

        <Container className="section4subcity py-5">
          <Row>
            <Col md={8} className="px-5">
              <h5 className="heading5subcity">Ensuring Excellence in Home Care with:</h5>
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }} className="py-3">
                <li><p>Our unique HomeLife Enrichment Standard of Care with holistic approach to care by engaging the mind, body, spirit and family.</p></li>
                <li><p>In-depth knowledge of clinical staffing excellence and home healthcare, which helps us to nurture your seniors in the care of compatible and certified professionals.</p></li>
                <li><p>Assistance for VA Benefits</p></li>
              </ul>
            </Col>
            <Col md={4}>
              <Image src={Cupertino1} alt="Care Image 1" />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 5 - Popular Home Care Services */}
      <div className="py-5">
        <Container>
          <Row>
            <Col md={6} style={{ paddingRight: '25px' }}>
              <Image src={Cupertino2} alt="Care Image 2" />
            </Col>
            <Col md={6}>
              <h2 className="heading2">Making Life Easier for your Loved One</h2>
              <p className="py-3">
                We aim to enhance aging for your loved ones and restore their confidence and independence. We do so by providing them with reliable and timely assistance from compatible caregivers who are compassionate and dependable.
              </p>
              <p><b>Some of our most popular home healthcare services are:</b></p>
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }} className="py-3">
                <li><p><a href="/service-areas/redding/services/24-hour-care" className="phone-link">24-Hour Home Care</a></p></li>
                <li><p><a href="/service-areas/redding/services/hospice-care" className="phone-link">Hospice Care</a></p></li>
                <li><p>Alzheimer’s and Dementia Care</p></li>
                <li><p>Companion Care</p></li>
              </ul>
              <p>
                To learn more about our elderly home care options, <br />
                call us at <a href="tel:530-221-1212" className="phone-link">+1 530-221-1212</a>.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 6 - Help Your Senior Navigate Life */}
      <div className="section5city py-5">
        <Container>
          <Row>
            <Col>
              <h2 className="heading2city py-3">Help Your Senior Navigate Life with Confidence</h2>
              <p style={{ textAlign: 'center' }}>
                Our caregivers work with your seniors to boost their enthusiasm and outlook on life by easing their daily life challenges related to personal care, homemaking, transportation and companionship. Give us a chance to elevate their life. Call us at <a href="tel:530-221-1212" className="phone-link">+1 530-221-1212</a> for a free consultation for your senior in Johnson Park, CA.
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
              <Accordion.Header>My senior is struggling with basic activities such as using the toilet and maintaining personal hygiene. How can Interim Healthcare help?</Accordion.Header>
              <Accordion.Body>
                Interim Healthcare offers 24-Hour Home Care to help your elderly navigate their daily life challenges with ease. Our caregivers continuously assist them with toileting, incontinence, bathing and grooming.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>My senior is a Veteran. How does Interim Healthcare assist veterans?</Accordion.Header>
              <Accordion.Body>
                We consider it an honor to serve our nation’s wartime veterans. We assist veterans with VA Benefits, which covers our personalized Veteran Care plan to help them age with dignity and respect.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Can I change a care plan or a caregiver after some point of time?</Accordion.Header>
              <Accordion.Body>
                All our home care services are completely flexible and personalized to meet the changing needs of your loved ones. To help us meet your evolving circumstances, inform our care team.
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
