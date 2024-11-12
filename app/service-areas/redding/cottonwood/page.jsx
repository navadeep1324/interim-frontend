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
import Cupertinomain from "/public/images/HomeCare-in-Cottonwood.webp";
import Cupertino1 from "/public/images/HealthCare-Services-in-Cottonwood.webp";
import Cupertino2 from "/public/images/Compassionate-Caregivers.webp";
import ReddingNavbarComponent from "../../../reddingnavcomponent";
import Head from "next/head";
import CaregiverCityComponent from "../../../caregiversComponentMainCity";

const API_URL = "https://admin.interimhc.com";

export default function CottonwoodComponent() {
  const [data, setData] = useState(null);
  const [seoData, setSeoData] = useState(null);

  // Fetch SEO and content data from Strapi
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/cottonwoods?populate[maincontent][populate]=*&populate[seo]=*`
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
              <h2 className="subcityheading">Senior In-Home Care in Cottonwood, CA</h2>
              <p className="py-3">
                Seniors are amongst the most precious members of a family. They require exceptional care to age with grace and happiness. Being pioneers of home care in the country, Interim Healthcare knows how to cater to your seniors in Cottonwood, CA.
              </p>
              <p>
                Simply call us at <a href="tel:530-221-1212" className="phone-link">+1 530-221-1212</a> to schedule a free assessment for your aging loved ones.
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

      {/* Section 3 - Expanding Need of Home Care */}
      <div>
        <Container fluid>
          <Row className="py-5">
            <Col md={6} className="px-5">
              <Image src={Cupertinomain} alt="Cottonwood Main Image" />
            </Col>
            <Col md={6} className="redding-col2">
              <h2 className="heading2">Expanding Need of Home Care in Cottonwood, California</h2>
              <p className="py-3">
                <a href="https://en.wikipedia.org/wiki/Cottonwood,_California" className="phone-link" target="_blank">Cottonwood</a> is a small town in the Shasta County of California. It has a tight-knit community of <a href="https://data.census.gov/profile/Cottonwood_CDP_(Shasta_County),_California?g=160XX00US0616630#populations-and-people" className="phone-link" target="_blank">6,268</a> people who live in a peaceful environment. The community consists of people of all ages, 16% of whom are seniors. Most families in Cottonwood consist of at most 3 members, who juggle between professional and personal priorities, unable to care for seniors. Here's why Interim Healthcare takes the initiative to be a trusted home care partner for seniors in Cottonwood, CA and nearby areas.
              </p>
              <p>
                For the last two decades, our home care services have been focusing on maintaining independence, dignity, and overall well-being of seniors. We understand the unique challenges faced by aging individuals and their families, and our compassionate caregivers are committed to providing the highest standard of care. To learn more on how our in-home care uplifts your seniors, call us on <a href="tel:530-221-1212" className="phone-link">+1 530-221-1212</a> and our care team will guide you.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 4 - Explore Range of Home Health Care Services */}
      <div className="reddingsection3subcity py-5">
        <Container>
          <Row>
            <Col>
              <h2 className="heading2" style={{ color: '#ffff', textAlign: 'center' }}>Explore our Range of Home Health Care Services in Cottonwood, CA</h2>
              <p className="py-3" style={{ color: '#ffff', textAlign: 'center' }}>
                At Interim Healthcare, our care plans go beyond basic assistance, fostering dignity, independence, and joy for your loved ones. With our trusted team by your side, you can rest assured knowing your family member is receiving the highest quality care in their familiar surroundings.
              </p>
            </Col>
          </Row>
        </Container>
        <Container className="section4subcity py-5">
          <Row>
            <Col md={8} className="px-5">
              <h5 className="heading5subcity">The home health care services we offer include:</h5>
              <p className="py-3"><b>24-Hour Home Care:</b> for continuous monitoring and assistance of seniors with chronic illnesses.</p>
              <p><b>Palliative Care:</b> for pain management of seniors with serious conditions such as cancer and COPD.</p>
              <p className="py-3"><b>Personal Care:</b> for seniors who need assistance with personal hygiene, toileting, and grooming.</p>
              <p>
                Whether your elderly need a helping hand with daily living activities, or specialized medical assistance to manage their symptoms, we are here to serve them with compassion.
              </p>
            </Col>
            <Col md={4}>
              <Image src={Cupertino1} alt="Care Image 1" />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 5 - Compassionate Caregivers */}
      <div className="py-5">
        <Container>
          <Row >
            <Col md={5} className="px-5 ">
              <Image src={Cupertino2} alt="Care Image 2" />
            </Col>
            <Col md={7} className="px-5 py-4">
              <h2 className="heading2">Exceptional Home Care for Seniors by Compassionate Caregivers</h2>
              <p className="py-3">
                At Interim Healthcare, we have a profound vision and mission which is communicated thoroughly to our carefully vetted caregivers. Besides their inherent compassion, our expert care team is guided by rigorous training in senior health and safety standards of the highest quality. They prioritize your loved ones’ comfort and independence by providing personalized care which incorporates the following factors:
              </p>
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                <li><p>Flexible scheduling to accommodate your routine.</p></li>
                <li><p>A thorough care assessment of your loved one.</p></li>
                <li><p>Customized care solutions to meet their unique needs.</p></li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 6 - Goal to Serve */}
      <div className="section5city py-5">
        <Container>
          <Row>
            <Col>
              <h2 className="heading2city py-3">Add life to years with our In-Home Care Services in Cottonwood, California</h2>
              <p style={{ textAlign: 'center' }}>
                Interim Healthcare operates with a single and most important motto- to comfort seniors who wish to age in place. Be it in the form of companionship during mealtimes or assisting with medication adherence to manage chronic illnesses, we are here to make their life easier. So, do not think further and reach out to us at <a href="tel:530-221-1212" className="phone-link">+1 530-221-1212</a> to create a positive difference in your senior’s life.
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
              <Accordion.Header>What is the process of allocating a caregiver for my loved one?</Accordion.Header>
              <Accordion.Body>
                Before assigning a caregiver to your loved one, we conduct a thorough evaluation of your senior’s unique needs. Then, based on shift timings and caregiver availability, a compatible caregiver is assigned.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>How is Long-Term Care beneficial for my elderly?</Accordion.Header>
              <Accordion.Body>
                Long-term home care can benefit your loved one by better management of chronic diseases, a safe and manageable daily routine, and improved physical and mental well-being.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>What is Home HealthCare offered by Interim Healthcare?</Accordion.Header>
              <Accordion.Body>
                Interim Healthcare offers Home HealthCare which deploys professional nurses and home health aides to assist your seniors and manage their health conditions in the comfort of their home.
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
