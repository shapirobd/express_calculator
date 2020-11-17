const CalcError = require("./calcError");

function generateRespJSON(operation, value) {
	if (operation === "mode") {
		newValue = "";
		for (let num of value) {
			newValue += `${num}, `;
		}
		value = newValue.slice(0, -2);
	}
	return {
		operation,
		value,
	};
}

function checkForEmptyNums(nums) {
	if (!nums || nums === "") {
		throw new CalcError("nums are required", 400);
	}
}

function countNumFrequency(nums, numCounter) {
	for (let num of nums) {
		if (!numCounter[num]) {
			numCounter[num] = 1;
		} else {
			numCounter[num]++;
		}
	}
}

function generateIntArr(reqNums) {
	checkForEmptyNums(reqNums);
	let strArr = reqNums.split(",");
	let intArr = strArr.map((num) => {
		if (isNaN(parseInt(num, 10))) {
			throw new CalcError(`${num} is not a number`, 400);
		} else {
			return parseInt(num, 10);
		}
	});
	return intArr;
}

function findMean(nums) {
	let sum = 0;
	nums.map((num) => {
		sum += num;
	});
	let mean = sum / nums.length;
	return mean;
}

function findMedian(nums) {
	nums.sort((a, b) => a - b);
	let median;
	if (nums.length % 2 === 0) {
		let num1 = nums[nums.length / 2 - 1];
		let num2 = nums[nums.length / 2];
		median = (num1 + num2) / 2;
	} else {
		median = nums[(nums.length - 1) / 2];
	}
	return median;
}

function findModes(numCounter) {
	let modes = [];
	for (let num in numCounter) {
		if (modes.length === 0) {
			modes.push(num);
		} else {
			if (numCounter[num] > numCounter[modes[0]]) {
				modes = [];
				modes.push(num);
			} else if (numCounter[num] === numCounter[modes[0]]) {
				modes.push(num);
			}
		}
	}
	console.log(modes);
	return modes;
}

module.exports = {
	generateRespJSON,
	checkForEmptyNums,
	countNumFrequency,
	generateIntArr,
	findMean,
	findMedian,
	findModes,
};
