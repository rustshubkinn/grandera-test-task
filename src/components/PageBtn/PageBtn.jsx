import { bool, func, string } from 'prop-types';

export const PageBtn = ({ onClick, disabled, children }) => (
  <button type="button" onClick={onClick} disabled={disabled}>
    {children}
  </button>
);

PageBtn.propTypes = {
  onClick: func.isRequired,
  disabled: bool.isRequired,
  children: string.isRequired,
};
