import { Accordion } from "../../components/Accordion/Accordion";
import { useState, useEffect } from "react";

export const Home = () => {
  const [artworks, setArtworks] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({});
  const categories = [];

  useEffect(() => {
    fetch(
      "https://api.artic.edu/api/v1/artworks/search?fields=id,title,artist_id,category_ids,category_titles,image_id,thumbnail&query[term][artist_id]=40610&size=20"
    )
      .then((res) => res.json())
      .then((data) => setArtworks(data.data));
  }, []);

  const handleChange = (category, toggle) => {
    setExpandedCategories((prevState) => {
      return {
        ...prevState,
        [category]: toggle,
      };
    });
  };

  artworks.map((category) => {
    categories.includes(category.category_titles[0])
      ? null
      : categories.push(category.category_titles[0]);
    category.category_titles.length > 1
      ? categories.includes(category.category_titles[1])
        ? null
        : categories.push(category.category_titles[1])
      : null;
  });

  return (
    <div className="page">
      <h2 className="title-2">Mr. Van G</h2>
      {categories.map((category, index) => {
        return (
          <Accordion key={index} title={category}>
            <div
              className={
                expandedCategories[category]
                  ? "accordion__container"
                  : "accordion__container-collapsed"
              }
            >
              <div className="accordion__category-title-container">
                <img
                  className="accordion__icon-category"
                  src={`https://www.artic.edu/iiif/2/${artworks[index].image_id}/full/50,/0/default.jpg`}
                  alt={`${category}`}
                />
                <h2>{category}</h2>
                <img
                  onClick={
                    expandedCategories[category]
                      ? () => handleChange(category, false)
                      : () => handleChange(category, true)
                  }
                  className="accordion__arrow-icon"
                  src="/ArrowIcon.png"
                  alt="Arrow"
                />
              </div>
              <div
                className={
                  expandedCategories[category]
                    ? "accordion__cards-container"
                    : "collapsed"
                }
              >
                {artworks.map((el, i) => {
                  return el.category_titles.length > 1
                    ? categories[index] === el.category_titles[1] && (
                        <div key={i} className="accordion__picture-card">
                          <img
                            src={`https://www.artic.edu/iiif/2/${el.image_id}/full/200,/0/default.jpg`}
                            alt={`${el.thumbnail.alt_text}`}
                          />
                          <h3>{el.title}</h3>
                        </div>
                      )
                    : categories[index] === el.category_titles[0] && (
                        <div key={i} className="accordion__picture-card">
                          <img
                            src={`https://www.artic.edu/iiif/2/${el.image_id}/full/200,/0/default.jpg`}
                            alt={`${el.thumbnail.alt_text}`}
                          />
                          <h3>{el.title}</h3>
                        </div>
                      );
                })}
              </div>
            </div>
          </Accordion>
        );
      })}
    </div>
  );
};
