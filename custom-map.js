const width = 960;
const height = 600;

const svgContainer = d3.select("#map")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const svg = svgContainer.append("g");

const projection = d3.geoMercator()
  .scale(200)
  .translate([width / 2, height / 1.5]);

const path = d3.geoPath().projection(projection);

const visitedCountries = {
  "Brazil": "green",
  "United States of America": "blue",
  "Mexico": "red",
  "Guatemala": "orange",
  "Haiti": "purple",
  "Dominican Republic": "teal",
  "Cuba": "darkorange",
  "Honduras": "cyan",
  "El Salvador": "lime",
  "Costa Rica": "magenta",
  "Panama": "brown",
  "Puerto Rico": "navy",
  "Jamaica": "olive",
  "The Bahamas": "lightcoral",
  "Belize": "maroon",
  "Argentina": "peru",
  "Uruguay": "pink",
  "Colombia": "lightgreen",
  "Paraguay": "crimson",
  "Turkey": "orchid",
  "Spain": "slateblue",
  "United Republic of Tanzania": "orangered"
};

const smallCountries = [
  "Bermuda", "US Virgin Islands", "Turks and Caicos Islands", "Saint Lucia", "Curaçao", "Cayman Islands", "Barbados", "Antigua and Barbuda"
];

const visitedCountryNames = Object.keys(visitedCountries)
  .concat(smallCountries)
  .sort();

Promise.all([
  d3.json("https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json")
]).then(([world]) => {
  const filteredWorld = world.features.filter(d => !smallCountries.includes(d.properties.name));

  function drawMap(offsetX) {
    svg.selectAll(`path${offsetX}`)
      .data(filteredWorld)
      .enter().append("path")
      .attr("d", path)
      .attr("transform", `translate(${offsetX}, 0)`)
      .attr("class", "country")
      .style("fill", d => (d.properties && visitedCountries[d.properties.name]) ? visitedCountries[d.properties.name] : "lightgray")
      .style("stroke", "white")
      .style("stroke-width", 0.5)
      .on("mouseover", function (event, d) {
        if (d.properties) {
          const countryName = d.properties.name;
          const visited = visitedCountries[countryName];
          const imagePath = `images/${countryName}.jpg`;
          const imageExists = new Image();
          imageExists.onload = function () {
            const tooltip = d3.select("#tooltip")
              .html(`<strong>${countryName}</strong><br><img src="${imagePath}" class="large-img">`)
              .style("display", "block")
              .style("width", "220px")
              .style("height", "auto"); // Remove fixed height
      
            const tooltipWidth = 220; // Fixed width for the tooltip
            const tooltipHeight = tooltip.node().offsetHeight; // Get the height of the tooltip
            const cursorX = event.pageX;
            const cursorY = event.pageY;
            const mapWidth = svgContainer.node().getBoundingClientRect().width;
            const mapHeight = svgContainer.node().getBoundingClientRect().height;
      
            let left, top;
      
            // Determine horizontal position
            if (cursorX < mapWidth / 2) {
              left = cursorX + 5;
            } else {
              left = cursorX - tooltipWidth - 5;
            }
      
            // Determine vertical position
            if (cursorY < mapHeight / 3) {
              top = cursorY + 5;
            } else if (cursorY > 2 * mapHeight / 3) {
              top = cursorY - tooltipHeight - 5;
            } else {
              top = cursorY - tooltipHeight / 4; // Adjusted to be half the distance from the cursor vertically
            }
      
            // Adjust for the six areas
            if (cursorX < mapWidth / 2 && cursorY < mapHeight / 3) { // Top left
              left = cursorX + 5;
              top = cursorY + 5;
            } else if (cursorX >= mapWidth / 2 && cursorY < mapHeight / 3) { // Top right
              left = cursorX - tooltipWidth - 5;
              top = cursorY + 5;
            } else if (cursorX < mapWidth / 2 && cursorY > 2 * mapHeight / 3) { // Bottom left
              left = cursorX + 5;
              top = cursorY - tooltipHeight - 5;
            } else if (cursorX >= mapWidth / 2 && cursorY > 2 * mapHeight / 3) { // Bottom right
              left = cursorX - tooltipWidth - 5;
              top = cursorY - tooltipHeight - 5;
            } else if (cursorX < mapWidth / 2) { // Middle left
              left = cursorX + 5;
              top = cursorY - tooltipHeight / 4; // Adjusted to be half the distance from the cursor vertically
            } else { // Middle right
              left = cursorX - tooltipWidth - 5;
              top = cursorY - tooltipHeight / 4; // Adjusted to be half the distance from the cursor vertically
            }
      
            tooltip.style("left", `${left}px`)
              .style("top", `${top}px`);
          };
          imageExists.onerror = function () {
            const tooltip = d3.select("#tooltip");
            if (visited) {
              tooltip.html(`<strong>${countryName}</strong><br>Picture coming soon!<br><img src="images/pic_to_come.png" class="normal-img">`)
                .style("width", "110px")
                .style("height", "auto"); // Adjust height based on content
            } else {
              tooltip.html(`<strong>${countryName}</strong><br>Not yet visited`)
                .style("width", "110px")
                .style("height", "auto"); // Adjust height based on content
            }
            tooltip.style("display", "block");
      
            const tooltipWidth = 220; // Fixed width for the tooltip
            const tooltipHeight = tooltip.node().offsetHeight; // Get the height of the tooltip
            const cursorX = event.pageX;
            const cursorY = event.pageY;
            const mapWidth = svgContainer.node().getBoundingClientRect().width;
            const mapHeight = svgContainer.node().getBoundingClientRect().height;
      
            let left, top;
      
            // Determine horizontal position
            if (cursorX < mapWidth / 2) {
              left = cursorX + 5;
            } else {
              left = cursorX - tooltipWidth - 5;
            }
      
            // Determine vertical position
            if (cursorY < mapHeight / 3) {
              top = cursorY + 5;
            } else if (cursorY > 2 * mapHeight / 3) {
              top = cursorY - tooltipHeight - 5;
            } else {
              top = cursorY - tooltipHeight / 4; // Adjusted to be half the distance from the cursor vertically
            }
      
            // Adjust for the six areas
            if (cursorX < mapWidth / 2 && cursorY < mapHeight / 3) { // Top left
              left = cursorX + 5;
              top = cursorY + 5;
            } else if (cursorX >= mapWidth / 2 && cursorY < mapHeight / 3) { // Top right
              left = cursorX - tooltipWidth - 5;
              top = cursorY + 5;
            } else if (cursorX < mapWidth / 2 && cursorY > 2 * mapHeight / 3) { // Bottom left
              left = cursorX + 5;
              top = cursorY - tooltipHeight - 5;
            } else if (cursorX >= mapWidth / 2 && cursorY > 2 * mapHeight / 3) { // Bottom right
              left = cursorX - tooltipWidth - 5;
              top = cursorY - tooltipHeight - 5;
            } else if (cursorX < mapWidth / 2) { // Middle left
              left = cursorX + 5;
              top = cursorY - tooltipHeight / 4; // Adjusted to be half the distance from the cursor vertically
            } else { // Middle right
              left = cursorX - tooltipWidth - 5;
              top = cursorY - tooltipHeight / 4; // Adjusted to be half the distance from the cursor vertically
            }
      
            tooltip.style("left", `${left-10}px`)
              .style("top", `${top}px`);
          };
          imageExists.src = imagePath;
          d3.select(this).style("fill", visited ? d3.rgb(visited).brighter() : "darkgray");
        }
      })
      .on("mouseout", function (event, d) {
        d3.select(this).style("fill", d.properties && visitedCountries[d.properties.name] ? visitedCountries[d.properties.name] : "lightgray");
        d3.select("#tooltip").style("display", "none");
      });
  }

  drawMap(0);
  drawMap(width * 1.3);
  drawMap(-width * 1.3);

  const counterContainer = d3.select("#map-container")
    .append("div")
    .attr("id", "visited-counter")
    .style("position", "absolute")
    .style("bottom", "10px")
    .style("left", "10px")
    .style("background-color", "rgba(255, 255, 255, 0.8)")
    .style("padding", "10px")
    .style("border-radius", "5px")
    .style("cursor", "pointer")
    .html(`Countries and Territories Visited: ${visitedCountryNames.length}`);

  const listContainer = counterContainer
    .append("div")
    .attr("id", "visited-list")
    .style("display", "none")
    .style("margin-top", "10px");

  const normalList = listContainer.append("div")
    .attr("id", "normal-list")
    .style("display", "flex")
    .style("flex-wrap", "wrap");

  const smallList = listContainer.append("div")
    .attr("id", "small-list")
    .style("margin-top", "10px");

  const columnCount = 2;
  normalList.selectAll("div")
    .data(visitedCountryNames.filter(d => !smallCountries.includes(d)))
    .enter()
    .append("div")
    .style("display", "flex")
    .style("align-items", "center")
    .style("margin-bottom", "5px")
    .style("width", `${100 / columnCount}%`)
    .html(d => `<div style="width: 20px; height: 20px; background-color: ${visitedCountries[d]}; margin-right: 5px;"></div>${d}`)
    .on("mouseover", function (event, d) {
      d3.selectAll("path.country").filter(country => country.properties.name === d).style("fill", "gold");
    })
    .on("mouseout", function (event, d) {
      d3.selectAll("path.country").filter(country => country.properties.name === d).style("fill", visitedCountries[d]);
    });

  smallList.append("div")
    .style("margin-bottom", "5px")
    .html(`<strong>Not shown on map due to size:</strong>`);

  smallList.selectAll("div")
    .data(visitedCountryNames.filter(d => smallCountries.includes(d)))
    .enter()
    .append("div")
    .style("margin-bottom", "5px")
    .html(d => `${d}`);

  counterContainer.on("click", function (event) {
    event.stopPropagation();
    const list = d3.select("#visited-list");
    const isVisible = list.style("display") === "block";
    list.style("display", isVisible ? "none" : "block");
  });

  d3.select("body").on("click", function () {
    d3.select("#visited-list").style("display", "none");
  });

  d3.select("#map-container").on("click", function (event) {
    event.stopPropagation();
    d3.select("#visited-list").style("display", "none");
  });

  d3.select("#visited-list").on("click", function (event) {
    event.stopPropagation();
  });

  svgContainer.on("mousemove", function (event) {
    const isHoveringCountry = d3.selectAll("path.country:hover").size() > 0;
    if (!isHoveringCountry) {
      d3.select("#tooltip").style("display", "none");
    }
  });

  svgContainer.on("click", function () {
    d3.select("#visited-list").style("display", "none");
  });
}).catch(error => {
  console.error("Error loading or processing data:", error);
});

const zoom = d3.zoom()
  .scaleExtent([1, 8])
  .on("zoom", zoomed);

svgContainer.call(zoom);

function zoomed(event) {
  const { x, y, k } = event.transform;
  svg.attr("transform", event.transform);

  if (x > width) {
    event.transform.x = x - width;
    svg.attr("transform", event.transform);
  } else if (x < -width) {
    event.transform.x = x + width;
    svg.attr("transform", event.transform);
  }
}

d3.select("#zoom-in").on("click", function () {
  svgContainer.transition().call(zoom.scaleBy, 1.2);
});

d3.select("#zoom-out").on("click", function () {
  svgContainer.transition().call(zoom.scaleBy, 0.8);
});


