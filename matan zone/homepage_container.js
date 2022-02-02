class Container extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            HOME_PAGE : "home",
            MESSAGE_PAGE : "message",
            ADMIN_PAGE : "admin",
            home_page: props.homePage,
            messages : props.messagePage,
            admin_page : props.adminPage,
            current_page: props.homePage
        };
        this.renderPage = this.renderPage.bind(this);
        this.handleHome = this.handleHome.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
        this.handleAdmin = this.handleAdmin.bind(this);

    }

    renderPage(page){
        if(page == this.state.MESSAGE_PAGE){
            this.setState({current_page: this.state.messages});
        }
        else if(page == this.state.HOME_PAGE){
            this.setState({current_page: this.state.home_page});
        }
        else if(page == this.state.ADMIN_PAGE){
            this.setState({current_page: this.state.admin_page})
        }
    }

    handleHome(){
        this.renderPage(this.state.HOME_PAGE);
    }
    handleMessage(){
        this.renderPage(this.state.MESSAGE_PAGE);
    }

    handleAdmin(){
        this.renderPage(this.state.ADMIN_PAGE);
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
                {this.state.current_page}
            </div>
        </div>
        );
    }



}