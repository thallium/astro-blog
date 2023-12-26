---
date: 2019-11-10
title: Extension of Dijkstra
categories: [Alg Notes]
tags: 
- Shortest Path 
- Graph Theory
math: true
published: true 
---
Just as a reminder with simple explanation.


# Path Reconstruction

Use `vector<int> pre[N]` to record the previous vertices of all the vertices in the shortest path(s). When updating the distance to vertex $v$, if the current distance is better, discard the previous record and let the current vertex be the previous vertex of $v$. If the distance is the same, just add the current vertex to `pre[v]`.

```cpp
for(pii it:E[u]){
    ll v=it.S,cost=it.F;
    if(!vis[v]&&dis[v]>dis[u]+cost){
        dis[v]=dis[u]+cost;
        pre[v].clear();
        pre[v].pb({cost,u});
        q.push({dis[v],v});
    }else if(dis[v]==dis[u]+cost)
        pre[v].pb({cost,u});
}
```

# Number of shortest paths

Similar to recording the path, if the distance is better then let the number be one. If the same, plus 1.

```cpp
if(!vis[v]&&dis[u]+cost<dis[v]){
    cnt[v]=1;
    dis[v]=dis[u]+cost;
}else if(dis[u]+cost==dis[v]){
    cnt[v]++;
}
```
