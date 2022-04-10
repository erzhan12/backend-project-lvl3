#!/usr/bin/env node

import { Command } from 'commander';
import pageLoader from '../src/page-loader.js';

const program = new Command();

const pageLoaderCommand = (page, output) => {
  pageLoader(page, output);
};

program
  .version('0.0.1')
  .description('Loads page.')
  .option('-o, --output [dir]', 'output dir', process.cwd())
  .argument('<page>', 'Source page')
  .action((page) => {
    pageLoaderCommand(page, program.opts().output);
  })
  .parse();
