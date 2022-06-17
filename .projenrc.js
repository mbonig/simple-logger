const { typescript } = require('projen');
const { NpmAccess } = require('projen/lib/javascript');
const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: 'main',
  name: '@matthewbonig/simple-logger',
  authorName: 'Matthew Bonig',
  authorEmail: 'matthew.bonig@gmail.com',
  authorUrl: 'https://matthewbonig.com',
  description: 'A simple logger utility for capturing all inputs and outputs to a function',
  repository: 'https://github.com/mbonig/simple-logger',
  npmAccess: NpmAccess.PUBLIC,
  keywords: ['logging', 'aspect'],
  releaseToNpm: true,
  deps: ['aspectjs'],
  gitignore: ['.idea'],
});
project.synth();
