---
layout: post
title:  音视频入门的简单启发
description: "计算机技术领域中，『音视频技术』应该说算是较复杂的小门类。较复杂的东西有个简单的入门指引，或者有前辈带路是很重要的。"
tags: [音视频]

comments: false
share: false
---


计算机技术领域中，『音视频技术』应该说算是较复杂的小门类。较复杂的东西有个简单的入门指引，或者有前辈带路是很重要的。

前阵子，因为项目中急需音视频技术，虽然网上资料看似很丰富，但对初学者来说，很多资料都是**『硬入门』**，一上来就摆弄一大堆具体的技术概念点(SPS，PPS，H264，HEAV...)，让初学者一直处于半懂不懂的摸索怀疑状态。

更好的方式，假设称为**『软入门』**，应该是先简单理解到**音视频的根本组成原理**(即动画原理)，**再把具体而庞杂的技术点往上拼建**，让新同学明白循序渐进，明白枝干的主次，对于他们未来的深入学习将是事半功倍的。

###  A、简单理解，音视频原理

很多人小时候，应该玩过个小游戏，在笔记本上连续几页绘制一只动物前后迈脚，然后快速翻页，就有了如下图 pic-0的效果。**这个过程就蕴含着，(视频)动画原理**。音视频原理也是基于此。如再在翻页的时候，你学一声马叫”嘶.....”。不用怀疑，这个声音就是一段音频中采样的PCM了。至于为啥叫PCM，下面这几张图，结合几句说明应该足够解惑了。

![pic-0](http://ww1.sinaimg.cn/large/65e4f1e6gw1f9z265328tg208j06ejrs.gif)

图. pic-0

**音视频的简单原理，就是一段序列播放的图片，再同步播放相应的序列音频采样片。**如同 图pic-0到pic-3中所揭示的，里面就包含三个关键元素。

* 1、**YUV图片**：从H264、HEAV等编码的二进制数据中，解码出来的序列图片叫YUV图片，本质上跟常见的jpg、png一样。因为视频中的序列图片实在太多了，考虑到效率和历史原因等，视频中解码出来的图片帧为YUV。显卡的主要工作内容就是处理这些图形数据。
* 2、**PCM音频**：从mp3、aac等编码的二进制数据中，解码出来的序列音频采样点叫PCM音频数据，可以理解每一片PCM音频波形就是一个单位的声音。了解PCM格式的信息可以见[PCM百科](http://baike.baidu.com/view/283815.htm)。
* 3、**音画同步**：将序列图片帧连续渲染到计算机图层，同时根据同步参数DTS、PTS来同步播放音频帧，这就是视频的播放过程了。请坚信，那些你未来接触到的奇怪音视频术语都是围绕这个简单过程的。

![](http://ww2.sinaimg.cn/large/65e4f1e6gw1f9z27xava7j20rr0aujtd.jpg)

图. pic-1

![](http://ww2.sinaimg.cn/large/65e4f1e6gw1f9z2ycj9dcj20ex08bdgm.jpg)

图. pic-2

![](http://ww4.sinaimg.cn/large/65e4f1e6gw1f9z2yti5vxg20fa0b43yl.gif)

图. pic-3（动画能实现，基于两点基础，a、人眼和人脑的视觉缓存效应，b、计算机带来的图画运算速度）

------

###  B、音视频技术，常见的概念

音视频技术中一些专业的概念，跟我们平时交流中用到的一些词汇有一定区分。

* 1、**视频格式**：我们经常看到的视频格式mp4、avi、mkv。在技术概念中，叫『视频封装格式』，简称视频格式，里面包含了封装视频文件所需要的视频信息、音频信息和相关的配置信息(比如：视频和音频的关联信息、如何解码等等)。
* 2、**编解码方式(视频)**：视频编解码的过程是指对数字视频进行压缩或解压缩的一个过程。常见的视频编解码方式有，H.26X(H.264,H.265等)，MPEG等。这里**需要留意到，不同的视频封装格式，其实里面使用的编解码方式很多是可能一样的**，封装格式是不同厂家的包装。这就好比，多个雪糕厂家生产一个口味的雪糕，外面的包装都是不一样的。
* 3、**编解码方式(视频)**：常用的音频编解码方式有 AAC、MP3、WMA等。

![](http://ww1.sinaimg.cn/large/65e4f1e6gw1f9z2z5ip31j20j90gcn0a.jpg)

图. pic-4

*以下的概念就慢慢专业一些，可以逐步消化，用百科词条等来辅助理解。*

###  C、视频解码：实现“H.264->YUV”

视频解码的过程，就是将以某种编码方式(H264)进行编码的二进制数据，解码成YUV图片的过程，**即“H.264->YUV”**。
最广泛使用的莫过于FFmpeg这个开源的编解码套件，里面广泛涵盖了常见的编解码方式，还有封装格式(视频格式)。

针对到常用的H264编码方式，里面就涉及到一些具体的编码技术。

* 1、**一帧图像、颜色模型**：具体就涉及帧编码，场编码，RGB三原色颜色模型，YUV颜色模型，常用的有 YCbCr 4:2:0、YCbCr 4:2:2、YCbCr 4:1:1 和 YCbCr 4:4:4 这些YUV子分类颜色模型。
          详细的介绍参考针对性的资料，这里就只做入门简述了。
          [《帧和场的概念》](http://www.cnblogs.com/yinxiangpei/articles/3490236.html)
          [《视频帧的类型》](https://wuyuans.com/2012/01/video_encode_frame)

* 2、**H264码流格式**：   码流里面就是装载着编码后的视频数据的结构载体。其它编码方式的码流格式也是类似 图pic-5的结构，里面就包括了一些编解码的参数集等关键信息。
          详细的介绍可以了解。
          [《H.264码流结构解析》](http://wenku.baidu.com/view/ab19d6c79ec3d5bbfd0a7418.html)
          [《IDR、CRA、BLA、RASL、RADL、Gop》](http://blog.csdn.net/u010289908/article/details/45741753)

    ![](http://ww3.sinaimg.cn/large/65e4f1e6gw1f9z2ze1ruzj20b406idgd.jpg)
	
	图. pic-5(码流格式，即码流内数据组织方式)

* 3、**帧内预测和帧间预测**：因为视频的图像序列很有连续性，所以为了最大可能提高编码压缩效率，就有了『帧内预测和帧间预测』这种技术思路。简单来说帧内预测就是压缩单帧的大小，帧间预测就是根据A帧来预测B帧的变化，从而压缩了B帧。详细资料再多可自己参考，[《帧内预测和帧间预测的比较》](http://www.voidcn.com/blog/lzx995583945/article/p-3963685.html)

    ![](http://ww2.sinaimg.cn/large/65e4f1e6gw1f9zialuuarj20xc0lfn2h.jpg)
	
	图. pic-6(直观看出哪类帧柱形图比较高，帧预测关键标记在在动画『变动』区域)
	
* 4、**流媒体协议**：除了本地视频的播放，我们经常用到的就是视频的在线播放(点播、直播)。需要在线播放就需要使用到流媒体协议的支持，常见的流媒体协议有RTMP、HLS、Http-flv、RTSP等。[《流媒体协议综述》](http://blog.csdn.net/wishfly/article/details/51919441)

###  D、音频解码：实现“AAC->PCM”

音频帧和视频帧处理的工艺都是类似的，差异之处就是音频采用的编码方式为AAC、MP3等，处理出来的**基础单元为PCM(视频的基础单元YUV)**。
需了解详细的同学，可以从百度百科词条[『音频编码』](http://baike.baidu.com/link?url=tqnRVQkg0MYSXd3yJxg3eFBVCEsM46WXpprc16LLRHal_GBPYhGosyFvGxjOCuHGg8v-kMKADrzpoCS9947fkmBQZCGby0S6kOEQA9zYkN32oq13_xZpYKK5ZsTvLJJ3)开始。

![](http://ww1.sinaimg.cn/large/65e4f1e6gw1f9zibw53a8j20xc0kuqa1.jpg)

图. pic-7(上手过Adobe Audition之后就会更直观明白音频文件的大致构成了)

###  E、移动播放器绕不开的—-->ijkPlayer架构简述

ijkPlayer播放器是一个包括iOS、Android两个平台的播放器，是Bilibili网址基于FFmpeg的简易ffplay播放器来进行开发的。相比于更有名的VLC播放器，ijkPlayer更精简，代码量更小，更方便改造。

如果你是从事手机移动播放相关的工作，你会发现，当探索过VLC的庞杂模块还有各类繁多的基于ffmpeg的小开源播放器之后，ijkPlayer可能还是绕不开的开源方案。

ijjPlayer播放流程跟ffplay使用ffmpeg播放流程一样，区别就是ijkPlayer会根据具体的iOS、Android平台来使用该平台的硬解码工具，效率要比ffmpeg的软解码高出很多。
其实ijkPlayer架构很精简，可以从这些系列资料开始，然后阅读它的代码。
          [《ijkplayer系列(二) —— ijkplayer初始化流程》](http://www.qhung.cn/2016/06/24/ijkplayer-1-init/)

![](http://ww4.sinaimg.cn/large/65e4f1e6gw1f9z30e6y7bj20k50bhtbv.jpg)

图. pic-8

###  F、直播化特性，来改造ijkPlayer播放器

如果播放器是移动类的直播需求，其实很多国内的云直播解决方案sdk，比如七牛云直播，金山云直播，都是基于ijkPlayer进行修改的，比如iOS可以通过obj-c runtime特性剖开封装类中是不是含有IJKMediaPlayer这个类。2016年大热起来各种视频直播App，所以各种直播云服务也丰富了起来，这一类直播播放一般会比较重视的特性有，a、直播的秒开，b、避免花屏和弱网卡顿，c、直播的超低延迟以保证互动效率。捡有特点的来简单说明一些。

* 1、**直播秒开**。一方面需要服务器做Gop缓存(为了客户端能最快得到第一帧完整图画)，一方面需要客户端预置格式信息，避免avformat_find_stream_info等这类耗时函数，还有优先解码出第一帧图像进行渲染。
* 2、**直播低延迟**。服务器和客户端同时优化多级缓存中的默认时长。
* 3、**直播紧追(追踪)**。金山云称之为直播追踪，实际上『直播紧追』更能代表这个技术的目的。实现的过程是，将网络累计等因素造成的过大缓冲快速播放掉，紧跟直播源时间戳，保证客户端播放进度最大程度接近视频真实发生的时间。

**参考：**

* a、[《关于视频的一些概念》](http://www.samirchen.com/video-concept/)
* b、（推荐！）[《FFMPEG详解》](http://chunlin.li/tech/doku.php/tech:multimedia:ffmpeg)
* c、[雷霄骅， 视音频编解码技术](http://blog.csdn.net/leixiaohua1020/article/details/18893769)
* d、[雷霄骅，《基于 FFmpeg + SDL 的视频播放器的制作》课程的视频](http://blog.csdn.net/leixiaohua1020/article/details/47068015)
* e、[《ijkplayer视频播放器源码分析》](http://www.jianshu.com/p/7d9b86919682)
* f、等...