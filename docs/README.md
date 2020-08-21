基于koa+nextjs+koa+postgresql



## Postgresql 相关操作

### 创建linux/unix 用户

sudo adduser dbuser



### 切换到postgres

sudo su - postgres



### 为dbuser设置密码

CREATE USER dbuser WITH PASSWORD 'nineblocks2020best';



### 创建数据库nineblocks 指定管理员dbuser

CREATE DATABASE nineblocks OWNER dbuser;



## 开发和启动

yarn dev 开发服务器启动

yarn start 启动

