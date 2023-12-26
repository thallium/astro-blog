---
title: 软件杂项
date: 2022-05-20
categories: [小技巧]
tags: []
---
## 用 cue 文件分割 flac 并标记

```sh
shnsplit -f <cuefile> -t %n-%t -o flac <flacfile>
cuetag <cuefile> *.flac
```
