import React from 'react';
import { css } from '@emotion/react';
import BeatLoader from 'react-spinners/BeatLoader';

const override = css`
  display: flex;
  justify-content: center;
  align-item: center;
  margin: 3rem;
`;

const BeatLoaderContainer = () => (
  <BeatLoader color="#9B9B9B" loading css={override} size={50} />
);

export default BeatLoaderContainer;
