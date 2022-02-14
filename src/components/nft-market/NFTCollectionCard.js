import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { getExplorer } from '../../utils/networks';
import { getEllipsisTxt } from '../../utils/formatters';
import galleryIcon from '../../img/galleryIcon.jpg';
// import '../../index.css';

const INIT_COVER = galleryIcon;

const NFTCollectionCard = ({
  nft, chainId,
}) => {
  const history = useHistory();

  const openCollection = (collectionId) => {
    history.push(`/collection/${collectionId}`);
  };

  return (
    <div className="p-3">
      <Card key={nft.id}>
        <div
          className="view zoom overlay"
          onClick={() => { openCollection(); }}
          onKeyPress={() => openCollection()}
          role="button"
          tabIndex="0"
        >
          <img
            src={nft?.image || INIT_COVER}
            className="max-height-100"
            alt="collection cover"
          />
          <div className="mask flex-center rgba-blue-light white-text">
            <i size="lg" className="bi bi-search" />
          </div>
        </div>
        <Card.Subtitle>
          <div className="container-user-collection-list-title">
            {true && (
              <div className="user-collection-list-title-padding-left">
                {nft.name}
                adress:
                {getEllipsisTxt(nft.token_address, 10)}
              </div>
            )}
          </div>
          <div className="flex-center">
            <Button
              size="sm"
              onClick={() => window.open(
                `${getExplorer(chainId)}address/${nft.token_address
                }`,
                '_blank',
              )}
            >
              blockchain
            </Button>
            <Button
              size="sm"
              height="10"
              onClick={() => alert('Add marketplace smartcontract integration')}
            >
              Opensea
            </Button>
          </div>
        </Card.Subtitle>
      </Card>
    </div>
  );
};

export default NFTCollectionCard;
