import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import {Link} from 'react-router-dom/'
import PropTypes from 'prop-types';
import dayjs from 'dayjs'

import relativeTime from 'dayjs/plugin/relativeTime'
import LikeButton from './LikeButton';
import MyButton from '../../util/MyButton';
import DeletePost from './DeletePost'


// meterial UI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import ChatIcon from '@material-ui/icons/Chat';



// redux 

import { connect } from 'react-redux';
import PostDialog from './PostDialog';


const styles = {
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  }
};


export class Post extends Component {
    render() {
        dayjs.extend(relativeTime)
        const { classes, post : {body,timeStemp, userImage, userHandle, postId, likeCount, commentCount}, user: {authenticated, credentials:{handle}} } = this.props
        
      
      const deleteButton =
      authenticated && userHandle === handle ? (
        <DeletePost postId={postId} />
        ) : null;
      
        return (
            <Card className={classes.card}>
                <CardMedia image={userImage}  title="ProfileImage" className={classes.image} />
                <CardContent className={classes.content}>
              <Typography variant="h5" component={Link} to={`/user/${userHandle}`} color="primary">{userHandle}</Typography>
              {deleteButton}
                    <Typography variant="body2" color="textSecondary">{dayjs(timeStemp).fromNow()}</Typography>
                    <Typography variant="body1">{body}</Typography>
              <LikeButton postId={postId} />
              <span>{likeCount} Likes</span>
              <MyButton tip="comments">
            <ChatIcon color="primary" />
              </MyButton>
              <span>{commentCount} comments</span>
              <PostDialog postId={postId} userHandle={userHandle} openDialog={this.props.openDialog} post={ this.props.post }/>
                </CardContent>

            </Card>
        )
    }
}

Post.propTypes = {
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Post));
