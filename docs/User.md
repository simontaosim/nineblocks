# 用户模型



```sql
/*
    创建用户表,
    username 唯一非空，并且索引，
*/
CREATE TABLE public."User" (
	id serial NOT NULL,
	username varchar(50) NOT NULL,
	"password" varchar(50) NOT NULL,
	profile json NULL,
    /*
    	用户个人信息，手机，邮箱等
	*/
    "isPassSet" bool NOT NULL DEFAULT false,
    createdAt timestamp NOT NULL DEFAULT now(),
	updatedAt timestamp NOT NULL DEFAULT now(),
    nikename varchar(50) NULL, --昵称
    -- 用户是否自行设置了密码，用于免密登陆
	CONSTRAINT user_pk PRIMARY KEY (id),
	CONSTRAINT user_un UNIQUE (username)
);
CREATE UNIQUE INDEX user_username_idx ON public."User" USING btree (username);

-- 创建用户表结束


```

## 注册

1. 以用户名为testuser1, 密码为testuser1-password创建新用户

```sql
insert into public."User" (username, password,'isPassSet') values ('testuser1', 'testuser1-password', true);
```

2. 用手机号 13512341234 和 验证码注册

```sql
insert into public."User" (username, password,profile,'isPassSet') 
values ('13512341234', 'somerandompassword','{
        "mobile": "13512341234"
        }' false); -- 密码是随机的，但是要标记用户没有自行设置
```

3. 使用邮箱myname@domain.com 和验证码注册

   ```sql
   insert into public."User" (username, password,profile,'isPassSet') 
   values ('myname@domain.com', 'somerandompassword','{
           "email": "myname@domain.com"
           }' false); -- 密码是随机的，但是要标记用户没有自行设置
   ```

4. 设置用户名为testuser1的用户的密码another_password

   ```sql
   UPDATE public."User" SET password = "another_password" WHERE username = testuser1
   ```

   

5. 设置手机号码为13512341234的用户的密码

   ```sql
   UPDATE public."User" SET password = "another_password" WHERE profile ->> 'mobile' = '13512341234'
   ```

   

6. 设置邮箱为myname@domain.com 的用户的密码

   ```sql
   UPDATE public."User" SET password = "another_password" WHERE profile ->> 'email' = 'myname@domain.com'
   ```

   

1. *注意：密码应当加密以密文存储*
2. *注意：不能简单臆断手机和用户名一致或者邮箱和用户名一致*



## 用户资料

大多数信息在profile。nikename也属于用户资料，考虑拉取优先，故不放在json中,  profile中大部分数据不会经常修改，故使用json而不是jsonb

### 用户资料可能包含内容

profile ->> json

|   键名   |                 含义                 | 类型(js) |
| :------: | :----------------------------------: | :------: |
|  mobile  |                手机号                |  String  |
|  email   |                 邮箱                 |  String  |
| realname |               真实姓名               |  String  |
|  gender  | 性别：0是女，1是男，2是未知，3是保密 |  Number  |

