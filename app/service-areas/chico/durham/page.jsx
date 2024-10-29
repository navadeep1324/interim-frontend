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
              <h2 className="subcityheading">Senior In-Home Care in Durham, CA  </h2>
              <p className="py-3">
              Senior care is incomplete without compassionate assistance. Beyond help, your loved ones require a friendly face to understand their said and unsaid needs. At Interim Healthcare in Durham, we offer elderly home care that is driven by empathy at its core. 
              </p>
              <p>To learn more about our personalized in-home care, call us at <a href="tel:530-899-9777" className="phone-link">+1 530-899-9777</a>  </p>
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
              <h2 className="heading2">Serving Seniors in Durham with Quality In-Home Care  </h2>
              <p className="py-3">
              Durham is a small, census-designated town in the Butte County of California. It is home to a small community of 5,504 people, about 20% of it being composed of seniors. Family demographics of Durham reveal that around 7.6% of households belong to seniors who live alone. At this age, most seniors are unable to live without assistance. Interim Healthcare helps them access reliable in-home care plans which are flexible and easily personalized to suit their needs. 
              </p>
              <p className="py-3">At Interim Healthcare, we believe that true care comes from sincere commitment. Starting from modest roots, we’ve grown into a trusted leader in in-home care right here in Durham. We recognize how crucial it is for your loved ones to feel secure and comforted at home. That’s why our team is dedicated to creating safer and healthier home environments through our professional in-home care services.  </p>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="reddingsection3subcity py-5">
        <Container>
          <Row>
            <Col>
              <h2 className="heading2" style={{ color: '#ffff', textAlign: 'center' }}>Senior Living at its Best with Our Personalized Assistance  </h2>
              <p className="py-3" style={{ color: '#ffff', textAlign: 'center' }}>Aging is a natural part of life, and managing chronic health conditions can become increasingly difficult over time. To age well, seniors require specialized care that focuses on addressing their individual needs.  Being pioneers of senior in-home care in the nation, we know what’s best for your loved one.  </p>
            </Col>
          </Row>
        </Container>
        
        <Container className="section4subcity py-5">
          <Row>
            <Col md={8} className="px-5">
              <h5 className="heading5subcity">Some of our comprehensive in-home care services include:  </h5>
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }} className="py-4">
                <li className="py-2" >Alzheimer’s Care </li>
                <li className="py-2" > 24 Hour Home Care </li>
                <li className="py-2" >Respite Care </li>
                <li className="py-2" >Companion Care </li>
              </ul>
              <p>Whether your seniors require a well-structured routine to manage their dementia, or need continuous assistance throughout the day and overnight, we are here to help with our range of elderly home care plans. </p>
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
              <h2 className="heading2">Step-by-Step Senior Care which Guarantees a Comfortable Life </h2>
              <p className="py-3">Each senior’s needs are unique, and understanding these needs is essential for providing the right care. To make this process stress-free for families, we have developed a planned approach to caregiving which incorporates the following steps:  </p>
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }} className="py-2">
                <li className="py-2" ><b>Thorough Home Assessment:</b> Crafting care solutions by thoroughly evaluating the living space.  </li>
                <li className="py-2"><b>Compatible Caregiver Allocation: </b>Matching the right caregiver to serve your loved one’s needs.  </li>
                <li className="py-2"><b>Ongoing Care Monitoring:</b> Performing regular check-ins to maintain high standards of care.  </li>
                <li className="py-2"><b>Adapting Care Plans:</b> Adjusting the care approach as necessary to enhance comfort levels.  </li>
              </ul>
              <p>Our HomeLife Enrichment Model guides us to provide individualized and effective care that uplifts senior well-being with a holistic approach. </p>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="section5city py-5">
        <Container>
          <Row>
            <Col>
              <h2 className="heading2city py-3">Exceptional In-Home Care Solutions for Seniors in Durham, CA  </h2>
              <p style={{ textAlign: 'center' }}>Our mission is to serve every senior with the highest level of compassion. If your aging loved one needs a caring touch, reach out to us! We assure you that with our standards of care, your senior will have no complaints Call us at <a href="tel:530-899-9777" className="phone-link">+1 530-899-9777</a> to schedule a free care evaluation for your loved one!  </p>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="py-5">
        <Container>
          <h2 className="heading2" style={{ textAlign: 'center' }}>Frequently Asked Questions</h2>
          <Accordion className="py-3">
            <Accordion.Item eventKey="0">
              <Accordion.Header>When is the right time to seek professional Alzheimer's Care for my loved one?  </Accordion.Header>
              <Accordion.Body>
              If you notice increased confusion, wandering, changes in behavior, or if caregiving responsibilities become overwhelming, it might be time to consider our personalized in-home Alzheimer’s Care. 
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>What is Interim Healthcare’s Personal Care for seniors? </Accordion.Header>
              <Accordion.Body>
              Our Personal Care involves assisting seniors with daily activities that they may find challenging to perform on their own. This includes helping with bathing, dressing, grooming, toileting and mobility. 
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Are your caregivers trained regularly in quality standards of in-home care?  </Accordion.Header>
              <Accordion.Body>
              Absolutely. Our caregivers undergo comprehensive training in senior care, including safety protocols, first aid, and condition-specific care such as Alzheimer's and dementia care. 
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
