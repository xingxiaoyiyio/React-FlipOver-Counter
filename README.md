# React-FlipOver-Counter
翻页计数 react组件

基于react的翻页计数组件

![img](https://github.com/xingxiaoyiyio/React-FlipOver-Counter/blob/master/src/images/counter.gif)

### 1、npm install
安装项目相关包

### 2、npm start
启动项目

### 3、使用方法

#####  a.页面中引入组件
import FlipOverCounter from './flipOver/FlipOverCounter'

#####  b.传入参数
```javascript
   <FlipOverCounter
            min={min}    //翻页的起点
            max={max}    //翻页的终点
            time={time}  //翻完起点到终点所需要用的时间 以毫秒计算 如：1分钟应传入60000
            len={len}    //页数
    />
```

#####  d.翻页速度
组件会计算max-min的值在传入的time内是否能够一页页翻完，如果不能则会快速跳页翻
    
#####  e.组件样式
注意，flipOverCounter.less写了组件的基础样式，实际项目中需要自己调整页面和组件样式
