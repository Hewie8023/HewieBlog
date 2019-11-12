---
title: 并查集
---

并查集是一种树形结构，用于处理一些不交集的合并及查询问题。

`Find`:确定元素属于哪一个子集。这个方法就是不断向上查找到它的根节点，它可以用来确定两个元素是否属于同一子集

`Union`：将两个子集合并成同一个集合

```cpp
#include <iostream>
#include<vector>
#include<unordered_map>

using namespace std;

template<class T>
class Union_Find {
public:
	Union_Find() = default;
	Union_Find(vector<T> data) {//初始化
		father.clear();
		size.clear();
		make_set(data);
	}

//把每一个元素都初始化为一个集合。初始化之后，每一个元素的父亲节点就是它本身，每一个元素的祖先节点也是它本身。
	void make_set(vector<T> data) {
		for (T var : data) {
			father.insert({ var,var });
			size.insert({ var,1 });
		}
	}

//查找一个元素所在的集合,递归find
	T find_set(T node) {//查找一个元素的根节点
		T f = father[node];
		if (node != f) {
			node = f;
			f = find_set(f);
		}
		father[node] = f;//将沿途所有元素的父节点都改为根节点 //路径压缩
		return f;
	}
//非递归find
    T find(T node){
        stack<T> stack;
        T cur = node;
        T f = father[cur];
        while(cur != f){
            stack.push(cur);
            cur = f;
            f = father[cur];
        }
        while(!stack.empty()){
            father[stack.top()] = f;
            stack.pop();
        }
        return f;
    }


	bool isSame_set(T a, T b) { //返回两个元素是否是同一个集合
		return find_set(a) == find_set(b);
	}

	void union_set(T a, T b) {//合并两个集合
		T aHead = find_set(a);
		T bHead = find_set(b);
		if (aHead != bHead) {
			int aSize = size[aHead];//a所在集合的size
			int bSize = size[bHead];//b所在集合的size
			if (aSize > bSize) { //按秩合并
				father[bHead] = aHead;
				size[aHead] += size[bHead];
			}

			else {
				father[aHead] = bHead;
				size[bHead] += size[aHead];
			}
		}
	}

private:
	unordered_map<T, T> father;  //key:子节点 ，value:根节点,father
	unordered_map<T, int> size; //某个节点所在集合的元素的个数

};


int main() {
	vector<char> v1 = { 'A','B','C','D' };
	vector<char> v2 = { 'E','F','G' };
	Union_Find<char> uf1(v1);
	Union_Find<char> uf2(v2);
	uf1.union_set('A', 'B');
	cout << uf1.isSame_set('A','B') << endl;
	cout << uf1.isSame_set('A', 'C') << endl;
	return 0;
}
```
