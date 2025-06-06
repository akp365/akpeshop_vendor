(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./src/js/themes/admin/app.js":[function(require,module,exports){
// Essentials
require('essential/js/main');

// Layout
require('layout/js/main');

// Sidebar
require('sidebar/js/main');

// Charts
require('charts/js/main');

// Chat
require('chat/js/main');

// Maps
require('maps/js/main');

// Media
require('media/js/main');

// Social
require('social/js/main');
},{"charts/js/main":"/Code/html/themes/themekit/lib/charts/js/main.js","chat/js/main":"/Code/html/themes/themekit/lib/chat/js/main.js","essential/js/main":"/Code/html/themes/themekit/lib/essential/js/main.js","layout/js/main":"/Code/html/themes/themekit/lib/layout/js/main.js","maps/js/main":"/Code/html/themes/themekit/lib/maps/js/main.js","media/js/main":"/Code/html/themes/themekit/lib/media/js/main.js","sidebar/js/main":"/Code/html/themes/themekit/lib/sidebar/js/main.js","social/js/main":"/Code/html/themes/themekit/lib/social/js/main.js"}],"/Code/html/themes/themekit/lib/charts/js/easy-pie/_easy-pie.js":[function(require,module,exports){
(function ($) {
    "use strict";

    var skin = require('../lib/_skin')();

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkEasyPie = function () {

        if (! this.length) return;

        if (!$.fn.easyPieChart) return;

        var color = config.skins[ skin ][ 'primary-color' ];
        if (this.is('.info')) color = colors[ 'info-color' ];
        if (this.is('.danger')) color = colors[ 'danger-color' ];
        if (this.is('.success')) color = colors[ 'success-color' ];
        if (this.is('.warning')) color = colors[ 'warning-color' ];
        if (this.is('.inverse')) color = colors[ 'inverse-color' ];

        this.easyPieChart({
            barColor: color,
            animate: ($('html').is('.ie') ? false : 3000),
            lineWidth: 4,
            size: 50
        });

    };

    $.each($('.easy-pie'), function (k, v) {
        $(this).tkEasyPie();
    });

})(jQuery);
},{"../lib/_skin":"/Code/html/themes/themekit/lib/charts/js/lib/_skin.js"}],"/Code/html/themes/themekit/lib/charts/js/easy-pie/main.js":[function(require,module,exports){
require('./_easy-pie');
},{"./_easy-pie":"/Code/html/themes/themekit/lib/charts/js/easy-pie/_easy-pie.js"}],"/Code/html/themes/themekit/lib/charts/js/flot/_autoupdate.js":[function(require,module,exports){
(function ($) {

    var charts = require('./_helper');

    if (typeof charts == 'undefined')
        return;

    charts.chart_live =
    {
        // chart data
        data: [],
        totalPoints: 300,
        updateInterval: 200,

        // we use an inline data source in the example, usually data would
        // be fetched from a server
        getRandomData: function () {
            if (this.data.length > 0)
                this.data = this.data.slice(1);

            // do a random walk
            while (this.data.length < this.totalPoints) {
                var prev = this.data.length > 0 ? this.data[ this.data.length - 1 ] : 50;
                var y = prev + Math.random() * 10 - 5;
                if (y < 0)
                    y = 0;
                if (y > 100)
                    y = 100;
                this.data.push(y);
            }

            // zip the generated y values with the x values
            var res = [];
            for (var i = 0; i < this.data.length; ++ i)
                res.push([ i, this.data[ i ] ]);
            return res;
        },

        // will hold the chart object
        plot: null,

        // chart options
        options: {
            series: {
                grow: {active: false},
                shadowSize: 0,
                lines: {
                    show: true,
                    fill: true,
                    lineWidth: 2,
                    steps: false
                }
            },
            grid: {
                show: true,
                aboveData: false,
                color: colors[ 'default-light-color' ],
                labelMargin: 5,
                axisMargin: 0,
                borderWidth: 0,
                borderColor: null,
                minBorderMargin: 5,
                clickable: true,
                hoverable: true,
                autoHighlight: false,
                mouseActiveRadius: 20,
                backgroundColor: {}
            },
            colors: [],
            tooltip: true,
            tooltipOpts: {
                content: "Value is : %y.0",
                shifts: {
                    x: - 30,
                    y: - 50
                },
                defaultTheme: false
            },
            yaxis: {
                min: 0,
                max: 100,
                tickColor: '#efefef'
            },
            xaxis: {
                show: false
            }
        },

        // initialize
        init: function (wrapper) {

            if (!wrapper.length) return;

            // apply styling
            charts.utility.applyStyle(this);

            this.plot = $.plot(wrapper, [ this.getRandomData() ], this.options);
            setTimeout(this.update, charts.chart_live.updateInterval);
        },

        // update
        update: function () {
            charts.chart_live.plot.setData([ charts.chart_live.getRandomData() ]);
            charts.chart_live.plot.draw();

            setTimeout(charts.chart_live.update, charts.chart_live.updateInterval);
        }
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkFlotChartLive = function () {

        if (! this.length) return;

        charts.chart_live.init(this);

    };

    $('[data-toggle="flot-chart-live"]').tkFlotChartLive();

})(jQuery);
},{"./_helper":"/Code/html/themes/themekit/lib/charts/js/flot/_helper.js"}],"/Code/html/themes/themekit/lib/charts/js/flot/_bars-ordered.js":[function(require,module,exports){
(function ($) {

    var charts = require('./_helper');

    if (typeof charts == 'undefined')
        return;

    charts.chart_ordered_bars =
    {
        // chart data
        data: null,

        // will hold the chart object
        plot: null,

        // chart options
        options: {
            bars: {
                show: true,
                barWidth: 0.2,
                fill: 1
            },
            grid: {
                show: true,
                aboveData: false,
                color: colors[ 'default-light-color' ],
                labelMargin: 5,
                axisMargin: 0,
                borderWidth: 0,
                borderColor: null,
                minBorderMargin: 5,
                clickable: true,
                hoverable: true,
                autoHighlight: false,
                mouseActiveRadius: 20,
                backgroundColor: {}
            },
            series: {
                grow: {active: false}
            },
            legend: {
                position: "ne",
                backgroundColor: null,
                backgroundOpacity: 0,
                noColumns: 3
            },
            yaxis: {
                ticks: 3,
                tickColor: '#efefef'
            },
            xaxis: {
                ticks: 4,
                tickDecimals: 0,
                tickColor: 'transparent'
            },
            colors: [],
            tooltip: true,
            tooltipOpts: {
                content: "%s : %y.0",
                shifts: {
                    x: - 30,
                    y: - 50
                },
                defaultTheme: false
            }
        },

        // initialize
        init: function (wrapper) {

            if (! wrapper.length) return;

            // apply styling
            charts.utility.applyStyle(this);

            //some data
            var d1 = [];
            for (var i = 0; i <= 10; i += 1)
                d1.push([ i, parseInt(Math.random() * 30) ]);

            var d2 = [];
            for (var j = 0; j <= 10; j += 1)
                d2.push([ j, parseInt(Math.random() * 30) ]);

            var d3 = [];
            for (var k = 0; k <= 10; k += 1)
                d3.push([ k, parseInt(Math.random() * 30) ]);

            var ds = [];

            ds.push({
                label: "Data One",
                data: d1,
                bars: {order: 1}
            });
            ds.push({
                label: "Data Two",
                data: d2,
                bars: {order: 2}
            });
            ds.push({
                label: "Data Three",
                data: d3,
                bars: {order: 3}
            });

            this.data = ds;

            this.plot = $.plot(wrapper, this.data, this.options);
        }
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkFlotChartOrderedBars = function () {

        if (! this.length) return;

        charts.chart_ordered_bars.init(this);

    };

    $('[data-toggle="flot-chart-ordered-bars"]').tkFlotChartOrderedBars();

})(jQuery);
},{"./_helper":"/Code/html/themes/themekit/lib/charts/js/flot/_helper.js"}],"/Code/html/themes/themekit/lib/charts/js/flot/_bars-stacked.js":[function(require,module,exports){
(function ($) {

    var charts = require('./_helper');

    if (typeof charts == 'undefined')
        return;

    charts.chart_stacked_bars =
    {
        // chart data
        data: null,

        // will hold the chart object
        plot: null,

        // chart options
        options: {
            grid: {
                show: true,
                aboveData: false,
                color: colors[ 'default-light-color' ],
                labelMargin: 5,
                axisMargin: 0,
                borderWidth: 0,
                borderColor: null,
                minBorderMargin: 5,
                clickable: true,
                hoverable: true,
                autoHighlight: true,
                mouseActiveRadius: 20,
                backgroundColor: {}
            },
            series: {
                grow: {active: false},
                stack: 0,
                lines: {show: false, fill: true, steps: false},
                bars: {show: true, barWidth: 0.5, fill: 1}
            },
            yaxis: {
                ticks: 3,
                tickColor: '#efefef'
            },
            xaxis: {
                ticks: 11,
                tickDecimals: 0,
                tickColor: 'transparent'
            },
            legend: {
                position: "ne",
                backgroundColor: null,
                backgroundOpacity: 0,
                noColumns: 3
            },
            colors: [],
            shadowSize: 1,
            tooltip: true,
            tooltipOpts: {
                content: "%s : %y.0",
                shifts: {
                    x: - 30,
                    y: - 50
                },
                defaultTheme: false
            }
        },

        // initialize
        init: function (wrapper) {

            if (! wrapper.length) return;

            // apply styling
            charts.utility.applyStyle(this);

            var d1 = [];
            for (var i = 0; i <= 10; i += 1)
                d1.push([ i, parseInt(Math.random() * 30) ]);

            var d2 = [];
            for (var j = 0; j <= 10; j += 1)
                d2.push([ j, parseInt(Math.random() * 20) ]);

            var d3 = [];
            for (var k = 0; k <= 10; k += 1)
                d3.push([ k, parseInt(Math.random() * 20) ]);

            this.data = [];

            this.data.push({
                label: "Data One",
                data: d1
            });
            this.data.push({
                label: "Data Two",
                data: d2
            });
            this.data.push({
                label: "Data Tree",
                data: d3
            });

            this.plot = $.plot(wrapper, this.data, this.options);
        }
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkFlotChartStackedBars = function () {

        if (! this.length) return;

        charts.chart_stacked_bars.init(this);

    };

    $('[data-toggle="flot-chart-stacked-bars"]').tkFlotChartStackedBars();

})(jQuery);
},{"./_helper":"/Code/html/themes/themekit/lib/charts/js/flot/_helper.js"}],"/Code/html/themes/themekit/lib/charts/js/flot/_donut.js":[function(require,module,exports){
(function ($) {

    var charts = require('./_helper');

    if (typeof charts == 'undefined')
        return;

    charts.chart_donut =
    {
        // chart data
        data: [
            {label: "USA", data: 38},
            {label: "Brazil", data: 23},
            {label: "India", data: 15},
            {label: "Turkey", data: 9},
            {label: "France", data: 7},
            {label: "China", data: 5},
            {label: "Germany", data: 3}
        ],

        // will hold the chart object
        plot: null,

        // chart options
        options: {
            series: {
                pie: {
                    show: true,
                    innerRadius: 0.4,
                    highlight: {
                        opacity: 0.1
                    },
                    radius: 1,
                    stroke: {
                        color: '#fff',
                        width: 8
                    },
                    startAngle: 2,
                    combine: {
                        color: '#EEE',
                        threshold: 0.05
                    },
                    label: {
                        show: true,
                        radius: 1,
                        formatter: function (label, series) {
                            return '<div class="label label-default">' + label + '&nbsp;' + Math.round(series.percent) + '%</div>';
                        }
                    }
                },
                grow: {active: false}
            },
            legend: {show: false},
            grid: {
                hoverable: true,
                clickable: true,
                backgroundColor: {}
            },
            colors: [],
            tooltip: true,
            tooltipOpts: {
                content: "%s : %y.1" + "%",
                shifts: {
                    x: - 30,
                    y: - 50
                },
                defaultTheme: false
            }
        },

        // initialize
        init: function (wrapper) {

            if (! wrapper.length) return;

            // apply styling
            charts.utility.applyStyle(this);

            this.plot = $.plot(wrapper, this.data, this.options);
        }
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkFlotChartDonut = function () {

        if (! this.length) return;

        charts.chart_donut.init(this);

    };

    $('[data-toggle="flot-chart-donut"]').tkFlotChartDonut();

})(jQuery);
},{"./_helper":"/Code/html/themes/themekit/lib/charts/js/flot/_helper.js"}],"/Code/html/themes/themekit/lib/charts/js/flot/_helper.js":[function(require,module,exports){
var skin = require('../lib/_skin')();

var charts =
{
    // utility class
    utility: {
        chartColors: [ config.skins[ skin ][ 'primary-color' ], colors[ 'default-color' ], colors[ 'danger-color' ], colors[ 'success-color' ], colors[ 'warning-color' ] ],
        chartBackgroundColors: [ "rgba(255,255,255,0)", "rgba(255,255,255,0)" ],

        applyStyle: function (that) {
            that.options.colors = charts.utility.chartColors;
            that.options.grid.backgroundColor = { colors: charts.utility.chartBackgroundColors };
            that.options.grid.borderColor = charts.utility.chartColors[ 0 ];
            that.options.grid.color = charts.utility.chartColors[ 0 ];
        },

        // generate random number for charts
        randNum: function () {
            return (Math.floor(Math.random() * (1 + 40 - 20)) ) + 20;
        }
    }

};

module.exports = charts;
},{"../lib/_skin":"/Code/html/themes/themekit/lib/charts/js/lib/_skin.js"}],"/Code/html/themes/themekit/lib/charts/js/flot/_horizontal.js":[function(require,module,exports){
(function ($) {

    var skin = require('../lib/_skin')();
    var charts = require('./_helper');

    if (typeof charts == 'undefined')
        return;

    charts.chart_horizontal_bars =
    {
        // chart data
        data: null,

        // will hold the chart object
        plot: null,

        // chart options
        options: {
            grid: {
                color: "#dedede",
                borderWidth: 1,
                borderColor: "transparent",
                clickable: true,
                hoverable: true
            },
            series: {
                grow: {active: false},
                bars: {
                    show: true,
                    horizontal: true,
                    barWidth: 0.2,
                    fill: 1
                }
            },
            legend: {position: "nw", backgroundColor: null, backgroundOpacity: 0},
            yaxis: {
                ticks: 3,
                tickColor: 'transparent',
                tickFormatter: function (val, axis) {
                    return val + "k";
                }
            },
            xaxis: {
                ticks: 4,
                tickDecimals: 0
            },
            colors: [ config.skins[ skin ][ 'primary-color' ] ],
            tooltip: true,
            tooltipOpts: {
                content: "%s : %y.0",
                shifts: {
                    x: - 30,
                    y: - 50
                },
                defaultTheme: false
            }
        },

        // initialize
        init: function (wrapper) {

            if (!wrapper.length) return;

            // apply styling
            // charts.utility.applyStyle(this);

            var d1 = [];
            for (var i = 1; i <= 5; i += 1)
                d1.push([ parseInt(Math.random() * 30), i ]);

            this.data = [];

            this.data.push({
                label: "Sales Volume",
                data: d1,
                bars: {
                    horizontal: true,
                    show: true,
                    barWidth: 0.5
                }
            });

            this.plot = $.plot(wrapper, this.data, this.options);
        }
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkFlotChartHorizontalBars = function () {

        if (! this.length) return;

        charts.chart_horizontal_bars.init(this);

    };

    $('[data-toggle="flot-chart-horizontal-bars"]').tkFlotChartHorizontalBars();

})(jQuery);
},{"../lib/_skin":"/Code/html/themes/themekit/lib/charts/js/lib/_skin.js","./_helper":"/Code/html/themes/themekit/lib/charts/js/flot/_helper.js"}],"/Code/html/themes/themekit/lib/charts/js/flot/_line.js":[function(require,module,exports){
(function ($) {

    var skin = require('../lib/_skin')();
    var charts = require('./_helper');

    if (typeof charts == 'undefined')
        return;

    charts.chart_lines_fill_nopoints_3 =
    {
        // chart data
        data: {
            d1: []
        },

        // will hold the chart object
        plot: null,

        // chart options
        options: {
            colors: [  colors[ 'success-color' ]],
            grid: {
                color: colors[ 'default-light-color' ],
                borderWidth: 1,
                borderColor: "transparent",
                clickable: true,
                hoverable: true
            },
            series: {
                grow: {active: false},
                lines: {
                    show: true,
                    fill: false,
                    lineWidth: 2,
                    steps: false,
                    color: config.skins[ skin ][ 'primary-color' ]
                },
                points: {show: false}
            },
            legend: {position: "nw", backgroundColor: null, backgroundOpacity: 0},
            yaxis: {
                ticks: 3,
                tickSize: 40,
                tickFormatter: function (val, axis) {
                    return val + "k";
                }
            },
            xaxis: {ticks: 4, tickDecimals: 0, tickColor: 'transparent'},
            shadowSize: 0,
            tooltip: true,
            tooltipOpts: {
                content: "%s : %y.0",
                shifts: {
                    x: - 30,
                    y: - 50
                },
                defaultTheme: false
            }
        },

        // initialize
        init: function (wrapper) {

            if (!wrapper.length) return;

            // generate some data
            this.data.d1 = [ [ 1, 3 + charts.utility.randNum() ], [ 2, 6 + charts.utility.randNum() ], [ 3, 30 + charts.utility.randNum() ], [ 4, 110 + charts.utility.randNum() ], [ 5, 80 + charts.utility.randNum() ], [ 6, 18 + charts.utility.randNum() ], [ 7, 50 + charts.utility.randNum() ], [ 8, 15 + charts.utility.randNum() ], [ 9, 18 + charts.utility.randNum() ], [ 10, 60 + charts.utility.randNum() ], [ 11, 110 + charts.utility.randNum() ], [ 12, 27 + charts.utility.randNum() ], [ 13, 30 + charts.utility.randNum() ], [ 14, 33 + charts.utility.randNum() ], [ 15, 24 + charts.utility.randNum() ], [ 16, 80 + charts.utility.randNum() ], [ 17, 30 + charts.utility.randNum() ], [ 18, 33 + charts.utility.randNum() ], [ 19, 36 + charts.utility.randNum() ], [ 20, 39 + charts.utility.randNum() ], [ 21, 42 + charts.utility.randNum() ], [ 22, 70 + charts.utility.randNum() ], [ 23, 36 + charts.utility.randNum() ], [ 24, 39 + charts.utility.randNum() ], [ 25, 42 + charts.utility.randNum() ], [ 26, 45 + charts.utility.randNum() ], [ 27, 60 + charts.utility.randNum() ], [ 28, 51 + charts.utility.randNum() ], [ 29, 55 + charts.utility.randNum() ], [ 30, 100 + charts.utility.randNum() ] ];

            // make chart
            this.plot = $.plot(
                wrapper,
                [ {
                    label: "Net Revenue",
                    data: this.data.d1
                } ],
                this.options
            );
        }
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkFlotChartLines3 = function () {

        if (! this.length) return;

        charts.chart_lines_fill_nopoints_3.init(this);

    };

    $('[data-toggle="flot-chart-lines-3"]').tkFlotChartLines3();

})(jQuery);
},{"../lib/_skin":"/Code/html/themes/themekit/lib/charts/js/lib/_skin.js","./_helper":"/Code/html/themes/themekit/lib/charts/js/flot/_helper.js"}],"/Code/html/themes/themekit/lib/charts/js/flot/_line_fill_nopoints.js":[function(require,module,exports){
(function ($) {

    var skin = require('../lib/_skin')();
    var charts = require('./_helper');

    if (typeof charts == 'undefined')
        return;

    charts.chart_lines_fill_nopoints =
    {
        // chart data
        data: {
            d1: [],
            d2: []
        },

        // will hold the chart object
        plot: null,

        // chart options
        options: {
            grid: {
                show: true,
                aboveData: false,
                color: colors[ 'default-color' ],
                labelMargin: 5,
                axisMargin: 0,
                borderWidth: 0,
                borderColor: null,
                minBorderMargin: 5,
                clickable: true,
                hoverable: true,
                mouseActiveRadius: 20,
                backgroundColor: {}
            },
            series: {
                grow: {
                    active: false
                },
                lines: {
                    show: true,
                    fill: true,
                    lineWidth: 2,
                    steps: false
                },
                points: {
                    show: false
                }
            },
            legend: {
                position: "nw",
                noColumns: 2
            },
            yaxis: {
                ticks: 4,
                tickDecimals: 0,
                tickColor: '#efefef'
            },
            xaxis: {
                ticks: 11,
                tickDecimals: 0,
                tickColor: 'transparent'
            },
            colors: [],
            shadowSize: 1,
            tooltip: true,
            tooltipOpts: {
                content: "%s : %y.0",
                shifts: {
                    x: - 30,
                    y: - 50
                },
                defaultTheme: false
            }
        },

        // initialize
        init: function (wrapper) {

            if (! wrapper.length) return;

            // apply styling
            charts.utility.applyStyle(this);

            // generate some data
            this.data.d1 = [ [ 1, 3 + charts.utility.randNum() ], [ 2, 6 + charts.utility.randNum() ], [ 3, 9 + charts.utility.randNum() ], [ 4, 12 + charts.utility.randNum() ], [ 5, 15 + charts.utility.randNum() ], [ 6, 18 + charts.utility.randNum() ], [ 7, 21 + charts.utility.randNum() ], [ 8, 15 + charts.utility.randNum() ], [ 9, 18 + charts.utility.randNum() ], [ 10, 21 + charts.utility.randNum() ], [ 11, 24 + charts.utility.randNum() ], [ 12, 27 + charts.utility.randNum() ], [ 13, 30 + charts.utility.randNum() ], [ 14, 33 + charts.utility.randNum() ], [ 15, 24 + charts.utility.randNum() ], [ 16, 27 + charts.utility.randNum() ], [ 17, 30 + charts.utility.randNum() ], [ 18, 33 + charts.utility.randNum() ], [ 19, 36 + charts.utility.randNum() ], [ 20, 39 + charts.utility.randNum() ], [ 21, 42 + charts.utility.randNum() ], [ 22, 45 + charts.utility.randNum() ], [ 23, 36 + charts.utility.randNum() ], [ 24, 39 + charts.utility.randNum() ], [ 25, 42 + charts.utility.randNum() ], [ 26, 45 + charts.utility.randNum() ], [ 27, 38 + charts.utility.randNum() ], [ 28, 51 + charts.utility.randNum() ], [ 29, 55 + charts.utility.randNum() ], [ 30, 60 + charts.utility.randNum() ] ];
            this.data.d2 = [ [ 1, charts.utility.randNum() - 5 ], [ 2, charts.utility.randNum() - 4 ], [ 3, charts.utility.randNum() - 4 ], [ 4, charts.utility.randNum() ], [ 5, 4 + charts.utility.randNum() ], [ 6, 4 + charts.utility.randNum() ], [ 7, 5 + charts.utility.randNum() ], [ 8, 5 + charts.utility.randNum() ], [ 9, 6 + charts.utility.randNum() ], [ 10, 6 + charts.utility.randNum() ], [ 11, 6 + charts.utility.randNum() ], [ 12, 2 + charts.utility.randNum() ], [ 13, 3 + charts.utility.randNum() ], [ 14, 4 + charts.utility.randNum() ], [ 15, 4 + charts.utility.randNum() ], [ 16, 4 + charts.utility.randNum() ], [ 17, 5 + charts.utility.randNum() ], [ 18, 5 + charts.utility.randNum() ], [ 19, 2 + charts.utility.randNum() ], [ 20, 2 + charts.utility.randNum() ], [ 21, 3 + charts.utility.randNum() ], [ 22, 3 + charts.utility.randNum() ], [ 23, 3 + charts.utility.randNum() ], [ 24, 2 + charts.utility.randNum() ], [ 25, 4 + charts.utility.randNum() ], [ 26, 4 + charts.utility.randNum() ], [ 27, 5 + charts.utility.randNum() ], [ 28, 2 + charts.utility.randNum() ], [ 29, 2 + charts.utility.randNum() ], [ 30, 3 + charts.utility.randNum() ] ];

            // make chart
            this.plot = $.plot(
                wrapper,
                [ {
                    label: "Visits",
                    data: this.data.d1
                },
                {
                    label: "Unique Visits",
                    data: this.data.d2
                } ],
                this.options
            );
        }
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkFlotChartLines1 = function () {

        if (! this.length) return;

        charts.chart_lines_fill_nopoints.init(this);

    };

    $('[data-toggle="flot-chart-lines-1"]').tkFlotChartLines1();

})(jQuery);
},{"../lib/_skin":"/Code/html/themes/themekit/lib/charts/js/lib/_skin.js","./_helper":"/Code/html/themes/themekit/lib/charts/js/flot/_helper.js"}],"/Code/html/themes/themekit/lib/charts/js/flot/_line_fill_nopoints_2.js":[function(require,module,exports){
(function ($) {

    var skin = require('../lib/_skin')();
    var charts = require('./_helper');

    if (typeof charts == 'undefined')
        return;

    charts.chart_lines_fill_nopoints_2 =
    {
        // chart data
        data: {
            d1: []
        },

        // will hold the chart object
        plot: null,

        // chart options
        options: {
            colors: [ config.skins[ skin ][ 'primary-color' ] ],
            grid: {
                color: colors[ 'default-light-color' ],
                borderWidth: 1,
                borderColor: "transparent",
                clickable: true,
                hoverable: true
            },
            series: {
                grow: {active: false},
                lines: {
                    show: true,
                    fill: false,
                    lineWidth: 5,
                    steps: false,
                    color: config.skins[ skin ][ 'primary-color' ]
                },
                points: {show: false}
            },
            legend: {position: "nw", backgroundColor: null, backgroundOpacity: 0},
            yaxis: {
                ticks: 3,
                tickSize: 40,
                tickFormatter: function (val, axis) {
                    return val + "k";
                }
            },
            xaxis: {
                ticks: 4,
                tickDecimals: 0,
                tickColor: 'transparent'
            },
            shadowSize: 0,
            tooltip: true,
            tooltipOpts: {
                content: "%s : %y.0",
                shifts: {
                    x: - 30,
                    y: - 50
                },
                defaultTheme: false
            }
        },

        // initialize
        init: function (wrapper) {

            if (! wrapper.length) return;

            // generate some data
            this.data.d1 = [ [ 1, 3 + charts.utility.randNum() ], [ 2, 6 + charts.utility.randNum() ], [ 3, 30 + charts.utility.randNum() ], [ 4, 110 + charts.utility.randNum() ], [ 5, 80 + charts.utility.randNum() ], [ 6, 18 + charts.utility.randNum() ], [ 7, 50 + charts.utility.randNum() ], [ 8, 15 + charts.utility.randNum() ], [ 9, 18 + charts.utility.randNum() ], [ 10, 60 + charts.utility.randNum() ], [ 11, 110 + charts.utility.randNum() ], [ 12, 27 + charts.utility.randNum() ], [ 13, 30 + charts.utility.randNum() ], [ 14, 33 + charts.utility.randNum() ], [ 15, 24 + charts.utility.randNum() ], [ 16, 80 + charts.utility.randNum() ], [ 17, 30 + charts.utility.randNum() ], [ 18, 33 + charts.utility.randNum() ], [ 19, 36 + charts.utility.randNum() ], [ 20, 39 + charts.utility.randNum() ], [ 21, 42 + charts.utility.randNum() ], [ 22, 70 + charts.utility.randNum() ], [ 23, 36 + charts.utility.randNum() ], [ 24, 39 + charts.utility.randNum() ], [ 25, 42 + charts.utility.randNum() ], [ 26, 45 + charts.utility.randNum() ], [ 27, 60 + charts.utility.randNum() ], [ 28, 51 + charts.utility.randNum() ], [ 29, 55 + charts.utility.randNum() ], [ 30, 100 + charts.utility.randNum() ] ];

            // make chart
            this.plot = $.plot(
                wrapper,
                [ {
                    label: "Net Revenue",
                    data: this.data.d1
                } ],
                this.options
            );
        }
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkFlotChartLines2 = function () {

        if (! this.length) return;

        charts.chart_lines_fill_nopoints_2.init(this);

    };

    $('[data-toggle="flot-chart-lines-2"]').tkFlotChartLines2();

})(jQuery);
},{"../lib/_skin":"/Code/html/themes/themekit/lib/charts/js/lib/_skin.js","./_helper":"/Code/html/themes/themekit/lib/charts/js/flot/_helper.js"}],"/Code/html/themes/themekit/lib/charts/js/flot/_mixed.js":[function(require,module,exports){
(function ($) {

    var skin = require('../lib/_skin')();
    var charts = require('./_helper');

    if (typeof charts == 'undefined')
        return;

    charts.chart_mixed_1 =
    {
        // chart data
        data: {
            d1: []
        },

        // will hold the chart object
        plot: null,

        // chart options
        options: {
            colors: [ "#dedede", config.skins[ skin ][ 'primary-color' ] ],
            grid: {
                color: "#dedede",
                borderWidth: 1,
                borderColor: "transparent",
                clickable: true,
                hoverable: true
            },
            series: {
                grow: {active: false},
                lines: {
                    show: true,
                    fill: false,
                    lineWidth: 2,
                    steps: false,
                    color: config.skins[ skin ][ 'primary-color' ]
                },
                points: {show: false}
            },
            legend: {position: "nw", backgroundColor: null, backgroundOpacity: 0},
            yaxis: {
                ticks: 3,
                tickSize: 40,
                tickFormatter: function (val, axis) {
                    return val + "k";
                }
            },
            xaxis: {ticks: 4, tickDecimals: 0, tickColor: 'transparent'},
            shadowSize: 0,
            tooltip: true,
            tooltipOpts: {
                content: "%s : %y.0",
                shifts: {
                    x: - 30,
                    y: - 50
                },
                defaultTheme: false
            }
        },

        // initialize
        init: function (wrapper) {

            if (! wrapper.length) return;

            // generate some data
            this.data.d1 = [ [ 1, 3 + charts.utility.randNum() ], [ 2, 6 + charts.utility.randNum() ], [ 3, 30 + charts.utility.randNum() ], [ 4, 110 + charts.utility.randNum() ], [ 5, 80 + charts.utility.randNum() ], [ 6, 18 + charts.utility.randNum() ], [ 7, 50 + charts.utility.randNum() ], [ 8, 15 + charts.utility.randNum() ], [ 9, 18 + charts.utility.randNum() ], [ 10, 60 + charts.utility.randNum() ], [ 11, 110 + charts.utility.randNum() ], [ 12, 27 + charts.utility.randNum() ], [ 13, 30 + charts.utility.randNum() ] ];

            // make chart
            this.plot = $.plot(
                wrapper,
                [ {
                    label: "Net Revenue",
                    data: this.data.d1,
                    bars: {show: true, fill: 1, barWidth: 0.75, align: "center"}
                },
                {
                    data: this.data.d1,
                    lines: {show: true, fill: false},
                    points: {
                        show: true,
                        radius: 5,
                        symbol: "circle",
                        fill: true,
                        fillColor: config.skins[ skin ][ 'primary-color' ],
                        borderColor: "#fff"
                    }
                } ],
                this.options
            );
        }
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkFlotChartMixed = function () {

        if (! this.length) return;

        charts.chart_mixed_1.init(this);

    };

    $('[data-toggle="flot-chart-mixed"]').tkFlotChartMixed();

})(jQuery);
},{"../lib/_skin":"/Code/html/themes/themekit/lib/charts/js/lib/_skin.js","./_helper":"/Code/html/themes/themekit/lib/charts/js/flot/_helper.js"}],"/Code/html/themes/themekit/lib/charts/js/flot/_pie.js":[function(require,module,exports){
(function ($) {

    var charts = require('./_helper');

    if (typeof charts == 'undefined')
        return;

    charts.chart_pie =
    {
        // chart data
        data: [
            {label: "USA", data: 38},
            {label: "Brazil", data: 23},
            {label: "India", data: 15},
            {label: "Turkey", data: 9},
            {label: "France", data: 7},
            {label: "China", data: 5},
            {label: "Germany", data: 3}
        ],

        // will hold the chart object
        plot: null,

        // chart options
        options: {
            series: {
                pie: {
                    show: true,
                    highlight: {
                        opacity: 0.1
                    },
                    radius: 1,
                    stroke: {
                        color: '#fff',
                        width: 2
                    },
                    startAngle: 2,
                    combine: {
                        color: '#353535',
                        threshold: 0.05
                    },
                    label: {
                        show: true,
                        radius: 1,
                        formatter: function (label, series) {
                            return '<div class="label label-default">' + label + '&nbsp;' + Math.round(series.percent) + '%</div>';
                        }
                    }
                },
                grow: {active: false}
            },
            colors: [],
            legend: {show: false},
            grid: {
                hoverable: true,
                clickable: true,
                backgroundColor: {}
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : %y.1" + "%",
                shifts: {
                    x: - 30,
                    y: - 50
                },
                defaultTheme: false
            }
        },

        // initialize
        init: function (wrapper) {

            if (! wrapper.length) return;

            // apply styling
            charts.utility.applyStyle(this);

            this.plot = $.plot(wrapper, this.data, this.options);
        }
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkFlotChartPie = function () {

        if (! this.length) return;

        charts.chart_pie.init(this);

    };

    $('[data-toggle="flot-chart-pie"]').tkFlotChartPie();

})(jQuery);
},{"./_helper":"/Code/html/themes/themekit/lib/charts/js/flot/_helper.js"}],"/Code/html/themes/themekit/lib/charts/js/flot/_simple.js":[function(require,module,exports){
(function ($) {

    var skin = require('../lib/_skin')();
    var charts = require('./_helper');

    if (typeof charts == 'undefined')
        return;

    charts.chart_simple =
    {
        // data
        data: {
            sin: [],
            cos: []
        },

        // will hold the chart object
        plot: null,

        // chart options
        options: {
            colors: [ config.skins[ skin ][ 'primary-color' ], colors[ 'default-color' ] ],
            grid: {
                color: colors[ 'default-light-color' ],
                borderWidth: 1,
                borderColor: "transparent",
                clickable: true,
                hoverable: true
            },
            series: {
                grow: {active: false},
                lines: {
                    show: true,
                    fill: false,
                    lineWidth: 4,
                    steps: false
                },
                points: {
                    show: true,
                    radius: 5,
                    symbol: "circle",
                    fill: true,
                    borderColor: "#fff"
                }
            },
            legend: {position: "se", backgroundColor: null, backgroundOpacity: 0, noColumns: 2},
            shadowSize: 0,
            yaxis: {ticks: 3},
            xaxis: {ticks: 4, tickDecimals: 0, tickColor: 'transparent'},
            tooltip: true, //activate tooltip
            tooltipOpts: {
                content: "%s : %y.3",
                shifts: {
                    x: - 30,
                    y: - 50
                },
                defaultTheme: false
            }
        },

        // initialize
        init: function (wrapper) {

            if (! wrapper.length) return;

            if (this.plot === null) {
                for (var i = 0; i < 14; i += 0.5) {
                    this.data.sin.push([ i, Math.sin(i) ]);
                    this.data.cos.push([ i, Math.cos(i) ]);
                }
            }
            this.plot = $.plot(
                wrapper,
                [ {
                    label: "Sin",
                    data: this.data.sin,
                    lines: {fillColor: colors[ 'default-color' ]},
                    points: {fillColor: "#fff"}
                },
                {
                    label: "Cos",
                    data: this.data.cos,
                    lines: {fillColor: "#444"},
                    points: {fillColor: "#fff"}
                } ],
                this.options
            );
        }
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkFlotChartSimple = function () {

        if (! this.length) return;

        charts.chart_simple.init(this);

    };

    $('[data-toggle="flot-chart-simple"]').tkFlotChartSimple();

})(jQuery);
},{"../lib/_skin":"/Code/html/themes/themekit/lib/charts/js/lib/_skin.js","./_helper":"/Code/html/themes/themekit/lib/charts/js/flot/_helper.js"}],"/Code/html/themes/themekit/lib/charts/js/flot/main.js":[function(require,module,exports){
require('./_simple');
require('./_mixed');
require('./_line');
require('./_horizontal');
require('./_line_fill_nopoints');
require('./_line_fill_nopoints_2');
require('./_bars-ordered');
require('./_donut');
require('./_bars-stacked');
require('./_pie');
require('./_autoupdate');
},{"./_autoupdate":"/Code/html/themes/themekit/lib/charts/js/flot/_autoupdate.js","./_bars-ordered":"/Code/html/themes/themekit/lib/charts/js/flot/_bars-ordered.js","./_bars-stacked":"/Code/html/themes/themekit/lib/charts/js/flot/_bars-stacked.js","./_donut":"/Code/html/themes/themekit/lib/charts/js/flot/_donut.js","./_horizontal":"/Code/html/themes/themekit/lib/charts/js/flot/_horizontal.js","./_line":"/Code/html/themes/themekit/lib/charts/js/flot/_line.js","./_line_fill_nopoints":"/Code/html/themes/themekit/lib/charts/js/flot/_line_fill_nopoints.js","./_line_fill_nopoints_2":"/Code/html/themes/themekit/lib/charts/js/flot/_line_fill_nopoints_2.js","./_mixed":"/Code/html/themes/themekit/lib/charts/js/flot/_mixed.js","./_pie":"/Code/html/themes/themekit/lib/charts/js/flot/_pie.js","./_simple":"/Code/html/themes/themekit/lib/charts/js/flot/_simple.js"}],"/Code/html/themes/themekit/lib/charts/js/lib/_skin.js":[function(require,module,exports){
module.exports = (function () {
    var skin = $.cookie('skin');

    if (typeof skin == 'undefined') {
        skin = 'default';
    }
    return skin;
});
},{}],"/Code/html/themes/themekit/lib/charts/js/main.js":[function(require,module,exports){
require('./morris/main');
require('./sparkline/main');
require('./flot/main');
require('./easy-pie/main');

},{"./easy-pie/main":"/Code/html/themes/themekit/lib/charts/js/easy-pie/main.js","./flot/main":"/Code/html/themes/themekit/lib/charts/js/flot/main.js","./morris/main":"/Code/html/themes/themekit/lib/charts/js/morris/main.js","./sparkline/main":"/Code/html/themes/themekit/lib/charts/js/sparkline/main.js"}],"/Code/html/themes/themekit/lib/charts/js/morris/_area.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $.fn.tkMorrisChartArea = function () {

        if (! this.length) return;

        if (! this.attr('id')) return;

        var skin = require('../lib/_skin')();

        this.empty();

        new Morris.Area({
            lineColors: [ config.skins[ skin ][ 'primary-color' ], colors[ 'danger-color' ] ],
            pointFillColors: config.skins[ skin ][ 'primary-color' ],
            fillOpacity: '0.3',
            element: this.attr('id'),
            data: [
                {y: '1.1.', a: 30, b: 90},
                {y: '2.1.', a: 35, b: 65},
                {y: '3.1.', a: 50, b: 40},
                {y: '4.1.', a: 75, b: 65},
                {y: '5.1.', a: 50, b: 40},
                {y: '6.1.', a: 75, b: 65},
                {y: '7.1.', a: 60, b: 90}
            ],
            xkey: 'y',
            ykeys: [ 'a' ],
            labels: [ 'Series A' ],
            gridTextColor: colors[ 'default-color' ],
            gridTextWeight: 'bold',
            resize: true
        });

    };

    $(function () {

        $('[data-toggle="morris-chart-area"]').tkMorrisChartArea();

        $('[data-skin]').on('click', function () {
            $('[data-toggle="morris-chart-area"]').tkMorrisChartArea();
        });

    });

})(jQuery);
},{"../lib/_skin":"/Code/html/themes/themekit/lib/charts/js/lib/_skin.js"}],"/Code/html/themes/themekit/lib/charts/js/morris/_bar.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $.fn.tkMorrisChartBar = function () {

        if (! this.length) return;

        if (! this.attr('id')) return;

        var skin = require('../lib/_skin')();

        this.empty();

        new Morris.Bar({
            barColors: [ config.skins[ skin ][ 'primary-color' ], colors[ 'default-color' ], colors[ 'danger-color' ] ],
            element: this.attr('id'),
            data: [
                {y: '2006', a: 100, b: 90, c: 40},
                {y: '2007', a: 75, b: 65, c: 100},
                {y: '2008', a: 50, b: 40, c: 30},
                {y: '2009', a: 75, b: 65, c: 85},
                {y: '2010', a: 50, b: 40, c: 45},
                {y: '2011', a: 75, b: 65, c: 90},
                {y: '2012', a: 100, b: 90, c: 80}
            ],
            gridTextColor: colors[ 'default-color' ],
            gridTextWeight: 'bold',
            resize: true,
            xkey: 'y',
            ykeys: [ 'a', 'b', 'c' ],
            labels: [ 'Series A', 'Series B', 'Series C' ]
        });
    };

    $(function () {

        $('[data-toggle="morris-chart-bar"]').tkMorrisChartBar();

        $('[data-skin]').on('click', function(){

            $('[data-toggle="morris-chart-bar"]').tkMorrisChartBar();

        });

    });

})(jQuery);

},{"../lib/_skin":"/Code/html/themes/themekit/lib/charts/js/lib/_skin.js"}],"/Code/html/themes/themekit/lib/charts/js/morris/_donut.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $.fn.tkMorrisChartDonut = function () {

        if (! this.length) return;

        if (! this.attr('id')) return;

        var skin = require('../lib/_skin')();

        this.empty();

        new Morris.Donut({
            element: this.attr('id'),
            colors: [ colors[ 'danger-color' ], config.skins[ skin ][ 'primary-color' ], colors[ 'default-color' ] ],
            data: [
                {label: "Download Sales", value: 12},
                {label: "In-Store Sales", value: 30},
                {label: "Mail-Order Sales", value: 20}
            ]
        });

    };

    $(function () {

        $('[data-toggle="morris-chart-donut"]').tkMorrisChartDonut();

        $('[data-skin]').on('click', function(){

            $('[data-toggle="morris-chart-donut"]').tkMorrisChartDonut();

        });

    });

})(jQuery);
},{"../lib/_skin":"/Code/html/themes/themekit/lib/charts/js/lib/_skin.js"}],"/Code/html/themes/themekit/lib/charts/js/morris/_line.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $.fn.tkMorrisChartLine = function () {

        if (! this.length) return;

        if (! this.attr('id')) return;

        var skin = require('../lib/_skin')();

        this.empty();

        new Morris.Line({
            lineColors: [ config.skins[ skin ][ 'primary-color' ], colors[ 'danger-color' ] ],
            pointFillColors: [ config.skins[ skin ][ 'primary-color' ], colors[ 'danger-color' ] ],
            pointStrokeColors: [ '#ffffff', '#ffffff' ],
            gridTextColor: colors[ 'default-color' ],
            gridTextWeight: 'bold',

            // ID of the element in which to draw the chart.
            element: this.attr('id'),
            // Chart data records -- each entry in this array corresponds to a point on
            // the chart.
            data: [
                {date: '2014-02', a: 2000, b: 2400},
                {date: '2014-03', a: 1200, b: 2500},
                {date: '2014-04', a: 3200, b: 2000},
                {date: '2014-05', a: 1600, b: 1440},
                {date: '2014-06', a: 1290, b: 2830},
                {date: '2014-07', a: 1930, b: 1200},
                {date: '2014-08', a: 2120, b: 3000}
            ],
            // The name of the data record attribute that contains x-values.
            xkey: 'date',
            // A list of names of data record attributes that contain y-values.
            ykeys: [ 'a', 'b' ],
            // Labels for the ykeys -- will be displayed when you hover over the
            // chart.
            labels: [ 'Series A', 'Series B' ],
            resize: true
        });

    };

    $(function () {

        $('[data-toggle="morris-chart-line"]').tkMorrisChartLine();

        $('[data-skin]').on('click', function(){

            $('[data-toggle="morris-chart-line"]').tkMorrisChartLine();

        });

    });

})(jQuery);
},{"../lib/_skin":"/Code/html/themes/themekit/lib/charts/js/lib/_skin.js"}],"/Code/html/themes/themekit/lib/charts/js/morris/main.js":[function(require,module,exports){
require('./_area');
require('./_bar');
require('./_donut');
require('./_line');
},{"./_area":"/Code/html/themes/themekit/lib/charts/js/morris/_area.js","./_bar":"/Code/html/themes/themekit/lib/charts/js/morris/_bar.js","./_donut":"/Code/html/themes/themekit/lib/charts/js/morris/_donut.js","./_line":"/Code/html/themes/themekit/lib/charts/js/morris/_line.js"}],"/Code/html/themes/themekit/lib/charts/js/sparkline/_sparkline.js":[function(require,module,exports){
(function ($) {
    "use strict";

    var skin = require('../lib/_skin')();

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSparkLine = function () {

        if (! this.length) return;

        this.sparkline(
            this.data('data') || "html", {
                type: 'line',
                height: '24',
                width: '100%',
                spotRadius: '3.2',
                spotColor: config.skins[ skin ][ 'primary-color' ],
                minSpotColor: config.skins[ skin ][ 'primary-color' ],
                maxSpotColor: config.skins[ skin ][ 'primary-color' ],
                highlightSpotColor: colors[ 'danger-color' ],
                lineWidth: '2',
                lineColor: config.skins[ skin ][ 'primary-color' ],
                fillColor: colors[ 'body-bg' ]
            }
        );

    };

    $.fn.tkSparkBar = function () {

        if (! this.length) return;

        this.text(this.find('span').text());

        this.sparkline(
            this.data('data') || "html", {
                type: 'bar',
                height: '70',
                barWidth: 10,
                barSpacing: 8,
                zeroAxis: false,
                stackedBarColor: [ config.skins[ skin ][ 'primary-color' ], colors[ 'default-light-color' ] ],
                colorMap: this.data('colors') ? [ config.skins[ skin ][ 'primary-color' ], colors[ 'success-color' ], colors[ 'danger-color' ], colors[ 'default-light-color' ] ] : [],
                enableTagOptions: true
            }
        );

    };

    $(".sparkline-bar").each(function () {
        $(this).tkSparkBar();
    });

    $(".sparkline-line").each(function () {
        $(this).tkSparkLine();
    });

})(jQuery);
},{"../lib/_skin":"/Code/html/themes/themekit/lib/charts/js/lib/_skin.js"}],"/Code/html/themes/themekit/lib/charts/js/sparkline/main.js":[function(require,module,exports){
require('./_sparkline');

},{"./_sparkline":"/Code/html/themes/themekit/lib/charts/js/sparkline/_sparkline.js"}],"/Code/html/themes/themekit/lib/chat/js/_breakpoints.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $(window).bind('enterBreakpoint480', function () {
        $('.chat-window-container .panel:not(:last)').remove();
        $('.chat-window-container .panel').attr('id', 'chat-0001');
    });

    $(window).bind('enterBreakpoint768', function () {
        if ($('.chat-window-container .panel').length == 3) {
            $('.chat-window-container .panel:first').remove();
            $('.chat-window-container .panel:first').attr('id', 'chat-0001');
            $('.chat-window-container .panel:last').attr('id', 'chat-0002');
        }
    });

})(jQuery);
},{}],"/Code/html/themes/themekit/lib/chat/js/_search.js":[function(require,module,exports){
(function ($) {

    // match anything
    $.expr[ ":" ].containsNoCase = function (el, i, m) {
        var search = m[ 3 ];
        if (! search) return false;
        return new RegExp(search, "i").test($(el).text());
    };

    // Search Filter
    function searchFilterCallBack($data, $opt) {
        var search = $data instanceof jQuery ? $data.val() : $(this).val(),
            opt = typeof $opt == 'undefined' ? $data.data.opt : $opt;

        var $target = $(opt.targetSelector);
        $target.show();

        if (search && search.length >= opt.charCount) {
            $target.not(":containsNoCase(" + search + ")").hide();
        }
    }

    // input filter
    $.fn.searchFilter = function (options) {
        var opt = $.extend({
            // target selector
            targetSelector: "",
            // number of characters before search is applied
            charCount: 1
        }, options);

        return this.each(function () {
            var $el = $(this);
            $el.off("keyup", searchFilterCallBack);
            $el.on("keyup", null, {opt: opt}, searchFilterCallBack);
        });

    };

    // Filter by All/Online/Offline
    $(".chat-filter a").on('click', function (e) {

        e.preventDefault();
        $('.chat-contacts li').hide();
        $('.chat-contacts').find($(this).data('target')).show();

        $(".chat-filter li").removeClass('active');
        $(this).parent().addClass('active');

        $(".chat-search input").searchFilter({targetSelector: ".chat-contacts " + $(this).data('target')});

        // Filter Contacts by Search and Tabs
        searchFilterCallBack($(".chat-search input"), {
            targetSelector: ".chat-contacts " + $(this).data('target'),
            charCount: 1
        });
    });

    // Trigger Search Filter
    $(".chat-search input").searchFilter({targetSelector: ".chat-contacts li"});

})(jQuery);

},{}],"/Code/html/themes/themekit/lib/chat/js/_windows.js":[function(require,module,exports){
(function ($) {
    "use strict";

    var container = $('.chat-window-container');

    // Click User
    $(".chat-contacts li").on('click', function () {

        if ($('.chat-window-container [data-user-id="' + $(this).data('userId') + '"]').length) return;

        // If user is offline do nothing
        if ($(this).attr('class') === 'offline') return;

        var source = $("#chat-window-template").html();
        var template = Handlebars.compile(source);

        var context = {user_image: $(this).find('img').attr('src'), user: $(this).find('.contact-name').text()};
        var html = template(context);

        var clone = $(html);

        clone.attr("data-user-id", $(this).data("userId"));

        container.find('.panel:not([id^="chat"])').remove();

        var count = container.find('.panel').length;

        count ++;
        var limit = $(window).width() > 768 ? 3 : 1;
        if (count >= limit) {
            container.find('#chat-000'+ limit).remove();
            count = limit;
        }

        clone.attr('id', 'chat-000' + parseInt(count));
        container.append(clone).show();

        clone.show();
        clone.find('> .panel-body').removeClass('display-none');
        clone.find('> input').removeClass('display-none');
    });

    // Change ID by No. of Windows
    function chatLayout() {
        container.find('.panel').each(function (index, value) {
            $(this).attr('id', 'chat-000' + parseInt(index + 1));
        });
    }

    // remove window
    $("body").on('click', ".chat-window-container .close", function () {
        $(this).parent().parent().remove();
        chatLayout();
        if ($(window).width() < 768) $('.chat-window-container').hide();
    });

    // Chat heading collapse window
    $('body').on('click', '.chat-window-container .panel-heading', function (e) {
        e.preventDefault();
        $(this).parent().find('> .panel-body').toggleClass('display-none');
        $(this).parent().find('> input').toggleClass('display-none');
    });

})(jQuery);

},{}],"/Code/html/themes/themekit/lib/chat/js/main.js":[function(require,module,exports){
require('./_breakpoints');
require('./_search');
require('./_windows');
},{"./_breakpoints":"/Code/html/themes/themekit/lib/chat/js/_breakpoints.js","./_search":"/Code/html/themes/themekit/lib/chat/js/_search.js","./_windows":"/Code/html/themes/themekit/lib/chat/js/_windows.js"}],"/Code/html/themes/themekit/lib/essential/js/_bootstrap-carousel.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkCarousel = function () {

        if (! this.length) return;

        this.carousel();

        this.find('[data-slide]').click(function (e) {
            e.preventDefault();
        });

    };

})(jQuery);
},{}],"/Code/html/themes/themekit/lib/essential/js/_bootstrap-collapse.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkCollapse = function () {

        if (! this.length) return;

        var target = this.attr('href') || this.attr('target');
        if (! target) return;

        this.click(function(e){
            e.preventDefault();
        });

        $(target).collapse({toggle: false});

    };

})(jQuery);
},{}],"/Code/html/themes/themekit/lib/essential/js/_bootstrap-modal.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkModal = function () {

        if (! this.length) return;

        var target = this.attr('href') || this.attr('target');
        if (! target) return;

        this.click(function (e) {
            e.preventDefault();
        });

        $(target).modal({show: false});

    };

    /**
     * Modal creator for the demo page.
     * Allows to explore different modal types.
     * For demo purposes only.
     */

    // Process the modal via Handlebars templates
    var modal = function (options) {
        var source = $("#" + options.template).html();
        var template = Handlebars.compile(source);
        return template(options);
    };

    var randomId = function () {
        /** @return String */
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    };

    $.fn.tkModalDemo = function () {

        if (! this.length) return;

        var targetId = this.attr('href') || this.attr('target'),
            target = $(targetId);

        if (! targetId) {
            targetId = randomId();
            this.attr('data-target', '#' + targetId);
        }

        targetId.replace('#', '');

        if (! target.length) {
            target = $(modal({
                id: targetId,
                template: this.data('template') || 'tk-modal-demo',
                modalOptions: this.data('modalOptions') || '',
                dialogOptions: this.data('dialogOptions') || '',
                contentOptions: this.data('contentOptions') || ''
            }));
            $('body').append(target);
            target.modal({show: false});
        }

        this.click(function (e) {
            e.preventDefault();
            target.modal('toggle');
        });

    };

    $('[data-toggle="tk-modal-demo"]').each(function () {
        $(this).tkModalDemo();
    });

})(jQuery);
},{}],"/Code/html/themes/themekit/lib/essential/js/_bootstrap-switch.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $('[data-toggle="switch-checkbox"]').each(function () {

        $(this).bootstrapSwitch({
            offColor: 'danger'
        });

    });

})(jQuery);
},{}],"/Code/html/themes/themekit/lib/essential/js/_check-all.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkCheckAll = function(){

        if (! this.length) return;

        this.on('click', function () {
            $($(this).data('target')).find(':checkbox').prop('checked', this.checked);
        });

    };

    // Check All Checkboxes
    $('[data-toggle="check-all"]').tkCheckAll();

})(jQuery);
},{}],"/Code/html/themes/themekit/lib/essential/js/_cover.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * Conserve aspect ratio of the orignal region. Useful when shrinking/enlarging
     * images to fit into a certain area.
     *
     * @param {Number} srcWidth Source area width
     * @param {Number} srcHeight Source area height
     * @param {Number} maxWidth Fittable area maximum available width
     * @param {Number} maxHeight Fittable area maximum available height
     * @return {Object} { width, heigth }
     */
    var aspectRatioFit = function (srcWidth, srcHeight, maxWidth, maxHeight) {

        var wRatio = maxWidth / srcWidth,
            hRatio = maxHeight / srcHeight,
            width = srcWidth,
            height = srcHeight;

        if (srcWidth / maxWidth < srcHeight / maxHeight) {
            width = maxWidth;
            height = srcHeight * wRatio;
        } else {
            width = srcWidth * hRatio;
            height = maxHeight;
        }

        return {width: width, height: height};
    };

    $.fn.tkCover = function () {

        if (! this.length) return;

        this.filter(':visible').not('[class*="height"]').each(function () {
            var t = $(this),
                i = t.find('img:first');

            if (i.length) {
                $.loadImage(i.attr('src')).done(function (img) {
                    t.height(i.height());
                    $('.overlay-full', t).innerHeight(i.height());
                    $(document).trigger('domChanged');
                });
            }
            else {
                i = t.find('.img:first');
                t.height(i.height());
                $('.overlay-full', t).innerHeight(i.height());
                $(document).trigger('domChanged');
            }
        });

        this.filter(':visible').filter('[class*="height"]').each(function () {
            var t = $(this),
                img = t.find('img') || t.find('.img');

            img.each(function () {
                var i = $(this);
                if (i.data('autoSize') === false) {
                    return true;
                }
                if (i.is('img')) {
                    $.loadImage(i.attr('src')).done(function (img) {
                        i.removeAttr('style');
                        i.css(aspectRatioFit(i.width(), i.height(), t.width(), t.height()));
                    });
                }
                else {
                    i.removeAttr('style');
                    i.css(aspectRatioFit(i.width(), i.height(), t.width(), t.height()));
                }
            });
        });

    };

    function height() {

        $('.cover.overlay').each(function () {
            $(this).tkCover();
        });

    }

    $(document).ready(height);
    $(window).on('load', height);

    var t;
    $(window).on("debouncedresize", function () {
        clearTimeout(t);
        t = setTimeout(height, 200);
    });

})(jQuery);

},{}],"/Code/html/themes/themekit/lib/essential/js/_datepicker.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkDatePicker = function () {

        if (! this.length) return;

        if (typeof $.fn.datepicker != 'undefined') {

            this.datepicker();

        }

    };

    $('.datepicker').tkDatePicker();

})(jQuery);
},{}],"/Code/html/themes/themekit/lib/essential/js/_daterangepicker.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $.fn.tkDaterangepickerReport = function () {
        var e = this;
        this.daterangepicker(
            {
                ranges: {
                    'Today': [ moment(), moment() ],
                    'Yesterday': [ moment().subtract('days', 1), moment().subtract('days', 1) ],
                    'Last 7 Days': [ moment().subtract('days', 6), moment() ],
                    'Last 30 Days': [ moment().subtract('days', 29), moment() ],
                    'This Month': [ moment().startOf('month'), moment().endOf('month') ],
                    'Last Month': [ moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month') ]
                },
                startDate: moment().subtract('days', 29),
                endDate: moment()
            },
            function (start, end) {
                var output = start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY');
                e.find('span').html(output);
            }
        );
    };

    $.fn.tkDaterangepickerReservation = function () {
        this.daterangepicker({
            timePicker: true,
            timePickerIncrement: 30,
            format: 'MM/DD/YYYY h:mm A'
        });
    };

    $('.daterangepicker-report').tkDaterangepickerReport();

    $('.daterangepicker-reservation').tkDaterangepickerReservation();

})(jQuery);
},{}],"/Code/html/themes/themekit/lib/essential/js/_expandable.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     * @todo: Angular directive.
     */
    $.fn.tkExpandable = function () {

        if (! this.length) return;

        this.find('.expandable-content').append('<div class="expandable-indicator"><i></i></div>');

    };

    $('.expandable').each(function () {
        $(this).tkExpandable();
    });

    $('body').on('click', '.expandable-indicator', function(){
        $(this).closest('.expandable').toggleClass('expandable-open');
    });

    $('body').on('click', '.expandable-trigger:not(.expandable-open)', function(){
        $(this).addClass('expandable-open');
    });

}(jQuery));
},{}],"/Code/html/themes/themekit/lib/essential/js/_iframe.js":[function(require,module,exports){
(function () {
    "use strict";

    // if we're inside an iframe, reload without iframe
    if (window.location != window.parent.location)
        top.location.href = document.location.href;

})();

},{}],"/Code/html/themes/themekit/lib/essential/js/_minicolors.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     * @todo: Angular directive.
     */
    $.fn.tkMiniColors = function () {

        if (! this.length) return;

        if (typeof $.fn.minicolors != 'undefined') {

            this.minicolors({
                control: this.attr('data-control') || 'hue',
                defaultValue: this.attr('data-defaultValue') || '',
                inline: this.attr('data-inline') === 'true',
                letterCase: this.attr('data-letterCase') || 'lowercase',
                opacity: this.attr('data-opacity'),
                position: this.attr('data-position') || 'bottom left',
                change: function (hex, opacity) {
                    if (! hex) return;
                    if (opacity) hex += ', ' + opacity;
                    if (typeof console === 'object') {
                        console.log(hex);
                    }
                },
                theme: 'bootstrap'
            });

        }

    };

    $('.minicolors').each(function () {

        $(this).tkMiniColors();

    });

})(jQuery);
},{}],"/Code/html/themes/themekit/lib/essential/js/_nestable.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     * @todo: Angular directive.
     */
    $.fn.tkNestable = function () {

        if (! this.length) return;

        if (typeof $.fn.nestable != 'undefined') {

            this.nestable({
                rootClass: 'nestable',
                listNodeName: 'ul',
                listClass: 'nestable-list',
                itemClass: 'nestable-item',
                dragClass: 'nestable-drag',
                handleClass: 'nestable-handle',
                collapsedClass: 'nestable-collapsed',
                placeClass: 'nestable-placeholder',
                emptyClass: 'nestable-empty'
            });

        }

    };

    $('.nestable').tkNestable();

})(jQuery);

},{}],"/Code/html/themes/themekit/lib/essential/js/_panel-collapse.js":[function(require,module,exports){
(function ($) {
    "use strict";

    var randomId = function() {
        /** @return String */
        var S4 = function() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkPanelCollapse = function () {

        if (! this.length) return;

        var body = $('.panel-body', this),
            id = body.attr('id') || randomId(),
            collapse = $('<div/>');

        collapse
            .attr('id', id)
            .addClass('collapse' + (this.data('open') ? ' in' : ''))
            .append(body.clone());

        body.remove();

        $(this).append(collapse);

        $('.panel-collapse-trigger', this)
            .attr('data-toggle', 'collapse' )
            .attr('data-target', '#' + id)
            .collapse({ trigger: false });

    };

    $('[data-toggle="panel-collapse"]').each(function(){
        $(this).tkPanelCollapse();
    });

})(jQuery);

},{}],"/Code/html/themes/themekit/lib/essential/js/_progress-bars.js":[function(require,module,exports){
(function ($) {

    // Progress Bar Animation
    $('.progress-bar').each(function () {
        $(this).width($(this).attr('aria-valuenow') + '%');
    });

})(jQuery);
},{}],"/Code/html/themes/themekit/lib/essential/js/_select2.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSelect2 = function () {

        if (! this.length) return;

        if (typeof $.fn.select2 != 'undefined') {

            var t = this,
                options = {
                    allowClear: t.data('allowClear')
                };

            if (t.is('button')) return true;
            if (t.is('input[type="button"]')) return true;

            if (t.is('[data-toggle="select2-tags"]')) {
                options.tags = t.data('tags').split(',');
            }

            t.select2(options);

        }

    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSelect2Enable = function () {

        if (! this.length) return;

        if (typeof $.fn.select2 != 'undefined') {

            this.click(function () {
                $($(this).data('target')).select2("enable");
            });

        }

    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSelect2Disable = function () {

        if (! this.length) return;

        if (typeof $.fn.select2 != 'undefined') {

            this.click(function () {
                $(this.data('target')).select2("disable");
            });

        }

    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSelect2Flags = function () {

        if (! this.length) return;

        if (typeof $.fn.select2 != 'undefined') {

            // templating
            var format = function (state) {
                if (! state.id) return state.text;
                return "<img class='flag' src='http://select2.github.io/select2/images/flags/" + state.id.toLowerCase() + ".png'/>" + state.text;
            };

            this.select2({
                formatResult: format,
                formatSelection: format,
                escapeMarkup: function (m) {
                    return m;
                }
            });

        }

    };

    $('[data-toggle*="select2"]').each(function() {

        $(this).tkSelect2();

    });

    $('[data-toggle="select2-enable"]').tkSelect2Enable();

    $('[data-toggle="select2-disable"]').tkSelect2Disable();

    $("#select2_7").tkSelect2Flags();

})(jQuery);

},{}],"/Code/html/themes/themekit/lib/essential/js/_selectpicker.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSelectPicker = function () {

        if (! this.length) return;

        if (typeof $.fn.selectpicker != 'undefined') {

            this.selectpicker({
                width: this.data('width') || '100%'
            });

        }

    };

    $(function () {

        $('.selectpicker').each(function () {
           $(this).tkSelectPicker();
        });

    });

})(jQuery);

},{}],"/Code/html/themes/themekit/lib/essential/js/_show-hover.js":[function(require,module,exports){
(function ($) {

    var showHover = function () {
        $('[data-show-hover]').hide().each(function () {
            var self = $(this),
                parent = $(this).data('showHover');

            self.closest(parent).on('mouseover', function (e) {
                e.stopPropagation();
                self.show();
            }).on('mouseout', function () {
                self.hide();
            });
        });
    };

    showHover();

    window.showHover = showHover;

})(jQuery);
},{}],"/Code/html/themes/themekit/lib/essential/js/_skin.js":[function(require,module,exports){
module.exports=require("/Code/html/themes/themekit/lib/charts/js/lib/_skin.js")
},{"/Code/html/themes/themekit/lib/charts/js/lib/_skin.js":"/Code/html/themes/themekit/lib/charts/js/lib/_skin.js"}],"/Code/html/themes/themekit/lib/essential/js/_slider.js":[function(require,module,exports){
(function ($) {
    "use strict";

    var bars = function(el){
        $('.slider-handle', el).html('<i class="fa fa-bars fa-rotate-90"></i>');
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSlider = function () {

        if (! this.length) return;

        if (typeof $.fn.slider != 'undefined') {

            this.slider();

            bars(this);

        }

    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSliderFormatter = function () {

        if (! this.length) return;

        if (typeof $.fn.slider != 'undefined') {

            this.slider({
                formatter: function (value) {
                    return 'Current value: ' + value;
                }
            });

            bars(this);

        }

    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSliderUpdate = function () {

        if (! this.length) return;

        if (typeof $.fn.slider != 'undefined') {

            this.on("slide", function (slideEvt) {
                $(this.attr('data-on-slide')).text(slideEvt.value);
            });

            bars(this);

        }

    };

    $('[data-slider="default"]').tkSlider();

    $('[data-slider="formatter"]').tkSliderFormatter();

    $('[data-on-slide]').tkSliderUpdate();

})(jQuery);
},{}],"/Code/html/themes/themekit/lib/essential/js/_summernote.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSummernote = function () {

        if (! this.length) return;

        if (typeof $.fn.summernote != 'undefined') {

            this.summernote({
                height: 300
            });

        }

    };

    $(function () {

        $('.summernote').each(function () {
           $(this).tkSummernote();
        });

    });

})(jQuery);

},{}],"/Code/html/themes/themekit/lib/essential/js/_tables.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkDataTable = function(){

        if (! this.length) return;

        if (typeof $.fn.dataTable != 'undefined') {

            this.dataTable();

        }

    };

    $('[data-toggle="data-table"]').tkDataTable();

})(jQuery);
},{}],"/Code/html/themes/themekit/lib/essential/js/_tabs.js":[function(require,module,exports){
(function ($) {

    var skin = require('./_skin')();

    $('.tabbable .nav-tabs').each(function(){
        var tabs = $(this).niceScroll({
            cursorborder: 0,
            cursorcolor: config.skins[ skin ][ 'primary-color' ],
            horizrailenabled: true,
            oneaxismousemode: true
        });

        var _super = tabs.getContentSize;
        tabs.getContentSize = function() {
            var page = _super.call(tabs);
            page.h = tabs.win.height();
            return page;
        };
    });

    $('[data-scrollable]').getNiceScroll().resize();

    $('.tabbable .nav-tabs a').on('shown.bs.tab', function(e){
        var tab = $(this).closest('.tabbable');
        var target = $(e.target),
            targetPane = target.attr('href') || target.data('target');

        // refresh tabs with horizontal scroll
        tab.find('.nav-tabs').getNiceScroll().resize();

        // refresh [data-scrollable] within the activated tab pane
        $(targetPane).find('[data-scrollable]').getNiceScroll().resize();
    });

}(jQuery));
},{"./_skin":"/Code/html/themes/themekit/lib/essential/js/_skin.js"}],"/Code/html/themes/themekit/lib/essential/js/_tooltip.js":[function(require,module,exports){
(function ($) {
    "use strict";

    // Tooltip
    $("body").tooltip({selector: '[data-toggle="tooltip"]', container: "body"});

})(jQuery);
},{}],"/Code/html/themes/themekit/lib/essential/js/_touchspin.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkTouchSpin = function () {

        if (! this.length) return;

        if (typeof $.fn.TouchSpin != 'undefined') {

            this.TouchSpin();

        }

    };

    $('[data-toggle="touch-spin"]').tkTouchSpin();

}(jQuery));
},{}],"/Code/html/themes/themekit/lib/essential/js/_tree.js":[function(require,module,exports){
(function ($) {

    var tree_glyph_options = {
        map: {
            checkbox: "fa fa-square-o",
            checkboxSelected: "fa fa-check-square",
            checkboxUnknown: "fa fa-check-square fa-muted",
            error: "fa fa-exclamation-triangle",
            expanderClosed: "fa fa-caret-right",
            expanderLazy: "fa fa-angle-right",
            expanderOpen: "fa fa-caret-down",
            doc: "fa fa-file-o",
            noExpander: "",
            docOpen: "fa fa-file",
            loading: "fa fa-refresh fa-spin",
            folder: "fa fa-folder",
            folderOpen: "fa fa-folder-open"
        }
    },
    tree_dnd_options = {
        autoExpandMS: 400,
            focusOnClick: true,
            preventVoidMoves: true, // Prevent dropping nodes 'before self', etc.
            preventRecursiveMoves: true, // Prevent dropping nodes on own descendants
            dragStart: function(node, data) {
            /** This function MUST be defined to enable dragging for the tree.
             *  Return false to cancel dragging of node.
             */
            return true;
        },
        dragEnter: function(node, data) {
            /** data.otherNode may be null for non-fancytree droppables.
             *  Return false to disallow dropping on node. In this case
             *  dragOver and dragLeave are not called.
             *  Return 'over', 'before, or 'after' to force a hitMode.
             *  Return ['before', 'after'] to restrict available hitModes.
             *  Any other return value will calc the hitMode from the cursor position.
             */
            // Prevent dropping a parent below another parent (only sort
            // nodes under the same parent)
            /*
            if(node.parent !== data.otherNode.parent){
                return false;
            }
            // Don't allow dropping *over* a node (would create a child)
            return ["before", "after"];
            */
            return true;
        },
        dragDrop: function(node, data) {
            /** This function MUST be defined to enable dropping of items on
             *  the tree.
             */
            data.otherNode.moveTo(node, data.hitMode);
        }
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkFancyTree = function(){

        if (! this.length) return;

        if (typeof $.fn.fancytree == 'undefined') return;

        var extensions = [ "glyph" ];
        if (typeof this.attr('data-tree-dnd') !== "undefined") {
            extensions.push( "dnd" );
        }
        this.fancytree({
            extensions: extensions,
            glyph: tree_glyph_options,
            dnd: tree_dnd_options,
            clickFolderMode: 3,
            checkbox: typeof this.attr('data-tree-checkbox') !== "undefined" || false,
            selectMode: typeof this.attr('data-tree-select') !== "undefined" ? parseInt(this.attr('data-tree-select')) : 2
        });

    };

    // using default options
    $('[data-toggle="tree"]').each(function () {
        $(this).tkFancyTree();
    });

}(jQuery));
},{}],"/Code/html/themes/themekit/lib/essential/js/_wizard.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkWizard = function () {

        if (! this.length) return;

        if (typeof $.fn.slick == 'undefined') return;

        var t = this,
            container = t.closest('.wizard-container');

        t.slick({
            dots: false,
            arrows: false,
            slidesToShow: 1,
            rtl: this.data('rtl'),
            slide: 'fieldset',
            onAfterChange: function (wiz, index) {
                $(document).trigger('after.wizard.step', {
                    wiz: wiz,
                    target: index,
                    container: container,
                    element: t
                });
            }
        });

        container.find('.wiz-next').click(function (e) {
            e.preventDefault();
            t.slickNext();
        });

        container.find('.wiz-prev').click(function (e) {
            e.preventDefault();
            t.slickPrev();
        });

        container.find('.wiz-step').click(function (e) {
            e.preventDefault();
            t.slickGoTo($(this).data('target'));
        });

        $(document).on('show.bs.modal', function () {
            t.closest('.modal-body').hide();
        });

        $(document).on('shown.bs.modal', function () {
            t.closest('.modal-body').show();
            t.slickSetOption('dots', false, true);
        });

    };

    $('[data-toggle="wizard"]').each(function () {
        $(this).tkWizard();
    });

    /**
     * By leveraging events we can hook into the wizard to add functionality.
     * This example updates the progress bar after the wizard step changes.
     */
    $(document).on('after.wizard.step', function (event, data) {

        if (data.container.is('#wizard-demo-1')) {

            var target = data.container.find('.wiz-progress li:eq(' + data.target + ')');

            data.container.find('.wiz-progress li').removeClass('active complete');

            target.addClass('active');

            target.prevAll().addClass('complete');

        }

    });

}(jQuery));
},{}],"/Code/html/themes/themekit/lib/essential/js/main.js":[function(require,module,exports){
require('./_tabs');
require('./_tree');
require('./_show-hover');
require('./_daterangepicker');
require('./_expandable');
require('./_nestable');
require('./_cover');
require('./_tooltip');
require('./_tables');
require('./_check-all');
require('./_progress-bars');
require('./_iframe');
require('./_bootstrap-collapse');
require('./_bootstrap-carousel');
require('./_bootstrap-modal');
require('./_panel-collapse');

// Forms
require('./_touchspin');
require('./_select2');
require('./_slider');
require('./_selectpicker');
require('./_datepicker');
require('./_minicolors');
require('./_bootstrap-switch');
require('./_wizard');
require('./_summernote');
},{"./_bootstrap-carousel":"/Code/html/themes/themekit/lib/essential/js/_bootstrap-carousel.js","./_bootstrap-collapse":"/Code/html/themes/themekit/lib/essential/js/_bootstrap-collapse.js","./_bootstrap-modal":"/Code/html/themes/themekit/lib/essential/js/_bootstrap-modal.js","./_bootstrap-switch":"/Code/html/themes/themekit/lib/essential/js/_bootstrap-switch.js","./_check-all":"/Code/html/themes/themekit/lib/essential/js/_check-all.js","./_cover":"/Code/html/themes/themekit/lib/essential/js/_cover.js","./_datepicker":"/Code/html/themes/themekit/lib/essential/js/_datepicker.js","./_daterangepicker":"/Code/html/themes/themekit/lib/essential/js/_daterangepicker.js","./_expandable":"/Code/html/themes/themekit/lib/essential/js/_expandable.js","./_iframe":"/Code/html/themes/themekit/lib/essential/js/_iframe.js","./_minicolors":"/Code/html/themes/themekit/lib/essential/js/_minicolors.js","./_nestable":"/Code/html/themes/themekit/lib/essential/js/_nestable.js","./_panel-collapse":"/Code/html/themes/themekit/lib/essential/js/_panel-collapse.js","./_progress-bars":"/Code/html/themes/themekit/lib/essential/js/_progress-bars.js","./_select2":"/Code/html/themes/themekit/lib/essential/js/_select2.js","./_selectpicker":"/Code/html/themes/themekit/lib/essential/js/_selectpicker.js","./_show-hover":"/Code/html/themes/themekit/lib/essential/js/_show-hover.js","./_slider":"/Code/html/themes/themekit/lib/essential/js/_slider.js","./_summernote":"/Code/html/themes/themekit/lib/essential/js/_summernote.js","./_tables":"/Code/html/themes/themekit/lib/essential/js/_tables.js","./_tabs":"/Code/html/themes/themekit/lib/essential/js/_tabs.js","./_tooltip":"/Code/html/themes/themekit/lib/essential/js/_tooltip.js","./_touchspin":"/Code/html/themes/themekit/lib/essential/js/_touchspin.js","./_tree":"/Code/html/themes/themekit/lib/essential/js/_tree.js","./_wizard":"/Code/html/themes/themekit/lib/essential/js/_wizard.js"}],"/Code/html/themes/themekit/lib/layout/js/_async.js":[function(require,module,exports){
function contentLoaded(win, fn) {

    var done = false, top = true,

        doc = win.document,
        root = doc.documentElement,
        modern = doc.addEventListener,

        add = modern ? 'addEventListener' : 'attachEvent',
        rem = modern ? 'removeEventListener' : 'detachEvent',
        pre = modern ? '' : 'on',

        init = function (e) {
            if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
            (e.type == 'load' ? win : doc)[ rem ](pre + e.type, init, false);
            if (! done && (done = true)) fn.call(win, e.type || e);
        },

        poll = function () {
            try {
                root.doScroll('left');
            } catch (e) {
                setTimeout(poll, 50);
                return;
            }
            init('poll');
        };

    if (doc.readyState == 'complete') fn.call(win, 'lazy');
    else {
        if (! modern && root.doScroll) {
            try {
                top = ! win.frameElement;
            } catch (e) {
            }
            if (top) poll();
        }
        doc[ add ](pre + 'DOMContentLoaded', init, false);
        doc[ add ](pre + 'readystatechange', init, false);
        win[ add ](pre + 'load', init, false);
    }
}

module.exports = function(urls, callback) {

    var asyncLoader = function (urls, callback) {

        urls.foreach(function (i, file) {
            loadCss(file);
        });

        // checking for a callback function
        if (typeof callback == 'function') {
            // calling the callback
            contentLoaded(window, callback);
        }
    };

    var loadCss = function (url) {
        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = url;
        document.getElementsByTagName('head')[ 0 ].appendChild(link);
    };

    // simple foreach implementation
    Array.prototype.foreach = function (callback) {
        for (var i = 0; i < this.length; i ++) {
            callback(i, this[ i ]);
        }
    };

    asyncLoader(urls, callback);

};
},{}],"/Code/html/themes/themekit/lib/layout/js/_breakpoints.js":[function(require,module,exports){
(function ($) {

    $(window).setBreakpoints({
        distinct: true,
        breakpoints: [ 320, 480, 768, 1024 ]
    });

})(jQuery);
},{}],"/Code/html/themes/themekit/lib/layout/js/_gridalicious.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkGridalicious = function () {

        if (! this.length) return;

        this.gridalicious({
            gutter: this.data('gutter') || 15,
            width: this.data('width') || 370,
            selector: '> div',
            animationOptions: {
                complete: function () {
                    $(window).trigger('resize');
                }
            }
        });

    };

    $('[data-toggle*="gridalicious"]').each(function () {
        $(this).tkGridalicious();
    });

})(jQuery);
},{}],"/Code/html/themes/themekit/lib/layout/js/_isotope.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkIsotope = function () {

        if (! this.length) return;

        this.isotope({
            layoutMode: this.data('layoutMode') || "packery",
            itemSelector: '.item'
        });

        /*
        this.isotope('on', 'layoutComplete', function(){
            $(window).trigger('resize');
        });
        */

    };

    $(function(){

        setTimeout(function () {
            $('[data-toggle="isotope"]').each(function () {
                $(this).tkIsotope();
            });
        }, 300);

        $(document).on('domChanged', function(){
            $('[data-toggle="isotope"]').each(function(){
                $(this).isotope();
            });
        });

    });

})(jQuery);

},{}],"/Code/html/themes/themekit/lib/layout/js/_parallax.js":[function(require,module,exports){
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// MIT license
(function () {
    var lastTime = 0;
    var vendors = [ 'ms', 'moz', 'webkit', 'o' ];
    for (var x = 0; x < vendors.length && ! window.requestAnimationFrame; ++ x) {
        window.requestAnimationFrame = window[ vendors[ x ] + 'RequestAnimationFrame' ];
        window.cancelAnimationFrame = window[ vendors[ x ] + 'CancelAnimationFrame' ] || window[ vendors[ x ] + 'CancelRequestAnimationFrame' ];
    }

    if (! window.requestAnimationFrame)
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                    callback(currTime + timeToCall);
                },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (! window.cancelAnimationFrame)
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
}());

(function ($, window) {
    "use strict";

    $.fn.tkParallax = function () {

        if (Modernizr.touch) return;

        var getOptions = function (e) {
            return {
                speed: e.data('speed') || 4,
                translate: e.data('speed') || true,
                translateWhen: e.data('translateWhen') || 'inViewportTop',
                autoOffset: e.data('autoOffset'),
                offset: e.data('offset') || 0,
                opacity: e.data('opacity')
            };
        };

        var $window = $(window),
            $windowContent = $('.st-content-inner'),
            $element = this;

        var ticking = false,
            $scrollable = null,
            lastScrollTop = 0;

        var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

        var requestTick = function (e) {
            if (! ticking) {
                $scrollable = $(e.currentTarget);
                // although Safari has support for requestAnimationFrame,
                // the animation in this case is choppy so we'll just run it directly
                if (isSafari) {
                    animate();
                } else {
                    window.requestAnimationFrame(animate);
                    ticking = true;
                }
            }
        };

        // Translates an element on the Y axis using translate3d to ensure
        // that the rendering is done by the GPU
        var translateY = function (elm, value) {
            var translate = 'translate3d(0px,' + value + 'px, 0px)';
            elm.style[ '-webkit-transform' ] = translate;
            elm.style[ '-moz-transform' ] = translate;
            elm.style[ '-ms-transform' ] = translate;
            elm.style[ '-o-transform' ] = translate;
            elm.style.transform = translate;
        };

        var layers = $element.find('.parallax-layer');

        var init = function () {
            layers.each(function () {

                var layer = $(this),
                    layerOptions = getOptions(layer),
                    height = $element.outerHeight(true);

                if (layerOptions.translate) {
                    if (layer.is('img') && layerOptions.autoOffset) {
                        $.loadImage(layer.attr('src')).done(function () {
                            layer.removeAttr('style');
                            var layerHeight = layer.height();
                            var offset = layerHeight * 0.33;
                            if ((offset + height) > layerHeight) {
                                offset = layerHeight - height;
                            }
                            offset = offset * - 1;
                            layer.attr('data-offset', offset);
                            translateY(layer.get(0), offset);
                        });
                    }
                }

            });
        };

        init();
        $(window).on("debouncedresize", init);

        var animate = function () {
            var scrollTop = parseInt($scrollable.scrollTop());
            var scrollableTop = $scrollable.is($window) ? 0 : $scrollable.offset().top;
            var height = $element.outerHeight(true);
            var bodyPadding = {
                top: parseInt($(document.body).css('padding-top')),
                bottom: parseInt($(document.body).css('padding-bottom'))
            };
            var windowHeight = $scrollable.innerHeight();
            var windowBottom = scrollTop + windowHeight - (bodyPadding.bottom + bodyPadding.top);
            var top = $element.offset().top - scrollableTop - bodyPadding.top;
            var bottom = top + height;
            var topAbs = Math.abs(top);
            var pos = top / windowHeight * 100;
            var opacityKey = height * 0.5;
            var when = {};

            /*
             * ONLY when the scrollable element IS NOT the window
             */

            // when the element is anywhere in viewport
            when.inViewport = (bottom > 0) && (top < windowHeight);

            // when the top of the viewport is crossing the element
            when.inViewportTop = (bottom > 0) && (top < 0);

            // when the bottom of the viewport is crossing the element
            when.inViewportBottom = (bottom > 0) && (top < windowHeight) && (bottom > windowHeight);

            /*
             * ONLY when the scrollable element IS the window
             */

            if ($scrollable.is($window)) {

                // when the window is scrollable and the element is completely in the viewport
                when.inWindowViewportFull = (top >= scrollTop) && (bottom <= windowBottom);

                when.inWindowViewport2 = (top >= scrollTop) && (top <= windowBottom);

                when.inWindowViewport3 = (bottom >= scrollTop) && (bottom <= windowBottom);

                when.inWindowViewport4 = (bottom >= scrollTop) && (bottom >= windowHeight) && (height > windowHeight);

                // when the window is scrollable and the top of the viewport is crossing the element
                when.inWindowViewportTop = ! when.inWindowViewport2 && (when.inWindowViewport3 || when.inWindowViewport4);

                // when the window is scrollable and the bottom of the viewport is crossing the element
                when.inWindowViewportBottom = when.inWindowViewport2 && ! when.inWindowViewport3;

                // when the window is scrollable and the element is anywhere in viewport
                when.inWindowViewport = when.inWindowViewportTop || when.inWindowViewportBottom || when.inWindowViewportFull;

                when.inViewport = when.inWindowViewport;
                when.inViewportTop = when.inWindowViewportTop;
                when.inViewportBottom = when.inWindowViewportBottom;

                pos = (top - scrollTop) / windowHeight * 100;
            }

            if (when.inViewportTop && when.inViewportBottom) {
                when.inViewportBottom = false;
            }

            if (! isNaN(scrollTop)) {
                layers.each(function () {

                    var layer = $(this);
                    var layerOptions = getOptions(layer);

                    var ty = (windowHeight + height) - bottom;

                    if ($scrollable.is($window)) {
                        ty = windowBottom - top;
                    }

                    if (layerOptions.translate) {

                        var layerPos = (- 1 * pos * layerOptions.speed) + layerOptions.offset;
                        var layerHeight = layer.height();

                        if (when.inViewport && ! when.inViewportTop && ! when.inViewportBottom) {
                            if (layer.is('img') && layerHeight > height) {
                                if ((Math.abs(layerPos) + height) > layerHeight) {
                                    layerPos = (layerHeight - height) * - 1;
                                }
                            }
                            if (! layer.is('img')) {
                                layerPos = 0;
                            }
                        }

                        if (when.inViewportTop && ((layer.is('img') && layerHeight == height) || ! layer.is('img') )) {
                            layerPos = Math.abs(layerPos);
                        }

                        if (when.inViewportBottom && ! layer.is('img')) {
                            layerPos = height - ty;

                            // scrolling up
                            if (scrollTop < lastScrollTop) {
                                layerPos = layerPos * - 1;
                            }
                        }

                        if (when.inViewport) {
                            layerPos = (layerPos).toFixed(5);
                            if (layerHeight > $window.height() && scrollTop <= 0) {
                                layerPos = 0;
                            }
                            translateY(layer.get(0), layerPos);
                        }

                    }

                    if (layerOptions.opacity) {

                        // fade in
                        if (when.inViewportBottom) {

                            var y, yP;

                            if ($scrollable.is($window)) {

                                y = ty;
                                yP = (y / height).toFixed(5);

                                if (y > opacityKey) {
                                    layer.css({opacity: yP});
                                }
                                else {
                                    layer.css({opacity: 0});
                                }
                            }
                            else {
                                if (bottom < (windowHeight + opacityKey)) {

                                    y = (windowHeight + opacityKey) - bottom;
                                    yP = (y / opacityKey).toFixed(5);

                                    layer.css({opacity: yP});
                                } else {
                                    layer.css({opacity: 0});
                                }
                            }
                        }

                        // fade out
                        else if (when.inViewportTop) {
                            var topOrigin = $scrollable.is($window) ? scrollTop - top : topAbs;
                            if (topOrigin > opacityKey) {
                                layer.css({
                                    'opacity': (1 - (topOrigin / height)).toFixed(5)
                                });
                            } else {
                                layer.css({'opacity': 1});
                            }
                        }

                        // reset
                        else {
                            layer.css({'opacity': 1});
                        }

                        if (when.inViewportBottom && scrollTop <= 0) {
                            layer.css({'opacity': 1});
                        }

                    }

                });

                lastScrollTop = scrollTop;
            }

            ticking = false;
        };

        if ($windowContent.length) {
            $windowContent.scroll(requestTick);
        } else {
            $window.scroll(requestTick);
        }

    };

    $('.parallax').each(function () {
        $(this).tkParallax();
    });

})(jQuery, window);
},{}],"/Code/html/themes/themekit/lib/layout/js/_scrollable.js":[function(require,module,exports){
(function ($) {
    "use strict";

    var skin = require('./_skin')();

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkScrollable = function (options) {

        if (! this.length) return;

        var settings = $.extend({
            horizontal: false
        }, options);

        var nice = this.niceScroll({
            cursorborder: 0,
            cursorcolor: config.skins[ skin ][ 'primary-color' ],
            horizrailenabled: settings.horizontal
        });

        if (! settings.horizontal) return;

        var _super = nice.getContentSize;

        nice.getContentSize = function () {
            var page = _super.call(nice);
            page.h = nice.win.height();
            return page;
        };

    };

    $('[data-scrollable]').tkScrollable();

    $('[data-scrollable-h]').each(function () {

       $(this).tkScrollable({ horizontal: true });

    });

    var t;
    $(window).on('debouncedresize', function () {
        clearTimeout(t);
        t = setTimeout(function () {
            $('[data-scrollable], [data-scrollable-h]').getNiceScroll().resize();
        }, 100);
    });

}(jQuery));
},{"./_skin":"/Code/html/themes/themekit/lib/layout/js/_skin.js"}],"/Code/html/themes/themekit/lib/layout/js/_sidebar-pc.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $.fn.tkSidebarSizePcDemo = function(){

        var t, spc_demo = this;

        if (! spc_demo.length) return;

        $(document)
            .on('sidebar.show', function(){
                $('#pc-open').prop('disabled', true);
            })
            .on('sidebar.hidden', function(){
                $('#pc-open').prop('disabled', false);
            });

        spc_demo.on('submit', function (e) {
            e.preventDefault();
            var s = $('.sidebar'), ve = $('#pc-value'), v = ve.val();
            ve.blur();
            if (! v.length || v < 25) {
                v = 25;
                ve.val(v);
            }
            s[ 0 ].className = s[ 0 ].className.replace(/sidebar-size-([\d]+)pc/ig, 'sidebar-size-' + v + 'pc');
            sidebar.open('sidebar-menu');
            clearTimeout(t);
            t = setTimeout(function () {
                sidebar.close('sidebar-menu');
            }, 5000);
        });

    };

    $('[data-toggle="sidebar-size-pc-demo"]').tkSidebarSizePcDemo();

})(jQuery);
},{}],"/Code/html/themes/themekit/lib/layout/js/_skin.js":[function(require,module,exports){
module.exports=require("/Code/html/themes/themekit/lib/charts/js/lib/_skin.js")
},{"/Code/html/themes/themekit/lib/charts/js/lib/_skin.js":"/Code/html/themes/themekit/lib/charts/js/lib/_skin.js"}],"/Code/html/themes/themekit/lib/layout/js/_skins.js":[function(require,module,exports){
var asyncLoader = require('./_async');

(function ($) {

    var changeSkin = function () {
        var skin = $.cookie("skin"),
            file = $.cookie("skin-file");
        if (typeof skin != 'undefined') {
            asyncLoader([ 'css/' + file + '.css' ], function () {
                $('[data-skin]').removeProp('disabled').parent().removeClass('loading');
            });
        }
    };

    $('[data-skin]').on('click', function () {

        if ($(this).prop('disabled')) return;

        $('[data-skin]').prop('disabled', true);

        $(this).parent().addClass('loading');

        $.cookie("skin", $(this).data('skin'));

        $.cookie("skin-file", $(this).data('file'));

        changeSkin();

    });

    var skin = $.cookie("skin");

    if (typeof skin != 'undefined' && skin != 'default') {
        changeSkin();
    }

})(jQuery);
},{"./_async":"/Code/html/themes/themekit/lib/layout/js/_async.js"}],"/Code/html/themes/themekit/lib/layout/js/main.js":[function(require,module,exports){
require('./_breakpoints.js');
require('./_gridalicious.js');
require('./_scrollable.js');
require('./_skins');
require('./_isotope');
require('./_parallax');

// Sidebar Percentage Sizes Demo
require('./_sidebar-pc');
},{"./_breakpoints.js":"/Code/html/themes/themekit/lib/layout/js/_breakpoints.js","./_gridalicious.js":"/Code/html/themes/themekit/lib/layout/js/_gridalicious.js","./_isotope":"/Code/html/themes/themekit/lib/layout/js/_isotope.js","./_parallax":"/Code/html/themes/themekit/lib/layout/js/_parallax.js","./_scrollable.js":"/Code/html/themes/themekit/lib/layout/js/_scrollable.js","./_sidebar-pc":"/Code/html/themes/themekit/lib/layout/js/_sidebar-pc.js","./_skins":"/Code/html/themes/themekit/lib/layout/js/_skins.js"}],"/Code/html/themes/themekit/lib/maps/js/_skin.js":[function(require,module,exports){
module.exports=require("/Code/html/themes/themekit/lib/charts/js/lib/_skin.js")
},{"/Code/html/themes/themekit/lib/charts/js/lib/_skin.js":"/Code/html/themes/themekit/lib/charts/js/lib/_skin.js"}],"/Code/html/themes/themekit/lib/maps/js/google/_edit.js":[function(require,module,exports){
(function ($) {
    "use strict";

    var find = function (mapData, location, marker, markerData) {

        var eventData = $.extend({}, {marker: marker}, markerData, mapData),
            state = '',
            country = '',
            address = '';

        mapData.container.gmap('search', {'location': location}, function (results, status) {

            if (status === 'OK') {
                address = results[ 0 ].formatted_address;
                $.each(results[ 0 ].address_components, function (i, v) {
                    if (v.types[ 0 ] == "administrative_area_level_1" || v.types[ 0 ] == "administrative_area_level_2") {
                        state = v.long_name;
                    } else if (v.types[ 0 ] == "country") {
                        country = v.long_name;
                    }
                });
                eventData = $.extend({}, eventData, {state: state, country: country, address: address});
            }

            $(document).trigger('map.marker.find', eventData);

        });

    };

    var bindFind = function(marker, markerData, data) {

        if (typeof markerData.open !== 'undefined' && markerData.open === true) {
            find(data, markerData.latLng, marker, markerData);
        }

        google.maps.event.addListener(marker, 'dragend', function (e) {
            find(data, e.latLng, this, markerData);
        });

        google.maps.event.addListener(marker, 'click', function (e) {
            find(data, e.latLng, this, markerData);
        });

    };

    $(document).on('map.init', function (event, data) {

        if (data.container.data('id') == 'map-edit') {

            var markers = data.container.gmap('get', 'markers'),
                markerOptions = {
                    "draggable": true
                },
                markerData = {
                    "open": true,
                    "template": "tpl-edit",
                    "icon": "building-01"
                };

            google.maps.event.addListener(data.map, 'click', function (event) {

                markerData = $.extend({}, markerData, {"latLng": event.latLng});

                var marker = data.addMarker(markers.length, markerData, markerOptions);

                bindFind(marker, markerData, data);

            });

            google.maps.event.addListener(data.iw.window, 'domready', function () {

                $('#map-delete-marker').on('click', function (e) {
                    e.stopPropagation();
                    var id = $(this).data('id');
                    data.iw.close(id);
                    markers[ id ].setMap(null);
                });

            });

            $.each(markers, function(i, marker){

                var markerData = marker.get('content');

                bindFind(marker, markerData, data);

            });

        }

    });

    $(document).on('map.marker.find', function (event, data) {

        data.marker.setTitle(data.address);

        if (data.iw.window.isOpen === false) return;

        data.iw.open(data.marker.get('id'), data);

    });

})(jQuery);
},{}],"/Code/html/themes/themekit/lib/maps/js/google/_filters.js":[function(require,module,exports){
(function ($) {
    "use strict";

    var arrayUnique = function(a) {
        return a.reduce(function(p, c) {
            if (p.indexOf(c) < 0) p.push(c);
            return p;
        }, []);
    };

    var filter = function(data){

        data.iw.close();
        data.container.gmap('set', 'bounds', null);

        var filters = [];

        $('#radios :checked').each(function (i, checkbox) {
            filters.push($(checkbox).val());
        });

        if (filters.length) {
            data.container.gmap('find', 'markers', {
                'property': 'tags',
                'value': filters,
                'operator': 'OR'
            }, function (marker, found) {
                if (found) {
                    data.container.gmap('addBounds', marker.position);
                }
                marker.setVisible(found);
            });
        } else {
            $.each(data.container.gmap('get', 'markers'), function (i, marker) {
                data.container.gmap('addBounds', marker.position);
                marker.setVisible(false);
            });
        }

    };

    $(document).on('map.init', function (event, data) {

        if (data.container.data('filters') === true) {

            var map = data,
                markers = data.container.gmap('get', 'markers'),
                tags = [],
                templateId = data.container.data('filtersTemplate') || '#map-filters-template';

            $.each(markers, function(i, marker){
                $.each(marker.tags, function(i, tag){
                    tags.push(tag);
                });
            });

            tags = arrayUnique(tags);

            var source = $(templateId).html();
            var template = Handlebars.compile(source);
            var $el = $(template({ tags: tags }));

            $el.insertAfter(data.container);

            var skin = require('../../../layout/js/_skin')();

            $('[data-scrollable]', $el).niceScroll({
                cursorborder: 0,
                cursorcolor: config.skins[ skin ][ 'primary-color' ],
                horizrailenabled: false
            });

            setTimeout(function(){
                filter(data);
            }, 100);

            $('body').on('click', '#radios :checkbox', function(){
                filter(data);
            });

        }

    });

})(jQuery);
},{"../../../layout/js/_skin":"/Code/html/themes/themekit/lib/layout/js/_skin.js"}],"/Code/html/themes/themekit/lib/maps/js/google/_library.js":[function(require,module,exports){
module.exports = function () {

    var centerWindow = function (container, map, data) {

        if (data.lat && data.lng) {

            container.gmap('option', 'center', new google.maps.LatLng(data.lat, data.lng));

            map.panBy(0, -170);

            return true;

        }
        return false;
    };

    var centerMap = function (container, data) {

        if (data && data.length === 2) {

            container.gmap('option', 'center', new google.maps.LatLng(data[ 0 ], data[ 1 ]));

            return true;

        }
        return false;
    };

    var resize = function (container, map, windowData, mapData) {

        if (typeof google == 'undefined') return;

        google.maps.event.trigger(map, 'resize');

        if (! centerMap(container, mapData)) centerWindow(container, map, windowData);

    };

    return {
        centerWindow: centerWindow,
        centerMap: centerMap,
        resize: resize
    };

};
},{}],"/Code/html/themes/themekit/lib/maps/js/google/main.js":[function(require,module,exports){
function loadScript() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&' +
    'callback=initGoogleMaps';
    document.body.appendChild(script);
}

window.onload = loadScript;

function initScripts() {
    // var $scripts = [
    //     "js/vendor/maps/google/jquery-ui-map/ui/jquery.ui.map.js",
    //     "js/vendor/maps/google/jquery-ui-map/ui/jquery.ui.map.extensions.js",
    //     "js/vendor/maps/google/jquery-ui-map/ui/jquery.ui.map.services.js",
    //     "js/vendor/maps/google/jquery-ui-map/ui/jquery.ui.map.microdata.js",
    //     "js/vendor/maps/google/jquery-ui-map/ui/jquery.ui.map.microformat.js",
    //     "js/vendor/maps/google/jquery-ui-map/ui/jquery.ui.map.overlays.js",
    //     "js/vendor/maps/google/jquery-ui-map/ui/jquery.ui.map.rdfa.js",
    //     "js/vendor/maps/google/jquery-ui-map/addons/infobox_packed.js",
    //     "js/vendor/maps/google/jquery-ui-map/addons/markerclusterer.min.js"
    // ];

    // $.each($scripts, function (k, v) {
    //     if ($('[src="' + v + '"]').length) return true;
    //     var scriptNode = document.createElement('script');

    //     scriptNode.src = v;
    //     $('head').prepend($(scriptNode));
    // });

    $.extend($.ui.gmap.prototype, {
        pagination: function (prop, mapData) {
            var source = $("#map-pagination").html();
            var template = Handlebars.compile(source);
            var $el = $(template());

            var self = this, i = 0;
            prop = prop || 'title';
            self.set('pagination', function (a, b) {
                if (a) {
                    i = i + b;
                    var m = self.get('markers')[ i ];
                    mapData.iw.open(i, m.get('content'));
                    $el.find('.display').text(m[ prop ]);
                    self.get('map').panTo(m.getPosition());
                }
            });
            self.get('pagination')(true, 0);
            $el.find('.back-btn').click(function (e) {
                e.preventDefault();
                self.get('pagination')((i > 0), - 1, this);
            });
            $el.find('.fwd-btn').click(function (e) {
                e.preventDefault();
                self.get('pagination')((i < self.get('markers').length - 1), 1, this);
            });
            self.addControl($el, google.maps.ControlPosition[ mapData.options.paginationPosition ]);
        }
    });
}

var library = require('./_library.js')();

// Holds google maps styles
var styles = {
    "light-grey": require('./styles/_light-grey.js'),
    "light-monochrome": require('./styles/_light-monochrome.js'),
    "cool-grey": require('./styles/_cool-grey.js'),
    "blue-gray": require('./styles/_blue-gray.js'),
    "paper": require('./styles/_paper.js'),
    "apple": require('./styles/_apple.js'),
    "light-green": require('./styles/_light-green.js'),
    "lemon-tree": require('./styles/_lemon-tree.js'),
    "clean-cut": require('./styles/_clean-cut.js'),
    "nature": require('./styles/_nature.js')
};

// Process the infoWindow content via Handlebars templates
var infoWindowContent = function (marker) {
    var source = $("#" + marker.template).html();
    var template = Handlebars.compile(source);
    return template(marker);
};

/**
 * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
 */
$.fn.tkGoogleMap = function () {

    if (! this.length) return;

    var container = this;

    if (typeof google == 'undefined' || typeof InfoBox == 'undefined') {
        setTimeout(function(){
            container.tkGoogleMap();
        }, 200);

        return;
    }

    var options = {
        mapZoomPosition: container.data('zoomPosition') || "TOP_LEFT",
        mapZoom: container.data('zoom') || 16,
        mapStyle: container.data('style') || "light-grey",
        mapType: container.data('type') || "ROADMAP",
        file: container.data('file'),
        center: container.data('center') ? container.data('center').split(",") : false,
        pagination: container.data('pagination') || false,
        paginationPosition: container.data('paginationPosition') || 'TOP_LEFT',
        draggable: container.data('draggable') !== false
    };

    var mapData;

    // provide a default object for data collected from the currently opened infoWindow
    var infoWindowData = {
        lat: false,
        lng: false
    };

    var infoWindowOpen = function (i, marker) {

        var markerInst = container.gmap('get', 'markers')[ i ];

        infoWindow.setContent(infoWindowContent(marker));
        infoWindow.open(map, markerInst);
        infoWindow.isOpen = i;

        infoWindowData = {
            lat: marker.latitude,
            lng: marker.longitude
        };
    };

    var infoWindowClose = function (i) {
        if (typeof i == 'undefined') {
            infoWindow.close();
            infoWindow.isOpen = false;
            return true;
        }
        if (typeof infoWindow.isOpen != 'undefined' && infoWindow.isOpen === i) {
            infoWindow.close();
            infoWindow.isOpen = false;
            return true;
        }
        return false;
    };

    /* InfoBox */
    var infoWindow = new InfoBox({
        maxWidth: 240,
        alignBottom: true
    });

    var addMarker = function (i, marker, options) {
        var iconBase = 'images/markers/';
        var position = typeof marker.latLng !== 'undefined' ? marker.latLng : false;
        if (! position && typeof marker.latitude !== 'undefined' && typeof marker.longitude !== 'undefined') position = new google.maps.LatLng(marker.latitude, marker.longitude);
        if (! position) return false;

        var markerOptions = {
            "id": i,
            "position": position,
            "draggable": true,
            "icon": iconBase + marker.icon + ".png"
        };

        if (typeof options == 'object') markerOptions = $.extend({}, markerOptions, options);

        var open = typeof marker.open !== 'undefined' && marker.open === true;

        container.gmap('addMarker', markerOptions);

        var markerInst = container.gmap('get', 'markers')[ i ];

        markerInst.setTitle(marker.title);

        google.maps.event.addListener(markerInst, 'click', function () {
            if (! infoWindowClose(i)) {
                infoWindowOpen(i, marker);
                library.centerWindow(container, map, infoWindowData);
            }
        });

        google.maps.event.addListener(markerInst, 'dragend', function () {
            var lat = markerInst.getPosition().lat();
            var lng = markerInst.getPosition().lng();
            console.log('"latitude": ' + lat + ', "longitude": ' + lng);
        });

        var markerData = $.extend({}, marker, {
            "id": i,
            "latLng": new google.maps.LatLng(marker.latitude, marker.longitude)
        });

        markerInst.set('content', markerData);

        if (open) infoWindowOpen(i, marker);

        return markerInst;
    };

    container.gmap(
        {
            'zoomControl': true,
            'zoomControlOptions': {
                'style': google.maps.ZoomControlStyle.SMALL,
                'position': google.maps.ControlPosition[ options.mapZoomPosition ]
            },
            'panControl': false,
            'streetViewControl': false,
            'mapTypeControl': false,
            'overviewMapControl': false,
            'scrollwheel': false,
            'draggable': options.draggable,
            'mapTypeId': google.maps.MapTypeId[ options.mapType ],
            'zoom': options.mapZoom,
            'styles': styles[ options.mapStyle ]
        })
        .bind('init', function () {

            mapData = {
                container: container,
                map: map,
                options: options,
                addMarker: addMarker,
                library: library,
                iw: {
                    data: infoWindowData,
                    window: infoWindow,
                    content: infoWindowContent,
                    open: infoWindowOpen,
                    close: infoWindowClose
                }
            };

            if (options.file) {

                $.getJSON(options.file, function (data) {

                    $.each(data.markers, function (i, marker) {
                        var o = typeof marker.options !== 'undefined' ? marker.options : {};
                        addMarker(i, marker, o);
                    });

                    google.maps.event.addListenerOnce(map, 'idle', function () {

                        library.resize(container, map, infoWindowData, options.center);

                        if (options.pagination) {
                            container.gmap('pagination', 'title', mapData);
                        }

                    });
                });

            }
            else {
                library.centerMap(container, options.center);
            }

            google.maps.event.addListenerOnce(map, 'idle', function () {

                $(document).trigger('map.init', mapData);

            });

            google.maps.event.addListener(infoWindow, 'domready', function () {
                var iw = $('.infoBox');
                infoWindow.setOptions({
                    pixelOffset: new google.maps.Size(- Math.abs(iw.width() / 2), - 45)
                });
                setTimeout(function(){

                    $('.cover', iw).each(function(){
                        $(this).tkCover();
                    });

                }, 200);
            });
        });

    var map = container.gmap('get', 'map');

    var t;
    $(window).on('debouncedresize', function () {
        clearTimeout(t);
        t = setTimeout(function () {
            library.resize(container, map, infoWindowData, options.center);
        }, 100);
    });

    // handle maps in collapsibles
    $('.collapse').on('shown.bs.collapse', function(){
        if ($(container, this).length) {
            library.resize(container, map, infoWindowData, options.center);
        }
    });

};

module.exports = function () {
    initScripts();

    /*
     * Clustering
     */
    if ($('#google-map-clustering').length) {
        // We need to bind the map with the "init" event otherwise bounds will be null
        $('#google-map-clustering').gmap({'zoom': 2, 'disableDefaultUI': true}).bind('init', function (evt, map) {
            var bounds = map.getBounds();
            var southWest = bounds.getSouthWest();
            var northEast = bounds.getNorthEast();
            var lngSpan = northEast.lng() - southWest.lng();
            var latSpan = northEast.lat() - southWest.lat();

            function openInfoWindow() {
                $('#google-map-clustering').gmap('openInfoWindow', {content: 'Hello world!'}, this);
            }

            for (var i = 0; i < 1000; i ++) {
                var lat = southWest.lat() + latSpan * Math.random();
                var lng = southWest.lng() + lngSpan * Math.random();
                $('#google-map-clustering').gmap('addMarker', {
                    'position': new google.maps.LatLng(lat, lng)
                }).click(openInfoWindow);
            }

            $('#google-map-clustering').gmap('set', 'MarkerClusterer', new MarkerClusterer(map, $(this).gmap('get', 'markers')));
        });
    }

};

(function($){
    "use strict";

    $(document).on('map.init', function (event, data) {

        var styleTpl = $('#map-style-switch'),
            toggleStyleWrapper = $('[data-toggle="map-style-switch"]');

        if (styleTpl.length && toggleStyleWrapper.length) {

            var target = $(toggleStyleWrapper.data('target'));

            if (! target) return;

            if (data.container.is(target)) {

                var s = styleTpl.html();
                var t = Handlebars.compile(s);

                toggleStyleWrapper.html(t({
                    styles: styles
                }));

                $('select', toggleStyleWrapper).val(data.options.mapStyle);

                if (typeof $.fn.selectpicker != 'undefined') {

                    $('.selectpicker', toggleStyleWrapper).each(function () {
                        $(this).selectpicker({
                            width: $(this).data('width') || '100%'
                        });
                    });

                }

                var skin = require('../_skin')();

                $('[data-scrollable]', toggleStyleWrapper).niceScroll({
                    cursorborder: 0,
                    cursorcolor: config.skins[ skin ][ 'primary-color' ],
                    horizrailenabled: false
                });

                $('select', toggleStyleWrapper).on('change', function () {
                    var style = typeof styles[ $(this).val() ] ? styles[ $(this).val() ] : false;
                    if (! style) return;

                    target.gmap('option', 'styles', style);
                });

            }

        }

    });

    $('[data-toggle="google-maps"]').each(function () {

        $(this).tkGoogleMap();

    });

})(jQuery);

require('./_edit');
require('./_filters');
},{"../_skin":"/Code/html/themes/themekit/lib/maps/js/_skin.js","./_edit":"/Code/html/themes/themekit/lib/maps/js/google/_edit.js","./_filters":"/Code/html/themes/themekit/lib/maps/js/google/_filters.js","./_library.js":"/Code/html/themes/themekit/lib/maps/js/google/_library.js","./styles/_apple.js":"/Code/html/themes/themekit/lib/maps/js/google/styles/_apple.js","./styles/_blue-gray.js":"/Code/html/themes/themekit/lib/maps/js/google/styles/_blue-gray.js","./styles/_clean-cut.js":"/Code/html/themes/themekit/lib/maps/js/google/styles/_clean-cut.js","./styles/_cool-grey.js":"/Code/html/themes/themekit/lib/maps/js/google/styles/_cool-grey.js","./styles/_lemon-tree.js":"/Code/html/themes/themekit/lib/maps/js/google/styles/_lemon-tree.js","./styles/_light-green.js":"/Code/html/themes/themekit/lib/maps/js/google/styles/_light-green.js","./styles/_light-grey.js":"/Code/html/themes/themekit/lib/maps/js/google/styles/_light-grey.js","./styles/_light-monochrome.js":"/Code/html/themes/themekit/lib/maps/js/google/styles/_light-monochrome.js","./styles/_nature.js":"/Code/html/themes/themekit/lib/maps/js/google/styles/_nature.js","./styles/_paper.js":"/Code/html/themes/themekit/lib/maps/js/google/styles/_paper.js"}],"/Code/html/themes/themekit/lib/maps/js/google/styles/_apple.js":[function(require,module,exports){
module.exports = [ {
    "featureType": "landscape.man_made",
    "elementType": "geometry",
    "stylers": [ {"color": "#f7f1df"} ]
}, {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [ {"color": "#d0e3b4"} ]
}, {
    "featureType": "landscape.natural.terrain",
    "elementType": "geometry",
    "stylers": [ {"visibility": "off"} ]
}, {
    "featureType": "poi",
    "elementType": "labels",
    "stylers": [ {"visibility": "off"} ]
}, {
    "featureType": "poi.business",
    "elementType": "all",
    "stylers": [ {"visibility": "off"} ]
}, {
    "featureType": "poi.medical",
    "elementType": "geometry",
    "stylers": [ {"color": "#fbd3da"} ]
}, {"featureType": "poi.park", "elementType": "geometry", "stylers": [ {"color": "#bde6ab"} ]}, {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [ {"visibility": "off"} ]
}, {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [ {"visibility": "off"} ]
}, {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [ {"color": "#ffe15f"} ]
}, {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [ {"color": "#efd151"} ]
}, {
    "featureType": "road.arterial",
    "elementType": "geometry.fill",
    "stylers": [ {"color": "#ffffff"} ]
}, {
    "featureType": "road.local",
    "elementType": "geometry.fill",
    "stylers": [ {"color": "black"} ]
}, {
    "featureType": "transit.station.airport",
    "elementType": "geometry.fill",
    "stylers": [ {"color": "#cfb2db"} ]
}, {"featureType": "water", "elementType": "geometry", "stylers": [ {"color": "#a2daf2"} ]} ];
},{}],"/Code/html/themes/themekit/lib/maps/js/google/styles/_blue-gray.js":[function(require,module,exports){
module.exports = [ {
    "featureType": "water",
    "stylers": [ {"visibility": "on"}, {"color": "#b5cbe4"} ]
}, {"featureType": "landscape", "stylers": [ {"color": "#efefef"} ]}, {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [ {"color": "#83a5b0"} ]
}, {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [ {"color": "#bdcdd3"} ]
}, {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [ {"color": "#ffffff"} ]
}, {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [ {"color": "#e3eed3"} ]
}, {
    "featureType": "administrative",
    "stylers": [ {"visibility": "on"}, {"lightness": 33} ]
}, {"featureType": "road"}, {
    "featureType": "poi.park",
    "elementType": "labels",
    "stylers": [ {"visibility": "on"}, {"lightness": 20} ]
}, {}, {"featureType": "road", "stylers": [ {"lightness": 20} ]} ];
},{}],"/Code/html/themes/themekit/lib/maps/js/google/styles/_clean-cut.js":[function(require,module,exports){
module.exports = [ {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [ {"lightness": 100}, {"visibility": "simplified"} ]
}, {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [ {"visibility": "on"}, {"color": "#C6E2FF"} ]
}, {"featureType": "poi", "elementType": "geometry.fill", "stylers": [ {"color": "#C5E3BF"} ]}, {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [ {"color": "#D1D1B8"} ]
} ];
},{}],"/Code/html/themes/themekit/lib/maps/js/google/styles/_cool-grey.js":[function(require,module,exports){
module.exports = [ {
    "featureType": "landscape",
    "elementType": "labels",
    "stylers": [ {"visibility": "off"} ]
}, {"featureType": "transit", "elementType": "labels", "stylers": [ {"visibility": "off"} ]}, {
    "featureType": "poi",
    "elementType": "labels",
    "stylers": [ {"visibility": "off"} ]
}, {"featureType": "water", "elementType": "labels", "stylers": [ {"visibility": "off"} ]}, {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [ {"visibility": "off"} ]
}, {"stylers": [ {"hue": "#00aaff"}, {"saturation": - 100}, {"gamma": 2.15}, {"lightness": 12} ]}, {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [ {"visibility": "on"}, {"lightness": 24} ]
}, {"featureType": "road", "elementType": "geometry", "stylers": [ {"lightness": 57} ]} ];
},{}],"/Code/html/themes/themekit/lib/maps/js/google/styles/_lemon-tree.js":[function(require,module,exports){
module.exports = [ {
    "featureType": "road.highway",
    "elementType": "labels",
    "stylers": [ {"hue": "#ffffff"}, {"saturation": - 100}, {"lightness": 100}, {"visibility": "off"} ]
}, {
    "featureType": "landscape.natural",
    "elementType": "all",
    "stylers": [ {"hue": "#ffffff"}, {"saturation": - 100}, {"lightness": 100}, {"visibility": "on"} ]
}, {
    "featureType": "road",
    "elementType": "all",
    "stylers": [ {"hue": "#ffe94f"}, {"saturation": 100}, {"lightness": 4}, {"visibility": "on"} ]
}, {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [ {"hue": "#ffe94f"}, {"saturation": 100}, {"lightness": 4}, {"visibility": "on"} ]
}, {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [ {"hue": "#333333"}, {"saturation": - 100}, {"lightness": - 74}, {"visibility": "off"} ]
} ];
},{}],"/Code/html/themes/themekit/lib/maps/js/google/styles/_light-green.js":[function(require,module,exports){
module.exports = [ {"stylers": [ {"hue": "#baf4c4"}, {"saturation": 10} ]}, {
    "featureType": "water",
    "stylers": [ {"color": "#effefd"} ]
}, {
    "featureType": "all",
    "elementType": "labels",
    "stylers": [ {"visibility": "off"} ]
}, {
    "featureType": "administrative",
    "elementType": "labels",
    "stylers": [ {"visibility": "on"} ]
}, {"featureType": "road", "elementType": "all", "stylers": [ {"visibility": "off"} ]}, {
    "featureType": "transit",
    "elementType": "all",
    "stylers": [ {"visibility": "off"} ]
} ];
},{}],"/Code/html/themes/themekit/lib/maps/js/google/styles/_light-grey.js":[function(require,module,exports){
module.exports = [ {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [ {"color": "#e9e9e9"}, {"lightness": 17} ]
}, {
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [ {"color": "#f5f5f5"}, {"lightness": 20} ]
}, {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [ {"color": "#ffffff"}, {"lightness": 17} ]
}, {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [ {"color": "#ffffff"}, {"lightness": 29}, {"weight": 0.2} ]
}, {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [ {"color": "#ffffff"}, {"lightness": 18} ]
}, {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [ {"color": "#ffffff"}, {"lightness": 16} ]
}, {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [ {"color": "#f5f5f5"}, {"lightness": 21} ]
}, {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [ {"color": "#dedede"}, {"lightness": 21} ]
}, {
    "elementType": "labels.text.stroke",
    "stylers": [ {"visibility": "on"}, {"color": "#ffffff"}, {"lightness": 16} ]
}, {
    "elementType": "labels.text.fill",
    "stylers": [ {"saturation": 36}, {"color": "#333333"}, {"lightness": 40} ]
}, {"elementType": "labels.icon", "stylers": [ {"visibility": "off"} ]}, {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [ {"color": "#f2f2f2"}, {"lightness": 19} ]
}, {
    "featureType": "administrative",
    "elementType": "geometry.fill",
    "stylers": [ {"color": "#fefefe"}, {"lightness": 20} ]
}, {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [ {"color": "#fefefe"}, {"lightness": 17}, {"weight": 1.2} ]
} ];
},{}],"/Code/html/themes/themekit/lib/maps/js/google/styles/_light-monochrome.js":[function(require,module,exports){
module.exports = [ {
    "featureType": "administrative.locality",
    "elementType": "all",
    "stylers": [ {"hue": "#2c2e33"}, {"saturation": 7}, {"lightness": 19}, {"visibility": "on"} ]
}, {
    "featureType": "landscape",
    "elementType": "all",
    "stylers": [ {"hue": "#ffffff"}, {"saturation": - 100}, {"lightness": 100}, {"visibility": "simplified"} ]
}, {
    "featureType": "poi",
    "elementType": "all",
    "stylers": [ {"hue": "#ffffff"}, {"saturation": - 100}, {"lightness": 100}, {"visibility": "off"} ]
}, {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [ {"hue": "#bbc0c4"}, {"saturation": - 93}, {"lightness": 31}, {"visibility": "simplified"} ]
}, {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [ {"hue": "#bbc0c4"}, {"saturation": - 93}, {"lightness": 31}, {"visibility": "on"} ]
}, {
    "featureType": "road.arterial",
    "elementType": "labels",
    "stylers": [ {"hue": "#bbc0c4"}, {"saturation": - 93}, {"lightness": - 2}, {"visibility": "simplified"} ]
}, {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [ {"hue": "#e9ebed"}, {"saturation": - 90}, {"lightness": - 8}, {"visibility": "simplified"} ]
}, {
    "featureType": "transit",
    "elementType": "all",
    "stylers": [ {"hue": "#e9ebed"}, {"saturation": 10}, {"lightness": 69}, {"visibility": "on"} ]
}, {
    "featureType": "water",
    "elementType": "all",
    "stylers": [ {"hue": "#e9ebed"}, {"saturation": - 78}, {"lightness": 67}, {"visibility": "simplified"} ]
} ];
},{}],"/Code/html/themes/themekit/lib/maps/js/google/styles/_nature.js":[function(require,module,exports){
module.exports = [ {
    "featureType": "landscape",
    "stylers": [ {"hue": "#FFA800"}, {"saturation": 0}, {"lightness": 0}, {"gamma": 1} ]
}, {
    "featureType": "road.highway",
    "stylers": [ {"hue": "#53FF00"}, {"saturation": - 73}, {"lightness": 40}, {"gamma": 1} ]
}, {
    "featureType": "road.arterial",
    "stylers": [ {"hue": "#FBFF00"}, {"saturation": 0}, {"lightness": 0}, {"gamma": 1} ]
}, {
    "featureType": "road.local",
    "stylers": [ {"hue": "#00FFFD"}, {"saturation": 0}, {"lightness": 30}, {"gamma": 1} ]
}, {
    "featureType": "water",
    "stylers": [ {"hue": "#00BFFF"}, {"saturation": 6}, {"lightness": 8}, {"gamma": 1} ]
}, {
    "featureType": "poi",
    "stylers": [ {"hue": "#679714"}, {"saturation": 33.4}, {"lightness": - 25.4}, {"gamma": 1} ]
} ];
},{}],"/Code/html/themes/themekit/lib/maps/js/google/styles/_paper.js":[function(require,module,exports){
module.exports = [ {
    "featureType": "administrative",
    "elementType": "all",
    "stylers": [ {"visibility": "off"} ]
}, {
    "featureType": "landscape",
    "elementType": "all",
    "stylers": [ {"visibility": "simplified"}, {"hue": "#0066ff"}, {"saturation": 74}, {"lightness": 100} ]
}, {"featureType": "poi", "elementType": "all", "stylers": [ {"visibility": "simplified"} ]}, {
    "featureType": "road",
    "elementType": "all",
    "stylers": [ {"visibility": "simplified"} ]
}, {
    "featureType": "road.highway",
    "elementType": "all",
    "stylers": [ {"visibility": "off"}, {"weight": 0.6}, {"saturation": - 85}, {"lightness": 61} ]
}, {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [ {"visibility": "on"} ]
}, {
    "featureType": "road.arterial",
    "elementType": "all",
    "stylers": [ {"visibility": "off"} ]
}, {"featureType": "road.local", "elementType": "all", "stylers": [ {"visibility": "on"} ]}, {
    "featureType": "transit",
    "elementType": "all",
    "stylers": [ {"visibility": "simplified"} ]
}, {
    "featureType": "water",
    "elementType": "all",
    "stylers": [ {"visibility": "simplified"}, {"color": "#5f94ff"}, {"lightness": 26}, {"gamma": 5.86} ]
} ];
},{}],"/Code/html/themes/themekit/lib/maps/js/main.js":[function(require,module,exports){
require('./vector/main');
window.initGoogleMaps = require('./google/main');
},{"./google/main":"/Code/html/themes/themekit/lib/maps/js/google/main.js","./vector/main":"/Code/html/themes/themekit/lib/maps/js/vector/main.js"}],"/Code/html/themes/themekit/lib/maps/js/vector/_gdpData.js":[function(require,module,exports){
module.exports = (function () {

    var gdpData = {
        "AF": 16.63,
        "AL": 11.58,
        "DZ": 158.97,
        "AO": 85.81,
        "AG": 1.1,
        "AR": 351.02,
        "AM": 8.83,
        "AU": 1219.72,
        "AT": 366.26,
        "AZ": 52.17,
        "BS": 7.54,
        "BH": 21.73,
        "BD": 105.4,
        "BB": 3.96,
        "BY": 52.89,
        "BE": 461.33,
        "BZ": 1.43,
        "BJ": 6.49,
        "BT": 1.4,
        "BO": 19.18,
        "BA": 16.2,
        "BW": 12.5,
        "BR": 2023.53,
        "BN": 11.96,
        "BG": 44.84,
        "BF": 8.67,
        "BI": 1.47,
        "KH": 11.36,
        "CM": 21.88,
        "CA": 1563.66,
        "CV": 1.57,
        "CF": 2.11,
        "TD": 7.59,
        "CL": 199.18,
        "CN": 5745.13,
        "CO": 283.11,
        "KM": 0.56,
        "CD": 12.6,
        "CG": 11.88,
        "CR": 35.02,
        "CI": 22.38,
        "HR": 59.92,
        "CY": 22.75,
        "CZ": 195.23,
        "DK": 304.56,
        "DJ": 1.14,
        "DM": 0.38,
        "DO": 50.87,
        "EC": 61.49,
        "EG": 216.83,
        "SV": 21.8,
        "GQ": 14.55,
        "ER": 2.25,
        "EE": 19.22,
        "ET": 30.94,
        "FJ": 3.15,
        "FI": 231.98,
        "FR": 2555.44,
        "GA": 12.56,
        "GM": 1.04,
        "GE": 11.23,
        "DE": 3305.9,
        "GH": 18.06,
        "GR": 305.01,
        "GD": 0.65,
        "GT": 40.77,
        "GN": 4.34,
        "GW": 0.83,
        "GY": 2.2,
        "HT": 6.5,
        "HN": 15.34,
        "HK": 226.49,
        "HU": 132.28,
        "IS": 12.77,
        "IN": 1430.02,
        "ID": 695.06,
        "IR": 337.9,
        "IQ": 84.14,
        "IE": 204.14,
        "IL": 201.25,
        "IT": 2036.69,
        "JM": 13.74,
        "JP": 5390.9,
        "JO": 27.13,
        "KZ": 129.76,
        "KE": 32.42,
        "KI": 0.15,
        "KR": 986.26,
        "UNDEFINED": 5.73,
        "KW": 117.32,
        "KG": 4.44,
        "LA": 6.34,
        "LV": 23.39,
        "LB": 39.15,
        "LS": 1.8,
        "LR": 0.98,
        "LY": 77.91,
        "LT": 35.73,
        "LU": 52.43,
        "MK": 9.58,
        "MG": 8.33,
        "MW": 5.04,
        "MY": 218.95,
        "MV": 1.43,
        "ML": 9.08,
        "MT": 7.8,
        "MR": 3.49,
        "MU": 9.43,
        "MX": 1004.04,
        "MD": 5.36,
        "MN": 5.81,
        "ME": 3.88,
        "MA": 91.7,
        "MZ": 10.21,
        "MM": 35.65,
        "NA": 11.45,
        "NP": 15.11,
        "NL": 770.31,
        "NZ": 138,
        "NI": 6.38,
        "NE": 5.6,
        "NG": 206.66,
        "NO": 413.51,
        "OM": 53.78,
        "PK": 174.79,
        "PA": 27.2,
        "PG": 8.81,
        "PY": 17.17,
        "PE": 153.55,
        "PH": 189.06,
        "PL": 438.88,
        "PT": 223.7,
        "QA": 126.52,
        "RO": 158.39,
        "RU": 1476.91,
        "RW": 5.69,
        "WS": 0.55,
        "ST": 0.19,
        "SA": 434.44,
        "SN": 12.66,
        "RS": 38.92,
        "SC": 0.92,
        "SL": 1.9,
        "SG": 217.38,
        "SK": 86.26,
        "SI": 46.44,
        "SB": 0.67,
        "ZA": 354.41,
        "ES": 1374.78,
        "LK": 48.24,
        "KN": 0.56,
        "LC": 1,
        "VC": 0.58,
        "SD": 65.93,
        "SR": 3.3,
        "SZ": 3.17,
        "SE": 444.59,
        "CH": 522.44,
        "SY": 59.63,
        "TW": 426.98,
        "TJ": 5.58,
        "TZ": 22.43,
        "TH": 312.61,
        "TL": 0.62,
        "TG": 3.07,
        "TO": 0.3,
        "TT": 21.2,
        "TN": 43.86,
        "TR": 729.05,
        "TM": 0,
        "UG": 17.12,
        "UA": 136.56,
        "AE": 239.65,
        "GB": 2258.57,
        "US": 14624.18,
        "UY": 40.71,
        "UZ": 37.72,
        "VU": 0.72,
        "VE": 285.21,
        "VN": 101.99,
        "YE": 30.02,
        "ZM": 15.69,
        "ZW": 5.57
    };

    return gdpData;
});
},{}],"/Code/html/themes/themekit/lib/maps/js/vector/custom/jquery-jvectormap-de-merc-en.js":[function(require,module,exports){
$.fn.vectorMap('addMap', 'de_merc_en',{"insets": [{"width": 900.0, "top": 0, "height": 1223.8430164619706, "bbox": [{"y": -7378324.527735717, "x": 651774.9220426602}, {"y": -5989544.791406314, "x": 1673067.4782643116}], "left": 0}], "paths": {"DE-BE": {"path": "M710.96,440.04l2.46,-4.08l-0.74,-2.47l0.48,-2.76l1.43,-1.17l2.76,-3.42l-0.06,-1.12l-1.49,-2.7l0.73,-8.19l-0.34,-1.59l0.66,-1.8l4.92,1.95l1.12,-0.08l0.34,-0.81l-0.73,-2.2l1.06,-3.37l2.86,-0.48l1.08,-0.61l1.16,-1.09l1.37,-2.69l0.66,0.02l0.24,3.25l0.83,1.09l1.82,0.8l3.7,0.26l1.88,-0.6l0.87,-1.69l2.0,-1.67l1.64,1.09l1.02,-0.05l0.87,-1.44l2.34,-2.09l2.49,2.98l-0.22,3.78l0.49,1.72l6.52,7.61l4.25,2.98l3.32,0.95l0.06,0.82l-2.29,5.42l0.16,2.02l4.03,-0.21l1.09,0.58l1.94,2.43l3.86,1.75l1.27,1.34l-1.08,1.5l-0.47,3.04l-2.57,2.53l-0.43,1.22l-0.05,3.97l-3.1,1.49l-1.67,3.08l-0.45,-0.09l-0.56,-5.11l-1.19,-1.5l-1.77,0.03l-2.39,-0.8l-5.73,-2.61l-1.47,0.22l-1.05,0.87l-1.63,-0.07l-1.5,-2.36l-1.1,-0.55l-2.66,0.73l-0.84,0.62l-0.37,1.03l0.22,3.35l-2.67,-0.02l-1.64,-0.79l-2.96,-3.35l-3.68,0.97l-1.14,-1.98l-0.54,-0.29l-4.05,1.65l-2.27,-1.73l-1.46,-0.24l-4.23,1.95l-1.4,1.29l-3.62,-0.79l-2.35,-1.71Z", "name": "Berlin"}, "DE-ST": {"path": "M511.79,466.89l-0.19,-2.32l-0.7,-0.44l-1.04,0.15l-2.76,-3.9l1.68,-1.94l0.2,-0.98l-1.16,-2.7l-1.94,-1.17l-0.28,-1.74l1.63,-0.79l4.59,-0.93l0.63,-0.97l0.35,-2.41l-0.71,-1.37l-2.88,-2.43l-2.59,-1.34l-6.93,-9.3l0.21,-2.09l1.0,-2.72l1.58,-0.71l2.7,0.41l0.63,-0.69l-0.79,-1.85l-3.95,-5.86l-0.66,-2.68l0.16,-3.99l2.53,-3.1l0.28,-1.55l-0.56,-0.79l-1.71,-0.55l-2.66,1.4l-4.13,-5.88l-4.69,-9.5l-1.66,-1.12l-1.11,-0.05l-0.75,-0.81l-0.72,-4.15l-1.93,-2.25l-1.65,-3.87l0.2,-7.77l3.27,-1.5l4.54,-0.34l4.3,0.2l5.62,-1.97l1.86,-0.99l2.94,-2.87l0.97,-3.92l1.3,-0.77l3.38,-0.06l5.48,1.9l5.8,-0.42l4.6,0.87l2.33,1.58l0.9,1.52l0.85,0.44l1.18,-0.25l1.82,-1.22l0.82,0.32l2.16,-0.13l5.94,-2.55l3.5,-0.95l6.05,-5.65l2.56,-0.25l0.67,-0.54l-0.49,-4.32l0.54,-3.6l0.7,-1.79l1.22,-0.57l1.34,0.43l1.51,-0.09l1.11,-0.9l1.84,-5.16l3.98,-1.11l0.67,0.45l0.04,1.21l-1.26,2.19l0.1,0.63l1.51,0.74l3.13,0.13l0.93,0.69l0.82,3.56l0.78,1.19l1.92,0.3l4.71,-2.06l2.83,4.33l1.46,1.2l3.21,0.23l0.85,0.5l-0.43,1.53l-1.19,1.86l0.01,1.13l6.37,4.31l2.87,0.62l3.9,2.08l1.8,0.4l1.63,-0.6l9.52,-0.73l1.26,1.82l-0.1,1.76l0.35,0.42l2.54,0.14l3.73,-1.08l2.58,1.01l0.9,1.63l1.95,7.11l-0.38,1.6l-3.4,3.24l0.13,2.03l1.17,2.44l-1.23,1.35l-0.58,1.36l2.01,5.57l1.72,1.93l-0.22,2.66l-1.96,4.88l-1.62,0.75l-1.93,-0.11l-0.74,0.36l-1.09,9.03l-2.71,4.59l0.91,0.85l2.89,-0.06l-1.55,2.53l0.34,2.08l0.89,0.9l1.43,0.36l2.27,-0.7l1.13,-1.26l0.85,-2.62l1.4,0.72l2.74,3.78l3.4,-0.48l-0.53,1.36l-0.13,3.41l-2.01,4.44l-1.84,2.01l0.95,2.91l-0.77,2.88l-1.73,3.62l-0.24,3.01l0.55,2.85l-1.33,2.64l-1.56,5.1l0.37,3.89l1.15,1.45l1.27,0.39l1.31,2.34l-2.49,2.98l-2.25,6.41l1.74,4.46l2.91,3.03l1.02,2.69l2.47,1.5l1.76,1.92l6.04,8.22l0.44,2.9l6.16,4.89l2.58,-0.11l1.13,-1.53l0.66,0.02l2.52,3.08l6.45,4.66l4.89,0.9l1.34,-1.33l2.5,-1.42l0.8,-1.79l0.76,0.01l12.48,7.63l4.91,0.77l1.31,0.93l1.19,3.39l0.65,0.55l5.47,0.32l2.89,0.82l2.89,3.51l5.51,3.88l1.89,0.76l6.62,-0.75l2.64,2.05l0.52,-0.14l1.63,-2.54l3.54,0.15l1.43,0.62l-0.67,1.56l-3.36,3.81l-3.59,6.03l0.11,6.61l2.2,5.14l-0.29,1.69l-2.65,3.63l-6.68,5.45l-1.94,3.5l-1.34,-0.34l-2.04,-2.14l-1.47,-0.84l-3.02,1.36l-1.32,-1.55l-5.97,-2.67l-1.43,-2.45l-2.85,0.28l-1.14,1.48l-5.05,4.22l-1.68,0.79l-2.82,-1.22l-3.88,-0.46l-1.59,0.98l-1.73,3.18l-1.87,1.62l-0.7,0.07l-1.23,-0.89l-9.29,1.63l-1.32,-0.89l-7.92,-0.32l-1.23,0.71l-0.39,3.02l-0.6,1.22l-7.2,0.73l-5.73,2.6l-2.87,-0.32l-3.48,-1.32l-1.13,2.89l-2.81,2.39l-0.15,7.63l-0.4,1.65l-3.26,3.33l-0.18,0.66l0.24,3.33l0.87,1.84l0.25,6.13l1.44,3.78l-0.02,3.0l-0.62,1.26l-1.8,0.22l-1.27,1.06l-0.99,1.85l-0.44,2.31l0.75,2.46l0.13,3.19l1.92,2.71l0.34,1.47l0.33,4.48l-0.42,1.5l-0.98,1.36l-0.04,1.45l2.99,1.22l-0.38,4.14l1.02,1.98l2.07,1.96l0.73,3.2l0.69,0.55l3.84,0.76l0.13,0.8l-1.67,3.02l-0.51,3.28l0.45,0.92l1.87,0.94l0.79,1.77l-2.3,4.57l-3.4,4.33l-0.28,1.47l0.32,1.26l-1.45,1.21l-0.43,-0.04l-0.73,-1.27l-2.49,-2.32l-0.85,-0.35l-2.78,1.41l-5.62,-1.82l-6.67,1.07l-0.46,-1.6l-3.15,-1.71l-1.4,-2.81l-1.47,-1.39l-4.85,-2.22l-2.28,-1.7l-1.31,-0.22l-8.74,0.77l-1.28,0.91l-0.45,-0.19l-1.15,-1.06l-0.5,-2.07l-2.27,-4.35l-0.38,-3.78l-2.77,-2.17l-4.1,0.75l-9.16,-0.71l-2.94,1.71l-5.26,-0.27l-1.77,-0.87l-1.16,-3.59l1.07,-1.09l-0.77,-5.0l-3.16,-4.8l-4.35,-2.3l-0.97,-1.55l1.11,-1.6l4.81,-0.91l2.69,-1.52l2.11,-2.49l0.87,-2.0l-5.66,-8.78l-2.67,-5.06l-5.24,-4.19l-2.67,-0.93l-9.17,-1.37l-4.2,0.08l-15.08,-1.86l-2.43,-1.39l-0.69,-1.32l0.67,-6.12l-2.55,-5.14l0.11,-3.74l-2.01,-2.73l-1.37,-3.94l-0.05,-0.75l0.44,-0.46l2.31,0.61l1.13,-0.89l-0.07,-1.79l-0.89,-2.07l-5.11,-1.88l-1.47,-1.29l-2.79,-0.06l-4.44,-2.33l-8.84,0.21l-1.36,-0.87l-2.71,-4.96l0.01,-3.6l-0.54,-2.39l-1.96,-2.27l-2.46,-5.9l-3.33,-3.09l-0.67,-4.1l0.36,-6.53l2.08,-1.27l1.03,-1.6l1.38,-0.82l1.23,-2.14l0.13,-1.41l-0.6,-3.28l-2.15,-1.94l0.47,-2.82l2.24,-1.44l0.45,-1.05l-0.41,-0.52l-1.39,0.08l-1.35,-1.59l-2.28,-1.14l-0.26,-1.39l-1.71,-3.04l0.64,-0.35l2.89,0.32l1.4,-0.46l2.94,-3.11l0.09,-1.88l0.66,-0.39l5.48,-0.87l13.01,-0.0l4.53,-1.32l5.81,0.09l0.98,-0.4l0.81,-1.67l0.02,-2.13l-0.39,-0.79l-1.7,-1.35l-0.02,-0.58l6.27,-2.92l2.44,-2.09l1.88,-2.91l0.15,-1.55l-0.43,-1.9l-0.96,-0.88l-1.5,-0.38l-0.91,-1.92l0.9,-2.41l0.7,-0.74l3.37,-1.16l1.22,-1.18l0.28,-2.58l-0.3,-1.37l-0.97,-0.82l-0.97,0.96Z", "name": "Sachsen-Anhalt"}, "DE-RP": {"path": "M24.68,808.29l1.03,-5.97l1.86,-4.29l-0.36,-1.2l-0.91,-0.81l0.6,-2.57l3.41,-1.09l0.77,-1.76l0.05,-1.88l-0.56,-1.74l-1.16,-1.36l2.95,-2.56l1.0,-1.51l6.1,-2.08l1.96,-1.72l-0.12,-3.11l1.51,-2.47l1.15,-0.67l3.37,0.76l2.74,-0.48l1.45,-1.43l0.04,-0.98l2.22,-0.05l2.75,-1.46l-0.04,-1.52l-3.15,-5.07l0.23,-1.07l0.62,0.02l1.45,2.08l2.25,1.42l0.83,2.34l0.84,0.54l2.39,-0.87l4.61,-3.4l5.5,-1.3l3.23,1.56l-0.46,1.94l0.97,0.65l1.26,-0.03l3.22,-1.81l2.78,2.71l1.86,0.47l7.83,-2.21l0.79,-1.6l-0.34,-1.57l-1.61,-3.04l-0.38,-4.8l-0.56,-0.82l-1.87,-1.1l0.81,-2.56l-0.1,-2.33l5.26,-2.24l1.29,2.43l1.3,1.09l1.55,0.41l1.45,-0.24l1.71,-2.59l0.23,-3.13l-0.47,-3.75l2.64,-1.04l2.52,-3.85l5.73,-1.77l6.06,-4.03l3.16,1.03l1.41,-0.64l1.08,-2.11l2.21,0.76l1.32,-0.32l3.31,-2.99l1.11,-2.64l1.36,0.63l1.11,1.88l5.61,0.4l5.8,-1.59l3.39,-2.58l0.19,-2.1l0.88,-1.77l0.09,-3.98l-0.36,-0.68l0.43,-0.48l2.19,-0.65l3.75,0.3l8.22,-2.3l3.88,-2.17l2.83,0.18l1.83,-2.93l4.31,-1.88l1.39,-2.17l1.04,0.64l1.05,-0.59l0.25,-2.65l-1.99,-2.55l3.3,-2.03l2.37,-2.59l2.46,0.86l0.88,-0.68l0.05,-2.73l-1.22,-3.12l-0.36,-3.78l0.29,-1.56l2.9,-2.8l1.07,-0.32l5.25,1.47l-1.36,5.45l0.1,1.17l1.45,1.19l2.59,0.9l3.7,3.96l1.88,1.45l2.66,-0.77l1.21,4.97l-0.23,4.73l1.05,2.01l4.14,5.4l1.6,2.84l0.66,2.66l1.14,0.33l2.95,-1.17l3.43,1.82l-1.37,5.18l2.01,5.01l0.36,2.37l0.67,1.4l1.2,1.11l-2.51,6.58l-2.09,1.83l-1.74,0.15l-2.49,-2.78l-1.65,-0.09l-1.89,0.77l-1.52,2.08l-1.7,1.34l-0.42,1.92l-0.09,6.68l0.69,1.05l1.2,0.73l-1.76,2.0l-1.23,4.28l-1.14,0.96l-0.3,0.97l0.95,1.16l4.35,1.11l0.51,1.64l1.77,0.94l2.92,6.18l2.06,1.74l0.6,1.18l1.42,4.64l-0.09,1.47l-2.09,0.88l-5.1,-0.14l-0.86,0.8l-0.55,1.81l0.97,1.85l-1.72,2.76l-0.79,-0.24l-1.56,-1.55l-0.67,-0.05l-1.3,1.38l-5.75,3.02l-1.25,1.81l-1.42,4.27l0.14,1.31l0.75,1.0l2.49,1.74l-0.81,3.76l-2.11,-1.87l-3.96,0.42l-1.3,1.98l-0.72,3.29l-6.57,4.67l-0.04,0.6l1.41,0.82l6.26,5.68l0.66,1.13l0.35,2.0l2.1,2.78l4.08,-0.16l4.26,-1.41l4.75,-2.5l3.81,-2.9l12.18,-4.15l3.62,0.18l1.38,0.89l10.45,11.9l1.86,4.99l-1.43,5.4l3.95,7.36l0.91,4.12l3.37,7.37l2.19,0.11l1.94,-0.44l0.96,0.38l-0.2,1.13l-3.25,4.48l-3.21,0.66l-2.8,1.96l-1.71,3.14l-0.17,4.01l3.91,8.37l1.6,4.55l-0.76,3.85l1.88,3.14l3.49,9.22l0.0,0.7l-1.85,0.92l-0.22,1.39l1.93,1.04l3.25,0.74l0.81,1.34l-1.29,3.09l0.73,5.13l-3.49,7.91l-0.22,1.37l0.26,0.44l1.99,0.71l-0.27,1.45l-6.66,7.88l-2.44,1.97l-2.95,18.33l-7.19,14.87l-2.03,3.17l-3.09,3.33l-2.57,0.94l-1.24,-1.08l-9.59,-1.99l-15.65,-8.34l-1.86,-0.22l-5.51,0.59l-8.1,-2.35l-4.72,1.84l-4.03,-1.06l-3.62,1.05l-1.17,-0.28l-2.59,-3.6l-2.3,-1.18l-4.21,-0.73l-2.02,-1.28l-4.7,-6.5l1.09,-1.32l-0.91,-2.44l-1.89,-0.67l-3.95,-0.27l-0.71,-1.69l-1.9,-0.17l-1.76,0.5l-2.22,-0.24l-1.72,-1.49l-3.41,-3.78l-0.62,-4.94l0.64,-1.31l1.99,-0.24l1.44,-1.99l0.75,-3.33l1.47,-1.7l0.58,-2.71l1.94,-1.7l0.91,-1.51l-0.32,-1.96l0.66,-1.97l-0.53,-1.35l-1.19,-0.78l-7.86,-2.1l0.28,-0.8l-0.3,-0.78l-3.98,-4.82l-0.54,-2.03l3.11,-3.51l2.62,-1.77l0.42,-1.41l-0.35,-2.04l-1.18,-0.66l-0.25,-4.03l-1.15,-2.32l-0.57,-1.84l-0.01,-2.22l-0.53,-0.54l-0.66,-0.06l-2.8,1.81l-2.7,0.27l-4.62,-3.36l-2.25,-2.16l-7.08,-0.59l-6.52,-3.71l-2.79,1.56l-0.83,-0.68l-2.21,-0.68l-8.2,5.11l-14.4,6.66l-1.71,0.34l-2.5,-0.18l-6.26,2.86l-11.26,-0.54l-13.41,1.23l0.13,-5.79l0.53,-1.56l3.99,-5.42l2.06,-3.93l-0.18,-1.43l-1.24,-1.17l1.36,-1.9l7.15,-4.65l-0.44,-1.89l1.32,0.05l-1.3,-3.54l0.06,-1.15l0.95,-0.99l-0.21,-2.34l0.76,-5.17l-0.8,-0.7l-3.32,-0.9l-4.77,-0.02l-1.59,-0.44l-6.1,-4.78l-1.07,-0.08l-1.93,0.85l-1.67,-3.94l-4.74,-2.41l-1.43,-1.45l-3.23,-7.78l-1.67,-2.74l-0.7,0.03l-0.73,1.44l-1.87,-4.92l-1.71,-2.63l-0.74,-6.02l-0.67,-1.36l-0.89,-0.59l1.07,-1.89l-0.27,-0.63l-0.59,-0.0Z", "name": "Rheinland-Pfalz"}, "DE-BB": {"path": "M719.86,603.29l-0.83,-2.8l1.63,-1.91l0.76,-2.25l0.17,-4.02l-0.18,-1.36l-0.85,-1.4l1.66,-1.39l0.42,-0.97l-0.75,-4.41l-0.71,-1.73l-2.13,-1.36l-0.84,-1.21l0.6,-3.11l-0.6,-1.42l-2.95,-2.22l-1.63,0.48l-0.58,-0.23l-1.27,-0.87l-2.71,-3.34l-0.87,-0.39l1.78,-3.23l6.61,-5.38l2.81,-3.83l0.37,-2.27l-2.2,-5.1l-0.11,-6.3l3.46,-5.74l3.41,-3.89l0.85,-1.98l-0.21,-0.52l-1.99,-0.84l-3.92,-0.12l-0.87,0.68l-0.99,1.89l-1.64,-1.67l-0.93,-0.3l-6.52,0.76l-1.67,-0.66l-5.44,-3.83l-2.98,-3.58l-3.18,-0.91l-5.19,-0.23l-1.54,-3.67l-1.61,-1.2l-4.91,-0.77l-12.52,-7.65l-1.41,-0.05l-1.04,1.99l-2.41,1.35l-1.28,1.26l-4.25,-0.94l-1.61,-0.94l-4.54,-3.55l-1.95,-2.6l-1.19,-0.83l-1.1,0.32l-0.91,1.39l-2.43,-0.1l-5.31,-4.38l-0.43,-2.88l-6.13,-8.34l-1.83,-1.99l-2.35,-1.37l-1.04,-2.72l-2.57,-2.55l-1.12,-2.2l-0.76,-2.69l2.15,-5.63l2.19,-2.31l0.4,-1.0l-1.55,-2.88l-1.44,-0.54l-0.84,-1.09l-0.22,-4.26l2.8,-6.94l-0.55,-3.0l0.23,-2.85l1.68,-3.43l0.82,-3.09l-0.97,-2.79l1.77,-1.82l2.03,-4.48l0.2,-3.66l0.64,-1.84l-0.69,-0.54l-3.32,0.67l-2.5,-3.63l-2.02,-0.94l-0.91,0.65l-0.56,2.37l-0.66,0.83l-2.1,0.73l-1.07,-0.3l-0.62,-0.89l-0.13,-1.26l1.54,-2.26l-0.04,-0.67l-0.99,-0.63l-2.75,0.1l2.68,-4.3l1.02,-8.8l2.12,0.08l2.09,-1.02l1.13,-2.02l1.01,-3.22l0.2,-3.08l-1.77,-2.05l-0.61,-2.35l-1.28,-2.41l0.04,-0.78l1.76,-2.28l-1.2,-2.72l-0.15,-1.58l3.26,-2.96l0.57,-2.13l-2.59,-8.65l-0.72,-0.83l-2.93,-1.08l-3.82,1.08l-1.97,-0.09l0.06,-1.65l-0.51,-1.18l-1.67,-1.28l-7.01,0.86l-2.42,-0.08l-1.53,0.59l-1.49,-0.31l-4.0,-2.12l-2.71,-0.55l-6.1,-4.13l1.27,-2.2l0.35,-2.34l-1.38,-0.76l-2.94,-0.14l-1.22,-0.99l-2.95,-4.5l-1.94,0.17l-3.45,1.77l-1.42,-0.26l-1.36,-4.57l-1.35,-0.91l-3.16,-0.13l-0.79,-0.41l1.12,-2.31l-0.05,-1.49l-1.17,-0.98l-4.55,1.13l-4.69,-1.87l-4.01,-0.97l-2.86,-2.99l-2.42,-0.83l-2.28,0.47l-3.28,2.27l-1.66,0.46l-2.52,-0.6l-4.47,-4.85l-1.32,-2.56l6.93,0.33l2.21,0.98l1.94,0.28l0.45,-0.37l0.42,-3.83l1.26,-0.63l3.01,0.0l5.25,3.0l3.04,-0.28l2.13,-1.74l0.68,-2.62l-0.99,-5.27l-1.3,-1.83l-0.21,-1.01l0.53,-1.42l4.25,-3.94l1.87,-1.23l5.25,-1.99l3.23,-0.19l1.01,0.36l2.98,2.47l1.18,2.72l0.58,0.18l3.98,-1.98l5.09,0.25l0.43,-0.45l-0.31,-2.3l-1.68,-1.49l1.07,-0.51l2.97,0.51l2.24,-2.74l5.25,-2.2l2.11,0.63l3.54,-3.22l1.43,-0.24l1.23,-2.81l0.16,-2.22l2.44,-1.68l1.43,-2.56l3.01,-1.28l2.5,-0.52l1.86,1.79l0.85,0.24l4.11,-2.4l0.89,0.37l2.34,3.93l6.9,1.91l4.12,2.44l4.62,4.16l2.81,1.61l1.59,2.11l1.7,0.37l3.5,-0.25l2.96,-0.78l10.86,2.69l1.2,0.58l2.78,2.77l7.13,1.67l0.38,4.13l1.26,1.09l1.36,0.13l4.26,-0.94l1.28,0.09l1.22,0.44l1.45,1.22l1.65,0.42l3.88,-0.88l2.71,-0.04l1.73,-0.72l0.25,0.9l-1.37,1.74l0.84,1.24l2.46,1.07l2.74,-0.41l4.7,-5.04l5.1,-3.79l0.83,-1.15l0.64,-2.18l3.07,-2.62l0.65,-0.22l1.08,0.35l2.25,3.33l1.37,0.59l2.75,-0.0l0.39,-0.32l0.59,-3.24l1.23,-2.89l1.53,-1.78l1.46,-0.74l2.44,-0.24l1.96,0.4l3.99,2.13l2.03,0.45l1.85,-0.68l5.11,-4.14l1.11,-0.42l2.52,-2.95l3.17,-7.73l1.25,-4.89l1.27,-1.21l1.7,-0.91l3.65,-0.25l2.3,-2.18l1.8,-3.27l5.81,-5.01l3.35,-0.49l3.31,0.25l3.09,-1.32l0.23,-0.45l-0.5,-2.15l-2.41,-4.54l0.15,-2.51l1.07,0.16l2.54,3.86l4.34,1.7l0.19,3.51l2.81,5.15l0.56,2.32l1.89,2.48l6.84,-0.51l5.75,0.42l4.55,1.36l2.3,-2.85l2.15,-0.45l3.59,1.77l4.07,-0.25l1.93,0.43l0.14,4.01l-0.45,2.99l-1.49,3.51l-3.45,5.53l-8.18,5.54l-0.27,3.54l0.34,0.39l7.85,1.57l6.75,0.55l1.52,-1.24l0.56,-2.12l2.57,-1.31l2.7,-3.52l6.09,-3.78l1.04,8.42l3.66,4.44l-2.41,4.77l-2.71,3.08l-0.75,2.09l-0.29,2.37l1.14,7.25l-3.2,10.55l-1.26,2.84l-2.96,3.09l-5.73,4.6l-5.99,3.15l-4.91,3.86l2.01,10.45l-0.39,2.97l-0.95,1.84l-2.54,2.22l-0.1,0.48l1.12,2.28l1.82,1.48l4.39,0.89l1.82,0.8l3.26,3.83l2.65,1.42l10.37,7.67l1.46,1.71l3.41,6.72l1.14,1.06l1.76,0.83l2.94,3.93l5.79,2.31l6.19,6.98l2.85,2.37l-2.61,5.52l-0.79,3.83l1.86,1.98l0.38,1.48l-1.55,3.63l-2.33,3.7l-5.04,4.46l0.42,6.73l2.35,7.1l2.02,4.59l-0.47,3.14l2.32,2.56l3.32,1.72l5.44,1.8l1.41,2.6l-0.03,3.04l-1.92,2.68l0.06,1.21l1.35,2.1l-1.41,5.06l-0.58,4.36l1.11,2.46l6.06,4.55l-2.35,3.35l-0.93,4.45l-2.66,5.43l-0.37,9.8l-0.8,3.03l-3.24,5.17l-5.62,5.74l-1.4,3.06l0.35,3.55l1.62,2.48l1.82,1.31l1.25,1.68l0.39,4.14l1.1,4.19l2.26,2.66l4.7,3.91l1.21,2.62l0.95,3.93l0.15,4.04l-1.12,3.06l-1.92,3.1l-0.81,3.06l0.13,0.88l-3.66,-0.17l-6.56,-3.17l-2.37,-0.46l-2.15,0.1l-4.25,1.21l-12.99,6.53l-3.58,0.83l-3.26,-2.18l-3.6,-1.33l-4.85,-0.61l-6.21,1.52l-3.95,2.19l-1.29,1.17l-3.89,5.1l-0.66,1.41l-0.17,2.38l-1.47,3.48l-7.15,10.72l-0.62,0.22l-2.28,-0.64l-16.83,2.1l-14.84,-1.15l-5.83,-1.72l-2.12,0.37l-0.96,-0.4l-1.65,-2.44l-2.5,-1.7l-2.15,-2.14l-4.85,-2.37l-2.43,0.29l-2.42,1.8l-10.55,3.53l-1.24,-1.98l-2.09,-0.73l-0.78,0.95l-1.17,0.03l-1.36,1.66ZM712.59,435.76l-0.84,0.95l-1.57,3.47l3.19,2.44l3.89,0.67l1.46,-1.35l3.95,-1.86l0.99,0.15l2.61,1.82l4.07,-1.55l0.77,1.71l0.64,0.4l3.68,-0.95l2.85,3.28l1.97,0.9l3.1,0.02l0.59,-1.53l-0.28,-2.94l0.64,-0.58l2.21,-0.67l0.69,0.35l1.11,2.09l0.76,0.46l2.02,0.06l1.22,-0.93l1.01,-0.13l5.51,2.56l2.56,0.84l1.57,-0.08l0.78,1.06l0.5,4.89l0.6,0.84l1.28,-0.28l1.57,-3.02l2.57,-0.93l0.69,-0.75l0.38,-1.19l-0.21,-3.13l0.68,-1.44l2.21,-1.97l0.53,-3.16l0.96,-0.91l0.17,-1.03l-1.58,-1.83l-3.93,-1.8l-1.78,-2.3l-1.41,-0.79l-3.7,0.36l0.03,-1.24l2.28,-5.36l-0.06,-1.42l-3.7,-1.27l-4.13,-2.89l-6.41,-7.49l-0.32,-1.28l0.19,-3.97l-3.12,-3.55l-0.77,0.15l-2.3,2.2l-0.68,1.26l-2.55,-1.12l-2.28,1.91l-0.89,1.7l-1.29,0.35l-3.57,-0.25l-1.5,-0.67l-0.5,-0.63l-0.26,-3.67l-1.71,-0.14l-0.75,0.58l-1.01,2.43l-1.0,0.91l-4.15,1.34l-1.15,3.72l0.73,2.29l-5.25,-2.09l-0.72,0.21l-1.08,2.54l0.35,1.59l-0.73,8.26l1.54,2.91l0.01,0.72l-4.13,4.39l-0.54,3.1l0.71,2.24Z", "name": "Brandenburg"}, "DE-NI": {"path": "M81.02,419.89l1.19,-0.14l5.45,-2.77l0.08,-0.66l-3.76,-3.59l0.61,-3.96l-0.71,-1.62l3.13,-2.28l3.17,-0.99l9.2,-0.14l5.14,1.56l4.91,-0.7l4.91,1.7l0.48,-0.2l1.83,-3.59l0.72,-5.73l0.91,-17.47l0.85,-5.39l1.71,-4.85l8.04,-12.69l2.19,-5.6l0.9,-5.26l0.15,-5.89l-0.91,-11.7l-1.21,-3.36l-0.07,-1.86l2.29,-7.71l0.31,-2.62l-0.31,-6.99l1.99,-1.74l1.76,-3.01l0.38,-2.07l-0.68,-1.84l2.31,-3.51l1.15,-0.59l2.13,-0.03l2.01,0.53l3.4,2.15l2.32,0.64l-2.34,-3.97l-4.09,-1.59l-22.38,-0.81l-3.4,-1.7l-1.37,-4.36l-0.02,-12.11l0.41,-2.69l1.88,-4.97l0.43,-2.47l0.67,-1.24l5.56,0.88l0.93,-1.44l0.98,-0.62l0.74,-1.8l-0.16,-2.09l-0.95,-1.39l-2.95,-1.55l-1.13,-1.17l-0.18,-1.87l1.26,-1.66l3.18,-2.24l3.52,-3.97l1.93,-1.35l3.59,-3.75l7.61,-2.98l14.91,-1.69l2.1,2.15l2.5,0.55l14.47,-3.02l29.34,-4.13l7.48,2.18l-0.6,5.76l2.74,6.0l4.1,5.3l3.21,2.27l-0.81,2.76l0.2,0.51l3.61,1.35l0.95,1.48l-0.28,2.75l-0.85,1.37l-3.71,2.4l-3.79,0.35l-1.91,1.14l-0.17,0.46l2.7,7.61l1.88,1.64l2.27,-1.04l1.46,0.05l1.01,0.57l3.29,3.27l1.98,3.21l1.61,0.74l1.63,-0.05l2.52,-1.02l1.27,-1.27l2.08,-3.46l2.23,-5.86l0.53,-5.64l-2.94,-3.63l-4.18,0.88l-1.62,-0.28l1.71,-10.32l0.78,-2.22l1.18,-1.27l1.52,-0.61l3.93,-0.19l1.7,0.79l3.92,5.93l4.08,2.08l8.32,1.65l3.53,1.71l0.0,0.79l-2.26,1.95l-2.16,2.64l-1.67,3.76l-0.62,4.84l0.11,9.31l0.61,4.17l1.32,3.03l0.43,0.23l0.33,-0.37l0.29,-4.15l-1.05,-10.26l0.09,-4.76l1.42,-3.41l3.96,-3.26l1.35,2.45l0.52,0.43l0.99,-0.08l0.92,1.53l0.92,0.06l2.15,-2.01l1.58,-2.46l0.41,-2.76l-0.75,-4.71l-1.46,-4.45l1.03,-2.84l-0.95,-0.46l-3.98,0.17l-2.07,-0.37l-4.6,-1.7l-2.49,-8.07l-0.09,-5.4l0.59,-2.38l3.67,-9.24l2.61,-9.98l1.65,-4.39l1.35,-2.04l1.85,-1.79l2.09,-1.26l2.09,-0.48l2.94,0.58l2.4,2.73l3.48,2.96l3.78,1.99l7.87,1.96l4.29,-0.14l7.07,-1.76l3.86,0.3l2.1,-2.21l7.63,-1.88l7.72,0.08l1.66,-1.11l1.27,0.9l1.61,0.3l3.3,-0.15l2.79,3.24l9.59,17.0l3.94,4.66l2.78,2.3l1.27,1.64l1.38,5.05l6.73,9.96l1.68,1.52l5.33,1.69l5.82,4.0l6.44,1.47l0.51,6.5l2.43,3.28l2.27,5.12l4.03,4.04l1.23,-0.02l1.34,-1.96l1.32,-0.53l0.74,0.98l0.37,3.72l0.44,0.63l1.08,0.09l2.37,-1.13l2.08,1.29l0.96,0.13l3.62,-1.25l1.68,-1.01l0.43,-0.57l0.08,-1.69l4.53,-1.52l2.68,2.7l2.01,0.58l2.16,2.76l1.6,1.16l1.9,0.44l5.4,-0.37l2.65,-3.47l1.68,-0.82l6.25,0.1l3.43,1.31l13.9,8.45l4.11,1.44l3.33,-1.29l7.16,-0.3l3.17,0.83l1.99,2.5l0.29,4.9l0.67,2.44l3.5,1.36l3.11,3.98l3.13,2.55l8.94,5.2l10.75,10.14l4.89,3.67l1.46,-0.71l4.23,-3.9l1.0,-0.16l0.62,0.37l3.17,5.0l1.03,-0.05l1.95,-1.82l1.31,1.64l1.51,0.91l3.41,6.12l3.6,4.26l1.72,1.08l2.25,0.43l2.0,-0.52l3.26,-2.26l1.89,-0.44l2.06,0.66l3.0,3.08l4.12,1.01l4.41,1.76l-1.74,4.88l-0.77,0.56l-2.44,-0.42l-1.15,0.25l-1.05,1.08l-1.1,5.39l0.5,4.08l-2.91,0.41l-5.92,5.58l-3.45,0.93l-5.9,2.54l-3.37,-0.07l-2.31,1.31l-1.31,-1.79l-2.59,-1.71l-4.84,-0.9l-5.71,0.43l-5.4,-1.88l-3.69,0.06l-1.85,1.16l-0.88,3.79l-2.8,2.73l-1.75,0.93l-5.39,1.9l-4.22,-0.21l-4.63,0.35l-3.39,1.32l-0.53,0.69l-0.22,8.19l1.72,4.09l1.9,2.19l0.76,4.24l1.12,1.15l1.15,0.06l1.28,0.8l4.67,9.44l4.32,6.12l0.99,0.3l2.16,-1.52l1.52,0.76l-0.2,0.91l-2.59,3.24l-0.19,4.38l0.76,2.96l4.57,7.21l-2.57,-0.41l-2.04,0.92l-1.21,3.07l-0.25,2.41l7.15,9.76l1.1,0.91l1.63,0.56l2.76,2.33l0.49,1.0l-0.7,2.55l-5.37,1.19l-1.03,0.7l-0.13,0.64l0.4,2.01l1.98,1.22l1.0,2.31l-1.73,2.1l-0.07,1.07l2.97,4.17l1.56,0.09l0.22,2.64l0.95,0.19l0.66,-1.09l0.42,0.88l0.05,1.96l-0.53,1.28l-4.02,1.55l-0.92,0.99l-0.84,2.01l-0.11,1.39l0.82,1.57l2.61,1.39l0.32,2.28l-0.88,1.93l-3.28,3.21l-1.98,1.13l-3.46,1.11l-1.04,0.94l0.04,1.36l1.94,1.64l0.03,2.09l-0.51,1.17l-6.39,0.14l-2.05,0.32l-2.47,0.99l-12.96,0.0l-5.62,0.88l-1.13,0.59l-0.11,1.99l-2.75,2.92l-1.0,0.31l-3.01,-0.31l-1.23,0.89l0.08,1.09l1.68,2.52l0.44,1.67l2.39,1.2l1.4,1.62l1.35,0.02l-2.53,1.76l-0.59,3.21l0.37,0.99l1.86,1.35l0.43,4.07l-1.03,1.82l-1.41,0.85l-0.96,1.53l-2.26,1.49l-0.46,6.94l0.75,4.44l3.41,3.21l2.38,5.77l1.95,2.24l0.48,2.14l0.03,3.83l2.62,4.8l-4.45,2.59l-1.9,2.25l-0.18,1.25l2.42,3.53l-0.3,2.05l-0.6,-0.16l-1.34,-1.48l-0.95,-0.17l-5.99,2.66l-4.01,0.06l-3.45,-2.88l-4.8,-2.57l-1.15,-0.16l-4.61,0.97l-0.31,0.86l0.52,1.3l-0.13,1.18l-1.28,3.67l-2.26,2.1l-0.57,1.16l-3.3,2.22l-0.96,2.45l-5.63,3.27l-1.04,-0.07l-1.02,-1.4l-2.29,0.34l-0.93,1.12l0.04,1.7l-0.9,1.76l-2.46,1.32l0.0,1.24l-4.31,-0.17l-1.57,0.32l-1.41,1.7l-2.7,-1.89l-9.11,7.83l-3.11,-2.29l-0.75,-0.81l-0.23,-2.18l-1.16,-0.43l-1.26,1.23l-1.38,0.03l-0.96,0.62l0.01,1.38l1.22,2.6l-1.1,1.5l-0.76,-0.54l-1.68,-3.39l-2.48,-1.55l-1.41,-0.23l-0.38,0.7l0.48,1.44l-0.68,0.74l-2.41,0.79l-5.52,3.73l0.63,2.28l3.24,3.16l0.84,0.05l1.49,-1.49l0.83,0.09l-1.1,1.64l-0.33,1.74l-4.09,3.63l-1.05,-0.11l-2.86,-3.66l-1.29,-0.72l-1.41,-0.03l-8.41,-3.56l-2.9,-2.79l1.95,0.67l1.03,-0.13l0.4,-0.84l-0.86,-2.97l1.43,-1.97l1.46,0.21l3.54,-0.62l0.93,-1.5l-0.36,-4.1l0.23,-2.09l-0.67,-1.74l0.79,-1.93l-2.19,-2.26l-2.05,-5.17l1.7,-0.8l0.53,-4.24l1.47,0.61l1.18,-0.61l-0.94,-2.11l0.07,-1.08l3.22,2.06l0.81,-0.43l0.85,-1.76l-1.94,-2.45l-1.21,-3.68l-2.36,-1.51l-0.72,-1.89l-0.6,-0.38l-3.37,0.81l-1.83,-0.63l-0.82,-1.2l-0.9,-0.42l-2.27,1.83l-2.49,-0.19l-0.63,-0.77l-0.09,-2.09l-1.07,-1.06l-1.87,0.06l-1.52,1.47l-0.94,-0.62l-4.48,1.4l-1.23,-0.04l-0.35,-0.77l0.15,-2.58l1.11,-1.01l0.41,-1.07l-0.26,-1.91l0.62,-1.75l-0.26,-5.17l0.98,-1.35l0.46,-1.58l2.72,-2.3l1.82,-4.93l0.1,-3.71l0.88,-1.71l-2.11,-1.46l1.53,-2.29l0.42,-1.96l-1.01,-0.55l-2.14,0.89l-2.16,0.34l-4.43,-0.17l-3.7,0.94l1.48,-5.57l-0.8,-3.09l-0.64,-0.92l-2.48,-1.17l-3.9,0.33l1.57,-2.11l1.1,-4.41l-0.0,-1.43l-4.55,-2.02l-1.58,0.51l-0.84,1.61l-4.15,-2.09l0.42,-1.64l1.55,-1.38l0.6,-1.85l-2.17,-6.42l1.27,-2.77l-0.13,-1.79l-1.33,-1.89l-2.65,-1.14l-0.68,-0.73l0.56,-2.66l-0.4,-0.78l-1.01,-0.64l-7.02,-0.98l-6.22,0.75l0.98,-2.04l0.04,-1.2l-1.78,-4.92l2.6,-0.75l2.12,0.18l0.8,-0.41l0.02,-1.89l-0.7,-2.17l0.26,-0.65l3.03,-2.5l-0.37,-0.74l-2.65,-0.72l-5.42,-2.37l-0.33,-1.24l1.2,-8.39l1.11,-2.47l3.86,-0.02l2.71,-1.61l5.35,-9.61l-1.83,-7.02l2.01,-2.0l0.44,-1.92l-0.33,-0.51l-1.9,-0.83l-1.64,-2.28l-1.81,-0.38l-5.65,3.02l-3.19,3.52l-3.04,7.74l-6.45,1.44l-3.47,1.43l-3.09,0.35l-11.03,-1.42l-0.36,-1.93l0.39,-3.2l-0.58,-1.77l0.25,-3.52l-0.36,-2.54l-2.73,-5.09l-1.83,-1.6l-1.79,-0.71l-1.24,0.06l-4.81,2.37l-1.49,0.3l-4.81,-0.16l-2.3,0.39l-3.28,2.8l-1.15,5.1l-0.94,0.96l-1.61,0.77l-5.43,0.72l-1.92,-0.72l-2.27,-0.01l-2.13,-0.81l-0.53,0.49l1.95,6.58l1.29,2.03l6.5,3.13l2.76,2.01l1.2,1.95l1.86,7.84l0.08,14.45l0.41,1.75l3.22,2.41l-0.56,1.69l-1.5,2.22l-4.91,3.34l-1.81,4.09l-0.51,0.36l-0.54,0.14l-12.71,-3.46l-3.2,2.84l-2.29,3.12l-2.84,2.06l-6.76,2.58l-3.59,-1.27l-3.67,0.67l-1.61,0.8l-4.63,4.31l-2.26,-1.35l-3.32,-1.26l-1.97,-5.22l0.11,-0.63l2.68,-2.46l2.37,-1.11l4.44,-0.91l2.73,-8.33l-1.09,-0.94l-1.93,-0.69l-4.15,0.31l-0.59,-0.47l-0.61,-1.89l-2.6,-0.55l-0.5,-0.78l2.41,-3.87l-0.88,-3.26l2.95,-3.9l-1.35,-2.87l-0.29,-1.62l3.37,-0.75l0.94,-0.92l-3.13,-5.85l-3.79,-4.93l-1.34,-0.21l-6.34,2.52l-0.98,-0.3l-1.46,-1.73l-6.64,-4.2l-2.68,-1.19l-1.04,-5.95l-1.0,-2.13l-8.27,-2.62l-1.36,1.45l-1.19,5.14l0.44,1.65l1.54,1.53l-1.11,0.96l-1.38,4.22l-1.33,1.77l-2.52,-0.32l-2.13,0.61l-4.64,3.87l-4.97,5.18l-1.65,0.99l-3.06,0.8l-6.56,4.9l-3.95,0.88l-13.48,0.56l-2.85,2.29l-3.93,1.67l-2.27,-0.1l-1.33,-4.21l0.07,-2.84l2.67,-7.02l0.81,-6.04l-1.42,-4.22l-5.97,-9.76l-1.13,0.15l-1.55,1.95l-2.31,0.68l-2.5,0.16l-2.67,-0.43l-5.13,-1.95l-7.7,-1.09l-2.45,-1.21l-1.82,-2.12l-0.58,-2.28l-0.49,-5.7l-0.99,-2.14ZM267.33,316.2l3.33,0.04l0.42,0.36l1.33,2.69l0.7,4.9l1.58,2.42l4.63,5.15l0.05,5.08l0.57,0.72l1.58,0.27l4.98,-1.09l5.05,3.14l2.1,0.36l2.08,-0.71l0.49,-1.2l4.56,3.26l4.27,-2.96l1.54,-1.68l0.71,-4.91l1.06,-2.17l-0.47,-1.22l-2.35,-2.52l-0.3,-0.81l1.6,-1.8l0.06,-0.83l-3.7,-4.22l-0.78,-0.23l-0.71,0.37l-1.49,3.45l-1.43,0.14l-3.31,-1.67l-3.73,-3.13l-4.34,-0.32l-2.53,-1.73l-0.2,-1.24l-0.64,-0.56l-3.53,-0.03l-1.92,0.54l-6.95,-2.64l-2.68,-1.7l-2.68,0.52l-3.4,-2.1l-1.21,-0.24l-2.22,0.34l-0.3,0.56l1.66,3.98l4.24,1.85l2.28,1.58ZM227.54,225.51l-1.97,1.81l-1.85,-0.65l-0.69,0.34l1.11,-2.22l1.69,-0.75l2.0,0.32l0.99,0.72l-1.29,0.42ZM203.7,215.13l1.2,0.74l-4.56,-0.9l-1.75,0.09l-0.48,1.66l-1.06,-0.77l0.24,-0.59l1.53,-0.58l1.97,-0.22l2.9,0.57ZM191.08,217.06l-5.04,2.57l-2.62,0.16l-2.29,-1.53l-0.55,0.11l-1.56,1.77l-0.92,-0.35l2.17,-2.74l3.92,-0.88l7.88,0.53l0.0,0.36l-1.0,0.0ZM173.83,221.45l-7.48,-0.07l-3.33,0.81l-0.53,2.92l-2.36,0.12l-0.65,-0.58l-0.3,-2.02l0.43,-1.67l0.98,-0.61l11.51,-0.19l1.71,1.3ZM153.99,224.83l0.95,0.77l-0.9,0.6l-3.99,-1.2l2.22,-0.56l1.72,0.38ZM146.3,226.06l-4.68,1.85l-11.86,1.58l-2.98,-0.83l3.62,-2.13l5.18,-0.87l10.71,0.41ZM119.15,232.1l-16.64,1.9l1.54,-0.77l13.21,-1.72l1.89,0.59ZM87.1,250.55l0.68,0.97l-0.99,-1.1l-1.05,-0.35l-2.94,1.09l-1.53,-0.76l-1.24,-1.79l-0.32,-1.61l0.89,-0.69l7.36,-2.27l3.36,-0.27l0.94,1.85l-1.76,0.27l-5.46,2.31l0.25,1.4l1.8,0.94Z", "name": "Niedersachsen"}, "DE-HE": {"path": "M188.99,810.34l6.35,-4.54l0.82,-3.48l1.04,-1.63l1.7,0.13l1.57,-0.41l1.64,1.66l1.0,0.26l0.41,-0.41l0.82,-4.47l-2.64,-1.98l-0.63,-0.83l-0.07,-0.96l1.34,-3.92l1.07,-1.56l5.64,-2.93l1.17,-1.3l1.94,1.78l1.16,0.02l2.13,-3.32l-0.96,-1.72l0.67,-2.02l5.17,0.05l1.73,-0.47l1.1,-1.26l0.0,-1.59l-1.47,-4.79l-0.75,-1.41l-1.96,-1.59l-2.99,-6.28l-1.77,-0.93l-0.76,-1.84l-4.43,-1.15l-0.42,-0.41l1.34,-1.57l1.24,-4.3l1.87,-2.34l-1.94,-1.91l0.45,-8.08l1.58,-1.2l1.46,-2.02l1.44,-0.58l1.38,0.15l2.34,2.66l1.56,0.2l0.93,-0.4l2.36,-2.11l2.64,-6.91l-1.94,-2.86l-0.35,-2.32l-1.98,-4.89l2.28,-7.19l0.56,-0.61l1.34,-0.45l0.4,-0.63l0.8,-5.69l-0.85,-1.44l-2.36,-1.85l-0.09,-1.03l-0.81,-0.77l0.05,-0.5l5.12,-4.59l0.98,-2.42l1.94,-1.41l6.45,-6.68l1.5,-0.07l0.98,2.19l0.86,0.66l1.76,0.3l2.77,-0.29l3.21,-2.25l0.27,-2.25l2.81,-2.89l1.55,-1.05l2.12,0.08l0.5,-1.2l0.14,-3.46l2.02,-4.46l1.85,-1.14l1.65,-3.7l1.88,-2.85l-0.97,-4.61l0.24,-2.07l-1.63,-3.36l0.28,-0.88l9.71,-0.04l3.43,0.84l4.77,-3.12l0.06,-1.36l-1.08,-2.41l5.25,-6.47l0.3,-1.06l-0.07,-2.06l-1.95,-9.31l-1.15,-0.95l0.34,-1.86l-0.62,-0.71l-0.94,-0.03l-2.72,1.84l-4.53,0.96l-1.41,1.88l-1.39,-0.09l-0.62,-0.55l-0.54,-1.9l-1.7,-1.58l1.71,-3.95l5.31,-6.02l0.6,-1.52l1.89,-1.3l1.01,-1.6l4.7,-1.65l3.75,-0.21l3.54,-0.99l4.62,1.08l3.75,-2.38l4.01,-0.2l0.58,-0.35l1.22,-3.35l-1.02,-1.25l-2.22,-0.4l-0.39,-4.41l-1.42,-2.56l0.64,-1.87l4.99,-2.51l4.01,-1.05l1.5,-0.78l3.14,1.99l2.71,1.09l0.7,2.11l-0.15,2.67l2.47,2.45l3.83,0.82l1.35,-0.1l3.6,-2.81l1.97,-0.17l1.2,-4.78l7.03,-4.78l1.48,-2.89l2.01,-2.19l2.37,-6.99l-0.24,-0.76l-1.68,-1.53l7.8,-2.81l2.16,-3.2l1.01,0.43l1.67,-1.62l1.52,0.16l0.47,2.94l1.75,1.09l2.29,-0.09l1.98,-1.76l1.14,1.4l1.44,0.66l1.69,0.21l2.54,-0.81l0.81,2.0l2.27,1.39l1.17,3.62l1.81,1.98l-0.94,1.48l-2.55,-1.92l-1.05,0.04l-0.49,1.36l1.05,2.21l-1.68,-0.53l-0.72,0.16l-0.7,4.53l-1.23,0.31l-0.52,0.59l0.19,1.39l1.92,4.38l1.2,1.63l0.93,0.51l-0.82,1.77l0.67,1.7l-0.22,2.1l0.37,3.91l-0.39,0.88l-5.26,0.57l-1.69,2.34l0.79,3.37l-3.16,-0.89l-0.46,0.46l0.14,0.6l3.39,3.44l8.6,3.66l1.42,0.04l1.1,0.62l2.78,3.61l1.74,0.29l1.01,-0.51l3.57,-3.44l0.44,-1.95l1.15,-2.05l-0.68,-0.82l-0.8,-0.05l-2.1,1.65l-2.96,-2.91l-0.54,-1.52l5.23,-3.37l2.45,-0.81l0.99,-1.13l-0.46,-1.65l2.89,1.64l1.55,3.24l0.8,0.79l1.35,-0.13l0.91,-1.06l0.27,-1.1l-1.3,-3.54l1.89,-0.23l1.37,-1.23l0.31,2.28l3.92,3.2l-1.56,1.38l-0.73,2.0l0.64,3.32l1.28,2.05l0.61,3.82l1.62,0.55l1.96,2.27l1.91,0.02l4.45,1.42l0.29,0.52l-0.47,2.26l0.55,1.03l1.53,1.27l0.4,2.28l0.5,0.75l3.51,1.51l2.02,0.39l1.52,0.94l2.41,0.15l5.56,3.45l-0.25,1.15l-1.44,1.77l-0.62,1.71l-0.63,4.91l-0.91,-1.25l-0.03,-1.26l-1.43,-1.69l-1.76,-0.02l-2.26,0.62l-1.07,0.97l1.53,2.78l2.65,0.81l-0.34,1.69l-1.76,3.39l-0.6,2.71l0.11,1.55l1.94,0.62l1.24,0.96l1.92,0.26l1.48,2.89l-1.8,4.06l-5.16,0.2l-0.79,-0.53l0.07,-1.23l-0.64,-0.5l-1.54,0.49l-1.14,-0.41l-4.38,0.31l-2.45,1.76l-0.42,2.4l0.29,1.11l1.64,2.25l0.27,1.83l-0.3,0.92l-2.51,0.55l-3.38,-0.36l-1.6,-0.58l-1.0,0.4l-0.43,1.01l-0.06,1.18l0.54,0.96l0.68,0.06l0.71,-0.55l-0.06,1.9l0.43,1.4l0.9,0.09l1.69,-1.98l0.97,-0.18l2.22,1.72l2.06,3.81l-2.78,3.56l-0.22,3.82l-2.8,1.05l-2.02,0.26l-2.44,1.56l-0.77,3.1l0.38,2.83l-1.69,0.43l-0.78,1.71l1.45,2.23l-0.21,2.59l-2.03,4.36l0.06,1.82l-1.92,1.89l-1.2,2.04l-0.39,3.89l0.77,1.8l2.32,-0.53l2.69,1.44l1.53,0.12l0.88,-0.55l0.72,-1.8l-1.29,-2.13l0.24,-1.08l4.95,-2.05l4.55,1.05l0.85,0.82l1.03,2.68l0.22,3.42l-1.6,0.61l-1.35,2.01l0.25,5.57l0.82,2.39l-1.21,5.0l0.35,0.95l0.53,0.2l-0.84,2.47l-4.24,7.42l-1.89,1.65l-6.08,3.6l-5.76,2.25l-1.82,0.13l-0.84,-0.34l-2.77,-2.91l-2.65,0.95l-1.25,1.98l-2.34,8.46l0.55,6.38l-2.44,2.1l-4.04,1.66l-0.82,0.8l-0.86,1.18l-0.72,2.23l0.46,2.74l-4.67,1.51l-1.29,0.02l-1.71,-0.78l-2.14,0.52l-1.62,-1.64l-1.36,0.53l-1.58,-0.47l-0.82,0.3l-0.29,1.49l0.31,3.06l-0.98,4.41l0.53,0.94l2.45,0.76l-1.68,3.65l0.46,4.09l-0.8,0.96l-5.85,2.5l-1.4,0.22l-2.12,-0.35l-2.79,-4.64l-4.87,-2.54l-10.07,-0.73l-3.73,1.27l-0.56,2.58l-1.64,1.95l-1.49,1.06l0.63,-1.11l-0.18,-0.68l-4.52,-2.32l-5.41,2.44l-3.79,1.01l-1.23,1.82l-0.27,4.04l-1.61,0.45l-1.24,1.6l0.12,0.55l1.67,1.13l2.74,-0.42l0.87,3.82l0.93,1.51l-0.1,1.75l1.13,2.5l-1.82,-0.71l-0.54,0.37l-0.2,11.33l3.52,10.99l0.79,1.44l0.78,0.27l1.44,-2.04l-0.17,4.03l0.86,2.37l1.2,1.11l2.27,-0.2l0.59,0.93l-2.08,3.81l0.51,1.57l2.36,1.31l-1.57,3.83l0.21,2.9l-0.99,0.98l-1.87,0.31l-0.63,0.53l0.08,2.12l1.07,4.92l-3.78,4.46l0.46,1.34l1.95,1.88l1.26,2.17l-0.68,1.14l-2.02,-1.31l-0.71,0.46l-0.05,1.04l2.47,3.19l2.67,5.31l-1.77,-1.57l-2.86,-0.16l-1.05,0.19l-3.02,2.46l-2.28,-0.43l-5.79,0.26l-2.86,3.58l1.56,3.07l0.23,0.91l-0.41,0.91l-2.27,1.32l-0.71,-1.31l-0.85,0.12l-1.03,3.28l-3.66,4.03l-3.29,-0.8l-0.03,-2.45l1.59,-1.12l0.36,-0.9l-0.19,-4.92l1.83,-2.2l1.49,1.47l1.16,-0.24l1.59,-2.87l-0.2,-2.15l-0.42,-0.26l-5.91,0.5l-1.95,-3.06l-4.3,-0.11l-4.47,-2.65l-1.1,-1.26l-1.38,-3.38l-0.43,-1.64l0.56,-1.23l-0.1,-1.4l-1.73,-3.31l-8.13,2.04l-0.12,0.9l1.9,8.76l-0.61,0.89l-3.9,1.69l-6.5,-6.79l-2.49,-1.98l-2.6,-0.41l-2.94,1.21l-1.51,-4.29l-3.85,-8.13l0.16,-3.83l1.57,-2.79l2.53,-1.72l3.36,-0.75l3.44,-4.74l0.33,-1.67l-1.63,-0.98l-3.7,0.53l-3.2,-7.03l-0.93,-4.17l-3.9,-7.23l1.43,-5.4l-1.93,-5.19l-10.61,-12.12l-2.9,-1.37l-2.86,0.09l-12.29,4.19l-3.9,2.95l-4.63,2.45l-4.17,1.38l-3.69,0.13l-1.58,-2.35l-0.28,-1.83l-0.86,-1.48l-6.36,-5.77l-1.0,-0.43Z", "name": "Hessen"}, "DE-TH": {"path": "M401.08,699.37l0.63,0.28l0.51,-0.58l-0.37,-3.21l0.84,-3.02l1.83,-0.94l2.01,-0.26l3.05,-1.19l0.48,-0.9l-0.04,-3.23l2.88,-3.62l-2.26,-4.54l-2.25,-1.83l-1.74,-0.06l-1.87,2.09l-0.27,-3.26l-0.92,-0.31l-0.7,0.68l0.01,-1.63l0.97,-0.42l0.98,0.58l3.62,0.38l3.03,-0.77l0.52,-1.43l-0.29,-2.09l-1.91,-3.16l0.23,-1.87l2.24,-1.61l3.9,-0.21l1.18,0.41l1.45,-0.47l0.01,1.34l1.79,0.98l5.57,-0.58l1.87,-4.69l-1.83,-3.43l-2.06,-0.32l-1.26,-0.97l-1.49,-0.27l0.53,-3.63l1.75,-3.35l0.39,-2.12l-0.66,-0.69l-2.25,-0.56l-1.17,-2.1l2.52,-0.89l1.42,0.0l0.98,1.32l0.0,1.23l0.79,0.77l0.28,1.01l0.71,0.14l0.67,-0.93l1.07,-6.28l1.44,-1.77l0.45,-1.29l-0.51,-1.13l-3.17,-1.58l-2.41,-1.8l-2.49,-0.18l-1.5,-0.94l-2.08,-0.41l-3.24,-1.37l-0.69,-2.79l-2.02,-2.15l0.5,-2.1l-0.53,-1.02l-4.81,-1.62l-1.76,0.03l-1.78,-2.15l-1.65,-0.6l-0.56,-4.14l-1.08,-1.33l-0.57,-2.53l0.57,-2.1l7.91,-7.05l2.04,-1.2l0.84,-1.13l2.62,1.89l0.61,-0.26l1.05,-1.5l6.11,-0.07l0.39,-0.54l-0.28,-1.08l1.45,-0.49l1.03,-0.87l0.97,-1.92l-0.07,-1.64l0.66,-0.78l1.59,-0.22l0.79,1.29l1.76,0.18l5.92,-3.44l1.05,-2.55l3.21,-2.13l0.66,-1.26l2.31,-2.17l1.53,-4.83l-0.52,-1.95l5.04,-0.69l4.6,2.48l3.65,2.97l4.4,-0.06l5.89,-2.64l2.03,1.71l0.76,0.19l0.96,-0.88l0.25,-1.66l-0.33,-1.09l-2.22,-3.1l0.16,-0.69l1.62,-1.89l4.51,-2.63l1.57,0.92l8.77,-0.23l4.34,2.29l2.91,0.11l1.24,1.2l4.85,1.65l0.9,3.0l-0.86,0.51l-1.42,-0.61l-1.05,0.18l-0.61,0.82l0.03,1.08l1.45,4.2l1.97,2.64l-0.13,3.64l2.55,5.16l-0.69,6.04l0.99,1.86l2.75,1.54l15.19,1.87l4.18,-0.09l9.03,1.34l2.45,0.84l5.01,3.97l2.66,5.04l5.51,8.24l-1.59,2.98l-1.09,1.01l-2.38,1.36l-4.99,0.98l-1.54,2.44l1.28,2.05l4.31,2.27l2.97,4.55l0.69,4.53l-0.77,0.44l-0.3,0.8l0.71,2.97l1.15,1.47l1.79,0.76l5.38,0.27l3.05,-1.72l4.44,0.63l4.63,0.09l3.78,-0.8l2.31,1.74l0.38,3.78l2.26,4.32l0.55,2.17l1.51,1.4l1.1,0.25l1.15,-0.9l9.63,-0.57l2.15,1.64l4.75,2.16l1.32,1.24l1.11,2.54l3.52,2.1l0.18,1.15l0.63,0.63l6.79,-1.06l5.72,1.82l2.68,-1.41l2.87,2.45l0.68,1.25l1.12,0.28l2.07,-1.57l-0.06,-2.76l3.38,-4.3l2.37,-4.48l0.0,-1.19l-0.55,-1.2l-2.5,-1.84l0.47,-3.0l1.69,-3.05l-0.1,-0.98l5.82,-0.59l14.87,4.51l0.76,4.53l4.01,7.59l1.49,1.51l5.45,2.87l2.28,3.6l2.03,4.37l-0.02,0.81l-1.5,0.87l-1.78,2.41l-1.15,-1.1l-1.61,0.32l-3.11,-0.43l-2.17,0.26l-1.79,-0.73l-0.56,0.3l-0.54,1.58l-3.79,2.1l-3.72,4.94l-1.54,-0.75l-3.61,0.45l-3.95,3.07l-7.09,2.14l-0.31,2.23l1.2,1.36l1.63,0.72l0.22,0.54l-1.46,1.86l-1.22,0.21l-1.11,0.93l-0.99,2.97l0.44,0.87l1.65,-0.14l0.77,0.57l-0.38,2.54l1.46,3.54l1.18,0.6l2.71,0.14l-1.76,3.07l-4.54,3.74l-4.22,-0.24l-2.44,0.35l-2.79,3.53l0.06,3.31l-0.65,2.25l-0.59,0.69l-2.48,0.82l-1.96,-0.95l-1.76,0.3l-3.29,4.59l-1.32,-0.18l-2.1,-2.14l-1.14,-0.26l-1.4,0.48l-2.03,2.84l-2.36,1.84l-1.74,3.0l-0.16,1.64l1.68,1.65l0.37,0.92l0.04,1.23l-1.01,1.38l-0.22,1.56l-2.18,0.92l-1.15,0.99l-0.35,1.2l0.61,1.12l-2.88,1.73l-4.26,1.71l-0.14,-1.43l-1.85,-0.88l-0.89,-1.11l-1.3,-0.12l-2.38,0.43l-0.59,0.89l-1.51,0.46l-11.48,2.43l-2.89,-1.16l-2.25,-0.02l-1.49,1.92l-2.63,0.47l-3.61,-2.59l-0.43,-3.73l-0.56,-1.0l-0.91,-0.43l-1.58,0.26l-2.98,-2.26l-0.01,-6.1l1.41,-1.06l0.37,-0.83l-1.18,-2.71l-1.96,-0.74l-6.26,-0.34l-2.53,1.94l-0.76,2.2l-1.89,1.24l-4.64,1.76l-0.21,0.47l0.76,2.46l-0.2,1.16l0.79,3.21l-0.33,3.89l0.64,2.62l1.13,1.91l0.29,2.24l-1.12,0.78l0.16,1.81l-1.11,3.11l0.66,2.47l-1.04,2.51l0.09,1.89l-0.74,0.16l-2.11,-0.65l-1.71,-1.14l-0.69,0.43l-0.73,1.35l-4.4,-4.16l-0.59,-0.95l1.78,-2.06l0.17,-1.16l-1.89,-3.35l-1.63,-0.58l-0.95,-1.82l-1.73,0.24l-1.37,1.4l-3.37,0.97l-2.19,-2.01l-2.95,-0.42l-0.57,0.33l-0.35,1.63l-4.21,-5.6l-1.68,-0.1l-3.0,0.87l-1.14,-1.46l-1.02,-0.38l-1.57,0.73l-2.31,-0.24l-2.53,1.36l-1.96,-0.61l-1.31,0.98l-2.05,3.5l-2.4,-0.61l-1.16,0.72l-0.49,1.11l-0.29,4.64l0.89,1.21l2.66,1.57l1.94,2.01l2.97,0.21l1.26,2.14l2.78,1.07l0.51,1.66l-0.14,1.51l-0.39,0.5l-0.84,0.13l-2.92,-1.11l-4.03,0.75l-1.43,-0.69l-0.81,0.14l-0.81,1.03l-0.69,5.02l-3.19,-1.95l-2.42,-0.67l-4.35,0.0l-1.02,-1.45l0.25,-2.17l-1.24,-2.71l0.56,-3.75l-0.94,-5.36l-2.51,-2.14l-1.69,-3.07l-1.63,0.22l-1.04,0.8l-2.39,-0.25l-0.36,-1.63l-2.7,-2.34l-1.63,-2.89l-2.74,0.55l-2.35,-0.59l-0.42,-1.13l0.93,-1.58l-0.26,-0.81l-2.69,-2.23l-3.1,-3.4l-0.31,-2.76l-1.12,-1.99l-9.35,-3.58l-1.02,-3.16l-1.91,-2.1l-1.63,-0.48l-5.16,0.4l-0.38,-0.57l-0.02,-1.5l-0.74,-0.38l-1.69,1.2l-5.23,5.87l-0.35,-0.03l1.09,-5.36l-0.84,-2.5l-0.24,-5.35l1.1,-1.52l1.44,-0.25l0.42,-0.89l-0.25,-3.7l-1.76,-3.66l-4.97,-1.4l-1.26,0.02l-4.98,2.53l-0.2,1.5l1.27,1.93l-0.7,1.47l-1.38,0.0l-2.79,-1.47l-2.1,0.59l-0.34,-1.16l0.32,-3.47l1.08,-1.85l2.01,-2.02l0.01,-1.99l2.03,-4.37l0.22,-2.96l-1.4,-2.02l0.39,-1.06l0.9,-0.39Z", "name": "Th\u00fcringen"}, "DE-BW": {"path": "M163.28,1160.54l2.55,-3.63l0.03,-2.48l-1.21,-5.03l1.63,-6.56l1.9,-1.57l0.21,-1.76l-0.51,-4.52l1.96,-3.48l0.07,-3.1l0.5,-1.8l2.54,-2.71l1.04,-2.07l-0.26,-4.76l-4.19,-7.4l-0.29,-5.93l0.59,-2.8l0.65,-2.19l1.87,-3.36l0.83,-3.89l6.17,-8.68l1.07,-2.2l1.5,-8.54l3.37,-2.3l1.41,-2.36l0.11,-2.19l-1.14,-3.85l-0.19,-3.58l1.2,-5.5l1.82,-3.81l0.67,-4.07l3.69,-3.38l-0.02,-1.15l-1.13,-3.07l0.01,-5.06l0.8,-4.73l4.06,-6.36l2.73,-1.32l4.2,-4.55l2.52,-2.09l1.55,-2.69l0.56,-3.98l4.59,-0.69l0.67,-0.69l0.42,-2.19l0.98,-1.34l0.81,-0.08l4.35,-2.6l1.25,-2.12l4.43,-12.27l3.03,-5.76l1.81,-2.1l3.18,-1.21l3.22,-3.48l2.09,-3.26l7.22,-14.92l2.96,-18.35l2.25,-1.7l6.86,-8.21l0.35,-1.89l-0.26,-0.45l-2.0,-0.71l3.64,-8.83l-0.69,-5.31l1.34,-3.3l-1.26,-1.91l-4.78,-1.34l0.0,-0.51l1.85,-0.92l0.22,-1.39l-3.54,-9.43l-1.86,-3.11l0.75,-3.31l2.98,-1.24l2.14,0.35l9.32,8.87l4.31,-1.84l0.9,-1.12l0.02,-1.37l-1.84,-8.27l7.1,-1.78l0.11,0.97l1.33,2.44l-0.6,1.82l0.47,1.87l1.45,3.53l1.27,1.48l4.81,2.83l4.12,0.05l1.16,2.34l1.0,0.79l5.85,-0.47l-0.1,1.87l-1.23,2.01l-2.15,-1.48l-2.21,2.23l-0.53,1.57l0.33,4.28l-1.88,1.68l-0.23,2.05l0.32,1.02l3.71,1.3l1.64,-0.94l2.98,-3.57l0.86,-3.07l0.39,1.08l0.78,0.26l2.83,-1.66l0.55,-1.45l-0.66,-2.08l-1.13,-1.69l2.54,-3.04l5.28,-0.13l2.52,0.41l1.07,-0.46l2.19,-2.11l0.62,-0.06l2.4,0.06l1.27,1.46l1.42,0.09l0.33,-0.77l-0.26,-0.99l-2.55,-4.64l-2.42,-3.38l1.23,1.04l0.91,0.18l1.16,-1.34l1.08,0.44l5.5,-1.21l8.0,-0.01l1.16,-1.37l0.68,-2.12l1.37,-1.47l-0.25,-2.59l0.56,-0.74l2.01,-1.02l3.16,-0.26l2.77,-1.23l1.65,1.49l1.08,0.07l2.03,-1.8l-0.61,-2.22l1.16,-6.64l-0.36,-0.77l-2.35,-1.23l-0.81,0.05l-0.7,0.62l-0.77,2.2l-0.71,0.24l0.2,-2.36l-0.57,-1.1l-4.05,-0.9l-1.04,-0.61l0.65,-2.63l-0.73,-2.26l2.43,-2.35l1.06,-0.35l4.7,0.33l3.68,-1.31l5.12,-0.47l5.34,2.51l1.34,0.1l1.59,-0.57l2.79,1.67l2.76,-0.88l1.61,-1.02l0.31,0.85l-0.7,1.4l0.32,2.33l-0.56,1.54l0.2,1.62l-0.81,0.82l0.07,1.37l-0.88,2.42l0.66,1.1l1.86,0.98l1.51,0.16l1.25,-0.6l0.54,-2.57l1.25,-0.67l0.74,-1.29l0.25,2.23l0.97,2.23l1.08,0.61l3.66,-3.82l2.53,-1.31l3.57,4.68l0.28,6.0l3.9,4.43l0.66,1.26l-0.33,1.13l-1.66,2.16l-0.2,3.08l-1.99,2.43l0.01,0.9l1.24,1.01l1.71,-0.4l1.06,-2.53l1.26,-0.52l1.21,-1.71l0.86,-0.39l0.42,0.73l-0.61,1.62l1.69,1.74l0.42,3.24l-0.21,3.36l0.58,4.0l1.37,0.45l7.07,-0.16l0.99,-0.49l3.9,-4.13l0.03,-1.83l-0.77,-1.08l2.32,-2.08l1.27,0.86l-0.62,1.65l0.29,0.99l1.17,0.82l1.66,0.41l-0.73,2.77l1.09,2.93l-1.89,4.49l0.47,0.7l2.35,1.0l2.95,7.23l-1.61,-0.61l-1.2,0.18l-2.04,2.49l-0.26,4.21l0.27,1.12l1.12,1.55l2.03,1.16l-0.71,2.62l1.27,3.56l-0.05,0.81l-0.41,0.16l-1.89,-1.0l-0.64,0.33l-0.24,0.87l0.36,1.23l1.38,1.52l0.09,3.07l1.53,2.46l-1.25,0.73l-0.04,0.69l3.34,2.83l3.74,4.62l0.82,0.15l1.63,-0.85l1.84,1.72l0.05,2.86l-0.96,2.37l-0.47,0.42l-1.52,0.12l-0.39,0.92l0.68,0.8l2.46,1.04l-0.21,1.82l1.81,1.83l-0.27,2.52l2.7,1.31l1.58,0.03l2.23,1.25l1.58,0.18l1.58,3.9l4.1,3.39l2.32,3.3l0.69,1.77l1.24,1.35l0.87,3.02l-2.25,1.57l1.04,1.45l-0.27,5.51l-0.48,1.73l1.08,2.78l-0.48,2.39l-1.44,2.11l0.02,3.78l-0.71,1.33l-0.08,1.59l0.25,1.27l0.76,1.02l2.05,1.13l0.86,0.04l2.2,4.81l-5.06,4.36l-0.19,-1.17l1.12,-3.27l-0.69,-0.89l-1.2,-0.12l-5.52,5.92l-1.95,-3.54l-3.03,-0.19l-2.05,-1.92l-0.98,0.09l-2.23,3.06l-0.26,2.17l1.83,3.64l4.42,3.4l-0.27,0.99l-1.5,0.75l-0.38,0.72l1.29,4.82l-1.27,4.87l0.28,0.99l-4.34,0.45l-1.5,1.66l-0.38,1.86l-9.25,5.65l-0.73,-0.44l-0.5,-2.11l-1.44,-0.72l-2.81,1.81l-3.46,0.78l-1.4,1.41l-1.0,1.88l0.2,1.98l-6.07,8.1l0.86,2.07l1.4,0.31l1.82,4.05l3.09,5.24l1.54,5.25l3.86,17.8l2.64,6.02l0.29,1.82l-0.17,5.41l-0.72,3.17l-2.84,7.96l-1.56,1.64l0.19,1.63l2.24,3.71l-0.37,5.12l-0.89,3.27l-1.1,1.64l0.44,0.79l1.35,0.17l2.35,5.98l-0.72,0.36l-0.87,1.48l-2.26,0.32l-0.96,1.8l2.04,3.28l1.45,0.42l0.22,0.46l0.54,7.52l0.84,2.92l-0.36,1.74l-1.03,0.19l-2.41,-0.64l-0.56,1.24l-0.13,2.07l-0.51,0.64l-1.23,-3.26l-1.03,-0.79l-1.92,-0.05l-2.52,0.69l-5.43,2.31l-2.26,0.03l-2.29,-0.55l-4.23,-1.69l-3.11,1.49l-7.24,6.48l-4.22,2.16l-3.58,-0.9l-1.54,0.75l-0.96,1.51l-4.01,1.08l-5.8,7.98l-27.27,-16.97l-3.94,-0.94l-3.54,-0.0l-1.55,-2.08l-5.4,0.0l-10.92,-1.24l-2.04,0.78l-1.65,1.73l-3.42,1.09l-3.73,0.36l-2.26,-0.59l-2.76,-2.07l-1.33,-1.33l-0.01,-0.53l1.5,-0.35l0.18,-0.68l-2.61,-2.46l-3.2,-1.88l-2.82,-0.17l-0.4,0.28l-0.89,2.86l0.3,0.63l-3.98,0.06l-0.37,-1.74l-1.16,-2.07l1.83,-3.31l-0.65,-1.8l-3.17,-0.39l-2.37,-4.15l-1.47,-0.59l-1.31,1.04l-0.59,3.21l-0.84,0.55l-0.61,-0.46l-0.8,-4.86l-1.94,-0.85l-2.46,-0.14l-1.78,0.95l-0.17,0.49l0.78,1.96l-1.11,0.57l-6.45,1.06l-0.9,0.58l-1.82,3.09l-0.73,2.87l-3.37,2.21l-1.07,1.19l-0.2,1.3l0.64,2.31l-0.58,1.47l0.23,0.52l2.0,0.65l4.72,3.1l1.92,-0.12l4.22,-2.44l4.63,-0.79l3.38,0.92l-0.36,2.25l-0.53,-1.01l-1.68,0.81l0.13,4.66l-0.63,1.89l-0.91,0.3l-2.11,-3.13l-1.84,-1.52l-3.12,0.37l-3.01,1.99l-1.38,3.16l-2.72,0.46l-6.19,-0.03l-4.43,-1.5l-1.15,-2.67l-0.85,-0.89l-3.61,-0.9l-1.9,-0.0l-5.5,0.96l-1.66,1.73l-1.78,0.54l-2.98,1.81l-2.54,2.92l-4.3,0.97l-12.46,0.0l-0.64,-3.04l-0.71,-0.81l-6.51,-0.5l-1.3,-0.66l-0.52,0.14l-3.29,4.58l-1.72,0.98l-8.05,1.68l-2.02,-0.27l-3.56,-1.89l1.22,-0.1l1.14,-1.17l1.29,-3.65l-0.42,-0.53l-2.3,0.26l-4.31,1.3l0.46,-1.47l-0.28,-1.55l-1.73,-2.04l-3.54,-6.31l-1.8,-1.34l-0.56,-4.51Z", "name": "Baden-W\u00fcrttemberg"}, "DE-HH": {"path": "M426.9,236.58l0.36,2.82l1.06,0.95l0.26,0.81l-0.72,3.17l-0.4,4.75l-3.09,1.19l-0.66,0.76l0.99,7.48l0.54,0.9l2.65,1.07l3.34,4.96l2.88,1.8l3.39,3.7l0.78,-0.01l0.55,3.01l-3.71,0.0l-1.13,0.37l-1.08,0.71l-2.35,3.23l-5.11,0.35l-1.5,-0.34l-1.48,-1.07l-2.17,-2.77l-2.1,-0.65l-2.98,-2.83l-5.13,1.68l-0.49,0.8l-0.01,1.47l-4.92,2.12l-2.85,-1.43l-3.07,1.18l-0.52,-3.88l-1.3,-1.56l-1.57,0.32l-1.91,2.36l-3.27,-3.01l-1.86,-2.82l-1.12,-3.13l-2.42,-3.3l-0.37,-5.88l4.87,1.1l1.53,-0.56l0.19,-0.57l-1.36,-2.3l-3.68,-2.16l-3.77,-0.48l1.06,-5.36l1.01,-1.38l0.44,-1.91l1.48,0.3l1.92,1.41l-0.31,3.35l0.53,0.67l0.95,0.26l10.92,-8.69l2.32,-0.72l3.25,0.52l1.08,-0.85l1.0,-2.62l0.8,-0.85l1.74,-0.5l1.8,0.23l1.07,-0.57l0.66,-0.71l1.26,-5.25l0.68,-0.84l5.84,0.95l3.32,-2.33l0.77,0.22l-0.1,0.93l-2.23,3.94l-0.53,1.8l0.58,1.18l3.41,2.56Z", "name": "Hamburg"}, "DE-SH": {"path": "M521.93,110.37l-3.01,0.19l-2.37,-0.4l-0.92,-1.15l0.17,-3.29l-0.71,-1.72l-1.53,-0.55l-2.58,-0.08l-1.19,0.36l-1.02,0.98l-0.94,-1.94l-1.4,0.43l-0.18,-1.6l2.67,-6.66l3.7,-3.62l4.5,-0.77l8.22,3.56l3.15,3.07l6.9,13.05l-11.55,-1.94l-2.06,1.08l0.14,1.0ZM275.98,29.38l3.09,0.96l3.61,0.15l6.81,-2.52l2.18,-0.34l7.74,1.34l7.72,3.18l20.72,4.91l1.48,1.31l1.44,6.04l2.11,0.97l8.71,-0.25l3.55,-2.38l1.46,-0.33l2.05,1.84l1.68,0.19l3.15,-0.52l5.84,-2.98l1.92,-2.35l2.49,-1.09l1.82,-2.67l0.53,5.71l4.88,1.79l5.95,0.32l3.97,1.76l6.47,3.99l1.03,2.93l1.53,1.75l2.64,-0.46l4.46,-1.73l-0.08,-3.54l1.76,-0.12l3.02,1.88l2.15,2.75l1.96,7.15l2.51,3.07l-0.78,0.6l-3.22,-0.94l-2.62,2.3l-1.56,0.58l-0.35,2.13l0.37,0.41l1.44,0.09l2.65,-0.78l2.3,-0.13l1.36,1.82l2.26,-0.81l0.34,0.65l-0.65,2.23l0.55,5.81l-1.04,9.95l-1.58,4.22l-1.2,1.73l-3.1,2.9l-3.86,2.17l-4.18,1.36l-4.07,0.47l-0.35,1.55l4.72,2.62l23.58,-5.66l1.65,0.6l5.56,4.88l-1.76,1.94l0.01,1.99l1.26,4.63l-0.53,2.11l-1.32,2.0l-1.66,1.43l-1.62,0.49l-0.22,0.61l0.57,0.87l-0.53,1.48l0.98,1.06l0.26,1.22l-1.25,3.45l2.61,-0.68l1.85,-2.22l2.31,-5.24l1.95,-6.9l0.81,-0.54l3.77,-0.44l1.47,-0.91l1.95,-2.64l0.96,-0.31l4.02,0.35l2.05,1.03l5.99,4.81l15.41,6.87l8.7,8.24l4.22,1.11l4.8,-0.88l3.37,-2.11l5.58,-5.23l3.17,-2.06l3.3,-1.39l3.72,-0.49l-0.02,0.64l1.7,0.77l1.8,-0.49l2.56,1.51l6.73,-4.15l2.35,0.9l-4.1,4.98l-1.82,-0.92l-0.54,0.51l1.04,2.72l1.66,9.76l-0.72,2.15l0.74,7.67l-0.41,2.74l-1.81,2.46l-0.47,1.47l-11.27,7.36l-4.01,5.11l-1.62,1.05l-4.81,1.41l-0.61,0.54l-1.28,-1.12l-1.14,-0.02l-0.79,0.51l-5.37,7.83l0.03,1.19l1.34,3.32l1.43,2.4l1.98,1.68l2.81,0.92l3.86,-0.36l0.71,0.29l0.61,1.53l0.47,3.51l1.72,0.72l-0.03,4.88l1.7,1.91l3.41,1.11l-0.9,0.74l-2.95,0.49l-0.35,-0.5l0.09,-1.5l-1.81,-0.81l-0.94,0.04l-2.4,1.59l-4.79,4.5l-4.49,2.59l-1.22,2.33l-0.46,2.34l1.16,3.59l0.8,4.36l-1.14,7.7l0.49,0.41l4.29,0.88l4.98,6.34l0.87,0.5l2.2,-0.28l2.63,0.81l2.19,1.9l0.65,1.11l0.1,1.99l0.97,2.34l-0.26,2.44l-1.37,1.15l0.09,2.96l1.28,5.43l-1.05,1.6l0.99,0.44l-1.91,2.38l-0.86,-2.9l-1.15,-0.94l-5.07,0.63l-1.58,-0.6l-1.42,0.39l-0.28,0.77l0.5,3.19l-0.91,2.64l-0.18,2.46l-5.9,4.43l-5.51,1.74l-1.3,3.28l-1.39,-0.33l-1.4,0.21l-2.22,1.33l-0.61,1.13l-0.94,7.86l-2.28,3.96l-2.87,1.21l-3.85,-1.34l-13.9,-8.45l-3.59,-1.38l-2.01,-0.11l-0.67,-3.51l-1.08,-0.26l-3.25,-3.54l-2.94,-1.85l-3.3,-4.93l-2.68,-1.1l-1.23,-7.56l3.0,-1.13l0.66,-0.61l1.22,-8.27l-0.44,-1.36l-0.93,-0.75l-0.41,-2.94l-3.56,-2.72l-0.34,-0.72l2.72,-5.34l0.21,-1.05l-0.54,-0.95l-1.81,-0.08l-2.77,2.21l-5.89,-0.96l-1.22,1.38l-1.63,5.57l-0.62,0.41l-1.89,-0.21l-2.05,0.61l-1.07,1.12l-0.97,2.57l-0.72,0.57l-3.1,-0.57l-2.64,0.85l-10.7,8.57l-0.54,-0.58l0.27,-3.35l-2.24,-1.68l-2.25,-0.31l-0.75,2.27l-1.07,1.51l-1.09,5.5l-4.34,-0.51l-3.51,-1.39l-7.0,-4.55l-3.12,-3.55l-1.12,-5.15l-0.67,-7.4l-1.19,-1.2l-6.06,-3.12l-2.28,-2.09l-2.25,-4.89l-1.53,-5.3l-0.41,-3.62l-3.5,-1.4l-6.15,-5.34l-3.87,-2.37l-3.76,-0.86l-12.38,-0.29l-6.22,-2.43l-1.46,0.78l-0.99,1.56l-1.91,-0.64l-3.36,-2.58l-3.21,-4.0l-7.93,-16.13l3.34,-1.55l1.71,-0.13l2.22,0.61l3.78,2.57l2.21,0.75l2.45,-1.05l0.95,-2.03l0.82,-3.37l0.53,-6.27l-1.21,-1.94l-3.07,-3.22l0.26,-2.84l-0.28,-0.38l-2.59,-0.75l-3.42,0.64l-3.31,1.58l-2.02,1.95l-4.51,-8.88l0.75,-3.21l2.54,-5.53l-0.68,-3.65l0.99,-0.76l5.71,-1.34l1.24,-0.94l3.15,-4.86l1.0,-2.59l-0.45,-0.54l-2.23,0.44l-3.84,3.28l-1.24,0.55l0.4,-1.43l-0.42,-0.54l-11.06,2.29l-3.67,-0.57l-1.64,0.69l-3.2,3.1l-0.94,0.31l-2.4,-0.88l-2.69,-2.46l-1.95,-3.57l-0.26,-4.14l1.22,-1.54l2.56,-1.16l2.91,-0.59l2.26,0.11l0.42,-0.4l-0.3,-1.54l-1.66,-0.41l-1.27,-1.21l-1.45,-0.51l-1.61,1.72l-0.51,-1.12l0.27,-1.72l1.63,-2.78l2.07,0.82l7.9,-2.18l10.73,0.0l2.71,-0.73l2.12,-1.34l4.1,-3.64l3.75,-1.85l1.7,-1.3l0.82,-3.06l0.01,-4.1l-2.6,-4.15l-8.0,-8.66l-1.08,-1.72l-0.59,-1.94l-1.18,-0.89l-2.02,0.07l-3.01,1.16l-0.29,-0.55l3.06,-2.11l0.15,-0.47l-3.41,-9.22l-1.3,-2.42l-2.93,-1.9l-5.29,-4.65l-3.19,-1.62l0.53,-4.12l-1.29,-3.46l-3.22,-6.32l-0.54,-4.38l0.44,-3.88l1.22,-4.53ZM503.71,116.33l3.02,-0.39l0.0,0.31l-3.02,0.08ZM297.88,101.15l-4.1,0.32l-1.81,-0.65l-0.81,-1.42l0.92,-0.67l0.14,-1.19l-1.04,-1.65l2.76,-2.67l3.33,-1.53l3.73,-0.21l3.48,0.92l-0.15,2.08l-1.72,1.69l-2.61,3.89l-2.13,1.1ZM276.27,95.63l-2.62,1.5l-1.94,-0.04l-1.07,-0.95l-0.93,-2.24l0.55,-2.46l3.02,-2.04l5.78,-2.48l0.14,1.24l-0.75,4.01l-2.18,3.46ZM248.68,29.55l5.02,1.3l5.97,-0.3l-3.74,2.69l-1.36,0.39l-6.61,0.0l-1.41,-1.77l-1.96,-0.41l-4.38,2.93l-0.82,5.6l0.33,9.28l-0.74,5.19l-0.47,-1.75l-0.09,-4.41l1.14,-18.44l0.92,-3.58l7.39,-20.85l1.45,-1.83l0.2,0.52l2.48,0.26l0.66,1.71l-0.77,2.08l-3.99,2.31l-1.91,2.89l-1.01,3.44l0.84,3.3l-0.57,5.99l3.45,3.49ZM250.17,2.5l1.58,-1.99l3.13,1.68l-4.56,0.24l-0.15,0.07ZM262.95,30.38l10.9,-0.55l-1.37,1.09l-9.53,-0.53ZM266.82,63.1l-0.7,1.01l-1.13,0.36l-1.53,-0.17l-2.59,-1.28l-2.42,0.92l-3.01,-0.94l-5.35,-3.34l1.72,-3.18l2.13,-2.06l2.55,-1.01l3.19,-0.28l5.33,0.33l2.06,1.27l1.65,2.86l0.0,0.94l-1.89,4.56ZM245.51,60.5l-2.39,3.08l4.9,9.27l1.52,0.94l-0.86,0.74l-3.05,1.1l-2.07,-1.89l-3.65,-5.83l2.7,-5.11l1.67,-1.83l1.23,-0.46ZM245.76,60.4l0.08,-0.03l0.0,0.01l-0.08,0.02ZM199.96,148.11l0.73,0.4l0.17,0.83l-0.2,-0.06l-0.71,-1.16Z", "name": "Schleswig-Holstein"}, "DE-NW": {"path": "M0.44,657.65l2.31,-1.22l1.09,0.62l2.48,2.71l2.37,-0.22l1.27,-1.43l1.87,-3.92l1.26,-1.45l9.02,-7.1l5.56,-3.02l1.59,-2.06l-0.05,-0.53l-1.72,-1.61l2.62,-1.97l-0.07,-0.72l-2.6,-0.73l-4.69,3.22l-1.94,-1.08l-0.65,-2.65l0.28,-3.41l0.83,-3.03l3.05,-4.22l5.0,-9.27l3.43,-2.67l1.07,-1.48l1.44,-6.85l-1.44,-2.08l1.22,-9.17l-1.17,-8.13l-4.04,-4.78l-6.47,-8.93l-0.39,-1.77l1.64,-5.67l-0.22,-0.49l-6.55,-2.89l-2.07,-2.64l1.27,-4.29l-1.09,-1.4l-3.41,-2.29l-3.59,-0.24l0.06,-1.26l2.19,-2.32l0.17,-3.21l-1.34,-3.24l-2.15,-1.72l0.24,-1.02l1.43,-1.02l4.01,-0.73l5.32,-3.07l3.86,-1.04l7.4,1.66l-1.35,-2.59l-4.44,-4.46l2.62,-1.42l2.93,1.4l3.22,2.59l3.32,1.36l3.84,-0.57l2.1,3.05l3.93,0.7l1.36,0.8l0.27,2.27l0.51,0.34l3.97,-1.32l0.4,-1.76l-0.65,-2.92l5.64,1.67l2.28,-0.02l1.69,-0.8l4.78,-3.68l9.65,-3.3l8.63,-0.27l2.84,-1.5l2.45,-2.89l2.21,-4.03l2.01,-1.45l-0.04,-3.39l-3.24,-3.73l-9.94,-5.23l-0.17,-2.14l0.59,-1.43l3.1,-1.14l2.11,-3.95l1.6,-1.66l1.45,-0.81l6.49,-0.82l1.33,-1.25l2.14,-4.39l1.81,-1.91l4.24,-1.89l2.03,-1.83l3.28,-4.9l4.32,-2.63l0.44,-1.13l2.17,0.05l4.05,-1.73l2.66,-2.21l13.38,-0.56l4.13,-0.91l6.74,-4.99l2.94,-0.74l1.84,-1.1l5.03,-5.24l4.49,-3.76l1.74,-0.49l2.89,0.24l1.61,-2.0l1.44,-4.36l1.17,-0.95l-0.17,-0.91l-1.46,-1.39l-0.34,-1.13l1.16,-4.99l0.83,-0.93l7.51,2.45l0.75,1.71l1.21,6.28l2.91,1.38l6.56,4.15l1.5,1.76l1.6,0.4l6.36,-2.52l0.72,0.14l3.51,4.64l2.76,4.82l0.08,0.67l-3.29,0.56l-0.78,0.68l0.26,2.24l1.31,2.5l-2.88,3.66l0.84,3.4l-2.37,3.47l-0.04,0.82l0.93,1.29l2.43,0.48l0.45,1.69l0.97,0.77l4.33,-0.27l2.14,0.87l0.17,0.54l-2.52,7.21l-4.05,0.69l-2.53,1.17l-2.97,2.71l-0.25,1.06l2.16,5.75l6.29,2.91l5.06,-4.49l1.4,-0.68l3.4,-0.61l3.7,1.26l6.99,-2.67l3.06,-2.22l2.3,-3.13l2.97,-2.63l12.23,3.51l1.01,-0.22l0.87,-0.69l1.68,-3.92l4.88,-3.31l1.68,-2.47l0.59,-2.32l-3.33,-2.62l-0.26,-1.37l-0.08,-14.42l-1.92,-8.07l-1.35,-2.18l-2.9,-2.13l-6.35,-3.01l-1.13,-1.76l-1.71,-5.76l1.58,0.57l2.18,-0.01l2.1,0.74l5.69,-0.78l2.54,-1.51l0.64,-1.22l0.94,-4.47l3.07,-2.52l6.73,-0.09l1.68,-0.35l4.79,-2.36l0.85,-0.01l1.51,0.62l1.55,1.35l2.62,4.84l0.33,2.35l-0.24,3.6l0.57,1.69l-0.38,3.96l0.52,1.65l1.53,0.62l10.17,1.1l3.27,-0.38l3.47,-1.43l6.69,-1.56l0.87,-1.28l1.46,-4.61l1.41,-2.78l2.54,-2.64l5.35,-2.85l1.1,0.26l1.6,2.24l1.96,0.93l-0.72,1.89l-1.76,1.75l1.86,6.84l-3.14,5.11l-1.73,3.76l-2.64,1.84l-2.94,-0.22l-1.12,0.33l-1.47,2.99l-1.24,8.79l0.45,1.4l0.86,0.8l7.4,2.55l-2.75,2.07l-0.43,0.97l0.8,3.78l-2.42,-0.08l-3.08,0.89l-0.26,0.52l1.89,5.12l-1.08,3.37l0.65,0.62l6.37,-0.77l6.88,0.96l0.59,0.38l-0.2,3.39l0.96,0.97l2.62,1.13l0.97,1.39l0.11,0.85l-1.26,3.57l2.17,6.32l-0.47,1.47l-1.59,1.44l-0.54,2.29l1.44,1.14l3.49,1.47l0.68,-0.19l0.73,-1.61l1.07,-0.33l3.85,1.64l-1.16,5.19l-1.84,2.29l0.05,0.56l1.01,0.29l3.74,-0.34l2.15,1.05l1.1,3.31l-1.58,5.77l0.29,0.52l1.18,0.24l3.22,-1.06l4.43,0.17l4.49,-1.08l-2.02,3.85l0.47,1.05l1.67,0.64l-0.89,1.36l-0.09,3.65l-1.73,4.7l-2.65,2.21l-0.56,1.74l-0.99,1.38l0.2,5.44l-0.62,1.8l0.26,1.82l-1.44,1.82l-0.28,1.54l0.21,2.03l0.79,0.92l1.6,0.04l3.59,-1.12l-1.58,2.44l-6.95,2.31l-1.41,0.98l0.06,0.79l1.98,1.74l-1.83,5.92l-2.42,2.84l-1.38,2.76l-7.1,4.86l-1.12,4.69l-1.78,0.04l-3.76,2.82l-4.2,-0.7l-2.14,-2.02l-0.01,-3.97l-0.7,-1.08l-2.91,-1.26l-1.96,-1.49l-1.8,-0.59l-1.53,0.8l-4.09,1.08l-5.1,2.57l-0.7,0.92l-0.3,1.76l1.43,2.62l0.43,4.54l0.55,0.48l2.08,0.32l0.55,0.6l-1.16,2.82l-4.08,0.22l-3.67,2.36l-4.5,-1.09l-3.65,1.0l-4.4,0.37l-4.63,1.79l-0.91,1.6l-1.86,1.26l-0.61,1.56l-5.38,6.1l-1.84,4.3l0.35,0.85l1.56,1.31l0.72,2.19l1.88,0.7l1.22,-0.33l1.16,-1.71l4.44,-0.91l2.25,-1.64l0.93,-0.06l-0.31,1.99l1.16,0.9l1.93,9.22l0.06,1.87l-5.5,7.27l1.02,3.79l-4.11,2.61l-3.29,-0.84l-10.05,0.04l-0.38,0.28l-0.39,1.6l1.63,3.32l-0.25,1.99l0.96,4.46l-1.65,2.29l-1.7,3.81l-1.23,0.43l-0.7,0.84l-2.09,4.64l-0.31,4.11l-1.84,-0.11l-1.91,1.25l-3.02,3.16l-0.17,2.09l-2.79,1.97l-4.07,-0.01l-1.64,-2.75l-2.29,0.02l-6.68,6.85l-1.94,1.4l-1.01,2.44l-5.32,4.99l0.01,0.93l0.82,0.79l0.14,1.12l2.48,2.0l0.63,1.16l-0.78,5.17l-1.89,1.09l-1.1,2.16l-3.68,-1.84l-3.44,1.17l-0.58,-2.5l-1.66,-2.95l-4.16,-5.44l-0.96,-1.85l0.28,-4.52l-1.38,-5.41l-1.0,-0.26l-1.97,0.82l-5.44,-5.32l-2.69,-0.96l-1.09,-0.8l1.04,-4.31l0.32,-2.22l-0.29,-0.44l-5.7,-1.59l-1.5,0.38l-3.21,3.05l-0.3,0.96l0.22,4.99l1.23,3.18l-0.13,2.43l-2.86,-0.76l-2.5,2.69l-3.62,2.22l-0.08,0.62l2.17,2.64l-0.2,1.96l-0.46,0.17l-0.47,-0.59l-0.83,0.02l-1.51,2.27l-4.36,1.91l-1.46,2.67l-2.86,-0.1l-3.95,2.19l-8.1,2.26l-3.62,-0.31l-2.71,0.84l-0.75,1.13l0.41,0.77l-0.09,3.71l-0.85,1.69l-0.16,2.01l-2.96,2.16l-5.55,1.53l-5.36,-0.39l-0.92,-1.84l-1.95,-0.67l-0.55,0.45l-1.02,2.49l-2.98,2.73l-0.83,0.26l-2.57,-0.74l-1.51,2.39l-0.86,0.35l-1.85,-0.9l-1.44,-0.11l-6.19,4.08l-5.82,1.82l-2.63,3.93l-2.21,0.66l-0.63,0.63l0.4,4.13l-0.22,2.97l-1.23,1.98l-1.7,0.09l-1.1,-0.56l-2.13,-3.25l-0.78,-0.03l-5.4,2.45l-0.11,2.78l-0.83,2.75l0.3,0.62l2.18,1.5l0.36,4.72l1.66,3.19l0.03,2.06l-7.52,2.19l-1.38,-0.28l-1.2,-1.51l-2.03,-1.4l-0.99,0.12l-2.58,1.74l-0.89,0.0l-0.27,-0.05l0.58,-1.57l-0.33,-0.73l-2.4,-1.44l-1.43,-0.38l-5.85,1.39l-4.67,3.44l-1.97,0.73l-1.09,-2.62l-2.26,-1.43l-1.56,-2.18l-1.13,-0.24l-0.87,0.76l-0.08,1.41l3.4,5.79l-2.45,1.28l-2.03,0.01l-0.11,-0.84l-3.36,-5.86l-0.12,-1.66l1.36,-5.66l0.08,-2.63l-0.46,-0.77l-0.77,-0.25l-1.24,-2.7l-0.28,-1.28l0.21,-1.03l1.01,-1.01l-0.26,-0.68l-5.92,-1.06l-1.96,-1.01l-4.72,1.26l-2.05,-2.81l0.62,-1.05l-0.32,-0.6l-1.61,-0.3l0.6,-1.86l-1.47,-1.84l1.62,-2.54l5.19,-3.81l1.96,-3.47l-0.19,-1.2l-0.38,-0.31l-6.69,-0.16l-1.82,-0.96l-0.92,-1.79l1.0,-0.62l0.12,-0.56l-5.98,-9.16l-1.93,-1.96l-2.03,-0.26l-3.8,1.05l-0.97,-0.11l-0.28,-0.94l0.3,-3.12l-1.77,-1.24l0.36,-3.0l-1.64,-1.67l-0.94,-2.47l1.23,0.13l1.52,-1.51l0.53,-2.01l-0.3,-2.63l0.75,-1.36l1.16,-0.66l2.42,0.04l1.16,-1.43l0.65,-2.97l-0.81,-3.22l0.86,-2.38l-0.25,-0.49l-3.15,-1.1l-2.87,-2.11l-0.36,-3.25l0.96,-2.74l-0.64,-1.12l-3.42,0.42l-4.1,-1.02l-4.71,1.81l-0.11,-3.56l-1.5,-4.46l-0.52,-3.35Z", "name": "Nordrhein-Westfalen"}, "DE-SN": {"path": "M649.01,765.4l-0.3,0.43l-1.35,0.24l-5.18,3.77l-3.09,5.6l-3.02,3.16l-0.31,2.5l-1.87,2.4l-0.6,1.63l-0.31,2.84l0.86,4.64l-1.08,0.78l-1.34,-0.17l-0.86,-1.34l-1.85,-6.9l-2.46,-2.85l1.27,-1.56l-0.3,-1.65l-1.03,-0.57l-4.05,-0.47l-0.96,-0.85l-0.3,-3.6l-0.61,-1.58l-2.03,-1.52l-4.7,-0.4l-0.85,-1.27l-2.79,-0.81l-2.12,0.03l-5.2,-3.25l-0.69,-5.41l-2.12,-1.47l-2.07,-3.22l-1.06,-0.4l-2.34,0.24l-0.59,-0.96l1.12,-1.39l2.37,-1.07l0.38,-1.82l1.03,-1.45l-0.25,-2.33l-1.85,-1.93l0.75,-2.47l0.99,-1.4l2.32,-1.79l2.03,-2.84l1.66,-0.02l2.01,2.1l1.91,0.25l1.3,-1.11l2.11,-3.51l1.27,-0.26l2.19,0.96l2.84,-0.95l0.91,-1.07l0.69,-2.41l-0.13,-3.07l2.59,-3.29l6.43,0.03l3.71,-2.69l1.23,-1.38l1.99,-3.48l-0.18,-0.56l-4.09,-0.79l-1.2,-3.02l0.31,-2.79l-1.33,-1.02l-1.43,0.18l0.78,-2.59l0.79,-0.69l1.43,-0.36l1.74,-2.44l-0.4,-1.08l-1.72,-0.8l-1.03,-1.16l0.09,-1.14l6.97,-2.11l3.87,-3.03l3.31,-0.4l1.13,0.78l0.78,-0.11l3.92,-5.09l3.73,-2.05l0.74,-1.55l1.53,0.58l2.22,-0.25l3.24,0.43l1.4,-0.33l1.41,1.17l2.19,-2.66l1.75,-1.17l-0.01,-1.37l-2.07,-4.47l-2.37,-3.75l-5.64,-3.04l-1.21,-1.22l-3.97,-7.51l-1.03,-4.92l-15.19,-4.61l-6.42,0.62l-3.95,-0.78l-0.56,-0.7l-0.42,-2.69l-2.18,-2.1l-0.84,-1.68l0.44,-4.14l-0.3,-0.43l-2.74,-0.81l-0.03,-0.8l1.42,-2.71l-0.27,-5.11l-0.44,-1.79l-1.81,-2.46l-0.13,-3.11l-0.78,-2.82l0.41,-1.59l1.4,-2.2l2.23,-0.48l0.73,-0.71l0.52,-3.15l-1.6,-5.06l-0.25,-6.12l-0.88,-1.86l-0.23,-3.1l3.37,-3.7l0.47,-1.96l0.0,-7.18l2.8,-2.41l0.81,-2.61l2.91,1.31l3.21,0.36l5.79,-2.61l7.21,-0.74l0.74,-0.48l0.85,-4.22l0.62,-0.26l7.6,0.32l1.46,0.92l9.35,-1.64l0.82,0.81l1.32,-0.04l2.25,-1.9l1.73,-3.17l1.24,-0.71l3.43,0.48l3.16,1.24l1.97,-0.95l5.13,-4.29l0.85,-1.28l2.37,-0.23l0.96,2.06l1.38,1.03l4.83,1.87l1.67,1.7l1.25,-0.23l1.7,-1.16l0.45,0.18l2.71,2.63l2.92,0.94l2.68,3.31l1.44,1.01l1.12,0.35l1.2,-0.53l2.87,2.31l-0.35,4.04l1.08,1.5l1.96,1.19l1.31,4.82l-0.23,1.31l-1.81,1.66l1.02,3.05l-0.17,3.92l-0.65,1.9l-1.73,2.24l0.24,1.76l0.97,1.78l0.88,0.08l1.39,-1.74l0.85,0.13l0.77,-0.94l1.42,0.51l1.68,2.21l10.91,-3.64l2.47,-1.82l1.97,-0.22l4.48,2.21l2.18,2.16l2.41,1.63l1.59,2.39l1.37,0.65l2.23,-0.36l5.8,1.72l14.92,1.15l16.88,-2.09l2.32,0.66l1.02,-0.36l7.38,-10.97l1.55,-3.64l0.21,-2.52l0.52,-1.07l3.79,-4.99l1.16,-1.06l3.86,-2.14l5.98,-1.45l4.59,0.6l3.43,1.27l3.6,2.26l3.88,-0.91l12.92,-6.51l4.17,-1.18l3.99,0.3l6.66,3.21l4.06,0.21l0.35,1.5l2.33,2.38l6.35,2.15l4.3,2.76l6.82,2.44l3.21,2.99l0.91,1.96l-0.79,2.0l1.4,13.84l2.12,4.39l2.23,2.64l1.37,2.92l-0.49,4.44l0.67,1.03l-1.6,3.12l-1.34,4.23l-0.8,4.39l-0.3,5.9l-1.95,2.94l-0.48,6.27l-9.28,22.85l-3.45,3.84l-1.43,2.35l-0.07,3.03l-1.53,4.08l-1.73,2.71l-3.45,0.31l-3.51,-0.8l-5.13,-3.62l-3.31,-0.95l-0.37,-0.88l0.32,-2.62l2.23,-5.98l-0.53,-1.98l-1.72,-0.28l-5.21,2.17l-0.72,-0.57l2.41,-5.84l-0.12,-3.98l-2.02,-2.84l-1.27,-1.01l-2.72,-0.72l-1.1,-0.77l-0.84,-1.17l-1.12,-3.17l-0.74,0.01l-0.8,2.02l-0.88,0.46l-3.46,-0.2l-2.84,1.22l-1.81,-0.53l-2.04,-2.46l-3.65,-1.2l-3.31,0.49l-2.68,2.68l-1.36,4.43l-1.06,1.54l0.11,0.56l1.31,0.82l3.27,0.43l1.42,0.58l-0.74,0.7l-0.09,1.63l2.61,2.79l3.76,1.16l2.33,1.36l-0.53,3.45l-2.63,2.26l-7.54,-0.59l-3.64,0.74l-4.2,4.95l-15.18,6.98l-5.32,-0.34l-2.21,0.49l-3.48,3.37l-3.18,0.06l-0.97,1.26l-0.41,1.5l0.3,3.2l-0.54,0.77l-1.12,0.21l-2.79,1.74l-1.63,0.33l-4.53,-0.5l-2.22,0.24l-5.53,1.73l-8.77,-0.05l-4.66,0.9l-4.02,2.43l-0.15,0.51l1.08,2.26l-0.34,1.87l-2.81,2.79l0.34,2.34l-4.74,4.72l-1.59,0.4l-1.98,-0.97l-2.51,-3.68l-1.72,-0.5l-0.96,1.41l-3.77,2.73l-1.56,4.03l-1.75,0.89l-3.17,-1.8l-2.33,0.08l-3.24,8.73l-1.35,2.46l-2.23,1.67l-5.03,-0.29l-4.64,1.29l-3.43,-1.08l-1.77,0.82l-1.41,9.24l-4.11,4.32l-3.09,-0.17l-9.9,-5.78l-1.24,0.23l-1.8,1.08l-3.3,-0.14l-1.72,0.6l-1.39,1.34l-3.17,4.34l-1.08,0.13l-5.28,-0.96l-7.35,0.55l-4.04,1.19l-3.7,3.2l-0.83,2.25l0.19,1.53Z", "name": "Sachsen"}, "DE-HB": {"path": "M265.62,310.84l0.8,0.18l2.21,-0.58l2.68,1.7l7.17,2.71l2.14,-0.54l3.22,0.01l0.46,1.58l2.72,1.87l4.48,0.39l3.54,3.03l4.41,1.97l1.4,-0.61l1.22,-3.12l0.71,-0.29l3.36,3.83l-1.42,1.53l-0.27,0.98l0.45,1.13l2.36,2.53l0.29,0.79l-1.03,1.9l-0.6,4.65l-1.38,1.52l-3.93,2.76l-4.56,-3.57l-0.63,0.2l-0.16,1.47l-1.64,0.57l-1.7,-0.26l-5.2,-3.2l-5.28,1.06l-1.19,-0.22l-0.2,-5.36l-4.74,-5.33l-1.51,-2.32l-0.64,-4.79l-1.4,-2.83l-1.0,-0.75l-3.06,0.06l-2.31,-1.59l-3.92,-1.6l-1.38,-3.36l2.55,-0.04l2.99,1.94ZM265.89,246.05l2.3,0.41l4.15,-0.11l-1.05,2.45l2.13,7.99l-0.12,3.08l-1.59,2.74l-1.99,1.87l-0.96,-1.63l-1.38,-0.18l-1.48,-2.56l0.82,-4.82l-4.85,-10.73l4.02,1.48Z", "name": "Bremen"}, "DE-SL": {"path": "M65.91,909.17l-0.21,-2.27l-0.64,-1.35l-1.75,-1.75l-9.12,-4.58l-1.4,-0.2l-2.68,1.59l-1.32,0.13l-0.3,-5.31l0.58,-4.47l13.56,-1.25l11.46,0.51l6.25,-2.86l2.28,0.21l1.99,-0.4l14.47,-6.69l7.94,-5.02l2.9,1.39l0.9,-0.21l1.77,-1.34l7.03,3.84l6.38,0.37l2.1,2.07l4.93,3.5l3.13,-0.28l2.91,-1.77l0.07,2.19l1.71,4.13l0.25,4.07l0.25,0.54l1.04,0.37l0.18,2.17l-2.75,2.03l-1.93,2.49l-0.92,0.59l-0.52,1.05l0.61,2.29l4.07,4.98l-0.06,1.61l1.1,0.66l4.87,0.83l2.31,0.87l0.81,0.47l0.41,1.05l-0.66,1.86l0.39,1.64l-0.76,1.28l-2.06,1.89l-0.56,2.68l-1.52,1.79l-0.72,3.26l-1.16,1.67l-2.17,0.39l-0.94,2.31l0.89,4.92l5.38,5.51l1.34,0.07l-1.28,0.79l-1.6,3.66l-3.65,0.96l-2.06,3.29l-3.11,-1.31l-8.4,-0.08l-2.94,-1.27l-3.73,-2.72l-0.73,-0.14l-1.33,1.32l0.28,2.08l-2.64,1.67l-1.83,-1.45l-1.08,-3.94l0.05,-5.24l-0.38,-0.4l-2.03,-0.1l-6.04,-3.43l-1.22,-0.22l-2.9,0.28l-4.03,-0.92l-1.17,0.24l-0.85,2.58l1.07,4.71l-1.5,2.0l-0.98,0.23l-3.85,-1.4l-4.29,-0.04l-0.96,-0.41l-1.12,-1.87l0.74,-3.56l-0.61,-2.58l-0.8,-0.29l-1.52,0.89l-1.59,-5.31l-2.22,-1.29l-0.16,-2.82l-8.1,-8.24l-0.55,-1.53l0.39,-1.0l1.84,-0.33l0.42,-1.49l-0.42,-1.04l-5.23,-5.77Z", "name": "Saarland"}, "DE-BY": {"path": "M307.22,810.29l0.93,-1.11l0.93,-0.0l0.77,-0.57l0.39,-4.33l0.83,-1.29l3.71,-0.97l5.1,-2.38l3.9,2.06l-0.87,1.83l0.88,0.4l2.16,-1.42l1.77,-2.09l0.49,-2.5l3.28,-1.03l9.66,0.69l4.6,2.37l1.46,2.89l1.6,1.93l2.33,0.38l1.64,-0.24l6.19,-2.67l1.1,-1.6l-0.49,-3.9l1.7,-3.83l-0.62,-1.03l-2.08,-0.36l-0.3,-0.45l0.99,-4.18l-0.16,-4.14l1.86,0.47l1.06,-0.54l1.44,1.58l2.46,-0.45l1.71,0.78l1.53,-0.05l4.99,-1.68l0.44,-0.73l-0.68,-1.56l0.04,-0.97l1.4,-3.0l0.6,-0.61l4.05,-1.67l1.68,-1.14l1.07,-1.32l-0.5,-6.57l2.3,-8.32l1.09,-1.7l1.84,-0.72l2.59,2.84l1.17,0.44l2.05,-0.14l5.98,-2.33l6.14,-3.63l2.02,-1.76l1.24,-2.01l3.14,-5.61l1.02,-2.96l5.28,-5.92l1.14,-0.81l0.06,1.49l0.82,0.76l5.42,-0.37l1.14,0.34l1.64,1.79l1.26,3.46l9.38,3.61l0.79,1.53l0.03,2.15l0.42,0.9l3.15,3.46l2.58,2.09l-0.78,1.97l1.0,2.0l2.54,0.51l2.34,-0.63l1.45,2.7l2.62,2.24l0.23,1.41l0.55,0.57l2.85,0.25l1.07,-0.8l1.21,-0.17l1.24,2.72l2.45,2.06l0.84,4.96l-0.62,3.33l1.31,3.27l-0.33,1.79l0.61,1.37l1.09,1.11l4.38,-0.02l2.29,0.64l3.39,2.0l0.66,-0.12l0.41,-0.6l0.49,-4.86l0.53,-0.61l1.76,0.7l3.89,-0.76l3.03,1.12l1.21,-0.2l0.8,-0.98l0.11,-2.29l-0.71,-1.74l-2.78,-1.07l-1.4,-2.24l-2.95,-0.2l-1.82,-1.92l-3.28,-2.34l0.64,-5.11l0.52,-0.38l1.91,0.66l0.95,-0.19l2.95,-4.32l2.07,0.58l2.61,-1.38l2.28,0.25l1.43,-0.71l1.96,1.84l3.27,-0.87l1.2,0.05l3.27,4.78l1.11,0.95l0.8,-0.36l0.4,-1.67l2.5,0.36l1.6,1.75l0.97,0.33l3.7,-1.06l1.28,-1.36l1.1,-0.25l0.79,1.73l1.46,0.39l1.77,3.1l-1.98,2.7l0.8,1.8l4.81,4.56l0.63,-0.1l1.06,-1.78l1.25,1.01l2.31,0.72l1.39,-0.29l0.39,-0.89l-0.17,-1.51l1.04,-2.58l-0.67,-2.41l1.11,-3.08l-0.18,-1.68l0.91,-0.39l0.23,-0.64l-0.33,-2.47l-1.15,-1.96l-0.61,-2.54l0.35,-3.75l-1.29,-6.67l4.37,-1.63l2.01,-1.32l0.93,-2.38l1.23,-0.61l0.79,-0.97l6.0,0.33l1.43,0.46l1.01,2.12l-1.77,1.76l-0.24,5.16l0.32,1.54l3.43,2.62l2.21,0.0l0.9,4.62l3.93,2.85l0.9,0.14l2.4,-0.62l1.34,-1.87l1.9,0.03l3.09,1.18l11.65,-2.47l1.71,-0.52l0.59,-0.89l2.04,-0.35l0.92,0.08l0.71,0.99l1.8,0.86l-0.01,1.31l0.84,0.34l4.48,-1.83l3.19,-1.89l2.41,-0.25l0.64,0.27l2.0,3.16l1.97,1.3l0.39,4.98l0.44,0.58l5.42,3.38l2.28,0.02l2.56,0.75l0.27,0.47l-2.13,0.1l3.04,4.05l0.18,3.84l-1.61,1.33l-1.26,2.27l1.17,1.97l4.81,3.01l3.4,4.24l0.71,1.73l0.27,2.19l-0.67,3.42l0.07,2.51l0.98,2.48l4.32,3.38l0.8,1.38l0.54,3.92l15.15,8.22l1.4,1.39l3.72,0.48l1.45,1.39l0.23,1.99l-0.67,2.07l0.08,2.03l5.35,2.89l0.48,0.86l-0.3,2.79l-0.76,2.26l-2.26,4.16l-0.63,2.04l-1.59,-0.49l-0.5,0.28l-0.61,2.25l-0.34,5.5l-1.42,1.43l-3.99,1.7l-1.38,2.76l1.53,3.62l2.11,3.04l2.96,2.34l4.54,2.24l0.71,1.43l0.07,1.83l-0.8,1.77l0.89,0.95l-0.33,1.62l1.0,1.21l2.39,1.36l0.94,1.04l0.64,1.54l0.88,5.15l2.06,4.39l1.28,1.27l2.6,0.59l0.41,7.39l0.49,2.45l1.15,2.29l2.1,1.78l4.46,2.1l1.88,1.95l3.19,7.16l1.78,1.83l2.02,0.72l5.89,0.85l1.85,-0.25l0.34,-0.48l-0.35,-1.58l0.88,-0.28l3.6,0.99l1.58,0.86l4.11,4.03l1.69,0.74l1.12,4.03l3.16,3.77l1.25,0.73l9.11,12.41l2.86,5.48l2.92,1.76l6.05,0.33l1.85,0.71l1.12,0.96l2.98,4.01l4.12,4.21l1.04,2.46l0.06,4.13l1.47,2.5l6.03,4.99l2.35,1.14l0.55,-0.22l1.86,-4.08l1.12,-0.52l2.05,0.44l5.02,3.3l1.62,-0.11l0.23,2.53l1.04,2.71l1.57,2.41l1.73,1.74l1.97,0.96l3.7,0.6l1.23,0.69l2.2,3.46l4.74,9.46l1.8,1.89l-2.82,5.95l-0.26,1.52l0.71,0.38l0.97,1.86l1.3,0.86l-1.02,1.09l-0.25,1.77l0.51,4.88l-0.37,4.53l-2.67,6.14l-1.39,1.02l-2.62,0.46l-0.86,1.78l-0.74,3.35l-3.7,-1.68l-1.54,-2.32l-3.44,-2.18l-10.33,-2.86l-3.38,0.46l-3.34,1.29l-1.55,2.19l0.76,3.89l0.93,1.51l0.19,1.15l-2.06,5.56l-0.19,7.05l-0.88,1.78l-0.75,3.87l-1.3,2.18l-9.52,8.34l-3.21,1.8l-13.44,2.35l-10.26,4.08l-5.33,4.69l-3.18,1.79l-1.62,1.58l-5.03,0.98l-1.61,0.84l-4.04,5.35l-3.86,2.72l-1.84,2.7l-1.73,0.39l-0.82,1.24l-0.25,2.14l0.51,2.07l1.83,3.33l6.91,7.26l1.42,3.17l0.83,3.34l0.85,1.26l2.44,1.51l4.33,4.02l3.29,7.67l2.45,3.54l-6.18,9.97l-0.57,1.23l-0.39,2.77l-2.43,3.82l0.05,0.5l1.8,1.74l5.48,1.03l4.08,-1.34l1.31,0.21l2.26,2.24l2.63,5.27l0.27,1.8l-0.27,3.34l-1.46,3.59l-1.86,2.16l0.17,3.36l-1.17,2.8l0.08,3.47l0.82,3.45l-2.69,3.19l-1.34,0.53l-2.22,-1.46l-2.64,0.73l-0.89,-0.36l-4.73,-3.59l-5.34,-5.64l-2.52,-0.64l-2.21,-1.8l-0.48,-3.33l1.1,-3.13l2.54,-1.26l0.1,-0.65l-4.5,-3.59l-1.36,-1.67l0.93,-2.32l-0.42,-0.55l-1.6,0.2l-5.54,-1.42l-3.59,0.01l-3.49,0.85l-1.96,0.97l-4.4,3.93l-1.43,0.64l-3.87,0.34l-1.27,-0.63l-3.59,-3.18l-2.27,-5.32l-1.83,-0.3l-5.37,1.71l-5.74,-1.19l-2.14,0.31l-3.08,1.28l-0.75,-0.67l-0.46,-1.38l0.92,-1.78l0.88,-3.32l-0.45,-0.56l-2.66,1.27l-4.1,2.99l0.59,2.19l2.01,2.1l0.37,4.44l-0.41,2.1l-2.67,3.44l-23.18,-0.86l-8.37,1.73l-1.11,0.66l-1.07,2.49l-0.75,0.25l-5.42,-1.11l-8.02,-0.05l-6.13,-0.91l-3.45,3.03l-1.92,6.21l-1.67,1.86l-2.0,0.8l-4.48,0.74l-4.61,-1.02l-2.38,0.54l-4.83,5.46l0.2,0.65l2.04,0.91l0.27,0.78l-0.69,1.17l-1.4,0.6l-4.18,0.1l-1.94,0.6l-4.71,5.08l-1.97,0.91l-1.86,-0.21l0.19,-3.57l-2.59,-1.26l-2.61,0.73l-6.36,4.42l-1.8,0.54l-10.08,-0.14l-1.17,-0.69l-0.76,-1.49l0.63,-1.89l-0.44,-1.89l-4.89,-5.31l-5.07,-2.38l-0.42,-0.72l2.87,-1.95l0.9,-1.08l-0.07,-0.57l-3.34,-2.32l-1.67,-0.13l-5.34,2.21l-2.76,0.33l-0.63,-0.19l-1.31,-1.93l-12.95,-4.91l-2.51,-0.05l-1.69,1.11l-1.96,2.74l-1.12,0.91l-5.04,-0.45l-2.59,-1.72l-0.14,-1.04l0.96,-2.14l-0.59,-1.77l-0.73,-0.33l-2.4,0.6l-1.72,1.0l0.19,1.39l1.44,3.1l-1.1,7.01l2.27,1.97l0.48,1.19l0.42,4.74l-0.87,3.16l-1.4,2.87l-1.56,2.1l-3.99,2.04l-2.78,5.32l-3.58,4.02l-4.33,2.66l-2.07,0.81l-7.61,0.93l1.08,-2.1l1.5,-0.56l0.74,-0.76l-0.0,-2.86l1.74,-5.25l0.09,-2.72l-2.28,-1.39l-4.31,0.79l-1.64,1.61l-1.83,-0.68l-2.6,1.2l-0.76,-0.75l-0.83,-4.3l-0.89,-1.13l2.04,-1.69l0.43,-1.82l-0.85,-1.69l-4.87,-7.14l-0.5,-0.14l-2.64,1.57l-0.75,-0.45l-0.18,-1.65l-0.89,-1.95l-2.23,-2.58l-0.26,-2.29l-0.65,-0.27l-1.13,0.89l-1.32,0.26l-2.81,-0.22l-3.14,-1.08l-2.31,0.95l-1.74,-0.9l-0.56,-5.03l-1.3,-1.36l-1.56,-0.52l-1.63,0.2l-1.53,0.85l-2.13,2.5l-2.62,4.82l-2.48,1.19l-6.16,0.11l-5.06,-1.39l5.43,-7.55l3.94,-1.04l1.04,-1.55l1.34,-0.65l3.54,0.93l4.5,-2.32l7.24,-6.48l2.78,-1.33l3.85,1.66l2.37,0.58l2.46,-0.02l3.51,-1.16l2.12,-1.18l2.35,-0.65l1.66,0.04l0.49,0.39l1.53,3.79l0.66,0.05l1.04,-1.44l0.33,-2.77l2.75,0.84l0.97,-0.74l0.44,-2.16l-0.84,-2.98l-0.56,-7.62l-0.49,-0.88l-1.25,-0.2l-1.94,-2.76l0.75,-1.34l2.32,-0.37l1.82,-2.33l-2.54,-6.4l-0.45,-0.48l-1.23,-0.18l1.01,-1.19l0.94,-3.39l0.4,-5.37l-0.19,-0.85l-1.31,-1.45l-0.95,-2.44l0.17,-0.77l1.31,-1.06l2.91,-8.16l0.74,-3.29l0.16,-5.6l-0.33,-1.99l-2.62,-5.95l-3.86,-17.77l-1.56,-5.32l-3.15,-5.36l-1.91,-4.2l-1.42,-0.37l-0.65,-1.22l5.96,-7.86l-0.13,-2.22l2.1,-2.89l3.32,-0.7l2.86,-1.71l0.6,0.71l0.41,1.92l1.58,0.58l9.54,-5.82l0.52,-2.07l1.17,-1.33l5.1,-0.69l-0.63,-1.34l1.1,-3.19l0.18,-1.82l-1.3,-4.65l1.69,-1.08l0.51,-1.4l-0.6,-1.03l-4.03,-2.99l-1.65,-3.18l0.14,-1.7l2.05,-2.85l2.25,1.94l2.93,0.15l1.55,3.14l0.85,0.51l5.8,-6.01l0.74,0.49l-0.58,0.47l-0.6,3.15l0.87,1.44l1.75,-0.85l4.25,-3.96l-2.32,-5.64l-2.99,-1.26l-0.79,-1.81l0.06,-1.34l0.73,-1.43l-0.03,-3.7l1.4,-1.96l0.54,-2.62l-1.08,-2.87l0.47,-1.61l0.26,-5.81l-0.97,-1.03l1.98,-1.02l0.16,-1.28l-0.91,-2.88l-1.27,-1.39l-0.71,-1.79l-2.41,-3.42l-4.06,-3.34l-1.6,-3.93l-8.0,-2.67l0.39,-2.26l-1.89,-2.01l0.2,-1.83l-3.05,-1.64l1.88,-0.36l1.02,-1.86l0.59,-3.02l-0.33,-1.69l-2.28,-2.05l-2.18,0.84l-3.67,-4.55l-3.12,-2.49l1.02,-0.42l0.3,-0.9l-1.56,-2.51l-0.15,-3.26l-1.4,-1.55l-0.25,-0.85l0.07,-0.29l2.17,0.96l0.89,-0.7l0.09,-1.26l-1.25,-3.43l0.71,-2.7l-0.48,-0.84l-1.84,-0.86l-0.87,-1.2l0.03,-4.9l1.58,-1.91l0.81,-0.12l1.86,0.65l0.63,-0.71l-3.11,-7.81l-2.67,-1.31l1.12,-1.8l0.77,-2.54l-1.1,-3.06l0.79,-1.94l-0.13,-1.15l-0.63,-0.59l-1.45,-0.21l-0.84,-0.56l0.38,-2.61l-2.25,-1.19l-2.36,1.88l-0.47,0.83l0.82,1.5l0.01,1.21l-3.6,3.81l-0.69,0.37l-7.69,-0.02l-0.62,-10.2l-1.67,-1.85l0.61,-1.41l-0.68,-1.3l-1.27,-0.14l-1.73,2.12l-1.45,0.67l-0.95,2.44l-1.04,0.28l-0.7,-0.57l1.99,-2.69l0.03,-2.69l1.78,-2.46l0.42,-1.66l-0.81,-1.61l-3.8,-4.27l-0.25,-5.92l-3.86,-5.09l-0.7,-0.15l-2.79,1.49l-3.36,3.65l-1.09,-2.24l-0.26,-2.3l-1.08,-0.49l-0.95,1.45l-1.42,0.89l-0.45,2.43l-1.98,0.17l-1.88,-1.27l0.86,-2.27l-0.08,-1.31l0.83,-0.89l-0.2,-1.69l0.56,-1.58l-0.32,-2.34l0.7,-1.72l-0.82,-1.33l-4.66,1.84l-2.57,-1.66l-3.01,0.49l-5.38,-2.52l-5.39,0.48l-3.55,1.29l-4.85,-0.31l-2.4,1.17l-1.69,2.05l0.7,2.62l-0.69,1.61l0.06,1.13l0.8,0.91l4.55,1.02l0.29,0.58l-0.41,2.15l0.47,0.79l0.95,0.1l0.9,-0.5l1.16,-2.6l2.24,0.95l-0.99,6.97l0.68,1.74l-1.53,1.43l-2.48,-1.59l-2.99,1.26l-3.2,0.27l-2.21,1.12l-0.9,1.2l0.3,2.46l-1.33,1.41l-0.69,2.16l-0.77,1.01l-7.77,-0.05l-5.5,1.21l-0.79,-0.5l-1.37,-2.35l-1.97,-1.9l-0.3,-0.78l3.16,-3.22l0.6,-1.12l-1.15,-6.97l2.1,-0.43l1.41,-1.58l-0.22,-2.84l1.59,-4.06l-0.47,-0.8l-2.19,-1.08l-0.22,-0.86l1.54,-2.3l0.53,-1.76l-1.03,-1.5l-2.09,0.23l-1.02,-0.79l-0.77,-2.11l-0.02,-4.45l-1.07,-0.11l-1.16,1.84l-0.62,-1.15l-3.47,-10.75l0.19,-10.68l1.53,0.6l0.92,-0.7l-1.22,-2.81l0.12,-1.66l-0.96,-1.64l-0.52,-3.31l-0.61,-0.93l-1.34,-0.31l-1.47,0.64l-1.35,-0.87Z", "name": "Bayern"}, "DE-MV": {"path": "M495.86,194.66l-0.15,1.45l1.0,0.85l3.25,-0.51l1.79,-1.24l-0.25,-0.83l-4.7,-1.85l-0.55,-0.95l0.03,-4.18l0.07,-0.3l1.57,-0.13l4.13,-3.99l3.43,-1.01l5.17,-2.79l11.75,-1.56l1.23,1.04l1.36,3.55l3.57,1.1l0.38,0.6l-0.43,3.67l0.42,2.12l1.41,0.79l3.86,-0.01l3.9,-3.31l2.08,3.22l3.98,0.1l3.86,5.14l1.06,0.65l1.11,0.0l0.4,-0.37l0.13,-1.7l1.75,-6.01l-0.41,-2.69l0.62,-1.03l1.86,-1.32l-0.56,-3.19l3.2,-3.27l-0.15,-1.79l2.55,0.66l2.35,-1.73l1.71,-4.33l2.09,-1.21l1.2,-1.89l0.52,-2.22l-0.72,-0.81l0.27,-1.34l3.14,-5.35l2.97,-2.07l3.68,-0.53l8.29,1.45l23.39,-5.06l3.27,-2.08l0.42,4.13l-0.37,4.62l0.22,4.0l2.37,2.94l0.52,0.08l-1.73,-8.3l0.9,-1.71l2.9,-1.76l0.84,-2.26l-0.33,-0.54l-1.22,-0.11l-1.95,0.56l0.13,-0.27l3.29,-4.33l2.04,-1.87l2.28,-3.85l9.96,-5.26l3.78,-3.18l1.5,-1.78l3.58,-6.94l5.89,-8.55l4.71,-8.71l1.57,-4.44l1.02,-1.34l0.96,-0.49l-0.23,0.41l2.09,3.39l4.41,1.9l22.41,0.03l3.6,1.75l2.49,-1.23l2.51,0.63l0.98,1.48l-2.1,1.96l-2.34,0.51l-10.39,-0.9l-4.15,-1.57l-2.87,-0.35l-0.94,0.48l-1.41,1.79l-4.33,-0.48l-1.22,0.58l-0.52,1.46l-0.71,-0.46l-2.19,1.65l0.24,1.6l1.01,1.11l-1.49,-0.74l-2.11,0.2l-1.95,1.26l-0.76,1.51l-1.33,-1.62l-2.09,-1.03l-3.56,-0.33l-1.8,0.8l-1.55,2.22l-0.62,2.58l0.42,2.23l-1.91,-0.94l-0.61,0.1l-0.7,1.48l0.61,1.91l-0.43,1.8l-1.09,1.28l-1.48,0.35l-0.29,0.5l1.68,5.33l-1.0,1.19l0.08,0.58l4.29,2.99l2.51,0.68l2.41,-1.37l0.17,-0.46l-2.84,-0.72l-1.77,-1.57l0.54,-1.69l3.27,-3.72l2.2,-1.22l0.58,-3.56l1.53,-1.3l6.33,-3.07l0.06,-0.68l-1.79,-1.14l0.0,-0.56l1.48,-0.55l1.16,0.59l0.65,-0.57l1.53,1.13l3.03,-0.8l5.35,-3.07l-0.4,-2.61l2.92,-1.13l0.84,0.09l0.0,0.59l-1.4,0.45l-1.06,1.47l-0.59,1.99l-0.24,2.11l0.27,0.42l0.47,-0.18l1.81,-3.71l1.42,2.22l1.26,0.65l1.31,-1.09l0.84,0.75l1.33,0.06l1.61,-1.45l1.2,2.81l2.14,2.57l3.59,-0.21l1.16,-0.37l1.16,-1.07l2.72,-5.72l2.43,-2.43l3.83,-2.49l3.73,-1.39l1.7,0.5l-0.88,1.02l-0.05,2.0l0.78,2.29l1.21,1.74l4.34,2.3l0.91,0.89l-1.76,3.3l0.45,2.74l2.76,4.47l0.75,5.29l1.28,0.61l3.99,0.0l0.0,0.46l-1.39,0.37l-1.27,1.2l0.41,0.27l3.08,-0.29l5.02,2.86l3.47,0.84l2.35,1.3l3.19,6.56l2.37,2.15l-2.33,2.05l0.29,0.68l2.64,-0.07l3.49,-1.79l1.39,0.54l-0.61,1.56l-1.15,1.36l0.06,0.64l1.56,0.71l1.27,-0.85l0.53,0.15l3.1,6.99l1.59,2.15l2.02,1.27l2.31,0.03l0.41,-0.4l0.0,-1.14l-2.74,-3.61l0.0,-0.64l11.89,-2.36l2.96,-1.38l4.97,-3.4l2.42,-0.81l0.12,0.89l-1.66,1.02l0.22,1.39l2.95,1.53l7.62,6.41l0.0,0.85l-1.4,2.47l-1.96,5.99l-2.54,1.58l-0.03,0.66l1.15,0.88l3.92,5.41l3.93,2.03l0.97,2.98l0.1,2.22l0.65,0.36l1.31,-0.12l3.52,1.77l0.14,1.29l-0.56,1.74l-1.04,1.47l-7.1,5.92l-1.02,2.47l1.07,2.24l3.66,1.33l0.66,0.49l0.63,1.79l1.44,2.1l1.65,1.49l1.21,-0.09l7.09,5.94l3.27,0.79l1.92,2.3l3.2,0.08l3.78,2.0l7.9,0.59l2.92,-0.86l1.87,-2.76l1.29,0.25l1.24,1.2l0.25,2.4l-0.67,1.06l-4.52,3.24l0.03,0.67l2.74,1.25l2.03,0.2l-0.25,6.92l1.46,3.22l2.05,6.37l-0.01,11.27l0.72,3.48l2.4,3.79l1.05,3.48l2.01,3.41l1.03,8.48l2.01,9.39l-6.39,3.97l-2.8,3.6l-2.51,1.24l-0.78,2.42l-1.14,0.85l-6.28,-0.61l-7.5,-1.52l0.08,-2.63l8.09,-5.49l3.63,-5.75l1.58,-3.74l0.46,-3.15l-0.15,-4.35l-2.6,-0.89l-4.13,0.24l-3.68,-1.78l-2.69,0.67l-1.83,2.6l-4.34,-1.32l-5.9,-0.43l-6.64,0.5l-1.36,-2.05l-0.54,-2.27l-2.79,-5.12l-0.4,-3.86l-4.46,-1.75l-2.37,-3.74l-1.96,-0.44l-0.46,0.37l-0.13,3.28l2.44,4.59l0.37,1.68l-2.51,1.11l-3.35,-0.25l-3.71,0.61l-5.95,5.13l-1.89,3.39l-2.06,1.93l-3.34,0.14l-2.08,1.08l-1.47,1.45l-1.29,4.98l-3.15,7.7l-2.26,2.63l-1.08,0.4l-5.11,4.14l-1.55,0.55l-1.62,-0.42l-4.04,-2.15l-2.18,-0.43l-2.71,0.29l-1.68,0.87l-1.72,2.01l-1.3,3.03l-0.54,3.01l-2.34,0.0l-1.03,-0.47l-2.25,-3.33l-1.51,-0.48l-0.98,0.29l-3.39,2.87l-1.38,3.23l-5.62,4.26l-3.89,4.38l-2.27,0.39l-2.59,-1.31l1.34,-2.08l-0.23,-0.99l-0.71,-0.56l-2.09,0.72l-2.65,0.03l-3.81,0.88l-4.19,-2.07l-6.76,0.74l-0.86,-0.98l-0.41,-4.04l-1.05,-0.62l-2.39,-0.12l-3.97,-1.1l-2.57,-2.64l-1.46,-0.73l-11.01,-2.73l-3.2,0.78l-3.4,0.25l-1.33,-0.29l-1.39,-1.97l-2.86,-1.66l-4.7,-4.22l-4.29,-2.52l-6.71,-1.82l-2.18,-3.79l-1.51,-0.64l-1.37,0.38l-2.88,2.03l-1.64,-1.69l-0.86,-0.34l-2.74,0.54l-3.4,1.45l-1.38,2.56l-2.69,2.04l-0.15,2.24l-0.82,2.28l-1.47,0.29l-3.52,3.16l-1.87,-0.71l-5.54,2.36l-2.26,2.72l-2.68,-0.6l-1.8,0.92l-0.04,0.65l1.85,1.48l0.22,1.64l-4.86,-0.19l-3.81,1.83l-1.15,-2.52l-3.11,-2.57l-1.44,-0.51l-3.49,0.23l-5.42,2.07l-1.98,1.31l-4.34,4.02l-0.71,1.77l0.24,1.46l1.3,1.82l0.94,4.93l-0.61,2.37l-1.79,1.37l-2.35,0.23l-5.24,-2.99l-3.4,-0.05l-1.92,1.1l-0.43,3.68l-3.75,-1.22l-3.16,0.0l-2.38,-0.51l-1.87,0.22l-1.73,-2.85l-1.62,-1.02l-1.49,-1.8l-0.49,-0.04l-2.51,1.94l-2.84,-4.74l-1.22,-0.67l-1.44,0.28l-5.05,4.48l-4.59,-3.46l-10.76,-10.14l-8.97,-5.23l-3.07,-2.49l-3.18,-4.05l-3.43,-1.32l-0.73,-6.94l-2.23,-2.89l-3.69,-1.03l-6.47,0.27l1.99,-3.62l0.96,-7.94l0.43,-0.75l2.54,-1.25l2.22,0.24l0.61,-0.66l0.86,-2.74l5.35,-1.63l6.28,-4.8l0.22,-2.62l0.93,-2.74l-0.41,-3.51l2.39,0.48l5.09,-0.57l0.72,1.15l0.36,1.95l0.99,0.71l1.03,-0.77l1.67,-2.35l-0.59,-0.84l0.57,-1.33l-1.29,-5.55l-0.07,-2.55l1.44,-1.4l0.19,-2.46l-1.0,-2.53l-0.41,-2.67l-2.96,-2.84l-2.84,-0.87l-2.05,0.3l-0.61,-0.35l-5.03,-6.37l-4.58,-1.1l1.28,-7.23l-0.82,-4.56l-1.14,-3.07l1.14,-4.1l4.69,-2.81l4.85,-4.55l2.23,-1.48l1.73,0.55ZM556.71,174.76l-0.08,0.0l0.0,-0.04l0.08,0.04ZM798.2,168.67l2.9,1.83l17.21,18.98l1.5,1.12l-1.51,4.08l-1.55,0.71l-0.19,0.64l1.68,2.05l0.64,2.12l-10.57,1.22l-2.04,-0.29l-1.56,-1.12l-0.53,0.06l-2.25,2.55l-2.76,1.61l-5.53,1.49l-6.1,0.1l-3.26,-0.99l-1.41,-1.94l2.85,-1.86l3.18,-0.72l3.4,-1.97l1.11,-1.27l0.68,-5.07l-3.6,-6.83l0.21,-3.78l4.48,0.28l1.28,0.53l-0.46,0.85l0.18,1.13l-0.77,3.24l-0.13,2.65l0.29,0.4l0.46,-0.19l1.48,-2.64l1.07,-0.58l2.82,0.01l-0.53,0.98l0.12,1.4l3.35,1.03l0.49,-0.52l-0.75,-2.05l1.23,-4.1l-0.17,-4.46l-1.4,-2.94l-0.51,-0.19l-1.87,0.78l-1.76,-4.6l-1.43,-1.9l-1.72,-1.32l-1.94,-0.48l-2.13,0.43l-1.24,1.43l0.8,3.35l-1.64,1.48l-1.47,2.79l-2.8,1.07l0.13,-1.53l1.81,-3.47l-0.52,-2.24l-1.0,-0.51l-4.28,2.03l-2.75,3.2l-1.42,-0.55l0.7,-2.84l2.63,-5.48l0.61,-4.51l-0.98,-2.9l-3.99,-4.2l-1.07,-1.66l0.79,-1.64l1.41,-1.5l1.59,-0.62l1.57,0.66l3.95,9.13l2.67,2.76l6.55,3.86l3.75,1.44ZM716.99,88.76l1.04,-0.51l7.38,-1.09l1.37,0.31l0.64,1.04l2.1,1.2l0.92,3.32l0.64,0.17l0.88,-0.87l0.36,-1.92l-0.75,-2.63l3.02,-3.61l2.62,-1.68l-0.83,2.63l-1.52,2.32l0.31,0.67l0.96,0.06l0.63,0.79l-1.31,3.12l0.35,0.54l1.57,0.07l1.33,-0.53l0.95,-1.19l0.59,-1.88l-0.25,-0.47l2.15,3.51l-0.54,2.74l1.94,2.82l2.78,1.05l5.06,-0.13l0.34,-0.6l-0.63,-1.08l0.85,-2.01l1.17,-1.42l0.0,-1.26l-1.34,-3.71l-0.73,-0.94l0.0,-0.81l2.07,-1.46l0.0,-1.05l-0.43,-0.4l-1.48,0.18l-2.02,2.15l-4.09,-0.02l-1.7,-2.89l-2.38,-0.88l-2.81,-5.27l-0.64,-0.19l-2.11,1.94l-1.58,2.19l-2.23,1.34l-3.3,3.07l-1.54,-0.5l-0.29,-1.69l0.66,-3.0l1.23,-2.75l1.42,-1.36l0.94,-4.2l-0.77,-0.96l-4.39,1.16l-1.56,0.91l0.05,-1.58l0.48,-1.01l2.07,-1.85l13.34,-3.9l2.59,-0.03l2.28,1.24l0.0,0.62l-5.19,3.86l-0.88,2.58l0.3,3.25l0.84,2.4l1.4,2.05l1.79,1.47l4.3,1.41l12.64,-2.43l4.18,0.91l2.8,3.12l0.6,4.09l-2.44,3.9l-4.28,2.87l-2.22,2.15l-1.04,2.81l1.25,5.86l2.17,4.11l2.24,1.23l4.57,1.11l1.92,1.37l2.56,4.72l1.71,2.26l1.9,0.8l-2.08,2.19l-1.03,2.27l-0.61,6.2l-1.2,-0.26l0.78,-0.55l0.4,-1.12l-0.38,-2.03l-0.39,-0.31l-0.96,0.13l-0.95,1.03l-1.36,0.51l-2.3,-0.38l0.0,-0.63l3.4,-1.46l1.6,-1.26l0.94,-2.08l-0.39,-0.56l-5.14,0.35l3.5,-2.15l-0.36,-1.55l-2.63,-0.25l-1.65,0.21l-2.16,2.08l-1.29,-1.35l-1.35,-0.7l-9.78,1.15l-1.97,1.22l-5.26,4.69l-2.19,4.19l-2.31,0.5l-2.37,1.46l-0.18,4.88l1.79,-1.2l0.1,-1.32l4.03,-0.48l0.67,3.57l-0.17,1.49l-1.24,0.6l-2.64,-0.41l-3.03,-1.07l-3.05,-2.02l0.56,-0.7l1.42,-4.96l-0.46,-0.04l-2.16,1.58l-0.64,0.94l0.29,0.8l-2.36,0.11l-1.49,0.99l-2.28,-1.98l-3.16,-1.12l-0.89,-1.22l0.51,-1.95l-0.27,-0.48l-1.72,-0.42l-3.59,1.53l-0.44,-0.86l0.43,-0.82l1.02,-0.39l1.35,0.56l0.55,-0.37l0.0,-1.04l-6.01,-4.84l1.24,-3.3l1.85,-2.85l2.17,-0.99l2.82,1.86l0.57,-0.13l0.41,-0.71l1.13,0.86l1.51,-0.31l3.09,-2.44l-1.76,-0.46l-0.98,-0.96l-0.43,-1.44l0.44,-2.8l-1.54,-0.51l-1.39,-1.72l-1.26,-0.45l-3.51,0.93l1.91,-3.45l2.63,-0.67l2.9,-1.55l1.95,-0.35l0.33,-1.27l1.25,-1.18l-0.17,-0.62l-3.74,-1.75l-0.61,-1.17l0.72,-1.17l-0.07,-1.33l-0.55,-0.34l-2.85,1.13l-1.5,0.16l-1.68,-1.61l-0.34,-2.72l-0.93,-1.31ZM739.94,88.57l-2.32,-1.17l0.0,-0.68l0.82,-0.77l1.5,2.62ZM708.25,95.98l0.04,-0.57l3.07,-11.08l0.65,-4.24l0.59,-0.99l3.55,-0.29l0.46,1.57l-0.55,0.2l0.0,-0.98l-0.65,-0.31l-2.54,2.22l-0.67,6.08l-0.93,3.39l-2.09,2.17l-0.93,2.83ZM558.02,170.24l-0.47,-2.61l0.45,-1.31l5.8,-2.8l-4.53,4.19l-1.25,2.54ZM553.66,176.62l-2.79,8.31l-0.9,1.34l-0.61,0.02l0.61,-3.75l-0.81,-2.26l-1.2,0.24l-0.55,1.63l0.4,2.07l-1.14,0.96l-1.31,-0.07l-2.73,-1.99l1.31,-3.44l3.42,-2.95l3.84,-1.26l2.47,1.15Z", "name": "Mecklenburg-Vorpommern"}}, "height": 1223.8430164619706, "projection": {"type": "merc", "centralMeridian": 0.0}, "width": 900.0});
},{}],"/Code/html/themes/themekit/lib/maps/js/vector/custom/jquery-jvectormap-es-merc-en.js":[function(require,module,exports){
$.fn.vectorMap('addMap', 'es_merc_en',{"insets": [{"width": 900.0, "top": 0, "height": 671.3455904856035, "bbox": [{"y": -5438155.586258878, "x": -1034892.2150401801}, {"y": -4304663.079836929, "x": 484657.87992932}], "left": 0}], "paths": {"ES-GA": {"path": "M1.5,81.67l-0.52,-1.68l-0.58,-0.88l1.78,-4.6l0.91,-3.31l-0.47,-0.93l-0.95,-0.72l-0.4,-1.76l1.33,-0.48l0.5,-0.91l0.33,-1.54l1.41,-1.2l0.28,-0.67l1.52,0.77l1.1,-0.31l1.15,-0.94l1.29,-1.75l2.04,-0.5l0.35,-0.4l0.0,-0.67l-0.57,-0.36l-2.45,0.85l-0.61,-0.06l0.03,-0.4l-0.58,-0.39l-2.0,1.03l-0.57,-0.07l-0.43,-1.11l2.9,-2.8l1.9,-1.04l2.46,1.04l2.39,-0.26l1.03,-0.46l1.73,-1.84l1.02,-2.44l1.4,1.08l1.91,-0.09l1.84,-0.76l1.14,-0.88l0.13,-0.46l-0.4,-0.26l-1.25,0.08l-0.57,-0.39l-0.94,-1.93l-1.32,-0.68l3.28,-1.27l2.81,-1.89l2.0,-0.54l1.11,-1.12l0.5,-0.14l2.82,2.55l4.9,1.54l1.5,0.19l4.18,-2.04l2.29,-0.7l2.45,0.93l3.57,-1.74l1.31,-2.05l2.04,-0.87l0.7,-0.96l3.11,-0.83l0.22,0.92l0.66,0.95l1.46,1.3l0.57,-0.04l0.92,-1.17l0.25,-0.97l-0.16,-2.04l0.42,-0.81l0.96,0.17l2.73,1.5l1.01,2.66l2.2,2.44l0.44,1.31l0.38,0.27l0.38,-0.27l0.53,-1.59l-0.48,-5.48l0.26,-0.67l1.83,-1.41l-0.06,-0.69l-1.42,-0.66l-3.44,-0.0l-0.99,-0.33l-1.51,-1.64l-0.59,-0.28l0.61,-0.49l7.08,-1.04l1.0,-1.22l-0.07,-0.92l-0.31,-0.33l-0.56,-0.04l-1.48,0.67l-2.78,0.47l0.06,-0.38l-0.97,-0.67l-0.54,0.12l-0.71,1.09l-1.12,0.46l-2.24,0.1l0.78,-3.69l0.81,-0.0l0.86,-1.24l-0.06,-0.53l-0.97,-1.11l-0.27,-1.27l2.97,0.2l2.14,-1.05l9.17,-7.04l0.21,0.6l0.79,0.64l0.94,0.03l0.77,-0.37l0.21,-0.46l-0.84,-0.27l0.69,-0.55l0.03,-0.64l-1.16,-0.94l-0.14,-0.73l0.82,-2.5l3.03,-0.17l2.06,-0.6l1.92,-1.16l1.64,-1.52l1.2,-1.65l1.4,0.22l1.14,2.67l0.74,0.95l-0.59,-0.22l-0.51,0.16l-0.83,1.78l0.25,1.38l-0.2,0.16l-0.41,-0.36l-0.55,0.02l-1.01,0.96l0.0,0.62l0.38,0.4l3.63,0.04l0.6,-0.67l0.04,-0.47l-1.02,-1.68l0.97,-0.29l1.56,0.55l0.43,-0.11l-0.29,-1.48l0.74,-0.83l2.4,-1.69l2.56,-0.68l1.53,-1.03l1.2,-1.37l0.5,-1.41l0.58,1.31l-1.69,2.24l-0.04,1.81l0.72,0.53l0.57,-0.16l0.79,-0.48l0.14,-0.96l1.44,-0.52l0.16,0.83l1.56,3.06l-0.17,1.32l0.55,0.42l0.75,-0.37l1.26,-2.17l0.84,0.11l1.19,-1.16l0.77,-0.29l2.46,0.28l6.09,3.32l2.61,2.06l4.12,5.75l2.88,1.48l-0.78,1.02l0.23,1.05l1.22,0.4l1.73,-1.05l0.82,0.0l3.86,0.85l4.11,-0.15l1.09,-0.63l2.69,1.17l0.08,1.51l-1.13,2.04l-0.35,1.26l0.61,1.81l-0.29,1.46l-2.03,1.87l-0.96,1.49l-1.0,0.84l-2.22,-0.21l-1.13,0.37l-0.59,1.28l-0.09,2.52l0.42,0.7l0.88,0.44l1.42,0.16l0.51,3.69l0.95,1.72l0.89,0.94l1.47,0.9l0.54,3.75l0.83,1.73l2.05,1.79l0.99,0.23l0.76,0.96l1.79,0.85l-0.54,3.14l1.03,1.99l1.23,0.69l1.39,-0.5l2.42,-1.42l0.82,-1.64l0.45,-0.26l2.01,2.92l0.05,1.44l-2.34,2.12l-2.78,1.26l-1.3,-0.03l-0.94,0.44l-1.29,3.14l-1.07,0.57l-0.51,0.76l-0.15,0.98l0.88,2.16l0.77,0.51l0.65,-0.1l0.57,-0.53l0.22,-1.96l2.06,2.57l2.9,0.52l1.97,2.17l0.53,4.04l-0.5,0.71l-0.44,1.5l-1.17,1.49l-0.11,1.26l0.54,2.79l-0.57,1.72l-4.19,5.13l-0.51,0.24l-1.17,-0.2l-0.83,0.29l-1.44,1.47l-2.2,1.12l-1.18,1.92l-0.16,1.05l0.23,1.18l1.32,2.06l0.13,0.78l-1.59,1.32l-0.37,0.89l0.08,3.59l-1.14,2.6l-0.13,2.4l-0.57,1.59l0.36,0.54l2.92,0.13l2.94,0.64l0.94,-0.18l1.2,-1.05l1.89,-0.38l1.79,1.15l4.53,1.27l0.69,1.59l-0.26,2.13l-0.46,1.23l-1.03,1.05l-0.09,0.67l3.29,2.79l2.22,1.45l0.9,1.01l0.24,0.63l-0.29,3.67l-1.87,3.11l-1.94,2.1l-0.44,1.77l-1.3,-0.36l-2.48,0.36l-2.25,1.58l-2.87,3.2l-1.01,2.97l-1.98,1.51l-2.59,3.58l-0.24,0.9l0.65,1.24l0.68,0.47l1.81,0.1l0.96,1.31l-1.35,3.73l0.23,1.73l-0.48,-0.0l-1.51,1.11l-2.13,0.94l-1.86,-0.86l-1.96,-1.71l-2.18,-1.37l-1.36,0.14l-2.21,1.47l-0.64,0.79l0.14,5.42l-1.26,1.84l-2.06,1.29l-4.6,1.59l-4.71,0.36l-0.97,0.68l-1.9,2.1l-0.8,-2.34l-0.89,-1.26l-1.74,-0.54l-1.13,-0.72l-0.78,0.09l-0.49,0.43l-0.59,1.8l-0.88,0.63l-1.26,0.45l-2.35,0.09l-0.8,-0.45l-0.02,-0.53l0.99,-2.71l-0.36,-0.54l-3.47,-0.15l-2.85,-1.82l-1.17,-0.33l-2.09,0.97l-3.98,0.97l-1.88,-0.09l-0.91,0.4l-0.83,1.39l-1.58,-0.0l-0.56,-4.59l-0.54,-0.34l-1.53,0.76l-0.63,2.48l-0.48,0.9l-1.98,-0.14l-1.18,0.47l-3.66,4.19l-2.79,0.81l-5.19,-0.32l0.23,-1.96l-0.18,-1.37l-0.68,-0.84l-2.21,-0.87l-0.63,-1.35l0.09,-1.49l0.59,-1.5l2.5,-3.72l1.87,-1.84l3.05,-2.24l0.76,-1.29l0.15,-1.55l-0.66,-1.65l-1.01,-0.98l-1.39,-0.62l-1.56,0.1l-2.05,0.79l-0.55,-0.44l-0.19,-1.25l0.16,-3.97l-1.22,-2.27l-0.56,-0.1l-1.94,1.4l-1.1,0.45l-1.76,0.23l-3.3,2.47l-10.12,1.65l-1.41,0.54l-2.23,1.55l-1.11,0.45l-3.72,0.38l-1.22,0.95l-1.74,3.64l-1.22,0.82l-3.26,1.34l-0.81,0.7l-1.67,2.73l-1.1,0.93l-2.48,1.05l-1.99,2.11l-0.56,-0.2l0.12,-0.99l-1.31,-17.24l0.18,-1.35l0.5,-0.43l2.47,-0.04l1.55,-0.54l0.51,-1.18l-0.5,-0.9l-1.22,-0.73l1.93,-1.14l0.62,-1.93l0.93,-0.6l1.27,-1.6l3.37,-2.62l1.18,-0.57l2.11,-1.98l2.53,-1.43l0.59,-0.66l0.25,-0.86l-0.08,-3.38l-0.76,-0.41l-0.7,0.27l-1.0,0.97l-1.64,3.23l-2.86,0.97l-3.56,1.66l-0.77,0.79l-3.94,-0.12l-0.75,0.21l0.79,-3.02l0.6,0.91l0.68,-0.02l0.39,-0.67l-0.1,-4.08l0.7,-0.15l2.29,0.54l0.65,-0.28l0.6,-1.29l2.43,-2.88l4.24,-3.4l0.58,-1.44l-0.11,-0.44l-0.95,0.19l-1.85,-0.2l-3.53,2.49l-2.2,0.86l-2.02,0.18l-2.01,-0.25l-1.41,-0.88l-0.46,-0.86l-0.33,-1.76l-0.67,-1.11l-0.98,-0.52l-2.29,-0.46l0.27,-0.48l1.09,-0.69l2.14,-0.74l0.57,0.2l0.39,0.54l-0.01,0.5l-0.69,0.45l-0.0,0.67l1.58,0.8l1.04,0.19l1.14,-0.55l0.27,-1.12l-0.16,-1.77l0.79,-0.98l-0.8,-3.06l0.13,-2.67l0.53,-0.94l1.69,-0.98l0.9,-1.2l2.43,-5.5l0.53,-2.07l-0.39,-0.5l-0.79,0.28l-1.06,2.73l-0.78,0.93l-0.92,0.32l-1.0,-0.38l-2.28,-3.71l-0.7,0.07l-1.02,2.51l-0.16,1.11l0.55,0.85l-1.21,1.76l-0.47,0.31l-0.49,-0.39l0.14,-1.11l-0.45,-0.06l-3.16,2.21l-0.06,0.57l0.68,0.83l-2.95,1.21l-0.68,2.35l-1.7,1.52l-0.59,-0.66l-0.46,-3.05l-1.65,-0.91l-0.79,-0.77l0.3,-1.91l1.79,-3.78l0.55,-4.55l1.44,-2.17l2.81,-1.56l2.69,-3.29l1.71,-0.51l0.94,-2.16l-0.17,-1.62l-1.57,-1.05l-0.59,0.3l-0.26,1.94l-0.89,1.11l-1.37,0.61l-1.62,0.23l-3.29,-0.49l-1.51,0.28l-0.32,0.45l0.19,1.32l-1.34,1.45l-0.65,0.34l-1.01,-0.19l-0.72,-0.63l-1.17,-3.55l1.17,-0.49l0.89,-1.94l-0.66,-1.2l-2.02,-1.08l-0.39,-1.71l0.01,-0.59l0.81,-1.41l-0.12,-1.75l-2.15,-0.81l-0.98,-1.58l-0.99,-0.52l-0.56,0.37l0.33,1.47l-0.17,0.23l-0.37,0.1l-0.55,-1.27l-0.93,-0.05l-1.45,1.15l-1.31,2.88Z", "name": "Galicia"}, "ES-IB": {"path": "M885.15,331.58l1.28,1.03l-0.14,1.44l0.63,0.6l0.94,-0.34l1.06,-1.43l0.4,0.56l1.78,1.15l1.37,1.72l1.81,0.66l0.6,0.84l0.51,1.29l-0.05,0.92l-0.94,0.39l-0.03,0.73l1.03,0.51l1.69,0.11l0.55,2.47l1.28,2.14l-0.99,-0.62l-0.58,0.34l-0.17,5.32l-2.98,0.39l-4.55,-2.24l-10.67,-7.07l-2.3,-0.92l-2.88,-0.08l-4.64,0.94l-2.1,-0.75l0.45,-2.95l0.65,-0.62l-0.01,-0.59l-0.67,-0.55l-1.27,-0.47l-1.04,-1.32l0.39,-1.63l0.66,-0.86l4.33,-0.97l1.66,0.63l6.33,-0.65l2.7,0.11l1.79,-0.55l1.35,-1.05l0.76,1.34ZM822.57,340.1l0.71,0.93l0.58,0.03l-3.9,1.69l-1.54,1.53l-1.17,-0.32l-0.4,0.38l-0.14,2.77l0.33,0.41l2.52,0.4l4.1,-1.16l-0.25,1.53l-0.47,0.84l-1.31,0.65l-2.05,0.53l-0.71,0.82l-0.14,2.16l0.86,2.05l1.81,1.75l2.12,1.21l2.12,0.51l4.67,-0.03l1.29,-0.56l1.95,-2.0l0.74,-0.37l1.69,0.5l3.69,2.2l1.89,0.2l-0.2,0.57l0.37,1.94l-0.81,1.26l0.35,1.21l-1.47,3.29l-1.84,0.83l-0.92,1.15l-0.28,1.5l0.42,1.29l-2.52,2.34l-2.83,3.43l-2.08,4.11l-0.57,4.28l-0.31,-0.26l-0.66,0.17l-1.05,3.44l-1.97,2.14l-6.06,3.77l-3.85,3.7l-0.37,0.01l-1.89,-2.78l-1.74,-1.03l-0.76,-2.61l-2.25,-1.41l-0.75,-0.21l-2.45,0.58l-5.64,-0.42l-2.4,-0.99l-1.51,-1.91l-0.68,-4.56l-0.93,-0.76l0.14,-1.06l0.99,-2.02l-0.74,-2.11l-1.98,-1.86l-2.28,-1.35l-2.06,-0.55l-1.51,0.5l-4.24,2.37l-1.07,1.21l-0.68,2.22l-1.47,1.55l-1.4,0.17l-1.36,-2.59l0.55,-0.58l0.07,-0.62l-1.76,-1.81l-0.61,0.04l-0.74,0.82l-0.41,-0.74l-0.57,-0.19l-1.96,1.08l-0.39,-0.29l-0.64,-1.59l-1.08,-0.9l-0.29,-1.33l0.4,-2.74l4.54,-2.86l1.45,-0.36l1.18,-0.77l3.29,-3.51l0.85,-0.47l2.59,-0.65l3.21,-3.17l0.87,-1.68l1.37,-0.07l3.78,-4.07l2.5,-1.17l2.39,-2.1l1.27,-0.46l0.54,-0.86l2.07,-0.05l1.98,-0.97l3.92,-2.63l1.94,-0.53l3.73,-0.37l3.65,-0.94l6.62,-2.71ZM823.91,341.04l0.24,-0.25l0.09,0.05l-0.16,0.12l-0.18,0.08ZM709.71,429.64l-0.58,-0.67l-0.66,-0.03l-1.07,1.4l-0.95,1.67l-1.12,3.54l-2.97,-2.38l-2.38,0.23l-0.6,-0.98l-1.11,-0.35l-1.34,0.36l-0.5,0.83l-1.65,-1.11l-0.65,-0.76l-0.25,-1.32l0.99,-3.26l-0.49,-1.02l0.85,-0.63l0.53,-0.07l0.66,0.39l1.37,-0.54l1.53,0.02l0.4,-0.46l-0.57,-3.54l0.04,-1.81l0.6,-0.69l1.88,-1.2l1.52,-1.64l0.58,0.43l0.51,0.02l1.08,-0.84l0.98,0.3l1.28,-1.07l1.73,-0.91l1.72,-0.47l1.29,0.22l1.66,-1.17l0.73,0.05l1.56,1.03l1.9,0.25l0.77,0.69l-0.26,0.78l1.29,4.06l-0.78,0.12l-0.87,0.68l-0.68,1.22l-0.49,1.73l-2.36,1.6l-2.04,3.14l-3.05,2.18ZM705.29,448.74l0.52,-1.86l-0.62,-0.65l0.43,-0.44l0.69,0.22l0.97,-0.84l0.85,-1.65l3.04,4.39l1.4,1.27l3.57,0.03l1.31,0.43l-0.05,1.33l-1.25,0.76l-2.04,-0.59l-3.75,-1.97l-1.25,-0.09l-3.54,1.79l-0.41,-1.27l0.31,-0.48l-0.19,-0.35Z", "name": "Islas Baleares"}, "ES-PV": {"path": "M419.05,32.69l0.76,-0.45l1.52,-0.16l3.34,0.15l3.17,-0.32l2.52,-0.96l0.64,0.16l2.53,2.22l0.53,0.9l0.74,2.21l0.25,1.87l0.71,0.19l0.27,-0.35l0.59,-1.86l0.08,-1.37l0.7,-0.28l3.48,0.89l3.79,1.64l4.2,1.14l1.36,1.98l6.45,3.07l2.74,0.82l2.8,0.3l5.75,-1.01l1.43,1.54l1.14,0.26l0.87,-0.54l0.38,0.79l0.67,0.39l0.4,-0.06l1.85,-1.47l2.14,-0.47l4.68,-1.71l2.2,-1.31l0.75,0.03l1.14,1.43l0.52,0.45l0.5,0.02l0.93,-0.67l-0.0,-0.65l-0.88,-0.87l2.11,-0.95l2.55,-2.29l2.11,-1.14l0.92,0.67l-0.34,2.34l-0.03,3.03l0.22,0.35l1.8,0.88l0.7,0.96l0.24,1.78l-1.25,0.4l-1.21,1.14l-1.99,3.54l-0.76,0.75l-1.23,0.51l-1.35,-0.34l-0.5,0.49l-0.13,0.86l-1.29,-0.53l-0.58,0.21l-0.73,3.17l0.46,4.38l-0.88,1.76l-0.68,0.73l-5.13,3.59l-1.75,3.63l0.05,2.18l-0.53,1.21l-2.91,1.1l-1.86,2.33l-3.14,0.44l-1.87,-0.67l-1.08,0.29l-1.24,1.42l-1.43,3.42l0.9,3.7l-0.19,1.54l-1.35,2.23l-0.76,2.12l-0.33,3.58l-0.25,0.38l-1.86,0.73l-0.62,1.0l0.56,4.21l1.15,0.71l0.12,0.87l-2.73,1.87l-1.56,0.12l-1.22,-1.58l-1.89,-0.39l-2.03,1.38l-3.76,3.49l-0.04,1.38l0.41,0.66l2.7,1.39l1.0,-0.4l1.21,-1.6l0.81,0.48l0.4,2.14l-0.73,5.62l-3.2,-0.82l-1.8,-1.06l-0.6,-1.45l-0.51,-0.22l-1.28,0.73l-0.72,1.58l-1.63,0.07l-1.32,0.77l-0.2,-0.79l-0.93,-0.57l-0.95,0.15l-0.64,0.64l-0.61,-0.28l-2.3,-1.82l-1.03,-0.45l-0.02,-3.61l-0.34,-0.94l-3.02,-2.41l-1.0,-0.32l-1.21,0.39l-0.65,0.6l-0.68,1.92l-0.78,-0.03l-1.06,0.47l-0.31,-0.18l-0.25,-0.59l0.69,-0.77l0.23,-0.84l-0.24,-0.82l-0.6,-0.23l-0.55,0.35l-0.15,-0.25l-0.09,-2.01l-0.37,-1.2l-5.08,-4.54l-1.68,-0.79l-1.61,-2.03l-2.34,-1.45l-1.93,-1.8l-2.12,-1.13l-3.86,1.42l-0.53,-0.09l0.23,-1.26l-1.24,-1.58l-0.18,-0.96l2.51,-4.46l0.18,-1.15l-0.43,-1.05l-0.78,-0.36l-0.59,0.15l-1.91,2.14l-1.24,-0.04l-1.27,0.48l-0.94,1.22l-0.32,1.43l-0.61,-0.39l-3.08,-3.8l0.56,-1.54l2.88,-3.71l2.18,-0.25l1.33,0.32l0.78,0.6l0.29,1.08l0.56,0.72l1.19,0.5l2.66,0.49l3.8,-0.43l1.41,-1.16l1.51,-0.36l0.82,-1.36l-0.45,-1.37l-2.08,-0.84l-1.58,-1.53l0.01,-0.26l2.19,-0.22l0.51,-0.29l0.57,-1.05l0.01,-1.46l-0.76,-0.83l-1.14,-0.38l-0.29,-0.35l-0.13,-1.16l-1.02,-0.71l-1.73,0.8l-1.14,2.49l-0.48,0.19l-2.33,-0.23l-2.46,-0.86l1.02,-2.07l0.44,-4.83l-0.43,-0.87l-1.24,-0.6l-0.34,-0.97l0.77,-1.92l1.25,-1.19l-0.1,-1.11l-0.69,-0.68l-5.22,-0.56l-1.49,-1.19l-1.31,0.0l-6.31,3.83l-3.52,1.36l-1.08,-3.8l0.04,-1.91l-0.29,-1.3l0.17,-0.63l0.63,-0.81l6.92,-5.01l3.97,0.29l1.69,-0.2l2.08,0.6l3.09,-1.44l0.93,-1.88l-0.08,-4.33l2.1,0.41l1.58,-1.07l1.83,1.16l3.25,2.83l0.66,-0.3l-0.02,-0.81l-1.37,-4.06l1.12,-0.61l0.73,-0.87l2.76,-1.71l1.0,-0.29l0.29,-0.38l0.0,-0.68l-0.38,-0.38ZM425.78,92.02l-2.33,3.23l-0.2,1.02l0.4,0.88l1.62,1.66l1.87,1.42l4.07,1.89l4.54,1.06l3.29,1.38l5.18,0.15l1.36,0.89l0.94,-0.17l0.88,-0.6l0.08,-1.67l-0.83,-2.34l-0.98,-0.02l-1.0,0.98l-0.84,0.25l-2.04,-2.41l0.09,-0.43l1.08,-0.41l0.73,-0.75l0.93,-2.18l0.11,-0.73l-0.29,-0.57l-1.4,-0.23l-1.66,-1.43l-2.43,0.17l-5.8,-1.88l-1.82,-0.17l-4.21,0.27l-0.77,0.21l-0.57,0.52Z", "name": "Pa\u00eds Vasco"}, "ES-RI": {"path": "M442.94,162.21l-2.82,-0.2l-3.26,0.19l-1.96,-1.27l-1.88,-0.21l-0.77,-0.4l-0.15,-0.82l0.62,-1.89l1.41,-1.88l0.28,-1.39l-0.34,-2.01l-0.78,-0.56l-0.83,-0.23l-1.77,0.18l-1.05,0.65l-0.79,1.01l-0.68,1.58l-0.24,1.32l0.15,1.27l-0.29,0.64l-0.66,0.73l-3.6,1.95l-2.2,-0.66l-0.45,-2.75l-1.16,-2.44l-1.45,-0.38l-3.83,0.27l-0.85,-0.43l-1.85,-3.23l-1.48,-1.12l-0.62,-1.84l-2.15,-3.44l1.21,-1.52l0.75,-2.78l0.21,-1.94l-0.67,-3.43l-0.1,-2.24l-0.59,-1.13l1.67,-0.46l0.6,-0.43l1.2,-2.18l-0.15,-4.0l0.58,-2.56l-0.78,-1.83l-1.43,-1.56l0.8,-2.53l0.04,-0.94l-0.24,-0.7l-0.64,-0.54l-2.06,0.19l0.05,-0.39l1.91,-2.13l1.57,-2.41l-0.01,-0.97l-0.89,-1.63l0.1,-0.23l0.81,-0.38l2.71,-0.31l4.21,0.5l2.79,0.8l4.25,-1.43l0.09,1.5l0.46,0.86l0.56,0.14l0.45,-0.29l0.05,0.19l-0.91,1.35l0.07,0.76l0.5,0.64l0.85,0.35l1.24,-0.52l0.77,0.1l0.43,-0.28l0.64,-1.97l0.4,-0.39l0.75,-0.29l0.69,0.21l2.78,2.19l0.25,4.48l4.64,3.0l0.48,-0.12l0.61,-0.68l0.46,-0.04l0.39,0.3l0.1,1.19l0.68,0.25l1.53,-1.16l2.18,0.05l0.41,-0.59l-0.33,-0.49l0.2,-0.44l0.91,-0.82l0.67,1.41l2.04,1.19l2.3,0.71l2.83,0.43l2.88,1.05l4.18,-0.6l0.55,0.21l1.85,1.29l2.17,2.3l1.09,0.37l1.43,0.15l4.38,-0.33l1.71,0.21l1.04,0.94l-0.74,1.39l0.92,1.4l1.87,0.73l3.48,-0.01l4.85,5.89l2.46,1.81l0.05,1.62l0.59,0.96l1.82,0.0l2.16,1.84l3.19,1.83l1.37,0.42l1.74,1.23l-0.04,1.68l0.6,1.29l-0.23,1.26l0.4,1.54l-0.34,0.57l-0.94,0.15l-2.18,-0.93l-2.47,0.65l-1.4,-0.58l-1.39,0.03l-0.6,0.56l-0.84,1.66l-3.65,4.19l-0.43,2.07l0.35,1.87l0.54,1.04l2.43,2.06l0.43,1.4l-0.77,2.22l-4.72,2.75l-2.17,0.34l-1.88,-1.3l-1.66,-0.69l-1.2,-0.09l-4.08,-1.23l-0.66,-2.16l0.84,-1.35l-0.17,-0.96l-0.78,-1.31l-1.53,-1.28l-0.5,-1.05l0.01,-0.98l1.67,-1.66l0.09,-0.8l-0.4,-0.77l-0.9,-0.61l-2.38,-0.36l-1.27,0.15l-4.13,1.28l-0.83,-0.89l-0.67,-2.59l-1.23,-0.82l-3.46,-0.39l-4.16,0.32l-1.87,0.61l-2.84,2.07l-1.78,-0.17l-0.54,0.81l-0.26,3.15l-1.35,1.35l-2.32,4.48Z", "name": "La Rioja"}, "ES-AS": {"path": "M186.77,19.88l2.76,1.17l3.53,-0.67l3.43,-0.01l4.28,-1.41l0.98,-0.95l0.61,-0.1l1.96,1.48l0.96,0.34l5.21,0.58l1.07,-0.51l1.2,0.43l2.93,-1.67l7.57,0.0l0.72,-1.07l-0.63,-1.47l0.66,-0.77l-0.17,-1.1l1.55,0.01l0.96,-0.48l0.78,-1.9l0.71,0.04l2.03,1.01l1.35,1.18l3.59,4.28l1.22,1.89l0.78,0.18l0.39,-0.3l0.18,-0.67l0.99,1.65l3.5,0.57l13.22,-0.56l1.69,0.45l0.14,0.87l-0.74,1.28l-1.1,1.06l-0.05,0.52l0.45,0.62l0.53,0.11l2.72,-1.23l1.07,-1.67l3.44,0.11l0.96,0.35l4.71,3.16l2.33,0.86l5.76,0.3l1.39,0.39l0.62,1.02l0.56,0.13l0.64,-0.41l4.43,1.36l2.35,-1.16l2.14,0.99l4.64,0.98l5.34,2.54l1.46,0.45l14.29,1.27l-0.05,2.87l-1.56,3.22l1.01,2.8l0.09,1.97l-0.52,1.12l-0.63,0.38l-0.48,-1.04l-0.58,-0.52l-1.41,-0.36l-1.46,0.05l-1.14,0.69l-0.84,1.1l-0.76,0.45l-3.21,0.02l-1.65,0.7l-0.72,1.41l0.15,1.32l-0.43,2.65l-0.74,1.14l-1.79,-0.25l-3.7,0.59l-1.72,-2.97l-1.38,-1.17l-1.48,-0.39l-0.92,0.16l-3.5,1.91l-1.08,0.99l-1.97,1.1l-2.43,0.68l-1.29,0.68l-0.69,0.68l-0.68,1.3l-0.87,2.7l-1.32,1.58l-0.55,0.09l-1.45,-0.62l-0.6,0.09l-3.52,1.74l-6.17,0.75l-3.48,-0.54l-0.99,0.17l-0.89,0.69l-0.44,1.85l-0.44,0.51l-1.14,0.35l-3.56,0.07l-0.65,0.59l-0.71,1.46l-1.68,-0.03l-2.07,0.69l-1.75,-0.9l-3.79,-0.61l-1.93,-0.94l-2.82,-0.03l-1.84,0.91l-1.68,2.76l-0.96,2.54l-1.02,0.66l-3.5,0.05l-4.71,-2.37l-2.33,-1.67l-0.56,-0.97l-0.47,-1.99l-0.49,-0.71l-0.75,-0.42l-2.14,0.4l-4.24,-0.66l-0.82,0.49l-0.82,2.29l-1.13,0.54l-0.75,0.06l-2.6,-0.96l-1.76,-0.29l-1.08,0.33l-0.5,0.68l-0.16,1.12l-0.45,0.26l-1.14,-0.3l-2.84,-1.42l-2.12,-0.35l-1.26,-0.95l-1.42,-0.28l-2.02,0.99l-1.38,2.32l-0.27,1.35l-1.66,0.61l-1.84,0.08l-0.6,0.5l-0.16,0.7l0.39,0.77l1.84,0.92l0.18,0.49l-0.19,0.42l-3.28,1.82l-3.88,1.16l-2.89,-0.25l-1.96,-0.71l-4.38,0.26l-2.04,0.89l-1.51,1.62l-0.7,0.28l-0.52,-0.91l-1.19,-0.61l-1.99,-0.34l-0.54,-4.06l-2.21,-2.53l-0.69,-0.32l-1.38,0.02l-0.95,-0.3l-2.25,-2.75l-0.7,0.04l-0.3,0.43l-0.17,2.05l-0.25,0.16l-0.36,-0.21l-0.42,-0.74l-0.3,-0.9l0.12,-0.79l1.47,-1.09l1.15,-2.99l0.56,-0.26l1.41,-0.0l3.03,-1.4l2.47,-2.25l0.25,-1.02l-0.17,-1.13l-1.73,-2.82l-0.96,-0.71l-1.12,0.52l-0.52,1.24l-0.63,0.65l-2.79,1.42l-0.75,-0.42l-0.83,-1.59l0.52,-2.1l-0.14,-1.42l-1.97,-0.99l-0.67,-0.92l-1.09,-0.29l-1.81,-1.56l-0.71,-1.46l-0.66,-4.05l-1.63,-1.07l-0.79,-0.83l-0.8,-1.48l-0.28,-3.17l-0.3,-0.68l-0.82,-0.54l-1.01,0.06l-0.79,-0.58l0.21,-2.65l0.89,-0.5l2.53,0.12l4.2,-4.36l0.49,-1.74l0.4,-0.3l0.92,-4.1l0.92,-0.8l0.53,-1.9l3.52,-0.79l6.36,-0.23l1.09,0.31l3.88,-0.31l2.64,0.78l1.78,0.21l3.76,-1.94l3.19,0.34l3.3,1.19l2.38,1.29l1.68,-0.65l1.62,0.02l0.39,-0.5l-0.25,-1.24Z", "name": "Principado de Asturias"}, "ES-CT": {"path": "M647.31,291.34l-4.07,-1.73l-0.88,-1.03l-0.28,-1.32l-1.34,-1.27l-2.1,-1.15l-4.65,-1.63l-1.46,-0.78l-0.96,-1.67l0.63,-1.86l0.01,-0.92l-1.52,-1.28l-1.46,-0.47l-0.65,-0.64l-0.85,-1.64l-0.4,-0.15l-1.26,0.28l-1.4,-0.27l-0.21,-0.61l3.79,-2.32l2.97,-4.44l0.04,-1.0l-0.89,-2.2l-0.54,-2.84l0.69,-2.77l1.67,-3.32l0.28,-2.02l-1.17,-3.55l-2.96,-2.04l-1.43,-4.53l0.21,-1.78l0.75,-0.68l1.35,-0.26l1.0,-1.2l1.14,-0.31l1.2,-0.78l0.56,-0.78l0.86,-3.58l3.07,-2.23l-0.43,-4.25l1.6,-3.62l-0.18,-1.76l-0.63,-1.32l-0.96,-0.98l-1.53,-0.72l-0.15,-1.33l0.9,-1.38l0.67,-2.4l0.13,-3.79l0.53,-0.49l2.66,-1.12l2.79,-4.52l-0.7,-2.24l-0.08,-1.47l-0.38,-0.72l-0.84,-0.43l-3.27,-0.25l-0.66,-0.57l-0.54,-2.62l-0.89,-2.12l-0.06,-1.15l0.84,-1.28l1.6,-1.51l2.53,-3.7l2.99,-0.75l0.83,-0.5l2.46,-4.03l2.69,-1.24l1.1,-1.67l1.51,-0.96l0.9,-1.14l0.3,-0.79l-0.3,-3.56l-1.77,-2.07l1.01,-1.34l1.61,-0.77l1.11,-1.76l1.2,-0.69l0.68,-0.99l0.29,-0.97l-0.06,-1.29l0.88,-1.95l1.06,-3.98l0.6,-0.52l0.62,-1.83l0.39,-2.85l-0.34,-1.52l0.12,-0.83l0.91,-4.28l0.9,-1.62l0.69,-2.32l0.08,-3.22l0.44,-2.04l-0.32,-5.55l-0.91,-3.34l-1.2,-1.51l-0.85,-3.49l0.14,-0.53l1.27,-0.4l0.48,-0.51l0.03,-1.71l1.9,-3.94l0.61,-3.81l-0.42,-0.69l-2.15,-0.7l-0.99,-0.65l-2.63,-5.56l-0.69,-0.62l0.1,-1.55l-0.47,-1.51l-0.85,-1.12l-0.71,-0.32l0.84,-1.12l0.08,-0.55l-0.61,-0.84l0.85,-2.32l-0.11,-2.03l0.25,-1.03l1.27,-0.5l1.71,-0.13l1.07,0.11l3.44,1.16l2.36,0.06l2.79,1.65l1.96,0.78l1.54,1.42l0.84,0.39l2.07,-1.0l2.14,1.39l5.58,0.38l1.25,0.39l1.05,0.94l1.79,3.86l1.44,1.04l0.9,0.07l2.14,-0.69l8.02,0.02l1.12,0.31l-0.1,1.26l0.33,0.36l1.18,0.36l2.37,3.76l1.09,3.02l0.86,1.15l-0.67,2.22l0.55,0.64l-1.04,1.81l-0.27,1.13l0.44,0.48l1.3,-0.17l0.91,0.82l0.16,1.03l-2.52,1.36l-0.17,0.58l1.83,2.88l0.16,1.33l0.94,0.64l3.99,0.54l0.79,-0.12l0.88,-0.52l0.96,-1.32l4.0,-0.52l2.22,-0.92l0.98,-2.65l1.03,0.51l0.93,0.02l1.31,-0.82l0.23,0.51l1.22,0.5l4.14,0.59l1.29,0.54l3.81,2.59l2.78,0.43l0.84,0.37l0.81,1.35l0.84,3.28l0.65,1.45l2.41,1.89l1.0,0.14l2.98,-0.54l3.48,-2.91l1.15,-2.31l0.85,-0.4l3.17,0.36l4.05,-1.27l1.9,-0.2l2.55,1.64l3.84,1.82l2.98,0.53l0.45,1.29l1.11,1.46l1.28,1.01l3.55,1.42l0.69,-0.03l0.71,-0.54l0.94,-1.81l1.06,-0.03l4.47,1.31l1.86,-0.09l0.38,-0.43l-0.03,-0.39l-0.86,-1.1l-0.51,-1.45l3.09,-2.69l1.05,-0.54l1.23,-0.09l2.54,0.39l1.5,-0.22l4.17,-3.26l3.24,-0.25l2.17,-1.64l1.92,0.74l1.35,-0.7l2.7,0.24l1.58,2.45l2.32,1.04l3.55,0.13l3.98,-0.69l-0.26,2.59l0.35,1.32l1.58,2.91l0.66,0.63l3.09,-0.21l1.07,1.24l0.73,-0.11l0.56,-0.54l1.8,0.94l-1.43,2.88l-0.45,2.18l-1.38,1.69l-0.87,-0.39l-6.44,-0.26l-1.21,0.9l-0.76,1.99l-0.63,5.54l0.41,1.7l1.25,1.39l3.1,2.07l0.76,1.74l-0.32,3.82l0.85,4.3l1.83,2.21l-0.21,1.53l-1.59,2.78l-0.83,2.26l-0.99,1.05l-4.85,3.08l-3.51,3.72l-8.78,6.51l-2.44,1.05l-2.87,0.71l-1.3,1.53l-1.0,0.41l-1.08,0.99l-0.49,0.98l-2.0,0.26l-8.54,5.47l-13.33,6.16l-1.44,1.49l-3.74,2.57l-4.97,2.14l-2.03,1.55l-1.77,2.44l-3.21,5.66l-1.86,2.59l-2.09,1.96l-4.54,2.5l-2.61,0.74l-4.53,0.47l-4.43,1.15l-1.94,1.0l-2.31,-0.08l-12.47,3.42l-5.68,0.43l-16.54,6.22l-4.61,1.01l-0.77,0.61l-1.42,2.78l-0.65,0.57l-1.95,-1.06l-3.06,0.05l-2.83,0.53l-2.68,1.22l-2.23,1.62l-7.46,7.41l-3.62,4.84l-5.95,5.77l-1.36,2.65l0.16,0.53l3.7,1.81l1.29,-0.17l0.37,-0.81l-0.2,-0.52l0.47,0.25l2.31,2.69l2.63,2.41l1.29,0.68l-0.06,0.65l-0.9,0.72l-0.61,1.15l-0.92,0.58l-4.34,1.32l-1.83,1.63l-1.0,1.29l-1.66,-0.87l-1.99,0.17l-5.63,1.85l-1.37,0.93l-1.14,1.24l-1.01,1.61l-1.86,4.58ZM660.17,284.18l-1.82,2.0l-1.59,1.15l-1.28,0.05l-0.64,-1.18l1.78,0.24l2.15,-0.99l1.4,-1.29Z", "name": "Catalu\u00f1a"}, "ES-CM": {"path": "M388.04,228.2l1.28,0.51l3.29,0.18l3.31,-0.63l0.78,-0.46l1.91,-0.05l2.18,-2.4l1.18,-0.61l7.54,1.77l2.35,-0.02l4.4,-0.56l1.52,-0.38l1.17,-0.72l0.98,-1.53l1.11,-0.43l0.67,0.05l0.98,0.51l0.27,0.47l0.78,2.66l1.39,1.02l2.73,0.75l1.79,-0.14l1.86,-1.09l1.26,0.08l1.12,1.63l0.87,0.53l2.86,0.65l0.96,0.47l0.81,0.98l0.67,0.36l1.68,-0.15l0.17,0.25l-0.35,0.71l-0.92,0.65l-0.26,0.54l0.12,0.43l1.86,1.48l-0.55,1.24l0.13,0.8l0.72,0.5l0.88,0.12l2.3,-0.98l0.36,0.24l1.1,2.39l1.61,1.0l0.86,2.32l0.54,0.66l2.64,1.36l1.22,0.03l2.78,-1.31l2.42,1.33l1.03,0.12l1.65,-0.33l1.93,-0.78l1.51,-1.11l3.88,-0.15l2.63,-2.37l2.72,1.97l1.16,1.32l0.99,0.24l0.57,-0.46l0.14,-0.48l-0.28,-2.26l0.58,-2.17l-0.02,-1.11l4.97,-1.59l1.52,0.41l1.9,1.85l1.69,0.72l2.65,2.07l2.23,1.25l3.21,2.74l2.27,3.39l3.54,3.1l1.54,1.83l2.21,1.99l0.69,1.48l-0.25,3.5l0.38,1.48l1.06,1.93l0.99,1.14l1.68,1.14l0.69,1.12l0.16,2.74l-1.07,2.76l-0.13,1.77l1.32,3.62l-0.02,1.74l-1.11,3.27l0.18,2.62l-0.21,0.37l-0.83,0.84l-1.48,0.66l-2.56,-1.23l-2.31,-0.45l-0.79,0.42l-1.52,4.01l-0.08,4.18l-0.74,0.91l-1.92,1.2l-2.71,4.01l-0.9,0.57l-0.81,1.1l0.16,0.6l1.84,0.82l3.74,4.76l0.31,1.07l-0.34,1.64l0.32,1.41l0.36,0.18l1.15,-0.56l0.77,0.1l1.54,0.83l7.89,7.4l0.9,0.21l1.34,-0.46l1.87,0.61l2.43,-0.07l0.06,1.53l-0.69,1.9l-0.18,1.94l0.79,0.93l1.77,1.24l2.27,7.08l0.69,0.67l5.67,0.96l1.74,0.68l1.17,0.09l5.05,-1.15l0.94,2.79l-3.18,1.72l-0.77,1.17l0.62,1.95l-0.39,4.59l-1.47,5.65l-2.76,4.61l-0.24,1.58l0.33,2.68l-0.24,0.48l-0.78,0.78l-1.01,0.38l-1.12,-0.03l-2.25,-1.05l-1.39,0.04l-1.87,1.31l-1.55,1.57l-2.77,5.26l-0.72,0.95l-1.32,0.99l-0.63,1.33l-0.1,0.87l0.3,0.83l-0.22,2.61l0.25,0.61l-0.5,0.74l0.04,1.02l-0.77,2.11l0.05,0.97l1.13,1.76l1.0,0.36l0.36,0.82l1.73,1.33l0.53,2.12l0.31,0.27l1.42,0.01l1.2,-0.32l1.28,0.44l3.7,2.31l1.31,0.08l8.58,2.77l0.35,0.97l-0.51,2.61l-0.01,3.13l-1.48,4.13l-1.67,2.04l-1.86,4.34l-0.5,2.08l0.43,2.32l6.96,8.54l2.13,1.45l5.76,-0.37l1.21,-0.28l1.77,-0.89l1.82,0.82l2.42,4.36l-0.34,2.55l0.89,2.95l-0.4,0.97l-0.1,1.23l-1.87,1.27l-0.33,1.47l0.78,2.74l2.53,3.58l-2.17,1.59l-1.07,0.4l-3.27,0.05l-0.84,0.26l-5.24,-4.28l-0.53,-2.13l-0.46,-0.64l-3.81,-1.33l-4.17,1.05l-1.35,0.91l-1.67,1.7l-3.55,2.02l-0.83,-0.2l-0.91,-1.02l-0.8,-0.08l-0.94,0.49l-3.34,3.66l-1.13,2.48l-0.26,3.16l-0.57,0.96l-1.42,1.21l-1.15,2.45l1.06,4.47l0.51,6.68l-0.18,1.18l-0.8,1.12l-4.71,3.88l-3.8,1.21l-1.6,-0.25l-1.38,-0.9l-0.38,-1.03l0.12,-1.79l-0.68,-0.91l-0.94,-0.35l-1.08,0.17l-1.12,-0.65l-1.03,-0.09l-1.27,0.49l-0.46,0.46l-1.25,0.34l-0.3,1.06l-3.34,2.02l-2.51,1.93l-2.54,1.22l-4.18,0.96l-1.9,-1.57l-1.73,0.05l-1.16,0.75l-1.7,2.04l-2.74,2.52l-2.8,0.94l-2.81,2.39l-2.61,5.09l-4.5,5.61l-1.28,3.48l-0.54,0.16l-7.39,-2.13l-4.93,-2.4l6.48,-8.62l0.2,-0.96l-0.38,-2.01l0.9,-1.4l0.3,-2.39l-0.68,-1.63l-2.08,-1.37l-0.35,-0.68l-0.73,-7.58l-0.28,-0.3l-4.41,-1.29l-0.58,-0.6l-0.34,-0.78l0.26,-2.32l-0.3,-1.75l0.2,-1.44l-0.38,-0.49l-1.68,-0.68l-3.09,0.04l-2.09,0.73l-2.67,-1.11l-2.44,-1.57l-0.5,0.05l-2.24,2.15l-3.58,2.0l-2.06,1.82l-1.39,-0.91l-1.41,-0.38l-1.94,0.15l-1.15,0.53l-1.85,1.5l-0.32,1.57l-3.05,-3.84l-0.8,-0.45l-0.82,0.05l-2.91,2.13l-1.3,0.33l-2.23,-0.68l-5.77,-0.48l-3.13,-1.27l-1.13,-0.07l-1.59,0.22l-1.19,0.59l-0.69,0.79l-0.49,1.84l-1.14,1.36l-1.45,0.91l-2.38,0.82l-1.77,-0.13l-2.09,-0.56l-0.54,-0.63l-0.58,-1.82l-0.61,-0.57l-0.75,-0.12l-0.84,0.09l-0.87,0.54l-0.87,3.07l-0.96,0.38l-5.45,-0.98l-1.73,-0.73l-1.59,0.31l-2.51,-0.75l-1.99,0.37l-1.13,0.71l-1.17,1.92l-1.16,0.49l-2.14,0.35l-18.62,-0.75l-2.52,-0.89l-2.81,-0.13l-0.82,0.26l-0.52,0.68l-0.26,3.49l-0.57,0.1l-7.47,-2.55l-2.87,-1.36l-0.61,-0.37l-1.87,-2.58l-1.86,-1.98l-1.75,-1.5l-1.95,-1.24l-1.56,-0.29l-0.91,-0.47l-1.51,-2.27l-2.33,-1.82l-2.3,-1.16l-0.74,-1.11l-0.93,-0.67l-2.82,-1.29l-2.97,-0.46l-2.17,-1.19l-0.97,-1.49l-0.25,-3.24l-0.44,-0.87l-0.84,-0.44l-4.06,0.13l-2.08,-0.85l-3.23,-2.45l2.01,-0.36l1.2,-1.27l2.29,-7.71l1.28,-2.51l0.87,-0.92l0.97,-0.42l2.4,0.17l0.81,-0.21l0.4,-0.63l0.61,-3.05l-0.25,-1.15l-0.51,-0.69l-1.92,-0.38l-2.96,-1.17l-0.41,-0.97l-0.2,-1.89l-0.89,-0.92l-0.61,-2.71l0.68,-0.39l0.48,0.1l3.55,1.62l1.31,-0.36l1.81,-1.15l0.26,-0.81l-0.17,-0.73l-2.03,-1.7l-0.19,-1.84l1.27,-4.84l2.49,-2.69l2.13,0.35l1.82,-0.33l1.01,0.17l3.8,1.89l0.86,0.04l0.37,-0.59l-0.84,-1.51l-2.92,-3.4l-1.26,-2.47l-1.39,-3.74l-0.03,-0.71l0.35,-0.49l1.87,-0.86l0.77,-1.0l0.97,-2.89l0.96,-1.83l0.25,-1.81l-0.98,-2.75l-0.7,-0.1l-0.66,0.9l-3.18,1.69l-0.99,1.19l-3.0,1.01l-4.22,2.08l-4.0,-2.02l-1.42,-1.19l-3.77,-4.47l-1.06,-1.7l-2.6,-1.24l-2.82,-2.89l-2.41,-3.13l-2.42,-2.0l-0.05,-0.64l2.67,-4.35l1.11,-5.4l-0.07,-0.8l-1.53,-2.27l0.37,-2.2l-0.6,-1.86l-0.84,-0.55l-2.47,0.42l-1.39,1.2l-1.54,2.08l-3.15,-0.38l-0.39,-0.85l0.42,-3.6l0.16,-0.97l1.22,-2.38l-0.04,-0.92l-1.15,-1.61l-1.24,-0.81l-2.51,0.02l-1.57,0.39l-0.19,-2.81l1.11,-6.37l0.25,-6.36l0.6,-2.73l1.87,-1.01l6.26,0.79l2.72,1.48l1.67,0.04l1.86,-0.6l3.37,-2.71l1.32,-1.48l2.3,-0.91l0.73,0.16l0.41,2.31l0.6,0.78l1.15,0.27l1.56,-0.35l1.03,-0.46l1.98,-1.56l1.28,-2.94l5.05,-3.78l0.86,-1.22l0.72,-2.76l4.36,-0.42l1.46,-0.46l0.58,0.24l0.74,4.55l1.01,1.14l2.21,0.86l1.05,-0.03l3.47,-1.19l1.45,0.93l2.02,0.16l0.77,-0.39l1.01,-1.15l3.82,-2.08l2.98,-3.5l1.6,-2.41l0.65,0.66l-0.1,2.4l0.71,1.89l3.26,2.69l0.87,-0.18l1.03,-0.87l1.52,-2.31l0.9,-0.82l1.59,-0.28l1.67,-1.01l0.36,0.02l2.79,2.74l2.53,0.54l2.1,-1.14l0.35,0.05l1.87,0.91l1.91,2.23l4.37,1.54l2.15,1.04l3.07,0.79l1.81,1.62l2.11,-0.11l1.44,1.82l0.91,0.53l1.02,0.26l1.6,-0.26l3.06,0.53l3.71,2.06l0.09,1.79l-1.39,3.14l-2.41,1.35l-3.05,3.26l-0.97,0.83l-1.64,0.68l-1.32,1.46l-4.87,1.37l-1.52,1.04l-0.1,0.47l0.39,0.74l3.09,2.18l1.06,0.16l0.96,-0.22l2.25,-1.77l1.94,-1.98l2.36,-0.59l1.94,-1.16l2.09,-0.76l0.35,-0.65l0.09,-1.38l2.26,-0.73l1.43,-1.02l3.23,-0.94l0.91,-1.53l0.7,-0.62l6.16,0.26l2.23,-0.95l1.05,0.83l1.1,0.19l3.61,-0.76l3.96,-2.11l2.47,-0.84l0.94,0.55l0.27,0.99l0.41,0.34l3.3,-0.16l1.54,-0.49l1.74,-1.65l0.48,-1.44l-1.55,-3.62l-0.04,-0.65l0.39,0.11l0.5,-0.46l-0.65,-3.41l-0.28,-3.71l-1.15,-2.68l-0.89,-0.68l-1.09,0.11l-1.71,1.26l-1.27,1.46l-0.43,-0.37l-0.15,-1.09l0.67,-4.06l1.6,-1.99l0.69,-2.2l0.31,-3.02l-0.27,-1.23l-1.09,-1.79l-2.52,-1.51l-0.22,-4.93l-0.36,-1.14l-3.01,-2.55l-0.91,-0.12l-1.86,0.76l0.4,-1.28l-0.35,-1.47l-1.59,-1.39l-0.56,-1.09l0.5,-4.06l-0.24,-0.45l-0.8,-0.15l-0.65,0.36l-0.91,-0.45l-2.49,-3.28l-0.83,0.23l-0.34,0.55l-1.76,0.16l-1.07,-0.97l0.01,-0.89l1.06,-1.86l-0.48,-3.5l-0.95,-1.6l-2.45,-1.05l1.19,-2.42l0.65,-3.42l1.47,-1.52l-0.23,-2.43l2.59,-7.18l0.17,-2.11l-1.77,-5.8l-3.26,-1.74l-1.29,-1.79l-2.4,-2.41l-0.16,-0.88l1.48,-0.19l5.05,-3.83l2.03,-0.63l0.56,-2.44l-0.07,-0.77l-0.55,-0.93Z", "name": "Castilla-La Mancha"}, "ES-CL": {"path": "M162.52,126.18l1.16,-1.77l0.51,-3.06l-1.09,-2.34l-4.67,-1.31l-1.95,-1.19l-0.99,-0.0l-1.3,0.43l-1.35,1.12l-0.52,0.06l-2.78,-0.63l-2.48,-0.12l0.44,-1.29l0.1,-2.25l1.16,-2.7l-0.1,-3.5l0.23,-0.61l1.74,-1.61l-0.18,-1.3l-1.28,-1.95l-0.21,-1.06l0.4,-1.33l0.91,-1.17l1.95,-0.89l1.42,-1.45l1.52,0.08l0.99,-0.42l4.33,-5.28l0.72,-2.15l-0.55,-2.95l0.1,-0.93l1.1,-1.32l0.82,-2.04l1.86,0.3l1.01,0.52l0.63,1.0l0.49,0.11l1.1,-0.52l1.47,-1.58l1.73,-0.76l4.18,-0.24l1.8,0.69l3.15,0.26l4.13,-1.22l3.47,-1.93l0.45,-0.78l-0.04,-1.03l-2.11,-1.15l-0.17,-0.53l1.94,-0.23l1.93,-0.73l0.4,-0.52l0.12,-1.13l1.27,-2.15l1.6,-0.72l0.96,0.25l1.2,0.94l2.17,0.37l2.79,1.4l1.51,0.36l0.79,-0.26l0.38,-0.6l0.16,-1.11l0.9,-0.44l4.12,1.24l1.17,-0.1l1.45,-0.76l0.49,-0.76l0.42,-1.64l0.34,-0.15l4.04,0.68l1.88,-0.43l0.77,0.7l0.44,1.91l0.71,1.24l2.49,1.8l2.01,1.21l2.93,1.26l3.86,-0.04l0.93,-0.33l0.58,-0.63l1.03,-2.67l1.6,-2.62l1.42,-0.64l2.45,0.04l1.88,0.93l3.74,0.6l1.21,0.76l1.51,0.12l1.59,-0.65l1.74,0.03l0.6,-0.6l0.7,-1.43l3.41,-0.06l1.48,-0.45l0.72,-0.77l0.52,-1.96l0.39,-0.26l0.71,-0.14l3.57,0.54l6.3,-0.77l3.53,-1.75l1.72,0.54l0.96,-0.11l1.77,-1.97l0.88,-2.73l1.16,-1.71l3.56,-1.26l2.05,-1.15l1.08,-0.99l3.39,-1.85l1.09,-0.01l1.71,1.15l1.72,2.98l-0.27,4.73l0.61,2.7l1.16,1.27l2.68,1.46l0.79,1.46l1.25,1.23l0.73,2.76l0.38,0.31l1.39,0.02l1.14,-0.35l3.27,-0.02l2.52,-0.52l3.23,0.14l2.33,-1.26l1.86,-0.18l1.8,-0.99l1.64,0.23l2.04,1.23l1.97,3.6l1.02,0.77l6.8,2.54l0.77,0.55l0.16,2.97l0.81,5.05l0.65,1.44l1.46,0.37l1.76,-1.31l1.39,-0.4l0.7,0.54l0.08,0.45l-0.42,0.74l-2.33,0.68l-0.48,0.3l-0.36,0.72l0.24,0.92l1.79,1.69l3.24,0.73l1.48,1.9l0.44,0.19l2.82,-0.85l1.82,-4.06l0.54,-0.38l-0.03,4.25l0.29,0.44l2.48,0.66l3.27,-1.02l2.28,-2.12l3.45,-0.27l0.76,-0.49l0.44,-0.73l0.01,-1.31l-0.67,-1.5l-0.11,-2.25l-0.45,-0.93l-0.7,-0.36l-0.9,-0.03l-0.94,0.53l-1.33,1.7l-0.59,-0.22l-0.17,-0.4l-0.28,-1.56l0.61,-1.3l1.79,-0.17l1.99,-1.28l0.49,-0.81l-0.15,-0.97l-0.89,-1.27l-1.2,-0.7l-1.38,0.37l-1.46,2.17l-2.72,1.36l-1.04,-0.21l-1.06,-1.41l0.07,-1.12l2.0,-5.19l2.25,-1.44l1.39,-1.53l2.76,-1.35l0.9,-1.03l0.31,-2.39l1.25,-0.35l1.96,0.15l1.41,-0.49l3.0,-2.25l2.57,-3.21l2.11,-1.93l0.98,0.13l1.58,1.13l3.87,0.82l1.84,0.85l4.54,0.45l1.97,-0.18l4.05,-1.57l5.57,-3.57l1.41,-0.26l1.57,1.23l3.73,0.28l1.33,0.21l0.38,0.36l0.01,0.54l-1.12,0.94l-0.87,2.17l0.09,1.0l0.45,0.71l1.2,0.56l0.25,0.42l-0.43,4.66l-1.06,2.06l0.07,0.44l0.96,0.7l2.09,0.6l2.67,0.25l0.97,-0.5l1.15,-2.5l0.93,-0.45l0.28,0.11l0.31,1.37l0.63,0.66l1.15,0.38l0.46,0.74l-0.56,1.38l-2.43,0.19l-0.42,0.39l0.06,1.05l0.96,1.2l0.94,0.67l1.86,0.67l0.28,0.74l-0.46,0.8l-1.5,0.34l-1.23,1.09l-3.47,0.4l-3.48,-0.86l-0.64,-1.59l-1.16,-0.89l-1.63,-0.36l-2.36,0.27l-0.87,0.66l-2.48,3.4l-0.63,1.39l0.26,1.36l3.04,3.62l1.37,0.58l0.55,-0.45l0.09,-1.02l0.84,-1.31l0.95,-0.36l1.43,-0.01l1.05,-0.86l0.88,-1.29l0.48,0.07l0.05,1.3l-1.87,2.96l-0.69,1.69l0.27,1.45l1.17,1.45l-0.42,1.27l0.38,0.55l1.21,0.09l3.57,-1.42l1.89,1.01l1.86,1.75l2.26,1.39l1.61,2.03l1.77,0.86l4.25,3.57l0.8,1.37l-4.12,1.44l-2.69,-0.78l-4.32,-0.51l-2.91,0.32l-1.13,0.5l-0.4,1.16l0.72,1.04l0.21,0.99l-1.45,2.22l-2.06,2.4l0.01,0.99l0.56,0.5l1.71,-0.29l0.5,0.23l0.07,1.02l-0.81,2.82l0.33,0.82l1.22,1.04l0.67,1.58l-0.59,2.3l0.14,3.98l-0.96,1.71l-2.23,0.83l-0.32,0.77l0.67,1.23l0.08,2.1l0.67,3.3l-0.92,4.49l-1.13,1.3l-0.1,0.8l2.22,3.49l0.73,2.0l1.46,1.09l2.02,3.39l1.18,0.56l4.83,-0.12l0.96,2.06l0.48,2.94l0.28,0.32l2.59,0.77l2.36,-1.0l1.8,-1.12l0.83,-0.89l0.46,-1.05l0.06,-2.42l1.29,-2.29l0.63,-0.41l2.14,0.01l0.37,0.22l0.23,0.92l-0.19,1.71l-1.2,1.4l-0.89,2.53l-0.03,0.96l0.48,0.71l0.96,0.5l1.89,0.21l1.81,1.21l0.76,0.17l2.93,-0.24l3.11,0.19l0.36,-0.28l2.3,-4.52l1.44,-1.5l0.41,-3.53l1.67,0.19l2.94,-2.11l1.65,-0.55l4.07,-0.32l3.27,0.38l0.75,0.52l0.61,2.5l1.39,1.29l0.84,-0.03l3.64,-1.28l1.1,-0.12l2.07,0.32l0.54,0.35l0.2,0.75l-1.6,1.53l-0.13,1.56l0.65,1.41l1.6,1.36l0.6,1.04l0.13,0.43l-0.65,0.73l-0.21,0.87l0.44,1.97l0.53,0.8l0.77,0.43l4.75,1.02l1.54,0.65l1.44,1.19l0.82,0.2l3.11,-0.68l3.77,-2.3l0.37,3.8l0.97,2.84l1.36,1.98l-0.34,1.84l-1.37,2.46l-0.24,1.1l1.81,2.98l0.72,1.85l1.41,1.48l-0.14,0.98l-1.71,3.69l-2.46,0.76l-1.38,1.4l-1.34,0.74l-1.84,2.23l-2.61,-0.53l-0.85,0.38l-1.0,1.07l-0.13,1.42l0.56,1.06l0.37,2.31l-0.18,3.04l0.23,1.54l1.28,2.24l0.62,4.19l-2.01,0.74l-2.26,1.48l-0.77,0.18l-0.39,-0.5l0.09,-2.01l-0.53,-1.39l-1.73,-0.83l-2.32,-0.26l-0.74,0.42l-0.54,0.8l-0.77,4.78l-0.71,1.09l-1.27,0.82l-0.55,0.85l-0.38,1.68l-0.1,2.91l0.94,2.32l0.69,6.67l0.95,1.32l3.52,0.81l1.83,1.69l0.03,1.11l-0.6,2.31l0.22,2.38l-0.33,-0.03l-1.15,-1.31l-2.46,-1.9l-0.72,-0.28l-0.93,0.44l-2.06,2.0l-3.78,0.11l-1.71,1.19l-1.71,0.69l-2.3,0.2l-1.71,-1.11l-1.04,-0.23l-2.91,1.35l-0.69,-0.03l-1.7,-0.76l-1.03,-0.87l-0.9,-2.39l-1.66,-1.06l-1.2,-2.49l-0.97,-0.45l-2.24,0.99l-0.88,-0.23l0.48,-1.1l-0.0,-0.81l-0.5,-0.77l-1.37,-0.84l0.85,-0.6l0.46,-0.75l0.12,-0.85l-0.39,-0.57l-0.82,-0.22l-1.22,0.19l-1.14,-1.15l-1.19,-0.62l-2.81,-0.63l-0.61,-0.33l-1.46,-1.87l-1.64,-0.11l-2.04,1.14l-1.47,0.09l-2.41,-0.67l-1.1,-0.79l-1.05,-3.13l-1.47,-0.8l-0.97,-0.05l-1.4,0.54l-1.08,1.6l-0.89,0.57l-1.38,0.35l-6.58,0.56l-7.54,-1.78l-1.79,0.85l-1.82,2.18l-1.84,0.05l-0.88,0.49l-3.09,0.6l-3.18,-0.17l-1.73,-0.72l-0.47,0.13l-0.22,0.68l0.83,1.42l-0.26,2.29l-1.93,0.58l-5.06,3.85l-1.62,0.01l-3.06,0.67l-2.21,1.34l-4.08,4.82l-3.88,2.93l-2.9,4.79l-1.09,0.74l-5.65,1.95l-0.85,0.67l-2.17,2.84l-0.93,1.68l-0.35,1.27l0.2,1.87l-0.88,2.1l-0.34,2.63l-0.98,2.46l-1.98,0.64l-2.86,-0.37l-2.08,1.37l-4.81,7.31l-0.46,1.71l-0.34,3.76l-1.16,0.69l-2.97,0.88l-1.28,-0.59l-0.87,-1.44l-1.09,0.13l-0.35,0.67l0.42,2.65l-0.28,1.45l-1.45,1.53l-0.57,1.1l0.02,5.33l0.23,1.15l-0.87,3.08l0.28,1.51l-2.92,0.6l-1.85,-0.4l-1.32,0.69l-0.98,1.39l-0.56,3.3l-1.06,1.94l-0.67,0.45l-1.54,0.27l-1.69,-1.85l-1.02,0.08l-0.47,0.64l-0.03,0.78l0.45,2.95l-1.18,2.25l-0.57,2.96l-0.8,1.31l-1.87,0.78l-2.26,0.42l-2.36,-1.1l-0.43,-0.93l-0.59,-4.04l-0.66,-0.71l-5.31,0.89l-1.34,-0.03l-0.76,0.69l-0.57,2.64l-0.71,0.95l-5.02,3.75l-1.3,2.96l-1.8,1.4l-2.23,0.69l-0.72,-0.2l-0.75,-2.88l-0.72,-0.46l-0.83,0.05l-2.6,1.05l-1.37,1.52l-3.31,2.65l-1.52,0.46l-1.39,-0.05l-2.71,-1.47l-6.25,-0.79l-2.06,-3.94l-0.15,-4.38l0.91,-2.48l0.02,-0.48l-0.42,-0.64l-1.63,-0.05l-3.33,0.98l-3.72,3.41l-1.3,0.44l-2.47,0.08l-2.4,-0.85l-1.61,-0.94l-1.54,-2.12l-4.07,-3.32l-2.69,-1.08l-2.49,0.79l-1.18,-0.13l-0.28,-0.42l0.69,-1.6l-0.07,-0.94l-0.94,-1.7l-0.87,-0.26l-4.94,1.89l-0.6,0.53l-0.94,2.32l-0.81,0.63l-0.69,-0.05l-3.96,-1.82l-2.35,-2.13l-4.46,-2.15l1.56,-3.23l-0.05,-0.81l-0.52,-0.5l-2.09,-0.89l-0.38,-0.35l-0.14,-0.97l-0.29,-0.32l-1.74,-0.58l-1.73,-1.69l-2.26,-1.47l-1.4,-0.3l-0.99,0.13l-3.63,2.38l-2.08,0.5l-1.82,1.42l-0.89,1.75l-0.49,0.33l-2.65,0.7l-2.02,1.89l-4.85,2.06l-2.07,1.63l-0.83,1.15l0.26,2.53l-0.98,1.22l-5.49,1.23l-2.13,1.02l-1.91,-0.78l-0.71,0.12l-2.03,1.09l-1.7,-0.32l-1.85,0.37l-1.73,-0.88l-1.89,-1.94l0.22,-1.03l3.78,-3.11l1.22,-2.17l-0.08,-0.48l-2.18,-2.06l-1.46,-2.39l-0.36,-2.64l1.16,-2.9l1.52,-2.16l0.25,-1.21l-0.42,-1.77l-1.95,-2.78l-0.13,-1.34l2.38,-5.68l-0.14,-2.68l-1.5,-6.94l0.37,-3.44l-0.29,-1.56l0.08,-1.89l1.08,-0.55l0.27,-1.3l-0.48,-1.37l-1.7,-0.8l-0.42,-0.56l-1.99,-5.41l-0.98,-1.63l-2.63,-3.07l-0.11,-0.87l0.69,-1.18l0.23,-1.44l1.1,-0.57l3.94,0.36l2.12,-0.31l0.95,-0.96l2.66,-3.99l0.55,-1.59l-0.13,-2.23l0.19,-0.48l3.19,-3.13l0.87,-2.03l2.96,-4.22l5.28,-0.24l4.62,-2.16l2.28,-1.77l2.12,-2.19l2.04,-3.32l0.95,0.13l0.52,-0.34l0.22,-1.84l1.26,-0.68l2.0,-0.15l0.37,-0.39l0.01,-0.64l2.45,-3.96l-0.13,-2.0l0.35,-0.74l1.7,-1.81l3.15,-4.65l-0.01,-0.47l-1.58,-2.16l-2.82,-2.98l-3.11,-2.03l-3.28,-1.21l-5.42,-1.12l-1.18,0.07l-1.74,1.52l-1.45,0.62l-1.61,-0.61l-0.79,-1.24l-0.52,-3.36l-0.9,-2.18l1.1,-2.31l1.61,-7.23l0.74,-1.63l-0.24,-0.54l-2.8,-0.75l-0.31,-0.37l0.51,-3.78l-0.35,-1.66l-1.04,-1.18l-1.6,-0.68l-0.52,0.2l-0.81,1.73l-2.02,0.63l-4.58,0.2l-1.76,-0.54l-2.33,-3.61l-2.29,-0.53l-0.46,0.33l-0.39,2.46l-1.32,0.83l-3.95,0.33l-1.7,-0.35l-2.26,-1.59l-0.22,-1.97l1.37,-3.42l-0.04,-0.71l-0.82,-1.4l-0.58,-0.41l-1.51,-0.05l-0.74,-0.36l-0.41,-0.72l0.17,-0.5l0.87,-0.89l1.57,-2.48l2.06,-1.61l1.04,-3.02l2.7,-2.99l1.98,-1.42l1.35,-0.32l2.65,0.24l0.64,-2.01l1.95,-2.11l1.69,-2.69l0.42,-1.23l0.17,-3.23l-0.4,-1.17l-1.07,-1.18l-2.2,-1.44l-2.81,-2.38ZM438.75,93.85l2.44,-0.16l1.46,1.35l1.25,0.18l-1.12,2.72l-1.61,0.88l-0.13,1.15l1.89,2.42l0.65,0.43l1.13,-0.12l1.44,-1.18l0.53,1.78l0.02,1.12l-1.08,0.39l-0.41,-0.53l-0.94,-0.34l-5.01,-0.12l-3.31,-1.38l-4.45,-1.03l-3.99,-1.86l-1.7,-1.29l-1.79,-2.16l2.36,-3.54l0.82,-0.45l4.13,-0.26l1.7,0.17l5.71,1.86Z", "name": "Castilla y Le\u00f3n"}, "ES-MD": {"path": "M311.9,319.04l0.76,-1.29l0.55,-2.88l1.21,-2.32l0.12,-0.77l-0.52,-3.01l0.31,-0.18l1.05,1.37l0.81,0.53l2.15,-0.36l0.89,-0.65l1.16,-2.11l0.61,-3.44l0.73,-0.98l0.9,-0.49l1.75,0.41l2.63,-0.41l1.03,-0.67l-0.24,-1.73l0.87,-3.12l-0.24,-6.45l1.99,-2.51l0.32,-1.67l-0.41,-1.95l0.12,-0.8l1.23,1.64l1.33,0.46l3.35,-0.92l1.5,-0.91l0.95,-5.74l4.63,-7.03l1.78,-1.17l2.7,0.4l1.94,-0.47l0.64,-0.6l1.04,-2.63l0.32,-2.57l0.9,-2.19l-0.18,-1.96l0.3,-1.06l2.94,-4.26l0.59,-0.48l6.36,-2.36l0.69,-0.57l2.86,-4.74l3.83,-2.88l3.99,-4.75l1.99,-1.23l2.59,-0.57l0.31,1.34l2.46,2.46l1.34,1.84l3.09,1.55l1.7,5.49l-0.15,1.81l-2.61,7.26l0.28,2.26l-1.45,1.48l-0.69,3.5l-1.23,2.47l0.35,0.96l2.36,0.9l0.74,1.28l0.43,3.13l-1.01,1.66l-0.22,1.06l0.75,1.15l1.06,0.73l2.08,-0.13l0.86,-0.79l2.2,3.12l1.36,0.62l0.84,-0.32l-0.41,4.03l0.71,1.38l1.49,1.23l0.28,1.08l-0.44,1.16l0.15,0.57l0.33,0.34l0.75,0.08l1.67,-0.8l0.43,0.08l2.68,2.31l0.32,2.75l-0.09,2.43l0.28,0.77l2.66,1.68l0.93,1.57l0.19,0.83l-0.3,1.25l0.08,1.27l-0.7,2.36l-1.66,2.13l-0.66,3.37l0.14,2.22l0.56,0.81l0.83,0.13l3.2,-2.82l0.37,-0.06l0.55,0.38l1.28,3.44l0.03,2.61l0.54,2.86l-0.59,0.24l-0.24,0.57l0.51,2.15l1.11,2.12l-0.34,0.98l-1.52,1.42l-1.17,0.36l-2.9,0.14l-0.52,-1.15l-1.51,-0.72l-2.73,0.93l-3.94,2.1l-3.44,0.71l-2.1,-1.05l-2.19,0.98l-6.23,-0.26l-1.16,0.87l-0.76,1.4l-3.1,0.88l-1.51,1.06l-2.24,0.71l-0.57,0.76l-0.01,1.35l-1.86,0.64l-1.91,1.15l-2.49,0.65l-2.04,2.05l-2.08,1.65l-0.59,0.16l-0.89,-0.14l-1.98,-1.27l-0.85,-0.94l1.05,-0.69l5.0,-1.43l1.42,-1.54l1.58,-0.63l1.06,-0.9l3.06,-3.27l2.45,-1.38l0.96,-1.63l0.71,-2.33l-0.05,-1.55l-1.02,-1.11l-3.45,-1.71l-3.15,-0.54l-1.7,0.26l-0.68,-0.19l-0.7,-0.41l-1.65,-1.95l-0.74,-0.16l-1.47,0.23l-1.75,-1.6l-3.11,-0.8l-2.12,-1.03l-4.25,-1.48l-1.76,-2.13l-2.15,-1.08l-0.99,-0.02l-1.88,1.08l-2.03,-0.48l-2.97,-2.8l-0.85,0.02l-1.57,0.98l-1.77,0.35l-1.16,1.06l-1.03,1.76l-1.46,1.28l-0.83,-0.93l-1.1,-0.49l-0.9,-0.88l-0.62,-1.59l0.04,-2.62l-0.36,-0.63l-0.92,-0.53l-0.8,0.29l-1.54,2.43l-2.0,2.08l-0.93,1.37l-0.85,0.6l-2.84,1.38l-1.49,1.42l-1.62,-0.14l-1.1,-0.73Z", "name": "Comunidad de Madrid"}, "ES-MC": {"path": "M493.61,553.66l-1.62,-1.21l-10.65,-16.46l-0.22,-4.04l0.61,-2.66l-0.5,-4.32l0.57,-1.79l0.15,-2.54l0.96,-1.47l-0.03,-1.01l-0.68,-0.51l-6.15,-0.85l-3.19,-1.47l-3.08,0.16l-3.83,-2.41l-1.87,-2.2l-2.35,-3.99l-2.59,-2.03l0.84,-2.69l4.82,-6.13l2.54,-4.99l2.6,-2.23l2.93,-1.02l2.79,-2.57l1.71,-2.05l0.95,-0.6l0.99,-0.05l2.15,1.65l4.55,-0.99l2.72,-1.3l2.53,-1.94l3.43,-2.08l0.39,-1.05l0.94,-0.21l1.51,-0.9l0.71,0.06l1.12,0.66l1.77,0.04l0.45,0.8l-0.22,1.24l0.28,1.13l1.04,1.11l1.52,0.67l1.54,0.08l4.05,-1.32l4.79,-3.94l1.04,-1.5l0.21,-1.4l-0.51,-6.74l-1.07,-4.25l1.03,-2.15l1.37,-1.14l0.7,-1.19l0.29,-3.27l1.06,-2.28l1.98,-2.4l1.83,-1.35l1.45,1.27l0.96,0.05l3.88,-2.15l2.91,-2.55l3.77,-0.98l2.85,0.87l0.71,0.54l0.7,2.42l5.4,4.41l1.06,5.24l-0.01,2.07l-0.86,3.61l-0.02,2.54l-0.66,1.0l-3.0,3.0l-0.5,1.11l-0.16,1.35l0.04,3.51l0.5,2.17l0.79,0.46l3.68,1.02l1.0,0.73l0.67,1.08l0.92,3.26l-1.09,6.17l-2.79,5.07l-0.32,1.66l0.47,3.24l2.92,4.5l3.92,7.15l2.3,2.83l3.4,3.43l1.76,0.67l1.75,1.36l1.49,-0.05l0.22,2.88l-1.36,-1.68l-0.69,0.11l-1.58,4.3l-0.72,0.61l-1.64,0.63l-0.58,1.37l0.24,1.56l2.99,5.02l3.81,2.19l1.31,0.16l0.75,-0.86l0.76,0.44l0.34,0.73l-0.2,0.72l-1.82,1.5l-1.28,-0.35l-5.29,2.26l-3.3,0.19l-2.44,1.43l-3.13,-1.61l-2.23,-0.43l-4.2,-0.1l-2.35,0.54l-0.87,0.72l-0.46,0.95l0.17,1.04l-3.32,-0.99l-1.14,-0.97l-2.52,-0.73l-0.88,-0.01l-3.61,0.99l-3.07,0.3l-2.32,1.18l-2.96,2.91l-1.0,0.65l-1.68,0.46l-1.12,0.94l-0.5,0.98l-0.76,3.17l-0.27,0.22l-0.62,-0.36l-0.72,0.02l-1.88,1.5l-4.9,1.87l-1.33,0.92l-5.48,-4.26l-4.2,-1.04l-0.54,0.17l-0.47,0.84ZM563.77,527.63l0.41,0.74l-0.34,1.05l0.02,-0.95l-0.09,-0.83ZM564.04,533.2l0.1,0.35l-0.07,-0.08l-0.03,-0.27Z", "name": "Regi\u00f3n de Murcia"}, "ES-AN": {"path": "M116.64,543.93l-0.02,-0.49l0.9,-1.18l0.18,-1.61l2.73,-3.01l0.93,-5.28l0.87,-2.42l1.1,-1.62l6.02,-5.08l1.91,-3.36l2.56,-8.33l-0.25,-2.27l2.96,-1.14l2.35,0.41l1.95,-0.74l1.28,-1.33l1.07,-2.2l0.88,0.09l3.68,1.52l1.87,-0.17l0.34,-0.29l0.53,-1.98l0.64,-1.11l0.56,-2.49l1.21,-2.5l1.43,-4.11l0.62,-2.52l0.68,-0.56l8.6,2.93l0.24,0.84l-1.36,3.32l0.21,0.68l0.71,0.56l3.71,1.33l3.12,0.06l1.61,-0.25l2.08,0.18l1.66,0.54l2.02,2.35l0.42,2.3l0.74,0.67l3.1,0.21l1.58,0.52l1.13,-0.1l2.58,-3.06l1.3,-0.33l3.18,2.03l1.26,2.72l1.65,0.45l8.52,3.53l1.07,1.03l0.56,-0.01l2.86,-2.4l1.56,-0.82l9.06,-1.67l1.71,-0.84l0.89,-1.05l0.66,-1.94l1.34,-2.14l0.01,-0.84l-0.78,-1.58l0.43,-1.49l0.87,-1.01l2.26,-1.49l1.88,-2.39l1.87,-0.7l4.3,-0.59l0.69,0.13l0.8,0.62l1.3,1.83l-2.28,1.43l-0.49,0.64l-0.04,0.6l0.53,2.58l0.63,0.56l0.74,0.13l1.45,-0.29l4.5,-3.74l2.94,0.06l2.83,-2.29l0.47,-0.76l0.22,-2.17l0.68,-1.23l0.13,-2.49l-0.36,-2.88l-1.62,-3.88l-1.28,-1.61l0.47,-2.92l-0.3,-0.99l-0.75,-0.99l0.4,-2.31l1.18,-1.15l4.05,-2.02l1.59,-2.11l3.01,-2.29l0.58,-0.84l0.7,-1.98l1.3,-1.83l1.05,-0.96l3.61,-0.13l1.4,-2.39l2.08,-1.8l2.95,-2.03l2.08,-0.72l0.96,-2.44l-0.28,-1.54l0.5,-0.24l5.16,-0.12l1.17,-0.52l1.57,-0.22l3.65,2.78l2.28,0.95l4.19,-0.1l0.42,0.26l0.45,3.74l1.24,1.88l2.41,1.31l2.21,0.23l3.4,1.43l0.79,0.56l0.79,1.16l2.38,1.21l2.24,1.75l1.52,2.28l1.23,0.64l1.45,0.26l1.78,1.14l1.66,1.42l1.82,1.94l1.91,2.62l0.77,0.5l2.99,1.42l7.71,2.6l1.08,-0.17l0.33,-0.39l0.04,-3.05l0.47,-0.84l0.41,-0.08l2.53,0.12l2.58,0.91l18.81,0.75l2.23,-0.37l1.43,-0.59l1.22,-1.98l0.91,-0.59l1.76,-0.32l2.33,0.75l1.58,-0.32l1.72,0.73l4.72,1.0l1.04,-0.02l1.46,-0.71l0.76,-2.94l1.19,-0.42l0.7,0.36l0.76,2.2l0.62,0.47l2.34,0.64l2.02,0.13l2.61,-0.88l1.58,-0.99l1.4,-1.67l0.24,-1.27l0.64,-1.01l0.93,-0.48l1.41,-0.2l0.92,0.04l3.15,1.27l5.86,0.49l2.32,0.69l1.71,-0.44l1.06,-0.97l2.14,-1.1l2.29,2.93l1.55,1.44l0.5,-0.05l0.35,-0.43l0.28,-1.53l1.55,-1.23l0.95,-0.45l1.65,-0.14l3.14,1.28l2.29,-1.95l3.6,-2.02l2.09,-2.0l2.27,1.45l2.86,1.18l3.39,-0.86l1.72,0.07l1.49,0.6l-0.21,1.28l0.3,1.75l-0.26,2.29l0.23,0.84l1.17,1.27l4.29,1.26l0.72,7.49l0.57,0.99l1.97,1.25l0.52,1.2l-0.26,2.09l-0.94,1.53l0.29,2.67l-6.72,8.95l0.15,0.59l5.44,2.64l6.9,2.1l1.53,-0.12l2.55,1.98l2.28,3.91l1.96,2.31l4.08,2.58l3.22,-0.12l3.2,1.47l6.33,1.05l-1.04,1.83l-0.16,2.6l-0.58,1.83l0.49,4.43l-0.61,2.6l0.01,3.41l0.28,1.01l10.72,16.58l0.84,0.85l1.53,0.76l0.48,-0.22l0.49,-0.86l3.78,0.96l5.15,4.01l-2.19,1.85l-1.29,3.21l-1.91,2.77l-3.85,3.89l-1.78,2.49l-1.16,3.37l-1.65,7.45l-1.93,4.97l-1.43,2.47l0.4,3.69l-0.54,0.39l-1.96,0.33l-3.27,2.53l-1.01,1.29l-0.66,3.31l-2.81,2.84l-0.95,2.86l-1.8,0.74l-0.85,1.69l-0.9,0.7l-2.37,0.67l-2.29,-0.73l-5.23,-6.0l-2.41,-1.5l-2.95,-0.76l-1.36,0.25l-2.2,1.15l-1.19,0.27l-3.27,-1.11l-5.76,0.97l-1.2,0.74l-1.7,2.66l-1.36,3.68l-2.63,2.64l-1.57,0.68l-1.68,0.3l-1.38,-0.4l-1.18,0.5l-3.7,-2.19l-0.87,0.16l-1.05,0.9l-0.47,-0.27l-1.76,-2.35l-1.73,-0.98l-1.37,-0.11l-2.44,0.36l-16.91,-1.12l-6.78,0.82l-3.39,2.6l-2.73,1.03l-2.3,-0.06l-9.7,-2.82l-1.44,-1.04l-4.47,1.16l-2.79,0.22l-5.01,-1.6l-2.94,-0.31l-6.69,1.83l-6.41,-0.77l-1.71,0.15l-7.69,2.54l-1.75,0.24l-11.87,-0.93l-1.28,0.42l-0.94,0.86l-2.2,3.88l-1.61,2.2l-0.7,1.96l-7.88,4.98l-1.39,2.8l-0.95,0.72l-4.06,1.15l-2.65,-0.07l-8.18,-1.53l-1.67,-0.05l-6.06,3.29l-4.46,1.16l-3.13,1.93l-3.18,0.57l-1.99,0.91l-2.79,4.47l-1.29,1.36l-1.66,4.12l-1.2,1.06l-1.04,0.4l-0.25,0.42l0.38,1.82l-2.91,4.49l-0.33,0.95l-0.29,3.5l-0.7,0.0l-0.53,-1.29l-1.14,-0.8l-1.55,-0.56l-1.4,-0.07l-1.22,1.78l-0.29,1.04l0.04,1.29l0.39,1.01l-0.28,0.72l0.72,2.16l-0.17,0.72l-1.04,1.4l-7.59,2.32l-1.56,0.71l-2.23,-1.87l-3.94,-2.49l-1.82,0.48l-2.55,-1.23l-2.7,-0.79l-0.9,-0.83l-1.44,-2.11l-4.3,-4.21l-1.33,-0.88l-1.73,-0.04l-2.83,0.54l-2.5,-0.94l-1.61,-2.13l-2.79,-5.19l-3.22,-2.47l-1.01,-3.94l-3.62,-7.62l-1.81,-2.51l-1.47,-2.84l-1.71,-1.55l0.52,-0.03l1.99,1.83l0.4,0.52l-0.21,0.86l1.53,1.99l0.39,0.13l0.82,-0.19l0.74,-0.63l2.09,-2.67l-0.26,-0.66l-1.9,0.37l-0.84,-0.12l-0.4,-0.94l0.38,-2.6l-0.58,-1.57l-2.83,-2.66l-0.86,-0.41l-5.49,-0.57l-0.84,-0.88l-0.8,-3.23l-1.62,-3.11l-0.38,-1.39l0.26,-1.28l1.12,-1.22l3.56,-1.44l1.11,-0.99l0.71,-2.12l-0.55,-3.37l0.33,-1.75l2.0,-1.74l5.53,0.24l1.88,-2.46l-0.03,-0.52l-0.52,-0.06l-2.82,1.48l-1.45,0.03l-1.51,-1.04l-2.8,1.09l-1.33,1.0l-0.67,2.08l0.37,4.89l-0.25,0.59l-1.88,0.03l-1.71,-2.23l-2.12,-5.43l-1.51,-2.65l-1.93,-2.06l-16.24,-11.76l-1.8,-0.98l-2.63,-0.89l-2.68,-2.23l-2.61,-1.28l-1.09,-1.7l-0.4,-1.96l3.47,-5.04l0.75,-1.47l-0.13,-0.51l-0.52,0.07l-3.32,3.75l-1.69,1.2l-1.95,0.01l-0.4,0.4l0.06,0.73l1.43,2.21l0.72,1.8l-0.36,0.04l-5.68,-2.8l-2.18,-0.72l-5.3,-0.53l-0.42,0.29l0.2,0.47l0.88,0.45l-13.06,0.33l-1.26,0.54l-1.21,1.12l-0.99,0.12l-1.9,-0.92l-1.27,-5.23l0.42,-1.39l-0.65,-2.69l-0.49,-6.56l-1.13,-2.61l0.13,-0.92l-0.6,-3.93l-0.52,-1.67l-2.56,-2.85l-0.53,-2.14l-0.35,-0.25Z", "name": "Andaluc\u00eda"}, "ES-EX": {"path": "M115.01,365.36l13.6,0.65l3.27,-0.98l2.58,0.08l1.09,-0.32l1.47,0.85l2.05,0.09l9.78,-1.21l1.07,-0.44l0.98,-2.05l-0.22,-2.09l1.33,-2.99l-0.45,-2.49l0.79,-1.31l2.26,-1.13l1.72,-2.61l0.4,-3.12l-0.23,-1.71l1.03,-1.23l0.63,-2.84l-0.09,-1.02l1.39,-3.05l-2.66,-4.8l-2.44,-3.38l-1.54,-0.99l-2.43,-0.45l-0.65,-0.98l-0.46,-2.86l-0.49,-1.18l1.61,-3.51l3.92,-2.34l3.92,-0.24l1.22,-0.84l0.35,-0.75l2.07,2.06l1.56,0.59l1.9,-0.36l1.98,0.28l2.44,-1.16l1.13,0.63l1.03,0.11l2.16,-1.04l4.66,-0.88l1.01,-0.44l1.05,-0.98l0.31,-1.43l-0.34,-1.7l0.62,-0.87l2.01,-1.58l4.74,-1.99l1.99,-1.88l2.71,-0.72l0.76,-0.57l0.84,-1.7l1.56,-1.23l2.86,-0.85l2.83,-2.01l1.7,0.15l2.15,1.39l1.79,1.73l1.72,0.62l0.22,1.06l0.53,0.5l2.42,1.19l-1.13,2.74l-0.49,0.47l-0.11,0.54l0.36,0.48l4.58,2.22l2.38,2.15l4.13,1.9l0.98,0.09l0.9,-0.43l0.54,-0.59l0.93,-2.31l0.35,-0.29l4.48,-1.76l0.35,0.06l0.72,1.31l-0.07,1.09l-0.59,1.3l0.65,1.04l1.81,0.23l2.15,-0.78l2.51,1.0l3.84,3.16l1.63,2.2l1.79,1.04l2.5,0.89l2.73,-0.06l1.11,-0.29l0.66,-0.33l3.51,-3.28l4.19,-0.99l-0.83,2.81l0.15,4.6l2.04,4.03l-1.72,0.87l-0.54,1.19l-0.36,2.19l-0.24,6.31l-1.11,6.38l0.02,2.38l0.31,1.18l0.54,0.27l1.78,-0.5l2.2,-0.04l0.87,0.59l0.99,1.36l-0.15,0.86l-1.07,1.95l-0.61,4.75l0.25,0.9l0.65,0.69l3.37,0.5l0.88,-0.52l1.33,-1.9l1.26,-1.08l1.55,-0.31l0.6,0.22l0.51,1.59l-0.38,2.2l1.55,2.3l0.06,0.53l-1.08,5.26l-2.6,4.18l-0.19,0.66l0.22,0.75l2.52,2.16l2.42,3.14l2.85,2.92l2.65,1.28l3.62,4.87l2.68,2.52l4.7,2.18l4.32,-2.15l3.11,-1.06l1.01,-1.2l3.19,-1.69l0.4,-0.48l0.69,1.95l-0.2,1.33l-0.96,1.86l-0.96,2.86l-1.08,1.06l-1.43,0.57l-0.56,0.94l0.04,0.88l1.45,3.98l1.27,2.51l3.43,4.31l-3.78,-1.88l-1.31,-0.19l-1.7,0.33l-1.77,-0.36l-0.78,0.12l-2.76,2.96l-1.37,5.14l0.23,2.27l2.02,1.68l-0.02,0.83l-2.45,1.14l-3.95,-1.72l-0.77,0.19l-0.66,0.54l-0.1,0.88l0.62,2.55l0.89,0.98l0.18,1.73l0.54,1.26l0.69,0.57l2.73,0.92l1.6,0.23l0.48,1.1l-0.75,3.17l-2.87,-0.12l-1.21,0.53l-1.1,1.16l-1.36,2.68l-1.6,5.96l-1.16,2.35l-4.59,1.08l-1.1,0.5l-5.16,0.12l-0.89,0.39l-0.37,0.7l0.35,1.37l-0.73,1.99l-1.91,0.61l-3.05,2.11l-2.2,1.91l-0.83,1.15l-0.35,1.04l-2.53,-0.12l-1.13,0.29l-1.2,1.09l-1.35,1.89l-1.24,2.76l-2.98,2.26l-1.46,1.99l-4.03,2.01l-1.44,1.4l-0.55,2.48l1.08,2.24l-0.47,3.02l1.36,1.86l1.58,3.8l0.31,2.67l-0.11,2.21l-0.67,1.22l-0.46,2.57l-2.66,2.16l-2.89,-0.08l-4.57,3.78l-0.98,0.19l-0.77,-0.35l-0.37,-2.51l2.33,-1.41l0.47,-0.89l-0.45,-1.1l-1.15,-1.31l-0.91,-0.7l-1.15,-0.24l-4.41,0.6l-2.06,0.76l-0.78,0.6l-1.34,1.96l-2.21,1.43l-1.06,1.26l-0.53,1.96l0.78,2.13l-1.28,1.96l-0.66,1.94l-0.65,0.76l-1.42,0.7l-9.18,1.71l-1.69,0.9l-2.69,2.21l-0.96,-0.89l-10.15,-3.99l-1.13,-2.6l-3.49,-2.2l-0.93,-0.04l-1.13,0.55l-2.28,2.88l-5.36,-0.64l-0.69,-2.61l-1.25,-1.73l-0.99,-0.85l-1.96,-0.67l-2.23,-0.2l-1.65,0.26l-3.03,-0.06l-3.4,-1.23l-0.49,-0.52l1.34,-3.13l0.0,-0.74l-0.39,-0.82l-9.19,-3.24l-1.25,0.79l-0.95,-0.57l-3.94,0.57l-0.45,0.15l-0.75,1.04l-1.47,0.67l-2.38,0.32l-1.36,-1.29l-2.71,-6.86l-1.9,-1.65l-1.0,-2.14l-6.98,-9.01l-2.43,-1.7l1.33,-1.8l0.0,-1.23l-0.61,-0.89l0.55,-0.87l1.18,-4.18l2.72,-3.96l0.41,-1.28l-0.2,-0.89l-1.15,-1.1l-0.11,-1.38l0.57,-4.73l0.85,-1.91l3.76,-3.09l1.04,-0.44l1.1,-0.92l1.82,-2.34l3.04,-0.68l1.19,-0.61l2.07,-1.78l0.43,-2.77l-0.79,-1.67l1.24,-1.05l1.47,-2.05l3.3,-6.32l-0.11,-0.77l-0.69,-0.69l0.38,-1.41l-0.42,-1.66l-0.97,-1.63l-1.12,-1.11l-1.57,-1.09l-1.84,-0.53l-1.89,0.19l-2.37,1.25l-1.69,-0.59l-0.54,-0.54l-0.06,-0.47l0.85,-2.52l-0.84,-1.87l-5.1,-2.25l-0.83,-1.2l-0.47,-1.58l0.09,-1.62l0.84,-1.48l-0.04,-0.45l-3.28,-4.03l-1.23,-1.0l-0.43,-0.87l-0.33,-3.53l0.85,-2.42l0.35,-2.02l-0.04,-2.02l-0.73,-1.05l-2.74,-0.73l-1.33,-0.64l-0.88,-0.72l-0.59,-1.77l-0.63,-0.85l-2.31,-1.25l-1.04,-1.0l-1.94,-2.6l-1.17,-1.08l-2.46,-6.71Z", "name": "Extremadura"}, "ES-VC": {"path": "M549.58,507.02l-1.08,-2.21l-2.49,-3.52l-0.66,-2.24l-0.13,-1.58l0.62,-2.31l1.9,-2.87l0.56,-1.31l1.1,-5.37l0.01,-1.2l-0.95,-3.37l-0.85,-1.37l-1.27,-0.91l-4.09,-1.18l-0.4,-1.82l-0.03,-3.4l0.53,-2.05l3.36,-3.42l0.57,-1.41l-0.13,-2.05l0.85,-3.54l0.03,-2.27l-1.04,-5.15l3.96,-0.26l1.25,-0.48l2.07,-1.47l0.48,-0.64l-0.07,-0.53l-2.54,-3.56l-0.7,-2.49l0.2,-0.9l1.84,-1.23l0.66,-2.57l-0.88,-3.19l0.31,-2.72l-2.54,-4.6l-1.65,-0.98l-1.34,-0.11l-1.5,0.87l-1.08,0.25l-1.81,-0.06l-3.55,0.46l-0.75,-0.39l-1.06,-0.85l-6.35,-7.55l-0.78,-1.97l0.1,-1.45l1.86,-4.85l1.94,-2.58l1.38,-3.7l0.33,-1.93l-0.13,-1.96l0.52,-2.65l-0.13,-0.82l-0.63,-0.86l-8.76,-2.83l-1.27,-0.08l-3.55,-2.24l-1.49,-0.52l-2.43,0.34l-0.61,-2.19l-1.73,-1.32l-0.33,-0.81l-1.02,-0.39l-0.96,-1.38l-0.04,-0.7l0.76,-2.07l-0.05,-0.97l0.58,-0.97l-0.3,-0.63l0.22,-2.57l-0.24,-1.44l0.46,-1.03l1.3,-0.98l0.81,-1.06l2.38,-4.74l2.94,-2.9l1.46,-0.21l2.2,1.04l1.35,0.05l1.43,-0.52l1.04,-1.05l0.33,-0.78l-0.33,-2.76l0.21,-1.34l2.73,-4.54l1.52,-5.81l0.41,-4.81l-0.63,-1.72l0.51,-0.74l2.45,-1.11l0.69,-0.58l1.14,0.59l4.92,-1.25l3.48,-0.03l1.7,0.42l3.15,1.5l0.84,1.01l0.2,0.55l-0.47,2.39l0.52,1.13l0.12,2.44l0.44,0.69l1.59,0.8l2.21,-0.31l3.67,-1.91l0.18,-0.53l-0.47,-0.95l-1.71,-1.59l-0.52,-1.02l-0.41,-2.2l0.46,-2.22l0.37,-0.47l3.3,-1.77l0.66,-0.82l0.7,-2.41l1.89,0.05l2.52,-0.39l4.71,-2.39l0.31,-0.79l-0.33,-2.49l2.23,-2.31l0.89,-1.66l0.17,-1.39l0.76,-1.42l0.27,-1.31l0.13,-2.9l0.59,-0.24l2.28,0.87l3.35,-0.5l3.09,-1.34l0.68,-0.63l0.5,-0.8l-0.01,-2.55l2.15,-1.87l1.66,-2.39l2.56,-1.69l0.55,-0.85l-0.23,-1.76l-1.25,-1.69l-1.78,-1.62l-0.24,-1.01l0.87,-0.99l2.99,-1.26l0.59,-0.73l-0.57,-2.18l-1.12,-1.11l0.33,-1.74l-0.37,-3.7l0.27,-2.52l-0.82,-0.69l-1.64,0.41l-2.9,-1.06l-0.2,-2.75l0.51,-0.95l1.26,-0.47l0.92,0.17l1.01,0.7l0.81,0.04l4.82,-2.79l0.53,-0.88l0.36,-3.73l1.76,-2.48l0.56,-0.23l1.02,-0.04l0.78,0.38l2.11,1.88l3.15,2.01l1.73,0.32l3.32,-0.2l0.91,0.25l0.48,0.88l0.1,1.17l0.8,0.57l0.83,-0.02l1.85,-1.44l1.21,-0.54l3.33,-0.26l1.88,-0.71l1.6,0.3l1.25,-0.24l0.66,1.38l0.84,0.85l1.55,0.53l1.19,0.98l-0.65,1.49l-0.08,0.93l0.53,1.44l0.69,0.78l1.71,0.94l4.65,1.63l1.99,1.09l1.03,0.96l0.3,1.33l1.12,1.3l4.23,1.82l-0.93,2.28l-3.21,4.32l-0.46,2.24l-1.69,1.76l-4.58,8.9l-3.38,3.25l-2.27,3.21l-3.11,3.28l-4.83,8.03l-1.75,1.87l-4.22,2.71l-1.73,2.55l-2.84,6.08l-1.67,2.54l-4.16,4.67l-6.81,11.37l-0.98,4.44l-3.18,4.08l-0.81,1.5l-0.78,2.51l-2.07,3.04l-0.73,1.64l-0.46,3.51l0.12,3.84l0.52,3.75l1.69,6.19l4.46,11.36l-0.17,0.7l-0.95,0.94l-0.21,1.08l0.23,1.47l2.05,4.15l1.64,4.2l2.45,3.39l2.45,4.31l1.0,1.29l2.51,2.01l2.46,2.57l1.59,1.22l4.83,0.76l3.07,0.9l2.74,1.55l1.69,1.91l-0.55,0.41l0.07,0.68l0.71,0.32l1.42,1.9l0.74,0.08l0.29,1.76l-0.27,0.38l-2.23,0.35l-1.2,0.64l-1.02,1.02l-0.99,2.07l-1.73,0.33l-2.41,1.89l-0.76,1.46l0.18,0.8l-0.75,-0.14l-2.94,0.84l-2.06,0.05l-1.05,0.38l-0.94,0.76l-0.92,1.69l0.07,2.35l-0.37,1.04l-0.89,0.96l-0.82,0.32l-2.75,0.01l-3.04,0.7l-1.75,0.69l-2.06,1.49l-6.33,2.69l-1.0,0.71l-0.51,1.04l-2.95,3.12l-0.77,1.39l-0.32,2.54l-2.97,0.41l-0.85,0.79l-0.29,1.14l-1.99,-0.12l-0.42,0.33l-0.6,3.42l0.18,7.03l-0.59,0.76l-0.95,0.24l-2.31,-0.17l-1.77,0.47l-1.27,1.06l-1.67,2.76l-0.74,2.59l-0.2,3.6l0.49,6.05l-0.12,1.39l-2.7,2.65l-0.69,1.18l-2.67,6.71l-0.15,1.27l-1.23,0.1l-1.62,-1.3l-1.69,-0.62l-5.07,-5.41l-3.22,-5.53ZM530.4,325.39l0.23,1.1l0.69,0.73l1.42,0.64l4.13,0.49l1.56,0.99l2.91,2.66l0.23,0.92l-0.45,0.88l-3.47,1.88l-6.78,1.59l-0.9,-0.06l-1.8,-0.69l-5.39,-0.84l-0.43,-0.37l-2.29,-7.11l-2.52,-2.12l0.16,-1.06l3.08,0.74l2.15,0.05l2.77,-0.87l0.58,-0.95l-0.06,-2.57l0.96,-1.06l1.51,3.25l1.68,1.76Z", "name": "Comunidad Valenciana"}, "ES-NC": {"path": "M487.26,54.0l1.46,0.39l0.47,-0.28l0.3,-1.1l0.98,0.39l1.72,-0.65l0.97,-0.96l1.95,-3.49l1.04,-0.99l1.14,-0.34l0.42,0.22l0.71,-0.12l3.53,-1.13l2.04,0.93l-0.19,0.83l0.61,2.41l0.54,0.66l0.92,0.41l1.65,0.0l0.87,-0.47l1.03,-2.42l0.76,-0.46l1.14,0.04l1.97,0.59l2.71,1.43l2.27,-0.34l1.67,1.74l0.24,3.11l-0.69,3.53l-0.98,2.78l-3.52,4.03l-0.58,1.15l0.83,1.96l1.37,1.55l1.56,0.89l1.68,0.44l1.81,0.16l1.28,-0.39l0.83,-1.57l0.15,-2.33l0.42,-1.68l1.01,-1.14l1.27,-0.48l0.63,0.17l-0.91,0.83l-0.54,1.18l0.27,1.47l1.2,1.46l1.34,0.83l3.89,0.73l2.18,1.21l2.12,1.74l2.67,-0.13l2.17,1.33l3.2,0.56l0.79,0.91l2.3,1.73l2.64,0.88l5.34,0.45l5.09,-0.91l1.49,0.52l0.71,1.83l-1.34,0.07l-2.29,1.26l-0.6,0.86l-0.41,1.83l-1.75,2.36l-0.33,0.92l-0.44,4.84l-0.6,1.38l-1.87,1.29l-0.56,1.12l-1.34,0.64l-2.53,2.21l-4.07,1.36l-0.54,0.69l-0.23,1.9l-0.53,1.52l-0.53,0.3l-1.91,-0.15l-4.19,0.63l-0.52,0.64l-0.24,1.4l-0.86,0.35l-0.15,0.67l1.03,0.63l-2.6,2.24l-0.69,1.59l-1.11,0.58l-1.21,-0.34l-1.0,0.11l-1.47,2.02l-0.46,1.63l0.77,2.45l-1.34,2.3l-1.76,1.74l-1.45,2.44l-0.56,2.54l0.08,0.79l1.17,1.84l-3.45,5.0l-2.16,7.24l0.1,1.58l1.22,2.33l0.33,5.21l1.28,1.46l1.5,2.83l2.24,0.88l0.19,0.55l-0.21,1.36l-2.94,4.66l-1.48,3.59l-2.04,2.81l-4.65,-1.18l-2.0,0.84l-2.24,0.15l-2.05,-1.12l-1.61,-1.91l-1.77,-1.02l-1.45,-0.43l-1.83,0.72l-1.04,-0.09l-1.72,-0.79l-2.39,-2.32l-0.76,-0.27l-3.07,-0.16l-1.04,-0.59l-0.79,0.0l-2.33,-1.98l-0.63,-1.62l0.3,-2.43l3.55,-4.05l1.11,-1.98l0.92,-0.0l1.59,0.6l2.42,-0.65l2.15,0.93l1.36,-0.23l0.56,-0.51l0.25,-0.69l-0.41,-1.71l0.24,-1.19l-0.6,-1.37l-0.13,-2.12l-1.97,-1.39l-1.42,-0.45l-3.11,-1.78l-2.22,-1.88l-1.79,-0.0l-0.45,-2.43l-2.46,-1.8l-4.94,-6.0l-3.91,-0.14l-1.34,-0.48l-0.64,-0.97l0.72,-1.08l-0.05,-0.54l-1.4,-1.27l-2.17,-0.33l-5.59,0.2l-0.86,-0.28l-2.12,-2.26l-2.7,-1.64l-4.38,0.57l-3.73,-1.18l0.74,-5.69l-0.51,-2.59l-0.52,-0.62l-1.13,-0.27l-1.95,2.01l-1.87,-0.82l-0.58,-0.62l0.02,-0.91l4.76,-4.17l1.43,-0.07l1.56,1.79l1.43,0.07l1.51,-0.5l2.45,-1.89l-0.15,-1.71l-1.07,-0.54l-0.52,-3.78l0.41,-0.58l1.67,-0.58l0.62,-0.86l0.33,-3.59l0.7,-1.96l1.42,-2.39l0.2,-1.89l-0.88,-3.62l1.33,-3.0l1.01,-1.14l0.64,-0.13l1.86,0.66l3.47,-0.52l1.99,-2.41l2.27,-0.66l0.75,-0.54l0.52,-0.72l0.2,-0.89l-0.06,-2.1l1.62,-3.37l5.0,-3.45l0.85,-0.93l0.94,-1.88l0.13,-1.23l-0.54,-3.42l0.52,-2.47ZM542.15,123.5l-0.25,0.17l-1.98,-0.35l-1.38,-0.68l0.34,-1.44l0.87,-1.19l0.42,-0.01l0.18,1.36l1.8,1.71l0.0,0.42ZM535.17,126.28l-0.52,0.04l-0.25,-0.47l0.13,-0.86l1.61,-1.14l0.02,0.73l-0.43,1.11l-0.55,0.57Z", "name": "Comunidad Foral de Navarra"}, "ES-AR": {"path": "M499.91,312.07l0.28,-2.34l-0.43,-1.46l-3.9,-4.95l-1.58,-0.74l1.41,-1.27l2.66,-3.95l1.8,-1.09l1.01,-1.25l0.12,-4.37l1.28,-3.53l0.23,-0.18l2.08,0.39l2.03,1.14l0.81,0.12l0.75,-0.12l1.15,-0.68l1.34,-1.59l-0.15,-2.8l1.11,-3.29l-0.15,-2.81l-1.13,-2.67l0.1,-1.48l1.11,-2.97l-0.4,-3.64l-0.76,-0.88l-1.68,-1.14l-1.32,-1.66l-0.81,-2.28l0.22,-3.71l-0.77,-1.66l-3.89,-3.98l-3.51,-3.06l-2.3,-3.43l-3.27,-2.8l-2.25,-1.27l-2.66,-2.09l-1.7,-0.72l-1.98,-1.91l-2.01,-0.48l-5.1,1.63l-1.99,-1.78l-1.24,-0.46l-1.86,-0.2l-0.78,-0.49l-0.88,-7.08l-0.92,-2.24l0.09,-2.78l0.35,-1.49l0.65,-0.78l1.03,-0.61l0.83,-1.27l0.6,-4.24l0.46,-1.04l0.53,-0.3l1.82,0.26l1.38,0.63l0.3,0.93l-0.07,2.14l0.37,0.7l0.66,0.36l1.26,-0.27l2.26,-1.48l1.3,-0.34l1.03,-0.66l-0.33,-4.13l-1.48,-2.93l-0.21,-1.36l0.18,-3.13l-0.4,-2.48l-0.55,-0.97l0.09,-0.95l1.26,-0.96l1.96,0.64l0.81,-0.16l2.1,-2.4l1.27,-0.68l1.34,-1.37l2.47,-0.76l0.75,-0.99l1.26,-3.11l0.11,-1.59l-1.46,-1.53l-0.69,-1.79l-1.72,-2.75l1.55,-3.11l0.41,-1.62l-0.08,-0.88l-1.34,-1.94l-0.94,-2.74l-0.39,-4.19l0.85,-2.57l-0.37,-1.23l1.39,0.62l3.5,0.32l2.27,2.25l2.0,0.93l1.4,0.11l1.78,-0.71l1.03,0.36l1.55,0.87l1.66,1.95l2.3,1.25l2.7,-0.14l1.77,-0.81l4.54,1.19l0.76,-0.29l2.1,-2.94l1.49,-3.61l3.02,-4.86l0.23,-1.52l-0.28,-0.95l-0.62,-0.58l-1.75,-0.48l-1.43,-2.74l-1.22,-1.37l-0.25,-4.98l-1.25,-2.47l-0.05,-1.21l2.1,-7.0l3.22,-4.34l0.3,-0.86l-0.22,-0.91l-0.97,-1.21l0.45,-2.92l1.35,-2.24l1.75,-1.73l1.46,-2.53l-0.06,-0.96l-0.68,-1.79l0.38,-1.23l1.15,-1.66l1.87,0.34l1.68,-0.87l0.7,-1.61l2.7,-2.37l0.16,-0.45l-0.21,-0.47l-0.55,-0.27l0.62,-0.5l0.08,-0.95l0.41,-0.77l3.72,-0.48l1.98,0.14l0.93,-0.46l0.46,-0.76l0.41,-2.51l0.46,-0.86l3.97,-1.29l2.61,-2.27l1.3,-0.6l0.68,-1.23l1.86,-1.28l0.81,-1.78l0.39,-2.67l-0.09,-1.45l0.37,-1.38l1.79,-2.43l0.77,-2.4l2.12,-1.16l1.35,-0.03l-0.16,1.96l1.13,1.6l2.09,0.19l3.28,2.29l2.49,3.35l-0.08,0.91l0.23,0.38l1.72,0.28l0.21,0.3l-0.08,1.02l0.82,0.76l0.8,-0.02l1.75,-0.98l0.27,-0.36l0.09,-1.75l1.21,0.03l3.48,1.64l2.21,-0.12l1.81,-1.05l2.89,-2.29l0.75,0.42l0.52,-0.2l0.82,-1.26l4.54,2.97l1.05,1.8l1.93,0.2l2.52,-0.78l-0.07,1.03l0.43,1.66l0.8,1.33l1.45,1.35l0.27,1.17l1.72,0.79l1.2,1.27l2.6,1.04l2.57,-0.21l5.05,-1.87l4.01,-0.6l1.33,-0.85l0.9,-0.14l4.3,1.34l1.4,2.46l1.39,1.37l1.25,-0.31l1.83,-2.6l1.09,-1.09l0.89,-0.32l1.58,1.36l0.1,0.83l0.44,0.55l1.52,0.36l1.46,-0.08l2.38,-0.63l1.14,0.45l8.19,-0.24l2.31,0.31l1.05,-0.34l0.4,-0.5l1.62,2.62l0.9,2.5l0.57,0.85l0.76,0.62l1.96,0.54l0.69,0.54l-0.59,3.41l-1.93,4.04l-0.02,1.6l-1.57,0.61l-0.34,0.97l0.91,3.91l1.19,1.5l0.86,3.13l0.32,5.44l-0.44,1.92l-0.08,3.22l-0.65,2.16l-0.92,1.67l-0.94,4.37l-0.14,0.96l0.35,1.47l-0.36,2.74l-0.54,1.59l-0.7,0.72l-1.03,3.95l-0.89,1.94l-0.22,2.23l-0.48,0.68l-1.27,0.77l-1.05,1.69l-0.92,0.33l-1.16,0.89l-0.75,1.21l0.15,1.01l1.62,1.55l0.26,3.26l-0.2,0.46l-0.78,0.97l-1.45,0.9l-1.1,1.68l-2.74,1.29l-2.37,3.95l-3.9,1.33l-0.83,1.44l-0.89,0.88l-0.89,1.48l-1.59,1.49l-1.0,1.63l0.06,1.44l0.92,2.23l0.6,2.76l0.49,0.63l0.7,0.33l3.64,0.4l1.0,3.8l-2.71,4.25l-2.27,0.8l-0.92,0.86l-0.19,3.98l-0.65,2.3l-0.96,1.6l0.2,1.76l1.77,0.95l0.79,0.79l0.53,1.08l0.19,1.36l-1.63,3.79l0.5,3.94l-2.38,1.43l-0.6,0.69l-0.96,3.76l-0.36,0.48l-2.29,1.04l-0.96,1.17l-1.89,0.56l-0.67,1.49l-0.08,1.5l1.49,4.71l1.15,1.05l1.95,1.19l0.96,2.98l-0.25,1.86l-1.64,3.22l-0.74,3.02l0.57,3.07l0.9,2.24l-0.03,0.52l-2.39,3.7l-4.0,2.58l-0.45,0.76l0.24,0.71l-1.43,0.56l-2.49,0.09l-1.74,0.46l-2.38,1.73l-0.57,-0.15l-0.29,-1.66l-0.7,-0.77l-1.23,-0.32l-3.24,0.21l-1.6,-0.3l-2.91,-1.89l-2.19,-1.92l-1.09,-0.48l-1.33,0.07l-0.88,0.42l-1.93,2.74l-0.64,4.28l-4.46,2.65l-1.46,-0.72l-1.24,-0.2l-1.61,0.6l-0.68,0.72l-0.11,3.36l0.37,0.89l2.84,1.18l2.27,-0.24l-0.27,2.37l0.37,3.62l-0.32,1.87l0.27,0.78l0.91,0.57l0.5,1.73l-3.26,1.49l-1.2,1.58l0.37,1.49l1.88,1.75l1.13,1.53l0.14,1.2l-2.89,2.13l-1.7,2.43l-2.16,1.85l-0.27,0.79l0.09,2.12l-0.79,0.92l-2.31,1.11l-3.41,0.61l-2.54,-0.86l-0.65,0.03l-0.66,0.57l-0.25,3.24l-0.24,1.18l-0.74,1.37l-0.18,1.41l-0.78,1.45l-1.98,1.8l-0.39,0.8l-0.12,0.83l0.38,2.02l-4.36,2.24l-4.61,0.4l-0.48,0.63l-0.56,2.17l-0.52,0.61l-3.16,1.64l-0.62,0.76l-0.56,2.65l0.44,2.37l0.69,1.33l0.98,0.77l0.91,1.24l-3.29,1.71l-1.85,0.24l-1.28,-0.88l-0.12,-2.42l-0.51,-1.04l0.46,-2.48l-0.33,-0.83l-1.08,-1.23l-3.26,-1.55l-1.94,-0.48l-3.65,0.03l-4.86,1.23l-0.79,-0.53l-0.96,-2.84l1.22,-0.33l3.7,-2.03l0.69,-1.29l-0.29,-1.44l-3.15,-2.94l-1.71,-1.08l-4.32,-0.55l-1.17,-0.55l-0.54,-0.78l-0.19,-1.08l-1.61,-1.47l-1.73,-3.51l-0.78,-0.07l-0.88,0.69l-0.49,0.8l-0.19,0.99l0.24,1.26l-0.28,0.92l-2.37,0.75l-1.98,-0.04l-2.99,-0.72l0.58,-2.25l-0.14,-1.22l-0.42,-0.56l-1.99,0.18l-2.6,-0.7l-0.89,0.05l-0.72,0.41l-0.32,-0.14l-7.82,-7.36l-1.8,-0.94l-0.97,-0.12l-0.94,0.45ZM537.73,122.8l0.99,1.0l2.43,0.6l1.07,0.01l0.72,-0.7l-0.13,-1.11l-1.68,-1.49l-0.06,-0.93l-0.54,-0.94l-1.05,0.0l-0.99,0.93l-0.68,1.61l-0.08,1.0ZM536.95,123.71l-0.5,-0.66l-0.52,-0.03l-2.07,1.53l-0.27,1.32l0.48,1.06l1.31,0.14l0.97,-0.86l0.57,-1.39l0.03,-1.11Z", "name": "Arag\u00f3n"}, "ES-CB": {"path": "M315.65,35.72l1.39,1.36l0.56,-0.0l1.29,-1.28l1.65,-0.31l1.64,0.46l1.2,1.14l0.69,0.11l1.39,-1.45l3.04,0.34l8.2,-0.88l1.97,-1.47l4.07,-1.28l4.64,-0.29l0.88,-1.21l1.83,1.2l0.55,-0.08l1.43,-0.8l-0.9,-1.1l2.08,-1.52l0.97,-0.42l1.26,0.22l0.6,-0.37l0.75,0.37l1.86,-1.16l1.83,-0.39l1.8,0.36l1.18,0.79l-2.27,1.04l-1.21,0.8l-0.95,1.06l-0.01,0.52l0.84,0.97l-0.08,0.66l0.38,0.38l0.83,0.03l1.77,-0.71l1.42,-1.8l0.96,1.01l1.06,0.07l0.36,-0.68l-0.15,-0.82l-0.74,-1.31l1.07,0.42l0.61,-0.24l0.43,-0.89l-0.2,-0.28l2.26,-0.29l2.07,-1.46l4.95,-1.56l1.17,0.08l-0.1,1.17l0.37,0.43l1.01,0.06l2.17,1.75l4.75,1.01l0.16,1.28l-0.75,0.03l-1.51,-0.77l-0.45,0.18l-0.5,0.97l-1.44,1.01l-0.19,0.41l0.32,0.32l1.15,0.22l1.39,1.39l0.56,-0.14l0.61,-1.09l0.64,0.7l0.92,0.08l2.03,-0.57l4.02,1.28l4.01,0.56l3.81,1.29l2.05,2.02l1.61,0.57l0.08,4.53l-0.58,1.26l-2.65,1.3l-2.07,-0.6l-1.67,0.21l-4.26,-0.26l-7.17,5.16l-0.79,1.0l-0.29,0.96l0.3,1.44l-0.04,1.96l1.09,3.91l-1.41,0.12l-4.3,-0.42l-1.81,-0.84l-3.78,-0.79l-2.15,-1.37l-0.93,0.05l-1.2,0.75l-3.87,4.62l-2.92,2.17l-1.01,0.33l-2.54,-0.11l-1.22,0.6l-0.4,2.58l-0.7,0.76l-2.67,1.28l-1.41,1.55l-2.43,1.62l-2.11,5.42l-0.1,1.45l0.35,0.89l1.05,1.09l1.53,0.35l1.43,-0.46l1.78,-1.1l1.34,-2.07l0.82,-0.27l0.78,0.48l0.73,1.07l-0.14,0.8l-1.82,1.17l-1.78,0.12l-0.36,0.28l-0.72,1.61l0.28,1.86l0.4,0.85l0.47,0.36l0.8,0.1l0.89,-0.56l0.92,-1.4l0.61,-0.32l0.83,0.26l0.16,2.07l0.8,2.12l-0.0,1.0l-0.72,0.66l-3.41,0.25l-2.42,2.19l-2.9,0.91l-1.89,-0.54l0.03,-3.87l-0.31,-0.9l-0.49,-0.13l-1.26,0.85l-1.78,3.98l-2.07,0.51l-0.92,-1.4l-0.66,-0.51l-3.21,-0.71l-1.61,-1.51l0.01,-0.57l0.33,-0.2l1.79,-0.43l1.1,-0.81l0.28,-0.93l-0.11,-0.66l-0.54,-0.68l-1.0,-0.41l-1.61,0.47l-1.74,1.3l-0.88,-0.49l-0.98,-5.73l-0.06,-2.57l-0.31,-0.84l-1.03,-0.72l-6.7,-2.49l-0.81,-0.59l-1.96,-3.58l-0.74,-0.6l-2.47,-1.16l-1.23,-0.03l-1.93,1.03l-1.95,0.22l-2.14,1.2l-3.19,-0.14l-2.46,0.51l-3.29,0.02l-2.14,0.34l-0.74,-2.67l-1.34,-1.36l-0.78,-1.45l-2.81,-1.58l-0.95,-1.04l-0.5,-2.29l0.25,-4.38l3.64,-0.61l1.88,0.24l0.77,-0.52l0.75,-1.99l0.28,-2.11l-0.16,-1.17l0.39,-0.86l1.29,-0.56l3.4,-0.07l1.02,-0.62l0.76,-1.03l1.39,-0.65l1.73,0.32l1.14,1.61l0.87,-0.05l0.71,-0.56l0.48,-0.69l0.33,-1.81l-0.23,-1.34l-0.98,-2.42l1.53,-3.12l0.06,-2.82Z", "name": "Cantabria"}}, "height": 671.3455904856035, "projection": {"type": "merc", "centralMeridian": 0.0}, "width": 900.0});
},{}],"/Code/html/themes/themekit/lib/maps/js/vector/custom/jquery-jvectormap-fr-merc-en.js":[function(require,module,exports){
$.fn.vectorMap('addMap', 'fr_merc_en',{"insets": [{"width": 100, "top": 500, "height": 124.10158361709644, "bbox": [{"y": -645244.9842573161, "x": -6082899.139819591}, {"y": -235151.50568115257, "x": -5752449.304593098}], "left": 10}, {"width": 900.0, "top": 0, "height": 864.1025840443817, "bbox": [{"y": -6640157.227291796, "x": -571651.210329419}, {"y": -5069047.490921886, "x": 1064727.1420124765}], "left": 0}], "paths": {"FR-C": {"path": "M499.58,401.44l0.25,1.77l1.24,1.75l3.23,2.13l2.72,0.22l3.5,3.34l1.07,0.0l2.4,-1.21l1.64,-0.11l4.6,1.58l0.78,-0.23l2.13,-2.13l1.59,0.78l1.06,2.21l0.03,1.71l1.1,0.76l1.74,-0.38l4.06,-2.49l0.57,-2.27l1.34,-0.99l0.39,-2.1l1.18,0.22l2.0,4.68l2.46,2.54l1.56,3.05l0.94,0.63l0.18,6.02l4.03,2.38l1.73,0.09l2.67,2.57l3.68,0.82l2.2,1.32l0.74,3.33l-0.64,3.53l0.53,1.51l-0.03,1.67l0.81,2.03l-1.2,1.16l-5.54,3.14l-4.06,1.31l-3.53,3.27l0.09,0.88l1.08,1.38l0.45,3.68l-0.15,4.64l1.66,8.88l-1.07,1.68l-4.81,1.2l-2.37,1.3l-0.48,0.98l0.44,1.63l2.11,1.81l0.83,1.67l-1.18,3.31l-0.01,2.51l-0.9,2.09l0.06,1.2l1.84,3.37l1.55,1.65l3.19,7.38l7.55,6.93l2.44,6.22l0.07,1.18l-0.89,2.45l-2.77,3.33l-0.8,1.67l-0.64,3.34l0.41,1.04l1.22,0.53l1.59,-1.37l1.89,-0.68l2.11,2.09l2.83,-0.07l5.94,-1.17l0.73,-0.61l0.63,-1.74l2.06,-0.01l4.17,1.28l0.8,-0.22l1.63,-1.53l1.02,0.83l1.47,3.09l-0.74,3.15l0.99,2.69l0.56,0.57l2.83,0.37l1.34,0.79l2.81,2.77l-0.24,1.92l-1.71,3.77l-0.73,3.28l-2.57,-1.7l-1.37,0.6l-0.05,0.85l0.88,1.81l-1.88,2.07l-0.3,1.0l1.22,2.35l-3.98,1.43l-0.86,1.88l0.55,2.13l-2.44,1.07l-1.75,-0.27l-0.72,0.49l-1.46,3.96l-2.26,3.21l-5.0,0.96l-2.54,-0.04l-0.62,0.54l-0.58,2.03l-3.93,1.47l-3.33,5.22l-1.09,0.51l-4.45,-2.09l-4.14,-3.9l-4.32,-0.98l0.42,-2.32l-1.41,-1.34l-2.82,0.03l-0.88,0.92l-0.64,2.71l-3.65,0.62l-1.33,0.68l-1.66,-1.54l-3.46,-6.67l-1.02,-3.4l-0.6,-0.44l-1.66,0.08l-4.45,2.53l-2.54,0.37l-4.65,4.34l-0.56,0.11l-1.8,-2.16l-1.57,0.75l-1.11,4.47l-1.64,1.18l-0.58,1.12l-1.76,8.34l-1.84,3.19l-0.71,2.29l-1.58,-1.37l-1.17,-2.07l-1.11,-5.55l1.16,-0.91l0.0,-1.05l-2.99,-1.76l-0.69,-2.24l-2.43,-3.72l-0.8,-0.25l-2.42,0.4l-0.3,-3.06l-1.91,-2.76l-1.04,-0.48l-8.47,8.8l-0.73,2.95l-2.44,4.06l-0.58,2.75l-3.69,4.57l-2.8,0.74l-3.46,-0.11l-1.42,0.7l-1.19,-1.3l-1.51,-0.13l-5.34,1.88l-0.85,2.02l-0.96,-1.16l-0.88,-3.87l-1.72,-1.2l1.56,-6.33l-0.1,-0.93l-4.39,-8.36l-0.86,-6.56l-0.63,-1.37l3.22,-0.76l1.1,-0.82l0.07,-1.34l-1.54,-3.71l3.21,-2.97l2.85,-6.39l0.21,-1.23l-1.07,-2.65l0.12,-1.65l2.6,-2.27l0.51,-2.15l3.08,-1.53l2.04,-3.33l1.09,-0.79l1.4,-3.47l-0.13,-1.18l-0.98,-1.21l1.96,-0.43l3.02,1.81l1.86,0.31l1.58,-0.96l1.85,-7.22l-1.19,-1.25l-0.26,-4.75l-1.82,-3.28l0.88,-3.16l1.65,-0.78l0.82,-1.16l0.29,-4.87l-0.65,-1.6l-1.92,-2.43l-0.96,-0.99l-1.8,-0.75l-0.67,-2.28l-1.74,-2.82l0.67,-1.12l3.13,-2.64l2.41,-0.19l2.48,-2.97l1.63,-3.83l1.7,-2.22l0.2,-3.6l-0.22,-1.65l-1.87,-3.78l0.17,-5.83l-2.17,-4.39l-1.06,-3.64l-3.18,-4.84l-1.31,-0.42l-1.1,0.77l-0.76,-2.04l-0.95,-1.04l-3.49,-1.1l-1.35,-3.75l-3.7,-4.59l2.14,-4.03l1.46,-0.74l1.48,-2.09l3.51,-1.81l7.94,-0.92l5.53,-1.85l-0.01,-2.05l-1.84,-2.79l0.49,-2.39l-1.03,-1.91l0.31,-0.49l2.28,-0.19l0.4,-0.83l-0.08,-1.49l1.64,-0.14l4.05,-3.81l0.8,0.92l2.07,0.87l0.74,-0.09l1.49,-1.42l2.22,0.29l1.77,-2.51l3.83,-2.53l2.57,-0.84l2.86,0.21Z", "name": "Auvergne"}, "FR-B": {"path": "M238.0,586.42l3.33,-38.18l2.55,-13.79l1.1,-18.35l3.22,-6.65l1.05,-0.09l-0.28,3.12l1.42,2.29l4.23,3.31l3.5,1.76l7.32,8.19l1.66,2.48l3.07,16.64l2.12,5.13l2.12,2.78l4.8,4.01l0.53,1.67l0.17,5.04l0.53,1.48l0.95,0.82l0.64,-0.39l-0.81,-4.67l0.53,-2.45l-0.78,-2.02l-1.56,-1.54l1.81,0.35l2.67,1.79l0.51,0.0l0.09,-0.5l-1.71,-2.89l-5.09,-2.08l-2.05,-1.6l-1.06,-2.14l-0.76,-2.69l-2.26,-16.16l4.59,0.2l1.0,-0.73l0.76,-1.46l0.52,-0.13l1.62,4.07l2.14,0.81l2.33,0.12l3.23,2.52l0.42,1.1l0.01,3.71l1.84,3.29l1.14,0.39l2.3,-0.35l3.65,1.97l2.4,2.26l4.09,1.44l1.97,-0.27l3.32,-1.25l1.92,0.6l1.84,-0.89l1.73,-2.26l0.39,-1.15l-0.71,-1.74l0.61,-1.01l4.84,-2.55l2.4,0.72l1.37,-0.36l1.22,-1.26l0.8,-2.1l2.77,-1.37l1.9,-1.9l0.53,-1.98l-0.02,-4.59l1.44,-4.75l6.52,-4.93l1.97,-0.27l0.88,-0.62l4.4,-7.02l0.72,-5.71l2.82,-1.07l2.26,-3.5l1.86,-1.75l1.08,0.82l4.7,0.53l2.21,3.05l-0.65,3.73l1.7,1.22l2.04,0.56l1.21,-0.12l0.99,-0.55l1.06,-1.4l1.25,0.92l3.25,-0.56l4.28,0.28l3.95,5.6l3.93,1.0l0.61,0.5l-0.18,0.89l-1.67,1.65l0.27,1.57l4.23,2.32l1.94,-0.28l1.78,1.4l1.57,0.26l-0.04,0.95l-1.01,1.92l0.11,1.32l0.83,0.81l2.37,-0.06l-0.42,1.42l-1.53,1.0l-2.42,2.69l-0.63,3.6l2.35,2.36l-2.08,2.28l-0.55,1.74l0.45,0.78l2.6,0.47l0.08,1.06l-0.74,1.8l0.85,1.46l2.82,1.34l3.9,0.13l-0.49,2.77l0.25,0.95l1.6,3.28l2.0,2.5l-1.48,1.1l-0.46,1.65l1.32,4.54l-0.75,2.26l0.17,1.9l-2.73,3.05l-1.66,3.0l-2.23,0.74l-0.86,1.25l-0.28,1.0l0.69,2.34l-1.26,2.06l-4.31,3.04l-2.4,0.64l-0.97,0.93l-3.33,5.91l-3.49,3.25l-2.93,1.47l-0.85,0.92l-0.26,0.82l1.31,2.37l0.06,2.13l0.83,2.42l2.03,2.57l-0.18,3.49l-0.6,0.68l-4.79,0.41l-2.89,-1.35l-1.51,0.72l-0.26,2.8l-0.81,2.69l0.84,1.54l2.45,1.1l0.38,0.63l-2.46,5.88l-2.15,1.91l0.08,0.75l1.15,0.92l-0.04,1.22l-1.23,0.24l-2.23,-0.79l-1.42,0.36l-0.95,2.07l-2.26,1.51l-1.04,3.23l-3.58,2.13l-1.03,0.2l-2.7,-2.43l-1.53,-0.54l-5.15,1.74l-2.71,-0.29l-9.84,5.04l-4.81,-1.84l-0.82,0.1l-3.43,4.1l-0.55,0.02l-0.58,-0.84l-0.77,-0.24l-2.4,0.91l-0.89,1.71l0.25,2.7l-0.73,0.9l-3.55,-0.48l-0.39,-0.91l0.79,-1.42l-0.06,-1.16l-0.89,-0.97l-1.25,-0.4l-2.93,1.7l-1.8,1.95l-4.15,-0.19l-3.47,2.87l-0.12,1.08l1.31,1.55l1.07,2.52l-1.49,4.43l-0.05,2.72l0.82,1.54l-1.5,3.57l-1.99,0.72l0.43,2.32l-1.08,1.83l-0.24,1.37l0.97,0.82l0.99,2.44l2.34,-0.0l5.58,1.17l1.06,0.75l0.67,1.66l1.56,1.31l2.18,5.6l-1.48,0.25l-0.54,0.52l0.04,2.55l0.5,0.74l0.77,0.19l1.45,-1.47l0.73,0.04l-0.11,3.6l1.07,3.69l-2.12,1.17l-0.95,1.18l-0.6,2.95l0.6,2.36l-2.38,3.0l-1.11,3.67l-1.55,0.14l-1.73,3.36l-2.28,1.46l-0.97,1.38l0.14,4.33l-3.39,0.69l-2.69,3.11l0.2,4.62l-1.68,2.61l-0.33,1.36l0.56,4.28l-0.92,-0.12l-0.76,1.34l-0.88,-0.39l-4.3,3.15l-1.67,0.13l-3.21,-1.51l-1.72,-0.08l-0.41,0.38l-0.09,1.71l-1.57,0.84l-0.61,-1.75l-1.58,-0.29l-0.05,-1.02l-2.44,-3.28l-3.23,-2.26l-1.85,-0.13l-0.47,-0.46l0.0,-2.09l-1.39,-3.21l-1.84,-0.59l-4.67,0.85l-4.78,-0.4l-2.24,-0.73l-2.96,-2.51l-3.08,-0.56l-2.03,-1.23l-2.32,0.17l-4.04,-2.74l-3.6,-0.67l-1.04,-0.63l-1.15,-1.98l1.62,-1.94l-0.16,-0.69l-1.63,-0.36l-1.53,0.63l-1.06,1.2l-1.08,4.95l-0.8,0.27l-2.98,-0.51l-2.28,-1.89l-0.66,-1.55l3.72,-4.4l1.61,-6.06l-0.34,-3.43l-2.04,-1.95l-2.03,0.34l-2.5,-1.31l-3.23,-0.63l-1.31,0.83l-0.76,2.02l-1.67,0.28l-0.81,-0.53l-0.5,-3.23l-2.51,-1.13l-3.76,1.12l-0.43,-2.11l-0.91,-1.16l-1.53,-0.75l0.28,-4.19l0.99,0.23l1.37,-0.95l5.45,-0.89l4.04,-2.16l2.26,-4.43l3.76,-3.21l1.47,-4.18l1.91,-7.53l2.51,-13.87l1.46,-4.88l2.15,-11.02l3.96,-24.18l2.1,-17.38l-0.62,-4.32l1.6,-2.34l1.49,-5.51l1.04,-1.3l5.0,0.86l2.31,-0.32l1.41,-0.96l0.18,-1.63l-1.04,-1.26l0.32,-0.51l-0.69,-1.35l-4.62,-4.37l-1.82,-1.02l-0.93,0.42l-3.55,5.96l-0.51,2.64Z", "name": "Aquitaine"}, "FR-A": {"path": "M752.41,337.93l0.41,-3.1l-1.06,-2.38l-3.49,-3.89l-2.66,-0.5l-0.58,-0.64l0.01,-0.98l1.51,-2.37l0.59,-1.95l-0.54,-4.78l-1.75,-1.94l-8.58,-5.01l-0.64,-0.84l-0.05,-1.09l2.16,-1.02l1.13,-1.27l0.15,-1.2l-0.62,-1.98l1.61,-3.69l0.61,-3.59l3.46,-4.84l3.12,-6.81l1.35,-1.87l0.38,-2.06l-0.77,-1.94l0.5,-1.47l7.74,-12.95l-0.04,-1.31l-1.32,-1.53l-3.47,-0.3l-1.41,-0.91l0.68,-3.6l0.59,-8.92l1.12,-1.22l0.03,-0.65l-3.26,-1.94l5.91,-0.5l0.69,-0.48l0.66,-1.39l3.07,-2.19l2.35,-7.53l-0.51,-0.93l-1.5,-0.92l-0.16,-0.84l2.92,-5.09l0.31,-1.66l-0.55,-1.51l-3.83,-4.49l-1.84,-0.98l-0.15,-1.56l-0.76,-0.88l-0.78,0.1l-0.54,0.66l-0.45,2.07l-2.17,1.03l-1.14,1.86l-1.0,0.08l-0.86,-2.13l-0.78,-0.73l0.28,-1.06l0.96,-1.12l-0.06,-1.08l-5.94,-2.93l-1.18,-1.81l0.16,-1.54l1.14,-1.86l2.61,-2.45l0.3,-2.22l2.14,-3.21l-0.23,-2.0l0.3,-0.56l1.49,0.59l0.82,3.29l0.93,1.19l8.51,3.03l1.51,2.51l2.23,0.73l9.04,-1.44l3.25,1.92l1.42,-0.14l1.81,-2.19l3.27,-6.8l1.56,-0.51l3.31,0.51l2.76,-1.13l5.0,1.45l4.58,-0.24l9.65,5.16l6.36,1.59l-3.0,4.9l-3.49,8.88l-3.19,1.62l-1.17,2.54l-3.06,0.63l-0.65,3.29l-3.81,4.07l-2.71,1.72l-2.59,4.05l-0.57,3.17l-0.02,3.29l0.72,2.4l-2.24,2.03l-2.35,8.53l0.76,5.96l-0.74,1.18l-2.22,1.64l-0.92,5.31l-4.52,6.79l-0.54,2.48l-1.58,3.48l-0.4,1.93l0.19,3.79l2.65,4.77l0.12,2.65l-2.19,2.82l-0.36,3.09l-1.23,2.21l0.2,3.79l-1.18,1.03l-1.06,4.28l0.74,4.61l-1.6,2.38l0.42,3.1l1.23,1.01l3.17,5.04l-0.23,1.72l-3.51,1.55l-2.72,2.24l0.1,0.68l1.13,0.81l0.01,0.47l-1.73,0.72l0.49,1.92l-0.81,0.75l-2.27,-0.92l-0.97,0.21l-0.28,0.94l0.84,1.36l-0.08,1.02l-1.1,1.44l-1.52,0.61l-4.27,-0.17l-4.23,1.41l-0.93,-0.95l-3.04,-1.31l-0.28,-1.18l1.06,-2.45l-0.41,-0.56l-1.81,0.13Z", "name": "Alsace"}, "FR-G": {"path": "M522.82,222.06l0.15,-1.33l1.67,-2.09l-1.1,-1.74l3.36,-0.44l0.75,-1.17l0.19,-2.04l1.49,-3.08l4.29,-4.5l1.06,-2.43l1.69,-1.31l3.25,-4.02l-0.01,-1.24l-0.99,-0.91l-3.42,0.05l-0.83,-0.59l0.06,-1.42l1.32,-1.02l1.15,-1.94l-0.04,-4.45l1.17,-0.88l3.1,0.4l1.48,-0.3l1.33,-1.19l0.34,-0.98l-0.35,-1.23l-2.25,-2.13l-1.78,-0.7l-0.57,-5.79l-0.92,-2.58l2.98,-1.83l5.1,-1.46l4.31,-0.68l0.5,-0.84l-0.12,-1.65l0.86,-0.66l2.01,0.11l3.05,1.66l2.08,-0.8l2.34,1.0l1.13,-0.9l0.55,-3.93l-0.52,-1.51l-0.71,-0.52l0.41,-0.81l1.55,-0.57l0.3,-0.5l-1.83,-4.4l1.78,-2.38l-0.34,-2.7l0.46,-1.78l-1.61,-5.37l0.78,-0.85l1.85,-0.11l1.55,-0.99l1.47,-2.41l4.92,-4.4l0.93,-1.73l0.02,-1.51l-1.53,-2.55l0.45,-3.23l1.84,-3.83l0.18,-1.64l-2.03,-4.53l-0.04,-3.19l3.3,-0.48l9.74,2.65l1.93,-0.36l8.49,-4.22l2.64,-0.46l0.81,-0.59l1.02,-2.68l0.48,-3.19l-0.43,-1.68l0.44,-1.44l6.44,-6.53l1.12,-0.52l0.18,0.92l0.93,0.59l1.91,-0.33l0.33,0.43l-0.47,4.25l-1.07,0.15l-1.15,2.54l-0.06,2.75l-2.62,7.42l0.87,1.61l2.96,1.3l0.84,1.55l-0.04,1.83l-1.51,3.7l0.88,2.18l0.07,3.75l0.81,0.87l1.72,0.23l5.16,-1.22l3.29,2.82l3.4,1.33l3.26,4.42l2.06,1.75l1.77,0.48l3.82,-0.79l2.26,2.52l0.34,1.14l-0.72,0.69l-0.19,1.34l0.53,1.54l1.89,0.19l0.84,-1.2l2.91,1.37l-0.06,1.09l-6.22,4.55l-1.47,-1.68l-3.83,-0.0l-3.29,-2.25l-1.19,0.24l-1.68,2.0l-0.4,4.05l-1.46,2.2l0.73,2.75l1.03,0.93l0.75,2.9l-0.11,1.57l-1.09,3.0l-3.38,5.28l0.74,4.07l-4.23,4.01l-0.04,2.63l-1.5,3.52l1.8,6.65l0.44,6.21l0.61,0.83l1.6,0.8l0.37,1.09l-0.85,1.36l-0.07,3.38l-0.58,1.74l-1.01,0.8l-2.7,0.84l-1.21,1.87l-0.5,2.98l0.65,2.62l-1.5,3.07l0.04,0.91l0.68,1.1l3.97,3.45l1.3,8.68l1.99,3.6l2.25,1.95l2.79,1.53l4.32,3.65l5.09,2.91l4.4,0.81l0.81,1.82l5.85,5.54l-1.92,3.46l0.6,4.08l0.44,0.7l1.03,0.23l1.85,-1.94l1.59,0.1l1.4,1.4l3.12,4.65l2.71,0.1l1.04,0.61l0.59,3.05l2.43,1.84l1.41,1.66l-1.32,1.83l-0.55,3.0l-1.17,2.31l-0.63,2.86l4.61,4.55l3.34,2.15l0.53,1.12l-0.12,3.17l0.58,1.57l1.06,0.22l0.95,-0.78l0.9,-0.1l2.42,2.97l0.32,1.05l-0.23,0.6l-1.94,0.79l-2.38,3.38l-6.41,4.6l-0.81,1.18l-0.31,1.18l0.58,2.39l-0.54,2.77l0.02,3.56l-0.93,0.94l-6.33,2.11l-4.57,-2.27l-5.09,1.01l-1.05,1.3l-2.46,5.54l-0.35,0.12l-0.67,-1.03l-0.78,-0.26l-2.9,1.81l-0.94,-2.57l-3.73,-2.57l-1.5,-2.77l-1.24,0.11l-1.76,2.21l-1.45,0.16l-2.22,-1.57l-2.43,-3.48l-1.09,-0.04l-1.33,1.51l-0.66,0.01l-0.91,-1.38l-0.6,-4.23l-1.33,-1.89l0.36,-0.79l2.34,-0.44l0.81,-1.06l-0.18,-1.44l-1.17,-2.68l-4.51,-6.32l-1.22,-0.21l-1.08,1.44l-0.48,-0.25l-0.24,-1.21l0.97,-2.74l-1.02,-1.06l-2.66,-1.06l0.43,-1.56l-0.29,-0.78l-0.85,-0.58l-3.67,-0.8l-1.99,-1.43l-2.7,1.15l-2.97,-0.6l-1.78,0.44l-1.45,1.43l-0.21,2.15l-0.83,0.56l-13.16,1.75l-2.4,1.99l-1.57,-0.82l-1.94,-3.09l-0.83,-0.45l-0.53,0.44l-0.26,2.49l-1.39,-1.15l-1.04,-0.16l-2.24,1.93l-3.68,-0.45l-1.85,1.41l-2.22,-0.74l-2.88,0.2l-1.95,-0.41l-0.59,-1.05l0.08,-2.59l-0.51,-1.07l-0.99,-0.23l-1.66,0.41l-1.41,-0.86l1.57,-0.92l0.1,-0.98l-4.65,-8.19l-1.91,-2.22l-0.71,-2.09l-1.87,-1.2l-0.78,0.33l-0.57,1.22l-1.53,0.14l-2.81,-2.27l-2.08,-1.0l1.91,-2.99l-0.39,-3.83l-0.47,-1.07l-5.62,-7.49l-3.0,-1.95l-2.31,-0.03l-0.48,-2.82l-1.28,-1.7l0.56,-2.65l-0.63,-2.12l1.81,-2.22l-0.92,-2.33l2.56,-0.64l0.76,-0.7l2.0,-4.46l2.67,-2.34l0.06,-0.54l-1.98,-2.75l-2.8,0.06l-0.21,-1.56l0.51,-2.24l-0.75,-3.66l-2.01,-2.61l-1.37,-0.05Z", "name": "Champagne-Ardenne"}, "FR-F": {"path": "M412.4,222.65l-0.38,1.44l-1.34,1.9l0.06,1.9l1.47,1.14l0.54,1.63l1.49,2.01l3.84,2.83l0.72,2.79l2.9,2.67l0.36,4.68l1.37,2.37l1.1,0.93l4.6,2.21l2.45,-0.22l0.24,2.82l2.15,2.83l0.61,3.3l0.6,1.08l1.27,0.89l-1.6,2.47l0.14,1.54l1.31,0.75l8.97,-2.08l2.19,-1.05l1.74,-2.57l1.03,0.49l1.34,2.16l0.9,0.38l1.94,-0.52l1.78,-1.51l2.6,1.55l2.42,-0.28l1.06,1.75l1.05,3.95l3.55,2.44l1.11,1.46l-0.82,2.22l0.47,2.02l-2.35,-0.12l-1.09,1.1l-0.07,1.4l1.16,1.17l2.04,0.31l3.17,-0.76l8.34,0.69l2.32,-1.1l1.66,-1.87l0.81,-0.31l2.0,0.06l-0.39,1.86l1.39,0.61l7.06,-2.3l1.74,0.14l2.26,0.68l1.53,1.2l1.38,5.08l1.04,1.5l2.82,2.56l0.54,2.63l-1.43,3.81l-4.31,4.09l-1.36,0.16l-0.44,0.45l0.1,3.08l0.95,2.44l-0.79,1.64l0.13,1.93l-0.44,1.2l-4.41,2.4l-4.17,0.54l-1.05,0.96l-0.35,2.01l0.54,1.65l2.33,1.05l2.32,2.34l1.14,2.47l-0.54,2.78l2.56,4.28l-3.27,0.35l-3.37,1.99l-0.09,0.99l1.56,1.95l3.01,5.88l-0.52,3.35l-2.88,5.75l-0.08,0.91l0.91,1.88l1.73,1.1l3.62,4.07l0.87,4.27l2.58,8.11l-0.08,4.27l2.22,2.66l0.43,6.29l-1.31,5.46l1.16,3.82l-2.29,4.85l-0.31,1.91l-3.08,-0.2l-2.72,0.89l-4.06,2.67l-1.68,2.41l-2.03,-0.37l-1.56,1.44l-3.61,-1.72l-4.12,3.87l-2.02,0.43l-0.14,2.16l-2.46,0.28l-0.33,1.19l1.01,1.81l-0.6,1.92l2.0,3.46l0.03,1.33l-5.0,1.5l-7.99,0.94l-3.74,1.92l-1.58,2.17l-1.55,0.84l-2.19,4.11l-5.81,-0.33l-3.22,0.68l-2.11,-0.83l-3.44,0.0l-2.43,-0.97l-5.57,-0.17l-1.37,0.34l-1.78,1.22l-0.99,-0.42l-1.84,-2.18l-0.92,-0.16l-1.27,1.03l-0.14,2.59l-0.74,1.18l-3.84,-0.28l-2.59,1.74l-1.17,-0.53l-0.57,-1.75l-2.37,-0.04l-2.32,-0.61l-1.05,0.33l-3.98,4.14l-1.67,1.07l-2.44,-1.68l-0.93,-1.62l-0.85,-0.62l-1.7,0.39l-1.03,1.57l-3.34,0.57l-1.41,-0.09l-2.4,-1.37l0.96,-3.7l-0.72,-1.17l-2.43,-2.02l0.44,-3.04l-0.48,-1.28l-2.14,-1.98l-4.99,-0.43l-0.78,-2.28l-3.4,-1.56l-2.08,-2.1l-0.98,-3.23l0.61,-4.91l-0.92,-2.86l-1.82,-2.47l-2.59,-2.09l-7.17,-10.71l-1.26,-3.84l-1.36,-2.16l-6.26,-3.52l-0.73,0.71l0.89,3.2l-0.41,0.49l-5.41,0.36l-1.22,0.34l-1.77,1.25l-2.65,-0.53l-3.71,0.06l-0.93,-0.96l-0.25,-1.17l0.5,-5.89l-0.34,-1.13l-2.01,-0.45l-1.35,-1.65l-3.42,0.71l-0.27,-3.95l-1.02,-0.43l-1.95,0.48l-0.51,-2.32l-0.76,-0.23l-1.69,0.76l-1.71,-2.82l0.89,-6.75l1.43,-6.15l4.42,-7.19l-0.2,-3.32l0.98,-3.48l1.95,-4.49l-0.45,-4.2l1.53,-4.49l7.58,1.96l1.0,-0.1l0.61,-0.87l-0.49,-2.74l0.72,-0.87l2.91,1.04l2.04,-1.9l2.38,-0.56l3.32,-1.7l2.46,-0.7l0.35,-1.16l-0.65,-1.85l0.61,-1.72l1.3,-1.37l5.17,-2.86l1.55,-1.63l1.63,-5.19l0.07,-4.14l0.47,-1.61l2.92,-2.6l0.65,-1.06l0.2,-1.02l-0.43,-2.06l0.61,-4.14l-0.61,-0.73l-1.3,-0.13l-0.9,-2.56l2.48,-0.54l0.72,-0.55l0.06,-1.03l-1.17,-1.63l4.26,-2.71l0.71,-1.44l-1.2,-1.21l-3.05,-0.44l-2.46,-1.89l1.22,-1.19l0.24,-1.06l-1.87,-4.04l0.04,-3.42l-1.35,-2.01l0.64,-1.67l2.29,-0.47l5.6,-2.71l2.12,-2.29l1.88,-3.97l-0.14,-0.92l-1.76,-2.51l0.09,-4.33l-3.64,-4.38l-2.56,-1.91l-1.62,-3.34l-0.37,-3.89l3.19,-2.91l5.74,-1.65l2.05,-0.09l0.74,-0.42l1.7,-2.38l3.48,-0.41l0.61,-0.59l0.24,-1.84l2.97,1.97l3.5,-0.03l1.94,0.74l4.72,-2.45l1.4,-1.33l1.66,-3.88l3.83,-2.58l1.04,-1.18l0.24,-1.86l-0.39,-2.55l2.2,-1.65l4.54,8.35l0.27,1.94l-0.56,3.32l0.3,1.93l2.17,1.74Z", "name": "Centre"}, "FR-E": {"path": "M25.58,287.69l1.04,-2.41l0.98,0.55l19.61,-4.42l3.68,1.03l0.91,-0.39l0.49,-0.87l0.61,-2.85l-1.17,-2.23l-0.57,-2.79l-1.02,-0.95l-2.91,-0.8l-1.21,-1.65l-1.35,0.5l-3.1,-1.99l-2.05,0.54l-2.97,5.52l-0.73,0.25l0.61,-1.76l-1.16,-2.68l0.93,-1.65l-0.39,-1.32l-1.1,-0.43l-3.22,-0.13l-0.03,-1.29l2.05,0.17l1.03,-0.57l-0.1,-1.68l1.52,-3.15l0.48,0.22l-0.73,3.09l2.11,1.3l5.35,-0.38l1.35,0.97l1.08,0.22l5.65,-1.06l1.72,0.92l5.01,-1.07l0.32,-1.08l-0.43,-0.4l-1.81,0.13l-0.45,-0.22l-0.21,-0.91l-0.7,-0.16l-1.07,0.79l-1.23,-1.21l-2.15,0.22l2.94,-3.06l-0.3,-0.67l-1.26,0.09l-1.26,0.92l0.0,-0.61l-0.86,-0.4l-0.97,1.21l-0.97,-0.21l-1.86,1.29l-0.47,0.09l-0.42,-0.89l-0.61,-0.05l-2.2,1.04l3.37,-4.1l6.46,-3.99l0.16,-0.51l-0.48,-0.22l-4.21,1.88l-4.19,0.71l-5.77,3.26l-2.93,0.72l-1.85,0.93l-1.06,0.14l-4.34,-1.31l-0.61,0.47l-0.42,1.47l-3.53,-0.26l-0.72,-2.19l1.06,-0.51l-0.1,-1.18l-1.04,-2.54l-0.09,-1.62l0.29,-1.61l0.61,-1.07l1.0,-0.32l0.28,-0.95l-1.51,-1.32l0.55,-2.36l2.34,-4.03l1.49,0.39l-0.21,-0.84l0.61,-0.42l2.84,-0.54l3.06,1.43l1.08,-0.19l0.21,-0.62l-1.71,-2.84l0.4,-0.28l2.74,0.7l1.52,-0.37l-1.52,-0.97l0.12,-0.64l-0.57,-0.65l4.39,-0.01l3.43,-1.22l1.34,-0.04l0.37,-0.3l-0.18,-0.44l-1.03,-0.65l1.54,-0.31l3.22,-1.6l1.34,0.06l0.87,1.05l-0.41,1.86l0.44,0.48l1.59,-0.22l2.32,-1.25l2.95,0.68l0.39,-1.09l-1.07,-0.61l0.16,-0.47l1.92,-1.69l2.43,-0.7l1.25,0.09l1.02,0.6l0.74,-0.43l0.35,0.8l0.76,0.26l1.02,-1.23l-0.06,-1.4l4.47,-1.78l-0.23,1.95l0.63,0.46l-0.33,1.02l1.03,1.22l-0.04,2.24l2.17,-1.74l1.05,-0.29l-0.46,0.48l0.08,0.81l3.35,3.22l0.64,-0.01l0.46,-0.63l-0.29,-0.87l0.32,-0.81l-0.57,-1.79l0.79,0.43l0.23,-0.4l0.01,-3.26l0.25,-0.53l0.94,0.17l0.44,-0.97l1.6,0.67l2.76,-0.14l2.83,1.9l2.57,-0.45l0.27,1.42l1.62,0.5l1.99,-0.06l1.06,-0.94l-0.7,-3.74l3.29,-0.85l-3.02,-3.48l-0.21,-1.24l2.31,-1.52l1.58,-2.96l0.67,0.45l1.84,0.11l2.23,1.26l-0.34,0.77l0.33,0.57l2.26,0.04l1.73,-1.46l5.83,-2.45l1.17,0.01l1.67,-2.09l0.52,0.12l0.28,2.76l-1.23,2.74l0.91,1.6l0.99,-2.24l1.8,-2.24l1.88,-1.78l0.83,0.05l1.54,-1.44l0.86,1.01l-0.39,2.36l0.71,0.78l-1.1,2.93l-1.66,2.4l-0.08,0.93l0.4,0.4l0.82,-0.23l3.04,-5.67l0.73,0.17l1.34,-0.66l0.72,0.34l-0.02,0.95l-1.78,1.21l-0.15,0.89l0.8,0.4l0.26,0.67l1.57,0.61l4.04,0.5l0.01,1.53l-0.81,0.8l0.18,0.91l7.19,6.91l0.89,3.73l-0.05,1.65l2.77,2.02l3.21,1.57l-1.07,1.96l0.25,0.69l1.08,0.29l1.88,1.94l0.65,-0.23l0.26,-2.55l2.14,0.11l1.18,-0.47l3.23,-4.25l5.89,-3.48l0.86,-0.97l0.1,-0.9l-1.02,-0.55l1.66,-0.51l1.02,0.15l0.45,1.06l0.52,0.22l3.52,-1.89l2.07,-2.41l0.64,0.93l1.2,0.28l-2.86,3.72l0.05,0.58l1.56,0.9l3.4,-2.58l0.41,2.3l1.31,1.61l0.32,1.94l0.59,0.3l1.22,-1.16l0.73,0.99l1.4,-0.47l0.2,-0.98l-0.68,-0.65l0.99,-1.11l1.67,0.8l-0.99,-2.6l2.3,-0.82l2.58,-0.26l1.32,2.51l0.43,1.93l1.19,1.07l-0.3,1.23l1.55,2.36l0.33,1.1l-0.23,1.96l0.23,0.41l0.46,-0.1l2.43,-1.83l0.01,-0.66l-1.44,-1.01l0.18,-0.78l-0.94,-2.07l0.89,0.72l0.49,0.0l0.13,-0.47l-1.08,-1.77l-1.86,-0.74l-1.64,-3.71l0.14,-0.55l1.0,-1.3l1.06,-0.4l0.65,-1.74l2.2,0.0l0.23,-0.81l5.04,-1.02l0.56,1.44l-1.39,2.27l-0.04,2.38l1.68,1.96l2.69,0.74l4.54,0.06l4.84,-0.75l2.99,-1.62l3.64,10.01l1.9,3.39l3.27,2.8l2.45,0.25l1.96,-0.73l2.78,-2.25l2.08,-0.9l2.22,-2.82l2.36,0.04l6.13,1.76l2.34,1.48l-0.2,6.73l0.77,9.6l-1.95,4.78l1.11,3.0l0.8,5.55l-0.73,2.04l0.74,5.71l0.56,1.33l1.19,1.29l0.09,5.3l-1.36,0.75l-4.18,0.71l-2.2,2.22l-3.52,11.89l-1.14,2.06l-0.42,2.27l-6.44,-1.27l-1.52,-1.95l-1.3,-0.64l-3.37,-0.01l-1.85,1.44l-6.34,3.01l-1.86,1.53l-1.19,1.81l-2.58,1.8l-7.3,2.35l-3.73,-0.93l-5.63,2.42l-4.45,0.44l-3.34,2.21l-0.46,1.56l0.14,2.34l-1.45,5.84l-0.55,1.03l-2.15,1.57l-1.12,2.38l-0.64,0.17l-0.22,-1.6l-0.55,-0.59l-3.14,1.03l-1.54,-1.0l-0.93,0.05l-0.9,0.59l-1.08,2.16l-1.37,1.47l-3.34,0.34l-1.92,-0.93l-1.37,0.41l-0.46,0.75l-0.62,-0.07l-0.44,-0.28l0.42,-1.44l-0.72,-1.23l0.31,-0.27l7.15,-0.74l0.42,-0.33l-0.29,-0.45l-1.17,-0.28l-2.62,0.27l-5.66,-2.01l-2.93,0.77l-2.11,0.0l1.24,-1.33l0.31,-1.7l-1.35,0.9l-2.72,0.29l-0.31,0.4l1.16,0.84l-2.2,-0.55l-0.63,0.31l-0.09,1.95l-0.48,0.28l-2.02,-0.7l-4.28,1.19l-2.57,-0.32l-2.25,-3.35l-1.35,-0.58l-0.65,-0.82l1.61,-0.24l1.15,1.83l1.16,-0.65l0.65,0.53l0.68,-0.24l0.21,-1.12l0.64,0.67l1.71,0.52l1.67,-0.16l1.49,-0.93l-0.18,-0.96l2.22,-3.1l0.35,-1.86l-1.9,-2.24l-0.27,0.94l0.65,1.08l-0.82,0.4l-0.12,0.71l0.42,0.53l-1.78,-1.11l0.65,-0.06l0.01,-0.47l-0.84,-1.16l-2.77,-0.87l-0.44,0.24l0.4,0.65l-3.66,0.61l-1.42,1.82l-2.11,0.75l-0.47,-1.02l-1.31,0.54l-0.19,-1.46l0.69,-1.29l-1.59,-0.65l-0.49,-1.77l-0.85,-0.34l-0.4,0.45l0.47,4.71l1.98,3.71l-0.39,-0.57l-0.79,0.06l-1.82,-2.04l-0.48,-0.04l-0.17,0.45l0.18,1.13l-0.46,-2.36l-0.53,-0.32l-0.66,0.44l0.0,1.86l-1.27,-0.53l-2.62,1.09l0.11,-1.03l-1.36,-1.05l-0.93,-0.02l-0.59,0.7l-1.73,-2.7l-1.98,-1.38l0.8,-3.38l4.44,-2.07l0.19,-0.54l-0.38,-2.37l-0.62,-0.33l-0.68,0.34l0.01,-1.85l-0.4,-0.42l-0.73,0.22l-0.34,0.67l-1.35,-0.52l-1.29,0.56l1.49,1.25l0.53,1.73l-0.96,0.06l-1.64,1.08l-0.2,0.65l0.59,0.82l-0.65,0.45l-0.65,1.71l-2.04,-2.25l-1.17,-0.4l-0.18,-0.92l-2.14,-1.01l-2.11,-0.23l0.6,-0.53l0.09,-1.29l1.59,-0.24l1.28,-2.99l0.87,-0.89l-0.26,-1.05l-3.4,3.23l-3.3,1.66l1.14,1.45l-4.61,1.16l-0.61,-0.19l-2.02,-2.73l-2.02,-3.65l-2.0,0.27l-4.17,-0.53l-1.4,-1.21l-3.4,-0.28l-0.44,-1.08l-0.73,-0.46l-3.3,1.67l-0.97,-0.78l-3.46,0.23l-2.11,-3.2l0.09,-1.26l-0.37,-0.49l-1.33,-0.52l-0.25,-1.01l-1.16,-1.33l-1.71,-1.17l-1.77,-0.38l-0.46,0.51l0.52,1.75l-0.38,1.18l-0.22,0.25l-0.51,-0.54l-1.37,0.31l-0.79,0.7l-1.41,-1.15l-2.42,-0.78l-1.77,-4.09l-1.11,1.58l0.42,1.49l1.5,1.94l-2.06,1.02l-0.9,-1.56l-0.45,-0.19l-1.15,0.56l-0.17,1.12l0.78,0.83l-0.27,1.07l0.4,0.4l1.27,0.0l-1.83,1.89l-2.25,0.91l-8.52,-0.41l-0.06,-1.86l1.22,-0.21l0.51,-0.87l-0.21,-1.91l-1.53,-4.88l-3.94,-5.59l-6.1,-4.68l-2.5,1.73l-1.83,-1.7l-3.16,-0.08l-3.85,-1.09ZM122.83,329.88l0.13,0.1l-0.09,0.43l-0.04,-0.53ZM122.52,334.12l0.22,1.49l1.8,3.04l-1.07,-0.3l-0.6,0.31l-0.71,-2.96l0.37,-1.57ZM115.62,347.05l4.0,2.08l3.82,3.64l0.93,0.41l1.64,-0.08l0.36,0.42l-0.19,1.25l-1.31,0.39l-4.66,-0.43l-3.89,-1.51l0.15,-1.36l-1.43,-4.0l0.58,-0.8ZM0.9,248.77l2.97,-1.35l1.62,1.16l-2.63,1.4l-0.59,-1.17l-1.37,-0.03Z", "name": "Bretagne"}, "FR-D": {"path": "M572.77,294.7l2.05,3.2l1.34,0.98l0.94,0.05l2.46,-2.01l13.22,-1.78l1.29,-0.96l0.21,-2.17l1.83,-1.36l3.71,0.55l2.38,-1.14l1.99,1.39l3.67,0.8l0.58,0.63l-0.54,1.25l0.39,0.89l2.84,1.16l0.62,0.65l-1.02,2.34l0.33,1.69l1.28,0.68l1.66,-1.44l3.03,3.95l2.44,4.7l0.04,1.32l-2.61,0.64l-0.81,1.52l1.41,2.24l0.36,3.25l0.81,2.17l1.63,0.72l1.83,-1.7l0.37,0.08l2.15,3.26l2.68,1.82l2.04,-0.29l1.44,-1.93l0.71,-0.32l1.31,2.59l3.65,2.48l0.69,2.45l0.71,0.44l1.03,-0.19l2.07,-1.59l1.54,1.34l1.32,-1.15l2.13,0.75l1.2,-1.39l1.07,-0.54l1.19,1.08l-0.01,2.27l1.13,2.33l-0.08,1.75l-1.9,2.67l-1.76,0.37l-1.03,0.96l-0.57,2.85l0.54,0.87l2.04,0.96l0.58,3.99l2.33,2.66l0.39,5.14l1.09,1.67l-1.66,7.62l-6.1,10.18l-5.32,2.93l-0.44,1.36l0.44,3.01l-2.29,1.36l-1.2,1.37l1.59,3.4l3.44,3.74l2.4,1.47l1.61,0.34l1.67,1.58l2.01,0.74l-1.07,1.88l-4.39,0.71l-1.18,1.3l0.33,1.55l1.87,1.92l-0.91,2.57l1.47,1.6l1.78,7.23l-1.04,4.03l-1.84,1.27l-0.8,1.22l-0.19,2.24l0.6,1.72l2.83,1.93l0.45,1.14l-1.04,1.12l-4.31,1.01l-1.25,0.68l-4.11,-1.13l-1.53,-0.92l-2.16,-2.28l-1.59,-0.6l-2.08,0.21l-4.97,1.58l-4.17,-1.59l-2.25,0.46l-1.84,4.95l-0.85,4.87l-1.46,2.94l-0.16,2.24l-3.53,7.73l-1.32,5.59l0.1,1.05l-2.89,-0.37l-0.98,-0.87l-0.99,-2.98l0.05,-2.06l-1.71,-1.44l-0.19,-2.19l-2.65,-1.28l-1.12,0.71l-0.53,2.23l-1.0,0.29l-2.36,-2.32l-3.36,1.2l-4.53,-1.65l-0.96,0.13l-0.67,1.01l-1.27,5.18l-1.75,2.39l-1.51,1.26l-1.61,0.66l-1.62,0.02l-4.83,-1.44l-3.09,0.75l-4.17,-1.07l-4.26,1.48l-1.39,-0.08l-2.06,-1.7l-2.78,-1.24l0.1,-3.19l-0.63,-2.02l5.31,-3.01l1.5,-1.51l0.08,-1.05l-0.86,-1.49l0.04,-1.61l-0.52,-1.46l0.64,-3.47l-0.8,-3.63l-2.07,-1.53l-4.18,-1.03l-2.7,-2.59l-1.71,-0.08l-3.83,-2.25l0.36,-3.65l-0.37,-2.12l-1.06,-0.81l-1.57,-3.05l-2.42,-2.49l-0.5,-1.91l-1.52,-2.83l-2.0,-0.53l-0.46,0.28l-0.44,2.29l-1.35,0.98l-0.44,2.1l-3.81,2.32l-1.29,0.32l-0.45,-0.25l-0.04,-1.75l-1.67,-2.96l-2.44,-0.35l-2.29,2.21l-2.62,-1.24l-1.84,-0.34l-1.88,0.13l-3.02,1.22l-3.33,-3.26l-1.31,-0.42l-1.58,0.12l-1.81,-1.02l-2.28,-2.7l0.24,-3.61l2.35,-5.12l-1.16,-3.85l1.31,-5.42l-0.44,-6.45l-2.26,-2.8l0.11,-4.17l-2.6,-8.2l-0.9,-4.35l-3.61,-4.15l-1.86,-1.22l-0.73,-1.46l2.92,-6.28l0.56,-3.67l-3.11,-6.23l-1.47,-1.85l0.1,-0.41l2.29,-1.29l2.94,-0.24l1.27,-0.45l0.24,-0.52l-2.69,-4.62l0.57,-2.61l-1.25,-2.8l-2.53,-2.58l-2.27,-1.0l-0.29,-1.05l0.23,-1.59l0.78,-0.71l4.06,-0.49l4.77,-2.67l0.52,-0.96l-0.08,-2.47l0.81,-1.85l-0.97,-2.53l-0.14,-2.65l1.56,-0.3l1.46,-1.72l2.5,-1.78l2.07,-4.87l-0.62,-3.16l-3.85,-4.03l-1.44,-5.19l-1.91,-1.49l-3.84,-0.86l0.77,-3.4l3.72,-2.66l1.67,-3.21l0.11,-0.8l-0.86,-1.74l-0.19,-1.73l1.16,-4.16l0.42,-0.44l3.03,0.07l2.26,-1.04l4.61,0.57l6.24,-1.07l2.53,0.54l0.71,-0.44l2.16,-3.09l0.67,0.56l0.63,3.07l0.74,0.37l1.85,-0.15l2.82,1.83l5.43,7.28l0.77,4.37l-1.84,2.55l0.13,1.19l2.18,1.04l3.08,2.4l2.14,-0.2l0.78,-1.38l1.02,0.28l1.06,2.51l1.93,2.25l4.57,8.03l-1.6,0.91l-0.04,1.08l2.03,1.31l2.23,-0.36l0.17,3.16l0.84,1.54l2.43,0.62l2.82,-0.21l1.98,0.77l0.73,-0.1l1.67,-1.34l1.7,0.51l2.06,-0.09l2.03,-1.88l2.69,1.28l0.64,-0.93l0.02,-1.87Z", "name": "Bourgogne"}, "FR-K": {"path": "M419.37,770.27l0.81,-3.38l0.96,-0.93l6.34,-1.36l1.61,-0.04l2.88,0.85l1.43,-0.36l1.22,-1.47l0.65,-3.39l1.51,-1.85l6.14,-0.86l3.35,0.61l0.97,-0.51l0.4,-1.04l-0.74,-1.99l-3.09,-1.76l-2.07,-2.72l-1.47,-0.1l-4.96,1.12l-3.17,-1.69l-0.42,-3.14l-1.12,-1.15l-1.49,-0.73l1.48,-2.31l2.2,-0.1l2.99,-1.27l0.65,-0.99l-0.69,-3.62l-1.98,-1.8l0.24,-0.61l2.52,-1.06l0.33,-0.92l-1.18,-4.75l-1.85,-1.91l1.02,-1.65l-0.14,-1.77l-0.8,-1.55l-1.36,-1.19l-2.79,-0.35l-2.43,-1.39l-5.03,-1.89l-2.53,-2.3l-1.03,-4.43l0.54,-3.08l1.15,-1.81l0.26,-1.45l3.81,-0.82l1.18,-1.02l-0.19,-3.15l1.51,-1.9l0.46,-1.37l1.36,0.45l0.19,1.39l0.84,0.62l4.14,-1.82l4.72,-0.67l1.8,1.87l1.22,0.56l1.5,0.11l3.85,-0.74l2.64,1.49l1.45,-0.78l0.35,-1.23l-0.32,-1.54l1.12,-1.39l7.11,1.44l5.76,-0.43l6.53,0.6l2.45,-0.68l3.24,-2.63l0.42,-0.83l-0.68,-2.02l0.6,-2.45l-0.19,-0.92l-2.2,-2.94l0.05,-2.65l1.1,-2.76l2.51,-0.4l4.35,1.9l1.1,-0.1l6.92,-3.03l2.96,-3.42l2.74,-0.58l2.55,0.89l1.37,-0.41l1.0,-2.12l-0.14,-2.03l0.44,-2.24l-0.73,-2.14l0.41,-1.85l1.58,-0.43l6.2,0.82l1.41,-0.5l1.55,-1.89l0.72,-2.75l1.63,-1.2l2.89,-0.31l1.39,-1.17l1.0,-3.03l5.43,-5.55l0.13,-1.14l-0.47,-0.85l-2.93,-2.52l-2.63,-0.6l-1.18,-1.25l-1.68,0.19l-0.95,-0.73l2.17,-1.61l0.27,-2.57l0.86,-1.31l2.1,-1.54l-0.42,-1.84l-2.0,-1.22l-6.02,0.32l-0.56,-1.89l-1.0,-1.3l-4.04,-2.45l-1.32,-0.24l1.45,-3.75l-1.04,-2.33l-0.29,-2.33l0.72,-2.87l0.15,-2.84l-3.33,-5.18l-0.09,-4.17l-1.11,-2.32l-5.19,-6.8l0.8,-2.57l1.89,-3.32l1.74,-8.27l0.48,-0.92l1.74,-1.36l0.66,-3.79l0.74,-0.85l0.49,0.01l1.38,1.98l1.24,-0.05l4.81,-4.41l2.4,-0.31l3.68,-2.32l1.91,-0.26l1.14,3.38l3.5,6.75l1.3,1.46l1.27,0.48l1.32,-0.71l3.38,-0.42l1.06,-1.02l0.57,-2.66l0.88,-0.37l1.67,0.18l0.85,0.78l-0.48,1.79l0.29,0.91l4.51,1.09l4.08,3.87l4.49,2.14l-0.03,3.29l2.5,9.95l2.81,3.84l2.22,7.93l1.76,1.71l1.65,2.99l-0.83,2.37l0.49,3.73l0.65,0.86l4.86,-0.57l1.07,1.18l4.93,2.76l1.53,0.35l0.81,-0.25l1.6,-1.74l3.36,-2.48l2.41,-0.43l0.38,0.55l-0.03,2.43l0.82,0.87l1.0,0.3l1.9,-1.04l0.64,-2.6l3.6,-0.33l1.67,0.76l2.19,2.3l4.31,1.59l0.57,1.92l1.24,1.78l0.1,1.8l1.91,2.08l-0.15,5.55l0.45,3.15l0.64,0.51l1.22,-0.45l1.18,0.24l4.27,5.49l0.24,0.86l-0.09,0.41l-1.63,0.18l-0.07,2.78l-1.07,1.44l-1.67,1.35l-2.8,1.32l-5.36,4.05l0.39,5.72l-1.95,5.45l0.01,2.15l-0.44,1.28l-4.46,-1.42l-2.04,0.64l-1.5,1.19l-1.67,2.39l-1.37,3.3l0.44,1.11l1.6,0.3l-0.54,1.61l-2.32,0.66l-0.61,1.56l-1.54,0.5l-3.46,2.78l-2.01,0.54l-1.44,1.2l-1.18,0.35l-0.94,2.35l-2.28,-0.33l-1.56,-1.02l-1.72,-5.59l-1.8,-1.41l-2.81,-0.29l2.04,-1.54l0.58,-1.28l-0.42,-0.56l-5.32,1.15l-2.81,2.01l-3.83,1.19l-5.69,4.39l-1.42,3.08l-5.07,2.15l-0.24,0.89l0.43,0.4l2.63,-0.39l-7.66,4.38l-2.05,1.74l-4.98,6.14l-1.03,0.45l-2.27,-1.13l-1.83,0.27l-2.27,1.15l-8.45,6.47l-1.13,1.41l-1.41,3.09l-2.19,2.14l-2.0,3.55l-1.44,-1.08l1.64,-1.51l-0.27,-0.83l-2.0,-0.12l-1.09,0.46l-0.33,0.87l0.47,2.32l2.46,2.54l-1.4,2.14l-0.63,4.11l-1.17,2.13l-0.37,-0.45l0.96,-2.03l-0.41,-0.59l-1.63,0.4l-0.56,1.21l0.89,2.7l1.86,1.89l-0.87,0.71l-1.39,-0.56l-0.44,0.2l-0.36,2.7l-3.13,2.98l-0.02,0.53l1.36,2.32l3.28,1.0l0.83,0.76l0.28,4.25l-0.71,4.12l-0.63,-0.95l-0.66,-0.01l-0.72,1.96l0.88,1.48l1.38,0.45l0.69,7.29l0.65,1.74l4.33,4.47l1.9,2.62l-0.01,2.08l-3.87,0.68l-3.04,-0.1l-1.82,-0.78l-1.61,-2.4l-2.87,-0.31l-1.18,0.64l-2.18,-0.63l-1.94,1.51l-3.1,0.27l-3.75,2.98l-4.82,-0.09l-1.23,0.6l-3.22,2.89l1.11,2.67l-6.43,-1.13l-0.84,0.7l-0.47,1.26l-0.65,0.25l-4.01,-2.06l-1.68,-2.74l-2.77,-0.45l-6.18,-3.28l-5.7,1.38l-3.03,-0.32l-1.13,0.6l-1.01,2.09l-2.46,2.19l-3.04,0.8l-2.46,-1.51l-1.32,-4.24l-1.07,-1.66l-3.53,-0.82l-3.45,-2.36l-5.13,-1.08l-0.81,-0.34l-0.32,-0.69ZM436.05,775.98l0.98,-0.26l0.19,-0.57l-1.32,-2.61l-1.13,-1.02l-0.89,0.52l-0.67,1.49l0.08,1.26l0.96,0.9l1.81,0.29ZM550.06,686.86l3.86,-3.8l1.24,-0.42l-5.1,4.22Z", "name": "Languedoc-Roussillon"}, "FR-J": {"path": "M527.01,213.62l-0.11,1.4l-0.53,0.83l-2.41,0.07l-1.08,0.49l-0.16,0.77l1.11,1.37l-1.57,1.82l-0.26,1.75l0.53,0.71l1.23,-0.03l1.67,2.18l0.71,3.42l-0.51,2.22l0.28,1.92l0.91,0.63l2.19,-0.35l1.55,2.25l-2.51,2.22l-1.05,1.67l-0.92,2.75l-3.44,1.53l-0.08,0.76l0.96,1.73l-1.79,2.18l0.61,2.36l-0.39,3.38l-2.33,3.26l-2.66,-0.42l-6.16,1.07l-4.69,-0.56l-2.32,1.05l-3.28,0.01l-0.78,0.88l-1.15,3.78l0.03,1.96l0.89,2.73l-1.51,2.91l-3.77,2.73l-0.94,3.95l-5.9,2.15l-1.34,-0.09l0.3,-1.95l-1.17,-0.58l-2.71,0.53l-1.78,1.95l-1.86,0.95l-8.31,-0.68l-4.03,0.77l-1.28,-0.56l-0.29,-1.2l0.55,-0.64l2.04,0.32l0.78,-0.49l0.19,-0.9l-0.52,-1.47l0.66,-1.15l0.12,-1.5l-1.38,-1.8l-3.36,-2.25l-0.97,-3.78l-1.31,-2.14l-2.64,0.19l-2.85,-1.6l-0.88,0.19l-1.36,1.44l-1.38,0.4l-0.75,-0.46l-1.13,-1.91l-1.71,-0.66l-2.06,2.74l-1.99,0.93l-8.67,2.01l-0.72,-0.5l-0.01,-0.61l1.67,-2.22l-0.0,-0.79l-1.9,-2.04l-0.62,-3.34l-2.14,-2.83l-0.33,-3.02l-0.85,-0.53l-2.09,0.45l-5.27,-2.88l-1.19,-2.06l0.06,-2.49l-0.48,-2.36l-2.95,-2.75l-0.78,-2.87l-3.88,-2.87l-1.33,-1.79l-0.62,-1.75l-1.41,-1.07l-0.0,-1.22l1.29,-1.78l0.48,-1.88l-2.37,-2.36l0.46,-4.54l-0.3,-2.21l-4.76,-8.82l-0.38,-3.3l-2.13,-1.03l0.25,-2.56l-0.68,-2.4l8.08,-2.22l2.47,-1.34l3.14,-10.33l1.58,-3.22l1.21,2.8l0.97,0.78l3.4,0.35l5.9,1.68l6.32,-0.94l5.0,-3.17l3.64,2.47l2.47,0.31l3.98,1.78l1.85,0.12l2.23,-1.39l1.78,0.0l10.64,5.96l2.03,-0.27l1.08,1.69l1.38,1.16l2.94,-1.13l1.25,0.29l1.79,1.68l2.18,-0.48l1.24,0.97l1.41,0.34l2.4,-1.76l4.02,1.08l5.71,-1.26l1.58,0.97l2.36,-1.31l1.83,-0.04l2.02,-1.23l3.45,1.12l1.87,3.26l-0.52,3.33l0.71,1.6l8.87,7.94l0.88,0.31l1.71,-0.43l0.63,3.55l0.67,1.16l3.29,2.14l2.33,-0.05Z", "name": "\u00cele-de-France"}, "FR-I": {"path": "M685.01,434.33l-5.31,6.22l-1.03,1.9l-4.74,4.41l-1.84,0.37l-7.0,-0.5l-1.33,-3.29l-3.08,-2.86l-0.56,-0.07l-2.8,2.69l-0.49,1.27l-1.36,0.34l-1.18,1.41l-2.27,1.53l-1.92,-0.63l-0.3,-1.18l0.31,-2.61l-0.36,-0.62l-1.87,-0.51l-0.9,-1.25l-2.54,-1.12l-1.18,-3.48l-1.25,-1.09l-1.44,-0.48l-0.43,-0.79l-0.02,-2.82l5.46,-1.63l1.12,-0.84l0.37,-0.95l-0.62,-1.68l-2.58,-1.63l-0.69,-1.66l0.41,-2.37l2.38,-1.92l1.09,-4.3l-1.48,-6.56l-0.51,-1.23l-1.3,-1.32l0.94,-2.45l-0.28,-0.73l-1.72,-1.5l-0.2,-0.95l1.27,-0.87l3.9,-0.58l1.01,-1.09l0.45,-1.78l-2.35,-1.13l-1.69,-1.6l-1.75,-0.41l-2.19,-1.35l-3.31,-3.61l-1.36,-2.96l3.33,-2.29l0.28,-0.78l-0.62,-2.65l0.29,-0.85l5.24,-2.85l5.77,-9.4l2.24,-8.96l-1.14,-1.89l-0.56,-5.73l-2.21,-2.22l-0.59,-4.0l-2.49,-1.54l0.45,-2.38l0.71,-0.65l1.96,-0.52l2.03,-2.83l0.29,-1.57l-1.27,-3.19l-0.01,-2.31l-0.98,-1.22l-1.78,-0.21l-1.78,1.81l-1.49,-0.72l1.8,-4.25l1.34,-1.19l3.97,-0.71l3.2,1.92l1.57,0.35l6.71,-2.24l1.18,-1.2l0.28,-1.31l-0.19,-2.57l0.55,-2.88l-0.59,-2.51l0.85,-1.62l6.42,-4.61l2.41,-3.4l2.02,-0.86l0.39,-1.05l-0.27,-1.04l1.7,-1.08l1.57,-2.89l0.31,-0.17l0.19,0.57l-0.13,2.29l0.86,0.64l3.54,-2.51l2.66,-3.33l1.51,-0.34l2.76,0.62l1.12,0.8l0.85,1.22l-0.05,1.55l0.43,0.85l3.76,1.96l2.51,-0.26l2.39,-1.41l2.98,-0.22l2.24,0.93l5.34,3.45l2.52,0.46l2.67,-0.85l2.12,-2.91l1.06,0.46l2.95,3.62l3.4,1.77l6.19,5.01l1.53,0.24l0.12,1.39l0.9,1.15l8.6,5.02l0.93,0.91l0.86,1.81l0.15,3.21l-0.52,1.72l-1.54,2.44l0.0,1.6l0.97,1.04l2.57,0.44l3.26,3.66l0.82,1.49l0.15,1.6l-0.43,1.71l-2.03,-0.62l-3.14,0.52l-2.79,-0.79l-2.26,0.93l-0.13,1.45l0.89,2.21l-1.17,1.27l-2.45,0.87l-0.39,1.86l-1.4,0.82l-1.02,1.29l-1.13,2.71l0.43,0.5l7.28,-0.72l1.03,-0.47l2.07,2.07l-0.33,0.68l-1.74,0.85l-0.94,1.23l-0.92,0.25l-1.15,1.19l-0.5,2.05l0.22,2.14l-4.03,2.97l-2.97,3.79l-3.91,3.63l-1.76,0.61l-0.2,1.68l-3.32,2.26l-0.89,1.51l0.63,1.83l-1.24,1.79l-3.98,3.04l-6.52,2.06l-3.24,1.99l-0.91,3.38l1.07,2.38l0.08,2.0l-1.81,4.99l0.94,1.68l-0.18,1.9l-1.19,1.21l-2.12,1.15l-2.14,2.27l-4.43,2.45l-9.1,8.69l0.2,1.68l1.26,1.41l-4.85,6.99l-0.27,1.15l0.45,2.34l-0.64,1.48Z", "name": "Franche-Comt\u00e9"}, "FR-H": {"path": "M839.1,783.31l-0.56,-2.48l1.09,0.04l0.87,-0.73l0.97,0.13l1.09,-2.5l1.84,-0.29l0.76,-0.66l0.23,-1.99l0.9,-1.67l-0.37,-0.73l-0.73,-0.18l0.53,-2.15l0.67,-0.8l2.08,-0.75l0.24,-3.05l1.1,-0.35l1.74,1.11l1.25,-0.32l0.96,-1.02l0.81,-2.7l1.71,-0.13l3.85,-2.01l6.79,-1.46l2.04,-1.04l0.39,-1.79l3.75,-4.0l2.68,-0.24l4.29,1.03l1.55,1.02l1.19,2.72l1.14,0.07l2.19,-3.78l0.93,-2.49l-0.54,-1.96l0.45,-1.48l-0.33,-1.67l-1.72,-2.56l1.58,-2.33l-0.42,-1.61l0.2,-1.25l1.77,-2.0l0.09,-1.87l-1.02,-2.2l0.15,-2.24l0.78,-0.51l3.37,-0.39l2.29,2.03l-0.61,1.92l0.97,1.96l-0.25,1.51l1.15,7.58l-0.1,2.43l-1.97,7.76l-0.01,4.64l-0.45,1.12l0.9,0.88l0.08,2.3l1.16,2.16l2.31,1.3l0.52,-0.73l0.26,0.64l0.31,8.84l0.74,1.74l-0.8,5.15l1.67,6.51l-0.44,10.26l0.43,1.97l-0.77,3.26l-1.67,1.6l-1.61,3.09l-5.49,7.85l-0.57,8.76l0.53,5.67l-0.08,5.91l-1.17,0.97l-0.92,1.62l0.76,0.54l-0.37,1.74l-1.74,0.49l-0.11,1.13l-2.12,-0.35l-1.05,0.57l-0.65,2.56l1.2,0.59l2.92,-0.99l0.13,1.33l-1.26,1.41l-1.71,0.68l-1.08,1.6l-0.91,0.18l-0.29,2.52l0.83,1.06l-0.73,0.98l0.06,0.73l-3.5,1.86l0.75,1.71l-0.75,1.64l0.56,0.37l1.71,-1.23l-1.03,2.83l-1.12,0.98l-2.1,-1.59l-4.12,-1.27l1.3,-2.62l-3.08,-2.01l0.67,-1.09l-0.53,-0.89l-2.18,1.38l-0.31,-0.88l-1.05,0.42l-0.89,-0.9l-1.69,-0.57l-2.48,-0.06l-1.61,-1.37l-1.4,-0.35l-0.77,-1.03l-1.48,-0.22l0.52,-0.56l-0.26,-0.88l-3.47,-1.18l0.23,-1.58l-0.97,-1.0l1.09,-3.13l1.05,0.36l3.39,-1.58l0.89,-1.7l2.21,-1.92l-0.29,-0.66l-8.02,-1.43l-0.52,-0.55l0.46,-1.42l-0.38,-0.52l-1.67,0.01l-3.16,1.01l0.18,-0.48l-0.4,-0.54l-1.72,-0.27l1.54,-0.27l1.43,-1.25l0.24,-1.91l-0.67,-0.6l2.37,-0.45l2.07,-1.24l-0.13,-1.27l-0.83,-0.83l1.45,-0.81l-0.51,-1.62l1.46,-2.52l-1.62,-2.21l-1.32,-0.53l-1.38,0.17l-3.29,1.52l-2.54,0.17l-1.76,0.68l0.47,-1.93l-0.35,-1.28l-1.24,-1.48l3.57,-0.75l1.04,-1.62l-0.6,-0.87l0.3,-0.56l4.54,-2.31l0.48,-1.38l-1.4,-1.58l-1.71,-3.2l-2.34,0.26l-0.71,-1.26l-1.12,-0.67l-2.26,-0.35l0.14,-0.96l-0.76,-0.56l0.72,-0.51l0.17,-0.94l-0.4,-0.4l-1.06,0.0l0.71,-1.14l-0.24,-1.05l-0.56,-0.41l0.23,-1.04l-1.57,-0.93l0.1,-0.3l2.12,-0.07l1.46,-0.91l2.49,-0.49l2.28,-1.06l0.26,-0.98l-1.25,-1.24l-2.16,-1.07l-0.59,-1.15l-1.29,0.59l-0.0,-0.55l1.79,-1.08l0.05,-0.65l-1.35,-1.12l-1.58,0.01l-1.58,0.64Z", "name": "Corse"}, "FR-O": {"path": "M413.2,69.58l0.11,-1.12l-3.23,-2.56l1.12,-3.7l0.34,-8.25l1.76,-1.34l0.09,-0.54l-1.62,-2.5l-0.31,-1.25l-0.9,-8.63l0.27,-3.58l2.33,-7.12l-1.52,-7.52l1.29,-1.03l3.05,-0.85l4.62,-5.26l11.55,-5.06l1.26,0.15l2.02,-1.2l9.82,-1.25l11.15,-3.8l4.16,0.37l5.0,-1.32l3.12,-1.58l0.7,1.68l1.23,6.2l3.15,3.91l0.18,1.7l-1.64,1.81l-0.46,1.28l1.19,4.19l-0.54,2.33l1.22,1.04l0.85,1.76l1.6,0.59l1.74,-0.13l1.08,0.38l0.85,1.84l2.31,2.23l1.56,3.26l1.23,1.02l6.22,2.61l1.24,-0.81l1.82,-3.17l2.36,-1.96l7.91,-2.49l1.38,0.42l0.93,0.87l2.64,5.22l0.73,0.71l1.47,0.33l0.39,0.72l0.64,2.11l-0.83,1.73l2.11,8.21l0.5,4.36l1.83,1.94l3.89,1.77l4.41,-1.17l2.06,-1.65l0.69,-0.06l0.91,0.48l-0.62,1.53l0.87,1.08l4.16,0.1l2.54,0.89l2.05,2.79l1.06,12.04l2.26,2.27l1.34,-0.87l1.51,-2.93l1.08,-0.71l5.01,0.1l3.54,1.92l1.54,-0.05l4.97,-1.74l5.54,4.56l1.84,3.73l1.58,0.45l0.56,-0.77l-0.05,-0.96l0.39,-0.17l1.81,1.22l0.16,1.19l-2.7,2.81l-1.96,8.18l1.09,0.83l2.33,-0.43l1.75,5.88l-2.73,1.67l-1.64,1.68l-0.64,2.0l0.67,2.58l-2.01,0.63l-6.37,-2.33l-0.35,-3.85l-0.85,-0.71l-2.17,0.3l-2.76,1.75l-2.5,-2.21l-6.23,-0.77l-3.39,-0.85l-1.08,0.12l-3.89,2.1l-2.56,-1.15l-1.27,-0.05l-5.56,3.16l-0.86,0.08l-5.33,-1.62l-2.79,1.34l-3.54,-0.93l-2.0,-0.08l-4.15,0.95l-7.54,-5.05l-2.8,-0.44l-1.31,1.01l0.01,2.03l-0.44,0.67l-3.52,0.35l-2.6,1.51l-0.36,-0.63l-0.0,-2.86l-0.59,-1.17l-0.66,-0.35l-1.01,0.32l-3.34,2.76l-0.71,-0.08l-0.02,-0.83l1.12,-1.87l-0.07,-1.32l-1.29,-2.49l-2.14,-2.0l-0.81,0.27l-0.45,0.81l-0.23,3.73l-3.55,-1.83l-3.28,-0.74l0.21,-1.93l-0.84,-0.85l-1.19,0.0l-1.88,1.03l-2.2,-0.4l-2.49,0.28l-0.82,0.73l-1.02,2.09l-0.67,-0.02l-1.14,-2.28l0.38,-2.2l5.34,-4.6l-0.84,-1.62l-2.96,-1.66l-1.84,-0.13l-1.13,1.09l-1.58,-2.07l-0.97,-0.34l-0.78,0.51l-0.34,1.17l-1.01,0.43l-6.98,1.18l-4.54,0.12l-1.52,-1.23l-0.7,-2.67l-0.8,-1.02l-6.6,-3.77l0.98,-2.17l-0.98,-1.05l-1.5,0.16l-1.76,1.23l-1.45,-1.07l-1.39,-1.87l-1.15,-0.89l-1.2,-0.29l-3.86,0.27l-3.8,1.47l-1.42,-0.03l-1.25,-0.74l-1.38,-1.7Z", "name": "Nord-Pas-de-Calais"}, "FR-N": {"path": "M408.38,556.2l0.91,0.44l1.92,-0.65l2.61,1.04l4.01,3.23l1.3,2.14l4.09,2.43l1.55,0.03l3.21,-1.12l3.93,-2.11l2.16,0.82l1.99,-1.02l4.2,-0.21l0.62,1.31l0.9,6.69l4.35,8.22l-1.5,7.18l1.83,1.52l1.23,4.55l1.75,0.98l0.44,-0.3l0.5,-1.97l5.01,-1.73l0.98,0.09l1.12,1.27l0.64,0.09l1.37,-0.72l3.34,0.12l1.98,-0.24l1.26,-0.68l3.9,-4.84l0.6,-2.79l2.43,-4.04l0.63,-2.79l8.08,-8.46l1.99,2.79l0.35,3.18l0.87,0.34l2.52,-0.33l2.18,3.4l0.79,2.4l2.88,1.59l-1.23,1.77l1.65,6.84l2.92,2.99l5.23,6.82l1.05,2.18l0.1,4.19l3.32,5.15l-0.9,5.5l0.32,2.52l1.01,2.05l-1.39,3.21l0.08,1.1l1.58,0.44l3.9,2.34l0.8,1.02l0.34,1.84l0.65,0.48l6.26,-0.26l1.46,0.94l0.32,0.86l-1.91,1.4l-1.03,1.54l-0.21,2.47l-2.13,1.43l-0.13,1.0l1.39,1.14l1.67,-0.18l1.14,1.22l2.51,0.52l2.74,2.32l0.25,1.23l-5.31,5.34l-0.99,3.02l-1.08,0.95l-2.91,0.32l-1.88,1.36l-0.56,0.87l-0.32,2.09l-1.24,1.55l-1.49,0.39l-5.76,-0.82l-2.05,0.61l-0.69,2.44l0.73,2.23l-0.44,2.08l0.14,2.08l-0.66,1.51l-1.26,0.21l-2.19,-0.84l-3.04,0.64l-3.09,3.49l-6.65,2.92l-1.2,-0.05l-3.97,-1.76l-2.4,0.13l-0.77,0.45l-1.35,3.2l-0.07,2.89l0.54,1.3l1.7,1.85l-0.46,3.17l0.7,1.73l-3.21,2.95l-2.17,0.61l-6.44,-0.6l-5.8,0.43l-7.23,-1.43l-1.59,1.44l0.09,2.71l-1.0,0.78l-2.57,-1.49l-5.18,0.66l-3.14,-2.48l-5.05,0.72l-3.83,1.77l-0.46,-1.69l-1.87,-0.85l-0.77,0.39l-0.48,1.42l-1.61,2.09l0.3,2.67l-0.42,0.86l-3.57,0.62l-1.0,0.63l-0.37,1.68l-1.15,1.8l-0.58,3.26l1.1,4.84l3.39,3.03l4.59,1.56l2.51,1.42l2.66,0.3l1.08,0.94l0.83,2.56l-1.08,2.0l1.92,2.16l1.07,3.8l-0.07,1.0l-2.39,0.95l-0.61,1.4l2.07,2.02l0.56,3.41l-3.03,1.37l-2.35,0.16l-1.59,2.14l-0.07,1.51l2.06,1.08l0.65,1.08l0.02,2.42l2.73,1.9l2.44,0.34l4.93,-1.06l1.87,2.56l2.44,1.23l1.16,1.53l-0.56,1.17l-3.39,-0.6l-6.48,0.94l-1.84,2.18l-0.71,3.52l-0.94,1.07l-0.93,0.2l-2.88,-0.85l-6.65,0.91l-0.6,-0.72l-2.06,-0.86l0.44,-1.39l-0.34,-0.52l-6.91,-0.69l-4.13,-2.6l-2.77,0.75l-1.85,-0.09l-1.29,3.38l-0.89,0.36l-3.96,-7.32l-1.32,-0.57l-0.07,-1.45l-1.54,-0.41l-7.55,-0.02l-2.57,0.59l-0.9,-0.66l-1.64,-3.55l-1.32,-1.18l-6.5,-0.77l-1.98,-1.3l-1.95,0.91l-1.91,-1.53l-4.5,-2.31l-2.42,-0.13l-4.25,-1.18l-1.86,0.15l-1.65,0.84l-0.17,3.02l-0.83,2.26l0.51,1.0l-0.87,1.46l1.61,1.6l0.37,1.12l-0.06,1.17l-0.98,0.89l-9.69,-0.06l-1.2,-0.42l-3.4,0.67l-1.06,-0.21l-0.39,-1.18l-2.09,-1.52l-1.26,0.49l-2.75,3.45l-0.52,0.08l-2.26,-3.41l-4.48,-1.38l-2.23,0.95l-3.75,0.57l-4.68,1.73l-1.97,0.19l-2.25,-0.9l-1.02,-1.13l-1.36,-0.51l-0.27,-1.09l-1.39,-1.3l-1.0,-2.44l0.13,-1.38l-0.56,-0.4l-2.74,0.92l-1.35,-0.16l-0.79,-1.53l-3.38,-2.05l-0.7,-4.48l0.24,-1.55l1.77,-2.88l-0.27,-4.4l2.4,-2.78l2.78,-0.28l0.84,-0.65l0.31,-0.87l-0.39,-3.59l0.74,-1.06l2.36,-1.54l1.67,-3.29l1.64,-0.23l1.2,-3.81l2.43,-3.14l-0.56,-2.63l0.52,-2.56l0.68,-0.87l2.02,-0.85l0.45,-0.93l-1.08,-3.82l0.01,-3.91l-1.18,-0.63l-1.82,1.65l-0.37,-0.32l-0.06,-2.03l1.22,0.0l0.86,-1.06l-2.34,-6.09l-1.59,-1.35l-0.73,-1.74l-1.23,-0.87l-5.86,-1.26l-1.94,0.14l-0.81,-2.2l-0.88,-0.67l1.33,-2.72l-0.49,-2.13l1.42,-0.27l0.83,-0.81l1.31,-3.57l-0.83,-1.68l0.05,-2.55l1.48,-4.6l-2.35,-4.65l3.03,-2.48l2.13,0.37l2.18,-0.26l1.91,-2.03l2.48,-1.5l1.3,0.8l-0.76,2.29l0.66,1.54l1.48,0.61l2.85,0.05l1.26,-1.47l-0.22,-2.88l0.7,-1.2l1.77,-0.63l0.95,0.98l1.34,-0.02l1.3,-1.08l2.0,-2.97l5.6,1.75l9.95,-5.07l2.49,0.35l5.08,-1.73l1.68,0.84l2.19,2.07l1.59,-0.17l3.93,-2.31l1.14,-3.37l2.18,-1.39l0.77,-1.93l0.98,-0.26l2.21,0.79l1.78,-0.4l0.48,-1.69l-1.38,-1.59l2.07,-1.77l2.56,-6.28l-0.74,-1.29l-2.35,-1.02l-0.61,-1.19l0.82,-2.33l0.19,-2.56l0.59,-0.31l1.66,1.07l1.44,0.3l5.01,-0.43l1.17,-1.3l0.18,-3.79l-1.89,-2.26l-0.97,-2.73l-0.09,-2.23l-1.19,-1.92l0.08,-0.65l3.56,-2.13l3.6,-3.35l3.41,-6.01l0.78,-0.72l2.29,-0.57l4.57,-3.26l1.42,-2.44l-0.01,-1.11l-0.61,-0.94l0.12,-1.02l0.65,-1.0l2.36,-0.86l1.69,-3.04l2.14,-2.05l0.72,-1.26l-0.15,-1.97l0.75,-2.43l-1.32,-4.44l0.25,-1.16l5.43,-3.73l0.59,1.03Z", "name": "Midi-Pyr\u00e9n\u00e9es"}, "FR-M": {"path": "M625.45,152.34l1.44,-2.02l0.37,-3.97l1.35,-1.6l1.34,0.14l2.54,1.97l3.69,-0.04l0.91,1.48l0.89,0.27l1.49,-0.71l3.12,-2.75l2.22,-1.35l0.21,-0.93l2.87,5.21l-0.05,3.39l0.41,1.04l1.59,0.57l4.38,-2.61l2.33,0.98l1.07,-0.11l1.28,-2.15l1.31,-0.67l3.91,1.17l0.99,-0.36l1.36,-1.35l2.41,1.04l3.06,3.58l5.39,1.66l1.0,1.02l0.82,2.6l0.51,0.26l7.2,-1.01l1.58,-1.46l0.35,-1.47l1.93,-0.26l0.16,-0.92l2.92,-0.32l3.22,0.81l4.8,3.21l1.86,0.18l2.8,-1.01l5.52,2.76l0.95,0.93l0.43,2.11l3.52,4.15l-1.3,0.66l-0.34,1.14l0.39,1.09l5.12,5.27l0.01,1.59l1.47,0.96l1.03,3.38l0.67,0.2l0.76,-0.45l0.25,0.98l-0.46,2.28l1.02,1.74l3.53,0.37l2.32,0.86l1.0,-0.16l1.36,-1.86l-0.67,-3.02l0.26,-0.96l2.76,0.49l1.86,-0.17l4.31,2.22l1.12,0.1l-0.03,2.92l0.72,2.68l1.48,1.28l2.35,-1.17l0.33,-1.95l4.33,2.54l5.32,0.07l2.07,0.83l1.68,-2.21l2.37,-0.7l0.98,-2.25l2.22,-0.91l0.83,0.07l0.56,1.07l3.45,0.49l0.27,0.88l-0.54,1.27l3.13,4.24l1.49,0.91l2.62,0.45l1.23,0.64l1.04,1.76l0.87,0.6l-3.16,6.59l-1.38,1.82l-0.9,0.12l-3.41,-1.95l-9.1,1.44l-2.16,-0.91l-1.23,-2.24l-8.43,-2.98l-0.65,-0.85l-0.89,-3.42l-0.57,-0.64l-1.81,-0.27l-0.81,0.77l0.24,2.25l-2.14,3.22l-0.26,2.14l-2.51,2.32l-1.29,2.11l-0.18,2.03l1.04,1.84l1.44,1.09l4.76,2.09l-0.96,1.34l-0.36,1.59l0.92,1.02l0.99,2.29l1.47,0.3l1.72,-2.22l2.22,-1.08l0.96,-2.63l0.48,2.09l1.97,1.12l3.4,3.92l0.74,1.59l-0.23,1.22l-3.0,5.34l0.28,1.37l1.88,1.44l-2.2,7.08l-2.89,1.98l-1.18,1.77l-5.73,0.39l-0.82,0.64l0.08,0.64l3.2,1.8l-1.01,1.48l-0.59,8.92l-0.84,3.14l0.2,0.83l0.62,0.82l1.31,0.61l3.21,0.18l1.06,1.2l-0.02,0.87l-8.16,13.82l0.69,3.66l-1.64,2.58l-3.08,6.74l-3.51,4.93l-0.65,3.69l-1.52,3.18l0.5,2.86l-0.9,1.65l-2.18,0.99l-1.48,-0.18l-6.13,-4.97l-3.36,-1.74l-2.89,-3.57l-1.02,-0.61l-1.42,0.35l-1.82,2.68l-2.15,0.66l-2.2,-0.39l-5.27,-3.42l-2.43,-1.02l-3.41,0.22l-2.47,1.44l-2.12,0.21l-3.32,-1.76l-0.16,-2.1l-1.09,-1.55l-1.37,-0.93l-2.91,-0.65l-2.09,0.49l-2.72,3.38l-3.04,2.27l0.03,-2.71l-0.66,-0.74l-1.08,0.35l-1.68,3.01l-1.42,0.84l-2.43,-2.98l-1.63,-0.01l-1.2,0.75l-0.35,-1.07l0.11,-3.22l-0.65,-1.43l-3.48,-2.3l-4.4,-4.3l1.83,-4.57l0.52,-2.92l1.44,-1.65l-0.57,-1.68l-3.48,-2.83l-0.37,-2.77l-1.66,-1.16l-2.42,0.05l-3.01,-4.54l-1.81,-1.67l-2.08,-0.07l-2.03,1.89l-0.81,-4.14l1.96,-3.42l-0.08,-0.47l-6.02,-5.7l-0.8,-1.84l-1.67,-0.7l-3.06,-0.31l-4.92,-2.83l-4.26,-3.61l-2.86,-1.58l-2.74,-2.55l-1.15,-2.53l-1.36,-8.85l-4.34,-3.86l-0.27,-1.02l1.41,-2.54l-0.55,-3.36l0.45,-2.68l0.87,-1.47l2.6,-0.79l1.38,-1.11l0.59,-1.3l0.16,-4.03l0.86,-1.41l-0.58,-1.81l-2.04,-1.36l-0.4,-6.08l-1.79,-6.45l1.47,-3.31l-0.03,-2.44l4.23,-4.04l0.12,-1.18l-0.79,-3.08l3.34,-5.16l1.36,-4.09l-0.91,-4.02l-1.09,-1.06l-0.6,-2.28Z", "name": "Lorraine"}, "FR-L": {"path": "M452.25,434.51l3.68,4.56l0.92,3.23l0.57,0.71l3.62,1.22l1.76,3.11l0.81,0.02l0.84,-0.7l1.18,0.87l2.45,3.99l1.02,3.55l2.13,4.27l-0.33,4.79l2.06,4.92l0.01,4.71l-1.63,2.08l-1.57,3.74l-2.19,2.66l-1.81,0.05l-1.3,0.68l-2.66,2.32l-0.9,1.61l0.24,0.99l1.59,2.27l0.72,2.37l1.97,0.94l0.84,0.87l2.38,3.63l-0.25,4.46l-2.68,2.25l-0.72,3.18l1.86,3.48l0.25,4.71l1.12,1.13l-1.15,5.09l-0.89,2.05l-2.13,-0.11l-3.13,-1.84l-1.2,-0.02l-1.52,0.68l-0.21,0.82l0.95,1.06l0.16,1.02l-1.25,3.03l-1.06,0.73l-1.97,3.27l-3.11,1.55l-0.64,2.32l-2.65,2.36l-0.16,2.04l0.95,1.97l-0.03,1.53l-2.77,6.24l-2.8,2.33l-0.53,0.94l-0.04,0.82l1.6,3.29l-0.03,0.75l-4.22,1.35l-4.52,0.23l-1.94,1.0l-2.21,-0.81l-4.07,2.15l-3.11,1.08l-1.22,-0.04l-3.72,-2.26l-1.24,-2.08l-5.27,-3.94l-1.94,-0.58l-2.05,0.64l-0.75,-1.33l-0.72,-0.13l-3.74,2.48l-2.01,-2.52l-1.53,-3.13l0.29,-3.57l-0.38,-0.64l-0.77,-0.33l-4.02,0.02l-2.31,-1.55l0.62,-1.97l-0.11,-1.48l-0.77,-0.75l-2.15,-0.13l-0.09,-0.55l2.44,-2.73l0.22,-0.85l-2.19,-2.14l-0.21,-0.9l0.59,-2.57l2.18,-2.39l1.62,-1.08l0.72,-1.71l-0.66,-1.11l-1.96,0.23l-0.71,-0.44l-0.06,-0.86l1.19,-2.62l-0.38,-0.99l-1.77,-0.41l-1.8,-1.41l-1.98,0.27l-3.97,-2.13l0.03,-0.87l1.79,-1.91l-0.47,-1.61l-4.39,-1.29l-3.26,-4.98l-1.3,-0.95l-4.68,-0.09l-2.57,0.55l-1.38,-0.95l-0.68,0.22l-1.04,1.5l-1.43,0.38l-2.81,-0.95l-0.32,-0.79l0.7,-3.1l-1.58,-2.58l-1.63,-1.35l-2.69,0.03l-1.55,-0.32l-0.88,-0.71l1.27,-3.18l2.25,-2.1l1.25,-2.25l1.79,0.82l1.45,-0.0l1.04,-1.05l1.5,-10.48l3.94,-0.94l2.62,-2.14l0.46,-1.0l-0.02,-0.89l-2.05,-3.93l-0.66,-0.55l-1.48,0.46l-0.59,-0.21l-2.24,-3.39l-0.63,-5.77l1.23,-0.01l0.55,-1.17l-0.6,-3.42l-1.63,-3.47l0.44,-0.62l2.51,-0.93l3.57,-3.29l3.91,-0.02l1.38,-0.55l0.85,-2.21l2.96,-4.1l1.61,-0.81l2.73,-0.14l2.77,-1.81l3.16,1.56l1.71,0.11l3.59,-0.63l1.16,-1.64l1.02,-0.27l1.46,2.08l3.17,1.89l2.0,-1.3l3.93,-4.09l0.66,-0.17l2.16,0.61l2.0,-0.08l0.36,1.56l1.72,0.83l1.05,-0.24l1.87,-1.53l2.97,0.48l0.92,-0.23l1.03,-1.13l0.24,-2.99l0.71,-0.64l2.66,2.59l0.98,0.2l3.15,-1.57l5.4,0.16l2.44,0.97l3.51,0.01l2.24,0.84l3.18,-0.69l5.8,0.33Z", "name": "Limousin"}, "FR-S": {"path": "M415.52,72.77l1.88,0.07l3.81,-1.47l3.64,-0.26l1.89,0.98l1.93,2.42l1.13,0.67l1.14,-0.05l1.33,-1.23l0.8,-0.1l0.48,0.46l-0.96,1.52l0.22,1.09l6.67,3.79l1.34,3.51l2.04,1.57l8.94,-0.6l3.84,-0.99l1.21,-1.81l1.5,2.06l0.76,0.36l1.54,-1.15l1.25,0.13l2.71,1.5l0.57,0.93l-4.36,3.15l-0.88,1.19l-0.45,2.69l0.38,1.36l1.03,1.4l1.03,0.31l0.75,-0.34l1.56,-2.63l2.12,-0.23l2.39,0.4l1.36,-0.83l1.41,-0.2l-0.14,1.9l0.51,0.77l3.45,0.81l3.93,1.88l0.87,-0.88l-0.13,-2.29l0.49,-1.62l1.64,1.66l1.16,2.21l0.06,0.98l-1.29,2.29l0.29,1.01l0.76,0.43l0.99,-0.09l3.83,-3.01l0.65,0.97l0.19,3.53l0.67,0.49l0.94,-0.1l2.16,-1.41l3.78,-0.48l0.72,-1.13l-0.05,-1.87l0.67,-0.54l2.3,0.33l7.95,5.18l4.17,-0.97l5.56,1.01l2.83,-1.34l5.11,1.61l1.12,-0.08l5.63,-3.17l3.68,1.23l4.87,-2.23l3.31,0.84l6.19,0.77l1.82,2.01l0.8,0.22l3.09,-1.8l1.67,-0.27l0.43,0.68l-0.05,2.91l0.91,1.07l5.31,2.08l1.24,0.18l1.83,-0.57l3.39,1.82l1.5,0.17l0.07,3.34l1.99,4.3l-0.12,1.33l-1.86,3.88l-0.49,3.43l0.29,0.99l0.91,0.89l0.33,2.06l-0.72,1.34l-4.94,4.42l-1.44,2.38l-1.2,0.77l-2.03,0.19l-1.15,1.26l1.57,5.72l-0.46,1.67l0.38,2.48l-1.82,2.61l1.75,4.25l-1.5,0.67l-0.73,1.47l1.29,2.02l-0.49,3.55l-0.56,0.43l-2.26,-1.0l-1.91,0.8l-2.86,-1.62l-2.4,-0.16l-1.47,1.08l-0.06,2.16l-4.1,0.61l-5.16,1.48l-3.4,2.11l-0.04,1.06l0.85,2.14l0.65,6.05l0.52,0.58l1.4,0.31l2.38,2.64l-1.18,1.58l-1.11,0.25l-3.31,-0.39l-1.76,1.34l0.01,4.56l-0.99,1.65l-1.45,1.2l-0.1,1.94l0.32,0.67l1.17,0.53l3.18,-0.12l0.62,0.56l-0.02,0.6l-3.03,3.69l-1.77,1.39l-1.05,2.42l-3.83,3.82l-2.02,3.83l-2.23,0.13l-3.0,-1.96l-1.25,-4.65l-0.76,-0.5l-1.96,0.49l-8.72,-7.79l-0.53,-1.49l0.52,-3.08l-1.0,-2.3l-1.31,-1.55l-3.74,-1.22l-2.3,1.27l-1.87,0.06l-1.84,1.23l-1.7,-0.94l-5.89,1.26l-4.06,-1.07l-2.83,1.75l-2.02,-1.31l-1.93,0.57l-1.65,-1.58l-1.7,-0.47l-2.67,1.16l-2.31,-2.73l-0.85,-0.27l-1.33,0.46l-10.67,-5.96l-1.21,-0.3l-3.22,1.65l-1.51,-0.11l-3.95,-1.77l-2.4,-0.3l-3.87,-2.52l-1.17,0.37l-4.19,2.87l-6.07,0.86l-5.63,-1.65l-2.68,-0.13l-1.23,-0.69l-1.92,-4.26l0.65,-1.73l1.33,-0.11l2.08,2.06l0.83,-0.1l0.64,-0.62l-3.78,-12.52l-0.28,-3.83l1.25,-3.73l1.48,-1.28l0.5,-2.05l-0.82,-1.35l-2.28,0.49l-0.41,-0.4l-0.95,-6.29l-0.19,-4.61l-0.73,-1.65l2.23,-1.68l0.99,-2.35l-0.65,-1.04l-2.51,0.53l-0.22,-0.4l2.39,-4.39l2.12,-1.89l0.01,-1.43l-2.65,-5.54l-0.9,-3.69l-0.99,-1.54l-10.08,-10.68l-8.41,-5.95l5.29,-6.11l1.4,-5.1l1.94,-2.64l1.82,-0.25l5.96,2.93l0.81,-0.01l0.76,-0.64l0.11,-0.93l-1.48,-0.85l1.03,-0.4l0.0,-0.71l-2.62,-0.79l-0.82,-0.64l-1.15,-2.42l-2.98,-1.84l0.59,-6.58l1.1,-2.22l1.45,0.5l1.69,2.07l1.45,0.86Z", "name": "Picardie"}, "FR-R": {"path": "M159.33,355.12l3.48,1.37l1.63,-0.37l1.05,-1.24l-0.51,-1.64l-2.19,-2.56l-1.31,0.37l-0.76,-1.85l-2.14,-1.46l4.22,-2.53l1.62,0.4l-0.17,0.63l0.46,0.56l0.62,0.01l2.59,-1.78l0.38,-0.83l-0.3,-0.51l-3.0,-0.46l0.4,-0.9l-1.08,-1.12l0.15,-0.29l0.85,-0.24l2.38,0.95l3.24,-0.44l1.69,-1.74l1.09,-2.16l0.9,-0.34l1.85,1.04l2.85,-1.06l0.43,1.96l1.46,0.17l1.57,-2.82l2.06,-1.45l0.7,-1.26l1.51,-6.06l-0.13,-2.35l0.37,-1.27l2.92,-1.86l4.49,-0.45l5.44,-2.36l3.78,0.9l7.4,-2.38l2.88,-1.99l1.19,-1.81l1.73,-1.42l6.3,-2.98l1.59,-1.35l3.54,0.18l1.17,1.69l1.86,1.01l6.14,1.05l0.46,-0.32l0.47,-2.56l1.14,-2.06l3.43,-11.71l1.86,-1.91l4.09,-0.67l1.9,-1.3l-0.07,-5.65l-1.76,-2.64l-0.72,-5.55l0.64,-1.01l0.08,-1.11l-0.82,-5.65l-1.09,-2.82l1.95,-4.7l-0.77,-9.71l0.2,-6.48l4.76,0.43l3.55,-1.28l2.13,0.91l2.3,-0.38l0.81,0.71l1.89,3.57l0.82,0.34l1.19,-0.5l1.19,1.17l1.0,0.24l0.9,-0.42l0.74,-1.58l3.15,-0.92l1.89,1.7l5.52,-1.26l4.33,-3.5l3.73,0.2l4.09,1.12l1.08,-0.16l1.35,-1.81l2.82,-0.48l1.45,-0.85l0.74,-3.06l3.95,1.77l-0.12,3.33l2.77,3.83l1.18,0.97l1.95,0.57l0.37,0.55l0.53,5.25l0.45,0.38l3.6,-0.44l3.37,0.54l0.62,-0.53l0.44,-1.66l2.46,-0.95l2.23,-2.97l2.43,-1.36l5.26,-1.25l1.64,0.21l3.55,1.96l0.36,1.32l-0.32,3.16l0.3,3.88l0.85,2.34l1.63,1.64l1.86,1.11l2.81,-0.09l0.42,2.94l1.13,0.72l5.31,1.49l2.3,0.09l0.95,-0.38l1.62,1.63l1.92,2.99l2.19,1.63l1.57,0.37l1.51,-0.42l2.96,2.24l3.08,0.45l0.65,0.56l-0.44,0.72l-4.23,2.59l-0.24,1.42l1.21,1.45l-2.68,0.61l-0.57,0.55l-0.1,1.17l0.83,1.97l0.51,0.58l1.5,0.41l-0.65,3.82l0.26,2.87l-3.53,3.56l-0.55,1.91l-0.06,4.04l-1.52,4.92l-3.08,2.56l-3.44,1.72l-1.46,1.52l-0.78,2.09l0.65,2.0l-0.17,0.62l-7.92,2.77l-1.92,1.83l-1.92,-0.98l-1.12,0.0l-1.12,1.41l0.38,3.03l-8.44,-1.96l-0.48,0.25l-1.7,4.99l0.46,4.18l-1.91,4.36l-1.02,3.62l0.2,3.31l-4.39,7.09l-1.46,6.25l-0.86,6.51l-2.82,-0.54l-1.49,0.51l-2.07,2.69l-0.9,2.69l-2.38,0.94l-1.52,2.38l-1.07,-0.35l-0.85,-2.37l-0.96,-0.86l-6.24,0.08l-6.53,0.82l-5.82,1.94l-2.05,-0.85l-2.11,0.54l-1.5,1.63l0.82,1.94l-0.15,0.56l-4.92,2.86l-3.83,0.38l-5.21,-0.79l-4.21,0.65l-4.15,-2.2l-0.95,-0.21l-0.85,0.56l-0.14,1.61l2.2,1.59l2.19,3.52l1.67,1.03l0.7,0.99l0.32,2.55l1.02,2.58l4.16,3.03l1.74,1.84l-0.58,3.56l3.83,7.56l0.57,3.61l1.44,2.56l0.8,5.73l-1.47,2.86l0.98,4.89l-0.6,3.34l0.25,1.39l0.84,0.79l1.02,-0.27l1.97,1.6l0.73,1.24l-0.76,0.95l-2.49,0.28l-2.24,2.31l-2.76,0.19l-3.6,1.94l-4.04,-2.58l-1.71,-0.32l-6.66,1.25l-0.47,-0.38l1.06,-2.14l-0.47,-0.96l-0.77,-0.27l-6.99,1.78l-1.16,0.81l-1.1,1.61l-0.75,-0.8l-2.98,-0.13l-2.27,1.38l-0.13,2.61l-1.01,-0.28l-2.41,-3.16l-1.56,-0.38l-4.08,-2.68l-3.46,1.01l-1.22,-0.06l-0.92,-3.81l-1.14,-1.89l-1.56,-1.05l-6.95,-0.9l0.24,-1.15l-0.99,-0.96l-3.37,-0.67l-1.97,-1.74l-2.48,-0.94l-1.08,-2.6l-1.03,-1.14l-0.29,0.39l0.29,3.11l-0.48,-0.67l-1.33,-6.38l0.25,-1.47l-1.08,-0.79l-1.14,-3.19l-2.54,-2.69l-0.73,-2.4l-0.93,-0.73l-1.98,-0.46l-2.24,-4.16l-3.47,-3.63l-4.08,-2.41l-0.4,-1.25l-0.3,-3.15l0.48,-2.6l1.48,-1.09l-0.14,-1.48l3.14,-2.32l2.48,-6.12l1.15,-1.1l-0.83,-3.24l-1.69,-2.12l-3.77,-2.13l-7.13,-1.29l-1.55,-0.86l1.58,-1.27l1.9,-0.27l0.8,-0.62l0.41,-3.39l-0.66,-1.54l-0.09,-2.2l0.59,-2.11l1.76,-1.21l5.58,-0.58l1.08,-0.58l1.01,0.99l3.14,0.84l1.05,-0.01l0.3,-0.59l0.79,0.35l-0.66,0.4l0.16,0.99l2.51,1.85l2.63,0.56l1.97,1.88l1.56,0.67l3.3,0.11l0.39,-0.28l-0.16,-0.45l-1.38,-0.89l-2.42,-0.49l-2.84,-3.02l-4.32,-3.12l-2.79,-0.61l-1.38,-1.08l-2.33,-0.68l-8.78,0.62l-2.05,1.31l-1.5,2.27l-1.74,0.51l-2.55,1.88l-2.02,-0.42l-2.32,-2.48l-1.23,-0.72l-2.19,0.01l-0.77,0.67l-0.33,1.16l-1.37,-0.05l-5.21,-2.75ZM161.53,352.23l0.02,0.22l-0.01,0.03l-0.01,-0.25ZM179.98,384.58l2.69,1.71l0.24,3.45l-2.72,-4.38l-1.55,-1.07l-1.76,0.67l-2.31,-5.31l2.69,-0.15l2.02,0.82l-0.04,3.28l0.73,0.97ZM174.46,408.5l-5.04,-0.12l-0.52,-1.22l0.28,-0.47l1.96,0.03l3.33,1.78Z", "name": "Pays de la Loire"}, "FR-Q": {"path": "M332.9,158.69l6.89,-1.58l2.91,-1.51l1.24,-1.12l0.98,-1.92l-0.5,-0.06l-4.28,2.71l-4.92,0.71l-4.97,-0.68l-4.35,-1.49l-2.38,-0.1l-2.41,-1.09l-0.64,-1.32l-0.89,-0.7l-0.08,-1.52l3.31,-6.43l2.43,-8.25l3.76,-3.37l9.31,-4.37l0.72,-0.96l12.1,-6.86l4.67,-1.72l5.33,0.05l25.22,-8.17l3.14,-1.84l2.42,-2.69l6.59,-5.33l8.5,6.01l10.86,11.89l0.91,3.72l2.45,4.84l0.22,1.44l-1.52,1.12l-2.69,4.2l-0.4,1.36l0.43,1.11l2.54,-0.51l0.41,0.47l-0.85,1.71l-1.94,1.29l-0.46,0.93l0.75,1.65l0.19,4.64l0.98,6.42l0.79,0.93l2.02,-0.54l0.65,0.67l-0.42,1.66l-1.48,1.3l-1.33,4.06l0.3,4.0l1.76,6.68l2.0,5.43l-0.91,-0.04l-2.02,-2.05l-1.77,0.59l-0.91,1.59l0.39,1.87l-1.79,3.67l-2.91,9.97l-2.18,1.2l-7.74,1.86l-0.76,0.66l-0.16,1.1l0.7,1.83l-0.24,2.67l0.55,0.81l1.69,0.52l0.22,2.8l-2.21,1.38l-0.43,0.69l0.17,4.37l-4.78,3.64l-2.29,4.63l-4.55,2.6l-2.17,-0.61l-3.37,0.05l-2.24,-1.76l-1.28,-0.18l-0.85,2.44l-3.46,0.4l-2.42,2.79l-1.92,0.05l-5.91,1.71l-3.36,3.01l-2.53,-1.09l-1.25,-1.85l-1.03,-0.59l1.3,-2.03l0.53,-1.75l-1.15,-2.68l-5.07,-2.64l-2.77,-3.91l-0.96,-2.7l-0.76,-0.47l-0.91,0.07l-2.14,0.91l-4.67,-1.31l-2.06,0.04l-1.24,-0.93l-0.56,-1.6l1.86,-4.24l0.26,-4.8l-0.84,-1.66l-2.12,-1.82l-0.51,-1.68l0.36,-0.48l1.58,0.07l0.58,-0.6l-0.4,-2.84l0.87,-2.36l-2.39,-6.22l-2.48,-2.67l-0.47,-1.16l0.07,-0.8l2.05,-1.15l0.4,-0.97l-0.8,-1.37l-2.45,-0.66l-1.13,-2.15l-0.07,-7.4l-0.52,-3.66Z", "name": "Haute-Normandie"}, "FR-P": {"path": "M214.99,137.14l0.18,0.84l0.65,0.44l2.27,-1.3l2.86,0.6l1.15,-0.55l3.33,-3.68l2.72,-0.85l8.57,1.4l2.05,6.3l-1.51,1.19l-0.5,1.9l-1.27,0.05l-1.1,0.8l-0.37,2.64l2.8,6.22l4.64,5.87l0.55,1.32l0.2,1.95l-0.76,2.38l0.17,1.2l0.45,0.31l1.68,-0.58l1.69,1.54l1.8,-0.68l-0.6,-1.64l0.36,-1.02l1.82,-1.43l7.91,0.41l7.31,2.79l10.45,0.64l4.16,0.94l2.33,-1.2l4.07,1.49l4.1,0.0l2.92,1.66l3.02,0.71l5.68,3.46l1.96,-1.4l9.71,-2.31l2.94,-1.39l1.7,-1.49l2.0,-0.88l1.51,-2.34l3.95,-2.86l7.6,-1.61l0.49,3.39l0.1,7.63l1.29,2.43l2.54,0.76l0.49,0.77l-2.28,1.6l-0.21,1.47l0.6,1.45l2.44,2.6l2.28,5.85l-0.86,2.2l0.42,2.72l-1.99,0.13l-0.56,1.1l0.64,2.13l2.17,1.9l0.68,1.29l-0.25,4.48l-1.86,4.23l0.32,1.77l2.0,1.74l2.16,-0.02l4.65,1.31l3.13,-0.95l1.14,2.77l2.9,4.06l4.98,2.53l1.01,2.12l-0.45,1.48l-1.35,1.7l0.09,1.19l1.13,0.68l1.33,1.92l2.72,1.19l0.4,4.01l1.71,3.52l2.68,2.06l3.46,4.11l-0.14,4.2l1.87,3.22l-1.76,3.61l-3.22,2.91l-4.1,1.74l-2.34,0.49l-0.88,1.3l0.01,1.94l1.15,1.42l-0.05,3.37l1.85,3.96l-0.49,1.01l-2.58,1.16l-1.08,-0.28l-1.99,-1.47l-1.87,-2.92l-1.91,-1.87l-3.52,0.23l-5.13,-1.45l-0.73,-0.48l-0.06,-2.04l-0.54,-1.05l-3.09,-0.03l-2.45,-1.69l-1.03,-1.88l-0.5,-2.08l0.27,-5.72l-0.44,-1.65l-1.37,-1.15l-2.61,-1.2l-2.06,-0.26l-5.55,1.36l-3.07,1.89l-1.67,2.5l-2.54,1.01l-0.71,1.97l-2.52,-0.54l-3.9,0.38l-0.6,-5.14l-0.77,-0.94l-1.87,-0.51l-3.03,-3.26l-0.67,-1.98l0.49,-1.72l-0.31,-0.87l-0.73,-0.7l-3.82,-1.5l-1.02,0.53l-0.38,2.76l-1.15,0.67l-1.4,-0.02l-1.64,0.61l-1.19,1.71l-4.76,-1.0l-4.0,-0.19l-1.21,0.52l-3.19,3.0l-5.16,1.23l-1.16,-1.53l-1.0,-0.16l-3.53,1.09l-0.49,1.25l-0.8,0.58l-1.65,-1.34l-1.86,0.27l-1.74,-3.41l-1.09,-0.98l-2.47,0.33l-2.39,-0.93l-3.56,1.29l-1.98,0.01l-3.0,-0.5l-2.56,-1.58l-7.86,-1.97l-1.44,0.27l-2.22,2.84l-1.99,0.84l-2.78,2.25l-1.64,0.62l-2.05,-0.19l-2.56,-2.12l-2.22,-3.7l-3.57,-9.83l4.9,0.6l6.6,-1.46l2.13,0.81l0.48,-0.58l-1.12,-1.75l-1.51,-0.75l-2.35,-0.22l-0.46,0.49l-0.69,-1.54l-2.87,-1.13l-0.87,-2.78l-2.18,-1.95l-0.81,-6.94l-0.74,-1.46l-1.43,-0.51l1.47,-1.47l0.93,-5.59l0.93,-0.14l0.34,-1.06l0.01,-1.15l-1.22,-1.12l0.99,-6.46l0.49,-0.27l1.31,0.63l0.57,-0.36l-0.23,-0.94l-1.35,-0.61l-1.38,-0.0l-1.35,0.72l-0.57,1.39l-0.56,-1.54l0.44,-4.02l-1.17,-1.07l0.74,-3.19l1.49,-1.28l0.02,-0.64l-0.75,-0.59l-0.58,0.07l-1.02,-5.86l0.32,-0.6l0.82,-0.06l2.14,0.64l0.51,-0.96l-3.27,-1.56l-1.31,-0.03l-0.68,1.34l-1.42,-3.88l-0.76,-0.97l0.56,-1.03l-2.39,-2.31l-0.28,-0.89l0.71,0.0l0.4,-0.98l-0.83,-2.08l-1.21,0.04l-0.35,1.13l-3.03,-2.54l0.35,-0.91l-0.45,-0.57l-2.12,0.62l-0.37,-0.41l-0.17,-6.36l-1.53,-4.02l-2.42,-3.36l0.31,-1.05l1.64,-1.52l0.49,-1.1l0.27,-4.81l-1.91,-4.1l-4.51,-1.52l0.31,-3.35l0.15,-0.42l1.31,-0.17l2.44,1.27l1.77,-0.22l0.58,0.41l0.76,1.81l6.68,1.09l5.28,1.54Z", "name": "Basse-Normandie"}, "FR-V": {"path": "M577.54,558.52l1.13,-1.7l2.95,-0.62l0.73,-0.78l0.01,-0.76l-1.21,-1.89l2.17,-2.86l-0.85,-2.52l1.25,0.25l1.39,1.3l0.95,-0.03l0.44,-0.46l0.63,-3.28l1.73,-3.83l0.14,-2.57l-3.03,-2.98l-1.46,-0.86l-3.05,-0.65l-0.86,-2.34l0.79,-2.28l-0.44,-2.07l-1.27,-2.3l-1.56,-1.14l-2.5,1.77l-4.05,-1.27l-2.37,0.02l-0.65,0.37l-0.27,1.34l-0.61,0.71l-5.69,1.09l-2.45,0.1l-1.61,-1.91l-0.74,-0.24l-2.31,0.78l-1.44,1.29l-0.39,-0.27l0.38,-3.55l0.72,-1.52l2.81,-3.4l0.96,-2.65l-0.08,-1.57l-2.54,-6.44l-7.56,-6.95l-3.14,-7.29l-0.58,-1.04l-1.05,-0.73l-1.72,-3.15l0.87,-2.94l0.0,-2.45l1.19,-3.57l-0.56,-1.55l-2.48,-2.25l-0.15,-1.57l2.19,-1.2l4.84,-1.21l1.42,-1.69l-1.6,-9.69l0.16,-4.56l-0.45,-3.7l-1.16,-2.08l2.64,-2.38l4.09,-1.47l0.57,1.8l0.05,3.57l3.01,1.44l2.23,1.78l1.87,0.08l4.04,-1.44l4.13,1.07l3.0,-0.75l5.98,1.52l2.67,-0.91l1.66,-1.39l1.81,-2.47l1.71,-5.94l5.05,1.65l1.26,-0.14l1.91,-1.07l1.54,1.89l0.95,0.43l1.71,-0.63l0.56,-2.27l0.54,-0.33l1.79,0.79l0.27,2.31l1.62,1.25l-0.07,1.91l1.17,3.41l1.38,1.13l3.59,0.46l0.44,-0.49l-0.22,-1.31l1.29,-5.46l3.52,-7.69l0.17,-2.29l1.46,-2.92l0.86,-4.91l1.47,-4.41l1.74,-0.43l4.3,1.59l6.91,-1.8l1.23,0.45l2.16,2.29l1.64,0.99l4.13,1.15l0.02,2.85l0.6,1.21l2.67,1.52l0.72,2.76l1.08,1.28l2.12,0.75l0.91,1.26l1.74,0.42l-0.07,3.67l0.89,1.08l1.8,0.55l2.96,-1.73l1.13,-1.38l1.49,-0.44l0.55,-1.34l2.37,-2.33l2.81,2.54l0.94,2.91l0.68,0.62l7.35,0.58l2.12,-0.42l5.09,-4.67l1.05,-1.93l5.28,-6.19l2.65,1.63l1.51,2.12l0.07,0.8l-2.16,5.1l-0.59,4.66l-2.7,0.24l-5.44,3.05l-0.18,1.33l1.64,2.48l-1.42,3.32l0.1,0.46l0.47,0.04l1.43,-0.85l2.68,-0.64l2.66,-0.1l2.34,0.88l2.11,-1.12l3.09,-3.63l3.87,-2.57l1.66,-1.74l-0.22,-2.38l-0.68,-0.49l-1.54,0.2l-1.56,-4.29l0.28,-1.03l2.97,-3.98l1.9,-1.65l5.79,-1.18l5.28,-3.61l3.8,-0.75l3.99,0.13l9.83,2.73l0.57,2.22l-0.39,1.33l-1.64,1.97l-0.29,1.35l4.63,6.56l-2.1,4.09l-1.62,6.47l0.82,1.73l4.77,1.06l0.72,0.7l-1.2,2.05l0.09,3.39l1.46,0.83l1.47,-0.98l1.16,0.51l4.33,4.81l1.89,5.56l-1.27,1.15l-1.71,3.64l-1.15,0.98l-2.52,1.03l-3.09,-0.25l-0.82,1.13l-1.53,0.22l-1.23,0.76l-1.18,2.94l0.81,6.86l1.3,2.01l1.74,1.34l2.44,0.65l2.19,1.98l2.65,0.97l0.3,1.05l-0.99,2.84l1.04,2.41l0.82,4.94l5.54,3.72l1.57,3.06l3.74,2.02l-0.56,2.06l-1.24,2.23l-2.31,2.9l0.9,5.66l-1.61,1.39l-1.32,2.28l-1.59,-1.17l-4.51,1.69l-2.67,3.37l-2.44,0.36l-0.53,0.95l0.54,1.29l-1.67,0.81l-4.36,-1.96l-2.4,-0.33l-2.04,1.37l-2.2,0.18l-2.35,1.4l-1.9,0.25l-2.21,1.37l-3.09,0.38l-1.1,2.73l-1.35,1.28l-4.31,-1.37l-0.85,-2.11l-1.43,-1.15l-4.05,-0.47l-2.0,-0.92l-1.73,2.35l-1.05,7.36l0.5,1.15l1.24,0.48l3.7,-0.49l0.92,0.52l0.57,3.86l1.74,2.27l0.33,1.22l-0.61,4.28l-3.5,-0.91l-3.79,1.12l-1.71,-0.17l-1.86,0.4l-2.28,-0.45l-3.93,2.43l-0.96,0.15l-1.73,-0.51l-2.31,1.07l-1.85,1.95l0.22,2.15l-0.7,0.78l-2.31,0.76l-3.67,0.24l-1.04,0.44l-2.06,3.3l0.34,1.16l0.66,0.57l0.03,0.8l-1.64,1.96l-4.51,1.38l-3.09,-0.33l-1.24,0.57l-0.43,2.12l-2.53,4.36l-0.13,1.03l0.82,1.67l2.0,1.59l0.3,1.19l-0.35,0.4l-3.17,2.06l-4.22,-1.45l-3.37,-0.14l-0.62,0.69l0.08,1.88l0.61,1.21l1.24,0.94l0.01,0.76l-0.96,0.2l-2.31,-0.49l-1.08,0.67l-0.06,0.69l1.42,2.05l0.6,2.21l2.38,2.0l4.28,1.63l3.68,-0.03l-0.29,2.16l1.55,1.98l2.11,1.66l-0.14,5.36l-0.66,1.27l0.11,2.2l-0.72,-0.19l-0.64,-1.49l-0.8,-0.61l-1.78,-0.33l-0.98,0.33l-3.26,3.61l-1.72,1.08l-1.92,-0.24l-4.26,-3.15l-0.76,-2.43l-1.0,-1.29l-2.12,-0.29l-4.34,-1.59l-2.82,0.24l-2.59,-0.75l-0.69,-0.91l-0.1,-1.73l0.78,-2.48l-0.27,-0.96l-0.64,-0.32l-2.48,1.62l-4.47,-0.6l-4.29,1.23l-3.5,1.68l-2.77,0.47l-2.97,1.71l-1.0,-0.81l-1.76,-4.71l-2.57,-2.12l-5.4,-0.04l-0.34,0.4l0.02,3.33l-3.84,-1.44l-2.02,-2.17l-1.97,-0.95l-3.59,0.04l-1.21,1.05l-0.35,2.12l-1.28,0.72l-1.21,-1.17l0.27,-1.59l-0.3,-0.9l-1.64,-0.53l-2.48,0.8l-4.93,4.14l-1.15,-0.26l-4.88,-2.73l-1.25,-1.27l-4.77,0.6l-0.67,-3.95l0.83,-1.5l-0.02,-0.94l-1.75,-3.22l-1.71,-1.62l-2.22,-7.91l-0.89,-1.68l-1.34,-0.98l-0.57,-1.14l-2.47,-9.83l0.05,-3.19l1.28,-0.66l3.25,-5.15l3.93,-1.45l1.08,-2.5l2.25,0.14l4.33,-0.77l1.52,-0.72l2.01,-3.11l1.34,-3.78l2.05,0.03l2.96,-1.44l0.14,-1.37l-0.57,-1.17Z", "name": "Rh\u00f4ne-Alpes"}, "FR-U": {"path": "M574.87,687.21l0.93,-0.2l1.37,-1.17l2.17,-0.62l3.45,-2.78l1.64,-0.56l0.58,-1.53l2.47,-0.8l0.7,-1.71l-0.08,-0.86l-1.96,-0.76l1.31,-3.14l1.5,-2.17l1.28,-1.04l2.0,-0.58l3.71,1.5l1.05,-0.34l0.63,-1.7l-0.04,-2.04l1.97,-5.56l-0.49,-5.4l5.09,-3.8l2.75,-1.29l1.8,-1.44l1.32,-1.83l0.02,-2.5l1.18,0.08l0.47,-0.47l-0.22,-2.0l-4.15,-5.4l-1.29,-0.64l-1.82,0.34l-0.38,-2.86l0.14,-5.62l-0.49,-1.01l-1.47,-1.27l-0.09,-1.78l-1.29,-1.87l-0.55,-1.92l-0.02,-3.45l3.17,-0.16l2.41,0.71l1.59,1.91l1.69,4.56l1.31,0.73l1.11,-0.23l2.24,-1.53l2.77,-0.47l3.47,-1.66l4.06,-1.19l4.59,0.58l2.3,-1.59l-0.59,4.2l0.31,1.29l0.75,0.74l2.97,0.91l2.82,-0.24l4.21,1.56l1.95,0.22l1.6,3.6l4.52,3.32l2.54,0.25l1.96,-1.25l2.53,-2.91l1.3,-0.83l1.79,0.61l1.16,1.94l1.5,-0.22l0.3,-0.71l-0.24,-1.95l0.64,-1.16l0.14,-5.63l-0.51,-0.94l-1.46,-0.83l-1.76,-2.12l0.47,-1.58l-0.28,-0.73l-1.34,-0.42l-2.8,0.18l-3.97,-1.49l-2.21,-1.82l-0.51,-2.03l-1.35,-2.11l0.84,-0.21l2.34,0.52l1.25,-0.94l-0.17,-1.28l-1.58,-1.43l-0.11,-2.1l2.93,0.17l4.35,1.46l3.77,-2.3l0.59,-0.85l-0.11,-1.12l-2.4,-2.31l-0.62,-1.16l0.35,-1.25l1.84,-2.83l0.75,-2.92l1.26,-0.29l2.5,0.37l4.91,-1.54l1.89,-2.26l-0.01,-1.45l-0.96,-1.2l1.82,-2.93l4.32,-0.49l2.61,-0.88l1.03,-1.28l-0.23,-2.07l1.53,-1.53l1.91,-0.93l1.61,0.51l1.32,-0.2l3.71,-2.38l2.19,0.45l1.92,-0.4l1.7,0.17l3.73,-1.12l2.72,0.87l1.35,-0.15l0.59,-1.09l0.28,-3.9l-0.45,-1.56l-1.68,-2.16l-0.61,-3.95l-1.52,-0.92l-3.62,0.51l-0.92,-0.34l-0.22,-0.7l1.04,-6.98l1.31,-1.74l1.48,0.88l3.89,0.41l1.09,0.86l0.99,2.27l4.35,1.6l1.6,-0.52l0.96,-1.21l0.86,-2.45l2.86,-0.27l2.82,-1.47l-0.7,1.39l2.04,2.5l0.17,1.96l0.79,1.4l0.95,0.75l2.03,0.19l1.39,1.01l0.36,2.28l-0.12,4.81l1.21,2.12l2.07,1.79l4.22,2.47l1.45,0.34l3.9,-0.51l2.94,1.21l1.21,1.46l-0.4,2.94l1.26,4.71l2.05,4.15l-3.89,-0.64l-1.71,0.92l-1.21,1.55l-0.44,1.75l0.6,1.79l-2.78,4.17l-3.06,2.36l-0.81,1.5l0.24,2.84l1.44,2.48l3.05,2.97l-1.55,0.86l-0.58,0.89l-0.72,3.38l0.23,1.34l1.65,2.09l1.59,3.28l2.28,2.06l1.49,3.1l1.17,0.47l2.84,-0.23l6.04,2.82l6.53,4.03l3.45,1.03l0.74,1.29l1.35,0.81l2.67,0.05l10.62,-3.07l1.73,-0.14l2.57,-1.63l1.3,0.23l-0.69,2.63l3.02,4.93l-0.1,1.25l-2.23,2.37l-1.34,3.85l-4.53,4.22l-4.86,6.7l0.27,2.46l1.14,3.82l-1.51,0.75l0.03,1.48l-1.7,-0.1l-0.97,0.71l-1.41,-0.64l-1.19,0.48l-1.06,1.13l-0.22,1.06l-0.98,0.35l-0.58,0.84l-0.31,1.71l-0.5,-0.98l-2.92,0.38l-1.71,-0.36l-2.45,2.86l-3.22,1.11l-1.83,2.68l-0.22,5.57l-0.96,-1.19l-4.58,1.7l-1.67,-0.48l-1.99,1.38l-1.83,2.19l-0.11,1.7l-2.19,3.82l-1.0,0.46l-0.34,1.41l-1.53,-0.68l-0.75,1.23l-2.74,0.13l-1.41,-0.36l-1.12,-0.9l-1.35,0.91l-1.64,5.55l-2.54,1.66l-1.32,2.57l-1.34,0.25l-2.76,1.91l-0.14,0.72l0.63,0.59l5.73,-0.25l-1.35,3.12l0.75,1.48l-2.7,2.29l0.14,1.18l-1.73,0.5l-0.53,-1.56l-0.76,-0.69l-1.81,-0.24l-3.25,2.47l-2.79,-0.02l-2.6,1.15l-2.06,0.22l-1.24,1.79l-0.26,2.05l0.55,1.17l-1.84,-0.07l-0.67,-1.89l-2.37,-0.88l-5.49,-0.09l-1.5,0.92l-0.58,1.36l-0.77,3.19l1.27,1.03l-0.29,0.08l-3.0,-0.04l0.69,-0.55l0.38,-1.5l-0.01,-0.85l-0.72,-0.71l-4.52,-0.32l-1.6,-1.09l-1.79,-0.44l-2.89,0.36l0.22,-0.91l-0.36,-0.55l-2.09,0.25l-1.86,0.94l0.03,0.73l0.94,0.38l1.44,1.54l-1.81,-0.16l-0.75,0.82l-0.27,1.13l-1.58,0.16l-2.87,-1.24l-0.72,-1.17l2.19,-1.47l0.08,-0.66l-2.33,-0.8l-0.34,-1.24l-3.13,-0.79l-1.99,-1.13l0.09,-1.62l-1.18,-0.64l-3.34,-0.18l-1.13,1.08l-1.41,-0.78l-2.55,-2.77l-2.63,1.35l-1.08,-0.86l-1.56,-0.2l-2.45,0.41l-3.13,-0.51l-0.32,-0.6l1.31,-4.17l-1.25,-1.28l0.0,-4.27l-1.9,-1.52l-8.41,1.8l-2.62,-0.39l-4.77,0.42l-1.35,-0.38l-1.46,-1.52l-0.28,-1.66l0.74,-1.48l1.69,-0.96l5.35,0.0l1.81,-0.54l2.62,-2.62l0.88,-2.19l-0.22,-2.0l-0.62,-0.29l-3.33,1.74l-1.32,-0.23l-1.17,-1.37l-0.82,-2.49l-1.53,-0.59l-1.81,-0.01l-1.46,-1.66l-1.01,0.75l-0.82,3.13l0.41,1.77l2.15,1.84l0.66,1.88l-0.59,1.64l-1.18,0.85l-1.36,-0.38l-1.25,0.37l-3.56,-1.87l-4.38,2.16l-0.57,1.68l1.06,1.53l-4.07,-1.87l-1.98,-1.87l-0.88,-2.07l0.15,-4.92l-0.55,-2.79l-1.54,-2.82l-1.19,-0.75l-0.61,0.34l2.09,4.38l0.0,6.0l0.87,2.95l4.7,4.42l-1.55,0.62l-8.87,-0.42l-3.75,-1.35l1.08,-3.49l-0.09,-1.61l-1.93,-1.66l-2.76,-0.56l-17.15,-0.57l0.63,-1.78ZM692.51,728.8l2.08,-0.1l1.79,-1.04l-0.59,1.43l-1.43,0.59l-1.85,-0.88Z", "name": "Provence-Alpes-C\u00f4te-d'Azur"}, "FR-T": {"path": "M271.45,530.28l-2.81,-8.67l-2.61,-4.67l-2.87,-3.32l-8.68,-6.35l-0.48,-2.03l-2.47,-1.18l-3.22,-3.23l-4.03,-1.65l-2.77,-2.75l-2.36,0.38l-0.69,-0.28l1.0,-6.7l3.72,-1.14l0.95,0.04l5.24,5.68l4.4,2.08l0.49,-0.12l-1.39,-2.06l-5.53,-4.49l-1.52,-1.83l-1.41,-4.95l2.09,-2.25l2.54,-0.99l0.19,-2.07l-1.02,-2.06l0.95,-0.95l-0.03,-0.64l-0.93,-0.62l-1.13,-2.83l1.87,0.28l0.91,-0.87l0.64,-2.43l-1.09,-1.21l-1.09,-0.42l-0.73,-3.77l-1.94,-1.35l0.62,-0.63l-0.04,-0.6l-1.99,-1.27l-0.3,-1.28l-2.85,-0.24l-0.4,-0.43l0.28,-1.22l1.23,-1.42l-0.3,-1.55l0.55,-0.95l4.29,-2.76l0.47,-2.04l-0.89,-2.74l1.19,-1.81l0.85,-0.59l6.68,-1.71l0.37,0.88l-1.0,1.8l0.98,1.01l6.86,-1.21l1.45,0.24l4.45,2.68l3.79,-1.99l2.86,-0.22l2.34,-2.36l2.77,-0.39l0.84,-1.39l-0.94,-1.89l-2.15,-1.76l-1.5,-0.07l-0.21,-1.11l0.59,-3.44l-0.97,-4.74l1.47,-2.94l-0.66,-5.25l-1.62,-3.29l-0.6,-3.69l-3.79,-7.46l0.75,-3.16l-2.17,-2.63l-3.53,-2.24l-0.99,-1.52l-0.81,-4.19l-0.91,-1.23l-1.53,-0.9l-1.4,-2.56l-2.91,-2.52l0.1,-0.55l0.21,-0.32l1.3,0.36l3.75,2.03l4.31,-0.65l5.13,0.79l4.0,-0.39l5.4,-3.12l0.33,-1.24l-0.82,-1.61l1.02,-1.05l1.7,-0.48l2.15,0.86l5.98,-1.96l6.44,-0.81l5.85,-0.14l0.57,0.49l1.0,2.58l1.72,0.64l1.96,-2.63l2.5,-1.06l1.0,-2.85l1.9,-2.43l0.88,-0.29l2.95,0.57l1.47,2.73l0.63,0.42l2.13,-0.72l0.15,1.85l0.54,0.6l2.69,-0.3l-0.15,3.06l0.72,1.15l1.19,0.08l2.48,-0.71l1.02,1.52l1.83,0.3l-0.33,6.6l0.35,1.46l1.23,1.26l1.42,0.33l2.6,-0.29l2.93,0.52l2.97,-1.6l5.5,-0.39l0.79,-0.5l0.18,-0.78l-0.87,-3.01l5.61,3.22l1.18,1.91l1.3,3.91l7.23,10.81l2.64,2.14l1.68,2.25l0.85,2.58l-0.6,4.95l1.1,3.58l2.32,2.34l3.29,1.47l0.86,2.36l0.9,0.38l3.79,0.0l1.48,0.77l1.11,1.91l-0.35,3.38l3.09,3.07l-0.95,3.2l-3.27,1.89l-2.6,0.1l-2.04,1.05l-3.04,4.21l-0.65,1.99l-1.03,0.41l-4.11,0.08l-4.24,3.77l-2.5,0.99l-0.26,0.92l1.66,3.57l0.57,3.26l-0.22,0.45l-1.22,-0.2l-0.45,0.49l0.66,2.96l0.13,3.44l2.53,3.8l0.66,0.34l1.47,-0.47l0.47,0.3l1.88,4.19l-2.69,2.56l-4.13,1.08l-1.6,10.63l-0.51,0.64l-1.07,0.02l-1.7,-0.88l-1.2,0.57l-0.97,2.02l-2.34,2.24l-1.38,3.44l-2.13,2.02l-2.19,3.42l-2.35,0.63l-0.56,0.54l-0.83,5.92l-4.27,6.78l-2.66,0.72l-6.76,5.16l-1.57,5.07l0.01,4.69l-0.39,1.54l-1.67,1.69l-2.94,1.51l-0.88,2.21l-0.93,0.99l-0.86,0.27l-2.69,-0.71l-5.19,2.71l-0.9,1.67l0.68,2.02l-1.87,2.55l-1.42,0.63l-1.56,-0.59l-1.12,0.12l-4.17,1.4l-3.88,-1.36l-2.34,-2.22l-3.73,-2.02l-3.34,0.02l-1.53,-2.85l0.02,-3.54l-0.59,-1.54l-3.56,-2.77l-2.5,-0.17l-1.78,-0.65l-0.73,-2.81l-0.91,-1.29l-1.48,0.13l-1.55,2.08l-4.47,-0.23ZM235.39,471.39l1.12,0.47l1.32,-0.32l0.65,0.67l0.16,2.78l0.68,0.81l-0.18,1.5l2.75,2.32l-0.4,4.24l-1.29,3.28l-0.6,-0.27l-2.09,-5.44l-4.91,-5.03l-2.18,-3.04l0.35,-1.79l-1.76,-4.48l3.1,1.19l3.28,3.12ZM224.11,449.31l-0.1,0.43l-1.94,-0.57l-0.37,0.6l1.07,1.87l1.97,0.16l1.96,-0.83l0.22,0.89l1.02,0.5l6.19,1.02l1.31,0.85l1.55,2.35l-0.99,0.4l-3.29,-0.85l-5.86,-3.81l-3.61,0.58l-0.75,-0.3l-2.99,-3.22l3.14,-0.84l1.45,0.78Z", "name": "Poitou-Charentes"}, "FR-GF": {"path": "M10.97,616.5l0.03,-0.01l1.04,0.32l0.16,0.01l0.86,-0.15l0.51,-0.46l0.86,-2.17l2.19,-0.54l1.74,-1.7l0.64,-0.95l2.47,-5.67l2.47,-3.35l0.8,-2.07l0.46,-0.34l0.06,-0.66l-0.55,-0.48l-0.0,-0.31l0.65,-1.16l0.29,-1.23l-0.01,-0.47l-0.64,-0.76l0.44,-0.66l-0.5,-1.65l0.23,-0.35l-0.0,-1.56l-0.44,-0.68l-0.47,-0.14l0.86,-1.73l2.07,-2.82l1.19,-0.89l0.84,-2.29l1.16,-1.21l0.63,-1.48l-0.08,-2.68l0.58,-2.69l-0.24,-0.63l-0.99,-0.81l-0.94,0.15l-0.73,-1.11l-0.67,-2.34l-1.1,-1.52l-2.15,-0.96l-0.85,-1.38l-0.93,-0.69l-0.78,-1.45l-0.91,-0.92l-0.6,-1.53l-1.42,-1.5l-0.04,-0.68l0.68,-2.17l-0.13,-0.85l-0.5,-0.52l-1.21,-0.36l-0.61,-0.56l-0.08,-0.33l0.53,-1.13l-0.01,-1.08l-0.33,-1.55l-1.0,-2.09l-0.56,-3.54l0.08,-0.72l0.82,-1.84l0.01,-1.55l-0.48,-1.52l0.02,-2.19l-0.4,-0.62l-0.93,-0.5l-0.06,-0.26l0.0,-4.13l-0.26,-0.76l1.19,-1.15l-0.22,-1.91l0.25,-0.92l2.4,-2.98l0.33,-0.79l0.74,-0.61l0.47,-1.45l0.64,-0.92l1.37,-1.42l3.33,-2.65l1.1,-0.4l1.1,-0.77l1.58,-1.93l1.86,-4.22l0.22,-3.73l0.39,-1.24l0.71,-0.96l2.31,-1.42l1.79,0.34l0.48,0.18l0.59,0.84l1.69,0.74l1.43,1.2l5.31,2.1l2.31,1.83l3.75,0.97l3.15,-0.21l1.42,1.68l1.12,-0.16l0.56,-0.62l0.3,0.04l4.38,2.03l1.36,0.3l0.42,-0.63l1.85,0.29l0.74,0.42l1.3,1.07l2.72,4.12l3.75,2.79l5.06,4.62l0.02,0.49l0.31,0.28l0.66,-0.01l0.76,0.42l2.53,2.16l0.64,1.06l-0.27,1.23l0.6,0.42l0.73,-0.49l0.79,-1.11l0.49,-0.18l1.21,0.54l0.54,0.96l-2.76,4.28l0.03,1.47l0.4,0.37l0.6,-0.32l0.54,-0.93l0.57,-1.95l1.79,-1.31l0.32,-0.47l0.86,0.63l1.21,1.89l2.17,1.25l2.26,2.11l0.9,1.31l1.5,6.51l-0.33,1.34l-1.91,1.37l-0.89,1.13l-0.01,0.47l0.45,0.15l2.11,-0.67l1.15,-0.61l0.64,-0.84l0.53,-2.05l-0.28,-4.87l0.18,-1.1l0.47,-0.86l1.05,-0.2l1.97,1.64l-0.0,0.75l1.13,1.9l0.28,1.83l0.66,0.89l-0.25,0.37l0.26,0.94l0.51,0.66l1.03,0.2l-0.69,0.86l-0.09,1.41l1.58,2.66l0.57,1.61l-0.06,2.16l-0.64,2.0l-0.29,0.57l-2.42,1.18l-1.04,0.92l-0.79,2.17l-0.92,1.57l-2.1,2.32l-1.35,0.82l-0.13,1.42l-0.89,0.24l-0.67,0.68l-0.88,2.96l-1.99,3.34l-0.78,0.63l0.04,0.74l-4.48,7.35l-0.56,0.42l-1.12,0.12l-0.77,0.72l-0.64,1.51l-1.27,1.01l-0.24,0.8l0.31,2.33l-2.32,4.42l0.33,0.96l-0.82,0.4l-0.56,0.65l-2.67,5.99l-0.28,1.19l-1.09,0.6l-0.07,0.39l0.69,1.25l0.05,0.53l-2.13,3.57l-1.21,1.07l-0.79,1.45l-0.92,0.95l-3.72,2.24l-1.52,0.63l-0.69,0.59l-0.84,1.79l-0.27,0.23l-0.79,0.05l-0.55,0.6l-0.56,0.05l-2.57,-0.42l-0.95,-0.79l-0.97,-0.34l-5.09,0.79l1.4,-1.11l-0.13,-0.66l-2.09,-1.75l-0.88,-1.21l-0.87,-0.45l-0.43,0.08l-1.44,1.65l-1.23,0.47l-1.2,0.89l-2.14,0.34l-1.52,-0.76l-2.22,-0.27l-2.22,-0.96l-0.87,-0.06l0.28,-0.61l-0.05,-0.6l-0.6,-0.69l-0.75,-0.14l-1.33,0.55l-1.04,1.47l-1.27,0.26l-0.97,1.22l-1.24,-0.04l-0.48,1.63l-0.46,0.33l-1.37,0.49l-0.6,0.49l-0.71,-0.33l-1.15,0.23l-0.87,2.01l-0.28,0.3l-0.57,0.09l-0.5,-0.25l-1.22,-1.44l-0.92,-0.01l-1.74,0.44l-1.6,-0.21l-2.03,-1.41l-3.41,-0.59l-1.86,-1.51l0.34,-0.7l-0.6,-0.59l-1.7,-0.92Z", "name": "French Guiana"}}, "height": 864.1025840443817, "projection": {"type": "merc", "centralMeridian": 0.0}, "width": 900.0});
},{}],"/Code/html/themes/themekit/lib/maps/js/vector/custom/jquery-jvectormap-us-aea-en.js":[function(require,module,exports){
$.fn.vectorMap('addMap', 'us_aea_en',{"insets": [{"width": 220, "top": 440, "height": 146.9158157558812, "bbox": [{"y": -8441281.712315228, "x": -5263934.893342895}, {"y": -6227992.545028123, "x": -1949631.2950683108}], "left": 0}, {"width": 80, "top": 460, "height": 129.05725678001465, "bbox": [{"y": -4207380.690946597, "x": -5958501.652314129}, {"y": -3658201.4570359783, "x": -5618076.48127754}], "left": 245}, {"width": 900.0, "top": 0, "height": 550.2150229714246, "bbox": [{"y": -5490839.2352678, "x": -2029243.6460439637}, {"y": -2690044.485299302, "x": 2552083.9617675776}], "left": 0}], "paths": {"US-VA": {"path": "M682.42,290.04l1.61,-0.93l1.65,-0.48l1.12,-0.95l3.57,-1.69l0.74,-2.33l0.82,-0.19l2.32,-1.54l0.05,-1.81l2.04,-1.86l-0.13,-1.58l0.26,-0.42l5.0,-4.09l4.76,-6.0l0.09,0.63l0.96,0.54l0.33,1.37l1.32,0.74l0.71,0.81l1.46,0.09l0.79,0.65l1.3,0.48l1.41,-0.09l0.79,-0.41l0.76,-1.22l1.17,-0.57l0.53,-1.38l2.72,1.49l1.42,-1.1l2.25,-0.99l0.76,0.06l1.08,-0.97l0.33,-0.82l-0.48,-0.96l0.23,-0.42l1.9,0.58l3.26,-2.62l0.3,-0.1l0.51,0.73l0.66,-0.07l2.38,-2.34l0.17,-0.85l-0.49,-0.51l0.99,-1.12l0.1,-0.6l-0.28,-0.51l-1.0,-0.46l0.71,-3.03l2.6,-4.8l0.55,-2.15l-0.01,-1.91l1.61,-2.55l-0.22,-0.94l0.24,-0.84l0.5,-0.48l0.39,-1.7l-0.0,-3.18l1.23,0.19l1.18,1.73l3.8,0.43l0.59,-0.28l1.05,-2.52l0.2,-2.36l0.71,-1.05l-0.04,-1.61l0.76,-2.31l1.78,0.75l0.65,-0.17l1.3,-3.3l0.57,0.05l0.59,-0.39l0.52,-1.2l0.81,-0.68l0.44,-1.8l1.38,-2.43l-0.35,-2.57l0.54,-1.76l-0.3,-2.01l9.18,4.58l0.59,-0.29l0.63,-4.0l2.6,-0.07l0.63,0.57l1.05,0.23l-0.5,1.74l0.6,0.88l1.61,0.85l2.52,-0.04l1.03,1.18l1.64,0.12l1.94,1.52l0.57,2.53l-0.94,0.78l-0.45,0.02l-0.3,0.43l0.13,0.71l-0.61,-0.05l-0.49,0.59l-0.37,2.5l0.07,2.29l-0.43,0.25l0.01,0.6l1.05,0.77l-0.36,0.14l-0.17,0.6l0.44,0.3l1.64,-0.08l1.38,-0.61l1.77,-1.61l0.39,0.58l-0.58,0.35l0.02,0.58l1.9,1.07l0.64,1.08l1.69,0.35l1.37,-0.11l0.95,0.49l0.82,-0.65l1.05,-0.08l0.33,0.56l1.26,0.63l-0.1,0.55l0.36,0.55l0.94,-0.23l0.41,0.56l3.96,0.88l0.25,1.12l-0.85,-0.41l-0.57,0.44l0.89,1.74l-0.35,0.57l0.62,0.78l-0.44,0.89l0.24,0.59l-1.36,-0.36l-0.59,-0.72l-0.67,0.18l-0.1,0.43l-2.44,-2.3l-0.56,0.05l-0.38,-0.56l-0.52,0.32l-1.36,-1.51l-1.23,-0.43l-2.86,-2.72l-1.34,-0.12l-1.11,-0.81l-1.17,0.05l-0.39,0.52l0.47,0.71l1.1,-0.01l0.63,0.68l1.33,0.07l0.6,0.43l0.62,1.4l1.46,1.11l1.13,0.34l1.53,1.8l2.55,0.94l1.4,1.89l2.14,-0.02l0.56,0.41l0.72,0.06l-0.61,0.7l0.3,0.49l2.03,0.34l0.26,0.72l0.55,0.1l0.13,1.67l-1.0,-0.75l-0.39,0.21l-1.13,-1.0l-0.58,0.29l0.1,0.82l-0.31,0.68l0.7,0.7l-0.18,0.6l1.12,0.32l-0.86,0.44l-2.12,-0.73l-1.39,-1.38l-0.83,-0.32l-2.23,-1.87l-0.58,0.11l-0.22,0.53l0.26,0.81l0.64,0.21l3.81,3.15l2.69,1.12l1.28,-0.33l0.45,1.07l1.27,0.26l-0.44,0.67l0.3,0.56l0.93,-0.19l0.0,1.24l-0.92,0.41l-0.57,0.73l-0.71,-0.93l-3.2,-1.58l-0.29,-1.16l-0.59,-0.59l-0.87,-0.11l-1.2,0.67l-1.71,-0.44l-0.36,-1.15l-0.71,-0.05l-0.05,1.32l-0.33,0.41l-1.43,-1.32l-0.51,0.09l-0.48,0.57l-0.65,-0.4l-0.99,0.45l-2.23,-0.1l-0.37,0.94l0.34,0.46l1.9,0.22l1.4,-0.31l0.85,0.24l0.56,-0.69l0.63,0.88l1.34,0.43l1.95,-0.31l1.5,0.71l0.67,-0.63l0.94,2.47l3.16,1.23l0.37,0.91l-0.57,1.03l0.56,0.44l1.72,-1.32l0.88,-0.02l0.83,0.65l0.8,-0.26l-0.61,-0.9l-0.2,-1.17l3.78,0.08l1.13,-0.44l1.89,3.23l-0.46,0.71l0.65,3.09l-1.19,-0.58l-0.02,0.88l-30.95,7.83l-37.19,8.41l-19.52,3.35l-7.08,0.85l-0.46,-0.26l-4.24,0.64l-0.82,0.62l-28.2,5.01ZM781.15,223.32l0.14,0.09l-0.06,0.07l-0.01,-0.03l-0.07,-0.12ZM808.05,244.59l0.53,-1.14l-0.26,-0.54l-0.36,-0.08l0.58,-0.98l-0.39,-0.71l-0.03,-0.49l0.44,-0.35l-0.17,-0.73l0.62,-0.3l0.23,-0.6l0.14,-2.33l1.01,-0.39l-0.12,-0.9l0.48,-0.14l-0.26,-1.53l-0.79,-0.4l0.87,-0.57l0.1,-1.03l2.69,-1.11l0.36,2.48l-1.08,4.2l-0.22,2.38l0.33,1.09l-0.34,0.97l-0.6,-0.79l-0.81,0.15l-0.39,0.95l0.27,0.37l-0.65,0.46l-0.3,0.85l0.17,1.05l-0.31,1.46l0.38,2.47l-0.6,0.6l0.07,1.33l-1.37,-1.9l0.23,-0.94l-0.33,-1.57l0.28,-0.97l-0.38,-0.3Z", "name": "Virginia"}, "US-PA": {"path": "M716.46,159.99l0.63,-0.19l4.3,-3.73l1.13,5.2l0.48,0.31l34.84,-7.93l34.28,-8.64l1.42,0.58l0.71,1.39l0.64,0.13l0.77,-0.33l1.24,0.59l0.14,0.85l0.81,0.41l-0.16,0.58l0.89,2.69l1.9,2.07l2.12,0.75l2.21,-0.2l0.72,0.79l-0.89,0.87l-0.73,1.49l-0.17,2.25l-1.41,3.35l-1.37,1.58l0.04,0.79l1.79,1.72l-0.31,1.65l-0.84,0.43l-0.22,0.66l0.14,1.48l1.04,2.87l0.52,0.25l1.2,-0.18l1.18,2.39l0.95,0.58l0.66,-0.26l0.6,0.9l4.23,2.75l0.12,0.41l-1.29,0.93l-3.71,4.22l-0.23,0.76l0.17,0.9l-1.36,1.13l-0.84,0.15l-1.33,1.08l-0.33,0.66l-1.72,-0.12l-2.03,0.84l-1.15,1.37l-0.41,1.39l-37.23,9.21l-39.1,8.66l-10.03,-48.21l1.92,-1.22l3.08,-3.04Z", "name": "Pennsylvania"}, "US-TN": {"path": "M571.72,341.09l0.86,-0.84l0.29,-1.37l1.0,0.04l0.65,-0.79l-0.99,-4.89l1.41,-1.93l0.06,-1.32l1.18,-0.46l0.36,-0.48l-0.63,-1.31l0.53,-0.65l0.05,-0.56l-0.89,-1.33l2.55,-1.57l1.09,-1.13l-0.14,-0.84l-0.85,-0.53l0.14,-0.19l0.34,-0.16l0.85,0.37l0.46,-0.33l-0.27,-1.31l-0.85,-0.9l0.06,-0.71l0.51,-1.43l1.0,-1.11l-1.35,-2.06l1.37,-0.21l0.61,-0.55l-0.13,-0.64l-1.17,-0.82l0.82,-0.15l0.58,-0.54l0.13,-0.69l-0.59,-1.38l0.02,-0.36l0.37,0.53l0.47,0.08l0.58,-0.29l0.6,-0.86l23.67,-2.81l0.35,-0.41l-0.1,-1.35l-0.84,-2.39l2.98,-0.08l0.82,0.58l22.79,-3.55l7.64,-0.46l7.5,-0.86l8.82,-1.42l24.01,-3.1l1.11,-0.6l29.3,-5.2l0.73,-0.6l3.56,-0.54l-0.4,1.44l0.43,0.85l-0.4,2.0l0.36,0.82l-1.15,-0.03l-1.71,1.79l-1.21,3.89l-0.55,0.7l-0.56,0.08l-0.63,-0.74l-1.44,-0.02l-2.66,1.73l-1.42,2.73l-0.96,0.89l-0.34,-0.34l-0.13,-1.05l-0.73,-0.54l-0.53,0.15l-2.3,1.81l-0.29,1.32l-0.93,-0.24l-0.9,0.48l-0.16,0.77l0.32,0.73l-0.85,2.18l-1.29,0.06l-1.75,1.14l-1.28,1.24l-0.61,1.06l-0.78,0.27l-2.28,2.46l-4.04,0.78l-2.58,1.7l-0.49,1.09l-0.88,0.55l-0.55,0.81l-0.18,2.88l-0.35,0.6l-1.65,0.52l-0.89,-0.16l-1.06,1.14l0.21,5.24l-20.21,3.32l-21.62,3.04l-25.56,2.95l-0.34,0.31l-7.39,0.9l-28.73,3.17Z", "name": "Tennessee"}, "US-ID": {"path": "M132.38,121.39l-0.34,-0.44l0.08,-1.99l0.53,-1.74l1.42,-1.22l2.11,-3.59l1.68,-0.92l1.39,-1.53l1.08,-2.15l0.05,-1.22l2.21,-2.41l1.43,-2.7l0.37,-1.37l2.04,-2.26l1.89,-2.81l0.03,-1.01l-0.79,-2.95l-2.13,-1.94l-0.87,-0.36l-0.85,-1.61l-0.41,-3.02l-0.59,-1.19l0.94,-1.19l-0.12,-2.35l-1.04,-2.69l0.46,-0.98l9.67,-54.45l13.39,2.35l-3.54,20.72l1.29,2.89l1.0,1.27l0.27,1.55l1.17,1.76l-0.12,0.83l0.39,1.14l-0.99,0.95l0.83,1.76l-0.83,0.11l-0.28,0.71l1.93,1.68l1.03,2.04l2.24,1.22l0.54,1.58l1.09,1.33l1.49,2.79l0.08,0.68l1.64,1.81l0.01,1.88l1.79,1.71l-0.07,1.35l0.74,0.19l0.9,-0.58l0.36,0.46l-0.36,0.55l0.07,0.54l1.11,0.96l1.61,0.15l1.81,-0.36l-0.63,2.61l-0.99,0.54l0.25,1.14l-1.83,3.73l0.06,1.72l-0.81,0.07l-0.37,0.54l0.6,1.33l-0.62,0.9l-0.03,1.16l0.97,0.93l-0.37,0.81l0.28,1.01l-1.57,0.43l-1.21,1.41l0.1,1.11l0.46,0.77l-0.13,0.74l-0.83,0.77l-0.2,1.52l1.48,0.63l1.38,1.79l0.78,0.27l1.08,-0.35l0.56,-0.8l1.85,-0.41l1.21,-1.28l0.81,-0.29l0.15,-0.76l0.78,0.81l0.23,0.71l1.06,0.64l-0.42,1.23l0.73,0.95l-0.34,1.38l0.57,1.34l-0.21,1.61l1.54,2.64l0.31,1.73l0.82,0.37l0.67,2.08l-0.18,0.98l-0.76,0.64l0.51,1.9l1.24,1.16l0.3,0.79l0.81,0.08l0.86,-0.37l1.04,0.93l1.06,2.79l-0.5,0.81l0.89,1.83l-0.28,0.6l0.11,0.98l2.29,2.41l0.97,-0.14l-0.01,-1.14l1.07,-0.89l0.93,-0.22l4.53,1.62l0.69,-0.32l0.67,-1.35l1.19,-0.39l2.25,0.93l3.3,-0.1l0.96,0.88l2.29,-0.58l3.23,0.78l0.45,-0.49l-0.67,-0.76l0.26,-1.06l0.74,-0.48l-0.07,-0.96l1.23,-0.51l0.48,0.37l1.07,2.11l0.12,1.11l1.36,1.95l0.73,0.45l-6.27,53.86l-47.48,-6.32l-46.97,-7.73l6.88,-39.17l1.12,-1.18l1.07,-2.67l-0.21,-1.75l0.74,-0.15l0.77,-1.62l-0.9,-1.27l-0.18,-1.2l-1.24,-0.08l-0.64,-0.81l-0.88,0.29Z", "name": "Idaho"}, "US-NV": {"path": "M139.36,329.2l-12.7,-16.93l-36.59,-51.1l-25.35,-34.52l13.7,-64.19l46.89,9.24l46.99,7.74l-18.72,125.83l-0.9,1.16l-0.99,2.19l-0.44,0.17l-1.34,-0.22l-0.98,-2.24l-0.7,-0.63l-1.41,0.22l-1.95,-1.02l-1.6,0.23l-1.78,0.96l-0.76,2.48l0.88,2.59l-0.6,0.97l-0.24,1.31l0.38,3.12l-0.76,2.54l0.77,3.71l-0.13,3.07l-0.3,1.07l-1.04,0.31l-0.12,0.51l0.32,0.8l-0.52,0.62Z", "name": "Nevada"}, "US-TX": {"path": "M276.16,412.59l33.07,1.99l32.79,1.35l0.41,-0.39l3.6,-98.71l25.86,0.61l26.29,0.22l0.05,42.09l0.44,0.4l1.02,-0.13l0.78,0.28l3.74,3.82l1.66,0.21l0.88,-0.58l2.49,0.64l0.6,-0.68l0.11,-1.05l0.6,0.76l0.92,0.22l0.38,0.93l0.77,0.78l-0.01,1.64l0.52,0.83l2.85,0.42l1.25,-0.2l1.38,0.89l2.78,0.69l1.82,-0.56l0.63,0.1l1.89,1.8l1.4,-0.11l1.25,-1.43l2.43,0.26l1.67,-0.46l0.1,2.28l0.91,0.67l1.62,0.4l-0.04,2.09l1.56,0.79l1.82,-0.66l1.57,-1.68l1.02,-0.65l0.41,0.19l0.45,1.64l2.01,0.2l0.24,1.05l0.72,0.48l1.47,-0.21l0.88,-0.93l0.39,0.33l0.59,-0.08l0.61,-0.99l0.26,0.41l-0.45,1.23l0.14,0.76l0.67,1.14l0.78,0.42l0.57,-0.04l0.6,-0.5l0.68,-2.36l0.91,-0.65l0.35,-1.54l0.57,-0.14l0.4,0.14l0.29,0.99l0.57,0.64l1.21,0.02l0.83,0.5l1.26,-0.2l0.68,-1.34l0.48,0.15l-0.13,0.7l0.49,0.69l1.21,0.45l0.49,0.72l1.52,-0.05l1.49,1.74l0.52,0.02l0.63,-0.62l0.08,-0.71l1.49,-0.1l0.93,-1.43l1.88,-0.41l1.66,-1.13l1.52,0.83l1.51,-0.22l0.29,-0.83l2.29,-0.73l0.53,-0.55l0.5,0.32l0.38,0.88l1.82,0.42l1.69,-0.06l1.86,-1.14l0.41,-1.05l1.06,0.31l2.24,1.56l1.16,0.17l1.79,2.08l2.14,0.41l1.04,0.92l0.76,-0.11l2.48,0.85l1.04,0.04l0.37,0.79l1.38,0.97l1.45,-0.12l0.39,-0.72l0.8,0.36l0.88,-0.4l0.92,0.35l0.76,-0.15l0.64,0.36l2.23,34.03l1.51,1.67l1.3,0.82l1.25,1.87l0.57,1.63l-0.1,2.64l1.0,1.21l0.85,0.4l-0.12,0.85l0.75,0.54l0.28,0.87l0.65,0.7l-0.19,1.17l1.0,1.02l0.59,1.63l0.5,0.34l0.55,-0.1l-0.16,1.71l0.81,1.22l-0.64,0.25l-0.35,0.68l0.77,1.27l-0.55,0.89l0.19,1.39l-0.75,2.69l-0.74,0.85l-0.36,1.54l-0.79,1.13l0.64,2.0l-0.83,2.28l0.17,1.07l0.83,1.2l-0.19,1.01l0.49,1.6l-0.24,1.41l-1.13,1.67l-1.02,0.2l-1.76,3.37l-0.04,1.06l1.79,2.37l-3.43,0.08l-7.37,3.78l-0.02,-0.43l-2.19,-0.46l-3.24,1.07l1.09,-3.51l-0.3,-1.21l-0.8,-0.76l-0.62,-0.07l-1.52,0.85l-0.99,2.0l-1.56,-0.96l-1.64,0.12l-0.07,0.63l0.89,0.62l0.0,1.06l0.56,0.39l-0.47,0.69l0.07,1.02l1.63,0.64l-0.62,0.71l0.49,0.97l0.91,0.23l0.28,0.37l-0.4,1.25l-0.45,-0.12l-0.97,0.81l-1.72,2.25l-1.18,-0.4l-0.49,0.12l0.32,1.0l0.08,2.55l-1.85,1.49l-1.91,2.11l-0.96,0.37l-4.1,2.9l-3.3,0.45l-2.54,1.06l-0.2,1.12l-0.75,-0.34l-2.04,0.89l-0.33,-0.34l-1.11,0.18l0.43,-0.87l-0.52,-0.6l-1.43,0.22l-1.22,1.08l-0.6,-0.62l-0.11,-1.2l-1.38,-0.81l-0.5,0.44l0.65,1.44l0.01,1.12l-0.71,0.09l-0.54,-0.44l-0.75,-0.0l-0.55,-1.34l-1.46,-0.37l-0.58,0.39l0.04,0.54l0.94,1.7l0.03,1.24l0.58,0.37l0.36,-0.16l1.13,0.78l-0.75,0.37l-0.27,0.54l0.15,0.36l0.7,0.23l1.08,-0.54l0.96,0.6l-4.27,2.42l-0.57,-0.13l-0.37,-1.44l-0.5,-0.18l-1.13,-1.46l-0.49,-0.03l-0.48,0.51l0.1,0.63l-0.62,0.34l-0.05,0.51l1.18,1.61l-0.31,1.04l0.33,0.85l-1.66,1.79l-0.37,0.2l0.37,-0.64l-0.18,-0.72l0.25,-0.73l-0.46,-0.67l-0.52,0.17l-0.71,1.1l0.26,0.72l-0.39,0.95l-0.07,-1.13l-0.52,-0.55l-1.95,1.29l-0.78,-0.33l-0.7,0.52l0.07,0.75l-0.81,0.99l0.02,0.49l1.25,0.64l0.03,0.56l0.78,0.28l0.7,-1.41l0.86,-0.41l0.01,0.62l-2.82,4.36l-1.23,-1.0l-1.36,0.38l-0.32,-0.34l-2.4,0.39l-0.46,-0.31l-0.65,0.16l-0.18,0.58l0.41,0.61l0.55,0.38l1.53,0.03l-0.01,0.91l0.55,0.64l2.07,1.03l-2.7,7.63l-0.2,0.1l-0.38,-0.54l-0.34,0.1l0.18,-0.76l-0.57,-0.43l-2.35,1.95l-1.72,-2.36l-1.19,-0.91l-0.61,0.4l0.09,0.52l1.44,2.0l-0.11,0.82l-0.93,-0.09l-0.33,0.63l0.51,0.56l1.88,0.07l2.14,0.72l2.08,-0.72l-0.43,1.75l0.24,0.77l-0.98,0.7l0.37,1.59l-1.12,0.14l-0.43,0.41l0.4,2.11l-0.33,1.6l0.45,0.64l0.84,0.24l0.87,2.86l0.71,2.81l-0.91,0.82l0.62,0.49l-0.08,1.28l0.72,0.3l0.18,0.61l0.58,0.29l0.4,1.79l0.68,0.31l0.45,3.22l1.46,0.62l-0.52,1.1l0.31,1.07l-0.63,0.77l-0.84,-0.05l-0.53,0.44l0.08,1.31l-0.49,-0.33l-0.49,0.25l-0.39,-0.67l-1.49,-0.45l-2.92,-2.53l-2.2,-0.18l-0.81,-0.51l-4.2,0.09l-0.9,0.42l-0.78,-0.63l-1.06,0.25l-1.25,-0.2l-1.45,-0.7l-0.72,-0.97l-0.6,-0.14l-0.21,-0.72l-1.17,-0.49l-0.99,-0.02l-1.98,-0.87l-1.45,0.39l-0.83,-1.09l-0.6,-0.21l-1.43,-1.38l-1.96,0.01l-1.47,-0.64l-0.86,0.12l-1.62,-0.41l0.28,-1.26l-0.54,-1.01l-0.96,-0.35l-1.65,-6.03l-2.77,-3.02l-0.29,-1.12l-1.08,-0.75l0.35,-0.77l-0.24,-0.76l0.34,-2.18l-0.45,-0.96l-1.04,-1.01l0.65,-1.99l0.05,-1.19l-0.18,-0.7l-0.54,-0.33l-0.15,-1.81l-1.85,-1.44l-0.85,0.21l-0.29,-0.41l-0.81,-0.11l-0.74,-1.31l-2.22,-1.71l0.01,-0.69l-0.51,-0.58l0.12,-0.86l-0.97,-0.92l-0.08,-0.75l-1.12,-0.61l-1.3,-2.88l-2.66,-1.48l-0.38,-0.91l-1.13,-0.59l-0.06,-1.16l-0.82,-1.19l-0.59,-1.95l0.41,-0.22l-0.04,-0.73l-1.03,-0.49l-0.26,-1.29l-0.81,-0.57l-0.94,-1.74l-0.61,-2.38l-1.85,-2.36l-0.87,-4.24l-1.81,-1.34l0.05,-0.7l-0.75,-1.21l-3.96,-2.67l-0.71,-1.86l-1.82,-0.62l-1.44,-0.99l-0.01,-1.63l-0.6,-0.39l-0.88,0.24l-0.12,-0.77l-0.98,-0.33l-0.8,-2.08l-0.57,-0.47l-0.46,0.12l-0.46,-0.44l-0.86,0.27l-0.14,-0.6l-0.44,-0.31l-0.47,0.15l-0.25,0.61l-1.05,0.16l-2.89,-0.47l-0.39,-0.38l-1.48,-0.03l-0.79,0.29l-0.77,-0.44l-2.67,0.27l-3.92,-2.08l-1.35,0.86l-0.64,1.61l-1.98,-0.17l-0.52,0.44l-0.49,-0.17l-1.05,0.49l-1.33,0.14l-3.22,6.4l-0.18,1.77l-0.76,0.67l-0.38,1.8l0.35,0.59l-1.99,1.01l-0.72,1.3l-1.11,0.65l-1.12,2.0l-2.67,-0.46l-1.04,-0.87l-0.55,0.3l-1.69,-1.21l-1.31,-1.63l-2.9,-0.85l-1.15,-0.95l-0.02,-0.67l-0.42,-0.41l-2.75,-0.51l-2.28,-1.03l-1.89,-1.75l-0.91,-1.53l-0.96,-0.91l-1.53,-0.29l-1.77,-1.26l-0.22,-0.56l-1.31,-1.18l-0.65,-2.68l-0.86,-1.01l-0.24,-1.1l-0.76,-1.28l-0.26,-2.34l0.52,-3.05l-3.01,-5.07l-0.06,-1.94l-1.26,-2.51l-0.99,-0.44l-0.43,-1.24l-1.43,-0.81l-2.15,-2.18l-1.02,-0.1l-2.01,-1.25l-3.18,-3.35l-0.59,-1.55l-3.13,-2.55l-1.59,-2.45l-1.19,-0.95l-0.61,-1.05l-4.42,-2.6l-1.19,-2.19l-1.21,-3.23l-1.37,-1.08l-1.12,-0.08l-1.75,-1.67l-0.79,-3.05ZM502.09,468.18l-0.33,0.17l0.18,-0.16l0.15,-0.02ZM498.69,470.85l-0.09,0.12l-0.04,0.02l0.13,-0.14ZM497.79,472.33l0.15,0.05l-0.2,0.18l0.04,-0.11l0.01,-0.12ZM497.02,473.23l-0.13,0.12l0.03,-0.09l0.09,-0.03ZM467.54,489.19l0.03,0.02l-0.02,0.01l-0.0,-0.03ZM453.94,547.19l0.75,-0.5l0.25,-0.68l0.11,1.08l-1.1,0.1ZM460.89,499.8l-0.14,-0.59l1.22,-0.36l-0.28,0.33l-0.79,0.63ZM463.51,497.84l0.1,-0.23l1.27,-0.88l-0.92,0.85l-0.45,0.26ZM465.8,496.12l0.28,-0.24l0.47,-0.04l-0.25,0.13l-0.5,0.15ZM457.96,502.92l0.71,-1.64l0.64,-0.71l-0.02,0.75l-1.33,1.6ZM451.06,515.13l0.06,-0.22l0.07,-0.15l-0.13,0.37ZM451.5,513.91l0.16,-0.35l0.02,-0.02l-0.18,0.37ZM452.44,511.95l-0.01,-0.04l0.05,-0.04l-0.04,0.08Z", "name": "Texas"}, "US-NH": {"path": "M829.94,105.42l0.2,-1.33l-1.43,-5.38l0.53,-1.45l-0.28,-2.22l1.0,-1.86l-0.13,-2.3l0.64,-2.28l-0.44,-0.62l0.29,-2.31l-0.93,-3.8l0.08,-0.7l0.3,-0.45l1.83,-0.8l0.7,-1.39l1.43,-1.62l0.74,-1.8l-0.25,-1.13l0.52,-0.62l-2.34,-3.49l0.87,-3.26l-0.11,-0.78l-0.81,-1.29l0.27,-0.59l-0.23,-0.7l0.48,-3.2l-0.36,-0.82l0.91,-1.49l2.44,0.33l0.65,-0.88l13.0,34.89l0.84,3.65l2.6,2.21l0.88,0.34l0.36,1.6l1.72,1.31l0.0,0.35l0.77,0.23l-0.06,0.58l-0.46,3.09l-1.57,0.24l-1.32,1.19l-0.51,0.94l-0.96,0.37l-0.5,1.68l-1.1,1.44l-17.61,4.74l-1.7,-1.43l-0.41,-0.89l-0.1,-2.0l0.54,-0.59l0.03,-0.52l-1.02,-5.18Z", "name": "New Hampshire"}, "US-NY": {"path": "M821.38,166.44l0.69,-2.05l0.62,-0.02l0.55,-0.75l0.76,0.15l0.54,-0.41l-0.04,-0.31l0.57,-0.03l0.28,-0.66l0.66,-0.02l0.2,-0.55l-0.42,-0.83l0.22,-0.53l0.61,-0.37l1.34,0.22l0.54,-0.59l1.45,-0.18l0.21,-0.8l1.85,0.02l1.08,-0.91l0.11,-0.78l0.62,0.24l0.43,-0.61l4.83,-1.29l2.26,-1.3l1.99,-2.91l-0.2,1.16l-0.98,0.86l-1.22,2.31l0.55,0.46l1.6,-0.35l0.28,0.63l-0.43,0.49l-1.37,0.87l-0.51,-0.07l-2.26,0.92l-0.08,0.93l-0.87,-0.0l-2.73,1.72l-1.01,0.15l-0.17,0.8l-1.24,0.09l-2.24,1.91l-4.44,2.17l-0.2,0.71l-0.29,0.08l-0.45,-0.83l-1.41,-0.06l-0.73,0.42l-0.42,0.8l0.23,0.32l-0.92,0.69l-0.76,-0.84l0.32,-1.05ZM828.05,159.06l-0.02,-0.01l0.02,-0.06l-0.01,0.08ZM845.16,149.05l0.06,-0.06l0.18,-0.06l-0.11,0.19l-0.13,-0.07ZM844.3,154.94l0.1,-0.89l0.74,-1.16l1.65,-1.52l1.01,0.31l0.05,-0.82l0.79,0.67l-3.36,3.21l-0.67,0.45l-0.31,-0.25ZM850.39,150.14l0.02,-0.03l0.07,-0.07l-0.09,0.1ZM722.09,155.56l3.76,-3.85l1.27,-2.19l1.76,-1.86l1.16,-0.78l1.28,-3.35l1.56,-1.3l0.53,-0.83l-0.21,-1.83l-1.61,-2.42l0.43,-1.13l-0.17,-0.78l-0.83,-0.53l-2.11,-0.0l0.04,-0.99l-0.57,-2.22l4.99,-2.94l4.49,-1.8l2.38,-0.19l1.84,-0.74l5.64,-0.24l3.13,1.25l3.16,-1.68l5.49,-1.06l0.58,0.45l0.68,-0.2l0.12,-0.98l1.45,-0.72l1.03,-0.93l0.75,-0.2l0.69,-2.05l1.87,-1.76l0.79,-1.26l1.12,0.03l1.13,-0.52l1.07,-1.63l-0.46,-0.7l0.36,-1.2l-0.25,-0.51l-0.64,0.02l-0.17,-1.17l-0.94,-1.59l-1.01,-0.62l0.12,-0.18l0.59,0.39l0.53,-0.27l0.75,-1.44l-0.01,-0.91l0.81,-0.65l-0.01,-0.97l-0.93,-0.19l-0.6,0.7l-0.28,0.12l0.56,-1.3l-0.81,-0.62l-1.26,0.05l-0.87,0.77l-0.92,-0.41l-0.06,-0.29l2.05,-2.5l1.78,-1.47l1.67,-2.64l0.7,-0.56l0.11,-0.59l0.78,-0.95l0.07,-0.56l-0.5,-0.95l0.78,-1.89l4.82,-7.61l4.77,-4.5l2.84,-0.51l19.67,-5.66l0.41,0.88l-0.08,2.01l1.02,1.22l0.43,3.8l2.29,3.25l-0.09,1.89l0.85,2.42l-0.59,1.07l-0.0,3.41l0.71,0.9l1.32,2.76l0.19,1.09l0.62,0.84l0.12,3.92l0.55,0.85l0.54,0.07l0.53,-0.61l0.06,-0.87l0.33,-0.07l1.05,1.12l3.97,15.58l0.74,1.2l0.22,15.32l0.6,0.62l3.57,16.23l1.26,1.34l-2.82,3.18l0.03,0.54l1.52,1.31l0.19,0.6l-0.78,0.88l-0.64,1.8l-0.41,0.39l0.15,0.69l-1.25,0.64l0.04,-4.02l-0.57,-2.28l-0.74,-1.62l-1.46,-1.1l-0.17,-1.13l-0.7,-0.1l-0.42,1.33l0.68,1.27l1.05,0.83l0.97,2.85l-13.75,-4.06l-1.28,-1.47l-2.39,0.24l-0.63,-0.43l-1.06,-0.15l-1.74,-1.91l-0.75,-2.33l0.12,-0.72l-0.36,-0.63l-0.56,-0.21l0.09,-0.46l-0.35,-0.42l-1.64,-0.68l-1.08,0.32l-0.53,-1.22l-1.92,-0.93l-34.6,8.73l-34.44,7.84l-1.11,-5.15ZM818.84,168.69l1.08,-0.48l0.14,0.63l-1.17,1.53l-0.05,-1.68ZM730.07,136.63l0.03,-0.69l0.78,-0.07l-0.38,1.09l-0.43,-0.33Z", "name": "New York"}, "US-HI": {"path": "M295.5,583.17l0.06,-1.75l4.12,-4.97l1.03,-3.4l-0.33,-0.64l0.94,-2.43l-0.05,-3.52l0.39,-0.78l2.47,-0.7l1.55,0.23l4.45,-1.4l0.51,-0.7l-0.17,-2.69l0.4,-1.66l1.78,-1.16l1.74,2.15l-0.15,0.94l1.88,3.6l0.94,0.35l5.13,7.65l0.86,3.93l-1.52,3.14l0.22,0.58l1.47,0.95l-0.68,2.07l0.35,1.51l1.6,3.0l-1.39,0.86l-2.28,-0.2l-3.27,0.51l-4.56,-1.32l-2.15,-1.34l-6.66,-0.15l-1.59,0.26l-1.56,1.19l-1.63,0.58l-1.14,0.02l-0.7,-2.54l-2.09,-2.18ZM306.33,530.7l1.6,0.08l0.51,2.07l-0.3,2.25l0.37,0.59l2.33,0.88l1.38,0.1l1.55,1.39l0.27,1.55l0.93,0.97l-0.13,1.05l1.83,2.52l-0.13,0.66l-0.61,0.48l-1.82,0.38l-1.84,-0.18l-1.47,-1.19l-2.21,-0.24l-2.69,-1.48l0.01,-1.23l1.15,-1.86l0.41,-2.07l-1.76,-1.28l-1.08,-1.75l-0.1,-2.61l1.79,-1.08ZM297.2,518.01l0.71,0.31l0.38,1.05l2.64,2.0l0.9,1.11l0.92,0.08l0.8,1.67l1.56,1.05l0.72,0.06l1.07,1.11l-1.31,0.41l-2.75,-0.66l-3.23,-3.93l-3.16,-2.01l-1.39,-0.44l-0.05,-0.7l1.58,-0.43l0.62,-0.67ZM301.59,541.55l-2.09,-0.98l-0.28,-0.51l2.92,0.34l-0.56,1.15ZM298.23,532.36l-0.92,-0.29l-0.72,-0.89l0.92,-2.06l-0.49,-1.73l2.6,1.38l0.61,2.08l0.14,1.06l-2.15,0.45ZM281.13,503.64l0.57,-1.85l-0.38,-0.9l-0.16,-2.84l0.75,-0.92l-0.12,-1.22l2.74,1.9l2.9,-0.62l1.56,0.15l0.38,1.01l-0.33,2.17l0.29,1.5l-0.69,0.6l-0.19,1.55l0.38,1.54l0.86,0.51l0.29,1.07l-0.52,1.14l0.53,1.28l-1.18,-0.0l-0.2,-0.48l-2.04,-0.86l-0.77,-2.83l-1.27,-0.38l0.8,-0.11l0.32,-0.46l-0.08,-0.66l-0.63,-0.68l-1.75,-0.32l0.23,1.82l-2.28,-1.1ZM259.66,469.47l-0.24,-2.03l-0.91,-0.69l-0.68,-1.23l0.08,-1.2l0.08,-0.34l2.39,-0.81l4.6,0.53l0.67,1.04l2.51,1.09l0.69,1.25l-0.15,1.9l-2.3,1.32l-0.74,1.3l-0.79,0.34l-2.78,0.09l-0.92,-1.53l-1.52,-1.0ZM245.78,462.61l-0.23,-0.74l1.03,-0.75l4.32,-0.72l0.43,0.3l-0.92,0.4l-0.68,0.94l-1.66,-0.5l-1.36,0.34l-0.94,0.72Z", "name": "Hawaii"}, "US-VT": {"path": "M805.56,72.69l26.03,-7.97l0.89,1.85l-0.74,2.37l-0.03,1.54l2.22,2.75l-0.51,0.58l0.26,1.13l-0.67,1.6l-1.35,1.49l-0.64,1.32l-1.72,0.7l-0.62,0.92l-0.1,0.98l0.93,3.74l-0.29,2.44l0.4,0.54l-0.6,2.11l0.15,2.19l-1.0,1.87l0.27,2.36l-0.53,1.54l1.43,5.44l-0.22,1.22l1.05,5.3l-0.58,0.85l0.11,2.31l0.6,1.26l1.51,1.1l-11.44,2.89l-0.57,-0.85l-4.02,-15.75l-1.72,-1.59l-0.91,0.25l-0.3,1.19l-0.12,-0.26l-0.11,-3.91l-0.68,-1.0l-0.14,-0.98l-1.37,-2.85l-0.63,-0.68l0.01,-3.15l0.6,-1.15l-0.86,-2.57l0.08,-1.93l-0.39,-0.91l-1.55,-1.63l-0.38,-0.81l-0.41,-3.71l-1.03,-1.27l0.11,-1.87l-0.43,-1.01Z", "name": "Vermont"}, "US-NM": {"path": "M230.86,422.88l11.82,-123.66l25.67,2.24l26.1,1.86l26.12,1.45l25.74,1.02l-0.31,10.24l-0.74,0.39l-3.59,98.69l-32.38,-1.34l-33.53,-2.02l-0.44,0.76l0.54,2.31l0.44,1.26l0.99,0.76l-30.55,-2.46l-0.43,0.36l-0.82,9.46l-14.63,-1.33Z", "name": "New Mexico"}, "US-NC": {"path": "M826.87,289.49l0.07,-0.05l-0.02,0.03l-0.04,0.02ZM819.58,272.4l0.2,0.23l-0.05,0.01l-0.16,-0.24ZM821.84,276.68l0.19,0.15l-0.02,0.18l-0.05,-0.08l-0.12,-0.25ZM676.72,321.77l0.92,0.17l1.52,-0.39l0.42,-0.39l0.52,-0.97l0.13,-2.7l1.34,-1.19l0.47,-1.05l2.24,-1.47l2.12,-0.52l0.76,0.18l1.32,-0.52l2.36,-2.52l0.78,-0.25l1.84,-2.29l1.48,-1.0l1.55,-0.19l1.15,-2.65l-0.28,-1.22l1.66,0.06l0.51,-1.65l0.93,-0.77l1.08,-0.77l0.51,1.52l1.07,0.33l1.34,-1.17l1.35,-2.64l2.49,-1.59l0.79,0.08l0.82,0.8l1.06,-0.21l0.84,-1.07l1.47,-4.18l1.08,-1.1l1.47,0.09l0.44,-0.31l-0.69,-1.26l0.4,-2.0l-0.42,-0.9l0.38,-1.25l7.42,-0.86l19.54,-3.36l37.22,-8.42l31.12,-7.87l0.4,1.21l3.54,3.24l1.0,1.53l-1.21,-1.0l-0.16,-0.63l-0.92,-0.4l-0.52,0.05l-0.24,0.65l0.66,0.54l0.59,1.56l-0.53,0.01l-0.91,-0.75l-2.31,-0.8l-0.4,-0.48l-0.55,0.13l-0.31,0.69l0.14,0.64l1.37,0.44l1.69,1.38l-1.11,0.66l-2.48,-1.2l-0.36,0.51l0.14,0.42l1.6,1.18l-1.84,-0.33l-2.23,-0.87l-0.46,0.14l0.01,0.48l0.6,0.7l1.71,0.83l-0.97,0.58l0.0,0.6l-0.43,0.53l-1.48,0.74l-0.89,-0.77l-0.61,0.22l-0.1,0.35l-0.2,-0.13l-1.32,-2.32l0.21,-2.63l-0.42,-0.48l-0.89,-0.22l-0.37,0.64l0.62,0.71l-0.43,0.99l-0.02,1.04l0.49,1.73l1.6,2.2l-0.31,1.28l0.48,0.29l2.97,-0.59l2.1,-1.49l0.27,0.01l0.37,0.79l0.76,-0.34l1.56,0.05l0.16,-0.71l-0.57,-0.32l1.29,-0.76l2.04,-0.46l-0.1,1.19l0.64,0.29l-0.6,0.88l0.89,1.19l-0.84,0.1l-0.19,0.66l1.38,0.46l0.26,0.94l-1.21,0.05l-0.19,0.66l0.66,0.59l1.25,-0.16l0.52,0.26l0.4,-0.38l0.18,-1.95l-0.75,-3.33l0.41,-0.48l0.56,0.43l0.94,0.06l0.28,-0.57l-0.29,-0.44l0.48,-0.57l1.71,1.84l-0.0,1.41l0.62,0.9l-0.53,0.18l-0.25,0.47l0.9,1.14l-0.08,0.37l-0.42,0.55l-0.78,0.09l-0.91,-0.86l-0.32,0.33l0.13,1.26l-1.08,1.61l0.2,0.57l-0.32,0.22l-0.15,0.98l-0.74,0.55l0.1,0.91l-0.9,0.96l-1.06,0.21l-0.59,-0.37l-0.52,0.52l-0.93,-0.81l-0.86,0.1l-0.4,-0.82l-0.59,-0.21l-0.52,0.38l0.08,0.94l-0.52,0.22l-1.42,-1.25l1.31,-0.4l0.23,-0.88l-0.57,-0.42l-2.02,0.31l-1.14,1.01l0.29,0.67l0.44,0.16l0.09,0.82l0.35,0.25l-0.03,0.12l-0.57,-0.34l-1.69,0.83l-1.12,-0.43l-1.45,0.06l-3.32,-0.7l0.42,1.08l0.97,0.45l0.36,0.64l0.63,0.11l0.87,-0.32l1.68,0.63l2.35,0.39l3.51,0.11l0.47,0.42l-0.06,0.52l-0.99,0.05l-0.38,0.5l0.13,0.23l-1.62,1.44l0.32,0.58l1.85,0.01l-2.55,3.5l-1.67,0.04l-1.59,-0.98l-0.9,-0.19l-1.21,-1.02l-1.12,0.07l0.07,0.47l1.04,1.14l2.32,2.09l2.68,0.26l1.31,0.49l1.71,-2.16l0.51,0.47l1.17,0.33l0.4,-0.57l-0.55,-0.9l0.87,0.16l0.19,0.57l0.66,0.24l1.63,-1.2l-0.18,0.61l0.29,0.57l-0.29,0.38l-0.43,-0.2l-0.41,0.37l0.03,0.9l-0.97,1.72l0.01,0.78l-0.71,-0.07l-0.06,-0.74l-1.12,-0.61l-0.42,0.47l0.27,1.45l-0.52,-1.1l-0.65,-0.16l-1.22,1.08l-0.21,0.52l0.25,0.27l-2.03,0.32l-2.75,1.84l-0.67,-1.04l-0.75,-0.29l-0.37,0.49l0.43,1.26l-0.57,-0.01l-0.09,0.82l-0.94,1.73l-0.91,0.85l-0.59,-0.26l0.49,-0.69l-0.02,-0.77l-1.06,-0.93l-0.08,-0.52l-1.69,-0.41l-0.16,0.47l0.43,1.16l0.2,0.33l0.58,0.07l0.3,0.61l-0.88,0.37l-0.08,0.71l0.65,0.64l0.77,0.18l-0.01,0.37l-2.12,1.67l-1.92,2.65l-2.0,4.31l-0.34,2.13l0.12,1.34l-0.15,-1.03l-1.01,-1.59l-0.55,-0.17l-0.3,0.48l1.17,3.95l-0.63,2.27l-3.9,0.19l-1.43,0.65l-0.35,-0.52l-0.58,-0.18l-0.54,1.07l-1.9,1.14l-0.61,-0.02l-23.25,-15.36l-1.05,-0.02l-18.68,3.49l-0.65,-2.77l-3.25,-2.84l-0.47,0.08l-1.23,1.31l-0.01,-1.29l-0.82,-0.54l-22.82,3.35l-0.64,-0.27l-0.62,0.46l-0.25,0.65l-3.98,1.93l-0.89,1.23l-1.01,0.08l-4.78,2.66l-20.95,3.93l-0.34,-4.55l0.7,-0.95ZM817.0,271.48l0.19,0.35l0.24,0.39l-0.45,-0.41l0.02,-0.32ZM807.53,290.29l0.2,0.32l-0.16,-0.09l-0.03,-0.23ZM815.31,299.15l0.16,-0.36l0.16,0.07l-0.13,0.29l-0.19,0.01ZM812.76,299.11l-0.06,-0.28l-0.03,-0.11l0.3,0.26l-0.21,0.13ZM812.97,264.02l0.37,-0.24l0.15,0.42l-0.42,0.07l-0.1,-0.25ZM791.92,329.4l0.04,-0.08l0.22,0.03l-0.0,0.09l-0.26,-0.05Z", "name": "North Carolina"}, "US-ND": {"path": "M438.54,42.78l2.06,6.9l-0.73,2.53l0.57,2.36l-0.27,1.17l0.47,1.99l0.01,3.26l1.42,3.95l0.45,0.54l-0.08,0.97l0.39,1.52l0.62,0.74l1.48,3.74l-0.06,3.9l0.42,0.7l0.5,8.35l0.51,1.54l0.51,0.25l-0.47,2.64l0.36,1.63l-0.14,1.75l0.69,1.1l0.2,2.16l0.49,1.13l1.8,2.56l0.15,2.2l0.51,1.08l0.17,1.39l-0.24,1.36l0.28,1.74l-27.89,0.73l-28.38,0.19l-28.38,-0.37l-28.49,-0.93l2.75,-65.47l23.08,0.78l25.57,0.42l25.57,-0.06l24.11,-0.49Z", "name": "North Dakota"}, "US-NE": {"path": "M422.58,174.02l3.92,2.71l3.93,1.9l1.34,-0.22l0.51,-0.47l0.36,-1.08l0.48,-0.2l2.49,0.34l1.32,-0.47l1.58,0.25l3.45,-0.65l2.37,1.98l1.4,0.14l1.55,0.77l1.45,0.08l0.88,1.1l1.49,0.17l-0.06,0.98l1.68,2.08l3.32,0.6l0.19,0.68l-0.22,1.87l1.13,1.94l0.01,2.29l1.15,1.08l0.34,1.72l1.73,1.46l0.07,1.88l1.5,2.11l-0.49,2.33l0.44,3.09l0.52,0.54l0.94,-0.2l-0.04,1.25l1.21,0.5l-0.41,2.36l0.21,0.44l1.12,0.4l-0.6,0.77l-0.09,1.01l0.13,0.59l0.82,0.5l0.16,1.45l-0.26,0.92l0.26,1.27l0.55,0.61l0.3,1.93l-0.22,1.33l0.23,0.72l-0.57,0.92l0.02,0.79l0.45,0.88l1.23,0.63l0.25,2.5l1.1,0.51l0.03,0.79l1.18,2.75l-0.23,0.96l1.16,0.21l0.8,0.99l1.1,0.24l-0.15,0.96l1.31,1.68l-0.21,1.12l0.51,0.91l-26.15,1.05l-27.83,0.63l-27.84,0.14l-27.89,-0.35l0.46,-21.66l-0.39,-0.41l-32.36,-1.04l1.85,-43.24l43.36,1.22l44.67,-0.04Z", "name": "Nebraska"}, "US-LA": {"path": "M508.97,412.97l-1.33,-21.76l51.44,-4.07l0.34,0.83l1.48,0.66l-0.92,1.35l-0.25,2.13l0.49,0.72l1.18,0.31l-1.21,0.47l-0.45,0.78l0.45,1.36l1.05,0.84l0.08,2.15l0.46,0.54l1.51,0.74l0.45,1.05l1.42,0.44l-0.87,1.22l-0.85,2.34l-0.75,0.04l-0.52,0.51l-0.02,0.73l0.63,0.72l-0.22,1.16l-1.35,0.96l-1.08,1.89l-1.37,0.67l-0.68,0.83l-0.79,2.42l-0.25,3.52l-1.55,1.74l0.13,1.21l0.62,0.96l-0.35,2.38l-1.61,0.29l-0.6,0.57l0.28,0.97l0.64,0.59l-0.26,1.41l0.98,1.51l-1.18,1.18l-0.08,0.45l0.4,0.23l6.18,-0.55l29.23,-2.92l-0.68,3.47l-0.52,1.02l-0.2,2.24l0.69,0.98l-0.09,0.66l0.6,1.0l1.31,0.7l1.22,1.42l0.14,0.88l0.89,1.39l0.14,1.05l1.11,1.84l-1.85,0.39l-0.38,-0.08l-0.01,-0.56l-0.53,-0.57l-1.28,0.28l-1.18,-0.59l-1.51,0.17l-0.61,-0.98l-1.24,-0.86l-2.84,-0.47l-1.24,0.63l-1.39,2.3l-1.3,1.42l-0.42,0.91l0.07,1.2l0.55,0.89l0.82,0.57l4.25,0.82l3.35,-1.0l1.32,-1.19l0.68,-1.19l0.34,0.59l1.08,0.43l0.59,-0.4l0.81,0.03l0.51,-0.46l-0.76,1.21l-1.12,-0.12l-0.57,0.32l-0.38,0.62l0.0,0.83l0.77,1.22l1.48,-0.02l0.65,0.89l1.1,0.48l0.94,-0.21l0.51,-0.45l0.46,-1.11l-0.02,-1.37l0.93,-0.58l0.42,-0.99l0.23,0.05l0.1,1.16l-0.24,0.25l0.18,0.57l0.43,0.15l-0.07,0.75l1.34,1.08l0.34,-0.16l-0.48,0.59l0.18,0.63l-0.35,0.13l-0.52,-0.57l-0.92,-0.19l-1.0,1.89l-0.85,0.14l-0.46,0.53l0.16,1.19l-1.6,-0.61l-0.43,0.19l0.04,0.46l1.14,1.06l-1.17,-0.14l-0.92,0.61l0.68,0.43l1.26,2.04l2.74,0.97l-0.08,1.2l0.34,0.41l2.07,-0.32l0.77,0.17l0.17,0.53l0.73,0.32l1.35,-0.34l0.53,0.78l1.08,-0.46l1.13,0.74l0.14,0.3l-0.4,0.62l1.54,0.86l-0.39,0.65l0.39,0.58l-0.18,0.62l-0.95,1.49l-1.3,-1.56l-0.68,0.34l0.1,0.66l-0.38,0.12l0.41,-1.88l-1.33,-0.76l-0.5,0.5l0.2,1.18l-0.54,0.45l-0.27,-1.02l-0.57,-0.25l-0.89,-1.27l0.03,-0.77l-0.96,-0.14l-0.47,0.5l-1.41,-0.17l-0.41,-0.61l0.14,-0.63l-0.39,-0.46l-0.45,-0.02l-0.81,0.73l-1.18,0.02l0.12,-1.23l-0.46,-0.88l-0.91,0.04l0.09,-0.96l-0.37,-0.36l-0.91,-0.03l-0.22,0.58l-0.85,-0.38l-0.48,0.27l-2.61,-1.26l-1.24,-0.03l-0.67,-0.64l-0.61,0.19l-0.3,0.56l-0.05,1.25l1.72,0.94l1.67,0.35l-0.16,0.92l0.28,0.39l-0.34,0.35l0.23,0.68l-0.76,0.95l-0.02,0.66l0.81,0.97l-0.95,1.43l-1.33,0.94l-0.76,-1.15l0.22,-1.5l-0.35,-0.92l-0.49,-0.18l-0.4,0.36l-1.15,-1.08l-0.59,0.42l-0.76,-1.05l-0.62,-0.2l-0.64,1.33l-0.85,0.26l-0.88,-0.53l-0.86,0.53l-0.1,0.62l0.48,0.41l-0.68,0.56l-0.13,1.44l-0.46,0.13l-0.39,0.83l-0.92,0.08l-0.11,-0.68l-1.6,-0.4l-0.77,0.97l-1.92,-0.93l-0.3,-0.54l-0.99,0.01l-0.35,0.6l-1.16,-0.51l0.42,-0.4l0.01,-1.46l-0.38,-0.57l-1.9,-1.19l-0.08,-0.54l-0.83,-0.72l-0.09,-0.91l0.73,-1.15l-0.34,-1.14l-0.87,-0.19l-0.34,0.57l0.16,0.43l-0.59,0.81l0.04,0.91l-1.8,-0.4l0.07,-0.39l-0.47,-0.54l-1.97,0.76l-0.7,-2.22l-1.32,0.23l-0.18,-2.12l-1.31,-0.35l-1.89,0.3l-1.09,0.65l-0.21,-0.71l0.84,-0.26l-0.05,-0.8l-0.6,-0.58l-1.03,-0.1l-0.85,0.42l-0.95,-0.15l-0.4,0.8l-2.0,1.11l-0.63,-0.31l-1.29,0.71l0.54,1.37l0.8,0.31l0.97,1.51l-1.39,0.19l-1.83,1.03l-3.69,-0.4l-1.24,0.21l-3.09,-0.45l-1.99,-0.68l-1.81,-1.07l-3.7,-1.1l-3.19,-0.48l-2.53,0.58l-5.62,0.45l-1.0,0.26l-1.82,1.25l-0.59,-0.63l-0.26,-1.08l1.59,-0.47l0.7,-1.76l-0.02,-1.55l-0.39,-0.56l1.11,-1.54l0.23,-1.59l-0.5,-1.83l0.07,-1.46l-0.66,-0.7l-0.21,-1.04l0.83,-2.22l-0.64,-1.95l0.76,-0.84l0.3,-1.49l0.78,-0.94l0.79,-2.83l-0.18,-1.42l0.58,-0.97l-0.75,-1.33l0.84,-0.39l0.2,-0.44l-0.89,-1.36l0.03,-2.13l-1.07,-0.23l-0.57,-1.57l-0.92,-0.84l0.28,-1.27l-0.81,-0.76l-0.33,-0.95l-0.64,-0.34l0.22,-0.98l-1.16,-0.58l-0.81,-0.93l0.16,-2.46l-0.68,-1.93l-1.33,-1.98l-2.63,-2.21ZM607.49,467.45l-0.03,-0.03l-0.07,-0.04l0.13,-0.01l-0.03,0.08ZM607.51,465.85l-0.02,-0.01l0.03,-0.01l-0.02,0.02ZM567.04,468.98l-2.0,-0.42l-0.66,-0.5l0.73,-0.43l0.35,-0.76l0.39,0.49l0.83,0.21l-0.15,0.61l0.5,0.81ZM550.39,463.0l1.73,-1.05l3.34,1.07l-0.69,0.56l-0.17,0.81l-0.68,0.17l-3.53,-1.57Z", "name": "Louisiana"}, "US-SD": {"path": "M336.37,128.84l0.3,-0.53l0.75,-19.93l28.5,0.93l28.4,0.37l28.4,-0.19l27.78,-0.73l-0.18,1.71l-0.73,1.71l-2.9,2.46l-0.42,1.27l1.59,2.13l1.06,2.06l0.55,0.36l1.74,0.24l1.01,0.84l0.57,1.02l1.45,38.83l-1.84,0.09l-0.42,0.56l0.24,1.44l0.88,1.14l0.01,1.45l-0.65,0.36l0.17,1.48l0.48,0.43l1.09,0.04l0.34,1.68l-0.16,0.91l-0.62,0.83l0.02,1.73l-0.68,2.45l-0.49,0.44l-0.67,1.88l0.5,1.1l1.33,1.08l-0.16,0.62l0.64,0.66l0.35,1.15l-1.65,-0.28l-0.34,-0.94l-0.85,-0.73l0.19,-0.61l-0.28,-0.59l-1.58,-0.23l-1.03,-1.18l-1.57,-0.11l-1.51,-0.75l-1.34,-0.12l-2.38,-1.99l-3.78,0.6l-1.65,-0.25l-1.19,0.46l-2.62,-0.33l-0.98,0.48l-0.76,1.45l-0.72,0.05l-3.67,-1.82l-4.13,-2.8l-44.83,0.05l-43.33,-1.22l1.79,-43.2Z", "name": "South Dakota"}, "US-DC": {"path": "M781.25,216.97l0.45,-0.77l2.04,1.26l-0.66,1.14l-0.55,-1.05l-1.28,-0.58Z", "name": "District of Columbia"}, "US-DE": {"path": "M798.52,195.11l0.42,-1.51l0.92,-1.11l1.72,-0.71l1.12,0.06l-0.33,0.56l-0.08,1.38l-1.13,1.92l0.1,1.09l1.11,1.1l-0.07,1.52l2.29,2.48l1.25,0.6l0.93,1.52l0.99,3.35l1.72,1.57l0.57,1.32l3.06,1.99l1.44,-0.09l0.45,1.25l-1.06,0.56l0.16,1.32l0.36,0.19l-0.83,0.57l-0.08,1.21l0.66,0.21l0.85,-0.73l0.71,0.34l0.3,-0.21l0.75,1.55l-10.19,2.82l-8.12,-26.12Z", "name": "Delaware"}, "US-FL": {"path": "M630.28,423.69l47.19,-6.86l1.53,1.91l0.87,2.72l1.47,1.0l48.79,-5.11l1.03,1.38l0.03,1.09l0.55,1.05l1.04,0.48l1.64,-0.28l0.85,-0.75l-0.14,-4.57l-0.98,-1.49l-0.22,-1.77l0.28,-0.74l0.62,-0.3l0.12,-0.7l5.6,0.96l4.03,-0.16l0.14,1.24l-0.75,-0.12l-0.33,0.43l0.25,1.54l2.11,1.81l0.22,1.01l0.42,0.38l0.29,1.92l1.87,3.29l1.7,4.87l0.73,0.84l0.51,1.5l1.64,2.46l0.64,1.57l2.79,3.71l1.93,3.18l2.29,2.77l0.16,0.6l0.63,0.36l6.82,7.53l-0.48,-0.03l-0.27,0.61l-1.35,-0.02l-0.34,-0.65l0.38,-1.38l-0.16,-0.56l-2.3,-0.92l-0.46,0.53l1.0,2.8l0.78,0.97l2.14,4.77l9.92,13.71l1.37,3.11l3.66,5.34l-1.38,-0.35l-0.43,0.74l0.8,0.65l0.85,0.24l0.56,-0.22l1.46,0.94l2.05,3.05l-0.5,0.34l-0.12,0.53l1.16,0.53l0.89,1.83l-0.08,1.06l0.59,0.95l0.61,2.64l-0.27,0.75l0.93,8.98l-0.31,1.07l0.46,0.67l0.5,3.1l-0.81,1.46l0.07,2.23l-0.84,0.74l-0.22,1.8l-0.48,0.85l0.21,1.47l-0.3,1.75l0.54,1.74l0.45,0.23l-1.15,1.8l-0.39,1.28l-0.94,0.24l-0.53,-0.22l-1.37,0.45l-0.35,1.06l-0.89,0.3l-0.18,0.58l-0.85,0.67l-1.44,0.14l-0.27,-0.32l-1.23,-0.1l-0.9,1.05l-3.17,1.13l-1.06,-0.59l-0.7,-1.04l0.06,-1.79l1.0,0.84l1.64,0.47l0.26,0.63l0.52,0.07l1.35,-0.72l0.2,-0.69l-0.26,-0.64l-1.58,-1.11l-2.4,-0.26l-0.91,-0.46l-0.85,-1.67l-0.89,-0.72l0.22,-0.98l-0.48,-0.28l-0.53,0.15l-1.38,-2.51l-0.44,-0.3l-0.64,0.07l-0.44,-0.61l0.22,-0.89l-0.7,-0.65l-1.21,-0.6l-1.06,-0.08l-0.75,-0.54l-0.57,0.18l-2.8,-0.59l-0.5,0.64l0.25,-0.91l-0.46,-0.42l-0.87,0.12l-0.26,-0.72l-0.88,-0.65l-0.61,-1.41l-0.55,-0.11l-0.72,-2.94l-0.77,-1.0l-0.16,-1.52l-0.44,-0.83l-0.71,-0.89l-0.49,-0.15l-0.12,0.93l-1.29,-0.26l1.06,-1.3l0.3,-0.75l-0.12,-0.63l0.86,-1.46l0.65,-0.34l0.28,-0.83l-0.61,-0.38l-1.42,0.93l-0.89,1.29l-0.42,2.17l-1.37,0.35l-0.21,-1.33l-0.79,-1.33l-0.27,-4.04l-0.86,-0.6l1.63,-1.33l0.22,-0.97l-0.58,-0.42l-3.06,1.92l-0.75,-0.66l-0.4,0.26l-1.27,-0.89l-0.37,0.74l1.13,1.09l0.52,0.1l1.26,2.0l-1.04,0.23l-1.42,-0.38l-0.84,-1.6l-1.13,-0.6l-1.94,-2.55l-1.04,-2.28l-1.28,-0.87l0.1,-0.87l-0.97,-1.8l-1.77,-0.98l0.09,-0.67l0.99,-0.41l-0.35,-0.49l0.44,-0.73l-0.39,-0.35l0.4,-1.21l2.47,-4.47l-1.05,-2.41l-0.68,-0.46l-0.92,0.42l-0.28,0.93l0.29,1.2l-0.24,0.03l-0.73,-2.44l-0.99,-0.28l-1.19,-0.87l-1.52,-0.31l0.29,1.95l-0.48,0.61l0.27,0.59l2.21,0.56l0.25,0.97l-0.37,2.46l-0.31,-0.58l-0.8,-0.22l-2.13,-1.53l-0.41,0.2l-0.29,-0.63l0.59,-2.11l0.07,-2.97l-0.66,-1.97l0.42,-0.51l0.48,-1.91l-0.24,-0.54l0.66,-3.04l-0.35,-5.26l-0.71,-1.7l0.35,-0.47l-0.47,-2.18l-2.1,-1.33l-0.05,-0.52l-0.55,-0.43l-0.1,-1.01l-0.92,-0.73l-0.55,-1.51l-0.64,-0.25l-1.44,0.32l-1.03,-0.2l-1.57,0.54l-1.14,-1.74l-1.51,-0.48l-0.19,-0.6l-1.35,-1.51l-0.87,-0.59l-0.62,0.07l-1.52,-1.16l-0.8,-0.21l-0.51,-2.75l-3.06,-1.13l-0.65,-0.59l-0.52,-1.23l-2.15,-1.93l-2.19,-1.09l-1.45,-0.12l-3.44,-1.68l-2.85,0.98l-1.0,-0.4l-1.05,0.42l-0.35,0.68l-1.33,0.68l-0.5,0.7l0.03,0.64l-0.73,-0.22l-0.59,0.6l0.67,0.94l1.51,0.08l0.41,0.21l-3.03,0.23l-1.58,1.51l-0.91,0.45l-1.3,1.56l-1.56,1.03l-0.32,0.13l0.2,-0.48l-0.26,-0.54l-0.66,-0.04l-0.96,0.75l-1.12,1.5l-2.2,0.23l-2.11,1.06l-0.78,0.03l-0.27,-2.03l-1.71,-2.23l-2.21,-1.0l-0.18,-0.41l-2.51,-1.5l2.79,1.33l1.21,-0.74l0.0,-0.74l-1.32,-0.34l-0.36,0.55l-0.21,-1.01l-0.34,-0.1l0.13,-0.52l-0.49,-0.33l-1.39,0.61l-2.3,-0.76l0.65,-1.08l0.83,-0.1l1.03,-1.45l-0.91,-0.95l-0.46,0.12l-0.49,1.02l-0.44,-0.04l-0.81,0.56l-0.72,-0.9l-0.7,0.09l-0.17,0.38l-1.34,0.73l-0.14,0.68l0.29,0.46l-3.95,-1.35l-5.05,-0.71l0.12,-0.24l1.27,0.29l0.61,-0.53l2.1,0.39l0.23,-0.78l-0.94,-1.02l0.09,-0.7l-0.63,-0.28l-0.5,0.32l-0.28,-0.47l-1.9,0.19l-2.25,1.1l0.3,-0.63l-0.41,-0.58l-0.96,0.35l-0.58,-0.25l-0.23,0.44l0.2,0.71l-1.45,0.8l-0.4,0.63l-5.18,0.97l0.32,-0.52l-0.4,-0.52l-1.35,-0.28l-0.72,-0.53l0.69,-0.53l0.01,-0.78l-0.68,-0.13l-0.81,-0.66l-0.46,0.11l0.14,0.76l-0.42,1.77l-1.05,-1.39l-0.69,-0.45l-0.55,0.07l-0.3,0.71l0.82,1.77l-0.25,0.79l-1.39,0.99l-0.05,1.04l-0.6,0.22l-0.17,0.57l-1.48,0.56l0.28,-0.65l-0.21,-0.46l1.14,-1.03l0.07,-0.74l-0.4,-0.58l-1.19,-0.24l-0.41,-0.84l0.3,-1.7l-0.18,-1.61l-2.17,-1.12l-2.39,-2.46l0.32,-1.44l-0.15,-1.04ZM767.29,490.44l0.48,1.07l0.9,0.39l0.78,-0.15l1.41,1.67l0.91,0.58l1.86,0.69l1.61,0.07l0.55,-0.44l-0.08,-0.87l0.55,-0.65l-0.16,-1.21l0.76,-1.36l0.09,-1.81l-0.64,-1.62l-1.46,-2.01l-1.74,-1.32l-1.19,-0.13l-1.12,0.83l-1.83,3.16l-2.12,1.94l-0.13,0.77l0.57,0.41ZM644.36,434.13l-0.94,0.26l0.41,-0.44l0.53,0.18ZM665.13,435.7l0.98,-0.28l0.35,0.32l0.09,0.72l-1.42,-0.75ZM770.56,455.01l0.42,0.56l-0.43,0.75l0.0,-1.31ZM788.88,525.23l0.01,-0.07l0.01,0.03l-0.03,0.04ZM789.47,522.87l-0.22,-0.23l0.49,-0.32l-0.27,0.55ZM768.83,453.61l0.21,0.76l-0.31,2.33l0.28,1.79l-1.38,-3.23l1.19,-1.65ZM679.81,445.61l0.22,-0.2l0.36,0.02l-0.11,0.42l-0.47,-0.25Z", "name": "Florida"}, "US-WA": {"path": "M38.52,55.26l0.46,-1.32l0.18,0.45l0.65,0.3l1.04,-0.74l0.43,0.59l0.7,-0.03l0.17,-0.77l-0.92,-1.56l0.79,-0.74l-0.09,-1.36l0.49,-0.39l-0.1,-1.03l0.81,-0.27l0.05,0.5l0.48,0.41l0.95,-0.31l-0.09,-0.68l-1.35,-1.65l-0.9,0.15l-1.88,-0.56l0.17,-1.98l0.66,0.53l0.52,-0.07l0.29,-0.56l-0.16,-0.67l3.3,-0.52l0.26,-0.69l-1.7,-0.96l-0.86,-0.14l-0.37,-1.51l-0.7,-0.42l-0.81,-0.02l0.32,-4.73l-0.49,-1.28l0.1,-0.69l-0.4,-0.34l0.76,-5.74l-0.13,-2.46l-0.45,-0.62l-0.16,-1.36l-0.65,-1.33l-0.73,-0.57l-0.32,-2.45l0.35,-2.27l-0.15,-1.11l1.74,-3.3l-0.52,-1.23l4.59,3.9l1.19,0.38l0.92,0.75l0.81,1.3l1.86,1.08l3.24,0.91l0.84,0.77l1.42,0.11l1.73,1.02l2.33,0.73l1.46,-0.47l0.52,0.29l0.55,0.69l-0.03,1.09l0.55,0.74l0.31,0.11l0.49,-0.35l0.07,-0.75l0.45,0.03l0.63,1.39l-0.4,0.58l0.34,0.49l0.56,-0.04l0.72,-0.84l-0.38,-1.7l1.03,-0.24l-0.44,0.23l-0.21,0.69l1.27,4.41l-0.46,0.1l-1.67,1.73l0.22,-1.29l-0.22,-0.41l-1.31,0.31l-0.38,0.81l0.09,0.95l-1.37,1.7l-1.98,1.38l-1.06,1.41l-0.96,0.69l-1.1,1.67l-0.06,0.71l0.62,0.6l0.96,0.12l2.77,-0.48l1.22,-0.58l-0.03,-0.7l-0.64,-0.23l-2.94,0.79l-0.35,-0.3l3.23,-3.42l3.06,-0.88l0.89,-1.51l1.73,-1.54l0.53,0.57l0.54,-0.19l0.22,-1.81l-0.06,2.25l0.26,0.91l-0.99,-0.21l-0.64,0.77l-0.41,-0.73l-0.52,-0.19l-0.39,0.64l0.3,0.71l0.02,1.63l-0.21,-1.07l-0.67,-0.21l-0.47,0.69l-0.07,0.75l0.46,0.66l-0.63,0.58l-0.0,0.45l0.42,0.17l1.68,-0.57l0.25,1.09l-1.08,1.79l-0.08,1.05l-0.83,0.7l0.13,1.0l-0.85,-0.68l1.12,-1.44l-0.23,-0.96l-1.96,1.08l-0.38,0.64l-0.05,-2.11l-0.52,0.02l-1.03,1.59l-1.26,0.53l-1.14,1.87l-1.51,0.3l-0.46,0.43l-0.21,1.18l1.11,-0.03l-0.25,0.36l0.27,0.37l0.93,0.02l0.06,0.68l0.53,0.47l0.52,-0.27l0.35,-1.76l0.14,0.42l0.83,-0.15l1.11,1.48l1.31,-0.61l1.65,-1.48l0.98,-1.56l0.63,0.78l0.73,0.14l0.44,-0.23l-0.06,-0.86l1.56,-0.55l0.35,-0.94l-0.33,-1.27l0.22,-1.19l-0.18,-1.36l0.83,0.2l0.3,-0.92l-0.19,-0.75l-0.72,-0.63l0.89,-1.13l0.07,-1.75l1.24,-1.24l0.61,-1.37l1.61,-0.49l0.78,-1.16l-0.45,-0.66l-0.51,-0.02l-0.86,-1.3l0.16,-2.09l-0.26,-0.87l0.49,-0.79l0.06,-0.84l-1.15,-1.73l-0.63,-0.4l-0.17,-0.64l0.18,-0.5l0.59,0.23l0.53,-0.33l0.24,-1.8l0.79,-0.24l0.3,-1.0l-0.61,-2.32l0.44,-0.53l-0.03,-0.86l-0.96,-0.88l-0.95,0.3l-1.09,-2.66l0.93,-1.83l41.31,9.4l38.96,7.65l-9.66,54.39l-0.47,1.02l1.04,3.0l0.13,2.0l-1.0,1.3l0.73,1.88l-31.18,-5.92l-1.67,0.79l-7.24,-1.02l-1.68,0.92l-4.19,-0.12l-3.18,0.45l-1.64,0.75l-0.88,-0.26l-1.2,0.3l-1.51,-0.23l-2.43,-0.94l-0.91,0.46l-3.45,0.51l-2.11,-0.71l-1.65,0.3l-0.31,-1.36l-1.09,-0.88l-4.34,-1.46l-2.32,-0.11l-1.15,-0.51l-1.27,0.21l-1.89,0.86l-4.5,0.58l-1.11,-0.71l-1.15,-0.3l-1.61,-1.15l-1.84,-0.51l-0.63,-0.81l0.64,-6.82l-0.47,-0.95l-0.22,-1.9l-0.98,-1.35l-1.96,-1.67l-2.82,-0.11l-1.03,-1.31l-0.15,-1.05l-0.56,-0.63l-2.36,-0.31l-0.56,-0.3l-0.24,-0.79l-0.5,-0.18l-0.97,0.35l-0.84,-0.26l-1.1,0.4l-0.97,-1.47l-0.89,-0.22ZM61.85,39.78l0.16,0.74l-0.42,0.49l0.0,-0.91l0.26,-0.31ZM71.27,20.38l-0.61,0.87l-0.15,0.52l0.11,-1.01l0.65,-0.38ZM71.14,15.62l-0.09,-0.05l0.05,-0.04l0.04,0.1ZM70.37,15.48l-0.77,0.39l0.37,-0.68l-0.07,-0.6l0.22,-0.07l0.25,0.97ZM57.56,42.45l0.05,-0.02l-0.01,0.01l-0.04,0.02ZM67.75,19.23l1.73,-2.1l0.47,-0.02l0.53,1.71l-0.35,-0.55l-0.51,-0.12l-0.55,0.44l-0.35,-0.09l-0.35,0.73l-0.63,-0.01ZM67.87,20.4l0.44,0.0l0.61,0.5l0.08,0.35l-0.79,-0.2l-0.33,-0.65ZM68.84,23.16l-0.1,0.51l-0.0,0.0l-0.02,-0.24l0.12,-0.28ZM69.15,25.42l0.08,0.04l0.12,-0.04l-0.16,0.11l-0.05,-0.1ZM69.52,25.33l0.48,-0.93l1.02,1.21l0.11,1.12l-0.34,0.36l-0.34,-0.09l-0.27,-1.55l-0.67,-0.12ZM66.34,9.97l0.48,-0.34l0.18,1.51l-0.22,-0.05l-0.44,-1.12ZM68.04,9.66l0.83,0.8l-0.65,0.31l-0.18,-1.11ZM66.69,38.03l0.34,-1.07l0.21,-0.25l-0.03,1.07l-0.52,0.26ZM66.99,33.31l0.1,-1.04l0.35,-0.34l-0.23,1.56l-0.22,-0.18ZM66.51,14.27l-0.41,-0.4l0.6,-0.75l-0.18,0.61l-0.01,0.55ZM66.68,14.62l0.4,0.2l-0.08,0.12l-0.29,-0.12l-0.03,-0.2ZM66.74,12.96l-0.01,-0.1l0.05,-0.12l-0.04,0.23ZM64.36,13.12l-1.06,-0.82l0.19,-1.81l1.33,1.92l-0.35,0.18l-0.11,0.54ZM62.18,42.55l0.23,-0.25l0.02,0.01l-0.13,0.31l-0.12,-0.07ZM60.04,40.3l-0.09,-0.19l0.04,-0.07l0.0,0.13l0.05,0.14Z", "name": "Washington"}, "US-KS": {"path": "M477.9,239.67l0.44,0.63l0.76,0.18l1.04,0.8l2.19,-1.08l-0.0,0.75l1.08,0.79l0.23,1.44l-0.95,-0.15l-0.6,0.31l-0.17,0.97l-1.14,1.37l-0.06,1.14l-0.79,0.5l0.04,0.64l1.56,2.1l2.0,1.49l0.2,1.13l0.42,0.86l0.74,0.56l0.32,1.11l1.89,0.91l1.54,0.26l2.67,46.82l-31.55,1.48l-31.97,0.88l-31.98,0.26l-32.05,-0.37l1.21,-65.47l27.9,0.35l27.86,-0.14l27.85,-0.64l27.68,-1.12l1.65,1.23Z", "name": "Kansas"}, "US-WI": {"path": "M598.7,107.43l0.83,-0.15l-0.13,0.81l-0.56,0.01l-0.14,-0.68ZM594.22,116.05l0.47,-0.41l0.26,-2.36l0.95,-0.25l0.64,-0.69l0.22,-1.4l0.41,-0.63l0.63,-0.03l0.06,0.38l-0.76,0.06l-0.18,0.51l0.17,1.27l-0.38,0.17l-0.11,0.58l0.56,0.57l-0.24,0.65l-0.5,0.33l-0.69,1.91l0.07,1.23l-1.05,2.28l-0.41,0.15l-0.86,-0.97l-0.19,-0.72l0.31,-1.57l0.62,-1.05ZM510.06,124.08l0.41,-0.27l0.28,-0.9l-0.45,-1.48l0.04,-1.91l0.7,-1.16l0.53,-2.25l-1.61,-2.91l-0.83,-0.36l-1.28,-0.01l-0.21,-2.31l1.67,-2.26l-0.05,-0.77l0.77,-1.55l1.95,-1.09l0.48,-0.75l0.97,-0.25l0.45,-0.75l1.16,-0.14l1.04,-1.56l-0.97,-12.11l1.03,-0.35l0.22,-1.1l0.73,-0.97l0.78,0.69l1.68,0.64l2.61,-0.56l3.28,-1.57l2.65,-0.82l2.21,-2.12l0.31,0.29l1.39,-0.11l1.25,-1.48l0.79,-0.58l1.04,-0.1l0.4,-0.52l1.07,0.99l-0.48,1.68l-0.67,1.01l0.23,1.61l-1.21,2.21l0.64,0.66l2.5,-1.09l0.72,-0.86l2.16,1.22l2.34,0.47l0.44,0.54l0.86,-0.13l1.6,0.7l2.23,3.54l15.48,2.52l4.65,1.96l1.68,-0.17l1.63,0.42l1.33,-0.59l3.17,0.71l2.18,0.09l0.85,0.41l0.56,0.89l-0.42,1.09l0.41,0.77l3.4,0.63l1.41,1.13l-0.16,0.71l0.59,1.11l-0.36,0.81l0.43,1.25l-0.78,1.25l-0.03,1.76l0.91,0.63l1.38,-0.26l1.02,-0.72l0.2,0.26l-0.79,2.44l0.04,1.31l1.32,1.46l0.84,0.35l-0.24,2.02l-2.42,1.2l-0.51,0.79l0.04,1.26l-1.61,3.49l-0.4,3.5l1.11,0.82l0.92,-0.04l0.5,-0.36l0.49,-1.37l1.82,-1.47l0.66,-2.53l1.06,-1.7l0.14,0.25l0.45,-0.07l0.57,-0.7l0.88,-0.4l1.12,1.12l0.59,0.19l-0.29,2.21l-1.18,2.82l-0.56,5.58l0.23,1.11l0.8,0.93l0.07,0.52l-0.51,0.98l-1.3,1.34l-0.86,3.89l0.15,2.57l0.72,1.2l0.06,1.24l-1.07,3.22l0.12,2.12l-0.73,2.11l-0.28,2.47l0.59,2.02l-0.04,1.32l0.49,0.54l-0.21,1.7l0.92,0.78l0.54,2.43l1.2,1.54l0.08,1.69l-0.33,1.45l0.47,2.95l-44.2,4.6l-0.19,-0.79l-1.56,-2.19l-4.94,-0.84l-1.06,-1.35l-0.36,-1.69l-0.9,-1.21l-0.86,-4.9l1.04,-2.62l-0.09,-0.99l-0.71,-0.79l-1.44,-0.48l-0.71,-1.76l-0.47,-6.02l-0.7,-1.4l-0.52,-2.56l-1.15,-0.6l-1.1,-1.56l-0.93,-0.11l-1.17,-0.75l-1.71,0.09l-2.67,-1.79l-2.3,-3.5l-2.64,-2.1l-2.94,-0.53l-0.73,-1.24l-1.12,-1.0l-3.12,-0.45l-3.53,-2.74l0.45,-1.24l-0.12,-1.61l0.25,-0.81l-0.88,-3.11ZM541.58,78.25l0.05,-0.28l0.03,0.16l-0.08,0.12ZM537.91,83.72l0.28,-0.21l0.05,0.08l-0.33,0.12Z", "name": "Wisconsin"}, "US-OR": {"path": "M10.69,140.12l0.01,-1.77l0.5,-0.84l0.32,-1.95l1.12,-1.91l0.24,-1.9l-0.72,-2.57l-0.33,-0.15l-0.12,-1.81l3.04,-3.82l2.5,-5.98l0.01,0.77l0.52,0.52l0.49,-0.28l0.6,-1.6l0.47,-0.48l0.31,0.98l1.12,0.41l0.33,-0.54l-0.45,-1.76l0.27,-0.87l-0.45,-0.14l-0.79,0.32l1.74,-3.16l1.13,-0.96l0.89,0.3l0.49,-0.29l-0.47,-1.08l-0.81,-0.4l1.77,-4.63l0.47,-0.57l0.02,-0.99l1.08,-2.67l0.62,-2.6l1.04,-1.92l0.33,0.28l0.66,-0.33l-0.04,-0.6l-0.76,-0.62l1.06,-2.6l0.32,0.22l0.59,-0.19l0.13,-0.35l-0.04,-0.51l-0.57,-0.32l0.85,-3.84l1.23,-1.8l0.83,-3.04l1.14,-1.76l0.83,-2.45l0.26,-1.21l-0.18,-0.5l1.19,-1.08l-0.32,-1.64l0.96,0.57l0.78,-0.63l-0.39,-0.75l0.2,-0.65l-0.77,-0.77l0.51,-1.07l1.3,-0.86l0.06,-0.46l-0.93,-0.34l-0.33,-1.25l0.97,-2.14l-0.04,-1.48l0.86,-0.53l0.58,-1.33l0.18,-1.96l-0.21,-1.45l0.83,1.17l0.6,0.18l-0.11,0.89l0.55,0.53l0.83,-0.96l-0.27,-0.99l0.21,-0.07l0.24,0.56l0.69,0.32l1.51,0.04l0.37,-0.36l1.37,-0.19l0.99,2.08l2.43,0.92l1.25,-0.64l0.78,0.04l1.72,1.51l0.77,1.04l0.21,1.9l0.43,0.78l-0.03,2.05l-0.39,1.24l0.19,0.93l-0.43,1.74l0.26,1.45l0.79,0.85l1.94,0.56l1.44,1.05l1.36,0.41l1.04,0.69l4.98,-0.53l2.9,-1.06l1.14,0.51l2.23,0.09l4.24,1.43l0.69,0.54l0.19,1.15l0.57,0.58l1.86,-0.27l2.11,0.71l3.79,-0.55l0.69,-0.42l2.19,0.93l1.64,0.24l1.2,-0.3l0.88,0.26l1.89,-0.78l3.07,-0.43l4.16,0.13l1.61,-0.91l7.17,1.02l0.96,-0.19l0.79,-0.58l31.27,5.93l0.23,1.81l0.93,1.82l1.16,0.63l1.96,1.86l0.57,2.45l-0.16,1.0l-3.69,4.55l-0.4,1.41l-1.39,2.63l-2.21,2.42l-0.65,2.68l-1.49,1.84l-2.23,1.5l-1.92,3.35l-1.49,1.27l-0.62,2.02l-0.12,1.87l0.28,0.92l0.56,0.61l0.54,0.04l0.39,-0.35l0.63,0.76l0.89,-0.05l0.07,0.88l0.81,0.95l-0.46,1.0l-0.65,0.06l-0.33,0.4l0.21,1.8l-1.03,2.56l-1.22,1.41l-6.86,39.16l-26.21,-4.99l-28.9,-6.05l-28.8,-6.61l-28.95,-7.24l-1.48,-2.59l0.2,-2.36l-0.23,-0.89Z", "name": "Oregon"}, "US-KY": {"path": "M583.02,306.59l0.35,-2.18l1.13,0.96l0.72,0.2l0.75,-0.36l0.46,-0.88l0.87,-3.55l-0.54,-1.75l0.38,-0.86l-0.1,-1.88l-1.27,-2.04l1.79,-3.21l1.24,-0.51l0.73,0.06l7.03,2.56l0.81,-0.2l0.65,-0.72l0.24,-1.93l-1.49,-2.14l-0.24,-1.44l0.2,-0.87l0.4,-0.52l1.1,-0.18l1.24,-0.83l3.0,-0.95l0.64,-0.51l0.15,-1.13l-1.53,-2.05l-0.08,-0.68l1.33,-1.97l0.14,-1.16l1.25,0.42l1.12,-1.33l-0.68,-2.0l1.92,0.9l1.72,-0.84l0.03,1.18l1.0,0.46l0.99,-0.94l0.02,-1.36l0.51,0.16l1.9,-0.96l4.41,1.52l0.64,0.94l0.86,0.18l0.59,-0.59l0.73,-2.53l1.38,-0.55l1.39,-1.34l0.86,1.29l0.77,0.42l1.16,-0.13l0.11,0.75l0.95,0.19l0.67,-0.62l0.03,-1.01l0.84,-0.38l0.26,-0.48l-0.25,-2.09l0.84,-0.4l0.34,-0.56l-0.06,-0.69l1.25,-0.56l0.34,-0.72l0.38,1.47l0.61,0.6l1.46,0.64l1.25,-0.0l1.11,0.81l0.53,-0.11l0.26,-0.55l1.1,-0.46l0.53,-0.69l0.04,-3.48l0.85,-2.18l1.02,0.18l1.55,-1.19l0.75,-3.46l1.04,-0.37l1.65,-2.23l0.0,-0.81l-1.18,-2.88l2.78,-0.59l1.54,0.81l3.85,-2.82l2.23,-0.46l-0.18,-1.07l0.36,-1.47l-0.32,-0.36l-1.22,-0.04l0.58,-1.39l-1.09,-1.54l1.65,-1.83l1.81,1.18l0.92,-0.11l1.93,-1.01l0.78,0.88l1.76,0.54l0.57,1.28l0.94,0.92l0.79,1.84l2.6,0.67l1.87,-0.57l1.63,0.27l2.18,1.85l0.96,0.43l1.28,-0.18l0.61,-1.31l0.99,-0.54l1.35,0.5l1.34,0.04l1.33,1.09l1.26,-0.69l1.41,-0.15l1.81,-2.55l1.72,-1.03l0.92,2.35l0.7,0.83l2.45,0.81l1.35,0.97l0.75,1.05l0.93,3.35l-0.37,0.45l0.09,0.72l-0.44,0.61l0.02,0.53l2.24,2.62l1.35,0.92l-0.08,0.89l1.34,0.97l0.58,1.36l1.55,1.2l0.98,1.62l2.14,0.84l1.09,1.12l2.14,0.25l-4.86,6.13l-5.06,4.16l-0.42,0.86l0.22,1.25l-2.07,1.93l0.04,1.64l-3.06,1.63l-0.8,2.38l-1.71,0.6l-2.7,1.83l-1.66,0.48l-3.39,2.42l-23.95,3.09l-8.8,1.42l-7.47,0.86l-7.68,0.46l-22.71,3.52l-0.64,-0.56l-3.63,0.09l-0.41,0.6l1.03,3.57l-23.0,2.73ZM580.9,306.78l-0.59,0.08l-0.06,-0.55l0.47,-0.01l0.18,0.49Z", "name": "Kentucky"}, "US-CO": {"path": "M364.18,239.57l-1.22,65.87l-29.29,-0.9l-29.38,-1.43l-29.35,-1.95l-32.17,-2.75l8.33,-87.15l27.79,2.4l28.23,1.92l29.58,1.46l27.95,0.87l-0.46,21.66Z", "name": "Colorado"}, "US-OH": {"path": "M664.99,178.81l1.67,0.47l1.04,-0.3l1.74,1.07l2.07,0.26l1.47,1.18l1.71,0.23l-2.19,1.18l-0.12,0.47l0.42,0.24l2.46,0.19l1.39,-1.1l1.77,-0.25l3.39,0.96l0.92,-0.08l1.48,-1.29l1.74,-0.6l1.15,-0.96l1.91,-0.97l2.62,-0.03l1.09,-0.62l1.24,-0.06l1.07,-0.8l4.24,-5.46l4.53,-3.47l6.92,-4.36l5.83,28.05l-0.51,0.54l-1.28,0.43l-0.41,0.95l1.65,2.24l0.02,2.11l0.41,0.26l0.31,0.94l-0.04,0.76l-0.54,0.83l-0.5,4.08l0.18,3.21l-0.58,0.41l0.34,1.11l-0.35,1.74l-0.39,0.54l0.76,1.23l-0.25,1.87l-2.41,2.65l-0.82,1.86l-1.37,1.5l-1.24,0.67l-0.6,0.7l-0.87,-0.92l-1.18,0.14l-1.32,1.74l-0.09,1.32l-1.78,0.85l-0.78,2.25l0.28,1.58l-0.94,0.85l0.3,0.67l0.63,0.41l0.27,1.3l-0.8,0.17l-0.5,1.6l0.06,-0.93l-0.91,-1.26l-1.53,-0.55l-1.07,0.71l-0.82,1.98l-0.34,2.69l-0.53,0.82l1.22,3.58l-1.27,0.39l-0.28,0.42l-0.25,3.12l-2.66,1.2l-1.0,0.05l-0.76,-1.06l-1.51,-1.1l-2.34,-0.73l-1.17,-1.92l-0.31,-1.14l-0.42,-0.33l-0.73,0.13l-1.84,1.17l-1.1,1.29l-0.4,1.05l-1.43,0.15l-0.87,0.61l-1.11,-1.0l-3.14,-0.59l-1.37,0.72l-0.53,1.25l-0.71,0.05l-3.04,-2.26l-1.93,-0.29l-1.77,0.56l-2.14,-0.52l-0.55,-1.54l-0.96,-0.97l-0.63,-1.38l-2.03,-0.76l-1.14,-1.01l-0.97,0.26l-1.31,0.89l-0.46,0.03l-1.79,-1.23l-0.61,0.2l-0.6,0.71l-8.53,-55.69l20.43,-4.26ZM675.61,181.34l0.53,-0.79l0.67,0.41l-0.48,0.35l-0.72,0.03ZM677.31,180.77l0.01,-0.0l0.01,-0.0l-0.02,0.0Z", "name": "Ohio"}, "US-OK": {"path": "M399.06,359.31l-0.05,-42.03l-0.39,-0.4l-26.69,-0.22l-25.13,-0.6l0.31,-10.23l36.7,0.74l36.0,-0.07l35.99,-0.86l35.56,-1.62l0.6,10.68l4.55,24.34l1.41,37.88l-1.2,-0.22l-0.29,-0.36l-2.13,-0.21l-0.82,-0.79l-2.11,-0.39l-1.77,-2.05l-1.23,-0.22l-2.25,-1.57l-1.5,-0.4l-0.8,0.46l-0.23,0.88l-0.82,0.24l-0.46,0.62l-2.47,-0.14l-0.47,-0.19l-0.27,-0.68l-1.05,-0.61l-2.3,1.29l-1.17,0.2l-0.19,0.56l-0.63,0.28l-2.12,-0.77l-1.7,1.18l-1.17,0.08l-0.89,0.42l-0.83,1.37l-1.48,0.06l-0.57,1.25l-1.26,-1.55l-1.7,-0.1l-0.32,-0.58l-1.21,-0.46l-0.02,-0.96l-0.44,-0.5l-1.24,-0.18l-0.73,1.38l-0.66,0.11l-0.84,-0.5l-0.97,0.07l-0.71,-1.51l-1.09,-0.35l-1.17,0.57l-0.45,1.7l-0.7,-0.08l-0.49,0.43l0.29,0.73l-0.51,1.68l-0.43,0.19l-0.55,-0.55l-0.3,-0.91l0.39,-1.65l-0.75,-0.86l-0.8,0.18l-0.49,0.76l-0.84,-0.18l-0.92,0.98l-1.07,0.13l-0.53,-1.36l-1.99,-0.19l-0.3,-1.48l-1.19,-0.53l-0.82,0.33l-2.12,2.15l-1.21,0.51l-0.97,-0.38l0.19,-1.25l-0.28,-1.13l-2.33,-0.68l-0.07,-2.18l-0.43,-0.55l-2.11,0.39l-2.52,-0.25l-0.64,0.26l-0.81,1.21l-0.95,0.06l-1.77,-1.77l-0.97,-0.12l-1.5,0.56l-2.68,-0.63l-1.86,-1.0l-1.05,0.25l-2.46,-0.3l-0.17,-2.12l-0.85,-0.87l-0.44,-1.02l-1.16,-0.41l-0.7,-0.83l-0.83,0.08l-0.44,1.64l-2.22,-0.68l-1.07,0.6l-0.96,-0.09l-3.79,-3.78l-1.12,-0.43l-0.8,0.08Z", "name": "Oklahoma"}, "US-WV": {"path": "M693.03,248.42l3.95,-1.54l0.35,-0.71l0.12,-2.77l1.15,-0.22l0.4,-0.61l-0.57,-2.49l-0.61,-1.24l0.49,-0.64l0.36,-2.77l0.68,-1.66l0.45,-0.39l1.24,0.55l0.41,0.71l-0.14,1.13l0.71,0.46l0.78,-0.44l0.48,-1.42l0.49,0.21l0.57,-0.2l0.2,-0.44l-0.63,-2.09l-0.75,-0.55l0.81,-0.79l-0.26,-1.71l0.74,-2.0l1.65,-0.51l0.17,-1.6l1.02,-1.42l0.43,-0.08l0.65,0.79l0.67,0.19l2.28,-1.59l1.5,-1.64l0.79,-1.83l2.45,-2.67l0.37,-2.41l-0.73,-1.0l0.71,-2.33l-0.25,-0.76l0.59,-0.58l-0.27,-3.43l0.47,-3.93l0.53,-0.8l0.08,-1.11l-0.38,-1.21l-0.39,-0.33l-0.04,-2.01l-1.57,-1.91l0.44,-0.54l0.85,-0.1l0.3,-0.33l4.03,19.34l0.47,0.31l16.6,-3.55l2.17,10.68l0.5,0.37l2.06,-2.5l0.97,-0.56l0.34,-1.03l1.63,-1.99l0.25,-1.05l0.52,-0.4l1.19,0.45l0.74,-0.32l1.32,-2.6l0.6,-0.46l-0.04,-0.85l0.42,0.59l1.81,0.52l3.2,-0.57l0.78,-0.86l0.07,-1.46l2.0,-0.74l1.02,-1.69l0.67,-0.1l3.16,1.5l1.81,-0.71l-0.45,1.02l0.56,0.92l1.27,0.42l0.09,0.96l1.13,0.43l0.09,1.2l0.33,0.42l-0.58,3.64l-9.0,-4.48l-0.64,0.24l-0.31,1.14l0.38,1.61l-0.52,1.62l0.41,2.28l-1.36,2.4l-0.42,1.76l-0.72,0.53l-0.42,1.11l-0.27,0.21l-0.61,-0.23l-0.37,0.33l-1.25,3.28l-1.84,-0.78l-0.64,0.25l-0.94,2.77l0.08,1.47l-0.73,1.14l-0.19,2.33l-0.89,2.2l-3.25,-0.36l-1.44,-1.76l-1.71,-0.24l-0.5,0.41l-0.26,2.17l0.19,1.3l-0.32,1.45l-0.49,0.45l-0.31,1.04l0.23,0.92l-1.58,2.44l-0.04,2.1l-0.52,2.0l-2.58,4.73l-0.75,3.16l0.14,0.76l1.14,0.55l-1.08,1.38l0.06,0.6l0.45,0.4l-2.16,2.13l-0.55,-0.7l-0.84,0.15l-3.12,2.53l-1.03,-0.56l-1.32,0.26l-0.44,0.91l0.45,1.17l-0.91,0.91l-0.73,-0.05l-2.27,1.0l-1.21,0.96l-2.18,-1.36l-0.73,-0.01l-0.82,1.58l-1.1,0.49l-1.22,1.46l-1.08,0.08l-1.98,-1.09l-1.31,-0.01l-0.61,-0.74l-1.19,-0.6l-0.31,-1.33l-0.89,-0.55l0.36,-0.67l-0.3,-0.81l-0.85,-0.37l-0.84,0.25l-1.33,-0.17l-1.26,-1.19l-2.06,-0.79l-0.76,-1.43l-1.58,-1.24l-0.7,-1.49l-1.0,-0.6l-0.12,-1.09l-1.38,-0.95l-2.0,-2.27l0.71,-2.03l-0.25,-1.62l-0.66,-1.46Z", "name": "West Virginia"}, "US-WY": {"path": "M218.53,207.02l10.1,-86.6l25.46,2.74l26.8,2.4l26.83,1.91l27.85,1.46l-3.67,87.11l-27.32,-1.41l-28.21,-1.97l-29.69,-2.63l-28.14,-3.02Z", "name": "Wyoming"}, "US-UT": {"path": "M178.67,180.38l41.53,5.44l-2.51,21.5l0.35,0.45l32.24,3.43l-8.33,87.15l-42.54,-4.67l-42.41,-5.77l16.08,-108.34l5.58,0.82ZM187.74,191.46l-0.3,0.04l-0.25,0.62l0.74,3.68l-0.81,0.19l-0.5,1.31l1.15,0.59l0.35,-0.84l0.37,-0.18l0.92,1.14l0.83,1.68l-0.25,1.0l0.16,1.45l-0.4,0.77l0.4,0.52l-0.05,0.56l1.58,1.84l0.02,0.59l1.13,1.92l0.71,-0.1l0.83,-1.74l0.08,2.28l0.53,0.94l0.06,1.8l0.99,0.47l1.65,-0.67l2.48,-1.77l0.37,-1.25l3.32,-1.44l0.17,-0.54l-0.52,-1.02l-0.68,-0.84l-1.36,-0.7l-1.87,-4.59l-0.87,-0.46l0.87,-0.92l1.3,0.6l1.33,-0.15l0.92,-0.83l-0.06,-1.12l-1.55,-0.5l-0.81,0.42l-1.17,-0.12l0.27,-0.76l-0.58,-0.79l-1.86,-0.22l-0.56,1.13l0.28,0.78l-0.35,0.69l0.55,2.44l-0.91,0.32l-0.34,-0.42l0.22,-1.8l-0.42,-0.69l-0.06,-1.74l-0.68,-0.6l-1.32,-0.11l-1.07,-1.55l-0.19,-0.69l0.64,-0.55l0.36,-1.29l-0.83,-1.38l-1.23,-0.28l-0.99,0.81l-2.73,0.2l-0.35,0.63l0.62,0.83l-0.28,0.43ZM199.13,204.0l0.03,0.02l0.04,0.11l-0.07,-0.13ZM199.17,204.81l0.31,0.91l-0.18,0.9l-0.39,-0.93l0.25,-0.88Z", "name": "Utah"}, "US-IN": {"path": "M600.86,189.63l1.43,0.87l2.1,0.14l1.52,-0.38l2.63,-1.39l2.73,-2.1l32.3,-4.83l8.81,57.45l-0.66,1.15l0.3,0.92l0.81,0.79l-0.66,1.14l0.49,0.8l1.12,0.04l-0.36,1.14l0.18,0.51l-1.81,0.29l-3.18,2.55l-0.43,0.17l-1.4,-0.81l-3.46,0.91l-0.09,0.78l1.19,3.1l-1.4,1.88l-1.18,0.49l-0.45,0.89l-0.31,2.6l-1.11,0.88l-1.06,-0.24l-0.47,0.47l-0.85,1.95l0.05,3.14l-0.39,1.0l-1.38,0.85l-0.93,-0.68l-1.24,0.01l-1.48,-0.69l-0.62,-1.84l-1.89,-0.73l-0.44,0.3l-0.04,0.5l0.83,0.68l-0.62,0.31l-0.89,-0.35l-0.36,0.29l-0.04,0.48l0.54,0.93l-1.08,0.68l0.14,2.37l-1.06,0.65l-0.0,0.83l-0.16,0.37l0.08,-0.5l-0.33,-0.51l-1.6,0.18l-1.4,-1.69l-0.5,-0.08l-1.67,1.5l-1.57,0.69l-1.07,2.89l-0.81,-1.07l-2.79,-0.77l-1.11,-0.61l-1.08,-0.18l-1.76,0.92l-0.64,-1.02l-0.58,-0.18l-0.53,0.56l0.64,1.86l-0.34,0.84l-0.28,0.09l-0.02,-1.18l-0.42,-0.4l-0.58,0.01l-1.46,0.79l-1.41,-0.84l-0.85,0.0l-0.48,0.95l0.71,1.55l-0.49,0.74l-1.15,-0.39l-0.07,-0.54l-0.53,-0.44l0.55,-0.63l-0.35,-3.09l0.96,-0.78l-0.07,-0.58l-0.44,-0.23l0.69,-0.46l0.25,-0.61l-1.17,-1.47l0.46,-1.16l0.32,0.19l1.39,-0.55l0.33,-1.8l0.55,-0.4l0.44,-0.92l-0.06,-0.83l1.52,-1.07l0.06,-0.69l-0.41,-0.93l0.57,-0.86l0.14,-1.29l0.87,-0.51l0.4,-1.91l-1.08,-2.54l0.22,-0.8l-0.16,-1.11l-0.93,-0.91l-0.61,-1.5l-1.05,-0.78l-0.04,-0.59l0.92,-1.39l-0.63,-2.25l1.27,-1.31l-6.5,-50.68Z", "name": "Indiana"}, "US-IL": {"path": "M540.07,225.55l0.86,-0.35l0.37,-0.67l-0.23,-2.33l-0.73,-0.93l0.15,-0.41l0.72,-0.69l2.42,-0.98l0.71,-0.65l0.63,-1.68l0.17,-2.11l1.65,-2.47l0.27,-0.94l-0.03,-1.22l-0.59,-1.95l-2.23,-1.88l-0.11,-1.77l0.67,-2.38l0.45,-0.37l4.6,-0.85l0.81,-0.41l0.82,-1.12l2.55,-1.0l1.43,-1.56l-0.01,-1.57l0.4,-1.71l1.42,-1.46l0.29,-0.74l0.33,-4.37l-0.76,-2.14l-4.02,-2.47l-0.28,-1.5l-0.48,-0.82l-3.64,-2.48l44.58,-4.64l-0.01,2.66l0.57,2.59l1.37,2.49l1.31,0.95l0.76,2.6l1.26,2.71l1.42,1.84l6.6,51.49l-1.22,1.13l-0.1,0.69l0.67,1.76l-0.84,1.09l-0.03,1.11l1.19,1.09l0.56,1.41l0.89,0.82l-0.1,1.8l1.06,2.31l-0.28,1.49l-0.87,0.56l-0.21,1.47l-0.59,0.93l0.34,1.2l-1.48,1.13l-0.23,0.41l0.28,0.7l-0.93,1.17l-0.31,1.19l-1.64,0.67l-0.63,1.67l0.15,0.8l0.97,0.83l-1.27,1.15l0.42,0.76l-0.49,0.23l-0.13,0.54l0.43,2.94l-1.15,0.19l0.08,0.45l0.92,0.78l-0.48,0.17l-0.03,0.64l0.83,0.29l0.04,0.42l-1.31,1.97l-0.25,1.19l0.59,1.22l0.7,0.64l0.37,1.08l-3.31,1.22l-1.19,0.82l-1.24,0.24l-0.77,1.01l-0.18,2.04l0.3,0.88l1.4,1.93l0.07,0.54l-0.53,1.19l-0.96,0.03l-6.3,-2.43l-1.08,-0.08l-1.57,0.64l-0.68,0.72l-1.44,2.95l0.06,0.66l-1.18,-1.2l-0.79,0.14l-0.35,0.47l0.59,1.13l-1.24,-0.79l-0.01,-0.68l-1.6,-2.21l-0.4,-1.12l-0.76,-0.37l-0.05,-0.49l0.94,-1.35l0.2,-1.03l-0.32,-1.01l-1.44,-2.02l-0.47,-3.18l-2.26,-0.99l-1.55,-2.14l-1.95,-0.82l-1.72,-1.34l-1.56,-0.14l-1.82,-0.96l-2.32,-1.78l-2.34,-2.44l-0.36,-1.95l2.37,-6.85l-0.25,-2.32l0.98,-2.06l-0.38,-0.84l-2.66,-1.45l-2.59,-0.67l-1.29,0.45l-0.86,1.45l-0.46,0.28l-0.44,-0.13l-1.3,-1.9l-0.43,-1.52l0.16,-0.87l-0.54,-0.91l-0.29,-1.65l-0.83,-1.36l-0.94,-0.9l-4.11,-2.52l-1.01,-1.64l-4.53,-3.53l-0.73,-1.9l-1.04,-1.21l-0.04,-1.6l-0.96,-1.48l-0.75,-3.54l0.1,-2.94l0.6,-1.28ZM585.52,295.52l0.05,0.05l0.04,0.04l-0.05,-0.0l-0.04,-0.09Z", "name": "Illinois"}, "US-AK": {"path": "M89.36,517.03l0.84,0.08l0.09,0.36l-0.3,0.32l-0.64,0.3l-0.15,-0.15l0.25,-0.4l-0.12,-0.31l0.04,-0.2ZM91.79,517.2l0.42,-0.02l0.19,-0.11l0.26,-0.56l1.74,-0.37l2.26,0.07l1.57,0.63l0.84,0.69l0.02,1.85l0.32,0.18l0.0,0.34l0.25,0.27l-0.35,0.09l-0.25,-0.16l-0.23,0.08l-0.41,-0.33l-0.29,-0.04l-0.69,0.23l-0.91,-0.21l-0.07,-0.26l-0.24,-0.17l0.27,-0.21l0.74,0.72l0.46,-0.02l0.2,-0.48l-0.28,-0.44l-0.03,-0.3l-0.31,-0.67l-0.96,-0.52l-1.05,0.27l-0.57,0.69l-1.04,0.3l-0.44,-0.3l-0.48,0.12l-0.06,0.12l-0.63,-0.14l-0.26,0.06l-0.22,0.24l0.2,-0.3l-0.1,-0.55l0.12,-0.79ZM99.83,520.19l0.3,-0.07l0.29,-0.28l-0.03,-0.55l0.31,0.2l-0.06,0.45l0.83,0.92l-0.93,-0.51l-0.44,0.41l-0.13,-0.54l-0.13,-0.04ZM100.07,520.81l0.0,0.04l-0.03,0.0l0.02,-0.04ZM102.01,520.78l0.05,-0.34l0.33,-0.2l0.01,-0.12l-0.58,-1.24l0.1,-0.2l0.59,-0.24l0.29,-0.3l0.65,-0.34l0.62,-0.01l0.41,-0.13l0.81,0.1l1.42,-0.06l0.64,0.15l0.49,0.27l0.88,0.11l0.27,0.15l0.23,-0.22l0.27,-0.05l0.39,0.09l0.2,0.21l0.26,-0.05l0.2,0.38l0.44,0.31l0.1,0.23l0.7,-0.06l0.3,-0.77l0.44,-0.61l0.47,-0.21l1.78,-0.45l0.5,0.04l0.37,0.23l1.13,-0.38l0.66,0.04l-0.11,0.41l0.43,0.51l0.42,0.26l0.62,0.06l0.42,-0.43l0.14,-0.42l-0.34,-0.29l-0.31,-0.03l0.15,-0.44l-0.15,-0.38l1.04,-1.0l0.83,-0.99l0.12,-0.08l0.34,0.17l0.38,-0.02l0.32,0.3l0.19,0.37l0.66,-0.29l-0.1,-0.57l-0.43,-0.58l-0.46,-0.24l0.15,-0.44l0.77,-0.47l0.36,0.04l0.68,-0.2l0.8,-0.08l0.58,0.18l0.45,-0.16l-0.12,-0.52l0.66,-0.6l0.4,0.06l0.26,-0.11l0.43,-0.52l0.34,-0.12l0.23,-0.46l-0.42,-0.3l-0.38,0.03l-0.33,0.15l-0.36,0.39l-0.51,-0.09l-0.5,0.27l-2.19,-0.52l-1.69,-0.24l-0.71,-0.26l-0.12,-0.2l0.17,-0.32l0.04,-0.44l-0.28,-0.56l0.45,-0.35l0.43,-0.13l0.36,0.38l0.04,0.25l-0.15,0.44l0.07,0.39l0.56,0.12l0.32,-0.15l-0.03,-0.3l0.16,-0.35l-0.05,-0.75l-0.84,-1.05l0.01,-0.7l-0.67,-0.19l-0.19,0.24l-0.06,0.48l-0.41,0.22l-0.09,0.03l-0.26,-0.56l-0.34,-0.09l-0.51,0.41l-0.02,0.26l-0.15,0.15l-0.38,-0.02l-0.48,0.27l-0.24,0.54l-0.22,1.13l-0.13,0.32l-0.19,0.05l-0.31,-0.31l0.1,-2.67l-0.23,-0.99l0.19,-0.33l0.02,-0.27l-0.16,-0.29l-0.53,-0.27l-0.46,0.26l-0.1,-0.07l-0.35,0.13l-0.01,-0.54l-0.54,-0.61l0.19,-0.22l0.08,-0.65l-0.16,-0.37l-0.55,-0.26l-1.89,-0.01l-0.58,-0.34l-1.01,-0.12l-0.16,-0.12l-0.07,-0.22l-0.23,-0.07l-1.06,0.53l-0.75,-0.16l-0.12,-0.44l0.3,0.09l0.48,-0.08l0.31,-0.44l-0.21,-0.49l0.37,-0.49l0.83,0.04l0.43,-0.16l0.12,-0.35l-0.14,-0.42l-1.11,-0.64l0.09,-0.27l0.34,-0.17l0.38,-0.44l1.12,-0.0l0.23,-0.09l0.19,-0.32l0.03,-0.95l0.22,-0.54l0.07,-1.42l0.25,-0.45l-0.08,-0.58l0.07,-0.2l0.88,-0.74l0.02,-0.1l-0.09,-0.02l0.19,-0.16l-0.31,-0.35l-0.27,0.05l-0.04,-0.25l-0.09,-0.04l0.57,-0.22l0.33,-0.25l0.51,-0.1l0.24,-0.25l0.42,-0.0l0.19,0.18l0.41,0.08l0.29,-0.08l0.44,-0.55l-0.3,-0.34l-0.39,-0.07l-0.05,-0.33l-0.27,-0.31l-0.6,0.4l-0.43,-0.07l-1.12,0.62l-1.04,0.06l-0.34,0.18l-0.48,-0.03l-0.12,0.5l0.4,0.64l-0.26,0.19l-0.29,0.45l-0.19,-0.09l-0.17,-0.27l-0.76,-0.04l-1.16,-0.25l-0.81,-0.4l-1.05,-0.59l-0.78,-0.61l-0.52,-0.69l0.01,-0.21l0.6,-0.1l-0.06,-0.4l0.1,-0.24l-0.51,-1.06l0.1,-0.78l-0.18,-0.52l0.33,-0.54l-0.4,-0.34l-0.23,0.0l-0.44,-0.69l-0.01,-0.2l0.59,-0.14l0.3,-0.37l-0.05,-0.44l-0.36,-0.26l0.72,0.04l0.29,-0.13l0.18,-0.25l0.63,0.01l0.08,0.51l0.56,0.51l0.32,0.49l-0.03,0.09l-0.79,0.11l-0.53,0.51l0.31,0.45l0.94,-0.08l0.4,0.24l0.26,-0.01l0.39,-0.22l0.29,0.03l0.08,0.07l-0.51,0.6l-0.05,0.38l0.22,0.43l0.46,0.24l1.42,0.07l0.28,-0.17l0.16,-0.35l0.19,-0.08l-0.2,-0.74l0.35,-0.35l-0.02,-0.33l-0.18,-0.25l0.15,-0.43l-0.08,-0.13l-0.52,-0.26l-0.77,-0.01l-0.34,0.1l-1.51,-1.2l-0.01,-0.53l-0.35,-0.39l-0.26,-0.12l-0.15,-0.38l0.55,0.15l0.53,-0.4l-0.17,-0.41l-0.7,-0.51l0.4,-0.45l-0.14,-0.5l0.31,-0.15l0.27,0.08l0.44,-0.1l0.45,0.27l0.75,-0.04l0.67,-0.44l-0.08,-0.48l-0.18,-0.19l-0.48,-0.03l-0.51,0.16l-0.43,-0.19l-1.02,-0.02l-0.26,0.14l-0.44,0.04l-0.36,0.29l-0.62,0.09l-0.15,0.12l-0.15,0.42l-0.13,-0.19l0.27,-0.52l0.36,-0.24l-0.1,-0.44l-0.48,-0.6l0.03,-0.1l0.37,0.1l0.4,-0.18l0.16,-0.22l0.07,-0.36l-0.22,-0.6l0.55,0.23l0.42,-0.5l-0.44,-0.59l0.38,0.32l0.94,0.37l0.2,-0.44l0.14,0.01l-0.04,-0.54l0.12,-0.36l0.48,-0.28l0.49,0.01l1.96,-0.47l0.8,-0.03l0.3,0.25l-0.01,0.44l0.19,0.27l-0.27,0.16l0.13,0.47l0.35,0.15l0.74,0.01l0.29,-0.39l-0.13,-0.45l0.08,-0.34l1.21,-0.11l0.29,-0.63l-0.31,-0.24l-0.93,-0.04l0.03,-0.08l0.41,-0.03l0.15,-0.63l0.72,-0.27l0.86,0.88l0.32,0.11l0.38,-0.28l0.08,-0.27l-0.04,-0.41l-0.18,-0.26l0.34,0.0l0.69,0.32l0.35,0.31l0.54,0.81l-0.06,0.29l-0.38,-0.09l-0.52,0.21l-0.13,0.47l0.43,0.24l1.07,0.06l0.05,0.52l0.31,0.3l0.91,0.49l1.02,0.09l0.53,-0.18l0.41,0.17l0.49,-0.0l1.61,-0.32l0.1,0.49l1.67,0.97l0.28,0.31l0.53,0.32l1.06,0.37l1.81,-0.2l0.56,-0.21l0.47,-0.49l0.2,-0.57l0.15,-0.95l0.61,-1.1l0.01,-0.29l-0.24,-0.88l0.14,-0.05l-0.03,-0.19l0.58,0.25l0.2,-0.1l0.86,0.0l0.36,-0.17l0.41,-0.47l0.07,-0.93l-0.19,-0.43l0.22,-0.03l0.11,-0.44l-0.23,-0.32l-0.73,-0.39l-0.29,0.12l-0.43,-0.04l-0.52,0.2l-0.21,-0.12l-0.29,-0.6l-0.31,-0.29l-0.51,0.0l-0.02,0.1l-0.52,-0.04l-0.43,-0.31l-0.56,-0.02l-0.32,0.1l-1.04,-0.24l-0.48,0.03l-0.33,0.16l0.04,-0.42l-0.29,-0.71l-0.21,-0.97l-0.49,-0.23l-0.55,-0.08l-0.29,0.09l-0.47,-0.64l-0.48,-0.4l-0.5,-0.25l-1.14,-1.02l-0.95,-0.24l-0.2,-0.27l-0.49,-0.27l-0.11,-0.23l-0.63,-0.01l-0.04,0.13l-0.9,-1.22l-1.86,-2.14l-0.25,-0.55l-0.0,-0.32l0.07,-0.19l0.27,0.06l0.27,-0.13l0.35,-0.76l-0.41,-1.02l0.05,-0.11l0.4,0.19l0.51,-0.05l0.41,-0.17l0.51,0.66l0.43,0.23l0.48,-0.4l-0.02,-0.33l-0.32,-0.66l-0.48,-0.41l-0.46,-0.78l-0.84,-0.88l-0.12,-0.02l-0.98,-1.16l-0.33,-0.52l-0.04,-0.3l-0.46,-0.96l0.41,0.03l0.54,0.45l0.34,0.15l0.44,-0.1l0.12,-0.17l0.2,0.03l0.06,-0.15l0.18,0.03l0.17,0.41l0.2,0.18l1.09,0.35l1.08,-0.18l1.53,0.45l0.14,0.13l-0.06,0.06l0.19,0.45l0.88,0.89l1.03,0.47l0.56,-0.36l-0.06,-0.35l-0.37,-0.64l1.48,0.48l0.36,0.26l0.11,0.4l0.61,0.16l1.2,0.07l0.48,0.24l1.49,0.99l0.18,0.45l-0.34,0.04l-0.1,0.06l-0.4,0.34l-0.16,0.3l-0.6,-0.28l-0.52,-0.06l-0.12,0.69l0.62,0.52l0.02,0.52l0.16,0.37l0.28,0.32l0.91,0.59l0.18,0.29l0.46,0.4l0.69,0.3l0.39,0.29l-0.14,0.25l0.02,0.32l0.38,0.24l0.2,-0.05l0.26,0.12l0.44,0.49l0.56,0.16l0.39,0.46l-0.08,0.39l0.24,0.31l0.41,0.19l0.41,-0.15l0.03,-0.15l1.39,-0.46l0.24,0.52l0.24,0.25l-0.25,0.06l0.01,0.5l0.38,0.29l0.43,0.02l0.5,-0.24l0.36,-0.41l-0.05,-0.98l-0.45,-0.65l0.19,0.01l0.65,1.54l0.23,0.25l1.6,0.95l0.53,-0.01l0.29,-0.27l0.34,-0.59l-0.02,-0.44l0.3,-0.38l-0.16,-0.23l-0.72,-0.38l-0.44,-0.04l-0.49,-0.92l-0.89,-0.53l-0.42,-0.12l-0.61,0.21l-0.32,-0.28l-0.0,-0.43l-0.16,-0.19l-0.23,-0.71l0.64,-0.39l0.29,-0.02l0.35,0.29l0.32,0.05l0.37,-0.41l-0.0,-0.15l-0.75,-1.21l-1.13,-0.68l-0.06,-0.29l0.18,-0.28l-0.15,-0.48l-0.43,-0.23l-0.43,0.29l-0.42,0.07l-0.25,-0.44l-0.53,-0.4l-0.31,-0.1l-0.25,-0.41l-1.35,-1.4l0.59,-1.11l0.15,-1.07l-0.1,-1.05l-0.51,-1.13l-0.29,-1.11l-0.36,-0.48l-0.85,-2.25l-1.06,-1.45l-0.08,-0.73l-0.38,-0.89l0.17,-0.17l0.91,-0.32l1.04,-1.04l1.08,1.08l1.75,1.29l0.84,0.44l1.33,0.95l1.37,0.54l1.36,0.24l1.49,-0.09l0.3,0.11l0.42,-0.05l0.4,-0.16l0.23,-0.26l0.3,-0.14l0.42,-0.5l0.56,-0.03l0.17,-0.31l1.66,0.14l0.96,-0.29l0.5,0.12l0.03,0.15l0.87,0.52l0.35,0.13l0.52,-0.01l0.77,0.56l0.91,0.33l0.1,0.2l0.28,-0.04l0.42,0.16l1.99,0.27l-0.05,0.31l0.11,0.18l-0.18,0.06l-0.15,0.66l0.44,0.21l0.04,0.83l0.28,0.36l0.44,-0.14l0.1,-0.13l0.05,-0.46l0.22,-0.51l1.1,0.62l0.73,0.1l0.29,-0.35l-0.22,-0.39l-0.74,-0.5l-0.43,-0.14l-0.07,-0.18l0.03,-0.25l0.76,-0.07l0.26,0.1l0.01,0.3l0.27,0.62l0.54,0.33l0.14,-0.17l0.45,0.24l0.16,-0.08l0.63,0.55l1.13,0.63l0.13,-0.03l0.81,0.55l0.59,0.22l1.21,0.25l1.27,0.12l1.06,-0.17l1.19,0.0l0.01,0.22l0.26,0.49l0.68,0.48l0.08,0.62l0.56,0.17l0.57,0.45l-0.61,-0.02l-0.77,-0.42l-0.42,0.03l-0.44,0.21l0.1,0.48l0.23,0.26l-0.19,0.32l0.18,0.59l0.33,0.11l0.33,-0.12l0.64,0.36l0.3,0.06l0.31,-0.08l0.23,-0.23l0.33,-0.02l0.39,0.36l0.26,0.01l0.25,0.18l0.33,0.02l0.27,-0.16l0.13,0.09l0.16,0.38l-0.54,-0.04l-0.29,0.34l0.21,0.4l0.2,0.11l0.07,0.35l0.89,0.58l-0.04,0.13l0.18,0.3l0.49,0.21l0.94,-0.04l0.96,0.68l0.58,0.26l0.32,0.03l0.37,0.42l0.23,0.1l0.1,0.31l0.34,0.26l0.21,0.38l0.34,0.08l0.26,-0.12l0.25,0.23l-0.55,0.05l-0.29,0.34l-0.41,0.04l-0.18,0.63l0.35,0.33l1.4,0.72l-0.08,0.69l1.48,0.96l0.49,0.67l0.27,0.15l0.49,-0.16l1.05,0.48l0.24,-0.05l0.38,0.32l0.16,0.58l1.1,0.42l0.72,0.06l0.21,0.19l0.85,0.38l0.32,0.34l0.31,0.09l0.59,0.53l0.2,0.37l0.73,0.47l0.25,0.29l0.1,0.53l0.48,0.29l0.55,0.03l0.31,0.44l0.56,0.33l-0.11,0.34l0.39,0.41l1.66,1.19l0.76,0.36l0.16,-0.03l1.78,1.0l0.42,0.4l0.69,0.34l0.47,0.65l0.08,-0.08l-0.02,0.25l0.22,0.06l0.5,0.55l0.02,0.21l0.5,0.23l0.54,0.42l1.19,0.58l0.8,0.03l0.63,0.31l0.03,0.31l0.43,0.12l0.33,-0.2l0.19,-0.0l0.43,0.12l1.02,0.51l0.05,0.25l0.41,0.27l0.22,-0.19l0.58,0.53l0.31,0.09l0.53,0.55l-0.01,0.24l0.49,0.42l0.02,0.24l0.27,0.43l0.55,0.34l0.18,0.4l0.42,0.15l0.58,0.51l0.56,0.96l0.35,0.26l0.53,0.01l0.15,0.11l-23.69,51.51l0.09,0.46l1.53,1.4l0.52,0.02l0.19,-0.15l1.17,1.29l0.41,0.12l1.37,-0.4l1.79,0.68l-0.86,0.96l-0.08,0.38l0.35,1.01l0.91,0.92l-0.08,0.65l0.1,0.44l2.43,4.76l-0.2,1.48l-0.29,0.38l0.19,0.62l0.58,0.12l0.83,-0.25l0.54,-0.07l0.07,0.08l0.03,0.1l-0.66,0.3l-0.33,0.34l0.29,0.54l0.35,-0.0l0.37,-0.18l0.25,0.12l0.02,0.21l0.44,0.11l0.09,0.11l0.26,1.19l-0.17,0.03l-0.1,0.51l0.24,0.32l0.94,0.22l0.04,0.16l-0.27,0.18l0.01,0.12l0.21,0.32l0.21,0.09l-0.05,0.37l-0.24,-0.02l-0.1,-0.46l-0.35,-0.31l-0.11,0.06l-0.28,-0.47l-0.47,-0.03l-0.26,0.35l-0.45,0.01l-0.08,0.13l-0.26,-0.63l-0.14,0.01l-0.35,-0.41l-0.47,-0.12l-0.89,-1.43l0.11,-0.01l0.32,-0.49l-0.08,-0.26l-0.34,-0.28l-0.51,0.01l-0.47,-0.93l-0.05,-0.15l0.12,-0.53l-0.08,-0.41l-0.52,-1.06l-0.46,-0.7l-0.19,-0.07l0.1,-0.61l-0.29,-0.28l-0.72,-0.14l-1.24,-1.44l-0.27,-0.47l-0.01,-0.21l-0.32,-0.23l-0.24,-0.34l-0.28,-0.11l-0.49,-0.63l0.39,-0.11l0.12,-0.23l0.05,0.05l0.59,-0.3l-0.02,0.13l-0.16,0.06l-0.16,0.55l0.3,0.41l0.38,0.07l0.43,-0.3l0.25,-1.03l0.15,-0.22l0.42,0.2l0.36,0.46l0.36,0.04l0.35,-0.35l-0.47,-0.83l-0.69,-0.39l-0.27,-0.91l-0.35,-0.63l-0.4,-0.17l-0.67,0.44l-0.39,0.06l-0.79,0.37l-1.9,-0.05l-1.0,-0.5l-0.45,-0.34l-1.46,-1.5l0.23,-0.14l0.21,-0.32l0.16,-0.74l-0.43,-0.94l-0.52,-0.09l-0.33,0.19l-0.12,0.52l-0.6,-0.04l-0.85,-0.89l-2.81,-1.97l-1.68,-0.48l-1.62,-0.65l-1.13,-0.19l-0.1,-0.53l-0.27,-0.5l0.13,-0.25l-0.02,-0.26l-0.22,-0.25l-0.8,-0.28l-0.36,-0.35l-0.17,-0.01l-0.13,-0.55l-0.2,-0.34l-0.2,-0.12l0.7,-0.5l0.09,-0.27l-0.09,-0.08l0.21,-0.27l0.23,-0.09l0.38,0.08l0.38,-0.17l0.18,-0.32l-0.03,-0.34l-0.35,-0.22l-0.55,-0.07l-0.81,0.27l-0.24,0.2l-0.57,0.02l-0.56,0.35l-0.61,0.15l-0.2,-0.13l-0.19,-0.59l-0.58,-0.63l0.77,-0.37l0.19,-0.38l-0.32,-0.45l-0.53,-0.01l-0.15,-0.48l-0.19,-0.17l0.09,-0.49l-0.16,-0.25l0.04,-0.22l-0.31,-0.55l-0.43,-0.22l-0.53,0.17l-0.07,-0.2l-0.27,-0.03l-0.09,-0.14l0.22,-0.56l0.26,0.03l0.08,-0.09l0.65,0.37l0.38,0.07l0.42,-0.49l-0.14,-0.42l-0.27,-0.26l-1.05,-0.52l-1.54,0.27l-0.1,-0.21l-0.41,-0.3l-0.42,-0.01l-0.08,-0.23l-0.47,0.02l-0.21,-0.16l0.21,-0.26l-0.05,-0.39l0.14,-0.4l-0.28,-0.27l-0.25,-0.05l0.21,-0.77l-0.33,-0.28l-0.29,0.02l-1.36,0.57l0.02,-0.11l-0.34,-0.35l-1.19,-0.19l-0.14,0.25l-0.55,0.26l0.08,0.49l0.21,0.14l-0.01,0.1l-0.83,-0.27l-0.63,-0.03l-0.23,0.49l-0.51,0.38l0.12,0.52l0.31,0.16l0.46,-0.02l-0.05,0.11l-0.98,0.16l-0.3,0.14l-0.16,0.16l-0.05,0.46l0.37,0.28l0.83,-0.12l0.12,0.14l-0.04,0.25l0.31,0.21l-0.27,0.12l-0.15,0.24l-0.51,-0.02l-0.23,0.34l-0.3,0.12l0.05,0.54l-0.3,0.32l-0.12,-0.14l-0.66,0.24l-0.32,-0.27l-0.44,-0.13l-0.32,-0.39l0.11,-0.5l-0.38,-0.29l-0.64,0.04l0.13,-0.4l-0.05,-0.34l-0.23,-0.26l-0.26,-0.07l-0.4,0.16l-0.47,0.73l-0.25,-0.01l-0.23,-0.49l-0.46,-0.07l-0.37,0.4l-0.4,-0.06l-0.16,0.33l-0.29,-0.31l-0.42,-0.03l-0.26,0.25l-0.01,0.21l-0.31,-0.08l-0.11,-0.32l-0.12,-0.03l-0.37,0.06l-0.72,0.4l-0.01,-0.27l-0.13,-0.08l-0.8,-0.04l-0.38,0.2l-0.0,0.45l-0.09,0.05l-1.16,0.08l-0.3,0.13l-0.87,-0.77l-0.22,-0.05l-0.29,0.29l-0.4,-0.28l-1.02,-0.03l0.03,-0.13l-0.35,-0.39l-0.01,-0.13l0.45,0.02l0.16,-0.37l0.53,0.01l0.43,0.3l0.3,0.45l0.49,-0.04l0.2,-0.43l0.23,0.09l0.44,-0.04l0.48,-0.17l0.06,-0.15l0.45,-0.23l0.46,-0.08l0.32,-0.52l-0.21,-0.37l-0.49,-0.19l-1.84,0.04l-0.57,-0.71l-0.07,-0.28l1.28,-0.98l1.62,-0.44l0.37,-0.26l0.33,-0.45l0.46,-0.1l0.65,-0.89l0.14,-1.04l0.36,-0.03l0.74,0.3l1.54,-0.17l1.4,0.03l0.01,0.5l0.23,0.42l0.56,0.48l1.06,0.16l0.14,0.1l0.28,0.41l0.4,0.26l1.19,1.07l0.2,0.34l0.25,0.13l0.5,-0.37l0.0,-0.44l-0.13,-0.39l-0.42,-0.46l-0.43,-0.13l-0.32,-0.52l-0.43,-0.35l-0.69,-1.19l0.45,-0.11l0.44,-0.3l0.35,0.02l0.33,-0.17l1.56,0.33l0.37,-0.06l0.15,-0.62l-0.09,-0.11l-0.67,-0.46l-0.84,-0.3l-0.61,-0.04l-0.74,0.14l-0.37,0.19l-0.29,0.35l-0.76,-0.52l-0.11,-0.24l-0.42,-0.02l-0.16,-0.12l0.14,-0.2l-0.17,-0.67l-0.09,-0.02l-1.07,0.27l-0.85,-0.19l-0.49,0.0l-0.85,0.41l-0.65,-0.15l-0.6,-0.29l-1.18,0.04l-0.71,0.35l-0.19,0.5l-0.35,-0.15l-0.65,0.04l-0.5,0.24l-0.62,0.03l-0.54,0.15l-0.41,0.33l-0.12,0.36l-0.49,0.22l-0.59,-0.02l-0.4,-0.27l-0.26,-0.68l-0.43,-0.32l-0.3,-0.11l-0.42,0.02l-0.3,0.28l0.16,0.51l0.31,0.08l0.01,0.37l0.37,0.61l0.21,0.72l-0.38,0.08l-0.35,0.26l-0.33,-0.06l-0.56,-0.39l-0.98,-0.37l-0.58,0.21l0.02,0.44l-0.07,-0.38l-0.32,-0.34l-0.42,0.19l-0.23,0.4l-0.2,-0.38l-0.81,0.14l-0.08,0.05l-0.02,0.41l-0.37,-0.32l-0.33,-0.04l-0.36,0.28l0.13,0.39l-1.49,-0.27l-0.16,0.49l-0.25,0.14l-0.28,0.36l-0.51,0.04l-0.02,0.17l-0.2,0.09l0.03,0.42l-0.16,0.27l-0.01,0.39l0.33,0.34l0.59,-0.05l0.39,0.38l0.56,0.31l0.08,0.49l0.23,0.34l0.3,0.19l0.03,0.3l-0.64,0.54l-0.5,-0.05l-0.44,0.18l-0.88,-0.46l-0.37,0.02l-0.48,0.41l-0.2,-0.12l-0.45,-0.01l-0.34,0.59l-0.75,-0.12l-0.4,0.05l-0.27,0.3l-0.1,-0.02l0.07,0.06l-0.11,0.01l0.0,0.1l-0.42,-0.28l-0.36,0.33l-0.19,-0.1l-0.32,0.19l-0.3,-0.11l-0.37,0.07l-0.53,-0.44l-0.45,-0.15l-0.9,0.53l-0.18,-0.15l-0.71,-0.02l-0.45,0.28l-0.15,-0.37l-0.41,-0.28l-0.42,0.1l-0.43,0.49l-0.37,-0.15l-0.28,0.31l-0.47,-0.08l-0.4,-0.43l-0.4,0.07l-0.3,0.24l-0.14,-0.11l-0.43,-0.05l-0.14,0.08l-1.45,-0.04l-0.31,0.12l-0.22,0.28l0.24,0.95l-0.31,-0.03l-0.15,0.18l-0.69,-0.24l-0.41,-0.28l-0.26,0.05l-0.26,0.26l-0.2,-0.24l-0.49,0.22l-0.65,0.09l-0.32,-0.22l-0.27,0.2l-0.19,-0.65l-0.39,-0.22l-0.43,0.08l-0.28,0.31l-0.44,0.09l-0.26,-0.07l-0.14,0.34l-0.06,-0.31l-0.26,-0.25l-0.54,-0.14l-1.29,-0.05l-0.62,0.31l-0.42,-0.34l-0.51,-0.04l-0.84,0.27l-0.73,0.11l-0.16,0.12l-0.11,0.56l-0.26,-0.07l-0.44,0.3l-0.03,0.21l-0.23,0.15l-0.26,-0.25l-0.37,-0.03l-0.36,0.17l-0.6,-0.33l-0.87,-0.22l-0.41,-0.18l-0.09,-0.37l-0.55,-0.15l-0.25,0.15l-0.71,-0.67l-0.41,0.02l-0.78,-0.24l-0.4,0.21ZM111.25,502.71l-0.44,0.21l-0.03,-0.02l0.24,-0.26l0.23,0.07ZM128.45,468.26l-0.1,0.14l-0.06,0.02l0.02,-0.15l0.14,-0.02ZM191.55,470.09l-0.0,0.04l-0.02,-0.04l0.03,-0.01ZM191.85,541.2l-0.08,-0.21l0.06,-0.51l0.25,-0.06l0.08,0.39l-0.31,0.39ZM165.84,518.29l-0.19,0.37l-0.34,0.04l-0.07,0.31l-0.27,-0.07l-0.45,0.06l-0.04,-0.09l0.46,-0.29l0.06,-0.15l0.84,-0.19ZM162.12,521.34l0.09,0.0l-0.06,0.02l-0.02,-0.03ZM162.26,521.34l0.08,-0.02l0.01,0.04l-0.04,0.04l-0.05,-0.05ZM141.64,514.73l0.19,0.06l0.26,0.22l-0.46,0.03l-0.07,-0.12l0.08,-0.19ZM132.07,521.13l-0.0,0.0l0.0,-0.0l0.0,0.0ZM132.06,520.84l-0.02,-0.07l0.06,-0.01l-0.03,0.08ZM109.91,522.38l0.07,-0.02l0.05,0.12l-0.03,0.01l-0.09,-0.11ZM107.83,523.67l0.01,0.02l-0.02,0.0l0.0,-0.02l0.01,-0.01ZM136.02,515.64l-0.01,-0.04l0.07,0.01l-0.06,0.03ZM199.71,549.76l0.43,-0.06l0.87,0.3l0.36,-0.05l0.76,-0.54l0.39,-0.87l0.67,-0.03l0.47,-0.34l0.17,-0.49l0.96,0.19l1.89,-0.14l0.49,0.7l0.06,0.43l0.38,0.59l-0.1,0.26l-0.29,0.17l-0.1,0.55l0.11,0.16l-0.11,0.33l0.13,0.53l0.17,0.24l0.69,0.46l0.02,0.37l0.3,0.56l0.35,0.24l0.08,0.34l-0.15,0.26l0.26,1.28l1.33,1.5l0.24,0.78l-0.64,-0.19l-0.38,0.04l-0.33,0.37l-0.51,0.26l-0.01,0.29l-0.38,0.15l-0.21,0.29l-0.52,-0.98l-0.84,-0.64l0.11,-0.44l-0.27,-1.06l0.14,-0.11l0.26,-1.09l-0.26,-0.26l0.04,-0.09l-0.12,-0.01l0.04,-0.06l-0.09,0.05l-0.1,-0.1l-0.04,0.1l-0.12,-0.01l-0.03,-0.07l0.24,-0.92l0.1,-1.07l-0.15,-1.05l0.51,-0.94l0.02,-0.37l-0.66,-0.25l-0.5,0.69l-0.24,-0.13l-0.45,0.11l0.01,0.55l-0.32,0.35l0.3,1.04l-0.34,0.85l0.13,1.32l-0.11,0.36l0.04,0.39l-0.27,0.34l0.03,1.86l-0.28,0.29l-0.27,-0.31l0.02,-1.36l-0.28,-0.43l-0.53,0.1l-0.08,0.1l-0.88,-0.14l0.22,-0.05l0.2,-0.25l0.2,-0.91l-0.12,-0.1l-0.13,-1.06l0.88,0.13l0.45,-0.45l-0.11,-0.33l-0.74,-0.45l-0.23,0.1l0.0,-0.84l-0.33,-0.34l-0.31,-0.01l-0.29,0.56l-0.24,0.06l-0.27,0.41l0.12,0.13l-0.5,-0.23l0.24,-0.5l-0.28,-0.54l-0.29,-0.02l-0.18,-0.5l-0.47,-0.15l-0.19,0.31l-0.22,-0.47ZM201.64,551.89l0.21,0.2l-0.19,0.19l-0.03,-0.38ZM210.83,558.1l0.42,0.83l-0.23,0.38l0.09,0.66l0.47,1.27l0.06,1.07l0.15,0.48l-0.33,-0.38l-1.31,-0.73l-0.26,-0.05l0.19,-0.2l-0.17,-0.39l0.14,-0.1l0.31,-0.63l-0.47,-0.31l-0.27,0.01l-0.75,0.68l-0.11,-0.36l0.09,-0.18l-0.03,-0.41l0.26,-0.33l0.36,-0.19l0.16,-0.56l0.43,-0.42l0.36,0.09l0.44,-0.23ZM211.88,563.05l1.25,5.46l-0.54,0.45l0.03,0.64l0.81,0.55l-0.47,0.67l0.05,0.52l0.58,0.54l-0.08,0.3l0.06,0.48l-0.14,0.55l0.15,0.3l0.2,0.13l0.9,0.26l1.46,1.84l1.18,0.8l0.34,0.76l0.55,0.42l-0.01,0.53l0.1,0.24l0.78,0.58l0.49,0.11l0.03,0.16l-0.16,0.69l-0.68,0.46l-0.31,0.4l-0.04,0.78l-0.31,0.67l0.11,0.99l-0.15,0.54l0.03,0.33l-0.4,0.17l-1.34,1.4l-0.41,0.31l-0.48,0.16l-0.2,-0.13l-0.28,0.01l0.12,-0.5l-0.16,-0.42l-0.64,0.07l-0.08,0.17l-0.1,-0.51l0.24,-0.03l0.12,0.14l0.5,0.14l1.27,-0.81l0.75,-0.65l-0.23,-0.63l-0.48,0.07l0.01,-0.13l-0.37,-0.36l-0.54,0.12l0.59,-1.72l0.0,-0.38l0.15,-0.3l-0.06,-0.43l0.09,-0.51l-0.36,-0.24l-0.06,-0.35l-0.27,-0.49l0.49,-0.15l0.35,-0.35l0.18,-0.48l-0.43,-0.27l-0.43,0.08l-0.61,0.31l-0.45,0.04l-0.55,-0.29l-1.43,0.28l-0.59,-0.05l0.17,-0.09l0.2,-0.36l0.21,-0.85l0.32,0.02l0.81,0.41l0.31,0.03l0.71,-0.34l-0.07,-0.49l-0.33,-0.19l-0.4,0.02l-0.88,-0.43l0.03,-0.84l-0.23,-0.29l-0.46,-0.26l0.02,-0.43l-0.43,-0.61l0.27,-0.3l-0.16,-0.68l-0.35,-0.03l0.1,-0.07l0.01,-0.21l0.42,-0.17l0.22,-0.62l-0.38,-0.26l-0.67,0.18l-0.27,-0.29l-0.2,-0.32l-0.06,-0.35l0.33,-0.21l0.18,-1.04l-0.39,-0.3l-0.47,0.16l-0.17,-0.08l-0.29,-0.36l0.13,-0.2l-0.14,-0.35l-0.45,-0.27l1.08,-0.08l0.35,-0.42l-0.28,-0.52l-0.49,0.08l-0.44,-0.14l0.18,-0.32l-0.03,-0.32l-0.51,-0.26l0.04,-0.13l0.64,0.01l0.41,0.72l0.28,0.23l0.31,0.02l0.28,-0.15l0.04,-0.52l-0.24,-0.23l-0.1,-0.4l-0.37,-0.63l-0.78,-0.91l0.12,-0.39l1.23,0.83l0.52,-0.45ZM214.19,585.45l-0.17,0.68l-0.05,-0.01l0.09,-0.42l0.13,-0.25ZM215.44,583.76l-0.46,0.24l-0.25,-0.22l-0.63,0.14l0.05,-0.14l0.52,-0.28l0.76,0.25ZM211.63,577.78l-0.08,0.43l0.26,0.27l-0.46,0.4l-0.51,-0.23l-0.26,0.45l0.06,0.32l-0.15,-0.2l0.08,-0.67l0.25,-0.15l0.49,-0.04l0.32,-0.57ZM209.08,567.17l-0.25,-0.24l0.08,-0.14l0.49,0.2l-0.32,0.18ZM138.39,458.34l-0.47,-0.44l0.06,-0.45l0.41,0.27l0.0,0.62ZM108.63,500.59l-0.13,0.01l0.09,-0.03l0.04,0.02ZM211.75,580.86l0.58,-0.24l-0.2,0.44l0.02,0.52l-0.22,-0.23l-0.18,-0.5ZM212.61,580.43l0.18,-0.49l-0.1,-0.18l0.52,-0.05l0.31,-0.26l0.18,-0.36l0.14,-0.03l0.14,-0.52l0.57,-0.03l0.29,1.05l0.12,1.09l-0.15,0.19l0.03,0.12l-0.16,0.04l-0.27,0.73l-0.28,0.21l-0.2,-0.36l0.13,-1.47l-0.39,-0.42l-0.41,0.19l-0.18,0.46l-0.46,0.07ZM211.52,574.36l0.23,0.31l0.37,0.12l0.01,0.48l-0.14,0.07l-0.12,-0.08l-0.4,-0.44l-0.11,-0.22l0.15,-0.24ZM209.53,575.0l0.17,-0.21l0.28,-0.04l-0.06,0.38l0.09,0.09l0.27,0.14l0.34,0.0l0.41,0.28l0.04,0.12l-0.35,0.14l0.09,0.38l-0.06,0.17l-0.28,0.08l0.14,-0.47l-0.34,-0.41l-0.06,-0.25l-0.69,-0.39ZM210.36,574.41l0.1,-0.07l0.07,0.06l-0.0,0.01l-0.16,-0.0ZM209.54,571.91l0.03,-0.1l0.32,-0.15l0.14,-0.29l-0.04,-0.37l0.05,-0.1l0.34,1.01l-0.09,-0.09l-0.52,-0.06l-0.15,0.21l-0.08,-0.04ZM206.97,580.16l0.1,-0.52l-0.42,-0.36l0.1,-0.03l-0.05,-0.5l-0.28,-0.2l0.14,-0.17l0.28,-0.1l0.36,0.03l0.21,-0.67l-0.39,-0.23l-1.18,-0.03l-0.2,-0.17l0.19,-0.17l0.46,-0.05l0.67,-0.52l0.19,-0.54l-0.08,-0.32l-0.26,-0.01l0.23,-0.63l0.14,0.22l0.53,0.22l0.24,0.31l0.4,0.27l0.42,1.0l0.12,0.56l-0.14,0.62l-0.17,-0.03l-0.11,0.19l-0.32,0.19l0.02,0.34l-0.75,0.25l-0.08,0.43l0.07,0.45l0.56,-0.01l-0.02,0.13l0.38,0.45l0.22,-0.01l0.23,0.23l0.25,-0.06l0.21,0.38l-0.39,-0.07l-0.32,0.43l-0.06,0.32l0.22,0.37l0.41,0.04l0.21,0.09l-0.2,-0.03l-0.41,0.47l-0.47,0.15l0.11,0.7l0.38,0.27l-0.13,0.2l0.18,0.53l-0.2,0.06l-0.06,0.23l-0.22,-0.08l0.18,-0.35l-0.4,-1.09l0.11,-0.08l0.05,-0.73l-0.28,-0.13l-0.15,-0.32l0.01,-0.81l-0.21,-0.78l-0.46,-0.01l-0.11,0.08l-0.05,-0.39ZM207.26,574.01l-0.02,-0.27l-0.21,-0.27l0.29,-0.14l0.03,0.3l0.15,0.15l-0.04,0.21l-0.2,0.0ZM206.9,573.41l-0.43,-0.14l-0.38,-0.35l0.21,-0.11l0.28,0.14l0.04,0.28l0.27,0.18ZM208.72,573.09l0.26,-0.17l0.43,0.23l0.25,-0.0l-0.15,0.15l-0.09,0.37l-0.14,0.04l-0.23,-0.02l-0.33,-0.6ZM206.49,567.38l1.0,0.59l0.81,0.7l0.06,0.4l-0.46,0.04l-0.19,0.76l0.03,0.31l0.19,0.26l-0.17,0.31l0.43,0.76l-0.15,0.1l-0.85,-0.57l-0.44,0.12l-0.01,0.16l-0.22,-0.06l0.24,-0.51l-0.06,-0.27l0.08,0.03l0.08,-0.27l-0.06,-0.29l0.42,-0.7l0.08,-0.44l-0.28,-0.43l0.06,-0.22l-0.32,-0.31l-0.25,-0.5ZM208.6,569.24l0.34,0.07l0.2,-0.33l0.2,0.07l0.2,0.44l-0.0,0.19l-0.3,0.2l-0.13,0.86l-0.14,-0.44l-0.01,-0.6l-0.07,-0.17l-0.2,-0.03l-0.09,-0.25ZM209.57,569.66l0.0,-0.0l0.03,-0.02l-0.04,0.02ZM204.29,565.52l0.44,-0.15l-0.03,-0.36l0.29,-0.2l0.29,0.26l0.51,-0.3l-0.08,0.47l-0.15,0.23l-0.33,-0.04l-0.36,0.3l-0.27,-0.06l-0.16,0.09l0.02,0.12l-0.36,0.07l0.19,-0.44ZM206.36,564.27l-0.49,0.31l-0.02,-0.59l-0.46,-0.14l-0.02,-0.1l0.53,-0.05l0.24,-0.65l-0.35,-0.23l-0.51,-0.03l-0.1,-0.28l0.09,-0.84l0.2,-0.34l0.16,-0.72l0.07,-1.03l0.34,-0.33l0.69,0.17l0.26,0.31l-0.04,0.27l-0.16,0.12l0.03,0.24l-0.13,0.05l-0.05,0.65l-0.22,0.57l0.02,0.09l0.33,0.11l0.23,1.01l-0.15,0.27l0.43,0.45l-0.08,0.23l-0.57,-0.12l-0.09,0.19l-0.15,0.04l-0.01,0.39ZM206.15,574.28l-0.13,-0.03l0.0,-0.02l0.15,-0.04l-0.02,0.09ZM205.18,574.32l-0.02,0.0l0.01,-0.01l0.01,0.0ZM204.96,570.25l-0.05,-0.24l0.09,0.22l-0.04,0.01ZM205.25,569.02l-0.25,0.19l-0.3,-0.19l-0.18,-0.37l-0.42,-0.07l0.04,-0.08l0.41,0.09l0.15,-0.2l0.31,0.17l0.28,-0.13l0.03,0.52l-0.07,0.07ZM198.99,558.2l0.09,-0.07l0.23,0.49l-0.21,-0.07l-0.11,-0.35ZM199.36,558.71l0.38,0.44l0.56,-0.45l-0.44,-1.09l0.59,0.02l0.03,-0.77l0.24,0.32l0.51,0.01l0.2,-0.29l0.29,-0.06l0.19,0.34l0.24,0.12l0.18,0.27l-0.28,0.14l-0.69,-0.17l-0.13,0.26l-0.17,-0.1l-0.57,0.26l0.08,0.42l0.27,0.54l0.56,0.48l0.25,0.5l0.39,0.36l-0.12,0.15l0.09,0.44l-0.94,-1.32l-0.28,-0.2l-0.61,0.35l0.06,0.34l-0.2,0.14l0.2,0.7l0.21,0.07l-0.14,0.51l0.2,0.13l0.05,0.18l-0.28,0.06l-0.12,-0.56l-0.37,-0.57l0.25,-0.15l-0.16,-0.49l-0.21,-0.17l-0.02,-0.33l-0.28,-0.49l-0.01,-0.31ZM202.27,558.92l0.38,-0.28l0.43,-0.1l0.76,0.39l0.05,0.17l0.43,0.38l-0.11,0.18l-0.41,-0.45l-0.58,-0.11l-0.2,0.41l0.19,0.59l-0.97,-1.19ZM202.11,560.96l0.33,0.1l0.14,0.21l0.26,0.09l0.85,-0.01l-0.23,1.25l-0.31,-0.14l-1.03,-1.5ZM201.29,562.69l0.18,0.07l0.33,-0.09l0.0,0.25l0.48,0.21l0.22,0.28l-0.11,0.08l0.12,0.52l-0.05,0.29l0.23,0.34l-0.06,0.8l0.13,0.32l-0.1,0.03l-0.14,0.56l-0.14,0.99l0.02,0.73l-0.25,0.74l-0.22,-0.02l-0.19,0.34l-0.01,0.5l-0.44,1.06l-0.2,-0.86l-0.08,-0.92l0.3,-0.02l0.63,-0.49l-0.06,-0.73l-0.22,-0.05l0.02,-0.45l-0.19,-0.26l-0.25,-0.01l-0.16,-0.59l-0.47,-0.03l0.24,-0.17l0.01,-0.27l0.65,-0.05l0.22,-0.32l-0.13,-0.51l-0.53,-0.24l0.57,-0.27l-0.34,-1.16l-0.33,-0.12l0.28,-0.19l0.04,-0.3ZM199.27,560.14l0.0,0.0l-0.01,0.0l0.0,-0.0ZM199.1,564.31l0.25,-0.07l0.1,-0.06l-0.12,0.15l-0.23,-0.02ZM199.63,563.32l0.06,-0.2l-0.05,-0.13l0.09,0.13l-0.1,0.2ZM162.15,525.49l0.25,-0.21l0.11,-0.0l-0.2,0.31l-0.16,-0.1ZM136.7,524.68l0.22,0.25l0.59,-0.1l0.04,-0.44l0.61,0.38l0.29,-0.23l0.18,-0.67l0.1,-0.05l0.25,0.13l0.16,-0.06l-0.14,0.5l0.39,0.72l-0.5,0.38l-0.19,-0.72l-0.36,-0.02l-0.69,0.57l-0.12,-0.24l-0.46,0.06l-0.15,0.16l-0.22,-0.52l-0.13,-0.04l0.04,-0.14l0.07,0.07ZM139.88,525.13l-0.03,-0.01l0.02,-0.02l0.01,0.03ZM127.78,528.13l0.49,-0.13l0.09,0.05l-0.34,0.29l-0.18,0.01l-0.06,-0.22ZM128.01,526.82l0.09,-0.93l-0.34,-0.41l0.27,-0.06l0.19,-0.29l0.22,-0.02l0.24,-0.25l0.44,0.22l0.16,-0.11l0.5,0.1l0.1,-0.23l0.15,-0.03l0.38,0.09l0.25,0.25l-0.43,0.12l0.02,0.5l0.44,0.31l-0.25,0.64l0.13,1.11l0.36,0.59l0.43,0.15l-0.37,0.07l-0.19,0.39l-0.11,-0.05l0.03,-0.41l-0.23,-0.36l-0.69,-0.05l-0.43,-0.59l-0.47,-0.4l-0.65,-0.34l-0.26,-0.01ZM131.4,528.57l0.28,-0.39l-0.19,-0.6l0.07,-0.55l0.15,-0.28l0.3,0.13l0.31,-0.27l0.44,0.14l0.52,-0.02l0.3,-0.22l0.26,0.17l0.23,-0.03l0.19,0.33l0.66,-0.29l0.18,-0.29l0.28,0.22l-0.13,0.25l-0.0,0.39l0.26,0.35l0.46,-0.02l0.28,-0.39l0.28,0.18l0.44,-0.16l0.31,0.17l0.08,-0.05l-0.05,0.23l-0.73,0.21l-0.21,0.41l0.22,0.27l-0.07,0.65l0.3,0.23l0.29,0.05l-0.5,0.18l-0.19,-0.24l-0.3,-0.08l-0.09,-0.22l-0.26,-0.17l-0.13,-0.32l-0.96,-0.67l-0.23,0.18l-0.65,0.18l-0.19,0.27l0.12,0.28l-0.38,-0.39l-0.44,0.12l-0.19,0.46l-0.91,-0.26l-0.07,0.08l-0.35,-0.23ZM134.19,529.01l0.07,-0.02l0.09,0.03l-0.15,-0.01l-0.01,0.0ZM134.4,529.04l0.27,0.1l0.23,0.58l-0.25,-0.11l0.04,-0.1l-0.29,-0.47ZM135.83,526.14l0.09,-0.06l0.01,0.01l-0.11,0.04ZM132.89,525.47l-0.57,-0.58l0.11,-0.17l0.27,-0.08l0.34,0.07l0.08,0.37l-0.22,0.39ZM98.14,450.76l0.34,-0.44l0.56,-0.16l0.06,0.49l-0.13,0.02l0.1,0.29l0.7,0.54l0.29,0.6l0.36,0.4l-0.66,-0.36l-1.21,-0.26l-0.45,-0.8l0.04,-0.32ZM100.81,452.78l1.01,0.2l0.26,0.2l0.38,0.11l0.3,0.33l0.23,0.8l-0.26,0.19l-0.26,0.4l0.43,0.51l0.28,0.71l0.39,0.33l-0.09,0.31l0.05,0.32l0.21,0.31l0.5,0.32l0.0,0.35l-0.82,-0.26l-0.09,0.09l-0.51,-0.1l-0.33,0.07l-0.08,-0.93l-0.57,-1.1l0.12,-0.48l-0.3,-0.98l-0.39,-0.84l-0.28,-0.35l-0.01,-0.23l-0.17,-0.28ZM104.84,458.76l0.28,0.01l0.41,0.53l-0.25,0.05l-0.44,-0.59ZM96.98,478.79l0.06,-0.22l1.37,1.26l0.38,-0.0l0.32,-0.21l0.21,0.06l0.2,0.25l0.72,-0.01l-0.01,0.32l0.69,0.19l0.2,0.27l-0.05,0.32l0.09,0.16l0.27,0.29l0.49,0.19l0.07,0.2l-0.23,0.33l-0.32,0.22l-0.42,1.13l-0.7,-0.22l-0.36,-0.42l-0.19,0.11l-0.26,-0.08l-0.29,-0.35l-0.42,-0.13l-0.26,-0.41l-0.51,-0.41l-0.61,-1.56l0.07,-0.19l-0.47,-0.5l0.04,-0.31l-0.09,-0.3ZM97.68,522.17l0.05,-0.07l0.04,-0.11l0.07,0.18l-0.15,-0.01ZM98.03,522.39l0.04,0.02l-0.0,0.03l-0.03,-0.05ZM80.23,514.88l0.08,-0.15l0.69,0.24l0.38,-0.02l1.55,-0.69l0.18,0.0l0.16,0.37l0.44,0.39l0.27,0.08l0.4,-0.16l0.54,0.24l0.6,-0.01l0.53,0.26l0.44,0.41l0.03,0.72l-0.26,0.4l-0.13,0.44l-0.31,0.06l-0.22,0.21l-0.27,0.01l-0.3,-0.08l-0.46,-0.58l-1.38,-0.93l-0.45,-0.11l-0.76,0.03l-0.42,0.3l-0.21,0.03l-0.91,-0.42l-0.33,-0.34l0.14,-0.67ZM74.26,514.0l0.03,-0.25l0.32,0.05l0.02,0.35l-0.37,-0.15ZM64.81,513.23l0.09,-0.01l0.13,0.09l-0.17,0.0l-0.05,-0.08ZM70.29,514.35l-0.12,-0.05l-0.16,0.39l-0.25,-0.27l-0.36,0.08l0.24,-0.12l0.32,0.02l0.41,-0.61l-0.31,-0.35l-0.31,-0.63l-0.3,-0.24l0.05,-0.29l0.13,-0.06l0.67,0.13l0.43,0.28l0.16,0.24l-0.29,0.4l0.11,0.51l-0.06,0.17l-0.33,0.11l-0.04,0.31ZM68.8,514.2l-0.28,0.32l-0.09,-0.1l0.24,-0.29l-0.1,-0.27l0.19,-0.02l0.04,0.36ZM59.97,511.71l0.2,-0.13l0.18,-0.38l0.48,-0.06l0.27,0.03l0.13,0.21l0.36,0.14l0.1,0.15l-0.09,0.12l-0.23,-0.03l-0.61,0.18l-0.41,-0.22l-0.36,0.0ZM62.67,511.56l0.07,-0.35l0.28,-0.32l0.75,-0.02l0.67,0.35l0.17,0.49l-0.28,0.29l-1.25,-0.24l-0.41,-0.2ZM37.79,498.38l0.07,-0.23l-0.1,-0.23l0.32,0.03l0.09,0.49l-0.29,0.05l-0.1,-0.11ZM36.41,498.87l-0.02,0.01l0.01,-0.02l0.01,0.01ZM36.85,498.71l-0.0,-0.07l-0.0,-0.01l0.02,0.01l-0.01,0.07ZM30.2,493.17l-0.02,-0.03l0.04,-0.04l0.0,0.08l-0.02,-0.0ZM26.76,492.74l0.41,-0.33l0.12,0.35l-0.02,0.08l-0.25,0.01l-0.26,-0.12ZM25.01,490.83l0.02,0.0l-0.01,0.01l-0.02,-0.01ZM23.18,488.38l-0.09,0.01l0.05,-0.17l0.04,0.08l0.01,0.08ZM23.19,487.9l-0.06,0.1l-0.14,-0.54l0.19,0.18l0.0,0.26ZM15.95,478.85l0.25,0.07l-0.02,0.19l-0.14,-0.01l-0.09,-0.25ZM1.23,449.67l0.23,0.17l0.21,0.66l0.47,0.45l-0.25,0.16l0.12,0.39l-0.24,-0.38l-0.54,-0.19l-0.11,-0.3l0.19,-0.08l0.2,-0.42l-0.28,-0.47Z", "name": "Alaska"}, "US-NJ": {"path": "M801.67,165.24l1.31,-1.55l0.48,-1.57l0.5,-0.62l0.54,-1.45l0.11,-2.05l0.68,-1.35l0.92,-0.71l14.12,4.17l-0.3,5.66l-0.51,0.83l-0.13,-0.3l-0.65,-0.07l-0.34,0.44l-0.56,1.46l-0.46,2.72l0.26,1.55l0.63,0.61l1.06,0.15l1.23,-0.43l2.46,0.29l0.66,1.87l-0.2,4.55l0.29,0.47l-0.54,0.44l0.27,0.81l-0.72,0.74l0.03,0.35l0.43,0.22l-0.21,0.6l0.48,0.6l-0.17,3.8l0.59,0.52l-0.36,1.36l-1.14,1.82l-0.11,0.94l-1.36,0.07l0.09,1.21l0.64,0.83l-0.82,0.56l-0.18,1.15l1.05,0.77l-0.31,0.29l-0.17,-0.44l-0.53,-0.18l-0.5,0.22l-0.44,1.51l-1.28,0.61l-0.2,0.45l0.46,0.55l0.8,0.06l-0.66,1.26l-0.26,1.5l-0.68,0.65l0.19,0.48l0.4,0.04l-0.89,1.57l0.07,0.95l-1.56,1.66l-0.17,-1.65l0.33,-2.07l-0.11,-0.87l-0.58,-0.82l-0.89,-0.28l-1.11,0.34l-0.81,-0.35l-1.51,0.88l-0.31,-0.71l-1.62,-0.96l-1.0,0.04l-0.65,-0.71l-0.7,0.07l-3.24,-2.03l-0.06,-1.72l-1.02,-0.94l0.48,-0.68l0.0,-0.88l0.43,-0.83l-0.12,-0.73l0.51,-1.19l1.2,-1.16l2.6,-1.49l0.54,-0.86l-0.38,-0.85l0.5,-0.37l0.47,-1.44l1.24,-1.7l2.52,-2.22l0.18,-0.67l-0.47,-0.82l-4.26,-2.78l-0.75,-1.05l-0.9,0.24l-0.48,-0.33l-1.24,-2.46l-1.62,-0.02l-1.0,-3.45l1.02,-1.03l0.36,-2.23l-1.87,-1.91Z", "name": "New Jersey"}, "US-ME": {"path": "M837.04,56.27l0.86,-1.15l1.42,1.7l0.84,0.04l0.39,-2.12l-0.46,-2.19l1.7,0.36l0.73,-0.42l0.21,-0.52l-0.32,-0.7l-1.18,-0.47l-0.44,-0.62l0.19,-1.43l0.86,-2.02l2.08,-2.25l0.01,-0.98l-0.52,-0.93l1.02,-1.64l0.39,-1.51l-0.22,-0.91l-1.02,-0.35l-0.07,-1.42l-0.4,-0.43l0.55,-0.96l-0.04,-0.63l-1.0,-1.26l0.13,-1.73l0.37,-0.63l-0.15,-0.97l1.22,-1.93l-0.96,-6.17l5.58,-18.88l2.25,-0.23l1.15,3.18l0.55,0.43l2.54,0.56l1.83,-1.73l1.68,-0.83l1.24,-1.72l1.25,-0.12l0.64,-0.47l0.25,-1.43l0.42,-0.3l1.36,0.04l3.68,1.41l1.14,0.96l2.36,1.05l8.38,22.7l0.64,0.65l-0.25,0.95l0.72,1.02l-0.1,1.41l0.54,1.3l0.67,0.47l1.05,-0.12l1.12,0.58l0.97,0.1l2.47,-0.53l0.4,0.95l-0.59,1.42l1.69,1.86l0.28,2.69l2.72,1.68l0.98,-0.1l0.47,-0.74l-0.06,-0.5l1.21,0.25l2.95,2.8l0.04,0.47l-0.52,-0.14l-0.38,0.41l0.18,0.77l-0.76,-0.15l-0.35,0.4l0.15,0.63l1.84,1.62l0.16,-0.88l0.39,-0.17l0.8,0.32l0.27,-0.83l0.33,0.41l-0.31,0.85l-0.53,0.19l-1.21,3.24l-0.62,-0.04l-0.31,0.44l-0.55,-1.05l-0.72,0.03l-0.3,0.5l-0.56,0.06l-0.02,0.49l0.58,0.85l-0.91,-0.45l-0.32,0.63l0.26,0.52l-1.2,-0.28l-0.37,0.3l-0.37,0.78l0.08,0.45l0.44,0.08l0.07,1.21l-0.37,-0.57l-0.54,-0.06l-0.39,0.45l-0.2,1.09l-0.48,-1.53l-1.14,0.01l-0.68,0.75l-0.36,1.48l0.59,0.63l-0.83,0.63l-0.7,-0.46l-0.73,1.04l0.1,0.64l0.99,0.63l-0.35,0.21l-0.1,0.82l-0.45,-0.2l-0.85,-1.82l-1.03,-0.46l-0.39,0.22l-0.45,-0.41l-0.57,0.63l-1.25,-0.19l-0.26,0.86l0.78,0.4l0.01,0.37l-0.51,-0.06l-0.56,0.4l-0.09,0.69l-0.49,-1.02l-1.17,-0.02l-0.16,0.64l0.52,0.87l-1.44,0.96l0.84,1.11l0.08,1.06l0.53,0.65l-0.96,-0.41l-0.96,0.22l-1.2,-0.42l-0.17,-0.91l0.74,-0.28l-0.08,-0.55l-0.43,-0.5l-0.67,-0.12l-0.3,0.33l-0.23,-2.37l-0.37,-0.22l-1.1,0.26l0.04,1.96l-1.85,1.92l0.02,0.49l1.25,1.47l-0.64,0.96l-0.19,3.87l0.77,1.41l-0.57,0.53l0.0,0.63l-0.51,0.55l-0.8,-0.19l-0.45,0.93l-0.62,-0.06l-0.41,-1.15l-0.73,-0.21l-0.52,1.03l0.11,0.69l-0.45,0.59l0.12,2.41l-0.95,-1.01l0.14,-1.28l-0.24,-0.59l-0.81,0.29l-0.08,2.01l-0.44,-0.25l0.15,-1.55l-0.48,-0.4l-0.68,0.49l-0.76,3.04l-0.75,-1.84l0.07,-1.51l-0.77,0.05l-1.06,2.76l0.51,0.55l0.73,-0.25l0.91,2.04l-0.28,-0.59l-0.52,-0.23l-0.66,0.3l-0.07,0.64l-1.38,-0.1l-2.16,3.18l-0.53,1.86l0.29,0.6l-0.68,0.65l0.51,0.43l0.91,-0.21l0.37,0.92l-0.77,0.3l-0.2,0.39l-0.4,-0.04l-0.51,0.57l-0.14,1.03l0.67,1.37l-0.08,0.68l-0.79,1.29l-0.94,0.61l-0.41,1.07l-0.1,1.28l0.44,0.9l-0.4,2.81l-0.8,-0.33l-0.41,0.6l-1.02,-0.76l-0.57,-1.86l-0.93,-0.37l-2.36,-1.99l-0.76,-3.45l-13.25,-35.55ZM863.92,80.85l0.09,0.26l-0.08,0.23l0.03,-0.29l-0.04,-0.2ZM865.33,81.07l0.47,0.7l-0.04,0.47l-0.32,-0.25l-0.1,-0.93ZM867.67,77.93l0.43,0.83l-0.16,0.14l-0.42,-0.19l0.16,-0.77ZM877.04,64.5l-0.14,0.2l-0.03,-0.24l0.17,0.04ZM873.08,74.84l0.01,0.02l-0.03,0.03l0.01,-0.06ZM882.73,63.41l0.04,-1.17l0.41,-0.66l-0.18,-0.44l0.4,-0.5l0.62,-0.11l1.54,1.36l-0.49,0.65l-1.08,0.04l-0.27,0.43l0.57,1.3l-0.99,-0.18l-0.14,-0.57l-0.44,-0.16ZM879.31,65.98l0.61,0.41l-0.35,0.29l0.15,0.96l-0.39,-0.63l0.19,-0.53l-0.21,-0.5ZM878.07,70.51l0.09,-0.01l0.48,-0.08l-0.25,0.46l-0.32,-0.37Z", "name": "Maine"}, "US-MD": {"path": "M740.69,219.66l-2.04,-10.06l19.85,-4.49l-0.66,1.29l-0.94,0.08l-1.55,0.81l0.16,0.7l-0.42,0.49l0.23,0.78l-1.04,0.09l-0.72,0.41l-1.48,0.03l-1.14,-0.39l0.21,-0.36l-0.3,-0.49l-1.11,-0.31l-0.47,1.8l-1.63,2.85l-1.37,-0.39l-1.03,0.62l-0.41,1.26l-1.6,1.93l-0.36,1.04l-0.88,0.45l-1.3,1.87ZM760.76,204.58l37.02,-9.15l8.22,26.4l0.48,0.26l8.48,-2.22l0.24,0.71l0.6,0.03l0.38,0.95l0.52,-0.05l-0.38,1.96l-0.12,-0.26l-0.47,0.06l-0.73,0.86l-0.17,2.7l-0.6,0.19l-0.36,0.71l-0.02,1.47l-3.64,1.51l-0.37,0.76l-2.25,0.43l-0.56,0.65l-0.3,-1.09l0.5,-0.31l0.87,-1.85l-0.4,-0.51l-0.45,0.12l0.08,-0.5l-0.44,-0.42l-2.29,0.63l0.3,-0.6l1.15,-0.83l-0.17,-0.69l-1.36,-0.18l0.38,-2.24l-0.18,-1.02l-0.91,0.16l-0.53,1.76l-0.34,-0.69l-0.62,-0.07l-0.44,0.47l-0.5,1.39l0.53,1.02l-2.87,-2.14l-0.43,-0.19l-0.61,0.36l-0.73,-0.76l0.37,-0.84l-0.04,-0.84l0.76,-0.6l-0.08,-1.35l2.08,0.1l0.89,-0.45l0.36,-0.9l-0.32,-1.42l-0.43,-0.05l-0.54,1.31l-0.39,0.09l-1.05,-0.72l0.06,-0.4l-0.52,-0.28l-0.55,0.23l-0.22,-0.68l-0.73,0.1l-0.12,0.28l0.07,-0.74l0.65,-0.01l0.49,-0.37l0.22,-1.04l-0.54,-0.55l-0.57,0.71l-0.2,-0.53l0.88,-0.87l-0.25,-0.65l-0.54,-0.08l-0.09,-0.48l-0.42,-0.27l-0.35,0.15l-0.66,-0.53l0.89,-0.8l-0.24,-1.03l0.94,-2.38l-0.17,-0.43l-0.46,0.02l-0.66,0.66l-0.56,-0.16l-0.61,0.95l-0.74,-0.6l0.49,-3.59l0.6,-0.52l0.06,-0.61l4.22,-1.21l0.12,-0.7l-0.51,-0.3l-2.38,0.43l0.76,-1.27l1.42,-0.05l0.35,-0.5l-0.99,-0.67l0.44,-1.9l-0.63,-0.32l-1.2,1.82l0.05,-1.5l-0.59,-0.34l-0.68,1.1l-1.62,0.67l-0.31,1.65l0.39,0.54l0.65,0.12l-1.45,1.92l-0.2,-1.64l-0.64,-0.42l-0.61,0.73l0.07,1.45l-0.85,-0.29l-1.16,0.64l0.02,0.71l1.01,0.27l-0.37,0.54l-0.83,0.22l-0.05,0.34l-0.44,-0.04l-0.35,0.64l1.15,1.2l-1.88,-0.67l-1.21,0.59l0.16,0.69l1.56,0.58l0.91,0.93l0.72,-0.12l0.56,0.75l-0.98,-0.07l-1.15,1.36l0.32,0.77l1.57,0.92l-0.67,0.12l-0.21,0.41l0.8,1.08l-0.32,0.56l0.32,0.97l0.58,0.45l-0.52,1.09l0.99,1.25l0.96,3.54l0.61,0.84l2.07,1.63l0.42,0.81l-0.58,0.17l-0.64,-0.75l-1.45,-0.31l-1.64,-1.26l-1.33,-3.16l-0.73,-0.68l-0.3,0.37l0.11,0.7l1.28,3.54l1.14,1.31l2.05,0.74l1.03,1.11l0.64,0.14l0.91,-0.36l-0.03,1.11l1.66,1.54l0.1,1.1l-0.89,-0.35l-0.51,-1.29l-0.63,-0.45l-0.45,0.04l-0.13,0.44l0.27,0.79l-0.67,0.09l-0.65,-0.82l-1.41,-0.67l-2.39,0.63l-0.7,-0.67l-0.71,-1.49l-1.26,-0.71l-0.46,0.14l0.01,0.48l1.13,1.84l-0.22,-0.08l-1.62,-1.2l-1.66,-2.28l-0.45,-0.02l-0.37,1.44l-0.32,-0.79l-0.74,0.2l-0.21,0.27l0.33,0.72l-0.11,0.56l-0.76,0.53l-0.94,-1.5l0.07,-1.68l0.76,-0.6l-0.19,-0.74l0.78,-0.47l0.21,-1.61l1.07,-1.03l-0.0,-1.03l-0.46,-0.86l1.27,-2.19l-0.14,-0.54l-2.72,-1.68l-0.56,0.14l-0.63,1.08l-1.87,-0.26l-0.52,-0.83l-1.11,-0.51l-2.41,0.07l-1.25,-0.91l0.61,-1.35l-0.4,-0.97l-1.19,-0.3l-0.89,-0.66l-2.69,0.07l-0.36,-0.23l-0.11,-1.26l-1.04,-0.6l0.09,-1.2l-0.51,-0.29l-0.49,0.19l-0.23,-0.64l-0.52,-0.13l0.26,-0.83l-0.45,-0.58l-0.69,-0.12l-1.81,0.67l-2.24,-1.27ZM790.04,212.1l1.14,0.18l0.3,0.17l-0.52,0.29l-0.93,-0.63ZM803.05,225.67l-0.02,0.33l-0.21,-0.15l0.23,-0.19ZM807.02,229.13l-0.16,0.3l-0.13,0.07l0.02,-0.24l0.26,-0.12ZM797.57,220.61l-0.06,0.01l-0.09,0.03l0.12,-0.07l0.03,0.02ZM797.24,220.74l-0.26,0.56l-0.18,0.12l0.15,-0.61l0.29,-0.07ZM795.94,216.76l-0.29,0.29l-0.72,-0.27l0.02,-0.33l0.26,-0.36l0.72,0.67ZM794.58,212.85l-0.34,0.78l-0.59,0.23l0.02,-1.48l0.92,0.47ZM802.18,228.89l0.1,-0.11l0.12,0.08l-0.22,0.03Z", "name": "Maryland"}, "US-AR": {"path": "M498.73,376.99l-1.42,-38.01l-4.48,-23.98l37.68,-2.58l39.02,-3.58l0.8,1.6l1.01,0.7l0.11,1.77l-0.77,0.57l-0.22,0.94l-1.42,0.93l-0.29,1.04l-0.83,0.54l-1.19,2.59l0.02,0.7l0.53,0.26l10.94,-1.46l0.86,0.93l-1.18,0.37l-0.52,0.96l0.25,0.49l0.84,0.41l-3.6,2.7l0.02,0.84l0.83,1.04l-0.6,1.15l0.62,0.97l-1.42,0.74l-0.11,1.44l-1.45,2.09l0.12,1.64l0.91,3.1l-0.15,0.27l-1.08,-0.01l-0.33,0.26l-0.51,1.73l-1.52,0.95l-0.04,0.51l0.79,0.91l0.05,0.65l-1.11,1.21l-2.02,1.13l-0.21,0.62l0.43,1.0l-0.19,0.27l-1.23,0.03l-0.42,0.67l-0.32,1.89l0.47,1.57l0.02,3.08l-1.27,1.09l-1.54,0.13l0.23,1.49l-0.21,0.48l-0.93,0.25l-0.59,1.77l-1.49,1.19l-0.02,0.93l1.39,0.76l-0.03,0.7l-1.23,0.3l-2.24,1.23l0.03,0.67l0.99,0.82l-0.45,1.14l0.53,1.38l-1.09,0.62l-1.9,2.57l0.52,0.7l1.0,0.49l0.01,0.58l-0.98,0.29l-0.42,0.64l0.51,0.84l1.63,1.01l0.06,1.77l-0.59,0.98l-0.09,0.84l0.29,0.4l1.05,0.39l0.5,2.17l-1.09,1.01l0.06,2.11l-51.46,4.07l-0.83,-11.53l-1.18,-0.85l-0.9,0.16l-0.83,-0.35l-0.93,0.39l-1.22,-0.33l-0.57,0.72l-0.47,0.01l-0.49,-0.48l-0.82,-0.15l-0.63,-1.0Z", "name": "Arkansas"}, "US-MA": {"path": "M877.65,135.84l1.07,-0.19l0.85,-1.13l0.45,0.58l-1.06,0.64l-1.31,0.1ZM831.87,132.65l-0.46,-0.28l-10.4,2.53l-0.25,-0.18l-0.27,-14.8l29.99,-7.86l1.53,-1.8l0.34,-1.48l0.95,-0.35l0.61,-1.04l1.3,-1.08l1.23,-0.08l-0.44,1.05l1.36,0.55l-0.16,0.61l0.44,0.83l1.0,0.36l-0.06,0.32l0.39,0.28l1.31,0.19l-0.16,0.56l-2.52,1.87l-0.05,1.07l0.45,0.16l-1.11,1.41l0.23,1.08l-1.01,0.96l0.58,1.41l1.4,0.45l0.5,0.63l1.36,-0.57l0.33,-0.59l1.2,0.09l0.79,0.47l0.23,0.68l1.78,1.37l-0.07,1.25l-0.36,0.29l0.11,0.61l1.58,0.82l1.19,-0.14l0.68,1.2l0.22,1.14l0.89,0.68l1.33,0.41l1.48,-0.12l0.43,0.38l1.05,-0.23l3.35,-2.76l0.39,-0.69l0.54,0.02l0.56,1.86l-3.32,1.52l-0.94,0.82l-2.75,0.98l-0.49,1.65l-1.94,1.27l-0.81,-2.53l0.11,-1.35l-0.55,-0.31l-0.5,0.39l-0.93,-0.11l-0.3,0.51l0.25,0.92l-0.26,0.79l-0.4,0.06l-0.63,1.1l-0.6,-0.2l-0.5,0.48l0.22,1.86l-0.9,0.87l-0.63,-0.8l-0.47,0.01l-0.11,0.55l-0.26,0.03l-0.7,-2.02l-1.02,-0.35l0.44,-2.5l-0.21,-0.4l-0.77,0.4l-0.29,1.47l-0.69,0.2l-1.4,-0.64l-0.78,-2.12l-0.8,-0.22l-0.78,-2.15l-0.49,-0.24l-6.13,2.0l-0.3,-0.15l-14.84,4.19l-0.28,0.5ZM860.89,110.08l-0.02,-0.37l-0.14,-0.48l0.51,0.23l-0.35,0.62ZM876.37,122.8l-0.42,-0.66l0.06,-0.05l0.44,0.67l-0.09,0.05ZM875.46,121.25l-0.86,-0.11l-0.94,-1.42l1.44,1.0l0.36,0.54ZM871.54,119.46l-0.06,0.25l-0.35,-0.2l0.13,0.02l0.29,-0.07ZM871.87,135.18l0.01,-0.02l0.01,0.04l-0.02,-0.02ZM867.18,137.63l0.78,-0.56l0.28,-1.17l0.84,-1.19l0.17,0.26l0.46,-0.11l0.34,0.52l0.71,-0.01l0.19,0.38l-2.11,0.73l-1.34,1.31l-0.33,-0.17Z", "name": "Massachusetts"}, "US-AL": {"path": "M608.66,337.47l25.17,-2.91l19.4,-2.75l14.04,43.3l0.79,1.4l0.22,1.05l1.17,1.59l0.59,1.87l2.24,2.5l0.92,1.8l-0.11,2.13l1.8,1.13l-0.17,0.74l-0.63,0.1l-0.16,0.7l-0.98,0.84l-0.22,2.29l0.25,1.48l-0.77,2.3l-0.14,1.84l1.1,2.94l1.21,1.52l0.53,1.6l-0.08,5.02l-0.25,0.81l0.48,2.03l1.35,1.16l1.14,2.07l-47.65,6.92l-0.42,0.61l-0.08,2.99l2.64,2.75l2.0,0.97l-0.34,2.7l0.56,1.6l0.43,0.39l-0.94,1.69l-1.24,1.0l-1.13,-0.75l-0.34,0.49l0.66,1.46l-2.82,1.05l0.29,-0.64l-0.45,-0.86l-0.99,-0.77l-0.1,-1.11l-0.57,-0.22l-0.53,0.61l-0.32,-0.1l-0.89,-1.53l0.41,-1.67l-0.97,-2.21l-0.46,-0.45l-0.86,-0.2l-0.3,-0.89l-0.56,-0.17l-0.37,0.61l0.14,0.35l-0.77,3.1l-0.01,5.08l-0.59,0.0l-0.24,-0.71l-2.22,-0.44l-1.65,0.31l-5.46,-31.99l-0.99,-66.49l-0.02,-0.37l-1.07,-0.63l-0.69,-1.02Z", "name": "Alabama"}, "US-MO": {"path": "M468.68,225.54l24.71,-0.73l18.94,-1.43l22.11,-2.58l0.42,0.35l0.39,0.91l2.43,1.65l0.29,0.74l1.21,0.87l-0.51,1.37l-0.1,3.21l0.78,3.65l0.95,1.44l0.03,1.59l1.11,1.37l0.46,1.55l4.96,4.1l1.06,1.69l4.93,3.31l0.7,1.15l0.27,1.62l0.5,0.82l-0.18,0.69l0.47,1.8l0.97,1.63l0.77,0.73l1.04,0.16l0.83,-0.56l0.84,-1.4l0.57,-0.19l2.41,0.61l1.68,0.76l0.84,0.77l-0.97,1.95l0.26,2.28l-2.37,6.86l0.01,1.02l0.7,1.92l4.67,4.05l1.99,1.05l1.46,0.09l1.66,1.31l1.91,0.8l1.51,2.11l2.04,0.83l0.42,2.96l1.72,2.9l-1.1,1.94l0.18,1.38l0.75,0.33l2.31,4.25l1.94,0.92l0.55,-0.32l0.0,-0.65l0.87,1.1l1.07,-0.08l0.14,1.85l-0.37,1.07l0.53,1.6l-1.07,3.86l-0.51,0.07l-1.37,-1.13l-0.65,0.13l-0.78,3.34l-0.52,0.74l0.13,-1.06l-0.56,-1.09l-0.97,-0.2l-0.74,0.63l0.02,1.05l0.53,0.66l-0.04,0.7l0.58,1.34l-0.2,0.4l-1.2,0.39l-0.17,0.41l0.15,0.55l0.86,0.84l-1.71,0.37l-0.14,0.62l1.53,1.97l-0.89,0.75l-0.63,2.13l-10.61,1.42l1.06,-2.28l0.87,-0.61l0.18,-0.87l1.44,-0.96l0.25,-0.96l0.63,-0.37l0.29,-0.59l-0.22,-2.28l-1.05,-0.75l-0.2,-0.77l-1.09,-1.18l-39.24,3.61l-37.72,2.58l-3.21,-58.2l-1.03,-0.63l-1.2,-0.02l-1.52,-0.73l-0.19,-0.93l-0.76,-0.59l-0.34,-0.71l-0.36,-1.55l-0.55,-0.09l-0.3,-0.56l-1.13,-0.66l-1.4,-1.84l0.73,-0.51l0.09,-1.24l1.12,-1.27l0.09,-0.79l1.01,0.16l0.56,-0.43l-0.2,-2.24l-1.02,-0.74l-0.32,-1.1l-1.17,-0.01l-1.31,0.96l-0.81,-0.7l-0.73,-0.17l-2.67,-2.35l-1.05,-0.28l0.13,-1.6l-1.32,-1.72l0.1,-1.02l-0.37,-0.36l-1.01,-0.18l-0.59,-0.85l-0.84,-0.26l0.07,-0.53l-1.24,-2.88l-0.0,-0.74l-0.4,-0.49l-0.85,-0.29l-0.05,-0.54ZM583.77,294.59l-0.1,-0.1l-0.08,-0.15l0.11,-0.01l0.07,0.26Z", "name": "Missouri"}, "US-MN": {"path": "M439.34,42.76l26.81,-1.05l0.34,1.46l1.28,0.84l1.79,-0.5l1.05,-1.43l0.78,-0.31l2.13,2.19l1.71,0.28l0.31,1.2l1.83,1.4l1.79,0.48l2.64,-0.41l0.39,0.85l0.67,0.4l5.12,0.01l0.37,0.23l0.54,1.59l0.71,0.61l4.27,-0.78l0.77,-0.65l0.07,-0.69l2.43,-0.79l3.97,-0.02l1.42,0.7l3.39,0.66l-1.01,0.79l0.0,0.82l1.18,0.54l2.23,-0.16l0.52,2.08l1.58,2.29l0.71,0.05l1.03,-0.78l-0.04,-1.73l2.67,-0.46l1.43,2.17l2.01,0.79l1.54,0.18l0.54,0.57l-0.03,0.83l0.58,0.35l1.32,0.06l0.38,0.83l1.43,-0.19l1.12,0.22l2.22,-0.85l2.78,-2.55l2.49,-1.54l1.24,2.52l0.96,0.51l2.23,-0.66l0.87,0.36l5.98,-1.3l0.56,0.18l1.32,1.64l1.24,0.59l0.62,-0.01l1.61,-0.83l1.35,0.08l-0.93,1.03l-4.69,3.07l-6.35,2.82l-3.68,2.48l-2.15,2.49l-0.95,0.58l-6.63,8.66l-0.95,0.61l-1.08,1.56l-1.96,1.96l-4.17,3.55l-0.86,1.79l-0.55,0.44l-0.14,0.96l-0.78,-0.01l-0.46,0.51l0.98,12.22l-0.79,1.2l-1.05,0.08l-0.52,0.82l-0.83,0.15l-0.61,0.83l-2.06,1.19l-0.94,1.86l0.06,0.72l-1.69,2.39l-0.01,2.06l0.38,0.91l2.15,0.39l1.42,2.49l-0.52,1.92l-0.71,1.25l-0.05,2.12l0.45,1.32l-0.71,1.23l0.91,3.14l-0.51,4.08l3.95,3.03l3.02,0.4l1.89,2.25l2.87,0.5l2.45,1.93l2.39,3.59l2.64,1.8l2.09,0.09l1.07,0.71l0.88,0.1l0.82,1.36l1.03,0.45l0.23,0.39l0.28,2.03l0.68,1.3l0.39,4.82l-40.63,3.2l-40.63,2.09l-1.46,-38.98l-0.7,-1.27l-0.83,-0.78l-2.57,-0.79l-0.94,-1.91l-1.46,-1.79l0.21,-0.68l2.83,-2.34l0.97,-2.12l0.4,-2.44l-0.35,-1.58l0.23,-1.58l-0.18,-1.79l-0.5,-1.03l-0.18,-2.33l-1.81,-2.59l-0.47,-1.13l-0.21,-2.16l-0.66,-0.98l0.15,-1.66l-0.35,-1.52l0.53,-2.69l-1.08,-1.85l-0.49,-8.33l-0.42,-0.79l0.06,-3.92l-1.58,-3.96l-0.53,-0.65l-0.4,-1.37l0.05,-1.19l-0.48,-0.53l-1.36,-3.77l0.0,-3.22l-0.47,-1.97l0.27,-1.12l-0.57,-2.32l0.73,-2.56l-2.06,-6.9ZM468.97,33.61l1.22,0.46l0.99,-0.2l0.33,0.45l-0.05,1.72l-1.78,1.12l-0.15,-0.47l-0.4,-0.14l-0.16,-2.95Z", "name": "Minnesota"}, "US-CA": {"path": "M2.95,175.4l0.78,-1.24l0.46,0.46l0.59,-0.08l0.52,-1.18l0.8,-0.86l1.3,-0.26l0.56,-0.53l-0.15,-0.71l-0.93,-0.32l1.53,-2.79l-0.3,-1.58l0.14,-0.87l2.04,-3.3l1.31,-3.03l0.36,-2.12l-0.28,-1.0l0.16,-3.11l-1.36,-2.16l1.18,-1.38l0.67,-2.53l32.73,8.13l32.58,7.34l-13.67,64.68l25.45,34.66l36.6,51.1l13.3,17.72l-0.19,2.73l0.73,0.94l0.21,1.71l0.85,0.63l0.81,2.56l-0.07,0.91l0.63,1.46l-0.16,1.36l3.8,3.82l0.01,0.5l-1.95,1.53l-3.11,1.26l-1.2,1.99l-1.72,1.14l-0.33,0.81l0.38,1.03l-0.51,0.51l-0.1,0.9l0.08,2.29l-0.6,0.72l-0.64,2.44l-2.02,2.47l-1.6,0.14l-0.42,0.51l0.33,0.89l-0.59,1.34l0.54,1.12l-0.01,1.19l-0.78,2.68l0.57,1.02l2.74,1.13l0.34,0.83l-0.19,2.4l-1.18,0.78l-0.42,1.37l-2.27,-0.62l-1.25,0.6l-43.38,-3.34l0.17,-1.15l0.67,-0.51l-0.17,-1.06l-1.17,-1.38l-1.04,-0.15l0.23,-1.2l-0.28,-1.07l0.78,-1.33l-0.3,-4.25l-0.6,-2.3l-1.92,-4.07l-3.56,-4.07l-1.29,-1.98l-2.42,-2.11l-2.04,-3.01l-2.22,-0.89l-0.94,0.3l-0.39,0.96l-0.62,-0.73l-0.88,-0.22l-0.15,-0.31l0.61,-0.76l0.17,-1.57l-0.44,-2.06l-1.01,-1.95l-1.0,-0.74l-4.44,-0.19l-3.33,-1.81l-1.36,-1.26l-0.7,-0.12l-1.02,-1.19l-0.44,-2.6l-0.97,-0.47l-1.68,-2.31l-2.19,-1.73l-1.24,-0.41l-1.66,0.37l-1.15,-1.01l-1.25,0.03l-2.48,-1.83l-1.06,0.01l-1.49,-0.69l-4.91,-0.52l-1.12,-2.35l-1.43,-0.76l1.34,-2.45l-0.25,-1.36l0.74,-1.99l-0.63,-1.35l1.27,-2.45l0.33,-2.44l-0.99,-1.24l-1.26,-0.23l-1.4,-1.28l0.41,-1.62l0.79,-0.09l0.25,-0.45l-0.47,-2.2l-0.65,-0.77l-1.47,-0.84l-1.78,-3.97l-1.82,-1.25l-0.36,-2.75l-1.61,-2.58l0.07,-1.39l-0.33,-1.26l-1.16,-0.94l-0.74,-2.95l-2.41,-2.69l-0.55,-1.25l-0.02,-4.63l0.59,-0.57l-0.59,-1.14l0.51,-0.59l0.53,0.61l0.78,-0.02l0.84,-0.81l0.56,-1.33l0.8,0.04l0.21,-0.88l-0.43,-0.27l0.47,-1.19l-1.22,-3.68l-0.62,-0.48l-1.05,0.08l-1.93,-0.51l-1.04,-1.06l-1.89,-3.21l-0.8,-2.28l0.86,-2.39l0.09,-1.11l-0.27,-2.38l-0.32,-0.64l-0.54,-0.24l0.25,-1.19l0.69,-1.07l0.24,-2.71l0.47,-0.64l0.88,0.13l0.18,0.94l-0.7,2.13l0.05,1.15l1.18,1.32l0.55,0.1l0.58,1.28l1.16,0.78l0.4,1.01l0.89,0.41l0.83,-0.21l-0.21,-1.45l-0.65,-0.43l-0.18,-0.58l-0.24,-3.57l-0.56,-0.71l0.26,-0.69l-1.48,-1.06l0.5,-1.07l0.09,-1.06l-1.2,-1.58l0.78,-0.74l0.79,0.06l1.24,-0.73l1.25,1.02l1.87,-0.32l5.55,2.41l0.61,-0.09l0.64,-1.38l0.69,-0.04l1.92,2.53l0.25,0.18l0.63,-0.24l0.02,-0.38l-0.39,-0.93l-1.57,-1.89l-1.66,-0.32l0.27,-0.62l-0.28,-0.54l-0.48,0.09l-1.05,1.01l-1.84,-0.22l-0.43,0.28l-0.15,-0.51l-1.05,-0.4l0.24,-1.05l-0.85,-0.47l-1.0,0.28l-0.6,0.84l-1.09,0.4l-1.35,-0.9l-0.39,-0.88l-1.51,-1.44l-0.58,0.03l-0.64,0.61l-0.92,-0.12l-0.48,0.36l-0.33,1.88l0.21,0.78l-0.76,1.36l0.36,0.65l-0.47,0.59l-0.04,0.69l-2.16,-2.89l-0.44,-0.15l-0.25,0.32l-0.73,-1.0l-0.21,-1.03l-1.2,-1.17l-0.4,-1.05l-0.61,-0.18l0.65,-1.48l0.11,0.95l0.76,1.49l0.44,0.25l0.33,-0.38l-1.45,-5.21l-1.08,-1.42l-0.31,-2.68l-2.5,-2.87l-1.8,-4.48l-3.05,-5.54l1.09,-1.7l0.25,-1.97l-0.46,-2.11l-0.14,-3.61l1.34,-2.92l0.7,-0.74l-0.07,-1.54l0.42,-1.53l-0.41,-1.63l0.11,-1.96l-1.41,-4.06l-0.97,-1.15l0.06,-0.8l-0.42,-1.19l-2.91,-4.03l0.51,-1.35l-0.21,-2.69l2.23,-3.44ZM31.5,240.45l-0.06,0.1l-0.34,0.04l0.21,-0.05l0.19,-0.09ZM64.32,351.64l0.27,0.13l0.19,0.18l-0.31,-0.18l-0.15,-0.13ZM65.92,352.88l1.32,0.84l0.76,1.73l-0.89,-0.66l-1.14,0.03l-0.05,-1.94ZM62.72,363.08l1.36,2.08l0.57,0.53l-0.46,0.06l-0.83,-0.79l-0.65,-1.88ZM43.54,333.81l0.88,0.73l1.37,0.36l1.36,1.0l-2.82,-0.18l-0.71,-0.58l0.24,-0.66l-0.32,-0.67ZM47.89,335.89l0.94,-0.5l0.32,0.36l-0.37,0.14l-0.88,-0.0ZM46.05,352.4l0.29,-0.06l0.95,0.92l-0.61,-0.17l-0.64,-0.69ZM37.57,334.04l2.57,0.16l0.2,0.74l0.6,0.45l-1.21,0.64l-1.17,-0.1l-0.49,-0.44l-0.5,-1.44ZM34.94,332.37l0.06,-0.02l0.05,0.06l-0.01,-0.0l-0.1,-0.04Z", "name": "California"}, "US-IA": {"path": "M452.9,162.25l42.83,-2.19l40.56,-3.19l0.96,2.52l2.0,1.0l0.08,0.59l-0.9,1.8l-0.16,1.04l0.9,5.09l0.92,1.26l0.39,1.75l1.46,1.72l4.95,0.85l1.27,2.03l-0.3,1.03l0.29,0.66l3.61,2.37l0.85,2.41l3.84,2.31l0.62,1.68l-0.31,4.21l-1.64,1.98l-0.5,1.94l0.13,1.28l-1.26,1.36l-2.51,0.97l-0.89,1.18l-0.55,0.25l-4.56,0.83l-0.89,0.73l-0.61,1.71l-0.15,2.56l0.4,1.08l2.01,1.47l0.54,2.65l-1.87,3.25l-0.22,2.24l-0.53,1.42l-2.88,1.39l-1.02,1.02l-0.2,0.99l0.72,0.87l0.2,2.15l-0.58,0.23l-1.34,-0.82l-0.31,-0.76l-1.29,-0.82l-0.29,-0.51l-0.88,-0.36l-0.3,-0.82l-0.95,-0.68l-22.3,2.61l-15.13,1.17l-7.59,0.51l-20.78,0.47l-0.22,-1.06l-1.3,-0.73l-0.33,-0.67l0.58,-1.16l-0.21,-0.95l0.22,-1.39l-0.36,-2.19l-0.6,-0.73l0.07,-3.65l-1.05,-0.5l0.05,-0.91l0.71,-1.02l-0.05,-0.44l-1.31,-0.56l0.33,-2.54l-0.41,-0.45l-0.89,-0.16l0.23,-0.8l-0.3,-0.58l-0.51,-0.25l-0.74,0.23l-0.42,-2.81l0.5,-2.36l-0.2,-0.67l-1.36,-1.71l-0.08,-1.92l-1.78,-1.54l-0.36,-1.74l-1.09,-0.94l0.03,-2.18l-1.1,-1.87l0.21,-1.7l-0.27,-1.08l-1.38,-0.67l-0.42,-1.58l-0.45,-0.59l0.05,-0.63l-1.81,-1.82l0.56,-1.61l0.54,-0.47l0.73,-2.68l0.0,-1.68l0.55,-0.69l0.21,-1.19l-0.51,-2.24l-1.33,-0.29l-0.05,-0.73l0.45,-0.56l-0.0,-1.71l-0.95,-1.42l-0.05,-0.87Z", "name": "Iowa"}, "US-MI": {"path": "M612.24,185.84l1.83,-2.17l0.7,-1.59l1.18,-4.4l1.43,-3.04l1.01,-5.05l0.09,-5.37l-0.86,-5.54l-2.4,-5.18l0.61,-0.51l0.3,-0.79l-0.57,-0.42l-1.08,0.55l-3.82,-7.04l-0.21,-1.11l1.13,-2.69l-0.01,-0.97l-0.74,-3.13l-1.28,-1.65l-0.05,-0.62l1.73,-2.73l1.22,-4.14l-0.21,-5.34l-0.77,-1.6l1.09,-1.15l0.81,-0.02l0.56,-0.47l-0.27,-3.49l1.08,-0.11l0.67,-1.43l1.19,0.48l0.65,-0.33l0.76,-2.59l0.82,-1.2l0.56,-1.68l0.55,-0.18l-0.58,0.87l0.6,1.65l-0.71,1.8l0.71,0.42l-0.48,2.61l0.88,1.42l0.73,-0.06l0.52,0.56l0.65,-0.24l0.89,-2.26l0.66,-3.52l-0.08,-2.07l-0.76,-3.42l0.58,-1.02l2.13,-1.64l2.74,-0.54l0.98,-0.63l0.28,-0.64l-0.25,-0.54l-1.76,-0.1l-0.96,-0.86l-0.52,-1.99l1.85,-2.98l-0.11,-0.73l1.72,-0.23l0.74,-0.94l4.16,2.0l0.83,0.13l1.98,-0.4l1.37,0.39l1.19,1.04l0.53,1.14l0.77,0.49l2.41,-0.29l1.7,1.02l1.92,0.09l0.8,0.64l3.27,0.45l1.1,0.78l-0.01,1.12l1.04,1.31l0.64,0.21l0.38,0.92l-0.16,0.54l-0.66,-0.25l-0.94,0.57l-0.23,1.83l0.81,1.29l1.6,0.99l0.69,1.37l0.65,2.26l-0.12,1.73l0.77,5.57l-0.14,0.6l-0.57,0.2l-0.48,0.96l-0.75,0.08l-0.79,0.81l-0.17,4.47l-1.12,0.49l-0.18,0.82l-1.86,0.43l-0.73,0.6l-0.58,2.61l0.26,0.45l-0.21,0.52l0.25,2.58l1.38,1.31l2.9,0.84l0.91,-0.07l1.08,-1.23l0.6,-1.44l0.62,0.19l0.38,-0.24l1.01,-3.59l0.6,-1.06l-0.08,-0.52l0.97,-1.45l1.39,-0.39l1.07,-0.69l0.83,-1.1l0.87,-0.44l2.06,0.59l1.13,0.7l1.0,1.09l1.21,2.16l2.0,5.91l0.82,1.6l1.03,3.71l1.49,3.63l1.27,1.73l-0.33,3.93l0.45,2.49l-0.48,2.79l-0.34,0.44l-0.24,-0.33l-0.31,-1.71l-1.46,-0.52l-0.47,0.08l-1.48,1.36l-0.06,0.83l0.55,0.67l-0.83,0.57l-0.29,0.79l0.28,2.94l-0.49,0.75l-1.62,0.92l-1.06,1.85l-0.43,3.73l0.27,1.55l-0.33,0.93l-0.42,0.19l0.02,0.91l-0.64,0.3l-0.37,1.08l-0.52,0.52l-0.5,1.28l-0.02,1.05l-0.52,0.78l-20.37,4.25l-0.14,-0.86l-0.46,-0.33l-31.6,4.74ZM621.47,115.87l0.0,-0.07l0.12,-0.12l-0.01,0.03l-0.11,0.16ZM621.73,114.95l-0.07,-0.16l0.07,-0.14l-0.0,0.3ZM543.48,88.04l4.87,-2.38l3.55,-3.62l5.77,-1.36l1.39,-0.84l2.36,-2.71l0.97,0.04l1.52,-0.73l1.0,-2.25l2.82,-2.84l0.23,1.72l1.85,0.59l0.05,1.45l0.66,0.14l0.51,0.6l-0.17,3.14l0.44,0.95l-0.34,0.47l0.2,0.47l0.74,-0.02l1.08,-2.21l1.08,-0.9l-0.42,1.15l0.59,0.45l0.82,-0.67l0.52,-1.22l1.0,-0.43l3.09,-0.25l1.51,0.21l1.18,0.93l1.54,0.44l0.47,1.05l2.31,2.58l1.17,0.55l0.53,1.55l0.73,0.34l1.87,0.07l0.73,-0.4l1.07,-0.06l0.52,-0.65l0.88,-0.43l1.0,1.11l1.1,0.64l1.02,-0.25l0.68,-0.82l1.87,1.06l0.64,-0.34l1.65,-2.59l2.81,-1.89l1.7,-1.65l0.91,0.11l3.27,-1.21l5.17,-0.25l4.49,-2.72l2.56,-0.37l-0.01,3.24l0.29,0.71l-0.36,1.1l0.67,0.85l0.66,0.11l0.71,-0.39l2.2,0.7l1.14,-0.43l1.03,-0.87l0.66,0.48l0.21,0.71l0.85,0.22l1.27,-0.8l0.95,-1.55l0.66,-0.02l0.84,0.75l1.98,3.78l-0.86,1.04l0.48,0.89l0.47,0.36l1.37,-0.42l0.58,0.46l0.64,0.04l0.18,1.2l0.98,0.87l1.53,0.52l-1.17,0.68l-4.96,-0.14l-0.53,0.29l-1.35,-0.17l-0.88,0.41l-0.66,-0.76l-1.63,-0.07l-0.59,0.47l-0.07,1.22l-0.49,0.75l0.38,2.05l-0.92,-0.22l-0.89,-0.92l-0.77,-0.13l-1.96,-1.65l-2.41,-0.6l-1.6,0.04l-1.04,-0.5l-2.89,0.47l-0.61,0.45l-1.18,2.52l-3.48,0.73l-0.58,0.77l-2.06,-0.34l-2.82,0.93l-0.68,0.83l-0.56,2.51l-0.78,0.28l-0.81,0.87l-0.65,0.28l0.16,-1.96l-0.75,-0.91l-1.02,0.34l-0.76,0.92l-0.97,-0.39l-0.68,0.17l-0.37,0.4l0.1,0.83l-0.73,2.01l-1.2,0.59l-0.11,-1.38l-0.46,-1.06l0.34,-1.69l-0.17,-0.37l-0.66,-0.17l-0.45,0.58l-0.6,2.12l-0.22,2.57l-1.12,0.91l-1.26,3.02l-0.62,2.66l-2.56,5.33l-0.69,0.74l0.12,0.91l-1.4,-1.28l0.18,-1.75l0.63,-1.69l-0.41,-0.81l-0.62,-0.31l-1.36,0.85l-1.16,0.09l0.04,-1.29l0.81,-1.45l-0.41,-1.34l0.3,-1.09l-0.58,-0.98l0.15,-0.83l-1.9,-1.55l-1.1,-0.06l-0.59,-0.44l-0.86,0.2l-0.62,-0.2l0.3,-1.36l-0.94,-1.45l-1.13,-0.51l-2.23,-0.1l-3.2,-0.71l-1.55,0.59l-1.43,-0.42l-1.62,0.17l-4.56,-1.94l-15.37,-2.5l-2.0,-3.4l-1.88,-0.96l-0.76,0.26l-0.1,-0.3ZM603.38,98.65l-0.01,0.52l-0.46,0.32l-0.7,1.39l0.08,0.57l-0.65,-0.58l0.91,-2.16l0.83,-0.06ZM643.87,87.47l1.99,-1.52l0.17,-0.57l-0.27,-0.64l1.05,0.16l0.8,1.24l0.81,0.19l-0.27,1.08l-0.36,0.19l-1.5,-0.34l-0.77,0.45l-1.63,-0.24ZM635.6,77.64l0.56,-0.83l0.52,0.05l-0.37,1.32l0.11,0.71l-0.35,-0.9l-0.46,-0.35ZM636.53,79.17l0.09,0.14l0.01,0.01l-0.02,-0.01l-0.08,-0.14ZM637.39,81.25l0.4,0.45l0.22,0.61l-0.63,-0.71l0.01,-0.34ZM633.73,93.13l1.41,0.25l0.36,-0.18l0.4,0.21l-0.17,0.52l-0.75,0.11l-1.24,-0.9ZM618.85,96.77l0.62,2.25l-0.8,0.78l-0.39,-0.27l0.56,-2.76ZM613.26,110.83l0.47,0.3l-0.09,0.57l-0.45,-0.69l0.06,-0.17ZM612.23,113.57l0.0,-0.03l0.02,-0.04l-0.03,0.07ZM599.41,82.64l-0.23,-0.37l0.03,-0.4l0.37,0.32l-0.17,0.45ZM570.51,72.75l-0.51,-0.27l-1.16,0.06l-0.04,-1.56l1.0,-1.03l1.17,-2.09l1.84,-1.49l0.63,-0.0l0.53,-0.58l2.08,-0.89l3.34,-0.42l1.1,0.66l-0.54,0.38l-1.31,-0.12l-2.27,0.78l-0.15,0.29l0.3,0.59l0.71,0.13l-1.19,0.98l-1.4,1.89l-0.7,0.29l-0.36,1.45l-1.15,1.37l-0.66,2.04l-0.67,-0.87l0.75,-0.97l0.14,-1.95l-0.63,-0.37l-0.21,0.15l-0.6,0.92l-0.05,0.67ZM558.28,58.21l0.75,-0.98l-0.39,-0.33l0.56,-0.53l4.62,-2.98l1.97,-1.72l0.62,-0.18l-0.45,0.65l0.1,0.79l-0.43,0.49l-4.25,2.56l-0.86,0.99l0.24,0.36l-1.87,1.17l-0.61,-0.28Z", "name": "Michigan"}, "US-GA": {"path": "M654.05,331.71l22.02,-3.57l20.65,-3.86l-1.48,1.42l-0.51,1.68l-0.66,0.82l-0.41,1.73l0.11,1.23l0.82,0.78l1.84,0.8l1.03,0.12l2.7,2.03l0.84,0.24l1.9,-0.37l0.6,0.25l0.8,1.64l1.51,1.6l1.04,2.5l1.33,0.82l0.84,1.16l0.56,0.26l1.0,1.77l1.07,0.3l1.17,0.99l3.81,1.85l2.41,3.16l2.25,0.58l2.53,1.67l0.5,2.34l1.25,1.02l0.47,-0.16l0.31,0.49l-0.1,0.62l0.79,0.73l0.79,0.09l0.56,1.21l4.99,1.89l0.4,1.78l1.54,1.73l1.02,2.01l-0.07,0.81l0.49,0.69l0.11,1.24l1.04,0.79l1.17,0.17l1.25,0.62l0.28,0.53l0.57,0.23l1.12,2.56l0.76,0.57l0.08,2.68l0.77,1.48l1.38,0.9l1.52,-0.27l1.44,0.76l1.45,0.11l-0.59,0.78l-0.56,-0.35l-0.47,0.28l-0.4,0.99l0.62,0.91l-0.38,0.48l-1.38,-0.16l-0.77,-0.55l-0.65,0.44l0.26,0.71l-0.49,0.52l0.36,0.61l0.94,-0.04l0.5,0.29l-0.58,1.35l-1.43,0.27l-1.33,-0.44l-0.44,0.39l0.34,0.85l1.23,0.35l-0.5,0.87l0.23,0.35l-0.2,0.64l0.83,0.64l-0.33,0.44l-0.72,-0.13l-0.96,0.51l-0.1,0.62l1.09,0.45l0.05,0.95l0.48,-0.07l1.2,-1.17l-0.92,2.31l-0.31,-0.58l-0.59,-0.08l-0.44,0.72l0.29,0.7l0.98,0.83l-2.32,0.04l-0.92,-0.28l-0.63,0.3l0.06,0.63l0.55,0.34l2.76,0.24l1.07,0.66l-0.02,0.34l-0.56,0.22l-0.88,1.95l-0.5,-1.41l-0.45,-0.13l-0.6,0.33l-0.15,0.84l0.34,0.96l-0.6,0.11l-0.03,0.84l-0.3,0.16l0.07,0.46l1.33,1.15l-1.09,1.03l0.32,0.47l0.77,0.07l-0.39,0.92l0.06,0.88l-0.46,0.51l1.1,1.66l0.03,0.76l-0.79,0.33l-2.64,-0.17l-4.06,-0.96l-1.31,0.35l-0.18,0.74l-0.68,0.26l-0.35,1.25l0.28,2.08l0.95,1.36l0.13,4.25l-1.97,0.4l-0.54,-0.92l-0.12,-1.3l-1.33,-1.82l-49.22,5.14l-0.72,-0.56l-0.86,-2.7l-0.94,-1.51l-0.56,-0.38l0.16,-0.68l-0.73,-1.51l-1.82,-1.81l-0.43,-1.75l0.25,-0.8l0.06,-5.18l-0.6,-1.81l-1.19,-1.47l-1.03,-2.65l0.12,-1.65l0.78,-2.36l-0.25,-1.53l0.19,-2.11l1.62,-1.33l0.46,-1.47l-0.55,-0.61l-1.42,-0.69l0.09,-2.15l-0.97,-1.87l-2.18,-2.42l-1.03,-2.81l-0.75,-0.68l-0.17,-0.96l-0.77,-1.37l-13.99,-43.12ZM745.21,389.83l0.7,-0.26l-0.07,0.82l-0.29,-0.33l-0.34,-0.24ZM743.75,406.73l0.05,0.87l-0.01,0.46l-0.34,-0.56l0.3,-0.76Z", "name": "Georgia"}, "US-AZ": {"path": "M128.39,384.21l0.44,-1.81l1.29,-1.29l0.54,-1.11l0.48,-0.25l1.66,0.62l0.96,-0.03l0.52,-0.46l0.28,-1.17l1.31,-1.0l0.24,-2.73l-0.46,-1.24l-0.84,-0.66l-2.07,-0.67l-0.3,-0.61l0.8,-2.4l0.0,-1.39l-0.52,-1.2l0.57,-0.86l-0.2,-0.87l1.57,-0.27l2.29,-2.81l0.65,-2.43l0.65,-0.81l0.02,-3.17l0.55,-0.62l-0.29,-1.43l1.71,-1.14l1.03,-1.85l3.16,-1.29l2.03,-1.58l0.26,-0.53l-0.13,-1.04l-3.25,-3.49l-0.51,-0.22l0.22,-1.26l-0.66,-1.46l0.07,-0.91l-0.88,-2.76l-0.84,-0.56l-0.19,-1.65l-0.69,-0.8l0.19,-3.54l0.58,-0.87l-0.3,-0.86l1.04,-0.4l0.4,-1.42l0.14,-3.2l-0.76,-3.66l0.47,-0.88l0.29,-1.67l-0.4,-3.0l0.85,-2.56l-0.8,-1.87l-0.03,-0.92l0.43,-0.52l0.34,-1.35l2.54,-0.63l1.75,0.99l1.43,-0.19l0.96,2.24l0.79,0.71l1.54,0.14l1.01,-0.5l1.02,-2.27l0.94,-1.19l2.57,-16.95l42.43,5.78l42.56,4.67l-11.82,123.66l-36.89,-4.05l-36.34,-18.98l-28.44,-15.56Z", "name": "Arizona"}, "US-MT": {"path": "M166.3,57.31l0.69,-0.1l0.33,-0.38l-0.9,-1.99l0.83,-0.96l-0.39,-1.3l0.09,-0.96l-1.24,-1.93l-0.24,-1.49l-1.03,-1.33l-1.19,-2.44l3.53,-20.65l43.66,6.71l43.06,5.23l42.75,3.84l43.15,2.53l-3.53,86.06l-28.11,-1.47l-26.82,-1.91l-26.78,-2.4l-25.84,-2.79l-0.44,0.35l-1.22,10.41l-1.51,-2.01l-0.03,-0.91l-1.19,-2.35l-1.25,-0.74l-1.8,0.92l0.03,1.05l-0.72,0.42l-0.34,1.56l-2.42,-0.41l-1.91,0.57l-0.92,-0.85l-3.36,0.09l-2.38,-0.96l-1.68,0.58l-0.84,1.49l-4.66,-1.6l-1.3,0.37l-1.12,0.9l-0.31,0.67l-1.65,-1.4l0.22,-1.43l-0.9,-1.71l0.4,-0.36l0.07,-0.62l-1.17,-3.08l-1.45,-1.25l-1.44,0.36l-0.21,-0.64l-1.08,-0.9l-0.41,-1.37l0.68,-0.61l0.2,-1.41l-0.77,-2.38l-0.77,-0.35l-0.31,-1.58l-1.51,-2.54l0.23,-1.51l-0.56,-1.26l0.34,-1.4l-0.73,-0.86l0.48,-0.98l-0.21,-0.74l-1.14,-0.75l-0.13,-0.59l-0.85,-0.91l-0.8,-0.4l-0.51,0.37l-0.07,0.74l-0.7,0.27l-1.13,1.22l-1.75,0.37l-1.21,1.07l-1.08,-0.85l-0.64,-1.01l-1.06,-0.44l0.02,-0.86l0.74,-0.63l0.24,-1.06l-0.61,-1.6l0.9,-1.09l1.07,-0.08l0.83,-0.8l-0.26,-1.14l0.38,-1.07l-0.95,-0.81l-0.04,-0.81l0.66,-1.28l-0.59,-1.07l0.74,-0.07l0.38,-0.42l-0.04,-1.77l1.83,-3.73l-0.14,-1.05l0.89,-0.62l0.6,-3.17l-0.78,-0.5l-1.8,0.37l-1.33,-0.11l-0.64,-0.55l0.37,-0.83l-0.62,-0.97l-0.66,-0.23l-0.72,0.35l-0.07,-0.95l-1.74,-1.63l0.04,-1.84l-1.68,-1.82l-0.08,-0.69l-1.55,-2.88l-1.07,-1.29l-0.57,-1.63l-2.35,-1.34l-0.95,-1.95l-1.44,-1.19Z", "name": "Montana"}, "US-MS": {"path": "M555.49,431.1l0.67,-0.97l-1.05,-1.76l0.18,-1.63l-0.81,-0.87l1.69,-0.25l0.47,-0.54l0.4,-2.74l-0.77,-1.82l1.56,-1.79l0.25,-3.58l0.74,-2.26l1.89,-1.25l1.15,-1.97l1.4,-1.04l0.34,-0.78l-0.04,-0.99l-0.63,-0.96l1.14,-0.28l0.96,-2.59l0.91,-1.31l-0.16,-0.86l-1.54,-0.43l-0.35,-0.96l-1.83,-1.04l-0.07,-2.14l-0.93,-0.74l-0.45,-0.84l-0.02,-0.37l1.14,-0.29l0.47,-0.69l-0.26,-0.89l-1.41,-0.49l0.23,-1.77l0.98,-1.54l-0.77,-1.06l-1.08,-0.31l-0.15,-2.82l0.9,-0.54l0.23,-0.8l-0.62,-2.52l-1.25,-0.66l0.7,-1.33l-0.07,-2.22l-2.02,-1.52l1.14,-0.47l0.12,-1.41l-1.34,-0.89l1.58,-2.04l0.93,-0.31l0.36,-0.69l-0.52,-1.56l0.42,-1.35l-0.9,-0.89l1.6,-0.83l1.24,-0.27l0.59,-0.77l-0.09,-1.07l-1.41,-0.95l1.39,-1.08l0.62,-1.77l0.5,0.11l0.45,-0.28l0.34,-0.98l-0.2,-0.77l1.48,-0.43l1.22,-1.21l0.07,-3.53l-0.46,-1.53l0.36,-1.78l0.73,0.09l0.68,-0.33l0.42,-0.87l-0.41,-1.06l2.72,-1.71l0.58,-1.06l-0.29,-1.28l36.45,-4.1l0.86,1.26l0.85,0.45l0.99,66.5l5.52,32.95l-0.73,0.69l-1.53,-0.3l-0.91,-0.94l-1.32,1.06l-1.23,0.17l-2.17,-1.26l-1.85,-0.19l-0.83,0.36l-0.34,0.44l0.32,0.41l-0.56,0.36l-3.96,1.66l-0.05,-0.5l-0.96,-0.52l-1.0,0.04l-0.59,1.0l0.76,0.61l-1.59,1.21l-0.32,1.28l-0.69,0.3l-1.34,-0.06l-1.16,-1.86l-0.08,-0.89l-0.92,-1.47l-0.21,-1.01l-1.4,-1.63l-1.16,-0.54l-0.47,-0.78l0.1,-0.62l-0.69,-0.92l0.21,-1.99l0.5,-0.93l0.66,-2.98l-0.06,-1.23l-0.43,-0.29l-34.66,3.41Z", "name": "Mississippi"}, "US-SC": {"path": "M697.56,324.11l4.86,-2.69l1.02,-0.05l1.11,-1.38l3.93,-1.9l0.45,-0.88l0.63,0.22l22.71,-3.36l0.07,1.22l0.42,0.57l0.71,0.01l1.21,-1.3l2.82,2.54l0.46,2.48l0.55,0.52l19.74,-3.49l22.74,15.07l0.02,0.55l-2.48,2.18l-2.44,3.67l-2.41,5.72l-0.09,2.74l-1.08,-0.21l0.85,-2.73l-0.64,-0.23l-0.76,0.87l-0.56,1.38l-0.11,1.55l0.84,0.95l1.05,0.23l0.44,0.91l-0.75,0.08l-0.41,0.56l-0.87,0.02l-0.24,0.68l0.94,0.45l-1.1,1.13l-0.07,1.02l-1.34,0.63l-0.5,-0.61l-0.5,-0.08l-1.07,0.87l-0.56,1.76l0.43,0.87l-1.2,1.23l-0.61,1.44l-1.2,1.01l-0.9,-0.4l0.27,-0.6l-0.53,-0.74l-1.38,0.31l-0.11,0.43l0.36,0.77l-0.52,0.03l0.05,0.76l0.72,0.58l1.3,0.43l-0.12,0.39l-0.88,0.94l-1.22,0.23l-0.25,0.51l0.33,0.45l-2.3,1.34l-1.42,-0.85l-0.56,0.11l-0.11,0.67l1.19,0.78l-1.54,1.57l-0.72,-0.75l-0.5,0.52l-0.0,0.74l-0.69,-0.37l-0.85,-0.0l-1.34,-0.84l-0.45,0.5l0.16,0.53l-1.73,0.17l-0.44,0.37l-0.06,0.77l0.65,0.23l1.43,-0.17l-0.26,0.55l0.42,0.25l1.91,-0.15l0.11,0.22l-0.97,0.86l-0.32,0.78l0.57,0.49l0.94,-0.53l0.03,0.21l-1.12,1.09l-0.99,0.43l-0.21,-2.04l-0.69,-0.27l-0.22,-1.55l-0.88,-0.15l-0.31,0.58l0.86,2.7l-1.12,-0.66l-0.63,-1.0l-0.4,-1.76l-0.65,-0.2l-0.52,-0.63l-0.69,0.0l-0.27,0.6l0.84,1.02l0.01,0.68l1.11,1.83l-0.02,0.86l1.22,1.17l-0.62,0.35l0.03,0.98l-1.2,3.56l-1.52,-0.78l-1.52,0.26l-0.97,-0.68l-0.54,-1.03l-0.17,-2.93l-0.86,-0.75l-1.06,-2.47l-1.04,-0.95l-3.23,-1.33l-0.49,-2.65l-1.12,-2.17l-1.43,-1.58l-0.06,-1.07l-0.76,-1.21l-4.82,-1.69l-0.58,-1.27l-1.21,-0.37l0.02,-0.7l-0.53,-0.87l-0.87,0.0l-0.73,-0.61l0.03,-1.21l-0.66,-1.26l-2.7,-1.78l-2.16,-0.52l-2.36,-3.12l-3.93,-1.93l-1.22,-1.03l-0.83,-0.12l-1.05,-1.81l-0.51,-0.22l-0.91,-1.21l-1.18,-0.68l-0.99,-2.42l-1.54,-1.65l-1.02,-1.87l-1.06,-0.37l-1.93,0.37l-0.46,-0.16l-2.75,-2.19l-1.06,0.02l-1.7,-0.74l-0.52,-0.53l0.36,-2.22l0.64,-0.78l0.34,-1.39l1.36,-1.23l0.4,-0.98ZM750.38,375.27l0.73,-0.08l0.51,0.45l-1.23,1.9l0.28,-1.22l-0.3,-1.06Z", "name": "South Carolina"}, "US-RI": {"path": "M859.15,133.1l0.33,0.01l1.02,2.65l-0.31,0.56l-1.04,-3.22ZM858.41,136.77l-0.28,-0.34l0.24,-1.5l0.41,1.53l-0.37,0.31ZM851.13,141.49l0.22,-0.46l-0.53,-2.22l-3.14,-10.0l5.61,-1.84l0.76,2.06l0.8,0.25l0.19,0.73l0.08,0.41l-0.77,0.25l0.03,0.29l0.51,1.45l0.59,0.5l-0.6,0.15l-0.46,0.73l0.87,0.97l-0.14,1.22l0.94,2.18l-0.32,2.08l-1.33,0.23l-3.15,2.19l-0.16,-1.21ZM855.93,131.57l0.26,0.1l0.01,0.09l-0.17,-0.08l-0.1,-0.11ZM857.32,132.24l0.23,0.48l-0.2,0.31l-0.04,-0.39l0.01,-0.4ZM855.92,145.03l0.11,0.11l-0.18,0.1l-0.03,-0.14l0.11,-0.07Z", "name": "Rhode Island"}, "US-CT": {"path": "M823.44,156.54l2.83,-3.23l-0.07,-0.54l-1.31,-1.25l-3.5,-15.89l9.81,-2.41l0.6,0.46l0.65,-0.26l0.23,-0.58l14.16,-4.0l3.2,10.18l0.47,1.96l-0.04,1.69l-1.65,0.32l-0.91,0.81l-0.69,-0.36l-0.5,0.11l-0.18,0.91l-1.15,0.07l-1.27,1.27l-0.62,-0.14l-0.56,-1.02l-0.89,-0.09l-0.21,0.67l0.75,0.64l0.08,0.54l-0.89,-0.02l-1.02,0.87l-1.65,0.07l-1.15,0.94l-0.86,-0.09l-2.05,0.82l-0.4,-0.68l-0.61,0.11l-0.89,2.12l-0.59,0.29l-0.83,1.29l-0.79,-0.05l-0.94,0.74l-0.2,0.63l-0.53,0.05l-0.88,0.75l-2.77,3.07l-0.96,0.27l-1.24,-1.04Z", "name": "Connecticut"}}, "height": 589.0572567800147, "projection": {"type": "aea", "centralMeridian": -100.0}, "width": 900.0});
},{}],"/Code/html/themes/themekit/lib/maps/js/vector/custom/jquery-jvectormap-us-lcc-en.js":[function(require,module,exports){
$.fn.vectorMap('addMap', 'us_lcc_en',{"insets": [{"width": 220, "top": 440, "height": 166.21110208955304, "bbox": [{"y": -9267552.531674266, "x": -5155290.453049837}, {"y": -6764289.41437011, "x": -1841926.4305298943}], "left": 0}, {"width": 80, "top": 460, "height": 143.83286142212137, "bbox": [{"y": -4795881.348142953, "x": -6003393.3393215705}, {"y": -4216840.972769757, "x": -5681330.4284412395}], "left": 245}, {"width": 900.0, "top": 0, "height": 551.9026719088881, "bbox": [{"y": -5998757.84041658, "x": -2034551.3272073334}, {"y": -3186864.9120395407, "x": 2550865.204273278}], "left": 0}], "paths": {"US-VA": {"path": "M684.15,290.12l1.59,-0.92l1.65,-0.49l1.11,-0.95l3.57,-1.7l0.73,-2.31l0.83,-0.2l2.32,-1.54l0.04,-1.79l2.04,-1.86l-0.13,-1.56l0.25,-0.41l5.0,-4.09l4.74,-5.97l0.1,0.61l0.97,0.52l0.34,1.35l1.33,0.71l0.71,0.79l1.47,0.07l2.1,1.08l1.41,-0.11l0.79,-0.41l0.76,-1.22l1.18,-0.57l0.53,-1.36l2.74,1.43l1.42,-1.1l2.25,-1.01l0.77,0.05l1.07,-0.96l0.33,-0.82l-0.49,-0.94l0.23,-0.41l1.91,0.55l3.25,-2.63l0.3,-0.1l0.51,0.71l0.66,-0.08l2.37,-2.33l0.17,-0.85l-0.5,-0.49l0.98,-1.12l0.1,-0.6l-0.29,-0.5l-1.01,-0.43l0.69,-2.99l2.58,-4.76l0.54,-2.12l-0.02,-1.88l1.6,-2.53l-0.22,-0.92l0.24,-0.83l0.5,-0.48l0.38,-1.68l-0.02,-3.13l1.24,0.17l1.19,1.69l3.81,0.37l0.58,-0.28l1.03,-2.5l0.18,-2.33l0.7,-1.04l-0.05,-1.59l0.75,-2.28l1.8,0.72l0.65,-0.18l1.29,-3.27l0.57,0.04l0.59,-0.39l0.51,-1.19l0.81,-0.68l0.43,-1.78l1.36,-2.42l-0.37,-2.53l0.53,-1.74l-0.32,-1.97l9.23,4.37l0.58,-0.3l0.61,-3.95l2.61,-0.11l0.63,0.55l1.06,0.21l-0.5,1.72l0.62,0.87l1.62,0.81l2.53,-0.08l1.04,1.14l1.64,0.09l1.95,1.46l0.58,2.48l-0.94,0.78l-0.45,0.03l-0.3,0.43l0.12,0.7l-0.61,-0.05l-0.48,0.59l-0.35,2.47l0.08,2.25l-0.43,0.25l0.01,0.6l1.04,0.73l-0.35,0.14l-0.17,0.6l0.45,0.3l1.64,-0.1l1.38,-0.62l1.77,-1.62l0.4,0.56l-0.58,0.35l0.03,0.59l1.91,1.03l0.65,1.06l1.7,0.31l1.38,-0.13l0.95,0.47l0.82,-0.66l1.06,-0.1l0.33,0.55l1.26,0.59l-0.09,0.54l0.37,0.54l0.94,-0.24l0.42,0.54l3.97,0.8l0.26,1.1l-0.87,-0.4l-0.56,0.45l0.9,1.7l-0.35,0.57l0.62,0.77l-0.42,0.88l0.23,0.58l-1.36,-0.33l-0.59,-0.7l-0.66,0.19l-0.1,0.43l-2.47,-2.24l-0.55,0.06l-0.38,-0.54l-0.52,0.32l-1.37,-1.46l-1.24,-0.4l-2.88,-2.64l-1.34,-0.1l-1.12,-0.78l-1.17,0.07l-0.39,0.52l0.48,0.71l1.1,-0.03l0.64,0.66l1.33,0.05l0.6,0.41l0.63,1.37l1.47,1.07l1.14,0.32l1.54,1.75l2.56,0.89l1.41,1.84l2.15,-0.05l1.26,0.45l-0.58,0.69l0.31,0.48l2.03,0.31l0.27,0.7l0.56,0.09l0.14,1.64l-1.01,-0.73l-0.39,0.21l-1.14,-0.97l-0.58,0.3l0.11,0.81l-0.3,0.68l0.7,0.69l-0.16,0.59l1.12,0.3l-0.86,0.45l-2.14,-0.68l-1.4,-1.34l-0.84,-0.3l-2.25,-1.81l-0.57,0.12l-0.21,0.53l0.27,0.8l0.64,0.2l3.84,3.04l2.7,1.06l1.28,-0.35l0.46,1.05l1.27,0.23l-0.43,0.66l0.3,0.56l0.93,-0.2l0.01,1.21l-0.92,0.42l-0.57,0.74l-0.72,-0.91l-3.22,-1.51l-0.3,-1.14l-0.6,-0.57l-0.86,-0.1l-1.2,0.68l-1.72,-0.41l-0.37,-1.13l-0.71,-0.04l-0.05,1.3l-0.33,0.41l-1.44,-1.28l-0.51,0.1l-0.49,0.57l-0.66,-0.38l-0.98,0.46l-2.23,-0.07l-0.37,0.94l0.35,0.45l1.91,0.18l1.4,-0.33l0.85,0.23l0.56,-0.69l0.64,0.86l1.35,0.4l1.96,-0.34l1.51,0.68l0.67,-0.64l0.96,2.43l3.18,1.16l0.38,0.88l-0.57,1.02l0.56,0.43l1.72,-1.32l0.89,-0.03l0.84,0.63l0.79,-0.28l-0.62,-0.88l-0.2,-1.14l3.79,0.02l1.13,-0.45l1.91,3.14l-0.45,0.71l0.68,3.04l-1.2,-0.55l-0.01,0.87l-33.61,8.85l-34.62,8.17l-19.56,3.56l-11.81,1.37l-0.82,0.62l-28.25,5.27ZM782.77,223.09l0.13,0.08l-0.05,0.06l-0.01,-0.03l-0.07,-0.12ZM809.86,243.6l0.52,-1.12l-0.27,-0.54l-0.36,-0.07l0.57,-0.97l-0.39,-0.71l-0.03,-0.47l0.43,-0.35l-0.18,-0.72l0.63,-0.31l0.22,-0.6l0.12,-2.29l1.01,-0.4l-0.13,-0.88l0.48,-0.14l-0.27,-1.51l-0.77,-0.39l0.85,-0.56l0.09,-1.02l2.68,-1.14l0.39,2.43l-1.05,4.15l-0.21,2.35l0.34,1.06l-0.33,0.97l-0.61,-0.77l-0.8,0.16l-0.38,0.95l0.26,0.36l-0.64,0.46l-0.3,0.85l0.17,1.04l-0.3,1.44l0.4,2.43l-0.6,0.59l0.07,1.31l-1.39,-1.86l0.22,-0.92l-0.34,-1.54l0.28,-0.97l-0.38,-0.29Z", "name": "Virginia"}, "US-PA": {"path": "M717.56,161.53l0.63,-0.19l4.28,-3.74l1.16,5.12l0.48,0.3l34.83,-8.31l34.25,-9.05l1.43,0.55l0.73,1.36l0.63,0.12l0.77,-0.34l1.24,0.56l0.16,0.84l0.81,0.39l-0.15,0.58l0.92,2.65l1.92,2.02l2.12,0.71l2.21,-0.24l0.72,0.77l-0.89,0.87l-0.71,1.48l-0.16,2.23l-1.39,3.33l-1.36,1.59l0.04,0.79l1.8,1.66l-0.29,1.63l-0.84,0.44l-0.22,0.65l0.15,1.46l1.06,2.82l0.53,0.24l1.2,-0.2l1.2,2.33l0.96,0.56l0.66,-0.27l0.61,0.88l4.26,2.64l0.12,0.39l-1.28,0.94l-3.69,4.22l-0.22,0.75l0.18,0.88l-1.35,1.14l-0.84,0.16l-1.32,1.09l-0.32,0.65l-1.72,-0.09l-2.03,0.86l-1.14,1.36l-0.4,1.38l-37.24,9.65l-39.13,9.08l-10.34,-47.42l1.91,-1.23l3.06,-3.05Z", "name": "Pennsylvania"}, "US-TN": {"path": "M573.2,341.46l0.85,-0.82l0.29,-1.35l1.01,0.04l0.65,-0.79l-1.01,-4.82l1.41,-1.91l0.06,-1.31l1.19,-0.47l0.36,-0.48l-0.64,-1.29l0.52,-0.64l0.05,-0.56l-0.9,-1.3l2.56,-1.56l1.09,-1.12l-0.14,-0.84l-0.85,-0.52l0.13,-0.18l0.34,-0.16l0.85,0.36l0.45,-0.33l-0.27,-1.3l-0.85,-0.88l0.05,-0.69l0.5,-1.41l1.01,-1.1l-1.35,-2.02l1.37,-0.22l0.61,-0.55l-0.14,-0.64l-1.18,-0.79l0.82,-0.15l0.58,-0.54l0.13,-0.69l-0.59,-1.35l0.02,-0.36l0.38,0.53l0.47,0.07l1.18,-1.14l23.75,-2.95l0.35,-0.41l-0.1,-1.33l-0.84,-2.34l2.99,-0.1l0.82,0.57l22.86,-3.69l7.67,-0.52l7.52,-0.92l32.92,-4.79l1.11,-0.6l29.37,-5.47l0.73,-0.6l3.56,-0.57l-0.39,1.41l0.44,0.84l-0.39,1.97l0.36,0.8l-1.15,-0.02l-1.71,1.79l-1.19,3.85l-0.55,0.7l-0.57,0.08l-0.64,-0.72l-1.44,-0.0l-2.67,1.74l-1.41,2.71l-0.96,0.89l-0.34,-0.33l-0.14,-1.04l-0.73,-0.52l-0.53,0.15l-2.3,1.81l-0.29,1.31l-0.94,-0.23l-0.89,0.48l-0.16,0.76l0.33,0.71l-0.84,2.15l-1.29,0.07l-1.75,1.14l-1.28,1.24l-0.61,1.05l-0.78,0.28l-2.28,2.45l-4.05,0.81l-2.58,1.7l-0.49,1.08l-0.88,0.55l-0.55,0.8l-0.17,2.85l-0.35,0.6l-1.66,0.53l-0.89,-0.15l-1.06,1.14l0.23,5.18l-20.28,3.48l-21.69,3.21l-25.86,3.15l-0.13,0.28l-7.43,0.94l-28.83,3.33Z", "name": "Tennessee"}, "US-ID": {"path": "M132.97,123.81l-0.34,-0.44l0.1,-1.98l0.55,-1.73l1.43,-1.2l2.14,-3.56l1.69,-0.91l1.4,-1.51l1.09,-2.13l0.06,-1.21l2.23,-2.39l1.45,-2.68l0.38,-1.36l2.06,-2.24l1.91,-2.8l0.04,-1.01l-0.76,-2.96l-2.11,-1.96l-0.86,-0.37l-0.84,-1.62l-0.39,-3.03l-0.58,-1.2l0.95,-1.18l-0.1,-2.36l-1.01,-2.71l0.47,-0.99l10.25,-55.09l13.33,2.45l-3.77,21.08l1.25,2.93l0.98,1.29l0.25,1.57l1.15,1.79l-0.13,0.84l0.38,1.16l-1.0,0.96l0.82,1.79l-0.84,0.11l-0.28,0.71l1.91,1.71l1.01,2.06l2.23,1.25l0.47,1.49l1.14,1.46l1.46,2.82l0.08,0.69l1.62,1.83l-0.01,1.89l1.78,1.73l-0.08,1.36l0.74,0.19l0.9,-0.58l0.35,0.47l-0.36,0.55l0.06,0.54l1.1,0.97l1.61,0.16l1.82,-0.35l-0.65,2.62l-0.99,0.53l0.25,1.14l-1.86,3.74l0.05,1.72l-0.81,0.07l-0.37,0.54l0.59,1.33l-0.62,0.9l-0.04,1.17l0.96,0.94l-0.37,0.81l0.27,1.02l-1.57,0.42l-1.22,1.41l0.09,1.11l0.45,0.78l-0.14,0.74l-0.83,0.77l-0.21,1.52l1.48,0.64l1.37,1.8l0.78,0.28l1.08,-0.34l0.56,-0.79l1.85,-0.4l1.22,-1.27l0.82,-0.29l0.16,-0.76l0.78,0.82l0.22,0.71l1.05,0.65l-0.43,1.23l0.72,0.95l-0.35,1.37l0.56,1.35l-0.22,1.61l1.53,2.65l0.3,1.73l0.82,0.37l0.65,2.08l-0.19,0.98l-0.77,0.63l0.5,1.9l1.23,1.16l0.3,0.79l0.81,0.09l0.87,-0.36l1.04,0.93l1.04,2.79l-0.51,0.81l0.88,1.83l-0.28,0.59l0.11,0.98l2.28,2.42l0.97,-0.13l-0.0,-1.13l1.08,-0.88l0.93,-0.21l4.53,1.64l0.69,-0.31l0.68,-1.34l1.2,-0.39l2.25,0.94l3.3,-0.08l0.95,0.88l2.29,-0.56l3.23,0.8l0.46,-0.49l-0.67,-0.77l0.26,-1.05l0.74,-0.47l-0.06,-0.96l1.23,-0.5l0.48,0.37l1.06,2.11l0.12,1.11l1.36,1.95l0.73,0.45l-6.5,53.36l-47.53,-6.62l-47.01,-8.09l7.13,-38.73l1.13,-1.16l1.09,-2.65l-0.2,-1.74l0.74,-0.14l0.78,-1.6l-0.89,-1.27l-0.17,-1.2l-1.24,-0.09l-0.63,-0.82l-0.89,0.28Z", "name": "Idaho"}, "US-NV": {"path": "M138.94,329.03l-12.68,-16.85l-36.47,-50.78l-25.23,-34.32l14.11,-63.12l46.9,9.68l47.03,8.11l-19.28,123.81l-0.91,1.13l-1.0,2.15l-0.44,0.17l-1.35,-0.23l-0.97,-2.22l-0.7,-0.63l-1.42,0.2l-1.95,-1.03l-1.61,0.21l-1.8,0.93l-0.78,2.44l0.87,2.57l-0.61,0.95l-0.25,1.29l0.37,3.09l-0.77,2.5l0.76,3.67l-0.15,3.03l-0.31,1.05l-1.05,0.3l-0.12,0.51l0.32,0.79l-0.53,0.61Z", "name": "Nevada"}, "US-TX": {"path": "M276.14,412.63l33.26,2.09l32.98,1.42l0.41,-0.38l3.72,-97.69l25.97,0.65l26.4,0.23l0.05,41.52l0.44,0.4l1.03,-0.13l0.79,0.27l3.76,3.78l1.67,0.2l0.88,-0.57l2.5,0.64l0.6,-0.67l0.11,-1.04l0.61,0.75l0.93,0.22l0.38,0.92l0.77,0.77l-0.01,1.62l0.53,0.83l2.86,0.42l1.26,-0.2l1.39,0.88l2.8,0.68l1.83,-0.56l0.63,0.1l1.9,1.78l1.41,-0.11l1.26,-1.42l2.44,0.26l1.68,-0.45l0.32,2.59l2.31,0.73l-0.04,2.07l1.56,0.78l1.82,-0.65l1.58,-1.66l1.03,-0.64l0.41,0.19l0.45,1.62l2.02,0.2l0.25,1.04l0.72,0.47l1.47,-0.21l0.89,-0.93l0.39,0.33l0.59,-0.08l0.61,-0.98l0.26,0.4l-0.45,1.22l0.14,0.76l0.68,1.13l0.78,0.41l0.57,-0.04l0.6,-0.5l0.69,-2.34l0.91,-0.65l0.35,-1.53l0.57,-0.14l0.41,0.14l0.29,0.98l0.58,0.63l1.21,0.01l0.83,0.49l1.26,-0.2l0.69,-1.33l0.49,0.15l-0.13,0.69l0.49,0.69l1.21,0.44l0.49,0.71l1.53,-0.05l1.5,1.72l0.51,0.02l0.63,-0.62l0.08,-0.71l1.5,-0.1l0.93,-1.42l1.89,-0.41l1.67,-1.13l1.53,0.83l1.51,-0.22l0.29,-0.83l2.3,-0.73l0.53,-0.55l0.51,0.32l0.38,0.87l1.83,0.41l1.7,-0.06l1.87,-1.14l0.42,-1.04l1.07,0.3l2.25,1.54l1.16,0.17l1.8,2.05l2.15,0.39l1.05,0.91l0.76,-0.11l2.5,0.84l1.05,0.03l0.37,0.78l1.39,0.96l1.45,-0.12l0.39,-0.71l0.81,0.36l0.88,-0.4l0.93,0.34l0.76,-0.16l0.64,0.36l2.31,33.8l1.53,1.66l1.31,0.82l1.26,1.86l0.58,1.63l-0.09,2.64l1.01,1.2l0.85,0.39l-0.11,0.85l0.75,0.54l0.29,0.87l0.66,0.69l-0.19,1.17l1.01,1.02l0.6,1.63l0.51,0.34l0.55,-0.11l-0.16,1.71l0.82,1.21l-0.64,0.25l-0.35,0.68l0.78,1.26l-0.55,0.89l0.19,1.39l-0.75,2.69l-0.75,0.85l-0.36,1.55l-0.8,1.13l0.65,2.0l-0.83,2.29l0.17,1.08l0.84,1.2l-0.18,1.01l0.5,1.61l-0.24,1.41l-1.13,1.68l-1.03,0.21l-1.76,3.39l-0.04,1.07l1.81,2.38l-3.45,0.09l-7.41,3.83l-0.02,-0.44l-2.2,-0.46l-3.27,1.09l1.09,-3.54l-0.3,-1.22l-0.81,-0.76l-0.62,-0.07l-1.53,0.86l-0.99,2.02l-1.57,-0.96l-1.65,0.13l-0.07,0.63l0.9,0.62l0.01,1.06l0.56,0.39l-0.47,0.7l0.07,1.02l1.65,0.64l-0.63,0.72l0.49,0.98l0.91,0.23l0.28,0.38l-0.41,1.27l-0.46,-0.12l-0.98,0.82l-1.73,2.27l-1.19,-0.41l-0.49,0.13l0.33,1.01l0.08,2.57l-1.86,1.51l-1.92,2.13l-0.97,0.37l-4.13,2.94l-3.32,0.46l-2.56,1.08l-0.2,1.14l-0.76,-0.35l-2.05,0.9l-0.34,-0.35l-1.12,0.18l0.43,-0.88l-0.53,-0.6l-1.44,0.23l-1.22,1.1l-0.61,-0.63l-0.11,-1.21l-1.39,-0.82l-0.5,0.44l0.66,1.45l0.02,1.14l-0.72,0.09l-0.54,-0.44l-0.76,-0.0l-0.56,-1.35l-1.47,-0.38l-0.58,0.39l0.04,0.55l0.95,1.72l0.03,1.25l0.58,0.37l0.37,-0.16l1.15,0.79l-0.76,0.38l-0.27,0.54l0.15,0.37l0.7,0.23l1.09,-0.55l0.97,0.61l-4.3,2.46l-0.58,-0.13l-0.38,-1.46l-0.51,-0.19l-1.14,-1.48l-0.49,-0.03l-0.48,0.51l0.12,0.64l-0.64,0.35l-0.05,0.51l1.2,1.64l-0.31,1.06l0.34,0.86l-1.67,1.82l-0.38,0.2l0.38,-0.66l-0.19,-0.72l0.25,-0.74l-0.46,-0.68l-0.52,0.17l-0.72,1.11l0.26,0.73l-0.4,0.97l-0.07,-1.15l-0.52,-0.55l-1.96,1.31l-0.78,-0.33l-0.7,0.52l0.07,0.76l-0.82,1.01l0.02,0.49l1.26,0.64l0.03,0.58l0.79,0.28l0.7,-1.43l0.87,-0.42l0.01,0.64l-2.84,4.43l-1.24,-1.01l-1.37,0.39l-0.33,-0.35l-2.42,0.4l-0.47,-0.32l-0.65,0.17l-0.18,0.58l0.41,0.62l0.56,0.38l1.55,0.02l-0.01,0.93l0.56,0.65l2.09,1.05l-2.71,7.78l-0.22,0.11l-0.38,-0.56l-0.34,0.1l0.18,-0.78l-0.57,-0.43l-2.37,1.99l-1.74,-2.41l-1.2,-0.93l-0.61,0.4l0.09,0.53l1.46,2.04l-0.1,0.84l-0.95,-0.09l-0.33,0.63l0.51,0.57l1.9,0.07l2.16,0.73l2.11,-0.74l-0.44,1.79l0.24,0.79l-0.98,0.71l0.38,1.63l-1.13,0.15l-0.43,0.41l0.41,2.15l-0.33,1.63l0.45,0.64l0.85,0.24l0.89,2.93l0.72,2.88l-0.92,0.84l0.63,0.49l-0.08,1.31l0.73,0.3l0.18,0.63l0.59,0.29l0.4,1.84l0.7,0.31l0.44,3.31l0.81,0.56l0.7,0.08l-0.32,0.2l-0.23,0.95l0.32,1.11l-0.65,0.8l-0.85,-0.05l-0.54,0.45l0.09,1.35l-0.49,-0.34l-0.5,0.26l-0.39,-0.68l-1.5,-0.47l-2.95,-2.6l-2.23,-0.18l-0.81,-0.52l-4.24,0.1l-0.9,0.44l-0.79,-0.64l-1.07,0.26l-1.26,-0.21l-1.47,-0.72l-0.73,-1.0l-0.62,-0.14l-0.2,-0.74l-1.18,-0.5l-1.0,-0.02l-2.0,-0.89l-1.47,0.4l-0.84,-1.12l-0.61,-0.21l-1.44,-1.42l-1.98,0.01l-1.48,-0.66l-0.86,0.12l-1.64,-0.43l0.29,-1.29l-0.54,-1.03l-0.96,-0.36l-1.67,-6.18l-2.79,-3.08l-0.29,-1.14l-1.09,-0.77l0.35,-0.79l-0.24,-0.77l0.34,-2.23l-0.45,-0.97l-1.06,-1.03l0.66,-2.04l0.05,-1.21l-0.18,-0.71l-0.55,-0.33l-0.15,-1.85l-1.86,-1.46l-0.86,0.22l-0.3,-0.42l-0.81,-0.11l-0.75,-1.33l-2.25,-1.75l0.01,-0.7l-0.51,-0.59l0.12,-0.88l-0.98,-0.93l-0.08,-0.76l-1.13,-0.62l-1.31,-2.92l-2.68,-1.5l-0.38,-0.93l-1.14,-0.6l-0.06,-1.18l-0.83,-1.2l-0.23,-1.46l-0.36,-0.52l0.42,-0.22l-0.04,-0.73l-1.04,-0.5l-0.26,-1.31l-0.82,-0.58l-0.95,-1.76l-0.61,-2.41l-1.86,-2.38l-0.87,-4.28l-1.82,-1.35l0.05,-0.71l-0.76,-1.22l-1.32,-0.76l-0.92,-0.99l-1.75,-0.95l-0.71,-1.87l-1.83,-0.62l-1.45,-1.0l-0.01,-1.64l-0.6,-0.39l-0.89,0.24l-0.12,-0.78l-0.99,-0.33l-0.8,-2.09l-0.56,-0.47l-0.47,0.12l-0.46,-0.44l-0.86,0.27l-0.14,-0.61l-0.44,-0.31l-0.47,0.15l-0.26,0.61l-1.06,0.16l-2.91,-0.47l-0.39,-0.38l-1.49,-0.03l-0.79,0.29l-0.77,-0.44l-2.68,0.27l-3.95,-2.1l-1.36,0.86l-0.65,1.62l-2.0,-0.18l-0.52,0.45l-0.49,-0.17l-1.05,0.49l-1.34,0.14l-3.25,6.44l-0.19,1.78l-0.77,0.67l-0.39,1.81l0.35,0.6l-2.01,1.01l-0.73,1.31l-1.12,0.66l-1.13,2.02l-2.69,-0.47l-1.04,-0.88l-0.55,0.3l-1.71,-1.22l-1.31,-1.64l-2.92,-0.86l-1.16,-0.96l-0.02,-0.67l-0.42,-0.41l-2.77,-0.52l-2.29,-1.05l-1.9,-1.77l-0.91,-1.54l-0.97,-0.92l-1.54,-0.29l-1.78,-1.27l-0.22,-0.56l-1.32,-1.19l-0.65,-2.7l-0.87,-1.02l-0.24,-1.11l-0.76,-1.28l-0.26,-2.35l0.53,-3.06l-3.01,-5.09l-0.05,-1.94l-1.26,-2.52l-0.99,-0.44l-0.43,-1.24l-1.44,-0.81l-2.16,-2.18l-1.03,-0.1l-2.02,-1.26l-3.2,-3.36l-0.59,-1.56l-3.14,-2.56l-1.59,-2.45l-1.2,-0.95l-0.61,-1.05l-4.44,-2.62l-1.19,-2.19l-1.21,-3.23l-1.38,-1.09l-1.13,-0.08l-1.76,-1.68l-0.78,-3.04ZM503.52,468.36l-0.35,0.19l0.19,-0.17l0.16,-0.02ZM500.13,471.02l-0.12,0.17l-0.05,0.03l0.18,-0.2ZM499.19,472.55l0.16,0.05l-0.21,0.2l0.04,-0.13l0.01,-0.12ZM498.43,473.45l-0.15,0.14l0.04,-0.1l0.11,-0.04ZM468.75,489.63l0.04,0.02l-0.03,0.02l-0.0,-0.04ZM455.12,548.8l0.78,-0.53l0.25,-0.72l0.12,1.15l-1.14,0.1ZM462.07,500.4l-0.15,-0.61l1.24,-0.37l-0.3,0.35l-0.8,0.64ZM464.7,498.41l0.11,-0.25l1.31,-0.91l-0.95,0.88l-0.47,0.27ZM466.99,496.67l0.29,-0.26l0.49,-0.04l-0.27,0.14l-0.52,0.16ZM459.12,503.58l0.71,-1.67l0.64,-0.73l-0.01,0.78l-1.34,1.62ZM452.17,516.05l0.07,-0.29l0.1,-0.22l-0.17,0.5ZM452.62,514.77l0.17,-0.39l0.04,-0.06l-0.21,0.45ZM453.57,512.77l-0.01,-0.06l0.06,-0.05l-0.05,0.11Z", "name": "Texas"}, "US-NH": {"path": "M830.68,105.86l0.18,-1.32l-1.48,-5.32l0.52,-1.45l-0.31,-2.2l0.98,-1.86l-0.16,-2.28l0.61,-2.28l-0.45,-0.61l0.27,-2.29l-0.98,-3.77l0.08,-0.7l0.3,-0.46l1.83,-0.83l0.68,-1.39l1.42,-1.64l0.72,-1.8l-0.26,-1.12l0.51,-0.63l-2.38,-3.45l0.83,-3.26l-0.12,-0.78l-0.82,-1.28l0.26,-0.6l-0.24,-0.7l0.44,-3.2l-0.37,-0.82l0.89,-1.5l2.44,0.3l0.64,-0.89l13.44,34.54l0.88,3.61l2.62,2.16l0.88,0.32l0.38,1.58l1.73,1.27l0.01,0.34l0.78,0.22l-0.05,0.57l-0.43,3.08l-1.57,0.26l-1.31,1.21l-0.5,0.94l-0.96,0.38l-0.49,1.67l-1.08,1.44l-17.58,5.0l-1.71,-1.39l-0.42,-0.87l-0.12,-1.98l0.53,-0.59l0.03,-0.52l-1.08,-5.12Z", "name": "New Hampshire"}, "US-NY": {"path": "M822.66,166.36l0.68,-2.03l0.63,-0.03l0.54,-0.75l0.77,0.13l0.53,-0.42l-0.04,-0.3l0.57,-0.04l0.27,-0.66l0.66,-0.03l0.19,-0.55l-0.43,-0.81l0.22,-0.53l0.61,-0.38l1.34,0.19l0.53,-0.6l1.46,-0.2l0.21,-0.8l1.86,-0.01l1.08,-0.91l0.11,-0.79l0.62,0.24l0.43,-0.61l4.82,-1.35l2.25,-1.32l1.97,-2.91l-0.19,1.14l-0.97,0.86l-1.21,2.3l0.55,0.46l1.59,-0.37l0.28,0.61l-0.42,0.49l-1.37,0.88l-0.51,-0.06l-2.25,0.95l-0.07,0.92l-0.87,0.01l-2.72,1.74l-1.01,0.16l-0.17,0.79l-1.24,0.11l-2.23,1.92l-4.43,2.22l-0.2,0.71l-0.28,0.08l-0.46,-0.81l-1.41,-0.04l-0.73,0.42l-0.41,0.81l0.22,0.3l-0.91,0.7l-0.76,-0.81l0.32,-1.04ZM829.28,158.96l-0.01,-0.01l0.02,-0.06l-0.01,0.07ZM846.33,148.77l0.14,-0.09l0.08,-0.01l-0.11,0.18l-0.12,-0.07ZM845.51,154.6l0.09,-0.87l0.73,-1.16l1.63,-1.53l1.01,0.29l0.04,-0.81l0.79,0.65l-3.33,3.22l-0.67,0.46l-0.31,-0.24ZM723.17,157.08l3.74,-3.86l1.26,-2.18l1.74,-1.87l1.16,-0.79l1.26,-3.33l1.55,-1.31l0.53,-0.83l-0.22,-1.82l-1.63,-2.37l0.42,-1.12l-0.18,-0.78l-0.84,-0.52l-2.11,0.02l0.04,-0.98l-0.59,-2.19l4.97,-2.98l4.48,-1.84l2.38,-0.22l1.83,-0.76l5.64,-0.31l3.14,1.2l3.15,-1.71l5.49,-1.13l0.58,0.44l0.68,-0.2l0.11,-0.98l1.45,-0.74l1.02,-0.94l0.74,-0.21l0.67,-2.04l1.86,-1.77l0.77,-1.27l1.12,0.02l1.12,-0.54l1.05,-1.63l-0.47,-0.69l0.35,-1.19l-0.26,-0.51l-0.64,0.03l-0.18,-1.16l-0.95,-1.56l-1.01,-0.6l0.12,-0.18l0.6,0.38l0.53,-0.27l0.73,-1.44l-0.02,-0.9l0.8,-0.65l-0.02,-0.97l-0.93,-0.18l-0.59,0.7l-0.27,0.12l0.54,-1.29l-0.81,-0.61l-1.26,0.06l-0.86,0.78l-0.99,-0.68l2.02,-2.52l1.76,-1.49l1.64,-2.65l0.7,-0.57l0.11,-0.59l0.77,-0.96l0.07,-0.56l-0.51,-0.94l0.76,-1.9l4.74,-7.65l4.72,-4.55l2.83,-0.55l19.6,-5.91l0.42,0.87l-0.06,2.0l1.03,1.2l0.48,3.78l2.33,3.2l-0.07,1.88l0.88,2.39l-0.58,1.07l0.04,3.4l0.72,0.88l1.35,2.72l0.2,1.08l0.62,0.83l0.16,3.9l0.56,0.83l0.54,0.07l0.53,-0.61l0.05,-0.86l0.33,-0.08l1.06,1.09l4.12,15.39l0.75,1.17l0.37,15.15l0.61,0.61l3.72,15.98l1.27,1.3l-2.79,3.18l0.03,0.55l1.53,1.27l0.19,0.58l-0.77,0.88l-0.63,1.79l-0.41,0.39l0.15,0.67l-1.24,0.65l0.0,-3.96l-0.58,-2.25l-0.76,-1.59l-1.47,-1.06l-0.18,-1.11l-0.7,-0.09l-0.41,1.33l0.69,1.25l1.06,0.8l0.99,2.79l-13.8,-3.78l-1.29,-1.43l-2.39,0.27l-0.63,-0.41l-1.06,-0.13l-1.76,-1.86l-0.76,-2.29l0.11,-0.72l-0.36,-0.62l-0.55,-0.2l0.08,-0.45l-0.36,-0.42l-1.65,-0.64l-1.08,0.33l-0.76,-1.38l-1.71,-0.71l-34.57,9.14l-34.42,8.22l-1.15,-5.07ZM820.13,168.63l1.08,-0.49l0.15,0.61l-1.16,1.52l-0.07,-1.64ZM731.02,138.24l0.02,-0.68l0.78,-0.08l-0.37,1.08l-0.44,-0.32Z", "name": "New York"}, "US-HI": {"path": "M295.6,602.68l-0.09,-1.67l-0.5,-1.2l-1.36,-1.92l-0.81,-0.52l0.28,-0.81l-0.26,-0.81l1.55,-2.32l3.47,-3.7l1.36,-3.84l-0.34,-0.67l1.34,-3.38l0.03,-3.33l0.97,-1.19l2.6,-0.55l1.38,0.28l3.13,-1.26l1.83,-0.31l0.55,-0.72l-0.02,-3.0l0.55,-1.89l2.08,-1.33l1.79,2.42l-0.22,1.06l1.84,4.02l1.0,0.39l5.15,8.57l0.71,4.42l-1.86,3.54l0.21,0.61l1.56,1.09l-0.87,2.31l0.29,1.69l1.58,3.4l-1.65,1.04l-2.5,-0.21l-3.62,0.59l-4.92,-1.47l-2.28,-1.5l-7.29,-0.13l-1.75,0.29l-1.79,1.35l-1.85,0.68l-1.27,0.03ZM308.01,538.5l1.75,0.1l0.45,2.33l-0.48,2.26l0.38,0.88l2.49,0.98l1.51,0.11l1.61,1.55l0.21,1.73l0.97,1.09l-0.2,1.18l1.85,2.81l-0.19,0.78l-0.73,0.55l-2.03,0.42l-2.01,-0.21l-1.54,-1.33l-2.4,-0.27l-2.86,-1.65l0.09,-1.41l1.37,-2.06l0.56,-2.29l-0.39,-0.61l-1.46,-0.79l-1.08,-1.95l0.04,-2.96l2.08,-1.24ZM298.76,524.37l0.78,0.38l0.35,1.16l2.76,2.23l0.91,1.23l1.01,0.08l0.77,1.87l1.64,1.17l0.79,0.07l1.14,1.28l-1.54,0.5l-2.97,-0.75l-3.3,-4.38l-3.34,-2.24l-1.49,-0.49l-0.0,-0.85l1.78,-0.49l0.7,-0.77ZM302.19,550.7l-2.27,-1.11l-0.3,-0.63l3.27,0.35l-0.7,1.39ZM299.02,540.44l-1.0,-0.33l-0.74,-1.02l1.13,-2.28l-0.43,-2.01l2.82,1.55l0.54,2.32l0.07,1.24l-2.41,0.51ZM282.01,508.46l0.73,-2.05l-0.37,-0.99l-0.01,-3.16l0.89,-1.06l-0.09,-1.35l2.95,2.09l3.17,-0.67l1.72,0.17l0.36,1.13l-0.49,2.4l0.23,1.66l-0.79,0.68l-0.29,1.71l0.32,1.7l0.94,0.57l0.23,1.2l-0.63,1.26l0.55,1.49l-1.41,-0.01l-0.19,-0.54l-2.19,-0.97l-0.68,-3.14l-1.37,-0.44l0.91,-0.17l0.35,-0.47l-0.05,-0.71l-0.64,-0.76l-0.41,-0.26l-0.38,0.43l-1.05,-0.53l0.12,2.05l-2.44,-1.27ZM260.53,470.55l-0.14,-2.24l-0.95,-0.77l-0.68,-1.38l0.16,-1.33l0.12,-0.42l2.67,-0.89l5.01,0.62l0.67,1.16l2.67,1.22l0.69,1.39l-0.28,2.14l-2.6,1.45l-0.88,1.44l-0.85,0.35l-3.09,0.08l-0.91,-1.7l-1.61,-1.12ZM245.8,462.89l-0.21,-0.88l1.2,-0.84l4.77,-0.76l0.54,0.41l-1.11,0.42l-0.79,1.06l-1.81,-0.57l-1.49,0.36l-1.09,0.8Z", "name": "Hawaii"}, "US-VT": {"path": "M805.92,73.67l25.93,-8.31l0.92,1.83l-0.71,2.38l-0.01,1.54l2.25,2.7l-0.5,0.59l0.28,1.12l-0.65,1.6l-1.33,1.51l-0.63,1.32l-1.72,0.73l-0.61,0.93l-0.09,0.98l0.97,3.7l-0.26,2.43l0.41,0.53l-0.58,2.1l0.18,2.17l-0.98,1.87l0.29,2.34l-0.52,1.54l1.49,5.38l-0.2,1.22l1.1,5.24l-0.57,0.85l0.14,2.29l0.61,1.24l1.51,1.06l-11.42,3.05l-0.57,-0.83l-4.18,-15.56l-1.73,-1.55l-0.9,0.26l-0.29,1.19l-0.12,-0.25l-0.15,-3.88l-0.69,-0.99l-0.15,-0.97l-1.4,-2.82l-0.63,-0.67l-0.02,-3.13l0.58,-1.15l-0.89,-2.54l0.06,-1.92l-0.4,-0.91l-1.57,-1.6l-0.39,-0.8l-0.45,-3.69l-1.04,-1.25l0.09,-1.87l-0.44,-1.0Z", "name": "Vermont"}, "US-NM": {"path": "M230.53,422.69l12.24,-122.4l25.76,2.35l26.19,1.96l26.22,1.52l25.84,1.07l-0.32,10.07l-0.75,0.39l-3.71,97.67l-32.57,-1.41l-33.72,-2.12l-0.44,0.75l0.53,2.31l0.44,1.25l0.99,0.76l-30.72,-2.59l-0.44,0.36l-0.85,9.43l-14.71,-1.4Z", "name": "New Mexico"}, "US-NC": {"path": "M829.09,287.59l0.01,-0.01l-0.0,0.0l-0.01,0.0ZM821.62,270.85l0.21,0.22l-0.05,0.01l-0.16,-0.24ZM823.91,275.04l0.2,0.15l-0.02,0.18l-0.06,-0.08l-0.12,-0.24ZM678.55,321.5l0.92,0.16l1.52,-0.4l0.42,-0.39l0.52,-0.97l0.11,-2.67l1.34,-1.19l0.47,-1.04l2.25,-1.47l2.13,-0.54l0.76,0.17l1.32,-0.53l2.36,-2.52l0.78,-0.25l1.84,-2.28l1.49,-1.0l1.55,-0.2l1.14,-2.63l-0.29,-1.2l1.66,0.04l0.5,-1.63l0.93,-0.77l1.08,-0.77l0.52,1.49l1.07,0.32l1.34,-1.17l1.34,-2.62l2.49,-1.6l0.79,0.07l0.83,0.78l1.05,-0.21l0.84,-1.07l1.46,-4.14l1.08,-1.1l1.48,0.07l0.43,-0.31l-0.7,-1.24l0.39,-1.97l-0.43,-0.89l0.38,-1.24l7.44,-0.94l19.59,-3.57l37.28,-8.83l31.16,-8.25l0.41,1.18l3.57,3.14l1.01,1.48l-1.21,-0.97l-0.17,-0.62l-0.93,-0.38l-0.52,0.06l-0.23,0.65l0.66,0.52l0.6,1.52l-0.54,0.02l-0.92,-0.73l-2.32,-0.75l-0.41,-0.47l-0.55,0.14l-0.31,0.69l0.15,0.64l1.38,0.42l1.69,1.33l-1.1,0.66l-2.49,-1.14l-0.35,0.51l0.15,0.42l1.6,1.13l-1.85,-0.3l-2.24,-0.82l-0.46,0.15l0.02,0.48l0.61,0.68l1.7,0.78l-0.96,0.58l0.0,0.6l-0.43,0.53l-1.48,0.76l-0.9,-0.75l-0.6,0.23l-0.1,0.35l-0.2,-0.13l-1.33,-2.26l0.19,-2.6l-0.43,-0.47l-0.9,-0.2l-0.35,0.65l0.62,0.68l-0.43,0.98l-0.01,1.03l0.5,1.7l1.61,2.14l-0.3,1.26l0.49,0.29l2.97,-0.63l2.09,-1.51l0.27,0.01l0.38,0.78l0.76,-0.34l1.57,0.03l0.15,-0.72l-0.56,-0.3l1.28,-0.77l2.04,-0.49l-0.08,1.17l0.64,0.28l-0.59,0.87l0.9,1.16l-0.84,0.12l-0.18,0.67l1.39,0.43l0.26,0.92l-1.21,0.07l-0.18,0.66l0.67,0.57l1.25,-0.18l0.52,0.25l0.4,-0.38l0.16,-1.93l-0.77,-3.27l0.41,-0.49l0.57,0.42l0.93,0.04l0.28,-0.57l-0.29,-0.43l0.46,-0.58l1.74,1.8l0.01,1.39l0.62,0.87l-0.53,0.19l-0.24,0.47l0.91,1.11l-0.08,0.36l-0.41,0.55l-0.78,0.09l-0.91,-0.83l-0.31,0.34l0.14,1.24l-1.07,1.61l0.2,0.56l-0.32,0.22l-0.15,0.98l-0.73,0.55l0.1,0.9l-0.89,0.97l-1.06,0.23l-0.59,-0.36l-0.52,0.52l-0.95,-0.79l-0.86,0.12l-0.4,-0.81l-0.59,-0.2l-0.51,0.38l0.09,0.93l-0.53,0.23l-1.42,-1.21l1.3,-0.41l0.23,-0.87l-0.57,-0.42l-2.03,0.34l-1.13,1.02l0.3,0.67l0.44,0.15l0.1,0.81l0.35,0.24l-0.03,0.12l-0.57,-0.33l-1.69,0.85l-1.13,-0.41l-1.46,0.09l-3.33,-0.64l0.44,1.07l0.98,0.43l0.36,0.63l0.63,0.1l0.88,-0.33l1.69,0.6l2.36,0.35l3.52,0.06l0.47,0.41l-0.05,0.51l-1.0,0.07l-0.24,0.72l-1.61,1.45l0.32,0.58l1.86,-0.03l-2.54,3.5l-1.68,0.07l-1.61,-0.94l-0.91,-0.18l-1.22,-0.99l-1.12,0.09l0.08,0.47l1.05,1.11l2.35,2.03l2.69,0.22l1.31,0.46l1.7,-2.16l0.52,0.45l1.18,0.31l0.39,-0.58l-0.55,-0.87l0.87,0.14l0.2,0.56l0.66,0.23l1.62,-1.21l-0.17,0.59l0.29,0.57l-0.29,0.38l-0.43,-0.2l-0.4,0.37l0.04,0.89l-0.96,1.71l0.02,0.78l-0.72,-0.06l-0.07,-0.73l-1.13,-0.58l-0.41,0.48l0.29,1.46l-0.35,-0.91l-0.84,-0.35l-1.22,1.08l-0.21,0.52l0.25,0.26l-2.03,0.35l-2.75,1.86l-0.68,-1.01l-0.75,-0.28l-0.36,0.49l0.44,1.24l-0.57,-0.01l-0.09,0.82l-0.93,1.72l-0.92,0.85l-0.59,-0.25l0.48,-0.69l-0.03,-0.77l-1.07,-0.9l-0.09,-0.52l-1.69,-0.38l-0.15,0.47l0.44,1.14l0.2,0.32l0.59,0.07l0.3,0.59l-0.88,0.38l-0.08,0.71l0.66,0.62l0.77,0.16l-0.0,0.36l-2.12,1.68l-1.9,2.65l-1.98,4.29l-0.33,2.11l0.13,1.34l-0.16,-1.04l-1.02,-1.56l-0.55,-0.16l-0.29,0.48l1.21,3.9l-0.62,2.26l-3.92,0.24l-1.43,0.66l-0.36,-0.51l-0.58,-0.17l-0.53,1.07l-1.9,1.16l-0.61,-0.01l-23.45,-14.89l-1.05,-0.01l-18.73,3.7l-0.67,-2.73l-3.28,-2.77l-0.46,0.08l-1.23,1.32l-0.02,-1.27l-0.82,-0.52l-22.89,3.59l-0.64,-0.26l-0.62,0.46l-0.25,0.65l-3.99,1.95l-0.89,1.23l-1.02,0.09l-4.79,2.68l-21.02,4.11l-0.36,-4.48l0.71,-0.95ZM819.02,269.97l0.19,0.35l0.25,0.37l-0.46,-0.4l0.02,-0.32ZM809.66,288.69l0.21,0.33l-0.17,-0.08l-0.04,-0.24ZM817.54,297.34l0.15,-0.36l0.16,0.07l-0.13,0.28l-0.18,0.02ZM814.96,297.34l-0.06,-0.28l-0.04,-0.11l0.31,0.26l-0.21,0.13ZM814.94,262.69l0.37,-0.24l0.15,0.4l-0.42,0.08l-0.1,-0.23ZM794.27,327.63l0.04,-0.07l0.22,0.03l-0.0,0.09l-0.26,-0.04Z", "name": "North Carolina"}, "US-ND": {"path": "M439.1,45.59l2.07,7.05l-0.73,2.58l0.57,2.4l-0.27,1.19l0.48,2.03l0.02,3.32l1.42,4.01l0.45,0.55l-0.08,0.99l0.39,1.54l0.62,0.75l1.49,3.79l-0.05,3.94l0.42,0.71l0.51,8.43l0.51,1.54l0.51,0.25l-0.47,2.66l0.36,1.64l-0.14,1.76l0.69,1.11l0.2,2.17l0.49,1.14l1.81,2.57l0.16,2.21l0.51,1.08l0.17,1.4l-0.24,1.36l0.29,1.75l-27.89,0.76l-28.38,0.2l-28.37,-0.38l-28.48,-0.97l2.91,-66.22l23.01,0.82l25.49,0.43l25.49,-0.06l24.04,-0.51Z", "name": "North Dakota"}, "US-NE": {"path": "M423.3,177.34l3.93,2.68l3.94,1.88l1.33,-0.22l0.51,-0.47l0.36,-1.07l0.48,-0.2l2.5,0.33l1.32,-0.47l1.59,0.24l3.45,-0.65l2.38,1.96l1.41,0.14l1.55,0.76l1.45,0.08l0.89,1.09l1.48,0.17l-0.06,0.97l1.69,2.06l3.32,0.59l0.19,0.67l-0.21,1.85l1.14,1.92l0.01,2.27l1.16,1.06l0.34,1.69l1.74,1.44l0.07,1.85l1.51,2.07l-0.49,2.3l0.44,3.05l0.52,0.54l0.93,-0.2l-0.03,1.23l1.21,0.49l-0.4,2.32l0.21,0.45l1.12,0.39l-0.59,0.75l-0.09,1.0l0.13,0.59l0.82,0.49l0.16,1.42l-0.26,0.91l0.26,1.26l0.55,0.6l0.3,1.89l-0.22,1.31l0.23,0.71l-0.57,0.9l0.03,0.78l0.45,0.87l1.23,0.62l0.26,2.47l1.1,0.5l0.03,0.78l1.19,2.7l-0.23,0.95l1.16,0.21l0.8,0.98l1.1,0.23l-0.15,0.95l1.31,1.64l-0.21,1.1l0.49,0.89l-26.2,1.1l-27.91,0.67l-27.92,0.15l-27.97,-0.37l0.47,-21.33l-0.39,-0.41l-32.44,-1.09l1.91,-42.71l43.42,1.28l44.74,-0.05Z", "name": "Nebraska"}, "US-LA": {"path": "M510.29,413.05l-1.38,-21.63l25.76,-1.93l25.96,-2.35l0.35,0.82l1.49,0.64l-0.92,1.34l-0.25,2.12l0.5,0.72l1.18,0.3l-1.22,0.47l-0.45,0.78l0.46,1.35l1.05,0.83l0.08,2.13l0.47,0.54l1.52,0.73l0.45,1.04l1.43,0.42l-0.87,1.22l-0.85,2.34l-0.76,0.05l-0.52,0.51l-0.02,0.73l0.63,0.72l-0.21,1.16l-1.35,0.96l-1.08,1.89l-1.38,0.68l-0.68,0.83l-0.79,2.41l-0.24,3.51l-1.55,1.75l0.13,1.2l0.63,0.95l-0.35,2.37l-1.62,0.3l-0.59,0.57l0.29,0.97l0.65,0.59l-0.25,1.41l0.99,1.51l-1.18,1.19l-0.08,0.45l0.4,0.23l6.22,-0.58l29.41,-3.07l-0.67,3.48l-0.52,1.02l-0.19,2.25l0.7,0.98l-0.09,0.66l0.61,1.0l1.32,0.7l1.23,1.42l0.15,0.88l0.9,1.38l0.14,1.05l1.13,1.84l-1.86,0.4l-0.39,-0.08l-0.02,-0.56l-0.54,-0.57l-1.29,0.28l-1.19,-0.59l-1.52,0.18l-0.62,-0.98l-1.25,-0.86l-2.86,-0.46l-1.25,0.64l-1.39,2.31l-1.3,1.43l-0.41,0.92l0.07,1.2l0.56,0.89l0.83,0.57l4.28,0.81l3.37,-1.02l1.32,-1.2l0.68,-1.2l0.35,0.59l1.09,0.42l0.59,-0.41l0.81,0.02l0.51,-0.47l-0.76,1.23l-1.13,-0.11l-0.57,0.32l-0.38,0.62l0.0,0.83l0.78,1.22l1.49,-0.03l0.66,0.9l1.11,0.48l0.94,-0.22l0.51,-0.45l0.46,-1.11l-0.02,-1.37l0.93,-0.58l0.42,-1.0l0.24,0.05l0.11,1.17l-0.24,0.25l0.19,0.57l0.43,0.15l-0.07,0.75l1.36,1.08l0.35,-0.17l-0.48,0.6l0.19,0.63l-0.36,0.14l-0.53,-0.57l-0.92,-0.18l-1.0,1.91l-0.85,0.15l-0.46,0.53l0.17,1.2l-1.03,-0.49l-1.01,0.07l0.04,0.46l1.16,1.07l-1.18,-0.14l-0.92,0.61l0.69,0.42l1.28,2.05l1.85,0.44l0.92,0.53l-0.08,1.21l0.34,0.41l2.08,-0.33l0.78,0.17l0.18,0.53l0.74,0.32l1.36,-0.35l0.54,0.78l1.08,-0.47l1.15,0.74l0.14,0.3l-0.41,0.63l1.55,0.86l-0.39,0.66l0.39,0.58l-0.18,0.63l-0.95,1.52l-1.33,-1.57l-0.68,0.34l0.1,0.67l-0.39,0.13l0.4,-1.91l-1.34,-0.76l-0.5,0.5l0.2,1.19l-0.55,0.46l-0.27,-1.03l-0.58,-0.25l-0.91,-1.28l0.03,-0.77l-0.97,-0.13l-0.47,0.51l-1.42,-0.16l-0.42,-0.61l0.14,-0.64l-0.39,-0.46l-0.45,-0.01l-0.81,0.74l-1.2,0.03l0.26,-0.57l-0.13,-0.67l-0.47,-0.88l-0.92,0.05l0.09,-0.97l-0.37,-0.36l-0.92,-0.02l-0.22,0.59l-0.86,-0.38l-0.48,0.27l-2.64,-1.26l-1.25,-0.02l-0.68,-0.64l-0.61,0.19l-0.3,0.56l-0.05,1.26l1.74,0.94l1.69,0.34l-0.15,0.93l0.28,0.4l-0.34,0.35l0.23,0.69l-0.76,0.96l-0.02,0.67l0.82,0.97l-0.96,1.45l-1.34,0.95l-0.78,-1.16l0.21,-1.51l-0.36,-0.93l-0.49,-0.17l-0.4,0.36l-1.17,-1.08l-0.6,0.43l-0.77,-1.06l-0.63,-0.2l-0.64,1.34l-0.86,0.27l-0.89,-0.53l-0.86,0.54l-0.1,0.62l0.49,0.41l-0.68,0.57l-0.13,1.46l-0.46,0.13l-0.39,0.84l-0.93,0.09l-0.12,-0.69l-1.61,-0.4l-0.77,0.99l-1.25,-0.82l-0.69,-0.11l-0.31,-0.54l-1.0,0.01l-0.35,0.61l-1.18,-0.51l0.43,-0.41l-0.0,-1.47l-0.38,-0.58l-1.92,-1.19l-0.08,-0.54l-0.84,-0.72l-0.1,-0.91l0.73,-1.16l-0.35,-1.14l-0.88,-0.19l-0.34,0.57l0.16,0.43l-0.59,0.81l0.04,0.92l-1.82,-0.4l0.07,-0.39l-0.47,-0.54l-1.98,0.77l-0.71,-2.23l-0.47,-0.12l-0.87,0.35l-0.18,-2.14l-1.31,-0.35l-1.9,0.3l-1.09,0.66l-0.22,-0.71l0.85,-0.27l-0.06,-0.8l-0.61,-0.58l-1.04,-0.1l-0.86,0.43l-0.95,-0.14l-0.4,0.81l-2.01,1.12l-0.64,-0.31l-1.29,0.72l0.54,1.37l0.81,0.3l0.99,1.52l-1.41,0.2l-1.83,1.05l-3.71,-0.39l-1.24,0.21l-3.11,-0.44l-2.0,-0.68l-1.82,-1.07l-3.73,-1.09l-3.21,-0.48l-2.55,0.6l-5.66,0.47l-1.0,0.27l-1.83,1.27l-0.6,-0.63l-0.27,-1.09l1.6,-0.48l0.7,-1.78l-0.03,-1.56l-0.39,-0.56l1.12,-1.55l0.23,-1.6l-0.5,-1.84l0.07,-1.46l-0.67,-0.7l-0.22,-1.05l0.83,-2.22l-0.64,-1.95l0.77,-0.85l0.29,-1.5l0.79,-0.94l0.78,-2.84l-0.19,-1.42l0.58,-0.98l-0.76,-1.33l0.84,-0.39l0.19,-0.44l-0.9,-1.35l0.02,-2.13l-1.08,-0.23l-0.58,-1.57l-0.92,-0.84l0.28,-1.27l-0.82,-0.75l-0.33,-0.95l-0.65,-0.34l0.22,-0.98l-1.17,-0.58l-0.81,-0.93l0.15,-2.45l-0.69,-1.93l-1.34,-1.97l-2.65,-2.19ZM550.67,462.74l0.02,-0.01l0.0,0.0l-0.02,0.0ZM609.66,467.22l-0.03,-0.03l-0.09,-0.04l0.15,-0.02l-0.03,0.09ZM609.67,465.6l-0.02,-0.02l0.04,-0.01l-0.02,0.03ZM568.93,468.95l-2.03,-0.42l-0.68,-0.51l0.74,-0.44l0.35,-0.77l0.4,0.49l0.84,0.2l-0.14,0.62l0.51,0.81ZM552.13,462.99l1.74,-1.07l3.38,1.07l-0.7,0.57l-0.17,0.82l-0.69,0.18l-3.56,-1.57Z", "name": "Louisiana"}, "US-SD": {"path": "M337.03,132.38l0.3,-0.53l0.79,-19.92l28.49,0.97l28.39,0.38l28.39,-0.2l27.77,-0.76l-0.17,1.71l-0.72,1.71l-2.9,2.47l-0.41,1.28l1.59,2.13l1.06,2.06l0.55,0.36l1.74,0.24l1.02,0.84l0.58,1.02l1.51,38.65l-1.84,0.09l-0.42,0.56l0.24,1.42l0.88,1.12l0.01,1.44l-0.65,0.36l0.17,1.47l0.48,0.43l1.09,0.04l0.34,1.66l-0.16,0.9l-0.62,0.82l0.02,1.72l-0.68,2.42l-0.49,0.44l-0.67,1.87l0.5,1.1l1.33,1.06l-0.16,0.61l0.64,0.65l0.36,1.13l-1.66,-0.28l-0.34,-0.92l-0.85,-0.72l0.19,-0.6l-0.29,-0.59l-1.58,-0.22l-1.03,-1.16l-1.57,-0.11l-1.51,-0.74l-1.34,-0.12l-2.39,-1.97l-3.79,0.6l-1.65,-0.24l-1.19,0.46l-2.62,-0.32l-0.98,0.48l-0.76,1.43l-0.72,0.05l-3.67,-1.8l-4.13,-2.77l-44.9,0.05l-43.4,-1.27l1.86,-42.93Z", "name": "South Dakota"}, "US-DC": {"path": "M782.83,216.82l0.44,-0.76l2.05,1.2l-0.65,1.13l-0.56,-1.03l-1.27,-0.55Z", "name": "District of Columbia"}, "US-DE": {"path": "M799.98,195.01l0.4,-1.49l0.91,-1.11l1.73,-0.73l1.11,0.04l-0.31,0.54l-0.07,1.36l-1.12,1.92l0.11,1.08l1.11,1.06l-0.06,1.5l2.31,2.41l1.25,0.57l0.94,1.47l1.01,3.29l1.74,1.52l0.58,1.29l3.08,1.91l1.44,-0.12l0.46,1.21l-1.05,0.57l0.17,1.31l0.35,0.18l-0.81,0.57l-0.07,1.2l0.67,0.2l0.85,-0.73l0.71,0.33l0.3,-0.21l0.76,1.5l-10.19,2.94l-8.32,-25.59Z", "name": "Delaware"}, "US-FL": {"path": "M632.37,423.12l47.45,-7.21l1.55,1.89l0.89,2.71l1.48,0.99l49.06,-5.55l1.04,1.38l0.04,1.09l0.56,1.05l0.87,0.49l1.83,-0.32l0.85,-0.76l-0.18,-4.58l-1.0,-1.48l-0.24,-1.77l0.27,-0.74l0.62,-0.31l0.11,-0.7l5.64,0.91l4.06,-0.2l0.16,1.25l-0.75,-0.12l-0.32,0.44l0.27,1.54l2.14,1.8l0.23,1.01l0.43,0.38l0.31,1.93l1.91,3.28l1.75,4.88l0.74,0.84l0.53,1.5l1.68,2.46l0.66,1.58l2.84,3.71l1.98,3.19l2.33,2.77l0.16,0.6l0.64,0.36l6.96,7.57l-0.5,-0.03l-0.27,0.62l-1.37,-0.01l-0.35,-0.66l0.37,-1.4l-0.16,-0.56l-2.33,-0.91l-0.46,0.53l1.04,2.82l0.79,0.98l2.21,4.81l10.15,13.83l1.42,3.15l3.77,5.42l-1.41,-0.35l-0.42,0.74l0.81,0.66l0.85,0.24l0.56,-0.22l1.49,0.95l2.1,3.1l-0.5,0.37l-0.11,0.53l1.17,0.53l0.92,1.87l-0.07,1.08l0.61,0.97l0.65,2.7l-0.26,0.77l1.06,9.2l-0.3,1.1l0.47,0.69l0.55,3.19l-0.8,1.49l0.1,2.3l-0.84,0.77l-0.19,1.86l-0.47,0.87l0.24,1.51l-0.28,1.8l0.48,0.84l0.09,0.93l0.48,0.24l-1.15,1.89l-0.37,1.32l-0.95,0.25l-0.54,-0.23l-1.38,0.47l-0.34,1.1l-0.9,0.32l-0.16,0.6l-0.86,0.7l-1.45,0.15l-0.28,-0.33l-1.25,-0.09l-0.9,1.09l-3.19,1.18l-1.08,-0.61l-0.73,-1.08l0.04,-1.87l1.02,0.86l1.68,0.48l0.26,0.65l0.52,0.07l1.36,-0.75l0.19,-0.7l-0.27,-0.64l-1.61,-1.13l-2.43,-0.26l-0.92,-0.47l-0.89,-1.72l-0.92,-0.75l0.22,-1.01l-0.49,-0.28l-0.53,0.16l-1.43,-2.59l-0.44,-0.29l-0.65,0.08l-0.46,-0.63l0.28,-0.33l-0.06,-0.58l-0.72,-0.66l-1.23,-0.61l-1.08,-0.08l-0.77,-0.55l-0.58,0.19l-2.84,-0.59l-0.51,0.66l0.25,-0.95l-0.47,-0.42l-0.88,0.13l-0.27,-0.74l-0.9,-0.67l-0.63,-1.45l-0.56,-0.1l-0.77,-3.02l-0.79,-1.02l-0.18,-1.56l-0.45,-0.85l-0.72,-0.91l-0.49,-0.15l-0.1,0.95l-1.33,-0.26l1.07,-1.35l0.29,-0.76l-0.13,-0.64l0.86,-1.51l0.65,-0.35l0.27,-0.85l-0.62,-0.38l-1.42,0.96l-0.88,1.32l-0.4,2.23l-1.38,0.37l-0.23,-1.36l-0.81,-1.35l-0.32,-4.13l-0.88,-0.61l1.64,-1.37l0.21,-0.99l-0.59,-0.41l-0.72,0.68l-1.57,0.56l-0.77,0.74l-0.76,-0.67l-0.4,0.27l-1.3,-0.9l-0.37,0.75l1.15,1.1l0.53,0.1l1.3,2.05l-1.05,0.25l-1.44,-0.38l-0.87,-1.63l-1.14,-0.61l-1.99,-2.59l-1.07,-2.32l-1.3,-0.89l0.09,-0.89l-1.0,-1.82l-1.8,-0.98l0.08,-0.69l0.99,-0.41l-0.36,-0.5l0.44,-0.75l-0.4,-0.35l0.4,-1.23l2.45,-4.56l-1.08,-2.44l-0.69,-0.46l-0.92,0.43l-0.27,0.94l0.31,1.22l-0.25,0.04l-0.76,-2.47l-1.0,-0.27l-1.2,-0.88l-1.53,-0.31l0.32,1.97l-0.48,0.63l0.27,0.59l2.24,0.56l0.26,0.99l-0.35,2.51l-0.32,-0.59l-0.8,-0.21l-2.17,-1.54l-0.42,0.21l-0.3,-0.64l0.58,-2.14l0.04,-3.02l-0.69,-1.99l0.42,-0.52l0.47,-1.94l-0.25,-0.54l0.63,-3.08l-0.4,-5.32l-0.38,-1.38l-0.37,-0.34l0.36,-0.47l-0.49,-2.2l-2.13,-1.32l-0.05,-0.53l-0.56,-0.42l-0.11,-1.03l-0.93,-0.73l-0.56,-1.52l-0.64,-0.24l-1.45,0.33l-1.03,-0.19l-1.58,0.56l-1.17,-1.75l-1.52,-0.47l-0.19,-0.6l-1.37,-1.51l-0.88,-0.58l-0.62,0.08l-1.54,-1.16l-0.81,-0.21l-0.53,-2.76l-3.09,-1.12l-0.66,-0.59l-0.53,-1.23l-2.18,-1.92l-2.21,-1.07l-1.46,-0.11l-3.47,-1.66l-2.86,1.01l-1.01,-0.4l-1.05,0.43l-0.35,0.69l-1.34,0.69l-0.5,0.71l0.03,0.65l-0.75,-0.22l-0.59,0.6l0.68,0.94l1.51,0.06l0.42,0.21l-3.05,0.26l-1.58,1.53l-0.91,0.46l-1.29,1.58l-1.56,1.05l-0.33,0.14l0.2,-0.5l-0.26,-0.53l-0.67,-0.04l-0.96,0.76l-1.11,1.52l-2.21,0.25l-2.12,1.09l-0.79,0.04l-0.29,-2.04l-1.74,-2.23l-2.23,-0.99l-0.18,-0.41l-2.54,-1.49l2.83,1.31l1.21,-0.75l-0.01,-0.74l-1.33,-0.33l-0.36,0.57l-0.22,-1.03l-0.35,-0.1l0.12,-0.52l-0.49,-0.33l-1.4,0.62l-2.33,-0.74l0.65,-1.09l0.83,-0.11l1.03,-1.47l-0.92,-0.95l-0.46,0.13l-0.49,1.03l-0.45,-0.03l-0.81,0.57l-0.73,-0.9l-0.7,0.1l-0.17,0.38l-1.35,0.74l-0.14,0.68l0.3,0.46l-3.99,-1.33l-5.09,-0.68l0.12,-0.24l1.28,0.29l0.61,-0.53l2.12,0.37l0.22,-0.78l-0.95,-1.02l0.08,-0.7l-0.63,-0.28l-0.5,0.32l-0.29,-0.47l-1.91,0.2l-2.27,1.12l0.3,-0.64l-0.41,-0.58l-0.96,0.36l-0.59,-0.25l-0.22,0.44l0.2,0.71l-1.46,0.81l-0.39,0.64l-5.21,1.01l0.31,-0.53l-0.4,-0.52l-1.36,-0.27l-0.73,-0.53l0.69,-0.54l0.0,-0.78l-0.68,-0.12l-0.82,-0.66l-0.46,0.11l0.14,0.76l-0.41,1.78l-1.06,-1.39l-0.7,-0.45l-0.55,0.07l-0.3,0.72l0.83,1.77l-0.25,0.8l-1.39,1.0l-0.05,1.04l-0.6,0.23l-0.17,0.57l-1.5,0.57l0.28,-0.66l-0.22,-0.46l1.14,-1.04l0.07,-0.74l-0.4,-0.58l-1.2,-0.23l-0.42,-0.84l0.3,-1.71l-0.19,-1.61l-2.19,-1.1l-2.42,-2.45l0.31,-1.45l-0.16,-1.04ZM770.96,489.55l0.5,1.09l0.91,0.4l0.78,-0.16l1.45,1.7l0.92,0.58l1.88,0.69l1.63,0.06l0.55,-0.45l-0.09,-0.89l0.55,-0.66l-0.17,-1.24l0.75,-1.4l0.07,-1.84l-0.66,-1.65l-1.49,-2.04l-1.77,-1.33l-1.2,-0.12l-1.12,0.86l-1.81,3.23l-2.12,2.0l-0.12,0.77l0.57,0.41ZM646.6,433.48l-0.95,0.27l0.41,-0.45l0.54,0.18ZM667.51,434.9l0.99,-0.29l0.36,0.31l0.1,0.73l-1.45,-0.75ZM773.86,453.5l0.44,0.57l-0.43,0.77l-0.01,-1.35ZM793.21,525.19l0.02,-0.12l0.03,0.05l-0.05,0.07ZM793.79,522.73l-0.25,-0.25l0.54,-0.38l-0.29,0.63ZM772.1,452.11l0.22,0.77l-0.28,2.36l0.31,1.82l-1.43,-3.27l1.19,-1.69ZM682.35,444.75l0.22,-0.2l0.37,0.02l-0.11,0.43l-0.48,-0.25Z", "name": "Florida"}, "US-WA": {"path": "M39.75,56.79l0.48,-1.33l0.18,0.46l0.65,0.31l1.05,-0.73l0.42,0.6l0.7,-0.02l0.18,-0.77l-0.9,-1.57l0.8,-0.74l-0.07,-1.37l0.49,-0.38l-0.09,-1.04l0.81,-0.26l0.04,0.51l0.47,0.42l0.96,-0.3l-0.08,-0.68l-1.33,-1.67l-0.91,0.14l-1.87,-0.58l0.2,-2.0l0.65,0.54l0.52,-0.07l0.3,-0.56l-0.16,-0.69l3.32,-0.49l0.27,-0.69l-1.68,-0.98l-0.86,-0.15l-0.35,-1.52l-0.7,-0.43l-0.81,-0.03l0.39,-4.77l-0.47,-1.3l0.11,-0.69l-0.4,-0.35l0.85,-5.8l-0.09,-2.49l-0.44,-0.63l-0.14,-1.38l-0.63,-1.35l-0.72,-0.58l-0.28,-2.49l0.39,-2.3l-0.14,-1.13l1.8,-3.33l-0.51,-1.26l4.52,3.99l1.18,0.4l0.91,0.77l0.78,1.33l1.84,1.11l3.22,0.94l0.82,0.78l1.42,0.12l1.72,1.05l2.32,0.76l1.47,-0.47l0.52,0.3l0.54,0.71l-0.05,1.1l0.54,0.75l0.31,0.12l0.49,-0.35l0.08,-0.77l0.44,0.04l0.61,1.42l-0.41,0.59l0.34,0.5l0.56,-0.03l0.73,-0.84l-0.35,-1.73l1.05,-0.23l-0.46,0.23l-0.22,0.69l1.21,4.49l-0.47,0.1l-1.69,1.73l0.24,-1.3l-0.22,-0.41l-1.32,0.3l-0.39,0.81l0.08,0.96l-1.4,1.71l-2.0,1.38l-1.08,1.42l-0.97,0.69l-1.12,1.67l-0.07,0.71l0.61,0.61l0.95,0.13l2.78,-0.46l1.23,-0.58l-0.02,-0.7l-0.64,-0.24l-2.95,0.77l-0.34,-0.31l3.28,-3.44l3.07,-0.87l0.91,-1.52l1.75,-1.54l0.52,0.57l0.54,-0.18l0.25,-1.83l-0.1,2.29l0.25,0.92l-0.98,-0.22l-0.65,0.77l-0.4,-0.74l-0.52,-0.2l-0.4,0.64l0.29,0.72l0.0,1.65l-0.19,-1.08l-0.67,-0.22l-0.47,0.69l-0.08,0.76l0.46,0.68l-0.64,0.59l-0.0,0.45l0.41,0.17l1.68,-0.56l0.23,1.11l-1.11,1.8l-0.1,1.06l-0.84,0.7l0.12,1.02l-0.84,-0.69l1.14,-1.45l-0.22,-0.97l-1.98,1.07l-0.39,0.64l-0.03,-2.13l-0.52,0.01l-1.05,1.6l-1.27,0.53l-1.16,1.87l-1.52,0.29l-0.47,0.43l-0.22,1.18l1.11,-0.03l-0.26,0.36l0.26,0.38l0.92,0.03l0.05,0.68l0.52,0.48l0.53,-0.27l0.37,-1.77l0.14,0.42l0.83,-0.14l1.09,1.5l1.32,-0.61l1.66,-1.47l1.0,-1.57l0.62,0.8l0.73,0.14l0.45,-0.23l-0.05,-0.87l1.56,-0.54l0.36,-0.94l-0.32,-1.28l0.24,-1.2l-0.16,-1.38l0.83,0.21l0.31,-0.92l-0.18,-0.76l-0.71,-0.65l0.91,-1.14l0.1,-1.77l1.26,-1.25l0.63,-1.38l1.62,-0.49l0.79,-1.16l-0.44,-0.67l-0.51,-0.02l-0.84,-1.32l0.19,-2.12l-0.25,-0.88l0.5,-0.81l0.07,-0.84l-1.13,-1.76l-0.62,-0.41l-0.16,-0.67l0.19,-0.51l0.59,0.24l0.53,-0.33l0.27,-1.83l0.8,-0.24l0.31,-1.01l-0.57,-2.36l0.45,-0.55l-0.02,-0.86l-0.95,-0.9l-0.95,0.3l-1.05,-2.71l0.96,-1.88l41.1,9.79l38.78,7.97l-10.24,55.02l-0.48,1.02l1.01,3.02l0.12,2.01l-1.02,1.3l0.71,1.89l-31.12,-6.19l-1.67,0.78l-7.23,-1.08l-1.69,0.9l-4.19,-0.16l-3.18,0.42l-1.65,0.73l-0.88,-0.27l-1.2,0.29l-1.5,-0.24l-2.42,-0.97l-0.91,0.45l-3.45,0.47l-2.1,-0.73l-1.65,0.28l-0.3,-1.37l-1.08,-0.89l-4.33,-1.51l-2.32,-0.14l-1.14,-0.52l-1.27,0.2l-1.9,0.84l-4.5,0.53l-1.1,-0.72l-1.15,-0.31l-1.6,-1.17l-1.84,-0.53l-0.62,-0.82l0.72,-6.83l-0.45,-0.95l-0.19,-1.91l-0.96,-1.36l-1.94,-1.7l-2.82,-0.14l-1.02,-1.32l-0.14,-1.05l-0.55,-0.64l-2.36,-0.34l-0.56,-0.31l-0.23,-0.79l-0.5,-0.18l-0.97,0.34l-0.83,-0.27l-1.1,0.39l-0.95,-1.49l-0.88,-0.24ZM63.27,41.42l0.15,0.75l-0.42,0.48l0.02,-0.91l0.26,-0.31ZM72.98,21.85l-0.63,0.89l-0.16,0.52l0.12,-1.02l0.67,-0.39ZM72.91,17.04l-0.1,-0.06l0.06,-0.05l0.05,0.11ZM72.14,16.87l-0.78,0.39l0.38,-0.7l-0.07,-0.62l0.23,-0.07l0.23,1.0ZM58.87,44.11l0.14,-0.06l-0.03,0.02l-0.12,0.04ZM69.46,20.67l1.77,-2.13l0.46,-0.02l0.5,1.75l-0.34,-0.56l-0.51,-0.12l-0.55,0.45l-0.35,-0.1l-0.36,0.74l-0.63,-0.01ZM69.54,21.84l0.46,0.01l0.6,0.51l0.08,0.36l-0.79,-0.21l-0.35,-0.68ZM70.49,24.67l-0.1,0.51l-0.0,0.0l-0.02,-0.24l0.12,-0.27ZM70.76,26.94l0.1,0.05l0.14,-0.05l-0.18,0.12l-0.06,-0.12ZM71.13,26.88l0.51,-0.96l1.09,1.49l0.01,0.89l-0.35,0.36l-0.33,-0.1l-0.25,-1.57l-0.68,-0.13ZM68.2,11.24l0.5,-0.34l0.16,1.55l-0.22,-0.05l-0.44,-1.16ZM69.91,10.93l0.82,0.83l-0.66,0.31l-0.16,-1.14ZM68.13,39.7l0.35,-1.09l0.22,-0.25l-0.05,1.08l-0.52,0.25ZM68.31,15.63l-0.41,-0.42l0.61,-0.75l-0.18,0.6l-0.02,0.57ZM68.47,15.97l0.4,0.2l-0.09,0.14l-0.28,-0.12l-0.03,-0.22ZM68.56,14.29l-0.01,-0.1l0.05,-0.13l-0.04,0.23ZM68.5,34.94l0.11,-1.05l0.35,-0.34l-0.25,1.58l-0.21,-0.18ZM66.18,14.44l-1.04,-0.84l0.22,-1.86l1.3,1.97l-0.36,0.18l-0.12,0.55ZM63.56,44.22l0.23,-0.25l0.02,0.01l-0.13,0.32l-0.12,-0.07ZM61.46,41.94l-0.1,-0.21l0.04,-0.08l0.0,0.12l0.06,0.16Z", "name": "Washington"}, "US-KS": {"path": "M478.81,242.03l0.44,0.62l0.76,0.17l1.05,0.79l2.2,-1.07l-0.0,0.74l1.08,0.77l0.23,1.42l-0.95,-0.15l-0.59,0.31l-0.17,0.95l-1.15,1.36l-0.06,1.12l-0.79,0.5l0.04,0.63l1.57,2.07l2.01,1.46l0.2,1.12l0.42,0.85l0.75,0.55l0.33,1.09l1.9,0.89l1.54,0.25l2.74,46.06l-31.67,1.55l-32.1,0.92l-32.11,0.27l-32.18,-0.39l1.25,-64.43l27.98,0.37l27.94,-0.15l27.93,-0.67l27.75,-1.17l1.65,1.2Z", "name": "Kansas"}, "US-WI": {"path": "M599.36,110.41l0.82,-0.15l-0.13,0.81l-0.56,0.02l-0.14,-0.67ZM594.93,119.05l0.47,-0.41l0.24,-2.36l0.95,-0.25l0.64,-0.7l0.21,-1.4l0.41,-0.64l0.63,-0.04l0.07,0.38l-0.76,0.07l-0.18,0.52l0.18,1.26l-0.38,0.17l-0.11,0.58l0.57,0.57l-0.24,0.65l-0.5,0.34l-0.68,1.91l0.07,1.23l-1.04,2.28l-0.41,0.15l-0.87,-0.96l-0.19,-0.71l0.3,-1.57l0.61,-1.05ZM510.78,127.49l0.4,-0.27l0.27,-0.9l-0.45,-1.48l0.03,-1.91l0.69,-1.16l0.52,-2.25l-1.63,-2.9l-0.83,-0.35l-1.28,-0.0l-0.22,-2.32l1.66,-2.27l-0.05,-0.78l0.76,-1.55l1.95,-1.09l0.48,-0.75l0.97,-0.25l0.45,-0.76l1.16,-0.14l1.03,-1.57l-1.02,-12.16l1.03,-0.35l0.22,-1.1l0.73,-0.98l0.78,0.69l1.69,0.64l2.61,-0.58l3.27,-1.59l2.64,-0.84l2.2,-2.15l0.31,0.29l1.39,-0.11l1.25,-1.49l0.78,-0.59l1.04,-0.1l0.4,-0.52l1.08,0.99l-0.47,1.7l-0.67,1.02l0.24,1.62l-1.19,2.22l0.64,0.65l2.49,-1.1l0.72,-0.87l2.16,1.22l2.34,0.47l0.44,0.54l0.86,-0.13l1.6,0.69l2.25,3.55l15.49,2.46l4.66,1.94l1.67,-0.17l1.63,0.41l1.33,-0.6l3.17,0.69l2.18,0.08l0.86,0.4l0.56,0.89l-0.41,1.1l0.41,0.77l3.4,0.61l1.41,1.12l-0.15,0.71l0.6,1.11l-0.35,0.81l0.44,1.25l-0.77,1.25l-0.02,1.76l0.91,0.63l1.38,-0.26l1.02,-0.73l0.2,0.25l-0.78,2.45l0.05,1.31l1.32,1.45l0.84,0.34l-0.23,2.01l-2.41,1.21l-0.51,0.79l0.05,1.25l-1.59,3.49l-0.38,3.49l1.11,0.81l0.92,-0.04l0.49,-0.36l0.49,-1.36l1.81,-1.48l0.65,-2.53l1.06,-1.7l0.59,0.17l0.57,-0.71l0.88,-0.4l1.13,1.11l0.59,0.19l-0.27,2.2l-1.16,2.82l-0.54,5.56l0.23,1.11l0.8,0.92l0.07,0.52l-0.5,0.98l-1.29,1.34l-0.85,3.87l0.16,2.56l0.72,1.19l0.07,1.23l-1.05,3.21l0.13,2.1l-0.72,2.1l-0.27,2.45l0.6,2.0l-0.03,1.31l0.49,0.53l-0.2,1.68l0.92,0.77l0.55,2.41l1.21,1.51l0.09,1.67l-0.32,1.44l0.49,2.91l-44.26,4.85l-0.2,-0.78l-1.57,-2.16l-4.95,-0.8l-1.06,-1.33l-0.37,-1.67l-0.91,-1.19l-0.88,-4.84l1.03,-2.6l-0.09,-0.98l-0.72,-0.78l-1.44,-0.47l-0.72,-1.74l-0.49,-5.97l-0.71,-1.39l-0.53,-2.54l-1.16,-0.6l-1.1,-1.55l-0.93,-0.11l-1.17,-0.74l-1.71,0.09l-2.68,-1.77l-2.31,-3.47l-2.65,-2.08l-2.94,-0.52l-0.73,-1.23l-1.13,-0.99l-3.12,-0.43l-3.54,-2.72l0.45,-1.24l-0.12,-1.61l0.25,-0.81l-0.89,-3.1ZM542.09,81.41l0.05,-0.28l0.03,0.16l-0.08,0.12ZM538.44,86.94l0.29,-0.22l0.05,0.09l-0.34,0.13Z", "name": "Wisconsin"}, "US-OR": {"path": "M11.03,140.91l0.03,-1.74l0.5,-0.82l0.34,-1.92l1.14,-1.87l0.26,-1.88l-0.69,-2.56l-0.33,-0.16l-0.1,-1.79l3.07,-3.74l2.56,-5.89l0.01,0.76l0.52,0.52l0.49,-0.28l0.61,-1.58l0.47,-0.47l0.3,0.98l1.12,0.42l0.33,-0.54l-0.43,-1.75l0.28,-0.86l-0.45,-0.14l-0.8,0.31l1.77,-3.11l1.14,-0.94l0.89,0.31l0.49,-0.28l-0.46,-1.08l-0.8,-0.4l1.81,-4.57l0.48,-0.56l0.03,-0.99l1.11,-2.64l0.65,-2.58l1.06,-1.89l0.33,0.28l0.66,-0.33l-0.03,-0.6l-0.75,-0.63l1.09,-2.58l0.32,0.22l0.6,-0.19l0.13,-0.34l-0.03,-0.51l-0.57,-0.33l0.89,-3.82l1.25,-1.78l0.86,-3.02l1.16,-1.74l0.86,-2.43l0.27,-1.21l-0.17,-0.5l1.2,-1.07l-0.3,-1.64l0.95,0.58l0.79,-0.62l-0.38,-0.76l0.21,-0.65l-0.76,-0.78l0.53,-1.07l1.31,-0.85l0.06,-0.45l-0.92,-0.35l-0.31,-1.26l1.0,-2.13l-0.03,-1.48l0.87,-0.52l0.59,-1.33l0.2,-1.96l-0.19,-1.45l0.81,1.18l0.6,0.18l-0.13,0.9l0.55,0.54l0.84,-0.95l-0.26,-1.0l0.22,-0.07l0.23,0.56l0.69,0.33l1.51,0.06l0.38,-0.35l1.37,-0.17l0.96,2.09l2.41,0.95l1.25,-0.63l0.78,0.05l1.7,1.53l0.76,1.05l0.19,1.9l0.42,0.78l-0.05,2.05l-0.4,1.24l0.18,0.93l-0.45,1.74l0.24,1.45l0.78,0.86l1.94,0.58l1.43,1.07l1.36,0.42l1.03,0.7l4.99,-0.48l2.91,-1.03l1.14,0.52l2.23,0.11l4.23,1.47l0.69,0.55l0.18,1.15l0.57,0.59l1.86,-0.25l2.1,0.73l3.79,-0.51l0.69,-0.42l2.18,0.95l1.64,0.26l1.2,-0.29l0.87,0.27l1.89,-0.76l3.07,-0.4l4.16,0.17l1.62,-0.9l7.15,1.08l0.96,-0.18l0.8,-0.58l31.21,6.2l0.22,1.81l0.91,1.83l1.15,0.64l1.95,1.88l0.55,2.46l-0.16,1.0l-3.72,4.51l-0.41,1.41l-1.41,2.61l-2.23,2.39l-0.67,2.67l-1.5,1.82l-2.24,1.48l-1.94,3.32l-1.5,1.26l-0.63,2.01l-0.13,1.86l0.28,0.92l0.56,0.62l0.54,0.04l0.39,-0.34l0.63,0.76l0.89,-0.04l0.06,0.87l0.8,0.95l-0.46,0.99l-0.65,0.05l-0.34,0.4l0.2,1.79l-1.04,2.53l-1.23,1.4l-7.11,38.72l-26.22,-5.22l-28.9,-6.33l-28.79,-6.92l-28.92,-7.58l-1.46,-2.58l0.22,-2.33l-0.22,-0.89Z", "name": "Oregon"}, "US-KY": {"path": "M584.42,307.35l0.34,-2.14l1.15,0.94l0.72,0.19l0.75,-0.36l0.46,-0.87l0.87,-3.5l-0.55,-1.72l0.38,-0.85l-0.11,-1.85l-1.28,-2.0l1.78,-3.17l1.25,-0.51l0.74,0.05l7.06,2.47l0.81,-0.2l0.65,-0.71l0.23,-1.91l-1.5,-2.1l-0.24,-1.4l0.19,-0.86l0.4,-0.52l1.1,-0.19l1.24,-0.83l3.01,-0.96l0.64,-0.51l0.14,-1.13l-1.54,-2.01l-0.08,-0.66l1.33,-1.95l0.14,-1.15l1.26,0.41l1.12,-1.32l-0.68,-1.97l1.93,0.87l1.72,-0.84l0.03,1.15l1.01,0.45l0.99,-0.94l0.02,-1.34l0.51,0.16l1.9,-0.97l4.43,1.46l0.64,0.92l0.86,0.17l0.59,-0.59l0.73,-2.49l1.39,-0.55l1.4,-1.34l0.87,1.26l0.77,0.41l1.16,-0.14l0.12,0.74l0.95,0.18l0.66,-0.62l0.02,-0.99l0.84,-0.38l0.27,-0.48l-0.25,-2.06l0.84,-0.4l0.34,-0.56l-0.06,-0.67l1.25,-0.57l0.34,-0.72l0.39,1.45l0.62,0.59l1.47,0.61l1.25,-0.01l1.12,0.79l0.52,-0.11l0.26,-0.54l1.1,-0.46l0.53,-0.69l0.03,-3.42l0.85,-2.15l1.03,0.17l1.55,-1.19l0.74,-3.41l1.04,-0.37l1.65,-2.21l-0.0,-0.81l-1.19,-2.81l2.79,-0.61l1.54,0.78l3.85,-2.82l2.24,-0.47l-0.19,-1.06l0.35,-1.45l-0.32,-0.36l-1.22,-0.02l0.57,-1.38l-1.09,-1.5l1.65,-1.82l1.82,1.15l0.92,-0.12l1.94,-1.02l0.78,0.86l1.76,0.51l0.57,1.26l0.94,0.9l0.8,1.81l2.61,0.63l1.88,-0.58l1.64,0.25l2.2,1.8l0.96,0.41l1.27,-0.19l0.6,-1.3l0.99,-0.54l1.36,0.48l1.35,0.02l1.34,1.06l1.26,-0.69l1.42,-0.16l1.8,-2.53l1.72,-1.04l0.94,2.3l0.7,0.81l2.46,0.77l1.36,0.94l0.75,1.02l0.95,3.28l-0.37,0.45l0.1,0.71l-0.44,0.61l0.02,0.53l2.26,2.56l1.36,0.89l-0.07,0.87l1.35,0.94l0.59,1.33l1.56,1.17l0.99,1.58l2.15,0.8l1.1,1.09l2.13,0.23l-4.83,6.08l-5.06,4.15l-0.42,0.86l0.23,1.22l-2.07,1.93l0.05,1.61l-3.06,1.65l-0.8,2.36l-1.71,0.61l-2.7,1.83l-1.66,0.49l-3.39,2.42l-32.85,4.78l-7.5,0.92l-7.71,0.53l-22.79,3.67l-0.64,-0.55l-3.64,0.12l-0.41,0.6l1.05,3.51l-23.08,2.87ZM582.3,307.55l-0.6,0.08l-0.06,-0.53l0.48,-0.02l0.18,0.47Z", "name": "Kentucky"}, "US-CO": {"path": "M364.77,242.03l-1.26,64.83l-29.41,-0.94l-29.5,-1.5l-29.46,-2.05l-32.29,-2.88l8.57,-85.75l27.85,2.51l28.29,2.01l29.65,1.53l28.02,0.91l-0.47,21.33Z", "name": "Colorado"}, "US-OH": {"path": "M666.13,180.72l1.67,0.44l1.04,-0.31l1.75,1.04l2.08,0.23l1.48,1.15l1.61,0.23l-2.08,1.16l-0.11,0.47l0.42,0.24l2.46,0.16l1.39,-1.1l1.77,-0.27l3.41,0.91l0.92,-0.09l1.47,-1.29l1.74,-0.61l1.14,-0.96l1.91,-0.98l2.62,-0.06l1.09,-0.62l1.24,-0.07l1.06,-0.8l4.22,-5.44l4.52,-3.48l6.9,-4.4l6.01,27.6l-0.51,0.54l-1.28,0.43l-0.41,0.94l1.67,2.19l0.03,2.07l0.41,0.26l0.32,0.92l-0.04,0.75l-0.54,0.82l-0.48,4.03l0.19,3.16l-0.57,0.41l0.34,1.09l-0.34,1.72l-0.39,0.54l0.77,1.21l-0.24,1.84l-2.4,2.64l-0.82,1.85l-1.36,1.49l-1.24,0.68l-0.6,0.7l-0.88,-0.89l-1.18,0.15l-1.31,1.73l-0.08,1.3l-1.78,0.86l-0.77,2.22l0.28,1.55l-0.93,0.85l0.31,0.66l0.63,0.4l0.27,1.27l-0.8,0.18l-0.5,1.59l0.05,-0.91l-0.92,-1.23l-1.53,-0.52l-1.13,0.8l-0.75,1.87l-0.33,2.65l-0.53,0.82l1.24,3.51l-1.46,0.64l-0.43,3.33l-2.54,1.14l-1.01,0.06l-0.77,-1.04l-1.52,-1.07l-2.35,-0.69l-1.17,-1.87l-0.32,-1.12l-0.74,-0.34l-2.26,1.33l-1.09,1.28l-0.4,1.04l-1.43,0.17l-0.87,0.61l-1.12,-0.98l-3.15,-0.55l-1.37,0.72l-0.53,1.24l-0.72,0.06l-3.06,-2.19l-1.94,-0.26l-1.78,0.58l-2.15,-0.49l-0.55,-1.51l-0.97,-0.95l-0.64,-1.35l-2.04,-0.73l-1.15,-0.98l-0.97,0.27l-1.31,0.89l-0.46,0.03l-1.8,-1.19l-0.61,0.21l-0.6,0.7l-8.79,-54.8l20.44,-4.42ZM676.8,183.09l0.5,-0.77l0.64,0.41l-0.44,0.34l-0.7,0.03Z", "name": "Ohio"}, "US-OK": {"path": "M399.74,360.02l-0.05,-41.47l-0.39,-0.4l-26.8,-0.23l-25.23,-0.63l0.32,-10.07l36.84,0.78l36.14,-0.07l36.13,-0.9l35.7,-1.7l0.62,10.51l4.61,23.98l1.48,37.44l-1.21,-0.21l-0.29,-0.36l-2.14,-0.2l-0.83,-0.78l-2.13,-0.38l-1.78,-2.03l-1.24,-0.21l-2.27,-1.54l-1.5,-0.39l-0.8,0.45l-0.23,0.87l-0.83,0.24l-0.46,0.62l-2.49,-0.13l-0.48,-0.19l-0.28,-0.67l-1.05,-0.6l-2.31,1.28l-1.17,0.2l-0.19,0.56l-0.63,0.27l-2.13,-0.76l-1.71,1.17l-2.07,0.51l-0.83,1.36l-1.49,0.07l-0.57,1.24l-1.27,-1.53l-1.71,-0.09l-0.32,-0.57l-1.21,-0.45l-0.2,-0.23l0.18,-0.72l-0.44,-0.5l-1.24,-0.17l-0.74,1.37l-0.67,0.11l-0.84,-0.49l-0.98,0.07l-0.71,-1.5l-1.09,-0.34l-1.17,0.57l-0.45,1.69l-0.71,-0.08l-0.49,0.43l0.29,0.72l-0.5,1.66l-0.44,0.19l-0.56,-0.54l-0.31,-0.89l0.39,-1.64l-0.76,-0.85l-0.8,0.18l-0.49,0.76l-0.85,-0.18l-0.93,0.97l-1.08,0.13l-0.53,-1.35l-2.0,-0.18l-0.3,-1.46l-1.19,-0.53l-0.83,0.33l-2.13,2.14l-1.22,0.51l-0.98,-0.37l0.19,-1.23l-0.29,-1.12l-2.34,-0.66l-0.08,-2.15l-0.44,-0.55l-2.11,0.39l-2.53,-0.25l-0.64,0.26l-0.81,1.2l-0.96,0.06l-1.77,-1.75l-0.97,-0.12l-1.51,0.55l-2.7,-0.63l-1.86,-0.99l-1.05,0.25l-2.48,-0.3l-0.18,-2.1l-0.86,-0.86l-0.44,-1.01l-1.17,-0.41l-0.7,-0.82l-0.82,0.08l-0.44,1.63l-2.23,-0.67l-1.08,0.59l-0.97,-0.09l-3.81,-3.74l-1.13,-0.43l-0.81,0.08Z", "name": "Oklahoma"}, "US-WV": {"path": "M694.57,249.01l3.95,-1.56l0.35,-0.7l0.11,-2.72l1.15,-0.23l0.4,-0.61l-0.59,-2.46l-0.62,-1.21l0.48,-0.64l0.34,-2.74l0.67,-1.65l0.46,-0.39l1.25,0.52l0.41,0.68l-0.13,1.12l0.71,0.44l0.77,-0.44l0.47,-1.41l0.5,0.21l0.57,-0.2l0.2,-0.45l-0.65,-2.06l-0.75,-0.53l0.8,-0.78l-0.27,-1.69l0.73,-1.98l1.65,-0.53l0.16,-1.58l1.01,-1.41l0.44,-0.09l0.65,0.77l0.67,0.18l2.27,-1.59l1.49,-1.63l0.78,-1.81l2.44,-2.66l0.36,-2.38l-0.74,-0.98l0.7,-2.31l-0.25,-0.75l0.58,-0.58l-0.29,-3.38l0.45,-3.87l0.53,-0.79l0.07,-1.1l-0.39,-1.18l-0.4,-0.32l-0.05,-1.97l-1.58,-1.86l0.44,-0.53l0.85,-0.11l0.3,-0.33l4.15,19.01l0.48,0.31l16.61,-3.72l2.23,10.49l0.51,0.37l2.05,-2.49l0.97,-0.57l0.34,-1.02l1.62,-1.98l0.25,-1.03l0.52,-0.41l1.2,0.42l0.73,-0.32l1.31,-2.58l0.6,-0.46l-0.04,-0.85l0.42,0.58l1.81,0.49l3.2,-0.61l0.77,-0.86l0.07,-1.44l1.99,-0.76l1.02,-1.69l0.67,-0.11l3.17,1.44l1.8,-0.73l-0.44,1.01l0.56,0.9l1.28,0.4l0.09,0.95l1.13,0.4l0.1,1.18l0.34,0.41l-0.56,3.59l-9.05,-4.28l-0.64,0.25l-0.3,1.14l0.39,1.58l-0.51,1.61l0.42,2.24l-1.35,2.39l-0.41,1.74l-0.72,0.53l-0.41,1.09l-0.28,0.22l-0.61,-0.22l-0.37,0.33l-1.23,3.26l-1.86,-0.74l-0.64,0.26l-0.93,2.75l0.09,1.44l-0.73,1.14l-0.18,2.3l-0.88,2.18l-3.26,-0.31l-1.45,-1.71l-1.71,-0.22l-0.5,0.42l-0.25,2.14l0.2,1.28l-0.31,1.43l-0.49,0.45l-0.31,1.03l0.23,0.91l-1.57,2.42l-0.03,2.07l-0.51,1.98l-2.56,4.69l-0.74,3.13l0.15,0.76l1.14,0.52l-1.08,1.37l0.06,0.6l0.44,0.39l-2.15,2.12l-0.55,-0.69l-0.84,0.16l-3.12,2.54l-1.04,-0.54l-1.31,0.27l-0.43,0.9l0.46,1.14l-0.91,0.91l-0.74,-0.04l-2.27,1.02l-1.21,0.97l-2.2,-1.31l-0.73,0.0l-0.81,1.57l-1.1,0.5l-1.22,1.46l-1.09,0.1l-1.99,-1.05l-1.31,0.0l-0.62,-0.73l-1.2,-0.58l-0.31,-1.31l-0.88,-0.53l0.35,-0.66l-0.31,-0.81l-0.85,-0.36l-0.84,0.25l-1.34,-0.15l-1.27,-1.16l-2.07,-0.75l-0.77,-1.4l-1.59,-1.21l-0.71,-1.46l-1.0,-0.57l-0.13,-1.07l-1.39,-0.92l-2.01,-2.21l0.7,-2.0l-0.26,-1.59l-0.67,-1.43Z", "name": "West Virginia"}, "US-WY": {"path": "M218.82,209.32l10.47,-85.76l25.45,2.87l26.8,2.51l26.84,2.0l27.86,1.53l-3.81,86.31l-27.38,-1.48l-28.27,-2.06l-29.76,-2.75l-28.2,-3.17Z", "name": "Wyoming"}, "US-UT": {"path": "M178.98,182.72l41.58,5.7l-2.59,21.2l0.35,0.45l32.3,3.59l-8.57,85.75l-42.69,-4.9l-42.54,-6.06l16.56,-106.59l5.59,0.86ZM188.02,193.73l-0.3,0.03l-0.25,0.61l0.72,3.63l-0.81,0.18l-0.5,1.3l1.14,0.59l0.36,-0.83l0.37,-0.17l0.92,1.13l0.82,1.66l-0.26,0.99l0.15,1.43l-0.41,0.76l0.39,0.51l-0.05,0.55l1.57,1.82l0.02,0.59l1.12,1.91l0.71,-0.09l0.85,-1.72l0.07,2.25l0.53,0.94l0.06,1.77l0.99,0.47l1.66,-0.65l2.5,-1.73l0.38,-1.23l3.33,-1.39l0.18,-0.54l-0.52,-1.01l-0.68,-0.84l-1.36,-0.7l-1.85,-4.54l-0.87,-0.47l0.87,-0.89l1.3,0.6l1.33,-0.14l0.92,-0.82l-0.06,-1.11l-1.55,-0.51l-0.81,0.41l-1.18,-0.12l0.28,-0.75l-0.58,-0.78l-1.86,-0.23l-0.57,1.12l0.28,0.78l-0.35,0.67l0.54,2.41l-0.91,0.31l-0.34,-0.41l0.22,-1.78l-0.42,-0.69l-0.06,-1.72l-0.68,-0.6l-1.33,-0.12l-1.07,-1.54l-0.18,-0.67l0.64,-0.54l0.36,-1.28l-0.82,-1.37l-1.22,-0.29l-0.99,0.79l-2.74,0.17l-0.36,0.62l0.61,0.83l-0.28,0.42ZM199.39,206.21l0.03,0.02l0.03,0.09l-0.06,-0.11ZM199.42,207.0l0.31,0.91l-0.18,0.88l-0.39,-0.92l0.26,-0.87Z", "name": "Utah"}, "US-IN": {"path": "M601.93,192.0l1.44,0.85l2.1,0.13l1.52,-0.39l2.63,-1.39l2.73,-2.1l32.34,-5.07l9.08,56.53l-0.66,1.15l0.31,0.91l0.81,0.76l-0.65,1.12l0.5,0.79l1.12,0.03l-0.36,1.11l0.18,0.5l-1.81,0.3l-3.18,2.54l-0.44,0.18l-1.41,-0.78l-3.46,0.93l-0.09,0.77l1.21,3.04l-1.4,1.87l-1.18,0.5l-0.45,0.88l-0.3,2.56l-1.12,0.88l-0.89,-0.25l-0.63,0.49l-0.85,1.93l0.06,3.09l-0.39,0.98l-1.39,0.85l-0.94,-0.66l-1.24,0.02l-1.48,-0.66l-0.63,-1.81l-1.89,-0.7l-0.44,0.3l-0.03,0.51l0.82,0.66l-0.62,0.3l-0.89,-0.34l-0.35,0.29l-0.04,0.48l0.55,0.9l-1.08,0.68l0.15,2.34l-1.06,0.65l0.0,0.82l-0.16,0.36l0.08,-0.48l-0.34,-0.51l-1.61,0.19l-1.42,-1.65l-0.49,-0.07l-1.67,1.49l-1.57,0.69l-1.07,2.86l-0.82,-1.05l-2.8,-0.74l-1.12,-0.59l-1.08,-0.17l-1.76,0.92l-0.64,-1.0l-0.58,-0.18l-0.53,0.56l0.65,1.83l-0.33,0.82l-0.29,0.09l-0.03,-1.15l-0.43,-0.39l-2.04,0.81l-1.42,-0.81l-0.84,0.01l-0.48,0.95l0.72,1.52l-0.49,0.73l-1.16,-0.38l-0.08,-0.53l-0.52,-0.42l0.54,-0.62l-0.35,-3.04l0.95,-0.78l-0.08,-0.59l-0.43,-0.22l0.68,-0.45l0.25,-0.61l-1.18,-1.43l0.45,-1.15l0.33,0.19l0.59,-0.44l0.8,-0.1l0.33,-1.77l0.55,-0.39l0.44,-0.91l-0.06,-0.82l1.52,-1.06l0.06,-0.69l-0.42,-0.9l0.57,-0.85l0.13,-1.27l0.87,-0.51l0.39,-1.89l-1.1,-2.5l0.22,-0.78l-0.17,-1.1l-0.94,-0.89l-0.62,-1.47l-1.06,-0.76l-0.04,-0.57l0.92,-1.38l-0.64,-2.21l1.27,-1.31l-6.7,-49.9Z", "name": "Indiana"}, "US-IL": {"path": "M541.12,227.85l0.87,-0.35l0.37,-0.67l-0.24,-2.29l-0.74,-0.92l0.15,-0.4l0.71,-0.69l2.42,-0.98l0.71,-0.64l0.63,-1.67l0.17,-2.08l1.64,-2.45l0.27,-0.94l-0.04,-1.21l-0.59,-1.92l-2.24,-1.84l-0.12,-1.74l0.66,-2.35l0.45,-0.37l4.61,-0.86l0.81,-0.41l0.82,-1.11l2.55,-1.0l1.43,-1.55l-0.01,-1.56l0.4,-1.69l1.42,-1.45l0.29,-0.74l0.32,-4.32l-0.77,-2.12l-4.03,-2.42l-0.28,-1.47l-0.49,-0.81l-3.66,-2.42l44.64,-4.88l0.0,2.62l0.58,2.56l1.39,2.45l1.31,0.93l0.77,2.56l1.27,2.67l1.43,1.81l6.81,50.69l-1.22,1.12l-0.1,0.69l0.68,1.72l-0.83,1.07l-0.03,1.1l1.2,1.07l0.57,1.38l0.9,0.8l-0.09,1.78l1.07,2.26l-0.27,1.46l-0.87,0.56l-0.21,1.45l-0.59,0.92l0.33,1.18l-1.48,1.12l-0.22,0.42l0.29,0.68l-0.93,1.16l-0.3,1.18l-1.65,0.68l-0.62,1.65l0.16,0.8l0.97,0.8l-1.27,1.14l0.4,0.75l-0.47,0.23l-0.12,0.55l0.43,2.88l-1.15,0.2l0.08,0.45l0.9,0.75l-0.47,0.17l-0.02,0.64l0.83,0.28l0.04,0.41l-1.3,1.95l-0.24,1.17l0.6,1.21l0.7,0.63l0.37,1.05l-3.32,1.23l-1.19,0.81l-1.25,0.25l-0.77,1.0l-0.17,2.02l0.31,0.87l1.41,1.89l0.07,0.52l-0.53,1.17l-0.97,0.03l-6.33,-2.35l-1.08,-0.07l-1.58,0.64l-0.68,0.71l-1.43,2.91l0.06,0.66l-1.19,-1.18l-0.79,0.14l-0.35,0.47l0.57,1.11l-1.23,-0.76l-0.02,-0.67l-1.61,-2.16l-0.4,-1.1l-0.76,-0.36l-0.05,-0.47l0.94,-1.33l0.2,-1.02l-0.33,-1.0l-1.45,-1.98l-0.48,-3.13l-2.27,-0.96l-1.56,-2.09l-1.96,-0.79l-1.73,-1.31l-1.57,-0.13l-1.83,-0.93l-2.33,-1.73l-2.36,-2.39l-0.37,-1.91l2.36,-6.76l-0.25,-2.28l0.98,-2.03l-0.39,-0.84l-2.68,-1.41l-2.6,-0.64l-1.28,0.45l-0.86,1.43l-0.46,0.28l-0.45,-0.12l-1.3,-1.86l-0.43,-1.49l0.15,-0.86l-0.54,-0.9l-0.29,-1.62l-0.83,-1.33l-0.94,-0.88l-4.13,-2.46l-1.01,-1.61l-4.55,-3.45l-0.74,-1.87l-1.05,-1.19l-0.04,-1.57l-0.97,-1.45l-0.76,-3.48l0.09,-2.89l0.6,-1.26ZM586.9,296.43l0.05,0.06l0.03,0.03l-0.05,-0.0l-0.04,-0.09Z", "name": "Illinois"}, "US-AK": {"path": "M87.36,534.18l0.47,0.12l0.39,-0.03l0.07,0.37l-0.38,0.38l-0.69,0.33l-0.12,-0.13l0.29,-0.43l-0.1,-0.33l0.07,-0.29ZM89.85,534.33l0.63,-0.13l0.31,-0.6l1.87,-0.44l2.32,0.02l1.55,0.61l0.8,0.71l-0.15,1.95l0.18,0.42l0.1,-0.0l0.29,0.45l0.44,-0.08l0.29,-0.27l0.0,-0.67l0.34,0.23l-0.11,0.47l0.79,0.97l-0.04,0.07l-0.3,-0.1l-0.32,-0.32l-0.32,-0.11l-0.45,0.39l-0.16,-0.54l-0.38,-0.04l-0.24,0.12l-0.25,-0.16l-0.24,0.07l-0.39,-0.32l-0.3,-0.04l-0.73,0.26l-0.89,-0.2l-0.06,-0.27l-0.23,-0.18l0.36,-0.29l0.69,0.74l0.47,-0.03l0.21,-0.45l-0.25,-0.46l-0.0,-0.32l-0.26,-0.72l-0.96,-0.54l-1.1,0.3l-0.64,0.75l-0.83,0.25l-0.29,0.09l-0.42,-0.31l-0.48,0.11l-0.1,0.17l-0.65,-0.16l-0.28,0.07l-0.24,0.25l0.25,-0.28l-0.05,-0.59l0.21,-0.89ZM99.7,537.94l0.33,-0.34l0.43,-0.24l-0.01,-0.35l-0.47,-1.08l0.15,-0.27l0.65,-0.28l0.32,-0.33l0.72,-0.38l0.65,-0.03l0.43,-0.15l0.83,0.08l1.47,-0.11l0.63,0.14l0.1,0.14l0.38,0.14l0.9,0.09l0.27,0.15l0.28,-0.24l0.27,-0.06l0.37,0.08l0.18,0.21l0.27,-0.04l0.21,0.43l0.39,0.27l0.08,0.22l0.71,-0.02l0.39,-0.85l0.55,-0.71l0.52,-0.25l1.89,-0.56l0.5,0.02l0.35,0.22l1.22,-0.45l0.64,0.02l-0.15,0.41l0.4,0.58l0.61,0.29l0.46,-0.01l0.45,-0.47l0.13,-0.43l-0.35,-0.28l-0.25,-0.06l0.17,-0.42l-0.14,-0.42l1.23,-1.18l0.98,-1.13l0.16,-0.1l0.35,0.16l0.38,-0.03l0.26,0.28l0.17,0.41l0.67,-0.24l-0.05,-0.61l-0.38,-0.61l-0.45,-0.26l0.25,-0.55l0.9,-0.58l0.37,0.02l0.73,-0.26l0.84,-0.13l0.57,0.16l0.44,-0.15l-0.12,-0.56l0.24,-0.11l0.62,-0.65l0.43,0.04l0.24,-0.11l0.52,-0.62l0.38,-0.16l0.2,-0.48l-0.44,-0.28l-0.55,0.11l-0.59,0.59l-0.54,-0.07l-0.54,0.34l-2.21,-0.44l-1.73,-0.17l-0.68,-0.22l-0.09,-0.2l0.22,-0.4l0.08,-0.44l-0.26,-0.66l0.69,-0.45l0.24,-0.34l0.47,0.57l-0.21,0.72l0.03,0.41l0.61,0.14l0.29,-0.14l-0.01,-0.29l0.21,-0.39l0.04,-0.79l-0.74,-1.1l0.09,-0.77l-0.68,-0.24l-0.21,0.25l-0.12,0.58l-0.54,0.27l-0.27,-0.56l-0.34,-0.08l-0.49,0.37l-0.07,0.34l-0.24,0.24l-0.4,-0.01l-0.48,0.27l-0.29,0.57l-0.53,1.69l-0.27,0.06l-0.23,-0.38l0.4,-2.82l0.01,-0.54l-0.15,-0.55l0.18,-0.2l0.14,-0.44l-0.15,-0.33l-0.51,-0.26l-0.94,0.36l0.02,-0.53l-0.5,-0.64l0.24,-0.28l0.16,-0.7l-0.14,-0.41l-0.58,-0.27l-1.94,0.1l-0.58,-0.32l-1.04,-0.07l-0.2,-0.36l-0.24,-0.06l-1.16,0.65l-0.73,-0.13l-0.06,-0.42l-0.15,-0.03l0.18,-0.12l0.34,0.1l0.5,-0.11l0.29,-0.39l-0.16,-0.57l0.5,-0.64l0.9,-0.0l0.43,-0.18l0.13,-0.3l-0.1,-0.46l-1.07,-0.66l0.16,-0.38l0.4,-0.21l0.45,-0.53l1.21,-0.08l0.23,-0.1l0.17,-0.27l0.17,-1.07l0.3,-0.59l0.27,-1.56l0.33,-0.54l-0.01,-0.63l0.14,-0.31l1.0,-0.81l-0.03,-0.14l0.2,-0.15l-0.2,-0.34l-0.24,-0.11l-0.14,0.07l-0.09,-0.34l0.71,-0.3l0.4,-0.32l0.52,-0.13l0.31,-0.33l0.46,-0.04l0.15,0.15l0.45,0.08l0.33,-0.12l0.44,-0.51l-0.32,-0.4l-0.34,-0.04l-0.01,-0.32l-0.27,-0.36l-0.62,0.35l0.01,0.16l-0.56,-0.06l-1.27,0.79l-0.19,-0.04l-0.58,0.22l-0.38,-0.03l-0.25,0.1l-0.05,0.15l-0.48,-0.06l-0.17,0.47l0.35,0.75l-0.37,0.25l-0.22,0.4l-0.2,0.15l-0.15,-0.07l-0.13,-0.26l-2.03,-0.22l-1.8,-0.94l-0.73,-0.6l-0.44,-0.69l0.09,-0.39l0.11,0.06l0.53,-0.13l-0.05,-0.33l0.13,-0.31l-0.38,-1.12l0.22,-0.87l-0.11,-0.58l0.42,-0.68l-0.42,-0.31l-0.21,0.02l-0.35,-0.67l0.0,-0.37l0.37,-0.01l0.39,-0.17l0.32,-0.43l-0.03,-0.35l-0.26,-0.27l-0.54,-0.17l1.35,0.03l0.28,-0.15l0.21,-0.32l0.67,-0.05l0.02,0.53l0.51,0.51l0.27,0.51l-0.09,0.24l-0.29,-0.02l-0.62,0.18l-0.55,0.48l0.0,0.14l0.31,0.38l1.01,-0.16l0.4,0.22l0.27,-0.03l0.46,-0.28l0.28,-0.0l0.09,0.08l-0.64,0.61l-0.16,0.47l0.03,0.25l0.17,0.24l0.48,0.24l1.49,-0.04l0.27,-0.18l0.18,-0.34l0.2,-0.07l-0.14,-0.9l0.27,-0.1l0.2,-0.27l0.02,-0.32l-0.13,-0.24l0.2,-0.53l-0.06,-0.13l-0.55,-0.28l-0.84,0.04l-0.35,0.16l-0.97,-0.93l-0.42,-0.26l0.07,-0.57l-0.33,-0.44l-0.24,-0.13l-0.19,-0.48l0.19,0.03l0.07,-0.09l0.52,0.15l0.51,-0.35l-0.15,-0.47l-0.73,-0.52l0.2,-0.06l0.41,-0.42l-0.11,-0.55l0.12,-0.15l0.41,-0.21l0.27,0.07l0.5,-0.15l0.43,0.25l0.8,-0.11l0.67,-0.43l-0.02,-0.53l-0.18,-0.22l-0.45,-0.06l-0.66,0.28l-0.44,-0.17l-1.09,0.08l-0.76,0.26l-0.36,0.37l-0.7,0.11l-0.18,0.15l-0.15,0.39l-0.12,0.12l-0.06,-0.08l0.08,-0.32l0.35,-0.45l-0.07,-0.08l0.19,0.01l0.12,-0.14l-0.1,-0.06l0.17,-0.46l-0.4,-0.6l0.11,-0.27l0.4,0.09l0.24,-0.06l0.45,-0.5l0.04,-0.34l-0.13,-0.54l-0.39,-0.37l1.09,0.44l0.4,-0.45l-0.38,-0.63l-0.06,-0.33l0.52,0.48l0.98,0.33l0.18,-0.4l0.12,0.03l0.05,-0.61l0.22,-0.48l0.63,-0.43l0.57,-0.07l2.22,-0.76l0.81,-0.13l0.27,0.19l-0.08,0.5l0.2,0.34l-0.41,0.26l0.13,0.45l0.3,0.14l0.85,-0.04l0.29,-0.37l0.05,-0.95l-0.19,-0.11l0.35,0.03l1.35,-0.27l0.27,-0.58l-0.05,-0.09l-0.31,-0.21l-0.9,0.06l0.08,-0.22l0.5,-0.05l0.12,-0.59l0.14,-0.14l0.89,-0.42l0.73,0.88l0.38,0.11l0.32,-0.23l0.16,-0.44l-0.01,-0.27l-0.25,-0.44l0.64,-0.07l0.65,0.27l0.28,0.29l0.41,0.85l-0.04,0.22l-0.15,0.1l0.04,0.18l-0.54,-0.04l-0.54,0.27l-0.1,0.49l0.46,0.2l1.1,-0.05l-0.07,0.5l0.35,0.37l0.69,0.38l0.34,0.09l0.95,-0.04l0.57,-0.28l0.44,0.15l0.53,-0.06l1.67,-0.57l0.1,0.54l1.59,0.9l0.27,0.34l0.54,0.31l1.07,0.28l2.13,-0.53l0.42,-0.22l0.47,-0.45l0.41,-0.77l0.37,-1.17l0.9,-1.39l0.06,-0.37l-0.1,-0.54l0.04,-0.33l0.22,-0.25l-0.06,-0.5l0.46,0.37l0.31,0.02l0.23,-0.16l1.15,-0.23l0.62,-0.63l0.26,-1.05l-0.15,-0.65l0.51,-0.43l-0.22,-0.39l-0.76,-0.38l-0.4,0.19l-0.4,0.02l-0.6,0.33l-0.26,-0.29l-0.05,-0.41l-0.3,-0.35l-0.49,-0.04l-0.07,0.23l-0.62,0.0l-0.43,-0.28l-0.08,0.09l-0.54,-0.03l-0.36,0.17l-0.95,-0.12l-0.9,0.24l0.06,-0.3l-0.16,-0.8l0.04,-0.58l-0.1,-0.59l-0.54,-0.21l-0.87,0.1l-0.29,-0.51l-0.43,-0.43l-0.59,-0.28l-1.06,-1.04l-0.92,-0.12l-0.2,-0.28l-0.43,-0.23l-0.07,-0.22l-0.65,-0.06l-0.17,0.22l-0.7,-1.25l-0.93,-1.21l-0.6,-0.94l-0.15,-0.58l0.22,-0.72l0.16,-0.13l0.26,0.05l0.25,-0.13l0.49,-0.79l-0.01,-0.48l-0.21,-0.69l0.21,-0.4l0.5,0.21l0.56,-0.14l0.47,-0.29l0.4,0.66l0.5,0.23l0.42,-0.32l0.06,-0.37l-0.2,-0.74l-0.43,-0.44l-0.33,-0.84l-0.73,-0.89l-0.16,-0.04l-0.77,-1.14l-0.22,-0.53l0.03,-0.34l-0.38,-1.37l0.77,0.03l0.48,0.42l0.39,0.13l0.39,-0.13l0.19,-0.28l0.19,0.05l0.18,-0.27l0.19,-0.0l0.22,0.55l0.54,0.22l1.01,0.04l0.19,-0.16l0.17,0.07l0.66,-0.29l1.57,0.23l0.08,0.66l0.76,0.9l1.11,0.4l0.5,-0.28l0.03,-0.12l-0.01,-0.26l-0.38,-0.97l0.25,-0.04l1.04,0.11l0.61,0.18l0.24,0.17l0.02,0.44l0.76,0.16l0.33,-0.12l1.02,-0.04l0.42,0.17l1.32,0.83l0.03,0.42l0.15,0.18l-0.14,0.16l-0.52,0.11l-0.41,0.31l-0.48,0.71l-0.5,-0.17l-0.63,-0.09l-0.12,0.06l-0.08,0.66l0.52,0.44l-0.12,0.64l0.09,0.45l0.28,0.39l0.8,0.5l0.15,0.33l0.4,0.4l0.72,0.27l0.32,0.25l-0.29,0.37l-0.04,0.29l0.48,0.32l0.22,-0.09l0.18,0.07l0.07,0.23l0.35,0.3l0.54,0.08l0.24,0.37l-0.17,0.51l0.21,0.38l0.49,0.2l0.35,-0.15l0.07,-0.28l0.31,-0.03l0.3,-0.25l1.17,-0.57l0.04,0.5l0.32,0.37l-0.13,0.11l-0.33,0.02l-0.08,0.49l0.34,0.34l0.57,-0.02l0.77,-0.55l0.23,-0.37l0.13,-0.95l-0.53,-1.05l0.53,0.03l0.16,0.37l-0.04,0.42l0.21,0.94l0.5,0.48l1.23,0.64l0.3,0.05l0.27,-0.1l0.29,-0.29l0.49,-0.7l0.1,-0.53l0.43,-0.51l-0.16,-0.31l-0.71,-0.34l-0.49,-0.01l-0.06,-0.56l-0.18,-0.38l-0.88,-0.51l-0.51,-0.09l-0.69,0.4l-0.2,-0.22l0.09,-0.54l-0.1,-0.15l-0.06,-0.94l0.33,-0.37l0.4,-0.14l0.27,-0.3l0.38,-0.08l0.3,0.24l0.3,0.04l0.39,-0.33l0.04,-0.19l-0.5,-1.34l-0.57,-0.43l-0.49,-0.19l-0.05,-0.43l0.37,-0.35l0.03,-0.29l-0.11,-0.24l-0.51,-0.23l-0.39,0.26l0.03,0.11l-0.6,0.24l-0.2,-0.44l-0.8,-0.5l-0.12,-0.35l-1.08,-1.4l1.04,-1.59l0.48,-1.31l0.21,-1.26l-0.22,-1.28l0.02,-1.32l-0.25,-0.51l-0.08,-1.73l-0.15,-0.88l-0.74,-1.55l0.16,-0.91l-0.24,-1.2l0.25,-0.0l1.0,-0.81l0.49,-0.22l1.3,-1.27l0.3,-0.44l0.16,0.26l0.43,0.32l0.33,0.49l1.57,1.15l0.85,0.35l1.25,0.85l0.65,0.21l0.78,0.09l1.5,-0.09l1.75,-0.56l0.32,0.05l0.52,-0.2l1.22,-0.98l0.43,-0.54l0.4,-0.31l0.55,-0.18l0.17,-0.45l2.11,-0.42l0.63,-0.43l0.54,-0.09l0.2,-0.19l0.25,-0.04l0.1,0.18l0.69,0.39l0.89,0.14l0.09,-0.15l0.19,-0.05l0.66,0.47l0.8,0.14l0.38,0.39l0.41,-0.26l2.49,-0.32l-0.46,0.31l0.23,0.44l-0.72,0.37l-0.11,0.57l0.36,0.2l-0.26,1.06l0.21,0.46l0.49,-0.11l0.8,-1.61l0.24,-0.23l0.25,0.17l0.55,0.07l0.28,0.23l0.49,0.02l0.31,-0.11l-0.07,-0.72l-0.28,-0.1l-0.33,-0.32l-0.36,-0.04l-0.0,-0.14l0.16,-0.3l0.05,-0.61l0.41,0.07l0.82,-0.35l-0.0,1.13l0.16,0.42l0.45,0.0l0.24,-0.34l0.43,0.18l0.24,-0.1l0.46,0.48l1.04,0.48l0.2,-0.05l0.71,0.47l0.58,0.1l1.34,-0.08l1.42,-0.31l1.29,-0.65l1.13,-0.41l0.06,0.74l0.64,0.58l-0.31,0.27l0.14,0.59l0.58,0.09l0.25,0.14l0.16,0.27l-0.16,0.38l-0.53,0.08l-0.22,0.14l-0.83,-0.31l-0.6,0.19l-0.28,0.66l0.17,0.37l-0.54,0.69l0.23,0.62l0.39,0.04l0.35,-0.31l0.64,0.31l0.32,-0.03l0.36,-0.22l0.3,-0.41l0.4,-0.13l0.35,0.33l0.27,-0.05l0.33,0.15l0.24,-0.07l0.35,-0.34l0.08,0.63l-0.43,0.35l-0.58,0.09l0.1,0.73l-0.05,0.46l0.2,0.27l0.55,0.25l-0.11,0.23l0.12,0.4l0.22,0.16l0.4,0.05l1.03,-0.36l0.71,0.57l0.62,0.22l0.32,-0.04l0.14,0.36l0.2,0.09l0.02,0.43l0.24,0.25l0.17,0.54l0.45,0.04l0.29,-0.21l0.23,0.34l-1.14,0.49l-0.31,0.63l-0.62,0.16l-0.15,0.49l0.34,0.45l1.51,0.71l-0.37,0.08l-0.25,0.18l-0.03,0.62l0.55,0.49l0.67,0.4l0.14,0.2l0.13,0.59l0.36,0.22l0.46,-0.17l0.1,-0.24l1.06,0.38l0.2,-0.18l0.27,0.35l-0.2,0.22l0.18,0.58l1.13,0.28l0.65,-0.12l0.18,0.18l0.66,0.24l0.02,0.15l0.23,0.24l0.36,0.11l0.34,0.46l0.11,0.53l0.19,0.07l0.56,0.71l-0.11,0.23l0.06,0.57l0.51,0.33l0.5,-0.08l0.1,0.41l0.41,0.37l-0.19,0.45l0.29,0.52l0.7,0.54l0.72,0.78l0.67,0.31l0.22,-0.06l1.43,0.88l0.33,0.49l0.45,0.21l0.37,0.84l0.07,-0.04l0.02,0.34l0.12,0.03l0.31,0.59l-0.03,0.31l0.51,0.28l0.38,0.42l0.36,0.11l0.29,0.27l0.49,0.2l0.84,-0.17l0.4,0.22l0.04,0.55l0.49,0.04l0.4,-0.4l0.51,0.02l0.21,0.18l0.6,0.22l-0.03,0.31l0.54,0.37l0.22,-0.21l0.16,0.11l0.21,0.36l0.27,0.08l0.28,0.52l-0.06,0.4l0.39,0.53l-0.08,0.29l0.11,0.51l0.48,0.47l0.03,0.45l0.13,0.18l0.35,0.13l0.38,0.48l0.3,1.3l0.27,0.3l0.68,0.03l-33.88,69.97l0.07,0.44l1.39,1.52l0.56,0.03l0.2,-0.18l1.0,1.36l0.47,0.14l1.42,-0.55l1.71,0.67l-1.05,1.27l-0.09,0.32l0.25,1.15l0.83,1.01l-0.14,0.64l0.04,0.6l1.99,5.34l-0.34,1.76l-0.34,0.47l0.19,0.61l0.33,0.11l0.27,-0.0l0.86,-0.33l0.55,-0.04l0.04,0.26l-0.76,0.37l-0.33,0.35l0.29,0.55l0.37,-0.02l0.38,-0.21l0.2,0.1l0.0,0.24l0.53,0.24l0.14,1.31l0.1,0.14l-0.31,0.03l-0.1,0.46l0.22,0.36l0.92,0.24l0.05,0.19l-0.31,0.19l-0.0,0.13l0.19,0.34l0.19,0.11l-0.13,0.52l-0.19,-0.01l-0.06,-0.5l-0.34,-0.34l-0.12,0.06l-0.23,-0.49l-0.51,-0.04l-0.29,0.41l-0.27,-0.02l-0.23,0.12l-0.19,-0.6l-0.14,0.01l-0.33,-0.45l-0.45,-0.12l-0.86,-1.68l0.26,-0.0l0.3,-0.44l-0.05,-0.28l-0.36,-0.33l-0.47,0.03l-0.39,-1.0l-0.06,-0.2l0.18,-0.61l-0.05,-0.42l-0.43,-1.17l-0.42,-0.8l-0.15,-0.06l-0.03,-0.2l0.19,-0.5l-0.3,-0.32l-0.68,-0.12l-0.76,-1.2l-0.34,-0.36l-0.22,-0.51l0.0,-0.25l-0.29,-0.25l-0.22,-0.37l-0.28,-0.12l-0.53,-0.85l0.33,0.03l0.26,-0.14l0.12,-0.23l0.61,-0.3l-0.02,0.19l-0.22,0.1l-0.15,0.49l0.27,0.46l0.43,0.08l0.44,-0.35l0.31,-1.17l0.22,-0.31l0.35,0.19l0.12,0.32l0.22,0.2l0.41,0.04l0.32,-0.36l-0.39,-0.84l-0.65,-0.42l-0.17,-1.03l-0.29,-0.7l-0.44,-0.21l-0.49,0.29l-0.22,0.26l-0.42,0.09l-0.83,0.47l-1.88,0.06l-0.94,-0.51l-0.42,-0.36l-1.39,-1.72l0.31,-0.13l0.2,-0.25l0.32,-0.95l-0.37,-1.07l-0.54,-0.07l-0.36,0.29l-0.08,0.55l-0.66,0.01l-0.74,-0.96l-2.63,-2.07l-1.67,-0.45l-1.59,-0.64l-1.09,-0.13l-0.02,-0.58l-0.25,-0.63l0.18,-0.21l0.03,-0.3l-0.23,-0.29l-0.25,-0.01l-0.99,-0.65l-0.07,-0.58l-0.17,-0.38l-0.2,-0.13l0.07,-0.18l0.3,-0.08l0.43,-0.41l0.11,-0.29l-0.11,-0.09l0.31,-0.43l0.29,-0.14l0.38,0.06l0.37,-0.2l0.18,-0.32l-0.0,-0.32l-0.35,-0.26l-0.61,-0.04l-0.84,0.36l-0.28,0.27l-0.59,0.06l-0.62,0.45l-0.63,0.21l-0.13,-0.1l-0.12,-0.65l-0.6,-0.75l0.99,-0.56l0.18,-0.35l-0.33,-0.49l-0.45,0.03l-0.19,-0.61l-0.13,-0.1l0.18,-0.56l-0.13,-0.28l0.08,-0.24l-0.24,-0.61l-0.47,-0.26l-0.52,0.22l-0.09,-0.21l-0.21,-0.01l-0.07,-0.12l0.32,-0.71l-0.08,-0.14l0.37,0.06l0.11,-0.13l0.59,0.36l0.42,0.06l0.4,-0.44l-0.08,-0.47l-0.28,-0.31l-1.03,-0.53l-1.57,0.42l-0.08,-0.19l-0.39,-0.32l-0.41,0.01l-0.1,-0.25l-0.41,0.05l-0.2,-0.13l0.26,-0.39l0.18,-0.83l-0.15,-0.23l-0.36,-0.13l0.14,-0.17l0.2,-0.7l-0.37,-0.34l-0.3,0.04l-1.38,0.7l-0.36,-0.43l-1.21,-0.12l-0.18,0.31l-0.52,0.28l0.05,0.48l0.19,0.14l-0.11,0.28l-0.81,-0.24l-0.66,0.02l-0.27,0.57l-0.52,0.43l0.1,0.52l0.33,0.17l0.42,-0.05l-0.12,0.24l-1.26,0.35l-0.28,0.24l-0.07,0.41l0.41,0.33l0.83,-0.19l0.01,0.38l0.35,0.34l-0.41,0.17l-0.14,0.35l-0.59,-0.04l-0.24,0.4l-0.35,0.16l0.06,0.54l-0.29,0.33l-0.13,0.11l-0.09,-0.11l-0.67,0.18l-0.02,0.15l-0.31,-0.3l-0.43,-0.14l-0.12,-0.28l-0.17,-0.11l0.18,-0.58l-0.07,-0.12l-0.48,-0.24l-0.46,0.09l0.2,-0.46l-0.01,-0.33l-0.23,-0.3l-0.3,-0.08l-0.43,0.22l-0.36,0.71l-0.2,0.15l-0.2,-0.02l-0.18,-0.5l-0.51,-0.08l-0.42,0.5l-0.43,-0.05l-0.19,0.37l-0.23,-0.3l-0.45,-0.03l-0.25,0.25l-0.04,0.31l-0.3,-0.08l-0.14,-0.37l-0.12,-0.02l-0.39,0.09l-0.72,0.47l-0.01,-0.27l-0.12,-0.09l-0.86,-0.01l-0.38,0.23l0.01,0.46l-1.69,0.41l-0.81,-0.77l-0.25,-0.04l-0.32,0.3l-0.39,-0.25l-0.96,-0.01l-0.3,-0.5l-0.07,-0.37l0.11,0.09l0.66,-0.33l-0.01,-0.1l0.26,0.09l0.34,-0.07l0.37,0.28l0.07,0.27l0.21,0.23l0.51,-0.04l0.19,-0.29l0.01,-0.28l0.31,0.14l0.44,-0.07l0.47,-0.16l0.09,-0.22l0.53,-0.29l0.5,-0.13l0.3,-0.47l-0.19,-0.43l-0.51,-0.19l-1.87,0.16l-0.47,-0.71l-0.04,-0.34l1.51,-1.29l1.74,-0.62l0.37,-0.29l0.42,-0.58l0.21,0.02l0.26,-0.13l0.8,-1.1l0.24,-1.21l0.46,-0.04l0.73,0.28l1.61,-0.32l1.36,-0.08l-0.05,0.52l0.19,0.48l0.52,0.51l1.2,0.2l0.23,0.45l1.45,1.39l0.16,0.38l0.29,0.16l0.48,-0.33l0.06,-0.48l-0.08,-0.44l-0.39,-0.52l-0.41,-0.12l-0.25,-0.55l-0.39,-0.37l-0.6,-1.46l0.49,-0.09l0.64,-0.47l0.37,-0.01l0.36,-0.23l1.56,0.25l0.38,-0.1l0.15,-0.57l-0.75,-0.62l-0.83,-0.27l-0.64,0.0l-0.98,0.33l-0.55,0.58l-0.65,-0.49l-0.11,-0.29l-0.55,-0.08l0.23,-0.38l-0.2,-0.67l-0.3,-0.01l-0.45,0.3l-0.18,-0.09l-0.33,0.19l-0.85,-0.15l-0.51,0.05l-0.93,0.54l-0.63,-0.12l-0.41,-0.23l-0.48,-0.05l-0.65,0.18l-0.29,-0.03l-0.61,0.32l-0.26,0.3l-0.09,0.42l-0.43,-0.13l-0.68,0.1l-0.55,0.31l-0.65,0.08l-0.57,0.21l-0.42,0.37l-0.15,0.46l-0.6,0.29l-0.6,0.01l-0.33,-0.24l-0.19,-0.75l-0.42,-0.34l-0.33,-0.12l-0.44,0.05l-0.26,0.26l0.14,0.52l0.28,0.07l0.02,0.63l0.32,0.65l0.02,0.67l-0.46,0.14l-0.39,0.32l-0.32,-0.05l-0.53,-0.39l-0.76,-0.31l-0.3,-0.03l-0.52,0.26l0.04,0.67l-0.07,-0.54l-0.29,-0.38l-0.45,0.17l-0.3,0.49l-0.19,-0.37l-0.85,0.2l-0.09,0.06l-0.03,0.5l-0.4,-0.36l-0.35,-0.02l-0.21,0.71l0.08,0.2l-0.35,-0.21l-0.38,0.06l-0.47,-0.19l-0.65,0.34l0.01,0.17l-0.32,0.17l-0.34,0.45l-0.5,0.02l-0.04,0.18l-0.21,0.08l0.0,0.48l-0.21,0.29l-0.05,0.39l0.34,0.39l0.59,-0.1l0.36,0.39l0.52,0.29l-0.03,0.37l0.15,0.4l0.38,0.33l0.0,0.52l-0.33,0.14l-0.48,0.42l-0.52,-0.03l-0.47,0.23l-0.85,-0.45l-0.39,0.03l-0.33,0.34l-0.15,-0.02l-0.08,0.15l-0.17,-0.11l-0.49,0.0l-0.37,0.68l-0.8,-0.11l-0.42,0.08l-0.37,0.3l-0.02,0.34l-0.05,-0.14l-0.37,-0.26l-0.38,0.26l-0.05,0.14l-0.21,-0.12l-0.38,0.21l-0.29,-0.09l-0.37,0.09l-0.5,-0.44l-0.48,-0.15l-1.0,0.59l-0.12,-0.1l-0.35,0.16l-0.42,-0.16l-0.48,0.3l-0.09,-0.34l-0.3,-0.29l-0.39,-0.0l-0.43,0.31l-0.22,0.36l-0.4,-0.17l-0.35,0.36l-0.42,-0.07l-0.41,-0.46l-0.41,0.09l-0.34,0.26l-0.55,-0.13l-0.15,0.1l-0.32,-0.07l-0.78,0.14l-0.41,-0.05l-0.31,0.14l-0.22,0.28l0.03,0.47l0.12,0.1l0.0,0.5l-0.36,-0.03l-0.17,0.19l-0.67,-0.23l-0.41,-0.28l-0.36,0.12l-0.17,0.24l-0.19,-0.25l-0.66,0.27l-0.57,0.09l-0.31,-0.22l-0.27,0.18l-0.14,-0.63l-0.41,-0.25l-0.44,0.09l-0.29,0.36l-0.49,0.09l-0.19,-0.09l-0.2,0.35l-0.03,-0.25l-0.28,-0.29l-0.53,-0.13l-1.34,-0.02l-0.66,0.34l-0.42,-0.34l-0.53,-0.02l-0.88,0.31l-0.74,0.12l-0.17,0.14l-0.15,0.37l0.04,0.2l-0.34,-0.03l-0.42,0.3l-0.09,0.27l-0.29,0.16l-0.22,-0.25l-0.39,-0.03l-0.39,0.2l-0.58,-0.33l-0.87,-0.21l-0.37,-0.18l-0.09,-0.39l-0.39,-0.15l-0.28,0.02l-0.17,0.13l-0.67,-0.68l-0.42,0.02l-0.8,-0.23l-0.32,0.23l-0.41,0.02ZM106.4,539.35l-0.02,0.01l-0.0,0.03l0.02,-0.04ZM106.43,539.32l0.01,-0.01l-0.01,0.0l-0.0,0.01ZM111.57,518.06l-0.28,0.1l-0.37,0.21l0.38,-0.38l0.27,0.08ZM135.54,477.36l-0.14,0.2l-0.03,0.01l0.06,-0.2l0.11,-0.01ZM165.25,532.53l-0.7,0.04l-0.06,-0.16l0.39,-0.18l0.33,-0.39l0.85,-0.3l-0.33,0.55l-0.37,0.09l-0.1,0.36ZM161.82,535.36l0.25,0.0l0.0,0.01l-0.28,0.13l0.03,-0.14ZM158.22,525.53l0.0,-0.0l-0.0,0.0l-0.0,-0.0ZM157.41,525.32l-0.03,-0.01l0.01,-0.01l0.02,0.02ZM141.51,529.3l0.28,0.11l0.27,0.23l-0.18,0.15l-0.38,0.01l-0.06,-0.1l0.11,-0.12l-0.03,-0.28ZM130.96,537.03l0.02,0.01l-0.03,0.02l0.0,-0.03ZM107.99,539.38l0.13,-0.03l0.06,0.1l-0.11,0.04l-0.07,-0.1ZM105.8,540.76l0.01,0.03l-0.02,0.0l0.0,-0.03l0.01,-0.0ZM98.05,537.96l0.0,0.06l-0.04,0.0l0.04,-0.07ZM189.71,556.2l0.09,-0.87l0.26,-0.09l0.03,0.48l-0.38,0.49ZM196.77,565.5l0.54,-0.11l0.83,0.29l0.38,-0.07l0.81,-0.66l0.46,-1.03l0.4,0.03l0.29,-0.09l0.5,-0.42l0.14,-0.26l0.0,-0.34l1.03,0.18l1.86,-0.26l0.42,0.76l-0.02,0.36l0.38,0.82l-0.16,0.4l-0.33,0.23l-0.1,0.5l0.11,0.21l-0.15,0.37l0.08,0.6l0.16,0.27l0.65,0.49l-0.02,0.41l0.25,0.63l0.33,0.27l0.06,0.43l-0.19,0.35l0.18,1.36l1.21,1.64l0.21,1.03l-0.69,-0.21l-0.4,0.06l-0.33,0.42l-0.51,0.26l-0.04,0.35l-0.41,0.21l-0.2,0.31l-0.42,-1.04l-0.8,-0.71l0.15,-0.53l-0.14,-0.43l-0.05,-0.8l0.15,-0.11l0.35,-1.25l-0.24,-0.23l0.05,-0.09l-0.14,-0.02l0.05,-0.08l-0.1,0.06l-0.13,-0.13l-0.11,0.1l-0.03,-0.1l0.14,-0.2l0.38,-2.06l-0.06,-1.21l0.61,-1.16l0.04,-0.36l-0.68,-0.27l-0.56,0.83l-0.22,-0.13l-0.44,0.09l-0.08,0.44l0.07,0.14l-0.37,0.38l0.23,1.2l-0.43,0.98l0.02,1.52l-0.15,0.39l0.01,0.5l-0.3,0.34l-0.12,2.12l-0.33,0.4l-0.18,-0.2l-0.05,-0.31l0.12,-1.48l-0.25,-0.33l-0.54,0.11l-0.1,0.15l-0.79,-0.08l-0.02,-0.13l0.29,-0.11l0.15,-0.25l0.25,-0.95l-0.11,-0.11l-0.07,-1.31l0.94,0.09l0.44,-0.41l-0.08,-0.36l-0.7,-0.48l-0.22,0.08l0.04,-0.97l-0.25,-0.3l-0.34,-0.05l-0.39,0.67l-0.26,0.08l-0.24,0.42l0.35,0.35l-0.2,0.26l-0.04,-0.39l-0.49,-0.25l0.3,-0.64l-0.28,-0.55l-0.26,-0.02l-0.13,-0.53l-0.45,-0.19l-0.25,0.33l-0.21,-0.55ZM207.28,574.49l0.35,0.91l-0.28,0.4l0.04,0.74l0.38,1.41l-0.0,1.31l0.27,1.06l0.37,3.3l0.33,1.42l0.09,1.05l-0.6,0.55l0.03,0.61l0.79,0.61l-0.55,0.81l0.04,0.5l0.56,0.6l-0.11,0.33l0.03,0.54l-0.18,0.59l0.14,0.3l0.2,0.15l0.87,0.27l1.35,1.98l1.13,0.85l0.3,0.83l0.53,0.45l0.04,0.84l0.76,0.62l0.47,0.11l0.02,0.18l-0.21,0.82l-0.71,0.53l-0.36,0.55l-0.03,0.7l-0.35,0.74l0.06,1.04l-0.18,0.6l0.03,0.38l-0.44,0.21l-1.4,1.54l-0.43,0.34l-0.48,0.17l-0.19,-0.14l-0.26,0.0l0.14,-0.54l-0.14,-0.44l-0.65,0.05l-0.07,0.14l-0.09,-0.51l0.26,-0.08l0.11,0.14l0.51,0.15l1.31,-0.89l0.77,-0.71l-0.23,-0.63l-0.45,0.06l0.0,-0.13l-0.38,-0.38l-0.52,0.14l0.69,-1.91l0.27,-1.72l-0.35,-0.25l-0.04,-0.39l-0.25,-0.6l0.53,-0.19l0.37,-0.39l0.16,-0.48l-0.44,-0.25l-0.44,0.1l-0.63,0.36l-0.42,0.05l-0.56,-0.3l-0.16,0.11l-0.21,-0.09l-1.07,0.31l-0.64,-0.05l0.28,-0.15l0.18,-0.31l0.3,-1.03l0.32,0.01l0.78,0.43l0.33,0.02l0.69,-0.35l-0.04,-0.49l-0.35,-0.21l-0.38,0.04l-0.84,-0.44l0.07,-0.93l-0.22,-0.31l-0.44,-0.27l0.05,-0.48l-0.4,-0.66l0.33,-0.41l-0.17,-0.67l-0.35,-0.02l0.13,-0.08l-0.03,-0.23l0.53,-0.28l0.22,-0.59l-0.39,-0.29l-0.68,0.21l-0.41,-0.64l-0.06,-0.43l0.37,-0.24l0.24,-1.12l-0.41,-0.33l-0.48,0.19l-0.14,-0.07l-0.27,-0.39l0.15,-0.23l-0.22,-0.49l-0.49,-0.26l-0.25,0.04l-0.19,0.17l-0.21,-0.25l0.13,-0.23l0.53,0.23l1.01,-0.02l0.4,-0.16l0.16,-0.2l0.05,-0.15l-0.28,-0.52l-0.5,0.1l-0.44,-0.15l0.25,-0.38l-0.01,-0.29l-0.5,-0.27l0.09,-0.26l0.62,-0.0l0.34,0.77l0.29,0.26l0.33,0.01l0.28,-0.17l0.05,-0.48l-0.23,-0.25l-0.4,-1.14l-0.72,-1.0l0.18,-0.54l0.96,0.79l0.3,0.11l0.45,-0.45l-0.05,-0.21l-0.35,-0.47l-1.25,-0.77l-0.25,-0.05l0.21,-0.28l-0.18,-0.43l0.22,-0.16l0.32,-0.62l-0.5,-0.34l-0.27,0.02l-0.35,0.25l-0.02,0.14l-0.39,0.35l-0.1,-0.38l0.12,-0.22l0.01,-0.49l0.28,-0.4l0.39,-0.23l0.18,-0.64l0.25,-0.15l0.25,-0.35l0.34,0.08l0.45,-0.24ZM208.9,604.79l-0.14,0.6l-0.04,-0.01l0.1,-0.48l0.08,-0.11ZM210.37,602.77l-0.57,0.31l-0.25,-0.22l-0.61,0.16l0.07,-0.21l0.55,-0.32l0.81,0.28ZM206.97,596.06l-0.04,0.0l0.0,-0.01l0.04,0.01ZM206.76,596.37l-0.08,0.41l0.26,0.3l-0.54,0.46l-0.46,-0.21l-0.29,0.43l0.05,0.44l-0.14,-0.23l0.12,-0.78l0.24,-0.06l0.03,-0.15l0.5,-0.05l0.3,-0.58ZM205.35,581.23l-0.08,-0.02l-0.02,-0.09l0.1,0.11ZM174.62,442.02l0.16,-0.03l0.01,0.02l-0.12,0.04l-0.05,-0.03ZM149.15,463.88l-0.48,-0.68l0.17,-0.34l0.08,-0.53l0.46,0.23l-0.22,1.31ZM139.58,480.85l-0.2,-0.16l-0.1,-0.17l0.02,-0.02l0.29,0.35ZM110.4,493.59l-0.04,0.0l-0.0,-0.01l0.04,-0.0l0.0,0.0ZM207.1,600.51l-0.19,-0.22l-0.19,-0.6l0.65,-0.29l-0.24,0.42l-0.04,0.69ZM206.1,600.7l-0.0,0.01l0.0,-0.01l0.0,0.0ZM207.6,599.25l0.23,-0.53l-0.13,-0.23l0.59,-0.1l0.3,-0.26l-0.01,-0.13l0.38,-0.35l0.16,-0.57l0.54,-0.04l0.23,1.16l0.07,1.2l-0.18,0.24l0.03,0.13l-0.16,0.03l-0.32,0.84l-0.28,0.19l-0.18,-0.34l0.21,-1.61l-0.4,-0.43l-0.4,0.19l-0.2,0.53l-0.47,0.08ZM206.69,592.9l0.19,-0.29l0.19,0.3l0.37,0.14l-0.02,0.58l-0.25,0.02l-0.48,-0.74ZM204.84,593.41l0.21,-0.32l0.24,-0.03l-0.06,0.39l0.08,0.1l0.28,0.16l0.34,0.0l0.38,0.28l0.05,0.19l-0.37,0.12l0.06,0.4l-0.09,0.26l-0.26,0.09l0.16,-0.53l-0.3,-0.42l-0.07,-0.28l-0.66,-0.41ZM205.68,592.74l0.12,-0.12l0.05,0.06l-0.04,0.06l-0.14,0.0ZM205.02,590.02l0.06,-0.2l0.28,-0.11l0.2,-0.33l-0.02,-0.41l0.06,-0.13l0.29,1.13l-0.65,-0.16l-0.2,0.2ZM202.23,585.03l0.13,-0.03l0.27,0.18l0.93,0.73l0.44,0.47l0.07,0.52l0.45,0.21l0.13,-0.03l0.22,-0.36l0.14,0.05l0.18,0.49l-0.02,0.28l-0.32,0.23l-0.18,0.94l-0.13,-1.28l-0.2,-0.03l-0.21,-0.45l-0.58,0.05l-0.22,0.89l0.07,0.36l0.17,0.15l-0.24,0.37l0.23,0.32l0.16,0.47l-0.2,0.16l-0.8,-0.56l-0.44,0.1l-0.03,0.21l-0.22,-0.05l0.18,-0.54l0.13,-0.1l-0.06,-0.28l0.1,0.01l0.05,-0.14l-0.04,-0.41l0.48,-0.79l0.11,-0.48l-0.25,-0.42l0.07,-0.26l-0.3,-0.33l-0.26,-0.63ZM204.11,591.3l0.32,-0.24l0.41,0.24l0.3,-0.01l-0.25,0.23l-0.09,0.42l-0.18,0.06l-0.19,-0.01l-0.32,-0.68ZM201.15,595.61l0.39,-0.04l0.71,-0.6l0.17,-0.41l-0.02,-0.35l-0.29,-0.08l0.28,-0.75l0.11,0.2l0.52,0.24l0.23,0.34l0.37,0.27l0.43,1.44l-0.06,0.78l-0.11,0.23l-0.18,-0.04l-0.49,0.47l0.07,0.29l-0.79,0.31l-0.07,0.49l0.07,0.41l0.53,0.0l-0.02,0.12l0.39,0.47l0.21,-0.01l0.23,0.24l0.23,-0.06l0.16,0.27l0.04,0.2l-0.39,-0.09l-0.34,0.45l-0.07,0.31l0.2,0.39l0.69,0.17l-0.31,0.02l-0.39,0.51l-0.49,0.15l0.01,-0.38l-0.25,-0.1l-0.13,-0.29l0.03,-0.93l-0.19,-0.86l-0.55,0.06l-0.09,-0.43l0.17,-0.51l-0.46,-0.42l0.16,-0.04l-0.02,-0.49l-0.3,-0.24l0.21,-0.25l0.29,-0.11l0.37,0.02l0.22,-0.65l-0.53,-0.28l-1.08,0.01l-0.17,-0.19l0.34,-0.25ZM203.12,602.04l0.1,0.62l0.38,0.29l-0.14,0.15l-0.01,0.33l0.19,0.34l-0.25,0.06l-0.09,0.28l-0.22,-0.12l0.22,-0.36l-0.34,-1.17l0.11,-0.07l-0.04,-0.22l0.1,-0.14ZM203.35,597.92l0.0,0.0l-0.0,-0.0l0.0,-0.0ZM202.64,592.33l-0.02,-0.23l-0.18,-0.27l-0.57,-0.24l-0.38,-0.33l0.04,-0.12l0.23,-0.13l0.24,0.13l0.03,0.3l0.41,0.29l0.13,-0.01l0.16,-0.25l0.01,0.41l0.15,0.18l-0.07,0.32l-0.19,-0.05ZM199.97,583.58l0.25,-0.55l0.45,-0.17l-0.03,-0.41l0.33,-0.19l0.26,0.24l0.53,-0.27l-0.12,0.49l-0.21,0.32l-0.34,-0.04l-0.38,0.34l-0.32,-0.04l-0.11,0.23l-0.31,0.06ZM202.63,581.99l-0.01,-0.02l0.01,0.0l0.0,0.02ZM202.51,581.14l-0.13,0.03l-0.03,0.48l-0.5,0.27l-0.01,-0.56l-0.44,-0.14l-0.03,-0.19l0.6,-0.09l0.24,-0.62l-0.38,-0.27l-0.47,-0.02l-0.09,-0.31l0.16,-1.0l0.22,-0.37l0.21,-0.81l0.17,-0.88l-0.05,-0.32l0.42,-0.42l0.65,0.16l0.25,0.34l-0.08,0.37l-0.18,0.13l0.02,0.26l-0.13,0.04l-0.1,0.73l-0.26,0.61l0.01,0.1l0.33,0.12l0.15,1.13l-0.17,0.29l0.4,0.49l-0.13,0.37l-0.51,-0.18l-0.16,0.25ZM203.26,574.86l0.1,0.02l0.05,0.13l-0.14,-0.13l-0.0,-0.02ZM200.56,588.29l-0.08,-0.33l-0.15,-0.02l0.1,-0.05l0.11,0.08l0.09,0.31l-0.07,0.02ZM200.12,587.92l-0.07,-0.01l-0.0,-0.01l0.01,-0.0l0.07,0.02ZM200.37,586.97l-0.16,-0.4l-0.43,-0.09l0.1,-0.17l0.4,0.09l0.16,-0.21l0.28,0.17l0.27,-0.12l0.0,0.58l-0.09,0.12l-0.26,0.22l-0.28,-0.19ZM201.49,592.7l-0.1,-0.02l0.02,-0.11l0.12,-0.03l-0.04,0.17ZM200.65,592.73l-0.02,0.02l-0.16,0.03l0.09,-0.08l0.09,0.04ZM195.39,575.1l0.13,-0.1l0.32,0.81l0.27,0.26l0.58,-0.41l-0.42,-1.39l0.16,0.12l0.49,-0.01l0.11,-0.88l0.2,0.31l0.55,0.02l0.21,-0.32l0.27,-0.08l0.58,0.85l-0.37,0.18l-0.69,-0.15l-0.15,0.28l-0.14,-0.08l-0.56,0.2l0.03,0.46l0.24,0.6l0.52,0.51l0.21,0.54l0.4,0.42l-0.17,0.22l0.09,0.51l0.4,0.15l0.12,0.22l0.3,0.1l0.81,-0.05l-0.16,0.99l-0.21,0.51l-0.26,-0.12l-1.86,-3.21l-0.28,-0.23l-0.62,0.31l0.06,0.43l-0.27,0.19l0.22,0.69l0.2,0.1l-0.12,0.12l-0.06,0.45l0.16,0.09l0.06,0.25l-0.29,0.13l-0.08,-0.6l-0.36,-0.69l0.31,-0.17l-0.14,-0.48l-0.2,-0.19l0.01,-0.36l-0.25,-0.56l0.02,-0.34l-0.25,-0.15l-0.11,-0.46ZM198.57,575.78l0.52,-0.38l0.44,-0.12l0.69,0.39l0.05,0.19l0.37,0.31l0.02,0.18l-0.14,0.22l-0.34,-0.45l-0.61,-0.13l-0.19,0.37l0.01,0.19l0.26,0.64l-0.2,-0.12l-0.87,-1.29ZM197.4,579.96l0.2,0.09l0.33,-0.11l-0.02,0.3l0.46,0.2l0.23,0.33l-0.16,0.05l-0.02,0.25l0.08,0.33l-0.06,0.32l0.21,0.36l-0.12,0.88l0.11,0.42l-0.12,0.06l-0.17,0.59l-0.23,1.9l-0.31,0.87l-0.21,-0.03l-0.2,0.38l-0.03,0.54l-0.52,1.19l-0.15,-0.9l-0.02,-1.09l0.35,-0.03l0.67,-0.56l-0.07,-0.72l-0.19,-0.05l0.01,-0.57l-0.14,-0.2l-0.2,-0.01l-0.2,-0.65l-0.51,-0.01l0.33,-0.22l0.02,-0.34l0.7,-0.09l0.2,-0.29l-0.1,-0.53l-0.52,-0.27l-0.0,-0.1l0.61,-0.26l-0.29,-1.24l-0.54,-0.23l0.25,0.04l0.27,-0.16l0.1,-0.43ZM195.81,580.52l-0.11,0.19l0.0,-0.37l0.11,0.18ZM195.45,581.71l-0.18,0.24l-0.21,-0.02l0.06,-0.09l0.33,-0.12ZM166.9,538.83l0.06,-0.04l0.0,0.06l-0.06,-0.02ZM167.11,538.95l0.14,0.08l0.02,0.11l-0.16,-0.18ZM161.05,540.17l0.02,-0.05l0.3,0.02l0.37,-0.3l0.19,-0.01l-0.35,0.19l-0.13,0.29l-0.39,-0.13ZM135.33,540.66l0.22,0.31l0.6,-0.08l0.07,-0.42l-0.07,-0.17l0.71,0.45l0.28,-0.22l0.24,-0.69l0.19,-0.18l0.34,0.1l-0.17,0.51l0.11,0.35l-0.07,0.25l0.28,0.22l-0.63,0.48l0.06,-0.1l-0.16,-0.67l-0.37,-0.01l-0.74,0.65l-0.1,-0.23l-0.47,0.05l-0.18,0.2l-0.16,-0.35l0.03,-0.21l-0.1,-0.04l0.11,-0.21ZM138.62,541.16l-0.18,-0.04l0.14,-0.08l0.05,0.11ZM125.8,544.87l0.6,-0.15l0.09,0.05l-0.61,0.5l-0.08,-0.39ZM126.2,543.5l0.18,-0.98l-0.32,-0.49l0.3,-0.05l0.26,-0.39l0.25,-0.03l0.28,-0.29l0.43,0.23l0.18,-0.14l0.44,0.12l0.16,-0.28l0.18,-0.04l0.36,0.08l0.39,0.35l-0.66,0.08l-0.0,0.49l0.42,0.33l-0.32,0.72l0.07,0.46l-0.06,0.52l0.34,0.82l0.44,0.2l0.31,-0.36l-0.14,-0.65l0.13,-0.61l0.23,-0.4l0.3,0.14l0.35,-0.29l0.43,0.11l0.52,-0.04l0.21,-0.24l0.14,-0.02l0.24,0.16l0.21,-0.03l0.17,0.33l0.67,-0.25l0.26,-0.42l0.27,0.22l-0.19,0.28l-0.04,0.41l0.26,0.39l0.48,-0.04l0.32,-0.45l0.28,0.19l0.45,-0.19l0.37,0.14l-0.13,0.29l-0.77,0.26l-0.2,0.37l0.19,0.45l-0.09,0.59l0.3,0.21l0.31,0.07l-0.64,0.25l-0.16,-0.22l-0.29,-0.1l-0.07,-0.2l-0.24,-0.18l-0.12,-0.34l-0.95,-0.71l-0.26,0.2l-0.66,0.22l-0.18,0.25l0.16,0.4l-0.16,-0.05l-0.3,-0.39l-0.43,0.12l-0.28,0.54l-0.86,-0.26l-0.1,0.11l-0.26,-0.21l-0.24,-0.04l-0.25,0.09l-0.22,0.45l-0.12,-0.06l0.11,-0.41l-0.2,-0.39l-0.49,-0.11l-0.3,0.07l0.05,-0.16l-0.49,-0.6l-0.82,-0.56l-0.36,-0.07ZM134.27,542.42l-0.01,-0.05l0.17,-0.06l0.0,0.05l-0.16,0.07ZM132.2,545.58l0.25,-0.03l0.37,0.14l0.22,0.62l-0.1,0.08l-0.21,-0.1l0.05,-0.11l-0.29,-0.51l-0.28,-0.08ZM126.26,546.94l-0.15,0.05l-0.01,-0.01l0.06,-0.03l0.11,-0.0ZM131.32,541.84l-0.53,-0.58l0.32,-0.33l0.47,-0.02l0.05,0.41l-0.32,0.53ZM105.81,462.39l-0.11,-0.32l0.35,-0.73l0.36,-0.32l0.68,-0.25l-0.18,0.17l0.11,0.32l-0.14,-0.01l0.06,0.34l0.69,0.55l0.17,0.58l0.33,0.45l0.3,0.27l1.18,0.11l0.29,0.2l0.33,0.06l0.24,0.31l-0.01,0.58l0.1,0.26l-0.21,0.31l-0.27,0.11l-0.22,0.43l0.38,0.42l0.17,0.76l0.36,0.34l-0.18,0.36l-0.0,0.32l0.2,0.38l0.45,0.25l-0.07,0.47l0.15,0.3l-0.4,-0.26l-0.47,-0.12l-1.23,0.14l0.06,-0.93l-0.25,-0.52l-0.02,-0.5l-0.15,-0.17l0.25,-0.53l-0.13,-0.43l-0.01,-0.64l-0.26,-0.89l-0.24,-0.37l-0.03,-0.47l-0.8,-0.64l-0.94,-0.23l-0.15,-0.01l-0.0,0.09l-0.53,-0.08l-0.18,-0.48ZM111.34,469.47l0.34,0.23l0.34,-0.0l0.32,0.49l-0.46,0.25l-0.33,-0.58l-0.24,-0.19l0.02,-0.19ZM99.58,492.96l0.13,-0.45l0.36,0.29l0.67,0.85l0.32,0.21l0.39,-0.01l0.4,-0.28l0.18,0.05l0.18,0.25l0.48,0.04l0.28,-0.1l-0.04,0.35l0.68,0.15l0.17,0.26l-0.1,0.36l0.08,0.18l0.27,0.32l0.48,0.17l0.05,0.26l-0.71,0.6l-0.06,0.37l-0.25,0.08l-0.34,0.96l-0.72,-0.21l-0.37,-0.45l-0.21,0.14l-0.22,-0.05l-0.29,-0.37l-0.41,-0.11l-0.21,-0.4l-0.47,-0.4l-0.43,-1.65l0.1,-0.21l-0.16,-0.32l-0.27,-0.19l0.1,-0.37l-0.07,-0.3ZM95.47,539.48l0.12,-0.24l0.1,0.3l0.17,0.12l-0.0,0.16l-0.2,-0.34l-0.19,-0.01ZM88.44,537.17l0.0,-0.02l0.03,0.0l-0.03,0.01ZM77.94,532.86l0.31,-0.91l0.71,0.25l0.4,-0.03l1.64,-0.75l0.19,0.0l0.11,0.36l0.43,0.42l0.29,0.09l0.42,-0.18l0.53,0.24l0.62,-0.02l0.51,0.26l0.41,0.41l0.02,0.57l-0.53,1.12l-0.34,0.06l-0.25,0.24l-0.3,0.0l-0.28,-0.08l-0.42,-0.6l-1.35,-0.96l-0.46,-0.11l-0.79,0.04l-0.43,0.31l-0.25,0.05l-0.89,-0.43l-0.29,-0.34ZM72.06,531.33l0.05,-0.29l0.35,0.02l0.04,0.43l-0.33,-0.2l-0.06,0.1l-0.05,-0.06ZM62.39,530.55l0.16,-0.01l0.12,0.09l-0.08,0.09l-0.2,-0.16ZM62.89,530.86l0.03,0.06l0.02,0.04l-0.11,-0.1l0.06,0.01ZM67.63,532.06l-0.22,-0.27l-0.39,0.07l0.31,-0.15l0.34,0.02l0.42,-0.6l-0.29,-0.36l-0.27,-0.66l-0.29,-0.25l0.08,-0.32l0.43,-0.1l0.43,0.15l0.4,0.29l0.15,0.23l-0.34,0.42l0.08,0.55l-0.1,0.18l-0.36,0.12l-0.04,0.3l-0.13,-0.03l-0.21,0.41ZM66.48,531.55l-0.31,0.29l-0.03,0.08l-0.08,-0.11l0.27,-0.3l-0.12,-0.26l0.07,-0.05l0.18,-0.01l0.03,0.37ZM68.16,529.58l-0.03,-0.02l-0.0,-0.01l0.04,0.03ZM57.55,529.02l0.25,-0.15l0.2,-0.38l0.16,-0.08l0.64,0.01l0.12,0.21l0.37,0.15l0.09,0.15l-0.15,0.14l-0.22,-0.04l-0.65,0.2l-0.42,-0.23l-0.38,0.0ZM60.36,528.86l0.09,-0.37l0.33,-0.35l0.69,-0.04l0.67,0.28l0.23,0.6l-0.17,0.06l-0.19,0.26l-1.26,-0.24l-0.38,-0.2ZM34.78,515.5l0.04,0.03l-0.03,0.13l-0.02,-0.17l0.01,0.0ZM35.78,515.3l0.08,-0.23l-0.1,-0.29l0.37,0.05l0.06,0.52l-0.34,0.04l-0.08,-0.09ZM28.34,509.91l0.02,-0.07l0.04,-0.02l-0.01,0.1l-0.05,-0.01ZM24.83,509.43l0.48,-0.33l0.11,0.34l-0.02,0.11l-0.3,0.01l-0.27,-0.13ZM23.14,507.45l0.08,0.02l-0.03,0.03l-0.05,-0.05ZM21.49,504.95l-0.1,0.01l0.06,-0.23l0.04,0.13l0.0,0.1ZM21.53,504.44l-0.09,0.14l-0.13,-0.33l0.02,-0.27l0.21,0.2l-0.01,0.26ZM14.7,495.17l0.26,0.08l-0.03,0.22l-0.17,-0.02l-0.07,-0.27ZM1.42,466.35l0.24,-0.09l0.22,-0.4l-0.29,-0.43l0.05,-0.12l0.24,0.2l0.16,0.67l0.46,0.46l-0.28,0.18l0.12,0.42l-0.13,-0.01l-0.15,-0.38l-0.53,-0.19l-0.1,-0.31Z", "name": "Alaska"}, "US-NJ": {"path": "M802.92,165.5l1.3,-1.54l0.47,-1.56l0.49,-0.62l0.53,-1.44l0.1,-2.03l0.67,-1.34l0.92,-0.72l14.17,3.88l-0.26,5.58l-0.5,0.83l-0.13,-0.29l-0.65,-0.06l-0.34,0.44l-0.55,1.45l-0.44,2.7l0.27,1.53l0.64,0.6l1.06,0.13l1.23,-0.45l2.47,0.24l0.67,1.83l-0.16,4.48l0.29,0.46l-0.54,0.44l0.27,0.8l-0.72,0.75l0.46,0.57l-0.2,0.58l0.48,0.6l-0.14,3.74l0.59,0.51l-0.35,1.34l-1.13,1.82l-0.1,0.93l-1.37,0.1l0.11,1.19l0.64,0.8l-0.82,0.56l-0.17,1.14l1.05,0.74l-0.31,0.29l-0.18,-0.44l-0.54,-0.17l-0.49,0.23l-0.43,1.49l-1.27,0.62l-0.2,0.44l0.46,0.55l0.8,0.05l-0.64,1.25l-0.25,1.48l-0.67,0.65l0.19,0.48l0.4,0.04l-0.88,1.56l0.08,0.93l-1.55,1.66l-0.19,-1.61l0.32,-2.04l-0.12,-0.85l-0.59,-0.8l-0.9,-0.26l-1.11,0.36l-0.82,-0.33l-1.51,0.9l-0.31,-0.69l-1.63,-0.92l-1.0,0.06l-0.66,-0.68l-0.7,0.08l-3.26,-1.95l-0.07,-1.7l-1.02,-0.91l0.47,-0.67l-0.0,-0.87l0.42,-0.83l-0.13,-0.72l0.5,-1.17l1.19,-1.16l2.59,-1.51l0.54,-0.86l-0.38,-0.83l0.49,-0.38l0.46,-1.43l1.23,-1.7l2.51,-2.23l0.18,-0.66l-0.48,-0.81l-4.29,-2.67l-0.76,-1.02l-0.9,0.25l-0.48,-0.32l-1.26,-2.41l-1.62,0.01l-1.03,-3.38l1.01,-1.02l0.35,-2.21l-1.88,-1.86Z", "name": "New Jersey"}, "US-ME": {"path": "M837.19,56.84l0.85,-1.16l1.45,1.68l0.84,0.03l0.36,-2.12l-0.49,-2.18l1.71,0.33l0.72,-0.43l0.21,-0.53l-0.33,-0.69l-1.18,-0.45l-0.45,-0.61l0.17,-1.43l0.83,-2.04l2.05,-2.28l-0.01,-0.99l-0.53,-0.93l1.0,-1.66l0.36,-1.52l-0.23,-0.91l-1.02,-0.34l-0.09,-1.42l-0.41,-0.43l0.54,-0.97l-0.05,-0.63l-1.02,-1.25l0.1,-1.74l0.36,-0.64l-0.17,-0.98l1.19,-1.95l-1.06,-6.19l5.24,-19.09l2.24,-0.25l1.2,3.2l0.56,0.42l2.56,0.53l1.8,-1.76l1.66,-0.85l1.21,-1.74l1.25,-0.13l0.64,-0.48l0.22,-1.45l0.42,-0.3l1.36,0.03l3.71,1.38l1.16,0.96l2.39,1.03l8.78,22.69l0.65,0.64l-0.24,0.96l0.73,1.01l-0.08,1.41l0.56,1.29l0.68,0.46l1.05,-0.13l1.13,0.56l0.98,0.09l2.46,-0.57l0.41,0.94l-0.57,1.43l1.72,1.84l0.32,2.68l2.75,1.63l0.98,-0.12l0.46,-0.75l-0.07,-0.5l1.22,0.23l3.0,2.75l0.04,0.47l-0.52,-0.13l-0.38,0.41l0.19,0.77l-0.77,-0.14l-0.34,0.4l0.16,0.63l1.87,1.58l0.15,-0.88l0.38,-0.17l0.81,0.31l0.26,-0.83l0.33,0.4l-0.3,0.85l-0.52,0.19l-1.16,3.25l-0.63,-0.03l-0.31,0.44l-0.57,-1.04l-0.72,0.04l-0.3,0.51l-0.56,0.07l-0.02,0.49l0.59,0.84l-0.91,-0.44l-0.31,0.63l0.27,0.51l-1.2,-0.26l-0.36,0.3l-0.36,0.78l0.08,0.45l0.44,0.08l0.09,1.2l-0.38,-0.57l-0.54,-0.05l-0.39,0.46l-0.19,1.09l-0.5,-1.52l-1.13,0.03l-0.67,0.76l-0.34,1.48l0.6,0.61l-0.82,0.64l-0.7,-0.45l-0.71,1.05l0.11,0.64l0.99,0.6l-0.35,0.22l-0.09,0.82l-0.46,-0.2l-0.87,-1.8l-1.04,-0.44l-0.38,0.22l-0.45,-0.41l-0.56,0.64l-1.25,-0.17l-0.25,0.86l0.78,0.38l0.01,0.36l-0.52,-0.05l-0.55,0.41l-0.08,0.69l-0.51,-1.01l-1.17,-0.0l-0.15,0.64l0.53,0.86l-1.42,0.98l0.85,1.09l0.1,1.05l0.54,0.64l-0.97,-0.39l-0.96,0.23l-1.2,-0.4l-0.19,-0.9l0.74,-0.29l-0.09,-0.55l-0.43,-0.49l-0.67,-0.11l-0.3,0.33l-0.27,-2.35l-0.38,-0.21l-1.1,0.28l0.07,1.95l-1.82,1.94l0.03,0.5l1.27,1.44l-0.63,0.96l-0.14,3.85l0.79,1.39l-0.56,0.54l0.01,0.63l-0.5,0.56l-0.8,-0.18l-0.44,0.93l-0.62,-0.05l-0.42,-1.14l-0.73,-0.2l-0.5,1.03l0.12,0.68l-0.44,0.6l0.15,2.4l-0.97,-0.99l0.12,-1.27l-0.25,-0.59l-0.81,0.3l-0.06,2.0l-0.44,-0.24l0.13,-1.54l-0.48,-0.39l-0.67,0.49l-0.73,3.04l-0.77,-1.81l0.05,-1.5l-0.76,0.06l-1.03,2.77l0.52,0.54l0.72,-0.27l0.94,2.01l-0.29,-0.58l-0.52,-0.22l-0.65,0.31l-0.06,0.64l-1.38,-0.08l-2.12,3.19l-0.51,1.87l0.3,0.59l-0.67,0.66l0.51,0.42l0.91,-0.23l0.37,0.91l-0.76,0.31l-0.2,0.4l-0.41,-0.04l-0.5,0.57l-0.13,1.03l0.68,1.35l-0.07,0.67l-0.77,1.3l-0.93,0.62l-0.39,1.07l-0.09,1.28l0.44,0.88l-0.37,2.8l-0.8,-0.32l-0.4,0.6l-1.03,-0.74l-0.59,-1.83l-0.94,-0.36l-2.38,-1.94l-0.8,-3.42l-13.69,-35.19ZM864.39,80.9l0.09,0.26l-0.08,0.23l0.03,-0.28l-0.04,-0.2ZM865.81,81.1l0.47,0.69l-0.04,0.47l-0.32,-0.24l-0.11,-0.92ZM868.11,77.94l0.43,0.81l-0.16,0.14l-0.42,-0.18l0.15,-0.77ZM877.3,64.42l-0.14,0.2l-0.03,-0.23l0.17,0.03ZM873.48,74.78l0.01,0.02l-0.02,0.03l0.01,-0.05ZM882.98,63.24l0.02,-1.16l0.4,-0.66l-0.18,-0.44l0.4,-0.5l0.62,-0.12l1.56,1.32l-0.48,0.65l-1.08,0.06l-0.26,0.44l0.59,1.29l-0.99,-0.16l-0.15,-0.56l-0.44,-0.16ZM879.6,65.86l0.62,0.39l-0.35,0.3l0.16,0.95l-0.4,-0.62l0.18,-0.53l-0.21,-0.49ZM878.42,70.38l0.09,-0.01l0.47,-0.09l-0.24,0.45l-0.32,-0.36Z", "name": "Maine"}, "US-MD": {"path": "M742.19,220.07l-2.1,-9.88l19.86,-4.71l-0.65,1.27l-0.95,0.09l-1.54,0.82l0.16,0.69l-0.41,0.49l0.23,0.76l-1.76,0.52l-1.48,0.05l-1.12,-0.36l0.2,-0.35l-0.3,-0.49l-1.11,-0.29l-0.46,1.78l-1.61,2.82l-1.38,-0.37l-1.03,0.63l-0.4,1.24l-1.59,1.92l-0.36,1.03l-0.88,0.46l-1.3,1.86ZM762.24,204.93l37.01,-9.59l8.42,25.88l0.48,0.25l8.46,-2.33l0.26,0.69l0.6,0.02l0.39,0.93l0.52,-0.06l-0.37,1.93l-0.13,-0.26l-0.47,0.07l-0.72,0.86l-0.15,2.66l-0.6,0.19l-0.35,0.7l-0.01,1.45l-3.64,1.55l-0.36,0.75l-2.25,0.46l-0.56,0.65l-0.31,-1.05l0.5,-0.31l0.86,-1.83l-0.41,-0.5l-0.43,0.12l0.06,-0.48l-0.44,-0.41l-2.29,0.66l0.3,-0.59l1.15,-0.84l-0.18,-0.69l-1.36,-0.15l0.37,-2.2l-0.19,-1.01l-0.91,0.17l-0.52,1.75l-0.35,-0.67l-0.61,-0.06l-0.44,0.47l-0.49,1.38l0.54,1.0l-2.89,-2.07l-0.43,-0.18l-0.6,0.37l-0.74,-0.74l0.36,-0.82l-0.04,-0.83l0.76,-0.6l-0.08,-1.33l2.08,0.06l0.88,-0.46l0.36,-0.9l-0.33,-1.4l-0.43,-0.04l-0.52,1.3l-0.39,0.1l-1.05,-0.69l0.05,-0.39l-0.52,-0.27l-0.55,0.23l-0.23,-0.66l-0.73,0.1l-0.12,0.29l0.07,-0.72l1.14,-0.39l0.21,-1.04l-0.54,-0.54l-0.57,0.71l-0.2,-0.51l0.87,-0.87l-0.26,-0.65l-0.54,-0.07l-0.09,-0.47l-0.42,-0.26l-0.35,0.16l-0.65,-0.51l0.87,-0.8l-0.24,-1.01l0.92,-2.36l-0.18,-0.43l-0.46,0.02l-0.66,0.67l-0.56,-0.16l-0.6,0.96l-0.75,-0.59l0.46,-3.53l0.59,-0.52l0.06,-0.6l4.22,-1.26l0.11,-0.71l-0.51,-0.28l-2.37,0.46l0.75,-1.25l1.43,-0.07l0.35,-0.5l-0.99,-0.65l0.42,-1.88l-0.63,-0.32l-1.18,1.81l0.04,-1.46l-0.6,-0.34l-0.67,1.1l-1.62,0.68l-0.3,1.63l0.39,0.53l0.64,0.11l-1.44,1.91l-0.21,-1.61l-0.64,-0.41l-0.61,0.72l0.08,1.44l-0.85,-0.28l-1.15,0.65l0.03,0.71l1.01,0.24l-0.36,0.53l-0.83,0.23l-0.05,0.34l-0.45,-0.03l-0.34,0.65l1.15,1.16l-1.88,-0.63l-1.21,0.6l0.17,0.69l1.57,0.55l0.92,0.9l0.72,-0.13l0.56,0.72l-0.98,-0.05l-1.14,1.36l0.33,0.77l1.57,0.87l-0.67,0.13l-0.21,0.42l0.79,1.06l-0.3,0.56l0.33,0.94l0.57,0.45l-0.5,1.07l1.0,1.22l0.99,3.47l0.62,0.82l2.08,1.57l0.42,0.78l-0.58,0.18l-0.65,-0.73l-1.46,-0.28l-1.65,-1.22l-1.35,-3.09l-0.74,-0.66l-0.3,0.37l0.12,0.7l1.3,3.47l1.16,1.27l2.06,0.69l1.04,1.08l0.63,0.13l0.91,-0.36l-0.02,1.09l1.67,1.5l0.11,1.08l-0.9,-0.33l-0.52,-1.26l-0.64,-0.44l-0.45,0.05l-0.12,0.44l0.27,0.77l-0.68,0.1l-0.66,-0.8l-1.41,-0.64l-2.39,0.66l-0.7,-0.65l-0.72,-1.46l-1.27,-0.68l-0.46,0.15l0.01,0.48l1.15,1.78l-0.23,-0.07l-1.63,-1.15l-1.68,-2.23l-0.45,-0.01l-0.37,1.42l-0.33,-0.78l-0.74,0.2l-0.21,0.27l0.33,0.72l-0.1,0.54l-0.76,0.54l-0.95,-1.45l0.06,-1.65l0.76,-0.6l-0.13,-0.81l0.71,-0.39l0.2,-1.59l1.07,-1.03l-0.01,-1.02l-0.47,-0.84l1.25,-2.17l-0.14,-0.54l-2.73,-1.61l-0.55,0.14l-0.63,1.08l-1.87,-0.23l-0.53,-0.81l-1.12,-0.49l-2.42,0.1l-1.25,-0.87l0.6,-1.34l-0.41,-0.96l-1.19,-0.28l-0.89,-0.63l-2.7,0.11l-0.36,-0.22l-0.12,-1.24l-1.04,-0.58l0.09,-1.18l-0.51,-0.28l-0.48,0.2l-0.24,-0.62l-0.5,-0.13l0.24,-0.81l-0.46,-0.57l-0.69,-0.11l-1.81,0.69l-2.23,-1.21ZM791.61,211.89l1.15,0.15l0.29,0.15l-0.51,0.29l-0.92,-0.6ZM804.73,225.05l-0.02,0.32l-0.21,-0.13l0.23,-0.19ZM808.72,228.4l-0.14,0.28l-0.13,0.07l0.01,-0.23l0.25,-0.12ZM799.19,220.15l-0.05,0.01l-0.02,0.01l0.05,-0.03l0.02,0.01ZM798.85,220.3l-0.23,0.54l-0.17,0.12l0.14,-0.59l0.27,-0.07ZM797.54,216.38l-0.28,0.3l-0.72,-0.26l0.02,-0.31l0.26,-0.36l0.72,0.64ZM796.15,212.56l-0.33,0.77l-0.6,0.24l0.01,-1.45l0.92,0.45ZM803.88,228.23l0.1,-0.1l0.11,0.06l-0.21,0.03Z", "name": "Maryland"}, "US-AR": {"path": "M499.92,377.33l-1.49,-37.58l-4.53,-23.63l37.83,-2.71l39.17,-3.76l0.8,1.57l1.02,0.69l0.11,1.73l-0.77,0.56l-0.22,0.92l-1.42,0.93l-0.29,1.03l-0.83,0.54l-1.19,2.56l0.02,0.7l0.53,0.25l10.98,-1.52l0.87,0.91l-1.18,0.36l-0.52,0.95l0.25,0.49l0.84,0.39l-3.61,2.69l0.02,0.84l0.83,1.01l-0.59,1.14l0.62,0.95l-1.42,0.74l-0.11,1.43l-1.45,2.07l0.12,1.62l0.92,3.05l-0.14,0.27l-1.09,-0.01l-0.32,0.26l-0.5,1.71l-1.52,0.95l-0.04,0.51l0.8,0.89l0.05,0.63l-1.11,1.2l-2.03,1.13l-0.21,0.62l0.43,0.98l-0.19,0.26l-1.24,0.04l-0.42,0.67l-0.32,1.87l0.47,1.55l0.03,3.04l-1.28,1.09l-1.55,0.14l0.23,1.47l-0.21,0.48l-0.93,0.25l-0.59,1.75l-1.49,1.19l-0.02,0.93l1.4,0.75l-0.02,0.68l-1.24,0.3l-2.24,1.23l0.04,0.67l0.99,0.8l-0.45,1.13l0.54,1.36l-1.09,0.61l-1.9,2.56l0.52,0.7l1.01,0.48l0.01,0.56l-0.99,0.29l-0.42,0.64l0.51,0.83l1.64,0.99l0.07,1.75l-0.59,0.98l-0.09,0.84l0.29,0.4l1.06,0.38l0.51,2.15l-1.09,1.01l0.07,2.1l-25.98,2.35l-25.74,1.93l-0.86,-11.44l-1.19,-0.85l-0.9,0.17l-0.83,-0.35l-0.93,0.39l-1.23,-0.33l-0.56,0.72l-0.47,0.01l-0.49,-0.48l-0.83,-0.14l-0.63,-0.99Z", "name": "Arkansas"}, "US-MA": {"path": "M878.75,135.13l1.03,-0.2l0.84,-1.14l0.45,0.55l-1.05,0.65l-1.28,0.13ZM832.87,132.8l-0.47,-0.28l-10.39,2.68l-0.25,-0.17l-0.41,-14.64l29.93,-8.29l1.51,-1.81l0.33,-1.48l0.94,-0.36l0.6,-1.04l1.29,-1.09l1.23,-0.1l-0.43,1.05l1.36,0.52l-0.16,0.61l0.45,0.81l1.0,0.34l-0.06,0.32l0.4,0.27l1.31,0.16l-0.15,0.55l-2.5,1.89l-0.03,1.07l0.45,0.15l-1.09,1.41l0.24,1.07l-1.0,0.97l0.6,1.39l1.4,0.42l0.51,0.61l1.36,-0.59l0.32,-0.6l1.2,0.07l0.8,0.45l0.24,0.67l1.8,1.32l-0.06,1.23l-0.36,0.3l0.12,0.61l1.59,0.78l1.19,-0.16l0.69,1.17l0.23,1.13l0.9,0.66l1.33,0.38l1.48,-0.15l0.43,0.36l1.05,-0.25l3.32,-2.79l0.38,-0.7l0.54,0.01l0.58,1.82l-3.31,1.56l-0.93,0.83l-1.89,0.89l-0.51,-0.11l-0.44,0.45l-0.37,1.42l-1.93,1.29l-0.84,-2.48l0.1,-1.34l-0.55,-0.29l-0.49,0.4l-0.93,-0.09l-0.3,0.51l0.25,0.9l-0.25,0.79l-0.4,0.07l-0.62,1.1l-0.61,-0.19l-0.49,0.49l0.23,1.83l-0.89,0.88l-0.64,-0.78l-0.47,0.02l-0.1,0.55l-0.26,0.04l-0.72,-1.98l-1.02,-0.34l0.42,-2.47l-0.21,-0.39l-0.77,0.41l-0.28,1.46l-0.7,0.21l-1.41,-0.61l-0.8,-2.08l-0.8,-0.21l-0.8,-2.11l-0.49,-0.23l-6.12,2.09l-0.3,-0.14l-14.81,4.4l-0.27,0.51ZM861.69,109.95l-0.02,-0.36l-0.15,-0.47l0.51,0.21l-0.35,0.62ZM877.31,122.26l-0.42,-0.64l0.06,-0.05l0.45,0.65l-0.09,0.05ZM876.38,120.74l-0.87,-0.1l-0.95,-1.38l1.45,0.96l0.36,0.52ZM872.43,119.06l-0.05,0.24l-0.32,-0.18l0.1,0.01l0.28,-0.07ZM872.93,134.59l0.01,-0.02l0.01,0.03l-0.02,-0.01ZM868.26,137.09l0.76,-0.56l0.27,-1.16l0.84,-1.19l0.17,0.25l0.46,-0.12l0.35,0.51l0.71,-0.02l0.18,0.36l-2.1,0.76l-1.33,1.32l-0.32,-0.15Z", "name": "Massachusetts"}, "US-AL": {"path": "M610.27,337.63l25.27,-3.08l19.48,-2.89l14.31,42.76l0.8,1.38l0.22,1.04l1.18,1.57l0.61,1.86l2.26,2.46l0.94,1.78l-0.1,2.12l1.81,1.11l-0.17,0.73l-0.64,0.11l-0.15,0.7l-0.98,0.85l-0.21,2.28l0.26,1.47l-0.76,2.29l-0.13,1.83l1.13,2.92l1.22,1.5l0.54,1.59l-0.05,5.02l-0.25,0.81l0.5,2.03l1.36,1.15l1.16,2.06l-47.9,7.28l-0.41,0.61l-0.06,3.0l2.67,2.74l2.02,0.95l-0.33,2.71l0.57,1.6l0.44,0.39l-0.94,1.7l-1.24,1.01l-1.14,-0.75l-0.33,0.49l0.67,1.46l-2.84,1.07l0.29,-0.64l-0.45,-0.86l-1.0,-0.76l-0.1,-1.11l-0.57,-0.22l-0.53,0.61l-0.32,-0.1l-0.9,-1.53l0.4,-1.68l-0.99,-2.21l-0.47,-0.44l-0.86,-0.2l-0.31,-0.89l-0.56,-0.17l-0.36,0.61l0.15,0.35l-0.76,3.11l0.01,5.1l-0.6,0.0l-0.25,-0.71l-2.24,-0.43l-1.66,0.33l-5.65,-31.94l-1.25,-65.96l-0.02,-0.37l-1.08,-0.62l-0.69,-1.0Z", "name": "Alabama"}, "US-MO": {"path": "M469.55,228.14l24.77,-0.8l18.99,-1.48l22.16,-2.65l0.42,0.34l0.4,0.89l2.44,1.61l0.29,0.73l1.21,0.85l-0.5,1.34l-0.09,3.17l0.79,3.59l0.96,1.41l0.03,1.56l1.11,1.35l0.47,1.53l4.99,4.01l1.07,1.66l4.95,3.23l0.7,1.12l0.28,1.59l0.51,0.8l-0.17,0.68l0.48,1.78l0.98,1.6l0.77,0.72l1.03,0.15l0.83,-0.56l0.83,-1.39l0.58,-0.19l2.42,0.59l1.69,0.74l0.84,0.75l-0.96,1.92l0.27,2.24l-2.36,6.77l0.02,1.01l0.71,1.89l4.7,3.96l2.0,1.02l1.46,0.08l1.67,1.27l1.92,0.77l1.52,2.07l2.05,0.8l0.43,2.91l1.74,2.84l-1.09,1.92l0.19,1.37l0.75,0.32l2.34,4.17l1.94,0.89l0.54,-0.32l0.0,-0.64l0.89,1.08l1.08,-0.08l0.15,1.81l-0.37,1.06l0.54,1.56l-1.06,3.81l-0.52,0.08l-1.38,-1.11l-0.65,0.13l-0.78,3.3l-0.52,0.73l0.13,-1.04l-0.56,-1.07l-0.96,-0.19l-0.74,0.63l0.02,1.04l0.53,0.64l-0.04,0.69l0.59,1.31l-0.2,0.39l-1.2,0.39l-0.17,0.42l0.16,0.55l0.84,0.81l-1.69,0.37l-0.13,0.62l1.54,1.93l-0.89,0.74l-0.63,2.1l-10.65,1.47l1.05,-2.24l0.87,-0.61l0.18,-0.86l1.44,-0.95l0.25,-0.95l0.63,-0.36l0.29,-0.59l-0.23,-2.25l-1.06,-0.74l-0.2,-0.75l-1.09,-1.16l-39.39,3.79l-37.87,2.71l-3.31,-57.27l-1.04,-0.62l-1.2,-0.02l-1.52,-0.71l-0.2,-0.92l-0.77,-0.58l-0.34,-0.69l-0.37,-1.52l-0.56,-0.09l-0.3,-0.55l-1.13,-0.65l-1.41,-1.8l0.73,-0.5l0.09,-1.22l1.12,-1.25l0.09,-0.78l1.02,0.16l0.56,-0.42l-0.21,-2.21l-1.02,-0.72l-0.33,-1.09l-1.17,-0.0l-1.31,0.95l-0.82,-0.69l-0.73,-0.16l-2.69,-2.31l-1.05,-0.27l0.13,-1.58l-1.32,-1.69l0.09,-1.0l-0.37,-0.36l-1.02,-0.17l-0.59,-0.84l-0.83,-0.26l0.07,-0.52l-1.24,-2.84l-0.0,-0.72l-0.4,-0.49l-0.85,-0.28l-0.05,-0.52ZM585.14,295.52l-0.11,-0.1l-0.07,-0.14l0.11,-0.01l0.06,0.25Z", "name": "Missouri"}, "US-MN": {"path": "M439.91,45.57l26.73,-1.1l0.34,1.49l1.28,0.86l1.79,-0.51l1.04,-1.46l0.77,-0.32l2.13,2.24l1.71,0.28l0.31,1.23l1.83,1.42l1.79,0.49l2.63,-0.42l0.39,0.87l0.67,0.4l5.1,0.01l0.38,0.24l0.55,1.61l0.72,0.62l4.26,-0.8l0.77,-0.66l0.07,-0.71l2.42,-0.81l3.96,-0.03l1.42,0.71l3.38,0.67l-1.0,0.81l0.0,0.83l0.51,0.45l0.67,0.09l2.23,-0.16l0.53,2.12l1.59,2.33l0.72,0.05l1.02,-0.8l-0.05,-1.76l2.65,-0.48l1.44,2.2l2.01,0.8l1.53,0.18l0.55,0.58l-0.03,0.84l0.59,0.36l1.32,0.06l-0.05,0.37l0.43,0.47l1.43,-0.2l1.12,0.22l2.21,-0.86l2.76,-2.6l2.47,-1.57l1.26,2.56l0.96,0.52l2.22,-0.68l0.87,0.36l5.96,-1.34l0.56,0.18l1.33,1.66l1.24,0.6l0.62,-0.01l1.6,-0.84l1.38,0.06l-0.96,1.07l-4.66,3.12l-6.32,2.87l-3.66,2.52l-2.13,2.52l-0.95,0.59l-6.57,8.77l-0.94,0.62l-1.07,1.58l-1.95,1.99l-4.15,3.59l-0.85,1.8l-0.55,0.44l-0.14,0.96l-0.77,-0.01l-0.46,0.51l1.03,12.27l-0.79,1.21l-1.04,0.08l-0.52,0.82l-0.83,0.16l-0.61,0.83l-2.06,1.2l-0.93,1.87l0.07,0.72l-1.69,2.4l-0.0,2.07l0.38,0.91l2.15,0.38l1.43,2.48l-0.51,1.92l-0.71,1.26l-0.04,2.12l0.46,1.32l-0.71,1.23l0.92,3.13l-0.49,4.07l3.96,3.01l3.02,0.38l1.9,2.23l2.88,0.48l2.46,1.91l2.4,3.56l2.64,1.78l2.09,0.08l1.07,0.7l0.88,0.09l0.82,1.35l1.27,0.83l0.28,2.01l0.68,1.29l0.41,4.78l-40.67,3.35l-40.68,2.18l-1.52,-38.8l-0.7,-1.27l-0.83,-0.78l-2.57,-0.78l-0.95,-1.91l-1.46,-1.79l0.21,-0.68l2.82,-2.35l0.96,-2.13l0.39,-2.45l-0.36,-1.59l0.23,-1.59l-0.19,-1.8l-0.51,-1.03l-0.19,-2.34l-1.82,-2.6l-0.47,-1.14l-0.22,-2.18l-0.66,-0.98l0.15,-1.67l-0.36,-1.54l0.52,-2.71l-1.08,-1.86l-0.51,-8.4l-0.42,-0.8l0.05,-3.96l-1.58,-4.0l-0.53,-0.66l-0.41,-1.38l0.05,-1.2l-0.48,-0.54l-1.37,-3.82l-0.01,-3.27l-0.47,-2.0l0.27,-1.14l-0.57,-2.36l0.73,-2.61l-2.07,-7.05ZM469.41,36.19l1.21,0.47l0.98,-0.2l0.34,0.47l-0.04,1.77l-1.77,1.15l-0.15,-0.48l-0.41,-0.14l-0.17,-3.04Z", "name": "Minnesota"}, "US-CA": {"path": "M3.0,175.65l0.8,-1.21l0.46,0.47l0.59,-0.07l0.53,-1.15l0.8,-0.83l1.3,-0.23l0.57,-0.51l-0.15,-0.72l-0.92,-0.33l1.55,-2.72l-0.29,-1.56l0.15,-0.86l2.07,-3.22l1.34,-2.97l0.37,-2.09l-0.27,-1.0l0.19,-3.07l-1.34,-2.15l1.19,-1.34l0.7,-2.48l32.71,8.51l32.57,7.68l-14.08,63.61l25.33,34.47l36.48,50.79l13.27,17.63l-0.21,2.7l0.73,0.93l0.21,1.7l0.86,0.63l0.8,2.54l-0.08,0.9l0.63,1.44l-0.17,1.35l3.8,3.82l0.01,0.49l-1.96,1.49l-3.13,1.22l-1.21,1.96l-1.73,1.11l-0.34,0.81l0.37,1.02l-0.52,0.51l-0.1,0.89l0.07,2.27l-0.61,0.7l-0.66,2.41l-2.04,2.43l-1.61,0.12l-0.43,0.51l0.33,0.88l-0.6,1.33l0.53,1.11l-0.02,1.18l-0.79,2.66l0.57,1.01l2.75,1.15l0.33,0.83l-0.2,2.38l-1.19,0.76l-0.43,1.36l-2.29,-0.63l-1.26,0.59l-43.59,-3.74l0.18,-1.14l0.67,-0.5l-0.17,-1.06l-1.16,-1.39l-1.04,-0.16l0.24,-1.19l-0.27,-1.07l0.79,-1.32l-0.28,-4.22l-0.59,-2.29l-1.91,-4.06l-3.55,-4.08l-1.29,-1.97l-2.41,-2.12l-2.03,-3.0l-2.22,-0.91l-0.94,0.29l-0.4,0.95l-0.62,-0.74l-0.88,-0.23l-0.14,-0.3l0.62,-0.74l0.18,-1.56l-0.43,-2.04l-1.0,-1.95l-0.99,-0.74l-4.45,-0.24l-3.33,-1.83l-1.36,-1.26l-0.7,-0.13l-1.02,-1.19l-0.43,-2.58l-0.97,-0.48l-1.67,-2.31l-2.19,-1.74l-1.24,-0.42l-1.67,0.34l-1.14,-1.02l-1.25,0.01l-2.48,-1.85l-1.06,-0.0l-1.49,-0.7l-4.93,-0.58l-1.11,-2.34l-1.35,-0.65l1.28,-2.52l-0.24,-1.36l0.76,-1.95l-0.63,-1.34l1.29,-2.4l0.34,-2.41l-0.99,-1.24l-1.26,-0.24l-1.4,-1.29l0.42,-1.58l0.8,-0.07l0.26,-0.45l-0.46,-2.18l-0.65,-0.77l-1.47,-0.85l-1.76,-3.95l-1.82,-1.26l-0.34,-2.72l-1.6,-2.57l0.07,-1.37l-0.33,-1.25l-1.15,-0.95l-0.73,-2.92l-2.4,-2.69l-0.54,-1.25l0.01,-4.55l0.6,-0.57l-0.58,-1.13l0.51,-0.57l0.53,0.61l0.77,-0.01l0.85,-0.79l0.57,-1.3l0.8,0.05l0.21,-0.88l-0.42,-0.27l0.48,-1.17l-1.2,-3.64l-0.62,-0.48l-1.06,0.07l-1.93,-0.53l-1.04,-1.06l-1.87,-3.2l-0.78,-2.26l0.87,-2.34l0.1,-1.1l-0.26,-2.36l-0.31,-0.64l-0.54,-0.25l0.25,-1.16l0.7,-1.05l0.26,-2.66l0.47,-0.62l0.88,0.14l0.18,0.92l-0.72,2.09l0.05,1.14l1.18,1.32l0.55,0.11l0.58,1.27l1.16,0.79l0.4,1.0l0.89,0.41l0.83,-0.19l-0.2,-1.44l-0.64,-0.43l-0.17,-0.58l-0.22,-3.52l-0.54,-0.7l0.24,-0.68l-1.48,-1.06l0.51,-1.05l0.1,-1.05l-1.19,-1.57l0.78,-0.71l0.79,0.07l1.25,-0.7l1.25,1.02l1.87,-0.29l5.55,2.45l0.61,-0.08l0.65,-1.35l0.69,-0.03l1.91,2.53l0.25,0.18l0.63,-0.23l0.03,-0.38l-0.39,-0.93l-1.56,-1.88l-1.65,-0.34l0.27,-0.6l-0.28,-0.54l-0.48,0.08l-1.06,0.97l-1.84,-0.25l-0.44,0.27l-0.14,-0.5l-1.04,-0.41l0.24,-1.03l-0.84,-0.47l-1.0,0.26l-0.61,0.82l-1.1,0.37l-1.35,-0.9l-0.39,-0.87l-1.51,-1.44l-0.58,0.03l-0.64,0.59l-0.92,-0.14l-0.49,0.36l-0.35,1.85l0.2,0.76l-0.77,1.34l0.35,0.63l-0.46,0.58l-0.04,0.67l-2.15,-2.88l-0.44,-0.15l-0.25,0.32l-0.73,-1.0l-0.21,-1.02l-1.19,-1.17l-0.39,-1.04l-0.61,-0.19l0.66,-1.45l0.11,0.95l0.76,1.48l0.44,0.25l0.34,-0.38l-1.43,-5.16l-1.08,-1.41l-0.3,-2.65l-2.49,-2.87l-1.77,-4.45l-3.02,-5.5l1.11,-1.65l0.27,-1.94l-0.45,-2.09l-0.12,-3.56l1.36,-2.85l0.7,-0.72l-0.06,-1.52l0.43,-1.51l-0.4,-1.62l0.13,-1.93l-1.39,-4.03l-0.97,-1.15l0.06,-0.78l-0.41,-1.18l-2.88,-4.02l0.52,-1.32l-0.19,-2.65l2.25,-3.36ZM31.19,240.19l-0.05,0.09l-0.27,0.04l-0.01,-0.0l0.33,-0.12ZM63.48,350.44l0.26,0.12l0.17,0.16l-0.29,-0.17l-0.13,-0.11ZM65.06,351.68l1.33,0.85l0.74,1.72l-0.89,-0.66l-1.14,0.01l-0.04,-1.92ZM61.77,361.76l1.36,2.09l0.57,0.53l-0.46,0.06l-0.83,-0.8l-0.64,-1.88ZM42.7,332.51l0.87,0.73l1.38,0.37l1.33,1.0l-2.81,-0.22l-0.71,-0.58l0.24,-0.65l-0.31,-0.66ZM47.07,334.62l0.93,-0.47l0.32,0.35l-0.37,0.13l-0.87,-0.01ZM45.1,350.98l0.29,-0.06l0.95,0.92l-0.61,-0.17l-0.63,-0.69ZM36.71,332.66l2.58,0.19l0.2,0.74l0.59,0.45l-1.22,0.61l-1.17,-0.11l-0.5,-0.44l-0.48,-1.42ZM34.08,330.97l0.05,-0.02l0.05,0.06l-0.01,-0.0l-0.09,-0.04Z", "name": "California"}, "US-IA": {"path": "M453.66,165.63l42.88,-2.29l40.6,-3.34l0.97,2.5l2.0,0.98l0.08,0.59l-0.89,1.79l-0.15,1.04l0.92,5.04l0.93,1.24l0.39,1.73l1.47,1.7l4.96,0.81l1.27,2.0l-0.3,1.02l0.29,0.66l3.63,2.32l0.86,2.38l3.86,2.26l0.62,1.65l-0.3,4.16l-1.64,1.97l-0.49,1.92l0.14,1.27l-1.25,1.35l-2.52,0.97l-0.89,1.17l-0.55,0.25l-4.57,0.84l-0.89,0.72l-0.6,1.69l-0.15,2.53l0.4,1.06l2.02,1.44l0.55,2.61l-1.86,3.22l-0.21,2.21l-0.52,1.4l-2.89,1.39l-1.02,1.02l-0.2,0.99l0.72,0.85l0.21,2.11l-0.58,0.24l-1.35,-0.81l-0.31,-0.75l-1.29,-0.8l-0.29,-0.5l-0.89,-0.35l-0.3,-0.8l-0.95,-0.67l-22.35,2.69l-15.16,1.21l-7.61,0.53l-20.83,0.54l-0.22,-1.04l-1.3,-0.72l-0.33,-0.66l0.57,-1.13l-0.21,-0.95l0.21,-1.37l-0.36,-2.16l-0.6,-0.71l0.06,-3.6l-1.05,-0.49l0.05,-0.88l0.71,-1.01l-0.05,-0.44l-1.31,-0.55l0.33,-2.51l-0.41,-0.45l-0.89,-0.16l0.23,-0.78l-0.3,-0.58l-0.51,-0.25l-0.74,0.23l-0.42,-2.77l0.5,-2.33l-0.2,-0.67l-1.37,-1.69l-0.08,-1.89l-1.79,-1.52l-0.36,-1.72l-1.09,-0.93l0.03,-2.15l-1.11,-1.85l0.21,-1.67l-0.27,-1.08l-1.38,-0.66l-0.88,-2.14l0.04,-0.63l-1.81,-1.79l0.56,-1.58l0.54,-0.47l0.72,-2.66l0.0,-1.67l0.54,-0.68l0.21,-1.18l-0.51,-2.22l-1.33,-0.28l-0.05,-0.72l0.45,-0.56l-0.0,-1.7l-0.96,-1.41l-0.05,-0.86Z", "name": "Iowa"}, "US-MI": {"path": "M613.3,123.04l1.01,-0.11l0.46,-0.67l-0.39,-3.2l1.08,-0.12l0.66,-1.43l1.19,0.47l0.65,-0.34l0.74,-2.59l0.82,-1.21l0.55,-1.68l0.55,-0.18l-0.57,0.88l0.61,1.64l-0.7,1.8l0.71,0.42l-0.46,2.61l0.89,1.41l0.73,-0.06l0.52,0.55l0.65,-0.25l0.87,-2.26l0.64,-3.51l-0.09,-2.06l-0.78,-3.41l0.58,-1.02l2.12,-1.66l2.74,-0.56l0.98,-0.64l0.28,-0.64l-0.26,-0.54l-1.76,-0.09l-0.97,-0.85l-0.53,-1.98l1.83,-2.99l-0.11,-0.73l1.72,-0.24l0.74,-0.95l4.18,1.97l0.83,0.12l1.98,-0.42l1.38,0.38l0.99,0.79l1.19,1.76l2.74,-0.21l1.71,1.0l1.92,0.07l0.81,0.63l1.16,0.23l1.44,-0.07l1.77,1.03l0.0,1.12l1.05,1.3l0.64,0.2l0.39,0.92l-0.15,0.54l-0.67,-0.25l-0.94,0.58l-0.22,1.83l0.82,1.28l1.61,0.97l0.7,1.36l0.67,2.25l-0.1,1.73l0.8,5.79l-0.77,0.64l-0.4,0.87l-0.75,0.08l-0.78,0.82l-0.14,4.45l-1.12,0.49l-0.17,0.81l-1.86,0.44l-0.72,0.6l-0.56,2.6l0.26,0.45l-0.2,0.52l0.27,2.56l1.39,1.29l2.9,0.8l0.91,-0.08l1.07,-1.23l0.59,-1.44l0.63,0.18l0.38,-0.24l0.99,-3.57l0.59,-1.06l-0.08,-0.51l0.92,-1.41l1.43,-0.44l1.06,-0.69l0.82,-1.1l0.87,-0.44l2.07,0.57l2.14,1.75l1.23,2.13l2.05,5.84l0.83,1.58l1.05,3.67l1.52,3.58l1.41,2.21l-0.43,3.38l0.46,2.46l-0.46,2.76l-0.34,0.44l-0.24,-0.32l-0.32,-1.69l-1.46,-0.5l-0.47,0.09l-1.47,1.36l-0.05,0.83l0.55,0.66l-0.82,0.57l-0.29,0.78l0.3,2.91l-0.48,0.75l-1.61,0.93l-1.05,1.85l-0.41,3.7l0.28,1.53l-0.32,0.92l-0.43,0.19l0.03,0.9l-0.63,0.3l-0.37,1.07l-0.52,0.52l-0.49,1.28l-0.02,1.04l-0.51,0.78l-20.38,4.41l-0.15,-0.84l-0.46,-0.33l-31.63,4.97l1.86,-2.22l1.82,-5.87l1.42,-3.02l0.98,-4.96l0.08,-5.29l-1.11,-6.42l-2.21,-4.24l0.6,-0.51l0.3,-0.78l-0.57,-0.42l-1.08,0.56l-4.01,-7.31l0.08,-1.35l0.97,-2.05l-0.02,-0.96l-0.76,-3.11l-1.29,-1.63l-0.05,-0.61l1.71,-2.72l1.2,-4.13l-0.25,-5.32l-0.78,-1.58l1.09,-1.15ZM622.19,118.68l0.0,-0.07l0.11,-0.12l-0.01,0.03l-0.11,0.16ZM622.44,117.76l-0.07,-0.16l0.07,-0.14l0.0,0.3ZM544.04,91.26l4.86,-2.42l3.53,-3.65l5.76,-1.4l1.38,-0.85l2.34,-2.74l0.97,0.04l1.52,-0.74l0.99,-2.27l2.79,-2.88l0.24,1.73l1.85,0.59l0.06,1.46l0.67,0.14l0.51,0.6l-0.14,3.17l0.44,0.95l-0.33,0.48l0.2,0.47l0.74,-0.02l1.07,-2.23l1.07,-0.91l-0.41,1.17l0.59,0.44l0.82,-0.68l0.52,-1.23l1.0,-0.44l3.09,-0.27l1.5,0.2l1.19,0.93l1.54,0.44l0.48,1.05l2.32,2.59l1.17,0.54l0.54,1.56l0.73,0.34l1.87,0.06l0.72,-0.41l1.07,-0.06l0.51,-0.66l0.88,-0.44l1.0,1.11l1.11,0.64l1.02,-0.26l0.67,-0.83l1.88,1.05l0.64,-0.35l1.63,-2.61l2.79,-1.92l1.69,-1.67l0.92,0.1l3.26,-1.23l5.17,-0.28l4.46,-2.76l2.56,-0.39l0.01,3.27l0.3,0.72l-0.35,1.11l0.68,0.85l0.66,0.11l0.71,-0.4l2.2,0.69l1.14,-0.44l1.02,-0.88l0.66,0.48l0.21,0.71l0.85,0.21l1.26,-0.82l0.94,-1.56l0.65,-0.02l0.85,0.75l2.01,3.79l-0.86,1.05l0.49,0.88l0.47,0.36l1.36,-0.43l0.58,0.46l0.64,0.04l0.18,1.2l0.99,0.87l1.53,0.51l-1.17,0.69l-4.96,-0.11l-0.53,0.3l-1.36,-0.16l-0.88,0.41l-0.67,-0.75l-1.63,-0.06l-0.58,0.47l-0.06,1.22l-0.49,0.76l0.4,2.05l-0.92,-0.22l-0.9,-0.92l-0.77,-0.13l-1.97,-1.64l-2.41,-0.58l-1.6,0.05l-1.04,-0.5l-2.88,0.49l-0.61,0.45l-1.16,2.53l-3.47,0.76l-0.57,0.78l-2.06,-0.32l-2.81,0.95l-0.68,0.84l-0.54,2.52l-0.78,0.29l-0.81,0.88l-0.65,0.29l0.15,-1.96l-0.75,-0.91l-1.02,0.35l-0.76,0.93l-0.97,-0.39l-0.68,0.17l-0.37,0.4l0.11,0.83l-0.72,2.02l-1.2,0.6l-0.12,-1.38l-0.47,-1.06l0.33,-1.69l-0.17,-0.37l-0.66,-0.16l-0.45,0.58l-0.59,2.13l-0.2,2.57l-1.11,0.92l-1.25,3.03l-0.6,2.66l-2.53,5.34l-0.69,0.74l0.13,0.91l-1.41,-1.27l0.17,-1.74l0.62,-1.69l-0.42,-0.81l-0.62,-0.3l-1.35,0.86l-1.16,0.1l0.03,-1.29l0.8,-1.45l-0.42,-1.34l0.29,-1.09l-0.58,-0.98l0.14,-0.83l-1.91,-1.54l-1.1,-0.05l-0.59,-0.43l-0.86,0.2l-0.62,-0.19l0.29,-1.37l-0.95,-1.45l-1.13,-0.51l-2.23,-0.09l-3.2,-0.69l-1.55,0.6l-1.43,-0.42l-1.62,0.17l-4.57,-1.93l-15.38,-2.44l-2.01,-3.4l-1.89,-0.96l-0.76,0.26l-0.1,-0.3ZM603.98,101.59l-0.0,0.52l-0.46,0.32l-0.69,1.39l0.08,0.57l-0.65,-0.58l0.9,-2.17l0.83,-0.07ZM644.38,90.12l1.97,-1.54l0.16,-0.57l-0.28,-0.64l1.05,0.15l0.81,1.23l0.82,0.19l-0.26,1.09l-0.36,0.19l-1.51,-0.33l-0.77,0.46l-1.63,-0.23ZM636.04,80.32l0.55,-0.84l0.52,0.05l-0.36,1.33l0.11,0.71l-0.35,-0.9l-0.47,-0.35ZM636.97,81.84l0.09,0.14l0.01,0.02l-0.02,-0.01l-0.08,-0.14ZM637.86,83.93l0.4,0.45l0.23,0.61l-0.63,-0.71l0.0,-0.34ZM634.29,95.87l1.41,0.24l0.35,-0.19l0.4,0.21l-0.17,0.52l-0.75,0.11l-1.24,-0.89ZM619.44,99.61l0.64,2.25l-0.79,0.78l-0.39,-0.26l0.54,-2.77ZM613.94,113.71l0.48,0.3l-0.08,0.57l-0.45,-0.69l0.06,-0.17ZM612.93,116.45l0.0,-0.03l0.02,-0.04l-0.03,0.07ZM599.9,85.56l-0.23,-0.37l0.02,-0.4l0.37,0.33l-0.16,0.45ZM570.96,75.75l-0.51,-0.27l-1.15,0.07l-0.06,-1.58l0.99,-1.04l1.16,-2.12l1.82,-1.52l0.63,-0.0l0.52,-0.59l2.07,-0.9l3.33,-0.44l1.11,0.67l-0.54,0.38l-1.31,-0.12l-2.26,0.79l-0.15,0.29l0.31,0.58l0.72,0.13l-1.19,1.0l-1.39,1.91l-0.69,0.29l-0.34,1.46l-1.14,1.38l-0.64,2.06l-0.67,-0.88l0.74,-0.98l0.12,-1.97l-0.63,-0.37l-0.2,0.15l-0.59,0.93l-0.04,0.68ZM558.64,61.09l0.75,-1.0l-0.4,-0.34l0.56,-0.55l4.59,-3.04l1.96,-1.75l0.62,-0.18l-0.45,0.67l0.11,0.8l-0.43,0.5l-4.22,2.61l-0.85,1.0l0.24,0.37l-1.86,1.19l-0.61,-0.29Z", "name": "Michigan"}, "US-GA": {"path": "M655.83,331.54l22.1,-3.74l20.71,-4.04l-1.47,1.41l-0.51,1.67l-0.66,0.82l-0.4,1.72l0.12,1.22l0.83,0.77l1.85,0.77l1.04,0.1l2.72,1.98l0.84,0.22l1.91,-0.39l0.6,0.24l0.81,1.62l1.52,1.57l1.06,2.46l1.34,0.8l0.85,1.14l0.56,0.26l1.01,1.74l1.08,0.28l1.19,0.97l3.84,1.79l2.44,3.1l2.27,0.55l2.56,1.63l0.51,2.31l1.26,0.99l0.48,-0.17l0.31,0.48l-0.09,0.62l0.79,0.71l0.79,0.08l0.57,1.19l5.03,1.81l0.41,1.76l1.56,1.7l1.04,1.98l-0.07,0.8l0.49,0.68l0.12,1.23l1.05,0.78l1.17,0.16l1.26,0.6l0.28,0.53l0.58,0.23l1.14,2.53l0.77,0.56l0.1,2.67l0.78,1.47l1.39,0.88l1.53,-0.28l1.46,0.74l1.46,0.09l-0.59,0.78l-0.56,-0.35l-0.47,0.28l-0.4,0.99l0.63,0.9l-0.37,0.48l-1.39,-0.14l-0.78,-0.54l-0.64,0.45l0.26,0.71l-0.48,0.53l0.36,0.6l0.95,-0.05l0.5,0.28l-0.57,1.35l-1.44,0.29l-1.34,-0.43l-0.44,0.39l0.35,0.84l1.24,0.33l-0.5,0.87l0.23,0.35l-0.2,0.64l0.84,0.63l-0.33,0.44l-0.72,-0.13l-0.96,0.52l-0.09,0.63l1.09,0.44l0.06,0.94l0.48,-0.08l1.2,-1.18l-0.91,2.33l-0.32,-0.58l-0.59,-0.07l-0.44,0.73l0.3,0.7l0.99,0.82l-2.34,0.07l-0.92,-0.27l-0.63,0.3l0.07,0.63l0.55,0.33l2.78,0.21l1.08,0.65l-0.01,0.34l-0.56,0.22l-0.87,1.96l-0.52,-1.41l-0.45,-0.12l-0.6,0.34l-0.14,0.84l0.35,0.96l-0.6,0.12l-0.02,0.84l-0.3,0.16l0.07,0.46l1.35,1.13l-1.09,1.04l0.33,0.47l0.78,0.07l-0.38,0.92l0.06,0.88l-0.46,0.52l1.12,1.65l0.04,0.76l-0.8,0.34l-2.66,-0.14l-4.1,-0.92l-1.31,0.36l-0.17,0.74l-0.68,0.26l-0.34,1.25l0.29,2.08l0.96,1.35l0.17,4.26l-1.99,0.42l-0.55,-0.92l-0.13,-1.31l-1.35,-1.81l-49.49,5.58l-0.73,-0.55l-0.89,-2.7l-0.96,-1.5l-0.57,-0.37l0.15,-0.68l-0.74,-1.5l-1.84,-1.8l-0.44,-1.74l0.25,-0.8l0.03,-5.18l-0.62,-1.8l-1.2,-1.45l-1.05,-2.63l0.11,-1.65l0.77,-2.36l-0.26,-1.52l0.18,-2.1l1.62,-1.34l0.45,-1.47l-0.56,-0.6l-1.43,-0.67l0.08,-2.14l-0.99,-1.85l-2.2,-2.38l-1.05,-2.78l-0.76,-0.67l-0.17,-0.95l-0.78,-1.35l-14.26,-42.58ZM747.77,388.29l0.7,-0.27l-0.07,0.83l-0.3,-0.33l-0.34,-0.23ZM746.43,405.18l0.06,0.87l-0.01,0.47l-0.35,-0.57l0.3,-0.77Z", "name": "Georgia"}, "US-AZ": {"path": "M127.66,383.44l0.45,-1.79l1.3,-1.26l0.55,-1.1l0.48,-0.25l1.67,0.63l0.97,-0.03l0.52,-0.45l0.29,-1.16l1.32,-0.98l0.26,-2.71l-0.45,-1.24l-0.84,-0.66l-2.08,-0.68l-0.3,-0.61l0.81,-2.37l0.01,-1.38l-0.51,-1.19l0.57,-0.84l-0.2,-0.86l1.58,-0.25l2.32,-2.77l0.66,-2.41l0.66,-0.79l0.04,-3.14l0.56,-0.61l-0.28,-1.41l1.73,-1.11l1.05,-1.82l3.18,-1.25l2.05,-1.54l0.27,-0.53l-0.12,-1.03l-3.25,-3.48l-0.51,-0.22l0.23,-1.24l-0.65,-1.44l0.08,-0.9l-0.87,-2.74l-0.84,-0.56l-0.18,-1.63l-0.68,-0.79l0.21,-3.49l0.59,-0.85l-0.29,-0.84l1.03,-0.39l0.41,-1.4l0.15,-3.16l-0.75,-3.61l0.47,-0.86l0.3,-1.65l-0.38,-2.96l0.86,-2.52l-0.8,-1.85l-0.03,-0.9l0.44,-0.51l0.35,-1.33l2.55,-0.6l1.75,1.0l1.43,-0.18l0.96,2.22l0.78,0.71l1.54,0.15l1.02,-0.48l1.04,-2.23l0.95,-1.17l2.64,-16.67l42.56,6.06l42.71,4.9l-12.24,122.4l-37.11,-4.26l-36.46,-19.18l-28.51,-15.73Z", "name": "Arizona"}, "US-MT": {"path": "M167.4,59.85l0.72,-0.1l0.33,-0.38l-0.88,-2.02l0.85,-0.96l-0.38,-1.32l0.1,-0.97l-1.22,-1.96l-0.22,-1.51l-1.02,-1.36l-1.16,-2.48l3.76,-21.01l43.48,7.0l42.9,5.45l42.6,4.01l43.01,2.64l-3.73,86.82l-28.12,-1.54l-26.83,-2.0l-26.78,-2.51l-25.84,-2.91l-0.45,0.35l-1.28,10.37l-1.51,-2.01l-0.02,-0.91l-1.17,-2.35l-1.24,-0.75l-1.81,0.9l0.02,1.05l-0.72,0.42l-0.35,1.55l-2.42,-0.42l-1.92,0.55l-0.92,-0.85l-3.36,0.07l-2.38,-0.98l-1.68,0.56l-0.85,1.47l-4.66,-1.63l-1.3,0.36l-1.13,0.89l-0.31,0.66l-1.65,-1.41l0.22,-1.42l-0.89,-1.71l0.4,-0.36l0.07,-0.62l-1.16,-3.08l-1.44,-1.26l-1.45,0.34l-0.21,-0.64l-1.07,-0.9l-0.4,-1.37l0.68,-0.6l0.21,-1.41l-0.75,-2.38l-0.77,-0.36l-0.3,-1.58l-1.49,-2.55l0.24,-1.51l-0.55,-1.27l0.35,-1.4l-0.72,-0.86l0.49,-0.97l-0.21,-0.75l-1.14,-0.76l-0.13,-0.59l-0.84,-0.92l-0.8,-0.4l-0.51,0.37l-0.08,0.75l-0.7,0.26l-1.14,1.21l-1.75,0.35l-1.22,1.06l-1.08,-0.86l-0.63,-1.01l-1.05,-0.45l0.02,-0.86l0.74,-0.63l0.25,-1.06l-0.6,-1.61l0.91,-1.09l1.07,-0.08l0.83,-0.8l-0.25,-1.14l0.39,-1.07l-0.94,-0.81l-0.04,-0.81l0.67,-1.28l-0.58,-1.08l0.74,-0.06l0.39,-0.42l-0.03,-1.78l1.85,-3.73l-0.13,-1.06l0.89,-0.62l0.63,-3.18l-0.78,-0.51l-1.8,0.36l-1.33,-0.12l-0.64,-0.56l0.37,-0.84l-0.61,-0.98l-0.66,-0.23l-0.73,0.35l-0.06,-0.95l-1.73,-1.65l0.06,-1.86l-1.66,-1.85l-0.08,-0.69l-1.52,-2.92l-1.06,-1.31l-0.55,-1.65l-2.34,-1.37l-0.93,-1.98l-1.44,-1.22Z", "name": "Montana"}, "US-MS": {"path": "M557.14,430.96l0.67,-0.97l-1.06,-1.76l0.18,-1.63l-0.82,-0.87l1.7,-0.26l0.47,-0.54l0.39,-2.74l-0.79,-1.82l1.57,-1.8l0.24,-3.58l0.74,-2.26l1.89,-1.25l1.15,-1.97l1.4,-1.04l0.34,-0.78l-0.04,-0.99l-0.64,-0.95l1.15,-0.28l0.96,-2.58l0.91,-1.31l-0.16,-0.86l-1.55,-0.42l-0.35,-0.95l-1.84,-1.03l-0.08,-2.13l-0.94,-0.73l-0.45,-0.83l-0.02,-0.37l1.14,-0.29l0.46,-0.68l-0.26,-0.89l-1.41,-0.48l0.23,-1.76l0.98,-1.53l-0.78,-1.06l-1.08,-0.3l-0.16,-2.8l0.9,-0.54l0.22,-0.8l-0.63,-2.5l-1.26,-0.65l0.7,-1.32l-0.08,-2.2l-2.03,-1.49l1.13,-0.47l0.12,-1.4l-1.35,-0.87l1.57,-2.02l0.93,-0.31l0.36,-0.68l-0.52,-1.55l0.42,-1.35l-0.89,-0.87l1.59,-0.83l1.25,-0.27l0.59,-0.76l-0.09,-1.06l-1.42,-0.93l1.39,-1.07l0.62,-1.76l0.95,-0.17l0.34,-0.97l-0.2,-0.76l1.48,-0.44l1.22,-1.21l0.06,-3.49l-0.47,-1.51l0.36,-1.76l0.74,0.08l0.68,-0.33l0.42,-0.87l-0.41,-1.04l2.73,-1.71l0.58,-1.05l-0.29,-1.26l36.59,-4.31l0.87,1.23l0.85,0.44l1.25,65.96l5.71,32.91l-0.73,0.7l-1.55,-0.29l-0.91,-0.94l-1.32,1.07l-1.24,0.18l-2.05,-1.2l-2.01,-0.23l-0.84,0.37l-0.34,0.44l0.32,0.41l-0.56,0.37l-3.98,1.69l-0.05,-0.5l-0.97,-0.51l-1.0,0.05l-0.58,1.0l0.76,0.61l-1.6,1.22l-0.32,1.29l-0.69,0.31l-1.35,-0.05l-1.18,-1.87l-0.09,-0.9l-0.93,-1.47l-0.21,-1.01l-1.42,-1.63l-1.17,-0.53l-0.47,-0.77l0.1,-0.63l-0.7,-0.92l0.2,-1.99l0.5,-0.94l0.65,-2.99l-0.07,-1.23l-0.43,-0.28l-34.87,3.59Z", "name": "Mississippi"}, "US-SC": {"path": "M699.48,323.59l4.87,-2.71l1.03,-0.06l1.11,-1.38l3.94,-1.92l0.45,-0.88l0.63,0.21l22.62,-3.59l0.31,0.13l-0.1,0.97l0.46,0.66l0.71,0.0l1.21,-1.3l2.85,2.48l0.48,2.44l0.56,0.51l19.55,-3.73l23.18,14.64l0.02,0.54l-2.47,2.19l-2.42,3.67l-2.38,5.71l-0.07,2.72l-1.09,-0.21l0.84,-2.71l-0.64,-0.22l-0.76,0.87l-0.55,1.38l-0.1,1.55l0.85,0.94l1.06,0.22l0.45,0.89l-0.75,0.09l-0.4,0.56l-0.88,0.03l-0.23,0.69l0.95,0.43l-1.1,1.13l-0.07,1.01l-1.35,0.65l-0.5,-0.6l-0.5,-0.07l-1.06,0.87l-0.55,1.76l0.43,0.86l-1.19,1.23l-0.6,1.44l-1.2,1.02l-0.91,-0.38l0.27,-0.59l-0.54,-0.73l-1.38,0.33l-0.11,0.43l0.37,0.76l-0.52,0.03l0.06,0.75l0.73,0.57l1.31,0.41l-0.12,0.38l-0.88,0.95l-1.22,0.24l-0.25,0.51l0.33,0.44l-2.29,1.36l-1.44,-0.83l-0.56,0.11l-0.1,0.68l1.2,0.76l-1.54,1.58l-0.73,-0.74l-0.49,0.53l-0.0,0.73l-0.7,-0.36l-0.85,0.01l-1.35,-0.82l-0.44,0.5l0.17,0.52l-1.74,0.19l-0.44,0.37l-0.06,0.77l0.65,0.22l1.43,-0.18l-0.25,0.55l0.43,0.25l1.92,-0.17l0.11,0.21l-0.97,0.87l-0.32,0.78l0.57,0.49l0.94,-0.54l0.03,0.21l-1.12,1.1l-1.0,0.45l-0.22,-2.03l-0.7,-0.26l-0.24,-1.54l-0.89,-0.14l-0.3,0.58l0.89,2.68l-1.14,-0.65l-0.64,-0.99l-0.41,-1.75l-0.66,-0.2l-0.53,-0.62l-0.69,0.01l-0.26,0.6l0.86,1.01l0.01,0.67l1.13,1.81l-0.01,0.85l1.24,1.16l-0.62,0.34l0.04,0.98l-1.18,3.56l-1.53,-0.76l-1.53,0.27l-0.98,-0.66l-0.55,-1.02l-0.19,-2.92l-0.87,-0.74l-1.08,-2.45l-1.05,-0.93l-3.25,-1.29l-0.51,-2.63l-1.14,-2.15l-1.45,-1.55l-0.07,-1.06l-0.78,-1.2l-4.85,-1.62l-0.6,-1.26l-1.21,-0.35l0.01,-0.7l-0.54,-0.86l-0.87,0.01l-0.74,-0.59l0.02,-1.21l-0.67,-1.25l-2.72,-1.73l-2.17,-0.49l-2.39,-3.07l-3.96,-1.86l-1.23,-1.01l-0.83,-0.11l-1.06,-1.78l-0.51,-0.21l-0.92,-1.19l-1.19,-0.66l-1.01,-2.38l-1.55,-1.62l-1.04,-1.84l-1.06,-0.36l-1.94,0.39l-0.46,-0.16l-2.77,-2.14l-1.07,0.03l-1.71,-0.71l-0.53,-0.51l0.35,-2.19l0.64,-0.78l0.34,-1.37l1.36,-1.23l0.4,-0.98ZM752.86,373.71l0.73,-0.09l0.52,0.44l-1.22,1.91l0.28,-1.22l-0.3,-1.05Z", "name": "South Carolina"}, "US-RI": {"path": "M860.17,132.77l0.34,0.0l1.04,2.6l-0.31,0.56l-1.07,-3.15ZM859.46,136.41l-0.28,-0.32l0.23,-1.5l0.42,1.5l-0.37,0.32ZM852.23,141.2l0.22,-0.46l-0.55,-2.18l-3.23,-9.82l5.59,-1.92l0.78,2.02l0.81,0.24l0.19,0.72l0.09,0.41l-0.76,0.26l0.03,0.29l0.53,1.43l0.59,0.48l-0.6,0.16l-0.45,0.73l0.88,0.95l-0.13,1.21l0.96,2.14l-0.3,2.06l-1.33,0.25l-3.14,2.22l-0.17,-1.18ZM856.95,131.31l0.26,0.09l0.01,0.09l-0.17,-0.08l-0.09,-0.1ZM858.34,131.95l0.24,0.47l-0.2,0.31l-0.04,-0.37l0.0,-0.4ZM857.06,144.61l0.1,0.1l-0.18,0.1l-0.03,-0.13l0.11,-0.07Z", "name": "Rhode Island"}, "US-CT": {"path": "M824.64,156.55l2.8,-3.23l-0.07,-0.55l-1.32,-1.21l-3.64,-15.64l9.8,-2.55l0.6,0.44l0.65,-0.27l0.22,-0.58l14.14,-4.2l3.29,10.01l0.48,1.92l-0.03,1.67l-1.65,0.34l-0.91,0.82l-0.7,-0.35l-0.49,0.11l-0.17,0.9l-1.15,0.09l-1.26,1.27l-0.62,-0.12l-0.57,-0.99l-0.89,-0.07l-0.2,0.68l0.76,0.62l0.09,0.53l-0.89,-0.0l-1.01,0.88l-1.65,0.1l-1.14,0.95l-0.86,-0.08l-2.05,0.85l-0.4,-0.66l-0.6,0.12l-0.87,2.11l-0.59,0.3l-0.82,1.29l-0.79,-0.04l-0.94,0.74l-0.19,0.63l-0.53,0.06l-0.88,0.75l-2.75,3.08l-0.96,0.28l-1.25,-1.01Z", "name": "Connecticut"}}, "height": 606.211102089553, "projection": {"type": "lcc", "centralMeridian": -100.0}, "width": 900.0});
},{}],"/Code/html/themes/themekit/lib/maps/js/vector/custom/jquery-jvectormap-world-mill-en.js":[function(require,module,exports){
$.fn.vectorMap('addMap', 'world_mill_en',{"insets": [{"width": 900.0, "top": 0, "height": 440.7063107441331, "bbox": [{"y": -12671671.123330014, "x": -20004297.151525836}, {"y": 6930392.02513512, "x": 20026572.394749384}], "left": 0}], "paths": {"BD": {"path": "M652.71,228.85l-0.04,1.38l-0.46,-0.21l-0.42,0.3l0.05,0.65l-0.17,-1.37l-0.48,-1.26l-1.08,-1.6l-0.23,-0.13l-2.31,-0.11l-0.31,0.36l0.21,0.98l-0.6,1.11l-0.8,-0.4l-0.37,0.09l-0.23,0.3l-0.54,-0.21l-0.78,-0.19l-0.38,-2.04l-0.83,-1.89l0.4,-1.5l-0.16,-0.35l-1.24,-0.57l0.36,-0.62l1.5,-0.95l0.02,-0.49l-1.62,-1.26l0.64,-1.31l1.7,1.0l0.12,0.04l0.96,0.11l0.19,1.62l0.25,0.26l2.38,0.37l2.32,-0.04l1.06,0.33l-0.92,1.79l-0.97,0.13l-0.23,0.16l-0.77,1.51l0.05,0.35l1.37,1.37l0.5,-0.14l0.35,-1.46l0.24,-0.0l1.24,3.92Z", "name": "Bangladesh"}, "BE": {"path": "M429.28,143.95l1.76,0.25l0.13,-0.01l2.16,-0.64l1.46,1.34l1.26,0.71l-0.23,1.8l-0.44,0.08l-0.24,0.25l-0.2,1.36l-1.8,-1.22l-0.23,-0.05l-1.14,0.23l-1.62,-1.43l-1.15,-1.31l-0.21,-0.1l-0.95,-0.04l-0.21,-0.68l1.66,-0.54Z", "name": "Belgium"}, "BF": {"path": "M413.48,260.21l-1.22,-0.46l-0.13,-0.02l-1.17,0.1l-0.15,0.06l-0.73,0.53l-0.87,-0.41l-0.39,-0.75l-0.13,-0.13l-0.98,-0.48l-0.14,-1.2l0.63,-0.99l0.05,-0.18l-0.05,-0.73l1.9,-2.01l0.08,-0.14l0.35,-1.65l0.49,-0.44l1.05,0.3l0.21,-0.02l1.05,-0.52l0.13,-0.13l0.3,-0.58l1.87,-1.1l0.11,-0.1l0.43,-0.72l2.23,-1.01l1.21,-0.32l0.51,0.4l0.19,0.06l1.25,-0.01l-0.14,0.89l0.01,0.13l0.34,1.16l0.06,0.11l1.35,1.59l0.07,1.13l0.24,0.28l2.64,0.53l-0.05,1.39l-0.42,0.59l-1.11,0.21l-0.22,0.17l-0.46,0.99l-0.69,0.23l-2.12,-0.05l-1.14,-0.2l-0.19,0.03l-0.72,0.36l-1.07,-0.17l-4.35,0.12l-0.29,0.29l-0.06,1.44l0.25,1.45Z", "name": "Burkina Faso"}, "BG": {"path": "M477.63,166.84l0.51,0.9l0.33,0.14l0.9,-0.21l1.91,0.47l3.68,0.16l0.17,-0.05l1.2,-0.75l2.78,-0.67l1.72,1.05l1.02,0.24l-0.97,0.97l-0.91,2.17l0.0,0.24l0.56,1.19l-1.58,-0.3l-0.16,0.01l-2.55,0.95l-0.2,0.28l-0.02,1.23l-1.92,0.24l-1.68,-0.99l-0.27,-0.02l-1.94,0.8l-1.52,-0.07l-0.15,-1.72l-0.12,-0.21l-0.99,-0.76l0.18,-0.18l0.02,-0.39l-0.17,-0.22l0.33,-0.75l0.91,-0.91l0.01,-0.42l-1.16,-1.25l-0.18,-0.89l0.24,-0.27Z", "name": "Bulgaria"}, "BA": {"path": "M468.39,164.66l0.16,0.04l0.43,-0.0l-0.43,0.93l0.06,0.34l1.08,1.06l-0.28,1.09l-0.5,0.13l-0.47,0.28l-0.86,0.74l-0.1,0.16l-0.28,1.29l-1.81,-0.94l-0.9,-1.22l-1.0,-0.73l-1.1,-1.1l-0.55,-0.96l-1.11,-1.3l0.3,-0.75l0.59,0.46l0.42,-0.04l0.46,-0.54l1.0,-0.06l2.11,0.5l1.72,-0.03l1.06,0.64Z", "name": "Bosnia and Herzegovina"}, "BN": {"path": "M707.34,273.57l0.76,-0.72l1.59,-1.03l-0.18,1.93l-0.9,-0.06l-0.28,0.14l-0.31,0.51l-0.68,-0.78Z", "name": "Brunei"}, "BO": {"path": "M263.83,340.79l-0.23,-0.12l-2.86,-0.11l-0.28,0.17l-0.77,1.67l-1.17,-1.51l-0.18,-0.11l-3.28,-0.64l-0.28,0.1l-2.02,2.3l-1.43,0.29l-0.91,-3.35l-1.31,-2.88l0.75,-2.41l-0.09,-0.32l-1.23,-1.03l-0.31,-1.76l-0.05,-0.12l-1.12,-1.6l1.49,-2.62l0.01,-0.28l-1.0,-2.0l0.48,-0.72l0.02,-0.29l-0.37,-0.78l0.87,-1.13l0.06,-0.18l0.05,-2.17l0.12,-1.71l0.5,-0.8l0.01,-0.3l-1.9,-3.58l1.3,0.15l1.34,-0.05l0.23,-0.12l0.51,-0.7l2.12,-0.99l1.31,-0.93l2.81,-0.37l-0.21,1.51l0.01,0.13l0.29,0.91l-0.19,1.64l0.11,0.27l2.72,2.27l0.15,0.07l2.71,0.41l0.92,0.88l0.12,0.07l1.64,0.49l1.0,0.71l0.18,0.06l1.5,-0.02l1.24,0.64l0.1,1.31l0.05,0.14l0.44,0.68l0.02,0.73l-0.44,0.03l-0.27,0.39l0.96,2.99l0.28,0.21l4.43,0.1l-0.28,1.12l0.0,0.15l0.27,1.02l0.15,0.19l1.27,0.67l0.52,1.42l-0.42,1.91l-0.66,1.1l-0.04,0.2l0.21,1.3l-0.19,0.13l-0.01,-0.27l-0.15,-0.24l-2.33,-1.33l-0.14,-0.04l-2.38,-0.03l-4.36,0.76l-0.21,0.16l-1.2,2.29l-0.03,0.13l-0.06,1.37l-0.79,2.53l-0.05,-0.08Z", "name": "Bolivia"}, "JP": {"path": "M781.17,166.78l1.8,0.67l0.28,-0.04l1.38,-1.01l0.43,2.67l-3.44,0.77l-0.18,0.12l-2.04,2.79l-3.71,-1.94l-0.42,0.15l-1.29,3.11l-2.32,0.04l-0.3,-2.63l1.12,-2.1l2.51,-0.16l0.28,-0.25l0.73,-4.22l0.58,-1.9l2.59,2.84l2.0,1.1ZM773.66,187.36l-0.92,2.24l-0.01,0.2l0.4,1.3l-1.18,1.81l-3.06,1.28l-4.35,0.17l-0.19,0.08l-3.4,3.06l-1.36,-0.87l-0.1,-1.95l-0.34,-0.28l-4.35,0.62l-2.99,1.33l-2.87,0.05l-0.28,0.2l0.09,0.33l2.37,1.93l-1.57,4.44l-1.35,0.97l-0.9,-0.79l0.57,-2.32l-0.15,-0.34l-1.5,-0.77l-0.81,-1.53l2.04,-0.75l0.14,-0.1l1.28,-1.72l2.47,-1.43l1.84,-1.92l4.83,-0.82l2.62,0.57l0.33,-0.16l2.45,-4.77l1.38,1.14l0.38,0.0l5.1,-4.02l0.09,-0.11l1.57,-3.57l0.02,-0.16l-0.42,-3.22l0.94,-1.67l2.27,-0.47l1.26,3.82l-0.07,2.23l-2.26,2.86l-0.06,0.19l0.04,2.93ZM757.85,196.18l0.22,0.66l-1.11,1.33l-0.8,-0.7l-0.33,-0.04l-1.28,0.65l-0.14,0.15l-0.54,1.34l-1.17,-0.57l0.02,-1.03l1.2,-1.45l1.24,0.28l0.29,-0.1l0.9,-1.03l1.51,0.5Z", "name": "Japan"}, "BI": {"path": "M494.7,295.83l-0.14,-2.71l-0.04,-0.13l-0.34,-0.62l0.93,0.12l0.3,-0.16l0.67,-1.25l0.9,0.11l0.11,0.76l0.08,0.16l0.46,0.48l0.02,0.56l-0.55,0.48l-0.96,1.29l-0.82,0.82l-0.61,0.07Z", "name": "Burundi"}, "BJ": {"path": "M427.4,268.94l-1.58,0.22l-0.52,-1.45l0.11,-5.73l-0.08,-0.21l-0.43,-0.44l-0.09,-1.13l-0.09,-0.19l-1.52,-1.52l0.24,-1.01l0.7,-0.23l0.18,-0.16l0.45,-0.97l1.07,-0.21l0.19,-0.12l0.53,-0.73l0.73,-0.65l0.68,-0.0l1.69,1.3l-0.08,0.67l0.02,0.14l0.52,1.38l-0.44,0.9l-0.01,0.24l0.2,0.52l-1.1,1.42l-0.76,0.76l-0.08,0.13l-0.47,1.59l0.05,1.69l-0.13,3.79Z", "name": "Benin"}, "BT": {"path": "M650.38,213.78l0.88,0.75l-0.13,1.24l-1.77,0.07l-2.1,-0.18l-1.57,0.4l-2.02,-0.91l-0.02,-0.24l1.54,-1.87l1.18,-0.6l1.67,0.59l1.32,0.08l1.01,0.67Z", "name": "Bhutan"}, "JM": {"path": "M226.67,238.37l1.64,0.23l1.2,0.56l0.11,0.19l-1.25,0.03l-0.14,0.04l-0.65,0.37l-1.24,-0.37l-1.17,-0.77l0.11,-0.22l0.86,-0.15l0.52,0.08Z", "name": "Jamaica"}, "BW": {"path": "M484.91,331.96l0.53,0.52l0.82,1.53l2.83,2.86l0.14,0.08l0.85,0.22l0.03,0.81l0.74,1.66l0.21,0.17l1.87,0.39l1.17,0.87l-3.13,1.71l-2.3,2.01l-0.07,0.1l-0.82,1.74l-0.66,0.88l-1.24,0.19l-0.24,0.2l-0.65,1.98l-1.4,0.55l-1.9,-0.12l-1.2,-0.74l-1.06,-0.32l-0.22,0.02l-1.22,0.62l-0.14,0.14l-0.58,1.21l-1.16,0.79l-1.18,1.13l-1.5,0.23l-0.4,-0.68l0.22,-1.53l-0.04,-0.19l-1.48,-2.54l-0.11,-0.11l-0.53,-0.31l-0.0,-7.25l2.18,-0.08l0.29,-0.3l0.07,-9.0l1.63,-0.08l3.69,-0.86l0.84,0.93l0.38,0.05l1.53,-0.97l0.79,-0.03l1.3,-0.53l0.23,0.1l0.92,1.96Z", "name": "Botswana"}, "BR": {"path": "M259.49,274.87l1.42,0.25l1.97,0.62l0.28,-0.05l0.67,-0.55l1.76,-0.38l2.8,-0.94l0.12,-0.08l0.92,-0.96l0.05,-0.33l-0.15,-0.32l0.73,-0.06l0.36,0.35l-0.27,0.93l0.17,0.36l0.76,0.34l0.44,0.9l-0.58,0.73l-0.06,0.13l-0.4,2.13l0.03,0.19l0.62,1.22l0.17,1.11l0.11,0.19l1.54,1.18l0.15,0.06l1.23,0.12l0.29,-0.15l0.2,-0.36l0.71,-0.11l1.13,-0.44l0.79,-0.63l1.25,0.19l0.65,-0.08l1.32,0.2l0.32,-0.18l0.23,-0.51l-0.05,-0.31l-0.31,-0.37l0.11,-0.31l0.75,0.17l0.13,0.0l1.1,-0.24l1.34,0.5l1.08,0.51l0.33,-0.05l0.67,-0.58l0.27,0.05l0.28,0.57l0.31,0.17l1.2,-0.18l0.17,-0.08l1.03,-1.05l0.76,-1.82l1.39,-2.16l0.49,-0.07l0.52,1.17l1.4,4.37l0.2,0.2l1.14,0.35l0.05,1.39l-1.8,1.97l0.01,0.42l0.78,0.75l0.18,0.08l4.16,0.37l0.08,2.25l0.5,0.22l1.78,-1.54l2.98,0.85l4.07,1.5l1.07,1.28l-0.37,1.23l0.36,0.38l2.83,-0.75l4.8,1.3l3.75,-0.09l3.6,2.02l3.27,2.84l1.93,0.72l2.13,0.11l0.76,0.66l1.22,4.56l-0.96,4.03l-1.22,1.58l-3.52,3.51l-1.63,2.91l-1.75,2.09l-0.5,0.04l-0.26,0.19l-0.72,1.99l0.18,4.76l-0.95,5.56l-0.74,0.96l-0.06,0.15l-0.43,3.39l-2.49,3.34l-0.06,0.13l-0.4,2.56l-1.9,1.07l-0.13,0.16l-0.51,1.38l-2.59,0.0l-3.94,1.01l-1.82,1.19l-2.85,0.81l-3.01,2.17l-2.12,2.65l-0.06,0.13l-0.36,2.0l0.01,0.13l0.4,1.42l-0.45,2.63l-0.53,1.23l-1.76,1.53l-2.76,4.79l-2.16,2.15l-1.69,1.29l-0.09,0.12l-1.12,2.6l-1.3,1.26l-0.45,-1.02l0.99,-1.18l0.01,-0.37l-1.5,-1.95l-1.98,-1.54l-2.58,-1.77l-0.2,-0.05l-0.81,0.07l-2.42,-2.05l-0.25,-0.07l-0.77,0.14l2.75,-3.07l2.8,-2.61l1.67,-1.09l2.11,-1.49l0.13,-0.24l0.05,-2.15l-0.07,-0.2l-1.26,-1.54l-0.35,-0.09l-0.64,0.27l0.3,-0.95l0.34,-1.57l0.01,-1.52l-0.16,-0.26l-0.9,-0.48l-0.27,-0.01l-0.86,0.39l-0.65,-0.08l-0.23,-0.8l-0.23,-2.39l-0.04,-0.12l-0.47,-0.79l-0.14,-0.12l-1.69,-0.71l-0.25,0.01l-0.93,0.47l-2.29,-0.44l0.15,-3.3l-0.03,-0.15l-0.62,-1.22l0.57,-0.39l0.13,-0.3l-0.22,-1.37l0.67,-1.13l0.44,-2.04l-0.01,-0.17l-0.59,-1.61l-0.14,-0.16l-1.25,-0.66l-0.22,-0.82l0.35,-1.41l-0.28,-0.37l-4.59,-0.1l-0.78,-2.41l0.34,-0.02l0.28,-0.31l-0.03,-1.1l-0.05,-0.16l-0.45,-0.68l-0.1,-1.4l-0.16,-0.24l-1.45,-0.76l-0.14,-0.03l-1.48,0.02l-1.04,-0.73l-1.62,-0.48l-0.93,-0.9l-0.16,-0.08l-2.72,-0.41l-2.53,-2.12l0.18,-1.54l-0.01,-0.13l-0.29,-0.91l0.26,-1.83l-0.34,-0.34l-3.28,0.43l-0.14,0.05l-1.3,0.93l-2.16,1.01l-0.12,0.09l-0.47,0.65l-1.12,0.05l-1.84,-0.21l-0.12,0.01l-1.33,0.41l-0.82,-0.21l0.16,-3.6l-0.48,-0.26l-1.97,1.43l-1.96,-0.06l-0.86,-1.23l-0.22,-0.13l-1.23,-0.11l0.34,-0.69l-0.05,-0.33l-1.36,-1.5l-0.92,-2.0l0.45,-0.32l0.13,-0.25l-0.0,-0.87l1.34,-0.64l0.17,-0.32l-0.23,-1.23l0.56,-0.77l0.05,-0.13l0.16,-1.03l2.7,-1.61l2.01,-0.47l0.16,-0.09l0.24,-0.27l2.11,0.11l0.31,-0.25l1.13,-6.87l0.06,-1.12l-0.4,-1.53l-0.1,-0.15l-1.0,-0.82l0.01,-1.45l1.08,-0.32l0.39,0.2l0.44,-0.24l0.08,-0.96l-0.25,-0.32l-1.22,-0.22l-0.02,-1.01l4.57,0.05l0.22,-0.09l0.6,-0.63l0.44,0.5l0.47,1.42l0.45,0.16l0.27,-0.18l1.21,1.16l0.23,0.08l1.95,-0.16l0.23,-0.14l0.43,-0.67l1.76,-0.55l1.05,-0.42l0.18,-0.2l0.25,-0.92l1.65,-0.66l0.18,-0.35l-0.14,-0.53l-0.26,-0.22l-1.91,-0.19l-0.29,-1.33l0.1,-1.64l-0.15,-0.28l-0.44,-0.25Z", "name": "Brazil"}, "BS": {"path": "M227.51,216.69l0.3,0.18l-0.24,1.07l0.03,-1.04l-0.09,-0.21ZM226.5,224.03l-0.13,0.03l-0.54,-1.3l-0.09,-0.12l-0.78,-0.64l0.4,-1.26l0.33,0.05l0.79,2.0l0.01,1.24ZM225.76,216.5l-2.16,0.34l-0.07,-0.41l0.85,-0.16l1.36,0.07l0.02,0.16Z", "name": "The Bahamas"}, "BY": {"path": "M480.08,135.28l2.09,0.02l0.13,-0.03l2.72,-1.3l0.16,-0.19l0.55,-1.83l1.94,-1.06l0.15,-0.31l-0.2,-1.33l1.33,-0.52l2.58,-1.3l2.39,0.8l0.3,0.75l0.37,0.17l1.22,-0.39l2.18,0.75l0.2,1.36l-0.48,0.85l0.01,0.32l1.57,2.26l0.92,0.6l-0.1,0.41l0.19,0.35l1.61,0.57l0.48,0.6l-0.64,0.49l-1.91,-0.11l-0.18,0.05l-0.48,0.32l-0.1,0.39l0.57,1.1l0.51,1.78l-1.79,0.17l-0.18,0.08l-0.77,0.73l-0.09,0.19l-0.13,1.31l-0.75,-0.22l-2.11,0.15l-0.56,-0.66l-0.39,-0.06l-0.8,0.49l-0.79,-0.4l-0.13,-0.03l-1.94,-0.07l-2.76,-0.79l-2.58,-0.27l-1.98,0.07l-0.15,0.05l-1.31,0.86l-0.8,0.09l-0.04,-1.16l-0.03,-0.12l-0.63,-1.28l1.22,-0.56l0.17,-0.27l0.01,-1.35l-0.04,-0.15l-0.66,-1.24l-0.08,-1.12Z", "name": "Belarus"}, "BZ": {"path": "M198.03,239.7l0.28,0.19l0.43,-0.1l0.82,-1.42l0.0,0.07l0.29,0.29l0.16,0.0l-0.02,0.35l-0.39,1.08l0.02,0.25l0.16,0.29l-0.23,0.8l0.04,0.24l0.09,0.14l-0.25,1.12l-0.38,0.53l-0.33,0.06l-0.21,0.15l-0.41,0.74l-0.25,0.0l0.17,-2.58l0.01,-2.2Z", "name": "Belize"}, "RU": {"path": "M688.57,38.85l0.63,2.39l0.44,0.19l2.22,-1.23l7.18,0.07l5.54,2.49l1.85,1.77l-0.55,2.34l-2.64,1.42l-6.57,2.76l-1.95,1.5l0.12,0.53l3.09,0.68l3.69,1.23l0.21,-0.01l1.98,-0.81l1.16,2.84l0.5,0.08l1.03,-1.18l3.86,-0.74l7.79,0.78l0.56,2.05l0.27,0.22l10.47,0.71l0.32,-0.29l0.13,-3.34l4.98,0.8l3.96,-0.02l3.88,2.43l1.06,2.79l-1.38,1.83l0.01,0.38l3.15,3.64l0.1,0.08l3.94,1.86l0.4,-0.14l2.28,-4.56l3.75,1.94l0.22,0.02l4.18,-1.22l4.76,1.4l0.26,-0.04l1.74,-1.23l3.98,0.63l0.32,-0.41l-1.71,-4.1l3.0,-1.86l22.39,3.04l2.06,2.67l0.1,0.08l6.55,3.51l0.17,0.03l10.08,-0.86l4.86,0.73l1.91,1.72l-0.29,3.13l0.18,0.31l3.08,1.26l0.19,0.01l3.32,-0.9l4.37,-0.11l4.78,0.87l4.61,-0.48l4.26,3.82l0.32,0.05l3.1,-1.4l0.12,-0.45l-1.91,-2.67l0.92,-1.64l7.78,1.22l5.22,-0.26l7.12,2.1l9.6,5.22l6.4,4.15l-0.2,2.44l0.14,0.28l1.69,1.04l0.45,-0.31l-0.51,-2.66l6.31,0.58l4.52,3.61l-2.1,1.52l-4.02,0.42l-0.27,0.29l-0.06,3.83l-0.81,0.67l-2.14,-0.11l-1.91,-1.39l-3.19,-1.13l-0.51,-1.63l-0.21,-0.2l-2.54,-0.67l-0.13,-0.0l-2.69,0.5l-1.12,-1.19l0.48,-1.36l-0.38,-0.39l-3.0,0.98l-0.17,0.44l1.02,1.76l-1.27,1.55l-3.09,1.71l-3.15,-0.29l-0.3,0.18l0.07,0.34l2.22,2.1l1.47,3.22l1.15,1.09l0.25,1.41l-0.48,0.76l-4.47,-0.81l-0.17,0.02l-6.97,2.9l-2.2,0.44l-0.11,0.05l-3.83,2.68l-3.63,2.32l-0.1,0.11l-0.76,1.4l-3.3,-2.4l-0.3,-0.03l-6.31,2.85l-0.99,-1.21l-0.4,-0.06l-2.32,1.54l-3.23,-0.49l-0.33,0.2l-0.79,2.39l-2.97,3.51l-0.07,0.21l0.09,1.47l0.22,0.27l2.62,0.74l-0.3,4.7l-2.06,0.12l-0.26,0.2l-1.07,2.94l0.04,0.27l0.83,1.19l-4.03,1.63l-0.18,0.21l-0.83,3.72l-3.55,0.79l-0.23,0.23l-0.73,3.32l-3.22,2.76l-0.76,-1.88l-1.07,-4.88l-1.39,-7.59l1.17,-4.76l2.05,-2.08l0.09,-0.19l0.11,-1.46l3.67,-0.77l0.15,-0.08l4.47,-4.61l4.29,-3.82l4.48,-3.01l0.11,-0.14l2.01,-5.43l-0.31,-0.4l-3.04,0.33l-0.24,0.17l-1.47,3.11l-5.98,3.94l-1.91,-4.36l-0.33,-0.17l-6.46,1.3l-0.15,0.08l-6.27,6.33l-0.01,0.41l1.7,1.87l-5.04,0.87l-3.51,0.34l0.16,-2.32l-0.26,-0.32l-3.89,-0.56l-0.19,0.04l-3.02,1.77l-7.63,-0.63l-8.24,1.1l-0.16,0.07l-8.11,7.09l-9.6,8.31l0.16,0.52l3.79,0.42l1.16,2.03l0.17,0.14l2.43,0.76l0.31,-0.08l1.5,-1.61l2.49,0.2l3.46,3.6l0.08,2.67l-1.91,3.26l-0.04,0.14l-0.21,3.91l-1.11,5.09l-3.73,4.55l-0.87,2.21l-6.73,7.14l-1.59,1.77l-3.23,1.72l-1.38,0.03l-1.48,-1.39l-0.37,-0.03l-3.36,2.22l-0.11,0.14l-0.16,0.42l-0.01,-1.09l1.0,-0.06l0.28,-0.27l0.36,-3.6l-0.61,-2.51l1.85,-0.94l2.94,0.53l0.32,-0.15l1.71,-3.1l0.84,-3.38l0.97,-1.18l1.32,-2.88l-0.34,-0.42l-4.14,0.95l-2.18,1.25l-3.51,-0.0l-0.95,-2.81l-0.1,-0.14l-2.97,-2.3l-0.11,-0.05l-4.19,-1.0l-0.89,-3.08l-0.87,-2.03l-0.95,-1.46l-1.54,-3.37l-0.12,-0.14l-2.27,-1.28l-3.83,-1.02l-3.37,0.1l-3.11,0.61l-0.13,0.06l-2.07,1.69l0.04,0.49l1.23,0.72l0.03,1.53l-1.34,1.05l-2.26,3.51l-0.05,0.17l0.02,1.27l-3.25,1.9l-2.87,-1.17l-0.14,-0.02l-2.86,0.26l-1.22,-1.02l-0.12,-0.06l-1.5,-0.35l-0.23,0.04l-3.62,2.27l-3.24,0.53l-2.28,0.79l-3.08,-0.51l-2.24,0.03l-1.49,-1.61l-2.45,-1.57l-0.11,-0.04l-2.6,-0.43l-3.17,0.43l-2.31,0.59l-3.31,-1.28l-0.45,-2.31l-0.21,-0.23l-2.94,-0.85l-2.26,-0.39l-2.77,-1.36l-0.37,0.09l-2.59,3.45l-0.03,0.32l0.91,1.74l-2.15,2.01l-3.47,-0.79l-2.44,-0.12l-1.59,-1.46l-0.2,-0.08l-2.55,-0.05l-2.12,-0.98l-0.24,-0.01l-3.85,1.57l-4.74,2.79l-2.59,0.55l-0.79,0.21l-1.21,-1.81l-0.29,-0.13l-3.05,0.41l-0.96,-1.25l-0.14,-0.1l-1.65,-0.6l-1.15,-1.82l-0.13,-0.12l-1.38,-0.6l-0.19,-0.02l-3.49,0.82l-3.35,-1.85l-0.38,0.08l-1.08,1.4l-5.36,-8.17l-3.02,-2.52l0.72,-0.85l0.01,-0.38l-0.37,-0.08l-6.22,3.21l-1.98,0.16l0.17,-1.51l-0.2,-0.31l-3.22,-1.17l-0.19,-0.0l-2.3,0.74l-0.72,-3.27l-0.24,-0.23l-4.5,-0.75l-0.21,0.04l-2.2,1.42l-6.21,1.27l-0.11,0.05l-1.16,0.81l-9.3,1.19l-0.18,0.09l-1.15,1.17l-0.02,0.39l1.56,2.01l-2.02,0.74l-0.16,0.42l0.35,0.68l-2.18,1.49l0.02,0.51l3.83,2.16l-0.45,1.13l-3.31,-0.13l-0.25,0.12l-0.57,0.77l-2.97,-1.59l-0.15,-0.04l-3.97,0.07l-0.13,0.03l-2.53,1.32l-2.84,-1.28l-5.52,-2.3l-0.12,-0.02l-3.91,0.09l-0.16,0.05l-5.17,3.6l-0.13,0.21l-0.25,1.89l-2.17,-1.6l-0.44,0.1l-2.0,3.59l0.06,0.37l0.55,0.5l-1.32,2.23l0.04,0.36l2.13,2.17l0.23,0.09l1.7,-0.08l1.42,1.89l-0.23,1.5l0.19,0.32l0.94,0.38l-0.89,1.44l-2.3,0.49l-0.17,0.11l-2.49,3.2l0.0,0.37l2.2,2.81l-0.23,1.93l0.06,0.22l2.56,3.32l-1.27,1.02l-0.4,0.66l-0.8,-0.15l-1.65,-1.75l-0.18,-0.09l-0.66,-0.09l-1.45,-0.64l-0.72,-1.16l-0.18,-0.13l-2.34,-0.63l-0.17,0.0l-1.32,0.41l-0.31,-0.4l-0.12,-0.09l-3.49,-1.48l-3.67,-0.49l-2.1,-0.52l-0.3,0.1l-0.12,0.14l-2.96,-2.4l-2.89,-1.19l-1.69,-1.42l1.27,-0.35l0.16,-0.1l2.08,-2.61l-0.04,-0.41l-1.02,-0.9l3.21,-1.12l0.2,-0.31l-0.07,-0.69l-0.37,-0.26l-1.86,0.42l0.05,-0.86l1.11,-0.76l2.35,-0.23l0.25,-0.19l0.39,-1.07l0.0,-0.19l-0.51,-1.64l0.95,-1.58l0.04,-0.16l-0.03,-0.95l-0.22,-0.28l-3.69,-1.06l-1.43,0.02l-1.45,-1.44l-0.29,-0.08l-1.83,0.49l-2.88,-1.04l0.04,-0.42l-0.04,-0.18l-0.89,-1.43l-0.23,-0.14l-1.77,-0.14l-0.13,-0.66l0.52,-0.56l0.01,-0.4l-1.6,-1.9l-0.27,-0.1l-2.55,0.32l-0.71,-0.16l-0.3,0.1l-0.53,0.63l-0.58,-0.08l-0.56,-1.97l-0.48,-0.94l0.17,-0.11l1.92,0.11l0.2,-0.06l0.97,-0.74l0.05,-0.42l-0.72,-0.91l-0.13,-0.1l-1.43,-0.51l0.09,-0.36l-0.13,-0.33l-0.97,-0.59l-1.43,-2.06l0.44,-0.77l0.04,-0.19l-0.25,-1.64l-0.2,-0.24l-2.45,-0.84l-0.19,-0.0l-1.05,0.34l-0.25,-0.62l-0.18,-0.17l-2.5,-0.84l-0.74,-1.93l-0.21,-1.7l-0.13,-0.21l-0.92,-0.63l0.83,-0.89l0.07,-0.27l-0.71,-3.26l1.69,-2.01l0.03,-0.34l-0.24,-0.41l2.63,-1.9l-0.01,-0.49l-2.31,-1.57l5.08,-4.61l2.33,-2.24l1.01,-2.08l-0.09,-0.37l-3.52,-2.56l0.94,-2.38l-0.04,-0.29l-2.14,-2.86l1.61,-3.35l-0.01,-0.29l-2.81,-4.58l2.19,-3.04l-0.06,-0.42l-3.7,-2.76l0.32,-2.67l1.87,-0.38l4.26,-1.77l2.46,-1.47l3.96,2.58l0.12,0.05l6.81,1.04l9.37,4.87l1.81,1.92l0.15,2.55l-2.61,2.06l-3.95,1.07l-11.1,-3.15l-0.17,0.0l-1.84,0.53l-0.1,0.53l3.97,2.97l0.15,1.77l0.16,4.14l0.19,0.27l3.21,1.22l1.94,1.03l0.44,-0.22l0.32,-1.94l-0.07,-0.25l-1.32,-1.52l1.25,-1.2l5.87,2.45l0.24,-0.01l2.11,-0.98l0.13,-0.42l-1.55,-2.75l5.52,-3.84l2.13,0.22l2.28,1.42l0.43,-0.12l1.46,-2.87l-0.04,-0.33l-1.97,-2.37l1.14,-2.38l-0.02,-0.3l-1.42,-2.07l6.15,1.22l1.14,1.92l-2.74,0.46l-0.25,0.3l0.02,2.36l0.12,0.24l1.97,1.44l0.25,0.05l3.87,-0.91l0.22,-0.23l0.58,-2.55l5.09,-1.98l8.67,-3.69l1.22,0.14l-2.06,2.2l0.18,0.5l3.11,0.45l0.23,-0.07l1.71,-1.41l4.59,-0.12l0.12,-0.03l3.53,-1.72l2.7,2.48l0.42,-0.01l2.85,-2.88l-0.0,-0.43l-2.42,-2.35l1.0,-1.13l7.2,1.31l3.42,1.36l9.06,4.97l0.39,-0.08l1.67,-2.27l-0.04,-0.4l-2.46,-2.23l-0.06,-0.82l-0.26,-0.27l-2.64,-0.38l0.69,-1.76l0.0,-0.22l-1.32,-3.47l-0.07,-1.27l4.52,-4.09l0.08,-0.11l1.6,-4.18l1.67,-0.84l6.33,1.2l0.46,2.31l-2.31,3.67l0.05,0.38l1.49,1.41l0.77,3.04l-0.56,6.05l0.09,0.24l2.62,2.54l-0.99,2.65l-4.87,5.96l0.17,0.48l2.86,0.61l0.31,-0.13l0.94,-1.42l2.67,-1.04l0.18,-0.19l0.64,-2.01l2.11,-1.98l0.05,-0.37l-1.38,-2.32l1.11,-2.74l-0.24,-0.41l-2.53,-0.33l-0.53,-2.16l1.96,-4.42l-0.05,-0.32l-3.03,-3.48l4.21,-2.94l0.12,-0.3l-0.52,-3.04l0.72,-0.06l1.18,2.35l-0.97,4.39l0.2,0.35l2.68,0.84l0.37,-0.38l-1.05,-3.07l3.89,-1.71l5.05,-0.24l4.55,2.62l0.36,-0.05l0.05,-0.36l-2.19,-3.84l-0.23,-4.78l4.07,-0.92l5.98,0.21l5.47,-0.64l0.2,-0.48l-1.88,-2.37l2.65,-2.99l2.75,-0.13l0.12,-0.03l4.82,-2.48l6.56,-0.67l0.23,-0.14l0.76,-1.27l6.33,-0.46l1.97,1.11l0.28,0.01l5.55,-2.71l4.53,0.08l0.29,-0.21l0.67,-2.18l2.29,-2.15l5.75,-2.13l3.48,1.4l-2.7,1.03l-0.19,0.31l0.26,0.26l5.47,0.78ZM871.83,65.73l0.25,-0.15l1.99,0.01l3.3,1.2l-0.08,0.22l-2.41,1.03l-5.73,0.49l-0.31,-1.0l2.99,-1.8ZM797.64,48.44l-2.22,1.51l-3.85,-0.43l-4.35,-1.85l0.42,-1.13l4.42,0.72l5.59,1.17ZM783.82,46.06l-1.71,3.25l-9.05,-0.14l-4.11,1.15l-4.64,-3.04l1.21,-3.13l3.11,-0.91l6.53,0.22l8.66,2.59ZM780.37,145.71l2.28,5.23l-3.09,-0.89l-0.37,0.19l-1.54,4.65l0.04,0.27l2.38,3.17l-0.05,1.4l-1.41,-1.41l-0.46,0.04l-1.23,1.81l-0.33,-1.86l0.28,-3.1l-0.28,-3.41l0.58,-2.46l0.11,-4.39l-0.03,-0.13l-1.44,-3.2l0.21,-4.39l2.19,-1.49l0.09,-0.41l-0.81,-1.3l0.48,-0.21l0.56,1.94l0.86,3.23l-0.05,3.36l1.03,3.35ZM780.16,57.18l-3.4,0.03l-5.06,-0.53l1.97,-1.59l2.95,-0.42l3.35,1.75l0.18,0.77ZM683.84,31.18l-13.29,1.97l4.16,-6.56l1.88,-0.58l1.77,0.34l6.08,3.02l-0.6,1.8ZM670.94,28.02l-5.18,0.65l-6.89,-1.58l-4.03,-2.07l-1.88,-3.98l-0.18,-0.16l-2.8,-0.93l5.91,-3.62l5.25,-1.29l4.73,2.88l5.63,5.44l-0.57,4.66ZM564.37,68.98l-0.85,0.23l-7.93,-0.57l-0.6,-1.84l-0.21,-0.2l-4.34,-1.18l-0.3,-2.08l2.34,-0.92l0.19,-0.29l-0.08,-2.43l4.85,-4.0l-0.12,-0.52l-1.68,-0.43l5.47,-3.94l0.11,-0.33l-0.6,-2.02l5.36,-2.55l8.22,-3.27l8.29,-0.96l4.34,-1.94l4.67,-0.65l1.45,1.72l-1.43,1.37l-8.8,2.52l-7.65,2.42l-7.92,4.84l-3.73,4.75l-3.92,4.58l-0.07,0.23l0.51,3.88l0.11,0.2l4.32,3.39ZM548.86,18.57l-3.28,0.75l-2.25,0.44l-0.22,0.19l-0.3,0.81l-2.67,0.86l-2.27,-1.14l1.2,-1.51l-0.23,-0.49l-3.14,-0.1l2.48,-0.54l3.55,-0.07l0.44,1.36l0.49,0.12l1.4,-1.35l2.2,-0.9l3.13,1.08l-0.54,0.49ZM477.5,133.25l-4.21,0.05l-2.69,-0.34l0.39,-1.03l3.24,-1.06l2.51,0.58l0.85,0.43l-0.2,0.71l-0.0,0.15l0.12,0.52Z", "name": "Russia"}, "RW": {"path": "M497.03,288.12l0.78,1.11l-0.12,1.19l-0.49,0.21l-1.25,-0.15l-0.3,0.16l-0.67,1.24l-1.01,-0.13l0.16,-0.92l0.22,-0.12l0.15,-0.24l0.09,-1.37l0.49,-0.48l0.42,0.18l0.25,-0.01l1.26,-0.65Z", "name": "Rwanda"}, "RS": {"path": "M469.75,168.65l0.21,-0.21l0.36,-1.44l-0.08,-0.29l-1.06,-1.03l0.54,-1.16l-0.28,-0.43l-0.26,0.0l0.55,-0.67l-0.01,-0.39l-0.77,-0.86l-0.45,-0.89l1.56,-0.67l1.39,0.12l1.22,1.1l0.26,0.91l0.16,0.19l1.38,0.66l0.17,1.12l0.14,0.21l1.46,0.9l0.35,-0.03l0.62,-0.54l0.09,0.06l-0.28,0.25l-0.03,0.42l0.29,0.34l-0.44,0.5l-0.07,0.26l0.22,1.12l0.07,0.14l1.02,1.1l-0.81,0.84l-0.42,0.96l0.04,0.3l0.12,0.15l-0.15,0.16l-1.04,0.04l-0.39,0.08l0.33,-0.81l-0.29,-0.41l-0.21,0.01l-0.39,-0.45l-0.13,-0.09l-0.32,-0.11l-0.27,-0.4l-0.14,-0.11l-0.4,-0.16l-0.31,-0.37l-0.34,-0.09l-0.45,0.17l-0.18,0.18l-0.29,0.84l-0.96,-0.65l-0.81,-0.33l-0.32,-0.37l-0.22,-0.18Z", "name": "Republic of Serbia"}, "LT": {"path": "M478.13,133.31l-0.14,-0.63l0.25,-0.88l-0.15,-0.35l-1.17,-0.58l-2.43,-0.57l-0.45,-2.51l2.58,-0.97l4.14,0.22l2.3,-0.32l0.26,0.54l0.22,0.17l1.26,0.22l2.25,1.6l0.19,1.23l-1.87,1.01l-0.14,0.18l-0.54,1.83l-2.54,1.21l-2.18,-0.02l-0.52,-0.91l-0.18,-0.14l-1.11,-0.32Z", "name": "Lithuania"}, "LU": {"path": "M435.95,147.99l0.33,0.49l-0.11,1.07l-0.39,0.04l-0.29,-0.15l0.21,-1.4l0.25,-0.05Z", "name": "Luxembourg"}, "LR": {"path": "M401.37,273.67l-0.32,0.01l-2.48,-1.15l-2.24,-1.89l-2.14,-1.38l-1.47,-1.42l0.44,-0.59l0.05,-0.13l0.12,-0.65l1.07,-1.3l1.08,-1.09l0.52,-0.07l0.43,-0.18l0.84,1.24l-0.15,0.89l0.07,0.25l0.49,0.54l0.22,0.1l0.71,0.01l0.27,-0.16l0.42,-0.83l0.19,0.02l-0.06,0.52l0.23,1.12l-0.5,1.03l0.06,0.35l0.73,0.69l0.14,0.08l0.71,0.15l0.92,0.91l0.06,0.76l-0.17,0.22l-0.06,0.15l-0.17,1.8Z", "name": "Liberia"}, "RO": {"path": "M477.94,155.19l1.02,-0.64l1.49,0.33l1.52,0.01l1.09,0.73l0.32,0.01l0.81,-0.46l1.8,-0.3l0.18,-0.1l0.54,-0.64l0.86,0.0l0.64,0.26l0.71,0.87l0.8,1.35l1.39,1.81l0.07,1.25l-0.26,1.3l0.01,0.15l0.45,1.42l0.15,0.18l1.12,0.57l0.25,0.01l1.05,-0.45l0.86,0.4l0.03,0.43l-0.92,0.51l-0.63,-0.24l-0.4,0.22l-0.64,3.41l-1.12,-0.24l-1.78,-1.09l-0.23,-0.04l-2.95,0.71l-1.25,0.77l-3.55,-0.16l-1.89,-0.47l-0.14,-0.0l-0.75,0.17l-0.61,-1.07l-0.3,-0.36l0.36,-0.32l-0.04,-0.48l-0.62,-0.38l-0.36,0.03l-0.62,0.54l-1.15,-0.71l-0.18,-1.14l-0.17,-0.22l-1.4,-0.67l-0.24,-0.86l-0.09,-0.14l-0.96,-0.87l1.49,-0.44l0.16,-0.11l1.51,-2.14l1.15,-2.09l1.44,-0.63Z", "name": "Romania"}, "GW": {"path": "M383.03,256.73l-1.12,-0.88l-0.14,-0.06l-0.94,-0.15l-0.43,-0.54l0.01,-0.27l-0.13,-0.26l-0.68,-0.48l-0.05,-0.16l0.99,-0.31l0.77,0.08l0.15,-0.02l0.61,-0.26l4.25,0.1l-0.02,0.44l-0.19,0.18l-0.08,0.29l0.17,0.66l-0.17,0.14l-0.44,0.0l-0.16,0.05l-0.57,0.37l-0.66,-0.04l-0.24,0.1l-0.92,1.03Z", "name": "Guinea Bissau"}, "GT": {"path": "M195.13,249.89l-1.05,-0.35l-1.5,-0.04l-1.06,-0.47l-1.19,-0.93l0.04,-0.53l0.27,-0.55l-0.03,-0.31l-0.24,-0.32l1.02,-1.77l3.04,-0.01l0.3,-0.28l0.06,-0.88l-0.19,-0.3l-0.3,-0.11l-0.23,-0.45l-0.11,-0.12l-0.9,-0.58l-0.35,-0.33l0.37,-0.0l0.3,-0.3l0.0,-1.15l4.05,0.02l-0.02,1.74l-0.2,2.89l0.3,0.32l0.67,-0.0l0.75,0.42l0.4,-0.11l-0.62,0.53l-1.17,0.7l-0.13,0.16l-0.18,0.49l0.0,0.21l0.14,0.34l-0.35,0.44l-0.49,0.13l-0.2,0.41l0.03,0.06l-0.27,0.16l-0.86,0.64l-0.12,0.22ZM199.35,245.38l0.07,-0.13l0.05,0.02l-0.13,0.11Z", "name": "Guatemala"}, "GR": {"path": "M487.2,174.55l-0.64,1.54l-0.43,0.24l-1.41,-0.08l-1.28,-0.28l-0.14,0.0l-3.03,0.77l-0.13,0.51l1.39,1.34l-0.78,0.29l-1.2,0.0l-1.23,-1.42l-0.47,0.02l-0.47,0.65l-0.04,0.27l0.56,1.76l0.06,0.11l1.02,1.12l-0.66,0.45l-0.04,0.46l1.39,1.35l1.15,0.79l0.02,1.06l-1.91,-0.63l-0.36,0.42l0.56,1.12l-1.2,0.23l-0.22,0.4l0.8,2.14l-1.15,0.02l-1.89,-1.15l-0.89,-2.19l-0.43,-1.91l-0.05,-0.11l-0.98,-1.35l-1.24,-1.62l-0.13,-0.63l1.07,-1.32l0.06,-0.14l0.13,-0.81l0.68,-0.36l0.16,-0.25l0.03,-0.54l1.4,-0.23l0.12,-0.05l0.87,-0.6l1.26,0.05l0.25,-0.11l0.34,-0.43l0.33,-0.07l1.81,0.08l0.13,-0.02l1.87,-0.77l1.64,0.97l0.19,0.04l2.28,-0.28l0.26,-0.29l0.02,-0.95l0.56,0.36ZM480.44,192.0l1.05,0.74l0.01,0.0l-1.26,-0.23l0.2,-0.51ZM481.76,192.79l1.86,-0.15l1.53,0.17l-0.02,0.19l0.34,0.3l-2.28,0.15l0.01,-0.13l-0.25,-0.31l-1.19,-0.22ZM485.65,193.28l0.65,-0.16l-0.05,0.12l-0.6,0.04Z", "name": "Greece"}, "GQ": {"path": "M444.81,282.04l-0.21,-0.17l0.74,-2.4l3.56,0.05l0.02,2.42l-3.34,-0.02l-0.76,0.13Z", "name": "Equatorial Guinea"}, "GY": {"path": "M271.34,264.25l1.43,0.81l1.44,1.53l0.06,1.19l0.28,0.28l0.84,0.05l2.13,1.92l-0.34,1.93l-1.37,0.59l-0.17,0.34l0.12,0.51l-0.43,1.21l0.03,0.26l1.11,1.82l0.26,0.14l0.56,0.0l0.32,1.29l1.25,1.78l-0.08,0.01l-1.34,-0.21l-0.24,0.06l-0.78,0.64l-1.06,0.41l-0.76,0.1l-0.22,0.15l-0.18,0.32l-0.95,-0.1l-1.38,-1.05l-0.19,-1.13l-0.6,-1.18l0.37,-1.96l0.65,-0.83l0.03,-0.32l-0.57,-1.17l-0.15,-0.14l-0.62,-0.27l0.25,-0.85l-0.08,-0.3l-0.58,-0.58l-0.24,-0.09l-1.15,0.1l-1.41,-1.58l0.48,-0.49l0.09,-0.22l-0.04,-0.92l1.31,-0.34l0.73,-0.52l0.04,-0.44l-0.75,-0.82l0.16,-0.66l1.74,-1.3Z", "name": "Guyana"}, "GE": {"path": "M525.41,174.19l0.26,-0.88l-0.0,-0.17l-0.63,-2.06l-0.1,-0.15l-1.45,-1.12l-0.11,-0.05l-1.31,-0.33l-0.66,-0.69l1.97,0.48l3.65,0.49l3.3,1.41l0.39,0.5l0.33,0.1l1.43,-0.45l2.14,0.58l0.7,1.14l0.13,0.12l1.06,0.47l-0.18,0.11l-0.08,0.43l1.08,1.41l-0.06,0.06l-1.16,-0.15l-1.82,-0.84l-0.31,0.04l-0.55,0.44l-3.29,0.44l-2.32,-1.41l-0.17,-0.04l-2.25,0.12Z", "name": "Georgia"}, "GB": {"path": "M412.82,118.6l-2.31,3.4l-0.0,0.33l0.31,0.13l2.52,-0.49l2.34,0.02l-0.56,2.51l-2.22,3.13l0.22,0.47l2.43,0.21l2.35,4.35l0.17,0.14l1.58,0.51l1.49,3.78l0.73,1.37l0.2,0.15l2.76,0.59l-0.25,1.75l-1.18,0.91l-0.08,0.39l0.87,1.49l-1.96,1.51l-3.31,-0.02l-4.15,0.88l-1.07,-0.59l-0.35,0.04l-1.55,1.44l-2.17,-0.35l-0.22,0.05l-1.61,1.15l-0.78,-0.38l3.31,-3.12l2.18,-0.7l0.21,-0.31l-0.26,-0.27l-3.78,-0.54l-0.48,-0.9l2.3,-0.92l0.13,-0.46l-1.29,-1.71l0.39,-1.83l3.46,0.29l0.32,-0.24l0.37,-1.99l-0.06,-0.24l-1.71,-2.17l-0.18,-0.11l-2.91,-0.58l-0.43,-0.68l0.82,-1.4l-0.03,-0.35l-0.82,-0.97l-0.46,0.01l-0.85,1.05l-0.11,-2.6l-0.05,-0.16l-1.19,-1.7l0.86,-3.53l1.81,-2.75l1.88,0.26l2.38,-0.24ZM406.39,132.84l-1.09,1.92l-1.65,-0.62l-1.26,0.02l0.41,-1.46l0.0,-0.16l-0.42,-1.51l1.62,-0.11l2.39,1.92Z", "name": "United Kingdom"}, "GA": {"path": "M448.76,294.47l-2.38,-2.34l-1.63,-2.04l-1.46,-2.48l0.06,-0.66l0.54,-0.81l0.61,-1.82l0.46,-1.69l0.63,-0.11l3.62,0.03l0.3,-0.3l-0.02,-2.75l0.88,-0.12l1.47,0.32l0.13,0.0l1.39,-0.3l-0.13,0.87l0.03,0.19l0.7,1.29l0.3,0.16l1.74,-0.19l0.36,0.29l-1.01,2.7l0.05,0.29l1.13,1.42l0.25,1.82l-0.3,1.56l-0.64,0.99l-1.93,-0.09l-1.26,-1.13l-0.5,0.17l-0.16,0.91l-1.48,0.27l-0.12,0.05l-0.86,0.63l-0.08,0.39l0.81,1.42l-1.48,1.08Z", "name": "Gabon"}, "GN": {"path": "M399.83,265.31l-0.69,-0.06l-0.3,0.16l-0.43,0.85l-0.39,-0.01l-0.3,-0.33l0.14,-0.87l-0.05,-0.22l-1.05,-1.54l-0.37,-0.11l-0.61,0.27l-0.84,0.12l0.02,-0.54l-0.04,-0.17l-0.35,-0.57l0.07,-0.63l-0.03,-0.17l-0.57,-1.11l-0.7,-0.9l-0.24,-0.12l-2.0,-0.0l-0.19,0.07l-0.51,0.42l-0.6,0.05l-0.21,0.11l-0.43,0.55l-0.3,0.7l-1.04,0.86l-0.91,-1.24l-1.0,-1.02l-0.69,-0.37l-0.52,-0.42l-0.3,-1.11l-0.37,-0.56l-0.1,-0.1l-0.4,-0.23l0.77,-0.85l0.62,0.04l0.18,-0.05l0.58,-0.38l0.46,-0.0l0.19,-0.07l0.39,-0.34l0.1,-0.3l-0.17,-0.67l0.15,-0.14l0.09,-0.2l0.03,-0.57l0.87,0.02l1.76,0.6l0.13,0.01l0.55,-0.06l0.22,-0.13l0.08,-0.12l1.18,0.17l0.17,-0.02l0.09,0.56l0.3,0.25l0.4,-0.0l0.14,-0.03l0.56,-0.29l0.23,0.05l0.63,0.59l0.15,0.07l1.07,0.2l0.24,-0.06l0.65,-0.52l0.77,-0.32l0.55,-0.32l0.3,0.04l0.44,0.45l0.34,0.74l0.84,0.87l-0.35,0.45l-0.06,0.15l-0.1,0.82l0.42,0.31l0.35,-0.16l0.05,0.04l-0.1,0.59l0.09,0.27l0.42,0.4l-0.06,0.02l-0.18,0.21l-0.2,0.86l0.03,0.21l0.56,1.02l0.52,1.71l-0.65,0.21l-0.15,0.12l-0.24,0.35l-0.03,0.28l0.16,0.41l-0.1,0.76l-0.12,0.0Z", "name": "Guinea"}, "GM": {"path": "M379.18,251.48l0.15,-0.55l2.51,-0.07l0.21,-0.09l0.48,-0.52l0.58,-0.03l0.91,0.58l0.16,0.05l0.78,0.01l0.14,-0.03l0.59,-0.31l0.16,0.24l-0.71,0.38l-0.94,-0.04l-1.02,-0.51l-0.3,0.01l-0.86,0.55l-0.37,0.02l-0.14,0.04l-0.53,0.31l-1.81,-0.04Z", "name": "Gambia"}, "GL": {"path": "M304.13,6.6l8.19,-3.63l8.72,0.28l0.19,-0.06l3.12,-2.28l8.75,-0.61l19.94,0.8l14.93,4.75l-3.92,2.01l-9.52,0.27l-13.48,0.6l-0.27,0.2l0.09,0.33l1.26,1.09l0.22,0.07l8.81,-0.67l7.49,2.07l0.19,-0.01l4.68,-1.78l1.76,1.84l-2.59,3.26l-0.01,0.36l0.34,0.11l6.35,-2.2l12.09,-2.32l7.31,1.14l1.17,2.13l-9.9,4.05l-1.43,1.32l-7.91,0.98l-0.26,0.31l0.29,0.29l5.25,0.25l-2.63,3.72l-2.02,3.61l-0.04,0.15l0.08,6.05l0.07,0.19l2.61,3.0l-3.4,0.2l-4.12,1.66l-0.04,0.54l4.5,2.67l0.53,3.9l-2.39,0.42l-0.19,0.48l2.91,3.83l-5.0,0.32l-0.27,0.22l0.12,0.33l2.69,1.84l-0.65,1.35l-3.36,0.71l-3.46,0.01l-0.21,0.51l3.05,3.15l0.02,1.53l-4.54,-1.79l-0.32,0.06l-1.29,1.26l0.11,0.5l3.33,1.15l3.17,2.74l0.85,3.29l-4.0,0.78l-1.83,-1.66l-3.1,-2.64l-0.36,-0.02l-0.13,0.33l0.8,2.92l-2.76,2.26l-0.09,0.33l0.28,0.2l6.59,0.19l2.47,0.18l-5.86,3.38l-6.76,3.43l-7.26,1.48l-2.73,0.02l-0.16,0.05l-2.67,1.72l-3.44,4.42l-5.28,2.86l-1.73,0.18l-3.33,1.01l-3.59,0.96l-0.15,0.1l-2.15,2.52l-0.07,0.19l-0.03,2.76l-1.21,2.49l-4.03,3.1l-0.1,0.33l0.98,2.94l-2.31,6.57l-3.21,0.21l-3.6,-3.0l-0.19,-0.07l-4.9,-0.02l-2.29,-1.97l-1.69,-3.78l-4.31,-4.86l-1.23,-2.52l-0.34,-3.58l-0.08,-0.17l-3.35,-3.67l0.85,-2.92l-0.09,-0.31l-1.5,-1.34l2.33,-4.7l3.67,-1.57l0.15,-0.13l1.02,-1.93l0.52,-3.47l-0.44,-0.31l-2.85,1.57l-1.33,0.64l-2.12,0.59l-2.81,-1.32l-0.15,-2.79l0.88,-2.17l2.09,-0.06l5.07,1.2l0.34,-0.17l-0.11,-0.37l-4.3,-2.9l-2.24,-1.58l-0.25,-0.05l-2.38,0.62l-1.7,-0.93l2.62,-4.1l-0.03,-0.36l-1.51,-1.75l-1.97,-3.3l-3.01,-5.21l-0.1,-0.11l-3.04,-1.85l0.03,-1.94l-0.18,-0.28l-6.82,-3.01l-5.35,-0.38l-6.69,0.21l-6.03,0.37l-2.81,-1.59l-3.84,-2.9l5.94,-1.5l5.01,-0.28l0.28,-0.29l-0.26,-0.31l-10.68,-1.38l-5.38,-2.1l0.27,-1.68l9.3,-2.6l9.18,-2.68l0.19,-0.16l0.97,-2.05l-0.18,-0.42l-6.29,-1.91l1.81,-1.9l8.58,-4.05l3.6,-0.63l0.23,-0.4l-0.92,-2.37l5.59,-1.5l7.66,-0.95l7.58,-0.05l2.65,1.84l0.31,0.02l6.52,-3.29l5.85,2.24l3.55,0.49l5.17,1.95l0.38,-0.16l-0.13,-0.39l-5.77,-3.16l0.29,-2.26Z", "name": "Greenland"}, "KW": {"path": "M540.87,207.81l0.41,0.94l-0.18,0.51l0.0,0.21l0.65,1.66l-1.15,0.05l-0.54,-1.12l-0.24,-0.17l-1.73,-0.2l1.44,-2.06l1.33,0.18Z", "name": "Kuwait"}, "GH": {"path": "M423.16,269.88l-3.58,1.34l-1.41,0.87l-2.13,0.69l-1.91,-0.61l0.09,-0.75l-0.03,-0.17l-1.04,-2.07l0.62,-2.7l1.04,-2.08l0.03,-0.19l-1.0,-5.46l0.05,-1.12l4.04,-0.11l1.08,0.18l0.18,-0.03l0.72,-0.36l0.75,0.13l-0.11,0.48l0.06,0.26l0.98,1.22l-0.0,1.77l0.24,1.99l0.05,0.13l0.55,0.81l-0.52,2.14l0.19,1.37l0.69,1.66l0.38,0.62Z", "name": "Ghana"}, "OM": {"path": "M568.16,231.0l-0.08,0.1l-0.84,1.61l-0.93,-0.11l-0.27,0.11l-0.58,0.73l-0.4,1.32l-0.01,0.14l0.29,1.61l-0.07,0.09l-1.0,-0.01l-0.16,0.04l-1.56,0.97l-0.14,0.2l-0.23,1.17l-0.41,0.4l-1.44,-0.02l-0.17,0.05l-0.98,0.65l-0.13,0.25l0.01,0.87l-0.97,0.57l-1.27,-0.22l-0.19,0.03l-1.63,0.84l-0.88,0.11l-2.55,-5.57l7.2,-2.49l0.19,-0.19l1.67,-5.23l-0.03,-0.25l-1.1,-1.78l0.05,-0.89l0.68,-1.03l0.05,-0.16l0.01,-0.89l0.96,-0.44l0.07,-0.5l-0.32,-0.26l0.16,-1.31l0.85,-0.01l1.03,1.67l0.09,0.09l1.4,0.96l0.11,0.05l1.82,0.34l1.37,0.45l1.75,2.32l0.13,0.1l0.7,0.26l-0.0,0.3l-1.25,2.19l-1.01,0.8ZM561.88,218.47l-0.01,0.02l-0.15,-0.29l0.3,-0.38l-0.14,0.65Z", "name": "Oman"}, "_3": {"path": "M543.2,261.06l-1.07,1.46l-1.65,1.99l-1.91,0.01l-8.08,-2.95l-0.89,-0.84l-0.9,-1.19l-0.81,-1.23l0.44,-0.73l0.76,-1.12l0.49,0.28l0.52,1.05l1.13,1.06l0.2,0.08l1.24,0.01l2.42,-0.65l2.77,-0.31l2.17,-0.78l1.31,-0.19l0.84,-0.43l1.03,-0.06l-0.01,4.54Z", "name": "Somaliland"}, "_2": {"path": "M384.23,230.37l0.07,-0.06l0.28,-0.89l0.99,-1.13l0.07,-0.13l0.8,-3.54l3.4,-2.8l0.09,-0.13l0.76,-2.17l0.07,5.5l-2.07,0.21l-0.24,0.17l-0.61,1.36l-0.02,0.16l0.43,3.46l-4.01,-0.01ZM391.82,218.2l0.07,-0.06l0.75,-1.93l1.86,-0.25l0.94,0.34l1.14,0.0l0.18,-0.06l0.73,-0.56l1.41,-0.08l-0.0,2.72l-7.08,-0.12Z", "name": "Western Sahara"}, "_1": {"path": "M472.71,172.84l-0.07,-0.43l-0.16,-0.22l-0.53,-0.27l-0.38,-0.58l0.3,-0.43l0.51,-0.19l0.18,-0.18l0.3,-0.87l0.12,-0.04l0.22,0.26l0.12,0.09l0.38,0.15l0.28,0.41l0.15,0.12l0.34,0.12l0.43,0.5l0.15,0.07l-0.12,0.3l-0.27,0.32l-0.03,0.18l-0.31,0.06l-1.48,0.47l-0.15,0.17Z", "name": "Kosovo"}, "_0": {"path": "M503.54,192.92l0.09,-0.17l0.41,0.01l-0.08,0.01l-0.42,0.15ZM504.23,192.76l1.02,0.02l0.4,-0.13l-0.09,0.29l0.03,0.08l-0.35,0.16l-0.24,-0.04l-0.06,-0.1l-0.18,-0.17l-0.19,-0.08l-0.33,-0.02Z", "name": "Northern Cyprus"}, "JO": {"path": "M510.26,200.93l0.28,-0.57l2.53,1.0l0.27,-0.02l4.57,-2.77l0.84,2.84l-0.28,0.25l-4.95,1.37l-0.14,0.49l2.24,2.48l-0.5,0.28l-0.13,0.14l-0.35,0.78l-1.76,0.35l-0.2,0.14l-0.57,0.94l-0.94,0.73l-2.45,-0.38l-0.03,-0.12l1.23,-4.32l-0.04,-1.1l0.34,-0.75l0.03,-0.12l0.0,-1.63Z", "name": "Jordan"}, "HR": {"path": "M455.49,162.73l1.53,0.09l0.24,-0.1l0.29,-0.34l0.64,0.38l0.14,0.04l0.98,0.06l0.32,-0.3l-0.01,-0.66l0.67,-0.25l0.19,-0.22l0.21,-1.11l1.72,-0.72l0.65,0.32l1.94,1.37l2.07,0.6l0.22,-0.02l0.67,-0.33l0.47,0.94l0.67,0.76l-0.63,0.77l-0.91,-0.55l-0.16,-0.04l-1.69,0.04l-2.2,-0.51l-1.17,0.07l-0.21,0.11l-0.36,0.42l-0.67,-0.53l-0.46,0.12l-0.52,1.29l0.05,0.31l1.21,1.42l0.58,0.99l1.15,1.14l0.95,0.68l0.92,1.23l0.1,0.09l1.75,0.91l-1.87,-0.89l-1.5,-1.11l-2.23,-0.88l-1.77,-1.9l0.12,-0.06l0.1,-0.47l-1.07,-1.22l-0.04,-0.94l-0.21,-0.27l-1.61,-0.49l-0.35,0.14l-0.53,0.93l-0.41,-0.57l0.04,-0.73Z", "name": "Croatia"}, "HT": {"path": "M237.82,234.68l1.35,0.1l1.95,0.37l0.18,1.15l-0.16,0.83l-0.51,0.37l-0.06,0.44l0.57,0.68l-0.02,0.22l-1.31,-0.35l-1.26,0.17l-1.49,-0.18l-0.15,0.02l-1.03,0.43l-1.02,-0.61l0.09,-0.36l2.04,0.32l1.9,0.21l0.19,-0.05l0.9,-0.58l0.05,-0.47l-1.05,-1.03l0.02,-0.86l-0.23,-0.3l-1.13,-0.29l0.18,-0.23Z", "name": "Haiti"}, "HU": {"path": "M461.96,157.92l0.68,-1.66l-0.03,-0.29l-0.15,-0.22l0.84,-0.0l0.3,-0.26l0.12,-0.84l0.88,0.57l0.98,0.38l0.16,0.01l2.1,-0.39l0.23,-0.21l0.14,-0.45l0.88,-0.1l1.06,-0.43l0.13,0.1l0.28,0.04l1.18,-0.4l0.14,-0.1l0.52,-0.67l0.63,-0.15l2.6,0.95l0.26,-0.03l0.38,-0.23l1.12,0.7l0.1,0.49l-1.31,0.57l-0.14,0.13l-1.18,2.14l-1.44,2.04l-1.85,0.55l-1.51,-0.13l-0.14,0.02l-1.92,0.82l-0.85,0.42l-1.91,-0.55l-1.83,-1.31l-0.74,-0.37l-0.44,-0.97l-0.26,-0.18Z", "name": "Hungary"}, "HN": {"path": "M202.48,251.87l-0.33,-0.62l-0.18,-0.14l-0.5,-0.15l0.13,-0.76l-0.11,-0.28l-0.34,-0.28l-0.6,-0.23l-0.18,-0.01l-0.81,0.22l-0.16,-0.24l-0.72,-0.39l-0.51,-0.48l-0.12,-0.07l-0.31,-0.09l0.24,-0.3l0.04,-0.3l-0.16,-0.4l0.1,-0.28l1.14,-0.69l1.0,-0.86l0.09,0.04l0.3,-0.05l0.47,-0.39l0.49,-0.03l0.14,0.13l0.29,0.06l0.31,-0.1l1.16,0.22l1.24,-0.08l0.81,-0.28l0.29,-0.25l0.63,0.1l0.69,0.18l0.65,-0.06l0.49,-0.2l1.04,0.32l0.38,0.06l0.7,0.44l0.71,0.56l0.92,0.41l0.1,0.11l-0.11,-0.01l-0.23,0.09l-0.3,0.3l-0.76,0.29l-0.58,0.0l-0.15,0.04l-0.45,0.26l-0.31,-0.07l-0.37,-0.34l-0.28,-0.07l-0.26,0.07l-0.18,0.15l-0.23,0.43l-0.04,-0.0l-0.33,0.28l-0.03,0.4l-0.76,0.61l-0.45,0.3l-0.15,0.16l-0.51,-0.36l-0.41,0.06l-0.45,0.56l-0.41,-0.01l-0.59,0.06l-0.27,0.31l0.04,0.96l-0.07,0.0l-0.25,0.16l-0.24,0.45l-0.42,0.06Z", "name": "Honduras"}, "PR": {"path": "M254.95,238.31l1.15,0.21l0.2,0.23l-0.36,0.36l-1.76,-0.01l-1.2,0.07l-0.09,-0.69l0.17,-0.18l1.89,0.01Z", "name": "Puerto Rico"}, "PS": {"path": "M509.66,201.06l-0.0,1.44l-0.29,0.63l-0.59,0.19l0.02,-0.11l0.52,-0.31l-0.02,-0.53l-0.41,-0.2l0.36,-1.28l0.41,0.17Z", "name": "West Bank"}, "PT": {"path": "M398.65,173.6l0.75,-0.63l0.7,-0.3l0.51,1.2l0.28,0.18l1.48,-0.0l0.2,-0.08l0.33,-0.3l1.16,0.08l0.52,1.11l-0.95,0.66l-0.13,0.24l-0.03,2.2l-0.33,0.35l-0.08,0.18l-0.08,1.17l-0.86,0.19l-0.2,0.44l0.93,1.64l-0.64,1.79l0.07,0.31l0.72,0.72l-0.24,0.56l-0.9,1.05l-0.07,0.26l0.17,0.77l-0.73,0.54l-1.18,-0.36l-0.16,-0.0l-0.85,0.21l0.31,-1.81l-0.23,-1.87l-0.23,-0.25l-0.99,-0.24l-0.49,-0.91l0.18,-1.72l0.93,-0.99l0.08,-0.16l0.17,-1.17l0.52,-1.76l-0.04,-1.36l-0.51,-1.14l-0.09,-0.8Z", "name": "Portugal"}, "PY": {"path": "M264.33,341.43l0.93,-2.96l0.07,-1.42l1.1,-2.1l4.19,-0.73l2.22,0.04l2.12,1.21l0.07,0.76l0.7,1.38l-0.16,3.48l0.24,0.31l2.64,0.5l0.19,-0.03l0.9,-0.45l1.47,0.62l0.38,0.64l0.23,2.35l0.3,1.07l0.25,0.21l0.93,0.12l0.16,-0.02l0.8,-0.37l0.61,0.33l-0.0,1.25l-0.33,1.53l-0.5,1.57l-0.39,2.26l-2.14,1.94l-1.85,0.4l-2.74,-0.4l-2.13,-0.62l2.26,-3.75l0.03,-0.24l-0.36,-1.18l-0.17,-0.19l-2.55,-1.03l-3.04,-1.95l-2.07,-0.43l-4.4,-4.12Z", "name": "Paraguay"}, "PA": {"path": "M213.65,263.79l0.18,-0.43l0.02,-0.18l-0.06,-0.28l0.23,-0.18l-0.01,-0.48l-0.4,-0.29l-0.01,-0.62l0.57,-0.13l0.68,0.69l-0.04,0.39l0.26,0.33l1.0,0.11l0.27,-0.1l0.49,0.44l0.24,0.07l1.34,-0.22l1.04,-0.62l1.49,-0.5l0.86,-0.73l0.99,0.11l0.18,0.28l1.35,0.08l1.02,0.4l0.78,0.72l0.71,0.53l-0.1,0.12l-0.05,0.3l0.53,1.34l-0.28,0.44l-0.6,-0.13l-0.36,0.22l-0.2,0.76l-0.41,-0.36l-0.44,-1.12l0.49,-0.53l-0.14,-0.49l-0.51,-0.14l-0.41,-0.72l-0.11,-0.11l-1.25,-0.7l-0.19,-0.04l-1.1,0.16l-0.22,0.15l-0.47,0.81l-0.9,0.56l-0.49,0.08l-0.22,0.17l-0.25,0.52l0.05,0.32l0.93,1.07l-0.41,0.21l-0.29,0.3l-0.81,0.09l-0.36,-1.26l-0.53,-0.1l-0.21,0.28l-0.5,-0.09l-0.44,-0.88l-0.22,-0.16l-0.99,-0.16l-0.61,-0.28l-0.13,-0.03l-1.0,0.0Z", "name": "Panama"}, "PG": {"path": "M808.4,298.6l0.62,0.46l1.19,1.56l1.04,0.77l-0.18,0.37l-0.42,0.15l-0.92,-0.82l-1.05,-1.53l-0.27,-0.96ZM804.09,296.06l-0.3,0.26l-0.36,-1.11l-0.66,-1.06l-2.55,-1.89l-1.42,-0.59l0.17,-0.15l1.16,0.6l0.85,0.55l1.01,0.58l0.97,1.02l0.9,0.76l0.24,1.03ZM796.71,297.99l0.15,0.82l0.34,0.24l1.43,-0.19l0.19,-0.11l0.68,-0.82l1.36,-0.87l0.13,-0.31l-0.21,-1.13l1.04,-0.03l0.3,0.25l-0.04,1.17l-0.74,1.34l-1.17,0.18l-0.22,0.15l-0.35,0.62l-2.51,1.13l-1.21,-0.0l-1.99,-0.71l-1.19,-0.58l0.07,-0.28l1.98,0.32l1.46,-0.2l0.24,-0.21l0.25,-0.79ZM789.24,303.52l0.11,0.15l2.19,1.62l1.6,2.62l0.27,0.14l1.09,-0.06l-0.07,0.77l0.23,0.32l1.23,0.27l-0.14,0.09l0.05,0.53l2.39,0.95l-0.11,0.28l-1.33,0.14l-0.51,-0.55l-0.18,-0.09l-4.59,-0.65l-1.87,-1.55l-1.38,-1.35l-1.28,-2.17l-0.16,-0.13l-3.27,-1.1l-0.19,0.0l-2.12,0.72l-1.58,0.85l-0.15,0.31l0.28,1.63l-1.65,0.73l-1.37,-0.4l-2.3,-0.09l-0.08,-15.65l3.95,1.57l4.58,1.42l1.67,1.25l1.32,1.19l0.36,1.39l0.19,0.21l4.06,1.51l0.39,0.85l-1.9,0.22l-0.25,0.39l0.55,1.68Z", "name": "Papua New Guinea"}, "PE": {"path": "M246.44,329.21l-0.63,1.25l-1.05,0.54l-2.25,-1.33l-0.19,-0.93l-0.16,-0.21l-4.95,-2.58l-4.46,-2.79l-1.87,-1.52l-0.94,-1.91l0.33,-0.6l-0.01,-0.31l-2.11,-3.33l-2.46,-4.66l-2.36,-5.02l-1.04,-1.18l-0.77,-1.81l-0.08,-0.11l-1.95,-1.64l-1.54,-0.88l0.61,-0.85l0.02,-0.31l-1.15,-2.27l0.69,-1.56l1.59,-1.26l0.12,0.42l-0.56,0.47l-0.11,0.25l0.07,0.92l0.36,0.27l0.97,-0.19l0.85,0.23l0.99,1.19l0.41,0.05l1.42,-1.03l0.11,-0.16l0.46,-1.64l1.45,-2.06l2.92,-0.96l0.11,-0.07l2.73,-2.62l0.84,-1.72l0.02,-0.18l-0.3,-1.65l0.28,-0.1l1.49,1.06l0.77,1.14l0.1,0.09l1.08,0.6l1.43,2.55l0.21,0.15l1.86,0.31l0.18,-0.03l1.25,-0.6l0.77,0.37l0.17,0.03l1.4,-0.2l1.57,0.96l-1.45,2.29l0.23,0.46l0.63,0.05l0.66,0.7l-1.51,-0.08l-0.24,0.1l-0.27,0.31l-1.96,0.46l-2.95,1.74l-0.14,0.21l-0.17,1.1l-0.6,0.82l-0.05,0.23l0.21,1.13l-1.31,0.63l-0.17,0.27l0.0,0.91l-0.53,0.37l-0.1,0.37l1.04,2.27l1.31,1.46l-0.44,0.9l0.24,0.43l1.52,0.13l0.87,1.23l0.24,0.13l2.21,0.07l0.18,-0.06l1.55,-1.13l-0.14,3.22l0.23,0.3l1.14,0.29l0.16,-0.0l1.18,-0.36l1.97,3.71l-0.45,0.71l-0.04,0.14l-0.12,1.8l-0.05,2.07l-0.92,1.2l-0.03,0.31l0.38,0.8l-0.48,0.72l-0.02,0.3l1.01,2.02l-1.5,2.64Z", "name": "Peru"}, "PK": {"path": "M609.08,187.76l1.66,1.21l0.71,2.11l0.2,0.19l3.62,1.01l-1.98,1.95l-2.65,0.4l-3.75,-0.68l-0.26,0.08l-1.23,1.22l-0.07,0.31l0.89,2.46l0.88,1.92l0.1,0.12l1.67,1.14l-1.8,1.35l-0.12,0.25l0.04,1.85l-2.35,2.67l-1.59,2.79l-2.5,2.72l-2.76,-0.2l-0.24,0.09l-2.76,2.83l0.04,0.45l1.54,1.13l0.27,1.94l0.09,0.17l1.34,1.29l0.4,1.83l-5.14,-0.01l-0.22,0.09l-1.53,1.63l-1.52,-0.56l-0.76,-1.88l-1.93,-2.03l-0.25,-0.09l-4.6,0.5l-4.05,0.05l-3.1,0.33l0.77,-2.53l3.48,-1.33l0.19,-0.33l-0.21,-1.24l-0.19,-0.23l-1.01,-0.37l-0.06,-2.18l-0.17,-0.26l-2.32,-1.16l-0.96,-1.57l-0.56,-0.65l3.16,1.05l0.14,0.01l2.45,-0.4l1.44,0.33l0.3,-0.1l0.4,-0.47l1.58,0.22l0.14,-0.01l3.25,-1.14l0.2,-0.27l0.08,-2.23l1.23,-1.38l1.73,0.0l0.28,-0.2l0.22,-0.61l1.68,-0.32l0.86,0.24l0.27,-0.05l0.98,-0.78l0.11,-0.26l-0.13,-1.57l0.96,-1.52l1.51,-0.67l0.14,-0.41l-0.74,-1.4l1.86,0.07l0.26,-0.13l0.69,-1.01l0.05,-0.2l-0.09,-0.94l1.14,-1.09l0.09,-0.28l-0.29,-1.41l-0.51,-1.07l1.23,-1.05l2.6,-0.58l2.86,-0.33l1.33,-0.54l1.3,-0.29Z", "name": "Pakistan"}, "PH": {"path": "M737.11,263.82l0.25,1.66l0.14,1.34l-0.54,1.46l-0.64,-1.79l-0.5,-0.1l-1.17,1.28l-0.05,0.32l0.74,1.71l-0.49,0.81l-2.6,-1.28l-0.61,-1.57l0.68,-1.07l-0.07,-0.4l-1.59,-1.19l-0.42,0.06l-0.69,0.91l-1.01,-0.08l-0.21,0.06l-1.58,1.2l-0.17,-0.3l0.87,-1.88l1.48,-0.66l1.18,-0.81l0.71,0.92l0.34,0.1l1.9,-0.69l0.18,-0.18l0.34,-0.94l1.57,-0.06l0.29,-0.32l-0.1,-1.38l1.41,0.83l0.36,2.06ZM734.94,254.42l0.56,2.24l-1.41,-0.49l-0.4,0.3l0.07,0.94l0.51,1.3l-0.54,0.26l-0.08,-1.34l-0.25,-0.28l-0.56,-0.1l-0.23,-0.91l1.03,0.14l0.34,-0.31l-0.03,-0.96l-0.06,-0.18l-1.14,-1.44l1.62,0.04l0.57,0.78ZM724.68,238.33l1.48,0.71l0.33,-0.04l0.44,-0.38l0.05,0.13l-0.37,0.97l0.01,0.23l0.81,1.75l-0.59,1.92l-1.37,0.79l-0.14,0.2l-0.39,2.07l0.01,0.14l0.56,2.04l0.23,0.21l1.33,0.28l0.14,-0.0l1.0,-0.27l2.82,1.28l-0.2,1.16l0.12,0.29l0.66,0.5l-0.13,0.56l-1.54,-0.99l-0.89,-1.29l-0.49,0.0l-0.44,0.65l-1.34,-1.28l-0.26,-0.08l-2.18,0.36l-0.96,-0.44l0.09,-0.72l0.69,-0.57l-0.01,-0.47l-0.75,-0.59l-0.47,0.14l-0.15,0.43l-0.86,-1.02l-0.34,-1.02l-0.07,-1.74l0.49,0.41l0.49,-0.21l0.26,-3.99l0.73,-2.1l1.23,0.0ZM731.12,258.92l-0.82,0.75l-0.83,1.64l-0.52,0.5l-1.17,-1.33l0.36,-0.47l0.62,-0.7l0.07,-0.15l0.24,-1.35l0.73,-0.08l-0.31,1.29l0.16,0.34l0.37,-0.09l1.21,-1.6l-0.12,1.24ZM726.66,255.58l0.85,0.45l0.14,0.03l1.28,-0.0l-0.03,0.62l-1.04,0.96l-1.15,0.55l-0.05,-0.71l0.17,-1.26l-0.01,-0.13l-0.16,-0.51ZM724.92,252.06l-0.45,1.5l-0.7,-0.83l-0.95,-1.43l1.44,0.06l0.67,0.7ZM717.48,261.28l-1.87,1.35l0.21,-0.3l1.81,-1.57l1.5,-1.75l0.97,-1.84l0.23,1.08l-1.56,1.33l-1.29,1.7Z", "name": "Philippines"}, "PL": {"path": "M458.8,144.25l-0.96,-1.98l0.18,-1.06l-0.01,-0.15l-0.62,-1.8l-0.82,-1.11l0.56,-0.73l0.05,-0.28l-0.51,-1.51l1.48,-0.87l3.88,-1.58l3.06,-1.14l2.23,0.52l0.15,0.66l0.29,0.23l2.4,0.04l3.11,0.39l4.56,-0.05l1.12,0.32l0.51,0.89l0.1,1.45l0.03,0.12l0.66,1.23l-0.01,1.08l-1.33,0.61l-0.14,0.41l0.74,1.5l0.07,1.53l1.22,2.79l-0.19,0.66l-1.09,0.33l-0.14,0.09l-2.27,2.72l-0.04,0.31l0.35,0.8l-2.22,-1.16l-0.21,-0.02l-1.72,0.44l-1.1,-0.31l-0.21,0.02l-1.3,0.61l-1.11,-1.02l-0.32,-0.05l-0.81,0.35l-1.15,-1.61l-0.21,-0.12l-1.65,-0.17l-0.19,-0.82l-0.23,-0.23l-1.72,-0.37l-0.34,0.17l-0.25,0.56l-0.88,-0.44l0.12,-0.69l-0.25,-0.35l-1.78,-0.27l-1.08,-0.97Z", "name": "Poland"}, "ZM": {"path": "M502.81,308.32l1.09,1.04l0.58,1.94l-0.39,0.66l-0.5,2.05l-0.0,0.14l0.45,1.95l-0.69,0.77l-0.06,0.11l-0.76,2.37l0.15,0.36l0.62,0.31l-6.85,1.9l-0.22,0.33l0.2,1.54l-1.62,0.3l-0.12,0.05l-1.43,1.02l-0.11,0.15l-0.25,0.73l-0.73,0.17l-0.14,0.08l-2.18,2.12l-1.33,1.6l-0.65,0.05l-0.83,-0.29l-2.75,-0.28l-0.24,-0.1l-0.15,-0.27l-0.99,-0.58l-0.12,-0.04l-1.73,-0.14l-1.88,0.54l-1.5,-1.48l-1.61,-2.01l0.11,-7.73l4.92,0.03l0.29,-0.37l-0.19,-0.79l0.34,-0.86l0.0,-0.21l-0.41,-1.11l0.26,-1.14l-0.01,-0.16l-0.12,-0.36l0.18,0.01l0.1,0.56l0.31,0.25l1.14,-0.06l1.44,0.21l0.76,1.05l0.19,0.12l2.01,0.35l0.19,-0.03l1.24,-0.65l0.44,1.03l0.22,0.18l1.81,0.34l0.85,0.99l1.02,1.39l0.24,0.12l1.92,0.02l0.3,-0.32l-0.21,-2.74l-0.47,-0.23l-0.53,0.36l-1.58,-0.89l-0.51,-0.34l0.29,-2.36l0.44,-2.99l-0.03,-0.18l-0.5,-0.99l0.61,-1.38l0.53,-0.24l3.26,-0.41l0.89,0.23l1.01,0.62l1.04,0.44l1.6,0.43l1.35,0.72Z", "name": "Zambia"}, "EE": {"path": "M482.19,120.88l0.23,-1.68l-0.43,-0.31l-0.75,0.37l-1.34,-1.1l-0.18,-1.75l2.92,-0.95l3.07,-0.53l2.66,0.6l2.48,-0.1l0.18,0.31l-1.65,1.96l-0.06,0.26l0.71,3.25l-0.88,0.94l-1.85,-0.01l-2.08,-1.3l-1.14,-0.47l-0.2,-0.01l-1.69,0.51Z", "name": "Estonia"}, "EG": {"path": "M508.07,208.8l-0.66,1.06l-0.53,2.03l-0.64,1.32l-0.32,0.26l-1.74,-1.85l-1.77,-3.86l-0.48,-0.09l-0.26,0.25l-0.07,0.32l1.04,2.88l1.55,2.76l1.89,4.18l0.94,1.48l0.83,1.54l2.08,2.73l-0.3,0.28l-0.1,0.23l0.08,1.72l0.11,0.22l2.91,2.37l-28.78,0.0l0.0,-19.06l-0.73,-2.2l0.61,-1.59l0.0,-0.2l-0.34,-1.04l0.73,-1.08l3.13,-0.04l2.36,0.72l2.48,0.81l1.15,0.43l0.23,-0.01l1.93,-0.87l1.02,-0.78l2.08,-0.21l1.59,0.31l0.62,1.24l0.52,0.03l0.46,-0.71l1.86,0.59l1.95,0.16l0.17,-0.04l0.92,-0.52l1.48,4.24Z", "name": "Egypt"}, "ZA": {"path": "M467.06,373.27l-0.13,-0.29l0.01,-1.58l-0.02,-0.12l-0.71,-1.64l0.59,-0.37l0.14,-0.26l-0.07,-2.13l-0.05,-0.15l-1.63,-2.58l-1.25,-2.31l-1.71,-3.37l0.88,-0.98l0.7,0.52l0.39,1.08l0.23,0.19l1.1,0.19l1.55,0.51l0.14,0.01l1.35,-0.2l0.11,-0.04l2.24,-1.39l0.14,-0.25l0.0,-9.4l0.16,0.09l1.39,2.38l-0.22,1.53l0.04,0.19l0.56,0.94l0.3,0.14l1.79,-0.27l0.16,-0.08l1.23,-1.18l1.17,-0.79l0.1,-0.12l0.57,-1.19l1.02,-0.52l0.9,0.28l1.16,0.73l0.14,0.05l2.04,0.13l0.13,-0.02l1.6,-0.62l0.18,-0.19l0.63,-1.93l1.18,-0.19l0.19,-0.12l0.78,-1.05l0.81,-1.71l2.18,-1.91l3.44,-1.88l0.89,0.02l1.17,0.43l0.21,-0.0l0.76,-0.29l1.07,0.21l1.15,3.55l0.63,1.82l-0.44,2.9l0.1,0.52l-0.74,-0.29l-0.18,-0.01l-0.72,0.19l-0.21,0.2l-0.22,0.74l-0.66,0.97l-0.05,0.18l0.02,0.93l0.09,0.21l1.49,1.46l0.27,0.08l1.47,-0.29l0.22,-0.18l0.43,-1.01l1.29,0.02l-0.51,1.63l-0.29,2.2l-0.59,1.12l-2.2,1.78l-1.06,1.39l-0.72,1.44l-1.39,1.93l-2.81,2.84l-1.75,1.65l-1.85,1.24l-2.55,1.06l-1.23,0.14l-0.24,0.18l-0.22,0.54l-1.27,-0.35l-0.2,0.01l-1.15,0.5l-2.62,-0.52l-0.12,0.0l-1.46,0.33l-0.98,-0.14l-0.16,0.02l-2.55,1.1l-2.11,0.44l-1.59,1.07l-0.93,0.06l-0.97,-0.92l-0.19,-0.08l-0.72,-0.04l-1.0,-1.16l-0.25,0.05ZM493.72,359.24l-1.12,-0.86l-0.31,-0.03l-1.23,0.59l-1.36,1.07l-1.39,1.78l0.01,0.38l1.88,2.11l0.31,0.09l0.9,-0.27l0.18,-0.15l0.4,-0.77l1.28,-0.39l0.18,-0.16l0.42,-0.88l0.76,-1.32l-0.05,-0.37l-0.87,-0.82Z", "name": "South Africa"}, "EC": {"path": "M220.2,293.48l1.25,-1.76l0.02,-0.31l-0.54,-1.09l-0.5,-0.06l-0.78,0.94l-1.03,-0.75l0.33,-0.46l0.05,-0.23l-0.38,-2.04l0.66,-0.28l0.17,-0.19l0.45,-1.52l0.93,-1.58l0.04,-0.2l-0.13,-0.78l1.19,-0.47l1.57,-0.91l2.35,1.34l0.17,0.04l0.28,-0.02l0.52,0.91l0.21,0.15l2.12,0.35l0.2,-0.03l0.55,-0.31l1.08,0.73l0.97,0.54l0.31,1.67l-0.71,1.49l-2.64,2.54l-2.95,0.97l-0.15,0.11l-1.53,2.18l-0.49,1.68l-1.1,0.8l-0.87,-1.05l-0.15,-0.1l-1.01,-0.27l-0.13,-0.0l-0.7,0.14l-0.03,-0.43l0.6,-0.5l0.1,-0.31l-0.26,-0.91Z", "name": "Ecuador"}, "AL": {"path": "M470.27,171.7l0.38,0.19l0.45,-0.18l0.4,0.61l0.11,0.1l0.46,0.24l0.13,0.87l-0.3,0.95l-0.0,0.17l0.36,1.28l0.12,0.17l0.9,0.63l-0.03,0.44l-0.67,0.35l-0.16,0.22l-0.14,0.88l-0.96,1.18l-0.06,-0.03l-0.04,-0.48l-0.12,-0.22l-1.28,-0.92l-0.19,-1.25l0.2,-1.96l0.33,-0.89l-0.06,-0.3l-0.36,-0.41l-0.13,-0.75l0.66,-0.9Z", "name": "Albania"}, "AO": {"path": "M461.62,299.93l0.55,1.67l0.73,1.54l1.56,2.18l0.28,0.12l1.66,-0.2l0.81,-0.34l1.28,0.33l0.33,-0.14l0.39,-0.67l0.56,-1.3l1.37,-0.09l0.27,-0.21l0.07,-0.23l0.67,-0.01l-0.13,0.53l0.29,0.37l2.74,-0.02l0.04,1.29l0.03,0.13l0.46,0.87l-0.35,1.52l0.18,1.55l0.07,0.16l0.75,0.85l-0.13,2.89l0.41,0.29l0.56,-0.21l1.11,0.05l1.5,-0.37l0.9,0.12l0.18,0.53l-0.27,1.15l0.01,0.17l0.4,1.08l-0.33,0.85l-0.01,0.18l0.12,0.51l-4.83,-0.03l-0.3,0.3l-0.12,8.13l0.07,0.19l1.69,2.1l1.27,1.25l-4.03,0.92l-5.93,-0.36l-1.66,-1.19l-0.18,-0.06l-10.15,0.11l-0.34,0.13l-1.35,-1.05l-0.17,-0.06l-1.62,-0.08l-1.6,0.45l-0.88,0.36l-0.17,-1.2l0.34,-2.19l0.85,-2.32l0.14,-1.13l0.79,-2.24l0.57,-1.0l1.42,-1.64l0.82,-1.15l0.05,-0.13l0.26,-1.88l-0.13,-1.51l-0.07,-0.16l-0.72,-0.87l-1.23,-2.91l0.09,-0.37l0.73,-0.95l0.05,-0.27l-1.27,-4.12l-1.19,-1.54l0.1,-0.2l0.86,-0.28l0.78,0.03l0.83,-0.29l7.12,0.03ZM451.81,298.94l-0.17,0.07l-0.5,-1.42l0.85,-0.92l0.53,-0.29l0.48,0.44l-0.56,0.32l-0.1,0.1l-0.41,0.65l-0.05,0.14l-0.07,0.91Z", "name": "Angola"}, "KZ": {"path": "M598.42,172.08l-1.37,0.54l-3.3,2.09l-0.11,0.12l-1.01,1.97l-0.56,0.01l-0.6,-1.24l-0.26,-0.17l-2.95,-0.09l-0.46,-2.22l-0.29,-0.24l-0.91,-0.02l0.17,-2.72l-0.12,-0.26l-3.0,-2.22l-0.2,-0.06l-4.29,0.24l-2.8,0.42l-2.36,-2.7l-6.4,-3.65l-0.23,-0.03l-6.45,1.83l-0.22,0.29l0.1,10.94l-0.84,0.1l-1.65,-2.21l-0.11,-0.09l-1.69,-0.84l-0.2,-0.02l-2.84,0.63l-0.14,0.07l-0.71,0.64l-0.02,-0.11l0.57,-1.17l0.0,-0.26l-0.48,-1.05l-0.17,-0.16l-2.78,-0.99l-1.08,-2.62l-0.13,-0.15l-1.24,-0.7l-0.04,-0.48l2.07,0.25l0.34,-0.29l0.09,-2.03l1.84,-0.44l2.12,0.45l0.36,-0.25l0.45,-3.04l-0.45,-2.06l-0.31,-0.23l-2.44,0.15l-2.07,-0.75l-0.23,0.01l-2.88,1.38l-2.21,0.62l-0.96,-0.38l0.22,-1.39l-0.06,-0.23l-1.6,-2.12l-0.25,-0.12l-1.72,0.08l-1.87,-1.91l1.33,-2.24l-0.06,-0.38l-0.55,-0.5l1.72,-3.08l2.3,1.7l0.48,-0.2l0.29,-2.26l4.99,-3.48l3.76,-0.08l5.46,2.27l2.96,1.33l0.26,-0.01l2.59,-1.36l3.82,-0.06l3.13,1.67l0.38,-0.09l0.63,-0.85l3.36,0.14l0.29,-0.19l0.63,-1.57l-0.13,-0.37l-3.64,-2.05l2.0,-1.36l0.1,-0.38l-0.32,-0.62l2.09,-0.76l0.13,-0.47l-1.65,-2.13l0.89,-0.91l9.27,-1.18l0.13,-0.05l1.17,-0.82l6.2,-1.27l2.26,-1.43l4.19,0.7l0.74,3.39l0.38,0.22l2.52,-0.81l2.9,1.06l-0.18,1.63l0.32,0.33l2.52,-0.23l5.0,-2.58l0.03,0.39l3.16,2.62l5.57,8.48l0.49,0.02l1.18,-1.53l3.22,1.78l0.21,0.03l3.5,-0.83l1.21,0.52l1.16,1.82l0.15,0.12l1.67,0.61l1.01,1.32l0.28,0.11l3.04,-0.41l1.1,1.64l-1.68,1.89l-1.97,0.28l-0.26,0.29l-0.12,3.09l-1.2,1.23l-4.81,-1.01l-0.35,0.2l-1.77,5.51l-1.14,0.62l-4.92,1.23l-0.2,0.41l2.14,5.06l-1.45,0.67l-0.17,0.31l0.15,1.28l-1.05,-0.3l-1.21,-1.04l-0.17,-0.07l-3.73,-0.32l-4.15,-0.08l-0.92,0.31l-3.46,-1.24l-0.22,0.01l-1.42,0.63l-0.17,0.21l-0.32,1.49l-3.82,-0.97l-0.15,0.0l-1.65,0.43l-0.2,0.17l-0.51,1.21Z", "name": "Kazakhstan"}, "ET": {"path": "M516.0,247.63l1.21,0.92l0.3,0.04l1.3,-0.53l0.46,0.41l0.19,0.08l1.65,0.03l2.05,0.96l0.67,0.88l1.07,0.79l1.0,1.45l0.7,0.68l-0.72,0.92l-0.85,1.19l-0.04,0.25l0.19,0.67l0.04,0.74l0.29,0.28l1.4,0.04l0.55,-0.15l0.23,0.19l-0.41,0.67l0.01,0.32l0.92,1.39l0.93,1.23l0.99,0.94l0.1,0.06l8.19,2.99l1.51,0.01l-6.51,6.95l-3.14,0.11l-0.18,0.06l-2.15,1.71l-1.51,0.04l-0.22,0.1l-0.6,0.69l-1.46,-0.0l-0.93,-0.78l-0.32,-0.04l-2.29,1.05l-0.12,0.1l-0.64,0.9l-1.44,-0.17l-0.51,-0.26l-0.17,-0.03l-0.56,0.07l-0.68,-0.02l-3.1,-2.08l-0.17,-0.05l-1.62,0.0l-0.68,-0.65l0.0,-1.28l-0.21,-0.29l-1.19,-0.38l-1.42,-2.63l-0.13,-0.12l-1.05,-0.53l-0.46,-1.0l-1.27,-1.23l-0.17,-0.08l-1.08,-0.13l0.53,-0.9l1.17,-0.05l0.26,-0.17l0.37,-0.77l0.03,-0.14l-0.03,-2.23l0.7,-2.49l1.08,-0.65l0.14,-0.19l0.24,-1.0l1.03,-1.85l1.47,-1.22l0.09,-0.12l1.02,-2.51l0.36,-1.96l2.62,0.48l0.33,-0.18l0.63,-1.55Z", "name": "Ethiopia"}, "ZW": {"path": "M498.95,341.2l-1.16,-0.23l-0.16,0.01l-0.74,0.28l-1.11,-0.41l-1.02,-0.04l-1.52,-1.13l-0.12,-0.05l-1.79,-0.37l-0.65,-1.46l-0.01,-0.86l-0.22,-0.29l-0.99,-0.26l-2.74,-2.77l-0.77,-1.46l-0.52,-0.5l-0.72,-1.54l2.24,0.23l0.78,0.28l0.12,0.02l0.85,-0.06l0.21,-0.11l1.38,-1.66l2.11,-2.05l0.81,-0.18l0.22,-0.2l0.27,-0.8l1.29,-0.93l1.53,-0.28l0.11,0.66l0.3,0.25l2.02,-0.05l1.04,0.48l0.5,0.59l0.18,0.1l1.13,0.18l1.11,0.7l0.01,3.06l-0.49,1.82l-0.11,1.94l0.03,0.16l0.35,0.68l-0.24,1.3l-0.27,0.17l-0.12,0.15l-0.64,1.83l-2.49,2.8Z", "name": "Zimbabwe"}, "ES": {"path": "M398.67,172.8l0.09,-1.45l-0.06,-0.2l-0.82,-1.05l3.16,-1.96l3.01,0.54l3.33,-0.02l2.64,0.52l2.14,-0.15l3.9,0.1l0.91,1.08l0.14,0.09l4.61,1.38l0.26,-0.04l0.77,-0.55l2.66,1.29l0.17,0.03l2.59,-0.35l0.1,1.28l-2.2,1.85l-3.13,0.62l-0.23,0.23l-0.21,0.92l-1.54,1.68l-0.97,2.4l0.02,0.26l0.85,1.46l-1.27,1.14l-0.09,0.14l-0.5,1.73l-1.73,0.53l-0.15,0.1l-1.68,2.1l-3.03,0.04l-2.38,-0.05l-0.17,0.05l-1.57,1.01l-0.9,1.01l-0.96,-0.19l-0.82,-0.86l-0.69,-1.6l-0.22,-0.18l-2.14,-0.41l-0.13,-0.62l0.83,-0.97l0.39,-0.86l-0.06,-0.33l-0.73,-0.73l0.63,-1.74l-0.02,-0.25l-0.8,-1.41l0.69,-0.15l0.23,-0.27l0.09,-1.29l0.33,-0.36l0.08,-0.2l0.03,-2.16l1.03,-0.72l0.1,-0.37l-0.7,-1.5l-0.25,-0.17l-1.46,-0.11l-0.22,0.07l-0.34,0.3l-1.17,0.0l-0.55,-1.29l-0.39,-0.16l-1.02,0.44l-0.45,0.36Z", "name": "Spain"}, "ER": {"path": "M527.15,253.05l-0.77,-0.74l-1.01,-1.47l-1.14,-0.86l-0.62,-0.84l-0.11,-0.09l-2.18,-1.02l-0.12,-0.03l-1.61,-0.03l-0.52,-0.46l-0.31,-0.05l-1.31,0.54l-1.38,-1.06l-0.46,0.12l-0.69,1.68l-2.49,-0.46l-0.2,-0.76l1.06,-3.69l0.24,-1.65l0.66,-0.66l1.76,-0.4l0.16,-0.1l0.97,-1.13l1.24,2.55l0.68,2.34l0.09,0.14l1.4,1.27l3.39,2.4l1.37,1.43l2.14,2.34l0.94,0.6l-0.32,0.26l-0.85,-0.17Z", "name": "Eritrea"}, "ME": {"path": "M469.05,172.9l-0.57,-0.8l-0.1,-0.09l-0.82,-0.46l0.16,-0.33l0.35,-1.57l0.72,-0.62l0.27,-0.16l0.48,0.38l0.35,0.4l0.12,0.08l0.79,0.32l0.66,0.43l-0.43,0.62l-0.28,0.11l-0.07,-0.25l-0.53,-0.1l-1.09,1.49l-0.05,0.23l0.06,0.32Z", "name": "Montenegro"}, "MD": {"path": "M488.2,153.75l0.14,-0.11l1.49,-0.28l1.75,0.95l1.06,0.14l0.92,0.7l-0.15,0.9l0.15,0.31l0.8,0.46l0.33,1.2l0.09,0.14l0.72,0.66l-0.11,0.28l0.1,0.33l-0.06,0.02l-1.25,-0.08l-0.17,-0.29l-0.39,-0.12l-0.52,0.25l-0.16,0.36l0.13,0.42l-0.6,0.88l-0.43,1.03l-0.22,0.12l-0.32,-1.0l0.25,-1.34l-0.08,-1.38l-0.06,-0.17l-1.43,-1.87l-0.81,-1.36l-0.78,-0.95l-0.12,-0.09l-0.29,-0.12Z", "name": "Moldova"}, "MG": {"path": "M544.77,316.45l0.64,1.04l0.6,1.62l0.4,3.04l0.63,1.21l-0.22,1.07l-0.15,0.26l-0.59,-1.05l-0.52,-0.01l-0.47,0.76l-0.04,0.23l0.46,1.84l-0.19,0.92l-0.61,0.53l-0.1,0.21l-0.16,2.15l-0.97,2.98l-1.24,3.59l-1.55,4.97l-0.96,3.67l-1.08,2.93l-1.94,0.61l-2.05,1.06l-3.2,-1.53l-0.62,-1.26l-0.18,-2.39l-0.87,-2.07l-0.22,-1.8l0.4,-1.69l1.01,-0.4l0.19,-0.28l0.01,-0.79l1.15,-1.91l0.04,-0.11l0.23,-1.66l-0.03,-0.17l-0.57,-1.21l-0.46,-1.58l-0.19,-2.25l0.82,-1.36l0.33,-1.51l1.11,-0.1l1.4,-0.53l0.9,-0.45l1.03,-0.03l0.21,-0.09l1.41,-1.45l2.12,-1.65l0.75,-1.29l0.03,-0.24l-0.17,-0.56l0.53,0.15l0.32,-0.1l1.38,-1.77l0.06,-0.18l0.04,-1.44l0.54,-0.74l0.62,0.77Z", "name": "Madagascar"}, "MA": {"path": "M378.66,230.13l0.07,-0.75l0.93,-0.72l0.82,-1.37l0.04,-0.21l-0.14,-0.8l0.8,-1.74l1.33,-1.61l0.79,-0.4l0.14,-0.15l0.66,-1.55l0.08,-1.46l0.83,-1.52l1.6,-0.94l0.11,-0.11l1.56,-2.71l1.2,-0.99l2.24,-0.29l0.17,-0.08l1.95,-1.83l1.3,-0.77l2.09,-2.28l0.07,-0.26l-0.61,-3.34l0.92,-2.3l0.33,-1.44l1.52,-1.79l2.48,-1.27l1.86,-1.16l0.1,-0.11l1.67,-2.93l0.72,-1.59l1.54,0.01l1.43,1.14l0.21,0.06l2.33,-0.19l2.55,0.62l0.97,0.03l0.83,1.6l0.15,1.71l0.86,2.96l0.09,0.14l0.5,0.45l-0.31,0.73l-3.11,0.44l-0.16,0.07l-1.07,0.97l-1.36,0.23l-0.25,0.28l-0.1,1.85l-2.74,1.02l-0.14,0.11l-0.9,1.3l-1.93,0.69l-2.56,0.44l-4.04,2.01l-0.17,0.27l0.02,2.91l-0.08,0.0l-0.3,0.31l0.05,1.15l-1.25,0.07l-0.16,0.06l-0.73,0.55l-0.98,0.0l-0.85,-0.33l-0.15,-0.02l-2.11,0.29l-0.24,0.19l-0.76,1.95l-0.63,0.16l-0.21,0.19l-1.15,3.29l-3.42,2.81l-0.1,0.17l-0.81,3.57l-0.98,1.12l-0.3,0.85l-5.13,0.19Z", "name": "Morocco"}, "UZ": {"path": "M587.83,186.48l0.06,-1.46l-0.19,-0.29l-3.31,-1.24l-2.57,-1.4l-1.63,-1.38l-2.79,-1.98l-1.2,-2.98l-0.12,-0.14l-0.84,-0.54l-0.18,-0.05l-2.61,0.13l-0.76,-0.48l-0.25,-2.25l-0.17,-0.24l-3.37,-1.6l-0.32,0.04l-2.08,1.73l-2.11,1.02l-0.16,0.35l0.31,1.14l-2.14,0.03l-0.09,-10.68l6.1,-1.74l6.25,3.57l2.36,2.72l0.27,0.1l2.92,-0.44l4.17,-0.23l2.78,2.06l-0.18,2.87l0.29,0.32l0.98,0.02l0.46,2.22l0.28,0.24l3.0,0.09l0.61,1.25l0.28,0.17l0.93,-0.02l0.26,-0.16l1.06,-2.06l3.21,-2.03l1.3,-0.5l0.19,0.08l-1.75,1.62l0.05,0.48l1.85,1.12l0.27,0.02l1.65,-0.69l2.4,1.27l-2.69,1.79l-1.79,-0.27l-0.89,0.06l-0.22,-0.52l0.48,-1.26l-0.34,-0.4l-3.35,0.69l-0.22,0.18l-0.78,1.87l-1.07,1.47l-1.93,-0.13l-0.29,0.16l-0.65,1.29l0.16,0.42l1.69,0.64l0.48,1.91l-1.25,2.6l-1.64,-0.53l-1.18,-0.03Z", "name": "Uzbekistan"}, "MM": {"path": "M670.1,233.39l-1.46,1.11l-1.68,0.11l-0.26,0.19l-1.1,2.7l-0.95,0.42l-0.14,0.42l1.21,2.27l1.61,1.92l0.94,1.55l-0.82,1.99l-0.77,0.42l-0.13,0.39l0.64,1.35l1.62,1.97l0.26,1.32l-0.04,1.15l0.02,0.13l0.92,2.18l-1.3,2.23l-0.79,1.69l-0.1,-0.77l0.74,-1.87l-0.02,-0.26l-0.8,-1.42l0.2,-2.68l-0.06,-0.2l-0.98,-1.27l-0.8,-2.98l-0.45,-3.22l-1.11,-2.22l-0.45,-0.1l-1.64,1.28l-2.74,1.76l-1.26,-0.2l-1.27,-0.49l0.79,-2.93l0.0,-0.14l-0.52,-2.42l-1.93,-2.97l0.26,-0.8l-0.22,-0.39l-1.37,-0.31l-1.65,-1.98l-0.12,-1.5l0.41,0.19l0.42,-0.26l0.05,-1.7l1.08,-0.54l0.16,-0.34l-0.24,-1.0l0.5,-0.79l0.05,-0.15l0.08,-2.35l1.58,0.49l0.36,-0.15l1.12,-2.19l0.15,-1.34l1.35,-2.18l0.04,-0.17l-0.07,-1.35l2.97,-1.71l1.67,0.45l0.38,-0.33l-0.18,-1.46l0.7,-0.4l0.15,-0.32l-0.13,-0.72l0.94,-0.13l0.74,1.41l0.11,0.12l0.95,0.56l0.07,1.89l-0.09,2.08l-2.28,2.15l-0.09,0.19l-0.3,3.15l0.35,0.32l2.37,-0.39l0.53,2.17l0.2,0.21l1.3,0.42l-0.63,1.9l0.14,0.36l1.86,0.99l1.1,0.49l0.24,0.0l1.45,-0.6l0.04,0.51l-2.01,1.6l-0.56,0.96l-1.34,0.56Z", "name": "Myanmar"}, "ML": {"path": "M390.79,248.2l0.67,-0.37l0.14,-0.18l0.36,-1.31l0.51,-0.04l1.68,0.69l0.21,0.0l1.34,-0.48l0.89,0.16l0.3,-0.13l0.29,-0.44l9.89,-0.04l0.29,-0.21l0.56,-1.8l-0.11,-0.33l-0.33,-0.24l-2.37,-22.1l3.41,-0.04l8.37,5.73l8.38,5.68l0.56,1.15l0.14,0.14l1.56,0.75l0.99,0.36l0.03,1.45l0.33,0.29l2.45,-0.22l0.01,5.52l-1.3,1.64l-0.06,0.15l-0.18,1.37l-1.99,0.36l-3.4,0.22l-0.19,0.09l-0.85,0.83l-1.48,0.09l-1.49,0.01l-0.54,-0.43l-0.26,-0.05l-1.38,0.36l-2.39,1.08l-0.13,0.12l-0.44,0.73l-1.88,1.11l-0.11,0.12l-0.3,0.57l-0.86,0.42l-1.1,-0.31l-0.28,0.07l-0.69,0.62l-0.09,0.16l-0.35,1.66l-1.93,2.04l-0.08,0.23l0.05,0.76l-0.63,0.99l-0.04,0.19l0.14,1.23l-0.81,0.29l-0.32,0.17l-0.27,-0.75l-0.39,-0.18l-0.65,0.26l-0.36,-0.04l-0.29,0.14l-0.37,0.6l-1.69,-0.02l-0.63,-0.34l-0.32,0.02l-0.12,0.09l-0.47,-0.45l0.1,-0.6l-0.09,-0.27l-0.31,-0.3l-0.33,-0.05l-0.05,0.02l0.02,-0.21l0.46,-0.59l-0.02,-0.39l-0.99,-1.02l-0.34,-0.74l-0.56,-0.56l-0.17,-0.09l-0.5,-0.07l-0.19,0.04l-0.58,0.35l-0.79,0.33l-0.65,0.51l-0.85,-0.16l-0.63,-0.59l-0.14,-0.07l-0.41,-0.08l-0.2,0.03l-0.59,0.31l-0.07,0.0l-0.1,-0.63l0.11,-0.85l-0.21,-0.98l-0.11,-0.17l-0.86,-0.66l-0.45,-1.34l-0.1,-1.36Z", "name": "Mali"}, "MN": {"path": "M641.06,150.59l2.41,-0.53l4.76,-2.8l3.67,-1.49l2.06,0.96l0.12,0.03l2.5,0.05l1.59,1.45l0.19,0.08l2.47,0.12l3.59,0.81l0.27,-0.07l2.43,-2.28l0.06,-0.36l-0.93,-1.77l2.33,-3.1l2.66,1.3l2.26,0.39l2.75,0.8l0.44,2.3l0.19,0.22l3.56,1.38l0.18,0.01l2.35,-0.6l3.1,-0.42l2.4,0.41l2.37,1.52l1.49,1.63l0.23,0.1l2.29,-0.03l3.13,0.52l0.15,-0.01l2.28,-0.79l3.27,-0.53l0.11,-0.04l3.56,-2.23l1.31,0.31l1.26,1.05l0.22,0.07l2.45,-0.22l-0.98,1.96l-1.77,3.21l-0.01,0.28l0.64,1.31l0.35,0.16l1.35,-0.38l2.4,0.48l0.22,-0.04l1.78,-1.09l1.82,0.92l2.11,2.07l-0.17,0.68l-1.79,-0.31l-3.74,0.45l-1.85,0.96l-1.78,2.01l-3.74,1.18l-2.46,1.61l-2.45,-0.6l-1.42,-0.28l-0.31,0.13l-1.31,1.99l0.0,0.33l0.78,1.15l0.3,0.74l-1.58,0.93l-1.75,1.59l-2.83,1.03l-3.77,0.12l-4.05,1.05l-2.81,1.54l-0.95,-0.8l-0.19,-0.07l-2.96,0.0l-3.64,-1.8l-2.55,-0.48l-3.38,0.41l-5.13,-0.67l-2.66,0.06l-1.35,-1.65l-1.12,-2.78l-0.21,-0.18l-1.5,-0.33l-2.98,-1.89l-0.12,-0.04l-3.37,-0.43l-2.84,-0.51l-0.75,-1.13l0.93,-3.54l-0.04,-0.24l-1.73,-2.55l-0.15,-0.12l-3.52,-1.18l-1.99,-1.61l-0.54,-1.85Z", "name": "Mongolia"}, "MK": {"path": "M472.73,173.87l0.08,0.01l0.32,-0.25l0.08,-0.44l1.29,-0.41l1.37,-0.28l1.03,-0.04l1.06,0.82l0.14,1.59l-0.22,0.04l-0.17,0.11l-0.32,0.4l-1.2,-0.05l-0.18,0.05l-0.9,0.61l-1.45,0.23l-0.85,-0.59l-0.3,-1.09l0.22,-0.71Z", "name": "Macedonia"}, "MW": {"path": "M507.18,313.84l-0.67,1.85l-0.01,0.16l0.7,3.31l0.31,0.24l0.75,-0.03l0.78,0.71l0.99,1.75l0.2,3.03l-0.91,0.45l-0.14,0.15l-0.59,1.38l-1.24,-1.21l-0.17,-1.62l0.49,-1.12l0.02,-0.16l-0.15,-1.03l-0.13,-0.21l-0.99,-0.65l-0.26,-0.03l-0.53,0.18l-1.31,-1.12l-1.15,-0.59l0.66,-2.06l0.75,-0.84l0.07,-0.27l-0.47,-2.04l0.48,-1.94l0.4,-0.65l0.03,-0.24l-0.64,-2.15l-0.08,-0.13l-0.44,-0.42l1.34,0.26l1.25,1.73l0.67,3.3Z", "name": "Malawi"}, "MR": {"path": "M390.54,247.66l-1.48,-1.58l-1.51,-1.88l-0.12,-0.09l-1.64,-0.67l-1.17,-0.74l-0.17,-0.05l-1.4,0.03l-0.12,0.03l-1.14,0.52l-1.15,-0.21l-0.26,0.08l-0.44,0.43l-0.11,-0.72l0.68,-1.29l0.31,-2.43l-0.28,-2.63l-0.29,-1.27l0.24,-1.24l-0.03,-0.2l-0.65,-1.24l-1.19,-1.05l0.32,-0.51l9.64,0.02l0.3,-0.34l-0.46,-3.71l0.51,-1.12l2.17,-0.22l0.27,-0.3l-0.08,-6.5l7.91,0.13l0.31,-0.3l0.01,-3.5l8.17,5.63l-2.89,0.04l-0.29,0.33l2.42,22.56l0.12,0.21l0.26,0.19l-0.43,1.38l-9.83,0.04l-0.25,0.13l-0.27,0.41l-0.77,-0.14l-0.15,0.01l-1.3,0.47l-1.64,-0.67l-0.14,-0.02l-0.79,0.06l-0.27,0.22l-0.39,1.39l-0.53,0.29Z", "name": "Mauritania"}, "UG": {"path": "M500.74,287.17l-2.84,-0.02l-0.92,0.32l-1.37,0.71l-0.29,-0.12l0.02,-1.6l0.54,-0.89l0.04,-0.13l0.14,-1.96l0.49,-1.09l0.91,-1.24l0.97,-0.68l0.8,-0.89l-0.13,-0.49l-0.79,-0.27l0.13,-2.55l0.78,-0.52l1.45,0.51l0.18,0.01l1.97,-0.57l1.72,0.01l0.18,-0.06l1.29,-0.97l0.98,1.44l0.29,1.24l1.05,2.75l-0.84,1.68l-1.94,2.66l-0.06,0.18l0.02,2.36l-4.8,0.18Z", "name": "Uganda"}, "MY": {"path": "M717.6,273.52l-1.51,0.7l-2.13,-0.41l-2.88,-0.0l-0.29,0.21l-0.84,2.77l-0.9,0.82l-0.08,0.12l-1.23,3.34l-1.81,0.47l-2.29,-0.68l-0.14,-0.01l-1.2,0.22l-0.14,0.07l-1.36,1.18l-1.47,-0.17l-0.12,0.01l-1.46,0.46l-1.51,-1.25l-0.24,-0.97l1.26,0.59l0.2,0.02l1.93,-0.47l0.22,-0.22l0.47,-1.98l0.9,-0.4l2.97,-0.54l0.17,-0.09l1.8,-1.98l1.02,-1.32l0.9,1.03l0.48,-0.04l0.43,-0.7l1.02,0.07l0.32,-0.27l0.25,-2.72l1.84,-1.67l1.23,-1.89l0.73,-0.01l1.12,1.11l0.1,0.99l0.18,0.24l1.66,0.71l1.85,0.67l-0.09,0.51l-1.45,0.11l-0.26,0.4l0.35,0.97ZM673.78,269.53l0.17,1.14l0.35,0.25l1.65,-0.3l0.18,-0.11l0.68,-0.86l0.31,0.13l1.41,1.45l0.99,1.59l0.13,1.57l-0.26,1.09l0.0,0.15l0.24,0.84l0.18,1.46l0.11,0.2l0.82,0.64l0.92,2.08l-0.03,0.52l-1.4,0.13l-2.29,-1.79l-2.86,-1.92l-0.27,-1.16l-0.07,-0.13l-1.39,-1.61l-0.33,-1.99l-0.05,-0.12l-0.84,-1.27l0.26,-1.72l-0.03,-0.18l-0.45,-0.87l0.13,-0.13l1.71,0.92Z", "name": "Malaysia"}, "MX": {"path": "M133.41,213.83l0.61,0.09l0.27,-0.09l0.93,-1.01l0.08,-0.18l0.09,-1.22l-0.09,-0.23l-1.93,-1.94l-1.46,-0.77l-2.96,-5.62l-0.86,-2.1l2.44,-0.18l2.68,-0.25l-0.03,0.08l0.17,0.4l3.79,1.35l5.81,1.97l6.96,-0.02l0.3,-0.3l0.0,-0.84l3.91,0.0l0.87,0.93l1.27,0.87l1.44,1.17l0.79,1.37l0.62,1.49l0.12,0.14l1.35,0.85l2.08,0.82l0.35,-0.1l1.49,-2.04l1.81,-0.05l1.63,1.01l1.21,1.8l0.86,1.58l1.47,1.55l0.53,1.82l0.73,1.32l0.14,0.13l1.98,0.84l1.78,0.59l0.61,-0.03l-0.78,1.89l-0.45,1.96l-0.19,3.58l-0.24,1.27l0.01,0.14l0.43,1.43l0.78,1.31l0.49,1.98l0.06,0.12l1.63,1.9l0.61,1.51l0.98,1.28l0.16,0.11l2.58,0.67l0.98,1.02l0.31,0.08l2.17,-0.71l1.91,-0.26l1.87,-0.47l1.67,-0.49l1.59,-1.06l0.11,-0.14l0.6,-1.52l0.22,-2.21l0.35,-0.62l1.58,-0.64l2.59,-0.59l2.18,0.09l1.43,-0.2l0.39,0.36l-0.07,1.02l-1.28,1.48l-0.65,1.68l0.07,0.32l0.33,0.32l-0.79,2.49l-0.28,-0.3l-0.24,-0.09l-1.0,0.08l-0.24,0.15l-0.74,1.28l-0.19,-0.13l-0.28,-0.03l-0.3,0.12l-0.19,0.29l0.0,0.06l-4.34,-0.02l-0.3,0.3l-0.0,1.16l-0.83,0.0l-0.28,0.19l0.08,0.33l0.93,0.86l0.9,0.58l0.24,0.48l0.16,0.15l0.2,0.08l-0.03,0.38l-2.94,0.01l-0.26,0.15l-1.21,2.09l0.02,0.33l0.25,0.33l-0.21,0.44l-0.04,0.22l-2.42,-2.35l-1.36,-0.87l-2.04,-0.67l-0.13,-0.01l-1.4,0.19l-2.07,0.98l-1.14,0.23l-1.72,-0.66l-1.85,-0.48l-2.31,-1.16l-1.92,-0.38l-2.79,-1.18l-2.04,-1.2l-0.6,-0.66l-0.19,-0.1l-1.37,-0.15l-2.45,-0.78l-1.07,-1.18l-2.63,-1.44l-1.2,-1.56l-0.44,-0.93l0.5,-0.15l0.2,-0.39l-0.2,-0.58l0.46,-0.55l0.07,-0.19l0.01,-0.91l-0.06,-0.18l-0.81,-1.13l-0.25,-1.08l-0.86,-1.36l-2.21,-2.63l-2.53,-2.09l-1.2,-1.63l-0.11,-0.09l-2.08,-1.06l-0.34,-0.48l0.35,-1.53l-0.16,-0.34l-1.24,-0.61l-1.39,-1.23l-0.6,-1.81l-0.24,-0.2l-1.25,-0.2l-1.38,-1.35l-1.11,-1.25l-0.1,-0.76l-0.05,-0.13l-1.33,-2.04l-0.85,-2.02l0.04,-0.99l-0.14,-0.27l-1.81,-1.1l-0.2,-0.04l-0.74,0.11l-1.34,-0.72l-0.42,0.16l-0.4,1.12l-0.0,0.19l0.41,1.3l0.24,2.04l0.06,0.15l0.88,1.16l1.84,1.86l0.4,0.61l0.12,0.1l0.27,0.14l0.29,0.82l0.31,0.2l0.2,-0.02l0.43,1.51l0.09,0.14l0.72,0.65l0.51,0.91l1.58,1.4l0.8,2.42l0.77,1.23l0.66,1.19l0.13,1.34l0.28,0.27l1.08,0.08l0.92,1.1l0.83,1.08l-0.03,0.24l-0.88,0.81l-0.13,-0.0l-0.59,-1.42l-0.07,-0.11l-1.67,-1.53l-1.81,-1.28l-1.15,-0.61l0.07,-1.85l-0.38,-1.45l-0.12,-0.17l-2.91,-2.03l-0.39,0.04l-0.11,0.11l-0.42,-0.46l-0.11,-0.08l-1.49,-0.63l-1.09,-1.16Z", "name": "Mexico"}, "VU": {"path": "M839.92,325.66l0.78,0.73l-0.18,0.07l-0.6,-0.8ZM839.13,322.74l0.27,1.36l-0.13,-0.06l-0.21,-0.02l-0.29,0.08l-0.22,-0.43l-0.03,-1.32l0.61,0.4Z", "name": "Vanuatu"}, "FR": {"path": "M444.58,172.63l-0.68,1.92l-0.72,-0.38l-0.51,-1.79l0.43,-0.95l1.15,-0.83l0.33,2.04ZM429.71,147.03l1.77,1.57l0.26,0.07l1.16,-0.23l2.12,1.44l0.56,0.28l0.16,0.03l0.61,-0.06l1.09,0.78l0.13,0.05l3.18,0.53l-1.09,1.94l-0.3,2.16l-0.48,0.38l-1.0,-0.26l-0.37,0.32l0.07,0.66l-1.73,1.68l-0.09,0.21l-0.04,1.42l0.41,0.29l0.96,-0.4l0.67,1.07l-0.09,0.78l0.04,0.19l0.61,0.97l-0.71,0.78l-0.07,0.28l0.65,2.39l0.21,0.21l1.09,0.31l-0.2,0.95l-2.08,1.58l-4.81,-0.8l-0.13,0.01l-3.65,0.99l-0.22,0.24l-0.25,1.6l-2.59,0.35l-2.74,-1.33l-0.31,0.03l-0.79,0.57l-4.38,-1.31l-0.79,-0.94l1.16,-1.64l0.05,-0.15l0.48,-6.17l-0.06,-0.21l-2.58,-3.3l-1.89,-1.65l-0.11,-0.06l-3.64,-1.17l-0.2,-1.88l2.92,-0.63l4.14,0.82l0.35,-0.36l-0.65,-3.0l1.77,1.05l0.27,0.02l5.83,-2.54l0.17,-0.19l0.71,-2.54l1.75,-0.53l0.27,0.88l0.27,0.21l1.04,0.05l1.08,1.23ZM289.1,278.45l-0.85,0.84l-0.88,0.13l-0.25,-0.51l-0.21,-0.16l-0.56,-0.1l-0.25,0.07l-0.63,0.55l-0.62,-0.29l0.5,-0.88l0.21,-1.11l0.42,-1.05l-0.03,-0.28l-0.93,-1.42l-0.18,-1.54l1.13,-1.87l2.42,0.78l2.55,2.04l0.33,0.81l-1.4,2.16l-0.77,1.84Z", "name": "France"}, "FI": {"path": "M492.26,76.42l-0.38,3.12l0.12,0.28l3.6,2.69l-2.14,2.96l-0.01,0.33l2.83,4.61l-1.61,3.36l0.03,0.31l2.15,2.87l-0.96,2.44l0.1,0.35l3.51,2.55l-0.81,1.72l-2.28,2.19l-5.28,4.79l-4.51,0.31l-4.39,1.37l-3.87,0.75l-1.34,-1.89l-0.11,-0.09l-2.23,-1.14l0.53,-3.54l-0.01,-0.14l-1.17,-3.37l1.12,-2.13l2.23,-2.44l5.69,-4.33l1.65,-0.84l0.16,-0.31l-0.26,-1.73l-0.15,-0.22l-3.4,-1.91l-0.77,-1.47l-0.07,-6.45l-0.12,-0.24l-3.91,-2.94l-3.0,-1.92l0.97,-0.76l2.6,2.17l0.21,0.07l3.2,-0.21l2.63,1.03l0.3,-0.05l2.39,-1.94l0.09,-0.13l1.18,-3.12l3.63,-1.42l2.87,1.59l-0.98,2.87Z", "name": "Finland"}, "FJ": {"path": "M869.98,327.07l-1.31,0.44l-0.14,-0.41l0.96,-0.41l0.85,-0.17l1.43,-0.78l-0.16,0.65l-1.64,0.67ZM867.58,329.12l0.54,0.47l-0.31,1.0l-1.32,0.3l-1.13,-0.26l-0.17,-0.78l0.72,-0.66l0.98,0.27l0.25,-0.04l0.43,-0.29Z", "name": "Fiji"}, "FK": {"path": "M268.15,427.89l2.6,-1.73l1.98,0.77l0.31,-0.05l1.32,-1.17l1.58,1.18l-0.54,0.84l-3.1,0.92l-1.0,-1.04l-0.39,-0.04l-1.9,1.35l-0.86,-1.04Z", "name": "Falkland Islands"}, "NI": {"path": "M202.1,252.6l0.23,-0.0l0.12,-0.11l0.68,-0.09l0.22,-0.15l0.23,-0.43l0.2,-0.01l0.28,-0.31l-0.04,-0.97l0.29,-0.03l0.5,0.02l0.25,-0.11l0.37,-0.46l0.51,0.35l0.4,-0.06l0.23,-0.28l0.45,-0.29l0.87,-0.7l0.11,-0.21l0.02,-0.26l0.23,-0.12l0.25,-0.48l0.29,0.27l0.14,0.07l0.5,0.12l0.22,-0.03l0.48,-0.28l0.66,-0.02l0.87,-0.33l0.36,-0.32l0.21,0.01l-0.11,0.48l0.0,0.14l0.22,0.8l-0.54,0.85l-0.27,1.03l-0.09,1.18l0.14,0.72l0.05,0.95l-0.24,0.15l-0.13,0.19l-0.23,1.09l0.0,0.14l0.14,0.53l-0.42,0.53l-0.06,0.24l0.12,0.69l0.08,0.15l0.18,0.19l-0.26,0.23l-0.49,-0.11l-0.35,-0.44l-0.16,-0.1l-0.79,-0.21l-0.23,0.03l-0.45,0.26l-1.51,-0.62l-0.31,0.05l-0.17,0.15l-1.81,-1.62l-0.6,-0.9l-1.04,-0.79l-0.77,-0.71Z", "name": "Nicaragua"}, "NL": {"path": "M436.22,136.65l1.82,0.08l0.36,0.89l-0.6,2.96l-0.53,1.06l-1.32,0.0l-0.3,0.34l0.35,2.89l-0.83,-0.47l-1.56,-1.43l-0.29,-0.07l-2.26,0.67l-1.02,-0.15l0.68,-0.48l0.1,-0.12l2.14,-4.84l3.25,-1.35Z", "name": "Netherlands"}, "NO": {"path": "M491.45,67.31l7.06,3.0l-2.52,0.94l-0.11,0.49l2.43,2.49l-3.82,1.59l-1.48,0.3l0.89,-2.61l-0.14,-0.36l-3.21,-1.78l-0.25,-0.02l-3.89,1.52l-0.17,0.17l-1.2,3.17l-2.19,1.78l-2.53,-0.99l-0.13,-0.02l-3.15,0.21l-2.69,-2.25l-0.38,-0.01l-1.43,1.11l-1.47,0.17l-0.26,0.26l-0.33,2.57l-4.42,-0.65l-0.33,0.22l-0.6,2.19l-2.17,-0.01l-0.27,0.16l-4.15,7.68l-3.88,5.76l-0.0,0.33l0.81,1.23l-0.7,1.27l-2.3,-0.06l-0.28,0.18l-1.63,3.72l-0.02,0.13l0.15,5.17l0.07,0.18l1.51,1.84l-0.79,4.24l-2.04,2.5l-0.92,1.75l-1.39,-1.88l-0.44,-0.05l-4.89,4.21l-3.16,0.81l-3.24,-1.74l-0.86,-3.82l-0.78,-8.6l2.18,-2.36l6.56,-3.28l5.0,-4.16l4.63,-5.74l5.99,-8.09l4.17,-3.23l6.84,-5.49l5.39,-1.92l4.06,0.24l0.23,-0.09l3.72,-3.67l4.51,0.19l4.4,-0.89ZM484.58,19.95l4.42,1.82l-3.25,2.68l-7.14,0.65l-7.16,-0.91l-0.39,-1.37l-0.28,-0.22l-3.48,-0.1l-2.25,-2.15l7.09,-1.48l3.55,1.36l0.28,-0.03l2.42,-1.66l6.18,1.41ZM481.99,33.92l-4.73,1.85l-3.76,-1.06l1.27,-1.02l0.04,-0.43l-1.18,-1.35l4.46,-0.94l0.89,1.83l0.17,0.15l2.83,0.96ZM466.5,23.95l7.64,3.87l-5.63,1.94l-0.19,0.19l-1.35,3.88l-2.08,0.96l-0.16,0.19l-1.14,4.18l-2.71,0.18l-4.94,-2.95l1.95,-1.63l-0.08,-0.51l-3.7,-1.54l-4.79,-4.54l-1.78,-4.01l6.29,-1.88l1.25,1.81l0.25,0.13l3.57,-0.08l0.26,-0.17l0.87,-1.79l3.41,-0.18l3.08,1.94Z", "name": "Norway"}, "NA": {"path": "M461.88,357.98l-1.61,-1.77l-0.94,-1.9l-0.54,-2.58l-0.62,-1.95l-0.83,-4.05l-0.06,-3.13l-0.33,-1.5l-0.07,-0.14l-0.95,-1.06l-1.27,-2.12l-1.3,-3.1l-0.59,-1.71l-1.98,-2.46l-0.13,-1.67l0.99,-0.4l1.44,-0.42l1.48,0.07l1.42,1.11l0.31,0.03l0.32,-0.15l9.99,-0.11l1.66,1.18l0.16,0.06l6.06,0.37l4.69,-1.06l2.01,-0.57l1.5,0.14l0.63,0.37l-1.0,0.41l-0.7,0.01l-0.16,0.05l-1.38,0.88l-0.79,-0.88l-0.29,-0.09l-3.83,0.9l-1.84,0.08l-0.29,0.3l-0.07,8.99l-2.18,0.08l-0.29,0.3l-0.0,17.47l-2.04,1.27l-1.21,0.18l-1.51,-0.49l-0.99,-0.18l-0.36,-1.0l-0.1,-0.14l-0.99,-0.74l-0.4,0.04l-0.98,1.09Z", "name": "Namibia"}, "NC": {"path": "M835.87,338.68l2.06,1.63l1.01,0.94l-0.49,0.32l-1.21,-0.62l-1.76,-1.16l-1.58,-1.36l-1.61,-1.79l-0.16,-0.41l0.54,0.02l1.32,0.83l1.08,0.87l0.79,0.73Z", "name": "New Caledonia"}, "NE": {"path": "M426.67,254.17l0.03,-1.04l-0.24,-0.3l-2.66,-0.53l-0.06,-1.0l-0.07,-0.17l-1.37,-1.62l-0.3,-1.04l0.15,-0.94l1.37,-0.09l0.19,-0.09l0.85,-0.83l3.34,-0.22l2.22,-0.41l0.24,-0.26l0.2,-1.5l1.32,-1.65l0.07,-0.19l-0.01,-5.74l3.4,-1.13l7.24,-5.12l8.46,-4.95l3.76,1.08l1.35,1.39l0.36,0.05l1.39,-0.77l0.55,3.66l0.12,0.2l0.82,0.6l0.03,0.69l0.1,0.21l0.87,0.74l-0.47,0.99l-0.96,5.26l-0.13,3.25l-3.08,2.34l-0.1,0.15l-1.08,3.37l0.08,0.31l0.94,0.86l-0.01,1.51l0.29,0.3l1.25,0.05l-0.14,0.66l-0.51,0.11l-0.24,0.26l-0.06,0.57l-0.04,0.0l-1.59,-2.62l-0.21,-0.14l-0.59,-0.1l-0.23,0.05l-1.83,1.33l-1.79,-0.68l-1.42,-0.17l-0.17,0.03l-0.65,0.32l-1.39,-0.07l-0.19,0.06l-1.4,1.03l-1.12,0.05l-2.97,-1.29l-0.26,0.01l-1.12,0.59l-1.08,-0.04l-0.85,-0.88l-0.11,-0.07l-2.51,-0.95l-0.14,-0.02l-2.69,0.3l-0.16,0.07l-0.65,0.55l-0.1,0.16l-0.34,1.41l-0.69,0.98l-0.05,0.15l-0.13,1.72l-1.47,-1.13l-0.18,-0.06l-0.9,0.01l-0.2,0.08l-0.32,0.28Z", "name": "Niger"}, "NG": {"path": "M442.0,272.7l-2.4,0.83l-0.88,-0.12l-0.19,0.04l-0.89,0.52l-1.78,-0.05l-1.23,-1.44l-0.88,-1.87l-1.77,-1.66l-0.21,-0.08l-3.78,0.03l0.13,-3.75l-0.06,-1.58l0.44,-1.47l0.74,-0.75l1.21,-1.56l0.04,-0.29l-0.22,-0.56l0.44,-0.9l0.01,-0.24l-0.54,-1.44l0.26,-2.97l0.72,-1.06l0.33,-1.37l0.51,-0.43l2.53,-0.28l2.38,0.9l0.89,0.91l0.2,0.09l1.28,0.04l0.15,-0.03l1.06,-0.56l2.9,1.26l0.13,0.02l1.28,-0.06l0.16,-0.06l1.39,-1.02l1.36,0.07l0.15,-0.03l0.64,-0.32l1.22,0.13l1.9,0.73l0.28,-0.04l1.86,-1.35l0.33,0.06l1.62,2.67l0.29,0.14l0.32,-0.04l0.73,0.74l-0.19,0.37l-0.12,0.74l-2.03,1.89l-0.07,0.11l-0.66,1.62l-0.35,1.28l-0.48,0.51l-0.07,0.12l-0.48,1.67l-1.26,0.98l-0.1,0.15l-0.38,1.24l-0.58,1.07l-0.2,0.91l-1.43,0.7l-1.26,-0.93l-0.19,-0.06l-0.95,0.04l-0.2,0.09l-1.41,1.39l-0.61,0.02l-0.26,0.17l-1.19,2.42l-0.61,1.67Z", "name": "Nigeria"}, "NZ": {"path": "M857.9,379.62l1.85,3.1l0.33,0.14l0.22,-0.28l0.04,-1.41l0.57,0.4l0.35,2.06l0.17,0.22l2.02,0.94l1.78,0.26l0.22,-0.06l1.31,-1.01l0.84,0.22l-0.53,2.27l-0.67,1.5l-1.71,-0.05l-0.25,0.12l-0.67,0.89l-0.05,0.23l0.21,1.15l-0.31,0.46l-2.15,3.57l-1.6,0.99l-0.28,-0.51l-0.15,-0.13l-0.72,-0.3l1.27,-2.15l0.01,-0.29l-0.82,-1.63l-0.15,-0.14l-2.5,-1.09l0.05,-0.69l1.67,-0.94l0.15,-0.21l0.42,-2.24l-0.11,-1.95l-0.03,-0.12l-0.97,-1.85l0.05,-0.41l-0.09,-0.25l-1.18,-1.17l-1.94,-2.49l-0.86,-1.64l0.38,-0.09l1.24,1.43l0.12,0.08l1.81,0.68l0.67,2.39ZM853.93,393.55l0.57,1.24l0.44,0.12l1.51,-1.03l0.52,0.91l0.0,1.09l-0.88,1.31l-1.62,2.2l-1.26,1.2l-0.05,0.38l0.64,1.02l-1.4,0.03l-0.14,0.04l-2.14,1.16l-0.14,0.17l-0.67,2.0l-1.38,3.06l-3.07,2.19l-2.12,-0.06l-1.55,-0.99l-0.14,-0.05l-2.53,-0.2l-0.31,-0.84l1.25,-2.15l3.07,-2.97l1.62,-0.59l1.81,-1.17l2.18,-1.63l1.55,-1.65l1.08,-2.18l0.9,-0.72l0.11,-0.17l0.35,-1.56l1.37,-1.07l0.4,0.91Z", "name": "New Zealand"}, "NP": {"path": "M641.26,213.53l-0.14,0.95l0.32,1.64l-0.21,0.78l-1.83,0.04l-2.98,-0.62l-1.86,-0.25l-1.37,-1.3l-0.18,-0.08l-3.38,-0.34l-3.21,-1.49l-2.38,-1.34l-2.16,-0.92l0.84,-2.2l1.51,-1.18l0.89,-0.57l1.83,0.77l2.5,1.76l1.39,0.41l0.78,1.21l0.17,0.13l1.91,0.53l2.0,1.17l2.92,0.66l2.63,0.24Z", "name": "Nepal"}, "CI": {"path": "M413.53,272.08l-0.83,0.02l-1.79,-0.49l-1.64,0.03l-3.04,0.46l-1.73,0.72l-2.4,0.89l-0.12,-0.02l0.16,-1.7l0.19,-0.25l0.06,-0.2l-0.08,-0.99l-0.09,-0.19l-1.06,-1.05l-0.15,-0.08l-0.71,-0.15l-0.51,-0.48l0.45,-0.92l0.02,-0.19l-0.24,-1.16l0.07,-0.43l0.14,-0.0l0.3,-0.26l0.15,-1.1l-0.02,-0.15l-0.13,-0.34l0.09,-0.13l0.83,-0.27l0.19,-0.37l-0.62,-2.02l-0.55,-1.0l0.14,-0.59l0.35,-0.14l0.24,-0.16l0.53,0.29l0.14,0.04l1.93,0.02l0.26,-0.14l0.36,-0.58l0.39,0.01l0.43,-0.17l0.28,0.79l0.43,0.16l0.56,-0.31l0.89,-0.32l0.92,0.45l0.39,0.75l0.14,0.13l1.13,0.53l0.3,-0.03l0.81,-0.59l1.02,-0.08l1.49,0.57l0.62,3.33l-1.03,2.09l-0.65,2.84l0.02,0.2l1.05,2.08l-0.07,0.64Z", "name": "Ivory Coast"}, "CH": {"path": "M444.71,156.27l0.05,0.3l-0.34,0.69l0.13,0.4l1.13,0.58l1.07,0.1l-0.12,0.81l-0.87,0.42l-1.75,-0.37l-0.34,0.18l-0.47,1.1l-0.86,0.07l-0.33,-0.38l-0.41,-0.04l-1.34,1.01l-1.02,0.13l-0.93,-0.58l-0.82,-1.32l-0.37,-0.12l-0.77,0.32l0.02,-0.84l1.74,-1.69l0.09,-0.25l-0.04,-0.38l0.73,0.19l0.26,-0.06l0.6,-0.48l2.02,0.02l0.24,-0.12l0.38,-0.51l2.31,0.84Z", "name": "Switzerland"}, "CO": {"path": "M232.24,284.95l-0.94,-0.52l-1.22,-0.82l-0.31,-0.01l-0.62,0.35l-1.88,-0.31l-0.54,-0.95l-0.29,-0.15l-0.37,0.03l-2.34,-1.33l-0.15,-0.35l0.57,-0.11l0.24,-0.32l-0.1,-1.15l0.46,-0.71l1.11,-0.15l0.21,-0.13l1.05,-1.57l0.95,-1.31l-0.08,-0.43l-0.73,-0.47l0.4,-1.24l0.01,-0.16l-0.53,-2.15l0.44,-0.54l0.06,-0.24l-0.4,-2.13l-0.06,-0.13l-0.93,-1.22l0.21,-0.8l0.52,0.12l0.32,-0.13l0.47,-0.75l0.03,-0.27l-0.52,-1.32l0.09,-0.11l1.14,0.07l0.22,-0.08l1.82,-1.71l0.96,-0.25l0.22,-0.28l0.02,-0.81l0.43,-2.01l1.28,-1.04l1.48,-0.05l0.27,-0.19l0.12,-0.31l1.73,0.19l0.2,-0.05l1.96,-1.28l0.97,-0.56l1.16,-1.16l0.64,0.11l0.43,0.44l-0.31,0.55l-1.49,0.39l-0.19,0.16l-0.6,1.2l-0.97,0.74l-0.73,0.94l-0.06,0.13l-0.3,1.76l-0.68,1.44l0.23,0.43l1.1,0.14l0.27,0.97l0.08,0.13l0.49,0.49l0.17,0.85l-0.27,0.86l-0.01,0.14l0.09,0.53l0.2,0.23l0.52,0.18l0.54,0.79l0.27,0.13l3.18,-0.24l1.31,0.29l1.7,2.08l0.31,0.1l0.96,-0.26l1.75,0.13l1.41,-0.27l0.56,0.27l-0.36,1.07l-0.54,0.81l-0.05,0.13l-0.2,1.8l0.51,1.79l0.07,0.12l0.65,0.68l0.05,0.32l-1.16,1.14l0.05,0.47l0.86,0.52l0.6,0.79l0.31,1.01l-0.7,-0.81l-0.44,-0.01l-0.74,0.77l-4.75,-0.05l-0.3,0.31l0.03,1.57l0.25,0.29l1.2,0.21l-0.02,0.24l-0.1,-0.05l-0.22,-0.02l-1.41,0.41l-0.22,0.29l-0.01,1.82l0.11,0.23l1.04,0.85l0.35,1.3l-0.06,1.02l-1.02,6.26l-0.84,-0.89l-0.19,-0.09l-0.25,-0.02l1.35,-2.13l-0.1,-0.42l-1.92,-1.17l-0.2,-0.04l-1.41,0.2l-0.82,-0.39l-0.26,0.0l-1.29,0.62l-1.63,-0.27l-1.4,-2.5l-0.12,-0.12l-1.1,-0.61l-0.83,-1.2l-1.67,-1.19l-0.27,-0.04l-0.54,0.19Z", "name": "Colombia"}, "CN": {"path": "M740.32,148.94l0.22,0.21l4.3,1.03l2.84,2.2l0.99,2.92l0.28,0.2l3.8,0.0l0.15,-0.04l2.13,-1.24l3.5,-0.8l-1.05,2.29l-0.95,1.13l-0.06,0.12l-0.85,3.41l-1.56,2.81l-2.83,-0.51l-0.19,0.03l-2.15,1.09l-0.15,0.34l0.65,2.59l-0.33,3.3l-1.03,0.07l-0.28,0.3l0.01,0.75l-1.09,-1.2l-0.48,0.05l-0.94,1.6l-3.76,1.26l-0.2,0.36l0.29,1.19l-1.67,-0.08l-1.11,-0.88l-0.42,0.05l-1.69,2.08l-2.71,1.57l-2.04,1.88l-3.42,0.84l-0.11,0.05l-1.8,1.34l-1.54,0.46l0.52,-0.53l0.06,-0.33l-0.44,-0.96l1.84,-1.84l0.02,-0.41l-1.32,-1.56l-0.36,-0.08l-2.23,1.08l-2.83,2.06l-1.52,1.85l-2.32,0.13l-0.2,0.09l-1.28,1.37l-0.03,0.37l1.32,1.97l0.18,0.13l1.83,0.43l0.07,1.08l0.18,0.26l1.98,0.84l0.3,-0.03l2.66,-1.96l2.06,1.04l0.12,0.03l1.4,0.07l0.27,1.0l-3.24,0.73l-0.17,0.11l-1.13,1.5l-2.38,1.4l-0.1,0.1l-1.29,1.99l0.1,0.42l2.6,1.5l0.97,2.72l1.52,2.56l1.66,2.08l-0.03,1.76l-1.4,0.67l-0.15,0.38l0.6,1.47l0.13,0.15l1.29,0.75l-0.35,2.0l-0.58,1.96l-1.22,0.21l-0.2,0.14l-1.83,2.93l-2.02,3.51l-2.29,3.13l-3.4,2.42l-3.42,2.18l-2.75,0.3l-0.15,0.06l-1.32,1.01l-0.68,-0.67l-0.41,-0.01l-1.37,1.27l-3.42,1.28l-2.62,0.4l-0.24,0.21l-0.8,2.57l-0.95,0.11l-0.53,-1.54l0.52,-0.89l-0.19,-0.44l-3.36,-0.84l-0.17,0.01l-1.09,0.4l-2.36,-0.64l-1.0,-0.9l0.35,-1.34l-0.23,-0.37l-2.22,-0.47l-1.15,-0.94l-0.36,-0.02l-2.08,1.37l-2.35,0.29l-1.98,-0.01l-0.13,0.03l-1.32,0.63l-1.28,0.38l-0.21,0.33l0.33,2.65l-0.78,-0.04l-0.14,-0.39l-0.07,-1.04l-0.41,-0.26l-1.72,0.71l-0.96,-0.43l-1.63,-0.86l0.65,-1.95l-0.19,-0.38l-1.43,-0.46l-0.56,-2.27l-0.34,-0.22l-2.26,0.38l0.25,-2.65l2.29,-2.15l0.09,-0.2l0.1,-2.21l-0.07,-2.09l-0.15,-0.25l-1.02,-0.6l-0.8,-1.52l-0.31,-0.16l-1.42,0.2l-2.16,-0.32l0.55,-0.74l0.01,-0.35l-1.17,-1.7l-0.41,-0.08l-1.67,1.07l-1.97,-0.63l-0.25,0.03l-2.89,1.73l-2.26,1.99l-1.82,0.3l-1.0,-0.66l-0.15,-0.05l-1.28,-0.06l-1.75,-0.61l-0.24,0.02l-1.35,0.69l-0.1,0.08l-1.2,1.45l-0.14,-1.41l-0.4,-0.25l-1.46,0.55l-2.83,-0.26l-2.77,-0.61l-1.99,-1.17l-1.91,-0.54l-0.78,-1.21l-0.17,-0.13l-1.36,-0.38l-2.54,-1.79l-2.01,-0.84l-0.28,0.02l-0.89,0.56l-3.31,-1.83l-2.35,-1.67l-0.57,-2.49l1.34,0.28l0.36,-0.28l0.08,-1.42l-0.05,-0.19l-0.93,-1.34l0.24,-2.18l-0.07,-0.22l-2.69,-3.32l-0.15,-0.1l-3.97,-1.11l-0.69,-2.05l-0.11,-0.15l-1.79,-1.3l-0.39,-0.73l-0.36,-1.57l0.08,-1.09l-0.18,-0.3l-1.52,-0.66l-0.22,-0.01l-0.51,0.18l-0.52,-2.21l0.59,-0.55l0.06,-0.35l-0.22,-0.44l2.12,-1.24l1.63,-0.55l2.58,0.39l0.31,-0.16l0.87,-1.75l3.05,-0.34l0.21,-0.12l0.84,-1.12l3.87,-1.59l0.15,-0.14l0.35,-0.68l0.03,-0.17l-0.17,-1.51l1.52,-0.7l0.15,-0.39l-2.12,-5.0l4.62,-1.15l1.35,-0.72l0.14,-0.17l1.72,-5.37l4.7,0.99l0.28,-0.08l1.39,-1.43l0.08,-0.2l0.11,-2.95l1.83,-0.26l0.18,-0.1l1.85,-2.08l0.61,-0.17l0.57,1.97l0.1,0.15l2.2,1.75l3.48,1.17l1.59,2.36l-0.93,3.53l0.04,0.24l0.9,1.35l0.2,0.13l2.98,0.53l3.32,0.43l2.97,1.89l1.49,0.35l1.08,2.67l1.52,1.88l0.24,0.11l2.74,-0.07l5.15,0.67l3.36,-0.41l2.39,0.43l3.67,1.81l0.13,0.03l2.92,-0.0l1.02,0.86l0.34,0.03l2.88,-1.59l3.98,-1.03l3.81,-0.13l3.02,-1.12l1.77,-1.61l1.73,-1.01l0.13,-0.37l-0.41,-1.01l-0.72,-1.07l1.09,-1.66l1.21,0.24l2.57,0.63l0.24,-0.04l2.46,-1.62l3.78,-1.19l0.13,-0.09l1.8,-2.03l1.66,-0.84l3.54,-0.41l1.93,0.35l0.34,-0.22l0.27,-1.12l-0.08,-0.29l-2.27,-2.22l-2.08,-1.07l-0.29,0.01l-1.82,1.12l-2.36,-0.47l-0.14,0.01l-1.18,0.34l-0.46,-0.94l1.69,-3.08l1.1,-2.21l2.75,1.12l0.26,-0.02l3.53,-2.06l0.15,-0.26l-0.02,-1.35l2.18,-3.39l1.35,-1.04l0.12,-0.24l-0.03,-1.85l-0.15,-0.25l-1.0,-0.58l1.68,-1.37l3.01,-0.59l3.25,-0.09l3.67,0.99l2.08,1.18l1.51,3.3l0.95,1.45l0.85,1.99l0.92,3.19ZM697.0,237.37l-1.95,1.12l-1.74,-0.68l-0.06,-1.9l1.08,-1.03l2.62,-0.7l1.23,0.05l0.37,0.65l-1.01,1.08l-0.54,1.4Z", "name": "China"}, "CM": {"path": "M453.76,278.92l-0.26,-0.11l-0.18,-0.02l-1.42,0.31l-1.56,-0.33l-1.17,0.16l-3.7,-0.05l0.3,-1.63l-0.04,-0.21l-0.98,-1.66l-0.15,-0.13l-1.03,-0.38l-0.46,-1.01l-0.13,-0.14l-0.48,-0.27l0.02,-0.46l0.62,-1.72l1.1,-2.25l0.54,-0.02l0.2,-0.09l1.41,-1.39l0.73,-0.03l1.32,0.97l0.31,0.03l1.72,-0.85l0.16,-0.2l0.22,-1.0l0.57,-1.03l0.36,-1.18l1.26,-0.98l0.1,-0.15l0.49,-1.7l0.48,-0.51l0.07,-0.13l0.35,-1.3l0.63,-1.54l2.06,-1.92l0.09,-0.17l0.12,-0.79l0.24,-0.41l-0.04,-0.36l-0.89,-0.91l0.04,-0.45l0.28,-0.06l0.85,1.39l0.16,1.59l-0.09,1.66l0.04,0.17l1.09,1.84l-0.86,-0.02l-0.72,0.17l-1.07,-0.24l-0.34,0.17l-0.54,1.19l0.06,0.34l1.48,1.47l1.06,0.44l0.32,0.94l0.73,1.6l-0.32,0.57l-1.23,2.49l-0.54,0.41l-0.12,0.21l-0.19,1.95l0.24,1.08l-0.18,0.67l0.07,0.28l1.13,1.25l0.24,0.93l0.92,1.29l1.1,0.8l0.1,1.01l0.26,0.73l-0.12,0.93l-1.65,-0.49l-2.02,-0.66l-3.19,-0.11Z", "name": "Cameroon"}, "CL": {"path": "M246.8,429.1l-1.14,0.78l-2.25,1.21l-0.16,0.23l-0.37,2.94l-0.75,0.06l-2.72,-1.07l-2.83,-2.34l-3.06,-1.9l-0.71,-1.92l0.67,-1.84l-0.02,-0.25l-1.22,-2.13l-0.31,-5.41l1.02,-2.95l2.59,-2.4l-0.13,-0.51l-3.32,-0.8l2.06,-2.4l0.07,-0.15l0.79,-4.77l2.44,0.95l0.4,-0.22l1.31,-6.31l-0.16,-0.33l-1.68,-0.8l-0.42,0.21l-0.72,3.47l-1.01,-0.27l0.74,-4.06l0.85,-5.46l1.12,-1.96l0.03,-0.22l-0.71,-2.82l-0.19,-2.94l0.76,-0.07l0.26,-0.2l1.53,-4.62l1.73,-4.52l1.07,-4.2l-0.56,-4.2l0.73,-2.2l0.01,-0.12l-0.29,-3.3l1.46,-3.34l0.45,-5.19l0.8,-5.52l0.78,-5.89l-0.18,-4.33l-0.49,-3.47l1.1,-0.56l0.13,-0.13l0.44,-0.88l0.9,1.29l0.32,1.8l0.1,0.18l1.16,0.97l-0.73,2.33l0.01,0.21l1.33,2.91l0.97,3.6l0.35,0.22l1.57,-0.31l0.16,0.34l-0.79,2.51l-2.61,1.25l-0.17,0.28l0.08,4.36l-0.48,0.79l0.01,0.33l0.6,0.84l-1.62,1.55l-1.67,2.6l-0.89,2.47l-0.02,0.13l0.23,2.56l-1.5,2.76l-0.03,0.21l1.15,4.8l0.11,0.17l0.54,0.42l-0.01,2.37l-1.4,2.7l-0.03,0.15l0.06,2.25l-1.8,1.78l-0.09,0.21l0.02,2.73l0.71,2.63l-1.33,0.94l-0.12,0.17l-0.67,2.64l-0.59,3.03l0.4,3.55l-0.84,0.51l-0.14,0.31l0.58,3.5l0.08,0.16l0.96,0.99l-0.7,1.08l0.11,0.43l1.04,0.55l0.19,0.8l-0.89,0.48l-0.16,0.31l0.26,1.77l-0.89,4.06l-1.31,2.67l-0.03,0.19l0.28,1.53l-0.73,1.88l-1.85,1.37l-0.12,0.26l0.22,3.46l0.06,0.16l0.88,1.19l0.28,0.12l1.32,-0.17l-0.04,2.13l0.04,0.15l1.04,1.95l0.24,0.16l5.94,0.44ZM248.79,430.71l0.0,7.41l0.3,0.3l2.67,0.0l1.01,0.06l-0.54,0.91l-1.99,1.01l-1.13,-0.1l-1.42,-0.27l-1.87,-1.06l-2.57,-0.49l-3.09,-1.9l-2.52,-1.83l-2.65,-2.93l0.93,0.32l3.54,2.29l3.32,1.23l0.34,-0.09l1.29,-1.57l0.83,-2.32l2.11,-1.28l1.43,0.32Z", "name": "Chile"}, "CA": {"path": "M280.14,145.66l-1.66,2.88l0.06,0.37l0.37,0.03l1.5,-1.01l1.17,0.49l-0.64,0.83l0.13,0.46l2.22,0.89l0.28,-0.03l1.02,-0.7l2.09,0.83l-0.69,2.1l0.37,0.38l1.43,-0.45l0.27,1.43l0.74,1.88l-0.95,2.5l-0.88,0.09l-1.34,-0.48l0.49,-2.34l-0.14,-0.32l-0.7,-0.4l-0.36,0.04l-2.81,2.66l-0.63,-0.05l1.2,-1.01l-0.1,-0.52l-2.4,-0.77l-2.79,0.18l-4.65,-0.09l-0.22,-0.54l1.37,-0.99l0.01,-0.48l-0.82,-0.65l1.91,-1.79l2.57,-5.17l1.49,-1.81l2.04,-1.07l0.63,0.08l-0.27,0.51l-1.33,2.07ZM193.92,74.85l-0.01,4.24l0.19,0.28l0.33,-0.07l3.14,-3.22l2.65,2.5l-0.71,3.04l0.06,0.26l2.42,2.88l0.46,0.0l2.66,-3.14l1.83,-3.74l0.03,-0.12l0.13,-4.53l3.23,0.31l3.63,0.64l3.18,2.08l0.13,1.91l-1.79,2.22l-0.0,0.37l1.69,2.2l-0.28,1.8l-4.74,2.84l-3.33,0.62l-2.5,-1.21l-0.41,0.17l-0.73,2.05l-2.39,3.44l-0.74,1.78l-2.78,2.61l-3.48,0.26l-0.17,0.07l-1.98,1.68l-0.1,0.21l-0.15,2.33l-2.68,0.45l-0.17,0.09l-3.1,3.2l-2.75,4.38l-0.99,3.06l-0.14,4.31l0.25,0.31l3.5,0.58l1.07,3.24l1.18,2.76l0.34,0.18l3.43,-0.69l4.55,1.52l2.45,1.32l1.76,1.65l0.12,0.07l3.11,0.96l2.63,1.46l0.13,0.04l4.12,0.2l2.41,0.3l-0.36,2.81l0.8,3.51l1.81,3.78l0.08,0.1l3.73,3.17l0.34,0.03l1.93,-1.08l0.13,-0.15l1.35,-3.44l0.01,-0.18l-1.31,-5.38l-0.08,-0.14l-1.46,-1.5l3.68,-1.51l2.84,-2.46l1.45,-2.55l0.04,-0.17l-0.2,-2.39l-0.04,-0.12l-1.7,-3.07l-2.9,-2.64l2.79,-3.66l0.05,-0.27l-1.08,-3.38l-0.8,-5.75l1.45,-0.75l4.18,1.03l2.6,0.38l0.18,-0.03l1.93,-0.95l2.18,1.23l3.01,2.18l0.73,1.42l0.25,0.16l4.18,0.27l-0.06,2.95l0.83,4.7l0.22,0.24l2.19,0.55l1.75,2.08l0.38,0.07l3.63,-2.03l0.11,-0.11l2.38,-4.06l1.36,-1.43l1.76,3.01l3.26,4.68l2.68,4.19l-0.94,2.09l0.12,0.38l3.31,1.98l2.23,1.98l0.13,0.07l3.94,0.89l1.48,1.02l0.96,2.82l0.22,0.2l1.85,0.43l0.88,1.13l0.17,3.53l-1.68,1.16l-1.76,1.14l-4.08,1.17l-0.11,0.06l-3.08,2.65l-4.11,0.52l-5.35,-0.69l-3.76,-0.02l-2.62,0.23l-0.2,0.1l-2.05,2.29l-3.13,1.41l-0.11,0.08l-3.6,4.24l-2.87,2.92l-0.05,0.36l0.33,0.14l2.13,-0.52l0.15,-0.08l3.98,-4.15l5.16,-2.63l3.58,-0.31l1.82,1.3l-2.09,1.91l-0.09,0.29l0.8,3.46l0.82,2.37l0.15,0.17l3.25,1.56l0.16,0.03l4.14,-0.45l0.21,-0.12l2.03,-2.86l0.11,1.46l0.13,0.22l1.26,0.88l-2.7,1.78l-5.51,1.83l-2.52,1.26l-2.75,2.16l-1.52,-0.18l-0.08,-2.16l4.19,-2.47l0.14,-0.34l-0.3,-0.22l-4.01,0.1l-2.66,0.36l-1.45,-1.56l0.0,-4.16l-0.11,-0.23l-1.11,-0.91l-0.28,-0.05l-1.5,0.48l-0.7,-0.7l-0.45,0.02l-1.91,2.39l-0.8,2.5l-0.82,1.31l-0.95,0.43l-0.77,0.15l-0.23,0.2l-0.18,0.56l-8.2,0.02l-0.13,0.03l-1.19,0.61l-2.95,2.45l-0.78,1.13l-4.6,0.01l-0.12,0.02l-1.13,0.48l-0.13,0.44l0.37,0.55l0.2,0.82l-0.01,0.09l-3.1,1.42l-2.63,0.5l-2.84,1.57l-0.47,0.0l-0.72,-0.4l-0.18,-0.27l0.03,-0.15l0.52,-1.0l1.2,-1.71l0.73,-1.8l0.02,-0.17l-1.03,-5.47l-0.15,-0.21l-2.35,-1.32l0.16,-0.29l-0.05,-0.35l-0.37,-0.38l-0.22,-0.09l-0.56,0.0l-0.35,-0.34l-0.11,-0.65l-0.46,-0.2l-0.39,0.26l-0.2,-0.03l-0.11,-0.33l-0.48,-0.25l-0.21,-0.71l-0.15,-0.18l-3.97,-2.07l-4.8,-2.39l-0.25,-0.01l-2.19,0.89l-0.72,0.03l-3.04,-0.82l-0.14,-0.0l-1.94,0.4l-2.4,-0.98l-2.56,-0.51l-1.7,-0.19l-0.62,-0.44l-0.42,-1.67l-0.3,-0.23l-0.85,0.02l-0.29,0.3l-0.01,0.95l-69.26,-0.01l-4.77,-3.14l-1.78,-1.41l-4.51,-1.38l-1.3,-2.73l0.34,-1.96l-0.17,-0.33l-3.06,-1.37l-0.41,-2.58l-0.11,-0.18l-2.92,-2.4l-0.05,-1.53l1.32,-1.59l0.07,-0.2l-0.07,-2.21l-0.16,-0.26l-4.19,-2.22l-2.52,-4.02l-1.56,-2.6l-0.08,-0.09l-2.28,-1.64l-1.65,-1.48l-1.31,-1.89l-0.38,-0.1l-2.51,1.21l-2.28,1.92l-2.03,-2.22l-1.85,-1.71l-2.44,-1.04l-2.28,-0.12l0.03,-37.72l4.27,0.98l4.0,2.13l2.61,0.4l0.24,-0.07l2.17,-1.81l2.92,-1.33l3.63,0.53l0.18,-0.03l3.72,-1.94l3.89,-1.06l1.6,1.72l0.37,0.06l1.87,-1.04l0.14,-0.19l0.48,-1.83l1.37,0.38l4.18,3.96l0.41,0.0l2.89,-2.62l0.28,2.79l0.37,0.26l3.08,-0.73l0.17,-0.12l0.85,-1.16l2.81,0.24l3.83,1.86l5.86,1.61l3.46,0.75l2.44,-0.26l2.89,1.89l-3.12,1.89l-0.14,0.31l0.24,0.24l4.53,0.92l6.84,-0.5l2.04,-0.71l2.54,2.44l0.39,0.02l2.72,-2.16l-0.01,-0.48l-2.26,-1.61l1.27,-1.16l2.94,-0.19l1.94,-0.42l1.89,0.97l2.49,2.32l0.24,0.08l2.71,-0.33l4.35,1.9l0.17,0.02l3.86,-0.67l3.62,0.1l0.31,-0.33l-0.26,-2.44l1.9,-0.65l3.58,1.36l-0.01,3.84l0.23,0.29l0.34,-0.17l1.51,-3.23l1.81,0.1l0.31,-0.22l1.13,-4.37l-0.08,-0.29l-2.68,-2.73l-2.83,-1.76l0.19,-4.73l2.77,-3.15l3.06,0.69l2.44,1.97l3.24,4.88l-2.05,2.02l0.15,0.51l4.41,0.85ZM265.85,150.7l-0.84,0.04l-3.15,-0.99l-1.77,-1.17l0.19,-0.06l3.17,0.79l2.39,1.27l0.01,0.12ZM249.41,3.71l6.68,0.49l5.34,0.79l4.34,1.6l-0.08,1.24l-5.91,2.56l-6.03,1.21l-2.36,1.38l-0.14,0.34l0.29,0.22l4.37,-0.02l-4.96,3.01l-4.06,1.64l-0.11,0.08l-4.21,4.62l-5.07,0.92l-0.12,0.05l-1.53,1.1l-7.5,0.59l-0.28,0.28l0.24,0.31l2.67,0.54l-1.04,0.6l-0.09,0.44l1.89,2.49l-2.11,1.66l-3.83,1.52l-0.15,0.13l-1.14,2.01l-3.41,1.55l-0.16,0.36l0.35,1.19l0.3,0.22l3.98,-0.19l0.03,0.78l-6.42,2.99l-6.44,-1.41l-7.41,0.79l-3.72,-0.62l-4.48,-0.26l-0.25,-2.0l4.37,-1.13l0.21,-0.38l-1.14,-3.55l1.13,-0.28l6.61,2.29l0.35,-0.12l-0.04,-0.37l-3.41,-3.45l-0.14,-0.08l-3.57,-0.92l1.62,-1.7l4.36,-1.3l0.2,-0.18l0.71,-1.94l-0.12,-0.36l-3.45,-2.15l-0.88,-2.43l6.36,0.23l1.94,0.61l0.23,-0.02l3.91,-2.1l0.15,-0.32l-0.26,-0.24l-5.69,-0.67l-8.69,0.37l-4.3,-1.92l-2.12,-2.39l-2.82,-1.68l-0.44,-1.65l3.41,-1.06l2.93,-0.2l4.91,-0.99l3.69,-2.28l2.93,0.31l2.64,1.68l0.42,-0.1l1.84,-3.23l3.17,-0.96l4.45,-0.69l7.56,-0.26l1.26,0.64l0.18,0.03l7.2,-1.06l10.81,0.8ZM203.94,57.59l0.01,0.32l1.97,2.97l0.51,-0.01l2.26,-3.75l6.05,-1.89l4.08,4.72l-0.36,2.95l0.38,0.33l4.95,-1.36l0.11,-0.05l2.23,-1.77l5.37,2.31l3.32,2.14l0.3,1.89l0.36,0.25l4.48,-1.01l2.49,2.8l0.14,0.09l5.99,1.78l2.09,1.74l2.18,3.83l-4.29,1.91l-0.01,0.54l5.9,2.83l3.95,0.94l3.54,3.84l0.2,0.1l3.58,0.25l-0.67,2.51l-4.18,4.54l-2.84,-1.61l-3.91,-3.95l-0.26,-0.09l-3.24,0.52l-0.25,0.26l-0.32,2.37l0.1,0.26l2.63,2.38l3.42,1.89l0.96,1.0l1.57,3.8l-0.74,2.43l-2.85,-0.96l-6.26,-3.15l-0.38,0.09l0.04,0.39l3.54,3.4l2.55,2.31l0.23,0.78l-6.26,-1.43l-5.33,-2.25l-2.73,-1.73l0.67,-0.86l-0.09,-0.45l-7.38,-4.01l-0.44,0.27l0.03,0.89l-6.85,0.61l-1.8,-1.17l1.43,-2.6l4.56,-0.07l5.15,-0.52l0.23,-0.45l-0.76,-1.34l0.8,-1.89l3.21,-4.06l0.05,-0.29l-0.72,-1.95l-0.97,-1.47l-0.11,-0.1l-3.84,-2.1l-4.53,-1.33l1.09,-0.75l0.05,-0.45l-2.65,-2.75l-0.18,-0.09l-2.12,-0.24l-1.91,-1.47l-0.39,0.02l-1.27,1.25l-4.4,0.56l-9.06,-0.99l-5.28,-1.31l-4.01,-0.67l-1.72,-1.31l2.32,-1.85l0.1,-0.33l-0.28,-0.2l-3.3,-0.02l-0.74,-4.36l1.86,-4.09l2.46,-1.88l5.74,-1.15l-1.5,2.55ZM261.28,159.28l0.19,0.14l1.82,0.42l1.66,-0.05l-0.66,0.68l-0.75,0.16l-3.0,-1.25l-0.46,-0.77l0.51,-0.52l0.68,1.19ZM230.87,84.48l-2.48,0.19l-0.52,-1.74l0.96,-2.17l2.03,-0.53l1.71,1.04l0.02,1.6l-0.22,0.46l-1.5,1.16ZM229.52,58.19l0.14,0.82l-4.99,-0.22l-2.73,0.63l-0.59,-0.23l-2.61,-2.4l0.08,-1.38l0.94,-0.25l5.61,0.51l4.14,2.54ZM222.12,105.0l-0.79,1.63l-0.75,-0.22l-0.52,-0.91l0.04,-0.09l0.84,-1.01l0.74,0.06l0.44,0.55ZM183.77,38.22l2.72,1.65l0.16,0.04l4.83,-0.01l1.92,1.52l-0.51,1.75l0.18,0.36l2.84,1.14l1.56,1.19l0.16,0.06l3.37,0.22l3.65,0.42l4.07,-1.1l5.05,-0.43l3.96,0.35l2.53,1.8l0.48,1.79l-1.37,1.16l-3.6,1.03l-3.22,-0.59l-7.17,0.76l-5.1,0.09l-4.0,-0.6l-6.48,-1.56l-0.81,-2.57l-0.3,-2.49l-0.1,-0.19l-2.51,-2.25l-0.16,-0.07l-5.12,-0.63l-2.61,-1.45l0.75,-1.71l4.88,0.32ZM207.46,91.26l0.42,1.62l0.42,0.19l1.12,-0.55l1.35,0.99l2.74,1.39l2.73,1.2l0.2,1.74l0.35,0.26l1.72,-0.29l1.31,0.97l-1.72,0.96l-3.68,-0.9l-1.34,-1.71l-0.43,-0.04l-2.46,2.1l-3.23,1.85l-0.74,-1.98l-0.31,-0.19l-2.47,0.28l1.49,-1.34l0.1,-0.19l0.32,-3.15l0.79,-3.45l1.34,0.25ZM215.59,102.66l-2.73,2.0l-1.49,-0.08l-0.37,-0.7l1.61,-1.56l3.0,0.03l-0.02,0.3ZM202.79,24.07l0.11,0.12l2.54,1.53l-3.01,1.47l-4.55,4.07l-4.3,0.38l-5.07,-0.68l-2.51,-2.09l0.03,-1.72l1.86,-1.4l0.1,-0.34l-0.29,-0.2l-4.49,0.04l-2.63,-1.79l-1.45,-2.36l1.61,-2.38l1.65,-1.69l2.47,-0.4l0.19,-0.48l-0.72,-0.89l5.1,-0.26l3.1,3.05l0.13,0.07l4.21,1.25l3.99,1.06l1.92,3.65ZM187.5,59.3l-0.15,0.1l-2.59,3.4l-2.5,-0.15l-1.47,-3.92l0.04,-2.24l1.22,-1.92l2.34,-1.26l5.11,0.17l4.28,1.06l-3.36,3.86l-2.9,0.9ZM186.19,48.8l-1.15,1.63l-3.42,-0.35l-2.68,-1.15l1.11,-1.88l3.34,-1.27l2.01,1.63l0.79,1.38ZM185.78,35.41l-0.95,0.13l-4.48,-0.33l-0.4,-0.91l4.5,0.07l1.45,0.82l-0.1,0.21ZM180.76,32.56l-3.43,1.03l-1.85,-1.14l-1.01,-1.92l-0.16,-1.87l2.87,0.2l1.39,0.35l2.75,1.75l-0.55,1.6ZM181.03,76.32l-1.21,1.2l-3.19,-1.26l-0.18,-0.01l-1.92,0.45l-2.88,-1.67l1.84,-1.16l1.6,-1.77l2.45,1.17l1.45,0.77l2.05,2.28ZM169.72,54.76l2.83,0.97l0.14,0.01l4.25,-0.58l0.47,1.01l-2.19,2.16l0.07,0.48l3.61,1.95l-0.41,3.84l-3.87,1.68l-2.23,-0.36l-1.73,-1.75l-6.07,-3.53l0.03,-1.01l4.79,0.55l0.3,-0.16l-0.04,-0.34l-2.55,-2.89l2.59,-2.05ZM174.44,40.56l1.49,1.87l0.07,2.48l-1.07,3.52l-3.87,0.48l-2.41,-0.72l0.05,-2.72l-0.33,-0.3l-3.79,0.36l-0.13,-3.31l2.36,0.14l0.15,-0.03l3.7,-1.74l3.44,0.29l0.31,-0.22l0.03,-0.12ZM170.14,31.5l0.75,1.74l-3.52,-0.52l-4.19,-1.77l-4.65,-0.17l1.65,-1.11l-0.05,-0.52l-2.86,-1.26l-0.13,-1.58l4.52,0.7l6.66,1.99l1.84,2.5ZM134.64,58.08l-1.08,1.93l0.34,0.44l5.44,-1.41l3.37,2.32l0.37,-0.02l2.66,-2.28l2.03,1.38l2.01,4.53l0.53,0.04l1.26,-1.93l0.03,-0.27l-1.67,-4.55l1.82,-0.58l2.36,0.73l2.69,1.84l1.53,4.46l0.77,3.24l0.15,0.19l4.22,2.26l4.32,2.04l-0.21,1.51l-3.87,0.34l-0.19,0.5l1.45,1.54l-0.65,1.23l-4.3,-0.65l-4.4,-1.19l-2.97,0.28l-4.67,1.48l-6.31,0.65l-4.27,0.39l-1.26,-1.91l-0.15,-0.12l-3.42,-1.2l-0.16,-0.01l-2.05,0.45l-2.66,-3.02l1.2,-0.34l3.82,-0.76l3.58,0.19l3.27,-0.78l0.23,-0.29l-0.24,-0.29l-4.84,-1.06l-5.42,0.35l-3.4,-0.09l-0.97,-1.22l5.39,-1.7l0.21,-0.33l-0.3,-0.25l-3.82,0.06l-3.95,-1.1l1.88,-3.13l1.68,-1.81l6.54,-2.84l2.11,0.77ZM158.85,56.58l-1.82,2.62l-3.38,-2.9l0.49,-0.39l3.17,-0.18l1.54,0.86ZM149.71,42.7l1.0,1.87l0.37,0.14l2.17,-0.83l2.33,0.2l0.38,2.16l-1.38,2.17l-8.33,0.76l-6.34,2.15l-3.51,0.1l-0.22,-1.13l4.98,-2.12l0.17,-0.34l-0.31,-0.23l-11.27,0.6l-3.04,-0.78l3.14,-4.57l2.2,-1.35l6.87,1.7l4.4,3.0l0.14,0.05l4.37,0.39l0.27,-0.48l-3.41,-4.68l1.96,-1.62l2.28,0.53l0.79,2.32ZM145.44,29.83l-2.18,0.77l-3.79,-0.0l0.02,-0.31l2.34,-1.5l1.2,0.23l2.42,0.83ZM144.83,34.5l-4.44,1.46l-3.18,-1.48l1.6,-1.36l3.51,-0.53l3.1,0.75l-0.6,1.16ZM119.02,65.87l-6.17,2.07l-1.19,-1.82l-0.13,-0.11l-5.48,-2.32l0.92,-1.7l1.73,-3.44l2.16,-3.15l-0.02,-0.36l-2.09,-2.56l7.84,-0.71l3.59,1.02l6.32,0.27l2.35,1.37l2.25,1.71l-2.68,1.04l-6.21,3.41l-3.1,3.28l-0.08,0.21l0.0,1.81ZM129.66,35.4l-0.3,3.55l-1.77,1.67l-2.34,0.27l-4.62,2.2l-3.89,0.76l-2.83,-0.93l3.85,-3.52l5.04,-3.36l3.75,0.07l3.11,-0.7ZM111.24,152.74l-0.82,0.29l-3.92,-1.39l-0.7,-1.06l-0.12,-0.1l-2.15,-1.09l-0.41,-0.84l-0.2,-0.16l-2.44,-0.56l-0.84,-1.56l0.1,-0.36l2.34,0.64l1.53,0.5l2.28,0.34l0.78,1.04l1.24,1.55l0.09,0.08l2.42,1.3l0.81,1.39ZM88.54,134.82l0.14,0.02l2.0,-0.23l-0.67,3.48l0.06,0.24l1.78,2.22l-0.24,-0.0l-1.4,-1.42l-0.91,-1.53l-1.26,-1.08l-0.42,-1.35l0.09,-0.66l0.82,0.31Z", "name": "Canada"}, "CG": {"path": "M453.66,296.61l-0.9,-0.82l-0.35,-0.04l-0.83,0.48l-0.77,0.83l-1.65,-2.13l1.66,-1.2l0.08,-0.39l-0.81,-1.43l0.59,-0.43l1.62,-0.29l0.24,-0.24l0.1,-0.58l0.94,0.84l0.19,0.08l2.21,0.11l0.27,-0.14l0.81,-1.29l0.32,-1.76l-0.27,-1.96l-0.06,-0.15l-1.08,-1.35l1.02,-2.74l-0.09,-0.34l-0.62,-0.5l-0.22,-0.06l-1.66,0.18l-0.55,-1.03l0.12,-0.73l2.85,0.09l1.98,0.65l2.0,0.59l0.38,-0.25l0.17,-1.3l1.26,-2.24l1.34,-1.19l1.54,0.38l1.35,0.12l-0.11,1.15l-0.74,1.34l-0.5,1.61l-0.31,2.22l0.12,1.41l-0.4,0.9l-0.06,0.88l-0.24,0.67l-1.57,1.15l-1.24,1.41l-1.09,2.43l-0.03,0.13l0.08,1.95l-0.55,0.69l-1.46,1.23l-1.32,1.41l-0.61,-0.29l-0.13,-0.57l-0.29,-0.23l-1.36,-0.02l-0.23,0.1l-0.72,0.81l-0.41,-0.16Z", "name": "Republic of the Congo"}, "CF": {"path": "M459.41,266.56l1.9,-0.17l0.22,-0.12l0.36,-0.5l0.14,0.02l0.55,0.51l0.29,0.07l3.15,-0.96l0.12,-0.07l1.05,-0.97l1.29,-0.87l0.12,-0.33l-0.17,-0.61l0.38,-0.12l2.36,0.15l0.15,-0.03l2.36,-1.17l0.12,-0.1l1.78,-2.72l1.18,-0.96l1.23,-0.34l0.21,0.79l0.07,0.13l1.37,1.5l0.01,0.86l-0.39,1.0l-0.01,0.17l0.16,0.78l0.1,0.17l0.91,0.76l1.89,1.09l1.24,0.92l0.02,0.67l0.12,0.23l1.67,1.3l0.99,1.03l0.61,1.46l0.14,0.15l1.79,0.95l0.2,0.4l-0.44,0.14l-1.54,-0.06l-1.98,-0.26l-0.93,0.22l-0.19,0.14l-0.3,0.48l-0.57,0.05l-0.91,-0.49l-0.26,-0.01l-2.7,1.21l-1.04,-0.23l-0.21,0.03l-0.34,0.19l-0.12,0.13l-0.64,1.3l-1.67,-0.43l-1.77,-0.24l-1.58,-0.91l-2.06,-0.85l-0.27,0.02l-1.42,0.88l-0.97,1.27l-0.06,0.14l-0.19,1.46l-1.3,-0.11l-1.67,-0.42l-0.27,0.07l-1.55,1.41l-0.99,1.76l-0.14,-1.18l-0.13,-0.22l-1.1,-0.78l-0.86,-1.2l-0.2,-0.84l-0.07,-0.13l-1.07,-1.19l0.16,-0.59l0.0,-0.15l-0.24,-1.01l0.18,-1.77l0.5,-0.38l0.09,-0.11l1.18,-2.4Z", "name": "Central African Republic"}, "CD": {"path": "M497.85,276.25l-0.14,2.77l0.2,0.3l0.57,0.19l-0.47,0.52l-1.0,0.71l-0.96,1.31l-0.56,1.22l-0.16,2.04l-0.54,0.89l-0.04,0.15l-0.02,1.76l-0.63,0.61l-0.09,0.2l-0.08,1.33l-0.2,0.11l-0.15,0.21l-0.23,1.37l0.03,0.2l0.6,1.08l0.16,2.96l0.44,2.29l-0.24,1.25l0.01,0.15l0.5,1.46l0.07,0.12l1.41,1.37l1.09,2.56l-0.51,-0.11l-3.45,0.45l-0.67,0.3l-0.15,0.15l-0.71,1.61l0.01,0.26l0.52,1.03l-0.43,2.9l-0.31,2.55l0.13,0.29l0.7,0.46l1.75,0.99l0.31,-0.01l0.26,-0.17l0.15,1.9l-1.44,-0.02l-0.94,-1.28l-0.94,-1.1l-0.17,-0.1l-1.76,-0.33l-0.5,-1.18l-0.42,-0.15l-1.44,0.75l-1.79,-0.32l-0.77,-1.05l-0.2,-0.12l-1.59,-0.23l-0.97,0.04l-0.1,-0.53l-0.27,-0.25l-0.86,-0.06l-1.13,-0.15l-1.62,0.37l-1.04,-0.06l-0.32,0.09l0.11,-2.56l-0.08,-0.21l-0.77,-0.87l-0.17,-1.41l0.36,-1.47l-0.03,-0.21l-0.48,-0.91l-0.04,-1.52l-0.3,-0.29l-2.65,0.02l0.13,-0.53l-0.29,-0.37l-1.28,0.01l-0.28,0.21l-0.07,0.24l-1.35,0.09l-0.26,0.18l-0.62,1.45l-0.25,0.42l-1.17,-0.3l-0.19,0.01l-0.79,0.34l-1.44,0.18l-1.41,-1.96l-0.7,-1.47l-0.61,-1.86l-0.28,-0.21l-7.39,-0.03l-0.92,0.3l-0.78,-0.03l-0.78,0.25l-0.11,-0.25l0.35,-0.15l0.18,-0.26l0.07,-1.02l0.33,-0.52l0.72,-0.42l0.52,0.2l0.33,-0.08l0.76,-0.86l0.99,0.02l0.11,0.48l0.16,0.2l0.94,0.44l0.35,-0.07l1.46,-1.56l1.44,-1.21l0.68,-0.85l0.06,-0.2l-0.08,-1.99l1.04,-2.33l1.1,-1.23l1.62,-1.19l0.11,-0.14l0.29,-0.8l0.08,-0.94l0.38,-0.82l0.03,-0.16l-0.13,-1.38l0.3,-2.16l0.47,-1.51l0.73,-1.31l0.04,-0.12l0.15,-1.51l0.21,-1.66l0.89,-1.16l1.16,-0.7l1.9,0.79l1.69,0.95l1.81,0.24l1.85,0.48l0.35,-0.16l0.71,-1.43l0.16,-0.09l1.03,0.23l0.19,-0.02l2.65,-1.19l0.86,0.46l0.17,0.03l0.81,-0.08l0.23,-0.14l0.31,-0.5l0.75,-0.17l1.83,0.26l1.64,0.06l0.72,-0.21l1.39,1.9l0.16,0.11l1.12,0.3l0.24,-0.04l0.58,-0.36l1.05,0.15l0.15,-0.02l1.15,-0.44l0.47,0.84l0.08,0.09l2.08,1.57Z", "name": "Democratic Republic of the Congo"}, "CZ": {"path": "M463.29,152.22l-0.88,-0.47l-0.18,-0.03l-1.08,0.15l-1.86,-0.94l-0.21,-0.02l-0.88,0.24l-0.13,0.07l-1.25,1.17l-1.63,-0.91l-1.38,-1.36l-1.22,-0.75l-0.24,-1.24l-0.33,-0.75l1.53,-0.6l0.98,-0.84l1.74,-0.62l0.11,-0.07l0.47,-0.47l0.46,0.27l0.24,0.03l0.96,-0.3l1.06,0.95l0.15,0.07l1.57,0.24l-0.1,0.6l0.16,0.32l1.36,0.68l0.41,-0.15l0.28,-0.62l1.29,0.28l0.19,0.84l0.26,0.23l1.73,0.18l0.74,1.02l-0.17,0.0l-0.25,0.13l-0.32,0.49l-0.46,0.11l-0.22,0.23l-0.13,0.57l-0.32,0.1l-0.2,0.22l-0.03,0.14l-0.65,0.25l-1.05,-0.05l-0.28,0.17l-0.22,0.43Z", "name": "Czech Republic"}, "CY": {"path": "M505.03,193.75l-1.51,0.68l-1.0,-0.3l-0.32,-0.63l0.69,-0.06l0.41,0.13l0.19,-0.0l0.62,-0.22l0.31,0.02l0.06,0.22l0.49,0.17l0.06,-0.01Z", "name": "Cyprus"}, "CR": {"path": "M213.0,263.84l-0.98,-0.4l-0.3,-0.31l0.16,-0.24l0.05,-0.21l-0.09,-0.56l-0.1,-0.18l-0.76,-0.65l-0.99,-0.5l-0.74,-0.28l-0.13,-0.58l-0.12,-0.18l-0.66,-0.45l-0.34,-0.0l-0.13,0.31l0.13,0.59l-0.17,0.21l-0.34,-0.42l-0.14,-0.1l-0.7,-0.22l-0.23,-0.34l0.01,-0.62l0.31,-0.74l-0.14,-0.38l-0.3,-0.15l0.47,-0.4l1.48,0.6l0.26,-0.02l0.47,-0.27l0.58,0.15l0.35,0.44l0.17,0.11l0.74,0.17l0.27,-0.07l0.3,-0.27l0.52,1.09l0.97,1.02l0.77,0.71l-0.41,0.1l-0.23,0.3l0.01,1.02l0.12,0.24l0.2,0.14l-0.07,0.05l-0.11,0.3l0.08,0.37l-0.23,0.63Z", "name": "Costa Rica"}, "CU": {"path": "M215.01,226.09l2.08,0.18l1.94,0.03l2.24,0.86l0.95,0.92l0.25,0.08l2.22,-0.28l0.79,0.55l3.68,2.81l0.19,0.06l0.77,-0.03l1.18,0.42l-0.12,0.47l0.27,0.37l1.78,0.1l1.59,0.9l-0.11,0.22l-1.5,0.3l-1.64,0.13l-1.75,-0.2l-2.69,0.19l1.0,-0.86l-0.03,-0.48l-1.02,-0.68l-0.13,-0.05l-1.52,-0.16l-0.74,-0.64l-0.57,-1.42l-0.3,-0.19l-1.36,0.1l-2.23,-0.67l-0.71,-0.52l-0.14,-0.06l-3.2,-0.4l-0.42,-0.25l0.56,-0.39l0.12,-0.33l-0.27,-0.22l-2.46,-0.13l-0.2,0.06l-1.72,1.31l-0.94,0.03l-0.25,0.15l-0.29,0.53l-1.04,0.24l-0.29,-0.07l0.7,-0.43l0.1,-0.11l0.5,-0.87l1.04,-0.54l1.23,-0.49l1.86,-0.25l0.62,-0.28Z", "name": "Cuba"}, "SZ": {"path": "M500.95,353.41l-0.41,0.97l-1.16,0.23l-1.29,-1.26l-0.02,-0.71l0.63,-0.93l0.23,-0.7l0.47,-0.12l1.04,0.4l0.32,1.05l0.2,1.08Z", "name": "Swaziland"}, "SY": {"path": "M510.84,199.83l0.09,-0.11l0.07,-0.2l-0.04,-1.08l0.56,-1.4l1.3,-1.01l0.1,-0.34l-0.41,-1.11l-0.24,-0.19l-0.89,-0.11l-0.2,-1.84l0.55,-1.05l1.3,-1.22l0.09,-0.19l0.09,-1.09l0.39,0.27l0.25,0.04l2.66,-0.77l1.35,0.52l2.06,-0.01l2.93,-1.08l1.35,0.04l2.14,-0.34l-0.83,1.16l-1.31,0.68l-0.16,0.3l0.23,2.03l-0.9,3.25l-5.43,2.87l-4.79,2.91l-2.32,-0.92Z", "name": "Syria"}, "KG": {"path": "M599.04,172.15l0.38,-0.9l1.43,-0.37l4.04,1.02l0.37,-0.23l0.36,-1.64l1.17,-0.52l3.45,1.24l0.2,-0.0l0.86,-0.31l4.09,0.08l3.61,0.31l1.18,1.02l0.11,0.06l1.19,0.34l-0.13,0.26l-3.84,1.58l-0.13,0.1l-0.81,1.08l-3.08,0.34l-0.24,0.16l-0.85,1.7l-2.43,-0.37l-0.14,0.01l-1.79,0.61l-2.39,1.4l-0.12,0.39l0.25,0.49l-0.48,0.45l-4.57,0.43l-3.04,-0.94l-2.45,0.18l0.14,-1.02l2.42,0.44l0.27,-0.08l0.81,-0.81l1.76,0.27l0.21,-0.05l3.21,-2.14l-0.03,-0.51l-2.97,-1.57l-0.26,-0.01l-1.64,0.69l-1.38,-0.84l1.81,-1.67l-0.09,-0.5l-0.46,-0.18Z", "name": "Kyrgyzstan"}, "KE": {"path": "M523.3,287.04l0.06,0.17l1.29,1.8l-1.46,0.84l-0.11,0.11l-0.55,0.93l-0.81,0.16l-0.24,0.24l-0.34,1.69l-0.81,1.06l-0.46,1.58l-0.76,0.63l-3.3,-2.3l-0.16,-1.32l-0.15,-0.23l-9.35,-5.28l-0.02,-2.4l1.92,-2.63l0.91,-1.83l0.01,-0.24l-1.09,-2.86l-0.29,-1.24l-1.09,-1.63l2.93,-2.85l0.92,0.3l0.0,1.19l0.09,0.22l0.86,0.83l0.21,0.08l1.65,0.0l3.09,2.08l0.16,0.05l0.79,0.03l0.54,-0.06l0.58,0.28l1.67,0.2l0.28,-0.12l0.69,-0.98l2.04,-0.94l0.86,0.73l0.19,0.07l1.1,0.0l-1.82,2.36l-0.06,0.18l0.03,9.12Z", "name": "Kenya"}, "SS": {"path": "M505.7,261.39l0.02,1.64l-0.27,0.55l-1.15,0.05l-0.24,0.15l-0.85,1.44l0.22,0.45l1.44,0.17l1.15,1.12l0.42,0.95l0.14,0.15l1.06,0.54l1.33,2.45l-3.06,2.98l-1.44,1.08l-1.75,0.01l-1.92,0.56l-1.5,-0.53l-0.27,0.03l-0.85,0.57l-1.98,-1.5l-0.56,-1.02l-0.37,-0.13l-1.32,0.5l-1.08,-0.15l-0.2,0.04l-0.56,0.35l-0.9,-0.24l-1.44,-1.97l-0.39,-0.77l-0.13,-0.13l-1.78,-0.94l-0.65,-1.5l-1.08,-1.12l-1.57,-1.22l-0.02,-0.68l-0.12,-0.23l-1.37,-1.02l-1.17,-0.68l0.2,-0.08l0.86,-0.48l0.14,-0.18l0.63,-2.22l0.6,-1.02l1.47,-0.28l0.35,0.56l1.29,1.48l0.14,0.09l0.69,0.22l0.22,-0.02l0.83,-0.4l1.58,0.08l0.26,0.39l0.25,0.13l2.49,0.0l0.3,-0.25l0.06,-0.35l1.13,-0.42l0.18,-0.18l0.22,-0.63l0.68,-0.38l1.95,1.37l0.23,0.05l1.29,-0.26l0.19,-0.12l1.23,-1.8l1.36,-1.37l0.08,-0.25l-0.21,-1.52l-0.06,-0.15l-0.25,-0.3l0.94,-0.08l0.26,-0.21l0.1,-0.32l0.6,0.09l-0.25,1.67l0.3,1.83l0.11,0.19l1.22,0.94l0.25,0.73l-0.04,1.2l0.26,0.31l0.09,0.01Z", "name": "South Sudan"}, "SR": {"path": "M278.1,270.26l2.71,0.45l0.31,-0.14l0.19,-0.32l1.82,-0.16l2.25,0.56l-1.09,1.81l-0.04,0.19l0.2,1.72l0.05,0.13l0.9,1.35l-0.39,0.99l-0.21,1.09l-0.48,0.8l-1.2,-0.44l-0.17,-0.01l-1.12,0.24l-0.95,-0.21l-0.35,0.2l-0.25,0.73l0.05,0.29l0.3,0.35l-0.06,0.13l-1.01,-0.15l-1.42,-2.03l-0.32,-1.36l-0.29,-0.23l-0.63,-0.0l-0.95,-1.56l0.41,-1.16l0.01,-0.17l-0.08,-0.35l1.29,-0.56l0.18,-0.22l0.35,-1.97Z", "name": "Suriname"}, "KH": {"path": "M680.28,257.89l-0.93,-1.2l-1.24,-2.56l-0.56,-2.9l1.45,-1.92l3.07,-0.46l2.26,0.35l2.03,0.98l0.38,-0.11l1.0,-1.55l1.86,0.79l0.52,1.51l-0.28,2.82l-4.05,1.88l-0.12,0.45l0.79,1.1l-2.2,0.17l-2.08,0.98l-1.89,-0.33Z", "name": "Cambodia"}, "SV": {"path": "M197.02,248.89l0.18,-0.05l0.59,0.17l0.55,0.51l0.64,0.35l0.06,0.22l0.37,0.21l1.01,-0.28l0.38,0.13l0.16,0.13l-0.14,0.81l-0.18,0.38l-1.22,-0.03l-0.84,-0.23l-1.11,-0.52l-1.31,-0.15l-0.49,-0.38l0.02,-0.08l0.76,-0.57l0.46,-0.27l0.11,-0.35Z", "name": "El Salvador"}, "SK": {"path": "M468.01,150.02l0.05,0.07l0.36,0.1l0.85,-0.37l1.12,1.02l0.33,0.05l1.38,-0.65l1.07,0.3l0.16,0.0l1.69,-0.43l1.95,1.02l-0.51,0.64l-0.45,1.2l-0.32,0.2l-2.55,-0.93l-0.17,-0.01l-0.82,0.2l-0.17,0.11l-0.53,0.68l-0.94,0.32l-0.14,-0.11l-0.29,-0.04l-1.18,0.48l-0.95,0.09l-0.26,0.21l-0.15,0.47l-1.84,0.34l-0.82,-0.31l-1.14,-0.73l-0.2,-0.89l0.42,-0.84l0.91,0.05l0.12,-0.02l0.86,-0.33l0.18,-0.21l0.03,-0.13l0.32,-0.1l0.2,-0.22l0.12,-0.55l0.39,-0.1l0.18,-0.13l0.3,-0.45l0.43,-0.0Z", "name": "Slovakia"}, "KR": {"path": "M737.31,185.72l0.84,0.08l0.27,-0.12l0.89,-1.2l1.63,-0.13l1.1,-0.2l0.21,-0.16l0.12,-0.24l1.86,2.95l0.59,1.79l0.02,3.17l-0.84,1.38l-2.23,0.55l-1.95,1.14l-1.91,0.21l-0.22,-1.21l0.45,-2.07l-0.01,-0.17l-0.99,-2.67l1.54,-0.4l0.17,-0.46l-1.55,-2.24Z", "name": "South Korea"}, "SI": {"path": "M455.77,159.59l1.79,0.21l0.18,-0.04l1.2,-0.68l2.12,-0.08l0.21,-0.1l0.38,-0.42l0.1,0.01l0.28,0.62l-1.71,0.71l-0.18,0.22l-0.21,1.1l-0.71,0.26l-0.2,0.28l0.01,0.55l-0.59,-0.04l-0.79,-0.47l-0.38,0.06l-0.36,0.41l-0.84,-0.05l0.05,-0.15l-0.56,-1.24l0.21,-1.17Z", "name": "Slovenia"}, "KP": {"path": "M747.76,172.02l-0.23,-0.04l-0.26,0.08l-1.09,1.02l-0.78,1.06l-0.06,0.19l0.09,1.95l-1.12,0.57l-0.53,0.58l-0.88,0.82l-1.69,0.51l-1.09,0.79l-0.12,0.22l-0.07,1.17l-0.22,0.25l0.09,0.47l0.96,0.46l1.22,1.1l-0.19,0.37l-0.91,0.16l-1.75,0.14l-0.22,0.12l-0.87,1.18l-0.95,-0.09l-0.3,0.18l-0.97,-0.44l-0.39,0.13l-0.25,0.44l-0.29,0.09l-0.03,-0.2l-0.18,-0.23l-0.62,-0.25l-0.43,-0.29l0.52,-0.97l0.52,-0.3l0.13,-0.38l-0.18,-0.42l0.59,-1.47l0.01,-0.21l-0.16,-0.48l-0.22,-0.2l-1.41,-0.31l-0.82,-0.55l1.74,-1.62l2.73,-1.58l1.62,-1.96l0.96,0.76l0.17,0.06l2.17,0.11l0.31,-0.37l-0.32,-1.31l3.61,-1.21l0.16,-0.13l0.79,-1.34l1.25,1.38Z", "name": "North Korea"}, "SO": {"path": "M543.8,256.48l0.61,-0.05l1.14,-0.37l1.31,-0.25l0.12,-0.05l1.11,-0.81l0.57,-0.0l0.03,0.39l-0.23,1.49l0.01,1.25l-0.52,0.92l-0.7,2.71l-1.19,2.79l-1.54,3.2l-2.13,3.66l-2.12,2.79l-2.92,3.39l-2.47,2.0l-3.76,2.5l-2.33,1.9l-2.77,3.06l-0.61,1.35l-0.28,0.29l-1.22,-1.69l-0.03,-8.92l2.12,-2.76l0.59,-0.68l1.47,-0.04l0.18,-0.06l2.15,-1.71l3.16,-0.11l0.21,-0.09l7.08,-7.55l1.76,-2.12l1.14,-1.57l0.06,-0.18l0.01,-4.67Z", "name": "Somalia"}, "SN": {"path": "M379.28,250.34l-0.95,-1.82l-0.09,-0.1l-0.83,-0.6l0.62,-0.28l0.13,-0.11l1.21,-1.8l0.6,-1.31l0.71,-0.68l1.09,0.2l0.18,-0.02l1.17,-0.53l1.25,-0.03l1.17,0.73l1.59,0.65l1.47,1.83l1.59,1.7l0.12,1.56l0.49,1.46l0.1,0.14l0.85,0.65l0.18,0.82l-0.08,0.57l-0.13,0.05l-1.29,-0.19l-0.29,0.13l-0.11,0.16l-0.35,0.04l-1.83,-0.61l-5.84,-0.13l-0.12,0.02l-0.6,0.26l-0.87,-0.06l-1.01,0.32l-0.26,-1.26l1.9,0.04l0.16,-0.04l0.54,-0.32l0.37,-0.02l0.15,-0.05l0.78,-0.5l0.92,0.46l0.12,0.03l1.09,0.04l0.15,-0.03l1.08,-0.57l0.11,-0.44l-0.51,-0.74l-0.39,-0.1l-0.76,0.39l-0.62,-0.01l-0.92,-0.58l-0.18,-0.05l-0.79,0.04l-0.2,0.09l-0.48,0.51l-2.41,0.06Z", "name": "Senegal"}, "SL": {"path": "M392.19,267.53l-0.44,-0.12l-1.73,-0.97l-1.24,-1.28l-0.4,-0.84l-0.27,-1.65l1.21,-1.0l0.09,-0.12l0.27,-0.66l0.32,-0.41l0.56,-0.05l0.16,-0.07l0.5,-0.41l1.75,0.0l0.59,0.77l0.49,0.96l-0.07,0.64l0.04,0.19l0.36,0.58l-0.03,0.84l0.24,0.2l-0.64,0.65l-1.13,1.37l-0.06,0.14l-0.12,0.66l-0.43,0.58Z", "name": "Sierra Leone"}, "SB": {"path": "M826.74,311.51l0.23,0.29l-0.95,-0.01l-0.39,-0.63l0.65,0.27l0.45,0.09ZM825.01,308.52l-1.18,-1.39l-0.37,-1.06l0.24,0.0l0.82,1.84l0.49,0.6ZM823.21,309.42l-0.44,0.03l-1.43,-0.24l-0.32,-0.24l0.08,-0.5l1.29,0.31l0.72,0.47l0.11,0.18ZM817.9,303.81l2.59,1.44l0.3,0.41l-1.21,-0.66l-1.34,-0.89l-0.34,-0.3ZM813.77,302.4l0.48,0.34l0.1,0.08l-0.33,-0.17l-0.25,-0.25Z", "name": "Solomon Islands"}, "SA": {"path": "M528.24,243.1l-0.2,-0.69l-0.07,-0.12l-0.69,-0.71l-0.18,-0.94l-0.12,-0.19l-1.24,-0.89l-1.28,-2.09l-0.7,-2.08l-0.07,-0.11l-1.73,-1.79l-0.11,-0.07l-1.03,-0.39l-1.57,-2.36l-0.27,-1.72l0.1,-1.53l-0.03,-0.15l-1.44,-2.93l-1.25,-1.13l-1.34,-0.56l-0.72,-1.33l0.11,-0.49l-0.02,-0.2l-0.7,-1.38l-0.08,-0.1l-0.68,-0.56l-0.97,-1.98l-2.8,-4.03l-0.25,-0.13l-0.85,0.01l0.29,-1.11l0.12,-0.97l0.23,-0.81l2.52,0.39l0.23,-0.06l1.08,-0.84l0.6,-0.95l1.78,-0.35l0.22,-0.17l0.37,-0.83l0.74,-0.42l0.08,-0.46l-2.17,-2.4l4.55,-1.26l0.12,-0.06l0.36,-0.32l2.83,0.71l3.67,1.91l7.04,5.5l0.17,0.06l4.64,0.22l2.06,0.24l0.55,1.15l0.28,0.17l1.56,-0.06l0.9,2.15l0.14,0.15l1.14,0.57l0.39,0.85l0.11,0.13l1.59,1.06l0.12,0.91l-0.23,0.83l0.01,0.18l0.32,0.9l0.07,0.11l0.68,0.7l0.33,0.86l0.37,0.65l0.09,0.1l0.76,0.53l0.25,0.04l0.45,-0.12l0.35,0.75l0.1,0.63l0.96,2.68l0.23,0.19l7.53,1.33l0.27,-0.09l0.24,-0.26l0.87,1.41l-1.58,4.96l-7.34,2.54l-7.28,1.02l-2.34,1.17l-0.12,0.1l-1.74,2.63l-0.86,0.32l-0.49,-0.68l-0.28,-0.12l-0.92,0.12l-2.32,-0.25l-0.41,-0.23l-0.15,-0.04l-2.89,0.06l-0.63,0.2l-0.91,-0.59l-0.43,0.11l-0.66,1.27l-0.03,0.21l0.21,0.89l-0.6,0.45Z", "name": "Saudi Arabia"}, "SE": {"path": "M476.42,90.44l-0.15,0.1l-2.43,2.86l-0.07,0.24l0.36,2.31l-3.84,3.1l-4.83,3.38l-0.11,0.15l-1.82,5.45l0.03,0.26l1.78,2.68l2.27,1.99l-2.13,3.88l-2.49,0.82l-0.2,0.24l-0.95,6.05l-1.32,3.09l-2.82,-0.32l-0.3,0.16l-1.34,2.64l-2.48,0.14l-0.76,-3.15l-2.09,-4.04l-1.85,-5.01l1.03,-1.98l2.06,-2.53l0.06,-0.13l0.83,-4.45l-0.06,-0.25l-1.54,-1.86l-0.15,-5.0l1.52,-3.48l2.28,0.06l0.27,-0.16l0.87,-1.59l-0.01,-0.31l-0.8,-1.21l3.79,-5.63l4.07,-7.54l2.23,0.01l0.29,-0.22l0.59,-2.15l4.46,0.66l0.34,-0.26l0.34,-2.64l1.21,-0.14l3.24,2.08l3.78,2.85l0.06,6.37l0.03,0.14l0.67,1.29l-3.95,1.07Z", "name": "Sweden"}, "SD": {"path": "M505.98,259.75l-0.31,-0.9l-0.1,-0.14l-1.2,-0.93l-0.27,-1.66l0.29,-1.83l-0.25,-0.34l-1.16,-0.17l-0.33,0.21l-0.11,0.37l-1.3,0.11l-0.21,0.49l0.55,0.68l0.18,1.29l-1.31,1.33l-1.18,1.72l-1.04,0.21l-2.0,-1.4l-0.32,-0.02l-0.95,0.52l-0.14,0.16l-0.21,0.6l-1.16,0.43l-0.19,0.23l-0.04,0.27l-2.08,0.0l-0.25,-0.39l-0.24,-0.13l-1.81,-0.09l-0.14,0.03l-0.8,0.38l-0.49,-0.16l-1.22,-1.39l-0.42,-0.67l-0.31,-0.14l-1.81,0.35l-0.2,0.14l-0.72,1.24l-0.61,2.14l-0.73,0.4l-0.62,0.22l-0.83,-0.68l-0.12,-0.6l0.38,-0.97l0.01,-1.14l-0.08,-0.2l-1.39,-1.53l-0.25,-0.97l0.03,-0.57l-0.11,-0.25l-0.81,-0.66l-0.03,-1.34l-0.04,-0.14l-0.52,-0.98l-0.31,-0.15l-0.42,0.07l0.12,-0.44l0.63,-1.03l0.03,-0.23l-0.24,-0.88l0.69,-0.66l0.02,-0.41l-0.4,-0.46l0.58,-1.39l1.04,-1.71l1.97,0.16l0.32,-0.3l-0.12,-10.24l0.02,-0.8l2.59,-0.01l0.3,-0.3l0.0,-4.92l29.19,0.0l0.68,2.17l-0.4,0.35l-0.1,0.27l0.36,2.69l0.93,3.15l0.12,0.16l2.05,1.4l-0.99,1.15l-1.75,0.4l-0.15,0.08l-0.79,0.79l-0.08,0.17l-0.24,1.69l-1.07,3.75l-0.0,0.16l0.25,0.96l-0.38,2.1l-0.98,2.41l-1.52,1.3l-1.07,1.94l-0.25,0.99l-1.08,0.64l-0.13,0.18l-0.46,1.65Z", "name": "Sudan"}, "DO": {"path": "M241.7,234.97l0.15,-0.22l1.73,0.01l1.43,0.64l0.15,0.03l0.45,-0.04l0.36,0.74l0.28,0.17l1.02,-0.04l-0.04,0.43l0.27,0.33l1.03,0.09l0.91,0.7l-0.57,0.64l-0.99,-0.47l-0.16,-0.03l-1.11,0.11l-0.79,-0.12l-0.26,0.09l-0.38,0.4l-0.66,0.11l-0.28,-0.45l-0.38,-0.12l-0.83,0.37l-0.14,0.13l-0.85,1.49l-0.27,-0.17l-0.1,-0.58l0.05,-0.67l-0.07,-0.21l-0.44,-0.53l0.35,-0.25l0.12,-0.19l0.19,-1.0l-0.2,-1.4Z", "name": "Dominican Republic"}, "DJ": {"path": "M528.78,253.36l0.34,0.45l-0.06,0.76l-1.26,0.54l-0.05,0.53l0.82,0.53l-0.57,0.83l-0.3,-0.25l-0.27,-0.05l-0.56,0.17l-1.07,-0.03l-0.04,-0.56l-0.16,-0.56l0.76,-1.07l0.76,-0.97l0.89,0.18l0.25,-0.06l0.51,-0.42Z", "name": "Djibouti"}, "DK": {"path": "M452.4,129.07l-1.27,2.39l-2.25,-1.69l-0.26,-1.08l3.15,-1.0l0.63,1.39ZM447.87,126.25l-0.35,0.76l-0.47,-0.24l-0.38,0.09l-1.8,2.53l-0.03,0.29l0.56,1.4l-1.22,0.4l-1.68,-0.41l-0.92,-1.76l-0.07,-3.47l0.38,-0.88l0.62,-0.93l2.07,-0.21l0.19,-0.1l0.84,-0.95l1.5,-0.76l-0.06,1.26l-0.7,1.1l-0.03,0.25l0.3,1.0l0.18,0.19l1.06,0.42Z", "name": "Denmark"}, "DE": {"path": "M445.51,131.69l0.03,0.94l0.21,0.28l2.32,0.74l-0.02,1.0l0.37,0.3l2.55,-0.65l1.36,-0.89l2.63,1.27l1.09,1.01l0.51,1.51l-0.6,0.78l-0.0,0.36l0.88,1.17l0.58,1.68l-0.18,1.08l0.03,0.18l0.87,1.81l-0.66,0.2l-0.55,-0.32l-0.36,0.05l-0.58,0.58l-1.73,0.62l-0.99,0.84l-1.77,0.7l-0.16,0.4l0.42,0.94l0.26,1.34l0.14,0.2l1.25,0.76l1.22,1.2l-0.71,1.2l-0.81,0.37l-0.17,0.32l0.34,1.99l-0.04,0.09l-0.47,-0.39l-0.17,-0.07l-1.2,-0.1l-1.85,0.57l-2.15,-0.13l-0.29,0.18l-0.21,0.5l-0.96,-0.67l-0.24,-0.05l-0.67,0.16l-2.6,-0.94l-0.34,0.1l-0.42,0.57l-1.64,-0.02l0.26,-1.88l1.24,-2.15l-0.21,-0.45l-3.54,-0.58l-0.98,-0.71l0.12,-1.26l-0.05,-0.2l-0.44,-0.64l0.27,-2.18l-0.38,-3.14l1.17,-0.0l0.27,-0.17l0.63,-1.26l0.65,-3.17l-0.02,-0.17l-0.41,-1.0l0.32,-0.47l1.77,-0.16l0.37,0.6l0.47,0.06l1.7,-1.69l0.06,-0.33l-0.55,-1.24l-0.09,-1.51l1.5,0.36l0.16,-0.01l1.22,-0.4Z", "name": "Germany"}, "YE": {"path": "M553.53,242.65l-1.51,0.58l-0.17,0.16l-0.48,1.14l-0.07,0.79l-2.31,1.0l-3.98,1.19l-2.28,1.8l-0.97,0.12l-0.7,-0.14l-0.23,0.05l-1.42,1.03l-1.51,0.47l-2.07,0.13l-0.68,0.15l-0.17,0.1l-0.49,0.6l-0.57,0.16l-0.18,0.13l-0.3,0.49l-1.06,-0.05l-0.13,0.02l-0.73,0.32l-1.48,-0.11l-0.55,-1.26l0.07,-1.32l-0.04,-0.16l-0.39,-0.72l-0.48,-1.85l-0.52,-0.79l0.08,-0.02l0.22,-0.36l-0.23,-1.05l0.24,-0.39l0.04,-0.19l-0.09,-0.95l0.96,-0.72l0.11,-0.31l-0.23,-0.98l0.46,-0.88l0.75,0.49l0.26,0.03l0.63,-0.22l2.76,-0.06l0.5,0.25l2.42,0.26l0.85,-0.11l0.52,0.71l0.35,0.1l1.17,-0.43l0.15,-0.12l1.75,-2.64l2.22,-1.11l6.95,-0.96l2.55,5.58Z", "name": "Yemen"}, "AT": {"path": "M463.17,154.15l-0.14,0.99l-1.15,0.01l-0.24,0.47l0.39,0.56l-0.75,1.84l-0.36,0.4l-2.06,0.07l-0.14,0.04l-1.18,0.67l-1.96,-0.23l-3.43,-0.78l-0.5,-0.97l-0.33,-0.16l-2.47,0.55l-0.2,0.16l-0.18,0.37l-1.27,-0.38l-1.28,-0.09l-0.81,-0.41l0.25,-0.51l0.03,-0.18l-0.05,-0.28l0.35,-0.08l1.16,0.81l0.45,-0.13l0.27,-0.64l2.0,0.12l1.84,-0.57l1.05,0.09l0.71,0.59l0.47,-0.11l0.23,-0.54l0.02,-0.17l-0.32,-1.85l0.69,-0.31l0.13,-0.12l0.73,-1.23l1.61,0.89l0.35,-0.04l1.35,-1.27l0.7,-0.19l1.84,0.93l0.18,0.03l1.08,-0.15l0.81,0.43l-0.07,0.15l-0.02,0.2l0.24,1.06Z", "name": "Austria"}, "DZ": {"path": "M450.58,224.94l-8.31,4.86l-7.23,5.12l-3.46,1.13l-2.42,0.22l-0.02,-1.33l-0.2,-0.28l-1.15,-0.42l-1.45,-0.69l-0.55,-1.13l-0.1,-0.12l-8.45,-5.72l-17.72,-12.17l0.03,-0.38l-0.02,-3.21l3.84,-1.91l2.46,-0.41l2.1,-0.75l0.14,-0.11l0.9,-1.3l2.84,-1.06l0.19,-0.27l0.09,-1.81l1.21,-0.2l0.15,-0.07l1.06,-0.96l3.19,-0.46l0.23,-0.18l0.46,-1.08l-0.08,-0.34l-0.6,-0.54l-0.83,-2.85l-0.18,-1.8l-0.82,-1.57l2.13,-1.37l2.65,-0.49l0.13,-0.05l1.55,-1.15l2.34,-0.85l4.2,-0.51l4.07,-0.23l1.21,0.41l0.23,-0.01l2.3,-1.11l2.52,-0.02l0.94,0.62l0.2,0.05l1.25,-0.13l-0.36,1.03l-0.01,0.14l0.39,2.66l-0.56,2.2l-1.49,1.52l-0.08,0.24l0.22,2.12l0.11,0.2l1.94,1.58l0.02,0.54l0.12,0.23l1.45,1.06l1.04,4.85l0.81,2.42l0.13,1.19l-0.43,2.17l0.17,1.28l-0.31,1.53l0.2,1.56l-0.9,1.02l-0.01,0.38l1.43,1.88l0.09,1.06l0.04,0.13l0.89,1.48l0.37,0.12l1.03,-0.43l1.79,1.12l0.89,1.34Z", "name": "Algeria"}, "US": {"path": "M892.64,99.05l1.16,0.57l0.21,0.02l1.45,-0.38l1.92,0.99l2.17,0.47l-1.65,0.72l-1.75,-0.79l-0.93,-0.7l-0.21,-0.06l-2.11,0.22l-0.35,-0.2l0.09,-0.87ZM183.29,150.37l0.39,1.54l0.12,0.17l0.78,0.55l0.14,0.05l1.74,0.2l2.52,0.5l2.4,0.98l0.17,0.02l1.96,-0.4l3.01,0.81l0.91,-0.02l2.22,-0.88l4.67,2.33l3.86,2.01l0.21,0.71l0.15,0.18l0.33,0.17l-0.02,0.05l0.23,0.43l0.67,0.1l0.21,-0.05l0.1,-0.07l0.05,0.29l0.09,0.16l0.5,0.5l0.21,0.09l0.56,0.0l0.13,0.13l-0.2,0.36l0.12,0.41l2.49,1.39l0.99,5.24l-0.69,1.68l-1.16,1.64l-0.6,1.18l-0.06,0.31l0.04,0.22l0.28,0.43l0.11,0.1l0.85,0.47l0.15,0.04l0.63,0.0l0.14,-0.04l2.87,-1.58l2.6,-0.49l3.28,-1.5l0.17,-0.23l0.04,-0.43l-0.23,-0.93l-0.24,-0.39l0.74,-0.32l4.7,-0.01l0.25,-0.13l0.77,-1.15l2.9,-2.41l1.04,-0.52l8.35,-0.02l0.28,-0.21l0.2,-0.6l0.7,-0.14l1.06,-0.48l0.13,-0.11l0.92,-1.49l0.75,-2.39l1.67,-2.08l0.59,0.6l0.3,0.07l1.52,-0.49l0.88,0.72l-0.0,4.14l0.08,0.2l1.6,1.72l0.31,0.72l-2.42,1.35l-2.55,1.05l-2.64,0.9l-0.14,0.11l-1.33,1.81l-0.44,0.7l-0.05,0.15l-0.03,1.6l0.03,0.14l0.83,1.59l0.24,0.16l0.78,0.06l-1.15,0.33l-1.25,-0.04l-1.83,0.52l-2.51,0.29l-2.17,0.88l-0.17,0.36l0.33,0.22l3.55,-0.54l0.15,0.11l-2.87,0.73l-1.19,0.0l-0.16,-0.33l-0.36,0.06l-0.76,0.82l0.17,0.5l0.42,0.08l-0.45,1.75l-1.4,1.74l-0.04,-0.17l-0.21,-0.22l-0.48,-0.13l-0.77,-0.69l-0.36,-0.03l-0.12,0.34l0.52,1.58l0.09,0.14l0.52,0.43l0.03,0.87l-0.74,1.05l-0.39,0.63l0.05,-0.12l-0.08,-0.34l-1.19,-1.03l-0.28,-2.31l-0.26,-0.26l-0.32,0.19l-0.48,1.27l-0.01,0.19l0.39,1.33l-1.14,-0.31l-0.36,0.18l0.14,0.38l1.57,0.85l0.1,2.58l0.22,0.28l0.55,0.15l0.21,0.81l0.33,2.72l-1.46,1.94l-2.5,0.81l-0.12,0.07l-1.58,1.58l-1.15,0.17l-0.15,0.06l-1.27,1.03l-0.09,0.13l-0.32,0.85l-2.71,1.79l-1.45,1.37l-1.18,1.64l-0.05,0.12l-0.39,1.96l0.0,0.13l0.44,1.91l0.85,2.37l1.1,1.91l0.03,1.2l1.16,3.07l-0.08,1.74l-0.1,0.99l-0.57,1.48l-0.54,0.24l-0.97,-0.26l-0.34,-1.02l-0.12,-0.16l-0.89,-0.58l-2.44,-4.28l-0.34,-0.94l0.49,-1.71l-0.02,-0.21l-0.7,-1.5l-2.0,-2.35l-0.11,-0.08l-0.98,-0.42l-0.25,0.01l-2.42,1.19l-0.26,-0.08l-1.26,-1.29l-1.57,-0.68l-0.16,-0.02l-2.79,0.34l-2.18,-0.3l-1.98,0.19l-1.12,0.45l-0.14,0.44l0.4,0.65l-0.04,1.02l0.09,0.22l0.29,0.3l-0.06,0.05l-0.77,-0.33l-0.26,0.01l-0.87,0.48l-1.64,-0.08l-1.79,-1.39l-0.23,-0.06l-2.11,0.33l-1.75,-0.61l-0.14,-0.01l-1.61,0.2l-2.11,0.64l-0.11,0.06l-2.25,1.99l-2.53,1.21l-1.43,1.38l-0.58,1.22l-0.03,0.12l-0.03,1.86l0.13,1.32l0.3,0.62l-0.46,0.04l-1.71,-0.57l-1.85,-0.79l-0.63,-1.14l-0.54,-1.85l-0.07,-0.12l-1.45,-1.51l-0.86,-1.58l-1.26,-1.87l-0.09,-0.09l-1.76,-1.09l-0.17,-0.04l-2.05,0.05l-0.23,0.12l-1.44,1.97l-1.84,-0.72l-1.19,-0.76l-0.6,-1.45l-0.9,-1.52l-1.49,-1.21l-1.27,-0.87l-0.89,-0.96l-0.22,-0.1l-4.34,-0.0l-0.3,0.3l-0.0,0.84l-6.62,0.02l-5.66,-1.93l-3.48,-1.24l0.11,-0.25l-0.3,-0.42l-3.18,0.3l-2.6,0.2l-0.35,-1.19l-0.08,-0.13l-1.62,-1.61l-0.13,-0.08l-1.02,-0.29l-0.22,-0.66l-0.25,-0.2l-1.31,-0.13l-0.82,-0.7l-0.16,-0.07l-2.25,-0.27l-0.48,-0.34l-0.28,-1.44l-0.07,-0.14l-2.41,-2.84l-2.03,-3.89l0.08,-0.58l-0.1,-0.27l-1.08,-0.94l-1.87,-2.36l-0.33,-2.31l-0.07,-0.15l-1.24,-1.5l0.52,-2.4l-0.09,-2.57l-0.78,-2.3l0.96,-2.83l0.61,-5.66l-0.46,-4.26l-0.79,-2.71l-0.68,-1.4l0.13,-0.26l3.24,0.97l1.28,2.88l0.52,0.06l0.62,-0.84l0.06,-0.22l-0.4,-2.61l-0.74,-2.29l68.9,-0.0l0.3,-0.3l0.01,-0.95l0.32,-0.01ZM32.5,67.43l1.75,1.99l0.41,0.04l1.02,-0.81l3.79,0.25l-0.1,0.72l0.24,0.34l3.83,0.77l2.6,-0.44l5.21,1.41l4.84,0.43l1.9,0.57l0.15,0.01l3.25,-0.71l3.72,1.32l2.52,0.58l-0.03,38.14l0.29,0.3l2.41,0.11l2.34,1.0l1.7,1.59l2.22,2.42l0.42,0.03l2.41,-2.04l2.25,-1.08l1.23,1.76l1.71,1.53l2.24,1.62l1.54,2.56l2.56,4.09l0.11,0.11l4.1,2.17l0.06,1.93l-1.12,1.35l-1.22,-1.14l-2.08,-1.05l-0.68,-2.94l-0.09,-0.16l-3.18,-2.84l-1.32,-3.35l-0.25,-0.19l-2.43,-0.24l-3.93,-0.09l-2.85,-1.02l-5.24,-3.85l-6.77,-2.04l-3.52,0.3l-4.84,-1.7l-2.96,-1.6l-0.23,-0.02l-2.78,0.8l-0.21,0.35l0.46,2.31l-1.11,0.19l-2.9,0.78l-2.24,1.26l-2.42,0.68l-0.29,-1.79l1.07,-3.49l2.54,-1.11l0.12,-0.45l-0.69,-0.96l-0.41,-0.07l-3.19,2.12l-1.76,2.54l-3.57,2.62l-0.03,0.46l1.63,1.59l-2.14,2.38l-2.64,1.49l-2.49,1.09l-0.16,0.17l-0.58,1.48l-3.8,1.79l-0.14,0.14l-0.75,1.57l-2.75,1.41l-1.62,-0.25l-0.16,0.02l-2.35,0.98l-2.54,1.19l-2.06,1.15l-4.05,0.93l-0.1,-0.15l2.45,-1.45l2.49,-1.1l2.61,-1.88l3.03,-0.39l0.19,-0.1l1.2,-1.41l3.43,-2.11l0.61,-0.75l1.81,-1.24l0.13,-0.2l0.42,-2.7l1.24,-2.12l-0.03,-0.35l-0.34,-0.09l-2.73,1.05l-0.67,-0.53l-0.39,0.02l-1.13,1.11l-1.43,-1.62l-0.49,0.06l-0.41,0.8l-0.67,-1.31l-0.42,-0.12l-2.43,1.43l-1.18,-0.0l-0.18,-1.86l0.43,-1.3l-0.09,-0.33l-1.61,-1.33l-0.26,-0.06l-3.11,0.68l-2.0,-1.66l-1.61,-0.85l-0.01,-1.97l-0.11,-0.23l-1.76,-1.48l0.86,-1.96l2.01,-2.13l0.88,-1.94l1.79,-0.25l1.65,0.6l0.31,-0.06l1.91,-1.8l1.67,0.31l0.22,-0.04l1.91,-1.23l0.13,-0.33l-0.47,-1.82l-0.15,-0.19l-1.0,-0.52l1.51,-1.27l0.09,-0.34l-0.29,-0.19l-1.62,0.06l-2.66,0.88l-0.13,0.09l-0.62,0.72l-1.77,-0.8l-0.16,-0.02l-3.48,0.44l-3.5,-0.92l-1.06,-1.61l-2.78,-2.09l3.07,-1.51l5.52,-2.01l1.65,0.0l-0.28,1.73l0.31,0.35l5.29,-0.16l0.23,-0.49l-2.03,-2.59l-0.1,-0.08l-3.03,-1.58l-1.79,-2.12l-2.4,-1.83l-3.18,-1.27l1.13,-1.84l4.28,-0.14l0.15,-0.05l3.16,-2.0l0.13,-0.17l0.57,-2.07l2.43,-2.02l2.42,-0.52l4.67,-1.98l2.22,0.29l0.2,-0.04l3.74,-2.37l3.57,0.91ZM37.66,123.49l-2.31,1.26l-1.04,-0.75l-0.31,-1.35l2.06,-1.16l1.24,-0.51l1.48,0.22l0.76,0.81l-1.89,1.49ZM30.89,233.84l1.2,0.57l0.35,0.3l0.48,0.69l-1.6,0.86l-0.3,0.31l-0.24,-0.14l0.05,-0.54l-0.02,-0.15l-0.36,-0.83l0.05,-0.12l0.39,-0.38l0.07,-0.31l-0.09,-0.27ZM29.06,231.89l0.5,0.14l0.31,0.19l-0.46,0.1l-0.34,-0.43ZM25.02,230.13l0.2,-0.11l0.4,0.47l-0.43,-0.05l-0.17,-0.31ZM21.29,228.68l0.1,-0.07l0.22,0.02l0.02,0.21l-0.02,0.02l-0.32,-0.18ZM6.0,113.33l-1.19,0.45l-1.5,-0.64l-0.94,-0.63l1.76,-0.46l1.71,0.29l0.16,0.98Z", "name": "United States of America"}, "LV": {"path": "M473.99,127.16l0.07,-2.15l1.15,-2.11l2.05,-1.07l1.84,2.48l0.25,0.12l2.01,-0.07l0.29,-0.25l0.45,-2.58l1.85,-0.56l0.98,0.4l2.13,1.33l0.16,0.05l1.97,0.01l1.02,0.7l0.21,1.67l0.71,1.84l-2.44,1.23l-1.36,0.53l-2.28,-1.62l-0.12,-0.05l-1.18,-0.2l-0.28,-0.6l-0.31,-0.17l-2.43,0.35l-4.17,-0.23l-0.12,0.02l-2.45,0.93Z", "name": "Latvia"}, "UY": {"path": "M276.9,363.17l1.3,-0.23l2.4,2.04l0.22,0.07l0.82,-0.07l2.48,1.7l1.93,1.5l1.28,1.67l-0.95,1.14l-0.04,0.31l0.63,1.45l-0.96,1.57l-2.65,1.47l-1.73,-0.53l-0.15,-0.01l-1.25,0.28l-2.22,-1.16l-0.16,-0.03l-1.56,0.08l-1.33,-1.36l0.17,-1.58l0.48,-0.55l0.07,-0.2l-0.02,-2.74l0.66,-2.8l0.57,-2.02Z", "name": "Uruguay"}, "LB": {"path": "M510.44,198.11l-0.48,0.03l-0.26,0.17l-0.15,0.32l-0.21,-0.0l0.72,-1.85l1.19,-1.9l0.74,0.09l0.27,0.73l-1.19,0.93l-0.09,0.13l-0.54,1.36Z", "name": "Lebanon"}, "LA": {"path": "M684.87,248.8l0.61,-0.86l0.05,-0.16l0.11,-2.17l-0.08,-0.22l-1.96,-2.16l-0.15,-2.44l-0.08,-0.18l-1.9,-2.1l-0.19,-0.1l-1.89,-0.18l-0.29,0.15l-0.42,0.76l-1.21,0.06l-0.67,-0.41l-0.31,-0.0l-2.2,1.29l-0.05,-1.77l0.61,-2.7l-0.27,-0.37l-1.44,-0.1l-0.12,-1.31l-0.12,-0.21l-0.87,-0.65l0.38,-0.68l1.76,-1.41l0.08,0.22l0.27,0.2l1.33,0.07l0.31,-0.34l-0.35,-2.75l0.85,-0.25l1.32,1.88l1.11,2.36l0.27,0.17l2.89,0.02l0.78,1.82l-1.32,0.56l-0.12,0.09l-0.72,0.93l0.1,0.45l2.93,1.52l3.62,5.27l1.88,1.78l0.58,1.67l-0.38,2.11l-1.87,-0.79l-0.37,0.11l-0.99,1.54l-1.51,-0.73Z", "name": "Laos"}, "TW": {"path": "M725.6,222.5l-1.5,4.22l-0.82,1.65l-1.01,-1.7l-0.26,-1.8l1.4,-2.48l1.8,-1.81l0.76,0.53l-0.38,1.39Z", "name": "Taiwan"}, "TT": {"path": "M266.35,259.46l0.41,-0.39l0.09,-0.23l-0.04,-0.75l1.14,-0.26l0.2,0.03l-0.07,1.37l-1.73,0.23Z", "name": "Trinidad and Tobago"}, "TR": {"path": "M513.25,175.38l3.63,1.17l0.14,0.01l2.88,-0.45l2.11,0.26l0.18,-0.03l2.9,-1.53l2.51,-0.13l2.25,1.37l0.36,0.88l-0.23,1.36l0.19,0.33l1.81,0.72l0.61,0.53l-1.31,0.64l-0.16,0.34l0.76,3.24l-0.44,0.8l0.01,0.3l1.19,2.02l-0.71,0.29l-0.74,-0.62l-0.15,-0.07l-2.91,-0.37l-0.15,0.02l-1.04,0.43l-2.78,0.44l-1.44,-0.03l-2.83,1.06l-1.95,0.01l-1.28,-0.52l-0.2,-0.01l-2.62,0.76l-0.7,-0.48l-0.47,0.22l-0.13,1.49l-1.01,0.94l-0.58,-0.82l0.79,-0.9l0.04,-0.34l-0.31,-0.15l-1.46,0.23l-2.03,-0.64l-0.3,0.07l-1.65,1.58l-3.58,0.3l-1.94,-1.47l-0.17,-0.06l-2.7,-0.1l-0.28,0.17l-0.51,1.06l-1.47,0.29l-2.32,-1.46l-0.17,-0.05l-2.55,0.05l-1.4,-2.7l-1.72,-1.54l1.11,-2.06l-0.07,-0.37l-1.35,-1.19l2.47,-2.51l3.74,-0.11l0.26,-0.17l0.96,-2.07l4.56,0.38l0.19,-0.05l2.97,-1.92l2.84,-0.83l4.03,-0.06l4.31,2.08ZM488.85,176.8l-1.81,1.38l-0.57,-1.01l0.02,-0.36l0.45,-0.25l0.13,-0.15l0.78,-1.87l-0.11,-0.37l-0.72,-0.47l1.91,-0.71l1.89,0.35l0.25,0.97l0.17,0.2l1.87,0.83l-0.19,0.31l-2.82,0.16l-0.18,0.07l-1.06,0.91Z", "name": "Turkey"}, "LK": {"path": "M625.44,266.07l-0.35,2.4l-0.9,0.61l-1.91,0.5l-1.04,-1.75l-0.43,-3.5l1.0,-3.6l1.34,1.09l1.13,1.72l1.16,2.52Z", "name": "Sri Lanka"}, "TN": {"path": "M444.91,206.18l-0.99,-4.57l-0.12,-0.18l-1.43,-1.04l-0.02,-0.53l-0.11,-0.22l-1.95,-1.59l-0.19,-1.85l1.44,-1.47l0.08,-0.14l0.59,-2.34l-0.38,-2.77l0.44,-1.28l2.52,-1.08l1.41,0.28l-0.06,1.2l0.43,0.28l1.81,-0.9l0.02,0.06l-1.14,1.28l-0.08,0.2l-0.02,1.32l0.11,0.24l0.74,0.6l-0.29,2.18l-1.56,1.35l-0.09,0.32l0.48,1.54l0.28,0.21l1.11,0.04l0.55,1.17l0.15,0.14l0.76,0.35l-0.12,1.79l-1.1,0.72l-0.8,0.91l-1.68,1.04l-0.13,0.32l0.25,1.08l-0.18,0.96l-0.74,0.39Z", "name": "Tunisia"}, "TL": {"path": "M734.21,307.22l0.17,-0.34l1.99,-0.52l1.72,-0.08l0.78,-0.3l0.29,0.1l-0.43,0.32l-2.57,1.09l-1.71,0.59l-0.05,-0.49l-0.19,-0.36Z", "name": "East Timor"}, "TM": {"path": "M553.16,173.51l-0.12,1.0l-0.26,-0.65l0.38,-0.34ZM553.54,173.16l0.13,-0.12l0.43,-0.09l-0.56,0.21ZM555.68,172.6l0.65,-0.14l1.53,0.76l1.71,2.29l0.27,0.12l1.27,-0.14l2.81,-0.04l0.29,-0.38l-0.35,-1.27l1.98,-0.97l1.96,-1.63l3.05,1.44l0.25,2.23l0.14,0.22l0.96,0.61l0.18,0.05l2.61,-0.13l0.68,0.44l1.2,2.97l0.1,0.13l2.85,2.03l1.67,1.41l2.66,1.45l3.13,1.17l-0.05,1.23l-0.36,-0.04l-1.12,-0.73l-0.44,0.14l-0.34,0.89l-1.96,0.52l-0.22,0.23l-0.47,2.17l-1.26,0.78l-1.93,0.42l-0.21,0.18l-0.46,1.14l-1.64,0.33l-2.3,-0.97l-0.2,-2.23l-0.28,-0.27l-1.76,-0.1l-2.78,-2.48l-0.15,-0.07l-1.95,-0.31l-2.82,-1.48l-1.78,-0.27l-0.18,0.03l-1.03,0.51l-1.6,-0.08l-0.22,0.08l-1.72,1.6l-1.83,0.46l-0.39,-1.7l0.36,-3.0l-0.16,-0.3l-1.73,-0.88l0.57,-1.77l-0.25,-0.39l-1.33,-0.14l0.41,-1.85l2.05,0.63l0.21,-0.01l2.2,-0.95l0.09,-0.49l-1.78,-1.75l-0.69,-1.66l-0.07,-0.03Z", "name": "Turkmenistan"}, "TJ": {"path": "M597.99,178.71l-0.23,0.23l-2.57,-0.47l-0.35,0.25l-0.24,1.7l0.32,0.34l2.66,-0.22l3.15,0.95l4.47,-0.42l0.58,2.45l0.39,0.21l0.71,-0.25l1.22,0.53l-0.06,1.01l0.29,1.28l-2.19,-0.0l-1.71,-0.21l-0.23,0.07l-1.51,1.25l-1.05,0.27l-0.77,0.51l-0.71,-0.67l0.22,-2.28l-0.24,-0.32l-0.43,-0.08l0.17,-0.57l-0.16,-0.36l-1.36,-0.66l-0.34,0.05l-1.08,1.01l-0.09,0.15l-0.25,1.09l-0.24,0.26l-1.36,-0.05l-0.27,0.14l-0.65,1.06l-0.58,-0.39l-0.3,-0.02l-1.68,0.86l-0.36,-0.16l1.28,-2.65l0.02,-0.2l-0.54,-2.17l-0.18,-0.21l-1.53,-0.58l0.41,-0.82l1.89,0.13l0.26,-0.12l1.19,-1.63l0.77,-1.82l2.66,-0.55l-0.33,0.87l0.01,0.23l0.36,0.82l0.3,0.18l0.23,-0.02Z", "name": "Tajikistan"}, "LS": {"path": "M493.32,359.69l0.69,0.65l-0.65,1.12l-0.38,0.8l-1.27,0.39l-0.18,0.15l-0.4,0.77l-0.59,0.18l-1.59,-1.78l1.16,-1.5l1.3,-1.02l0.97,-0.46l0.94,0.72Z", "name": "Lesotho"}, "TH": {"path": "M677.42,253.68l-1.7,-0.88l-0.14,-0.03l-1.77,0.04l0.3,-1.64l-0.3,-0.35l-2.21,0.01l-0.3,0.28l-0.2,2.76l-2.15,5.9l-0.02,0.13l0.17,1.83l0.28,0.27l1.45,0.07l0.93,2.1l0.44,2.15l0.08,0.15l1.4,1.44l0.16,0.09l1.43,0.27l1.04,1.05l-0.58,0.73l-1.24,0.22l-0.15,-0.99l-0.15,-0.22l-2.04,-1.1l-0.36,0.06l-0.23,0.23l-0.72,-0.71l-0.41,-1.18l-0.06,-0.11l-1.33,-1.42l-1.22,-1.2l-0.5,0.13l-0.15,0.54l-0.14,-0.41l0.26,-1.48l0.73,-2.38l1.2,-2.57l1.37,-2.35l0.02,-0.27l-0.95,-2.26l0.03,-1.19l-0.29,-1.42l-0.06,-0.13l-1.65,-2.0l-0.46,-0.99l0.62,-0.34l0.13,-0.15l0.92,-2.23l-0.02,-0.27l-1.05,-1.74l-1.57,-1.86l-1.04,-1.96l0.76,-0.34l0.16,-0.16l1.07,-2.63l1.58,-0.1l0.16,-0.06l1.43,-1.11l1.24,-0.52l0.84,0.62l0.13,1.43l0.28,0.27l1.34,0.09l-0.54,2.39l0.05,2.39l0.45,0.25l2.48,-1.45l0.6,0.36l0.17,0.04l1.47,-0.07l0.25,-0.15l0.41,-0.73l1.58,0.15l1.76,1.93l0.15,2.44l0.08,0.18l1.94,2.15l-0.1,1.96l-0.66,0.93l-2.25,-0.34l-3.24,0.49l-0.19,0.12l-1.6,2.12l-0.06,0.24l0.48,2.46Z", "name": "Thailand"}, "TF": {"path": "M593.76,417.73l1.38,0.84l2.15,0.37l0.04,0.31l-0.59,1.24l-3.36,0.19l-0.05,-1.38l0.43,-1.56Z", "name": "French Southern and Antarctic Lands"}, "TG": {"path": "M425.23,269.29l-1.49,0.4l-0.43,-0.68l-0.64,-1.54l-0.18,-1.16l0.54,-2.21l-0.04,-0.24l-0.59,-0.86l-0.23,-1.9l0.0,-1.82l-0.07,-0.19l-0.95,-1.19l0.1,-0.41l1.58,0.04l-0.23,0.97l0.08,0.28l1.55,1.55l0.09,1.13l0.08,0.19l0.42,0.43l-0.11,5.66l0.52,1.53Z", "name": "Togo"}, "TD": {"path": "M457.57,252.46l0.23,-1.08l-0.28,-0.36l-1.32,-0.05l0.0,-1.35l-0.1,-0.22l-0.9,-0.82l0.99,-3.1l3.12,-2.37l0.12,-0.23l0.13,-3.33l0.95,-5.2l0.53,-1.09l-0.07,-0.36l-0.94,-0.81l-0.03,-0.7l-0.12,-0.23l-0.84,-0.61l-0.57,-3.76l2.21,-1.26l19.67,9.88l0.12,9.74l-1.83,-0.15l-0.28,0.14l-1.14,1.89l-0.68,1.62l0.05,0.31l0.33,0.38l-0.61,0.58l-0.08,0.3l0.25,0.93l-0.58,0.95l-0.29,1.01l0.34,0.37l0.67,-0.11l0.39,0.73l0.03,1.4l0.11,0.23l0.8,0.65l-0.01,0.24l-1.38,0.37l-0.11,0.06l-1.27,1.03l-1.83,2.76l-2.21,1.1l-2.34,-0.15l-0.82,0.25l-0.2,0.37l0.19,0.68l-1.16,0.79l-1.01,0.94l-2.92,0.89l-0.5,-0.46l-0.17,-0.08l-0.41,-0.05l-0.28,0.12l-0.38,0.54l-1.36,0.12l0.1,-0.18l0.01,-0.27l-0.78,-1.72l-0.35,-1.03l-0.17,-0.18l-1.03,-0.41l-1.29,-1.28l0.36,-0.78l0.9,0.2l0.14,-0.0l0.67,-0.17l1.36,0.02l0.26,-0.45l-1.32,-2.22l0.09,-1.64l-0.17,-1.68l-0.04,-0.13l-0.93,-1.53Z", "name": "Chad"}, "LY": {"path": "M457.99,226.38l-1.57,0.87l-1.25,-1.28l-0.13,-0.08l-3.85,-1.11l-1.04,-1.57l-0.09,-0.09l-1.98,-1.23l-0.27,-0.02l-0.93,0.39l-0.72,-1.2l-0.09,-1.07l-0.06,-0.16l-1.33,-1.75l0.83,-0.94l0.07,-0.24l-0.21,-1.64l0.31,-1.43l-0.17,-1.29l0.43,-2.26l-0.15,-1.33l-0.73,-2.18l0.99,-0.52l0.16,-0.21l0.22,-1.16l-0.22,-1.06l1.54,-0.95l0.81,-0.92l1.19,-0.78l0.14,-0.23l0.12,-1.76l2.57,0.84l0.16,0.01l0.99,-0.23l2.01,0.45l3.19,1.2l1.12,2.36l0.2,0.16l2.24,0.53l3.5,1.14l2.65,1.36l0.29,-0.01l1.22,-0.71l1.27,-1.32l0.07,-0.29l-0.55,-2.0l0.69,-1.19l1.7,-1.23l1.61,-0.35l3.2,0.54l0.78,1.14l0.24,0.13l0.85,0.01l0.84,0.47l2.35,0.31l0.42,0.63l-0.79,1.16l-0.04,0.26l0.35,1.08l-0.61,1.6l-0.0,0.2l0.73,2.16l0.0,24.24l-2.58,0.01l-0.3,0.29l-0.02,0.62l-19.55,-9.83l-0.28,0.01l-2.53,1.44Z", "name": "Libya"}, "AE": {"path": "M550.59,223.8l0.12,0.08l1.92,-0.41l3.54,0.15l0.23,-0.09l1.71,-1.79l1.86,-1.7l1.31,-1.36l0.26,0.5l0.28,1.72l-0.93,0.01l-0.3,0.26l-0.21,1.73l0.11,0.27l0.08,0.06l-0.7,0.32l-0.17,0.27l-0.01,0.99l-0.68,1.02l-0.05,0.15l-0.06,0.96l-0.32,0.36l-7.19,-1.27l-0.79,-2.22Z", "name": "United Arab Emirates"}, "VE": {"path": "M240.66,256.5l0.65,0.91l-0.03,1.13l-1.05,1.39l-0.03,0.31l0.95,2.0l0.32,0.17l1.08,-0.16l0.24,-0.21l0.56,-1.83l-0.06,-0.29l-0.71,-0.81l-0.1,-1.58l2.9,-0.96l0.19,-0.37l-0.29,-1.02l0.45,-0.41l0.72,1.43l0.26,0.16l1.65,0.04l1.46,1.27l0.08,0.72l0.3,0.27l2.28,0.02l2.55,-0.25l1.34,1.06l0.14,0.06l1.92,0.31l0.2,-0.03l1.4,-0.79l0.15,-0.25l0.02,-0.36l2.82,-0.14l1.17,-0.01l-0.41,0.14l-0.14,0.46l0.86,1.19l0.22,0.12l1.93,0.18l1.73,1.13l0.37,1.9l0.31,0.24l1.21,-0.05l0.52,0.32l-1.63,1.21l-0.11,0.17l-0.22,0.92l0.07,0.27l0.63,0.69l-0.31,0.24l-1.48,0.39l-0.22,0.3l0.04,1.03l-0.59,0.6l-0.01,0.41l1.67,1.87l0.23,0.48l-0.72,0.76l-2.71,0.91l-1.78,0.39l-0.13,0.06l-0.6,0.49l-1.84,-0.58l-1.89,-0.33l-0.18,0.03l-0.47,0.23l-0.02,0.53l0.96,0.56l-0.08,1.58l0.35,1.58l0.26,0.23l1.91,0.19l0.02,0.07l-1.54,0.62l-0.18,0.2l-0.25,0.92l-0.88,0.35l-1.85,0.58l-0.16,0.13l-0.4,0.64l-1.66,0.14l-1.22,-1.18l-0.79,-2.52l-0.67,-0.88l-0.66,-0.43l0.99,-0.98l0.09,-0.26l-0.09,-0.56l-0.08,-0.16l-0.66,-0.69l-0.47,-1.54l0.18,-1.67l0.55,-0.85l0.45,-1.35l-0.15,-0.36l-0.89,-0.43l-0.19,-0.02l-1.39,0.28l-1.76,-0.13l-0.92,0.23l-1.64,-2.01l-0.17,-0.1l-1.54,-0.33l-3.05,0.23l-0.5,-0.73l-0.15,-0.12l-0.45,-0.15l-0.05,-0.28l0.28,-0.86l0.01,-0.15l-0.2,-1.01l-0.08,-0.15l-0.5,-0.5l-0.3,-1.08l-0.25,-0.22l-0.89,-0.12l0.54,-1.18l0.29,-1.73l0.66,-0.85l0.94,-0.7l0.09,-0.11l0.3,-0.6Z", "name": "Venezuela"}, "AF": {"path": "M574.42,192.1l2.24,0.95l0.18,0.02l1.89,-0.38l0.22,-0.18l0.46,-1.14l1.82,-0.4l1.5,-0.91l0.14,-0.19l0.46,-2.12l1.93,-0.51l0.2,-0.18l0.26,-0.68l0.87,0.57l0.13,0.05l0.79,0.09l1.35,0.02l1.83,0.59l0.75,0.34l0.26,-0.01l1.66,-0.85l0.7,0.46l0.42,-0.09l0.72,-1.17l1.32,0.05l0.23,-0.1l0.39,-0.43l0.07,-0.14l0.24,-1.08l0.86,-0.81l0.94,0.46l-0.2,0.64l0.23,0.38l0.49,0.09l-0.21,2.15l0.09,0.25l0.99,0.94l0.38,0.03l0.83,-0.57l1.06,-0.27l0.12,-0.06l1.46,-1.21l1.63,0.2l2.4,0.0l0.17,0.32l-1.12,0.25l-1.23,0.52l-2.86,0.33l-2.69,0.6l-0.13,0.06l-1.46,1.25l-0.07,0.36l0.58,1.18l0.25,1.21l-1.13,1.08l-0.09,0.25l0.09,0.98l-0.53,0.79l-2.22,-0.08l-0.28,0.44l0.83,1.57l-1.3,0.58l-0.13,0.11l-1.06,1.69l-0.05,0.18l0.13,1.51l-0.73,0.58l-0.78,-0.22l-0.14,-0.01l-1.91,0.36l-0.23,0.19l-0.2,0.57l-1.65,-0.0l-0.22,0.1l-1.4,1.56l-0.08,0.19l-0.08,2.13l-2.99,1.05l-1.67,-0.23l-0.27,0.1l-0.39,0.46l-1.43,-0.31l-2.43,0.4l-3.69,-1.23l1.96,-2.15l0.08,-0.24l-0.21,-1.78l-0.23,-0.26l-1.69,-0.42l-0.19,-1.62l-0.77,-2.08l0.98,-1.41l-0.14,-0.45l-0.82,-0.31l0.6,-1.79l0.93,-3.21Z", "name": "Afghanistan"}, "IQ": {"path": "M534.42,190.89l0.13,0.14l1.5,0.78l0.15,1.34l-1.13,0.87l-0.11,0.16l-0.58,2.2l0.04,0.24l1.73,2.67l0.12,0.1l2.99,1.49l1.18,1.94l-0.39,1.89l0.29,0.36l0.5,-0.0l0.02,1.17l0.08,0.2l0.83,0.86l-2.36,-0.29l-0.29,0.13l-1.74,2.49l-4.4,-0.21l-7.03,-5.49l-3.73,-1.94l-2.92,-0.74l-0.89,-3.0l5.33,-2.81l0.15,-0.19l0.95,-3.43l-0.2,-2.0l1.19,-0.61l0.11,-0.09l1.23,-1.73l0.92,-0.38l2.75,0.35l0.81,0.68l0.31,0.05l0.94,-0.38l1.5,3.17Z", "name": "Iraq"}, "IS": {"path": "M384.26,87.96l-0.51,2.35l0.08,0.28l2.61,2.58l-2.99,2.83l-7.16,2.72l-2.08,0.7l-9.51,-1.71l1.89,-1.36l-0.07,-0.53l-4.4,-1.59l3.33,-0.59l0.25,-0.32l-0.11,-1.2l-0.25,-0.27l-4.82,-0.88l1.38,-2.2l3.54,-0.57l3.8,2.74l0.33,0.01l3.68,-2.18l3.02,1.12l0.25,-0.02l4.01,-2.18l3.72,0.27Z", "name": "Iceland"}, "IR": {"path": "M556.2,187.5l2.05,-0.52l0.13,-0.07l1.69,-1.57l1.55,0.08l0.15,-0.03l1.02,-0.5l1.64,0.25l2.82,1.48l1.91,0.3l2.8,2.49l0.18,0.08l1.61,0.09l0.19,2.09l-1.0,3.47l-0.69,2.04l0.18,0.38l0.73,0.28l-0.85,1.22l-0.04,0.28l0.81,2.19l0.19,1.72l0.23,0.26l1.69,0.42l0.17,1.43l-2.18,2.39l-0.01,0.4l1.22,1.42l1.0,1.62l0.12,0.11l2.23,1.11l0.06,2.2l0.2,0.27l1.03,0.38l0.14,0.83l-3.38,1.3l-0.18,0.19l-0.87,2.85l-4.44,-0.76l-2.75,-0.62l-2.64,-0.32l-1.01,-3.11l-0.17,-0.19l-1.2,-0.48l-0.18,-0.01l-1.99,0.51l-2.42,1.25l-2.89,-0.84l-2.48,-2.03l-2.41,-0.79l-1.61,-2.47l-1.84,-3.63l-0.36,-0.15l-1.22,0.4l-1.48,-0.84l-0.37,0.06l-0.72,0.82l-1.08,-1.12l-0.02,-1.35l-0.3,-0.29l-0.43,0.0l0.34,-1.64l-0.04,-0.22l-1.29,-2.11l-0.12,-0.11l-3.0,-1.49l-1.62,-2.49l0.52,-1.98l1.18,-0.92l0.11,-0.27l-0.19,-1.66l-0.16,-0.23l-1.55,-0.81l-1.58,-3.33l-1.3,-2.2l0.41,-0.75l0.03,-0.21l-0.73,-3.12l1.2,-0.59l0.35,0.9l1.26,1.35l0.15,0.09l1.81,0.39l0.91,-0.09l0.15,-0.06l2.9,-2.13l0.7,-0.16l0.48,0.56l-0.75,1.26l0.05,0.37l1.56,1.53l0.28,0.08l0.37,-0.09l0.7,1.89l0.21,0.19l2.31,0.59l1.69,1.4l0.15,0.07l3.66,0.49l3.91,-0.76l0.23,-0.19l0.19,-0.52Z", "name": "Iran"}, "AM": {"path": "M530.51,176.08l2.91,-0.39l0.41,0.63l0.11,0.1l0.66,0.36l-0.32,0.47l0.07,0.41l1.1,0.84l-0.53,0.7l0.06,0.42l1.06,0.8l1.01,0.44l0.04,1.56l-0.44,0.04l-0.88,-1.46l0.01,-0.37l-0.3,-0.31l-0.98,0.01l-0.65,-0.69l-0.26,-0.09l-0.38,0.06l-0.97,-0.82l-1.64,-0.65l0.2,-1.2l-0.02,-0.16l-0.28,-0.69Z", "name": "Armenia"}, "IT": {"path": "M451.68,158.58l0.2,0.16l3.3,0.75l-0.22,1.26l0.02,0.18l0.35,0.78l-1.4,-0.32l-0.21,0.03l-2.04,1.1l-0.16,0.29l0.13,1.47l-0.29,0.82l0.02,0.24l0.82,1.57l0.1,0.11l2.28,1.5l1.29,2.53l2.79,2.43l0.2,0.07l1.83,-0.02l0.31,0.34l-0.46,0.39l0.06,0.5l4.06,1.97l2.06,1.49l0.17,0.36l-0.24,0.53l-1.08,-1.07l-0.15,-0.08l-2.18,-0.49l-0.33,0.15l-1.05,1.91l0.11,0.4l1.63,0.98l-0.22,1.12l-0.84,0.14l-0.22,0.15l-1.27,2.38l-0.54,0.12l0.01,-0.47l0.48,-1.46l0.5,-0.58l0.03,-0.35l-0.97,-1.69l-0.76,-1.48l-0.17,-0.15l-0.94,-0.33l-0.68,-1.18l-0.16,-0.13l-1.53,-0.52l-1.03,-1.14l-0.19,-0.1l-1.78,-0.19l-1.88,-1.3l-2.27,-1.94l-1.64,-1.68l-0.76,-2.94l-0.21,-0.21l-1.22,-0.35l-2.01,-1.0l-0.24,-0.01l-1.15,0.42l-0.11,0.07l-1.38,1.36l-0.5,0.11l0.19,-0.87l-0.21,-0.35l-1.19,-0.34l-0.56,-2.06l0.76,-0.82l0.03,-0.36l-0.68,-1.08l0.04,-0.31l0.68,0.42l0.19,0.04l1.21,-0.15l0.14,-0.06l1.18,-0.89l0.25,0.29l0.25,0.1l1.19,-0.1l0.25,-0.18l0.45,-1.04l1.61,0.34l0.19,-0.02l1.1,-0.53l0.17,-0.22l0.15,-0.95l1.19,0.35l0.35,-0.16l0.23,-0.47l2.11,-0.47l0.45,0.89ZM459.35,184.63l-0.71,1.81l0.0,0.23l0.33,0.79l-0.37,1.03l-1.6,-0.91l-1.33,-0.34l-3.24,-1.36l0.23,-0.99l2.73,0.24l3.95,-0.5ZM443.95,175.91l1.26,1.77l-0.31,3.47l-0.82,-0.13l-0.26,0.08l-0.83,0.79l-0.64,-0.52l-0.1,-3.42l-0.44,-1.34l0.91,0.1l0.21,-0.06l1.01,-0.74Z", "name": "Italy"}, "VN": {"path": "M690.8,230.21l-2.86,1.93l-2.09,2.46l-0.06,0.11l-0.55,1.8l0.04,0.26l4.26,6.1l2.31,1.63l1.46,1.97l1.12,4.62l-0.32,4.3l-1.97,1.57l-2.85,1.62l-2.09,2.14l-2.83,2.13l-0.67,-1.19l0.65,-1.58l-0.09,-0.35l-1.47,-1.14l1.67,-0.79l2.57,-0.18l0.22,-0.47l-0.89,-1.24l3.88,-1.8l0.17,-0.24l0.31,-3.05l-0.01,-0.13l-0.56,-1.63l0.44,-2.48l-0.01,-0.15l-0.63,-1.81l-0.08,-0.12l-1.87,-1.77l-3.64,-5.3l-0.11,-0.1l-2.68,-1.39l0.45,-0.59l1.53,-0.65l0.16,-0.39l-0.97,-2.27l-0.27,-0.18l-2.89,-0.02l-1.04,-2.21l-1.28,-1.83l0.96,-0.46l1.97,0.01l2.43,-0.3l0.13,-0.05l1.95,-1.29l1.04,0.85l0.13,0.06l1.98,0.42l-0.32,1.21l0.09,0.3l1.19,1.07l0.12,0.07l1.88,0.51Z", "name": "Vietnam"}, "AR": {"path": "M258.11,341.34l1.4,1.81l0.51,-0.06l0.89,-1.94l2.51,0.1l0.36,0.49l4.6,4.31l0.15,0.08l1.99,0.39l3.01,1.93l2.5,1.01l0.28,0.91l-2.4,3.97l0.17,0.44l2.57,0.74l2.81,0.41l2.09,-0.44l0.14,-0.07l2.27,-2.06l0.09,-0.17l0.38,-2.2l0.88,-0.36l1.05,1.29l-0.04,1.88l-1.98,1.4l-1.72,1.13l-2.84,2.65l-3.34,3.73l-0.07,0.12l-0.63,2.22l-0.67,2.85l0.02,2.73l-0.47,0.54l-0.07,0.17l-0.36,3.28l0.12,0.27l3.03,2.32l-0.31,1.78l0.11,0.29l1.44,1.15l-0.11,1.17l-2.32,3.57l-3.59,1.51l-4.95,0.6l-2.72,-0.29l-0.32,0.38l0.5,1.67l-0.49,2.13l0.01,0.16l0.4,1.29l-1.27,0.88l-2.41,0.39l-2.33,-1.05l-0.31,0.04l-0.97,0.78l-0.11,0.27l0.35,2.98l0.16,0.23l1.69,0.91l0.31,-0.02l1.08,-0.75l0.46,0.96l-2.1,0.88l-2.01,1.89l-0.09,0.18l-0.36,3.05l-0.51,1.42l-2.16,0.01l-0.19,0.07l-1.96,1.59l-0.1,0.15l-0.72,2.34l0.08,0.31l2.46,2.31l0.13,0.07l2.09,0.56l-0.74,2.45l-2.86,1.75l-0.12,0.14l-1.59,3.71l-2.2,1.24l-0.1,0.09l-1.03,1.54l-0.04,0.23l0.81,3.45l0.06,0.13l1.13,1.32l-2.59,-0.57l-5.89,-0.44l-0.92,-1.73l0.05,-2.4l-0.34,-0.3l-1.49,0.19l-0.72,-0.98l-0.2,-3.21l1.79,-1.33l0.1,-0.13l0.79,-2.04l0.02,-0.16l-0.27,-1.52l1.31,-2.69l0.91,-4.15l-0.23,-1.72l0.91,-0.49l0.15,-0.33l-0.27,-1.16l-0.15,-0.2l-0.87,-0.46l0.65,-1.01l-0.04,-0.37l-1.06,-1.09l-0.54,-3.2l0.83,-0.51l0.14,-0.29l-0.42,-3.6l0.58,-2.98l0.64,-2.5l1.41,-1.0l0.12,-0.32l-0.75,-2.8l-0.01,-2.48l1.81,-1.78l0.09,-0.22l-0.06,-2.3l1.39,-2.69l0.03,-0.14l0.01,-2.58l-0.11,-0.24l-0.57,-0.45l-1.1,-4.59l1.49,-2.73l0.04,-0.17l-0.23,-2.59l0.86,-2.38l1.6,-2.48l1.74,-1.65l0.04,-0.39l-0.64,-0.89l0.42,-0.7l0.04,-0.16l-0.08,-4.26l2.55,-1.23l0.16,-0.18l0.86,-2.75l-0.01,-0.22l-0.22,-0.48l1.84,-2.1l3.0,0.59ZM256.77,438.98l-2.1,0.15l-1.18,-1.14l-0.19,-0.08l-1.53,-0.09l-2.38,-0.0l-0.0,-6.28l0.4,0.65l1.25,2.55l0.11,0.12l3.26,2.07l3.19,0.8l-0.82,1.26Z", "name": "Argentina"}, "AU": {"path": "M705.55,353.06l0.09,0.09l0.37,0.05l0.13,-0.35l-0.57,-1.69l0.48,0.3l0.71,0.99l0.34,0.11l0.2,-0.29l-0.04,-1.37l-0.04,-0.14l-1.22,-2.07l-0.28,-0.9l-0.51,-0.69l0.24,-1.33l0.52,-0.7l0.34,-1.32l0.01,-0.13l-0.25,-1.44l0.51,-0.94l0.1,1.03l0.23,0.26l0.32,-0.14l1.01,-1.72l1.94,-0.84l1.27,-1.14l1.84,-0.92l1.0,-0.18l0.6,0.28l0.26,-0.0l1.94,-0.96l1.48,-0.28l0.19,-0.13l0.32,-0.49l0.51,-0.18l1.42,0.05l2.63,-0.76l0.11,-0.06l1.36,-1.15l0.08,-0.1l0.61,-1.33l1.42,-1.27l0.1,-0.19l0.11,-1.03l0.06,-1.32l1.39,-1.74l0.85,1.79l0.4,0.14l1.07,-0.51l0.11,-0.45l-0.77,-1.05l0.53,-0.84l0.86,0.43l0.43,-0.22l0.29,-1.85l1.29,-1.19l0.6,-0.98l1.16,-0.4l0.2,-0.27l0.02,-0.34l0.74,0.2l0.38,-0.27l0.03,-0.44l1.98,-0.61l1.7,1.08l1.36,1.48l0.22,0.1l1.55,0.02l1.57,0.24l0.33,-0.4l-0.48,-1.27l1.09,-1.86l1.06,-0.63l0.1,-0.42l-0.28,-0.46l0.93,-1.24l1.36,-0.8l1.16,0.27l0.14,0.0l2.1,-0.48l0.23,-0.3l-0.05,-1.3l-0.18,-0.26l-1.08,-0.49l0.44,-0.12l1.52,0.58l1.39,1.06l2.11,0.65l0.19,-0.0l0.59,-0.21l1.44,0.72l0.27,0.0l1.37,-0.68l0.84,0.2l0.26,-0.06l0.37,-0.3l0.82,0.89l-0.56,1.14l-0.84,0.91l-0.75,0.07l-0.26,0.38l0.26,0.9l-0.67,1.15l-0.88,1.24l-0.05,0.25l0.18,0.72l0.12,0.17l1.99,1.42l1.96,0.84l1.25,0.86l1.8,1.51l0.19,0.07l0.63,-0.0l1.15,0.58l0.34,0.7l0.17,0.15l2.39,0.88l0.24,-0.02l1.65,-0.88l0.14,-0.16l0.49,-1.37l0.52,-1.19l0.31,-1.39l0.75,-2.02l0.01,-0.19l-0.33,-1.16l0.16,-0.67l0.0,-0.13l-0.28,-1.41l0.3,-1.78l0.42,-0.45l0.05,-0.33l-0.33,-0.73l0.56,-1.25l0.48,-1.39l0.07,-0.69l0.58,-0.59l0.48,0.84l0.17,1.53l0.17,0.24l0.47,0.23l0.09,0.9l0.05,0.14l0.87,1.23l0.17,1.33l-0.09,0.89l0.03,0.15l0.9,2.0l0.43,0.13l1.38,-0.83l0.71,0.92l1.06,0.88l-0.22,0.96l0.0,0.14l0.53,2.2l0.38,1.3l0.15,0.18l0.52,0.26l0.62,2.01l-0.23,1.27l0.02,0.18l0.81,1.76l0.14,0.14l2.69,1.35l3.21,2.21l-0.2,0.4l0.04,0.34l1.39,1.6l0.95,2.78l0.43,0.16l0.79,-0.46l0.85,0.96l0.39,0.05l0.22,-0.15l0.36,2.33l0.09,0.18l1.78,1.63l1.16,1.01l1.9,2.1l0.67,2.05l0.06,1.47l-0.17,1.64l0.03,0.17l1.16,2.22l-0.14,2.28l-0.43,1.24l-0.68,2.44l0.04,1.63l-0.48,1.92l-1.06,2.43l-1.79,1.32l-0.1,0.12l-0.91,2.15l-0.82,1.37l-0.76,2.47l-0.98,1.46l-0.63,2.14l-0.33,2.02l0.1,0.82l-1.21,0.85l-2.71,0.1l-0.13,0.03l-2.31,1.19l-1.21,1.17l-1.34,1.11l-1.89,-1.18l-1.33,-0.46l0.32,-1.24l-0.4,-0.35l-1.46,0.61l-2.06,1.98l-1.99,-0.73l-1.43,-0.46l-1.45,-0.22l-2.32,-0.81l-1.51,-1.67l-0.45,-2.11l-0.6,-1.5l-0.07,-0.11l-1.23,-1.16l-0.16,-0.08l-1.96,-0.28l0.59,-0.99l0.03,-0.24l-0.61,-2.1l-0.54,-0.08l-1.16,1.85l-1.23,0.29l0.73,-0.88l0.06,-0.12l0.37,-1.57l0.93,-1.33l0.05,-0.2l-0.2,-2.07l-0.53,-0.17l-2.01,2.35l-1.52,0.94l-0.12,0.14l-0.82,1.93l-1.5,-0.9l0.07,-1.32l-0.06,-0.2l-1.57,-2.04l-1.15,-0.92l0.3,-0.41l-0.1,-0.44l-3.21,-1.69l-0.13,-0.03l-1.69,-0.08l-2.35,-1.31l-0.16,-0.04l-4.55,0.27l-3.24,0.99l-2.8,0.91l-2.33,-0.18l-0.17,0.03l-2.63,1.41l-2.14,0.64l-0.2,0.19l-0.47,1.42l-0.8,0.99l-1.99,0.06l-1.55,0.24l-2.27,-0.5l-1.79,0.3l-1.71,0.13l-0.19,0.09l-1.38,1.39l-0.58,-0.1l-0.21,0.04l-1.26,0.8l-1.13,0.85l-1.72,-0.1l-1.6,-0.0l-2.58,-1.76l-1.21,-0.49l0.04,-1.19l1.04,-0.32l0.16,-0.12l0.42,-0.64l0.05,-0.19l-0.09,-0.97l0.3,-2.0l-0.28,-1.64l-1.34,-2.84l-0.39,-1.49l0.1,-1.51l-0.04,-0.17l-0.96,-1.72l-0.06,-0.73l-0.09,-0.19l-1.04,-1.01l-0.3,-2.02l-0.05,-0.12l-1.23,-1.83ZM784.95,393.35l2.39,1.01l0.2,0.01l3.26,-0.96l1.19,0.16l0.16,3.19l-0.78,0.95l-0.07,0.16l-0.19,1.83l-0.43,-0.41l-0.44,0.03l-1.61,1.96l-0.4,-0.12l-1.38,-0.09l-1.43,-2.42l-0.37,-2.03l-1.4,-2.53l0.04,-0.94l1.27,0.2Z", "name": "Australia"}, "IL": {"path": "M509.04,199.22l0.71,0.0l0.27,-0.17l0.15,-0.33l0.19,-0.01l0.02,0.73l-0.27,0.34l0.02,0.08l-0.32,0.62l-0.65,-0.27l-0.41,0.19l-0.52,1.85l0.16,0.35l0.14,0.07l-0.17,0.1l-0.14,0.21l-0.11,0.73l0.39,0.33l0.81,-0.26l0.03,0.64l-0.97,3.43l-1.28,-3.67l0.62,-0.78l-0.03,-0.41l0.58,-1.16l0.5,-2.07l0.27,-0.54Z", "name": "Israel"}, "IN": {"path": "M615.84,192.58l2.4,2.97l-0.24,2.17l0.05,0.2l0.94,1.35l-0.06,0.97l-1.46,-0.3l-0.35,0.36l0.7,3.06l0.12,0.18l2.46,1.75l3.11,1.72l-1.23,0.96l-0.1,0.13l-0.97,2.55l0.16,0.38l2.41,1.02l2.37,1.33l3.27,1.52l3.43,0.37l1.37,1.3l0.17,0.08l1.92,0.25l3.0,0.62l2.15,-0.04l0.28,-0.22l0.29,-1.06l0.0,-0.13l-0.32,-1.66l0.16,-0.94l1.0,-0.37l0.23,2.28l0.18,0.24l2.28,1.02l0.2,0.02l1.52,-0.41l2.06,0.18l2.08,-0.08l0.29,-0.27l0.18,-1.66l-0.1,-0.26l-0.53,-0.44l1.38,-0.23l0.15,-0.07l2.26,-2.0l2.75,-1.65l1.97,0.63l0.25,-0.03l1.54,-0.99l0.89,1.28l-0.72,0.97l0.2,0.48l2.49,0.37l0.11,0.61l-0.69,0.39l-0.15,0.3l0.15,1.22l-1.36,-0.37l-0.23,0.03l-3.24,1.86l-0.15,0.28l0.07,1.44l-1.33,2.16l-0.04,0.13l-0.12,1.24l-0.98,1.91l-1.72,-0.53l-0.39,0.28l-0.09,2.66l-0.52,0.83l-0.04,0.23l0.21,0.89l-0.71,0.36l-1.21,-3.85l-0.29,-0.21l-0.69,0.01l-0.29,0.23l-0.28,1.17l-0.84,-0.84l0.6,-1.17l0.97,-0.13l0.23,-0.16l1.15,-2.25l-0.18,-0.42l-1.54,-0.47l-2.3,0.04l-2.13,-0.33l-0.19,-1.63l-0.26,-0.26l-1.13,-0.13l-1.93,-1.13l-0.42,0.13l-0.88,1.82l0.08,0.37l1.47,1.15l-1.21,0.77l-0.1,0.1l-0.56,0.97l0.13,0.42l1.31,0.61l-0.36,1.35l0.01,0.2l0.85,1.95l0.37,2.05l-0.26,0.68l-1.55,-0.02l-3.09,0.54l-0.25,0.32l0.13,1.84l-1.21,1.4l-3.64,1.79l-2.79,3.04l-1.86,1.61l-2.48,1.68l-0.13,0.25l-0.0,1.0l-1.07,0.55l-2.21,0.9l-1.13,0.13l-0.25,0.19l-0.75,1.96l-0.02,0.15l0.52,3.31l0.13,2.03l-1.03,2.35l-0.03,0.12l-0.01,4.03l-1.02,0.1l-0.23,0.15l-1.14,1.93l0.04,0.36l0.44,0.48l-1.83,0.57l-0.18,0.15l-0.81,1.65l-0.74,0.53l-2.14,-2.12l-1.14,-3.47l-0.96,-2.57l-0.9,-1.26l-1.3,-2.38l-0.61,-3.14l-0.44,-1.62l-2.29,-3.56l-1.03,-4.94l-0.74,-3.29l0.01,-3.12l-0.49,-2.51l-0.41,-0.22l-3.56,1.53l-1.59,-0.28l-2.96,-2.87l0.94,-0.74l0.06,-0.41l-0.74,-1.03l-2.73,-2.1l1.35,-1.43l5.38,0.01l0.29,-0.36l-0.5,-2.29l-0.09,-0.15l-1.33,-1.28l-0.27,-1.96l-0.12,-0.2l-1.36,-1.0l2.42,-2.48l2.77,0.2l0.24,-0.1l2.62,-2.85l1.59,-2.8l2.41,-2.74l0.07,-0.2l-0.04,-1.82l2.01,-1.51l-0.01,-0.49l-1.95,-1.33l-0.83,-1.81l-0.82,-2.27l0.98,-0.97l3.64,0.66l2.89,-0.42l0.17,-0.08l2.18,-2.15Z", "name": "India"}, "TZ": {"path": "M505.77,287.58l0.36,0.23l8.95,5.03l0.15,1.3l0.13,0.21l3.4,2.37l-1.07,2.88l-0.02,0.14l0.15,1.42l0.15,0.23l1.47,0.84l0.05,0.42l-0.66,1.44l-0.02,0.18l0.13,0.72l-0.16,1.16l0.03,0.19l0.87,1.57l1.03,2.48l0.12,0.14l0.53,0.32l-1.59,1.18l-2.64,0.95l-1.45,-0.04l-0.2,0.07l-0.81,0.69l-1.64,0.06l-0.68,0.3l-2.9,-0.69l-1.71,0.17l-0.65,-3.18l-0.05,-0.12l-1.35,-1.88l-0.19,-0.12l-2.41,-0.46l-1.38,-0.74l-1.63,-0.44l-0.96,-0.41l-0.95,-0.58l-1.31,-3.09l-1.47,-1.46l-0.45,-1.31l0.24,-1.34l-0.39,-1.99l0.71,-0.08l0.18,-0.09l0.91,-0.91l0.98,-1.31l0.59,-0.5l0.11,-0.24l-0.02,-0.81l-0.08,-0.2l-0.47,-0.5l-0.1,-0.67l0.51,-0.23l0.18,-0.25l0.14,-1.47l-0.05,-0.2l-0.76,-1.09l0.45,-0.15l2.71,0.03l5.01,-0.19Z", "name": "Tanzania"}, "AZ": {"path": "M539.36,175.66l0.16,0.09l1.11,0.2l0.32,-0.15l0.4,-0.71l1.22,-0.99l1.11,1.33l1.26,2.09l0.22,0.14l1.06,0.13l0.28,0.29l-1.46,0.17l-0.26,0.24l-0.43,2.26l-0.39,0.92l-0.85,0.63l-0.12,0.25l0.06,1.2l-0.22,0.05l-1.28,-1.25l0.74,-1.25l-0.03,-0.35l-0.74,-0.86l-0.3,-0.1l-1.05,0.27l-2.49,1.82l-0.04,-1.46l-0.18,-0.27l-1.09,-0.47l-0.8,-0.6l0.53,-0.7l-0.06,-0.42l-1.11,-0.84l0.34,-0.51l-0.11,-0.43l-0.89,-0.48l-0.33,-0.49l0.25,-0.2l1.78,0.81l1.35,0.18l0.25,-0.09l0.34,-0.35l0.02,-0.39l-1.04,-1.36l0.28,-0.18l0.49,0.07l1.65,1.74ZM533.53,180.16l0.63,0.67l0.22,0.09l0.8,-0.0l0.04,0.31l0.66,1.09l-0.94,-0.21l-1.16,-1.24l-0.25,-0.71Z", "name": "Azerbaijan"}, "IE": {"path": "M405.17,135.35l0.36,2.16l-1.78,2.84l-4.28,1.91l-3.02,-0.43l1.81,-3.13l0.02,-0.26l-1.23,-3.26l3.24,-2.56l1.54,-1.32l0.37,1.33l-0.49,1.77l0.3,0.38l1.49,-0.05l1.68,0.63Z", "name": "Ireland"}, "ID": {"path": "M756.56,287.86l0.69,4.02l0.15,0.21l2.59,1.5l0.39,-0.07l2.05,-2.61l2.75,-1.45l2.09,-0.0l2.08,0.85l1.85,0.89l2.52,0.46l0.08,15.44l-1.72,-1.6l-0.15,-0.07l-2.54,-0.51l-0.29,0.1l-0.53,0.62l-2.53,0.06l0.78,-1.51l1.48,-0.66l0.17,-0.34l-0.65,-2.74l-1.23,-2.19l-0.14,-0.13l-4.85,-2.13l-2.09,-0.23l-3.7,-2.28l-0.41,0.1l-0.67,1.11l-0.63,0.14l-0.41,-0.67l-0.01,-1.01l-0.14,-0.25l-1.39,-0.89l2.05,-0.69l1.73,0.05l0.29,-0.39l-0.21,-0.66l-0.29,-0.21l-3.5,-0.0l-0.9,-1.36l-0.19,-0.13l-2.14,-0.44l-0.65,-0.76l2.86,-0.51l1.28,-0.79l3.75,0.96l0.32,0.76ZM758.01,300.37l-0.79,1.04l-0.14,-1.07l0.4,-0.81l0.29,-0.47l0.24,0.31l-0.0,1.0ZM747.45,292.9l0.48,1.02l-1.45,-0.69l-2.09,-0.21l-1.45,0.16l-1.28,-0.07l0.35,-0.81l2.86,-0.1l2.58,0.68ZM741.15,285.69l-0.16,-0.25l-0.72,-3.08l0.47,-1.86l0.35,-0.38l0.1,0.73l0.25,0.26l1.28,0.19l0.18,0.78l-0.11,1.8l-0.96,-0.18l-0.35,0.22l-0.38,1.52l0.05,0.24ZM741.19,285.75l0.76,0.97l-0.11,0.05l-0.65,-1.02ZM739.18,293.52l-0.61,0.54l-1.44,-0.38l-0.25,-0.55l1.93,-0.09l0.36,0.48ZM728.4,295.87l-0.27,-0.07l-2.26,0.89l-0.37,-0.41l0.27,-0.8l-0.09,-0.33l-1.68,-1.37l0.17,-2.29l-0.42,-0.3l-1.67,0.76l-0.17,0.29l0.21,2.92l0.09,3.34l-1.22,0.28l-0.78,-0.54l0.65,-2.1l0.01,-0.14l-0.39,-2.42l-0.29,-0.25l-0.86,-0.02l-0.63,-1.4l0.99,-1.61l0.35,-1.97l1.24,-3.73l0.49,-0.96l1.95,-1.7l1.86,0.69l3.16,0.35l2.92,-0.1l0.17,-0.06l2.24,-1.65l0.11,0.14l-1.8,2.22l-1.72,0.44l-2.41,-0.48l-4.21,0.13l-2.19,0.36l-0.25,0.24l-0.36,1.9l0.08,0.27l2.24,2.23l0.4,0.02l1.29,-1.08l3.19,-0.58l-0.19,0.06l-1.04,1.4l-2.13,0.94l-0.12,0.45l2.26,3.06l-0.37,0.69l0.03,0.32l1.51,1.95ZM728.48,295.97l0.59,0.76l-0.02,1.37l-1.0,0.55l-0.64,-0.58l1.09,-1.84l-0.02,-0.26ZM728.64,286.95l0.79,-0.14l-0.07,0.39l-0.72,-0.24ZM732.38,310.1l-1.89,0.49l-0.06,-0.06l0.17,-0.64l1.0,-1.42l2.14,-0.87l0.1,0.2l0.04,0.58l-1.49,1.72ZM728.26,305.71l-0.17,0.63l-3.53,0.67l-3.02,-0.28l-0.0,-0.42l1.66,-0.44l1.47,0.71l0.16,0.03l1.75,-0.21l1.69,-0.69ZM722.98,310.33l-0.74,0.03l-2.52,-1.35l1.42,-0.3l1.19,0.7l0.72,0.63l-0.06,0.28ZM716.24,305.63l0.66,0.49l0.22,0.06l1.35,-0.18l0.31,0.53l-4.18,0.77l-0.8,-0.01l0.51,-0.86l1.2,-0.02l0.24,-0.12l0.49,-0.65ZM715.84,280.21l0.09,0.34l2.25,1.86l-2.25,0.22l-0.24,0.17l-0.84,1.71l-0.03,0.15l0.1,2.11l-2.27,1.62l-0.13,0.24l-0.06,2.46l-0.74,2.92l-0.02,-0.05l-0.39,-0.16l-2.62,1.04l-0.86,-1.33l-0.23,-0.14l-1.71,-0.14l-1.19,-0.76l-0.25,-0.03l-2.78,0.84l-0.79,-1.05l-0.26,-0.12l-1.61,0.13l-1.8,-0.25l-0.36,-3.13l-0.15,-0.23l-1.18,-0.65l-1.13,-2.02l-0.33,-2.1l0.27,-2.19l1.05,-1.17l0.28,1.12l0.1,0.16l1.71,1.41l0.28,0.05l1.55,-0.49l1.54,0.17l0.23,-0.07l1.4,-1.21l1.05,-0.19l2.3,0.68l0.16,0.0l2.04,-0.53l0.21,-0.19l1.26,-3.41l0.91,-0.82l0.09,-0.14l0.8,-2.64l2.63,0.0l1.71,0.33l-1.19,1.89l0.02,0.34l1.74,2.24l-0.37,1.0ZM692.67,302.0l0.26,0.19l4.8,0.25l0.28,-0.16l0.44,-0.83l4.29,1.12l0.85,1.52l0.23,0.15l3.71,0.45l2.37,1.15l-2.06,0.69l-2.77,-1.0l-2.25,0.07l-2.57,-0.18l-2.31,-0.45l-2.94,-0.97l-1.84,-0.25l-0.13,0.01l-0.97,0.29l-4.34,-0.98l-0.38,-0.94l-0.25,-0.19l-1.76,-0.14l1.31,-1.84l2.81,0.14l1.97,0.96l0.95,0.19l0.28,0.74ZM685.63,299.27l-2.36,0.04l-2.07,-2.05l-3.17,-2.02l-1.06,-1.5l-1.88,-2.02l-1.22,-1.85l-1.9,-3.49l-2.2,-2.11l-0.71,-2.08l-0.94,-1.99l-0.1,-0.12l-2.21,-1.54l-1.35,-2.17l-1.86,-1.39l-2.53,-2.68l-0.14,-0.81l1.22,0.08l3.76,0.47l2.16,2.4l1.94,1.7l1.37,1.04l2.35,2.67l0.22,0.1l2.44,0.04l1.99,1.62l1.42,2.06l0.09,0.09l1.67,1.0l-0.88,1.8l0.11,0.39l1.44,0.87l0.13,0.04l0.68,0.05l0.41,1.62l0.87,1.4l0.22,0.14l1.71,0.21l1.06,1.38l-0.61,3.04l-0.09,3.6Z", "name": "Indonesia"}, "UA": {"path": "M500.54,141.42l0.9,0.13l0.27,-0.11l0.52,-0.62l0.68,0.13l2.43,-0.3l1.32,1.57l-0.45,0.48l-0.07,0.26l0.21,1.03l0.27,0.24l1.85,0.15l0.76,1.22l-0.05,0.55l0.2,0.31l3.18,1.15l0.18,0.01l1.75,-0.47l1.42,1.41l0.22,0.09l1.42,-0.03l3.44,0.99l0.02,0.65l-0.97,1.62l-0.03,0.24l0.52,1.67l-0.29,0.79l-2.24,0.22l-0.14,0.05l-1.29,0.89l-0.13,0.23l-0.07,1.16l-1.75,0.22l-0.12,0.04l-1.6,0.98l-2.27,0.16l-0.12,0.04l-2.16,1.17l-0.16,0.29l0.15,1.94l0.14,0.23l1.23,0.75l0.18,0.04l2.06,-0.15l-0.22,0.51l-2.67,0.54l-3.27,1.72l-1.0,-0.45l0.45,-1.19l-0.19,-0.39l-2.34,-0.78l0.15,-0.2l2.32,-1.0l0.09,-0.49l-0.73,-0.72l-0.15,-0.08l-3.69,-0.75l-0.14,-0.96l-0.35,-0.25l-2.32,0.39l-0.21,0.15l-0.91,1.7l-1.77,2.1l-0.93,-0.44l-0.24,-0.0l-1.05,0.45l-0.48,-0.25l0.13,-0.07l0.14,-0.15l0.43,-1.04l0.67,-0.97l0.04,-0.26l-0.1,-0.31l0.04,-0.02l0.11,0.19l0.24,0.15l1.48,0.09l0.78,-0.25l0.07,-0.53l-0.27,-0.19l0.09,-0.25l-0.08,-0.33l-0.81,-0.74l-0.34,-1.24l-0.14,-0.18l-0.73,-0.42l0.15,-0.87l-0.11,-0.29l-1.13,-0.86l-0.15,-0.06l-0.97,-0.11l-1.79,-0.97l-0.2,-0.03l-1.66,0.32l-0.13,0.06l-0.52,0.41l-0.95,-0.0l-0.23,0.11l-0.56,0.66l-1.74,0.29l-0.79,0.43l-1.01,-0.68l-0.16,-0.05l-1.57,-0.01l-1.52,-0.35l-0.23,0.04l-0.71,0.45l-0.09,-0.43l-0.13,-0.19l-1.18,-0.74l0.38,-1.02l0.53,-0.64l0.35,0.12l0.37,-0.41l-0.57,-1.29l2.1,-2.5l1.16,-0.36l0.2,-0.2l0.27,-0.92l-0.01,-0.2l-1.1,-2.52l0.79,-0.09l0.13,-0.05l1.3,-0.86l1.83,-0.07l2.48,0.26l2.84,0.8l1.91,0.06l0.88,0.45l0.29,-0.01l0.72,-0.44l0.49,0.58l0.25,0.11l2.2,-0.16l0.94,0.3l0.39,-0.26l0.15,-1.57l0.61,-0.59l2.01,-0.19Z", "name": "Ukraine"}, "QA": {"path": "M548.47,221.47l-0.15,-1.72l0.59,-1.23l0.38,-0.16l0.54,0.6l0.04,1.4l-0.47,1.37l-0.41,0.11l-0.53,-0.37Z", "name": "Qatar"}, "MZ": {"path": "M507.71,314.14l1.65,-0.18l2.96,0.7l0.2,-0.02l0.6,-0.29l1.68,-0.06l0.18,-0.07l0.8,-0.69l1.5,0.02l2.74,-0.98l1.74,-1.27l0.25,0.7l-0.1,2.47l0.31,2.27l0.1,3.97l0.42,1.24l-0.7,1.71l-0.94,1.73l-1.52,1.52l-5.06,2.21l-2.88,2.8l-1.01,0.51l-1.72,1.81l-0.99,0.58l-0.15,0.23l-0.21,1.86l0.04,0.19l1.17,1.95l0.47,1.47l0.03,0.74l0.39,0.28l0.05,-0.01l-0.06,2.13l-0.39,1.19l0.1,0.33l0.42,0.32l-0.28,0.83l-0.95,0.86l-2.03,0.88l-3.08,1.49l-1.1,0.99l-0.09,0.28l0.21,1.13l0.21,0.23l0.38,0.11l-0.14,0.89l-1.39,-0.02l-0.17,-0.94l-0.38,-1.23l-0.2,-0.89l0.44,-2.91l-0.01,-0.14l-0.65,-1.88l-1.15,-3.55l2.52,-2.85l0.68,-1.89l0.29,-0.18l0.14,-0.2l0.28,-1.53l-0.03,-0.19l-0.36,-0.7l0.1,-1.83l0.49,-1.84l-0.01,-3.26l-0.14,-0.25l-1.3,-0.83l-0.11,-0.04l-1.08,-0.17l-0.47,-0.55l-0.1,-0.08l-1.16,-0.54l-0.13,-0.03l-1.83,0.04l-0.32,-2.25l7.19,-1.99l1.32,1.12l0.29,0.06l0.55,-0.19l0.75,0.49l0.11,0.81l-0.49,1.11l-0.02,0.15l0.19,1.81l0.09,0.18l1.63,1.59l0.48,-0.1l0.72,-1.68l0.99,-0.49l0.17,-0.29l-0.21,-3.29l-0.04,-0.13l-1.11,-1.92l-0.9,-0.82l-0.21,-0.08l-0.62,0.03l-0.63,-2.98l0.61,-1.67Z", "name": "Mozambique"}}, "height": 440.7063107441331, "projection": {"type": "mill", "centralMeridian": 11.5}, "width": 900.0});
},{}],"/Code/html/themes/themekit/lib/maps/js/vector/custom/mall-map.js":[function(require,module,exports){
jQuery.fn.vectorMap('addMap', 'mall', {"width":694,"height":213,"paths":{"F102":{"name":"Nike","path":"M13.74 162.23L30.83 160.72L36.51 151.85L31.53 65.98L23.53 59.28L7.96 60.36"},"F103":{"name":"La Maison","path":"M40.51 57.55L41.81 84.48L52.62 94.54L74.14 93.02L71.98 55.50"},"F105":{"name":"","path":"M72.73 55.60L89.17 54.74L91.44 91.61L74.68 92.91"},"F106":{"name":"","path":"M90.04 54.52L120.21 52.47L122.81 89.35L91.98 91.51"},"F108":{"name":"Hairsmiths Unisex Hair Salon","path":"M121.08 52.47L137.08 51.50L139.35 88.37L123.45 89.24"},"F109":{"name":"Terra Plana","path":"M137.84 51.49L152.87 50.52L154.71 87.18L140.11 88.26"},"F110":{"name":"Mariella Nails","path":"M153.95 50.52L169.74 49.55L172.01 86.21L155.79 87.18"},"F111":{"name":"Goveci","path":"M170.93 49.55L204.91 47.59L207.27 83.94L173.09 86.21"},"F114":{"name":"SoEasy","path":"M205.68 47.42L225.02 46.44L227.22 82.86L208.13 83.98"},"F166":{"name":"Espressamente Illy","path":"M225.98 46.22L260.40 44.25L251.39 64.09L252.72 81.12L228.38 82.86"},"F167":{"name":"An’ge Paris","path":"M308.57 71.34c-2.03 3.49 -2.68 6.70 -2.68 6.70l-52.24 3.08l-0.95 -16.84l9.16 -20.03l46.71 27.01"},"F169V":{"name":"Veranda","path":"M283.35 44.43l-9.68 -8.62c0.00 0.00 21.95 -26.06 58.17 -30.98c7.14 -0.97 6.54 10.85 6.71 11.84C338.71 17.66 309.52 17.29 283.35 44.43z"},"F169":{"name":"Ocean Basket","path":"M310.27 68.09c0.00 0.00 9.24 -16.87 30.50 -20.28c0.23 -0.04 -2.27 -31.79 -2.27 -31.79s-33.42 3.24 -55.16 28.39L310.27 68.09z"},"F172V":{"name":"Veranda","path":"M411.35 45.06l9.50 -8.60c0.00 0.00 -23.48 -27.41 -57.86 -31.15c-7.10 -0.77 -6.64 11.36 -6.80 12.33S385.39 18.46 411.35 45.06z"},"F172":{"name":"T.G.I Friday’s","path":"M384.25 68.99c0.00 0.00 -8.84 -17.27 -30.17 -21.01c-0.23 -0.04 2.12 -31.31 2.12 -31.31s33.42 3.24 55.15 28.39L384.25 68.99z"},"F170":{"name":"Video Arcade &  Gaming Zone","path":"M344.18 47.33l-1.30 -17.52h9.90 0.00l-1.30 17.68C351.48 47.49 348.07 47.17 344.18 47.33z"},"F174":{"name":"Taco Bell","path":"M388.79 80.67l68.38 2.03l2.97 -36.50L434.50 44.25l-48.18 29.20C386.32 73.45 387.65 76.29 388.79 80.67z"},"F115":{"name":"Early Learning Centre","path":"M460.97 46.36L492.28 48.47L489.52 84.96L458.22 82.69"},"F117":{"name":"","path":"M490.50 84.96L505.42 85.94L507.74 49.62L493.06 48.80"},"F118":{"name":"Hart","path":"M506.41 85.98L521.38 87.02L524.08 50.74L508.99 49.76"},"F119":{"name":"","path":"M522.13 87.03L541.70 88.44L544.19 52.33L525.05 50.90"},"F120":{"name":"","path":"M542.39 88.38L545.11 52.27L572.20 54.06L570.00 90.19"},"F122":{"name":"Mavros","path":"M570.77 90.19L573.08 54.13L601.62 56.09L598.67 92.05"},"F124":{"name":"","path":"M599.75 92.05L602.58 56.19L622.37 57.48L619.75 93.34"},"F125":{"name":"Energiers","path":"M620.49 93.46L623.19 57.74L655.39 59.82L653.20 86.10L643.28 95.41"},"F126":{"name":"","path":"M662.77 67.61L671.37 61.12L686.29 62.09L678.99 158.29L663.75 157.48L656.77 149.20"},"F128":{"name":"Pablosky","path":"M627.57 160.48L646.57 161.73L649.63 125.68L630.65 124.38"},"F129":{"name":"","path":"M605.83 159.10L626.46 160.48L629.68 124.22L609.08 122.76"},"F130":{"name":"","path":"M584.42 157.71L604.86 159.10L608.43 122.60L587.67 121.30"},"F132":{"name":"Cinnabon","path":"M558.95 155.93L583.61 157.71L587.02 121.14L561.87 119.52"},"F133":{"name":"","path":"M542.89 154.88L558.33 155.93L560.90 119.52L545.81 118.38"},"F134":{"name":"Crocodilino","path":"M517.75 153.42L541.79 154.80L544.84 118.38L520.67 116.60"},"F135":{"name":"Krystalo - Fanelaki","path":"M501.69 152.28L516.78 153.26L519.70 116.76L504.29 115.62"},"F136":{"name":"Lepus","path":"M454.00 149.04L500.72 152.28L503.31 115.62L455.46 112.54"},"F139":{"name":"Engino","path":"M410.80 131.47L414.37 134.71L441.29 136.33L449.24 112.33L417.77 109.73"},"FR01":{"name":"Rest Rooms","path":"M429.13 135.93l11.92 0.89c0.00 0.00 -5.84 15.17 -13.87 26.36l-8.76 -6.57C418.42 156.61 426.49 145.28 429.13 135.93z"},"F153":{"name":"Al Rifai","path":"M283.19 130.87L279.58 134.12L253.17 135.90L244.41 111.08L276.21 109.38"},"FR02":{"name":"Rest Rooms","path":"M265.09 135.56l-11.68 0.91c0.00 0.00 5.24 15.60 13.63 26.52l9.65 -7.14C276.69 155.85 268.03 144.82 265.09 135.56z"},"FFC":{"name":"Food Court","path":"M280.37 109.08l26.93 -2.92c0.00 0.00 8.16 25.94 39.88 26.98c19.71 0.65 34.63 -14.85 39.42 -26.93c0.12 -0.30 26.15 3.35 26.15 3.35s-4.54 18.49 -15.57 30.98c-0.11 0.12 29.66 22.84 29.66 22.84c-0.00 0.00 -12.98 18.33 -36.01 29.69c-32.08 15.81 -86.95 17.77 -123.58 -29.50c-0.40 -0.51 28.88 -20.77 28.88 -20.77S278.21 110.65 280.37 109.08z"},"F155":{"name":"155 Fashion","path":"M239.87 148.15L224.95 148.39L221.87 112.38L243.12 111.08L245.88 136.71L243.93 133.31L239.55 133.63"},"F156":{"name":"Giacomo de Luca","path":"M201.43 113.52L220.89 112.22L223.81 148.55L204.35 150.01"},"F157":{"name":"G+ Collections","path":"M179.85 115.30L200.62 113.67L203.54 150.01L182.93 151.47"},"F158":{"name":"Femme Femme","path":"M157.14 116.76L178.80 115.30L181.79 151.56L160.12 153.19"},"F159":{"name":"","path":"M134.92 154.72L159.01 153.26L156.33 116.76L132.00 118.22"},"F160":{"name":"Le Rouge","path":"M110.10 156.50L133.78 154.88L131.03 118.22L107.50 120.00"},"F162":{"name":"","path":"M91.77 157.64L109.29 156.50L106.53 120.08L89.33 121.14"},"F164":{"name":"","path":"M67.27 159.42L90.96 157.64L88.52 121.30L64.76 122.68"},"F165":{"name":"Ose","path":"M47.97 160.72L66.30 159.42L63.95 122.68L45.62 123.82"},"FR03":{"name":"Rest Rooms","path":"M239.93 133.90L243.82 133.69L245.79 136.96L245.79 140.93L240.03 141.01"},"FR04":{"name":"Rest Rooms","path":"M245.77 148.04L240.20 148.07L240.03 141.25L245.77 141.19"}}});
},{}],"/Code/html/themes/themekit/lib/maps/js/vector/main.js":[function(require,module,exports){
require('./custom/jquery-jvectormap-de-merc-en');
require('./custom/jquery-jvectormap-es-merc-en');
require('./custom/jquery-jvectormap-fr-merc-en');
require('./custom/jquery-jvectormap-us-aea-en');
require('./custom/jquery-jvectormap-us-lcc-en');
require('./custom/jquery-jvectormap-world-mill-en');
require('./custom/mall-map');

(function ($) {

    var skin = require('../_skin')();
    var gdpData = require('./_gdpData')();

    // GDP by country
    $.fn.tkVectorWorldMapGDP = function () {

        if (! this.length) return;

        this.vectorMap({
            map: 'world_mill_en',
            zoomOnScroll: false,
            backgroundColor: "#fff",
            series: {
                regions: [ {
                    values: gdpData,
                    scale: [ config.skins[ skin ][ 'primary-color' ], colors[ 'info-color' ] ],
                    normalizeFunction: 'polynomial'
                } ]
            },
            onLabelShow: function (e, el, code) {
                el.html(el.html() + ' (GDP - ' + gdpData[ code ] + ')');
            }
        });
    };

    // World map markers
    $.fn.tkVectorWorldMapMarkers = function () {

        if (! this.length) return;

        this.vectorMap({
            map: 'world_mill_en',
            regionStyle: {
                initial: {
                    fill: config.skins[ skin ][ 'primary-color' ]
                }
            },
            zoomOnScroll: false,
            normalizeFunction: 'polynomial',
            hoverOpacity: 0.7,
            hoverColor: false,
            markerStyle: {
                initial: {
                    fill: colors[ 'danger-color' ],
                    stroke: '#fff'
                }
            },
            backgroundColor: "#fff",
            markers: [
                {latLng: [ 41.90, 12.45 ], name: 'Vatican City'},
                {latLng: [ 43.73, 7.41 ], name: 'Monaco'},
                {latLng: [ - 0.52, 166.93 ], name: 'Nauru'},
                {latLng: [ - 8.51, 179.21 ], name: 'Tuvalu'},
                {latLng: [ 43.93, 12.46 ], name: 'San Marino'},
                {latLng: [ 47.14, 9.52 ], name: 'Liechtenstein'},
                {latLng: [ 7.11, 171.06 ], name: 'Marshall Islands'},
                {latLng: [ 17.3, - 62.73 ], name: 'Saint Kitts and Nevis'},
                {latLng: [ 3.2, 73.22 ], name: 'Maldives'},
                {latLng: [ 35.88, 14.5 ], name: 'Malta'},
                {latLng: [ 12.05, - 61.75 ], name: 'Grenada'},
                {latLng: [ 13.16, - 61.23 ], name: 'Saint Vincent and the Grenadines'},
                {latLng: [ 13.16, - 59.55 ], name: 'Barbados'},
                {latLng: [ 17.11, - 61.85 ], name: 'Antigua and Barbuda'},
                {latLng: [ - 4.61, 55.45 ], name: 'Seychelles'},
                {latLng: [ 7.35, 134.46 ], name: 'Palau'},
                {latLng: [ 42.5, 1.51 ], name: 'Andorra'},
                {latLng: [ 14.01, - 60.98 ], name: 'Saint Lucia'},
                {latLng: [ 6.91, 158.18 ], name: 'Federated States of Micronesia'},
                {latLng: [ 1.3, 103.8 ], name: 'Singapore'},
                {latLng: [ 1.46, 173.03 ], name: 'Kiribati'},
                {latLng: [ - 21.13, - 175.2 ], name: 'Tonga'},
                {latLng: [ 15.3, - 61.38 ], name: 'Dominica'},
                {latLng: [ - 20.2, 57.5 ], name: 'Mauritius'},
                {latLng: [ 26.02, 50.55 ], name: 'Bahrain'},
                {latLng: [ 0.33, 6.73 ], name: 'So Tom and Prncipe'}
            ]
        });
    };

    // USA unemployment
    $.fn.tkVectorUSAUnemployment = function () {

        if (! this.length) return;

        var container = this;

        $.getJSON('js/data/vector_maps/us-unemployment.json', function (data) {

            var val = 2009,
                statesValues = jvm.values.apply({}, jvm.values(data.states)),
                metroPopValues = Array.prototype.concat.apply([], jvm.values(data.metro.population)),
                metroUnemplValues = Array.prototype.concat.apply([], jvm.values(data.metro.unemployment));

            container.vectorMap({
                map: 'us_aea_en',
                markers: data.metro.coords,
                backgroundColor: "#fff",
                zoomOnScroll: false,
                series: {
                    markers: [ {
                        attribute: 'fill',
                        scale: [ colors[ 'danger-color' ] ],
                        values: data.metro.unemployment[ val ],
                        min: jvm.min(metroUnemplValues),
                        max: jvm.max(metroUnemplValues)
                    }, {
                        attribute: 'r',
                        scale: [ 5, 20 ],
                        values: data.metro.population[ val ],
                        min: jvm.min(metroPopValues),
                        max: jvm.max(metroPopValues)
                    } ],
                    regions: [ {
                        scale: [ config.skins[ skin ][ 'primary-color' ], colors[ 'info-color' ] ],
                        attribute: 'fill',
                        values: data.states[ val ],
                        min: jvm.min(statesValues),
                        max: jvm.max(statesValues)
                    } ]
                },
                onMarkerLabelShow: function (event, label, index) {
                    label.html(
                        '<b>' + data.metro.names[ index ] + '</b><br/>' +
                        '<b>Population: </b>' + data.metro.population[ val ][ index ] + '</br>' +
                        '<b>Unemployment rate: </b>' + data.metro.unemployment[ val ][ index ] + '%'
                    );
                },
                onRegionLabelShow: function (event, label, code) {
                    label.html(
                        '<b>' + label.html() + '</b></br>' +
                        '<b>Unemployment rate: </b>' + data.states[ val ][ code ] + '%'
                    );
                }
            });
        });
    };

    // regions selection
    $.fn.tkVectorRegionSelection = function () {

        if (! this.length) return;

        var container = this,

            map = new jvm.Map({
                container: container,
                map: 'de_merc_en',
                regionsSelectable: true,
                markersSelectable: true,
                backgroundColor: "#fff",
                zoomOnScroll: false,
                markers: [
                    {latLng: [ 52.50, 13.39 ], name: 'Berlin'},
                    {latLng: [ 53.56, 10.00 ], name: 'Hamburg'},
                    {latLng: [ 48.13, 11.56 ], name: 'Munich'},
                    {latLng: [ 50.95, 6.96 ], name: 'Cologne'},
                    {latLng: [ 50.11, 8.68 ], name: 'Frankfurt am Main'},
                    {latLng: [ 48.77, 9.17 ], name: 'Stuttgart'},
                    {latLng: [ 51.23, 6.78 ], name: 'Dusseldorf'},
                    {latLng: [ 51.51, 7.46 ], name: 'Dortmund'},
                    {latLng: [ 51.45, 7.01 ], name: 'Essen'},
                    {latLng: [ 53.07, 8.80 ], name: 'Bremen'}
                ],
                markerStyle: {
                    initial: {
                        fill: colors[ 'danger-color' ]
                    },
                    selected: {
                        fill: colors[ 'success-color' ]
                    }
                },
                regionStyle: {
                    initial: {
                        fill: config.skins[ skin ][ 'primary-color' ]
                    },
                    selected: {
                        fill: colors[ 'default-color' ]
                    }
                },
                series: {
                    markers: [ {
                        attribute: 'r',
                        scale: [ 5, 15 ],
                        values: [
                            887.70,
                            755.16,
                            310.69,
                            405.17,
                            248.31,
                            207.35,
                            217.22,
                            280.71,
                            210.32,
                            325.42
                        ]
                    } ]
                },
                onRegionSelected: function () {
                    if (window.localStorage) {
                        window.localStorage.setItem(
                            'jvectormap-selected-regions',
                            JSON.stringify(map.getSelectedRegions())
                        );
                    }
                },
                onMarkerSelected: function () {
                    if (window.localStorage) {
                        window.localStorage.setItem(
                            'jvectormap-selected-markers',
                            JSON.stringify(map.getSelectedMarkers())
                        );
                    }
                }
            });
        map.setSelectedRegions(JSON.parse(window.localStorage.getItem('jvectormap-selected-regions') || '[]'));
        map.setSelectedMarkers(JSON.parse(window.localStorage.getItem('jvectormap-selected-markers') || '[]'));
    };

    // France elections
    $.fn.tkVectorFranceElections = function () {

        if (! this.length) return;

        $.getJSON('js/data/vector_maps/france-elections.json', function (data) {
            new jvm.Map({
                map: 'fr_merc_en',
                backgroundColor: "#fff",
                container: $('#france-2007'),
                zoomOnScroll: false,
                series: {
                    regions: [ {
                        scale: {
                            '1': config.skins[ skin ][ 'primary-color' ],
                            '2': colors[ 'danger-color' ]
                        },
                        attribute: 'fill',
                        values: data.year2007.results
                    } ]
                }
            });

            new jvm.Map({
                map: 'fr_merc_en',
                container: $('#france-2012'),
                backgroundColor: "#fff",
                zoomOnScroll: false,
                series: {
                    regions: [ {
                        scale: {
                            '1': config.skins[ skin ][ 'primary-color' ],
                            '2': colors[ 'danger-color' ]
                        },
                        attribute: 'fill',
                        values: data.year2012.results
                    } ]
                }
            });
        });
    };

    // random colors
    var palette = [ colors[ 'danger-color' ], config.skins[ skin ][ 'primary-color' ], colors[ 'success-color' ], colors[ 'warning-color' ], colors[ 'purple-color' ], colors[ 'default-color' ], colors[ 'inverse-color' ] ], colorsMap;

    var generateColors = function () {
        var colors = {},
            key;

        for (key in colorsMap.regions) {
            colors[ key ] = palette[ Math.floor(Math.random() * palette.length) ];
        }
        return colors;
    };

    $.fn.tkVectorRandomColors = function () {

        if (! this.length) return;

        colorsMap = new jvm.Map({
            map: 'es_merc_en',
            backgroundColor: "#fff",
            container: this,
            zoomOnScroll: false,
            series: {
                regions: [ {
                    attribute: 'fill'
                } ]
            }
        });

        colorsMap.series.regions[ 0 ].setValues(generateColors());

        $('#update-colors-button').click(function (e) {
            e.preventDefault();
            colorsMap.series.regions[ 0 ].setValues(generateColors());
        });

    };

    // mall map
    $.fn.tkVectorMallMap = function () {

        if (! this.length) return;

        this.vectorMap({
            map: 'mall',
            backgroundColor: "#fff",
            zoomOnScroll: false,
            markers: [ {
                coords: [ 60, 110 ],
                name: 'Escalator 1',
                style: {fill: colors[ 'danger-color' ], stroke: "#fff"}
            }, {
                coords: [ 260, 95 ],
                name: 'Escalator 2',
                style: {fill: colors[ 'danger-color' ], stroke: "#fff"}
            }, {
                coords: [ 434, 95 ],
                name: 'Escalator 3',
                style: {fill: colors[ 'danger-color' ], stroke: "#fff"}
            }, {
                coords: [ 634, 110 ],
                name: 'Escalator 4',
                style: {fill: colors[ 'danger-color' ], stroke: "#fff"}
            } ],
            series: {
                regions: [ {
                    values: {
                        F102: 'SPORTS & OUTDOOR',
                        F103: 'HOME DECOR',
                        F105: 'FASHION',
                        F106: 'OTHER',
                        F108: 'BEAUTY & SPA',
                        F109: 'FASHION',
                        F110: 'BEAUTY & SPA',
                        F111: 'URBAN FAVORITES',
                        F114: 'SERVICES',
                        F166: 'DINING',
                        F167: 'FASHION',
                        F169: 'DINING',
                        F170: 'ENTERTAINMENT',
                        F172: 'DINING',
                        F174: 'DINING',
                        F115: 'KIDS STUFF',
                        F117: 'LIFESTYLE',
                        F118: 'URBAN FAVORITES',
                        F119: 'FASHION',
                        F120: 'FASHION',
                        F122: 'KIDS STUFF',
                        F124: 'KIDS STUFF',
                        F125: 'KIDS STUFF',
                        F126: 'KIDS STUFF',
                        F128: 'KIDS STUFF',
                        F129: 'LIFESTYLE',
                        F130: 'HOME DECOR',
                        F132: 'DINING',
                        F133: 'SPORTS & OUTDOOR',
                        F134: 'KIDS STUFF',
                        F135: 'LIFESTYLE',
                        F136: 'LIFESTYLE',
                        F139: 'KIDS STUFF',
                        F153: 'DINING',
                        F155: 'FASHION',
                        F156: 'URBAN FAVORITES',
                        F157: 'URBAN FAVORITES',
                        F158: 'LINGERIE & UNDERWEAR',
                        F159: 'FASHION',
                        F160: 'FASHION',
                        F162: 'FASHION',
                        F164: 'FASHION',
                        F165: 'FASHION',
                        FR01: 'REST ROOMS',
                        FR02: 'REST ROOMS',
                        FR03: 'REST ROOMS',
                        FR04: 'REST ROOMS',
                        FFC: 'DINING'
                    },
                    scale: {
                        "FASHION": "#2761ad",
                        "LINGERIE & UNDERWEAR": "#d58aa3",
                        "BEAUTY & SPA": colors[ 'info-color' ],
                        "URBAN FAVORITES": colors[ 'light-red' ],
                        "SPORTS & OUTDOOR": colors[ 'info-color' ],
                        "KIDS STUFF": colors[ 'purple-color' ],
                        "ENTERTAINMENT": colors[ 'success-color' ],
                        "HOME DECOR": colors[ 'default-color' ],
                        "LIFESTYLE": colors[ 'mustard-color' ],
                        "DINING": colors[ 'inverse-color' ],
                        "REST ROOMS": colors[ 'default-color' ],
                        "SERVICES": colors[ 'body-bg' ],
                        "OTHER": colors[ 'default-light-color' ]
                    }
                } ]
            },
            onRegionLabelShow: function (e, el, code) {
                if (el.html() === '') {
                    e.preventDefault();
                }
            }
        });
    };

    // reverse projection map
    $.fn.tkVectorProjectionMap = function () {

        if (! this.length) return;

        var mapProjection,
            markerIndex = 0,
            markersCoords = {};

        mapProjection = new jvm.Map({
            map: 'us_lcc_en',
            zoomOnScroll: false,
            regionStyle: {
                initial: {
                    fill: config.skins[ skin ][ 'primary-color' ]
                }
            },
            backgroundColor: "#fff",
            markerStyle: {
                initial: {
                    fill: 'red'
                }
            },
            container: this,
            onMarkerLabelShow: function (e, label, code) {
                mapProjection.label.text(markersCoords[ code ].lat.toFixed(2) + ', ' + markersCoords[ code ].lng.toFixed(2));
            },
            onMarkerClick: function (e, code) {
                mapProjection.removeMarkers([ code ]);
                mapProjection.label.hide();
            }
        });

        mapProjection.container.click(function (e) {
            var latLng = mapProjection.pointToLatLng(e.offsetX, e.offsetY),
                targetCls = $(e.target).attr('class');

            if (latLng && (! targetCls || (targetCls && $(e.target).attr('class').indexOf('jvectormap-marker') === - 1))) {
                markersCoords[ markerIndex ] = latLng;
                mapProjection.addMarker(markerIndex, {latLng: [ latLng.lat, latLng.lng ]});
                markerIndex += 1;
            }
        });
    };

    $('[data-toggle="vector-world-map-gdp"]').tkVectorWorldMapGDP();
    $('[data-toggle="vector-world-map-markers"]').tkVectorWorldMapMarkers();
    $('[data-toggle="vector-usa-unemployment"]').tkVectorUSAUnemployment();
    $('[data-toggle="vector-region-selection"]').tkVectorRegionSelection();
    $('[data-toggle="vector-france-elections"]').tkVectorFranceElections();
    $('[data-toggle="vector-random-colors"]').tkVectorRandomColors();
    $('[data-toggle="vector-mall-map"]').tkVectorMallMap();
    $('[data-toggle="vector-projection-map"]').tkVectorProjectionMap();

})(jQuery);
},{"../_skin":"/Code/html/themes/themekit/lib/maps/js/_skin.js","./_gdpData":"/Code/html/themes/themekit/lib/maps/js/vector/_gdpData.js","./custom/jquery-jvectormap-de-merc-en":"/Code/html/themes/themekit/lib/maps/js/vector/custom/jquery-jvectormap-de-merc-en.js","./custom/jquery-jvectormap-es-merc-en":"/Code/html/themes/themekit/lib/maps/js/vector/custom/jquery-jvectormap-es-merc-en.js","./custom/jquery-jvectormap-fr-merc-en":"/Code/html/themes/themekit/lib/maps/js/vector/custom/jquery-jvectormap-fr-merc-en.js","./custom/jquery-jvectormap-us-aea-en":"/Code/html/themes/themekit/lib/maps/js/vector/custom/jquery-jvectormap-us-aea-en.js","./custom/jquery-jvectormap-us-lcc-en":"/Code/html/themes/themekit/lib/maps/js/vector/custom/jquery-jvectormap-us-lcc-en.js","./custom/jquery-jvectormap-world-mill-en":"/Code/html/themes/themekit/lib/maps/js/vector/custom/jquery-jvectormap-world-mill-en.js","./custom/mall-map":"/Code/html/themes/themekit/lib/maps/js/vector/custom/mall-map.js"}],"/Code/html/themes/themekit/lib/media/js/_responsive-videos.js":[function(require,module,exports){
(function ($) {

    // Find all YouTube videos
    var $allVideos = $("iframe[src^='http://player.vimeo.com'], iframe[src^='http://www.youtube.com']"),

    // The element that is fluid width
    $fluidEl = $("panel");

    // Figure out and save aspect ratio for each video
    $allVideos.each(function() {

        $(this)
            .data('aspectRatio', this.height / this.width)

            // and remove the hard coded width/height
            .removeAttr('height')
            .removeAttr('width');

    });

    // When the window is resized
    $(".gallery-grid .panel").resize(function() {

        var newWidth = $fluidEl.width();

        // Resize all videos according to their own aspect ratio
        $allVideos.each(function() {

            var $el = $(this);
            $el
                .width(newWidth)
                .height(newWidth * $el.data('aspectRatio'));

        });

    // Kick off one resize to fix all videos on page load
    }).resize();

})(jQuery);
},{}],"/Code/html/themes/themekit/lib/media/js/carousel/main.js":[function(require,module,exports){
require('./owl/main');
require('./slick/_default');
},{"./owl/main":"/Code/html/themes/themekit/lib/media/js/carousel/owl/main.js","./slick/_default":"/Code/html/themes/themekit/lib/media/js/carousel/slick/_default.js"}],"/Code/html/themes/themekit/lib/media/js/carousel/owl/_default.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkOwlDefault = function () {

        if (! this.length) return;

        var c = this;
        c.owlCarousel({
            dots: true,
            items: c.data('items') || 4,
            responsive: {
                1200: {
                    items: c.data('itemsLg') || 4
                },
                992: {
                    items: c.data('itemsMg') || 3
                },
                768: {
                    items: c.data('itemsSm') || 3
                },
                480: {
                    items: c.data('itemsXs') || 2
                },
                0: {
                    items: 1
                }
            },
            rtl: this.data('rtl'),
            afterUpdate: function () {
                $(window).trigger('resize');
            }
        });

    };

    $(".owl-basic").each(function () {
        $(this).tkOwlDefault();
    });

})(jQuery);
},{}],"/Code/html/themes/themekit/lib/media/js/carousel/owl/_mixed.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkOwlMixed = function () {

        if (! this.length) return;

        this.owlCarousel({
            items: 2,
            nav: true,
            dots: false,
            rtl: this.data('rtl'),
            navText: [ '<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>' ],
            responsive: {
                1200: {
                    items: 2
                },
                0: {
                    items: 1
                }
            }
        });

    };

    $(".owl-mixed").tkOwlMixed();

})(jQuery);
},{}],"/Code/html/themes/themekit/lib/media/js/carousel/owl/_preview.js":[function(require,module,exports){
(function ($) {
    "use strict";

    var syncPosition = function (e, target) {
        if (e.namespace && e.property.name === 'items') {
            target.trigger('to.owl.carousel', [e.item.index, 300, true]);
        }
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkOwlPreview = function () {

        if (! this.length) return;

        var target = $(this.data('sync')),
            preview = this,
            rtl = this.data('rtl');

        if (! target.length) return;

        this.owlCarousel({
            items: 1,
            slideSpeed: 1000,
            dots: false,
            responsiveRefreshRate: 200,
            rtl: rtl,
            nav: true,
            navigationText: [ '<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>' ]
        });

        this.on('change.owl.carousel', function(e){
            syncPosition(e, target);
        });

        target.owlCarousel({
            items: 5,
            responsive: {
                1200: {
                    items: 7
                },
                768: {
                    items: 6
                },
                480: {
                    items: 3
                },
                0: {
                    items: 2
                }
            },
            dots: false,
            nav: true,
            responsiveRefreshRate: 100,
            rtl: rtl,
            afterInit: function (el) {
                el.find(".owl-item").eq(0).addClass("synced");
            }
        });

        target.on('change.owl.carousel', function(e){
            syncPosition(e, preview);
        });

        target.find('.owl-item').click(function (e) {
            e.preventDefault();
            var item = $(this).data("owl-item");
            preview.trigger("to.owl.carousel", [item.index, 300, true]);
        });

    };

    $(".owl-preview").tkOwlPreview();

})(jQuery);
},{}],"/Code/html/themes/themekit/lib/media/js/carousel/owl/main.js":[function(require,module,exports){
require('./_default');
require('./_mixed');
require('./_preview');
},{"./_default":"/Code/html/themes/themekit/lib/media/js/carousel/owl/_default.js","./_mixed":"/Code/html/themes/themekit/lib/media/js/carousel/owl/_mixed.js","./_preview":"/Code/html/themes/themekit/lib/media/js/carousel/owl/_preview.js"}],"/Code/html/themes/themekit/lib/media/js/carousel/slick/_default.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSlickDefault = function () {

        if (! this.length) return;

        if (typeof $.fn.slick == 'undefined') return;

        var c = this;
        
        c.slick({
            dots: true,
            slidesToShow: c.data('items') || 3,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: c.data('itemsLg') || 4
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: c.data('itemsMd') || 3
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: c.data('itemsSm') || 3
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: c.data('itemsXs') || 2
                    }
                },
                {
                    breakpoint: 0,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ],
            rtl: this.data('rtl'),
            onSetPosition: function () {
                $(window).trigger('resize');
            }
        });

        $(document).on('sidebar.shown', function(){
            c.slickSetOption('dots', true, true);
        });

    };

    $(".slick-basic").each(function () {
        $(this).tkSlickDefault();
    });

})(jQuery);
},{}],"/Code/html/themes/themekit/lib/media/js/main.js":[function(require,module,exports){
// Carousels
require('./carousel/main');

// Responsive Video iFrame Fix
require('./_responsive-videos');
},{"./_responsive-videos":"/Code/html/themes/themekit/lib/media/js/_responsive-videos.js","./carousel/main":"/Code/html/themes/themekit/lib/media/js/carousel/main.js"}],"/Code/html/themes/themekit/lib/sidebar/js/_breakpoints.js":[function(require,module,exports){
(function ($) {
    "use strict";

    var restore = function () {
            $("html").addClass('show-sidebar');
            $('.sidebar.sidebar-visible-desktop').not(':visible').each(function () {
                var options = sidebar.options($(this));
                sidebar.open($(this).attr('id'), options);
            });
        },
        hide = function () {
            $("html").removeClass('show-sidebar');
            $('.sidebar:visible').each(function () {
                sidebar.close($(this).attr('id'));
            });
        };

    $(window).bind('enterBreakpoint768', function () {
        if (! $('.sidebar').length) return;
        if ($('.hide-sidebar').length) return;
        restore();
    });

    $(window).bind('enterBreakpoint1024', function () {
        if (! $('.sidebar').length) return;
        if ($('.hide-sidebar').length) return;
        restore();
    });

    $(window).bind('enterBreakpoint480', function () {
        if (! $('.sidebar').length) return;
        hide();
    });

    if ($(window).width() <= 480) {
        if (! $('.sidebar').length) return;
        hide();
    }

})(jQuery);

},{}],"/Code/html/themes/themekit/lib/sidebar/js/_collapsible.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSidebarCollapse = function () {

        if (! this.length) return;

        var sidebar = this;

        sidebar.find('.sidebar-menu > li > a').off('mouseenter');
        sidebar.find('.sidebar-menu > li.dropdown > a').off('mouseenter');
        sidebar.find('.sidebar-menu > li > a').off('mouseenter');
        sidebar.find('.sidebar-menu > li > a').off('click');
        sidebar.off('mouseleave');
        sidebar.find('.dropdown').off('mouseover');
        sidebar.find('.dropdown').off('mouseout');

        $('body').off('mouseout', '#dropdown-temp .dropdown');

        sidebar.find('ul.collapse')
            .off('shown.bs.collapse')
            .off('show.bs.collapse')
            .off('hide.bs.collapse')
            .off('hidden.bs.collapse');

        sidebar.find('#dropdown-temp').remove();

        sidebar.find('.hasSubmenu').removeClass('dropdown')
            .find('> ul').addClass('collapse').removeClass('dropdown-menu submenu-hide submenu-show')
            .end()
            .find('> a').attr('data-toggle', 'collapse').on('click', function(e){
                e.preventDefault();
            });

        sidebar.find('.collapse').on('shown.bs.collapse', function () {
            sidebar.find('[data-scrollable]').getNiceScroll().resize();
        });

        // Collapse
        sidebar.find('.collapse').on('show.bs.collapse', function (e) {
            e.stopPropagation();
            var parents = $(this).parents('ul:first').find('> li.open > ul');
            if (parents.length) {
                parents.collapse('hide').closest('.hasSubmenu').removeClass('open');
            }
            $(this).closest('.hasSubmenu').addClass('open');
        });

        sidebar.find('.collapse').on('hidden.bs.collapse', function (e) {
            e.stopPropagation();
            $(this).closest('.hasSubmenu').removeClass('open');
        });

        sidebar.find('.collapse').collapse({ toggle: false });

    };

    $('.sidebar[data-type="collapse"]').each(function(){
        $(this).tkSidebarCollapse();
    });

})(jQuery);
},{}],"/Code/html/themes/themekit/lib/sidebar/js/_dropdown.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSidebarDropdown = function () {

        if (! this.length) return;

        var sidebar = this;

        sidebar.find('.collapse')
            .off('shown.bs.collapse')
            .off('show.bs.collapse')
            .off('hidden.bs.collapse');

        var nice = sidebar.find('[data-scrollable]');

        if (nice.length) {
            nice = nice.getNiceScroll()[ 0 ];
            nice.scrollstart(function () {
                if (! sidebar.is('[data-type="dropdown"]')) return;
                sidebar.addClass('scrolling');
                sidebar.find('#dropdown-temp > ul > li').empty();
                sidebar.find('#dropdown-temp').hide();
                sidebar.find('.open').removeClass('open');
            });

            nice.scrollend(function () {
                if (! sidebar.is('[data-type="dropdown"]')) return;
                $.data(this, 'lastScrollTop', nice.getScrollTop());
                sidebar.removeClass('scrolling');
            });
        }

        sidebar.find('.hasSubmenu').addClass('dropdown').removeClass('open')
            .find('> ul').addClass('dropdown-menu').removeClass('collapse in').removeAttr('style')
            .end()
            .find('> a').removeClass('collapsed')
            .removeAttr('data-toggle');

        sidebar.find('.sidebar-menu > li.dropdown > a').on('mouseenter', function () {

            var c = sidebar.find('#dropdown-temp');

            sidebar.find('.open').removeClass('open');
            c.hide();

            if (! $(this).parent('.dropdown').is('.open') && ! sidebar.is('.scrolling')) {
                var p = $(this).parent('.dropdown'),
                    t = p.find('> .dropdown-menu').clone().removeClass('submenu-hide');

                if (! c.length) {
                    c = $('<div/>').attr('id', 'dropdown-temp').appendTo(sidebar);
                    c.html('<ul><li></li></ul>');
                }

                c.show();
                c.find('.dropdown-menu').remove();
                c = c.find('> ul > li').css({overflow: 'visible'}).addClass('dropdown open');

                p.addClass('open');
                t.appendTo(c).css({
                    top: p.offset().top - c.offset().top,
                    left: '100%'
                }).show();

                if (sidebar.is('.right')) {
                    t.css({
                        left: 'auto',
                        right: '100%'
                    });
                }
            }
        });

        sidebar.find('.sidebar-menu > li > a').on('mouseenter', function () {

            if (! $(this).parent().is('.dropdown')) {
                var sidebar = $(this).closest('.sidebar');
                sidebar.find('.open').removeClass('open');
                sidebar.find('#dropdown-temp').hide();
            }

        });

        sidebar.find('.sidebar-menu > li > a').on('click', function (e) {
            if ($(this).parent().is('.dropdown')) {
                e.preventDefault();
                e.stopPropagation();
            }
        });

        sidebar.on('mouseleave', function () {
            $(this).find('#dropdown-temp').hide();
            $(this).find('.open').removeClass('open');
        });

        sidebar.find('.dropdown').on('mouseover', function () {
            $(this).addClass('open').children('ul').removeClass('submenu-hide').addClass('submenu-show');
        }).on('mouseout', function () {
            $(this).children('ul').removeClass('.submenu-show').addClass('submenu-hide');
        });

        $('body').on('mouseout', '#dropdown-temp .dropdown', function () {
            $('.sidebar-menu .open', $(this).closest('.sidebar')).removeClass('.open');
        });

    };

    var transform_dd = function () {

        $('.sidebar[data-type="dropdown"]').each(function () {
            $(this).tkSidebarDropdown();
        });

    };

    var transform_collapse = function () {

        $('.sidebar[data-type="collapse"]').each(function () {
            $(this).tkSidebarCollapse();
        });

    };

    transform_dd();

    $(window).bind('enterBreakpoint480', function () {
        if (! $('.sidebar[data-type="dropdown"]').length) return;
        $('.sidebar[data-type="dropdown"]').attr('data-type', 'collapse').attr('data-transformed', true);
        transform_collapse();
    });

    function make_dd() {
        if (! $('.sidebar[data-type="collapse"][data-transformed]').length) return;
        $('.sidebar[data-type="collapse"][data-transformed]').attr('data-type', 'dropdown').attr('data-transformed', true);
        transform_dd();
    }

    $(window).bind('enterBreakpoint768', make_dd);

    $(window).bind('enterBreakpoint1024', make_dd);

})(jQuery);
},{}],"/Code/html/themes/themekit/lib/sidebar/js/_options.js":[function(require,module,exports){
module.exports = function (sidebar) {
    return {
        "transform-button": sidebar.data('transformButton') === true,
        "transform-button-icon": sidebar.data('transformButtonIcon') || 'fa-ellipsis-h'
    };
};
},{}],"/Code/html/themes/themekit/lib/sidebar/js/_sidebar-menu.js":[function(require,module,exports){
(function ($) {

    var sidebars = $('.sidebar');

    sidebars.each(function () {

        var sidebar = $(this);
        var options = require('./_options')(sidebar);

        if (options[ 'transform-button' ]) {
            var button = $('<button type="button"></button>');

            button
                .attr('data-toggle', 'sidebar-transform')
                .addClass('btn btn-default')
                .html('<i class="fa ' + options[ 'transform-button-icon' ] + '"></i>');

            sidebar.find('.sidebar-menu').append(button);
        }
    });

}(jQuery));
},{"./_options":"/Code/html/themes/themekit/lib/sidebar/js/_options.js"}],"/Code/html/themes/themekit/lib/sidebar/js/_sidebar-toggle.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $('#subnav').collapse({'toggle': false});

    function mobilecheck() {
        var check = false;
        (function (a) {
            if (/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
                check = true;
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    }

    (function () {

        var defaults = {
                effect: 'st-effect-1',
                duration: 550,
                overlay: false
            },

            containerSelector = '.st-container',

            eventtype = mobilecheck() ? 'touchstart' : 'click',

            getLayoutClasses = function (sidebar, direction) {

                var layoutClasses = sidebar.data('layoutClasses');

                if (! layoutClasses) {
                    var toggleLayout = sidebar.data('toggleLayout');
                    if (typeof toggleLayout == 'string') {
                        layoutClasses = toggleLayout.split(",").join(" ");
                        sidebar.data('layoutClasses', layoutClasses);
                        return layoutClasses;
                    }

                    var match = new RegExp('sidebar-' + direction + '(\\S+)', 'ig');
                    layoutClasses = $('html').get(0).className.match(match);
                    if (layoutClasses !== null && layoutClasses.length) {
                        layoutClasses = layoutClasses.join(" ");
                        sidebar.data('layoutClasses', layoutClasses);
                    }
                }

                return layoutClasses;

            },

            getSidebarDataOptions = function(sidebar){

                return {
                    effect: sidebar.data('effect'),
                    overlay: sidebar.data('overlay')
                };

            },

            animating = function () {

                if ($('body').hasClass('animating')) return true;
                $('body').addClass('animating');

                setTimeout(function () {
                    $('body').removeClass('animating');
                }, defaults.duration);

                return false;

            },

            reset = function (id, options) {

                var container = $(containerSelector);

                var target = typeof id !== 'undefined' ? '#' + id : container.data('stMenuTarget'),
                    sidebar = $(target);

                if (! sidebar.length) return false;
                if (! sidebar.is(':visible')) return false;
                if (sidebar.hasClass('sidebar-closed')) return false;

                var effect = typeof options !== 'undefined' && options.effect ? options.effect : container.data('stMenuEffect'),
                    direction = sidebar.is('.left') ? 'l' : 'r',
                    size = sidebar.get(0).className.match(/sidebar-size-(\S+)/).pop(),
                    htmlClass = 'st-effect-' + direction + size,
                    toggleLayout = sidebar.data('toggleLayout'),
                    layoutClasses = getLayoutClasses(sidebar, direction),
                    eventData = {
                        sidebar: sidebar,
                        target: target
                    };

                $(document).trigger('sidebar.hide', eventData);

                $('[data-toggle="sidebar-menu"][href="' + target + '"]')
                    .removeClass('active')
                    .closest('li')
                    .removeClass('active');

                $('html').addClass(htmlClass);
                sidebar.addClass(effect);
                container.addClass(effect);

                container.removeClass('st-menu-open st-pusher-overlay');

                setTimeout(function () {
                    $('html').removeClass(htmlClass);
                    if (toggleLayout) $('html').removeClass(layoutClasses);
                    sidebar.removeClass(effect);
                    container.get(0).className = 'st-container'; // clear
                    sidebar.addClass('sidebar-closed').hide();
                    $(document).trigger('sidebar.hidden', eventData);
                }, defaults.duration);

            },

            open = function (target, options) {

                var container = $(containerSelector);

                var sidebar = $(target);
                if (! sidebar.length) return false;

                // on mobile, allow only one sidebar to be open at the same time
                if ($(window).width() < 768 && container.hasClass('st-menu-open')) {
                    return reset();
                }

                $('[data-toggle="sidebar-menu"][href="' + target + '"]')
                    .addClass('active')
                    .closest('li')
                    .addClass('active');

                var effect = options.effect,
                    overlay = options.overlay;

                var direction = sidebar.is('.left') ? 'l' : 'r',
                    size = sidebar.get(0).className.match(/sidebar-size-(\S+)/).pop(),
                    htmlClass = 'st-effect-' + direction + size,
                    toggleLayout = sidebar.data('toggleLayout'),
                    layoutClasses = getLayoutClasses(sidebar, direction),
                    eventData = {
                        sidebar: sidebar,
                        target: target
                    };

                $(document).trigger('sidebar.show', eventData);

                $('html').addClass(htmlClass);
                sidebar.show().removeClass('sidebar-closed');

                container.data('stMenuEffect', effect);
                container.data('stMenuTarget', target);

                sidebar.addClass(effect);
                container.addClass(effect);
                if (overlay) container.addClass('st-pusher-overlay');

                setTimeout(function () {
                    container.addClass('st-menu-open');
                    sidebar.find('[data-scrollable]').getNiceScroll().resize();
                    $(window).trigger('resize');
                }, 25);

                setTimeout(function () {
                    if (toggleLayout) $('html').addClass(layoutClasses);
                    $(document).trigger('sidebar.shown', eventData);
                }, defaults.duration);

            },

            toggle = function (e) {

                e.stopPropagation();
                e.preventDefault();

                var a = animating();
                if (a) return false;

                var button = $(this),
                    target = button.attr('href'),
                    sidebar;

                if (target.length > 3) {
                    sidebar = $(target);
                    if (! sidebar.length) return false;
                }

                if (target.length < 3) {
                    var currentActiveElement = $('[data-toggle="sidebar-menu"]').not(this).closest('li').length ? $('[data-toggle="sidebar-menu"]').not(this).closest('li') : $('[data-toggle="sidebar-menu"]').not(this);
                    var activeElement = $(this).closest('li').length ? $(this).closest('li') : $(this);

                    currentActiveElement.removeClass('active');
                    activeElement.addClass('active');

                    if ($('html').hasClass('show-sidebar')) activeElement.removeClass('active');

                    $('html').removeClass('show-sidebar');

                    if (activeElement.hasClass('active')) $('html').addClass('show-sidebar');
                    return;
                }

                var dataOptions = getSidebarDataOptions(sidebar),
                    buttonOptions = {};

                if (button.data('effect')) buttonOptions.effect = button.data('effect');
                if (button.data('overlay')) buttonOptions.overlay = button.data('overlay');

                var options = $.extend({}, defaults, dataOptions, buttonOptions);

                if (! sidebar.hasClass('sidebar-closed') && sidebar.is(':visible')) {
                    reset(sidebar.attr('id'), options);
                    return;
                }

                open(target, options);

            };

        $('body').on(eventtype, '[data-toggle="sidebar-menu"]', toggle);

        $(document).on('keydown', null, 'esc', function () {

            var container = $(containerSelector);

            if (container.hasClass('st-menu-open')) {
                reset();
                return false;
            }

        });

        /**
         * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
         */
        $.fn.tkSidebarToggleBar = function () {

            if (! this.length) return;

            var sidebar = this;

            /* Sidebar Toggle Bar */
            if (sidebar.data('toggleBar')) {
                var bar = $('<a></a>');
                bar.attr('href', '#' + sidebar.attr('id'))
                    .attr('data-toggle', 'sidebar-menu')
                    .addClass('sidebar-toggle-bar');

                sidebar.append(bar);
            }

        };

        $('.sidebar').each(function(){
            $(this).tkSidebarToggleBar();
        });

        window.sidebar = {

            open: function (id, options) {

                var a = animating();
                if (a) return false;

                options = $.extend({}, defaults, options);

                return open('#' + id, options);

            },

            close: function (id, options) {

                options = $.extend({}, defaults, options);

                return reset(id, options);

            },

            options: getSidebarDataOptions

        };

    })();

})(jQuery);
},{}],"/Code/html/themes/themekit/lib/sidebar/js/main.js":[function(require,module,exports){
require('./_breakpoints');
require('./_sidebar-menu');
require('./_collapsible');
require('./_dropdown');
require('./_sidebar-toggle');

(function($){
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSidebar = function (options) {

        if (! this.length) return;

        var settings = $.extend({
            menuType: false,
            toggleBar: false
        }, options);

        var sidebar = this;

        if (settings.menuType == "collapse") {
            sidebar.tkSidebarCollapse();
        }

        if (settings.menuType == "dropdown") {
            sidebar.tkSidebarDropdown();
        }

        if (settings.toggleBar === true) {
            sidebar.tkSidebarToggleBar();
        }

    };

})(jQuery);
},{"./_breakpoints":"/Code/html/themes/themekit/lib/sidebar/js/_breakpoints.js","./_collapsible":"/Code/html/themes/themekit/lib/sidebar/js/_collapsible.js","./_dropdown":"/Code/html/themes/themekit/lib/sidebar/js/_dropdown.js","./_sidebar-menu":"/Code/html/themes/themekit/lib/sidebar/js/_sidebar-menu.js","./_sidebar-toggle":"/Code/html/themes/themekit/lib/sidebar/js/_sidebar-toggle.js"}],"/Code/html/themes/themekit/lib/social/js/_timeline.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $('.share textarea').on('keyup', function () {
        $(".share button")[ $(this).val() === '' ? 'hide' : 'show' ]();
    });

    if (! $("#scroll-spy").length) return;

    var offset = $("#scroll-spy").offset().top;

    $('body').scrollspy({target: '#scroll-spy', offset: offset});

})(jQuery);

},{}],"/Code/html/themes/themekit/lib/social/js/main.js":[function(require,module,exports){
require('./_timeline');
},{"./_timeline":"/Code/html/themes/themekit/lib/social/js/_timeline.js"}]},{},["./src/js/themes/admin/app.js"]);
