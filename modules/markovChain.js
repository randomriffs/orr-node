module.exports.markovChain = () => {
let rita = require('rita');
let rm = rita.RiMarkov(10);
let generatedSen = {};
rm.loadFrom("orlando.txt",()=>{
    // console.log('rm.generateSentences(3333);', rm.generateSentences(3333))
    generatedSen = rm.generateSentences(10000);
});
}
