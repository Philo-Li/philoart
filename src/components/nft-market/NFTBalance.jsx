/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { useMoralis, useNFTBalances } from 'react-moralis';

import {
  Modal, Input,
} from 'antd';
import Masonry from 'react-masonry-css';
// eslint-disable-next-line import/named
import { useVerifyMetadata } from '../../hooks/useVerifyMetadata';
import AddressInput from './AddressInput';

import '../../index.css';
// import './index.css';
import NFTCollectionCard from './NFTCollectionCard';

const styles = {
  // NFTs: {
  //   display: 'flex',
  //   flexWrap: 'wrap',
  //   WebkitBoxPack: 'start',
  //   justifyContent: 'flex-start',
  //   margin: '0 auto',
  //   maxWidth: '1000px',
  //   width: '100%',
  //   gap: '10px',
  // },
};

const breakpointColumnsObj = {
  default: 3,
  800: 2,
  500: 1,
};

function NFTBalance() {
  const { data: NFTBalances } = useNFTBalances();
  // const { Moralis, chainId } = useMoralis();
  const [visible, setVisibility] = useState(false);
  const [receiverToSend, setReceiver] = useState(null);
  const [amountToSend, setAmount] = useState(null);
  const [nftToSend, setNftToSend] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { verifyMetadata } = useVerifyMetadata();

  // eslint-disable-next-line object-curly-newline
  const { Moralis, chainId, isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } = useMoralis();

  useEffect(() => {
    const connectorId = window.localStorage.getItem('connectorId');
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) { enableWeb3({ provider: connectorId }); }
  }, [isAuthenticated, isWeb3Enabled]);

  async function transfer(nft, amount, receiver) {
    console.log(nft, amount, receiver);
    const options = {
      type: nft?.contract_type?.toLowerCase(),
      tokenId: nft?.token_id,
      receiver,
      contractAddress: nft?.token_address,
    };

    if (options.type === 'erc1155') {
      options.amount = amount ?? nft.amount;
    }

    setIsPending(true);

    try {
      const tx = await Moralis.transfer(options);
      console.log(tx);
      setIsPending(false);
    } catch (e) {
      alert(e.message);
      setIsPending(false);
    }
  }

  const handleTransferClick = (nft) => {
    setNftToSend(nft);
    setVisibility(true);
  };

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  console.log('NFTBalances', NFTBalances);
  return (
    <div style={{ padding: '15px', maxWidth: '1030px', width: '100%' }}>
      <div className="p-3 discover">
        <div className="p-3 container-profile">
          <div className="profile-item">
            <p className="header">NFT Marketplace</p>
          </div>
        </div>
        <div style={styles.NFTs}>
          <div className="p-3 photo-list-container">
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {NFTBalances?.result
                && NFTBalances.result.map((nft, index) => {
                  // Verify Metadata
                  // eslint-disable-next-line no-param-reassign
                  nft = verifyMetadata(nft);
                  return (
                    <>
                      <NFTCollectionCard nft={nft} chainId={chainId} handleTransferClick={handleTransferClick} />
                    </>
                  );
                })}
            </Masonry>
          </div>
        </div>
      </div>
      <Modal
        title={`Transfer ${nftToSend?.name || 'NFT'}`}
        visible={visible}
        onCancel={() => setVisibility(false)}
        onOk={() => transfer(nftToSend, amountToSend, receiverToSend)}
        confirmLoading={isPending}
        okText="Send"
      >
        <AddressInput autoFocus placeholder="Receiver" onChange={setReceiver} />
        {nftToSend && nftToSend.contract_type === 'erc1155' && (
          <Input
            placeholder="amount to send"
            onChange={(e) => handleChange(e)}
          />
        )}
      </Modal>
    </div>
  );
}

export default NFTBalance;
