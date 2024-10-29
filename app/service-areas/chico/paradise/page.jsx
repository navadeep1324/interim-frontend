"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReddingNavbarComponent from "../../../chiconavcomponent"
import FormComponent from "../../../homeformcomponent";
import SubcityCaregiversComponent from "../../../SubCityCaregiversComponent";
import Cupertinomain from "/public/images/Healthcare-in-Anderson-ca.webp";
import Image from "next/image";
import Cupertino1 from "/public/images/In-Homecare-Services-in-Anderson.webp";
import Cupertino2 from "/public/images/Interim-Healthcare-in-Anderson.webp";
import Button from 'react-bootstrap/Button';
import CitypageFooter from "../../../footerchico";
import ReddingservicesComponent from "../../../chicoservicecomponent";
import Accordion from 'react-bootstrap/Accordion';
import CaregiverCityComponent from "../../../caregiversComponentMainCity";
import Head from "next/head";

const BASE_URL = "https://admin.interimhc.com";

export default function SanJoseCupertinoComponent() {
  const [data, setData] = useState(null);
  const [seoData, setSeoData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/redding-anderson?populate[maincontent][populate]=*&populate[seo]=*`
        );
        setData(response.data.data?.attributes);
        // Since `seo` is an array, access the first element of the array
        if (response.data.data?.attributes.seo && response.data.data?.attributes.seo.length > 0) {
          setSeoData(response.data.data?.attributes.seo[0]); // Access the first element of the seo array
        }
      } catch (error) {
        console.error("Error fetching data from Strapi", error);
      }
    };
    fetchData();
  }, []);

  // Dynamically set the meta title and description once the seoData is fetched
  useEffect(() => {
    if (seoData) {
      console.log("SEO Data received:", seoData); // Log seoData for debugging
      document.title = seoData.metaTitle || "Default Title";
     
      // Set meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", seoData.metaDescription || "Default Description");
      } else {
        const newMetaDescription = document.createElement("meta");
        newMetaDescription.name = "description";
        newMetaDescription.content = seoData.metaDescription || "Default Description";
        document.head.appendChild(newMetaDescription);
      }
    } else {
      console.log("No SEO Data received"); // Log if seoData is not available
    }
  }, [seoData]);

  return (
    <div>
      <ReddingNavbarComponent />
      <div className="section1subcity">
        <Container fluid className="">
          <Row>
            <Col md={7} className="reddingsubcity-banner">
              <h2 className="subcityheading">Senior In-Home Care in Paradise, CA  </h2>
              <p className="py-3">
              Senior living requires efforts that go beyond the ordinary. Your loved ones need a combination of compassion, dedication and sincere assistance to age without hassle. At Interim Healthcare in Paradise, CA, we provide comprehensive in-home care for seniors who wish to age in place. 
              </p>
              <p>Get a free care consultation for your loved ones at  <a href="tel:530-899-9777" className="phone-link">+1 530-899-9777</a>  </p>
              <SubcityCaregiversComponent />
            </Col>
            <Col md={4} className="formcoloumcity">
              <FormComponent />
            </Col>
          </Row>
        </Container>
      </div>
      
      <ReddingservicesComponent />
      
      <div>
        {/* <CaregiverCityComponent /> */}
        <Container fluid>
          <Row className="py-5 middlealign">
            <Col md={6}>
              <Image src={Cupertinomain} />
            </Col>
            <Col md={6} className="redding-col2 px-5">
              <h2 className="heading2">Elderly Home Care in Paradise that Makes a Real Difference   </h2>
              <p className="py-3">
              Paradise is a small town in the Butte County of California. It is amongst the fastest-growing cities of the USA with a current population of 4,764. Seniors comprise around 38% of its community, some of them facing several challenges with independent living, cognitive health and ambulation. Interim Healthcare addresses these issues and provides meaningful home care solutions to seniors in Paradise and enhances their life with comfort. 
              </p>
              <p className="py-3">At Interim Healthcare, our team works diligently to ensure that seniors feel secure and well-supported in their own homes. We also help families strengthen their bonds with their elderly, turning every shared experience into a meaningful one. With professional care in place, they can enjoy meals, conversations, and treasured moments, knowing their senior is in capable hands.   </p>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="reddingsection3subcity py-5">
        <Container>
          <Row>
            <Col>
              <h2 className="heading2" style={{ color: '#ffff', textAlign: 'center' }}>Personalized In-Home Care for your Loved Ones   </h2>
              <p className="py-3" style={{ color: '#ffff', textAlign: 'center' }}>When you choose Interim Healthcare, you become part of a family that truly values the well-being and happiness of your loved ones. Our compassionate caregivers provide support throughout every stage of aging, prioritizing comfort and dignity in all that we do.  </p>
            </Col>
          </Row>
        </Container>
        
        <Container className="section4subcity py-5">
          <Row>
            <Col md={8} className="px-5">
              <h5 className="heading5subcity">Our range of in-home care services includes:  </h5>
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }} className="py-4">
                <li className="py-2"><b>24 Hour Home Care: </b><p>Around-the-clock assistance to support your elderly’s varying needs.</p> </li>
                <li className="py-2"><b>Companion Care:  </b>Building genuine connections with your senior that bring joy to each day.<p></p> </li>
                <li className="py-2"><b>Personal Care: </b><p>Dignified help with personal care needs such as toileting and grooming.</p> </li>
                <li className="py-2"><b>Respite Care:  </b><p>Reliable care for your loved ones when you need a break to rest and recover.</p> </li>
               
              </ul>
              
            </Col>
            <Col md={4}>
              <Image src={Cupertino1} alt="Caregiver Image 1" />
            </Col>
          </Row>
        </Container>
      </div>

      <div className="py-5">
        <Container>
          <Row>
            <Col md={6} style={{ paddingRight: '25px' }}>
              <Image src={Cupertino2} />
            </Col>
            <Col md={6}>
              <h2 className="heading2">Continuous Aid at Your Loved One’s Doorstep </h2>
              <p className="py-3">Our commitment to excellence extends beyond the start of care. We continually assess and refine our in-home care services to ensure the best outcomes for your loved ones. </p>
              <h6>We fulfill our promise of quality in-home care with: </h6>
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }} className="py-3">
                <li className="py-2" ><b>Tailored Care Plans: </b> Personalized plans that evolve with changing needs.</li>
                <li className="py-2" ><b>Frequent Assessments:  </b> Regular reviews for timely adjustments. </li>
                <li className="py-2" ><b>Family Engagement:  </b> Keeping families informed and involved. </li>
                <li className="py-2" ><b>Ongoing Training: </b> Continuous caregiver education to improve service.</li>
                <li className="py-2" ><b>Holistic Approach:  </b> Addressing emotional, physical, and social needs. </li>
                <li className="py-2" ><b>Safety Assurance: </b> Routine safety checks to reduce risks. </li>
                
              </ul>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="section5city py-5">
        <Container>
          <Row>
            <Col>
              <h2 className="heading2city py-3">Begin a Journey of Care Aligned with Excellence </h2>
              <p style={{ textAlign: 'center' }}>It’s always the first step which decides the rest of the journey. If you wish to elevate your loved one’s aging with exceptional care, Interim Healthcare is here to help. Our wide range of in-home care plans prioritize your senior’s comfort and dignity. Contact us today at <a href="tel:530-899-9777" className="phone-link">+1 530-899-9777</a> to witness the change. </p>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="py-5">
        <Container>
          <h2 className="heading2" style={{ textAlign: 'center' }}>Frequently Asked Questions</h2>
          <Accordion className="py-3">
            <Accordion.Item eventKey="0">
              <Accordion.Header>How do you ensure senior safety during daily living?  </Accordion.Header>
              <Accordion.Body>
              Our caregivers are trained to conduct regular safety assessments to identify potential hazards in the senior’s living space. They respond swiftly to any emergency ensuring your loved ones remain safe.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>How does Interim Healthcare manage seniors who are emotional and sensitive?  </Accordion.Header>
              <Accordion.Body>
              At Interim Healthcare, compassion is embedded in the care we provide. Our caregivers know how to read a senior’s emotional and mental state and respond accordingly with empathy and meaningful assistance.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>How do I get started with your services? </Accordion.Header>
              <Accordion.Body>
              You can begin with a free consultation where we assess your loved one’s needs and discuss the best care options. Call us at <a href="tel:530-899-9777" className="phone-link">+1 530-899-9777</a> to schedule your consultation.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Container>
      </div>

      {/* Correct SEO Data Access */}
      <Head>
        <title>{seoData?.metaTitle || "Default Title"}</title>
        <meta name="description" content={seoData?.metaDescription || "Default Description"} />
      </Head>

      <CitypageFooter />
    </div>
  );
}
