class NameForm extends React.Component {

    constructor(props) {
      super(props);
      this.state = {email: '', password: ''};
  
      this.handleChangeEmail = this.handleChangeEmail.bind(this);
      this.handleChangePassword = this.handleChangePassword.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChangeEmail(event) {
        this.update_state(event.target.value , this.state.password);
    }

    handleChangePassword(event) {
        this.update_state(this.state.email , event.target.value);
    }
  
    handleSubmit(event) {
      alert('The user ' + this.state.email + ' submmited successfully');
      event.preventDefault();
    }

    update_state(email, password){
        this.setState({ email : email, password : password});
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
            <br/>
          <label>
            Email:
            <input type="text" value={this.state.email} onChange={this.handleChangeEmail} />
          </label>
          <br/>
          <br/>
          <label>
            Password:
            <input type="password" value={this.state.password} onChange={this.handleChangePassword} />
          </label>
          <br/>
          <br/>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

  