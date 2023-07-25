# MySQL

## 术语

- DDL: Data Definition Language（数据定义语言）
- DML: Data Manipulation Language （数据操作语言）
- DQL: Data Query Language （数据查询语言）

## 数据类型

### 整数类型

| 类型名    | 字节 | 有符号               | 无符号              | 范围           |
| --------- | ---- | -------------------- | ------------------- | -------------- |
| TINYINT   | 1    | -128                 | 127                 | -2^7 ~ 2^7-1   |
| SMALLINT  | 2    | -32768               | 32767               | -2^15 ~ 2^15-1 |
| MEDIUMINT | 3    | -8388608             | 8388607             | -2^23 ~ 2^23-1 |
| INT       | 4    | -2147483648          | 2147483647          | -2^31 ~ 2^31-1 |
| BIGINT    | 8    | -9223372036854775808 | 9223372036854775807 | -2^63 ~ 2^63-1 |

### 浮点数类型

| 类型名 | 字节 | 有符号                   | 无符号                  | 范围                                               |
| ------ | ---- | ------------------------ | ----------------------- | -------------------------------------------------- |
| FLOAT  | 4    | -3.402823466E+38         | 3.402823466E+38         | -3.402823466E+38 ~ 3.402823466E+38                 |
| DOUBLE | 8    | -1.7976931348623157E+308 | 1.7976931348623157E+308 | -1.7976931348623157E+308 ~ 1.7976931348623157E+308 |

### 定点数类型

| 类型名  | 字节 | 有符号    | 无符号   | 范围                 |
| ------- | ---- | --------- | -------- | -------------------- |
| DECIMAL | 4    | -999.9999 | 999.9999 | -999.9999 ~ 999.9999 |

### 字符串类型

| 类型名     | 字节         | 有符号 | 无符号 | 范围                |
| ---------- | ------------ | ------ | ------ | ------------------- |
| CHAR       | 0-255        | -      | -      | 0-255 个字符        |
| VARCHAR    | 0-65535      | -      | -      | 0-65535 个字符      |
| TINYTEXT   | 0-255        | -      | -      | 0-255 个字符        |
| TEXT       | 0-65535      | -      | -      | 0-65535 个字符      |
| MEDIUMTEXT | 0-16777215   | -      | -      | 0-16777215 个字符   |
| LONGTEXT   | 0-4294967295 | -      | -      | 0-4294967295 个字符 |

### 日期时间类型

| 类型名    | 字节 | 有符号 | 无符号 | 范围                                              |
| --------- | ---- | ------ | ------ | ------------------------------------------------- |
| DATE      | 3    | -      | -      | 1000-01-01 ~ 9999-12-31                           |
| TIME      | 3    | -      | -      | -838:59:59 ~ 838:59:59                            |
| DATETIME  | 8    | -      | -      | 1000-01-01 00:00:00 ~ 9999-12-31 23:59:59         |
| TIMESTAMP | 4    | -      | -      | 1970-01-01 00:00:01 UTC ~ 2038-01-19 03:14:07 UTC |
| YEAR      | 1    | -      | -      | 1901 ~ 2155                                       |

## 数据库

### 创建数据库

```sql
CREATE DATABASE IF NOT EXISTS `test` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 删除数据库

```sql
DROP DATABASE IF EXISTS `test`;
```

### 查看数据库

```sql
SHOW DATABASES;
```

## 表

### 创建表

```sql
CREATE TABLE student(
	id INT PRIMARY KEY AUTO_INCREMENT COMMENT 'Id',
	name VARCHAR(50) NOT NULL COMMENT '学生名',
	gender VARCHAR(10) NOT NULL COMMENT '性别',
	age INT NOT NULL COMMENT '年龄',
	class VARCHAR(50) NOT NULL COMMENT '班级名',
	score INT NOT NULL COMMENT '分数'
) CHARSET=utf8mb4;
```

### 查询表

```sql
-- 条件查询
SELECT `name` as '姓名', `age` as "年龄" FROM student WHERE age >= 20;
-- AND 多个条件
SELECT * FROM student WHERE gender='男' AND score >= 90;
-- LIKE 模糊查询
SELECT * FROM student WHERE `name` LIKE '张%';
-- IN 指定一个集合，NOT IN 排除
SELECT * FROM student WHERE class NOT IN ('一班','二班');
-- BETWEEN * AND 指定区间范围
SELECT * FROM student WHERE age BETWEEN 18 AND 19;
-- 指定返回数量，0,5 指的是从0开始的5条数据
SELECT * FROM student LIMIT 0,5;
-- 5,5 从5开始的5条数据
SELECT * FROM student LIMIT 5,5;
-- ORDER BY 指定排序
SELECT * FROM student ORDER BY score DESC, age DESC;
-- GROUP BY 先将学生按照班级分组，AVG 取平均成绩
SELECT class as '班级', AVG(score) AS '平均成绩' FROM student GROUP BY class ORDER BY '平均成绩' DESC;
-- COUNT 计数
SELECT class, COUNT(*) AS count FROM student GROUP BY class;
-- HAVING 过滤分组后的数据
SELECT class, AVG(score) AS avg_score FROM student GROUP BY class HAVING avg_score > 90;
-- DISTINCT 查询后去重
SELECT DISTINCT class FROM student;



```

### 函数

```sql
-- 聚合函数 AVG、COUNT、SUM、MIN、MAX
SELECT AVG(score) as '平均成绩', COUNT(*) as '人数', SUM(score) as 总成绩, MIN(score) as '最低分', MAX(score) as '最高分' FROM student;

-- 字符串函数 CONCAT、SUBSTR、LENGTH、UPPER、LOWER
SELECT
	CONCAT( 'xx', `name`, 'yy' ),
	SUBSTR( NAME, 2, 3 ),
	LENGTH( NAME ),
	UPPER( 'aa' ),
	LOWER( 'TT' )
FROM
	student;

-- 数值函数 ROUND、CEIL、FLOOR、ABS、MOD
SELECT ROUND(1.232423,2),CEIL(12.333),FLOOR(1.24934),ABS(-12.353),MOD(5,2);

-- 日期函数 YEAR、MONTH、DAY、DATE、TIME
SELECT YEAR('2023-06-01 22:32:12'), MONTH('2023-06-01 22:32:12'),DAY('2023-06-01 22:32:12'),DATE('2023-06-01 22:32:12'),TIME('2023-06-01 22:32:12');

-- 条件函数 IF
SELECT name, IF(score>=60,'及格','不及格') AS '是否及格' FROM student;

-- 条件函数 CASE THEN
SELECT name,score,CASE WHEN score >= 90 THEN '优秀' WHEN score >=60 THEN '良好' ELSE '差' END AS '评级'  FROM student;

-- 系统函数
SELECT VERSION(), DATABASE(),USER();

-- 其他函数
-- NULLIF：两值相等返回 null，不相等返回第一个
-- COALESCE：返回第一个非 null 的值
-- GREATEST：返回几个值中最大
-- LEAST：返回几个值中最小
SELECT NULLIF(1,1),NULLIF(1,2),COALESCE(null,null,3),GREATEST(1,21,3),LEAST(1,2,3,4);

-- 类型转换 SIGNED、UNSIGNED、DECIMAL、CHAR、DATE、TIME、DATETIME、BINARY
SELECT GREATEST(1,CONVERT('123',signed),3);
SELECT GREATEST(1,CAST('123' as signed),3);

-- 日期转换 DATE_FORMAT STR_TO_DAT
SELECT DATE_FORMAT('2023-02-01','%Y年%m月%d日');
```

### 删除表

```sql
DROP TABLE IF EXISTS `test`.`student`;
```

### 查看表

```sql
SHOW TABLES;
```

### 查看表结构

```sql
DESC `test`.`student`;
```

### 修改表名

```sql
ALTER TABLE `test`.`student` RENAME TO `test`.`students`;
```

### 删除表数据

```sql
TRUNCATE TABLE `test`.`students`;
```

### 修改表字段

```sql
ALTER TABLE `test`.`students` MODIFY COLUMN `name` VARCHAR(255) NOT NULL DEFAULT '张三';
```

### 添加表字段

```sql
ALTER TABLE `test`.`students` ADD COLUMN `gender` TINYINT UNSIGNED NOT NULL DEFAULT 0 AFTER `age`;
```

### 删除表字段

```sql
ALTER TABLE `test`.`students` DROP COLUMN `gender`;
```

### 插入数据

```sql
INSERT INTO `test`.`students` (`name`, `age`, `birthday`) VALUES ('张三', 18, '2000-01-01');
```

### 查询数据

```sql
SELECT * FROM `test`.`students`;
```

### 修改数据

```sql
UPDATE `test`.`students` SET `name` = '李四', `age` = 20 WHERE `id` = 1;
```

### 删除数据

```sql
DELETE FROM `test`.`students` WHERE `id` = 1;
```
