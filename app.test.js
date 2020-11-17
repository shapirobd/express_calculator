const CalcError = require("./calcError");
const {
	generateRespJSON,
	checkForEmptyNums,
	countNumFrequency,
	generateIntArr,
	findMean,
	findMedian,
	findModes,
} = require("./calcFunctions");

describe("generateRespJSON", () => {
	test("test that JSON response works with mean & median", () => {
		expect(generateRespJSON("mean", 2)).toEqual({
			operation: "mean",
			value: 2,
		});
		expect(generateRespJSON("median", 33)).toEqual({
			operation: "median",
			value: 33,
		});
	});
	test("test that JSON response works with mode", () => {
		expect(generateRespJSON("mode", [5])).toEqual({
			operation: "mode",
			value: "5",
		});
		expect(generateRespJSON("mode", [23, 42])).toEqual({
			operation: "mode",
			value: "23, 42",
		});
	});
});

describe("checkForEmptyNums", () => {
	test("test if nums is empty string", () => {
		const nums = "";
		expect(() => {
			checkForEmptyNums(nums);
		}).toThrow(CalcError);
	});
	test("test if nums is null", () => {
		const nums = null;
		expect(() => {
			checkForEmptyNums(nums);
		}).toThrow(CalcError);
	});
	test("test if nums is undefined", () => {
		const nums = undefined;
		expect(() => {
			checkForEmptyNums(nums);
		}).toThrow(CalcError);
	});
});

describe("countNumFrequency", () => {
	test("test counting the frequency of all numbers in array", () => {
		const nums = [5, 4, 4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
		const numCounter = {};
		countNumFrequency(nums, numCounter);
		expect(numCounter[5]).toEqual(1);
		expect(numCounter[4]).toEqual(2);
		expect(numCounter[3]).toEqual(2);
		expect(numCounter[2]).toEqual(3);
		expect(numCounter[1]).toEqual(4);
	});
});

describe("generateIntArr", () => {
	test("test that a string of ints will be turned into array of ints", () => {
		const str = "1,2,3,4,5";
		const intArr = generateIntArr(str);
		expect(intArr).toEqual([1, 2, 3, 4, 5]);
	});
	test("test that a string containing a non-int will throw an error", () => {
		const str = "1,2,3,4,5,hello";
		expect(() => {
			generateIntArr(str);
		}).toThrow(CalcError);
	});
});

describe("findMean", () => {
	test("test correct value of mean is found", () => {
		const nums = [0, 1, 3, 5, 7];
		expect(findMean(nums)).toEqual(3.2);
	});
});

describe("findMedian", () => {
	test("test correct value of median is found (even amount)", () => {
		const nums = [4, 8, 15, 16, 23, 42];
		expect(findMedian(nums)).toEqual(15.5);
	});
	test("test correct value of median is found (odd amount)", () => {
		const nums = [4, 8, 15, 16, 23];
		expect(findMedian(nums)).toEqual(15);
	});
	test("test correct value of median is found (initially out of order)", () => {
		const nums = [8, 23, 4, 16, 15];
		expect(findMedian(nums)).toEqual(15);
	});
});

describe("findModes", () => {
	test("test correct value of mode is found (single mode)", () => {
		const numCounter = {
			1: 1,
			34: 2,
			5: 1,
			22: 3,
		};
		expect(findModes(numCounter)).toEqual(["22"]);
	});
	test("test correct value of mode is found (multiple modes)", () => {
		const numCounter = {
			1: 1,
			34: 3,
			5: 3,
			22: 3,
		};
		expect(findModes(numCounter)).toEqual(["5", "22", "34"]);
	});
});
