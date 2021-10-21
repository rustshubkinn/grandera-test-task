import { forwardRef, useEffect, useRef } from 'react';
import { usePagination, useRowSelect, useSortBy, useTable } from 'react-table';
import { arrayOf, bool, shape } from 'prop-types';

import classes from './UsersTable.module.scss';

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <input type="checkbox" ref={resolvedRef} {...rest} />
    </>
  );
});

IndeterminateCheckbox.propTypes = {
  indeterminate: bool.isRequired,
};

export const UsersTable = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 5 },
    },
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((clmns) => [
        {
          id: 'selection',
          width: 20,
          Header: '',
          Cell: (formAPI) => {
            const { row, selectedFlatRows } = formAPI;
            const isDisabled =
              row.getToggleRowSelectedProps().checked &&
              selectedFlatRows.length === 1;
            return (
              <div>
                <IndeterminateCheckbox
                  disabled={isDisabled}
                  {...row.getToggleRowSelectedProps()}
                />
              </div>
            );
          },
        },
        ...clmns,
      ]);
    }
  );

  const getSortArrow = ({ isSorted, isSortedDesc }) => {
    if (isSorted) {
      if (isSortedDesc) {
        return '▼';
      }

      return '▲';
    }
    return ' ';
  };

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps(), {
                    style: { minWidth: column.minWidth, width: column.width },
                  })}
                >
                  {column.render('Header')}
                  <span className={classes.sort_arrow}>
                    {getSortArrow(column)}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps({
                      style: {
                        minWidth: cell.column.minWidth,
                        width: cell.column.width,
                      },
                    })}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={classes.pagination}>
        <button
          type="button"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          1
        </button>
        <button
          type="button"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          2
        </button>
      </div>
    </>
  );
};

UsersTable.propTypes = {
  data: arrayOf(shape({})).isRequired,
  columns: arrayOf(shape({})).isRequired,
};
