const React = require('react');
const PropTypes = require('prop-types');

class PlayerInput extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      userName: ''
    }
  };

  handleChange = event => {
    this.setState({ userName: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(
      this.props.id,
      this.state.userName
    )
  };

  render() {
    return (
      <form className='column' onSubmit={this.handleSubmit}>
        <label className='header' htmlFor='userName'>
          {this.props.label}
        </label>
        <input 
          id='userName' 
          placeholder='github username' 
          type='text' 
          autoComplete='off' 
          value={this.state.userName} 
          onChange={this.handleChange} 
        />
        <button 
          className='button'
          type='submit'
          disabled={!this.state.userName}>
            Submit
        </button>
      </form>
    )
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

class Battle extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImg: null,
      playerTwoImg: null
    }
  };

  handleSubmit = (id, userName) => {
    this.setState({
      [`${id}Name`]: userName,
      [`${id}Image`]: `https://github.com/${userName}.png?size=200`
    });
  };

  render () {
    const playerOneName = this.state.playerOneName;
    const playerTwoName = this.state.playerTwoName;
    return (
      <div>
        <div className="row">
          {!playerOneName &&
            <PlayerInput 
              id='playerOne'
              label='Player One'
              onSubmit={this.handleSubmit}
            />}

          {!playerTwoName && 
            <PlayerInput 
              id='playerTwo'
              label='Player Two'
              onSubmit={this.handleSubmit}
            />}
        </div>
      </div>
    )
  };
}

module.exports = Battle;