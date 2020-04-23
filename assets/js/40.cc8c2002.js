(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{272:function(a,t,e){"use strict";e.r(t);var r=e(5),s=Object(r.a)({},(function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[e("p"),e("div",{staticClass:"table-of-contents"},[e("ul",[e("li",[e("a",{attrs:{href:"#隔离级别"}},[a._v("隔离级别")]),e("ul",[e("li",[e("a",{attrs:{href:"#未提交读（read-uncommitted）（写加锁，读不加锁）"}},[a._v("未提交读（READ UNCOMMITTED）（写加锁，读不加锁）")])]),e("li",[e("a",{attrs:{href:"#提交读（read-committed）（写加锁，读加锁）"}},[a._v("提交读（READ COMMITTED）（写加锁，读加锁）")])]),e("li",[e("a",{attrs:{href:"#可重复读（repeatable-read）（写加锁，读加锁）"}},[a._v("可重复读（REPEATABLE READ）（写加锁，读加锁）")])]),e("li",[e("a",{attrs:{href:"#可串行化（serializable）"}},[a._v("可串行化（SERIALIZABLE）")])])])])])]),e("p"),a._v(" "),e("h2",{attrs:{id:"隔离级别"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#隔离级别","aria-hidden":"true"}},[a._v("#")]),a._v(" 隔离级别")]),a._v(" "),e("h3",{attrs:{id:"未提交读（read-uncommitted）（写加锁，读不加锁）"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#未提交读（read-uncommitted）（写加锁，读不加锁）","aria-hidden":"true"}},[a._v("#")]),a._v(" 未提交读（READ UNCOMMITTED）（写加锁，读不加锁）")]),a._v(" "),e("p",[a._v("事务中的修改，即使没有提交，对其它事务也是可见的。")]),a._v(" "),e("h3",{attrs:{id:"提交读（read-committed）（写加锁，读加锁）"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#提交读（read-committed）（写加锁，读加锁）","aria-hidden":"true"}},[a._v("#")]),a._v(" 提交读（READ COMMITTED）（写加锁，读加锁）")]),a._v(" "),e("p",[a._v("一个事务只能读取已经提交的事务所做的修改。换句话说，一个事务所做的修改在提交之前对其它事务是不可见的。")]),a._v(" "),e("h3",{attrs:{id:"可重复读（repeatable-read）（写加锁，读加锁）"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#可重复读（repeatable-read）（写加锁，读加锁）","aria-hidden":"true"}},[a._v("#")]),a._v(" 可重复读（REPEATABLE READ）（写加锁，读加锁）")]),a._v(" "),e("p",[a._v("保证在同一个事务中多次读取同样数据的结果是一样的。\n对于读操作加读锁到事务结束，其他事务的更新操作只能等到事务结束之后进行。和提交 读的区别在于，提交读的读操作是加读锁到本次读操作结束，可重复读的锁粒度更大。")]),a._v(" "),e("h3",{attrs:{id:"可串行化（serializable）"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#可串行化（serializable）","aria-hidden":"true"}},[a._v("#")]),a._v(" 可串行化（SERIALIZABLE）")]),a._v(" "),e("p",[a._v("强制事务串行执行。")]),a._v(" "),e("p",[e("strong",[a._v("mysql默认的隔离级别是：可重复读。")])])])}),[],!1,null,null,null);t.default=s.exports}}]);