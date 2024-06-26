# my-travel-map

This project is an interactive travel map that highlights countries and states you have visited. It uses D3.js and TopoJSON to render the map, with custom hover functionality to display images and information about each visited location.

## Features

- Interactive world map with country and state (USA & Brazil) boundaries
- Highlights visited countries and states
- Displays images and information on hover

## Setup

### Prerequisites

- Basic knowledge of HTML, CSS, and JavaScript
- Git and GitHub account
- Text editor or IDE (e.g., VS Code)

### Installation

1. **Clone the repository:**
   ```
   git clone https://github.com/your-username/my-travel-map.git <!--put your info-->
   cd my-travel-map
   ```

2. **Add your images:**
	- Upload images for each visited country and state to the appropriate folder (e.g., images/usa/CA.jpg for California, images/brazil/SP.jpg for São Paulo).

3. **Customize image paths:**
	- Update the image paths in the custom-map.js file to point to your images.

4. **Commit and push your changes:**

   ```
   git add .
   git commit -m "Add images and update paths"
   git push origin main
   ```

### Usage

1. Open the `index.html` file in your browser to view the interactive travel map.

### Customization

1. Update visited locations:
	- Edit the `visitedCountries`, `visitedStatesUSA`, and `visitedStatesBrazil` arrays in `custom-map.js` to include the countries and states you have visited.
2. Change styles:
	- Modify the `custom-map.css` file to change the appearance of the map and tooltip.

## Deployment

### GitHub Pages

1. Enable GitHub Pages:
	- Go to your repository settings on GitHub.
	- Scroll down to the "GitHub Pages" section.
	- Under "Source", select the branch you want to use (usually `main` or `master`).
	- Click `Save`.

2. Access your GitHub Pages site:
	- Visit the URL generated by GitHub Pages, usually in the format `https://your-username.github.io/repository-name`.


## Acknowledgements
- [D3.js](https://d3js.org/) - A JavaScript library for producing dynamic, interactive data visualizations in web browsers.
- [TopoJSON](https://github.com/topojson/topojson) - An extension of GeoJSON that encodes topology and reduces the size of geographic data.
- [PublicaMundi GeoJSON](https://github.com/PublicaMundi/MappingAPI) - Provides GeoJSON data for various geographic regions.
- [Click That Hood](https://github.com/codeforamerica/click_that_hood) - Provides GeoJSON data for regions like Brazil states.

