import React from 'react';
import { withRedux } from '../redux/redux.js';

import Nav from '../component/01_navbar.js';
import Drawer from '../component/02_drawer.js';
import StoreTable from 'antd/lib/table/Table';

const Index = () => {

  return (
    <>
      <Nav/>
    </>
  );
}

export default withRedux(Index);