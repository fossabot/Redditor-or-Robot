import React from "react";

import { authenticateUser, validateAuth, getMe } from "../utils/api.js";

class LoginContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerName: '',
            isLoggedIn: false
        };

        this.onPlayButtonClick = this.onPlayButtonClick.bind(this);
        this.onHelpButtonClick = this.onHelpButtonClick.bind(this);
        this.onLoginButtonClick = this.onLoginButtonClick.bind(this);
        this.onLogoutButtonClick = this.onLogoutButtonClick.bind(this);
    }

    componentDidMount() {
        // TODO: Provide instructions for revoking access
        // TODO: Explain that I need identity scope for currentUsername, read for getHot, history for getUser
        // TODO: Explain that there may be bots identified as "human", bots are exclusively ones posting on SS

        let URLToken = null;
        const randomState = new URL(window.location.href).searchParams.get('state');
        if (randomState == document.cookie) {
            URLToken = new URL(window.location.href).searchParams.get('code');
            document.cookie = '';
        }
        const authCheck = localStorage.getItem("auth");
        if (URLToken && !authCheck) {
            validateAuth(URLToken).then(value => {
                const auth = {
                    userAgent: value.userAgent,
                    clientId: value.clientId,
                    refreshToken: value.refreshToken,
                    accessToken: value.accessToken
                };
                const config = value.config();

                if (typeof(Storage) !== "undefined") {
                    localStorage.setItem("auth", JSON.stringify(auth));
                    localStorage.setItem("config", JSON.stringify(config));
                }
                else {
                    console.log("No localStorage support.");
                }

                window.location = window.location.href.slice(0, window.location.href.indexOf('?'));
            }, reason => {
                console.log(reason);
            });
        }
        else if (!URLToken && authCheck) {
            const REQUESTER = new snoowrap(JSON.parse(localStorage.getItem("auth")));
            REQUESTER.config(JSON.parse(localStorage.getItem("config")));
            getMe(REQUESTER).then(user => {
                this.setState({
                    isLoggedIn: true,
                    playerName: user.name
                });
            }, failure => {
                console.log(failure);
            });
        }
    }

    onPlayButtonClick() {
        this.props.onPlayButtonClick();
    }

    onHelpButtonClick() {
        window.open('https://github.com/tsitu', '_blank');
    }

    onLoginButtonClick() {
        if (!this.state.isLoggedIn) {
            authenticateUser();
        }
    }

    onLogoutButtonClick() {
        if (this.state.isLoggedIn) {
            localStorage.removeItem("auth");
            localStorage.removeItem("config");
            this.setState({
                isLoggedIn: false,
                playerName: ''
            })
        }
    }

    render() {
        const nameString = this.state.isLoggedIn ?
            <p>
                <i>Logged in as: {this.state.playerName}</i>
            </p> : ''
        return (
            <div id="gameContainer">
                🤓 - 🤖 <br />
                Redditor or Robot? <br /> <br />
                <PlayButton isLoggedIn={this.state.isLoggedIn} onButtonClick={this.onPlayButtonClick} />
                <HelpButton onButtonClick={this.onHelpButtonClick} />
                <LoginButton
                    isLoggedIn={this.state.isLoggedIn}
                    onLoginClick={this.onLoginButtonClick}
                    onLogoutClick={this.onLogoutButtonClick} />
                {nameString}
            </div>
        );
    }
}

class PlayButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        this.props.onButtonClick();
    }

    render() {
        const button = this.props.isLoggedIn ?
            <button type="button" id="playButton" onClick={this.handleClick}>Play!</button> :
            <button type="button" id="playButton" onClick={this.handleClick} disabled>Play!</button>
        return (
            <div>
                {button}
            </div>
        );
    }
}

class HelpButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        this.props.onButtonClick();
    }

    render() {
        return (
            <button type="button" id="helpButton" onClick={this.handleClick}>Help</button>
        );
    }
}

class LoginButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);
    }

    handleLogoutClick(e) {
        e.preventDefault();
        this.props.onLogoutClick();
    }

    handleLoginClick(e) {
        e.preventDefault();
        this.props.onLoginClick();
    }

    render() {
        const button = this.props.isLoggedIn ?
            <button type="button" id="loginButton" onClick={this.handleLogoutClick}>Logout</button> :
            <button type="button" id="loginButton" onClick={this.handleLoginClick}>Login</button>
        return (
            <div>
                {button}
            </div>
        );
    }
}

module.exports = LoginContainer;