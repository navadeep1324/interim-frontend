import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

function ContactFormComponent() {
  const [validated, setValidated] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const handleChange = (event) => {
    setSelectedService(event.target.value);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <div>
      <div>
        {/* <h2 className='footerformh2 py-2'>Welcome !</h2> */}
        <p style={{textAlign:'center'}}><b>Choose Interim for a better Quality of life</b></p>
      </div>
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3 formcol">
      <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Control type="text" placeholder="Name" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid Name.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Control
            required
            type="email"
            placeholder="Email"
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid Email.
          </Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustom03">
          <Form.Control type="tel" placeholder="Phone Number" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid Phone Number.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationcustom06">
        <Form.Control as={"select"} aria-label="City(Where Care is Needed)" isInvalid={
          validated && selectedService==""}>
      <option value="">Select the City</option>
      <option value="1">San Jose</option>
      <option value="2">Carson</option>
      <option value="3">Chico</option>
      <option value="4">Grants Pass</option>
      <option value="5">Grass Valley</option>
      <option value="6">Medford</option>
      <option value="7">Redding</option>
      <option value="8">Reno</option>
      <option value="9">Yuba</option>
    </Form.Control>
    <Form.Control.Feedback type="invalid">
            Please Select one option.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationcustom04">
        <Form.Control as={"select"} aria-label="Select the service youre looking for" isInvalid={
          validated && selectedService==""}>
      <option value="">Select the service you're looking for</option>
      <option value="1">Alzheimer's & Dementia Care</option>
      <option value="2">Companion Care</option>
      <option value="3">Personal Care</option>
      <option value="4">Respite Care</option>
      <option value="5">Veteran Care</option>
      <option value="6">24-Hour Home Care</option>
    </Form.Control>
    <Form.Control.Feedback type="invalid">
            Please Select one option.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlID="validationcustom05">
            <Form.Control type="textarea" placeholder="How Can we Help you?" required />
            <Form.Control.Feedback type="invalid">
            Please provide a How we can Help you?.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Form.Group className="mb-3" md="12">
       <p className='formsmalltext'>By submitting this form, you agree to receive emails from Interim Health Care and consent to be contacted by us. visit our privacy policy.</p>
      </Form.Group>
      <Button type="submit" className='btngetcare'>Get Care !</Button>
    </Form>
    </div>
  );
}

export default ContactFormComponent;