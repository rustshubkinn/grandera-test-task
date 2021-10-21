import { func } from 'prop-types';

import classes from './DeleteBtn.module.scss';

export const DeleteBtn = ({ onClick }) => (
  <button className={classes.delete_btn} type="button" onClick={onClick}>
    ⓧ
  </button>
);

DeleteBtn.propTypes = {
  onClick: func.isRequired,
};
