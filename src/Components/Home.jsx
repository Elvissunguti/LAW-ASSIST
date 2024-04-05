import React from 'react';

const Home = () => {

 

  return (
    <div>
      <h1>Welcome to My Website</h1>
      <p>Please sign in or sign up with Google to continue:</p>
      <a href="http://localhost:8080/auth/google" target="_blank" rel="noopener noreferrer">Login with Google</a>
    </div>
  );
};

export default Home;
