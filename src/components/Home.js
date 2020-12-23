/* eslint-disable object-curly-newline */
import React, { Component } from 'react';
import { Card, CardColumns, Container } from 'react-bootstrap';

const photoStock = [
  {
    id: 'jaredpalmer.formik',
    fullName: 'jaredpalmer/formik',
    description: 'Build forms in React, without the tears',
    language: 'TypeScript',
    forksCount: 1589,
    stargazersCount: 21553,
    ratingAverage: 88,
    reviewCount: 4,
    url: 'https://images.pexels.com/photos/5390802/pexels-photo-5390802.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
  },
  {
    id: 'rails.rails',
    fullName: 'rails/rails',
    description: 'Ruby on Rails',
    language: 'Ruby',
    forksCount: 18349,
    stargazersCount: 45377,
    ratingAverage: 100,
    reviewCount: 2,
    url: 'https://images.pexels.com/photos/5850442/pexels-photo-5850442.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
  },
  {
    id: 'rails.rails',
    fullName: 'rails/rails',
    description: 'Ruby on Rails',
    language: 'Ruby',
    forksCount: 18349,
    stargazersCount: 45377,
    ratingAverage: 100,
    reviewCount: 2,
    url: 'https://images.pexels.com/photos/1842580/pexels-photo-1842580.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
  },
  {
    id: 'rails.rails',
    fullName: 'rails/rails',
    description: 'Ruby on Rails',
    language: 'Ruby',
    forksCount: 18349,
    stargazersCount: 45377,
    ratingAverage: 100,
    reviewCount: 2,
    url: 'https://images.pexels.com/photos/5720802/pexels-photo-5720802.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
  },
  {
    id: 'rails.rails',
    fullName: 'rails/rails',
    description: 'Ruby on Rails',
    language: 'Ruby',
    forksCount: 18349,
    stargazersCount: 45377,
    ratingAverage: 100,
    reviewCount: 2,
    url: 'https://images.pexels.com/photos/3690052/pexels-photo-3690052.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
  },
  {
    id: 'django.django',
    fullName: 'django/django',
    description: 'The Web framework for perfectionists with deadlines.',
    language: 'Python',
    forksCount: 21015,
    stargazersCount: 48496,
    ratingAverage: 73,
    reviewCount: 5,
    url: 'https://images.pexels.com/photos/3739994/pexels-photo-3739994.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
  },
  {
    id: 'reduxjs.redux',
    fullName: 'reduxjs/redux',
    description: 'Predictable state container for JavaScript apps',
    language: 'TypeScript',
    forksCount: 13902,
    stargazersCount: 52869,
    ratingAverage: 0,
    reviewCount: 0,
    url: 'https://images.pexels.com/photos/4834890/pexels-photo-4834890.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
  },
  {
    id: '2jaredpalmer.formik',
    fullName: 'jaredpalmer/formik',
    description: 'Build forms in React, without the tears',
    language: 'TypeScript',
    forksCount: 1589,
    stargazersCount: 21553,
    ratingAverage: 88,
    reviewCount: 4,
    url: 'https://images.pexels.com/photos/2408022/pexels-photo-2408022.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
  },
  {
    id: '2rails.rails',
    fullName: 'rails/rails',
    description: 'Ruby on Rails',
    language: 'Ruby',
    forksCount: 18349,
    stargazersCount: 45377,
    ratingAverage: 100,
    reviewCount: 2,
    url: 'https://images.pexels.com/photos/3876066/pexels-photo-3876066.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
  },
  {
    id: '2django.django',
    fullName: 'django/django',
    description: 'The Web framework for perfectionists with deadlines.',
    language: 'Python',
    forksCount: 21015,
    stargazersCount: 48496,
    ratingAverage: 73,
    reviewCount: 5,
    url: 'https://images.pexels.com/photos/4993094/pexels-photo-4993094.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
  },
  {
    id: '2reduxjs.redux',
    fullName: 'reduxjs/redux',
    description: 'Predictable state container for JavaScript apps',
    language: 'TypeScript',
    forksCount: 13902,
    stargazersCount: 52869,
    ratingAverage: 0,
    reviewCount: 0,
    url: 'https://images.pexels.com/photos/4971533/pexels-photo-4971533.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
  },
];
// eslint-disable-next-line react/prefer-stateless-function
class Home extends Component {
  render() {
    return (
      <Container className="sm my-2 my-lg-5">
        <>

        </>
        <CardColumns className="sm my-2 my-lg-5">
          {photoStock.map((photo) => (
            <Card>
              <Card.Img src={photo.url} alt="Card image" />
              <Card.ImgOverlay className="sm my-2 my-lg-5">
                <Container className="sm my-2 my-lg-5">
                  <>
                  </>
                </Container>
              </Card.ImgOverlay>
            </Card>
          ))}
        </CardColumns>
      </Container>
    );
  }
}

export default Home;
