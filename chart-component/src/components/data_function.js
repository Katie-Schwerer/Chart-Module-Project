function readDataArray(data, property) {
    let color = ["rgb(31, 160, 64)", "rgb(209, 65, 36)", "rgb(0, 114, 209)"];
    let dataset = []
    let index = 0;

    for (let i = 1; i < property.length; i++) {
        let column = {
            label: property[i],
            data: data.map((row) => row[property[i]]),
            backgroundColor: color[index]
        }

        dataset.push(column);
        index += 1;
    }

    return dataset;
}

export default readDataArray;