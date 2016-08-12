var cli = require('cli');
var geoParse = require('../src/geo-parse.js');

cli.parse({
  input: ['i', 'directory to search for images in', 'string'],
  output: ['o', 'where do you want it', 'file'],
  format:  ['f', 'the format you would like', 'string', 'csv']
});

cli.main(function(args, options) {
  geoParse({ inputPaths: options.input, outputPath: options.output, outputFormat: options.format });
});
