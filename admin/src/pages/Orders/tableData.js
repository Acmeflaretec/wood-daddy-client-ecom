import React from 'react';
import Typography from "components/Typography";
import Table from "examples/Tables/Table";
import { useGetOrders } from "queries/ProductQuery";

const TableData = () => {
  const { data, isLoading } = useGetOrders({ pageNo: 1, pageCount: 100 });
console.log(data)
  const columns = [
    { name: "user", align: "left" },
    { name: "status", align: "center"}  ,
    { name: "phone", align: "center" },
    { name: "email", align: "center" },
   { name: "createdon", align: "center" },
   { name: "type", align: "center" },
   { name: "Total", align: "center" },
    
  

  ];
  const rows = Array.isArray(data) ? data.map(item => ({
    user: (
      <Typography variant="caption" color="secondary" fontWeight="medium">
        {item?.userId?.firstName}
      </Typography>
    ),
    status: (
      <Typography variant="caption" color="secondary" fontWeight="medium">
        {item?.status}
      </Typography>
    ),
    createdon: (
      <Typography variant="caption" color="secondary" fontWeight="medium">
        {item?.createdAt ? new Date(item.createdAt).toLocaleString() : ''}
      </Typography>
    ),
    phone: (
      <Typography variant="caption" color="secondary" fontWeight="medium">
        {item.userId.phone}
      </Typography>
    ),
    email: (
      <Typography variant="caption" color="secondary" fontWeight="medium">
        {item.userId.mail}
      </Typography>
    ),
    type: (
      <Typography variant="caption" color="secondary" fontWeight="medium">
        {item.payment_mode}
      </Typography>
    ),
    Total: (
      <Typography variant="caption" color="secondary" fontWeight="medium">
        {item?.Totalamount}
      </Typography>
    ),
  })) : [];
  
  // const rows = data?.map(item => ({
  //   user: (
  //     <Typography variant="caption" color="secondary" fontWeight="medium">
  //       {item?.userId.firstName}
  //     </Typography>
  //   ),
  //   status: (
  //     <Typography variant="caption" color="secondary" fontWeight="medium">
  //       {item?.status}
  //     </Typography>
  //   ),
  //   createdon: (
  //     <Typography variant="caption" color="secondary" fontWeight="medium">
  //      {new Date(item?.createdAt).toLocaleString()}
  //     </Typography>
  //   ),
  //   phone: (
  //     <Typography variant="caption" color="secondary" fontWeight="medium">
  //      {item.userId.phone}
  //     </Typography>
  //   ), email: (
  //     <Typography variant="caption" color="secondary" fontWeight="medium">
  //      {item.userId.mail}
  //     </Typography>
  //   ), 
  //   type: (
  //     <Typography variant="caption" color="secondary" fontWeight="medium">
  //      {item.payment_mode}
  //     </Typography>
  //   ), Total: (
  //     <Typography variant="caption" color="secondary" fontWeight="medium">
  //      {item?.totalamount}
  //     </Typography>
  //   ),

  // }));

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return <Table columns={columns} rows={rows} />;
  }
}

export default TableData;



// /* eslint-disable react/prop-types */
// import Icon from "@mui/material/Icon";
// import Box from "components/Box";
// import Typography from "components/Typography";
// import Progress from "components/Progress";

// // Images
// import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
// import logoInvesion from "assets/images/small-logos/logo-invision.svg";
// import logoJira from "assets/images/small-logos/logo-jira.svg";
// import logoSlack from "assets/images/small-logos/logo-slack.svg";
// import logoWebDev from "assets/images/small-logos/logo-webdev.svg";
// import logoXD from "assets/images/small-logos/logo-xd.svg";

// function Completion({ value, color }) {
//   return (
//     <Box display="flex" alignItems="center">
//       <Typography variant="caption" color="text" fontWeight="medium">
//         {value}%&nbsp;
//       </Typography>
//       <Box width="8rem">
//         <Progress value={value} color={color} variant="gradient" label={false} />
//       </Box>
//     </Box>
//   );
// }

// const action = (
//   <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small">
//     more_vert
//   </Icon>
// );

// const projectsTableData = {
//   columns: [
//     { name: "user", align: "left" },
//     { name: "user Id", align: "left" },
//     { name: "status", align: "left" },
//     { name: "Total", align: "left" },
//     { name: "completion", align: "center" },
//     { name: "action", align: "center" },
//   ],

//   rows: [
//     {
//       project: [logoSpotify, "Spotift"],
//       budget: (
//         <Typography variant="button" color="text" fontWeight="medium">
//           $2,500
//         </Typography>
//       ),
//       status: (
//         <Typography variant="caption" color="text" fontWeight="medium">
//           working
//         </Typography>
//       ),
//       completion: <Completion value={60} color="info" />,
//       action,
//     },
//     {
//       project: [logoInvesion, "Invesion"],
//       budget: (
//         <Typography variant="button" color="text" fontWeight="medium">
//           $5,000
//         </Typography>
//       ),
//       status: (
//         <Typography variant="caption" color="text" fontWeight="medium">
//           done
//         </Typography>
//       ),
//       completion: <Completion value={100} color="success" />,
//       action,
//     },
//     {
//       project: [logoJira, "Jira"],
//       budget: (
//         <Typography variant="button" color="text" fontWeight="medium">
//           $3,400
//         </Typography>
//       ),
//       status: (
//         <Typography variant="caption" color="text" fontWeight="medium">
//           canceled
//         </Typography>
//       ),
//       completion: <Completion value={30} color="error" />,
//       action,
//     },
//     {
//       project: [logoSlack, "Slack"],
//       budget: (
//         <Typography variant="button" color="text" fontWeight="medium">
//           $1,400
//         </Typography>
//       ),
//       status: (
//         <Typography variant="caption" color="text" fontWeight="medium">
//           canceled
//         </Typography>
//       ),
//       completion: <Completion value={0} color="error" />,
//       action,
//     },
//     {
//       project: [logoWebDev, "Webdev"],
//       budget: (
//         <Typography variant="button" color="text" fontWeight="medium">
//           $14,000
//         </Typography>
//       ),
//       status: (
//         <Typography variant="caption" color="text" fontWeight="medium">
//           working
//         </Typography>
//       ),
//       completion: <Completion value={80} color="info" />,
//       action,
//     },
//     {
//       project: [logoXD, "Adobe XD"],
//       budget: (
//         <Typography variant="button" color="text" fontWeight="medium">
//           $2,300
//         </Typography>
//       ),
//       status: (
//         <Typography variant="caption" color="text" fontWeight="medium">
//           done
//         </Typography>
//       ),
//       completion: <Completion value={100} color="success" />,
//       action,
//     },
//   ],
// };

// export default projectsTableData;
