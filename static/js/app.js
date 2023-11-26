const samples_data_path="https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

function SampleValues(samples,ifSlice){
    // convert dictionary of lists into a list of dictionaries
    let samples_list_of_dict=[];
    for (let i=0; i<samples.otu_ids.length; i++)
    {
        let otuIdText=samples.otu_ids[i];
        if (ifSlice) { otuIdText=`OTU ${samples.otu_ids[i]}`}
        samples_list_of_dict.push(
         {"otu_id":otuIdText,
        "sample_value":samples.sample_values[i],
        "otu_label":samples.otu_labels[i]}
        )};
    if (ifSlice) {    
    // sort values and return top 10
    let sortedList=samples_list_of_dict.sort((a,b)=>(b.sample_value-a.sample_value));
    return sortedList.slice(0, 10)}
    else {return samples_list_of_dict};
}

function titleBarF(sampleDict,idActual){
    let title = {title: {
            text:  `<b>Top 10 OTUs found in individual with ID ${idActual}</b><br>'Bar' mode`,
            font: {
                family: 'Arial, Helvetica, sans-serif',
                size: 16
            }}}
    if (sampleDict.otu_ids.length<10) {
        { title = {title: { 
            text: `<b>OTUs found in individual with ID ${idActual}</b><br>'Bar' mode`,
            font: {
                family: 'Arial, Helvetica, sans-serif',
                size: 16
             }}}}}
    return title
}

function adjustedSizeList(valuesList,maxS,minS){
    // to be consistent apply similar approach as for colors we used in markers: 
    // define acceptable range of values [minAcceptable;maxAcceptable]
    // and then having max and min for the whole set convert any value within the range into [0;1]: projected01=(value-min)/(max-min)
    // then convert projected01 into value within range [minAcceptable;maxAcceptable]: projected01*(maxAcceptable-minAcceptable)+minAcceptable
    // https://math.stackexchange.com/questions/914823/shift-numbers-into-a-different-range
    let minAcceptable=10;
    let maxAcceptable=600;
    return valuesList.map(value=>(minAcceptable+(value-minS)*(maxAcceptable-minAcceptable)/(maxS-minS)));
}

function minMax(samplesListDict){
    // Find overall Max and Min of sample values
    // https://medium.com/@vladbezden/how-to-get-min-or-max-of-an-array-in-javascript-1c264ec6e1aa
    let minSample=Math.min(...samplesListDict[0].sample_values);
    let maxSample=Math.max(...samplesListDict[0].sample_values);
    for (let i of samplesListDict){
        for (let j of i.sample_values){
            if (j<minSample) {minSample=j};
            if (j>maxSample) {maxSample=j}; 
        }
    };
    return [maxSample,minSample]
}

function plotBubble(selected_sample_dict,maxSample,minSample){
    // plot the bubble chart
    // https://plotly.com/javascript/bubble-charts/
    // https://plotly.com/javascript/bubble-maps/
    let otuIds=SampleValues(selected_sample_dict[0],false).map(item=>item.otu_id);
    console.log('OTU IDs for the individual')
    console.log(otuIds)
    let sampleValues=SampleValues(selected_sample_dict[0],false).map(item=>item.sample_value);
    let size_adjusted=adjustedSizeList(sampleValues,maxSample,minSample);
    
    let traceBubble = {
        x: otuIds,
        y: sampleValues,
        mode: 'markers',
        marker: { 
            color: otuIds,
            colorscale: [
                ['0.0', 'rgb(165,0,38)'],
                ['0.111111111111', 'rgb(215,48,39)'],
                ['0.222222222222', 'rgb(244,109,67)'],
                ['0.333333333333', 'rgb(253,174,97)'],
                ['0.444444444444', 'rgb(254,224,144)'],
                ['0.555555555556', 'rgb(224,243,248)'],
                ['0.666666666667', 'rgb(171,217,233)'],
                ['0.777777777778', 'rgb(116,173,209)'],
                ['0.888888888889', 'rgb(69,117,180)'],
                ['1.0', 'rgb(49,54,149)']
              ],
            size:  size_adjusted},
        text: SampleValues(selected_sample_dict[0],false).map(item=>item.otu_label),
      };

      let data_bubble = [traceBubble];
      let layout_bubble = {
        title: {
            text: `<b>OTUs found in individual with ID ${selected_sample_dict[0].id}</b><br>'Bubble' mode`,
            font: {
                family: 'Arial, Helvetica, sans-serif',
                size: 16
            }}, 
        xaxis: {title: 'IDs of OTU' },
        yaxis: {title: 'Sample Value'},
        padding: { t: 0, r: 0, b: 0, l: 0 }
      };
    
      Plotly.newPlot("bubble", data_bubble, layout_bubble, {responsive:true});
}

function gaugePlot(wfreq,idIndividual){
    let dataGauge = [{
            value: wfreq,
            title: {
                text: `<b>Belly Button Washing Frequency (ID ${idIndividual})</b><br>Scrubs per Week`,
                font: {
                    family: 'Arial, Helvetica, sans-serif',
                    size: 16
                }}, 
            type: "indicator",
            number: {
                font: {
                    family: 'Arial, Helvetica, sans-serif',
                    size: 10,  
                }
            },
            mode: "gauge+number",
            gauge: {
                axis: { 
                    range: [0, 9],
                    visible: true,
                    tickvals:[0.5,1.5,2.5,3.5,4.5,5.5,6.5,7.5,8.5,9.5],
                    ticktext:['[0-1)','[1-2)','[2-3)','[3-4)','[4-5)','[5-6)','[6-7)','[7-8)','[8-9)','[8-9)'],
                    tickmode:'array',
                    tickangle:0
                  },
                bar: {
                      color: "rgba(0,0,0,0)"
                    },
                bgcolor: "white",
                borderwidth: 1,
                bordercolor: "gray",
                steps: [
                    { range: [0, 1], color: 'rgb(165,0,38)' },
                    { range: [1, 2], color: 'rgb(215,48,39)' },
                    { range: [2, 3], color: 'rgb(244,109,67)' },
                    { range: [3, 4], color: 'rgb(253,174,97)' },
                    { range: [4, 5], color: 'rgb(254,224,144)' },
                    { range: [5, 6], color: 'rgb(224,243,248)' },
                    { range: [6, 7], color: 'rgb(171,217,233)' },
                    { range: [7, 8], color: 'rgb(116,173,209)' },
                    { range: [8, 9], color: 'rgb(69,117,180)' }

                ]}}];

    // https://stackoverflow.com/questions/67529286/how-to-add-a-needle-or-dial-to-gauge-indicator-in-plotly-js
    // https://courses.lumenlearning.com/precalculus/chapter/unit-circle-sine-and-cosine-functions/
    let theta = 180-(0+wfreq*(180-0)/9); //convert value from [0;9] into [0;180]
    let r = 0.3;
    let x_head = r * Math.cos(Math.PI/180*theta);
    let y_head = r * Math.sin(Math.PI/180*theta);
    let annotations= [
        {
          ax: 0.5,
          ay: 0.2,
          axref: 'x',
          ayref: 'y',
          x: 0.5 + x_head,
          y: 0.2 + y_head,
          xref: 'x',
          yref: 'y',
          showarrow: true,
          arrowhead: 9,
        }];
        if (wfreq==null){
            annotations=[{
                text: "No Frequency Data<br>for the Individual",
                x: 0.5, 
                y: 0.5, 
                xref: 'paper', 
                yref: 'paper', 
                showarrow: false,
                font: {
                    family: 'Arial, Helvetica, sans-serif',
                    size: 12
                },
                align: "center"
            }]
    
        }

    let layoutGauge = {
        width: 450, 
        height: 300,
        margin: { t: 25, r: 50, l: 50, b: 0 },
        xaxis: {range: [0, 1], showgrid: false, 'zeroline': false, 'visible': false},
        yaxis: {range: [0, 1], showgrid: false, 'zeroline': false, 'visible': false},
        showlegend: false,
        annotations: annotations
      };
    
    Plotly.newPlot('gauge', dataGauge, layoutGauge);
}


d3.json(samples_data_path).then(function(data){
    console.log('Input Data (original):')
    console.log(data)
    const names_list = data.names;
    const metadata_list_of_dict = data.metadata;
    const samples_list_of_dict=data.samples;


    let dropdownMenu = d3.select("#selDataset");
    // https://stackoverflow.com/questions/56307874/how-do-i-use-d3-to-i-populate-drop-down-options-from-json
    var options = dropdownMenu.selectAll('option')
        .data(names_list)

        //d3 sees we have less elements (0) than the data, so we are tasked to create
        //these missing inside the `options.enter` pseudo selection.
        //if we had some elements from before, they would be reused, and we could access their
        //selection with just `options`
        options.enter()
        .append('option')
        .attr('value', d=>d)
        .text(d=>d);

    // plot initial bar chart of sample values
    function init() {
        trace1 = {
          x: SampleValues(samples_list_of_dict[0],true).map(item=>item.sample_value).reverse(),
          y: SampleValues(samples_list_of_dict[0],true).map(item=>item.otu_id).reverse(),
          type: 'bar',
          text: SampleValues(samples_list_of_dict[0],true).map(item=>item.otu_label),
          orientation:"h"
        };

        let titleBar=titleBarF(samples_list_of_dict[0],samples_list_of_dict[0].id);

        let data = [trace1];

        let layout = {
        // https://stackoverflow.com/questions/70337807/how-to-change-font-size-padding-of-chart-title-only-in-chart-js-3-x
            title: titleBar.title,
            xaxis: {title: 'Sample Value' },
            yaxis: {title: 'IDs of OTU'}
            };
      // https://discourse.julialang.org/t/plotlyjs-how-to-make-a-responsive-chart/66942
        Plotly.newPlot("bar", data, layout, {responsive:true});
//  Plot initial bubble chart 
        const [maxSample,minSample]=minMax(samples_list_of_dict)
        plotBubble(samples_list_of_dict,maxSample,minSample);
// Populate initial metadata
        // Convert dictionary of metadata into array of strings to output https://javascript.info/keys-values-entries
        let listItems=Object.entries(metadata_list_of_dict[0]).map(([key, value]) => `<b>${key}</b>: ${value}`)
        // Select the part of html reserved for sample-metadata
        // Populate sample-data part with data
        // https://stackoverflow.com/questions/30518546/how-to-append-text-to-a-div-in-d3
        d3.select("#sample-metadata")
            .append('div')
            .html(listItems.join('<br/>'));
        // Populate initial Gauge
        gaugePlot(metadata_list_of_dict[0].wfreq,names_list[0])
      }

    init();  

    d3.selectAll("#selDataset").on("change", function(){optionChanged(this.value)});


    // This function is called when a dropdown menu item is selected
    function optionChanged(new_id) {
        //filter by id of an individual
        // https://www.geeksforgeeks.org/how-to-implement-a-filter-for-objects-in-javascript/
        let selected_sample_dict=samples_list_of_dict.filter(sample_dict => sample_dict.id==new_id)
        // Initialize x and y arrays
        let x = SampleValues(selected_sample_dict[0],true).map(item=>item.sample_value).reverse();
        let y = SampleValues(selected_sample_dict[0],true).map(item=>item.otu_id).reverse();
        let text = SampleValues(selected_sample_dict[0],true).map(item=>item.otu_label);
        let titleBar=titleBarF(selected_sample_dict[0],new_id);

        // update the plot https://plotly.com/javascript/plotlyjs-function-reference/
        Plotly.restyle("bar", "x", [x]);
        Plotly.restyle("bar", "y", [y]);
        Plotly.restyle("bar", "text", [text]);
        Plotly.relayout("bar", titleBar);

        // regenerate bubble chart
        const [maxSample,minSample]=minMax(samples_list_of_dict);
        plotBubble(selected_sample_dict,maxSample,minSample);

      // Populate metadata for newly selected item
        // Convert dictonary of metadata into array of strings to output
        let newly_selected_metadata=metadata_list_of_dict.filter(item => item.id==new_id);
        let listItems=Object.entries(newly_selected_metadata[0]).map(([key, value]) => `<b>${key}</b>: ${value}`);
        // Select the part of html reserved for sample-metadata
        let parent = d3.select("#sample-metadata");
        // Clear old content https://stackoverflow.com/questions/10784018/how-can-i-remove-or-replace-svg-content
        parent.selectAll("*").remove();
         // Update sample-data part with new data
        d3.select("#sample-metadata")
            .append('div')
            .html(listItems.join('<br/>'));
        // Update gauge plot for newly selected individual id
        let selected_metadata=metadata_list_of_dict.filter(metadata_dict => metadata_dict.id==new_id)
        gaugePlot(selected_metadata[0].wfreq,new_id)
    }

});