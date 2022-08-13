#!/usr/bin/env node

const fs = require("fs")
const UglifyJS = require("uglify-js")

if (typeof process.argv[2] !== "string") {
  console.log("usage: elm-minify <file.js>")
  process.exit(1)
}

console.log("Minifying...")
const path = process.argv[2]
const input = fs.readFileSync(path, "utf8")
const result = UglifyJS.minify(input, getOptions())
if (result.error) throw result.error
fs.writeFileSync(path, result.code)

function getOptions() {
  const pureFuncs = [
    "F2",
    "F3",
    "F4",
    "F5",
    "F6",
    "F7",
    "F8",
    "F9",
    "A2",
    "A3",
    "A4",
    "A5",
    "A6",
    "A7",
    "A8",
    "A9",
  ]

  const opt = {
    compress: {
      passes: 2,
      pure_funcs: pureFuncs,
      pure_getters: true,
      unsafe_comps: true,
      unsafe: true,
    },
    mangle: {
      reserved: pureFuncs,
    },
  }
  return opt
}
