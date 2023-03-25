let beforeTxt,
	middleTxt,
	afterTxt,
	firstnbs = [],
	secondnbs = [],
	coords = [],
	files = [];

//function to remove regex characters
String.prototype.noRegex = function () {
	return this.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

$(function () {
	$("#beforeTxt").change(function () {
		beforeTxt = $(this).val();
	});
	$("#middleTxt").change(function () {
		middleTxt = $(this).val();
	});
	$("#afterTxt").change(function () {
		afterTxt = $(this).val();
	});
	$("#beforeTxt,#middleTxt,#afterTxt").change();
	$("#filepicker").change(function (event) {
		files = [...event.target.files];
		if (files.length === 0 || middleTxt == "") return;
		getNbs(files);
	});
	$("#filepickerAdd").change(function (event) {
		files.extend([...event.target.files]);
		if (files.length === 0 || middleTxt == "") return;
		getNbs(files);
	});
});

const getNbs = (files) => {
	for (const file of files) {
		const rgx = new RegExp(
			`(?<=${beforeTxt.noRegex()})-?\\d+${middleTxt.noRegex()}-?\\d+(?=${afterTxt.noRegex()})`,
			"u"
		);
		let nbs = file.name.match(rgx)[0].split(middleTxt);
		firstnbs.push(nbs[0]);
		secondnbs.push(nbs[1]);
		coords.push(nbs[0] + "-" + nbs[1]);
	}
	createTable(
		Math.min(...firstnbs),
		Math.max(...firstnbs),
		Math.min(...secondnbs),
		Math.max(...secondnbs)
	);
};

const createTable = (firstRow, lastRow, firstColumn, lastColumn) => {
	let txt = "";
	for (let i = firstRow; i <= lastRow; i++) {
		txt += "<li class='row " + i + "'><ul class='inside'> ";
		for (let j = firstColumn; j <= lastColumn; j++) {
			txt += "<li class='case inColumn " + j;
			if (coords.includes(i + "-" + j)) txt += " black";
			txt += "'> </li>";
		}
		txt += "</ul></li>";
	}
	$("ul.container").html(txt);
};

Array.prototype.extend = function (arr) {
	if (arr.constructor !== Array) return;
	arr.forEach(function (v) {
		this.push(v);
	}, this);
};
