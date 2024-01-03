---
title: "Cloudflare Tunnel 与 Docker 网络"
date: 2024-01-03T05:07:45.858Z
tags: ["Cloudflare", "Docker"]
summary: ""
keywords: []
---

放假这几天来和妈妈住，也一块把小服务器带了过来，但是家里的路由器设置端口映射需要用一个 App，然后我死活登录不上那个 App，研究一下发现可以利用 Cloudflare Tunnel 将服务器上的应用暴露到公网中（其实最简单的方法应该是 IPv6？但是 Bell 到现在也不支持 IPv6）。其实以前就听说过 Cloudflare Tunnel，这次正好体验一下。

## 安装

在 [Cloudflare One 面板](https://one.dash.cloudflare.com) 里，Access -> Tunnel -> Create a tunnel，输入名字，接下来就到了安装，官方提供了多种安装方式，最简单的应该就是 Docker 了。官方给的 Docker 的命令，但我觉得还是用 Docker Compose 比较方便：

```yaml title="compose.yaml"
version: '3'
services:
  app:
    container_name: coudflare-tunnel
    image: cloudflare/cloudflared:latest
    restart: unless-stopped
    command: tunnel --no-autoupdate run --token <token>

networks:
  default:
    name: front-end
    external: true
```

## Docker 网络

注意到 compose 文件里有一个 front-end 网络，这是一个我们自己创建的 Docker 桥接网络。使用自己创建的桥接网络的一个优点是同一网络中的容器可以用容器名互相访问，因为容器名可以被自动解析到容器的 IP 地址。

## 添加服务

点击创建好的通道 -> Configure -> Public Hostname -> Add a public hostname，Subdomain 和 Domain 根据自己的需求填写即可，Type 选 HTTP，URL 里我们可以直接填`容器名:端口号`（上面提到的）。这样一个服务就配置好了，我们可以通过刚才填的域名来访问该服务了。

## 从桥接网络里访问 Docker Host 网络

如果要添加的服务没有部署在 Docker 容器里，而是直接在操作系统里运行的，我们就需要知道 host 在桥接网络里的 IP 地址了。首先利用 `docker network list` 找到桥接网络的 ID：

```
❯ docker network list
NETWORK ID     NAME                          DRIVER    SCOPE
f3b47c66e2c5   bridge                        bridge    local
c2163ca50a7e   front-end                     bridge    local
96fd97b33b39   host                          host      local
0992cb81726d   none                          null      local
```

然后利用 `ip` 命令找到 host 在桥接网络里的 IP 地址：

```
❯ ip a | grep c2163ca50a7e
35809: br-c2163ca50a7e: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default
    inet 172.20.0.1/16 brd 172.20.255.255 scope global br-c2163ca50a7e
```

可以看到我们要找的 IP 地址为 `172.20.0.1`，所以我们在添加服务填写 URL 时就要写`172.20.0.1:端口号`。
