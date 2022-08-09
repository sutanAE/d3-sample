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

document.body.appendChild(init());
document.body.appendChild(secondDiv());





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



d3.select("#secondDiv")
.on("mouseover", function(){
    d3.select(this)
        .style("background-color", "orange");
})
.on("mouseout", function(){
    d3.select(this)
        .style("background-color", "")
});