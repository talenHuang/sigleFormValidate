(function (win, document) {


    var sigleFormValidate = function () {


        // this.type = {
        //
        //     "req": this.requiredValidate,//必填项
        //     "int": this.intValidate,//数字
        //     "email": function () {
        //         return false
        //     },//邮箱格式
        //     "phone": function () {
        //         return false
        //     },//手机格式
        //     "reg": function () {
        //         return false
        //     },//正则匹配
        //
        // }

        this.type = {

            "int": {defaultMsg:"该项只能为数字",reg:/^\d+$/},//数字
            "reg": {defaultMsg:"手机号不正确",reg:/^1[3-9][0-9]{9}$/},//数字
        }

        this.all_doms = null;//作用域下的所有节点

        this.scope = document;

        this.counter = 0;//验证错误计数

        this.errorArray = [];//错误展示数组


    }

    sigleFormValidate.prototype = {

        buildRelatedMethods:function () {

            var $this = this;

            console.log(Object.keys($this.type));

            Object.keys($this.type).forEach(function (val) {

                //  构建各类验证函数
                $this[val+"Validate"] = new Function('e','type','var $target = this;' +
                    '                var msg = e.getAttribute("s-"+type+"-msg") || $target.type[type].defaultMsg;\n' +
                    '                    if ($target.type[type].reg.test(e.value)) {\n' +
                    '                        $target.removeErrorMsg(e, type)\n' +
                    '                    } else {\n' +
                    '                        $target.appendErrorMsg(e, msg, type);\n' +
                    '                }')

        });

        },

        init: function (scope, appendErrorMsg) {

            var $this = this;
            var scope = scope || "body";

            $this.scope = scope;

            $this.buildRelatedMethods();



            console.log($this.reqValidate);

            if (appendErrorMsg !== null && typeof appendErrorMsg === "function") {


                $this.appendErrorMsg = appendErrorMsg;

            }

            $this.all_doms = document.querySelectorAll(scope + " input");

            var aa = document.querySelector("#test1");


            aa.addEventListener("change", function (e) {


                $this.sortValidate(e.target);


            });


        },


        sortValidate: function (ele) {

            var $this = this;


            var attrs = ele.attributes;


            if(ele.value === ""){

                $this.removeAllErrorMsg(ele);
                $this.reqValidate(ele);

            }else {


                for (var j = 0, len2 = attrs.length; j < len2; j++) {

                    if (/^s-\w+$/.test(attrs[j].name)) {

                        var splice_array = (attrs[j].name.split("")).splice(2);
                        var splice_str = splice_array.join("");

                        debugger;
                        //运行对应的验证函数


                        $this[splice_str+"Validate"].call($this, ele,splice_str);


                    }


                }

            }




        },

        reqValidate: function (e) {

            var $this = this;

            var required_msg = e.getAttribute("s-req-msg") || "该项不能为空";

            if (e.value === "") {


                $this.appendErrorMsg(e, required_msg, 'req');


            } else {

                $this.removeErrorMsg(e, 'req');


            }


        },



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

        removeAllErrorMsg: function (e, flag) {

            var $this = this;

            var nodeArray = $this.findNextErrorElement(e);

            if (nodeArray && nodeArray.length) {


                nodeArray.forEach(function (v) {

                    //错误原因相同才删
                    if (flag && v.dataset.flag === flag) {

                        v.remove();


                    }else {

                        v.remove();


                    }

                })

            }

        },

        removeErrorMsg: function (e, flag) {

            var $this = this, nodeArray;

            debugger;
            $this.errorArray = [];

            nodeArray = $this.findNextErrorElement(e);

            nodeArray.forEach(function (v) {

                if ( v.dataset.flag === flag) {

                    v.remove();


                }
            })


        },

        findNextErrorElement: function (e) {


            var $this = this;


            if (e.nextElementSibling && e.nextElementSibling.classList.contains("s-err-msg")) {


                $this.errorArray.push(e.nextElementSibling);

                return $this.findNextErrorElement(e.nextElementSibling);


            } else {

                return $this.errorArray;


            }


        },

        validate: function () {

            var $this = this;
            var reqNodes = document.querySelector($this.scope).querySelectorAll("input[s-req]");

            console.log(reqNodes);

            reqNodes.forEach(function (v) {

                $this.sortValidate(v);

            })

            $this.counter = document.querySelector($this.scope).getElementsByClassName("s-err-msg").length;

            return $this.counter === 0 ? true : false;


        }


    }


    win.Sfv = sigleFormValidate;


})(window, document)