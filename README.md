Gulp前端项目构建
==============

## Gulp介绍
Gulp基于Node.js的前端构建工具。它通过Gulp的插件可以实现前端代码的编译（sass、less）、压缩、测试，图片的压缩，浏览器自动刷新等。


## NodeJS安装
Gulp基于NodeJS实现，在安装Gulp之前，要先在本地安装NodeJS。前往 [NodeJS官网](http://nodejs.org/download/) 下载对应操作系统版本的NodeJS。

安装完成后，测试是否安装成功。在控制台输入：

	node -v

控制台将打印：v0.10.35，再输入：

	npm -v

输出：1.4.28。

NPM的全称是Node Package Manager，是一个NodeJS包管理和分发工具，已经成为了非官方的发布Node模块（包）的标准。了解更多，请参考 [npmjs](https://www.npmjs.com/) 。


## Gulp安装
首先，打开终端，全局安装Gulp：

	npm install gulp -g

安装完成后，查看安装的Gulp版本：
	
	gulp -v

显示：

	CLI version 3.8.10
	Local version 3.8.10

到此，Gulp安装成功。


## 项目环境部署
通过NPM安装开发包和项目依赖文件

	npm install

NodeJS会根据package.json文件中的依赖关系自动安装相关插件，在根目录下生成node_modules文件夹，其中存放插件模块，可忽略。


## 项目编译
Gulp编译以任务流的方式执行，各个任务(task)已经在gulpfile.js中定义，相关的插件。

终端进入项目根目录，即：CRM-mobile-front，输入：

	gulp

回车后会自动执行项目编译。

任务完成时，在屏幕上会弹出信息提示框，比如：

	Scss task complete

该编译任务会执行以下一些任务：

- 合并、编译sass并自动压缩

	将sass文件编译成css文件并自动压缩。

- 图片base64转化

	将css中引入的背景图片自动转化为base64代码，减少html请求数。

- js代码检验、合并

	检验js代码的合法性和健壮性，合并引入js文件。

- 监听文件

	监听页面文件的变动，自动执行编译任务。

- 自动刷新页面

	当文件修改时，自动编译并刷新页面。

启动编译时，根目录下会生成.sass-cache文件夹，是sass编译的缓存文件，可忽略。同时，build目录下也会生成对应项目的资源。

注意：

- 图片base64转化，允许最大图片为15KB，超出图片，不会进行转化。

- js执行出错时，编译任务会自动停止，修改js，重启命令即可。


## 项目提交
编译完成后，进行项目提交，提交时包括project目录和build目录。

根目录下的.sass-cache和node_modules两个文件夹，是项目非相关文件，不需要提交。为避免干扰项目开发，.gitignore文件中已经添加了对这两个文件夹的默认忽略。


## Gulp进阶：
Gulp任务执行—— [API解读](https://github.com/gulpjs/gulp/blob/master/docs/API.md)

package.json详细请参考—— [官方文档](https://docs.npmjs.com/files/package.json) [中文文档](https://github.com/ericdum/mujiang.info/issues/6)