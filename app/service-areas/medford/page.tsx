"use client";
import React, { useEffect, useState } from "react";
import CityNavbarComponent from "../../citynavcomponent";
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
import CitypageFooter from "../../CitypageFooter";
import SanJoseservicesComponent from "../../sanjoseservicecomponent";
import CaregiverCityComponent from "../../caregiversComponentMainCity";
import MedfordservicesComponent from "../../medfordservicecomponent";
import MedfordNavComponent from "../../medfordnavcomponent";
import MedfordFooterComponent from "../../footermedford";
import Head from "next/head";
export default function MedfordComponent() {
        const [data, setData] = useState(null); // State for API data
        const [loading, setLoading] = useState(true); // Loading state
        const [error, setError] = useState(null); // Error state
        const [seoData, setSeoData] = useState(null);
      
        useEffect(() => {
          fetch("https://admin.interimhc.com/api/medfords?populate[maincontent][populate]=*&populate[seo]=*")
            .then((response) => response.json())
            .then((responseData) => {
              if (responseData?.data?.[0]?.attributes?.maincontent) {
                setData(responseData.data[0].attributes.maincontent);
                setSeoData(responseData.data[0].attributes.seo); 
              } else {
                throw new Error("Invalid data structure received");
              }
              setLoading(false);
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
              setError(error.message);
              setLoading(false);
            });
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
      
        if (loading) {
          return // <div>Loading...</div>;
        }
      
        if (error) {
          return <div>Error: {error}</div>;
        }
      
        // Helper function to get image URL (if images are available)
        const getImageUrl = (imageData) => {
          return imageData ? `https://admin.interimhc.com${imageData.url}` : "";
        };
        const renderListItems = (list) => {
            return list.map((listItem, index) => (
              <li key={index}>
                <b>{listItem.children[0].text}</b>{listItem.children[1].text}
              </li>
            ));
          };
          
      
    return (
<div>
<MedfordNavComponent/>
<div className="section1banner">
        <Container>
          <Row className="py-3">
            <Col md={7} className="py-5" style={{paddingRight:"4%"}}>
              <h1>{data[0]?.Heading || "Default Heading"}</h1>
              <p className="py-3">
                {data[0]?.subHeading?.split("\n\n")[0] || "Default Subheading"}
              </p>
              <p>
              Call us today at <a href="tel:541-779-0054" className="phone-link">+1 541-779-0054</a> and let us help you with the right care plan!

              </p>
              {/* <p>{data[0]?.subHeading?.split("\n\n")[1] || ""}</p> */}
              {/* <p>Call us today at +1 541-779-0054</p> */}
              <div className="flex py-3" style={{paddingRight:"8%"}}>
                <div className="iconhome">
                  <i className="bi bi-geo-alt"></i>
                </div>
                <div className="icontext px-2">
                  <b>Serving:</b>
                </div>
                <div className="citynames">
                  Ashland | Talent | Phoenix | Central Point | White City | Eagle Point | Shady Cove | Gold Hill | Rogue River | Hugo | Merlin
                </div>
              </div>
            </Col>
            <Col md={5} className="formcoloumcity">
              <FormComponent />
            </Col>
          </Row>
        </Container>
      </div>
{/* <div style={{backgroundColor:'#015979',height:'145px'}}>
</div> */}
<div>
<MedfordservicesComponent/>
</div>
{/* <CaregiverCityComponent/> */}

<div className="section2city">
    <Container fluid>
<Row className="py-4">
    <Col md={6} className="px-0">
    <Image
                src={getImageUrl(data[1]?.image?.data?.attributes)} // Fetch image dynamically from the API
                alt="City Image"
                width={data[1]?.image?.data?.attributes?.width} 
                height={data[1]?.image?.data?.attributes?.height} 
              />
    </Col>
    <Col md={6} style={{ paddingLeft: '3em', paddingRight: '3em' }}>
    <h2 className="heading2 py-4">{data[1]?.Heading} </h2>
    <p className="py-2">{data[1]?.description[0].children[0].text}</p>
    </Col>

</Row>
    </Container>
</div>
<div className="section3city py-5">
    <Container fluid>
        <Row>
            <Col md={6} style={{ paddingRight: '3em',paddingLeft: '3em' }}>
            <h2 className="heading2 py-4">{data[2]?.Heading}
            </h2>
            <p> {data[2]?.description[0].children[0].text}</p>
            </Col>
            <Col md={6}>
            <Image
                src={getImageUrl(data[2]?.image?.data?.attributes)} // Fetch image dynamically from the API
                alt="City Image"
                width={data[2]?.image?.data?.attributes?.width} 
                height={data[2]?.image?.data?.attributes?.height} 
              />
            </Col>
        </Row>
    </Container>
</div>
<div className="py-5">
    <Container>
        <Row>
            <Col md={4}>
            <Image
                src={getImageUrl(data[2]?.image?.data?.attributes)} // Fetch image dynamically from the API
                alt="City Image"
                width={data[2]?.image?.data?.attributes?.width} 
                height={data[2]?.image?.data?.attributes?.height} 
              />
            </Col>
            <Col md={8}  style={{ paddingLeft: '3em' }}>
            <h2 className="heading2">{data[3]?.Heading} </h2>
            <p><br></br>{data[3]?.subHeading}</p>
           <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }} className="py-2">
                {renderListItems(data[3]?.description?.[0]?.children)} </ul>
           <p>{data[3]?.description?.[1]?.children[0]?.text}</p>
            </Col>
        </Row>
    </Container>
</div>
<div className="section4city py-5">
    <Container>
        <Row className="py-3">
            <Col md={2}></Col>
            <Col md={8}><h2 className="heading2" style={{textAlign:'center'}}>{data[4]?.Heading} </h2>
            <p style={{textAlign:'center'}} className="py-2">{data[4]?.description[0]?.children[0]?.text}</p>
            </Col>
{/* <Col md={2}></Col> */}
        </Row>
        <Row className="py-4"> 
            <Col md={6}>
            <Image
                src={getImageUrl(data[2]?.image?.data?.attributes)} // Fetch image dynamically from the API
                alt="City Image"
                width={data[2]?.image?.data?.attributes?.width} 
                height={data[2]?.image?.data?.attributes?.height} 
              />
            </Col>
            <Col md={6} style={{ paddingLeft: '3em' }}>
            <p><b>{data[4]?.description?.[2]?.children?.[0]?.text || "Default Heading"}</b> <br></br>
            {data[4]?.description?.[3]?.children?.[0]?.text} </p><br></br>
           <p className="py-2"><b>{data[4]?.description?.[5]?.children?.[0]?.text} </b><br></br>
           {data[4]?.description?.[6]?.children?.[0]?.text}</p><br></br>
            <p><b>{data[4]?.description?.[8]?.children?.[0]?.text}  </b><br></br>
            {data[4]?.description?.[9]?.children?.[0]?.text} </p>
           <p className="py-3">{data[4]?.description?.[11]?.children?.[0]?.text} </p>
           </Col>
        </Row>
    </Container>
</div>
<div className="section5city py-5">
    <Container>
        <Row>
            <Col>
            {/* Render the heading and content dynamically */}
            <h2 className="heading2city py-3">
                {data[5]?.Heading || "Interim HealthCare: Where Compassion Meets Care for a Brighter Tomorrow"}
            </h2>
            <p style={{textAlign:'center'}}>
                {data[5]?.description?.[0]?.children?.[0]?.text || 
                "Seeing your loved ones face difficulties can be tough, but with Interim HealthCare, you can provide them with the gift of balanced health and happiness. Let us help make their aging process more comfortable and fulfilling. Choose Interim HealthCare for compassionate in-home care support. Call us at +1 541-779-0054 to get started today."}
            </p>
            </Col>
        </Row>
    </Container>
</div>

<div className="section6city py-5">
    <Container>
        <Row>
            <Col md={2}></Col>
            <Col md={8}> 
            {/* Render the heading */}
            <h2 className="heading2citysub">
                {data[6]?.Heading || "Interim Health Care Services in Medford, CA"}
            </h2>

            {/* Render the description */}
            <p style={{ color: '#ffff', textAlign: 'center' }} className="py-2">
                {data[6]?.description?.[0]?.children?.[0]?.text || 
                "If planning to look for senior in home care services for your loved ones in Medford, feel free to reach us. We serve in several cities, listed below are few of them:"}
            </p>
            </Col>
            <Col md={2}></Col>
        </Row>

        {/* Render city names dynamically */}
        <Row className="subcitysec py-5 px-5 my-4">
            {/* City List */}
            <Col md={4}>
                <div className="flex py-2">
                    <div className="iconcity"><i className="bi bi-chevron-right"></i></div>
                    <div><p style={{color:'#004b66'}}><b>Ashland</b></p></div>
                </div>
                <div className="flex py-2">
                    <div className="iconcity"><i className="bi bi-chevron-right"></i></div>
                    <div><p style={{color:'#004b66'}}><b>Talent</b></p></div>
                </div>
                <div className="flex py-2">
                    <div className="iconcity"><i className="bi bi-chevron-right"></i></div>
                    <div><p style={{color:'#004b66'}}><b>Phoenix</b></p></div>
                </div>
                <div className="flex py-2">
                    <div className="iconcity"><i className="bi bi-chevron-right"></i></div>
                    <div><p style={{color:'#004b66'}}><b>Hugo</b></p></div>
                </div>
            </Col>
            {/* More cities */}
            <Col md={4}>
                <div className="flex py-2">
                    <div className="iconcity"><i className="bi bi-chevron-right"></i></div>
                    <div><p style={{color:'#004b66'}}><b>Central Point</b></p></div>
                </div>
                <div className="flex py-2">
                    <div className="iconcity"><i className="bi bi-chevron-right"></i></div>
                    <div><p style={{color:'#004b66'}}><b>White City</b></p></div>
                </div>
                <div className="flex py-2">
                    <div className="iconcity"><i className="bi bi-chevron-right"></i></div>
                    <div><p style={{color:'#004b66'}}><b>Eagle Point</b></p></div>
                </div>
                <div className="flex py-2">
                    <div className="iconcity"><i className="bi bi-chevron-right"></i></div>
                    <div><p style={{color:'#004b66'}}><b>Merlin</b></p></div>
                </div>
            </Col>
            <Col md={4}>
                <div className="flex py-2">
                    <div className="iconcity"><i className="bi bi-chevron-right"></i></div>
                    <div><p style={{color:'#004b66'}}><b>Shady Cove</b></p></div>
                </div>
                <div className="flex py-2">
                    <div className="iconcity"><i className="bi bi-chevron-right"></i></div>
                    <div><p style={{color:'#004b66'}}><b>Gold Hill</b></p></div>
                </div>
                <div className="flex py-2">
                    <div className="iconcity"><i className="bi bi-chevron-right"></i></div>
                    <div><p style={{color:'#004b66'}}><b>Rogue River</b></p></div>
                </div>
            </Col>
        </Row>
    </Container>
</div>
<Head>
        <title>{seoData?.[0]?.metaTitle || "Default Title"}</title>
        <meta name="description" content={seoData?.[0]?.metaDescription || "Default Description"} />
      </Head>
<MedfordFooterComponent/>
</div>
    );
}