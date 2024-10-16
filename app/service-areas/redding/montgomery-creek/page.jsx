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
import Cupertinomain from "/public/images/Senior-Care-in-Rancho-Tehama.webp";
import Cupertino1 from "/public/images/Our-Family.webp";
import Cupertino2 from "/public/images//Senior-Home-Care-in-Montague.webp";
import ReddingNavbarComponent from "../../../reddingnavcomponent";
import Head from "next/head";
import CaregiverCityComponent from "../../../caregiversComponentMainCity";

const API_URL = "https://admin.interimhc.com";

export default function MontgomeryCreekComponent() {
  const [data, setData] = useState(null);
  const [seoData, setSeoData] = useState(null);

  // Fetch SEO and content data from Strapi
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/montgomery-creeks?populate[maincontent][populate]=*&populate[seo]=*`
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
              <h2 className="subcityheading">Senior In-Home Care in Montgomery Creek, California</h2>
              <p className="py-3">
                At Interim HealthCare, we offer high-quality home health care services that allow seniors to live comfortably in Montgomery Creek, CA. We understand the importance of maintaining a sense of dignity and independence, and we are here to support your loved ones every step of the way.
              </p>
              <br />
              <p>Call us today at <a href="tel:530-221-1212" className="phone-link">+1 530-221-1212</a> for detailed info.</p>
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

      {/* Section 3 - Elder Care */}
      <div>
        <Container fluid>
          <Row className="py-5">
            <Col md={6}>
              <Image src={Cupertinomain} alt="Main Image" />
            </Col>
            <Col md={6} className="redding-col2">
              <h2 className="heading2">Specialized Elder Care in Montgomery Creek, California</h2>
              <p className="py-3">
                <a href="https://en.wikipedia.org/wiki/Montgomery_Creek,_California" className="phone-link" target="_blank">Montgomery Creek</a> is a small city located in Shasta County, California. Due to limited resources, this city faces certain <a href="https://www.ensocarechoice.com/retirement-homes-montgomery-creek-CA?careServiceTypes=INDEPENDENT_LIVING&page=1&radius=50&sort=DEFAULT" className="phone-link" target="_blank">challenges</a> when it comes to providing adequate care for its senior residents. This is where Interim Healthcare extends a helping hand.
                <br /><br />
                Each senior’s needs are unique, and we tailor our services to meet those specific requirements. Whether it's assistance with daily activities such as bathing and meal preparation, or specialized care for chronic conditions, Interim’s caregivers are trained to provide compassionate and professional support.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 4 - Holistic Care */}
      <div className="reddingsection3subcity py-5">
        <Container>
          <Row>
            <Col>
              <h2 className="heading2" style={{ color: '#ffff', textAlign: 'center' }}>Our Holistic Approach</h2>
              <p className="py-3" style={{ color: '#ffff', textAlign: 'center' }}>
                Our approach to senior home health care includes various services designed to promote physical, mental, and emotional well-being of aging adults.
              </p>
            </Col>
          </Row>
        </Container>

        <Container className="section4subcity py-5">
          <Row>
            <Col md={8} className="px-5">
              <h5 className="heading5subcity">The holistic care service we offer includes:</h5>
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }} className="py-3">
                <li><p className="py-2"><b>Personalized Exercise Plans:</b> Customized fitness routines to improve strength, flexibility, and balance.</p></li>
                <li><p className="py-2"><b>Mindfulness and Relaxation:</b> Techniques such as yoga, meditation, and deep breathing exercises to reduce stress and enhance mental clarity.</p></li>
                <li><p className="py-2"><b>Nutritional Guidance:</b> Expert advice on healthy eating habits and meal planning for optimal health.</p></li>
                <li><p className="py-2"><b>Creative Arts:</b> Opportunities to explore hobbies such as painting, crafts, music, and writing.</p></li>
                <li><p className="py-2"><b>Cognitive Stimulation:</b> Games and activities designed to stimulate the mind and enhance cognitive function.</p></li>
              </ul>
            </Col>
            <Col md={4}>
              <Image src={Cupertino1} alt="Cupertino Image 1" />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 5 - Care Services */}
      <div className="py-5">
        <Container>
          <Row>
            <Col md={6} style={{ paddingRight: '25px' }}>
              <Image src={Cupertino2} alt="Cupertino Image 2" />
            </Col>
            <Col md={6}>
              <h2 className="heading2">Interim’s Wide Range of Home Health Care Services</h2>
              <p className="py-3">
                At Interim HealthCare, we understand how important it is to offer compassionate support to help seniors live their best lives. Our home health care services are designed to ensure that they receive the right care at the right time, all within the comfort of their homes.
              </p>
              <p><b>Here's a look at the diverse range of services we offer:</b></p>
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }} className="py-3">
                <li><p><a href="/service-areas/redding/services/companion-care" className="phone-link">Companion care</a></p></li>
                <li><p><a href="/service-areas/redding/services/personal-care" className="phone-link">Personal care</a></p></li>
                <li><p><a href="/service-areas/redding/services/respite-care" className="phone-link">Respite care</a></p></li>
                <li><p><a href="/service-areas/redding/services/veteran-care" className="phone-link">Veterans care</a></p></li>
                <li><p><a href="/service-areas/redding/services/alzheimers-dementia-care" className="phone-link">Alzheimer’s & Dementia care</a></p></li>
                <li><p><a href="/service-areas/redding/services/24-hour-care" className="phone-link">24 hour home care</a></p></li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 6 - Support for Seniors */}
      <div className="section5city py-5">
        <Container>
          <Row>
            <Col>
              <h2 className="heading2city py-3">With Us, Your Seniors are Never Alone</h2>
              <p style={{ textAlign: 'center' }}>
                Interim HealthCare is dedicated to making a positive difference in the lives of seniors in Montgomery Creek. Through our comprehensive and personalized care services, we ensure that seniors can enjoy their golden years with dignity, comfort, and the support they need to thrive. Connect with us at <a href="tel:530-221-1212" className="phone-link">+1 530-221-1212</a> to explore how we can be there for your loved ones.
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
              <Accordion.Header>How do you evaluate the caregivers to check if they meet expectations?</Accordion.Header>
              <Accordion.Body>
                Our caregivers undergo background checks and extensive training programs. They are continuously trained to provide the highest quality of care and support for seniors.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>What does your holistic approach to senior care include?</Accordion.Header>
              <Accordion.Body>
                Our holistic approach encompasses wellness programs designed to promote the physical, mental, and emotional well-being of your loved ones.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>What are the benefits of companion care?</Accordion.Header>
              <Accordion.Body>
                Companion care helps reduce feelings of loneliness and isolation by providing social interaction and companionship.
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
