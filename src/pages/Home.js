import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import Post from '../Componentes/posts/Post';
import Profile from '../Componentes/profile/Profile';
import PostSkeleton from '../util/PostSkeleton';

import { connect } from 'react-redux';
import { getPosts } from '../redux/actions/dataActions';

class home extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    let posts = [];
      if (this.props.data.posts) {
        posts = this.props.data.posts;
    }
      else {
        posts = this.props.data.screams;
    }
    const { loading } = this.props.data;
    let recentPostsMarkup = !loading ? (
      posts.map((post) => <Post key={post.postId} post={post} />)
    ) : (
      <PostSkeleton />
    );
    return (
      <Grid container spacing={6}>
        <Grid item sm={8} xs={12}>
          {recentPostsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getPosts }
)(home);
