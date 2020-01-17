module.exports = {
    similarity: function (str1, str2) {
        let longer = str1;
        let shorter = str2;
        if (str1.length < str2.length) {
            longer = str2;
            shorter = str1;
        }
        const longerLength = longer.length;
        if (longerLength == 0) {
            return 1.0;
        }
        return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
    },
    editDistance: function (str1, str2) {
        str1 = str1.toLowerCase();
        str2 = str2.toLowerCase();

        const costs = new Array();
        for (let i = 0; i <= str1.length; i++) {
            let lastValue = i;
            for (let j = 0; j <= str2.length; j++) {
                if (i == 0) {
                    costs[j] = j;
                }
                else if (j > 0) {
                    let newValue = costs[j - 1];
                    if (str1.charAt(i - 1) != str2.charAt(j - 1)) {
                        newValue = Math.min(Math.min(newValue, lastValue),
                            costs[j]) + 1;
                    }
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
            if (i > 0) {
                costs[str2.length] = lastValue;
            }
        }
        return costs[str2.length];
    },
    arrayRemove: function (array, find) {
        let filtered = array.filter(function (element) {
            return element !== find;
        });

        return filtered;
    },
    toUpper: function (x) {
        return x.toUpperCase();
    },
    toLower: function (x) {
        return x.toLowerCase();
    },
    toLowerReplace: function (x) {
        return x.toLowerCase().replace(/ /g, '');
    },
}

Array.prototype.unique = function () {
    return this.reduce(function (previous, current, index, array) {
        previous[current.toString() + typeof (current)] = current;
        return array.length - 1 == index ? Object.keys(previous).reduce(function (prev, cur) {
            prev.push(previous[cur]);
            return prev;
        }, []) : previous;
    }, {});
};
