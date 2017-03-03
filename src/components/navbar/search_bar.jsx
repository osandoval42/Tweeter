import React from 'react';
import actions from './search_bar_helper_actions';

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
  	autocompleted(){
  		return (<ul>{
  			this.state.matchedUsers.map((user) => {
          const username = user.username;
  				return (<li key={username}>{username}</li>);
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