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
                <h5 className="city-name">San Jose</h5>
              </a>
            </Col>
            <Col md={9} className="service-description-col">
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/san-jose" className="city-link">San Jose</a>
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
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/san-jose/evergreen" className="city-link">Evergreen</a>
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
                <h5 className="city-name">Yuba City</h5>
              </a>
            </Col>
            <Col md={9} className="service-description-col">
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/yuba/marysville" className="city-link">Marysville</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/yuba/olivehurst" className="city-link">Olivehurst</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/yuba/plumas-lake" className="city-link">Plumas Lake</a>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/yuba/loma-rica" className="city-link">Loma Rica</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/yuba/live-oak" className="city-link">Live Oak</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/yuba/colusa" className="city-link">Colusa</a>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/yuba/williams" className="city-link">Williams</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/yuba/maxwell" className="city-link">Maxwell</a>
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
                <h5 className="city-name">Grass Valley</h5>
              </a>
            </Col>
            <Col md={9} className="service-description-col">
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/grass-valley" className="city-link">Grass Valley</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/grass-valley/nevada-city" className="city-link">Nevada City</a>
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
                <h5 className="city-name">Medford</h5>
              </a>
            </Col>
            <Col md={9} className="service-description-col">
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/medford/ashland" className="city-link">Ashland</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/medford/talent" className="city-link">Talent</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/medford/phoenix" className="city-link">Phoenix</a>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/medford/central-point" className="city-link">Central Point</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/medford/white-city" className="city-link">White City</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/medford/eagle-point" className="city-link">Eagle Point</a>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/medford/shady-cove" className="city-link">Shady Cove</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/medford/gold-hill" className="city-link">Gold Hill</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/medford/rogue-river" className="city-link">Rogue River</a>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/medford/hugo" className="city-link">Hugo</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/medford/merlin" className="city-link">Merlin</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/grants-pass" className="city-link">Grants Pass</a>
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
                <h5 className="city-name">Carson, Reno</h5>
              </a>
            </Col>
            <Col md={9} className="service-description-col">
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/reno" className="city-link">Reno</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/carson/sparks" className="city-link">Sparks</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/carson/carson-city" className="city-link">Carson City</a>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/carson/minden" className="city-link">Minden</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/carson/gardnerville" className="city-link">Gardnerville</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/carson/genoa" className="city-link">Genoa</a>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/carson/dayton" className="city-link">Dayton</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/carson/gold-hill" className="city-link">Gold Hill</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/carson/mound-house" className="city-link">Mound House</a>
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
                <h5 className="city-name">Chico</h5>
              </a>
            </Col>
            <Col md={9} className="service-description-col">
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/chico" className="city-link">Chico</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/chico/oroville" className="city-link">Oroville</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/chico/paradise" className="city-link">Paradise</a>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/chico/magalia" className="city-link">Magalia</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/chico/durham" className="city-link">Durham</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/chico/biggs" className="city-link">Biggs</a>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/chico/forest-ranch" className="city-link">Forest Ranch</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/chico/cohasset" className="city-link">Cohasset</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/chico/willows" className="city-link">Willows</a>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/chico/orland" className="city-link">Orland</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/chico/capay" className="city-link">Capay</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/chico/corning" className="city-link">Corning</a>
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
                  <a href="/service-areas/redding" className="city-link">Redding</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/redding/shasta" className="city-link">Shasta</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/redding/anderson" className="city-link">Anderson</a>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/redding/shasta-lake-city" className="city-link">
                    Shasta Lake City
                  </a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/redding/anderson" className="city-link">Anderson</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/redding/cottonwood" className="city-link">Cottonwood</a>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/redding/palo-cedro" className="city-link">Palo Cedro</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/redding/bella-vista" className="city-link">Bella Vista</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/redding/shingletown" className="city-link">Shingletown</a>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/redding/round-mt" className="city-link">Round Mt</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/redding/montgomery-creek" className="city-link">
                    Montgomery Creek
                  </a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/redding/burney" className="city-link">Burney</a>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="service-item">
                  <a href="/service-areas/redding/johnson-park" className="city-link">Johnson Park</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/redding/hat-creek" className="city-link">Hat Creek</a>
                </Col>
                <Col md={4} className="service-item">
                  <a href="/service-areas/redding/castle" className="city-link">Castle</a>
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
