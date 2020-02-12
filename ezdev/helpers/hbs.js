const hbs = require("hbs");

// CUSTOM HELPERS

// function below: add the ternary operator functionnality to .hbs files
// usage : {{ternary true "yay" "nay "}} => prints yay
// usage : {{ternary NaN "yay" "nay "}} => prints nay
hbs.registerHelper("ternary", (test, yes, no) => (test ? yes : no));

// add comparison operator feature to hbs templates
/* 

USAGE =>

{{#compare 1 10 operator="<"}}
awesome, 1 is less thant 10 !!!
{{/compare}}

*/

hbs.registerHelper('forloop', function (n, block) {
    var accum = '';
    for (var i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
});

// Does the array contains value
hbs.registerHelper("contain", function (arr, value, toReturn) {
    if (arguments.length < 3) throw new Error("Handlerbars Helper 'contains' needs 3 parameters");
    let result = "";
    if (arr.includes(value)) result = toReturn;
    return result;
});

hbs.registerHelper("ncontain", function (arr, value, toReturn) {
    if (arguments.length < 3) throw new Error("Handlerbars Helper 'ncontains' needs 3 parameters");
    let result = "";
    if (!arr.includes(value)) result = toReturn;
    return result;
});
hbs.registerHelper("compare", function (lvalue, rvalue, options) {
    if (arguments.length < 3)
        throw new Error("Handlerbars Helper 'compare' needs 2 parameters");

    var operator = options.hash.operator || "==";

    var operators = {
        "==": function (l, r) {
            return l == r;
        },
        "===": function (l, r) {
            return l === r;
        },
        "!=": function (l, r) {
            return l != r;
        },
        "<": function (l, r) {
            return l < r;
        },
        ">": function (l, r) {
            return l > r;
        },
        "<=": function (l, r) {
            return l <= r;
        },
        ">=": function (l, r) {
            return l >= r;
        },
        typeof: function (l, r) {
            return typeof l == r;
        }
    };

    if (!operators[operator])
        throw new Error(
            "Handlerbars Helper 'compare' doesn't know the operator " + operator
        );

    var result = operators[operator](lvalue, rvalue);

    if (result) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});