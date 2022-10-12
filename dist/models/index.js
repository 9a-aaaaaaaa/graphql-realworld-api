"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arcticle = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("./user");
const arcticle_1 = require("./arcticle");
const dotenv_1 = __importDefault(require("dotenv"));
// 需要提前加载
dotenv_1.default.config();
const dbURI = process.env.mongoDbURI;
if (!dbURI) {
    throw new Error('dbURI not found');
}
// 连接 MongoDB 数据库
mongoose_1.default.connect(dbURI);
const db = mongoose_1.default.connection;
// 当连接失败的时候
db.on('error', (err) => {
    console.log('MongoDB 数据库连接失败！', err);
});
// 当连接成功的时候
db.once('open', function () {
    console.log('MongoDB 数据库连接成功！');
});
exports.User = mongoose_1.default.model('User', user_1.userSchema);
exports.Arcticle = mongoose_1.default.model('Arcticle', arcticle_1.articleSchema);
//# sourceMappingURL=index.js.map