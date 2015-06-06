---
layout: post
title:  Web_In_One_IDE设计构想
description: "Web_In_One_IDE设计构想"
tags: [技术总结]

comments: false
share: false
---


### Web_In_One_IDE 设计构想


区别于传统web前后端的开发流程，Web_In_One_IDE 大概上是这样的。

**旧场景：**web后端开发中，核心的业务逻辑占量其实并不是很大。而部署、监控、调优会占据不少精力。web前端开发中，由于有bootstrap等快速UI方案，所以主要UI模块开发进度也比较快，而细节的设计考究和新交互动画会越来越占据大比重。成本较高的其实是web前后端开发人员的耦合程度较低。

**新场景：**Web_In_One_IDE 的思路则是“耦合化”web前后端开发工作。模仿XCode的实现，在一个IDE内，实现快速开发Web前后端，(模板式)快速实现webApp的核心逻辑业务。前后端的细节调优也是让两组开发人员以Git协作在同一个IDE。继而，甚至整合一键升级部署，性能监控等系列基础服务(借鉴XCode和苹果AppStore的紧凑服务)。

Web_In_One_IDE应该大概有几个设计要点：前后端一体化开发、快捷开发、一键部署、形象化整体开发。

**可能的实现技术依赖：**

1. javascript作为开发语言。得益于NodeJS V8在后端的表现, JS几乎是不二选择。
2. json等作为前后端通信管道。为了实现更加“实时”链接，还可以借鉴Meteor开启的DDP（Distributed Data Protocol）协议思路。

**Web_In_One_IDE好处：**

1. 更低廉成本的web成型。让全栈工程师的入门成本更低。
2. 更形象化Web开发风格，降低学习成本和使用成本。
3. 更好地软件工程实践探索。

**最佳的潜在作者可能：**

1. 云计算服务生。阿里云，AWS，或者执行力更强的中小厂商leanCloud和Parse等。
2. 软件巨头。Adobe(刚刚推兴起的开源bracket虽然不错，但是性能太烂，迭代速度太个人化，不够专业和优异)

**构想借鉴：**

1. meteor一体化开发框架。
2. XCode和AppStore的设计。
3. github的工程主页托管github.io。