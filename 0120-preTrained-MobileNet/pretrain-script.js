async function run(){
    const image = document.getElementById('img');
    const model = await mobilenet.load();
    console.log("model loaded");

    let pred = await model.classify(image);

    for (let i=0; i<pred.length; i++){
        document.getElementById('outp').innerHTML += "<br/>" 
        + pred[i].className + " : " + pred[i].probability.toFixed(4); 
    }
    
    const video = document.getElementById('webcam');
    const webcamIterator = await tf.data.webcam(video);  
    console.log("webcam connected");
    
    while(true) {
        const img = await webcamIterator.capture();
        pred = await model.classify(img);
        
        document.getElementById('predictions').innerText = 
            pred[0].className + " : " + pred[0].probability.toFixed(4);
    }
}
run();
// document.addEventListener("DOMContentLoaded", run);  

