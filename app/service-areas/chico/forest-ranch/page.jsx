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
              <h2 className="subcityheading">Senior In-Home Care in Forest Ranch, CA  </h2>
              <p className="py-3">
              Our seniors deserve a nurturing environment to age in place with confidence. At Interim Healthcare in Forest Ranch, CA, we empower them with compassionate care to help them navigate their challenges and make life easier for them. 
              </p>
              <p>To learn more about our personalized in-home care plans, call us at <a href="tel:530-272-0300" className="phone-link">+1 530-272-0300</a>  </p>
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
              <h2 className="heading2">In-Home Care plans for Isolated Seniors in Forest Ranch, CA  </h2>
              <p className="py-3">
              Forest Ranch is an unincorporated city in Butte County of California. With its cool climate in summer and quiet rural surroundings, it has become a preferred retirement destination for seniors. It has a close community of 1,304 people, 21% of them being seniors. About 5.8% of households in Forest Ranch have a senior living alone. To help such seniors live a safe and comfortable life, Interim Healthcare provides reliable in-home care services.  
              </p>
              <p className="py-3">For more than 20 years, Interim Healthcare has been a trusted leader in senior care in Forest Ranch. Our mission is to enrich lives through compassionate and personalized care. Understanding that each senior has unique needs, we customize our services to ensure their comfort and well-being. With the support of our skilled and dedicated team, we go above and beyond to prioritize the comfort and happiness of the seniors we serve.  </p>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="reddingsection3subcity py-5">
        <Container>
          <Row>
            <Col>
              <h2 className="heading2" style={{ color: '#ffff', textAlign: 'center' }}>Serving Seniors with a Variety of Tailored Home Care Plans  </h2>
              <p className="py-3" style={{ color: '#ffff', textAlign: 'center' }}>We offer a variety of in-home care services for seniors in Forest Ranch who wish to age comfortably at home. Our care plans blend compassion with professional expertise, guided by our HomeLife Enrichment Model to provide families with peace of mind.  </p>
            </Col>
          </Row>
        </Container>
        
        <Container className="section4subcity py-5">
          <Row>
            <Col md={8} className="px-5">
              <h5 className="heading5subcity">Our Core In-Home Care Services Include:  </h5>
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }} className="py-4">
                <li className="py-2"><b>24-Hour Home Care:</b> <p> Round-the-clock support for enhanced health and well-being.</p> </li>
                <li className="py-2"><b>Companion Care: </b> <p>Building meaningful connections and offering friendly support.</p>  </li>
                <li className="py-2"><b>Respite Care: </b> <p>Giving family caregivers a much-needed break with dependable care.</p>  </li>
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
              <h2 className="heading2">Our Compassionate Caregivers Enhance Senior Well-Being </h2>
              <p className="py-3">At Interim Healthcare, our devoted caregivers are the heart of our services, always prioritizing the well-being of your loved ones. Here’s how they make a difference:  </p>
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }} className="py-3">
                <li className="py-2" >Provide support with mobility, toileting, and incontinence care.  </li>
                <li className="py-2">Assist with medication management for chronic conditions.   </li>
                <li className="py-2">Help with light housekeeping and meal preparation.  </li>
                <li className="py-2">Offer emotional support for seniors who may feel lonely or isolated  </li>
                
              </ul>
              <p className="py-2">With our thoughtful and dedicated caregivers, you can have peace of mind, knowing your loved ones are in caring and capable hands. </p>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="section5city py-5">
        <Container>
          <Row>
            <Col>
              <h2 className="heading2city py-3">Effortless Senior Care at Home with Interim Healthcare  </h2>
              <p style={{ textAlign: 'center' }}>We provide senior home care services in Forest Ranch, California, with payment plans tailored to fit your budget. Our team can help navigate Medicaid and Veteran Benefits, simplifying the process for you. Let us handle the details while beginning a new journey of compassionate care for your elderly.  </p>
              <p style={{ textAlign: 'center' }}>Call us at <a href="tel:530-272-0300" className="phone-link">+1 530-272-0300</a> to arrange a consultation and learn how we can enhance their quality of life. </p>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="py-5">
        <Container>
          <h2 className="heading2" style={{ textAlign: 'center' }}>Frequently Asked Questions</h2>
          <Accordion className="py-3">
            <Accordion.Item eventKey="0">
              <Accordion.Header>My senior has limited mobility and needs assistance with toileting. Can you assist? </Accordion.Header>
              <Accordion.Body>
              Sure, we can! Our 24-Hour Home Care plan offers support for seniors with mobility challenges. Our caregivers aid with toileting, personal hygiene, and medication assistance throughout the day and overnight.  
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>How can I trust the caregivers assigned by Interim Healthcare to take care of my loved one? </Accordion.Header>
              <Accordion.Body>
              At Interim Healthcare, we prioritize the safety of our clients by conducting background checks of our caregivers’ education, work history, criminal records, and health clearances. 
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>What if my senior only needs care for a short time? </Accordion.Header>
              <Accordion.Body>
              We offer short-term care services, including respite care, giving families temporary relief while ensuring their loved one receives professional care. 
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
