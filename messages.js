
class Message extends React.Component 
{
	constructor(props) {
		super(props);
	}


	render() {
		return 	<div className = 'post'>
					<span>Send by: {this.props.message.sender_name}</span>
					<br/>
					<span>At: {this.props.message.creation_date}</span>
					<br/>
					<br/>
					<span>{this.props.message.message}</span>
				</div>
	}
}

//-----------------------------------------------------------------------------------------
class MessageList extends React.Component 
{
	constructor(props) 
	{
		super(props);
		this.handle_get_messages = this.handle_get_messages.bind( this );
	}


	handle_get_messages(){
		if(this.props.handle_get_messages){
			this.props.handle_get_messages();
		}
	}


	update_list( messages, token )
	{
		this.setState( {messages : messages, token : token} );
	}

	render() {
		return <div>
			   {this.props.messages.map( (message, index) => { return  <Message 
						message={message} key={index}/>  }  ) }
			   </div>
	}
}

//-----------------------------------------------------------------------------------------
class MessagePage extends React.Component
{
	constructor(props) 
	{
		super(props);
		this.state = {text_message : '', messagesList: [], token: this.props.token, warning_visable : false, usersList : [], selected_user : ''};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);	
		this.update_state = this.update_state.bind(this);
		this.handle_send_message = this.handle_send_message.bind(this);
		this.handle_get_messages = this.handle_get_messages.bind(this);
        this.handle_get_all_users = this.handle_get_all_users.bind(this);
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
	}

	async componentDidMount() 
	{
		const messages = await this.handle_get_messages();
        const users = await this.handle_get_all_users();
		this.setState({selected_user: users[0].id, messagesList : messages, usersList : users});
	}

	handleChange(event) {
		this.setState({text_message : event.target.value, warning_visable : false});
	}
	
	handleSubmit(event) {
		event.preventDefault();
		if(this.state.text_message != ''){
			this.handle_send_message();
		}
		else{
			this.update_state('', this.state.messagesList, this.state.token, true, this.state.usersList);
		}
	}

	async handle_send_message( )
	{
		const response = await fetch('http://localhost:2718/social_network/users/message' , 
							  {method:'PUT', 
							   body: JSON.stringify( {text : this.state.text_message, recipient_id : this.state.selected_user}), 
							   headers: { 'Content-Type': 'application/json', 'Authorization' : this.state.token }
							   });
		if ( response.status == 200 )
		{
			this.update_state('', this.state.messagesList, this.state.token, false, this.state.usersList);	  
		}
		else 
		{
			const err = await response.text();
			alert( err );
		}
	}

	async handle_get_messages()
    {
      const response = await fetch('http://localhost:2718/social_network/users/message' , 
                {method:'GET',  
                   headers: { 'Content-Type': 'application/json', 'Authorization' : this.state.token}
                 });
      if ( response.status != 200 ) {
		  throw new Error ('Error while fetching messages');
	  }
	  const data = await response.json();
	  return data;
    }

    async handle_get_all_users()
    {
      const response = await fetch('http://localhost:2718/social_network/users' , 
                {method:'GET',  
                   headers: { 'Content-Type': 'application/json', 'Authorization' : this.state.token}
                 });
      if ( response.status != 200 ) {
		  throw new Error ('Error while fetching messages');
	  }
	  const users = await response.json();
      console.log(users);

      return users;
    }

    handleChangeUserName(event){
       this.setState({selected_user : event.target.value}); 
    }


	update_state( text_message, messagesList, token, warning_visable, usersList){
		this.setState({text_message : text_message, messagesList : messagesList, token : token, warning_visable : warning_visable, usersList : usersList});
	}


	render() {
		return   <div>
					<form onSubmit={this.handleSubmit}>
                    <label>
                    Pick user you want to send him a message:
                    <br/>
                      <select value = {this.state.selected_user} onChange={this.handleChangeUserName}>
                      {this.state.usersList.map((user, index) => {return <option key={index} value={user.id}>{user.name}</option>})}
                      </select>
                    </label>
					<br/>
         			<textarea value={this.state.text_message} onChange={this.handleChange} />
        			<input type="submit" value="Send" />
      				</form>
					<label className = {this.state.warning_visable ? "errorVisible" : "errorInvisible"}>
         				 Please write something in the message
        			</label>
					<div>
						<MessageList handle_get_messages = {this.handle_get_messages} messages = {this.state.messagesList}/>
					</div>
				  </div>

	}
}