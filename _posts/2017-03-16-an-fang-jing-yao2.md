---
layout: post
title:   安防精要：『iOS 安全攻防』 VS 『Android安全技术』
description: "攻啥防啥：阻止 hook; 阻止 ptrace、dlopen；阻止 gdb 依附；预防重编译，就进行版本 Hash值自检；代码混淆&内存地址擦除迷惑..."
tags: [金融交易]

comments: false
share: false
---

### 引子： 

2015年的时候感性的总结了一些iOS逆向相关的知识。[《攻防简要策略，和精密解剖APP》](http://www.ruoxu.me//jingmijiepou-app)。15年那个时候只是很潦草的摸索了一下，没有认真的总结归纳。过了两年，最近别人交流到很是尴尬，没能藏纳有良好的iOS逆向知识图谱概念来做交流。于是，趁着最近学习Android ，赶紧来做一个简单的两个平台的横向逆向基础&工具的对比分析。加深一下理论理解。


### baseCore：基础思路
1. Hook方案：每个平台、每种语言都有相应 Hook 方案；（譬如iOS Objective-C 的 Method Swizzing）.
2. 内核函数：ptrace、dlopen .
3. 攻啥防啥：阻止 hook; 阻止 ptrace、dlopen；阻止 gdb 依附；预防重编译，就进行版本 Hash值自检；代码混淆&内存地址擦除迷惑...
4. 银行最喜欢RSA证书： https 或者苹果的App签名机制 都是用了这个机制。



### Android和iOS安全对比(感性)

* Android更为开放 开源，虽然系统级别 bug较多但是社区反馈更快。iOS 整体在苹果的闭合链条内，好处是不会有那么多恶意攻击，但是安全性进化较慢。由此，Android 安全进化更快，整体bug较多，但是 进化速度较快，可避免太长远的影响。iOS虽然问题少，但是进化速度不够，导致如果有潜在隐患更可怕。
* ios 虽然看上去安全，但是一出问题 就是大事故。比如Keychain-Dumper 早已经很成熟对付 Keychain。Android 毛病不少，但是很多都是无伤大雅。

[more...](https://www.evernote.com/l/AG5skVMkholBHb9XHft5BaF7b2b7YgyeOKo)
------------------

原文 on evernote:

[《安防精要：『iOS 安全攻防』 VS 『Android安全技术』》](https://www.evernote.com/l/AG5skVMkholBHb9XHft5BaF7b2b7YgyeOKo)

 
