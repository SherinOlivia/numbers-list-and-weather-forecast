function isPrime(num, i) {
    if (i === void 0) { i = 2; }
    if (num == 0 || num == 1) {
        return false;
    }
    else if (num == i) {
        return true;
    }
    else if (num % i == 0) {
        return false;
    }
    return isPrime(num, i + 1);
}
function numbersList() {
    var nums = [];
    for (var i = 1; i <= 100; i++) {
        if (isPrime(i)) {
            continue;
        }
        else if (i % 3 == 0 && i % 5 == 0) {
            nums.push("FooBar");
        }
        else if (i % 3 == 0) {
            nums.push("Foo");
        }
        else if (i % 5 == 0) {
            nums.push("Bar");
        }
        else if (!isPrime(i)) {
            nums.push(i);
        }
    }
    nums.reverse();
    return nums;
}
console.log(numbersList().join(', '));
