class HomePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            HOME_PAGE : "home",
            MESSAGE_PAGE : "message",
            ADMIN_PAGE : "admin",
            token : props.token,
            currPage : "home"
        };
        this.renderPage = this.renderPage.bind(this);
        this.handleHome = this.handleHome.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
        this.handleAdmin = this.handleAdmin.bind(this);

        console.log("in HOME PAGE C'TOR", this);

    }

    renderPage(page){
        if(page == this.state.MESSAGE_PAGE){
            return this.renderMessages();
        }
        else if(page == this.state.HOME_PAGE){
            return this.renderPosts();
        }
        else if(page == this.state.ADMIN_PAGE){
            return this.renderAdmin();
        }
    }

    handleHome(){
        this.setState({currPage: this.state.HOME_PAGE});
    }
    handleMessage(){
        this.setState({currPage: this.state.MESSAGE_PAGE});
    }

    handleAdmin(){
        this.setState({currPage: this.state.ADMIN_PAGE});
    }

    renderAdmin(){
        //TODO
    }

    renderMessages(){
        //TODO
    }

    renderPosts(){
        //TODO
    }

    render(){
        return (
        <div>
            <div className = "topMenu">
                <button onClick={this.handleHome}> Home</button>
                <button onClick={this.handleMessage}> Messages</button>
                <button onClick={this.handleAdmin}> Admin</button>     
            </div>
            <div>
                {this.renderPage(this.state.currPage)}
            </div>
        </div>
        );
    }
}

