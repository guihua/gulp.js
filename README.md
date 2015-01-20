Gulp前端项目构建
==============

##Gulp介绍
Gulp基于Node.js的前端构建工具。它通过Gulp的插件可以实现前端代码的编译（sass、less）、压缩、测试，图片的压缩，浏览器自动刷新等。

###Gulp安装
首先，打开终端，全局安装Gulp：

	npm install gulp -g

安装完成后，查看安装的Gulp版本：
	
	gulp -v

显示：

	CLI version 3.8.10
	Local version 3.8.10

到此，Gulp安装成功。

###项目环境部署
1.进入项目所在目录

	cd projectName

2.安装开发包和项目依赖文件

	npm install

NodeJS会根据package.json文件中的依赖关系自动安装相关插件，并部署到项目目录。

###项目编译
在项目目录下，输入：

	gulp

回车后会自动执行项目编译，相关任务已经在gulpfile.js中进行定义，修改项目目录下的文件时，SCSS和Javascript会自动执行编译、压缩、转义。

###项目提交
安装完成后，项目路径下会生成.sass-cache和node_modules两个文件夹，前者是SASS编译的缓存文件，后者则包含了安装的插件。

项目提交时，这两个文件夹均不需要提交，忽略即可。

在项目root目录下，找到并修改.ignore文件，增加如下代码：

	.sass-cache
	node_modules

提交时，.sass-cache和node_modules两个文件夹就会自动忽略。