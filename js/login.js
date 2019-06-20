$(function() {
	let code; //在全局 定义验证码

	//创建验证码函数
	function createCode() {
		code = "";
		var codeLength = 4; //验证码的长度
		var selectChar = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
			'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'); //所有候选组成验证码的字符，当然也可以用中文的
		for(var i = 0; i < codeLength; i++) {
			var charIndex = Math.floor(Math.random() * 36);
			code += selectChar[charIndex];
		}
		// 设置验证码的显示样式，并显示
		document.getElementById("discode").style.fontFamily = "Fixedsys"; //设置字体
		document.getElementById("discode").style.letterSpacing = "5px"; //字体间距
		document.getElementById("discode").style.color = "#0ab000"; //字体颜色
		document.getElementById("discode").innerHTML = code; // 显示
	}
	createCode();

	//验证验证码输入是否正确
	function but() {
		var val1 = document.getElementById("t1").value;
		var val2 = code;
		//若验证码输入错误提示
		if(val1 != val2) {
			alert("验证码错误!");
			document.getElementById('t1').value = "";
		}
	}

	function showTab(eq) {
		$(".box>.loginBox").css({
			"display": "none"
		});
		$(".box>.loginBox").eq(eq).css({
			"display": "block"
		});
	}

	//点击注册、登录、微信页面切换
	$(document).on("click", ".chatBtn", function() {
		let eq = $(this)[0].attributes.value.value;
		showTab(eq);
	})

	//注册表单验证
	//验证用户名
	function checkUser() {
		var user = $(".user").value; //获取用户名输入框的值
		var userId = $("user_prompt"); //获取用户名提示的元素
		var reg = /^[a-zA-Z][a-zA-Z0-9]{3,15}$/;
		if(!reg.test(user)) {
			userId.innerHTML = "用户名不符合要求";
			return false;
		}
		return true;
	}

	function error(i, sentence, show) {
		if(show) {
			$(".infor>div").eq(i).append(`<div class="error"><img src="img/login/error.png">${sentence}</div>`);
		} else {
			$(".infor>div .error").html("");
		}
	}

	function succeed() {
		error("", "", false);
		success = true;
	}

	$(document).on("click", "#registe", function() {
		let success = true;
		//用户名验证
		//用户名正则，6到18位（字母，数字，下划线）
		let user = /^[a-zA-Z][a-zA-Z0-9_]{5,18}$/;
		//输出 true
		if(!user.test($(".user").val())) {
			error(0, "请输入正确的用户名", true);
			success = false;
		} else {
			succeed();
		}

		//密码验证
		let pwd = /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z~!@#$%^&*]{6,16}$/;
		if(!pwd.test($(".pwd").val())) {
			error(1, "请输入正确的密码", true);
			success = false;
		} else {
			succeed();
		}

		//确认密码
		if($(".pwdAffirm").val() != $(".pwd").val()) {
			error(2, "两次密码输入不匹配", true);
			success = false;
		}

		//手机号验证
		let phone = /^1\d{10}$/;
		if(!phone.test($(".phone").val())) {
			error(3, "请输入正确的手机号", true);
			success = false;
		} else {
			succeed();
		}
		
		//邮箱验证
		let mail= /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;   
		if(!mail.test($(".mail").val())) {
			error(4, "请输入正确的邮箱", true);
			success = false;
		} else {
			succeed();
		}
		
		if(success){
			$("#registe").attr("data-target","#myModal");
//			$("#registe").click();
		}

	})

})