---
title: "Setting up KMonad on macOS"
date: 2024-07-04T23:35:36.378Z
tags: ["macOS", "KMonad"]
summary: ""
keywords: []
---

## Installation

### Installing Stack

```sh
curl -sSL https://get.haskellstack.org/ | sh
```


### Installing the dext

```sh
git clone --recursive https://github.com/kmonad/kmonad.git
cd kmonad/
open c_src/mac/Karabiner-DriverKit-VirtualHIDDevice/dist/Karabiner-DriverKit-VirtualHIDDevice-3.1.0.pkg
```

After installing the package:


```sh
/Applications/.Karabiner-VirtualHIDDevice-Manager.app/Contents/MacOS/Karabiner-VirtualHIDDevice-Manager activate
```

### Building and installing KMonad

```sh
stack build --flag kmonad:dext --extra-include-dirs=c_src/mac/Karabiner-DriverKit-VirtualHIDDevice/include/pqrs/karabiner/driverkit:c_src/mac/Karabiner-DriverKit-VirtualHIDDevice/src/Client/vendor/include
```

KMonad will be installed at `~/.local/bin/`.

## Launch on Startup

Remember to change the path of KMonad and config file.

```xml title="/Library/LaunchDaemons/local.kmonad.plist"
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>Label</key>
    <string>local.kmonad</string>
    <key>Program</key>
    <string>/Users/[user]/.local/bin/kmonad</string>
    <key>ProgramArguments</key>
    <array>
      <string>/Users/[user]/.local/bin/kmonad</string>
      <string>/Users/[user]/.config/config.kbd</string>
    </array>
    <key>RunAtLoad</key>
    <true />
    <key>StandardOutPath</key>
    <string>/tmp/kmonad.stdout</string>
    <key>StandardErrorPath</key>
    <string>/tmp/kmonad.stderr</string>
  </dict>
</plist>
```

macOS should be able to load the start KMonad on startup.
