/**
 * Created by wit54 on 02-Jul-17.
 */


let DELAY = 1000;



let datasetGraph = new vis.DataSet();
let names = ['centripetal', 'chordal', 'uniform', 'disabled'];

let optionsGraph = {
    start: vis.moment().add(-30, 'seconds'), // changed so its faster
    end: vis.moment(),
    dataAxis: {
        left: {
            range: {
                min:-10, max: 10
            }
        }
    },
    drawPoints: {
        style: 'circle' // square, circle
    },
    shaded: {
        orientation: 'bottom' // top, bottom
    },
    legend: true
};
let groupsGraph = new vis.DataSet();
groupsGraph.add({
    id: 0,
    content: names[0],
    options: {
        drawPoints: true,
        interpolation: {
            parametrization: 'centripetal'
        }
    }});

groupsGraph.add({
    id: 1,
    content: names[1],
    options: {
        drawPoints: true,
        interpolation: {
            parametrization: 'chordal'
        }
    }});

groupsGraph.add({
    id: 2,
    content: names[2],
    options: {
        drawPoints: true,
        interpolation: {
            parametrization: 'uniform'
        }
    }
});

groupsGraph.add({
    id: 3,
    content: names[3],
    options: {
        drawPoints: { style: 'circle' },
        interpolation: false
    }});

let graph2d = new vis.Graph2d(document.getElementById("output-graph"), datasetGraph,groupsGraph, optionsGraph);

// a function to generate data points
function y(x,callback) {
    // console.log(parseInt(x%=1039));
    // axios.get('http://128.199.88.139:3000/api/stock/'+parseInt(x%=1039))
    //     .then(function (response) {
    //         console.log(response.data.p01dvol);
    //         callback( response.data.p01dvol);
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });
    return (Math.sin(x / 2) + Math.cos(x / 4)) * 5;
}

function renderStep() {
    // move the window (you can think of different strategies).
    let now = vis.moment();
    let range = graph2d.getWindow();
    let interval = range.end - range.start;
    switch ('') {
        case 'continuous':
            // continuously move the window
            console.log(now - interval);
            graph2d.setWindow(now - interval, now, {animation: false});
            requestAnimationFrame(renderStep);
            break;

        case 'discrete':
            graph2d.setWindow(now - interval, now, {animation: false});
            setTimeout(renderStep, DELAY);
            break;

        default: // 'static'
            // move the window 90% to the left when now is larger than the end of the window
            if (now > range.end) {
                graph2d.setWindow(now - 0.1 * interval, now + 0.9 * interval);
            }
            setTimeout(renderStep, DELAY);
            break;
    }
}
renderStep();

/**
 * Add a new datapoint to the graph
 */
function addDataPoint() {
    // add a new data point to the dataset
    let now = vis.moment();
    datasetGraph.add({
        x: now,
        y: y(now / 1000,function (data) {
            return data;
        }),
        group:0
    });
    // datasetGraph.add({
    //     x: now,
    //     y: y(now / 500),
    //     group:1
    // });
    // datasetGraph.add({
    //     x: now,
    //     y: y(now / 750),
    //     group:2
    // });
    // datasetGraph.add({
    //     x: now,
    //     y: y(now / 123),
    //     group:3
    // });
    // // remove all data points which are no longer visible
    // var range = graph2d.getWindow();
    // var interval = range.end - range.start;
    // var oldIds = datasetGraph.getIds({
    //     filter: function (item) {
    //         return item.x < range.start - interval;
    //     }
    // });
    // datasetGraph.remove(oldIds);

    setTimeout(addDataPoint, DELAY);
}
addDataPoint();

