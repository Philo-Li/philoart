/* eslint-disable arrow-body-style */
import React from 'react';
import { Image } from 'react-bootstrap';

const ProfileDetailCard = ({ profileImage, userNow }) => {
  return (
    <div className="p-3">
      <div className="container-profile">
        <div className="profile-item">
          <Image src={profileImage} width={80} height={80} magin={10} roundedCircle />
        </div>
        <div className="profile-item">
          <h3>{userNow && `${userNow.firstName} ${userNow.lastName || ''}`}</h3>
        </div>
      </div>
      {userNow && userNow.description && (
        <div className="container-profile">
          <div className="user-description">{userNow.description}</div>
        </div>
      )}
      <div className="container-profile">
        <div className="profile-item">
          {`${userNow ? userNow.articleCount : 0} articles`}
        </div>
        {/* <div className="profile-item">
          {`${userNow ? userNow.followingCount : 0} followings`}
        </div> */}
        <div className="profile-item">
          {`${userNow ? userNow.followerCount : 0} followers`}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailCard;
