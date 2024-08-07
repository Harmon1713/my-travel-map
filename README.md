# my-travel-map

This project is an interactive travel map that highlights countries you have visited. It uses D3.js and GeoJSON to render the map, with custom hover functionality to display images and information about each visited location.

[See the GitHub Page here](https://harmon1713.github.io/my-travel-map/) ⬅

## Features
- Interactive world map with country boundaries
- Highlights visited countries
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
	- Upload images for each visited country to the appropriate folder (e.g., images/United States of America.jpg for USA, images/Canada.jpg for Canada).

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
	- Edit the `visitedCountries` and `smallCountries` arrays in `custom-map.js` to include the countries and territories you have visited.
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
- [GeoJSON](https://github.com/geojson) - A format for encoding a variety of geographic data structures.
- [Johan](https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json) - Provides GeoJSON data for world countries.

