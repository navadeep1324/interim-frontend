"use client";
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CompanionCare from "/public/images/Companioncare.webp";
import PersonalCare from "/public/images/personalcare.webp";
import TwentyfourhourhomeCare from "/public/images/24hourhomecare.webp";
import VeteranCare from "/public/images/veterancare.webp";
import RespiteCare from "/public/images/respitecare.webp";
import Image from "next/image";
import Link from "next/link";

export default function SanJoseservicesComponent() {
  return (
    <div>
      <Container fluid>
        <Row
          className="px-3 py-2 servicescomponentbg" >
          <Col md={2} className="servicecoloumcity mx-1">
            <Link href="/service-areas/chico/services/companion-care/" passHref>
              <div style={{ textAlign: "center" }}>
                <h4 className="titleservice py-2">Companion Care</h4>
                <Image
                  src={CompanionCare}
                  alt="Companion Care"
                  className="imagemaincity justify-content-md-center"
                />
              </div>
            </Link>
          </Col>
          <Col md={2} className="servicecoloumcity mx-1">
            <Link href="/service-areas/chico/services/personal-care/" passHref>
              <div style={{ textAlign: "center" }}>
                <h4 className="titleservice py-2">Personal Care</h4>
                <Image
                  src={PersonalCare}
                  alt="Personal Care"
                  className="imagemaincity justify-content-md-center"
                />
              </div>
            </Link>
          </Col>
          <Col md={2} className="servicecoloumcity mx-1">
            <Link href="/service-areas/chico/services/24-hour-care/" passHref>
              <div style={{ textAlign: "center" }}>
                <h4 className="titleservice py-2">24 Hour Home Care</h4>
                <Image
                  src={TwentyfourhourhomeCare}
                  alt="24 Hour Home Care"
                  className="imagemaincity"
                />
              </div>
            </Link>
          </Col>
          <Col md={2} className="servicecoloumcity mx-1">
            <Link href="/service-areas/chico/services/veteran-care/" passHref>
              <div style={{ textAlign: "center" }}>
                <h4 className="titleservice py-2">Veteran Care</h4>
                <Image
                  src={VeteranCare}
                  alt="Veteran Care"
                  className="imagemaincity"
                />
              </div>
            </Link>
          </Col>
          <Col md={2} className="servicecoloumcity mx-1">
            <Link href="/service-areas/chico/services/respite-care/" passHref>
              <div style={{ textAlign: "center" }}>
                <h4 className="titleservice py-2">Respite Care</h4>
                <Image
                  src={RespiteCare}
                  alt="Respite Care"
                  className="imagemaincity"
                />
              </div>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
