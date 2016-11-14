(function() {

    // The Model

    var model = raw.model();

    // X axis dimension
    // Adding a title to be displayed in the UI
    // and limiting the type of data to Numbers only
    var x = model.dimension()
        .title('Label')
        .types(String);

    // Y axis dimension
    // Same as X
    var y = model.dimension()
        .title('Size')
        .types(Number);


    // Mapping function
    // For each record in the data returns the values
    // for the X and Y dimensions and casts them as numbers
    model.map(function(data) {
        return data.map(function(d) {
            return {
                name: x(d),
                y: +y(d)
            };
        });
    });


    // The Chart

    var chart = raw.chart()
        .title('Simple bar chart')
        .description('A chart useful for comparisons between categorical data')
        .thumbnail('imgs/bar.png')
        .category('Bar')
        .model(model);

    // Some options we want to expose to the users
    // For each of them a GUI component will be created
    // Options can be use within the Draw function
    // by simply calling them (i.e. witdh())
    // the current value of the options will be returned
    /*
        var colors = chart.color()
            .title('Color scale');*/

    var width = chart.number()
        .title('TKTK')
        .defaultValue(9000);

    var check = chart.checkbox()
        .title('TKTK');
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

        data.sort(function(a, b) {
            return b.y - a.y;
        });

        var draw = function () {
            Highcharts.setOptions({
                colors: ['red'],
                lang: {
                    thousandsSep: ','
                }
            });
            Highcharts.chart('chart-1', {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: ' '
                },
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: y()
                    },
                    labels: {
                        format: '{value:,.0f}'
                    }
                },
                legend: {
                    enabled: false,
                    reversed: true
                },
                plotOptions: {
                    series: {
                        stacking: 'normal'
                    }
                },
                series: [{
                    data: data
                }],
                credits: {
                    enabled: false
                },
            });
        };

        raw.embed = '<div id="chart-1"></div>\n' +
            '<script src="//code.highcharts.com/highcharts.js"></script>\n' +
            '<script>(' +
            draw.toString()
                .replace('data: data','data: ' + JSON.stringify(data,null,'                        '))
                .replace('text: y()','text: \'' + y() + '\'') +
            ')()</script>';

        draw();

    });
})();
