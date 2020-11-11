import React from 'react';
import PropTypes from 'prop-types';

const Scoretable = () => {

  return(
    <div>
      Your points here
    </div>
  )
}

Scoretable.propTypes = {
  asserts: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
}

export default Scoretable;