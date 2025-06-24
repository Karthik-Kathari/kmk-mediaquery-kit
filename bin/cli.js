#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const glob = require("glob");
const postcss = require("postcss");
const selectorParser = require("postcss-selector-parser");
const { parse: parseHTML } = require("node-html-parser");

const configPath = path.resolve(__dirname, "../mqscaffold.config.json");
// const config = require(configPath);
let config;
try {
  config = require(configPath);
} catch (err) {
  console.error("[mq-scaffold] Missing or invalid mqscaffold.config.json");
  process.exit(1);
}
if (
  !config.cssPath ||
  !config.htmlPaths ||
  !config.output ||
  !config.breakpoints
) {
  console.error("[mq-scaffold] Invalid config: Make sure 'cssPath', 'htmlPaths', 'output', and 'breakpoints' are defined.");
  process.exit(1);
}

// Get all classes from CSS
function extractClassesFromCSS(cssContent) {
  const root = postcss.parse(cssContent);
  const classNames = new Set();

  root.walkRules(rule => {
    selectorParser(selectors => {
      selectors.walkClasses(cls => {
        classNames.add(cls.value);
      });
    }).processSync(rule.selector);
  });

  return classNames;
}

// Get all classes from HTML
function extractClassesFromHTML(htmlContent) {
  const root = parseHTML(htmlContent);
  const classNames = new Set();

  root.querySelectorAll("[class]").forEach(el => {
    el.getAttribute("class")
      .split(/\s+/)
      .filter(Boolean)
      .forEach(cls => classNames.add(cls));
  });

  return classNames;
}

// Parse the existing media query file to preserve content
function parseExistingMediaQueries(content) {
  const blocks = {};
  const regex = /\/\*\s*(.*?)\s*\((\d+px)\)\s*\*\/\s*@media\s*\(max-width:\s*(\d+px)\)\s*{([\s\S]*?)^\}/gm;

  let match;
  while ((match = regex.exec(content)) !== null) {
    const label = match[1].trim();
    const size = match[2];
    const inner = match[4];
    const existingClasses = new Set();

    const classRegex = /\.(.*?)\s*{[^}]*}/g;
    let classMatch;
    while ((classMatch = classRegex.exec(inner)) !== null) {
      existingClasses.add(classMatch[1].trim());
    }

    blocks[size] = {
      label,
      content: inner.trim(),
      existingClasses
    };
  }

  return blocks;
}

// Generate full media query output
function generateMediaQueryScaffold(allClasses, breakpoints, existingContent) {
  const existingBlocks = parseExistingMediaQueries(existingContent);
  let output = "";

  for (const [label, size] of Object.entries(breakpoints)) {
    const existing = existingBlocks[size] || { content: "", existingClasses: new Set() };
    const existingClasses = existing.existingClasses;
    let newContent = "";

    allClasses.forEach(cls => {
      if (!existingClasses.has(cls)) {
        newContent += `  .${cls} {\n    /* responsive styles here */\n  }\n`;
      }
    });

    const fullBlock = `/* ${label} (${size}) */\n@media (max-width: ${size}) {\n${existing.content}\n${newContent}}\n\n`;
    output += fullBlock;
  }

  return output;
}

function main() {
  const cssFiles = glob.sync(config.cssPath);
  const htmlFiles = config.htmlPaths.flatMap(pattern => glob.sync(pattern));
  const allClasses = new Set();

  cssFiles.forEach(file => {
    const cssContent = fs.readFileSync(file, "utf-8");
    extractClassesFromCSS(cssContent).forEach(cls => allClasses.add(cls));
  });

  htmlFiles.forEach(file => {
    const htmlContent = fs.readFileSync(file, "utf-8");
    extractClassesFromHTML(htmlContent).forEach(cls => allClasses.add(cls));
  });

  const outputPath = path.resolve(config.output);
  const existingContent = fs.existsSync(outputPath)
    ? fs.readFileSync(outputPath, "utf-8")
    : "";

  const finalCSS = generateMediaQueryScaffold(allClasses, config.breakpoints, existingContent);
  fs.writeFileSync(outputPath, finalCSS, "utf-8");

  console.log(`[mq-scaffold] Media queries updated safely at ${config.output}`);
}


main();
