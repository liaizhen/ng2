# 英雄编辑器
## 主要功能
### dash页面：
+ 显示四个英雄按钮，点击可以跳转到英雄的详情中去
+ 搜索功能，输入对应的字符串出现关键词，点击关键词可以跳转到对应的英雄详情区
### hero页面：
+ 用来显示英雄列表
+ 添加新英雄的功能
+ 点击英雄列表可以跳转到英雄详情区
+ 点击英雄列表末尾的按钮可以删除对应的英雄
### 英雄详情区页面：
+ 显示英雄的详细信息
+ 可以编辑英雄的信息，并且可将编辑的后的英雄信息进行保存并更新
+ 可以回退到上一级路由
### 组件详情
#### app:主要是用来进行dash与heroes页面的跳转
+ app-routing:主要进行路由的配置，除了配置dash与heroes,还配置了detail/:id的详情页的路由以及重定向到dash的路由
#### dash：用来显示四个英雄按钮，每点击单个英雄按钮可以跳转到英雄详情区
+ 显示四个英雄按钮
    - 定义一个getHeroes方法，该方法同样也是去调用服务中的getHeroes方法
    - 调用then方法，然后拿到数据，并截取数组中的前面四位英雄，并用*ngFor来进行循环生产
    - 为了达到跳转的目的，*ngFor循环的是a标签，通过routerLink来设置路由和路由参数
#### hero：用来显示英雄列表的，添加新的英雄，删除英雄以及通过点击按钮跳转到详情页面中去
+ 显示英雄列表
    - 定义一个heroService服务，服务中定义了getHeroes方法，反应英雄数组
    - 在服务中注入http模块并调用其get方法
    - 通过工具toPromise,调用toPromise方法，将请求的结果返回值处理成一个promise对象
    - 调用promise中的then方法，并将返回的结果调用json()方法，将结果json格式化
    - 拿到结果.data属性,这个data保存的就是我要的heroes数组
    - 显示英雄列表：在hero.component.ts文件中定义getHeroes方法，该方法通过调用heroService中的getHeroes方法，然后通过服务中返回的promise对象中的then方法拿到结果，并将结果赋值给定义的heroes变量；最后通过*ngFor来生成列表
+ 添加新的英雄
    - 服务中定义的create方法，是带有字符串参数的方法，返回单个英雄
    - 通过调用http中的post的方法来将新增的英雄提交到数据库中
    ```
     post(this.heroesUrl,JSON.stringify({name:name}),{headers:this.headers})

    ```
    - 调用toPromise方法，变成promise对象
    - 调用then方法，接着调用json方法，然后.data中存放的就是我们新增的英雄数据
    - 组件中定义add方法，该方法带有一个name的参数
    - 这个name其实就是我们输入的字符串，所以需要去除字符串的前后空格
    - 判断是否存在name，如果不存在就return，否则就调用服务在的create方法，然后调用then方法，将返回的值push到heroes数组中，且将之前选中的英雄selected属性清空。
+ 删除英雄
    - 服务中定义了delete方法，这个方法中带有id的参数，，没有返回值
    - 调用delete方法，通过对于的id值来进行删除
    - 调用then方法，然后将结果设为null
    - 组件中定义了delete方法，并带有一个hero的参数
    - 调用服务中的delete方法
    - 调用then方法，并通过heroes数组调用filter方法，过滤条件数组中的值与被单击的英雄相等，返回一个null
    - 如果点击的被选中，其selected属性也清空
+ 点击跳转到详情中
    - 定义一个gotoDetail方法,该方法只要是将路由切换到detail:/id那个路由中，这里通过调用router模块中的navigate方法
#### hero-detail:显示英雄详情，修改英雄保存并更新，回退到上一级目录
+ 显示英雄
    - heroService服务中定义getHero方法，带一个id
    参数
    - 通过调用http中的get方法，调用toPromise方法，转换成promise对象
    - 调用then方法，之后调用json方法，.data中存储的就是要显示的英雄数据
    - 引入ActivatedRoute服务，然后该服务的可观察对象params中提取id参数
    - switchMap运算符将参数映射到一个可观察对象中，这个可观察的对象就是其实就是通过调用heroService服务中的getHero方法
    - 之后调用subscribe方法，将拿到的结果赋值给hero并显示
+ 修改保存并更新英雄
    - heroService服务中定义update方法,是带有hero参数的方法
    - 调用http中的put方法，将数据同步到数据库中
    ```
    put(heroUrl,JSON.stringify(hero),{headers: this.headers})

    ```
    - 调用toPromise方法
    - 调用then方法,然后将修改的hero值返回出去
    - 组件在定义了一个save方法，调用服务中heroService中的update方法
    - 调用then方法，并调用goBack方法返回上一级目录
+ 返回上一级目录
    - 定义一个goBack方法，这个方法其实是引入location服务，该服务中有back方法
#### hero-search：输入对应的字符可以显示关联的列表，点击列表可以调转到详情区
+ 输入字符显示搜索结果：
    - HeroSearchService的search方法，带有字符串的参数
    - 调用http的get方法
    - 调用map方法，并将结果返回
    - 组件中绑定keyup事件，定义了search方法，带有字符串的参数
    - 创建了 new Subject<string>()观察事件流中的生产者实例searchTerms
    - 当输入新的字符串，searchTerms会调用next方法将字符串放入该主题观察的事件流中
    - 调用debounceTime方法，等待300ms后才开始处理这个字符串
    - 调用distinctUntilChanged方法，去掉输入相同字符串的情况
    - 调用switchMap计算符，输入字符串之后，调用HeroSearchService的search方法，如果有值就赋值给term，否则就返回一个空数组
    - 将term值赋值给heroes数组
+ 点击搜索结果跳转到详情页
    - 定义一个gotoDetail方法，带有hero的参数
    - 定义一个路由链接地址link = ['/detail',hero.id]
    - 调用router的navigate方法