redis-cache
===========

node.js use redis to cache

#Usage

提供redis的缓冲，执行getCache函数后，将检查是否缓存里的键值是否有该值，如果没有,则执行目标函数，将缓冲函产生的参数，缓存到redis，为第二次查询做准备。

#Quick Start

    git clone git@github.com:youyudehexie/redis-cache.git
    npm install
    
#Example

		var getCache = require('../lib').getCache;
		var cache = require('../lib');

		cache.init();  

		getCache('aa', function(cb){
		    cb(null, '123')

		},function(err, data){
		    console.log(data);
		});

#Public API

##p.init()  

初始化redis客户端,对模块进行简单配置

##p.getCache(key, func, cb)

首先，利用key查询缓存是否存在该值,若存在，则读取，若不存在，执行func，获取结果后存入到该键值的缓存下,并返回查询结果。

+  key: 从缓存里获取值的键值
+  func: 产生键值的函数
+  cb: 回调函数

#TODO

+  支持更多的redisAPI和功能
