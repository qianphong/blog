# Git

[链接](https://github.com/geeeeeeeeek/git-recipes)

## 快速指南

### 工作流

本地仓库由三个“树”组成，工作目录、暂存区域和 HEAD。HEAD 指向最后一次提交的结果，而暂存区域则像一个缓存区域，临时保存你的改动。最后，当你运行 git commit 时，暂存区域的所有内容都会被提交，永久性地存储到 HEAD 中。
![本地仓库](https://camo.githubusercontent.com/6e52beb12c47b2972937c8ae214e21eaa3647777c28936925ebf78ca0038157c/687474703a2f2f7777772e626f6f746373732e636f6d2f702f6769742d67756964652f696d672f74726565732e706e67)

> 第三个阶段是 commit history。HEAD 一般指向最新一次 commit 的引用

```bash
git init
git add <file>
git commit -m 'message'
git remote add <remote-name|origin> <remote-url>
git push -u origin master
```

### 命令

`git status` 显示工作目录和缓存区状态
