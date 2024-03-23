// Use D3 to fetch the data
d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then(data => {
    // Extract necessary data
    var samples = data.samples;

    // Get the first sample
    var sample = samples[0];

    // Slice to get top 10 OTUs
    var topTenSampleValues = sample.sample_values.slice(0, 10).reverse();
    var topTenOTUIds = sample.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
    var topTenOTULabels = sample.otu_labels.slice(0, 10).reverse();

    // Create trace for horizontal bar chart
    var trace1 = {
        x: topTenSampleValues,
        y: topTenOTUIds,
        text: topTenOTULabels,
        type: "bar",
        orientation: "h"
    };

    // Create data array for the plot
    var data = [trace1];

    // Define plot layout
    var layout = {
        title: "Top 10 OTUs Found",
        xaxis: { title: "Sample Values" },
        yaxis: { title: "OTU ID" }
    };

    // Plot the chart
    Plotly.newPlot("bar", data, layout);

    // Populate dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    samples.forEach(sample => {
        dropdownMenu.append("option")
            .text(sample.id)
            .property("value", sample.id);
    });

    // Function to handle dropdown change
    function optionChanged(selectedID) {
        // Find the selected sample
        var selectedSample = samples.find(sample => sample.id === selectedID);
        // Update bar chart with new data
        var topTenSampleValues = selectedSample.sample_values.slice(0, 10).reverse();
        var topTenOTUIds = selectedSample.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
        var topTenOTULabels = selectedSample.otu_labels.slice(0, 10).reverse();

        Plotly.restyle("bar", "x", [topTenSampleValues]);
        Plotly.restyle("bar", "y", [topTenOTUIds]);
        Plotly.restyle("bar", "text", [topTenOTULabels]);
    }
});


// Use D3 to fetch the data
d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then(data => {
    // Extract necessary data
    var samples = data.samples;

    // Get the first sample
    var sample = samples[0];

    // Create trace for bubble chart
    var trace2 = {
        x: sample.otu_ids,
        y: sample.sample_values,
        text: sample.otu_labels,
        mode: 'markers',
        marker: {
            size: sample.sample_values,
            color: sample.otu_ids,
            colorscale: 'Earth'
        }
    };

    // Create data array for the plot
    var dataBubble = [trace2];

    // Define plot layout
    var layoutBubble = {
        title: 'OTU Sample',
        xaxis: { title: 'OTU ID' },
        yaxis: { title: 'Sample Values' }
    };

    // Plot the bubble chart
    Plotly.newPlot('bubble', dataBubble, layoutBubble);

    // Populate dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    samples.forEach(sample => {
        dropdownMenu.append("option")
            .text(sample.id)
            .property("value", sample.id);
    });

    // Function to handle dropdown change
    function optionChanged(selectedID) {
        // Find the selected sample
        var selectedSample = samples.find(sample => sample.id === selectedID);
        // Update bubble chart with new data
        Plotly.restyle("bubble", "x", [selectedSample.otu_ids]);
        Plotly.restyle("bubble", "y", [selectedSample.sample_values]);
        Plotly.restyle("bubble", "text", [selectedSample.otu_labels]);
        Plotly.restyle("bubble", "marker.size", [selectedSample.sample_values]);
        Plotly.restyle("bubble", "marker.color", [selectedSample.otu_ids]);
    }
});


// Function to update all plots and metadata
function updatePlots(selectedID) {
    // Find the selected sample
    var selectedSample = samples.find(sample => sample.id === selectedID);
    
    // Update bar chart data
    var topTenSampleValues = selectedSample.sample_values.slice(0, 10).reverse();
    var topTenOTUIds = selectedSample.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
    var topTenOTULabels = selectedSample.otu_labels.slice(0, 10).reverse();
    Plotly.restyle("bar", "x", [topTenSampleValues]);
    Plotly.restyle("bar", "y", [topTenOTUIds]);
    Plotly.restyle("bar", "text", [topTenOTULabels]);

    // Update bubble chart data
    Plotly.restyle("bubble", "x", [selectedSample.otu_ids]);
    Plotly.restyle("bubble", "y", [selectedSample.sample_values]);
    Plotly.restyle("bubble", "text", [selectedSample.otu_labels]);
    Plotly.restyle("bubble", "marker.size", [selectedSample.sample_values]);
    Plotly.restyle("bubble", "marker.color", [selectedSample.otu_ids]);

    // Update metadata display
    var metadataDisplay = d3.select("#sample-metadata");
    metadataDisplay.html(""); // Clear previous metadata
    Object.entries(selectedSample.metadata).forEach(([key, value]) => {
        metadataDisplay.append("p").text(`${key}: ${value}`);
    });
}

// Function to handle dropdown change
function optionChanged(selectedID) {
    updatePlots(selectedID);
}

// Use D3 to fetch the data
d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then(data => {
    // Extract necessary data
    var samples = data.samples;

    // Populate dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    samples.forEach(sample => {
        dropdownMenu.append("option")
            .text(sample.id)
            .property("value", sample.id);
    });

    // Update plots and metadata for initial sample
    updatePlots(samples[0].id);
});
