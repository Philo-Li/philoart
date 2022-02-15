import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { getExplorer } from '../../utils/networks';
import { getEllipsisTxt } from '../../utils/formatters';
import galleryIcon from '../../img/galleryIcon.jpg';
import CollectionDropdownButton from './nft-dropdown-btn/CollectionDropdownButtonDotIcon';
import BuyModal from './BuyModal';
import ViewOnExplorerModal from './ViewOnExplorerModal';

const INIT_COVER = galleryIcon;

const NFTCollectionCard = ({
  nft, chainId,
}) => {
  const history = useHistory();
  const [showViewOnExplorerModal, setShowViewOnExplorerModal] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);

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
              <div className="">
                {nft.name}
              </div>
            )}
          </div>
          <div className="container-user-collection-list-title">
            {true && (
              <div className="">
                {nft.name}
                {getEllipsisTxt(nft.token_address, 10)}
              </div>
            )}
          </div>
          <div className="user-collection-list-btn">
            {true && (
              <CollectionDropdownButton
                setShowViewOnExplorerModal={setShowViewOnExplorerModal}
                setShowBuyModal={setShowBuyModal}
              />
            )}
            <ViewOnExplorerModal
              url={`${getExplorer(chainId)}address/${nft.token_address}`}
              showViewOnExplorerModal={showViewOnExplorerModal}
              setShowViewOnExplorerModal={setShowViewOnExplorerModal}
            />
            <BuyModal
              showBuyModal={showBuyModal}
              setShowBuyModal={setShowBuyModal}
            />
          </div>
        </Card.Subtitle>
      </Card>
    </div>
  );
};

export default NFTCollectionCard;
