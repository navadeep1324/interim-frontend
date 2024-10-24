import { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import emailjs from 'emailjs-com';  // Import EmailJS

function ContactFormComponent() {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    city: '',
    service: '',
    howwecanhelpyou: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'phoneNumber') {
      // Allow only numbers and limit length to 10-12 digits
      if (/^\d{0,12}$/.test(value)) {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false || formData.phoneNumber.length < 10) {
      event.stopPropagation();
    } else {
      try {
        // Store form data in Strapi
        await axios.post('https://admin.interimhc.com/api/contactuspage-froms', {
          data: formData,
        });
        console.log('Form submitted successfully to Strapi');

        // Prepare data for EmailJS
        const emailData = {
          from_name: formData.name,
          from_email: formData.email,
          phone_number: formData.phoneNumber,
          city: formData.city,
          service: formData.service,
          message: formData.howwecanhelpyou,
        };

        // Send email using EmailJS
        const emailResponse = await emailjs.send(
          'service_czmmewg',  // Replace with your EmailJS service ID
          'template_zr436rm', // Replace with your EmailJS template ID
          emailData,           // Send form data as variables in email
          'MTVIo7A9LAR7pDgcx'      // Replace with your EmailJS user ID (optional if using public API key)
        );
        console.log('Email sent successfully:', emailResponse.status, emailResponse.text);

        // Redirect to /thank-you after successful submission
        window.location.href = '/thank-you';
      } catch (error) {
        console.error('Error submitting form:', error.response?.data || error.message);
      }
    }

    setValidated(true);
  };

  return (
    <div>
      <div>
        <p style={{ textAlign: 'center' }}><b>Choose Interim for a better Quality of life</b></p>
      </div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3 formcol">
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Control
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Control
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Email.
            </Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustom03">
            <Form.Control
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              pattern="\d{10,12}"
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Phone Number (10-12 digits).
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustom-c06">
            <Form.Control
              as="select"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              aria-label="City (Where Care is Needed)"
            >
              <option value="">Select the City</option>
              <option value="San Jose">San Jose</option>
              <option value="Carson">Carson</option>
              <option value="Chico">Chico</option>
              <option value="Grants Pass">Grants Pass</option>
              <option value="Grass Valley">Grass Valley</option>
              <option value="Medford">Medford</option>
              <option value="Redding">Redding</option>
              <option value="Reno">Reno</option>
              <option value="Yuba">Yuba</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please select one option.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustom04">
            <Form.Control
              as="select"
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              aria-label="Select the service you're looking for"
            >
              <option value="">Select the service you're looking for</option>
              <option value="Alzheimer's & Dementia Care">Alzheimer's & Dementia Care</option>
              <option value="Companion Care">Companion Care</option>
              <option value="Personal Care">Personal Care</option>
              <option value="Respite Care">Respite Care</option>
              <option value="Veteran Care">Veteran Care</option>
              <option value="24-Hour Home Care">24-Hour Home Care</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please select one option.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustom05">
            <Form.Control
              as="textarea"
              name="howwecanhelpyou"
              placeholder="How Can we Help you?"
              value={formData.howwecanhelpyou}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a message on how we can help you...
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" md="12">
          <p className="formsmalltext">By submitting this form, you agree to receive emails from Interim Health Care and consent to be contacted by us. Visit our privacy policy.</p>
        </Form.Group>
        <Button type="submit" className="btngetcare">Get Care!</Button>
      </Form>
    </div>
  );
}

export default ContactFormComponent;
