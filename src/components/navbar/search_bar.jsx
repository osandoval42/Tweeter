import React from 'react';
import actions from './search_bar_helper_actions';
import {browserHistory} from 'react-router';

const SearchBar = React.createClass({
  	getInitialState(){
  		return ({searchInput: "", matchedUsers: []});
  	},
  	updateSearch(e){
  		const input = e.currentTarget.value;
  		let matchedUsers = this.state.matchedUsers
  		let that = this
  		if (input !== ""){
  			actions.searchUsers(input, (users) => { //REVISE GET RID OF THAT THIS
          if (that){
  					that.setState({matchedUsers: users});
  				}
  			})	
  			this.setState({searchInput: input});
  		} else {
  			this.setState({searchInput: input, matchedUsers: []});
  		}
  	},
    fullName(user){
      let names = []
      if (user.firstName) {names.push(user.firstName)};
      if (user.lastName) {names.push(user.lastName)};
      return names.join(" ");
    },
    toUserProfile(username){
      browserHistory.push(`/profile/${username}`);
      this.setState({searchInput: "", matchedUsers: []});
    },
  	autocompleted(){
  		return (<ul id="search-auto-complete">{
  			this.state.matchedUsers.map((user) => {
          const username = user.username;
          const fullName = this.fullName(user);
          const profileImg = user.profileImg;
  				return (<li key={username} className="autocompleted-user" onClick={this.toUserProfile.bind(this, username)}>
            <div className="autocompleted-img-container">
              <img className="autocompleted-img" src={profileImg}/>
            </div>
            <h6 className="autocompleted-fullname  autocompleted-name">{fullName}</h6>
            <span className="autocompleted-username  autocompleted-name">{`@${username}`}</span></li>);
  			})}
  		</ul>)
  	},
	render(){
		return (
		      <div className="search-bar">
		        <form className="search-bar-form" onSubmit={this.handleSubmit}>
		          <div className="search-bar-inputs">
		            <input id="search-input" value={this.state.searchInput}
		              onChange={this.updateSearch} placeholder="Search Twitter"
                  autoComplete="off"
		            />
		          <button type="submit" id='search-submit' >
		          	<i className="fa fa-search"></i>
		          </button>
		          </div>
		        </form>
		        {this.autocompleted()}
		      </div>
		)
	}
});

module.exports = SearchBar;