import React from 'react';
import TableData from './tableData';
import Button from 'components/Button';
import { Link } from 'react-router-dom';
import PageLayout from "layouts/PageLayout";

function Orders() {
  return (
    <PageLayout
      title={'Orders'}
      action={
        <Button component={Link} to={`/orders/addOrders`}>Add Orders</Button>
      }
    >
      <TableData />
    </PageLayout>
  );
}

export default Orders;

