if (typeof require != "undefined") {
    var buster = require("../../lib/buster");
    buster.promise = require("buster-promise");
}

buster.testCase("Sample test", {
    setUp: function () {
        this.a = 1;
    },

    "should use sinon": function () {
        var obj = { meth: function () {} };
        this.spy(obj, "meth");
        buster.assert.called(obj.meth);
    },

    "should use sinon successfully": function () {
        var obj = { meth: function () {} };
        this.spy(obj, "meth");

        obj.meth();
        buster.log("Just called a spy, tihi");

        buster.assert.called(obj.meth);
    },

    "//should pass simple assertion": function () {
        buster.console.log("Trying shit out");
        buster.assert(true);
    },

    "should fail when test throws": function () {
        buster.console.warn("Hey, wazzup?");
        throw new Error("Ooops!");
    },

    "should fail test": function () {
        buster.assert.equals("Something", "Other");
    },

    "look ma, I'm asynchronous": function () {
        var promise = buster.promise.create(function () {
            setTimeout(function () {
                buster.assert(true);
                promise.resolve();
            }, 200);
        });

        return promise;
    },

    "look ma, I'm implicitly asynchronous": function (done) {
        buster.assert(true);

        setTimeout(function () {
            //done();
        }, 1000);
    },

    "context": {
        "should be awesome": function () {
            buster.assert.equals(1, 1);
        },

        "inside here": {
            setUp: function () {
                this.a += 1;
            },

            "should do it more": function () {
                buster.assert.equals(2, this.a);
            }
        }
    }
});

var testCase2 = buster.testCase("Another test", {
    setUp: function (done) {
        setTimeout(function () {
            done();
        }, 200);
    },

    "should pass simple assertion": function () {
        buster.assert(true);
    },

    "should fail when test throws": function () {
        throw new Error("Ooops!");
    },

    "should fail test": function () {
        buster.assert.equals("Something", "Other");
    },

    "some context": {
        setUp: function (done) {
            setTimeout(function() {
                done();
            }, 240);
        },

        tearDown: function (done) {
            setTimeout(function() {
                done();
            }, 100);
        },

        "some other nested test": function () {
        }
    }
});