---
title: 排序
---


## 概念
![](https://s2.ax1x.com/2019/09/04/nAzmNV.jpg)

**相关概念**

**稳定**：如果a原本在b前面，而a=b，排序之后a仍然在b的前面。

**不稳定**：如果a原本在b的前面，而a=b，排序之后 a 可能会出现在 b 的后面。

**时间复杂度**：对排序数据的总的操作次数。反映当n变化时，操作次数呈现什么规律。

**空间复杂度**：是指算法在计算机内执行时所需存储空间的度量，它也是数据规模n的函数。

## 冒泡排序
它重复地走访过要排序的数列，一次比较两个元素，如果它们的顺序错误就把它们交换过来。走访数列的工作是重复地进行直到没有再需要交换，也就是说该数列已经排序完成。

**算法描述**
1. 比较相邻的元素。如果第一个比第二个大，就交换它们两个；
2. 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对，这样在最后的元素应该会是最大的数；
3. 针对所有的元素重复以上的步骤，除了最后一个；
4. 重复步骤1~3，直到排序完成。

**代码实现**
```cpp
void bubble(vector<int>& arr){
	for(int i=0;i<arr.size()-1;i++){ //only need n-1 swaps to move the smallest to the front
		for(int j=0;j<arr.size()-1;j++){
			if(arr[j]>arr[j+1]) swap(arr[j],arr[j+1]);
			//arr[j]>arr[j+1] stable
			//arr[j]>=arr[j+1] unstable
		}
	}
}
```

## 选择排序
工作原理：首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。以此类推，直到所有元素均排序完毕。

**算法描述**
n个记录的直接选择排序可经过n-1趟直接选择排序得到有序结果。具体算法描述如下：
- 初始状态：无序区为R[1..n]，有序区为空；
- 第i趟排序(i=1,2,3…n-1)开始时，当前有序区和无序区分别为R[1..i-1]和R(i..n）。该趟排序从当前无序区中-选出关键字最小的记录 R[k]，将它与无序区的第1个记录R交换，使R[1..i]和R[i+1..n)分别变为记录个数增加1个的新有序区和记录个数减少1个的新无序区；
- n-1趟结束，数组有序化了。

**代码实现**
```cpp
void select(vector<int>& arr){
	int s = arr.size();
	for(int i=0;i<s;i++){
		int m = arr[i];
		int index = i;
		for(int j=i+1;j<s;j++){
			if(arr[j]<m){
				m = arr[j];
				index = j;
			}
		}
		swap(arr[i], arr[index]);
	}
}
```

##  插入排序
工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。

**算法描述**

一般来说，插入排序都采用`in-place`在数组上实现。具体算法描述如下：
1. 从第一个元素开始，该元素可以认为已经被排序；
2. 取出下一个元素，在已经排序的元素序列中从后向前扫描；
3. 如果该元素（已排序）大于新元素，将该元素移到下一位置；
4. 重复步骤3，直到找到已排序的元素小于或者等于新元素的位置；
5. 将新元素插入到该位置后；
6. 重复步骤2~5。

**代码实现**
```cpp
void sertSort(int a[], int len) {
    for (int i = 1; i < len; ++i) {
        int key = a[i];//保存无序区第一个元素为key
        int j = i - 1;
        while (!(j <0) && a[j] > key) {//新元素在有序区寻找位置
            a[j + 1] = a[j];
            j--;
        }
        a[j+1] = key;
    }
}
```

## 希尔排序
对于大规模的数组，插入排序很慢，因为它只能交换相邻的元素，每次只能将逆序数量减少 1。希尔排序的出现就是为了解决插入排序的这种局限性，它通过交换不相邻的元素，每次可以将逆序数量减少大于 1。

希尔排序使用插入排序对间隔 h 的序列进行排序。通过不断减小 h，最后令 h=1，就可以使得整个数组是有序的。
![](https://s2.ax1x.com/2019/09/04/nAzeA0.jpg)

```cpp
//只需要把之前insert function的gap=1改成变量gap就行
void shellInsert(vector<int>& arr, int beg, int gap){
	for(int i=beg+gap;i<arr.size();i+=gap){
		int temp=arr[i];
		int j=i-gap;
		for(;j>=0 && temp<arr[j];j-=gap){
			arr[j+gap] = arr[j];
		}
		arr[j+gap] = temp;
	}
}
 
void shell(vector<int>& arr){
	int gap = arr.size()/2;
	while(gap>0){
		int beg=gap-1;
		while(beg>=0){
			shellInsert(arr, beg, gap);
			beg--;
		}
		gap = gap/2;
	}
}
```

## 归并排序
首先将数组二分成多个子序列，然后两两子序列进行比较与合并，使其合并为一个完全有序的序列。不断进行比较与合并，使子序列们最终合并为一个完整有序的序列。

**算法描述**
1. 将数组二分为多个子序列 
2. 子序列进行排序(注：只有1个元素的序列本身就已经是排序好的序列) 
3. 排序好的子序列间进行比较与合并。 
3. 子序列完全合并为一个有序序列

![](https://s2.ax1x.com/2019/09/04/nAzQc4.md.png)

**合并相邻有序子序列**

我们需要将两个已经有序的子序列合并成一个有序序列，比如上图中的最后一次合并，要将[4,5,7,8]和[1,2,3,6]两个已经有序的子序列，合并为最终序列[1,2,3,4,5,6,7,8]，来看下实现步骤。

![](https://s2.ax1x.com/2019/09/04/nAznhT.md.png)

![](https://s2.ax1x.com/2019/09/04/nAzM3F.md.png)

**代码实现**
```cpp
//归并过程
void merge(vector<int>& arr, int l, int mid, int r) {
	vector<int> help(r - l + 1);//辅助数组
	int i = 0;
	int lIndex = l;
	int rIndex = mid + 1;
	while (lIndex <= mid && rIndex <= r) {
		help[i++] = arr[lIndex] < arr[rIndex] ? arr[lIndex++] : arr[rIndex++];
	}
	//左边和右边肯定有一边到头了，不可能同时，因为每次只移动一边
	while (lIndex <= mid) {
		help[i++] = arr[lIndex++];
	}
	while (rIndex <= r) {
		help[i++] = arr[rIndex++];
	}
	//将排好序的辅助数组赋值给原始数组，不需要返回值
	for (i = 0; i < r - l + 1; i++) {
		arr[l + i] = help[i];
	}
}

//递归
static void mergeSort(vector<int>& arr, int l, int r) {
	if (l == r) {
		return;
	}
	int mid = l + ((r - l) >> 1);
	//左半部分归并排序
	mergeSort(arr, l, mid);
	//右半部分归并排序
	mergeSort(arr, mid + 1, r);
	//左右部分归并
	merge(arr, l, mid, r);
}
```

## 快速排序
选取数组中一个元素为基准(pivot)P，对数组进行排序，使得比P大的元素都在P的右边，比P小的元素在P的左边。然后对以P为分界点的左右子串递归进行快排。

**算法描述**
1. 从数列中选取一个元素作为基准； 
2. 进行分区操作(partition)。重新排列数列，使得比基准小的元素都在其左边，比基准小的元素都在它右边，即分为左子列，基准，右子列。 
3. 对左右子列递归进行快排。

**代码实现**
```cpp
void quickSort(int a[], int low, int high) {
    if (low < high) {
        int i = low - 1;
        int j = low;
        int key = a[high];//基准
        for (int j = low; j <= high; ++j) {//使比基准小或等于基准的元素前移。
            if (a[j] <=key) {
                ++i;
                swap(a[i], a[j]);
            }
        }
        quickSort(a, low, i - 1);
        quickSort(a, i + 1, high);
    }
}
```
### 荷兰国旗问题
```cpp
//荷兰国旗问题
/*
给定一个数组和一个数num，小于num的数放数组左边，等于num的数放在数组中间，大于num的数放在数组右边
要求：额外空间复杂度O(1)，时间复杂度O(n) 
*/
#include<bits/stdc++.h>
using namespace std;

void swap(vector<int>& arr, int i, int j) {
	int tmp = arr[i];
	arr[i] = arr[j];
	arr[j] = tmp;
}

pair<int, int> patition(vector<int>& arr,int l, int r, int aim) {
	int less = l - 1;//小于区域
	int more = r + 1;//大于区域
	while (l < more) {
		if (arr[l] < aim) {
			swap(arr, ++less, l++);//满足小于，小于区域的下一个和当前值交换，当前值下标往下走一个
		}
		else if (arr[l] > aim) {
			swap(arr, --more, l);//满足大于，大于区域的前一个和当前值交换，之后当前位置的值还需要进行判断，不能移动
		}
		else {
			l++;//等于目标值，当前位置下标往下走
		}
	}
	return make_pair(less++, more - 1);
}

int main() {
	int n,aim;
	cin >> n >> aim;
	vector<int> arr(n);
	for (int i = 0; i < n; ++i) {
		cin >> arr[i];
	}
	pair<int,int> res = patition(arr,0,n-1,aim);
	for (int i = 0; i < n; ++i) {
		cout << arr[i] << " ";
	}
	cout << endl;
	return 0;
}
```
### 快排的荷兰国旗问题算法
```cpp
#include<bits/stdc++.h>
using namespace std;

void swap(vector<int>& arr, int i, int j) {
	int tmp = arr[i];
	arr[i] = arr[j];
	arr[j] = tmp;
}

pair<int, int> partition(vector<int>& arr, int l, int r,int aim) {
	int less = l - 1;//小于区域
	int more = r + 1;//大于区域
	while (l < more) {
		if (arr[l] < aim) {
			swap(arr, ++less, l++);//满足小于，小于区域的下一个和当前值交换，当前值下标往下走一个
		}
		else if (arr[l] > aim) {
			swap(arr, --more, l);//满足大于，大于区域的前一个和当前值交换，之后当前位置的值还需要进行判断，不能移动
		}
		else {
			l++;//等于目标值，当前位置下标往下走
		}
	}
	return make_pair(less++, more - 1);
}

//arr[l...r]排好序
void quickSort(vector<int>& arr, int l, int r) {
	if (l < r) {
		srand(time(0));
		int tmp = l+(int)(rand()%(r-l+1));//产生随机位置，作为目标值
		pair<int, int> p = partition(arr, l, r ,arr[tmp]);
		quickSort(arr, l, p.first - 1);//小于区域
		quickSort(arr, p.second + 1, r);//大于区域
	}
}

void quickSort(vector<int>& arr) {
	if (arr.size() < 2) {
		return;
	}
	quickSort(arr, 0, arr.size() - 1);
}

int main() {
	int n;
	cin >> n;
	vector<int> arr(n);
	for (int i = 0; i < n; ++i) {
		cin >> arr[i];
	}
	quickSort(arr);
		for (int i = 0; i < n; ++i) {
		cout << arr[i] << " ";
	}
	cout << endl;
	return 0;
}
```

## 堆排序
堆排序是将数组构建成大顶堆，即根节点是数组中最大元素，将根节点与堆底最后一个元素交换，使得最大值排到末尾，即已排序好。将剩下的n-1个元素重新调整为大顶堆，在堆顶/根节点处得到第二大的值，与堆底最后一个元素交换，便又排序好一个元素。

**算法描述**
1. 将数组构建成大顶堆 
2. 交换堆顶元素和堆底元素 
3. 调整堆，使其重新成为大顶堆 
4. 重复步骤2和步骤3 n-1次，排序完成。n为数组长度。

堆分为两类： 
1. 最大堆（大顶堆）：堆的每个父节点都大于其孩子节点； 
2. 最小堆（小顶堆）：堆的每个父节点都小于其孩子节点； 


堆的存储： 

一般都用数组来表示堆，i结点的父结点下标就为`(i – 1) / 2`。它的左右子结点下标分别为`2 * i + 1`和`2 * i + 2`。

堆排序的步骤分为三步: 
1. 建堆（升序建大堆，降序建小堆）； 
2. 交换数据； 
3. 向下调整。 


**代码实现**
```cpp
//堆排序

#include<bits/stdc++.h>
using namespace std;

void swap(vector<int>& arr, int i, int j) {
	int tmp = arr[i];
	arr[i] = arr[j];
	arr[j] = tmp;
}

//i位置与其父节点的位置进行比较，如果大于父节点，就交换
void heapInsert(vector<int>& arr, int i) {
	while (arr[i] > arr[(i - 1) / 2]) {
		swap(arr, i, (i - 1) / 2);
		i = (i - 1) / 2;
	}
}
//当大顶堆中某一个元素发生变化的时候，取该元素的左右子节点较大的一个，
//这个最大子节点再和这个修改的元素作比较，子节点大则交换。
void heapify(vector<int>& arr, int size) {
	int i = 0;
	int left = 1;
	int largest;
	while (left < size) {
	    //取该元素的左右子节点较大的一个
		largest = left + 1 < size && arr[left + 1] > arr[left] ? left + 1 : left;
		//比较子节点和被修改元素的大小
		largest = arr[i] > arr[largest] ? i : largest;
		if (largest == i) {
			break;
		}
		swap(arr, largest, i);
		i = largest;
		left = i * 2 + 1;
	}
}

void heapSort(vector<int>& arr) {
	for (int i = 0; i < arr.size(); ++i) {
		heapInsert(arr, i);
	}
	for (int i = arr.size() - 1; i >= 0; --i) {
		swap(arr, 0, i);
		heapify(arr, i);
	}
}

int main() {
	int n;
	cin >> n;
	vector<int> arr(n);
	for (int i = 0; i < n; ++i) {
		cin >> arr[i];
	}
	heapSort(arr);
	for (int i = 0; i < n; ++i) {
		cout << arr[i] << " ";
	}
	cout << endl;
	return 0;
}
```

## 计数排序
计数排序是利用哈希原理，记录元素出现的频次。在统计结束后可以直接遍历哈希表，将数据填回数据空间。由于是空间换时间，所以适合对数据范围集中的数据使用。而且由于用数组下标表示，只适合只有正整数，0的数据。

**代码实现**
```cpp
void count(vector<int>& arr, int range){
	vector<int> temp(range+1, 0);
	for(int i=0;i<arr.size();i++){
		temp[arr[i]]++;
	}
 
	int c=0;
	for(int i=0;i<arr.size();i++){
		while(temp[c]==0) c++;
		arr[i] = c;
		temp[c]--;
	}
}
```

## 桶排序
基于计数排序，增加了函数映射(hashmap)，把元素归于不同的桶中便于排序。

比如说，需要排序1-100的数字。如果是计数排序，就需要一个100的vector来存；桶排序可以用一个10的vector来存，每个元素进入(元素/10)index的vector。

类似于哈希冲突的链地址法。

![](https://s2.ax1x.com/2019/09/04/nAzK9U.gif)

**代码实现**
```cpp
int getRange(vector<int> a, int begin, int end,int &min,int &max) {//获得数组元素范围和极值
    for (int i = begin + 1; i <= end; ++i) {
        min = a[i] < min ? a[i] : min;
        max = a[i] > max ? a[i] : max;
    }
    return max - min+1;
}
void bucketSort(vector<int>&a, int begin, int end) {//容器做参数时用引用传递来调换元素顺序，
    if (end - begin <1)
        return;//递归出口
    int min, max;min=max = a[0];
    int range = getRange(a, begin, end, min, max); //获得元素范围和极值
    int bucketNum = 5;//本次定义了5个桶
    int gap = range / 5+1;//设定桶区间
    vector <vector<int > > bucket(bucketNum);//用二维容器来装桶
    for (int i = begin; i <= end; ++i){
        cout << "桶编号： " << (a[i] - min) / gap << "放入元素：" << a[i] << endl;
        bucket[(a[i]-min )/ gap] .push_back( a[i]);//元素放在不同的桶里
    } 
    for (int i = 0; i < bucketNum; ++i) {
        bucketSort( bucket[i],0,bucket[i].size()-1);//对桶里的元素递归调用桶排序
    }
    for (int i = 0,j=0; i < bucketNum; ++i) {
        if (!bucket[i].empty()) {//桶非空判断
            for (vector<int>::iterator p = bucket[i].begin(); p!=bucket[i].end(); ++p) {//桶里排序好的元素放回原容器a
                a[j++] = *p;
            }
        }
    }
    cout << endl;
}
```

## 基数排序
基数排序是按照低位先排序，然后收集；再按照高位排序，然后再收集；依次类推，直到最高位。有时候有些属性是有优先级顺序的，先按低优先级排序，再按高优先级排序。最后的次序就是高优先级高的在前，高优先级相同的低优先级高的在前。

**算法描述**
1. 取得数组中最大位数。 
2. 从低位开始，对数组进行排序。 
3. 将排序好的元素复制到原始数组。 
4. 重复2、3步骤到最高位。排序完成。

**代码实现**
```cpp
int getnum(int a[], int len) {
    int max = a[0];
    int num = 1;
    for (int i = 1; i < len; ++i) {
        max=a[i] > max ? a[i] : max;
    }
    while (max /= 10) {
        num++;
    }
    return num;
}
void radixSort(int a[], int len) {
    int num = getnum(a, len);//获得位数
    vector<vector<int>>radix(10);
    for(int k=0;k<num;++k){
        for (int i = 0; i < len; ++i) {//存放元素
            int t = int(a[i] / pow(10, k))%10;
            radix[t].push_back(a[i]);
        }
        vector<vector<int> >::iterator p;
        vector<int>::iterator q;
        int i = 0;
        for (p = radix.begin(); p != radix.end(); ++p) {//取出元素
            for (q = (*p).begin(); q !=(*p).end(); ++q) {
                a[i++] = *q;
            }
        }
        for (int i = 0; i < 10; ++i) {//清空容器中元素
            if(!radix[i].empty())
                    radix[i].clear();
        }
    }
}
```
