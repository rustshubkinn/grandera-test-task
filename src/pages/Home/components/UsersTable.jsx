import { usePagination, useRowSelect, useSortBy, useTable } from 'react-table';
import { arrayOf, shape } from 'prop-types';

import { TableCheckbox } from 'components/TableCheckbox/TableCheckbox';
import { PageBtn } from 'components/PageBtn/PageBtn';

import classes from './UsersTable.module.scss';

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
          Cell: (tableAPI) => {
            const { row, selectedFlatRows } = tableAPI;
            const isDisabled =
              row.getToggleRowSelectedProps().checked &&
              selectedFlatRows.length === 1;
            return (
              <div>
                <TableCheckbox
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
        <PageBtn onClick={previousPage} disabled={!canPreviousPage}>
          ←
        </PageBtn>
        <PageBtn onClick={nextPage} disabled={!canNextPage}>
          →
        </PageBtn>
      </div>
    </>
  );
};

UsersTable.propTypes = {
  data: arrayOf(shape({})).isRequired,
  columns: arrayOf(shape({})).isRequired,
};
