import ListPage from './ListPage';

const BASE_PATH = '/list1';

function List1() {
  return <ListPage basePath={BASE_PATH} />;
}

export default List1;
export { BASE_PATH as list1BasePath };
