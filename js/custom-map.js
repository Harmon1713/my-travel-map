const width = 960;
const height = 600;

const svg = d3.select("#map")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const projection = d3.geoMercator()
  .scale(150)
  .translate([width / 2, height / 1.5]);

const path = d3.geoPath().projection(projection);

const visitedCountries = ["BRA", "USA"]; // ISO 3166-1 alpha-3 codes for visited countries
const visitedStatesUSA = ["CA", "NY"]; // Add state codes for visited states in the USA
const visitedStatesBrazil = ["SP", "RJ"]; // Add state codes for visited states in Brazil

Promise.all([
  d3.json("https://d3js.org/world-50m.v1.json"),
  d3.json("https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json"),
  d3.json("https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson")
]).then(([world, usaStates, brazilStates]) => {
  // Draw countries
  svg.append("g")
    .selectAll("path")
    .data(topojson.feature(world, world.objects.countries).features)
    .enter().append("path")
    .attr("d", path)
    .attr("class", "country")
    .style("fill", d => visitedCountries.includes(d.id) ? "green" : "gray")
    .on("mouseover", function (event, d) {
      d3.select(this).style("fill", "lightgreen");
      d3.select("#tooltip")
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 20) + "px")
        .style("display", "block")
        .html(`<strong>${d.properties.name}</strong><br><img src="images/${d.id}.jpg" width="100" height="100">`);
    })
    .on("mouseout", function (d) {
      d3.select(this).style("fill", visitedCountries.includes(d.id) ? "green" : "gray");
      d3.select("#tooltip").style("display", "none");
    });

  // Draw USA states
  svg.append("g")
    .selectAll("path")
    .data(usaStates.features)
    .enter().append("path")
    .attr("d", path)
    .attr("class", "state")
    .style("fill", d => visitedStatesUSA.includes(d.properties.name) ? "green" : "gray")
    .on("mouseover", function (event, d) {
      d3.select(this).style("fill", "lightgreen");
      d3.select("#tooltip")
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 20) + "px")
        .style("display", "block")
        .html(`<strong>${d.properties.name}</strong><br><img src="images/usa/${d.properties.name}.jpg" width="100" height="100">`);
    })
    .on("mouseout", function (d) {
      d3.select(this).style("fill", visitedStatesUSA.includes(d.properties.name) ? "green" : "gray");
      d3.select("#tooltip").style("display", "none");
    });

  // Draw Brazil states
  svg.append("g")
    .selectAll("path")
    .data(brazilStates.features)
    .enter().append("path")
    .attr("d", path)
    .attr("class", "state")
    .style("fill", d => visitedStatesBrazil.includes(d.properties.sigla) ? "green" : "gray")
    .on("mouseover", function (event, d) {
      d3.select(this).style("fill", "lightgreen");
      d3.select("#tooltip")
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 20) + "px")
        .style("display", "block")
        .html(`<strong>${d.properties.nome}</strong><br><img src="images/brazil/${d.properties.sigla}.jpg" width="100" height="100">`);
    })
    .on("mouseout", function (d) {
      d3.select(this).style("fill", visitedStatesBrazil.includes(d.properties.sigla) ? "green" : "gray");
      d3.select("#tooltip").style("display", "none");
    });
});
