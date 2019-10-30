---
title: 常用SQL
---
[[toc]]

## 数据库创建
```sql
CREATE DATABASE test;
USE test;
```

## 创建表
```sql
CREATE TABLE mytable (
  # int 类型，不为空，自增
  id INT NOT NULL AUTO_INCREMENT,
  # int 类型，不可为空，默认值为 1，不为空
  col1 INT NOT NULL DEFAULT 1,
  # 变长字符串类型，最长为 45 个字符，可以为空
  col2 VARCHAR(45) NULL,
  # 日期类型，可为空
  col3 DATE NULL,
  # 设置主键为 id
  PRIMARY KEY (`id`));
```

## 修改表
+ 添加列
    ```sql
    ALTER TABLE mytable
    ADD col CHAR(20);
    ```

+ 删除列
    ```sql
    ALTER TABLE mytable
    DROP COLUMN col;
    ```

+ 删除表
    ```sql
    DROP TABLE mytable;
    ```

## 插入
+ 普通插入
    ```sql
    INSERT INTO mytable(col1, col2)
    VALUES(val1, val2);
    ```

+ 插入检索出来的数据
    ```sql
    INSERT INTO mytable1(col1, col2)
    SELECT col1, col2
    FROM mytable2;
    ```

+ 将一个表的内容插入到一个新表
    ```sql
    CREATE TABLE newtable AS
    SELECT * FROM mytable;
    ```

## 更新
```sql
UPDATE mytable
SET col = val
WHERE id = 1;
```

## 删除
```sql
DELETE FROM mytable
WHERE id = 1;
```
`TRUNCATE TABLE` 可以清空表，也就是删除所有行。
```sql
TRUNCATE TABLE mytable;
```
使用更新和删除操作时一定要用 `WHERE` 子句，不然会把整张表的数据都破坏。可以先用 `SELECT` 语句进行测试，防止错误删除。

## 查询
+ **DISTINCT**

    相同值只会出现一次。它作用于所有列，也就是说所有列的值都相同才算相同。
    ```sql
    SELECT DISTINCT col1, col2
    FROM mytable;
    ```

+ **LIMIT**

    限制返回的行数。可以有两个参数，第一个参数为起始行，从 0 开始；第二个参数为返回的总行数。

    + 返回前 5 行：
        ```sql
        SELECT *
        FROM mytable
        LIMIT 5;
        ```
        ```sql
        SELECT *
        FROM mytable
        LIMIT 0, 5;
        ```

    + 返回第 3 ~ 5 行：
        ```sql
        SELECT *
        FROM mytable
        LIMIT 2, 3;
        ```

## 排序
- ASC ：升序（默认）
- DESC ：降序

可以按多个列进行排序，并且为每个列指定不同的排序方式：
```sql
SELECT *
FROM mytable
ORDER BY col1 DESC, col2 ASC;
```

## 过滤
不进行过滤的数据非常大，导致通过网络传输了多余的数据，从而浪费了网络带宽。因此尽量使用 SQL 语句来过滤不必要的数据，而不是传输所有的数据到客户端中然后由客户端进行过滤。
```sql
SELECT *
FROM mytable
WHERE col IS NULL;
```
下表显示了 `WHERE` 子句可用的操作符

操作符 | 说明 |
- | -
= | 等于 |
< | 小于 |
> | 大于 |
<> != | 不等于 |
<= !> | 小于等于 |
>= !< | 大于等于 |
BETWEEN | 在两个值之间 |
IS NULL | 为 NULL |  
应该注意到，`NULL` 与 `0`、空字符串都不同。

**AND** 和 **OR** 用于连接多个过滤条件。优先处理 **AND**，当一个过滤表达式涉及到多个 **AND** 和 **OR** 时，可以使用 `()` 来决定优先级，使得优先级关系更清晰。

**IN**操作符用于匹配一组值，其后也可以接一个 `SELECT` 子句，从而匹配子查询得到的一组值。

**NOT** 操作符用于否定一个条件。

## 通配符
通配符也是用在过滤语句中，但它只能用于文本字段。
- `%` 匹配 `>=0` 个任意字符；
- `_` 匹配 `==1` 个任意字符；
- `[]` 可以匹配集合内的字符，例如 `[ab]` 将匹配字符 `a` 或者 `b`。用脱字符 `^` 可以对其进行否定，也就是不匹配集合内的字符。

使用 `Like` 来进行通配符匹配。
```sql
SELECT *
FROM mytable
WHERE col LIKE '[^AB]%'; -- 不以 A 和 B 开头的任意文本
```

## 计算字段
在数据库服务器上完成数据的转换和格式化的工作往往比客户端上快得多，并且转换和格式化后的数据量更少的话可以减少网络通信量。

计算字段通常需要使用 `AS` 来取别名，否则输出的时候字段名为计算表达式。
```sql
SELECT col1 * col2 AS alias
FROM mytable;
```
`CONCAT()` 用于连接两个字段。许多数据库会使用空格把一个值填充为列宽，因此连接的结果会出现一些不必要的空格，使用 `TRIM()` 可以去除首尾空格。
```sql
SELECT CONCAT(TRIM(col1), '(', TRIM(col2), ')') AS concat_col
FROM mytable;
```

## 函数
以下主要是 `MySQL` 的函数。

函 数 | 说明 |
- | -
AVG() | 返回某列的平均值 |
COUNT() | 返回某列的行数 |
MAX() | 返回某列的最大值 |
MIN() | 返回某列的最小值 |
SUM() | 返回某列值之和 |
AVG() 会忽略 NULL 行。

使用 `DISTINCT` 可以汇总不同的值。
```sql
SELECT AVG(DISTINCT col1) AS avg_col
FROM mytable;
```

## 文本处理
函数 | 说明 |
- | -
LEFT () | 左边的字符 |
RIGHT() | 右边的字符 |
LOWER()	 | 转换为小写字符 |
UPPER() | 转换为大写字符 |
LTRIM() | 去除左边的空格 |
RTRIM() | 去除右边的空格 |
LENGTH() | 长度 |
SOUNDEX() | 转换为语音值 |

## 分组
把具有相同的数据值的行放在同一组中。

可以对同一分组数据使用汇总函数进行处理，例如求分组数据的平均值等。

指定的分组字段除了能按该字段进行分组，也会自动按该字段进行排序。
```sql
SELECT col, COUNT(*) AS num
FROM mytable
GROUP BY col;
```
`GROUP BY` 自动按分组字段进行排序，`ORDER BY` 也可以按汇总字段来进行排序。
```sql
SELECT col, COUNT(*) AS num
FROM mytable
GROUP BY col
ORDER BY num;
```
`WHERE` 过滤行，`HAVING` 过滤分组，行过滤应当先于分组过滤。
```sql
SELECT col, COUNT(*) AS num
FROM mytable
WHERE col > 2
GROUP BY col
HAVING num >= 2;
```
分组规定：
- `GROUP BY` 子句出现在 `WHERE` 子句之后，`ORDER BY` 子句之前；
- 除了汇总字段外，`SELECT` 语句中的每一字段都必须在 `GROUP BY` 子句中给出；
- `NULL` 的行会单独分为一组；
- 大多数 `SQL` 实现不支持 `GROUP BY` 列具有可变长度的数据类型。

## 子查询
子查询中只能返回一个字段的数据。

可以将子查询的结果作为 `WHRER` 语句的过滤条件：
```sql
SELECT *
FROM mytable1
WHERE col1 IN (SELECT col2
               FROM mytable2);
```
下面的语句可以检索出客户的订单数量，子查询语句会对第一个查询检索出的每个客户执行一次：
```sql
SELECT cust_name, (SELECT COUNT(*)
                   FROM Orders
                   WHERE Orders.cust_id = Customers.cust_id)
                   AS orders_num
FROM Customers
ORDER BY cust_name;
```

## 连接
连接用于连接多个表，使用 `JOIN` 关键字，并且条件语句使用 `ON` 而不是 `WHERE。`

连接可以替换子查询，并且比子查询的效率一般会更快。

可以用 `AS` 给列名、计算字段和表名取别名，给表名取别名是为了简化 `SQL` 语句以及连接相同表。

+ **内连接**

    内连接又称等值连接，使用 `INNER JOIN` 关键字。
    ```sql
    SELECT A.value, B.value
    FROM tablea AS A INNER JOIN tableb AS B
    ON A.key = B.key;
    ```
    可以不明确使用 `INNER JOIN`，而使用普通查询并在 `WHERE` 中将两个表中要连接的列用等值方法连接起来。
    ```sql
    SELECT A.value, B.value
    FROM tablea AS A, tableb AS B
    WHERE A.key = B.key;
    ```

+ **自连接**

    自连接可以看成内连接的一种，只是连接的表是自身而已。

    一张员工表，包含员工姓名和员工所属部门，要找出与 Jim 处在同一部门的所有员工姓名。

    + 子查询版本
        ```sql
        SELECT name
        FROM employee
        WHERE department = (
            SELECT department
            FROM employee
            WHERE name = "Jim");
        ```
    + 自连接版本
        ```sql
        SELECT e1.name
        FROM employee AS e1 INNER JOIN employee AS e2
        ON e1.department = e2.department
            AND e2.name = "Jim";
        ```

+ **自然连接**

    自然连接是把同名列通过等值测试连接起来的，同名列可以有多个。

    内连接和自然连接的区别：内连接提供连接的列，而自然连接自动连接所有同名列。
    ```sql
    SELECT A.value, B.value
    FROM tablea AS A NATURAL JOIN tableb AS B;
    ```

+ **外连接**

    外连接保留了没有关联的那些行。分为左外连接，右外连接以及全外连接，左外连接就是保留左表没有关联的行。

    检索所有顾客的订单信息，包括还没有订单信息的顾客。
    ```sql
    SELECT Customers.cust_id, Orders.order_num
    FROM Customers LEFT OUTER JOIN Orders
    ON Customers.cust_id = Orders.cust_id;
    ```

## 组合查询
使用 `UNION` 来组合两个查询，如果第一个查询返回 `M` 行，第二个查询返回 `N` 行，那么组合查询的结果一般为 `M+N` 行。

每个查询必须包含相同的列、表达式和聚集函数。

默认会去除相同行，如果需要保留相同行，使用 `UNION ALL`。

只能包含一个 `ORDER BY` 子句，并且必须位于语句的最后。
```sql
SELECT col
FROM mytable
WHERE col = 1
UNION
SELECT col
FROM mytable
WHERE col =2;
```

## 视图
视图是虚拟的表，本身不包含数据，也就不能对其进行索引操作。

对视图的操作和对普通表的操作一样。

视图具有如下好处：
- 简化复杂的 `SQL` 操作，比如复杂的连接
- 只使用实际表的一部分数据；
- 通过只给用户访问视图的权限，保证数据的安全性；
- 更改数据格式和表示。
```sql
CREATE VIEW myview AS
SELECT Concat(col1, col2) AS concat_col, col3*col4 AS compute_col
FROM mytable
WHERE col5 = val;
```

## 存储过程
存储过程可以看成是对一系列 `SQL` 操作的批处理。

使用存储过程的好处：
- 代码封装，保证了一定的安全性；
- 代码复用；
- 由于是预先编译，因此具有很高的性能。

命令行中创建存储过程需要自定义分隔符，因为命令行是以 `;` 为结束符，而存储过程中也包含了分号，因此会错误把这部分分号当成是结束符，造成语法错误。

包含 `in`、`out` 和 `inout` 三种参数。

给变量赋值都需要用 `select into` 语句。

每次只能给一个变量赋值，不支持集合的操作。
```sql
delimiter //

create procedure myprocedure( out ret int )
    begin
        declare y int;
        select sum(col1)
        from mytable
        into y;
        select y*y into ret;
    end //

delimiter ;
```
```sql
call myprocedure(@ret);
select @ret;
```