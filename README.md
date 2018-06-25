# 单表单验证（sigleFormValidate）
随着ajax异步传输的兴起，form表单的提交已逐渐使用ajax异步提交，而在使用其他表单验证过程中，<br>
form标签依然存在，而提交也使用的`<input type='submit'>`，这就很容易造成默认事件的冲突。<br>
为此，个人弄了一个简单的表单验证，样式和配置都很灵活，适合小项目应用。（代码体积也是非常小，仅3.18k）

# 开始（start）
`html`引入js文件
````javascript
<script src="sigleFormValidate.min.js"></script>
````
# 初始化（init）
````javascript

<script>

    var sfv = new Sfv();//实例化对象

    //if you want to add other validate options,you can add in  between instance and init function!
    //如果您想添加自己的检验配置，直接配置在custom属性中,特别注意的是：配置必须在init初始化方法之前！
    //    for example
    //    例子（配置详情请转下一节）
    sfv.custom = {
        
         "int": {defaultMsg: "该项只能为数字", reg: /^\d+$/},//数字
        
    }

    sfv.init("#formList");

    document.querySelector("#id").addEventListener("click", function () {

//sfv.validate()方法返回一个Booleans，用于判断当前表单是否已经验证通过，验证通过后直接使用ajax传输数据。
        if (sfv.validate()) {

            console.log("you can submit!")

        }

    })


</script>

````

# 配置（options）
`sfv.custom`是程序的配置属性，为一个对象。<br>
````object
      {"int": {"defaultMsg": "该项只能为数字", "reg": /^\d+$/}}//数字
````
这项配置的主要意思是：<br>
* "int":表示需要验证的内容，您可以自定义名称，当然，这里定义的名称，在标签属性上就需要添加`s-`相同的名称，如：
````html
  <input type="text" s-int>
````
* "defaultMsg":表示默认提示内容，您也可以在标签上自定义
````html
  <input type="text" s-int s-int-msg="该项只能为数字">
````
* "reg": 表示需要验证的正则表达式，需要自己配置，特别注意：需要写成 /^\d$/ 这种形式。

# 不要脸的话（tips）
插件集成不摇碧莲的特点，所以样式需要你自己来控制，毕竟每个人的审美不同，项目不懂，肯定样式也不同（当然，主要是因为我比较懒-_-*）
<br>
您可以直接通过控制`s-err-msg`class来控制样式！
还有个秘密就是￣へ￣，其实,源码真的非常简单，要添加其他验证方法完全ok！


# 最后的最后（last）
如果有问题，欢迎issue指正。<br>
如果有幸帮到您，请赏我个小星星!
