let input_max;
let labels_max;

async function getData(){
    const carsDataReq = await fetch('https://storage.googleapis.com/tfjs-tutorials/carsData.json'); 
    const carData = await carsDataReq.json();
    const data = carData.map(x =>  ({
            mpg: x.Miles_per_Gallon,
            hp: x.Horsepower
        })).filter(x => (x.mpg != null && x.hp != null));
    
    return tf.tidy(() => {
        tf.util.shuffle(data);
        let inputs = data.map(x => x.hp);
        let labels = data.map(x => x.mpg);
        inputs = tf.tensor2d(inputs, [inputs.length, 1]);
        inputs_max = inputs.max().dataSync();
        inputs = inputs.div(inputs_max);
        
        labels = tf.tensor2d(labels, [labels.length, 1]);
        labels_max = labels.max().dataSync();
        labels = labels.div(labels_max);
        console.log(inputs_max, labels_max);
        return {
            inputs: inputs,
            labels: labels
        }
    })
}

function createModel(){
    const model = tf.sequential();
    model.add(tf.layers.dense({inputShape: [1], units: 16, activation: 'relu'}));
    model.add(tf.layers.dense({units: 52, activation: 'relu'}));
    model.add(tf.layers.dense({units: 1}));
    model.compile({
        optimizer: 'adam',
        loss: 'meanSquaredError',
        metrics: ['mse']
    });
    return model;
}

async function trainModel(model, X_train, Y_train){
    const batchSize = 32;
    const epochs = 20;
    await model.fit(X_train, Y_train,{
        batchSize, 
        epochs,
        shuffle: true,
        callbacks: tfvis.show.fitCallbacks(
            {name: 'Tranning ability'},
            ['mse'],
            {height: 200, callbacks: ['onEpochEnd']}
        )
    })
}

async function testModel(model, X_test, Y_test){
    let preds = model.predict(X_test).dataSync();
    X_test = X_test.dataSync();
    Y_test = Y_test.dataSync();
    const series1 = [];
    const series2 = [];
    for(let i=0; i<X_test.length; i++){
        series1.push({x:X_test[i], y:Y_test[i] });
        series2.push({x:X_test[i], y:preds[i]  });
    }
    tfvis.render.scatterplot(
        { name: '산점도' },
        { values: [series1, series2], series: ['real data', 'prediction data']},
        {xLabel: '마력', yLabel: '연비', height: 200}
    )
}

async function run(){
    const data = await getData();
    const train_size = Math.floor(data.inputs.shape[0] * 0.8);
    const test_size = data.inputs.shape[0] - train_size;
    const [X_train, X_test] = data.inputs.split([train_size, test_size]);
    const [Y_train, Y_test] = data.inputs.split([train_size, test_size]);
    
    const model = createModel();
    tfvis.show.modelSummary({name: 'Model Summary'}, model);
    await trainModel(model, X_train, Y_train)
    testModel(model, X_test, Y_test)
}

run();