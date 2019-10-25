---
title: 运算符重载
---

[[toc]]
## 运算符重载
重载的运算符是带有特殊名称的函数，函数名是由关键字 `operator` 和其后要重载的运算符符号构成的。与其他函数一样，重载运算符有一个返回类型和一个参数列表。
```cpp
Box operator+(const Box&);
```
声明加法运算符用于把两个 `Box` 对象相加，返回最终的 `Box` 对象。大多数的重载运算符可被定义为普通的非成员函数或者被定义为类成员函数。如果我们定义上面的函数为类的非成员函数，那么我们需要为每次操作传递两个参数，如下所示：
```cpp
Box operator+(const Box&, const Box&);
```
例子：
```cpp
#include <iostream>
using namespace std;
class complex{
public:
    complex();
    complex(double real, double imag);
public:
    //声明运算符重载
    complex operator+(const complex &A) const;
    void display() const;
private:
    double m_real;  //实部
    double m_imag;  //虚部
};
complex::complex(): m_real(0.0), m_imag(0.0){ }
complex::complex(double real, double imag): m_real(real), m_imag(imag){ }
//实现运算符重载
complex complex::operator+(const complex &A) const{
    complex B;
    B.m_real = this->m_real + A.m_real;
    B.m_imag = this->m_imag + A.m_imag;
    return B;
}
void complex::display() const{
    cout<<m_real<<" + "<<m_imag<<"i"<<endl;
}
int main(){
    complex c1(4.3, 5.8);
    complex c2(2.4, 3.7);
    complex c3;
    c3 = c1 + c2;
    c3.display();
    return 0;
}
```
我们在 `complex` 类中重载了运算符+，该重载只对 `complex` 对象有效。当执行`c3 = c1 + c2`;语句时，编译器检测到`+`号左边（`+`号具有左结合性，所以先检测左边）是一个 `complex` 对象，就会调用成员函数`operator+()`，也就是转换为下面的形式：
```cpp
c3 = c1.operator+(c2);
```
`c1` 是要调用函数的对象，`c2` 是函数的实参。

**运算符重载函数不仅可以作为类的成员函数**，还可以作为全局函数。更改上面的代码，在全局范围内重载`+`，实现复数的加法运算：
```cpp
#include <iostream>
using namespace std;
class complex{
public:
    complex();
    complex(double real, double imag);
public:
    void display() const;
    //声明为友元函数
    friend complex operator+(const complex &A, const complex &B);
private:
    double m_real;
    double m_imag;
};
complex operator+(const complex &A, const complex &B);
complex::complex(): m_real(0.0), m_imag(0.0){ }
complex::complex(double real, double imag): m_real(real), m_imag(imag){ }
void complex::display() const{
    cout<<m_real<<" + "<<m_imag<<"i"<<endl;
}
//在全局范围内重载+
complex operator+(const complex &A, const complex &B){
    complex C;
    C.m_real = A.m_real + B.m_real;
    C.m_imag = A.m_imag + B.m_imag;
    return C;
}
int main(){
    complex c1(4.3, 5.8);
    complex c2(2.4, 3.7);
    complex c3;
    c3 = c1 + c2;
    c3.display();
    return 0;
}
```
运算符重载函数不是 `complex` 类的成员函数，但是却用到了 `complex` 类的 `private` 成员变量，所以必须在 `complex` 类中将该函数声明为友元函数。

当执行`c3 = c1 + c2`;语句时，编译器检测到`+`号两边都是 `complex` 对象，就会转换为类似下面的函数调用：
```cpp
c3 = operator+(c1, c2);
```
### 运算符重载规则
1. 不是所有的运算符都可以重载。长度运算符`sizeof`、条件运算符: `?`、成员选择符`.`和域解析运算符`::`不能被重载。
2. 重载不能改变运算符的优先级和结合性。
3. 重载不会改变运算符的用法。
4. 运算符重载函数不能有默认的参数，否则就改变了运算符操作数的个数。
5. 运算符函数既可以作为类的成员函数，也可以作为全局函数。
6. 箭头运算符`->`、下标运算符`[ ]`、函数调用运算符`( )`、赋值运算符`=`只能以成员函数的形式重载。


### 到底以成员函数还是全局函数（友元函数）的形式重载运算符
+ 一般而言，对于双目运算符，最好将其重载为友元函数；而对于单目运算符，则最好重载为成员函数。
但是也存在例外情况。有些双目运算符是不能重载为友元函数的，比如赋值运算符`=`、函数调用运算符`()`、下标运算符`[]`、指针运算符`->`等，因为这些运算符在语义上与`this`都有太多的关联。比如`=`表示“将自身赋值为…”，`[]`表示“自己的第几个元素”，如果将其重载为友元函数，则会出现语义上的不一致。

+ 还有一个需要特别说明的就是输出运算符`<<`。因为`<<`的第一个操作数一定是`ostream`类型，所以`<<`只能重载为友元函数，如下：
    ```cpp
    friend ostream& operator <<(ostream& os, const Complex& c);
    ostream& operator <<(ostream& os, const Complex& c)
    {
        os << c.m_Real << “+” << c.m_Imag << “i” << endl;
        return os;
    }
    ```
+ 所以，对于 `=`、`[]`、`()`、`->`以及所有的类型转换运算符只能作为非静态成员函数重载。如果允许第一操作数不是同类对象，而是其他数据类型，则只能作为非成员函数重载（如输入输出流运算符`>>`和`<<`就是这样的情况）。

### 重载[]（下标运算符）
下标运算符[ ]必须以成员函数的形式进行重载。该重载函数在类中的声明格式如下：
```cpp
返回值类型 & operator[ ] (参数);
```
或者：
```cpp
const 返回值类型 & operator[ ] (参数) const;
```
使用第一种声明方式，`[]`不仅可以访问元素，还可以修改元素。使用第二种声明方式，`[]`只能访问而不能修改元素。在实际开发中，我们应该同时提供以上两种形式，这样做是为了适应 `const` 对象，因为通过 `const` 对象只能调用 `const` 成员函数，如果不提供第二种形式，那么将无法访问 `const` 对象的任何元素。
```cpp
#include <iostream>
using namespace std;
class Array{
public:
    Array(int length = 0);
    ~Array();
public:
    int & operator[](int i);
    const int & operator[](int i) const;
public:
    int length() const { return m_length; }
    void display() const;
private:
    int m_length;  //数组长度
    int *m_p;  //指向数组内存的指针
};
Array::Array(int length): m_length(length){
    if(length == 0){
        m_p = NULL;
    }else{
        m_p = new int[length];
    }
}
Array::~Array(){
    delete[] m_p;
}
int& Array::operator[](int i){
    return m_p[i];
}
const int & Array::operator[](int i) const{
    return m_p[i];
}
void Array::display() const{
    for(int i = 0; i < m_length; i++){
        if(i == m_length - 1){
            cout<<m_p[i]<<endl;
        }else{
            cout<<m_p[i]<<", ";
        }
    }
}
int main(){
    int n;
    cin>>n;
    Array A(n);
    for(int i = 0, len = A.length(); i < len; i++){
        A[i] = i * 5;
    }
    A.display();
   
    const Array B(n);
    cout<<B[n-1]<<endl;  //访问最后一个元素
   
    return 0;
}
```
重载`[]`运算符以后，表达式`arr[i]`会被转换为：
```cpp
arr.operator[](i);
```
需要说明的是，`B` 是 `const` 对象，如果 `Array` 类没有提供 `const` 版本的`operator[]`，那么倒数第二行代码将报错。虽然这行代码只是读取对象的数据，并没有试图修改对象，但是它调用了非 `const` 版本的`operator[]`，编译器不管实际上有没有修改对象，只要是调用了非 `const` 的成员函数，编译器就认为会修改对象（至少有这种风险）。




### 赋值运算符重载

```cpp
#include <iostream>
#include <string>
using namespace std;

class MyStr {
public:
    MyStr() {}
    MyStr(int _id, char *_name)
    {
        cout << "constructor" << endl;
        id = _id;
        name = new char[strlen(_name) + 1];
        strcpy_s(name,strlen(_name) + 1,_name); 
    }
    MyStr(const MyStr &str)
    {
        cout << "copy constructor" << endl;
        id = str.id;
        if (name != NULL)
            delete name;
        name = new char[strlen(str.name) + 1];
        strcpy_s(name,strlen(str.name) + 1,str.name);
    }

    MyStr& operator=(const MyStr& str)
    {
        cout << "operator=" << endl;
        if (this != &str)
        {
            if (name != NULL)
                delete name;
            this->id = str.id;
            name = new char[strlen(str.name) + 1];
            strcpy_s(name,strlen(str.name) + 1,str.name);

            return *this;
        }
    }
    ~MyStr() 
    {
        cout << "deconstructor" << endl;
        delete name;
    }
private:
    char *name;
    int id;
};

void main()
{
    MyStr str1(1,"Jack");
    MyStr str2;
    str2 = str1;
    MyStr str3 = str2;
    return;

}
```
如果将上述例子显示提供的拷贝函数注释掉，然后同样执行`MyStr str3 = str2`;语句，此时调用默认的拷贝构造函数，它们指向内存中的同一区域。 
这样会有两个致命错误： 
1. `str2`修改`name`时，`str3`的`name`也会被修改； 
2. 当执行`str2`和`str3`的析构函数时，会导致同一内存区域释放两次，程序崩溃。

所以，必须通过显示提供拷贝构造函数以避免这样的问题，如上述例子，先判断被拷贝者的`name`是否为空，若否，`delete name`，然后为`name`重新申请空间，再将拷贝者`name`中的数据拷贝到被拷贝者的`name`中，这样，`str2.name`和`str3.name`各自独立，避免了上面两个错误。赋值运算符重载函数也是同样的道理。

**赋值运算符重载函数只能是类的非静态的成员函数**
1. 因为静态成员函数只能操作类的静态成员，无法操作类的非静态成员，可以参考静态成员变量和静态成员函数在`C++`类中的作用来进行理解； 
2. 避免二义性 

当程序没有显示提供一个以本类或者本类的引用为参数的赋值运算符重载函数时，编译器会自动提供一个。现在假设`C++`允许友元函数定义的赋值运算符重载函数，而且以引用为参数，与此同时，编译器也提供一个默认的赋值运算符重载函数（由于友元函数不属于这个类，所以此时编译器会自动提供一个）。但是当再执行类似`str2 = str1`;这样的代码时，编译器就困惑了。 

为了避免这样的二义性，`C++`强制规定，赋值运算符重载函数只能定义为类的成员函数，这样编译器就能判断是否需要提供默认版本了。

### 取地址及const取地址操作符重载
取地址是什么意思呢？就是返回当前对象的地址，对于成员函数来讲，`this`指针就是它的地址，需要返回指针。

`&`运算符是一个单目运算符，其只有一个参数，而这个参数就是一个对象，所以说这个对象是不用传的，定义为成员函数时函数参数就应该少一个，第一个函数参数就被`this`指针所代替。所以，在此不需要进行传参。

`const`成员函数及`const`对象去调用，普通的成员函数普通的对象来进行调用，若没有普通成员函数，那么普通对象也能够调用`const`成员函数。
```cpp
class Date {
public:
	Date(int year, int month, int day) {
		_year = year;
		_month = month;
		_day = day;
	}
	Date(const Date& d) {
		_year = d._year;
	}
	Date* operator&() {
		cout << "Date* operator&()" << endl;
		return this;
	}
 
	const Date* operator&() const {
		cout << "const Date* operator&() const" << endl;
		return this;
	}
 
private:
	int _year;
	int _month;
	int _day;
};
 
int main() {
	Date d1(2019, 4, 1);
	const Date d2(2019, 3, 31);
 
	Date* pa1 = &d1;
	const Date* pd2 = &d2;
	system("pause");
	return 0;
}
```
如果不写这两个函数的时候，编译器会帮助默认生成，若无其它操作完全够用了，因为这两个函数只返回`this`指针，也没有其他的操作。除非，你想返回别的地址，可以做到''返回你想返回的地址''，比如，返回一个病毒的地址，返回一个很深的调用链等等，可以自己按照需求进行重载实现，否则不必实现也无影响。



### Operator char()什么意思
operator用于类型转换函数

类型转换函数的特征：
1. 型转换函数定义在源类中；
2. 须由 `operator` 修饰，函数名称是目标类型名或目标类名；
3. 函数没有参数，没有返回值，但是有 `return` 语句，在`return`语句中返回目标类型数据或调用目标类的构造函数。
类型转换函数主要有两类：

**1） 对象向基本数据类型转换：**
```cpp

class D {
  public:
     D(double d) : d_(d) {}
 
     /* “(int)D”类型转换:将类型D转换成int */
     operator int() const {
         std::cout << "(int)d called!" << std::endl;
         return static_cast<int>(d_);
     }
 
  private:
     double d_;
 };
 
 int add(int a, int b) {
     return a + b;
 }
 
  int main() {
     D d1 = 1.1;
     D d2 = 2.2;
     std::cout << add(d1, d2) << std::endl;
     return 0;
 }
```
执行add(d1,d2)函数时“(int)D”类型转换函数将被自动调用，程序运行的输出为：
```cpp
(int)d called!
(int)d called!
3
```
**2）对象向不同类的对象的转换：**
```cpp
class A
{
  public:
     A(int num = 0) : dat(num) {}
     
     /* "(int)a"类型转换 */
     operator int() { return dat; }
 
  private:
     int dat;
};
 
 
class X
{
  public:
     X(int num = 0) : dat(num) {}
 
     /* "(int)a"类型转换 */
     operator int() { return dat; }
 
     /* "(A)a"类型转换 */
     operator A() {
         A temp = dat;
         return temp;
     }
 
  private:
     int dat;
};
 
 
int main()
{
     X stuff = 37;
     A more = 0;
     int hold;
 
     hold = stuff;    // convert X::stuff to int
     std::cout << hold << std::endl;
 
     more = stuff;    // convert X::stuff to A::more
     std::cout << more << std::endl;        // convert A::more to int
 
     return 0;
}
```
上面这个程序中`X`类通过`operator A()`类型转换来实现将`X`类型对象转换成`A`类型，这种方式需要先创建一个临时`A`对象再用它去赋值目标对象；更好的方式是为`A`类增加一个构造函数：
```cpp
A(const X& rhs) : dat(rhs) {}
```