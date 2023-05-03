odoo.define('bar_graph_widget.bar_graph', function (require) {
"use strict";

var AbstractField = require('web.AbstractField');
var core = require('web.core');
var field_registry = require('web.field_registry');
var field_utils = require('web.field_utils');

var D3_COLORS = ["#1f77b4","#ff7f0e","#aec7e8","#ffbb78","#2ca02c","#98df8a","#d62728",
                    "#ff9896","#9467bd","#c5b0d5","#8c564b","#c49c94","#e377c2","#f7b6d2",
                    "#7f7f7f","#c7c7c7","#bcbd22","#dbdb8d","#17becf","#9edae5"];


var QWeb = core.qweb;
var _t = core._t;

var ShowBarGraphWidget = AbstractField.extend({

    jsLibs: [
        '/web/static/lib/Chart/Chart.js',
    ],

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------



    /**
     * @override
     * @returns {boolean}
     */
    isSet: function() {
        return true;
    },

    /**
     * @private
     * @override
     */
    _render: function() {
        this.viewAlreadyOpened = false;
        var self = this;
        var info = JSON.parse(this.value);
        if (!info) {
            this.$el.html('');
            return;
        }
        var lbs = []
        var vls = []
        _.each(info.content, function (k, v){
            // build the graph data
            for (const [title, value] of Object.entries(k)) {
                lbs.push(title);
                vls.push(value);
            }
        });

        // pass the initial values for this template
        this.$el.html(QWeb.render('ShowBarGraphInfo', {

        }));
        var $canvas = this.$('canvas');
        var ctx = $canvas.get(0).getContext('2d');
        var conf = this._getBarChartConfig(lbs, vls);
        var chart = new Chart(ctx, conf);
    },

    _getBarChartConfig: function (lbs, vals) {
        return {
            type: 'bar',
            data: {
                labels: lbs,
                datasets: [{
                    data: vals,
                    backgroundColor: "#1f77b4"
                }]
            },
            options: {
                legend: {display: false},
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                        },
                    }],
                }
            },
        };
    },

});

field_registry.add('bar_graph', ShowBarGraphWidget);

return {
    ShowBarGraphWidget: ShowBarGraphWidget
};

});
