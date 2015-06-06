---
layout: post
title:  重新理解:计算机编程关键概念
description: ""
tags: [技术总结]

comments: false
share: false
---

### moving重新理解:计算机编程关键概念

hoho...梳理了几天，慢慢填


*******
#### 1，重新理解数据(on varData 变量式数据)。

* 元素:单个数据来使用，比如（int）1024,(string)@"上海塔"。独立的数据来进行使用。 基础数据类型int、float、string就是这种类型。
* 序列:多个元素的排列成一个序列。比如数组【1，2，3，4，5，6】。将元素集合排列起来形成新形式。各种数组
* 映射:利用一个元素表示一个属性，例如{@“上海塔高度”：1024}，这种形成的对应绑定关系，即称为映射。

poit==>无论哪种平台，哪种语言，其varData都是一样的。变化的只是声明的差异和存储形态的差异。

*******
#### 2，开源许可协议大致认识：
常见的开源许可协议有：GPL、LGPL、BSD、Apache Licence vesion 2.0、MIT

* GPL：严格度最高，若取用GPL则必须也成GPL；典型如Linux，MySql；
* LGPL：严格度次高，为商用产品提供方便迁入开源库，而不用将商用产品开源；
* BSD：严格度低，商用产品可自由修改或发布，但需著名来源表尊重。
* Apache Licence vesion 2.0：严格度低，类似BSD，比BSD更酷，永久授权全球权利。
* MIT：严格度最低，比BSD还宽松，如JQuery，Node.Js；

*******
#### 3，版本管理工具差异：cvs，svn，git，mercurial（排列以依次更优）

暂未理解透。。。（工具式使用罢了吧）

* cvs：集中式，
* svn：集中式，
* git：分布式，
* mercurial：分布式，

poit==>分布式优于集中式一点是，任何一端可以完整存储全部版本更迭信息，如果目标中心发生故障任何一端可以最小成本还原。

*******
#### 4，NSObject 原理

idea==>这几天才突然对objective-c 的名字有了顾名思义的理解，因为实质objective-c 就是一种将c “对象化”的演化技术，而这里的NSObject 就是“对象化”实现中最为关键的核心数据设计。

* objective-c中所有对象都是c的结构体。
* objc_class就是最核心的这个c结构体。objc_class 包含了objc类所需的所有信息，例如变量列表，方法列表，protocol列表等等。（这些信息可以通过gdb将感兴趣的信息打印出来）.
* NSobject和objc_class都有一个isa变量，NSObject的isa描述它的元信息(即object的类信息)，objc_class描述类的类信息（即类的元信息）.
* 调用方法时，objective-c会将方法调用都会转成c的方法调用。example:[myClassXX  someMethod:@"doingX"] == >objc_msgSend(myClassXX, @selector(someMethod:), @"doingX")


poit==>NSObject 的工作原理可以这么系统理解：一个类（**Class**）维护一张**调度表**（dispatch table）用于解析运行时发送的消息；调度表中的每个实体（entry）都是一个方法（Method），其中key值是一个唯一的名字——选择器（SEL），它对应到一个实现（IMP）——实际上就是指向标准C函数的指针。

*******
#### 4.5 两种奇特Obj-C Runtime操作技术

* associated object：汉化过来，应该叫“对相关联”。

* method swilling：汉化过来，应该叫“方法桥接”。 

poit==>技术的思考策略：像一些巧妙的伎俩、hack手段或者是变通的解决方案，人们总是倾向于创造机会来使用他们——特别是刚刚接触他们时。尽可能的在理解并领悟之后再做出正确的方案，避免自己陷入一知半解的尴尬处境。


*******
#### 5，进程与线程，消息队列：

* 进程：进程是操作系统应用级别操作（即通常说的程序），一个进程开始时至少会有一个主线程 (即主执行实例) ，一个进程里可以有多个线程在执行，称为执行实例。
* 线程：一个线程只能有一个消息队列 ( queue ) 与之相对应。
* 消息队列：消息队列则是与线程 ( Thread ) 相关的。消息就是，诸如鼠标，键盘输入等东西化为事件代号，发送到你的程序的消息队列里面去，你的程序则每次提取一个事件，根据事件的性质执行相应的操作，不断循环而已。



*******
#### 6，算法与数据结构

*******
#### 7，更好理解宏

*******
#### 8，编译器干了什么事

*******
#### 9，Makefile干了什么事

*******
#### 10，java内存原型与工作原理

* 栈：（存放基本类型的数据和对象的引用）
* 堆：（存放用new产生的数据静态域）

*******
#### 11，Linux系目录结构理解

*******
#### 12，NodeJS 速读

*******
#### 13，优异第三方库设计思想。iconsole，AFnetwork

*******
#### 14，优异第三方服务设计思想。
fllury，bugsence，twilio，parse

*******
#### 15，优异创新思路，wifi信号捕获顾客数据，wifi信号识别动作手势

*******
#### 16，http编程与AFnetworking库 

*******
#### 17，socket编程与CocoaAsyncSocket

*******
#### 18，文本字符编码unicode，ascii，utf8

*******
#### 19，makedown设计为何精妙

*******
#### 20，开源社区的品味sourceforge，Github，bitbucket，

*******
#### 21，Json 与xml 设计风格比较

*******
#### 22，GDB实现与基本使用

*******
#### 23，个人framework 建立策略

*******
#### 24，正则表达式略知

*******
#### 25，block、GCD、线程、队列

*******
#### 26，hack iOS 步骤与方案（iOSOpenDev）

*******
#### 27，iOS由哪些开源根基支撑
opensource.apple.com

1. WebKit , WebKit is the open source web browser engine at the heart of Apple's Safari web browser on Mac, Windows, and iOS. It also provides a system-level framework engine that powers Dashboard, Mail, and many other OS X apps.
![11](https://devimages.apple.com.edgekey.net/opensource/images/opensource_webkit.png)
	* http://www.webkit.org/  webkit 官方
	
2. UNIX 	

*******
#### 28，GCC、LLVM差异

*******
#### 29，更好理解操作系统
《现代操作系统》《操作系统设计与实现》，

*******
#### 30，浏览器渲染原理

*******
#### 31，脚本语言横向比对ruby python


##### 32, 库文件.a 的常用操作
1. **lipo**: 查看(info)、创建（create）、分拆（thin） 库文件.a的操作。demo：（$ lipo -info lib1.a）;（$ lipo -create lib1.a lib2.a -output lib.a）;($ lipo -thin armv6 lib1.a -output lib1-armv6.a)
2. **ar** :查看（-t）、拆开（-x）；（$ ar -t lib1-armv6.a）;($ ar -x ../lib1-armv6.a)
3. **libtool**: 组装（-static）o文件成库文件。（$ libtool  -static *.o -output ../libProprietary-armv6.a）

##### 33, cocoaPods的理解与使用
cocoaPods简介：任何热门的语言使用得比较成熟，都会衍生一些边缘服务效应，比如gems之于Ruby，pip之于python。cocoaPods则是iOS的包管理工具（准确理解，可以称为第三方模块的中央代码）。


