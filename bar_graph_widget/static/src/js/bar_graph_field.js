/** @odoo-module **/

import { registry } from "@web/core/registry";
import { loadJS } from "@web/core/assets";
import { standardFieldProps } from "@web/views/fields/standard_field_props";

import { Component, xml, onWillStart, useEffect, useRef } from "@odoo/owl";

export class BarGraphWidget extends Component {
    /**
     * @override
     */
     setup() {
        this.chart = null;
        this.canvasRef = useRef("canvas");

        onWillStart(() => loadJS("/web/static/lib/Chart/Chart.js"));


        useEffect(() => {
            this.renderChart();
            return () => {
                if (this.chart) {
                    this.chart.destroy();
                }
            };
        });

    }

    renderChart() {
        const jsonValue = JSON.parse(this.props.value); // Get the JSON data from the field

        var labels = [];
        var values = [];
        _.each(jsonValue.content, function (k){
            for (const [title, value] of Object.entries(k)) {
                labels.push(title);
                values.push(value);
            }
        });

        const config = {
            type: "bar",
            data: {
                labels: labels,
                datasets: [{
                    data: values,
                    backgroundColor: "#1f77b4"
                }],
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
        this.chart = new Chart(this.canvasRef.el, config);
    }
}

BarGraphWidget.template = 'bar_graph_widget.BarGraphField';
BarGraphWidget.props = {
    ...standardFieldProps
};

registry.category("fields").add("bar_graph", BarGraphWidget);
