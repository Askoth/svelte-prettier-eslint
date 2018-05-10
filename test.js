const fs = require('fs');
const path = require('path');
const prettier = require('prettier');

const base = fs.readFileSync(path.resolve(__dirname, 'src/components/main.svelte'), 'utf8');

const parse5 = require('parse5');
const htmlparser2Adapter = require('parse5/lib/tree_adapters/htmlparser2.js');

const doc = parse5.parseFragment(base, { treeAdapter: htmlparser2Adapter });

let scriptTags = [];

findScriptTag(doc);

function findScriptTag (doc) {
    if (doc.name == 'script') {
        scriptTags.push(doc);
    }

    if (doc.children) {
        doc.children.forEach((child) => {
            findScriptTag(child);
        })
    }
}


const codeToPretty = scriptTags[0].children[0].data;
const prettyCode = prettier.format(codeToPretty, {
    tabWidth: 4,
    useTabs: false
});

scriptTags[0].children[0].data = prettyCode;


// the changes abode were done in the same objectes referenced inside doc
console.log(parse5.serialize(doc, { treeAdapter: htmlparser2Adapter }));


