---
layout: post
title:   【蓝鲸智云】人生苦短，我用蓝鲸
description: "相信体会过C++也拥抱过python的同学，一定深有体会那句玩笑梗：人生苦短，我用python。"
tags: [技术]

comments: false
share: false
---


####  A、人生苦短，我用python

相信体会过C++也拥抱过python的同学，一定深有体会那句玩笑梗：
**人生苦短，我用python**。

相信理性的技术人，我们不会去纠结争论“
*java和php到底哪个更好？*”这类问题。

我们更关注技术带来的生产效率和生产能力的提升，本质是也是关心更高效生产支撑的背后，是我们人类在追求更幸福美好的生活。

所以明智的技术选型，无所谓语言好坏，始终围绕效益原则。分析哪种场景，采用哪种技术的生产效率更好，我们就用这个技术。

####  B、人生苦短，我用“蓝鲸”

前些年就听网易同事说过蓝鲸，那时候还没理解体会到devops的发展趋势与能量。这阵子对DevOps刚有了个认识，然后更多挖掘了解企鹅的 [蓝鲸智云](https://bk.tencent.com/)这DevOps工具。蛮让人激动的工具，感觉它的理念和实践，让人很想点赞。

囊括为为一句话就是：
**人生苦短，我用“蓝鲸”**。

--------
####  C、掌握更高生产力工具，理解蓝鲸架构

在挖掘了解蓝鲸的过程中，自己遇到了个问题：

**蓝鲸形态太大，细节知识面较宽**，首先可能也是个人在devops知识面不够深厚，在客观上蓝鲸这个DevOps的更高生产力工具也是一把大刀。每个设计模块都解决了一个大问题。这就需要多多把握重点了。

对于
**一种“更高生产力方向”的产品**，俺可都是很有热情的(♥◠‿◠)ﾉ)。

大致浏览一些相关资料。如蓝鲸官网文档、蓝鲸公众号的关键文章。还有与蓝鲸相关的infoQ/GOPS演讲，体会其中的历史与理念。

比如通过挖掘整理这些资料，找一条更简练理解DevOps的方式，理解蓝鲸的技巧。

-----

#### keypoitA：官网文档精要 

[url 蓝鲸官网文档](https://bk.tencent.com/document/)

* **一图解蓝鲸**：对于蓝鲸的核心理解，从下方的整体架构图就可以较完整把握。
* **机器管理层A**【管控平台】：运维本质就是管理机器群，所以根本层为“管控平台”，对三个管道的管控（命令、文件、数据）。基于该层，上层建筑的业务才有实现的条件；
* **机器基础使用层B**【作业平台】【配置平台】：运维这个分工的目的最初就为了基本需求，如管理机器与环境，进行代码发布部署，还有监控机器和故障的修复。
* **机器高级使用层C** 【数据平台】【容器平台】【AI平台】：随着新理念、新技术的诞生，拥抱大数据，虚拟化容器，AI智能这些新东西，落实为蓝鲸的模块可能就对应了这三个平台。
* **满足灵活业务的生态层D** 【集成平台】是一种为了满足灵活应用场景，而设计的一种生态层。而【移动平台】其实也可以理解为集成平台的子集。可以通过MagicBox来灵活为移动设备设计定制的呈现界面。

蓝鲸在文档横向面上做得还是很棒的，从各子模块[产品白皮书](https://bk.tencent.com/document/bkprod/000121.html)中就能够感受到。不过从纵向介绍上感觉还是比较粗糙，希望未来可以越来越细腻些，这会更容易给其他IT运维团队带来共鸣和帮助，也能推动出一种DevOps的成熟共识。

![
](http://bk.tencent.com/document/static/images/bk/bkIntroduction/allView.png)

---

#### keypointB： infoQ和GOPS 相关演讲

由前至后排序：

1. [2017年蓝鲸生态全貌【视频】2017-04](https://v.qq.com/x/page/c0398ziy0p0.html)+[【PPT】](http://bkdocument-1252002024.costj.myqcloud.com/1-%E5%85%9A%E5%8F%97%E8%BE%89-2017%E7%9A%84%E8%93%9D%E9%B2%B8%E7%94%9F%E6%80%81%E5%85%A8%E8%B2%8C.pdf)：这份演讲整体介绍了蓝鲸技术架构，然后着重介绍集成平台，以及在这个集成平台之上成就的生态层内容。这个生态层也是一种更高效生产模式的实践。

2. [《蓝鲸—出自技术运营团队的企业操作系统》2016-10 ](http://www.infoq.com/cn/presentations/enterprise-operating-system-from-technical-operation-team) +[ PPT ](http://www.docin.com/p-1759804142.html)：DevOps是未来IT基础设施更高效生产的演化方向。随着DevOps形态越来越成熟，肯定会演化为一种省事省力的可视化系统，甚至是操作系统。而蓝鲸就正在演化为这么一个“企业统一运维的操作系统”，塑造一种运维新形态，推动“运维操作系统”这个新概念。

3. [《海量游戏运维的云化演进》 2014-9](http://www.infoq.com/cn/presentations/massive-game-operation-cloud-evolution?utm_source=infoq&utm_campaign=user_page&utm_medium=link
)+[PPT](http://res.infoqstatic.com/downloads/pdfdownloads/presentations-ch%2FASshenzhen-20140719-dangshouhui.pdf?expire=1523089854&digest=91c5a610888562e3e766de089f581011)：这份演讲介绍了，腾讯游戏运维部门的技术演化路线，直到云化演进为目前的蓝鲸。这对深入了解运维历史的同学是个好丰富的视角。

4. 更多[蓝鲸演讲PPT内容](https://bk.tencent.com/document/bkres/000112.html)，和[infoQ DevOps演讲内容](http://www.infoq.com/cn/operation/presentations/)

...

---

#### EndPoint：个人对于DevOps的理解，主要就三条

* 1、DevOps未来一定会成为**更高生产力IT设施**的标配。
* 2、DevOps 实践的趋向成熟模式一定会向着** 统一化运维操作系统**方向发展。
* 3、蓝鲸在DevOps演化路径上走在了前面，从集成平台的开放生态也可以看到，这就是一种通过创新方式来解决现有问题，解放生产力的实践路径。

#### ps：蓝鲸架构导引图

最后，再绘制一个[蓝鲸架构-蓝鲸导引栈](https://mqh4kt.axshare.com)。也是自己了解蓝鲸这个devops工具的【一图一总结】。


---

Hemingway 20180405

清明 WuMing


