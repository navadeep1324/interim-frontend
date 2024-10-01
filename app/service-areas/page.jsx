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
            <Col md="7" className="py-5 px-5">
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
              <i className="bi bi-geo-alt"></i> View All Service Areas{" "}
              <i className="bi bi-chevron-down"></i>
            </p>
          </div>

          {/* San Jose Row */}
          <Row className="align-items-stretch border-bottom row-padding-bottom">
            <Col
              md={3}
              className="d-flex align-items-center justify-content-center service-area-col"
            >
              <a href="/service-areas/san-jose">
                <h5>San Jose</h5>
              </a>
            </Col>
            <Col md={9} className="service-description-col">
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/san-jose">San Jose</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/san-jose/los-gatos">Los Gatos</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/san-jose/mountain-view">Mountain View</a>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/san-jose/sunnyvale">Sunnyvale</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/san-jose/cupertino">Cupertino</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/san-jose/santa-clara">Santa Clara</a>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/san-jose/saratoga">Saratoga</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/san-jose/los-altos">Los Altos</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/san-jose/milpitas">Milpitas</a>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/san-jose/evergreen">Evergreen</a>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* Yuba City Row */}
          <Row className="align-items-stretch border-bottom row-padding-bottom">
            <Col
              md={3}
              className="d-flex align-items-center justify-content-center service-area-col"
            >
              <a href="/service-areas/yuba">
                <h5>Yuba City</h5>
              </a>
            </Col>
            <Col md={9} className="service-description-col">
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/yuba/marysville">Marysville</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/yuba/olivehurst">Olivehurst</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/yuba/plumas-lake">Plumas Lake</a>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/yuba/loma-rica">Loma Rica</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/yuba/live-oak">Live Oak</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/yuba/colusa">Colusa</a>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/yuba/williams">Williams</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/yuba/maxwell">Maxwell</a>
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
              <a href="/service-areas/grass-valley">
                <h5>Grass Valley</h5>
              </a>
            </Col>
            <Col md={9} className="service-description-col">
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/grass-valley">
                    Grass Valley
                  </a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/grass-valley/nevada-city">Nevada City</a>
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
              <a href="/service-areas/medford">
                <h5>Medford</h5>
              </a>
            </Col>
            <Col md={9} className="service-description-col">
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/medford/ashland">Ashland</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/medford/talent">Talent</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/medford/phoenix">Phoenix</a>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/medford/central-point">Central Point</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/medford/white-city">White City</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/medford/eagle-point">Eagle Point</a>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/medford/shady-cove">Shady Cove</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/medford/gold-hill">Gold Hill</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/medford/rogue-river">Rogue River</a>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/medford/hugo">Hugo</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/medford/merlin">Merlin</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/grants-pass">Grants Pass</a>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* Carson City / Reno Row */}
          <Row className="align-items-stretch border-bottom row-padding-bottom">
            <Col
              md={3}
              className="d-flex align-items-center justify-content-center service-area-col"
            >
              <a href="/service-areas/carson">
                <h5>Carson, Reno</h5>
              </a>
            </Col>
            <Col md={9} className="service-description-col">
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/reno">Reno</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/carson/sparks">Sparks</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/carson/carson-city">Carson City</a>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/carson/minden">Minden</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/carson/gardnerville">Gardnerville</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/carson/genoa">Genoa</a>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/carson/dayton">Dayton</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/carson/gold-hill">Gold Hill</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/carson/mound-house">Mound House</a>
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
              <a href="/service-areas/chico">
                <h5>Chico</h5>
              </a>
            </Col>
            <Col md={9} className="service-description-col">
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/chico">Chico</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/chico/oroville">Oroville</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/chico/paradise">Paradise</a>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/chico/magalia">Magalia</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/chico/durham">Durham</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/chico/biggs">Biggs</a>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/chico/forest-ranch">Forest Ranch</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/chico/cohasset">Cohasset</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/chico/willows">Willows</a>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/chico/orland">Orland</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/chico/capay">Capay</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/chico/corning">Corning</a>
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
                <h5>Redding</h5>
              </a>
            </Col>
            <Col md={9} className="service-description-col">
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/redding">Redding</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/redding/shasta">Shasta</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/redding/anderson">Anderson</a>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/redding/shasta-lake-city">
                    Shasta Lake City
                  </a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/redding/anderson">Anderson</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/redding/cottonwood">Cottonwood</a>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/redding/palo-cedro">Palo Cedro</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/redding/bella-vista">Bella Vista</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/redding/shingletown">Shingletown</a>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/redding/round-mt">Round Mt</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/redding/montgomery-creek">
                    Montgomery Creek
                  </a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/redding/burney">Burney</a>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/redding/johnson-park">Johnson Park</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/redding/hat-creek">Hat Creek</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/redding/castle">Castle</a>
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
