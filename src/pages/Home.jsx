import React from 'react';

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-content text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Store</h1>
          <p className="text-lg mb-8">Find the best products at unbeatable prices</p>
          <button className="btn">Shop Now</button>
        </div>
      </section>

      <section className="featured-products py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
        <div className="products-container">

          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="product-card bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={`https://via.placeholder.com/300x200?text=Product+${index + 1}`} alt={`Product ${index + 1}`} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Product {index + 1}</h3>
                <p className="text-gray-700 mb-4">$29.99</p>
                <button className="btn">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="categories py-12 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
        <div className="categories-container">

          {['Electronics', 'Fashion', 'Home & Kitchen', 'Sports'].map((category, index) => (
            <div key={index} className="category-card bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={`https://via.placeholder.com/300x200?text=${category}`} alt={category} className="w-full h-40 object-cover" />
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold mb-2">{category}</h3>
                <button className="btn">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Your E-Commerce Store. All rights reserved.</p>
        </div>
      </footer>

      <style jsx>{`
        .home-container {
          width: 100%;
          height: 100%;
        }

        .hero {
          background-image: url('https://via.placeholder.com/1500x600?text=Hero+Banner'); 
          background-size: cover;
          background-position: center;
          height: 50vh;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .hero-content {
          text-align: center;
        }

        .btn {
          background-color: #f59e0b;
          color: black;
          padding: 0.75rem 1.5rem;
          border-radius: 0.375rem;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .btn:hover {
          background-color: #eab308;
        }

        .products-container {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
        }

        .product-card {
          transition: transform 0.3s, box-shadow 0.3s;
          flex: 1 1 calc(25% - 1rem); /* Adjust width as needed */
        }

        .product-card:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
        }

        .categories-container {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
        }

        .category-card {
          transition: transform 0.3s, box-shadow 0.3s;
          flex: 1 1 calc(25% - 1rem); /* Adjust width as needed */
        }

        .category-card:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
};

export default Home;
