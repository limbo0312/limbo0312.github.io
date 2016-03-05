---
layout: post
title:  多线程复习：GCD 要点回顾
description: "『GCD用我们难以置信的非常简洁的记述方法，实现了极为复杂的多线程编程。』"
tags: [诗词]

comments: false
share: false
---


### A、基础知识点：

* **GCD是异步执行任务的技术之一**。一般讲应用程序中记述的线程管理用的代码在系统级中实现。开发者只需要定义想执行的任务并追加到适当的Dispatch Queue中，GCD就能生成必要的线程并计划执行任务。（也就是说GCD用我们难以置信的非常简洁的记述方法，实现了极为复杂的多线程编程。）
* **执行处理时，存在两种Dispatch Queue,一种是等待现在执行中处理的Serial Dispatch Queue（串行队列），另一种是不等待现在执行中处理的Concurrent Dispatch Queue（并行队列）**。（Note: Concurrent Dispatch Queue 虽然不用等待处理结束，可以并行执行多个处理，但并行执行的处理数量取决于当前系统的状态。即，当前系统状态允许再新派线程数量，这也是表现了GCD使用线程资源的自平衡合理之处）
* 手动生成的Dispatch Queue必须由程序员负责释放，这是因为Dispatch Queue并没有想Blocks那样具有作为Obj-c对象来处理的技术。
* **系统标准提供的Dispatch Queue，一个是 Main Dispatch Queue ，另一个是Global Dispatch Queue。**主线程只有一条，所以Main Dispatch Queue自然就是Serial Dispatch Queue；Global Dispatch Queue是Concurrent Queue，它有四个执行优先级：High Priority，Default Priority，Low Priority， Backgroud Priority。
* **Dispatch Group 使用场景**，『多个子任务并发，最后执行「完结任务」做结束』；追加到Dispatch Queue中的多个处理全部结束后想执行『结束处理』。使用dispatch_group_notify( )进行callback『结束处理』
* **Dispatch_barrier_async使用场景**，『公共数据读写』：需要并发读取数据库read_db_blocks，同时可能有写入write_db_blocks场景。          
* **Dispatch_apply(count,queue,^{ someThinsDoing }) 使用场景**，『重复某限定次数count，在指定queue上，执行count此 block』，注意的是dispatch_apply 在同步在当前queue。
* **Dispatch_semaphore使用场景**，精确粒度的排他性，信号0时才允许通过『修改』。
* **Dispatch_one使用场景**，多核多线程安全的单例实现。
* **Dispatch I/O 和Dispatch Data 使用场景**，大文件的并发读取，分割。

###  B、关键知识点：

* 避免使用旧线程技术，使用GCD：多线程编程问题，如果过多使用多线程，就会消耗大量内存，引起大量的上下文切换，大幅度降低系统的响应性能。
* 使用Serial Dispatch Queue： 最大目的是，为了避免多线程编程问题，多个线程更新相同资源导致数据竞争。



### code snippet example
     
---
1、Serial Dispatch  &  Concurrent Dispatch Queue
     
    dispatch_queue_t mySerialQueue = dispatch_queue_create("com.testSerialQueue", NULL);//串行queue
    dispatch_queue_t myConcurrentQueue = dispatch_queue_create("com.testSerialQueue", DISPATCH_CURRENT_QUEUE_LABEL);//并发queue
     
---

2、Dispatch Group 是开源库[TMCache](https://github.com/tumblr/TMCache)线程安全缓存的使用的技术
	
	[_memoryCache setObject:object forKey:key block:memBlock];
    [_diskCache setObject:object forKey:key block:diskBlock];
    
    if (group) {
        __weak TMCache *weakSelf = self;
        dispatch_group_notify(group, _queue, ^{
            TMCache *strongSelf = weakSelf;
            if (strongSelf)
                block(strongSelf, key, object);
        });
	}

---

3、dispatch_barrier_async 同样被[TMCache](https://github.com/tumblr/TMCache) 充分发挥

	 dispatch_barrier_async(_queue, ^{
        TMMemoryCache *strongSelf = weakSelf;
        if (!strongSelf)
            return;

        [strongSelf removeObjectAndExecuteBlocksForKey:key];

        if (block) {
            __weak TMMemoryCache *weakSelf = strongSelf;
            dispatch_async(strongSelf->_queue, ^{
                TMMemoryCache *strongSelf = weakSelf;
                if (strongSelf)
                    block(strongSelf, key, nil);
            });
        }
    });

参考资料：
	
1. [《Grand Central Dispatch (GCD) Reference》](https://developer.apple.com/library/ios/documentation/Performance/Reference/GCD_libdispatch_Ref/index.html#//apple_ref/doc/uid/TP40008079)
2. [《Objective-C高级编程 iOS与OS X多线程和内存管理》]( http://item.jd.com/11258970.html)
3. [《Concurrency Programming Guide》](https://developer.apple.com/library/prerelease/ios/documentation/General/Conceptual/ConcurrencyProgrammingGuide/GCDWorkQueues/GCDWorkQueues.html)