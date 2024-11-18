const margin = { top: 40, right: 60, bottom: 60, left: 60 };
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

d3.csv("qs-world-rankings-2025.csv").then((eddata) => {
    // document.addEventListener("DOMContentLoaded", function() {
        createBoxPlot(eddata);
        createScatterPlot(eddata);
        createBubblePlot(eddata);
        createBarPlot(eddata);
        createTreemapPlot(eddata);
    // });
});

function createBoxPlot(eddata) {
    const svg = d3.select("#box-plot")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const data = months.map(month => ({
        month: month,
        value1: Math.random() * 30 + 10,
        value2: Math.random() * 10
    }));

    const x = d3.scaleBand()
        .domain(months)
        .range([0, width])
        .padding(0.2);

    const y = d3.scaleLinear()
        .domain([0, 45])
        .range([height, 0]);

    svg.selectAll(".bar1")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.month))
        .attr("y", d => y(d.value1))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.value1))
        .attr("fill", "#98FB98");

    svg.selectAll(".bar2")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.month))
        .attr("y", d => y(d.value2))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.value2))
        .attr("fill", "#228B22");

    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    svg.append("g")
        .call(d3.axisLeft(y));
    
        const legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${width - 100}, 0)`);

    legend.append("text")
        .attr("x", 15)
        .attr("y", 10)
        .text("Avg. Research Papers in 2024")
        .style("fill", "lightgreen");

    legend.append("text")
        .attr("x", 15)
        .attr("y", 30)
        .text("Avg. Research Papers in 2025")
        .style("fill", "darkgreen");
}

function createScatterPlot(eddata) {
    const svg = d3.select("#scatter-plot")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const data = Array.from({length: 100}, (_, i) => ({
        sustainability: i,
        score: Math.random() * 4 + 4,
        rain: Math.random() > 0.5
    }));

    const x = d3.scaleLinear()
        .domain([0, 100])
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, 10])
        .range([height, 0]);

    svg.selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "scatter-dot")
        .attr("cx", d => x(d.sustainability))
        .attr("cy", d => y(d.score))
        .attr("r", 4)

    const line = d3.line()
        .x(d => x(d.sustainability))
        .y(d => y(4 + d.sustainability * 0.04));

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .style("stroke", "black")
        .style("stroke-width", 1)
        .attr("d", line);

    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    svg.append("g")
        .call(d3.axisLeft(y));

    svg.append("text")
        .attr("class", "axis-label")
        .attr("text-anchor", "middle")
        .attr("x", width/2)
        .attr("y", height + 40)
        .text("Sustainability");

    svg.append("text")
        .attr("class", "axis-label")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("x", -height/2)
        .attr("y", -40)
        .text("Score / 10");
}

function createBubblePlot(eddata) {
    const svg = d3.select("#bubble-plot")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const institution = ["MIT", "Princeton", "Stanford", "Harvard", "CIT", "Imperial London", "Cornell", "Cambridge", "Singapore"];
    const data = institution.map(name => ({
        text: name,
        value: Math.random() * 11.67
    }));

    const color = d3.scaleLinear()
        .domain([0.06, 11.67])
        .range(["#FFB6C1", "#8B0000"]);

    const squareSize = Math.min(width, height) / 4;
    
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d, i) => (i % 3) * squareSize)
        .attr("y", (d, i) => Math.floor(i / 3) * squareSize)
        .attr("width", squareSize)
        .attr("height", squareSize)
        .style("fill", d => color(d.value))
        .style("stroke", "white");

    svg.selectAll(".year-label")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "year-label")
        .attr("x", (d, i) => (i % 3) * squareSize + squareSize/2)
        .attr("y", (d, i) => Math.floor(i / 3) * squareSize + squareSize/2)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .style("fill", "white")
        .text(d => d.text);
}

function createBarPlot() {
    var svg = d3.select("#bar-plot")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
var data = [12,19,11,13,12,22,13,4,15,16,18,19,20,12,11,9];
var data_sorted = data.sort(d3.ascending)
var q1 = d3.quantile(data_sorted, .25)
var median = d3.quantile(data_sorted, .5)
var q3 = d3.quantile(data_sorted, .75)
var interQuantileRange = q3 - q1
var min = q1 - 1.5 * interQuantileRange
var max = q1 + 1.5 * interQuantileRange
var y = d3.scaleLinear()
  .domain([0,24])
  .range([height, 0]);
svg.call(d3.axisLeft(y))
var center = 200
var width = 100
svg
.append("line")
  .attr("x1", center)
  .attr("x2", center)
  .attr("y1", y(min) )
  .attr("y2", y(max) )
  .attr("stroke", "black")
svg
.append("rect")
  .attr("x", center - width/2)
  .attr("y", y(q3) )
  .attr("height", (y(q1)-y(q3)) )
  .attr("width", width )
  .attr("stroke", "black")
  .style("fill", "#69b3a2")
svg
.selectAll("toto")
.data([min, median, max])
.enter()
.append("line")
  .attr("x1", center-width/2)
  .attr("x2", center+width/2)
  .attr("y1", function(d){ return(y(d))} )
  .attr("y2", function(d){ return(y(d))} )
  .attr("stroke", "black")
}

function createTreemapPlot(eddata) {
    const svg = d3.select("#treemap-plot")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${width/2 + margin.left},${height/2 + margin.top})`);

    const data = [
        { label: "Institutions that slipped > 5 ranks", value: 75 },
        { label: "Managed to remain within +/- 5", value: 25 },
    ];

    const pie = d3.pie()
        .value(d => d.value);

    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(Math.min(width, height) / 2);

    const colors = ["#FF6B6B", "#FFB6C1"];

    const arcs = svg.selectAll("arc")
        .data(pie(data))
        .enter()
        .append("g");

    arcs.append("path")
        .attr("d", arc)
        .attr("fill", (d, i) => colors[i]);

    arcs.append("text")
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        .attr("text-anchor", "middle")
        .text(d => d.data.label)
        .style("font-size", "12px")
        .style("fill", "white");
}