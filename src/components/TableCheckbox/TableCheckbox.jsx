import { forwardRef, useEffect, useRef } from 'react';
import { bool } from 'prop-types';

export const TableCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return <input type="checkbox" ref={resolvedRef} {...rest} />;
});

TableCheckbox.propTypes = {
  indeterminate: bool.isRequired,
};
