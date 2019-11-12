---
title: 最短路径算法
---

## 1、迪杰斯特拉算法
Dijkstra算法可以计算任意节点到其他节点的最短路径

![](https://s2.ax1x.com/2019/09/05/neKOm9.png)

**算法思路**
1. 指定一个节点，例如我们要计算 'A' 到其他节点的最短路径
2. 引入两个集合（S、U），**S集合**包含已求出的最短路径的点（以及相应的最短长度），**U集合**包含未求出最短路径的点（以及A到该点的路径，注意 如上图所示，A->C由于没有直接相连 初始时为∞）
3. 初始化两个集合，S集合初始时 只有当前要计算的节点，```A->A = 0```，
U集合初始时为 ```A->B = 4, A->C = ∞, A->D = 2, A->E = ∞```，敲黑板！！！接下来要进行核心两步骤了
4. 从U集合中找出路径最短的点，加入S集合，例如 ```A->D = 2```
5. 更新U集合路径，```if ( 'D 到 B,C,E 的距离' + 'AD 距离' < 'A 到 B,C,E 的距离' )``` 则更新U
6. 循环执行 4、5 两步骤，直至遍历结束，得到A 到其他节点的最短路径

**算法图解**

1）选定A节点并初始化，如上述步骤3所示

![](https://s2.ax1x.com/2019/09/05/neKhoq.png)

2）执行上述 4、5两步骤，找出U集合中路径最短的节点D 加入S集合，并根据条件 ```if ( 'D 到 B,C,E 的距离' + 'AD 距离' < 'A 到 B,C,E 的距离' )```来更新U集合

![](https://s2.ax1x.com/2019/09/05/neKWes.png)

3）这时候 ```A->B, A->C``` 都为3，没关系。其实这时候他俩都是最短距离，如果从算法逻辑来讲的话，会先取到B点。而这个时候 if 条件变成了 ```if ( 'B 到 C,E 的距离' + 'AB 距离' < 'A 到 C,E 的距离' ) ```，如图所示这时候```A->B```距离 其实为 ```A->D->B```

![](https://s2.ax1x.com/2019/09/05/neK2Lj.png)

4）思路就是这样，往后就是大同小异了

![](https://s2.ax1x.com/2019/09/05/neKgyQ.png)

5）算法结束

![](https://s2.ax1x.com/2019/09/05/neKfwn.png)

**代码实现**
```java
public class Dijkstra {
    public static final int M = 10000; // 代表正无穷
    
    public static void main(String[] args) {
        // 二维数组每一行分别是 A、B、C、D、E 各点到其余点的距离, 
        // A -> A 距离为0, 常量M 为正无穷
        int[][] weight1 = {
                {0,4,M,2,M}, 
                {4,0,4,1,M}, 
                {M,4,0,1,3}, 
                {2,1,1,0,7},   
                {M,M,3,7,0} 
            };

        int start = 0;
        
        int[] shortPath = dijkstra(weight1, start);

        for (int i = 0; i < shortPath.length; i++)
            System.out.println("从" + start + "出发到" + i + "的最短距离为：" + shortPath[i]);
    }

    public static int[] dijkstra(int[][] weight, int start) {
        // 接受一个有向图的权重矩阵，和一个起点编号start（从0编号，顶点存在数组中）
        // 返回一个int[] 数组，表示从start到它的最短路径长度
        int n = weight.length; // 顶点个数
        int[] shortPath = new int[n]; // 保存start到其他各点的最短路径
        String[] path = new String[n]; // 保存start到其他各点最短路径的字符串表示
        for (int i = 0; i < n; i++)
            path[i] = new String(start + "-->" + i);
        int[] visited = new int[n]; // 标记当前该顶点的最短路径是否已经求出,1表示已求出

        // 初始化，第一个顶点已经求出
        shortPath[start] = 0;
        visited[start] = 1;

        for (int count = 1; count < n; count++) { // 要加入n-1个顶点
            int k = -1; // 选出一个距离初始顶点start最近的未标记顶点
            int dmin = Integer.MAX_VALUE;
            for (int i = 0; i < n; i++) {
                if (visited[i] == 0 && weight[start][i] < dmin) {
                    dmin = weight[start][i];
                    k = i;
                }
            }

            // 将新选出的顶点标记为已求出最短路径，且到start的最短路径就是dmin
            shortPath[k] = dmin;
            visited[k] = 1;

            // 以k为中间点，修正从start到未访问各点的距离
            for (int i = 0; i < n; i++) {
                //如果 '起始点到当前点距离' + '当前点到某点距离' < '起始点到某点距离', 则更新
                if (visited[i] == 0 && weight[start][k] + weight[k][i] < weight[start][i]) {
                    weight[start][i] = weight[start][k] + weight[k][i];
                    path[i] = path[k] + "-->" + i;
                }
            }
        }
        for (int i = 0; i < n; i++) {
            
            System.out.println("从" + start + "出发到" + i + "的最短路径为：" + path[i]);
        }
        System.out.println("=====================================");
        return shortPath;
    }
    
}
```

```cpp
const int  MAXINT = 32767;
const int MAXNUM = 10;
int dist[MAXNUM];
int prev[MAXNUM];

int A[MAXUNM][MAXNUM];

void Dijkstra(int v0)
{
  　　 bool S[MAXNUM];                                  // 判断是否已存入该点到S集合中
     int n=MAXNUM;
  　　for(int i=1; i<=n; ++i)
 　　 {
      　　dist[i] = A[v0][i];
      　　S[i] = false;                                // 初始都未用过该点
      　　if(dist[i] == MAXINT)    
            　　prev[i] = -1;
 　　     else 
            　　prev[i] = v0;
   　　}
   　 dist[v0] = 0;
   　 S[v0] = true; 　　
 　　 for(int i=2; i<=n; i++)
 　　 {
       　　int mindist = MAXINT;
       　　int u = v0; 　　                            // 找出当前未使用的点j的dist[j]最小值
      　　 for(int j=1; j<=n; ++j)
      　　    if((!S[j]) && dist[j]<mindist)
      　　    {
         　　       u = j;                             // u保存当前邻接点中距离最小的点的号码 
         　 　      mindist = dist[j];
       　　   }
       　　S[u] = true; 
       　　for(int j=1; j<=n; j++)
       　　    if((!S[j]) && A[u][j]<MAXINT)
       　　    {
           　    　if(dist[u] + A[u][j] < dist[j])     //在通过新加入的u点路径找到离v0点更短的路径  
           　    　{
                   　　dist[j] = dist[u] + A[u][j];    //更新dist 
                   　　prev[j] = u;                    //记录前驱顶点 
            　　    }
        　    　}
   　　}
}
```


## 2、Floyd算法
为了节省经费以及方便计划旅程，小哼希望在出发之前知道任意两个城市之前的最短路程。

![](https://s2.ax1x.com/2019/09/05/neKPZn.png)

上图中有4个城市8条公路，公路上的数字表示这条公路的长短。请注意这些公路是单向的。我们现在需要求任意两个城市之间的最短路程，也就是求任意两个点之间的最短路径。这个问题这也被称为“多源最短路径”问题。

现在需要一个数据结构来存储图的信息，我们仍然可以用一个4*4的矩阵（二维数组e）来存储。比如1号城市到2号城市的路程为2，则设e[1][2]的值为2。2号城市无法到达4号城市，则设置e[2][4]的值为∞。另外此处约定一个城市自己是到自己的也是0，例如e[1][1]为0，具体如下。

![](https://s2.ax1x.com/2019/09/05/neK9qs.png)

如果要让任意两点（例如从顶点a点到顶点b）之间的路程变短，只能引入第三个点（顶点k），并通过这个顶点k中转即a->k->b，才可能缩短原来从顶点a点到顶点b的路程。那么这个中转的顶点k是1~n中的哪个点呢？甚至有时候不只通过一个点，而是经过两个点或者更多点中转会更短，即a->k1->k2b->或者a->k1->k2…->k->i…->b。比如上图中从4号城市到3号城市（4->3）的路程e[4][3]原本是12。如果只通过1号城市中转（4->1->3），路程将缩短为11（e[4][1]+e[1][3]=5+6=11）。其实1号城市到3号城市也可以通过2号城市中转，使得1号到3号城市的路程缩短为5（e[1][2]+e[2][3]=2+3=5）。所以如果同时经过1号和2号两个城市中转的话，从4号城市到3号城市的路程会进一步缩短为10。通过这个的例子，我们发现每个顶点都有可能使得另外两个顶点之间的路程变短。

 当任意两点之间不允许经过第三个点时，这些城市之间最短路程就是初始路程，如下。

![](https://s2.ax1x.com/2019/09/05/neK9qs.png)

假如现在只允许经过1号顶点，求任意两点之间的最短路程，应该如何求呢？只需判断e[i][1]+e[1][j]是否比e[i][j]要小即可。e[i][j]表示的是从i号顶点到j号顶点之间的路程。e[i][1]+e[1][j]表示的是从i号顶点先到1号顶点，再从1号顶点到j号顶点的路程之和。其中i是1~n循环，j也是1~n循环，代码实现如下。

```cpp
for (i = 1; i <= n; i++)
{
    for (j = 1; j <= n; j++)
    {
        if (e[i][j] > e[i][1] + e[1][j])
            e[i][j] = e[i][1] + e[1][j];
    }
}
```
在只允许经过1号顶点的情况下，任意两点之间的最短路程更新为：

![](https://s2.ax1x.com/2019/09/05/neKSMQ.png)

通过上图我们发现：在只通过1号顶点中转的情况下，3号顶点到2号顶点（e[3][2]）、4号顶点到2号顶点（e[4][2]）以及4号顶点到3号顶点（e[4][3]）的路程都变短了。

接下来继续求在只允许经过1和2号两个顶点的情况下任意两点之间的最短路程。如何做呢？我们需要在只允许经过1号顶点时任意两点的最短路程的结果下，再判断如果经过2号顶点是否可以使得i号顶点到j号顶点之间的路程变得更短。即判断e[i][2]+e[2][j]是否比e[i][j]要小，代码实现为如下。

```cpp
//经过1号顶点
for(i=1;i<=n;i++)  
    for(j=1;j<=n;j++)  
        if (e[i][j] > e[i][1]+e[1][j])  e[i][j]=e[i][1]+e[1][j];  
//经过2号顶点
for(i=1;i<=n;i++)  
    for(j=1;j<=n;j++)  
        if (e[i][j] > e[i][2]+e[2][j])  e[i][j]=e[i][2]+e[2][j];
```
在只允许经过1和2号顶点的情况下，任意两点之间的最短路程更新为：

![](https://s2.ax1x.com/2019/09/05/neuxxg.png)


通过上图得知，在相比只允许通过1号顶点进行中转的情况下，这里允许通过1和2号顶点进行中转，使得e[1][3]和e[4][3]的路程变得更短了。

同理，继续在只允许经过1、2和3号顶点进行中转的情况下，求任意两点之间的最短路程。任意两点之间的最短路程更新为：

![](https://s2.ax1x.com/2019/09/05/neuvRS.png)

 最后允许通过所有顶点作为中转，任意两点之间最终的最短路程为：

![](https://s2.ax1x.com/2019/09/05/neKprj.png)

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
	int e[10][10];
	int k, i, j, n, m, t1, t2, t3;
	int inf = 99999999;//表示无穷
	cin >> n >> m;//n顶点个数，m表示边的条数
	//初始化
	for (i = 1; i <= n; ++i) {
		for (j = 1; j <= n; ++j) {
			if (i == j) e[i][j] = 0;
			else e[i][j] = inf;
		}
	}
	//读入边
	for (i = 1; i <= m; ++i) {
		cin >> t1 >> t2 >> t3;
		e[t1][t2] = t3;
	}
	//Floyd-Warshall算法核心语句
	for (k = 1; k <= n; ++k) {
		for (i = 1; i <= n; ++i) {
			for (j = 1; j <= n; ++j) {
				if (e[i][j] > e[i][k] + e[k][j])
					e[i][j] = e[i][k] + e[k][j];
			}
		}
	}
	//cout
	for (i = 1; i <= n; ++i) {
		for (j = 1; j <= n; ++j) {
			cout << e[i][j] << " ";
		}
		cout << endl;
	}
	return 0;
}
```