import fs from "fs";
import path from "path";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import resolvers from "./resolvers";
import db from "./db";
import cors from "cors"; // Thêm dòng này để sử dụng CORS

const app = express();

// Thêm CORS middleware trước mọi route khác
app.use(
  cors({
    origin: "http://localhost:3000", // Cho phép frontend từ localhost:3000
    credentials: true, // Nếu bạn cần xử lý cookie hoặc Authorization header
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Đọc schema GraphQL và tạo schema
const schema = makeExecutableSchema({
  typeDefs: fs.readFileSync(
    path.join(__dirname, "..", "..", "schema", "schema.gql"),
    "utf-8",
  ),
  resolvers,
});

// Cấu hình GraphQL route
app.use(
  "/graphql",
  graphqlHTTP({
    context: { db },
    schema,
    graphiql: true, // Để sử dụng GraphiQL trong trình duyệt
  }),
);

// Export app để sử dụng ở các file khác
export default app;
