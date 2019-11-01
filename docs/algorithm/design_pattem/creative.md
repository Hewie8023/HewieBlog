---
title: 创建型模式
---

[[toc]]

## 单例模式
单例模式可以保证系统中只有一个类只有一个实例,并提供一个访问它的全局访问点,该实例被所有程序模块共享。

单例模式的要点有三个：
1. 单例类只能有一个实例 
2. 它必须自行创建这个实例 
3. 它必须自行向整个系统提供提供这个实例。

从具体实现角度来说,就是以下三点: 
1. 单例模式的类只提供私有的构造函数 
2. 类定义中含有一个该类的静态私有对象 
3. 该类提供了一个静态的公有的函数用于创建或获取它本身的静态私有对象

**单例模式的优点:**
1. 在内存中只有一个对象,节省内存空间
2. 避免频繁的创建销毁对象,可以提高性能
3. 避免对共享资源的多重占用
4. 可以全局访问

**单例模式的适用场景:**
1. 需要频繁实例化然后销毁的对象
2. 创建对象耗时过多或者耗资源过多,但又经常用到的对象
3. 有状态的工具类对象
4. 频繁访问数据库或文件的对象
5. 以及其他要求只有一个对象的场景

### 饿汉式单例
饿汉式单例在单例类被加载时就实例化一个对象交给自己的引用
```cpp
class Singleon
{
private:
	Singleon()
	{
		cout << "Singleon()" << endl;
	}
	static Singleon* instance;
public:
	static Singleon* GetSingleon()
	{
		return instance;
	}
	static Singleon* Destroy()
	{
		delete instance;
		instance = NULL;
	}
};
```

### 懒汉式单例
懒汉式单例可能会有线程安全,异常安全问题
```cpp
class CSingleton
{
private:
    CSingleton() //构造函数是私有的
    {
    }
public:
    static CSingleton * GetInstance()
    {
        static CSingleton *m_pInstance;
        if(m_pInstance == NULL) //判断是否第一次调用
            m_pInstance = new CSingleton();
        return m_pInstance;
    }
};
```
考虑到线程安全和异常安全,实现代码如下:
```cpp
std::mutex mt;
class Singleton  
{  
private:  
    static Singleton* m_instance;  
    Singleton(){}  
public:  
    static Singleton* getInstance();  
};  
  
Singleton* Singleton::getInstance()  
{  
    if(NULL == m_instance)  
    {  
        mt.lock();
        if(NULL == m_instance)  
        {  
            m_instance = new Singleton;  
        }  
        mt.unlock();
    }  
    return m_instance;  
}
```

## 简单工厂模式
**Intent**

在创建一个对象时不向客户暴露内部的细节，并提供一个创建对象的通用接口。

**Class Diagram**

简单工厂模式的实例化操作单独放在一个类中，这个类就是简单工厂类，让简单工厂类来决定应该用哪个具体子类来实例化。

这个做能够把客户类和具体子类的实现解耦，客户类不再需要知道有哪些子类以及应当实例化哪个子类。客户类往往有多个，如果不使用简单工厂，那么所有客户类都要知道所有子类的细节。而且一旦子类发生改变，例如增加子类，那么所有的客户类都要进行改变。

比如一个要实现一个计算器功能，可使用如下方法。
```cpp
//Operation运算类
class Operation
{
private:
    double numA = 0;
    double numB = 0;
public:
    double getNumA()
    {   
        return numA;
    }
    void setNumA(double numA)
    {
        this.numA = numA;
    }
    double getNumB()
    {   
        return NumB;
    }
    void setNumB(double NumB)
    {
        this.NumB = NumB;
    }
    virtual double getResult()
    {
        double result = 0;
        return result;
    }
};
```
```cpp
//加减乘除类
class OperationAdd:public Operation
{
public:
    double getResult()
    {    
        double result = 0;
        result = numA + numB;
        return result;
    }
}

class OperationSub:public Operation
{
public:
    double getResult()
    {    
        double result = 0;
        result = numA - numB;
        return result;
    }
}

class OperationMul:public Operation
{
public:
    double getResult()
    {    
        double result = 0;
        result = numA * numB;
        return result;
    }
}

class OperationDiv:public Operation
{
public:
    double getResult()
    {    
        double result = 0;
        if(numB == 0)
        {
            break;
        }
        result = numA / numB;
        return result;
    }
}
```

```cpp
//简单工厂类
class OperationFactory
{
public:
    static Operation createOpration(string operation)
    {
        Operation oper = NULL;
        switch(operation)
        {
            case "+":
                oper = new OperationAdd();
                break;
            case "-":
                oper = new OperationSub();
                break;
            case "*":
                oper = new OperationMul();
                break;
            case "/":
                oper = new OperationDiv();
                break;
        }
        return oper;
    }
};
```
```cpp
//客户端代码
Operation oper;
oper = OperationFactory::createOpration("+");
oper.numA = 1;
oper.NumB = 2;
double result = oper.getResult();
```

## 工厂方法
**Intent**

定义了一个创建对象的接口，但由子类决定要实例化哪个类。工厂方法把实例化操作推迟到子类。

**Class Diagram**

在简单工厂中，创建对象的是另一个类，而在工厂方法中，是由子类来创建对象。

简单工厂模式的最大优点在于工厂类中包含了必要的逻辑判断，根据客户端的选择条件动态实例化相关的类，对于客户端来说，去除了与具体产品的依赖。如上面的计算器，让客户端不用管该用哪个类的实例，只需把“+”给工厂，工厂自动就给出了相应的实例，客户端只要去做运算就可以了，不同的实例会实现不同的运算。但是，如果要加一个‘求M的N次方’的功能，我们一定需要给运算工厂类的方法里加‘case’的分支条件，这就需要修改原有的类。违背了**开放-封闭原则**。

```cpp
//工厂接口
class IFactory
{
public:
    virtual Operation createOperation();
};
```

```cpp
class AddFactory : public IFactory
{
public:
    Operation createOperation()
    {
        return new OperationAdd();
    }
};
//其余运算工厂类似...
```
```cpp
//客户端
IFactory *operFactory = new AddFactory();
Operation *oper = operFactory->createOperation();
oper.numA = 1;
oper.numB = 2;
double result = oper->getResult();
```
工厂方法模式实现时，客户端需要决定实例化哪一个工厂来实现运算类，选择判断的问题还是存在的，也就是说，工厂方法把简单工厂的内部逻辑判断移到了客户端代码来进行。若要加功能，简单公共模式是要修改工厂类，而工厂模式是修改客户端。


## 抽象工厂模式
**Intent**

提供一个创建一系列相关或相互依赖对象的接口，而无需指定它们具体的类。

**Class Diagram**

工厂方法模式 要求产品必须为同一类型，也就是说，BBA 只能生产汽车，要生产其他产品（例如：自行车）是不行的，这显然限制了产品的扩展。为了解决这个问题，抽象工厂模式出现了 - 将产品归类分组，然后将好几组产品构成一族。每个工厂负责生产一族产品，而工厂中的每个方法负责生产一种类型的产品。

这样，客户端只需要创建具体工厂的实例，然后调用工厂对象的工厂方法就可以得到所需要的产品对象。

需要有两个产品 - 汽车和自行车：
```cpp
//创建抽象产品
// 汽车接口
class ICar
{
public:
    virtual string Name() = 0;  // 汽车名称
};

// 自行车接口
class IBike
{
public:
    virtual string Name() = 0;  // 自行车名称
};
```
```cpp
//创建具体产品
/********** 汽车 **********/
// 奔驰
class BenzCar : public ICar
{
public:
    string Name() {
        return "Benz Car";
    }
};

// 宝马
class BmwCar : public ICar
{
public:
    string Name() {
        return "Bmw Car";
    }
};

// 奥迪
class AudiCar : public ICar
{
public:
    std::string Name() {
        return "Audi Car";
    }
};

/********** 自行车 **********/
// 奔驰
class BenzBike : public IBike
{
public:
    string Name() {
        return "Benz Bike";
    }
};

// 宝马
class BmwBike : public IBike
{
public:
    string Name() {
        return "Bmw Bike";
    }
};

// 奥迪
class AudiBike : public IBike
{
public:
    string Name() {
        return "Audi Bike";
    }
};
```
```cpp
//创建抽象工厂
class AFactory
{
public:
    enum FACTORY_TYPE {
        BENZ_FACTORY,  // 奔驰工厂
        BMW_FACTORY,  // 宝马工厂
        AUDI_FACTORY  // 奥迪工厂
    };

    virtual ICar* CreateCar() = 0;  // 生产汽车
    virtual IBike* CreateBike() = 0;    // 生产自行车
    static AFactory* CreateFactory(FACTORY_TYPE factory);  // 创建工厂
};
```
```cpp
// 创建工厂
AFactory* AFactory::CreateFactory(FACTORY_TYPE factory)
{
    AFactory *pFactory = NULL;
    switch (factory) {
    case FACTORY_TYPE::BENZ_FACTORY:  // 奔驰工厂
        pFactory = new BenzFactory();
        break;
    case FACTORY_TYPE::BMW_FACTORY:  // 宝马工厂
        pFactory = new BmwFactory();
        break;
    case FACTORY_TYPE::AUDI_FACTORY:  // 奥迪工厂
        pFactory = new AudiFactory();
        break;
    default:
        break;
    }
    return pFactory;
}
```
```cpp
//创建具体工厂
// 奔驰工厂
class BenzFactory : public AFactory
{
public:
    ICar* CreateCar() {
        return new BenzCar();
    }

    IBike* CreateBike() {
        return new BenzBike();
    }
};

// 宝马工厂
class BmwFactory : public AFactory
{
public:
    ICar* CreateCar() {
        return new BmwCar();
    }

    IBike* CreateBike() {
        return new BmwBike();
    }
};

// 奥迪工厂
class AudiFactory : public AFactory
{
public:
    ICar* CreateCar() {
        return new AudiCar();
    }

    IBike* CreateBike() {
        return new AudiBike();
    }
};
```
```cpp
//客户端
// 奔驰
AFactory *pFactory = AFactory::CreateFactory(AFactory::FACTORY_TYPE::BENZ_FACTORY);
ICar *pCar = pFactory->CreateCar();
IBike *pBike = pFactory->CreateBike();

cout << "Benz factory - Car: " << pCar->Name() << endl;
cout << "Benz factory - Bike: " << pBike->Name() << endl;
```