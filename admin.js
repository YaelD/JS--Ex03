
class UserData extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user : this.props.user, 

        }
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.setState({status: this.state.user.status})
    }

    handleChange (event){
        this.setState({status : event.target.value});
    }

    onSubmit(){
        this.props.onStatusChange(this.state.user.id, this.state.status);
    }


    render(){
        return (
            <div>
                <div id='user_data'>
                <label>Name: {this.state.user.name}</label>
                <label>ID: {this.state.user.id}</label>
                <label>Email: {this.state.user.email_address}</label>
                <label>Creation Date: {this.state.user.creation_date}</label>
                <label>Status: {this.state.user.status}</label>
                </div>
                <form onSubmit={this.onSubmit}>
                <label>
                please choose a status:
                <select value={this.state.user.status} onChange={this.handleChange}>
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
            users : this.props.users,
            users_status : 'created', 
            selected_users_by_status : []
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChangeStatus = this.handleChangeStatus(this);
        this.getAllUsersWithCurrStatus = this.getAllUsersWithCurrStatus.bind(this);
    }

    handleChangeStatus(event){
        const selcted_users_arr = this.getAllUsersWithCurrStatus(event.target.value);
        this.setState({users_status : event.target.value, selected_users_by_status : selcted_users_arr});
    }

    getAllUsersWithCurrStatus(status){
        let selected_users_arr = [];
        for(let i=0; i < this.state.users.length ; i++){
            if( this.state.users[i].status == status){
                selected_users_arr.push(this.state.users[i]);
            }
        }
        return selected_users_arr;
    }

    handleChange(event){
    }

    onSubmit(event){

    }

    render(){
        return (
            <div>
                <label>
                please choose a status:
                <select value={this.state.users_status} onChange={this.handleChangeStatus}>
                    <option value="created">Created</option>
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                    <option value="deleted">Deleted</option>
                </select>
                </label>
                <label>Select a user: </label>
                <select value = {this.state.selected_users_by_status[0]} onChange={this.handleChangeUserName}>
                {this.state.usersList.map((user, index) => {return <option key={index} value={user.id}>{user.name}</option>})}
                </select>
            </div>

        );                     
    }
}

//-------------------------------------------------------------------------------------
class BroadcastMessage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            text_message : '',
            warning_visable : false,
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

    handle_send_message_to_all(message){
        const response = await fetch('http://localhost:2718/admin/message' , 
        {method:'POST', 
         body: JSON.stringify( { text: message }), 
         headers: { 'Content-Type': 'application/json', 'Authorization' : this.state.token }
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
        
    }

}
