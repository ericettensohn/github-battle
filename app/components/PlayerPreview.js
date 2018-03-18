const React = require('react');
const PropTypes = require('prop-types');
const Link = require('react-router-dom').Link;

function PlayerPreview(props) {
  return (
    <div>
      <div className='column'>
        <img
          className='avatar'
          src={props.avatar}
          alt={`avatar for '${props.userName}`}
        />
        <h2 className='username'>@{props.userName}</h2>
      </div>
      {props.children}
    </div>
  )
}

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

// PlayerPreview.propTypes = {
//   label: PropTypes.string.isRequired,
//   score: PropTypes.number.isRequired,
//   profile: PropTypes.object.isRequired
// }

module.exports = PlayerPreview;