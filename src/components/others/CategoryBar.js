import React from 'react';
import CategoryCard from './photo-card/CategoryCard';

const CategoryBar = () => {
  const category = [{
    id: '123',
    title: 'Painting',
    photoCount: 10,
    cover: 'https://pbs.twimg.com/media/FADpaqoUcAcFB40?format=jpg&name=large',
  },
  {
    id: '1234',
    title: 'Drawing',
    photoCount: 10,
    cover: 'https://philo-art.oss-cn-hangzhou.aliyuncs.com/gallery/2020-07-07%2002.08.49%201.jpg',
  },
  {
    id: '1235',
    title: 'Photograph',
    photoCount: 10,
    cover: 'https://philo-art.oss-cn-hangzhou.aliyuncs.com/gallery/2020-07-07%2003.13.41%201.jpg',
  }];

  return (
    <div>
      <div className="scrollmenu">
        <div className="p-3 container-row-0">
          {category.map((collection) => (
            <div key={collection.title}>
              <CategoryCard collection={collection} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;
