-- 条件查询
SELECT `name` as '姓名',
  `age` as "年龄"
FROM student
WHERE age >= 20;
-- AND 多个条件
SELECT *
FROM student
WHERE gender = '男'
  AND score >= 90;
-- LIKE 模糊查询
SELECT *
FROM student
WHERE `name` LIKE '张%';
-- IN 指定一个集合，NOT IN 排除
SELECT *
FROM student
WHERE class NOT IN ('一班', '二班');
-- BETWEEN * AND 指定区间范围
SELECT *
FROM student
WHERE age BETWEEN 18 AND 19;
-- 指定返回数量，0,5 指的是从0开始的5条数据
SELECT *
FROM student
LIMIT 0, 5;
-- 5,5 从5开始的5条数据
SELECT *
FROM student
LIMIT 5, 5;
-- ORDER BY 指定排序
SELECT *
FROM student
ORDER BY score DESC,
  age DESC;
-- GROUP BY 先将学生按照班级分组，AVG 取平均成绩
SELECT class as '班级',
  AVG(score) AS '平均成绩'
FROM student
GROUP BY class
ORDER BY '平均成绩' DESC;
-- COUNT 计数
SELECT class,
  COUNT(*) AS count
FROM student
GROUP BY class;
-- HAVING 过滤分组后的数据
SELECT class,
  AVG(score) AS avg_score
FROM student
GROUP BY class
HAVING avg_score > 90;
-- DISTINCT 查询后去重
SELECT DISTINCT class
FROM student;
-- 聚合函数 AVG、COUNT、SUM、MIN、MAX
SELECT AVG(score) as '平均成绩',
  COUNT(*) as '人数',
  SUM(score) as 总成绩,
  MIN(score) as '最低分',
  MAX(score) as '最高分'
FROM student;
-- 字符串函数 CONCAT、SUBSTR、LENGTH、UPPER、LOWER
SELECT CONCAT('xx', `name`, 'yy'),
  SUBSTR(NAME, 2, 3),
  LENGTH(NAME),
  UPPER('aa'),
  LOWER('TT')
FROM student;
-- 数值函数 ROUND、CEIL、FLOOR、ABS、MOD
SELECT ROUND(1.232423, 2),
  CEIL(12.333),
  FLOOR(1.24934),
  ABS(-12.353),
  MOD(5, 2);
-- 日期函数 YEAR、MONTH、DAY、DATE、TIME
SELECT YEAR('2023-06-01 22:32:12'),
  MONTH('2023-06-01 22:32:12'),
  DAY('2023-06-01 22:32:12'),
  DATE('2023-06-01 22:32:12'),
  TIME('2023-06-01 22:32:12');
-- 条件函数 IF
SELECT name,
  IF(score >= 60, '及格', '不及格') AS '是否及格'
FROM student;
-- 条件函数 CASE THEN
SELECT name,
  score,
  CASE
    WHEN score >= 90 THEN '优秀'
    WHEN score >= 60 THEN '良好'
    ELSE '差'
  END AS '评级'
FROM student;
-- 系统函数
SELECT VERSION(),
  DATABASE(),
  USER();
-- 其他函数 
-- NULLIF：两值相等返回 null，不相等返回第一个
-- COALESCE：返回第一个非 null 的值
-- GREATEST：返回几个值中最大
-- LEAST：返回几个值中最小
SELECT NULLIF(1, 1),
  NULLIF(1, 2),
  COALESCE(null, null, 3),
  GREATEST(1, 21, 3),
  LEAST(1, 2, 3, 4);
-- 类型转换 SIGNED、UNSIGNED、DECIMAL、CHAR、DATE、TIME、DATETIME、BINARY
SELECT GREATEST(1, CONVERT('123', signed), 3);
SELECT GREATEST(1, CAST('123' as signed), 3);
-- 日期转换 DATE_FORMAT STR_TO_DAT
SELECT DATE_FORMAT('2023-02-01', '%Y年%m月%d日');