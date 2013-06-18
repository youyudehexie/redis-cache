redis-cache
===========

node.js use redis to cache

#Usage
===========

提供redis的缓冲，执行getCache函数后，将检查是否缓存里的键值是否有该值，如果没有,则执行目标函数，将缓冲函产生的参数，缓存到redis，为第二次查询做准备。
PS:目前组件里面没有实现key的生效时间，需要手动清除，后面做改进

#Quick Start
===========

    git clone git@github.com:youyudehexie/redis-cache.git
    npm install
    
#Example
===========

    getCache('aa', function(cb){
        cb(null, '123');
    },function(err, data){
        console.log(data);
    });


#
