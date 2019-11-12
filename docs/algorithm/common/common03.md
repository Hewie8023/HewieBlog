---
title: 栈和队列
---

## 窗口内的最值问题
```cpp
/*
有一个整型数组arr和大小为w的窗口，返回每个窗口的最大值
*/
#include<bits/stdc++.h>
using namespace std;
vector<int> getMaxWindow(vector<int>& arr, int w) {
	vector<int> res;
	if (arr.size() < w || w < 1) {
		return res;
	}
	res.resize(arr.size() - w + 1);
	deque<int> qmax;//双端队列存放下标，值：大->小
	int index = 0;
	for (int i = 0; i < arr.size(); ++i) {
		while (!qmax.empty() && arr[qmax.back()] <= arr[i]) {
			//队列不为空，队列尾部的值小于等于当前值
			qmax.pop_back();//将队列位置的值弹出
		}
		qmax.push_back(i);//满足条件，将当前值的下标加入双端队列
		if (qmax.front() == i - w) {//i-w为过期的下标
			qmax.pop_front();//将过期的下标弹出
		}
		if (i >= w - 1) {//此时窗口形成了，可以记录窗口内的最值
			res[index++] = arr[qmax.front()];
		}
	}
	return res;

}

int main() {
	int n, w;
	cin >> n >> w;
	vector<int> arr(n);
	for (int i = 0; i < n; ++i) {
		cin >> arr[i];
	}
	vector<int> res = getMaxWindow(arr, w);
	for (int i = 0; i < res.size(); ++i) {
		cout << res[i] << " ";
	}
	cout << endl;
	return 0;
}
```

## 单调栈问题
```cpp
//数组无重复值的时候
//给定一个数组，找到每一个i位置左边和右边离i位置最近且比arr[i]小的位置
#include<bits/stdc++.h>
using namespace std;

vector<vector<int>> getNearP(vector<int>& arr) {
	vector<vector<int>> res(arr.size(), vector<int>(2));
	stack<int> stack;//存放下标，值：小->大
	for (int i = 0; i < arr.size(); ++i) {
		while (!stack.empty() && arr[stack.top()] > arr[i]) {
			//栈顶元素的值大于当前元素的值，此时需要将栈顶弹出，并记录答案
			int popIndex = stack.top();
			stack.pop();
			int leftLessIndex = stack.empty() ? -1 : stack.top();//栈里还有值就是栈顶，否则就是-1
			res[popIndex][0] = leftLessIndex;
			res[popIndex][1] = i;
		}
		stack.push(i);
	}
	//遍历完成后，需要将不为空的栈清理
	while (!stack.empty()) {
		int popIndex = stack.top();
		stack.pop();
		int leftLessIndex = stack.empty() ? -1 : stack.top();
		res[popIndex][0] = leftLessIndex;
		res[popIndex][1] = -1;
	}
	return res;
}

int main() {
	int n;
	cin >> n;
	vector<int> arr(n);
	for (int i = 0; i < n; ++i) {
		cin >> arr[i];
	}
	vector<vector<int>> res = getNearP(arr);
	return 0; 
}
```

```cpp
//数组中有重复值
#include<bits/stdc++.h>
using namespace std;

vector<vector<int>> getNearP(vector<int>& arr) {
	vector<vector<int>> res(arr.size(), vector<int>(2));
	stack<list<int>> stack;//存放下标，值：小->大
	for (int i = 0; i < arr.size(); ++i) {
		while (!stack.empty() && arr[stack.top().back()] > arr[i]) {
			//栈顶元素的值大于当前元素的值，此时需要将栈顶弹出，并记录答案
			list<int> popIs = stack.top();
			stack.pop();
			//取位于list中最晚加入的那个
			int leftLessIndex = stack.empty() ? -1 : stack.top().back();//栈里还有值就是栈顶，否则就是-1
			for (auto popI : popIs) {
				res[popI][0] = leftLessIndex;
				res[popI][1] = i;
			}
		}
		//和栈顶元素值相等，则加入栈顶的list
		if (!stack.empty() && arr[stack.top().back()] == arr[i]) {
			stack.top().push_back(i);
		}
		else {
			//比栈顶元素值大，新建list加入栈顶
			list<int> l;
			l.push_back(i);
			stack.push(l);
		}
	}
	//遍历完成后，需要将不为空的栈清理
	while (!stack.empty()) {
		list<int> popIs = stack.top();
		stack.pop();
		int leftLessIndex = stack.empty() ? -1 : stack.top().back();
		for (auto popI : popIs) {
			res[popI][0] = leftLessIndex;
			res[popI][1] = -1;
		}
	}
	return res;
}

int main() {
	int n;
	cin >> n;
	vector<int> arr(n);
	for (int i = 0; i < n; ++i) {
		cin >> arr[i];
	}
	vector<vector<int>> res = getNearP(arr);
	for (int i = 0; i < res.size(); ++i) {
		cout << res[i][0] << " " << res[i][1] << endl;
	}
	return 0;
}
```

### 单调栈应用
定义：数组中累积和与最小值的乘积，假设叫做指标A，给定一个数组，请返回子数组中，指标A的最大值。

1、预处理：得到前缀和数组

这样就可以得到任意范围的累加和

例：{3,4,2,1,5} =》{3,7,9,10,15}

[2-3]范围的累加和为[0-3]-[0-1]

故，[i-j] = [0-j] - [0-(i-1)]

2、算法核心思想

在遍历到i位置时（arr[i]）要满足以下三条：
1. 这个子数组要包含i位置
2. 这个子数组要以arr[i]为最小值
3. 满足以上两条时，找子数组累加和最大的子数组

找出所有的解，最大的就是结果

实质：找每一个位置i，左边和右边离i最近且值比arr[i]小的位置。