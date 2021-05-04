import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar src={props.tweet.user.profile_image_url_https} className={classes.avatar} />
        }
        title={props.tweet.user.name}
        subheader={props.tweet.created_at}
      />
      {props.tweet.extended_entities && props.tweet.extended_entities.media ?
        props.tweet.extended_entities.media.map(media => {
            return <CardMedia
                className={classes.media}
                image={media.media_url_https}
            />
      }) : <></>
    }
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
            {props.tweet.text}
        </Typography>
      </CardContent>
    </Card>
  );
}
