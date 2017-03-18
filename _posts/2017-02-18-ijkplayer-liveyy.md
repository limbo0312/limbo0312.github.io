---
layout: post
title:   回顾&总结：ijkPlayer 直播特性分支
description: "引子：半年前搞的内部云导播项目，因为有个多屏直播且迅捷切换的变态需求，从 vlc 摸索折腾到Vitamio sdk,七牛直播 sdk，金山云 sdk 等等，到回归 ffmpeg和 ffplay还有基于 ffplay 的 ijkplayer，"
tags: [技术总结]

comments: false
share: false
---


### 引子： 

半年前搞的HJY云导播项目，因为有个多流直播且流组合切换的特殊需求，从 vlc 摸索折腾到Vitamio sdk,七牛直播 sdk，金山云 sdk 等等，到回归 ffmpeg和 ffplay还有基于 ffplay 的 ijkplayer，经历了一段蛮揪心的视频播放技术探索。回过头来，都有点生疏了细节，不过主干的思想和直播化改造ijkplayer的过程还是值得做个回溯的。


### 音视频base：

1. 音视频入门，可我之前总结的 [《入门启发：音视频的简单理解》](http://www.ruoxu.me//yin-shi-pin-qi-fa)
2. 里程碑1=>熟悉 FFMpeg，可参考 [《FFMPEG详解》](http://chunlin.li/tech/doku.php/tech:multimedia:ffmpeg)
3. 里程碑2=>熟悉 VLC,可参考[《VLC架构及流程分析》](https://jiya.io/archives/vlc_learn_2.html)、[VLC 官网具完整文档](https://wiki.videolan.org/)、vlc模块化思路是其架构核心[《VLC 关键模块结构分析》](https://www.evernote.com/shard/s110/sh/9e84ff55-6ce4-43dc-8952-cb7e78135891/0cdbe451530528b0)
4. 里程碑3=>熟悉 ijkPlayer，到这一步就更了解移动音视频 sdk 了。可参考[《ijkPlayer 系列分析》](http://www.qhung.cn/2016/06/24/ijkplayer-1-init/)
5. sample_cmd1 #:** ffmpeg -i rtmp://live.hkstv.hk.lxdns.com/live/hks  **  了解音视频文件的繁杂参数群。
6. sample_cmd2 #:** ffplay rtmp://live.hkstv.hk.lxdns.com/live/hks   ** 了解音视频解码、同步、渲染的过程。

### 简要回顾：

1. 这里ijkPlayer播放器是一个包括iOS、Android两个平台的播放器。
2. ijkPlayer是Bilibili网址基于FFmpeg的简易ffplay播放器来进行开发的。相比于更有名的VLC播放器，ijkPlayer更精简，代码量更小，更方便改造。
3. ijkPlayer 的 c 层内核是ffplay 。而ffplay又是 ffmpeg 的一个使用示范。ijkplayer 最重要的意义就是在根据平台来硬解码的优化。
4. 三条关键 pipe：ijkPlayer的初始化流程，音频文件读取流程(网络流读取)，音频解码与视频解码和音视频同步渲染流程。这里面就主要有 三层 cache，读取 cache，解码 cache，渲染 cache。参考下图取自[《VLC架构及流程分析》](https://jiya.io/archives/vlc_learn_2.html)。
5. [《入门启发：音视频的简单理解》](http://www.ruoxu.me//yin-shi-pin-qi-fa) E、F 部分。

![pic](https://jiya.io/usr/uploads/2015/01/2942014279.png)

### 主要目的：
移动视频直播的需求，一般比较重视的特性和目的，
1. 规避花屏、规避弱网卡顿。只是视频播放最基本的要求了，特别是直播中视频质量息息相关着创收的钱袋子。
2. 直播的秒开。不要太高估用户的耐心，也不要低估产品追求最极致的用户体验的决心。
3. 直播的低延迟。既然直播，互动性占据很大的有趣重要程度。所以以前以视频稳定播放为第一，现在转向了最低延迟播放为第一追求。


### 分支特性：
特性的实现，也都是为着上方的主要目的来的。
1. **规避花屏、规避弱网卡顿**。这点得综合的处理了。规避『花屏』的出现，其实就是在『录制端、中转端、客户端』三处对视频 I、B、P帧编码解码时做『纠错性处理』，不至于出现找不到关键帧 I 的导致花屏。至于卡顿，移动直播在复杂的网络情况下确实难以避免，只能在技术层面动态调整，在『帧率、码率、分辨率』参数间做出折中方案，另外当网络实在糟糕了，则才去优先音频传送，视频画面冻结的思路。
2. 直播的秒开。思路是，a最快拿到第一帧 I帧，b最快将第一张画面渲染到屏幕。这就需要服务器一侧将 gop 进行缓存，在连接建立时第一时间给到。也需要播放端最快获取、解析、渲染上这张画面。所以客户端也需要在几处逻辑中对缓存进行特别的『优先』操作。
3. 直播低延迟。服务器和客户端同时优化多级缓存中的默认时长。其实具体实现时，还需要考虑在网络平均质量、缓存的稳定效率与紧追效率间做出一些折中方案的选择。
4. **紧追效率**。这点金山云直播 sdk 应该是最早做到的。从它的 sdk 注释，以及侦测它的缓存市场参数，可以知道它是采用『维护最佳缓存』方案，就是在 cache 过多时，最快消耗掉缓存，达到紧追视频发生源时间的目的。

### github地址：

[https://github.com/limbo0312/ijkplayer-liveYY](https://github.com/limbo0312/ijkplayer-liveYY)

------------------

原文 on evernote:[《回顾&总结：ijkPlayer 直播特性分支  》](https://www.evernote.com/l/AG4v4WbtP6ZHpLp7oyZv9SAYA40uRAaIc4Y)

 
