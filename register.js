class Register extends React.Component {

    constructor(props) {
      super(props);
      this.state = {email: '', password: '', name: '', warning_visable : false};
  
      this.handleChangeEmail = this.handleChangeEmail.bind(this);
      this.handleChangePassword = this.handleChangePassword.bind(this);
      this.handleChangeName = this.handleChangeName.bind(this);
      this.handle_add = this.handle_add.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.checkValidation = this.checkValidation.bind(this);
    }

    handleChangeName(event){
        this.update_state(this.state.email, this.state.password, event.target.value);
    }
  
    handleChangeEmail(event) {
        this.update_state( event.target.value, this.state.password,  this.state.name);
    }

    handleChangePassword(event) {
        this.update_state(this.state.email , event.target.value, this.state.name);
    }
  
    async handleSubmit(event) {
      if(this.checkValidation()){
        await this.handle_add();
        this.update_state(this.state.email, this.state.password, this.state.name, false);
      }
      else{
        this.update_state(this.state.email, this.state.password, this.state.name, true);
      }
      event.preventDefault();
    }

    update_state(email, password, name, wranning_visible){
        this.setState({ email : email, password : password, name : name, warning_visable : wranning_visible});
    }

    checkValidation(){
      console.log("State=", this.state);
      if(this.state.email!='' && this.state.name != '' && this.state.password != ''){
        return true;
      }
      return false;
    }

    async handle_add( )
    {
      const response = await fetch('http://localhost:2718/social_network/users/register' , 
                {method:'POST', 
                 body: JSON.stringify( {name: this.state.name, password : this.state.password, email : this.state.email}), 
                   headers: { 'Content-Type': 'application/json' }
                 });
      if ( response.status == 200 )
      {
        alert('The user ' + this.state.email + ' registered successfully');	  
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
            <form onSubmit = { this.handleSubmit}>
            <br/>
            <label>
            Full name:
            <input type="text" value={this.state.name} onChange={this.handleChangeName} />
          </label>
          <br/>
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
          <input type="submit" value="Register"/>
        </form>
        <label className = {this.state.warning_visable ? "errorVisible" : "errorInvisible"}>
          Error! You should fill all the fields
        </label>
        </div>

      );
    }
  }
