import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import SaveIcon from '@material-ui/icons/Save';
import CreateIcon from '@material-ui/icons/Create';

const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: '150%',
  },
}));

export default function Button(props) {
  const { seed } = props;
  const classes = useStyles();
  switch (seed) {
    case 'add':
      return (
        <AddIcon className={classes.icon} />
      )
    case 'cancel':
      return (
        <CloseRoundedIcon className={classes.icon} />
      )
    case 'save':
      return (
        <SaveIcon className={classes.icon} />
      )
    case 'edit':
      return (
        <CreateIcon className={classes.icon} />
      )
    case 'update':
      return (
        <SaveIcon className={classes.icon} />
      )
  }
}
