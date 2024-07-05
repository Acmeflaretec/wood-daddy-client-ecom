 
import PageLayout from "layouts/PageLayout";
import underConstruction from 'assets/images/under_construction.png'
import Button from 'components/Button';
import { Link } from 'react-router-dom';
import { useGetCategory } from "queries/ProductQuery";
import TableData from "./tableData";
function Advertisement() {
  // const { data, isLoading } = useGetCategory({ pageNo: 1, pageCount: 100 });
  // console.log(data, isLoading);

  return (
    <PageLayout
      title={'Advertisements'}
      action={
        <Button component={Link} to={`/advertisements/addAdvertisements`}>Add Advertisement</Button>
      }
    >
<TableData/>
    </PageLayout>
  );
}

export default Advertisement;
