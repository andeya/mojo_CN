# 值生命周期简介
迄今为止，我们已经解释了Mojo如何通过其所有权模型，使您能够构建高性能、内存安全的代码，而无需手动管理内存。然而，Mojo是为系统编程而设计的，这通常需要对自定义数据类型进行手动内存管理。因此，Mojo允许您根据需要进行内存管理。需要明确的是，Mojo没有引用计数器和垃圾回收器。

Mojo也没有内置的特权数据类型。标准库中的所有数据类型（如`Bool`、`Int`和`String`）都是以结构体的形式实现的。您实际上可以使用MLIR方言提供的低级原语编写自己的替代类型。

Mojo语言的优点在于它为系统编程提供了这些低级工具，但同时还在一个框架中帮助您构建从高级程序中轻松使用和安全的事物。也就是说，您可以深入了解并编写所有想要的“不安全”代码，但只要按照Mojo的值语义进行操作，实例化您的类型/对象的程序员根本不需要考虑内存管理，行为将是安全和可预测的，这要归功于值所有权。

总结一下，每个值类型的内存和资源管理是类型作者的责任，需要实现特定的生命周期方法，如构造函数、复制构造函数、移动构造函数和析构函数等。Mojo默认不创建任何构造函数，但对于未定义自己构造函数的类型，它会添加一个平凡的空操作析构函数。

在接下来的页面中，我们将详细解释如何根据值语义定义这些生命周期方法，以使您的类型能够与值所有权良好地配合使用。

## 生命周期和生存期

首先，让我们澄清一些术语：

- 值的“生命周期”由结构体中的各种dunder方法定义。每个生命周期事件由不同的方法处理，例如构造函数（`__init__()`）、析构函数（`__del__()`）、复制构造函数（`__copyinit__()`）和移动构造函数（`__moveinit__()`）。具有相同类型声明的所有值具有相同的生命周期。

- 值的“生存期”由程序执行期间每个值被视为有效的时间段定义。一个值的生命开始于初始化并在销毁时结束，通常（但不总是）从`__init__()`到`__del__()`。没有两个值具有完全相同的生存期，因为每个值在不同的时间点创建和销毁（即使差异是微不可察的）。

在Mojo中，一个值的生命从变量初始化开始，并持续到最后使用该值的时候，此时Mojo将销毁它。Mojo使用“尽快销毁”（ASAP）的销毁策略，在每个子表达式之后运行，尽快销毁不再使用的每个值/对象。

可以想象，如果一个值在程序的生命周期内多次在函数之间共享，跟踪其生存期可能会很困难。然而，Mojo通过其值语义和值所有权（这两个是后续章节的先决条件）使这一切变得可预测。生存期管理的最后一部分是值的生命周期：每个值（在结构体中定义）都需要实现关键的生命周期方法，定义值如何创建和销毁。