(function($) {

    // The Model

    var model = raw.model();

    // X axis dimension
    // Adding a title to be displayed in the UI
    // and limiting the type of data to Numbers only
    var x = model.dimension()
        .title('X Axis')
        .types(Number);

    // Y axis dimension
    // Same as X
    var y = model.dimension()
        .title('Y Axis')
        .types(Number);

    // Mapping function
    // For each record in the data returns the values
    // for the X and Y dimensions and casts them as numbers
    model.map(function(data) {
        return data.map(function(d) {
            return {
                x: +x(d),
                y: +y(d)
            };
        });
    });


    // The Chart

    var chart = raw.chart()
        .title('Simple bar chart')
        .description('A simple bar chart')
        .thumbnail('imgs/alluvial.png')
        .category('Bar')
        .model(model);

    // Some options we want to expose to the users
    // For each of them a GUI component will be created
    // Options can be use within the Draw function
    // by simply calling them (i.e. witdh())
    // the current value of the options will be returned

    var colors = chart.color()
        .title("Color scale");

    /*
        // Width
        var width = chart.number()
            .title('Width')
            .defaultValue(900)

        // Height
        var height = chart.number()
            .title('Height')
            .defaultValue(600)

        // A simple margin
        var margin = chart.number()
            .title('margin')
            .defaultValue(10)
    */
    // Drawing function
    // selection represents the d3 selection (svg)
    // data is not the original set of records
    // but the result of the model map function
    chart.draw(function(selection, data) {

        colors.domain(['Tons of coal ash'],function (d){ return d; });

        Highcharts.setOptions({
            colors: [colors()('Tons of coal ash')],
            lang: {
                thousandsSep: ','
            }
        });
        $(selection[0][0]).highcharts({
            chart: {
                type: 'bar'
            },
            title: {
                text: ' '
            },
            /*
            xAxis: {
                categories: ['Minefill', 'Concrete', 'Wallboard', 'Structural fill', 'Blended cement', 'Blasting grit', 'Miscellaneous', 'Agriculture', 'Soil stabilization', 'Snow removal']
            },*/
            yAxis: {
                min: 0,
                title: {
                    text: 'Tons of coal ash'
                },
                labels: {
                    format: '{value:,.0f}'
                }
            },
            legend: {
                reversed: true
            },
            tooltip: {
                formatter: function() {
                    return this.series.name + ': ' +
                        '<b>' + Highcharts.numberFormat(this.y, 0, '.', ',') + '</b>';
                }
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },
            series: [{
                name: 'Tons of coal ash',
                data: data
            }],
            credits: {
                enabled: false
            },
        });

    });
})(jQuery);
