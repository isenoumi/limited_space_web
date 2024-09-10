import JSZip from "jszip";
import {
	saveAs
} from 'file-saver';
import $ from 'jquery'

// jszip打包下载图片
function saveImgZip(imgUrlArrs, typeTxt) {
	var imgUrlArr = []; // 图片列表
	imgUrlArr = imgUrlArrs
	var imgBase64 = {}; //存放转成base64的图片，采用键值对形式就行存储，不采用数组。因为数组在异步中会导致存取数据的无序，数据混乱
	var imgNameArr = []; // 图片名称
	var imageSuffix = []; // 图片后缀
	for (var i = 0; i < imgUrlArrs.length; i++) {
		let imgurl = decodeURIComponent(imgUrlArrs[i])
		// 图片后缀
		var suffix = imgurl.substring(imgurl.lastIndexOf("."));
		imageSuffix.push(suffix);
		//获取文件的名称
		var startIndex = imgurl.lastIndexOf("/");
		var endIndex = imgurl.lastIndexOf(".");
		var fileName = imgurl.substring(startIndex + 1, endIndex);
		console.log(fileName);
		imgNameArr.push(fileName);
	}
	// 创建JSZip对象
	var zip = new JSZip();
	// 创建文件夹
	var img = zip.folder("images");
	// 读取图片返回base64
	for (var i = 0; i < imgUrlArr.length; i++) {
		getBase64(imgUrlArr[i], i).then(function (base64, index) {
			imgBase64[index] = base64.substring(22);
		}, function (err) {
			console.log(err);
		});
	}

	function downloadZip() {
		setTimeout(function () {
			if (imgUrlArr.length == Object.keys(imgBase64).length) {
				for (var i = 0; i < imgUrlArr.length; i++) {
					img.file(imgNameArr[i] + imageSuffix[i], imgBase64[i], {
						base64: true
					});
				}
				let zipfilename = `文件名批量下载_${Date.now()}.zip`
				zip.generateAsync({
					type: "blob"
				}).then(function (content) {
					saveAs(content, zipfilename)
				});
			} else {
				downloadZip();
			}
		}, 100);
	}
	downloadZip();
}

//图片转base64; 传入图片路径，返回base64
function getBase64(img, index) {
	function getBase64Image(img, width, height) {
		var canvas = document.createElement("canvas");
		canvas.width = width ? width : img.width;
		canvas.height = height ? height : img.height;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
		var dataURL = canvas.toDataURL();
		return dataURL;
	}

	var image = new Image();
	image.crossOrigin = 'Anonymous';
	image.src = img;
	/*
	 * deferred对象是一个延迟对象，意思是函数延迟到某个点才开始执行，改变执行状态的方法有两个（成功：resolve和失败：reject），
	 * 分别对应两种执行回调（成功回调函数：done和失败回调函数fail）
	 * */
	var deferred = $.Deferred();
	if (img) {
		image.onload = function () {
			// 执行成功回调
			deferred.resolve(getBase64Image(image), index);
		}
		return deferred.promise();
	}
}
export {
	saveImgZip
}
