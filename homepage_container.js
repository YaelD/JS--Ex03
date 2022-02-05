class HomePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            HOME_PAGE : "home",
            MESSAGE_PAGE : "message",
            ADMIN_PAGE : "admin",
            token : props.token,
            currPage : "home",
            userDetails : props.user,
            numOfPosts : 0,
            newPostNotification : '',
            isNewPosts : false,
            postsIntervalID : 0,
            
            numOfMessages : 0,
            newMessageNotification : '',

            messagesIntervalID : 0
        };
        this.renderPage = this.renderPage.bind(this);
        this.handleHome = this.handleHome.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
        this.handleAdmin = this.handleAdmin.bind(this);
        this.getNumOfPosts = this.getNumOfPosts.bind(this);
        this.getNumOfMessages = this.getNumOfMessages.bind(this);
        this.calcNumOfPosts = this.calcNumOfPosts.bind(this);
        this.hidePostsNotification = this.hidePostsNotification.bind(this);
    }

    async componentDidMount() {
        this.setState({numOfPosts : await this.getNumOfPosts()});
        const postInterval = setInterval(this.calcNumOfPosts, 3000);
        // const messagesInterval = setInterval(this.getNumOfMessages, 30000);
        this.setState({
            postsIntervalID : postInterval,
            // messagesIntervalID : messagesInterval
        })

	}

    async calcNumOfPosts(){
        const serverNumOfPosts = await this.getNumOfPosts();
        console.log("In calcNumOfPosts" + serverNumOfPosts + " " + this.state.numOfPosts);
        if(serverNumOfPosts> this.state.numOfPosts){
            this.setState({
                newPostNotification : "There new posts!",
                 numOfPosts : serverNumOfPosts,
            })
        }
    }

    hidePostsNotification(){
        this.setState({
            newPostNotification : "",
            numOfPosts : this.state.numOfPosts+1
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
	  if(data.length > this.state.numOfMessages){
          this.setState({ 
              numOfMessages : data.length,
              newMessage : 'You have new Messages'
         });
      }
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
        this.setState({
            currPage: this.state.HOME_PAGE,
            newPostNotification : '',
            isNewPosts : !this.state.isNewPosts
        });
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
        return (<MessagePage token = {this.state.token}></MessagePage>)
    }

    renderPosts(){
        return (<PostPage token = {this.state.token} onHide = {this.hidePostsNotification}> </PostPage>);
    }



    render(){
        return (
        <div className = "homePageContainer">
            <div className = "topMenu">
                <button onClick={this.handleHome}> Home</button>
                <button onClick={this.handleMessage}> Messages</button>
                {  this.state.userDetails.id == 0 ? <button onClick={this.handleAdmin}> Admin</button> : <div> </div>} 
                <div className = "notifications">
                    <label>{this.state.newPostNotification}</label>
                    {/* <label>{this.state.newMessage}</label>  */}
                </div>
            </div>
            <div>
                {this.renderPage(this.state.currPage)}
            </div>
        </div>
        );
    }
}

