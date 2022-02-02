class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = { email: '', password: '', name: '' };

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handle_add = this.handle_add.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeName(event) {
    this.update_state(this.state.email, this.state.password, event.target.value);
  }

  handleChangeEmail(event) {
    this.update_state(event.target.value, this.state.password, this.state.name);
  }

  handleChangePassword(event) {
    this.update_state(this.state.email, event.target.value, this.state.name);
  }

  async handleSubmit(event) {
    await this.handle_add();
    // if(checkValidation()){

    // }
    // else{

    // }
    //event.preventDefault();
  }

  update_state(email, password, name) {
    this.setState({ email: email, password: password, name: name });
  }

  checkValidation() {
    return true;
  }

  async handle_add() {
    console.log("send", this.state);
    const response = await fetch('http://localhost:2718/social_network/users/register', 
    { method: 'POST',
      body: JSON.stringify({ name: this.state.name, password: this.state.password, email: this.state.email }),
      headers: { 'Content-Type': 'application/json'
       }
    });
    if (response.status == 200) {
      alert('The user ' + this.state.email + ' registered successfully');
    } else {
      const err = await response.text();
      alert(err);
    }
  }

  render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'form',
        null,
        React.createElement(
          'label',
          null,
          'Full name:',
          React.createElement('input', { type: 'text', value: this.state.name, onChange: this.handleChangeName })
        ),
        React.createElement(
          'label',
          null,
          'Email:',
          React.createElement('input', { type: 'email', value: this.state.email, onChange: this.handleChangeEmail })
        ),
        React.createElement(
          'label',
          null,
          'Password:',
          React.createElement('input', { type: 'password', value: this.state.password, onChange: this.handleChangePassword })
        ),
        React.createElement('input', { type: 'submit', value: 'Register' })
      ),
      React.createElement(
        'div',
        null,
        React.createElement(
          'button',
          { className: 'AddButton',
            onClick: this.handle_add },
          'Add User'
        )
      )
    );
  }
}