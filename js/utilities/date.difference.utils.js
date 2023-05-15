(function (m, u) {
    u.add({
        get_dateDifference: function (d1, d2) {
            // Calculate the difference of two dates in total days
            var ndays;
            var tv1 = d1.valueOf(); 
            var tv2 = d2.valueOf();

            ndays = (tv2 - tv1) / 1000 / 86400;
            ndays = Math.round(ndays - 0.5);
            return ndays;
        }
    });
})(window.moment, window.utility)

