(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{248:function(v,_,r){"use strict";r.r(_);var t=r(5),a=Object(t.a)({},(function(){var v=this,_=v.$createElement,r=v._self._c||_;return r("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[r("p"),r("div",{staticClass:"table-of-contents"},[r("ul",[r("li",[r("a",{attrs:{href:"#概述"}},[v._v("概述")])]),r("li",[r("a",{attrs:{href:"#原则"}},[v._v("原则")]),r("ul",[r("li",[r("a",{attrs:{href:"#单一职责原则"}},[v._v("单一职责原则")])]),r("li",[r("a",{attrs:{href:"#开放-封闭原则"}},[v._v("开放-封闭原则")])]),r("li",[r("a",{attrs:{href:"#依赖倒置原则"}},[v._v("依赖倒置原则")])]),r("li",[r("a",{attrs:{href:"#里氏替换原则"}},[v._v("里氏替换原则")])]),r("li",[r("a",{attrs:{href:"#接口隔离原则"}},[v._v("接口隔离原则")])]),r("li",[r("a",{attrs:{href:"#迪米特原则（最少知道原则）"}},[v._v("迪米特原则（最少知道原则）")])])])]),r("li",[r("a",{attrs:{href:"#创建型模式"}},[v._v("创建型模式")])]),r("li",[r("a",{attrs:{href:"#结构型模式"}},[v._v("结构型模式")])]),r("li",[r("a",{attrs:{href:"#行为型模式"}},[v._v("行为型模式")])])])]),r("p"),v._v(" "),r("h2",{attrs:{id:"概述"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#概述","aria-hidden":"true"}},[v._v("#")]),v._v(" 概述")]),v._v(" "),r("p",[v._v("设计模式是解决问题的方案，学习现有的设计模式可以做到经验复用。")]),v._v(" "),r("p",[v._v("拥有设计模式词汇，在沟通时就能用更少的词汇来讨论，并且不需要了解底层细节。")]),v._v(" "),r("h2",{attrs:{id:"原则"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#原则","aria-hidden":"true"}},[v._v("#")]),v._v(" 原则")]),v._v(" "),r("h3",{attrs:{id:"单一职责原则"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#单一职责原则","aria-hidden":"true"}},[v._v("#")]),v._v(" 单一职责原则")]),v._v(" "),r("p",[v._v("就一个类而言，应该仅有一个引起它变化的原因。如果存在多于一个动机去改变一个类，那么这个类就具有多于一个的职责，就应该把多余的职责分离出去，再去创建一些类来完成每一个职责。")]),v._v(" "),r("p",[v._v("举个例子：一个人身兼数职，而这些事情相关性不大，甚至有冲突，那他就无法很好的解决这些问题职责，应该分到不同的人身上去做。")]),v._v(" "),r("p",[v._v("单一职责原则是实现高内聚低耦合的最好方法，没有之一。")]),v._v(" "),r("h3",{attrs:{id:"开放-封闭原则"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#开放-封闭原则","aria-hidden":"true"}},[v._v("#")]),v._v(" 开放-封闭原则")]),v._v(" "),r("p",[v._v("一个软件实体如类、模块和函数应该对扩展开放，对修改关闭。目的就是保证程序的扩展性好，易于维护和升级。")]),v._v(" "),r("p",[v._v("开闭原则被称为面向对象设计的基石，实际上，其他原则都可以看作是实现开闭原则的工具和手段。意思就是：软件对扩展应该是开放的，对修改是封闭的，通俗来说就是，开发一个软件时，应该对其进行功能扩展，而在进行这些扩展时，不需要对原来的程序进行修改。")]),v._v(" "),r("p",[v._v("好处是：软件可用性非常灵活，扩展性强。需要新的功能时，可以增加新的模块来满足新需求。另外由于原来的模块没有修改，所以不用担心稳定性的问题。")]),v._v(" "),r("h3",{attrs:{id:"依赖倒置原则"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#依赖倒置原则","aria-hidden":"true"}},[v._v("#")]),v._v(" 依赖倒置原则")]),v._v(" "),r("p",[r("strong",[v._v("定义：")])]),v._v(" "),r("ol",[r("li",[v._v("高层模块不应该依赖低层模块，两者都要改依赖其抽象（模块间的依赖通过抽象产生，实现类不发生直接的依赖关系）")]),v._v(" "),r("li",[v._v("抽象不应该依赖细节（接口或者抽象类不依赖实现类）")]),v._v(" "),r("li",[v._v("细节可以依赖抽象（实现类依赖接口或者抽象类）")])]),v._v(" "),r("p",[v._v("举例：存在一个"),r("code",[v._v("Driver")]),v._v("类，成员为一个"),r("code",[v._v("Car")]),v._v("对象，还有一个"),r("code",[v._v("driver()")]),v._v("方法，"),r("code",[v._v("Car")]),v._v("对象中有两个方法"),r("code",[v._v("start()")]),v._v("与"),r("code",[v._v("stop()")]),v._v("。显然"),r("code",[v._v("Driver")]),v._v("依赖"),r("code",[v._v("Car")]),v._v("，也就是说"),r("code",[v._v("Driver")]),v._v("类调用了"),r("code",[v._v("Car")]),v._v("类中的方法。但是当增加"),r("code",[v._v("Driver")]),v._v("类对于"),r("code",[v._v("Bus")]),v._v("类的支持时（司机有需要开公交车），就必须更改"),r("code",[v._v("Driver")]),v._v("中的代码，就破坏了开放封闭原则。根本原因在于高层的的"),r("code",[v._v("Driver")]),v._v("类与底层的"),r("code",[v._v("Car")]),v._v("类仅仅的耦合在一起的。解决方法之一就是：对"),r("code",[v._v("Car")]),v._v("类和"),r("code",[v._v("Bus")]),v._v("类进行抽象，引入抽象类"),r("code",[v._v("Automoble")]),v._v("。而"),r("code",[v._v("Car")]),v._v("和"),r("code",[v._v("Bus")]),v._v("则是对"),r("code",[v._v("Automobile")]),v._v("的泛化。")]),v._v(" "),r("p",[r("strong",[v._v("面向接口编程：")])]),v._v(" "),r("p",[v._v("接口负责定义 "),r("code",[v._v("public")]),v._v(" 属性和方法，并且声明与其它对象的依赖关系，抽象类负责公共构造部分的实现，实现类准确实现业务逻辑，同时在适当的时候对父类进行细化。")]),v._v(" "),r("h3",{attrs:{id:"里氏替换原则"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#里氏替换原则","aria-hidden":"true"}},[v._v("#")]),v._v(" 里氏替换原则")]),v._v(" "),r("p",[v._v("子类必须能替换掉它们的父类型")]),v._v(" "),r("p",[r("strong",[v._v("继承的优点：")])]),v._v(" "),r("ol",[r("li",[r("p",[v._v("代码共享，提高代码的重用性。")])]),v._v(" "),r("li",[r("p",[v._v("提高代码的可扩展性。")])]),v._v(" "),r("li",[r("p",[v._v("提高产品或者项目的开放性。")])])]),v._v(" "),r("p",[r("strong",[v._v("继承的缺点：")])]),v._v(" "),r("ol",[r("li",[r("p",[v._v("继承是侵入式的，只要继承，就拥有了父类的属性和方法。")])]),v._v(" "),r("li",[r("p",[v._v("降低代码灵活性，子类拥有了父类的属性和方法，多了一些约束。")])]),v._v(" "),r("li",[r("p",[v._v("增强了耦合性。父类的常量、变量或方法改动时，必须还要考虑子类的修改，可能会有大段代码需要重构。")])])]),v._v(" "),r("p",[r("strong",[v._v("里氏替换原则四层含义：")])]),v._v(" "),r("ol",[r("li",[r("p",[v._v("子类必须完全实现父类的方法")]),v._v(" "),r("p",[v._v("在类中调用其他类时务必使用父类或接口，如若不能，则说明类的设计已经违背LSP原则。")]),v._v(" "),r("p",[v._v("如果子类不能完整的实现父类的方法，或者父类的方法在子类中发生畸变，这建议断开父子继承关系，采用依赖、聚集、组合等方式代替继承。")])]),v._v(" "),r("li",[r("p",[v._v("子类可以有自己的特性：即子类出现的地方父类未必可以出现。")])]),v._v(" "),r("li",[r("p",[v._v("覆盖父类的方法时输入参数可以被放大：输入参数类型宽于父类的类型的覆盖范围，例如 "),r("code",[v._v("hashmap -> map")]),v._v("。")])]),v._v(" "),r("li",[r("p",[v._v("覆盖父类的方法时输出参数可以被缩小")])])]),v._v(" "),r("h3",{attrs:{id:"接口隔离原则"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#接口隔离原则","aria-hidden":"true"}},[v._v("#")]),v._v(" 接口隔离原则")]),v._v(" "),r("p",[v._v("用于恰当的划分角色和接口，具有两种含义：")]),v._v(" "),r("ol",[r("li",[v._v("用户不应该依赖它不需要的借口；")]),v._v(" "),r("li",[v._v("类间的依赖关系应该建立在最小的的接口上。")])]),v._v(" "),r("p",[v._v("将这两个定义概括为一句话：建立单一接口，代替庞大臃肿的接口。通俗来说就是：接口尽量细化，同时保证接口中的方法尽量的少。一个接口中包含太多的行为时，会导致它们与客户端的不正常依赖关系，要做的就是分离接口，从而实现解耦。")]),v._v(" "),r("p",[v._v("回到上述的单一职责原则，要求行为分离接口接口细化，感觉有些相同。但实际上，单一职责原则要求类与接口的职责单一，注重的是职责，没有要求接口尽量的少。")]),v._v(" "),r("p",[v._v("在接口隔离原则中，要求尽量使用多个专门的接口。专门的接口也就是提供给多个模块的接口。提供给几个模块就应该有几个接口，而不是建立一个臃肿庞大的接口，所有的模块都可以访问。")]),v._v(" "),r("p",[v._v("但是接口的设计是有限度的。接口的设计粒度越小系统越灵活，这是事实，但是接口太多这也就使得结构复杂，维护难度大。因此实际中，怎样把握就靠开发的经验和常识了。")]),v._v(" "),r("h3",{attrs:{id:"迪米特原则（最少知道原则）"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#迪米特原则（最少知道原则）","aria-hidden":"true"}},[v._v("#")]),v._v(" 迪米特原则（最少知道原则）")]),v._v(" "),r("p",[v._v("一个对象应该对其他对象有最少的了解。通俗来说就是，一个类对自己需要耦合或者调用的类知道的最少，你类内部怎么复杂，我不管，那是你的事，我只知道你有那么多公用的方法，我能调用。")]),v._v(" "),r("p",[v._v("迪米特原则不希望类与类之间建立直接的接触。如果真的需要有联系，那么就通过它们的友元类来传达。举例来说：你需要买房子了，现在存在三座合适的楼盘A，B，C，但是你不必直接去楼盘买楼，而是在售楼处去了解情况。这样就减少了你（购房者）与楼盘两个类之间耦合。")]),v._v(" "),r("p",[v._v("但是应用迪米特原则很可能会造成一个后果：系统会存在大量的中介类，这些类（如上面的售楼处类）之所以存在是为了传递类之间的相互调用关系，这就一定会程度上增加了系统的复杂度。")]),v._v(" "),r("p",[v._v("迪米特原则核心观念就是：类间解耦，弱耦合。")]),v._v(" "),r("h2",{attrs:{id:"创建型模式"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#创建型模式","aria-hidden":"true"}},[v._v("#")]),v._v(" 创建型模式")]),v._v(" "),r("ul",[r("li",[r("a",{attrs:{href:"https://www.rxwcv.cn/algorithm/design_pattem/creative.html#%E5%8D%95%E4%BE%8B%E6%A8%A1%E5%BC%8F",target:"_blank",rel:"noopener noreferrer"}},[v._v("单例模式"),r("OutboundLink")],1)]),v._v(" "),r("li",[r("a",{attrs:{href:"https://www.rxwcv.cn/algorithm/design_pattem/creative.html#%E7%AE%80%E5%8D%95%E5%B7%A5%E5%8E%82%E6%A8%A1%E5%BC%8F",target:"_blank",rel:"noopener noreferrer"}},[v._v("简单工厂模式"),r("OutboundLink")],1)]),v._v(" "),r("li",[r("a",{attrs:{href:"https://www.rxwcv.cn/algorithm/design_pattem/creative.html#%E5%B7%A5%E5%8E%82%E6%96%B9%E6%B3%95",target:"_blank",rel:"noopener noreferrer"}},[v._v("工厂方法"),r("OutboundLink")],1)]),v._v(" "),r("li",[r("a",{attrs:{href:"https://www.rxwcv.cn/algorithm/design_pattem/creative.html#%E6%8A%BD%E8%B1%A1%E5%B7%A5%E5%8E%82%E6%A8%A1%E5%BC%8F",target:"_blank",rel:"noopener noreferrer"}},[v._v("抽象工厂模式"),r("OutboundLink")],1)])]),v._v(" "),r("h2",{attrs:{id:"结构型模式"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#结构型模式","aria-hidden":"true"}},[v._v("#")]),v._v(" 结构型模式")]),v._v(" "),r("h2",{attrs:{id:"行为型模式"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#行为型模式","aria-hidden":"true"}},[v._v("#")]),v._v(" 行为型模式")])])}),[],!1,null,null,null);_.default=a.exports}}]);