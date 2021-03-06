---
layout: post
title:  Next_Web_Browser设计构想
description: "Next_Web_Browser设计构想"
tags: [技术总结]

comments: false
share: false
---


### Next_Web_Browser 设计构想

最近想到，很多传统软件还可以创新优化的地方。从上回想到Web_In_One_IDE，继而从那里延伸开，想到这个Next_Web_Browser。

浏览器，应该是普通用户能够遇到的工作最辛苦，复杂度最高的应用了吧。高频的网络访问，高速地解析渲染需求。这些都让浏览器的耗电比例是最高的应用。

区别于当前浏览器，Next_Web_Browser 显而易见的还可以有几点值得更多创新。

**WebApp智能缓存**

1. **遗弃无益老习惯**：降低无益的多次刷新，降低重复性的渲染。甚至对于一部分常用的WebApp进行自动“本地化”，或提供可选的缓存。
2. **轻量化方案**：chrome的当前提供的某些离线应用，就是这个思路，不过这些离线应用部分用了chrome的API。那么就有两种可能，或者逐步标准化这类API，或者采取轻量化无关联方案。


**编译js,以二进制传输**

1. V8的设计和落实，让Js焕发无与伦比的魅力。更进一步的可能，则是绝对隐藏掉js代码，转而代为编译好的二进制。这样的好处不只是迅捷，还有Js的生态氛围将更受待见。
2. 不过编译后的事件绑定，估计需要一个统一的过程。统一这个意见可就不只是技术层面的思考了。


**HTML渲染分成两部分，生成原生UI ,部分旧渲染**

1. 从2011年html5风靡一时，到facebook落败html5的App。可以实际地说原生UI和渲染UI的差距还是显而易见的。靠近原生UI也更靠近用户一些。
2. 这个实现的可能或许不是通过真的生成原生UI，或许是通过升级浏览器的渲染引擎来实现。


**更可视化地展示css和html的链接**

1. 格式与内容的分离，可以说是浏览器的一个里程碑。如果能够更好地展示css和html的开发效率和链接作用方式，那么将会是下一个里程碑。


add ref 20150319	<http://www.36kr.com/clipped/10140>   
	
{% raw %}	
	
	
	Google 引入新技术加快 Chrome 的 JavaScript 加载速度

	在 Chrome 41 中，浏览器将在 JavaScript 下载过程中几乎同步开始解析它。
	据 Google 描述，这将提升 10% 的 JavaScript 加载速度。
	此外，Chrome 42 中还将改进代码缓存技术，以加速浏览常用网站。
{% endraw %}
