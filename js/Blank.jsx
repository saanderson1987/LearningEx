import React from 'react';

class Blank extends React.Component {
  constructor(props) {

  }

  render() {
    return (
      <input
        onChange={this.handleInputChange}
        value={this.state}
      />
    );
  }

}

export default Blank;
