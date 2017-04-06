import {connect} from 'react-redux';
import Likes from './likes';

const mapStateToProps = (state) => ({
	currUser: state.session.currentUser,
});

const LikesContainer = connect(mapStateToProps)(Likes);

export default LikesContainer;