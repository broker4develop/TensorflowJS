async function run() {
    const series1 = [];
    for( let i=0; i<100; i++) {
        series1.push({x: i, y:i+Math.random() * 50})
    }

    const series2 = [];
    for( let i=0; i<100; i++) {
        series2.push({x: i, y:i+Math.random() * 5})
    }

    const surface = {name: '선형도표', tab: 'linechart'}
    tfvis.render.scatterplot(surface, {
        values: [series1, series2],
        series: ["Noise1", "raw noise"]
    })
}

run();


// async function run() {
//     const labels = tf.tensor1d([0,1,2,3,4,5,6,7,8,9]);
//     const preds  = tf.tensor1d([0,2,3,3,6,5,6,7,9,0]);
//     result = await tfvis.metrics.confusionMatrix(labels, preds);
//     const surface = { name: '혼동행렬', tab: 'Chart'}
//     const data ={ values: result};
//     tfvis.render.confusionMatrix(surface, data);
// }

// run();