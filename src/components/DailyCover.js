/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
import React from 'react';
import { Card, Form, FormControl, Col, Row, Container } from 'react-bootstrap';

const Cover = 'https://kaboompics.com/cache/7/3/7/1/b/7371b7a8de0b38d8906cdae62a3374526d4109d0.jpeg';
// eslint-disable-next-line arrow-body-style
const DailyCover = () => {
  return (
    <div>
      <Card className="bg-dark text-white text-center" border="light">
        <Card.Img src={Cover} alt="Card image" />
        <Card.ImgOverlay className="sm my-2 my-lg-5">
          <Container className="sm my-2 my-lg-5">
            <Col>
              <Card.Title className="display-4 font-weight-bold mb-15 pt-md-10">Select the best free stock photos for you.</Card.Title>
              <Card.Text className="display-6 subtext-header">
                Free to use. Redirect to download.
              </Card.Text>
              <Container className="sm my-2 my-lg-5">
                <Row className="justify-content-center xs-6 xl-8">
                  <Form class="form-inline my-2 my-lg-5 ml-auto">
                    <FormControl type="text" placeholder="Search for free photos" className="mr-sm-10" />
                  </Form>
                </Row>
              </Container>
            </Col>
          </Container>
        </Card.ImgOverlay>
      </Card>
    </div>
  );
};

export default DailyCover;
