
class UserData extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user : this.props.user
        }
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.setState({status: this.props.user.status})
    }

    handleChange (event){
        this.setState({status : event.target.value});
    }

    onSubmit(){
        this.props.onStatusChange(this.props.user.id, this.props.user.status);
    }


    render(){
        return (
            <div>
                <div id='user_data'>
                <label>Name: {this.props.user.name}</label>
                <label>ID: {this.props.user.id}</label>
                <label>Email: {this.props.user.email_address}</label>
                <label>Creation Date: {this.props.user.creation_date}</label>
                <label>Status: {this.props.user.status}</label>
                </div>
                <form onSubmit={this.onSubmit}>
                <label>
                please choose a status:
                <select value={this.props.user.status} onChange={this.handleChange}>
                    <option value="created">Created</option>
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                    <option value="deleted">Deleted</option>
                </select>
                </label>
                <input type="submit" value="Change Status" />
                </form>
            </div>
   
        );

    }

}
//-------------------------------------------------------------------------------------

class UsersList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            users : this.props.users, // this is not working like that
            users_status : 'created', 
            selected_users_by_status : [],
            selected_user_name : '',
            selected_user : '', 
            warning_visable : false
        }

        this.handleChangeSelectedUser = this.handleChangeSelectedUser.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeUserStatus = this.handleChangeUserStatus.bind(this);
        this.getAllUsersWithCurrStatus = this.getAllUsersWithCurrStatus.bind(this);
        this.onStatusChange = this.onStatusChange.bind(this);
    }


    handleChangeUserStatus(event){
        const selcted_users_arr = this.getAllUsersWithCurrStatus(event.target.value);
        this.setState({users_status : event.target.value, selected_users_by_status : selcted_users_arr});
    }

    getAllUsersWithCurrStatus(status){
        let selected_users_arr = [];
        for(let i=0; i < this.props.users.length ; i++){
            if( this.props.users[i].status == status){
                selected_users_arr.push(this.props.users[i]);
            }
        }
        return selected_users_arr;
    }

    handleChangeSelectedUser(event){
        console.log(event.target.value);
        this.setState({selected_user_name : event.target.value, warning_visable : false}); 
    }

    handleSubmit(){
    }

    renderUser(){
        if(this.state.selected_user_name != ''){
            return (
                <div>
                <UserData>user = {this.state.selected_user_name} onStatusChange = {this.onStatusChange}</UserData>
                </div>
            );
        }
        else{
            return '';
        }
    }

    onStatusChange(user_id, user_status){
        if(this.props.handle_change_status){
            this.props.handleChangeStatus(user_id, user_status);
        }
    }
    
    render(){
        return (
            <form>
                <label>
                please choose a status:
                <select value={this.state.users_status} onChange={this.handleChangeUserStatus}>
                    <option value="created">Created</option>
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                    <option value="deleted">Deleted</option>
                </select>
                </label>
                <label>Select a user: </label>
                <select value = {this.state.selected_users_by_status[0]} onChange={this.handleChangeSelectedUser}>
                {this.state.selected_users_by_status.map((user, index) => {return <option key={index} value={user.id}>{user.name}</option>})}
                </select> 
                {/* <input type="submit" value="see details" /> */}
                <button onClick = {this.handleSubmit}> see details </button>
                <label className = {this.state.warning_visable ? "errorVisible" : "errorInvisible"}>
         			Please choose a user
        		</label>                        
                {this.renderUser()};
            </form>
        );                     
    }
}

//-------------------------------------------------------------------------------------
class BroadcastMessage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            text_message : '',
            warning_visable : false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
		this.setState({text_message : event.target.value, warning_visable : false});
	}

    handleSubmit(event) {
		event.preventDefault();
		if(this.state.text_message != ''){
            if(this.props.handle_send_message_to_all){
                this.props.handle_send_message_to_all();
            }
		}
		else{
			this.setState({ text_message : '', warning_visable : true });
		}
	}

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
            <textarea value={this.state.text_message} onChange={this.handleChange} />
            <input type="submit" value="Send broadcast message" />
            </form>
        );

    }
}
//-------------------------------------------------------------------------------------
class AdminPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            token : this.props.token,
            users : []
        }
        
        //TODO: all handling functions
        this.handle_change_status = this.handle_change_status.bind(this);
        this.handle_get_users = this.handle_get_users.bind(this);
        this.handle_send_message_to_all = this.handle_send_message_to_all.bind(this);
        
    }

    async componentDidMount() 
	{
		await this.handle_get_users();
	}

    async handle_change_status(userID, newStatus){
        const response = await fetch('http://localhost:2718/admin/users' , 
        {method:'PUT', 
         body: JSON.stringify( { id: userID, status: newStatus }), 
         headers: { 'Content-Type': 'application/json', 'Authorization' : this.state.token }
         });
        if ( response.status == 200 )
        {
            await this.handle_get_users()
        }
        else 
        {
        const err = await response.text();
        alert( err );
        }

    }

    async handle_send_message_to_all(message){
        const response = await fetch('http://localhost:2718/admin/message' , 
        {method:'POST', 
         body: JSON.stringify( { text: message }), 
         headers: { 'Content-Type': 'text/plain', 'Authorization' : this.state.token }
         });
        if ( response.status == 200 )
        {
            alert(await response.text());
        }
        else 
        {
        const err = await response.text();
        alert( err );
        }

    }


    async handle_get_users(){
        const response = await fetch('http://localhost:2718/social_network/users' , 
        {method:'GET', 
        headers: { 'Content-Type': 'application/json', 'Authorization' : this.state.token }
         });
        if ( response.status == 200 )
        {
            const users_arr = await response.json();
            this.setState({users : users_arr});
        }
        else 
        {
        const err = await response.text();
        alert( err );
        }
    }


    render(){
        return (
            <div>
                <BroadcastMessage handle_send_message_to_all = {this.handle_send_message_to_all}/>
                <br/>
                <br/>
                <UsersList users = {this.state.users} handle_change_status = {this.handle_change_status}/>
            </div>
        );
    }
}
