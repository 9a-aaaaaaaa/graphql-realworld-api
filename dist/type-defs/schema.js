"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const schema_1 = require("@graphql-tools/schema");
const index_1 = __importDefault(require("./index"));
const resolvers_1 = require("./../resolvers");
const directive_1 = require("./directive");
let schema = (0, schema_1.makeExecutableSchema)({
    typeDefs: index_1.default,
    resolvers: [resolvers_1.UserResolve, resolvers_1.ArcticleResolve]
});
exports.schema = schema;
exports.schema = schema = (0, directive_1.upperDirectiveTransformer)(schema, 'upper');
exports.schema = schema = (0, directive_1.authDirectiveTransformer)(schema, 'auth');
//# sourceMappingURL=schema.js.map