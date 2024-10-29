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
              <h2 className="subcityheading">Senior In Home care in Biggs, California  </h2>
              <p className="py-3">
              At Interim healthcare, we believe that exceptional care begins with understanding the unique needs of each senior. Our mission is to provide compassionate in home care that empowers seniors in Biggs to live comfortably and confidently in their own homes. 
              </p>
              <p>To enhance the quality of living for your elders, contact us at <a href="tel:530-899-9777" className="phone-link">+1 530-899-9777</a>  </p>
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
              <h2 className="heading2">Ensuring Elders Feel Safe and Supported at Home  </h2>
              <p className="py-3">
              Biggs is a small town located in Butte County, US. It has a high employment rate of 53.8% due to which family members may struggle to balance caregiving responsibilities with their own work and personal lives. By choosing Interim healthcare, families can get the help they need for their loved ones while still keeping up with their jobs.   
              </p>
              <p className="py-3">This means that they can spend quality time together without the stress of daily care tasks. Choosing Interim Healthcare at Biggs helps aging adults feel supported and safe at home. It also strengthens family connections, making every moment together more special.  </p>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="reddingsection3subcity py-5">
        <Container>
          <Row>
            <Col>
              <h2 className="heading2" style={{ color: '#ffff', textAlign: 'center' }}>A Family-Centered Approach to Senior Care  </h2>
              <p className="py-3" style={{ color: '#ffff', textAlign: 'center' }}>Choosing Interim healthcare means joining a family that prioritizes your loved one's health, happiness, and well-being. Our compassionate caregivers are here to support your elders through every stage of life, ensuring that comfort and dignity are at the forefront of our services.   </p>
            </Col>
          </Row>
        </Container>
        
        <Container className="section4subcity py-5">
          <Row>
            <Col md={8} className="px-5">
              <h5 className="heading5subcity">We deliver a wide array of services such as:  </h5>
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }} className="py-4">
                <li className="py-2" ><b>24/7 care: </b><p>We offer round-the-clock care to meet the needs of your loved ones. </p></li>
                <li className="py-2" ><b>Companionship: </b><p>More than just help; we foster friendships that brighten each day. </p></li>
                <li className="py-2" ><b>Daily Living Assistance: </b><p>From personal hygiene to medication reminders, we ensure comfort and care.  </p></li>
                <li className="py-2" ><b>Respite Care: </b><p>We step in so family members can take a well-deserved break.  </p></li>
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
              <h2 className="heading2">Continuous Support and Monitoring  </h2>
              <p className="py-3">Our commitment to excellence doesn’t stop once care begins. We continually monitor our in home care services and adjust care plans as needed to ensure optimal outcomes.    </p>
              <h5 className="heading5subcity">Our promise to continued excellence includes:  </h5>
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }} className="py-2">
                <li className="py-2" ><b>Tailored Care Plans:</b> Custom care plans that adapt to changing needs. </li>
                <li className="py-2"><b>Frequent Assessments:  </b>Regular evaluations for timely care adjustments.  </li>
                <li className="py-2"><b>Family Engagement: </b> Open communication to keep families informed and involved.   </li>
                <li className="py-2"><b>Ongoing Training</b> Continuous education for caregivers to enhance care quality.   </li>
                <li className="py-2"><b>Holistic Approach:</b> Focus on emotional, physical, and social well-being.   </li>
                <li className="py-2"><b>Safety Assurance: </b> Regular home safety checks to prevent accidents. </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="section5city py-5">
        <Container>
          <Row>
            <Col>
              <h2 className="heading2city py-3">Take the Next Step in Care Contact Us Now!  </h2>
              <p style={{ textAlign: 'center' }}>If you're looking for personalized support for your loved ones, look no further than Interim Healthcare. Our caregivers offer exceptional senior care to ensure comfort and dignity every step of the way. Reach out today at <a href="tel:530-899-9777" className="phone-link">+1 530-899-9777</a> to learn more about our services.  </p>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="py-5">
        <Container>
          <h2 className="heading2" style={{ textAlign: 'center' }}>Frequently Asked Questions</h2>
          <Accordion className="py-3">
            <Accordion.Item eventKey="0">
              <Accordion.Header>How do you ensure the safety of seniors in their homes?  </Accordion.Header>
              <Accordion.Body>
              We perform routine safety evaluations to spot any possible dangers. Our caregivers are trained to promote a safe living environment and to respond quickly to any emergencies.  
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Can I customize the care plan for my loved one? </Accordion.Header>
              <Accordion.Body>
              Absolutely! We believe in personalized care, so we work closely with families to create tailored care plans that adapt to changing needs and preferences.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header> What are the costs associated with in-home care services? </Accordion.Header>
              <Accordion.Body>
              Costs vary depending on the level of care required and the specific services chosen. We recommend contacting us directly for a personalized approach based on your loved one's needs. 
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
