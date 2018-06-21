# 单表单验证（sigleFormValidate）
随着ajax异步传输的兴起，form表单的提交已逐渐使用ajax异步提交，而在使用其他表单验证过程中，<br>
form标签依然存在，而提交也使用的`<input type='submit'>`，这就很容易造成默认事件的冲突。<br>
为此，个人弄了一个简单的表单验证，样式和配置都很灵活，适合小项目应用。（代码体积也是非常小，仅3.18k）

#开始（start）
`html`引入js文件
````javascript
<script src="sigleFormValidate.min.js"></script>
````
#初始化（init）
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
````json
      {"int": {defaultMsg: "该项只能为数字", reg: /^\d+$/}}//数字
````
这项配置的主要意思是：<br>
* "int":表示需要验证的内容，您可以自定义名称，当然，这里定义的名称，在标签属性上就需要添加`s-`相同的名称，如：
````html
  <input type="text" s-int>
````
* "defaultMsg":表示默认提示

# 最后的最后（last）
如果有问题，欢迎issue指正。<br>
如果有幸帮到您，请赏我个小星星!
