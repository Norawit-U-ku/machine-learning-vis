/**
 * Created by wit54 on 02-Jul-17.
 */
let DIR = "images/";
// create an array with nodes
let nodes = new vis.DataSet([]);
// load data
if(!localStorage.getItem('nodes'))
    localStorage.setItem('nodes', NODES);
if(!localStorage.getItem('edges'))
    localStorage.setItem('edges', EDGES)
console.log(NODES);
// create an array with edges
let edges = new vis.DataSet([
]);

// create a network
let container = document.getElementById('network');
let data = {
    nodes: nodes,
    edges: edges
};
let options = {
    interaction:{hover:true},
    physics:false,
    manipulation: {
        addNode: function (data, callback) {
            // filling in the popup DOM elements
            document.getElementById('operation').innerHTML = "Add Node";
//                document.getElementById('node-id').value = data.id;
            document.getElementById('node-label').value = data.label;
            document.getElementById('saveButton').onclick = saveData.bind(this, data, callback);
            document.getElementById('cancelButton').onclick = clearPopUp.bind();
            document.getElementById('network-popUp').style.display = 'block';
        },
        editNode: function (data, callback) {
            // filling in the popup DOM elements
            document.getElementById('operation').innerHTML = "Edit Node";
            document.getElementById('node-label').value = data.label;
            document.getElementById('saveButton').onclick = saveData.bind(this, data, callback);
            document.getElementById('cancelButton').onclick = cancelEdit.bind(this,callback);
            document.getElementById('network-popUp').style.display = 'block';
        },
        addEdge: function (data, callback) {
            if (data.from == data.to) {
                let r = confirm("Do you want to connect the node to itself?");
                if (r == true) {
                    callback(data);
                }
            }
            else {
                callback(data);
            }
        }
    },
    groups:{
        database:{
            shape:'icon',
            icon:{
                face:'FontAwesome',
                code:'\uf1c0',
                size:100,
                color:"#000"
            }
        },
        neuron:{
            size:25,
            shape: 'dot',
            widthConstraint:{
                minimum: 25,
                maximum: 50
            },
            scaling:{
                min: 25,
                max: 25
            },
            label:	undefined

        },
        dataAPI:{
            shape:'image',
            shapeProperties: {
                borderDashes: false, // only for borders
                borderRadius: 6,     // only for box shape
                interpolation: false,  // only for image and circularImage shapes
                useImageSize: true,  // only for image and circularImage shapes
                useBorderWithImage: true  // only for image shape
            },
            color: {
                border: '#000000',
                background: '#262623',
                highlight: {
                    border: '#262623',
                    background: '#000000'
                },
                hover: {
                    border: '#262623',
                    background: '#000000'
                }
            }
        },
        inputHandler:{
            shape:'box',
            font:{
                size:40
            },
            size:100
        },
        container:{
            shape:'square',
            color: {
                background:'rgba(255,255,255,0)',
                border:'#FF9800',
                highlight:{
                    background:'rgba(255,255,255,0)',
                    border:'#FF9800'
                },
                hover:{
                    background:'rgba(255,255,255,0)',
                    border:'#FF9800'
                }
            }
        },
        con100x10:{
            shape:function(x,y,size,ctx,selected,hover){
                ctx.strokeStyle = '#A6D5F7';
                ctx.fillStyle = '#294475';
                ctx.beginPath();
                ctx.moveTo(0,0);
                ctx.lineTo(0, 100);
                ctx.lineTo(50,150);
                ctx.lineTo(50,50);
                ctx.lineTo(0,0);
            },
            color: {
                background:'rgba(255,255,255,0)',
                border:'rgba(255,255,255,0)',
                highlight:{
                    background:'rgba(255,255,255,0)',
                    border:'rgba(255,255,255,0)'
                },
                hover:{
                    background:'rgba(255,255,255,0)',
                    border:'rgba(255,255,255,0)'
                }
            }
        },
        none:{
            color: {
                background:'rgba(255,255,255,0)',
                border:'rgba(255,255,255,0)',
                highlight:{
                    background:'rgba(255,255,255,0)',
                    border:'rgba(255,255,255,0)'
                },
                hover:{
                    background:'rgba(255,255,255,0)',
                    border:'rgba(255,255,255,0)'
                }
            }
        },
        arrowDown:{
            shape:'triangleDown',
            size:40,
            color:{background:"rgba(0,0,0,1)",
                border:"rgba(0,0,0,1)",
                highlight:{
                    background:"rgba(0,0,0,1)",
                    border:"rgba(0,0,0,1)"},
                hover:{"background":"rgba(0,0,0,1)",
                    border:"rgba(0,0,0,1)"}
            }
        },
        con:{
            color: {
                background:'rgba(255,255,255,0)',
                border:'rgba(255,255,255,0)',
                highlight:{
                    background:'rgba(255,255,255,0)',
                    border:'rgba(255,255,255,0)'
                },
                hover:{
                    background:'rgba(255,255,255,0)',
                    border:'rgba(255,255,255,0)'
                }
            }
        },
        rec:{
            color: {
                background:'rgba(255,255,255,1)',
                border:'rgba(255,255,255,1)',
                highlight:{
                    background:'rgba(255,255,255,0)',
                    border:'rgba(255,255,255,0)'
                },
                hover:{
                    background:'rgba(255,255,255,0)',
                    border:'rgba(255,255,255,0)'
                }
            }
        },
    },
    edges: {
        smooth: {
            type: 'continuous',
            roundness: 1
        },
        color: {
            color:'#848484',
            highlight:'#92ff47',
            hover: '#848484',
            inherit: false,
            opacity:1
        },
        width: 3
    }

};
function clearPopUp() {
    document.getElementById('saveButton').onclick = null;
    document.getElementById('cancelButton').onclick = null;
    document.getElementById('network-popUp').style.display = 'none';
}

function cancelEdit(callback) {
    clearPopUp();
    callback(null);
}

function saveData(data,callback) {
    data.label = document.getElementById('node-label').value;
    data.group = document.getElementById('node-type').value;
    clearPopUp();
    console.log("Data:");
    console.log(data);
    callback(data);
}
data = loadData()? loadData(): data;
var network = new vis.Network(container, data, options);

network.on("click", function (params) {
//        params.event = "[original event]";
//        if(params.nodes){
//            document.getElementById('myModal').style.display = "block";
//            var network = new vis.Network(document.getElementById("node-network"), data, options);
//        }
//        document.getElementById('eventSpan').innerHTML = '<h2>Click event:</h2>' + JSON.stringify(params, null, 4);
    console.log('click event, getNodeAt returns: ' + this.getNodeAt(params.pointer.DOM));
});
network.on("doubleClick", function (params) {
    params.event = "[original event]";
    document.getElementById('eventSpan').innerHTML = '<h2>doubleClick event:</h2>' + JSON.stringify(params, null, 4);
});
network.on("oncontext", function (params) {
    params.event = "[original event]";
    document.getElementById('eventSpan').innerHTML = '<h2>oncontext (right click) event:</h2>' + JSON.stringify(params, null, 4);
});
network.on("dragStart", function (params) {
    params.event = "[original event]";
    document.getElementById('eventSpan').innerHTML = '<h2>dragStart event:</h2>' + JSON.stringify(params, null, 4);
});
network.on("dragging", function (params) {
    params.event = "[original event]";
    document.getElementById('eventSpan').innerHTML = '<h2>dragging event:</h2>' + JSON.stringify(params, null, 4);
});
network.on("dragEnd", function (params) {
    params.event = "[original event]";
    document.getElementById('eventSpan').innerHTML = '<h2>dragEnd event:</h2>' + JSON.stringify(params, null, 4);
});
network.on("zoom", function (params) {
    document.getElementById('eventSpan').innerHTML = '<h2>zoom event:</h2>' + JSON.stringify(params, null, 4);
});
network.on("showPopup", function (params) {
    document.getElementById('eventSpan').innerHTML = '<h2>showPopup event: </h2>' + JSON.stringify(params, null, 4);
});
network.on("hidePopup", function () {
    console.log('hidePopup Event');
});
network.on("select", function (params) {
    console.log('select Event:', params);
});
network.on("selectNode", function (params) {
    console.log('selectNode Event:', params);
});
network.on("selectEdge", function (params) {
    console.log('selectEdge Event:', params);
});
network.on("deselectNode", function (params) {
    console.log('deselectNode Event:', params);
});
network.on("deselectEdge", function (params) {
    console.log('deselectEdge Event:', params);
});
network.on("hoverNode", function (params) {
    console.log('hoverNode Event:', params);
});
network.on("hoverEdge", function (params) {
    console.log('hoverEdge Event:', params);
});
network.on("blurNode", function (params) {
    console.log('blurNode Event:', params);
});
network.on("blurEdge", function (params) {
    console.log('blurEdge Event:', params);
});

network.on("startStabilizing", function (params) {
    document.getElementById('eventSpan').innerHTML = '<h3>Starting Stabilization</h3>';
    console.log("started")
});
network.on("stabilizationProgress", function (params) {
    document.getElementById('eventSpan').innerHTML = '<h3>Stabilization progress</h3>' + JSON.stringify(params, null, 4);
    console.log("progress:",params);
});
network.on("stabilizationIterationsDone", function (params) {
    document.getElementById('eventSpan').innerHTML = '<h3>Stabilization iterations complete</h3>';
    console.log("finished stabilization interations");
});
network.on("stabilized", function (params) {
    document.getElementById('eventSpan').innerHTML = '<h3>Stabilized!</h3>' + JSON.stringify(params, null, 4);
    console.log("stabilized!", params);
});
function addNode(group,size) {
    try {
        data.nodes.add({
            id:data.nodes.length+2,
            group:group?group:"neuron",
            size:size?size:25
        });
        console.log(data.nodes);
    }
    catch (err) {
        alert(err);
    }
}
function updateNode() {
    try {
        nodes.update({
            id: document.getElementById('node-id').value,
            label: document.getElementById('node-label').value
        });
    }
    catch (err) {
        alert(err);
    }
}
function removeNode() {
    try {
        nodes.remove({id: document.getElementById('node-id').value});
    }
    catch (err) {
        alert(err);
    }
}

function addEdge() {
    try {
        edges.add({
            id: document.getElementById('edge-id').value,
            from: document.getElementById('edge-from').value,
            to: document.getElementById('edge-to').value
        });
    }
    catch (err) {
        alert(err);
    }
}
function updateEdge() {
    try {
        edges.update({
            id: document.getElementById('edge-id').value,
            from: document.getElementById('edge-from').value,
            to: document.getElementById('edge-to').value
        });
    }
    catch (err) {
        alert(err);
    }
}
function removeEdge() {
    try {
        edges.remove({id: document.getElementById('edge-id').value});
    }
    catch (err) {
        alert(err);
    }
}
function undoNode(){
    try{
        nodes.remove({id:nodes.length});
    }
    catch (err){
        alert(err);
    }
}
function objectToArray(obj,pos) {
    return Object.keys(obj).map(function (key) {
        obj[key].id = key;
        obj[key].x = pos[key].x;
        obj[key].y = pos[key].y;
        console.log(obj[key]);
        return obj[key];
    });
}
//    save node and edge to local storage
function save(){
    let nodes = objectToArray(network.body.data.nodes._data,network.getPositions());
    localStorage.setItem('nodes', JSON.stringify(nodes));
    localStorage.setItem('edges', JSON.stringify(network.body.data.edges._data));
}
//    parsing json to edge array
function jsonToEdge(edges) {
    let newEdge =[];
    Object.keys(edges).map(function (key) {
        newEdge.push({from: edges[key].from, to: edges[key].to});
    });
    console.log(newEdge);
    return newEdge;
}
// Load data from local storage
function loadData() {
    if(!localStorage.getItem('nodes')){ return null;}
    let nodesData =JSON.parse(localStorage.getItem('nodes'));
    console.log(typeof JSON.parse(localStorage.getItem('edges')));
    let edgesData = JSON.parse(localStorage.getItem('edges'));
    return {
        nodes: new vis.DataSet(nodesData),
        edges: new vis.DataSet(jsonToEdge(edgesData))
    };
}

// When the user clicks on <span> (x), close the modal
document.getElementsByClassName("close").onclick = function() {
    document.getElementById('myModal').style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == document.getElementById('myModal')) {
        document.getElementById('myModal').style.display = "none";
    }
};

// animated edge
function updateEdgeDashes() {
    let edges = network.body.edges;
    let dash = [[0,0,2,5],[0,1,2,5],[0,2,4,7]];

    Object.keys(edges).map(function (key) {
        edges[key].options.dashI = edges[key].options.dashI?edges[key].options.dashI : 0;
        if(edges[key].from.options.group === "database"){
            edges[key].options.dashes = dash[ edges[key].options.dashI];
            edges[key].options.dashI +=1;
            edges[key].options.dashI %=dash.length;
            // console.log(edges[key].options.dashes);
        }

    });
    network.redraw();
    setTimeout(updateEdgeDashes,250);
}
function changeEdgesColor() {
    let edges = network.body.edges;
    Object.keys(edges).map(function (key) {
        edges[key].options.color.color='#ff0000';

        console.log(edges[key].options.color);
    });
    network.redraw();
}
let run = true;
function changeEdgeSelected() {
    let edges = network.body.edges;
    Object.keys(edges).map(function (key) {
        console.log(edges[key].from.grouplist.options.group);
        if(edges[key].from.options.group === "neuron")
            edges[key].selected = Math.floor(Math.random() * 6) + 1 < 4;
    });
    network.redraw();
    if(run)setTimeout(changeEdgeSelected, 1000);
}
function runn() {
    setTimeout(changeEdgeSelected,1000);
    setTimeout(updateEdgeDashes,250);
}
network.on("beforeDrawing", function (ctx) {
    setTimeout(function () {
        // updateEdgeDashes();
    },500);

});
network.on("afterDrawing", function (ctx) {
    let nodes = network.body.nodes;
    Object.keys(nodes).map(function (key) {
        console.log(nodes[key].group);
        if(nodes[key].options.group== "con"){
            drawBox(nodes,key,ctx,nodes[key].options.conW,nodes[key].options.conO);
        }
        if(nodes[key].options.group== "rec"){
            drawRecdrawBox(nodes,key,ctx,nodes[key].options.rW,nodes[key].options.rH);
        }
    });


    // setTimeout(function () {
    //     // updateEdgeDashes();
    // },500);
});
function drawRecdrawBox(nodes,key,ctx,width,height){
    let x = nodes[key].x;
    let y = nodes[key].y;
    ctx.beginPath();
    ctx.strokeStyle ="#ff9700";
    ctx.moveTo(x-width,y-height);
    ctx.lineTo(x+width,y-height);
    ctx.lineTo(x+width,y+height);
    ctx.lineTo(x-width,y+height);
    ctx.lineTo(x-width,y-height);
    ctx.stroke();
}
function drawBox(nodes,key,ctx,scale,offset){
    let x = nodes[key].x;
    let y = nodes[key].y;
    // let scale = 100;
    // let offset = 50;
    ctx.strokeStyle ="#000";
    ctx.fillStyle = '#294475';
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x, y+2*scale);
    ctx.lineTo(x-scale,y+3*scale);
    ctx.lineTo(x-scale,y+scale);
    ctx.lineTo(x,y);

    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x -offset,y);
    ctx.lineTo(x-scale - offset,y+scale);
    ctx.lineTo(x-scale -offset,y+3*scale);
    ctx.lineTo(x-scale,y+3*scale);

    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x-scale - offset,y+scale);
    ctx.lineTo(x-scale ,y+scale);
    ctx.stroke();
}