
class ReactContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            LOGIN : "login",
            REGISTER : "register",
            HOME_PAGE : "homePage",
            currPage : "login",
            user : null
        }
        this.renderLogin = this.renderLogin.bind(this);
        this.renderRegister = this.renderRegister.bind(this);
        this.renderNewState = this.renderNewState.bind(this);
        this.renderHome = this.renderHome.bind(this);
        this.onRegisterClick = this.onRegisterClick.bind(this);
        this.onLoginClick = this.onLoginClick.bind(this);
        this.handle_login = this.handle_login.bind(this);
        this.handle_register = this.handle_register.bind(this);
        this.handlelogOut =this.handlelogOut.bind(this);
    }

    async handle_register(userName, userEmail, userPassword)
    {
      const response = await fetch('http://localhost:2718/social_network/users/register' , 
                {method:'POST', 
                 body: JSON.stringify( {
                     name: userName, 
                    password : userPassword, 
                    email : userEmail
                }), 
                   headers: { 'Content-Type': 'application/json' }
                 });
      if ( response.status == 200 )
      {
        alert('The user ' + this.state.email + ' registered successfully');	 
        this.setState({currPage : this.state.LOGIN}) 
      }
      else 
      {
        const err = await response.text();
        alert( err );
      }
    }

    async handle_login(userEmail, userPassword) {
        const response = await fetch('http://localhost:2718/social_network/users/login', { method: 'POST',
          body: JSON.stringify({ password: userPassword, email: userEmail }),
          headers: { 'Content-Type': 'application/json' }
        });
        if (response.status == 200) {
             
          const curr_token = JSON.parse(response.headers.get("Authorization")).token;
          this.setState(
            {
                token : curr_token,
                user: await response.json(),
                currPage : this.state.HOME_PAGE
            } );
        } else {
          const err = await response.text();
          alert(err);
        }
      }

    renderNewState(newState){
        if(newState == this.state.LOGIN){
            return this.renderLogin();
        }
        else if(newState == this.state.REGISTER){
            return this.renderRegister();
        }
        else{
            return this.renderHome();
        }

    }
    async handlelogOut(){
        const response = await fetch('http://localhost:2718/social_network/users/logout' , 
        {method:'PUT',  
           headers: { 'Content-Type': 'application/json', 'Authorization' : this.state.token}
         });
        if ( response.status != 200 ) {
            throw new Error ('Error while fetching messages');
        }
        const text = await response.text();
        this.setState({currPage: this.state.LOGIN});
        alert(text);
    
    }

    renderHome(){
            
        return (
        <HomePage token = {this.state.token} user = {this.state.user} logOut = {this.handlelogOut}></HomePage>
        );
    }

    onRegisterClick(){
        this.setState({currPage: this.state.REGISTER});
    }

    onLoginClick(){
        this.setState({currPage: this.state.LOGIN});
    }

    renderLogin(){
        return (
            <div>
            <Login onLogin = {this.handle_login}> </Login>
            <label>To register click here</label>
            <button onClick ={this.onRegisterClick}> Register </button>
            </div>
        );
    }

    renderRegister(){
        return (
            <div>
            <Register onRegister = {this.handle_register}> </Register>
           <label>To login click here</label>
           <button onClick ={this.onLoginClick}> Login </button>
           </div>
        );
    }

     render(){
        return (
            <div id = "BaseContainer">
                {this.renderNewState(this.state.currPage)}
            </div>
        );
    }
}


