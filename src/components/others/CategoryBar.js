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
    cover: 'https://philoart.oss-cn-shanghai.aliyuncs.com/%2310/%2399.jpg',
  },
  {
    id: '1235',
    title: 'Photograph',
    photoCount: 10,
    cover: 'https://pbs.twimg.com/media/FALwz4FVEAkrVNV?format=jpg&name=4096x4096',
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
