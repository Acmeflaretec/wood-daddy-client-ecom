/* eslint-disable react/prop-types */
import Box from "components/Box";
import Typography from "components/Typography";
import Avatar from "components/Avatar";
import Badge from "components/Badge";
import toast from 'react-hot-toast';
import { useGetBanner } from "queries/ProductQuery";
import Table from "examples/Tables/Table";

const notify = () => toast.success('category deleted successfully.');
function Category({ image, name, desc }) {
  return (
    <Box display="flex" alignItems="center" px={1} py={0.5}>
      <Box mr={2}>
        <Avatar src={image} alt={name} size="sm" variant="rounded" />
      </Box>
      <Box display="flex" flexDirection="column">
        <Typography variant="button" fontWeight="medium">
          {name}
        </Typography>
        <Typography variant="caption" color="secondary">
          {desc}
        </Typography>
      </Box>
    </Box>
  );
}

const TableData = () => {
  const { data, isLoading } = useGetBanner({ page: 1, limit: 100 });

  console.log('get bannerrr ',data?.data)
  const columns = [
    { name: "category", align: "left" },
   
    { name: "title", align: "center" },
    { name: "subtitle", align: "center" },
   
    { name: "action", align: "center" },
  ]

  const rows = data?.data?.map(item => ({
    category: <Category image={`${process.env.REACT_APP_API_URL}/uploads/${item?.imgUrl}`} title={item?.title} desc={item?.desc} />,
  
    title: (
      <Typography variant="caption" color="secondary" fontWeight="medium">
        {item.title}
      </Typography>
    ),
    subtitle: (
      <Typography variant="caption" color="secondary" fontWeight="medium">
        {item.subtitle}
      </Typography>
    ),
   
    action: (
      <>
        <Typography
          component="a"
          href="#"
          onClick={notify}
          variant="caption"
          color="secondary"
          fontWeight="medium"
        >
          Edit
        </Typography>
        <Typography
          component="a"
          href="#"
          onClick={notify}
          variant="caption"
          color="secondary"
          fontWeight="medium"
        >
          Delete
        </Typography>
      </>
    ),
  }))
  return isLoading ? <>loading...</> : <Table columns={columns} rows={rows} />
};

export default TableData;
