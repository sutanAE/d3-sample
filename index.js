data = [4, 8, 15, 16, 23, 42]

const init = ()=>{
    console.log('creating div')
    const div = document.createElement("div");
    div.innerHTML = "<p>Hello, world! from javascript eheheh</p>";
    div.id = "mainDiv"
    console.log('returning div')
    return div;
}


const secondDiv = () => {
    console.log('creating div')
    const div = document.createElement("div");
    div.innerHTML = "<p>Hello, world! from javascript eheheh but wait, this is the second div!</p>";
    div.id = "secondDiv"
    console.log('returning div')
    return div;
}

const button1 = () => {
    console.log('creating button')
    const div = document.createElement("button");
    div.innerHTML = "set orange";
    div.id = "button1"
    div.type = "button"
    div.classList.add('btn')
    div.classList.add('btn-primary')
    div.classList.add('m-2')

    console.log('returning div')
    return div;
}

const button2 = () => {
    console.log('creating button')
    const div = document.createElement("button");
    div.innerHTML = "set blank";
    div.classList.add('btn')
    div.classList.add('btn-primary')
    div.classList.add('m-2')

    div.id = "fadeout"
    console.log('returning div')
    return div;
}

// const dataDiv = () => {
//     console.log('creating div')
//     const div = document.createElement("div");
//     div.innerHTML = `<p style="color:blue; background-color: white">this is the data div!</p>`;
//     div.id = "dataDiv"
//     console.log('returning div')
//     document.body.appendChild(div)

//     return div;
    
// }





document.body.appendChild(init());
document.body.appendChild(secondDiv());
document.body.appendChild(button1());
document.body.appendChild(button2());


// document.body.appendChild(dataDiv())







var paragraph = d3.select("#mainDiv")
        .selectAll("p")
        .data([100, 200, 300])
        .text( (d, i) => {
            console.log("d: " + d);
            console.log("i: " + i);
            console.log("this: " + this);

            return d;
        });


// fading the background in and out
d3.select("#button1")
.on("click", function(){
    d3.select('#secondDiv')
        .transition(d3.transition().duration(1000))
        .style("background-color", "orange");
})
d3.select("#fadeout")
.on("click", function(){
    d3.select('#secondDiv')
        .transition(d3.transition().duration(1000))
        .style("background-color", "#ffffff")
});

//data div


const dataDiv = () => {
    // this function creates the div in dom. This div contains the data that we will display with d3
    console.log('creating div')
    const div = document.createElement("div");
    div.id = "dataDiv"
    div.classList.add("m-5")
    console.log('returning div')
    document.body.appendChild(div)   
    
    const update = document.createElement("button");
    update.id = "randomNum"
    update.innerHTML = "Call API for Random Number"
    update.type = "button"
    update.classList.add('btn')
    update.classList.add('btn-success')
    update.classList.add('m-2')

    document.body.appendChild(update)   



}

// let's call it. Now we have the dataDiv in the dom
document.body.appendChild(document.createElement("hr"))
dataDiv()

// provided we have an array of object named `data`, we will display it with `displayData`
// we will populate `data` with fetch, or any other method
const displayData = (data) => {
    console.log("data from fetch is ", data)
    d3.select("#dataDiv").text('')
    var p = d3.select("#dataDiv")
        .selectAll("p")
        .data(data) // you need to pass an array to the `data` function
        .enter()
        .append("span")
        .style('color', (d)=>{
            if (d===3){
                return "red"
            } else {
                return "black"
            }
        })
        .text(function (d) {
            return `(${d.x},${d.y})`;
        })
        .exit()
        .remove()
        ;
}

// util function to generate random integer
function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min) + min
    )
  }

// this `fetchData` will call the localhost:8080 api, a mock api that I made, that will return random x and y numbers. it returns an array!
// fetchData calls display data as you can see and pass in the fetched data
// if the api is offline, then `catch` function will generate the quite the same data.
const fetchData = async () =>{
    try {
        const resp = await fetch("http://localhost:8080/data.json")
        const data = await resp.json()
        displayData(data)
    } catch {
        console.log("fetch has failed, returning default data")
        const data = [{x:between(1,20),y:between(1,20)},{x:between(1,20),y:between(1,20)},{x:between(1,20),y:between(1,20)},{x:between(1,20),y:between(1,20)},{x:between(1,20),y:between(1,20)}]
        displayData(data)

    }
    
}

// set the function; if the button is clicked, then the fetchData is called!
d3.select("#randomNum")
.on("click", function(){
    d3.select("#dataDiv")
        .text('')
    d3.select("#dataDiv")
        .html(`
        <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
        `)
    fetchData()
});




// svg!!!!

// create the div
document.body.appendChild(document.createElement("hr"))
const svgDiv = ()=>{
    var div = document.createElement("div")
    div.id = "svgDiv"
    document.body.appendChild(div)

    const update = document.createElement("button");
    update.id = "createLine"
    update.innerHTML = "draw line"
    update.type = "button"
    update.classList.add('btn')
    update.classList.add('btn-success')
    update.classList.add('m-2')

    document.body.appendChild(update)   

    const transition = document.createElement("button");
    transition.id = "transitionLine"
    transition.innerHTML = "transition"
    transition.type = "button"
    transition.classList.add('btn')
    transition.classList.add('btn-success')
    transition.classList.add('m-2')

    document.body.appendChild(transition)   
    

}
svgDiv()
const drawLine = ()=>{
    //Create SVG element
    var width = 500;
    var height = 100;
    
    //Create SVG element
    var svg = d3.select("#svgDiv")
    
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    ;
    
    //Create line element inside SVG
    svg
        .append("line")
       .attr("x1", between(35,200))
       .attr("x2", between(200,700))
       .attr("y1", between(40,29))
       .attr("y2", between(40,100))
       .attr("stroke", "black")
       .attr('id', 'svgLine')

    
       

}

d3.select("#createLine")
.on("click", function(){
    console.log('erasing line')
    d3.select("#svgDiv")
        .text('')
    console.log("drawingline")
    drawLine()
});


const transitionLineFunc = () =>{

}

d3.select("#transitionLine")
.on("click", ()=>{
    d3.select("#svgLine")
    .transition()
    .attr("x1", between(60,400))
    .attr("x2", between(17,700))
    .attr("y1", between(40,100))
    .attr("y2", between(40,100))
});


// let's create a bar chartdocument.body.appendChild(document.createElement("hr"))
document.body.appendChild(document.createElement("hr"))
const barDiv = ()=>{
    var div = document.createElement("div")
    div.id = "barDiv"
    div.classList.add("mx-5")
    document.body.appendChild(div)

    const update = document.createElement("button");
    update.id = "createBar"
    update.innerHTML = "draw bar"
    update.type = "button"
    update.classList.add('btn')
    update.classList.add('btn-success')
    update.classList.add('m-2')

    document.body.appendChild(update)   

    const transition = document.createElement("button");
    transition.id = "updateBar"
    transition.innerHTML = "updateBar"
    transition.type = "button"
    transition.classList.add('btn')
    transition.classList.add('btn-success')
    transition.classList.add('m-2')

    document.body.appendChild(transition)   
    

}
barDiv()


const addBar = () => {
    console.log("adding bar")

    d3.select('#barDiv').html(
        `
        <svg id="staticBarChart" class="chart" width="420" height="120">
        <g transform="translate(0,0)">
            <rect width="50" height="19"></rect>
            <text x="47" y="9.5" dy=".35em">5</text>
        </g>
        <g transform="translate(0,20)">
            <rect width="100" height="19"></rect>
            <text x="97" y="9.5" dy=".35em">10</text>
        </g>
        <g transform="translate(0,40)">
            <rect width="120" height="19"></rect>
            <text x="117" y="9.5" dy=".35em">12</text>
        </g>
    </svg>
        `
    )

    d3.select('#barDiv').append('p').text('this is a basic static bar graph. it is literally an html svg syntax appended to the div!')
    
}

d3.select('#createBar').on("click", addBar)
// d3.select('#updateBar').on("click", ()=>{
//     d3.select("#staticBarChart")
//     .transition()
//     .attr("x1", between(60,400))
//     .attr("x2", between(17,700))
//     .attr("y1", between(40,100))
//     .attr("y2", between(40,100))
// })


// now let's add dynamic bar
document.body.appendChild(document.createElement("hr"))
const dynamicBarDiv = ()=>{
    var div = document.createElement("div")
    div.id = "dynamicBarDiv"
    div.classList.add("mx-5")
    document.body.appendChild(div)

    const update = document.createElement("button");
    update.id = "createDynamicBar"
    update.innerHTML = "draw bar"
    update.type = "button"
    update.classList.add('btn')
    update.classList.add('btn-success')
    update.classList.add('m-2')

    document.body.appendChild(update)   

    const transition = document.createElement("button");
    transition.id = "updateDynamicBar"
    transition.innerHTML = "updateBar"
    transition.type = "button"
    transition.classList.add('btn')
    transition.classList.add('btn-success')
    transition.classList.add('m-2')

    document.body.appendChild(transition)   
    

}
dynamicBarDiv()

const addDynamicBar = () => {

    var data = [5, 10, 12];
    var width = 200,
    scaleFactor = 10,
    barHeight = 20;

    d3.select("#dynamicBarDiv").text("")

    var graph = d3.select("#dynamicBarDiv")
            .append("svg")
            .attr("width", width)
            .attr("height", barHeight * data.length);

    var bar = graph.selectAll("g")
            .data(data)
            .enter()
            .append("g")
            .attr("transform", function(d, i) {
                    return "translate(0," + i * barHeight + ")";
            });

    bar.append("rect")
    .attr("width", function(d) {
                return d * scaleFactor;
    })
    .attr("height", barHeight - 1);

    bar.append("text")
    .attr("x", function(d) { return (d*scaleFactor); })
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .text(function(d) { return d; });

    d3.select("#dynamicBarDiv").append("this one is a dynamic bar. it is set by the d3 instead of hardcode SVG")
}
d3.select('#createDynamicBar').on("click", addDynamicBar)

