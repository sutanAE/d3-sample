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
    console.log('returning div')
    return div;
}

const button2 = () => {
    console.log('creating button')
    const div = document.createElement("button");
    div.innerHTML = "set blank";
    div.id = "fadeout"
    console.log('returning div')
    return div;
}

const dataDiv = () => {
    console.log('creating div')
    const div = document.createElement("div");
    div.innerHTML = `<p style="color:blue; background-color: white">this is the data div!</p>`;
    div.id = "dataDiv"
    console.log('returning div')
    return div;
    
}


document.body.appendChild(init());
document.body.appendChild(secondDiv());
document.body.appendChild(button1());
document.body.appendChild(button2());
document.body.appendChild(document.createElement("hr"))
document.body.appendChild(dataDiv())







var data = [100, 200, 300];
var paragraph = d3.select("#mainDiv")
        .selectAll("p")
        .data(data)
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