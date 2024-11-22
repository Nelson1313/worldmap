const width = 960;
const height = 600;

// SVG létrehozása
const svg = d3.select("#map")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Vetület beállítása
const projection = d3.geoNaturalEarth1()
  .scale(160)
  .translate([width / 2, height / 2]);
const path = d3.geoPath().projection(projection);

// Tooltip hozzáadása
const tooltip = d3.select("#tooltip");

// Alapértelmezett kiválasztott országok listája
const defaultSelectedCountries = new Set([
  "Argentina", "Brazil", "Chile", "Colombia", "Costa Rica", "Dominican Republic", 
  "Ecuador", "Guatemala", "Mexico", "Panama", "Peru", "USA", 
  "Venezuela", "Canada",
  "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czech Republic", 
  "Denmark", "Finland", "France", "Germany", "Greece", "Hungary", "Ireland", 
  "Israel", "Italy", "Latvia", "Malta", "Netherlands", "Norway", "Poland", 
  "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden", 
  "Switzerland", "Turkey", "United Kingdom",
  "Australia", "Bangladesh", "Cambodia", "China", "Hong Kong", "India", 
  "Indonesia", "Korea", "Malaysia", "Myanmar", "New Zealand", "Philippines", 
  "Singapore", "Sri Lanka", "Taiwan", "Thailand", "Vietnam"
]);

// GeoJSON betöltése
d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
  .then(data => {
    // Országok kirajzolása
    svg.selectAll(".country")
      .data(data.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("class", "country")
      .classed("highlighted", d => defaultSelectedCountries.has(d.properties.name)) // Alapértelmezett kijelölés
      .on("mouseover", function (event, d) {
        // Tooltip megjelenítése
        const countryName = d.properties.name;
        tooltip.style("display", "block").text(countryName)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY + 10) + "px");
      })
      .on("mouseout", () => {
        // Tooltip elrejtése
        tooltip.style("display", "none");
      });
  })
  .catch(error => console.error("Error loading the map data:", error));
