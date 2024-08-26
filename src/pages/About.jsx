import React from 'react';
import './about.css';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <header className="about-us-header">
        <h1>About Us</h1>
      </header>
      <section className="about-us-content">
        <div className="about-us-text">
          <h2>Our Mission</h2>
          <p>
             our mission is to provide the highest quality products at the best prices to our valued customers. We are committed to delivering exceptional customer service and creating a seamless shopping experience.
          </p>
          <h2>Our Story</h2>
          <p>
            we ave  make online shopping easier and more enjoyable for everyone. Over the years, we have grown into a leading eCommerce platform, offering a wide range of products from trusted brands.
          </p>
          <h2>Our Values</h2>
          <ul>
            <li><strong>Customer Satisfaction:</strong> We put our customers first and strive to exceed their expectations.</li>
          </ul>
        </div>
        <div className="about-us-team">
          <h2>Meet the Team</h2>
          <div className="team-members">
            <div className="team-member">
              <img src="https://via.placeholder.com/150" alt="Team Member 1" />
              <h3>Sameer Ahmed</h3>
              <p>CEO & Founder</p>
            </div>
            <div className="team-member">
              <img src="https://via.placeholder.com/150" alt="Team Member 2" />
              <h3>Aihan Mahmood</h3>
              <p>Chief Operating Officer</p>
            </div>
            <div className="team-member">
              <img src="https://via.placeholder.com/150" alt="Team Member 3" />
              <h3>Wasil Ahmed </h3>
              <p>Head of Marketing</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
