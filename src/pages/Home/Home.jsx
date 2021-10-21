import { useEffect, useMemo, useState } from 'react';

import { Loader } from 'components/Loader/Loader';
import { DeleteBtn } from 'components/DeleteBtn/DeleteBtn';

import { fetchUsers } from 'api';

import { UsersTable } from './components/UsersTable';

export const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const data = useMemo(() => users, [users]);

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
        width: 50,
      },
      {
        Header: '',
        id: 'link',
        width: 100,
        Cell: (formAPI) => {
          const { row } = formAPI;
          return (
            <a
              href={`https://jsonplaceholder.typicode.com/users/${row.original.id}`}
            >
              Подробнее
            </a>
          );
        },
      },
      {
        Header: 'User Name',
        accessor: 'username',
        width: 160,
      },
      {
        Header: 'Email',
        accessor: 'email',
        width: 250,
      },
      {
        Header: 'Website',
        accessor: 'website',
      },
      {
        Header: '',
        id: 'delete',
        width: 80,
        Cell: (tableProps) => {
          const onClickHandler = () => {
            const dataCopy = [...data];
            dataCopy.splice(tableProps.row.index, 1);
            setUsers(dataCopy);
          };
          return <DeleteBtn onClick={onClickHandler} />;
        },
      },
    ],
    [data]
  );

  const getUsers = async () => {
    setLoading(true);
    const response = await fetchUsers();
    setUsers(response);
    setLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Loader loading={loading} />
      <UsersTable data={data} columns={columns} />
    </>
  );
};
