# Odoo OWL Bar Chart

![Img](https://i.stack.imgur.com/DChY1.png "Bar Graph")

## How to use it:-

### Define a computed field that will hold the graph data 

```python
bargraph_field_json = fields.Text(compute='_compute_bargraph_field_json')
```

### Compute the data on the graph

```python

    def _compute_bargraph_field_json(self):
        for obj in self:
            widget_vals = dict()
            values = dict()
            graph_data = [
                (label1, value1),
                (label2, value2), 
                .....
            ]
            for label, value in graph_data:
                values[label] = value
            widget_vals['content'] = [values]
            obj.bargraph_field_json = json.dumps(widget_vals)

```

### Finally put this field on your XML
```xml
  <field nolabel="1" name="bargraph_field_json" widget="bar_graph"/>
```

## Reference 
This component was made using [Chart.js library](https://www.chartjs.org/docs/latest/)

Thanks to [Abdulrahman Saber](https://github.com/abdurrahmansaber) for upgrading it to v16.

