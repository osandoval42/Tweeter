import {connect} from 'react-redux';
import HashtagFeed from './hashtag_page';

const mapStateToProps = (state) => ({
	currentUser: state.session.currentUser
});

const HashtagFeedContainer = connect(mapStateToProps)(HashtagFeed);

export default HashtagFeedContainer;