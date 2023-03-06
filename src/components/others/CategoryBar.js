import React from 'react';
import CategoryCard from './photo-card/CategoryCard';

const CategoryBar = () => {
  const category = [{
    id: 'eEWmzhJf3hR7E0NiJU98l',
    title: 'Paintings',
    cover: 'https://cdn.philoart.io/c/700x700/zu3VmDeCCM55iPp2zZAVZ.jpg',
  },
  {
    id: 'yibOLLFlIQtchyC6b5osL',
    title: 'Digital Art',
    cover: 'https://cdn.philoart.io/e/700x700/psYTmeZf1z6O2jukzPlyl.jpg',
  },
  {
    id: 'YddPZXbgHkBRf4MVkDpXM',
    title: 'Photograph',
    cover: 'https://cdn.philoart.io/8/700x700/Ho0OQ4zzTXzg7sUsOeTMF.jpg',
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
