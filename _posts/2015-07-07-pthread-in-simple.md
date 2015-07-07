---
layout: post
title: iOS多线程技术简要综述
description:  iOS多线程技术简要综述
tags: [技术总结]

---


####iOS多线程技术简要综述

最烦恼的时候，莫过于理不透『凌乱的概念群』的时候，你无法辨别出，哪个是自相矛盾的描述？哪个是本身是错误的提问？因为你只是茫茫然知道这个技术栈。

而iOS多线程编程技术，就是个典型的『凌乱的概念群』。相应的概念集合有，pthread、NSThread(NSRunLoop、Queue)、NSOperation(NSOperationQueue)、GCD。

相互关系复杂的概念群，最必须地是一定得找出一条核心贯穿的主线。面对这里的iOS多线程概念，贯穿的主线是这样：

 * **step1:** iOS、Mac系统底层使用POSIX层，所以多线程底部C的实现是C函数[pthread](http://blog.chinaunix.net/uid-20528014-id-333508.html)。
 * **step2:** 对于应用型软件，若在pthread层级来使用线程技术是很费劲很高成本的事。所以苹果公司设计了NSThread这个类来封装pthread函数集，通过NSThread来使用多线程技术要远远比pthread方便高效了很多。并且NSThread提供的函数，也能够充分控制线程的整个生命周期。
 * **step3:** 随着iOS对应的硬件承载快速发展，开发者专注的应该只是，开辟线程去执行的任务本身，而不该花费精力管理线程生命周期。所以NSOperation、NSOperationQueue应运而生，正如他们的名称所指的，Operation专注把任务打包扔到Operation队列，Operation队列自动开辟管理线程去执行所需要执行的任务。
 * **step4:** 又随着iphone升级到多核级别，苹果公司又再次设计出了GCD(中枢任务调度器)，GCD的使用也是不需要管理线程生命周期，只需要专注任务代码块，通过GCD既能够傻瓜式的使用多线程执行复杂任务，也能够充分利用多核cpu资源。
 
除了梳理出主线。复杂概念群还需要，重点明确那些容易被人们混淆的概念。

* **NSRunLoop**：这个概念只跟随thread线程概念，它**类似windows的消息机制**。让线程处在等待状态，追踪事件源(用户键盘、手势、timer)有输入时，调派线程执行相应任务。其中文档上有一句关键的句子『*Each NSThread object, including the application’s main thread, has an NSRunLoop object automatically created for it as needed.*』即runloop是NSThread自动管理的。
* **Queue队列**：这种不加副词的概念，很容易和数据结构里面的队列混淆概念，所以这里明确的说法叫『**线程的任务队列Queue**』，这就明确了，每条线程都维护一条自己的任务队列。而队列的类型就跟随线程的类型，比如主线程对应主队列，同步执行在当前队列就串行队列，并发执行的多任务在并发队列。


apple文档里面的插图都是，局部的描述，不好把握这个概念群。所以我简陋的画一张thread、runloop、inputSource、queue的关系图。

![111](http://b-egs-studio-images.oss-cn-shenzhen.aliyuncs.com/ruoxu-blog%2Fthread-simple.jpg)