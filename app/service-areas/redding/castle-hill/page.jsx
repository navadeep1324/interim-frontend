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

export default function CastleHillComponent() {
  const [data, setData] = useState(null);
  const [seoData, setSeoData] = useState(null);

  // Fetch SEO and content data from Strapi
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/castle-hills?populate[maincontent][populate]=*&populate[seo]=*`
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
        <Container fluid className="">
          <Row>
            <Col md={7} className="reddingsubcity-banner">
              <h2 className="subcityheading">Home Health Care in Castle Hill, California</h2>
              <p className="py-3">
                Interim Healthcare believes that every senior deserves to feel cherished, respected, and cared for, especially in their golden years. Our senior care services are more than just support; they are about building connections and creating moments of joy for elders living in Castle Hill.
              </p>
              <br />
              <p>
                For detailed info, contact us today at <a href="tel:530-221-1212" className="phone-link">+1 530-221-1212</a>
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

      {/* Section 3 - Senior In-Home Care */}
      <div>
        <Container fluid>
          <Row className="py-5">
            <Col md={6} >
              <Image src={Cupertinomain} alt="Main Image" />
            </Col>
            <Col md={6} className="redding-col2">
              <h2 className="heading2">Senior In-Home Care in Castle Hill</h2>
              <p className="py-3">
                Located in Contra Costa County, <a href="https://en.wikipedia.org/wiki/Castle_Hill,_California" className="phone-link" target="_blank">Castle Hill</a> is a census-designated place in California. It has a rapidly growing <a href="https://data.census.gov/profile/Castle_Hill_CDP,_California?g=160XX00US0611915" className="phone-link" target="_blank">senior population</a>, which has led to an increasing demand for senior home care services in this city. At Interim Healthcare, we ensure that seniors receive the support and care they deserve in Castle Hill.
              </p>
              <p>
                Our comprehensive range of services includes <a href="/service-areas/redding/services/companion-care" className="phone-link">companion care</a>, <a href="/service-areas/redding/services/hospice-care" className="phone-link">hospice care</a>, <a href="/service-areas/redding/services/alzheimers-dementia-care" className="phone-link">dementia care</a>, and more to meet the specific needs of each elderly person. Our caregivers aim to make every day more comfortable and fulfilling, fostering a sense of security and happiness in their own homes.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 4 - What to Expect */}
      <div className="reddingsection3subcity  py-5">
        <Container>
          <Row>
            <Col>
              <h2 className="heading2" style={{ color: '#ffff', textAlign: 'center' }}>What to Expect from Interim Healthcare?</h2>
              <p className="py-3" style={{ color: '#ffff', textAlign: 'center' }}>
                When you choose Interim HealthCare, you're selecting a trusted partner in your journey to health and well-being. With decades of experience, we are committed to providing personalized care for elderly individuals.
              </p>
            </Col>
          </Row>
        </Container>

        <Container className="section4subcity py-5">
          <Row>
            <Col md={8} className="px-5">
              <h5 className="heading5subcity">Here’s what you can expect:</h5>
              <p className="py-3"><b>Free Initial Assessment:</b> The Interim HealthCare office at Castle Hill will arrange a complimentary initial assessment to understand your specific needs.</p>
              <p><b>Customized Care Plan:</b> Our team will work closely with you to create a personalized care plan that outlines the types of services and personal care required, ensuring all your needs are met.</p>
              <p className="py-3"><b>Professional In-Home Care:</b> Our friendly and highly trained caregivers will visit your home to provide the care your loved ones deserve.</p>
              <p>With us, you can trust that you’re in good hands, receiving reliable support right in the comfort of your home.</p>
            </Col>
            <Col md={4}>
              <Image src={Cupertino1} alt="Cupertino Image 1" />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 5 - Journey of Interim Healthcare */}
      <div className="py-5">
        <Container>
          <Row>
            <Col md={6} style={{ paddingRight: '25px' }}>
              <Image src={Cupertino2} alt="Cupertino Image 2" />
            </Col>
            <Col md={6} >
              <h2 className="heading2">The Journey of Interim Healthcare</h2>
              <p className="py-3">
                Interim Healthcare has been providing senior care that meets the unique needs of elders. Our journey began with a simple yet profound mission: to ensure that seniors receive the highest quality of care in the comfort of their own homes.
              </p>
              <p>
                Over the years, we've grown, expanding our home care services and reaching more communities, all while staying true to our core values of empathy, respect, and integrity. Our history is not just about the care we've provided, but about the lives we've touched, the families we've supported, and the relationships we've built along the way.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 6 - Our Goal is to Serve You */}
      <div className="section5city py-5">
        <Container>
          <Row>
            <Col>
              <h2 className="heading2city py-3">Our Goal is to Serve You!</h2>
              <p style={{ textAlign: 'center' }}>
                Your loved one's well-being is our top priority, and we're here to provide the care they deserve. If you're ready to explore the best care options, contact us today at <a href="tel:530-221-1212" className="phone-link">+1 530-221-1212</a> to discuss your senior’s needs. Our team of experts is ready to support you with personalized services that bring comfort and peace.
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
              <Accordion.Header>How do I get started with Interim HealthCare?</Accordion.Header>
              <Accordion.Body>
                To get started, you can contact us at <a href="tel:+1 530-221-1212" className="phone-link">+1 530-221-1212</a> to arrange a free initial assessment. This will help us understand your specific needs and create a customized care plan for your loved one.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>What can I expect during the initial assessment?</Accordion.Header>
              <Accordion.Body>
                During the initial assessment, our team will evaluate your senior’s needs. This helps us develop a personalized care plan that outlines the support needed to ensure the best possible care.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Can Interim HealthCare provide respite care?</Accordion.Header>
              <Accordion.Body>
                Yes, we offer respite care services to provide temporary relief for primary caregivers. This allows you to take a break while ensuring that your loved one continues to receive quality care.
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
