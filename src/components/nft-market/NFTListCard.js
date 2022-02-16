/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Card, Image, Tooltip, Modal, Input, Alert, Spin, Button,
} from 'antd';
import { FileSearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { getExplorer } from '../../utils/networks';
import { getEllipsisTxt } from '../../utils/formatters';
import 'antd/dist/antd.css';

const { Meta } = Card;

const NFTListCard = ({
  nft, chainId, handleTransferClick,
}) => {
  const history = useHistory();

  return (
    <div className="p-3">
      <Card
        hoverable
        actions={[
          <Tooltip title="View On Blockexplorer">
            <FileSearchOutlined
              onClick={() => window.open(
                `${getExplorer(chainId)}address/${nft.token_address}`,
                '_blank',
              )}
            />
          </Tooltip>,
          <Tooltip title="List NFT for sale">
            <ShoppingCartOutlined onClick={() => { handleTransferClick(nft); }} />
          </Tooltip>,
        ]}
        style={{ width: 240, border: '2px solid #e7eaf3' }}
        cover={(
          <Image
            preview={false}
            src={nft?.image || 'error'}
            alt=""
            style={{ height: '240px' }}
          />
        )}
        key={nft.id}
      >
        <Meta title={nft.name} description={nft.token_address} />
      </Card>
    </div>
  );
};

export default NFTListCard;
