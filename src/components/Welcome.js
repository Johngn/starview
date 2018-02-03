import React from 'react';

const Welcome = () => {
  return (
    <div id="welcome" className="container">
      <p>This app provides information about cloud cover, humidity, and average wind speed for any location in the world. These are the conditions that most affect the ability to view astronomical objects in the night sky. Enter your location in the search box above to get a graph of the forecast for the next five nights. The graph for each day begins at sunset and ends at sunrise local time. See the about page for more information.</p>
    </div>
  )
}

export default Welcome;