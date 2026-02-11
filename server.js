import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { HttpServerTransport } from "@modelcontextprotocol/sdk/server/http.js";

const app = express();
app.use(express.json());

const server = new McpServer({
  name: "public-demo-mcp",
  version: "1.0.0"
});

server.tool("say_hello", async ({ name }) => {
  return {
    content: [
      { type: "text", text: `Hello ${name}! 👋` }
    ]
  };
});

server.tool("add_numbers", async ({ a, b }) => {
  return {
    content: [
      { type: "text", text: `Result: ${a + b}` }
    ]
  };
});

const transport = new HttpServerTransport({ app });
await server.connect(transport);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`MCP running on port ${PORT}`);
});