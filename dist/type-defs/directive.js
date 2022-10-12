"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upperDirectiveTransformer = exports.authDirectiveTransformer = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const utils_1 = require("@graphql-tools/utils");
const graphql_1 = require("graphql");
const jsonwebtoken_1 = require("jsonwebtoken");
const util_1 = require("../util");
function authDirectiveTransformer(schema, directiveName) {
    return (0, utils_1.mapSchema)(schema, {
        // Executes once for each object field in the schema
        [utils_1.MapperKind.OBJECT_FIELD]: (fieldConfig) => {
            // Check whether this field has the specified directive
            const upperDirective = (0, utils_1.getDirective)(schema, fieldConfig, directiveName)?.[0];
            if (directiveName !== 'auth')
                throw new apollo_server_express_1.AuthenticationError('自定义指令类型不正确');
            if (upperDirective) {
                // Get this field's original resolver
                const { resolve = graphql_1.defaultFieldResolver } = fieldConfig;
                fieldConfig.resolve = async function (source, args, context, info) {
                    const { token, dataSources } = context;
                    // token 验证
                    const jwtSecret = (0, util_1.getJwtSecret)();
                    const jwtJson = (0, jsonwebtoken_1.verify)(token, jwtSecret);
                    if (!jwtJson || typeof jwtJson !== 'object') {
                        throw new apollo_server_express_1.AuthenticationError('token 未授权');
                    }
                    // 用户验证
                    try {
                        const getUserInfo = await dataSources.users.findOneById(jwtJson.userId);
                        context.userinfo = getUserInfo;
                    }
                    catch (error) {
                        console.log(error);
                        throw new apollo_server_express_1.AuthenticationError('未授权，查询用户失败');
                    }
                    // 过期时间验证
                    // 相当于拦截器，执行原有的函数
                    const result = await resolve(source, args, context, info);
                    return result;
                };
                return fieldConfig;
            }
        }
    });
}
exports.authDirectiveTransformer = authDirectiveTransformer;
// This function takes in a schema and adds upper-casing logic
// to every resolver for an object field that has a directive with
// the specified name (we're using `upper`)
function upperDirectiveTransformer(schema, directiveName) {
    return (0, utils_1.mapSchema)(schema, {
        // Executes once for each object field in the schema
        [utils_1.MapperKind.OBJECT_FIELD]: (fieldConfig) => {
            // Check whether this field has the specified directive
            const upperDirective = (0, utils_1.getDirective)(schema, fieldConfig, directiveName)?.[0];
            if (upperDirective) {
                const { resolve = graphql_1.defaultFieldResolver } = fieldConfig;
                // 重写该字段的resolve
                fieldConfig.resolve = async function (source, args, context, info) {
                    // 之前函数的执行结果
                    const result = await resolve(source, args, context, info);
                    console.log('~~~~~', result, directiveName);
                    if (typeof result === 'string' && directiveName === 'upper') {
                        return result.toUpperCase();
                    }
                    return result;
                };
                return fieldConfig;
            }
        }
    });
}
exports.upperDirectiveTransformer = upperDirectiveTransformer;
//# sourceMappingURL=directive.js.map