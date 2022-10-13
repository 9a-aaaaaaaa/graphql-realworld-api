# graphql-realworld-api

# 
```
git commit -> github actions -> build -> docker hub
```


## pm2 or nodemon

Cause O&M tools depend on production environment configuration, logs, etc., the dependency can be set to global dependency. Of course, it can be set to package automatic dependency, but this does not make sense in actual production.

[doc](https://pm2.keymetrics.io/docs/usage/quick-start/)

```
 pm2 list
 pm2 logs
 pm2 restart app_name
 pm2 reload app_name
 pm2 stop app_name
 pm2 delete app_name
```

```bash
npm install pm2@latest -g
yarn global add pm2
```

More convenient to view logs and app running status.

## dotenv

The dotenv package is used to read environment variables from the .env file. Create it in the root of your Node.js app, then create the environment variable for PORT=8000.

## concurrently

Run multiple commands concurrently.

```json
"start": "concurrently \"command1 arg\" \"command2 arg\""
```

## 涉及一些东西

不足： 
- apollo graphql server 对ts的一些类型支持不是很友好，resolve的参数类型没有现成的，可能需要单独定义接口来实现，比较麻烦就没有处理。
- apollo-datasource-mongodb  对ts类型描述的支持也不是很友好，简单处理为了any
跟restapi一些不同：
- `apollo graphql` 版本变化比较快，博主的版本很多东西已经发生了变化，这个算是好事情，说明这个社区比较活跃。
  
  
相关内容
 - jwt 认证部分和使用的类似装饰器一样的自定义指令，属于`grapl`的特色。
 - `resolve` 链式也是`grapl`的特色，使用频率比较高
 - 借助apollo graphql cloud可以很好的进行调试和发布到云链上，这个非常的方便
