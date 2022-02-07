class HomePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            HOME_PAGE : "home",
            MESSAGE_PAGE : "message",
            ADMIN_PAGE : "admin",
            ABOUT_PAGE : "about",
            currPage : "home",
            token : props.token,
            userDetails : props.user,
            numOfPosts : 0,
            newPostNotification : '',
            isNewPosts : false,
            postsIntervalID : 0,
            numOfMessages : 0,
            newMessageNotification : '',
            isNewMessages : false,
            messagesIntervalID : 0,
            showAbout : false
        };
        this.renderPage = this.renderPage.bind(this);
        this.handleHome = this.handleHome.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
        this.handleAdmin = this.handleAdmin.bind(this);
        this.handleAbout = this.handleAbout.bind(this);
        this.renderAdmin = this.renderAdmin.bind(this);
        this.renderMessages = this.renderMessages.bind(this);
        this.renderPosts = this.renderPosts.bind(this);
        this.renderAbout = this.renderAbout.bind(this);
        this.getNumOfPosts = this.getNumOfPosts.bind(this);
        this.getNumOfMessages = this.getNumOfMessages.bind(this);
        this.calcNumOfPosts = this.calcNumOfPosts.bind(this);
        this.hidePostsNotification = this.hidePostsNotification.bind(this);
        this.calcNumOfMessages = this.calcNumOfMessages.bind(this);
        this.hideMessagesNotification = this.hideMessagesNotification.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    async componentDidMount() {
        this.setState({numOfPosts : await this.getNumOfPosts()});
        this.setState({numOfMessages : await this.getNumOfMessages()});
        const postInterval = setInterval(this.calcNumOfPosts, 3000);
        const messagesInterval = setInterval(this.calcNumOfMessages, 3000);
        this.setState({
            postsIntervalID : postInterval,
            messagesIntervalID : messagesInterval
        })

	}

    async calcNumOfPosts(){
        const serverNumOfPosts = await this.getNumOfPosts();
        if(serverNumOfPosts> this.state.numOfPosts){
            this.setState({
                newPostNotification : "There are new posts!",
                 numOfPosts : serverNumOfPosts,
            })
        }
    }

    async calcNumOfMessages(){
        const serverNumOfMessages = await this.getNumOfMessages();
        console.log("Num Of Messages: " +serverNumOfMessages + "  " + this.state.numOfMessages);
        if(serverNumOfMessages> this.state.numOfMessages){
            this.setState({
                newMessageNotification : "You have new Messages!",
                numOfMessages : serverNumOfMessages,
            })
        }
    }

    hidePostsNotification(){
        this.setState({
            newPostNotification : "",
            numOfPosts : this.state.numOfPosts+1
        });
    }

    hideMessagesNotification(){
        this.setState({
            newMessageNotification : "",
            numOfMessages : this.state.numOfMessages
        });
    }



    componentWillUnmount(){
        clearInterval(this.state.messagesIntervalID);
        clearInterval(this.state.postsIntervalID);
    }




    async getNumOfPosts(){
        const response = await fetch('http://localhost:2718/social_network/users/post' , 
        {method:'GET',  
           headers: { 'Content-Type': 'application/json', 'Authorization' : this.state.token}
         });
        if ( response.status != 200 ) {
        throw new Error ('Error while fetching posts');
        }
        const data = await response.json();
        return data.length;

    }

    async getNumOfMessages(){
      const response = await fetch('http://localhost:2718/social_network/users/message' , 
                {method:'GET',  
                   headers: { 'Content-Type': 'application/json', 'Authorization' : this.state.token}
                 });
      if ( response.status != 200 ) {
		  throw new Error ('Error while fetching messages');
	  }
	  const data = await response.json();
      return data.length;
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
        else if(page == this.state.ABOUT_PAGE){
            return this.renderAbout();
        }
    }

    handleHome(){
        this.setState({
            currPage: this.state.HOME_PAGE,
            newPostNotification : '',
            isNewPosts : !this.state.isNewPosts
        });
    }
    handleMessage(){
        this.setState({
            currPage: this.state.MESSAGE_PAGE,
            newMessageNotification : '',
            isNewMessages : !this.state.isNewMessages

        });
    }

    handleAdmin(){
        this.setState({currPage: this.state.ADMIN_PAGE});
    }

    renderAdmin(){
        return (<AdminPage token = {this.state.token}></AdminPage>)
    }

    renderMessages(){
        return (<MessagePage userId={this.state.userDetails.id} token = {this.state.token} onHide = {this.hideMessagesNotification} isRefreshed = {this.state.isNewMessages}></MessagePage>)
    }

    renderPosts(){
        return (<PostPage token = {this.state.token} onHide = {this.hidePostsNotification} isRefreshed = {this.state.isNewPosts}> </PostPage>);
    }

    renderAbout(){
        return (<AboutWindow></AboutWindow>);
    }



    handleAbout(){
        this.setState({currPage : this.state.ABOUT_PAGE});
    }

    handleLogout(){
        if (confirm("Are sure you want to logout?")) {
            this.props.logOut();
        } 
    }


    

    render(){
        return (
        <div className = "homePageContainer">
            <div className = "topMenu">
                <button onClick={this.handleHome}> Home</button>
                <button onClick={this.handleMessage}> Messages</button>
                {this.state.userDetails.id == 0 ? <button onClick={this.handleAdmin}> Admin</button> : ''} 
                <button onClick={this.handleAbout}> About</button>
                <button onClick={this.handleLogout}> LogOut</button>
                {this.state.showAbout ? <AboutWindow></AboutWindow> :''}
                <div className = "notifications">
                    <label onClick = {this.handleHome}>{this.state.newPostNotification}</label>
                    <br/>
                    <label onClick = {this.handleMessage}>{this.state.newMessageNotification}</label> 
                </div>

            </div>
            <div className = "page">
                {this.renderPage(this.state.currPage)}
            </div>
        </div>
        );
    }
}

class AboutWindow extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }


    render(){

        return(
         <div >
            This is our app <br/> Hope you will enjoy it!
        </div>

        );
    }
}