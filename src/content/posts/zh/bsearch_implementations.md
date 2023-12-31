---
title: "二分搜索的两种写法"
date: 2021-05-22T22:58:56-04:00
categories: [算法笔记]
tags: [二分]
---

背景：今天做了个题，用自己平常的二分写法很不方便，第一次碰到这种情况，为了防止后面再碰到类似的情况，决定记录一下二分的两种常见写法。

根据搜索的条件，整个搜索区间可以被划分为两个区间，其中一个为符合条件的区间，我们想要的值就是最接近分界线的那个数：如果前半部分符合条件，那我们要找的是其中最大的那个值，反之则是后半部分中最小的那个值。这两种不同的情况会在写法有所不同。

写法一：

循环条件为`while (l <= r)`，优点是不论哪部分符合条件，边界变化都是`l = mid + 1`或`r = mid - 1`，终止时，$r=l-1$，也就是 r 是前半部分的最大值，l 和后半部分的最小值，根据情况取`l`或者`r`。

次方法缺点是不能同时进行两个二分搜索，不适合在某些二分的交互题里使用。

---
写法二：

循环终止条件为`while (l < r)`但中点的取法和边界的变化两种情况不一样：

如果前半部分符合条件：

搜索区间为$(l, r]$
```cpp
while (l < r) {
    int mid = (l + r + 1) / 2;
    if (ok(mid)) l = mid;
    else r = mid - 1;
}
```
<br/>
如果后半部分符合条件：

搜索区间为$[l, r)$
```cpp
while (l < r) {
    int mid = (l + r) / 2;
    if (ok(mid)) r = mid;
    else l = mid + 1;
}
```

总结下来就是：
- 中点偏向分界线
- 符合条件的话，边界移动到中点，否则要 +1 或者 -1
- 半开半闭区间是为了考虑到没有符合条件的数的情况，此时边界会移动到开区间那头，类似于`std::lower_bound(a.begin(), a.end(),  x)`找不到的话会返回`a.end()`。

优点是可以同时进行两个二分，当其中一个区间收敛之后就不会再变化了。而且这种写法比较符合直觉，有些二分交互题中我就会不由自主的换成这种写法（虽然以前并没有仔细研究过）。缺点就是细节稍多，一是取中点的写法，二是注意开区间。
