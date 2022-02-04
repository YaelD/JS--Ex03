


class UserData extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user : this.props.user, 

        }
        this.handle_change = this.handle_change.bind(this);
        this.on_submit = this.on_submit.bind(this);
        this.setState({status: this.state.user.status})
    }

    handle_change (event){
        this.setState({status : event.target.value});
    }

    on_submit(){
        this.props.onStatusChange(this.state.user.is, this.state.status);
    }


    render(){
        return (
            <div>
                <label>Name: {this.state.user.name}</label>
                <label>ID: {this.state.user.id}</label>
                <label>Email: {this.state.user.email_address}</label>
                <label>Creation Date: {this.state.user.creation_date}</label>
                <label>Status: {this.state.user.status}</label>
                <form onSubmit={this.on_submit}>
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
