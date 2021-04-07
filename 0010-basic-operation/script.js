const values = [];
for (let i=0; i<30; i++) {
    values[i] = Math.floor(Math.random() * 100)
}


tf.tidy(() => {
    const a = tf.tensor2d(values, [6,5]);
    const b = tf.tensor2d(values, [6,5]);
    console.log(tf.memory().numTensors);
})



console.log(tf.memory().numTensors);




// const tense1 = tf.tensor([1,2,3,4]);

// async function run() {
//     const data = await tense1.array();
//     console.log(data);
//     return data;
// }

// run().then(data => {
//     console.log('동기식 처리',data);
// });

// console.log(tense1);