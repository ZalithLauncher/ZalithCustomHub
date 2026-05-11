# Monochrome Launcher 中文版

简洁、清晰、以实用入口为主的 ZL 启动器中文首页。

...card-start title="欢迎使用 ZL 启动器" shape=24dp contentPadding=(20, 16)
这里可以快速进入官网与下载页，也可以顺手查看 `Minecraft Java Edition` 的正式版更新和快照版动态。

...row-start horizontal=spacedBy(12) vertical=Center
...button text="访问官网" event="url {https://www.zalithlauncher.cn/}"
...button-outlined text="下载 ZL2" event="url {https://www.zalithlauncher.cn/zl2-download.html}"
...row-end
...card-end

...card-start title="Minecraft Java 更新" shape=24dp contentPadding=(20, 16)

...row-start horizontal=spacedBy(16) vertical=Top

...column-start width=48% vertical=spacedBy(12) horizontal=Start
...image url="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=blocky%20fantasy%20landscape%2C%20peaceful%20village%20under%20golden%20sunrise%2C%20cinematic%20voxel%20scene%2C%20stable%20release%20theme%2C%20clean%20composition%2C%20soft%20clouds%2C%20no%20text%2C%20high%20detail&image_size=landscape_16_9" width=100% shape=18dp
**正式版更新**

面向日常游玩的稳定版本，适合优先体验已经发布的正式内容与修复更新。

...button-filled-tonal text="查看正式版" event="url {https://www.minecraft.net/en-us/article/minecraft-java-edition-26-1}"
...column-end

...column-start width=48% vertical=spacedBy(12) horizontal=Start
...image url="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=experimental%20blocky%20cavern%20with%20glowing%20springs%2C%20dramatic%20lighting%2C%20snapshot%20testing%20theme%2C%20cinematic%20voxel%20scene%2C%20futuristic%20details%2C%20no%20text%2C%20high%20detail&image_size=landscape_16_9" width=100% shape=18dp
**快照版更新**

抢先了解测试中的新特性与改动，适合关注 Java 版前沿内容和实验性更新。

...button-filled-tonal text="查看快照版" event="url {https://www.minecraft.net/en-us/article/minecraft-26-2-snapshot-6}"
...column-end

...row-end

...card-end
