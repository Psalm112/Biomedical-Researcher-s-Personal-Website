// import express from "express";
// import { renderToPipeableStream } from "react-dom/server";
// import React from "react";
// import AppServer from "../src/components/AppServer";
// import path from "path";
// import { DataProvider, data } from "../src/providers/data";
// import { createServerData } from "../src/api/resource";
// import { Writable } from "node:stream";

// const app = express();
// const port = 3000;
// app.get("/", (req, res) => {
//   const stream = new Writable({
//     write(chunk, _encoding, cb) {
//       res.write(chunk, cb);
//     },
//     final() {
//       res.write(
//         `<script>
//         window.globalCache={comments:[${data.comments.map((c) => `'${c}'`)}]}
//         </script>`
//       );
//       res.end("</body></html>");
//     },
//   });
//   const { pipe } = renderToPipeableStream(
//     <DataProvider data={createServerData()}>
//       <AppServer />
//     </DataProvider>,
//     {
//       bootstrapScripts: ["/main.js"],
//       onShellReady() {
//         res.write("<html><body>");
//         pipe(stream);
//       },
//     }
//   );
// });

// app.use(express.static(path.join(__dirname, "/../dist")));

// app.listen(port, () => {
//   console.log(`app running on port ${port}`);
// });
