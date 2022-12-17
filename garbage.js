// app.get("/redisdata", async (req, res) => {
//     try {
//       let data = await redisClient.get("userdata");
//       data = JSON.parse(data);
//       if (!data) res.status(404).send("no user found");
//       else {
//         res.send(data);
//       }
//     } catch (error) {
//       res.status(404).send(error.message);
//     }
//   });
  
//   app.post("/redisLogout", async (req, res) => {
//     const data = await redisClient.del("userdata");
//     res.redirect("https://medimed.netlify.app");
//   });
// app.get("/searchget", async (req, res) => {
//     try {
//       const { title } = req.query;
  
//       const agg = [
//         {
//           $search: {
//             autocomplete: {
//               query: title,
//               path: "title",
//               fuzzy: {
//                 maxEdits: 2,
//               },
//             },
//           },
//         },
//         {
//           $limit: 8,
//         },
//         {
//           $project: {
//             _id: 1,
//             title: 1,
//             price: 1,
//             url: 1,
//           },
//         },
//       ];
//       const arr = await ProductModel.aggregate(agg);
//       console.log('arr:', arr)
  
//       res.json(arr);
//     } catch (error) {
//       res.status(404).send(`${error.message}`);
//     }
//   });