const React = require('react');
const PropTypes = require('prop-types');
const Link = require('react-router-dom').Link;
const PlayerPreview = require('./PlayerPreview');

class PlayerInput extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      userName: ''
    }
  };

  handleChange = event => {
    this.setState({ userName: event.target.value })
  };

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
};

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};

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
      [`${id}Img`]: `https://github.com/${userName}.png?size=200`
    });
  };

  handleReset = id => {
    this.setState({
      [`${id}Name`]: '',
      [`${id}Img`]: null
    });
  };

  render () {
    const playerOneName = this.state.playerOneName;
    const playerTwoName = this.state.playerTwoName;
    const playerOneImg = this.state.playerOneImg;
    const playerTwoImg = this.state.playerTwoImg;
    const match = this.props.match;

    return (
      <div>
        <div className="row">
          {!playerOneName &&
            <PlayerInput 
              id='playerOne'
              label='Player One'
              onSubmit={this.handleSubmit}
            />}

            {playerOneImg !== null &&
              <PlayerPreview 
                avatar={playerOneImg}
                userName={playerOneName}
              >
                <button
                  className='reset'
                  onClick={() => this.handleReset('playerOne')}>
                    Reset
                </button>
              </PlayerPreview>
            }

          {!playerTwoName &&
            <PlayerInput 
              id='playerTwo'
              label='Player Two'
              onSubmit={this.handleSubmit}
            />}

          {playerTwoImg !== null &&
            <PlayerPreview avatar={playerTwoImg} userName={playerTwoName}>
              <button className='reset' onClick={() => this.handleReset('playerTwo')}>
                  Reset
              </button>
            </PlayerPreview>
          }
        </div>

        {playerOneImg && playerTwoImg &&
          <Link
            className='button'
            to={{
              pathname: `${match.url}/results`,
              search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
            }}>
            Battle
          </Link>}
      </div>
    )
  };
}

module.exports = Battle;