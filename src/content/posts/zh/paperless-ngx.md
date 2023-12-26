---
title: Paperless-ngx
date: "2022-04-29"
tags: ["Home Server"]
---

## 使用 linuxserver.io 的镜像

感觉比官方镜像做的好一些，因为用官方的镜像一直报错`password authentication failed for user "paperless"`。。。

[GitHub 仓库](https://github.com/linuxserver/docker-paperless-ngx)

我修改后的 docker-compose 文件：

```yaml
---
version: "2.1"
services:
  paperless-ngx:
    image: lscr.io/linuxserver/paperless-ngx
    container_name: paperless-ngx
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=America/Toronto
      - REDIS_URL= #optional
      - PAPERLESS_URL= #如果你要通过互联网访问的话，设置这个环境变量为你的 URL
      - PAPERLESS_OCR_LANGUAGES=chi-sim # 貌似没作用
      - PAPERLESS_OCR_LANGUAGE=eng+chi_sim

    volumes:
      - config:/config
      - data:/data
    ports:
      - 8010:8000
    restart: unless-stopped
volumes:
  data:
  config:
networks:
  default:
    external:
      name: nginx-proxy-manager_default
```

默认用户名和密码都是`admin`。

### 已知 bug

1. 官方镜像缺`libzbar0`导致文件上传后无法被处理，目前 GitHub 上的`Dockerfile`已经修复但镜像还没更新，可以自己本地构建。

2. `PAPERLESS_OCR_LANGUAGES`环境变量似乎没用，并不会自动安装对应的 ocr 包，需要自己添加到`Dockerfile`中，然后自己构建。

## 使用官方镜像

[官方 docker-compose 文件](https://github.com/paperless-ngx/paperless-ngx/blob/main/docker/compose/docker-compose.portainer.yml)

创建默认超级用户：

上面的 docker-compose 文件里有但我还是要写一下提醒自己。

- 打开容器列表，选择 paperless_webserver_1
- 点'Console'然后'Connect'来打开命令行
- 运行`python3 manage.py createsuperuser`以创建用户
