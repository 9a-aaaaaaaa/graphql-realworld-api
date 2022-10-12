"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const data_sources_1 = __importDefault(require("./data-sources"));
const schema_1 = require("./type-defs/schema");
async function startApolloServer() {
    const app = (0, express_1.default)();
    const httpServer = http_1.default.createServer(app);
    const server = new apollo_server_express_1.ApolloServer({
        schema: schema_1.schema,
        csrfPrevention: true,
        cache: 'bounded',
        dataSources: data_sources_1.default,
        // 所有的查询都会经过这里
        context({ req }) {
            const token = req.headers.authorization;
            return { token };
        },
        plugins: [
            (0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
            (0, apollo_server_core_1.ApolloServerPluginLandingPageLocalDefault)({ embed: true })
        ]
    });
    await server.start();
    server.applyMiddleware({ app });
    const port = process.env.PORT;
    await new Promise((resolve) => httpServer.listen({ port }, resolve));
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
}
startApolloServer();
//# sourceMappingURL=app.js.map