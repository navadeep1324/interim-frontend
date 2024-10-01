"use client";
import React from "react";
import SanjoseNavbarComponent from "../sanjosenavcomponent";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap-icons/font/bootstrap-icons.css";
import ContactFormComponent from "../contactuspagecomponent";
import SearchContact from "../searchcomponentcontactus";
import CityNavbarComponent from "../citynavcomponent";
import NavbarComponent from "../navcomponent";
import ServiceAreasFooter from "../serviceareasFootercomponent"

export default function ContactusComponent() {
  return (
    <div>
      <NavbarComponent />
      
      {/* Section 1: Banner */}
      <div className="section1banner">
        <Container>
          <Row className="py-3 d-flex align-items-center">
            <Col md={6} className="px-5">
              <h1 className="contactus">Pioneers in Personalized Home Healthcare</h1>
              <p className="py-3">
                For over 50 years, Interim HealthCare has been personalizing care to meet the unique health needs of our clients, patients, and partners.
              </p>
            </Col>
            <Col md={6} className="formcoloumcity">
              <ContactFormComponent />
            </Col>
          </Row>
        </Container>
      </div>
      
      {/* Section 2: Contact Us Background */}
      <div className="contactusbg">
        <Container>
          <Row className="py-5 d-flex align-items-center g-4"> {/* Added gutter class 'g-4' */}
            <Col md={6}>
              <h2 className="contactush2">Find A Location</h2>
              <p className="py-3">
                If planning to look for senior in home care services for your loved ones in Redding, feel free to reach us. We serve in several cities, listed below are few of them:
              </p>
            </Col>
            <Col md={6}>
              <SearchContact />
            </Col>
          </Row>
        </Container>
      </div>
      <ServiceAreasFooter />
    </div>
  );
}