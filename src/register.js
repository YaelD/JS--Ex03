class Register extends React.Component {

    constructor(props) {
      super(props);
      this.state = {email: '', password: '', name: ''};
  
      this.handleChangeEmail = this.handleChangeEmail.bind(this);
      this.handleChangePassword = this.handleChangePassword.bind(this);
      this.handleChangeName = this.handleChangeName.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
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
      if(checkValidation()){
        await this.handle_add()
        
      }
      else{
        
      }
      event.preventDefault();
    }

    update_state(email, password, name){
        this.setState({ email : email, password : password, name : name});
    }

    async handle_add( )
    {
      const response = await fetch('/users/register' , 
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
        <form onSubmit={this.handleSubmit}>
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
        <div>

        </div>
        </div>
      );
    }
  }
