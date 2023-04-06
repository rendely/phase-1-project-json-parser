# Phase 1 Project: JSON Parser

## About

This web app is used for parsing a JSON dataset to better understand its structure, fields, and values. In particular, understanding a new JSON dataset can be challenging, this tool offers exploratory features to make it easier.

![](/src/images/json-parser-tool-screenshot.png)

## Current features

- Load example JSON datasets from the dropdown
- Paste in any JSON data and parse it
- Expand/collapse arrays and objects
- Sort the data. This tool first sorts by type (number, string, boolean, object, array), then by the key alphabetically. \[Keyboard shortcut: "s"\]
- Filter to search for keywords in the key or value  \[Keyboard shortcut: "f"\]
- Change how many levels are collapsed
- Hover to get the javascript path for selecting that item
