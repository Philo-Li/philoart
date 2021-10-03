import React from 'react';
import CategoryCard from './photo-card/CategoryCard'

const CategoryBar = () => {
  let category = [{
    id: "123",
    title: "Painting",
    photoCount: 10,
    cover: "https://kaboompics.com/cache/c/6/2/5/d/c625dd3a9fa6af4ee04481c1488b4f26cbcbb7bb.jpeg"
    },
    {
      id: "1234",
      title: "Drawing",
      photoCount: 10,
      cover: "https://kaboompics.com/cache/c/6/2/5/d/c625dd3a9fa6af4ee04481c1488b4f26cbcbb7bb.jpeg"
    },
    {
      id: "1235",
      title: "Photograph",
      photoCount: 10,
      cover: "https://kaboompics.com/cache/c/6/2/5/d/c625dd3a9fa6af4ee04481c1488b4f26cbcbb7bb.jpeg"
    }];

  return (
    <div>
      <div className="scrollmenu">
        <div className="p-3 container-row-0">
          {category.map((collection) => (
            <div key={collection.title}>
              <CategoryCard collection = {collection} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;
