"use client";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap-icons/font/bootstrap-icons.css";
import FormComponent from "../../homeformcomponent";
import Image from "next/image";
import SanJose1 from "/public/images/SanJose1.png";
import SanJose2 from "/public/images/SanJose2.png";
import SanJose3 from "/public/images/SanJose3.png";
import SanJose4 from "/public/images/SanJose4.png";
import Button from 'react-bootstrap/Button';
import RenoservicesComponent from "../../renoservicecomponent";
import CaregiverCityComponent from "../../caregiversComponentMainCity";
import RenoFooter from "../../footerreno";
import RenoNavbarComponent from "../../renonavcomponent";
import Head from "next/head";

export default function RenoComponent() {
  const [mainContent, setMainContent] = useState(null);
  const [seoData, setSeoData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          'https://admin.interimhc.com/api/renos?populate[maincontent][populate]=*&populate[seo]=*'
        );
        const data = await response.json();
        setMainContent(data.data[0]?.attributes?.maincontent);
        setSeoData(data.data[0].attributes.seo); 
      } catch (error) {
        console.error('Error fetching Strapi data:', error);
      }
    }
    fetchData();
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


  if (!mainContent) return <div>Loading...</div>;
  // Safely find the component related to the cities section
  const citiesComponent = mainContent?.find(
    (section) => section.__component === "components.middle-hed-dec" && section.id === 41
  );

  return (
    <div>
      <RenoNavbarComponent/>
      {/* Section 1 - Banner */}
      <div className="section1banner">
        <Container>
          <Row className="py-3" >
            <Col md={7} className="py-5" style={{paddingRight:"4%"}}>
              <h1>{mainContent[0]?.Heading || "Senior In Home Care in Reno, Nevada"}</h1>
              <p className="py-5">{mainContent[0]?.subHeading || "Leaving seniors alone at home is never easy. Choose Interim Healthcare, Reno, to provide the care and companionship they need. With us by their side, they can lead a quality life with uncompromised care."}</p>
              <p>Call us today at <a href="tel:775-335-3155" className="phone-link">+1 775-335-3155</a> to learn about our caregiving services.</p>
              {/* <div className="flex py-3">
                <div className="iconhome"><i className="bi bi-geo-alt"></i></div>
                <div className="icontext px-2"><b>Serving:</b></div>
                <div className="citynames">Sparks | Minden | Gardnerville | Genoa | Dayton | Mound House</div>
              </div> */}
            </Col>
            <Col md={5} className="formcoloumcity">
              <FormComponent />
            </Col>
          </Row>
        </Container>
      </div>
      
      {/* <div style={{ backgroundColor: '#015979', height: '145px' }}></div> */}

      {/* Section 2 - Services */}
      <div>
        <RenoservicesComponent />
      </div>

      {/* Section 3 - Caregivers */}
      <div className="sectioncaregiversbg">
        {/* <CaregiverCityComponent /> */}
      </div>

      {/* Section 4 - Left Image, Right Content */}
      <div className="section2city">
        <Container fluid>
          <Row className="py-4">
            <Col md={6} className="px-0">
              <Image src={SanJose1} alt="SanJose1" />
            </Col>
            <Col md={6} style={{ paddingLeft: '3em', paddingRight: '3em' }}>
              <h2 className="heading2 py-4">{mainContent[1]?.Heading || "Bringing Compassionate In-Home Care to Reno’s Seniors"}</h2>
              {mainContent[1]?.description.map((desc, i) => (
                <p key={i} className="py-2">{desc.children[0].text}</p>
              )) || (
                <p className="py-2">Renowned as one of the best cities to retire in America, Reno draws many seniors who are looking to enjoy their golden years in a vibrant community. With 16.7% of its residents aged 65 and older, the need for senior in-home care is growing rapidly. As the population ages, ensuring access to quality care becomes vital in supporting the health and well-being of Reno’s older adults.</p>
              )}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 5 - Right Image, Left Content */}
      <div className="section3city py-5">
        <Container fluid>
          <Row>
            <Col md={6} style={{ paddingRight: '3em', paddingLeft: '3em' }}>
              <h2 className="heading2 py-4">{mainContent[2]?.Heading || "Elevating Senior Care with Compassion and Excellence"}</h2>
              {mainContent[2]?.description.map((desc, i) => (
                <p key={i}>{desc.children[0].text}</p>
              )) || (
                <p>At Interim HealthCare, we recognize that providing care for seniors goes beyond just meeting physical needs—it’s about enhancing their overall well-being and quality of life. Our approach is rooted in compassion, respect, and a deep commitment to making a difference in the lives of the elderly. With years of experience, we truly understand what caring means when families are unable to be there. As a compassionate helping hand, we provide the support and expertise needed to ensure your loved ones receive the care and attention they deserve, every step of the way.</p>
              )}
            </Col>
            <Col md={6}>
              <Image src={SanJose2} alt="SanJose2" />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 6 - Our Innovative Care */}
      <div className="py-5">
        <Container>
          <Row>
            <Col md={4}>
              <Image src={SanJose3} alt="SanJose3" />
            </Col>
            <Col md={8} style={{ paddingLeft: '3em' }}>
              <h2 className="heading2">{mainContent[3]?.Heading || "Our Innovative Care That Enriches Lives"}</h2>
              {mainContent[3]?.description.map((desc, i) => (
                <p key={i}>{desc.children[0].text}</p>
              )) || (
                <>
                  <p>Our HomeLife Enrichment (HLE) model redefines home care with personalized, holistic support that nurtures emotional, social, and physical health. Our approach ensures exceptional care, bringing comfort and peace of mind to seniors and their families.</p>
                  <p className="py-2"><b>Comprehensive and Personalized Care</b></p>
                  <p>The HLE model integrates the mind, body, spirit, and family, providing tailored, high-quality care that adapts to each person's needs and supports their overall well-being.</p>
                  <p className="py-2"><b>Commitment to Clinical Excellence</b></p>
                  <p>We combine clinical excellence with personalized attention, ensuring that every client receives thoughtful, effective support and the highest standard of care at every stage.</p>
                </>
              )}
            </Col>
          </Row>
        </Container>
      </div>

      <div className="section4city py-5">
  <Container>
    <Row className="py-3">
      <Col md={2}></Col>
      <Col md={8}>
        {/* Fetch the heading dynamically from Strapi */}
        <h2 className="heading2" style={{ textAlign: 'center' }}>
          {mainContent[4]?.Heading || "Care Crafted to Fit Your Unique Needs"}
        </h2>
        {/* Fetch the subHeading dynamically */}
        <p style={{ textAlign: 'center' }} className="py-2">
          {mainContent[4]?.subHeading || "At Interim HealthCare, we understand that each individual has unique needs and preferences. That’s why our care programs are meticulously personalized to fit the specific requirements of every client."}
        </p>
      </Col>
      <Col md={2}></Col>
    </Row>
    <Row className="py-4">
      <Col md={6}>
        {/* Fetch and display the image dynamically */}
        {mainContent[4]?.img?.data?.attributes?.url ? (
          <Image
            src={`https://admin.interimhc.com${mainContent[4].img.data.attributes.url}`}
            alt="Dynamic Image"
            width={500}
            height={300}
          />
        ) : (
          <Image src={SanJose4} alt="SanJose4" width={500} height={300} />
        )}
      </Col>
      <Col md={6} style={{ paddingLeft: '3em' }}>
        {/* Check if Strapi description is available and map through it */}
        {mainContent[4]?.description ? (
          mainContent[4].description.map((desc, i) => (
            <p key={i}>
              {desc.children?.map((child, index) => (
                <span key={index}>
                  {child.bold ? <b>{child.text}</b> : child.text}
                </span>
              ))}
            </p>
          ))
        ) : (
          // If the description from Strapi is not available, don't show fallback content
          <>
            <p><b>Customizable Services</b> Our care programs are flexible and can be customized to address a wide range of needs. Whether it's daily personal care, specialized medical support, or companionship, we work closely with clients and their families to design a care plan that meets their exact needs. This customization ensures that care is both effective and comfortable.</p>
            <p className="py-2"><b>Adaptive and Responsive Care</b> We recognize that needs can change over time. Our team is dedicated to providing adaptive care that evolves with the client's requirements. Regular evaluations and open communication allow us to make timely adjustments to care plans, ensuring continuous support and the highest quality of life.</p>
          </>
        )}
      </Col>
    </Row>
  </Container>
</div>



      {/* Section 8 - Footer */}
      <div className="section5city py-5">
        <Container>
          <Row>
            <Col>
              <h2 className="heading2city py-3">{mainContent[5]?.Heading || "Choose Interim HealthCare for a Better and Happier Life"}</h2>
              <p style={{ textAlign: 'center' }}>{mainContent[5]?.description.map(desc => desc.children[0].text).join(" ") || "Provide the care your loved ones need for a happier, more independent life with Interim HealthCare. Our dedicated team offers compassionate support and personalized care, ensuring they live with dignity and comfort. Call us at +1 775-335-3155 to discover how we can help."}</p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 9 - Footer Cities */}
    
      <Head>
        <title>{seoData?.[0]?.metaTitle || "Default Title"}</title>
        <meta name="description" content={seoData?.[0]?.metaDescription || "Default Description"} />
      </Head>
      <RenoFooter/>
    </div>
  );
}