"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMarkdownFromDocs = void 0;
/**
 * Convert JSON docs to markdown.
 */
function generateMarkdownFromDocs(docs, opts = {}) {
    const lines = [];
    const sortedContracts = Object.keys(docs.contracts).sort();
    for (const contractName of sortedContracts) {
        lines.push(...generateContractsContent(contractName, docs, opts));
    }
    return lines.join('\n');
}
exports.generateMarkdownFromDocs = generateMarkdownFromDocs;
function generateContractsContent(name, docs, opts) {
    const contract = docs.contracts[name];
    const enums = [];
    const sortedEnums = Object.entries(contract.enums).sort(([a], [b]) => a.localeCompare(b));
    for (const [enumName, enumDocs] of sortedEnums) {
        enums.push([
            `### ${toCode(enumName)}`,
            enumDocs.doc,
            '',
            toSourceAttributionLink(enumDocs, opts),
            '',
            `***Members***`,
            ...createTableContent(['Name', 'Value', 'Description'], Object.entries(enumDocs.values).map(([n, d]) => [
                toSourceLink(toCode(n), d, opts),
                toCode(d.value),
                d.doc,
            ])),
        ]);
    }
    const structSections = [];
    const sortedStructs = Object.entries(contract.structs).sort(([a], [b]) => a.localeCompare(b));
    for (const [structName, structDocs] of sortedStructs) {
        structSections.push([
            `### ${toCode(structName)}`,
            structDocs.doc,
            '',
            toSourceAttributionLink(structDocs, opts),
            '',
            `***Fields***`,
            ...createTableContent(['Name', 'Type', 'Description'], Object.entries(structDocs.fields).map(([n, d]) => [
                toSourceLink(toCode(n), d, opts),
                toCode(d.type),
                d.doc,
            ])),
        ]);
    }
    const eventSections = [];
    const sortedEvents = contract.events.sort((a, b) => a.name.localeCompare(b.name));
    for (const event of sortedEvents) {
        eventSections.push([
            `### ${toCode(event.name)}`,
            event.doc,
            '',
            `• ${toCode(getEventSignature(event))}`,
            '',
            toSourceAttributionLink(event, opts),
            '',
            `***Parameters***`,
            ...createTableContent(['Name', 'Type', 'Indexed', 'Description'], Object.entries(event.parameters).map(([n, d]) => [
                toSourceLink(toCode(n), d, opts),
                toCode(d.type),
                toCode(d.indexed),
                d.doc,
            ])),
        ]);
    }
    const methodSections = [];
    const sortedMethods = contract.methods.sort((a, b) => a.name.localeCompare(b.name));
    for (const method of sortedMethods) {
        const annotation = method.isAccessor ? ' *(generated)*' : method.kind === 'fallback' ? ' *(fallback)*' : '';
        methodSections.push([
            `### ${toCode(getNormalizedMethodName(method))}`,
            method.doc,
            '',
            `• ${toCode(getMethodSignature(method))}${annotation}`,
            '',
            toSourceAttributionLink(method, opts),
            '',
            ...(Object.keys(method.parameters).length !== 0
                ? [
                    `***Parameters***`,
                    ...createTableContent(['Name', 'Type', 'Description'], Object.entries(method.parameters).map(([n, d]) => [
                        toSourceLink(toCode(n), d, opts),
                        toCode(d.type),
                        d.doc,
                    ])),
                ]
                : []),
            ...(Object.keys(method.returns).length !== 0
                ? [
                    `***Returns***`,
                    ...createTableContent(['Name', 'Type', 'Description'], Object.entries(method.returns).map(([n, d]) => [
                        toSourceLink(toCode(n), d, opts),
                        toCode(d.type),
                        d.doc,
                    ])),
                ]
                : []),
        ]);
    }
    return [
        `# ${contract.kind} ${toCode(name)}`,
        contract.doc,
        '',
        toSourceAttributionLink(contract, opts),
        '',
        ...(enums.length > 0 ? ['## Enums', ...joinSections(enums)] : []),
        ...(structSections.length > 0 ? ['## Structs', ...joinSections(structSections)] : []),
        ...(eventSections.length > 0 ? ['## Events', ...joinSections(eventSections)] : []),
        ...(methodSections.length > 0 ? ['## Methods', ...joinSections(methodSections)] : []),
    ];
}
function joinSections(sections) {
    if (sections.length === 0) {
        return [];
    }
    const joined = [];
    for (const s of sections) {
        joined.push(...s, '---');
    }
    return joined.slice(0, joined.length - 1);
}
function toCode(v) {
    if (typeof v === 'boolean') {
        return `\`${v ? true : false}\``;
    }
    return `\`${v}\``;
}
function toSourceLink(text, doc, opts) {
    return `[${text}](${toSourceURL(doc.file, doc.line, opts.urlPrefix)})`;
}
function toSourceAttributionLink(doc, opts) {
    return `&nbsp; *Defined in ${toSourceLink(`${doc.file}:${doc.line}`, doc, opts)}*`;
}
function toSourceURL(file, line, prefix) {
    if (file.startsWith('/')) {
        return `${file}#L${line}`;
    }
    const _prefix = !prefix || prefix.endsWith('/') ? prefix || '' : `${prefix}/`;
    return `${_prefix}${file}#L${line}`;
}
function getMethodSignature(method) {
    const args = Object.entries(method.parameters).map(([_name, param]) => {
        return /^\d+$/.test(_name) ? param.type : `${param.type} ${_name}`;
    });
    const returns = Object.entries(method.returns).map(([_name, param]) => {
        return /^\d+$/.test(_name) ? param.type : `${param.type} ${_name}`;
    });
    const _returns = returns.length !== 0 ? `: (${returns.join(', ')})` : '';
    const mutabilityPrefix = ['view', 'pure'].includes(method.stateMutability)
        ? 'constant '
        : method.stateMutability === 'payable'
            ? 'payable '
            : '';
    return `${mutabilityPrefix}function ${getNormalizedMethodName(method)}(${args.join(', ')})${_returns}`;
}
function getNormalizedMethodName(method) {
    let name = method.name;
    if (method.kind === 'constructor') {
        name = 'constructor';
    }
    else if (method.kind === 'fallback') {
        name = '<fallback>';
    }
    return name;
}
function getEventSignature(event) {
    const args = Object.entries(event.parameters).map(([name, param]) => {
        return /^\d+$/.test(name) ? param.type : `${param.type} ${name}`;
    });
    return `event ${event.name}(${args.join(', ')})`;
}
function createTableContent(headers, rows) {
    const [_headers, _rows] = filterTableEmptyColumns(headers, rows);
    const lines = [
        _headers.join(' | '),
        _headers.map(h => h.replace(/./g, '-')).join(' | '),
        ..._rows.map(r => r.join(' | ')),
    ].map(line => `| ${line} |`);
    return ['', ...lines, ''];
}
function filterTableEmptyColumns(headers, rows) {
    const emptyColumnIndicesByRow = rows.map(r => r.map((c, i) => i).filter(i => r[i] === ''));
    const emptyColumnIndices = emptyColumnIndicesByRow.reduce((acc, row) => {
        for (const i of row) {
            if (!acc.includes(i)) {
                acc.push(i);
            }
        }
        return acc;
    }, []);
    return [
        headers.filter((v, i) => !emptyColumnIndices.includes(i)),
        rows.filter((v, i) => !emptyColumnIndices.includes(i)),
    ];
}
//# sourceMappingURL=gen_md.js.map