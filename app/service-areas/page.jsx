"use client";
import React from "react";
import NavbarComponent from "../navcomponent";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import Search from "../searchComponent";
import ServiceAreasFooter from "../serviceareasFootercomponent";

export default function ServiceAreasComponent() {
  return (
    <div>
      <NavbarComponent />
      <div className="sectionbg section-padding-top">
        <Container>
          <Row className="py-5">
            <Col md="7" className="service-areas-maincol">
              <h1 className="heading1-servearea">
                Pioneers In Personalized Home Healthcare
              </h1>
              <p className="paragram-servearea py-4">
                For over 50 years, Interim HealthCare has been personalizing
                care to meet the unique health needs of our clients, patients,
                and partners.
              </p>
              <Button className="homepagebtn py-3" href="/contact-us">
                Contact Us
              </Button>
            </Col>
            <Col md="5" className="search-col">
              <Search />
            </Col>
          </Row>
        </Container>
      </div>

      <div className="section-white">
        <Container>
          <div className="text-center mb-4 view-all-services">
            <p>
              <i className="bi bi-geo-alt"></i> View All Service Areas
              <i className="bi bi-chevron-down"></i>
            </p>
          </div>

          {/* Carson City / Reno Row */}
          <Row className="align-items-stretch border-bottom row-padding-bottom">
            <Col
              md={3}
              className="d-flex align-items-center justify-content-center service-area-col"
            >
              <a href="/service-areas/carson/">
                <h5 className="city-name">Carson, Reno</h5>
              </a>
            </Col>
            <Col md={9} className="service-description-col">
              <Row>
                <Col md={4} className="service-item">
                  <a href="#">Carson City</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="#">Dayton</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="#">Gardnerville</a>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="service-item">
                  <a href="#">Genoa</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="#">Gold Hill</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="#">Minden</a>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="service-item">
                  <a href="#">Mound House</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="#">Reno</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="#">Sparks</a>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* Chico Row */}
          <Row className="align-items-stretch border-bottom row-padding-bottom">
            <Col
              md={3}
              className="d-flex align-items-center justify-content-center service-area-col"
            >
              <a href="/service-areas/chico/">
                <h5 className="city-name">Chico</h5>
              </a>
            </Col>
            <Col md={9} className="service-description-col">
              <Row>
                <Col md={4} className="service-item">
                  <a href="#">Biggs</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="#">Capay</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="#">Chico</a>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="service-item">
                  <a href="#">Cohasset</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="#">Corning</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="#">Durham</a>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="service-item">
                  <a href="#">Forest Ranch</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="#">Magalia</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="#">Oroville</a>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="service-item">
                  <a href="#">Paradise</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="#">Willows</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="#">Orland</a>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* Grass Valley Row */}
          <Row className="align-items-stretch border-bottom row-padding-bottom">
            <Col
              md={3}
              className="d-flex align-items-center justify-content-center service-area-col"
            >
              <a href="/service-areas/grass-valley/">
                <h5 className="city-name">Grass Valley</h5>
              </a>
            </Col>
            <Col md={9} className="service-description-col">
              <Row>
                <Col md={4} className="service-item">
                  <a href="#">Grass Valley</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="#">Nevada City</a>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* Medford Row */}
          <Row className="align-items-stretch border-bottom row-padding-bottom">
            <Col
              md={3}
              className="d-flex align-items-center justify-content-center service-area-col"
            >
              <a href="/service-areas/medford/">
                <h5 className="city-name">Medford</h5>
              </a>
            </Col>
            <Col md={9} className="service-description-col">
              <Row>
                <Col md={4} className="service-item">
                  <a href="#">Ashland</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="#">Central Point</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="#">Eagle Point</a>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="service-item">
                  <a href="#">Gold Hill</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="#">Grants Pass</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="#">Hugo</a>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="service-item">
                  <a href="#">Merlin</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="#">Phoenix</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="#">Rogue River</a>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="service-item">
                  <a href="#">Shady Cove</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="#">Talent</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="#">White City</a>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* Redding Row */}
          <Row className="align-items-stretch row-padding-bottom">
            <Col
              md={3}
              className="d-flex align-items-center justify-content-center service-area-col"
            >
              <a href="/service-areas/redding">
                <h5 className="city-name">Redding</h5>
              </a>
            </Col>
            <Col md={9} className="service-description-col">
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/redding">Redding</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/redding">Shasta</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/redding">Anderson</a>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/redding">Shasta Lake City</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/redding">Anderson</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/redding">Cottonwood</a>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/redding">Palo Cedro</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/redding">Bella Vista</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/redding">Shingletown</a>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/redding">Round Mt</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/redding">Montgomery Creek</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/redding">Burney</a>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/redding">Johnson Park</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/redding">Hat Creek</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/redding">Castle</a>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* San Jose Row */}
          <Row className="align-items-stretch border-bottom row-padding-bottom">
            <Col
              md={3}
              className="d-flex align-items-center justify-content-center service-area-col"
            >
              <a href="/service-areas/san-jose">
                <h5 className="city-name">San Jose</h5>
              </a>
            </Col>
            <Col md={9} className="service-description-col">
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/san-jose/evergreen" className="city-link">Evergreen</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/san-jose/los-gatos" className="city-link">Los Gatos</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/san-jose/mountain-view" className="city-link">Mountain View</a>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/san-jose/sunnyvale" className="city-link">Sunnyvale</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/san-jose/cupertino" className="city-link">Cupertino</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/san-jose/santa-clara" className="city-link">Santa Clara</a>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/san-jose/saratoga" className="city-link">Saratoga</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/san-jose/los-altos" className="city-link">Los Altos</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/san-jose/milpitas" className="city-link">Milpitas</a>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* Yuba City Row */}
          <Row className="align-items-stretch row-padding-bottom">
            <Col
              md={3}
              className="d-flex align-items-center justify-content-center service-area-col"
            >
              <a href="/service-areas/yuba/">
                <h5 className="city-name">Yuba City</h5>
              </a>
            </Col>
            <Col md={9} className="service-description-col">
              <Row>
                <Col md={4} className="service-item">
                  <a href="#">Colusa</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="#">Live Oak</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="#">Loma Rica</a>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="service-item">
                  <a href="#">Marysville</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="#">Maxwell</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="#">Olivehurst</a>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="service-item">
                  <a href="#">Plumas Lake</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="#">Williams</a>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
      <ServiceAreasFooter />
    </div>
  );
}
