### 背景及痛点

    国内访问github.com在不加速的情况下特别慢，在github下载仓库的时候同样也慢，所以fast-clone cli 出现了

### 实现原理

    将谷歌浏览器GitHub加速插件 代理三个加速下载域名，获取用户输入的github仓库地址，解析成支持加速的地址进行仓库下载

### 安装方法

```bash
npm i @xuchongyu/fast-clone -g
```

### 使用方法

```shell
fast clone <你的仓库地址>
```

### 安装依赖

```shell
npm install
```

### 初始化指令

```shell
npm run dev
```

### 发布指令

```shell
npm run upload
```

### 抛砖引玉

    个人能力有限，如果您有更好的方案，可以将此库下载下来进行二次开发
