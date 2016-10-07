// 14331025_chenkui

var text_ans = ""; // 总表达式字符串
var flag = false;  // 用于判断出当前是否为计算出式子的状态

// 在总表达式中添加字符, 并更新输出
function add_ans(obj) {
	if (flag) {
		if (obj.value != "+" && obj.value != "-"
			&& obj.value != "*" && obj.value != "/") {
			text_ans = "";
		}
	}
	if (text_ans == "Infinity" || text_ans == "-Infinity" || text_ans == "NaN") {
		text_ans = "";
	}
	text_ans = text_ans + obj.value;
	flag = false;
	document.getElementById("ans").value = text_ans;
}

// 计算总表达式,得到结果
function get_ans() {
	try {
		text_ans = text_ans.toString();
		notBase8(text_ans);
		for (var i = 0; i < text_ans.length; i++) {
			if (text_ans[i] == '/' && text_ans[i + 1] == '/') {
				throw "Err1";
			}
		}
		var temp = (text_ans != "")? eval(text_ans) : "";
		if (temp != "Infinity" && temp != "-Infinity" && temp != "NaN") {
			document.getElementById("ans").value = temp;
		} else {
			alert("表达式无效,请重新输入");
			text_ans = "";
			document.getElementById("ans").value = text_ans;
		}
		text_ans = temp;
		flag = true;
	}
	catch(exception) {
		alert("表达式非法,请重新输入");
		text_ans = "";
		document.getElementById("ans").value = text_ans;
	}
}

// 清除总表达式, 并更新输出
function clear_ans() {
	text_ans = "";
	document.getElementById("ans").value = text_ans;
}

// 删除总表达式最后的字符, 并更新输出
function delete_ans() {
	text_ans = text_ans.substring(0, text_ans.length - 1);
	document.getElementById("ans").value = text_ans;
}

// 因为eval()将0开头的数字判断为八进制数 所以修改 认为以0开头也是十进制
function notBase8(arg) {
	var final_ans = arg;
	var numArray;
	numArray = arg.match(/\d+/g);
	if (numArray != null) {
		for (var i = 0; i < numArray.length; i++) {
			if ((/^0+/.test(numArray[i]))) {
				for (var j = 0; j < numArray[i].length; j++) {
					if (numArray[i][j] != '0') {
						break;
					}
				}
				var t = numArray[i].substring(j, numArray[i].length);
				if (t != "") {
					final_ans = final_ans.replace(numArray[i], t);
				}
			}
		}
	}
	text_ans = final_ans;
}

window.onload = function() {
	var nameArray = document.getElementsByName("be_click");
	for (var i = 0; i < nameArray.length; i++) {
		nameArray[i].onclick = function() {
			add_ans(this);
		}
	}
	document.getElementById("delete").onclick = function() {
		delete_ans();
	}
	document.getElementById("clear").onclick = function() {
		clear_ans();
	}
	document.getElementById("equal").onclick = function() {
		get_ans();
	}
}