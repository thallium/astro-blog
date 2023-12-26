---
title: 树上路径技巧
date: "2022-04-29"
categories: [算法笔记]
tags: []
---

## 求 u 到 v 路径的第二个节点

[出处](https://codeforces.com/blog/entry/71567)

如果 v 不在 u 的子树里，显然第二个节点是 u 的父亲，当 v 在 u 的子树里时，有以下两种做法：

1. 以 dfs 前序遍历的顺序建 st 表，比较时取深度较小的点，如果深度相同则取 dfs 序较大的点，第二个节点即为区间$[pre_u + 1, pre_v]$的值。
2. 第二个节点是$pre$值小于等于$pre_v$的节点中$pre$值最大的节点，用二分即可。代码：
```cpp
int next_vertex_in_path(int u, int v) {
    int l = 0, r = (int)size(g[u]) - 1;
    while (l < r) {
        int mid = (l + r) / 2;
        if (pre[g[u][mid]] <= pre[v]) {
            l = mid;
        } else {
            r = mid - 1;
        }
    }
    return g[u][l];
}
```

## O(1) 询问路径最大值

构造 Kruskal 重构树，路径中权值最大的边即为重构树中 u 与 v 的 lca 所代表的边。
