import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useRouter } from "next/router";

import { timestampToTime } from '../utils/main';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    marginTop: 2,
    fontSize: 21,
  },
  cover: {
    height: '100%'
  },
  pos: {
    marginBottom: 8,
  },
});

export default function Article(props) {
  const classes = useStyles();
  const router = useRouter();
  const { title, content, createAt, thumbanil, uid} = props

  return (
    <Card className={classes.root} onClick={() => router.push(`/articles/${uid}`)}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={4} md={3}>
            <CardMedia
              component="img"
              className={classes.cover}
              src={thumbanil}
            />
          </Grid>
          <Grid item xs={8} md={9}>
            <Typography className={classes.title} variant="h5" component="h2">
              {title}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {timestampToTime(createAt)}
            </Typography>
            <Typography variant="body2" component="p">
              {content}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
};