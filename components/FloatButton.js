import { useRouter } from "next/router";
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

import Icon from './Icon'
import { saveArticle } from "../utils/new";

const useStyles = makeStyles((theme) => ({
  primaryPst: {
    margin: 0,
    top: 'auto',
    right: 40,
    left: 'auto',
    bottom: 40,
    position: 'fixed',
  },
  secondaryPst: {
    margin: 0,
    top: 'auto',
    right: 40,
    left: 'auto',
    bottom: 120,
    position: 'fixed',
  },
  icon: {
    fontSize: '150%',
  }
}));

export default function FloatButton(props) {
  const router = useRouter();
  const { seed, position, artileTitle, content, currentuser, image } = props;
  const classes = useStyles();
  const bColor = seed == "cancel" ? "secondary" : "primary";
  const pst = position == 0 ? classes.primaryPst : classes.secondaryPst;
  const action = () => {
    switch (seed) {
      case 'add':
        router.push('/new');
        break
      case 'cancel':
        router.back();
        break
      case 'save':
        saveArticle(artileTitle, content, currentuser, image);
        break
      case 'write':
        // write時の操作
        break
    }

  }

  return (
    <>
      <IconButton
        color={bColor}
        className={pst}
        onClick={() => action(seed)}
      >
        <Icon seed={seed} />
      </IconButton>
    </>
  )
}
