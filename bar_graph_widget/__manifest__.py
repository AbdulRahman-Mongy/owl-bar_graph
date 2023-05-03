# -*- coding: utf-8 -*-
{
    'name': "bar_graph_widget",

    'summary': """""",

    'description': """
    """,

    'author': "AbdulRahman Mongy",
    'website': "",

    'category': 'Utility',
    'version': '0.1',

    'depends': ['base'],

    # always loaded
    'data': [
    ],
    'assets': {
        'lqms.lqms_assets': [
            'web/static/lib/Chart/Chart.js',
        ],
        'web.assets_backend': [
            'bar_graph_widget/static/src/js/bar_graph_field.js',
        ],
        'web.assets_qweb': [
            'bar_graph_widget/static/src/xml/**/*',
        ],
    },
}
