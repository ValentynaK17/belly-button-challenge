# belly-button-challenge
Interactive dashboard to explore the Belly Button Biodiversity dataset, which catalogs the microbes that colonize human navels
## Repository Contents
  - *index.html*: structures the dashboard's webpage
  - *samples.json*: contains the raw input data for the project. It's not directly used in the scripts but is provided for reference purposes
  - **static** directory contains:
    - **css** subdirectory with *styleAdjustments.css* that adjusts style elements of the dashboard <br>
    - **js** subdirectory with the core JavaScript file *app.js*, responsible for constructing and rendering the interactive charts on the webpage: bar chart, bubble chart and custom gauge one adjusted depending on individual id selected, which reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare. <br>
## Usage
 - *Localy*: open the *index.html* in a web browser (such as Chrome) using Visual Studio Code, along with a suitable extension for live previews
 - *Online*: preview visualization on GitHub Pages (TO ADD A LINK)
## Info Resources
 - Populate html elements via json: 
   - [Dropdown Items](https://stackoverflow.com/questions/56307874/how-do-i-use-d3-to-i-populate-drop-down-options-from-json)
   - [Text](https://stackoverflow.com/questions/30518546/how-to-append-text-to-a-div-in-d3)
 - [Clear old content in html via json](https://stackoverflow.com/questions/10784018/how-can-i-remove-or-replace-svg-content)
- [Filtering data in js](https://www.geeksforgeeks.org/how-to-implement-a-filter-for-objects-in-javascript/)
- [Updating a plot in js](https://plotly.com/javascript/plotlyjs-function-reference/)
- [Adjusting a padding for a js chart](https://stackoverflow.com/questions/70337807/how-to-change-font-size-padding-of-chart-title-only-in-chart-js-3-x)
- [Enable responsiveness to a js chart](https://discourse.julialang.org/t/plotlyjs-how-to-make-a-responsive-chart/66942)  
- [Convert dictionary of metadata into array of strings to output](https://javascript.info/keys-values-entries)
- [Shift numbers into different range](https://math.stackexchange.com/questions/914823/shift-numbers-into-a-different-range)
 - Bubble plot:
   - [bubble-charts](https://plotly.com/javascript/bubble-charts/)
   - [bubble-maps](https://plotly.com/javascript/bubble-maps/)
- [Min, Max of an array](https://medium.com/@vladbezden/how-to-get-min-or-max-of-an-array-in-javascript-1c264ec6e1aa)
- [Formatting html](https://www.w3schools.com/html/html_formatting.asp)
- [Gauge chart parameters](https://plotly.com/javascript/reference/indicator/)
- [Intro into Gauge chart](https://plotly.com/javascript/gauge-charts/)
 - Plotting a custom needle within a gauge chart:
   - [stackoverflow](https://stackoverflow.com/questions/67529286/how-to-add-a-needle-or-dial-to-gauge-indicator-in-plotly-js)
   - [Math behind](https://courses.lumenlearning.com/precalculus/chapter/unit-circle-sine-and-cosine-functions/)

