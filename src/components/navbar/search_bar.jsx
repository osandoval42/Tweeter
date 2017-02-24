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
  				return (<li>{user.username}</li>);
  			})}
  		</ul>)
  	},
	render(){
		return (
		      <div className="search-bar">
		        <form className="search-bar-form" onSubmit={this.handleSubmit}>
		          <div className="search-bar-inputs">
		            <input className="search-input" value={this.state.searchInput}
		              onChange={this.updateSearch}
		            />
		          <button type="submit" className='search-submit' >
		          	submit
		          </button>
		          </div>
		        </form>
		        {this.autocompleted()}
		      </div>
		)
	}
});

module.exports = SearchBar;