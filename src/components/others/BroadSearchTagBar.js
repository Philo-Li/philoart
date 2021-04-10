import React from 'react';
import { useHistory } from 'react-router-dom';

const BroadSearchTagBar = ({ tagToShow }) => {
  const history = useHistory();
  let tags = ['nature', 'animals', 'people', 'travel', 'food', 'sea', 'texture', 'interiors', 'art'];
  if (tagToShow) tags = tagToShow;

  const onSubmit = async (tag) => {
    history.push(`/search?q=${tag}`);
  };

  return (
    <div>
      <div className="scrollmenu">
        <div className="p-3 container-row-tag">
          {tags.map((tag) => (
            <div className="" key={tag}>
              <button className="tag-btn" type="button" onClick={() => onSubmit(tag)}>
                {tag}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BroadSearchTagBar;
