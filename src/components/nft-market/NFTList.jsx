/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  useMoralis, useMoralisWeb3Api,
} from 'react-moralis';
import { nanoid } from 'nanoid';

import {
  Modal, Input,
} from 'antd';
import Masonry from 'react-masonry-css';
import { useVerifyMetadata } from '../../hooks/useVerifyMetadata';
import AddressInput from './AddressInput';
import LoadMore from '../others/button/LoadMore';
import NFTListCard from './NFTListCard';
import 'antd/dist/antd.css';

const styles = {
};

const merge = (a, b, prop) => {
  const reduced = a.filter((aitem) => !b.find((bitem) => aitem[prop] === bitem[prop]));
  return reduced.concat(b);
};

const breakpointColumnsObj = {
  default: 4,
  1250: 3,
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
  const [nftsToShow, setnftsToShow] = useState();
  const [pageNow, setPageNow] = useState(1);
  const [loading, setLoading] = useState(false);
  const PerLoad = 10;

  const { Moralis, chainId } = useMoralis();

  const web3Api = useMoralisWeb3Api();

  useEffect(async () => {
    setLoading(true);
    if (totalNFTs) {
      const Start = pageNow * PerLoad - PerLoad;
      const End = pageNow * PerLoad;
      const newLoad = totalNFTs.slice(0, End);
      setnftsToShow(newLoad);
      setLoading(false);
    }
  }, [pageNow]);

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

  const clickFetchMore = () => {
    setPageNow(pageNow + 1);
    setLoading(true);
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
      const newLoad = temp.slice(0, pageNow * PerLoad);
      setnftsToShow(newLoad);
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '15px', width: '100%' }}>
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
              {nftsToShow
                && nftsToShow.map((nft, index) => {
                  // Verify Metadata
                  // eslint-disable-next-line no-param-reassign
                  nft = verifyMetadata(nft);
                  return (
                    <div key={nanoid()}>
                      <NFTListCard
                        nft={nft}
                        chainId={chainId}
                        handleTransferClick={handleTransferClick}
                      />
                    </div>
                  );
                })}
            </Masonry>
          </div>
        </div>
      </div>
      {nftsToShow && (
      <LoadMore
        hasNextPage
        loading={loading}
        clickFetchMore={clickFetchMore}
      />
      )}
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
