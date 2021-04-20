import React from 'react';
import { css } from '@emotion/react';
import BeatLoader from 'react-spinners/BeatLoader';

const override = css`
  display: flex;
  justify-content: center;
  align-item: center;
  margin-top: 3rem;
`;

const LoadMore = ({
  hasNextPage, clickFetchMore, loading, title,
}) => (
  <div>
    {hasNextPage && title && (
      <div>
        { loading && (<BeatLoader color="#9B9B9B" loading css={override} size={50} />) }
        <div className="row-item-2">
          <button className="more-photos-btn" type="button" onClick={clickFetchMore}>
            <i className="bi bi-three-dots" />
            {title}
          </button>
        </div>
      </div>
    )}
    {hasNextPage && !title && (
      <div>
        { loading && (<BeatLoader color="#9B9B9B" loading css={override} size={50} />) }
        <div className="row-item-2">
          <button className="more-photos-btn" type="button" onClick={clickFetchMore}>
            <i className="bi bi-three-dots" />
            More photos
          </button>
        </div>
      </div>
    )}
    {!hasNextPage && (
      <div>
        <h3 className="the-end-title">The end</h3>
      </div>
    )}
  </div>
);

export default LoadMore;
