import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: '150%',
  },
}));

export default function Button(props) {
  const { seed } = props;
  const classes = useStyles();
  // let Icon;
  // switch (seed) {
  //   case 'add':
  //     Icon = <AddIcon className={classes.icon} />
  //   case 'cancel':
  //     Icon = <CloseRoundedIcon className={classes.icon} />
  // }
  // return (
  //   <>
  //     { Icon }
  //   </>
  // )
  switch (seed) {
    case 'add':
      return (
        <AddIcon className={classes.icon} />
      )
    case 'cancel':
      return (
        <CloseRoundedIcon className={classes.icon} />
      )
  }
}
