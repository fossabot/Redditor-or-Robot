## OAuth2 (deprecated)

The Reddit API OAuth2 scopes required by this game are as follows:
* [identity](https://www.reddit.com/dev/api/oauth#scope_identity) (to fetch your username)
* [read](https://www.reddit.com/dev/api/oauth#scope_read) (to fetch a subreddit's Hot posts)
* [history](https://www.reddit.com/dev/api/oauth#scope_history) (to fetch comments from a /r/SubredditSimulator bot)

## Revoking Access

If, for any reason, you need to completely clear out the permissions for this game:

1. Make sure you're logged out.
2. Navigate [here](https://www.reddit.com/prefs/apps) and scroll down until you find "Redditor or Robot?"
3. Click "revoke access" in the bottom left. It should look similar to the image below.

![revoke](assets/revoke.png)

## Technologies

* [React](https://github.com/facebook/react#readme)
* [Webpack](https://github.com/webpack/webpack#readme)
* [Babel](https://github.com/babel/babel#readme)
* [snoowrap](https://github.com/not-an-aardvark/snoowrap#readme)
