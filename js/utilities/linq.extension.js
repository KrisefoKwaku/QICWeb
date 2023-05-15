(function(e) {


   Object.defineProperty(Array.prototype, "Sum", {
        value:function(lambda) {
            return e.From(this).Sum(lambda);
        },
        configurable: true
    });


   Object.defineProperty(Array.prototype, "SumAsync", {
        value:async function(lambda) {
            return e.From(this).Sum(lambda);
        },
        configurable: true
    });



   Object.defineProperty(Array.prototype, "First", {
        value:function(lambda) {
            return e.From(this).First(lambda);
        },
        configurable: true
    });




    Object.defineProperty(Array.prototype, "Last", {
        value: function (lambda) {
            return e.From(this).Last(lambda);
        },
        configurable: true
    });


   Object.defineProperty(Array.prototype, "FirstAsync", {
        value:async function(lambda) {
            return e.From(this).First(lambda);
        },
        configurable: true
    });


   Object.defineProperty(Array.prototype, "FirstOrDefault", {
        value:function(lambda) {
            return e.From(this).FirstOrDefault(lambda);
        },
        configurable: true
    });


   Object.defineProperty(Array.prototype, "FirstOrDefaultAsync", {
        value:async function(lambda) {
            return e.From(this).FirstOrDefault(lambda);
        },
        configurable: true
    });



   Object.defineProperty(Array.prototype, "Where", {
        value: function(lambda) {
            return e.From(this).Where(lambda).ToArray();
        },
        configurable: true
    });


   Object.defineProperty(Array.prototype, "WhereAsync", {
        value: async function(lambda) {
            return e.From(this).Where(lambda).ToArray();
        },
        configurable: true
    });



   Object.defineProperty(Array.prototype, "Select", {
        value:function(lambda) {

            return e.From(this).Select(lambda).ToArray();
        },
        configurable: true
    });



   Object.defineProperty(Array.prototype, "SelectAsync", {
        value:async function(lambda) {

            return e.From(this).Select(lambda).ToArray();
        },
        configurable: true
    });


   Object.defineProperty(Array.prototype, "SelectMany", {
        value: function(lambda) {

            return e.From(this).SelectMany(lambda).ToArray();
        },
        configurable: true
    });



   Object.defineProperty(Array.prototype, "SelectManyAsync", {
        value: async function(lambda) {

            return e.From(this).SelectMany(lambda).ToArray();
        },
        configurable: true
    });


   Object.defineProperty(Array.prototype, "ToArray", {
        value: function() {
            return this.enumerationResult ? this.enumerationResult.ToArray(): this;
        },
        configurable: true
    });


   Object.defineProperty(Array.prototype, "ToList", {
        value: function() {
            return this.enumerationResult ? this.enumerationResult.ToArray(): this;
        },
        configurable: true
    });


   


   Object.defineProperty(Array.prototype, "GroupBy", {
        value: function(lambda) {
            return e.From(this).GroupBy(lambda).ToArray();
        },
        configurable: true
    });

   Object.defineProperty(Array.prototype, "GroupByAsync", {
        value: async function(lambda) {
            return e.From(this).GroupBy(lambda).ToArray();
        },
        configurable: true
    });


    Object.defineProperty(Array.prototype, "OrderBy", {
        value: function(lambda) {
            return e.From(this).OrderBy(lambda).ToArray();
        },
        configurable: true
    });

   Object.defineProperty(Array.prototype, "OrderByAsync", {
        value: async function(lambda) {
            return e.From(this).OrderBy(lambda).ToArray();
        },
        configurable: true
    });


   Object.defineProperty(Array.prototype, "OrderByDescending", {
        value: function(lambda) {
            return e.From(this).OrderByDescending(lambda).ToArray();
        },
        configurable: true
    });


   Object.defineProperty(Array.prototype, "OrderByDescendingAsync", {
        value: async function(lambda) {
            return e.From(this).OrderByDescending(lambda).ToArray();
        },
        configurable: true
    });


   Object.defineProperty(Array.prototype, "DistinctBy", {
        value: function(lambda) {
            return e.From(this).DistinctBy(lambda).ToArray();
        },
        configurable: true
    });


   Object.defineProperty(Array.prototype, "DistinctByAsync", {
        value: async function(lambda) {
            return e.From(this).DistinctBy(lambda).ToArray();
        },
        configurable: true
    });


   Object.defineProperty(Array.prototype, "Distinct", {
        value: function(lambda) {
            return e.From(this).OrderBy(lambda).ToArray();
        },
        configurable: true
    });


   Object.defineProperty(Array.prototype, "DistinctAsync", {
        value: async function(lambda) {
            return e.From(this).OrderBy(lambda).ToArray();
        },
        configurable: true
    });


   Object.defineProperty(Array.prototype, "Take", {
        value: function(lambda) {
            return e.From(this).Take(lambda);
        },
        configurable: true
    });


   Object.defineProperty(Array.prototype, "Any", {
        value: function(lambda) {
            return e.From(this).Any(lambda);
        },
        configurable: true
    });


   Object.defineProperty(Array.prototype, "AnyAsync", {
        value: async function(lambda) {
            return e.From(this).Any(lambda);
        },
        configurable: true
    });


   Object.defineProperty(Array.prototype, "Empty", {
        value: function(lambda) {
            return e.From(this).Empty(lambda);
        },
        configurable: true
    });


   Object.defineProperty(Array.prototype, "ContainsAsync", {
        value: async function(lambda) {
            return e.From(this).Contains(lambda);
        },
        configurable: true
    });


   Object.defineProperty(Array.prototype, "ForEachAsync", {
        value: async function(lambda) {
            e.From(this).ForEach(lambda);
        },
        configurable: true
    });


   Object.defineProperty(Array.prototype, "ForEach", {
        value:function(lambda) {
            e.From(this).ForEach(lambda);
        },
        configurable: true
    });


   Object.defineProperty(Array.prototype, "UpdateEach", {
        value:function(lambda,context) {
            for (let key = 0, length = this.length; key < length; key++) {

                this[key] = lambda.call(context, this[key], key, this) || this[key];

            }
        },
        configurable: true
    });



   Object.defineProperty(Array.prototype, "Max", {
        value: function(lambda) {
            return e.From(this).Max(lambda);
        },
        configurable: true
    });


   Object.defineProperty(Array.prototype, "MaxBy", {
        value: function(lambda) {
            return e.From(this).Max(lambda);
        },
        configurable: true
    });


   Object.defineProperty(Array.prototype, "ToJson", {
        value: function() {
            return JSON.stringify(this);
        },
        configurable: true
    });

    Object.defineProperty(Array.prototype, "Add", {
        value: function(item) {
            this.push(item);
        },
        configurable: true
    });

    Object.defineProperty(Array.prototype, "AddAsync", {
        value:async function(item) {
            this.push(item);
        },
        configurable: true
    });


    Object.defineProperty(Array.prototype, "AddRange", {
        value: function(items) {
            var that = this;
            items.ForEach(i => that.push(i));
        },
        configurable: true
    });


    Object.defineProperty(Array.prototype, "AddRangeAsync", {
        value:async function(items) {
            var that = this;
            items.ForEach(i => that.push(i));
        },
        configurable: true
    });



})(window.Enumerable)