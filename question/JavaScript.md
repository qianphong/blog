# JavaScript

## JavaScript 是如何运行的，解释性语言和编译型语言的差异是什么

JavaScript 是一门解释型的动态语言。有些程序设计语言将编译的过程和最终转换成目标程序进行执行的过程混合在一起，这种语言转换程序通常被称为解释器。解释器和编译器有很多相似之处，都需要对源程序进行分析，并转换成目标机器可识别的机器语言进行执行。只是解释器是在转换源程序的同时立马执行对应的机器语言（转换和执行的过程不分离），每执行一次都要进行转换，而编译器得先把源程序全部转换成机器语言并产生目标文件，然后将目标文件写入相应的程序存储器进行执行（转换和执行的过程分离），运行时不需要重新转换。

主流编程高级语言有：

1. 编译型，如 C、C++
2. 解释型，如 JavaScript
3. 半解释半编译，如 Java

相关名词：

1. 高级语言，汇编语言，机器语言
   > 高级语言：代码是写给人看的，不是写给机器看的，只是顺便让计算机可执行而已，之所以高级，是因为它更符合我们的思维和阅读习惯。但是计算机并不能直接执行高级语言，所以还需要把高级语言转换成汇编语言/机器语言才能执行，这个过程就是编译
2. 编译型语言，解释型语言
3. 编译器，解释器

相关链接：

1. https://juejin.cn/post/6987549240436195364#heading-7
2. https://segmentfault.com/a/1190000020438413
3. https://m.html.cn/qa/javascript/11311.html

## ESModule 和 CommonJS 的区别

- ESM 采用静态的加载方式，也就是模块中导入导出的依赖关系在代码编译时就确定下来，因此采用 ESM 进行代码设计时可以在编译时通过 ESLint 快速定位出模块的词法和语法错误以及类型信息等，CommonJS 相对与 ESM 在加载模块的方式上存在明显的差异，是因为 CommonJS 在运行时进行加载方式的动态解析，在运行阶段才能确定导入导出关系，因此无法进行静态编译优化和类型检查，和 Tree Sharking

- commonJS 输出的是值的浅拷贝，esModule 输出值的引用
- commonJS 具有缓存。在第一次被加载时，会完整运行整个文件并输出一个对象，拷贝（浅拷贝）在内存中。下次加载文件时，直接从内存中取值

相关链接：

1. https://blog.csdn.net/weixin_34406796/article/details/91374453
2. https://zhuanlan.zhihu.com/p/161015809
3. https://www.jianshu.com/p/aaf912d7329e
4. https://juejin.cn/post/6996815121855021087#heading-6

## `Object` 和 `Map` 的比较

- `Map` 默认不包含任何键，只包含显式插入的键。
- `Map` 的键可以是 **任意值**，包括函数、对象或是任意基本类型
- `Map` 的键值对个数可以轻易地通过 `size` 属性获取
- `Map` 是 [iterable]](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Loops_and_iteration)的，所以可以直接被迭代
- `Map` 中的 `key` 是有序的。因此，当迭代的时候，一个 `Map` 对象以插入的顺序返回键值

相关链接

1. https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map
