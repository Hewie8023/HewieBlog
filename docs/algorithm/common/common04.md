---
title: 哈夫曼编码
---

哈夫曼编码，主要目的是根据使用频率来最大化节省字符（编码）的存储空间。

## 哈夫曼二叉树构建
### 1、初始队列
对下面这句歌词“we will we will r u”进行压缩。

先来统计一下这句话中每个字符出现的频率。如下表，按频率高低已排序：

![](https://s2.ax1x.com/2019/09/05/neKiaq.jpg)

那么我们按出现频率高低将其放入一个优先级队列中，从左到右依次为频率逐渐增加。

![](https://s2.ax1x.com/2019/09/05/neKVRU.jpg)

下面我们需要将这个队列转换成哈夫曼二叉树，哈夫曼二叉树是一颗带权重的二叉树，权重是由队列中每个字符出现的次数所决定的。并且哈夫曼二叉树始终保证权重越大的字符出现在越高的地方。

### 2、第一步合并
首先我们从左到右进行合并，依次构建二叉树。第一步取前两个字符u和r来构造初始二叉树，第一个字符作为左节点，第二个元素作为右节点，然后两个元素相加作为新空元素，并且两者权重相加作为新元素的权重。

![](https://s2.ax1x.com/2019/09/05/neKFI0.jpg)

同理，新元素可以和字符i再合并，如下：

![](https://s2.ax1x.com/2019/09/05/neKAiV.jpg)

### 3、重新调整队列
上图新元素权重相加后结果是变大了，需要对权重进行重新排序。

![](https://s2.ax1x.com/2019/09/05/neKEGT.jpg)

然后再依次从左到右合并，每合并一次则进行一次队列重新排序调整。如下：

![](https://s2.ax1x.com/2019/09/05/neKZzF.jpg)

经过多步操作之后，得到以下的哈夫曼二叉树结构，也就是一个带有权重的二叉树：

![](https://s2.ax1x.com/2019/09/05/neKmM4.jpg)
### 4、哈夫曼编码
有了上面带权重的二叉树之后，我们就可以进行编码了。我们把二叉树分支中左边的支路编码为0，右边分支表示为1，如下图：

![](https://s2.ax1x.com/2019/09/05/neKnsJ.jpg)

这样依次遍历这颗二叉树就可以获取得到所有字符的编码了。例如：‘ ’的编码为10，‘l’的编码为00，‘u’的编码为11100等等。经过这个编码设置之后我们可以发现，出现频率越高的字符越会在上层，这样它的编码越短；出现频率越低的字符越会在下层，编码越短。经过这样的设计，最终整个文本存储空间才会最大化的缩减。 

　　最终我们可以得到下面这张编码表：

![](https://s2.ax1x.com/2019/09/05/neKMZR.jpg)

### 5、字符串编码
有了上面的编码表之后，”we will we will r u”这句重新进行编码就可以得到很大的压缩，编码表示为：01 110 10 01 1111 00 00 10 01 110 10 01 1111 00 00 10 11101 10 11100。这样最终我们只需50位内存，比原ASCII码表示节约了2/3空间，效果还是很理想的。

### 6、代码实现
```cpp

#include <iostream>
using namespace std;
 
//最大字符编码数组长度
#define MAXCODELEN 100
//最大哈夫曼节点结构体数组个数
#define MAXHAFF 100
//最大哈夫曼编码结构体数组的个数
#define MAXCODE 100
#define MAXWEIGHT  10000;
 
 
typedef struct Haffman
{
    //权重
    int weight;
    //字符
    char ch;
    //父节点
    int parent;
    //左儿子节点
    int leftChild;
    //右儿子节点
    int rightChild;
}HaffmaNode;
 
typedef struct Code
{
    //字符的哈夫曼编码的存储
    int code[MAXCODELEN];
    //从哪个位置开始
    int start;
}HaffmaCode;
 
HaffmaNode haffman[MAXHAFF];
HaffmaCode code[MAXCODE];
 
void buildHaffman(int all)
{
    //哈夫曼节点的初始化之前的工作, weight为0,parent,leftChile,rightChile都为-1
    for (int i = 0; i < all * 2 - 1; ++i)
    {
        haffman[i].weight = 0;
        haffman[i].parent = -1;
        haffman[i].leftChild = -1;
        haffman[i].rightChild = -1;
    }
    std::cout << "请输入需要哈夫曼编码的字符和权重大小" << std::endl;
    for (int i = 0; i < all; i++)
    {
        std::cout << "请分别输入第个" << i << "哈夫曼字符和权重" << std::endl;
        std::cin >> haffman[i].ch;
        std::cin >> haffman[i].weight;
    }
    //每次找出最小的权重的节点,生成新的节点,需要all - 1 次合并
    int x1, x2, w1, w2;
    for (int i = 0; i < all - 1; ++i)
    {
        x1 = x2 = -1;
        w1 = w2 = MAXWEIGHT;
        //注意这里每次是all + i次里面遍历
        for (int j = 0; j < all + i; ++j)
        {
            //得到最小权重的节点
            if (haffman[j].parent == -1 && haffman[j].weight < w1)
            {
                //如果每次最小的更新了，那么需要把上次最小的给第二个最小的
                w2 = w1;
                x2 = x1;
 
                x1 = j;
                w1 = haffman[j].weight;
            }
            //这里用else if而不是if,是因为它们每次只选1个就可以了。
            else if(haffman[j].parent == -1 && haffman[j].weight < w2)
            {
                x2 = j;
                w2 = haffman[j].weight;
            }
        }
        //每次找到最小的两个节点后要记得合并成一个新的节点
        haffman[all + i].leftChild = x1;
        haffman[all + i].rightChild = x2;
        haffman[all + i].weight = w1 + w2;
        haffman[x1].parent = all + i;
        haffman[x2].parent = all + i;
        std::cout << "x1 is" << x1 <<" x1 parent is"<<haffman[x1].parent<< " x2 is" << x2 <<" x2 parent is "<< haffman[x2].parent<< " new Node is " << all + i << "new weight is" << haffman[all + i].weight << std::endl;
    }
}
 
//打印每个字符的哈夫曼编码
void printCode(int all)
{
    //保存当前叶子节点的字符编码
    HaffmaCode hCode;
    //当前父节点
    int curParent;
    //下标和叶子节点的编号
    int c;
    //遍历的总次数
    for (int i = 0; i < all; ++i)
    {
        hCode.start = all - 1;
        c = i;
        curParent = haffman[i].parent;
        //遍历的条件是父节点不等于-1
        while (curParent != -1)
        {
            //我们先拿到父节点，然后判断左节点是否为当前值，如果是取节点0
            //否则取节点1,这里的c会变动，所以不要用i表示，我们用c保存当前变量i
            if (haffman[curParent].leftChild == c)
            {
                hCode.code[hCode.start] = 0;
                std::cout << "hCode.code[" << hCode.start << "] = 0" << std::endl;
            }
            else
            {
                hCode.code[hCode.start] = 1;
                std::cout << "hCode.code[" << hCode.start << "] = 1" << std::endl;
            }
            hCode.start--;
            c = curParent;
            curParent = haffman[c].parent;
        }
        //把当前的叶子节点信息保存到编码结构体里面
        for (int j = hCode.start + 1; j < all; ++j)
        {
            code[i].code[j] = hCode.code[j];
        }
        code[i].start = hCode.start;
    }
}
int main()
{
    std::cout << "请输入有多少个哈夫曼字符" << std::endl;
    int all = 0;
    std::cin >> all;
    if (all <= 0)
    {
        std::cout << "您输入的个数有误" << std::endl;
        return -1;
    }
    buildHaffman(all);
    printCode(all);
    for (int i = 0; i < all; ++i)
    {
        std::cout << haffman[i].ch << ": Haffman Code is:";
        for (int j = code[i].start + 1; j < all; ++j)
        {
            std::cout << code[i].code[j];
        }
        std::cout << std::endl;
    }
    return 0;
}
```
