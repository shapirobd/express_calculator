const { response } = require("express");
const express = require("express");
const CalcError = require("./calcError");
const calc = require("./calcFunctions");
const app = express();

app.get("/mean", (req, res, next) => {
	try {
		let intNums = calc.generateIntArr(req.query.nums);
		let mean = calc.findMean(intNums);
		let resp = calc.generateRespJSON("mean", mean);
		res.json(resp);
	} catch (e) {
		next(e);
	}
});

app.get("/median", (req, res, next) => {
	try {
		let intArr = calc.generateIntArr(req.query.nums);
		let median = calc.findMedian(intArr);
		let resp = calc.generateRespJSON("median", median);
		res.json(resp);
	} catch (e) {
		next(e);
	}
});

app.get("/mode", (req, res, next) => {
	try {
		let intArr = calc.generateIntArr(req.query.nums);
		let numCounter = {};
		calc.countNumFrequency(intArr, numCounter);
		let modes = calc.findModes(numCounter);
		let resp = calc.generateRespJSON("mode", modes);
		res.json(resp);
	} catch (e) {
		next(e);
	}
});

app.use((req, res, next) => {
	const e = new CalcError("Page Not Found", 404);
	next(e);
});

app.use((err, req, res, next) => {
	let status = err.status || 500;
	let message = err.message;
	return res.status(status).json({
		error: { message, status },
	});
});

app.listen(3000, () => {
	console.log("Server running on port 3000");
});

exports.index = function (req, res) {
	res.render("index", { title: "Express" });
};
