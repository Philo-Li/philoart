import React, { useState, useEffect } from 'react';
import {
  useMoralis, useMoralisWeb3Api,
} from 'react-moralis';

import {
  Modal, Input,
} from 'antd';
import Masonry from 'react-masonry-css';
import { useVerifyMetadata } from '../../hooks/useVerifyMetadata';
import AddressInput from './AddressInput';

import NFTListCard from './NFTListCard';
import 'antd/dist/antd.css';

const styles = {
};

const breakpointColumnsObj = {
  default: 3,
  800: 2,
  500: 1,
};

function NFTList() {
  const [visible, setVisibility] = useState(false);
  const [receiverToSend, setReceiver] = useState(null);
  const [amountToSend, setAmount] = useState(null);
  const [nftToSend, setNftToSend] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { verifyMetadata } = useVerifyMetadata();
  const [totalNFTs, setTotalNFTs] = useState();

  // eslint-disable-next-line object-curly-newline
  const { Moralis, chainId, isWeb3Enabled, isAuthenticated } = useMoralis();

  const web3Api = useMoralisWeb3Api();

  useEffect(async () => {
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

  const getnfts = async (address) => {
    const res = await web3Api.token.getAllTokenIds({ chain: 'eth', address });
    // console.log('nfts', res.result);
    if (res.result) {
      const temp = res.result
        ? res.result.map((nft) => {
          // console.log('here!!!', nft);
          const metadata = JSON.parse(nft.metadata);
          const url = metadata.image;
          const imageurl = url.substr(0, 4) === 'ipfs' ? `https://ipfs.io/ipfs/${metadata.image.substr(7)}` : url;
          const newNft = { ...nft, metadata, image: metadata && imageurl };
          return metadata ? newNft : '';
        })
        : [];

      setTotalNFTs(temp);
    }
  };

  // console.log('NFTBalances', NFTBalances);
  // console.log('chainId', chainId);

  return (
    <div style={{ padding: '15px', maxWidth: '1030px', width: '100%' }}>
      <div className="p-3 discover">
        <div className="p-3 container-profile">
          <div className="profile-item">
            <p className="header">NFTs by address</p>
          </div>
        </div>
        <div className="p-3 container-profile">
          <div className="profile-item">
            <AddressInput autoFocus placeholder="Address" onChange={setReceiver} />
            <button className="navbar-button-logout p-2" type="submit" onClick={() => { getnfts(receiverToSend); }}>Search</button>
          </div>
        </div>
        <div style={styles.NFTs}>
          <div className="p-3 photo-list-container">
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {totalNFTs
                && totalNFTs.map((nft) => {
                  // Verify Metadata
                  // eslint-disable-next-line no-param-reassign
                  nft = verifyMetadata(nft);
                  // console.log('this nft', nft);
                  return (
                    <>
                      <NFTListCard
                        nft={nft}
                        chainId={chainId}
                        handleTransferClick={handleTransferClick}
                      />
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

export default NFTList;
