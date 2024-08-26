import React from 'react';
import './Collection.css';

const Collection = () => {
  const collections = [
    { id: 1, title: 'New Arrivals', imageUrl: 'https://via.placeholder.com/400x250?text=New+Arrivals' },
    { id: 2, title: 'Best Sellers', imageUrl: 'https://via.placeholder.com/400x250?text=Best+Sellers' },
    { id: 3, title: 'Seasonal Favorites', imageUrl: 'https://via.placeholder.com/400x250?text=Seasonal+Favorites' },
    { id: 4, title: 'On Sale', imageUrl: 'https://via.placeholder.com/400x250?text=On+Sale' },
  ];

  return (
    <div className="collection-container">
      <header className="collection-header">
        <h1>Our Collections</h1>
        <p>Explore our curated collections to find the perfect products for you.</p>
      </header>
      <section className="collection-grid">
        {collections.map((collection) => (
          <div key={collection.id} className="collection-card">
            <img src={collection.imageUrl} alt={collection.title} className="collection-image" />
            <div className="collection-info">
              <h2>{collection.title}</h2>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
export default Collection;
