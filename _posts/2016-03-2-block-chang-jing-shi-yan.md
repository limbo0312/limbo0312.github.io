---
layout: post
title:  block场景试验：匿名函数block与retain cycle
description: "上周和两位同事讨论到block使用场景中哪种会发生retain cycle。一位是认为场景A会发生retain cycle，一位是认为场景A可能会发生retain cycle，最好采用全部weakSelf方式来编码，确保无遗漏不使之产生retai cycle。(场景A见下图)"
tags: [诗词]

comments: false
share: false
---

上周和两位同事讨论到block使用场景中哪种会发生retain cycle。一位是认为场景A会发生retain cycle，一位是认为场景A可能会发生retain cycle，最好采用全部weakSelf方式来编码，确保无遗漏不使之产生retai cycle。(场景A见下图)

![](http://b-egs-studio-images.oss-cn-shenzhen.aliyuncs.com/ruoxu-blog%2FblockBlog%2F%E5%9B%BE1%E5%9C%BA%E6%99%AFA%EF%BC%8C%E9%9D%99%E6%80%81%E6%96%B9%E6%B3%95%E4%BC%A0%E5%8F%82block.jpg)



### A、基础知识点：

 1. Blocks are a C language extension for creating anonymous functions.
 
 2. The initial allocation is done on the stack, but the runtime provides a **Block_copy** function which, given a block pointer, either copies the underlying block object to the heap, setting its reference count to 1 and returning the new block pointer, or (if the block object is already on the heap) increases its reference count by 1. The paired function **isBlock_release**, which decreases the reference count by 1 and destroys the object if the count reaches zero and is on the heap.
3. It does not provide a cycle collector; users must explicitly manage the lifetime of their objects, breaking cycles manually or with weak or unsafe references. 『MRC和ARC中都没有引用环回收器，所以ARC中，得更留意retain cycle发生场景』
4. 根据Block在内存中的位置分为三种类型NSGlobalBlock，NSStackBlock, NSMallocBlock。
	* a、NSGlobalBlock：类似函数，位于text段（《obj-c高级编程》一书又说位于data段，但实质上两种都没关系）；
	* b、NSStackBlock：位于栈内存，函数返回后Block将无效；
	* c、NSMallocBlock：位于堆内存(在heap内存区域，这是block和obj发生retain cycle的关键点）。以内存管理的理解方式，则相应说明三点，
		* a1、『NSGlobalBlock：retain、copy、release操作都无效；』;  
		* b1、『NSStackBlock：retain、release操作无效。必须注意的是，NSStackBlock在函数返回后，Block内存将被回收。即使retain也没用。需要警惕的是，[[mutableAarry addObject:stackBlock]，在函数出栈后，从mutableAarry中取到的stackBlock已经被回收，变成了野指针。正确的做法是先将stackBlock copy到堆上，成为NSMallocBlock类型对象再操作』；
		* c3、『NSMallocBlock：支持retain、release，也是本文重点关注的block类型』)。
Block对不同类型的变量(基本类型)的(截获)存取：a、局部自动变量，在Block中只读(当做常量使用)。b、static变量、全局变量。Block中可以对他进行读写。因为全局变量或静态变量在内存中的地址是固定的。c、Block变量，被__block修饰的变量称作Block变量，基本类型的Block变量等效于全局变量、或静态变量。
5. BlockA被另一个BlockB使用时，另一个BlockB被copy到堆上时，被使用的BlockA也会被copy。但作为参数的BlockA是不会发生copy的。**（作为参数传递的blk是不会被copy，也就是不会被强引用）**
6. MRC中__block是不会引起retain；但在ARC中__block则会引起retain。ARC中应该使用__weak或__unsafe_unretained弱引用。
7. 一个常见错误使用是，开发者担心retain cycle错误的使用__weak。比如将Block作为参数传给dispatch_async时，系统会将Block拷贝到堆上（GCD把block当参数时，block会被copy到heap上成MalloBlock），如果Block中使用了实例变量，还将retain self，因为dispatch_async并不知道self会在什么时候被释放，为了确保系统调度执行Block中的任务时self没有被意外释放掉，dispatch_async必须自己retain一次self，任务完成后再release self。但这里(瞎担心retain cycle发生)故使用__weak，使dispatch_async没有增加self的引用计数，这使得在系统在调度执行Block之前，self可能已被销毁，但系统并不知道这个情况，导致Block被调度执行时self已经被释放导致crash。 * {试验结果：__weak 修饰的self在异步block回来后已经被释放了，所以确实是无法执行block中self相关操作。但是此时self的地址已经被设置nil，不会造成crash。造成crash的情况，有可能是MRC下用__block修饰，或者其它复杂情况下的ARC。试验中，一个特别现象是，如果blockA最后是self的强引用，如果此时GCD切换入一个新的blockB，那将直接接触对self的强引用，那么GCD_blockB回来后，后面如果有self相关调用将是无效的。}
8. 可以用dealloc方法来管理一些资源，但不能用来释放实例变量，也不能在dealloc方法里面去掉［super dealloc］方法，在ARC下父类的dealloc同样由编译器来自动完成。(**debug方式**：可以使用dealloc来检测obj是否在预期中被释放，用chisel在极端情况下检测确切内存地址中是否还存在obj)


###  B、关键知识点：

1. 核心点是应指明，对象间是哪种引用类型。是强引用，发生了retain count 加1；还是弱引用，未对retain count做操作。
2. 两个obj间的retain cycle很容易看出来，(强引用符号===>，弱引用符号- - - >)。就像： ===>objA(self)===>blkB===>objA(self)
三个或多个obj(block)间的retain cycle最容易出现遗漏，三个就像： ===>objA(self)===>objB===>blockC===>objA(self)；五个就像：===>objA(self)===>objB===>blockC===>objD===>blockE===>objA(self)；
3. MRC中__block是不会引起retain；但在ARC中__block则会引起retain。ARC中应该使用__weak或__unsafe_unretained弱引用。
4. block的类型，取决于是否截获(快照)自动变量：globalBlock不依赖于执行时的的状态，所以整个程序中只需一个实例。arc情况下一般都是stackBlock类型便于执行完立即回收，如果有特别需要，可以将stackBlock拷贝到heap上转成mallocBlock再进行使用。(《obj-c高级编程》一书在page 111~112，)
5. block传递时相应产生的类型：
	* a、作为参数的Block是不会发生copy的。
	* b、将block作为函数返回值时，编译器会自动生成复制到堆上的代码(即转成mallocBlock)。(这里可以看出设计原则为：Block在未来需要使用时将放入heap，只需用一次的放到stack中)
mallocBlock常见情况和需要转成mallocBlock情况：stackBlock时，以下方法或函数不用手动复制(即转成mallocBlock)，a、cocoa框架方法中函数usingBlock的；b、GCD 的api ，将block做参数(mallocBlock)。需要手动复制成mallocBlock场景：『相反的，在NSArray类的initWithObjects实例方法上传递Block时需要手动复制』《objc-c高级编程》

**psNote:**
以上2、3点中红色的===>，就是引起retain cycle的强引用，应该改成 - - - > 弱引用，使用__weak符号修饰。
强引用符号===>，弱引用符号- - - >，无引用 ~ ~ ~>
     


### 场景试验

以下是几种场景的检验。

---

####   试验一：场景A，静态方法传参block （去除图中@weak标识符）
![](http://b-egs-studio-images.oss-cn-shenzhen.aliyuncs.com/ruoxu-blog%2FblockBlog%2F%E5%9B%BE1%E5%9C%BA%E6%99%AFA%EF%BC%8C%E9%9D%99%E6%80%81%E6%96%B9%E6%B3%95%E4%BC%A0%E5%8F%82block.jpg)


**引用流程是：**

===>self~ ~ ~>static_method~ ~ ~>blk_callback(stackBlock)[http返回后，以blk_callback(mallocBlock)回调]<==>blk_callback(mallocBlock)===>self

试验一两个关键点，self不会在第一步强引用blk_callback(stackBlock)；潜在的闭环不成立。
回调的block_callbank(stackBlock转成mallocBlock) ，会对self强引用一次，等待block执行完后方式对self的强引用。

这里合适的处理策略，应该让block_callback 强引用self，避免block_callback回调时，self成了野指针或nil值。

---

####   试验二：场景B，典型的三元retain cycle （去除图中__weak标识符）

![](http://b-egs-studio-images.oss-cn-shenzhen.aliyuncs.com/ruoxu-blog%2FblockBlog%2F%E5%9B%BE2%E5%9C%BA%E6%99%AFB%EF%BC%8C%E4%B8%89%E5%85%83retain%20cycle.jpg)

**引用流程是：**

===>self===>vc_obj===>vc_tapBlock===>self

这是典型的三元引用环场景。应该使用 __weak修饰符后的   weakSelf，将vc_tapBlock对self的引用设置为弱引用。

---

####  试验三：场景C，还是典型的三元retain cycle  （去除图中__weak标识符）
![](http://b-egs-studio-images.oss-cn-shenzhen.aliyuncs.com/ruoxu-blog%2FblockBlog%2F%E5%9B%BE3%EF%BC%8C%E5%9C%BA%E6%99%AFC-%E4%BA%8C%E5%85%83%E5%BC%95%E7%94%A8%E7%8E%AF.jpg)


**引用流程：**

===>self===>_mcs_notiObj===>bulk_notiCallback===> self

同上，试验二。

---

####  试验四：场景D，GCD函数传参block

![](http://b-egs-studio-images.oss-cn-shenzhen.aliyuncs.com/ruoxu-blog%2FblockBlog%2F%E5%9B%BE4%EF%BC%8CGCD%E4%BC%A0%E5%8F%82blockPara.jpg)


**引用流程：**

===>self~~~>GCD_blkPara(mallocBlock)===>self

self不存在持有dispatch_async的block参数的可能，因此需要block_gcd_para强引用self，当block回调时，保证self还未释放。这个用法正确，相反若使用weakSelf则是不对的。


---

####  试验五：cocoa中基础obj使用usingBlock
![](http://b-egs-studio-images.oss-cn-shenzhen.aliyuncs.com/ruoxu-blog%2FblockBlog%2F%E5%9B%BE5%EF%BC%8CusingBlock.jpg)

**引用流程：**

===>self===>arrObj===>block_usingBlock===>self

由于self对arrObj的强引用是初始引用，无法weak操作，所以只能(必须)在最后一步将block_usingBlock对self的强引用设置成weakSelf；


---

####  试验六：业务多重嵌套，block和GCD深度强引用

...

从试验一到试验五，我们其实可以归纳出引用环retain cycle的关键点，明确第一步是哪种引用(strong还是weak)，如果是weak那么肯定不存在retain cycle放心使用；如果是strong引用，那么最后一步是否使用到self，如果使用必须采用weakSelf方式；

所以，再复杂的实际嵌套业务也不会出现模糊无法判断的情况。

###  简要总结

**关键是检查第一步：**确认self是否强引用了block，最容易出现的情况是持有实例obj中自定义block；
检查最后一步block是否强引用self：如果第一步是强引用;




**Result Note :**

1. 场景A，是不会产生retain cycle；场景B是典型的三角引用环；
2. 全部weakSelf的方式，看似多一步确保不发生retain cycle，但是违背了Cocoa(MRC、ARC)对block内存管理的初衷，严重的一方面会产生致命crash(如上A-8)，或者无法执行相应任务块。不理性地一方面就像担心程序处处bug，所以处处都@try exception，增加了性能负担;
3. 《obj-c高级编程》并没有推荐将stackBlock转成mallocBlock再使用。而是在特殊需求下，可以在stackBlock特点不能满足时，将其转成mallocBlock再使用，说明了转化的方式和技巧。
4. 《obj-c高级编程》书重点点名，两种Block是不应转成mallocBlock的(本身就是，而且不应该去管理到这区域的block)。如上B-7点的，这两种为a、cocoa框架方法中函数usingBlock的；b、GCD 的api ，将block做参数(mallocBlock)。

**参考资料 :**

1. http://clang.llvm.org/docs/AutomaticReferenceCounting.html
2.《objective-c高级编程 iOS和Mac OX多线程和内存管理》
3. http://tanqisen.github.io/blog/2013/04/19/gcd-block-cycle-retain/

**工具使用：**

* 对象地址检测工具：LLDB 的facebook增强版 chisel，Chisel is a collection of LLDB commands to assist in the debugging of iOS apps.https://github.com/facebook/chisel

**概念：**

**retain cycle: **retain cycle，即『强引用环』，表现为两个或多个obj(blk)相互强引用导致相互无法释放，最后成了内存中的孤岛，是内存泄露的一种典型情况。实质的逻辑，就类似于线程死锁，数据互持。