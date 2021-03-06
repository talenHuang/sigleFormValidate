(function (win, document) {


    var sigleFormValidate = function () {

        this.custom = {},
            this.type = {},
            this.defaultType = {

                "int": {defaultMsg: "该项只能为数字", reg: /^\d+$/},//数字
                "phone": {defaultMsg: "手机号不正确", reg: /^1[3-9][0-9]{9}$/},//手机
            }

        this.scope = document;

        this.counter = 0;//验证错误计数

        this.errorArray = [];//错误展示数组


    }

    sigleFormValidate.prototype = {

        //自动创建关联方法
        buildRelatedMethods: function () {

            var $this = this;


            Object.keys($this.type).forEach(function (val) {

                //  构建各类验证函数
                $this[val + "Validate"] = new Function('e', 'type', 'var $target = this;' +
                    '                var msg = e.getAttribute("s-"+type+"-msg") || $target.type[type].defaultMsg;\n' +
                    '                    if ($target.type[type].reg.test(e.value)) {\n' +
                    '                        $target.removeErrorMsg(e, type)\n' +
                    '                    } else {\n' +
                    '                        $target.appendErrorMsg(e, msg, type);\n' +
                    '                }')

            });

        },

        //初始化
        init: function (scope, appendErrorMsg) {

            var $this = this;
            var scope = scope || "body";

            $this.type = Object.assign($this.defaultType, $this.custom);


            $this.scope = scope;

            $this.buildRelatedMethods();


            if (appendErrorMsg !== null && typeof appendErrorMsg === "function") {


                $this.appendErrorMsg = appendErrorMsg;

            }



            var aa = document.querySelector(scope);


            aa.addEventListener("change", function (e) {


                $this.sortValidate(e.target);


            });

            aa.addEventListener("keyup", function (e) {


                $this.sortValidate(e.target);


            });

            aa.addEventListener("blur", function (e) {


                $this.sortValidate(e.target);


            });


        },

        //分类验证
        sortValidate: function (ele) {


            var $this = this;


            var attrs = ele.attributes;


            if (ele.value === "") {

                $this.removeAllErrorMsg(ele);

                if (ele.getAttribute("s-req") !== null) {

                    $this.reqValidate(ele);

                }


            } else {


                for (var j = 0, len2 = attrs.length; j < len2; j++) {

                    if (/^s-\w+$/.test(attrs[j].name)) {

                        var splice_array = (attrs[j].name.split("")).splice(2);
                        var splice_str = splice_array.join("");

                        //运行对应的验证函数


                        $this[splice_str + "Validate"].call($this, ele, splice_str);


                    }


                }

            }


        },

        //必填项验证方法
        reqValidate: function (e) {

            var $this = this;

            var required_msg = e.getAttribute("s-req-msg") || "该项不能为空";

            if (e.value === "" && e.getAttribute("s-req") !== null) {


                $this.appendErrorMsg(e, required_msg, 'req');


            } else {

                $this.removeErrorMsg(e, 'req');


            }


        },


        //最大值验证方法
        maxValidate: function (e) {

            var num = e.getAttribute("s-max");
            var $this = this;
            var required_msg = e.getAttribute("s-max-msg") || "该项最大值不超过" + num + "个字符";


            if (e.value.length > num) {

                $this.appendErrorMsg(e, required_msg, 'max');

            } else {

                $this.removeErrorMsg(e, 'max');


            }


        },


        //最小值验证方法
        minValidate: function (e) {

            var num = e.getAttribute("s-min");
            var $this = this;
            var required_msg = e.getAttribute("s-min-msg") || "该项不低于" + num + "个字符";


            if (e.value.length < num) {

                $this.appendErrorMsg(e, required_msg, 'max');

            } else {

                $this.removeErrorMsg(e, 'max');


            }


        },

        //比较表单验证方法
        compareValidate: function (e) {

            var elem = e.getAttribute("s-compare");
            var $this = this;
            var required_msg = e.getAttribute("s-compare-msg") || "两项比较不一致";
            var dom = document.querySelector(elem);

            if (e.value !== dom.value) {

                $this.appendErrorMsg(e, required_msg, 'max');

            } else {

                $this.removeErrorMsg(e, 'max');


            }


        },

        //添加错误信息
        appendErrorMsg: function (e, msg, flag) {

            var $this = this;
            var span = document.createElement("span");
            span.style.color = "red";
            span.style.display = "block";
            span.style.fontSize = "12px";
            span.className = "s-err-msg";
            span.textContent = msg;
            span.setAttribute("data-flag", flag);


            $this.removeAllErrorMsg(e, flag);

            e.insertAdjacentElement("afterend", span);


        },

        //移除所有信息
        removeAllErrorMsg: function (e, flag) {

            var $this = this;

            var nodeArray = $this.findNextErrorElement(e);

            if (nodeArray && nodeArray.length) {


                nodeArray.forEach(function (v) {

                    //错误原因相同才删

                    v.remove();

                });

                $this.errorArray = [];


            }
            ;


        },

        //移除错误信息
        removeErrorMsg: function (e, flag) {

            var $this = this;

            var nodeArray = $this.findNextErrorElement(e);

            nodeArray.forEach(function (v) {

                if (v.dataset.flag === flag) {

                    v.remove();

                }
            });

            $this.errorArray = [];


        },

        //找寻下一个错误节点
        findNextErrorElement: function (e) {

            var $this = this;


            if (e.nextElementSibling && e.nextElementSibling.classList.contains("s-err-msg")) {


                $this.errorArray.push(e.nextElementSibling);

                return $this.findNextErrorElement(e.nextElementSibling);


            } else {


                return $this.errorArray;


            }


        },

        //验证方法
        validate: function () {

            var $this = this;
            var reqNodes = document.querySelector($this.scope).querySelectorAll("input[s-req],select[s-req],textarea[s-req]");


            reqNodes.forEach(function (v) {

                $this.sortValidate(v);

            })

            $this.counter = document.querySelector($this.scope).getElementsByClassName("s-err-msg").length;

            return $this.counter === 0 ? true : false;


        }


    }


    win.Sfv = sigleFormValidate;


})(window, document)