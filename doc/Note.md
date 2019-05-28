## 数据模型元信息
- __tablename__ 表名
- __abstract__  是否抽象
    - 抽象模型适合被继承
    - 抽象模型不会产生自己的映射表
    
    
## AOP
- 面向切面编程
- 在不修改原有代码的情况下，实现对逻辑的动态控制
- 在django中叫中间件
    - 切点
        - 哪个位置允许切入
    - 切面
        - 切开之后有哪些数据
    - django内置
        - process_request
        - process_view
        - process_request_response
        - process_template_response
        - process_exception
- flask中也有
    - 钩子
    - 黑话（外挂）
    - 内置很多
        - 蓝图
        - app和蓝图都有
    - before_request
        - @app.before_request
            - @blue.before_request
            - @blue.before_app_request
            - @blue.before_app_first_request
            
    - error_handler
        - 错误处理
        - 异常捕获
        - 蓝图中的只能捕获本蓝图发生的异常
        - app的可以处理全局
        
    - after_request
    - teardown_request
    
- 使用钩子
    - 日志统计
    - 黑白名单
    - 反爬
    - 权限控制
    
    
### RESTful   REST
- 前后端分离
- 前端概指各种客户端
- 设计接口
    - 接口支持各种请求
        - GET
        - POST
        - DELETE
        - PUT
        - PATCH
- 添加对应状态码



#### 前端学习
- VUE
    - 自己学习
    - MVVM
        - MVC
        - MVP
        - MVVM
        
        
#### homework
- 创建学生
- 修改学生信息
   
