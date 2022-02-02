class Login extends React.Component {

    constructor(props) {
      super(props);
      this.state = {email: '', password: '', warning_visible : false};
  
      this.handleChangeEmail = this.handleChangeEmail.bind(this);
      this.handleChangePassword = this.handleChangePassword.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handle_login = this.handle_login.bind(this);
      this.checkValidation = this.checkValidation.bind(this);
    }
  
    handleChangeEmail(event) {
        this.update_state(event.target.value , this.state.password, false);
    }

    handleChangePassword(event) {
        this.update_state(this.state.email , event.target.value, false);
    }

    update_state(email, password, warning_visible){
        this.setState({ email : email, password : password, warning_visible : warning_visible});
    }

    async handleSubmit(event) {
      if(this.checkValidation()){
        await this.handle_login();
        this.update_state(this.state.email, this.state.password, false);
      }
      else{
        this.update_state(this.state.email, this.state.password, true);
      }
      event.preventDefault();
    }

    checkValidation(){
      console.log("State=", this.state);
      if(this.state.email!='' &&  this.state.password != ''){
        return true;
      }
      return false;
    }

    async handle_login( )
    {
      const response = await fetch('http://localhost:2718/social_network/users/login' , 
                {method:'POST', 
                 body: JSON.stringify( {password : this.state.password, email : this.state.email}), 
                   headers: { 'Content-Type': 'application/json' }
                 });
      if ( response.status == 200 )
      {
        alert('The user ' + this.state.email + ' login successfully');	  
      }
      else 
      {
        const err = await response.text();
        alert( err );
      }
    }
  
    render() {
      return (
        <div>
        <form onSubmit={this.handleSubmit}>
            <br/>
          <label>
            Email:
            <input type="email" value={this.state.email} onChange={this.handleChangeEmail} />
          </label>
          <br/>
          <br/>
          <label>
            Password:
            <input type="password" value={this.state.password} onChange={this.handleChangePassword} />
          </label>
          <br/>
          <br/>
          <input type="submit" value="Login" />
        </form>
          <label className = {this.state.warning_visible ? "errorVisible" : "errorInvisible"}>
          Error! You should fill all the fields
          </label>
        </div>
      );
    }
  }

  