---
title: Morris遍历
---
## Morris遍历
Morris遍历是不需要额外空间的，它使用的是树自带的空节点。

![](https://s2.ax1x.com/2019/09/05/neKuL9.png)

```cpp
#include<bits/stdc++.h>
using namespace std;

struct TreeNode {
	int val;
	TreeNode *left;
	TreeNode *right;
	TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};
//先序创建一个二叉树，如：124##5##36##7##
void createTree(TreeNode* &head) {
	char ch;
	cin >> ch;
	if (ch == '#') {
		head = nullptr;
	}
	else {
		head = new TreeNode(ch - '0');
		createTree(head->left);
		createTree(head->right);
	}
}
void morris(TreeNode *head) {
	if (head == nullptr) {
		return;
	}
	TreeNode *cur = head;
	TreeNode *mostRight = nullptr;
	while (cur != nullptr) {
		cout << cur->val << " ";//输出1242513637
		mostRight = cur->left;//mostRight是cur的左孩子
		if (mostRight != nullptr) {//有左子树
			while (mostRight->right != nullptr && mostRight->right != cur) {
				mostRight = mostRight->right;
			}
			//mostRight变成了cur左子树上，最右的节点
			if (mostRight->right == nullptr) {
				//第一次来到cur节点
				mostRight->right = cur;
				cur = cur->left;
				continue;
			}
			else {
				//第二次到cur
				mostRight->right = nullptr;
			}
		}
		cur = cur->right;
	}
}


int main() {
	TreeNode* head;
	createTree(head);
	morris(head);
	return 0;
}
```
## Morris先序遍历
morris先序遍历打印时机：只能到自己一次的节点或者能到自己两次的节点在第一次到的时候打印
```cpp
//morris先序
#include<bits/stdc++.h>
using namespace std;

struct TreeNode {
	int val;
	TreeNode *left;
	TreeNode *right;
	TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

void createTree(TreeNode* &head) {
	char ch;
	cin >> ch;
	if (ch == '#') {
		head = nullptr;
	}
	else {
		head = new TreeNode(ch - '0');
		createTree(head->left);
		createTree(head->right);
	}
}
void morris(TreeNode *head) {
	if (head == nullptr) {
		return;
	}
	TreeNode *cur = head;
	TreeNode *mostRight = nullptr;
	while (cur != nullptr) {
		mostRight = cur->left;//mostRight是cur的左孩子
		if (mostRight != nullptr) {//有左子树
			while (mostRight->right != nullptr && mostRight->right != cur) {
				mostRight = mostRight->right;
			}
			//mostRight变成了cur左子树上，最右的节点
			if (mostRight->right == nullptr) {
				//第一次来到cur节点
				cout << cur->val << " ";
				mostRight->right = cur;
				cur = cur->left;
				continue;
			}
			else {
				//第二次到cur
				mostRight->right = nullptr;
			}
		}
		else {
			cout << cur->val << " ";
		}
		cur = cur->right;
	}
}


int main() {
	TreeNode* head;
	createTree(head);
	morris(head);
	return 0;
}
```
## Morris中序遍历
morris中序打印时机：只能到自己一次的节点或者能到达自己两次在第二次到达的时候打印
```cpp
//morris中序
#include<bits/stdc++.h>
using namespace std;

struct TreeNode {
	int val;
	TreeNode *left;
	TreeNode *right;
	TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

void createTree(TreeNode* &head) {
	char ch;
	cin >> ch;
	if (ch == '#') {
		head = nullptr;
	}
	else {
		head = new TreeNode(ch - '0');
		createTree(head->left);
		createTree(head->right);
	}
}
void morris(TreeNode *head) {
	if (head == nullptr) {
		return;
	}
	TreeNode *cur = head;
	TreeNode *mostRight = nullptr;
	while (cur != nullptr) {
		mostRight = cur->left;//mostRight是cur的左孩子
		if (mostRight != nullptr) {//有左子树
			while (mostRight->right != nullptr && mostRight->right != cur) {
				mostRight = mostRight->right;
			}
			//mostRight变成了cur左子树上，最右的节点
			if (mostRight->right == nullptr) {
				//第一次来到cur节点
				
				mostRight->right = cur;
				cur = cur->left;
				continue;
			}
			else {
				//第二次到cur
				mostRight->right = nullptr;
			}
		}
		cout << cur->val << " ";//有左子树时，如果第一次到，前面直接continue，不会运行这句，若第二次到，则会打印；若没有左子树，则会运行这句，结果就是中序
		cur = cur->right;
	}
}
int main() {
	TreeNode* head;
	createTree(head);
	morris(head);
	return 0;
}
```
## Morris后序遍历
morris后序的打印时机：
能回到自己两次的节点处，第二次回到自己时，逆序打印这个节点左子树的右边界；然后，最后单独逆序打印整棵树的右边界。
```cpp
//morris后序
#include<bits/stdc++.h>
using namespace std;

struct TreeNode {
	int val;
	TreeNode *left;
	TreeNode *right;
	TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

void createTree(TreeNode* &head) {
	char ch;
	cin >> ch;
	if (ch == '#') {
		head = nullptr;
	}
	else {
		head = new TreeNode(ch - '0');
		createTree(head->left);
		createTree(head->right);
	}
}

TreeNode* reverseEdge(TreeNode* from) {
	TreeNode *pre = nullptr;
	TreeNode *next = nullptr;
	while (from != nullptr) {
		next = from->right;
		from->right = pre;
		pre = from;
		from = next;
	}
	return pre;
}

void printEdge(TreeNode* X) {
	TreeNode *tail = reverseEdge(X);
	TreeNode *cur = tail;
	while (cur != nullptr) {
		cout << cur->val << " ";
		cur = cur->right;
	}
	reverseEdge(tail);
}

void morris(TreeNode *head) {
	if (head == nullptr) {
		return;
	}
	TreeNode *cur = head;
	TreeNode *mostRight = nullptr;
	while (cur != nullptr) {
		mostRight = cur->left;//mostRight是cur的左孩子
		if (mostRight != nullptr) {//有左子树
			while (mostRight->right != nullptr && mostRight->right != cur) {
				mostRight = mostRight->right;
			}
			//mostRight变成了cur左子树上，最右的节点
			if (mostRight->right == nullptr) {
				//第一次来到cur节点

				mostRight->right = cur;
				cur = cur->left;
				continue;
			}
			else {
				//第二次到cur
				mostRight->right = nullptr;
				printEdge(cur->left);
			}
		}
		cur = cur->right;
	}
	printEdge(head);
}


int main() {
	TreeNode* head;
	createTree(head);
	morris(head);
	return 0;
}
```
