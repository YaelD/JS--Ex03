class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            HOME_PAGE: "home",
            MESSAGE_PAGE: "message",
            ADMIN_PAGE: "admin",
            token: props.token,
            currPage: "home",
            userDetails: props.user
        };
        this.renderPage = this.renderPage.bind(this);
        this.handleHome = this.handleHome.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
        this.handleAdmin = this.handleAdmin.bind(this);
    }

    renderPage(page) {
        if (page == this.state.MESSAGE_PAGE) {
            return this.renderMessages();
        } else if (page == this.state.HOME_PAGE) {
            return this.renderPosts();
        } else if (page == this.state.ADMIN_PAGE) {
            return this.renderAdmin();
        }
    }

    handleHome() {
        this.setState({ currPage: this.state.HOME_PAGE });
    }
    handleMessage() {
        this.setState({ currPage: this.state.MESSAGE_PAGE });
    }

    handleAdmin() {
        this.setState({ currPage: this.state.ADMIN_PAGE });
    }

    renderAdmin() {
        //TODO
    }

    renderMessages() {
        return React.createElement(MessagePage, { token: this.state.token });
    }

    renderPosts() {
        return React.createElement(
            PostPage,
            { token: this.state.token },
            " "
        );
    }

    render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "div",
                { className: "topMenu" },
                React.createElement(
                    "button",
                    { onClick: this.handleHome },
                    " Home"
                ),
                React.createElement(
                    "button",
                    { onClick: this.handleMessage },
                    " Messages"
                ),
                this.state.userDetails.id == 0 ? React.createElement(
                    "button",
                    { onClick: this.handleAdmin },
                    " Admin"
                ) : React.createElement(
                    "div",
                    null,
                    " "
                )
            ),
            React.createElement(
                "div",
                null,
                this.renderPage(this.state.currPage)
            )
        );
    }
}