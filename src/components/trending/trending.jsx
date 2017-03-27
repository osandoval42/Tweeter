import React from 'react';
import {browserHistory} from 'react-router';

class TrendingHashtags extends React.Component{
	constructor(props) {
		super(props);
		this.props.fetchTrending();
	}
	toHashTag(hashtagName){
		browserHistory.push(`/hashtag/${hashtagName}`);
	}
	render(){
		return (
			<div className="trending-box">
				<h3>Trends</h3>
				<ul>
					{this.props.trending.map((hashtagObj, i)=>{
						return (<li className="trending-hashtag" key={hashtagObj['_id']}>
							<h5 onClick={this.toHashTag.bind(this, hashtagObj.name)}>{`#${hashtagObj.name}`}</h5>
							<span>{hashtagObj.trendCount} Tweets</span></li>)
					})}
				</ul>
			</div>
		)
	}
}

export default TrendingHashtags;