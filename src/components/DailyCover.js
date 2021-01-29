/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
import React from 'react';
import { Card, Form, FormControl, Col, Row, Container } from 'react-bootstrap';

const Cover = 'https://kaboompics.com/cache/7/3/7/1/b/7371b7a8de0b38d8906cdae62a3374526d4109d0.jpeg';
// eslint-disable-next-line arrow-body-style
const DailyCover = () => {
  return (
    <div className="daily-cover-container">
      <div className="daily-cover">
        <Card className="bg-dark text-white text-center" border="light">
          <Card.Img src={Cover} height="auto" display="block" alt="Card image" />
          <Card.ImgOverlay className="">
            <Container className="p-3">
              <Col>
                <Container className="text-center p-5 my-lg-5">
                  <h2>Select the best free stock photos for you.</h2>
                  <p>
                    Free to use. Redirect to download.
                  </p>
                  <Row className="justify-content-center p-3" md={{ span: 6, offset: 3 }}>
                    <Form className="form-inline p3">
                      <FormControl type="text" placeholder="Search for free photos" />
                    </Form>
                  </Row>
                </Container>
              </Col>
            </Container>
          </Card.ImgOverlay>
        </Card>
      </div>
    </div>
  );
};

export default DailyCover;
