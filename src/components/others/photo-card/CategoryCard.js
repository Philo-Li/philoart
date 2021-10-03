import React from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import galleryIcon from '../../../img/galleryIcon.jpg';
import '../../../MDB-Free_4.19.2/css/mdb.css';

const INIT_COVER = galleryIcon;

const CategoryCard = ({ collection }) => {
  if(!collection) return null;
  const history = useHistory();

  const openCollection = (collectionId) => {
    history.push(`/collection/${collectionId}`);
  };

  return (
    <div className="p-3">
      <Card key={collection.id}>
        <div
          className="view zoom overlay"
          onClick={() => { openCollection(collection.id); }}
          onKeyPress={() => openCollection(collection.id)}
          role="button"
          tabIndex="0"
        >
          <img
            src={collection.cover || INIT_COVER}
            className="max-height-30"
            alt="collection cover"
          />
          <div className="mask flex-center rgba-blue-light white-text">
            <p>{collection.title}</p>
          </div>
        </div>
        <Card.Title>
          <div className="container-user-collection-list-title">
            <div className="user-collection-list-title">
              {collection.title}
              (
              {collection.photoCount}
              )
            </div>
          
          </div>
        </Card.Title>
      </Card>
    </div>
    // <div className="grid-item">
    //   <LazyLoad height={300} offset={[-100, 0]} debounce={500} once placeholder={<Placeholder />}>
    //     <div className="photo-card overlay">
    //       <a href={`/photo/${photo.id}`}>
    //         <img
    //           src={photo.small}
    //           width="100%"
    //           alt="gird item"
    //         />
    //       </a>
    //       <div>
    //         <div id={photo.id} className="text-white">
    //           <button
    //             type="button"
    //             className="photo-card-btn-icon photo-card-btn1"
    //             onClick={() => downloadSinglePhoto()}
    //           >
    //             <i className="bi bi-download" />
    //           </button>
    //         </div>
    //         <div id={photo.id} className="text-white">
    //           <button type="button" className="photo-card-btn-icon photo-card-btn3" onClick={() => openCollectModal()}>
    //             <i className="bi bi-plus-square" />
    //           </button>
    //           <SaveToCollectionsModal
    //             photo={photo}
    //             showCollectModal={showCollectModal}
    //             setShowCollectModal={setShowCollectModal}
    //           />
    //         </div>
    //         <div className="text-white">
    //           <button
    //             type="button"
    //             className="photo-card-btn-icon photo-card-btn2"
    //             onClick={() => likeSinglePhoto(photo)}
    //           >
    //             {!photo.isLiked && (<i className={photo.isLiked ? 'bi bi-heart-fill' : 'bi bi-heart'} />)}
    //             {photo.isLiked && (
    //               <div className="red-icon">
    //                 <i className={photo.isLiked ? 'bi bi-heart-fill' : 'bi bi-heart'} />
    //               </div>
    //             )}
    //           </button>
    //         </div>
    //         { authorizedUser && authorizedUser.username === 'picky' && (
    //           <div className="text-white">
    //             <button
    //               type="button"
    //               className="photo-card-btn-icon photo-card-btn5"
    //               onClick={() => deleteSinglePhoto(photo)}
    //             >
    //               <i className="bi bi-trash-fill" />
    //             </button>
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   </LazyLoad>
    // </div>
  );
};

export default CategoryCard;
