import React from 'react'

class ShowTweets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tweetUrls: []
        }
    }

    componentDidMount() {
        this.getTweetData("Computer Parts")
    }

    getTweetData(queryName) {
        fetch(`https://computeron-backend.herokuapp.com/api/tweets/${queryName}/`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    let tweetUrlArray = [];
                    data.info.forEach(tweet => {
                        let screenName = tweet.user.screen_name;
                        let tweetId = tweet.id_str;
                        let tweetUrl = `https://www.twitter.com/${screenName}/status/${tweetId}`;
                        tweetUrl = encodeURIComponent(tweetUrl);
                        tweetUrl = `https://twitframe.com/show?url=${tweetUrl}`;
                        tweetUrlArray.push(tweetUrl);
                    });
                    this.setState(() => {
                        return { tweetUrls: tweetUrlArray };
                    });
                }
            });
    }

    render() {
        let id = 0;
        return (
            <div className="container" id="lastcontainer">
                <h3>Tweet Data About Computer Parts</h3>
                {this.state.tweetUrls.map((url) => 
                    <iframe key={id++} border='0' frameborder='0' height='300' width='800'
                        src = {url} />
                )}
            </div>

        )
    }
}

export default ShowTweets;