import React from 'react';
import {browserHistory} from 'react-router';

class WhoToFollow extends React.Component { 
	constructor(props) {
		super(props);
		this.props.getWhoToFollow();
		this.state = {whoToFollowIdx: 0}
	}
	componentDidUpdate(prevProps){
		if (prevProps.currentUser !== this.props.currentUser){
			this.props.getWhoToFollow();
		}
	}
	incrementIdxByThree(){
		const oldIdx = this.state.whoToFollowIdx;
		const newIdx = (oldIdx + 3) % this.props.whoToFollow.length;
		this.setState({whoToFollowIdx: newIdx});
	}
	followedBy(potentialFollowed){
		const user = potentialFollowed.followerWhoWeFollow;
		if (user){
			return (<span className="followed-by-mutual">Followed By <span className="mutual-follower-username" onClick={this.toUser.bind(this, user.username)}>{user.fullName}</span></span>);
		}
	}
	componentWillUpdate(nextProps){
		if (nextProps.whoToFollow.length < this.props.whoToFollow.length){
			const oneLowerIdx = this.state.whoToFollowIdx - 1;
			if (oneLowerIdx < nextProps.whoToFollow.length && oneLowerIdx >= 0){
				this.setState({whoToFollowIdx: oneLowerIdx})
			} else {
				this.setState({whoToFollowIdx: 0})
			}
		}
	}
	toUser(username){
		browserHistory.push(`/profile/${username}`)
	}
	followUser(userId){
		let followBtn = document.getElementById(`${userId}-follow-btn`);
		followBtn.className = "user-following-btn user-follow-type-btn";
		followBtn.firstChild.textContent = "Following";
		this.props.followUser(userId)
	}
	render(){
		let whoToFollowIdxs = {}
		if (this.props.whoToFollow.length > 0){
			for (var i = 0; i < 3; i++){
				const idx = (this.state.whoToFollowIdx + i) % this.props.whoToFollow.length;
				whoToFollowIdxs[idx] = idx;
			}
		}
		return (
			<div id="who-to-follow">
				<div id="who-to-follow-title">
					<h3>Who To Follow</h3>
					<a onClick={this.incrementIdxByThree.bind(this)}>Refresh</a>
				</div>
				<ul>
					{Object.keys(whoToFollowIdxs).map((idx) => {
						const potentialFollowed = this.props.whoToFollow[idx];
						const toPotentialFollowed = this.toUser.bind(this, potentialFollowed.username);
						return (
							<div key={potentialFollowed['_id']}className="who-to-follow-user">
								<div className="who-to-follow-img-container" onClick={toPotentialFollowed}>
									<img src={potentialFollowed.profileImg}/>
								</div>
								<div className="who-to-follow-info-container">
									<div className="who-to-follow-names-container">
										<h6 onClick={toPotentialFollowed}>{potentialFollowed.fullName}</h6>
										<span onClick={toPotentialFollowed}>{`@${potentialFollowed.username}`}</span>
									</div>
									{this.followedBy(potentialFollowed)}
									<button id={`${potentialFollowed['_id']}-follow-btn`}className="user-follow-btn user-follow-type-btn" onClick={this.followUser.bind(this, potentialFollowed['_id'])}><span>Follow</span></button>
								</div>
							</div>
						)
					})}
				</ul>
			</div>
		)
	}
}

module.exports = WhoToFollow