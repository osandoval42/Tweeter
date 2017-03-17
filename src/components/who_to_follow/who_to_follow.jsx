import React from 'react';

class WhoToFollow extends React.Component { 
	constructor(props) {
		super(props);
		if (this.props.currentUser){
			this.props.getWhoToFollow();
		}
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
		const username = potentialFollowed.followerWhoWeFollow;
		if (username){
			return (<span className="followed-by-mutual">Followed By <span className="mutual-follower-username">{username}</span></span>);
		}
	}
	followUser(){
		//follow user
		//delete user from store
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
						potentialFollowed.profileImg = potentialFollowed.profileImg || "http://clipart-library.com/image_gallery/396306.png";
						return (
							<div key={potentialFollowed['_id']}className="who-to-follow-user">
								<div className="who-to-follow-img-container">
									<img src={potentialFollowed.profileImg}/>
								</div>
								<div className="who-to-follow-info-container">
									<div className="who-to-follow-names-container">
										<h6>{potentialFollowed.fullName}</h6>
										<span>{`@${potentialFollowed.username}`}</span>
									</div>
									{this.followedBy(potentialFollowed)}
									<button className="user-follow-btn user-follow-type-btn" onClick={this.followUser.bind(this, potentialFollowed)}>Follow</button>
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