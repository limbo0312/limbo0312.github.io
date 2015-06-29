---
layout: post
title:  剖析App的两把x-ray利剑
description: ""
tags: [技术]

comments: false
share: false
---


####剖析App的两把x-ray利剑

---

##### x-Ray on view-hierarchy

**demo-pic**：![111](http://b-egs-studio-images.oss-cn-shenzhen.aliyuncs.com/ruoxu-blog%2FHierarchyViewer.jpg)

**工具哲学**：『自由检视，层级视图树』。通过浏览器，整体性查看App的view层级树，方便调试UI。





##### x-Ray in obj-heap

**demo-pic**：![222](http://b-egs-studio-images.oss-cn-shenzhen.aliyuncs.com/ruoxu-blog%2Fweixin-heap-digg.jpg)

**工具哲学**：『自由校验，内存堆对象实例』。  通过内嵌的dashboard-mini，整体性，细究堆对象(链)中的实时数据变动。




psNote：补充说明

**Heap(堆)**:run-time中的功能,是内存数据区；存储数据类型，是对象实例。
**Stack(栈)**:run-time中的功能,是内存指令区；存储数据类型，是基本数据类型, 指令代码,常量,对象的引用地址。

Heap(堆内存)和Stack(栈内存)存储数据的分别如psNote。堆、栈常被中文多义词层面混淆，所以对内存层面的堆、栈应该成为堆内存、栈内存。
 	     	 
