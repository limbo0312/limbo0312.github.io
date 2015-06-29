---
layout: post
title: 攻防简要策略，和精密解剖App
description:  
tags: [技术]

---


####A、精密解剖App

1. linux机器理解，破解iOS和cydia，openSSL安装
2. tweak技巧，MobileSubstrate运行时补丁,补丁dylib实现
3. springboard的view层级理解，iOS的springboard和App的viewHierarchy。
4. iOS的私有framework的大致实现，heap和stack的追踪。

if done above so.....

理解以上几点，就可以轻松解剖任何App。比如流行而牛逼的『微信』、『支付宝』、系统『app store』



####B、攻防简要策略

1. 遵循常规加密策略。对称加密(DES、3DES)和非对称加密(RSA、hppts)和各类散列算法(md5、sh1、sh2)。
2. 工程中"类名、方法名"尽量避免暴露关键信息。
3. 减少数据单例的实现，以免暴露关键数据信息。
4. **核心：**明白逆向工程能够达到的边缘，依次为安全参考。

----

####C、理论上的危险防范

1. tweak重写基础的cocoa实现，记录下完整callLog，直接深度拷贝出一个完整的App的源文件实现。

----

ps：C_1 只是个恶劣的bugX实现思路，虽有极其恐怖的特性。其成本可就不止几百万美元的事了，呵呵


ps： 附图为精密解剖可以达到的效果
微信App heap-explore
![111](http://b-egs-studio-images.oss-cn-shenzhen.aliyuncs.com/ruoxu-blog%2Fjm-weixin-heap-digg.jpg)

微信App viewHierarchy
![222](http://b-egs-studio-images.oss-cn-shenzhen.aliyuncs.com/ruoxu-blog%2Fjm-weixin-view-layer.jpeg)

支付宝App heap-explore
![333](http://b-egs-studio-images.oss-cn-shenzhen.aliyuncs.com/ruoxu-blog%2Fjm-zhifubao-heap-digg.jpg)

支付宝App viewHierarchy
![444](http://b-egs-studio-images.oss-cn-shenzhen.aliyuncs.com/ruoxu-blog%2Fjm-zhifubao-view-layer.jpeg)

App Store
![555](http://b-egs-studio-images.oss-cn-shenzhen.aliyuncs.com/ruoxu-blog%2Fjm-appStore-view-layer.jpeg)