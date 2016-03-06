---
layout: post
title:  两种‘Obj-c Runtime’级别操作技术
description: ""
tags: [技术总结]

comments: false
share: false
---

 
###finish两种‘Obj-c Runtime’级别操作技术


####associated object：汉化过来，应该叫“对象关联”。

* 原理：
	* associated object指的是一个类的变量列表、方法列表中的绑定关系。通过知道类与变量列表绑定在一起的实现技术（associated object），手动地更改一个类的既定变量列表。

* 操作：
   * objc_setAssociatedObject
   * objc_getAssociatedObject
   * objc_removeAssociatedObjects
   
{% highlight ruby %}
NSObject+AssociatedObject.h

@interface NSObject (AssociatedObject)

@property (nonatomic, strong) id associatedObject;

@end

NSObject+AssociatedObject.m

@implementation NSObject (AssociatedObject)

@dynamic associatedObject;

- (void)setAssociatedObject:(id)object  {

    objc_setAssociatedObject(self, @selector(associatedObject), object, OBJC_ASSOCIATION_RETAIN_NONATOMIC);

    }
     
- (id)associatedObject {

    return objc_getAssociatedObject(self, @selector(associatedObject));

    }

{% endhighlight %}

* 用途：通过associated object在分类中给已存在的类中添加自定义属性。

####method swizzling：汉化过来，应该叫“方法桥接”。 

* **原理**：
	* Method swizzling指的是改变一个已存在的选择器sel对应的实现imp的过程，它依赖于Objectvie-C实现中方法在调用时能够在“运行时runtime”进行改变——通过改变类的调度表（dispatch table）中选择器sel到最终函数imp间的映射dispatch table关系。
	* Method Swizzling就是改变类的调度表dispatch map让消息解析时从一个选择器sel对应到其他的实现imp，同时将原始的方法实现混淆到一个新的选择器。
	
* **操作**：
	* **获取method的sel**：@selector(viewWillAppear:);
	* **通过sel获取method**：class_getInstanceMethod(class, originalSelector);
	* **为class（实例）添加method**：
	
	{% highlight ruby %}class_addMethod(class,originalSelector,method_getImplementation(swizzledMethod),method_getTypeEncoding(swizzledMethod));
	{% endhighlight %}
	
	* **为class更换method**：
	
	{% highlight ruby %}class_replaceMethod(class,swizzledSelector,method_getImplementation(originalMethod),method_getTypeEncoding(originalMethod));
	{% endhighlight %}

	* **更换class的imp**：
	
	{% highlight ruby %}
	method_exchangeImplementations(originalMethod, swizzledMethod);
	{% endhighlight %}

	
	
	