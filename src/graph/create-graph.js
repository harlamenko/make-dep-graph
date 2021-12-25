import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import avsdf from 'cytoscape-avsdf';
const elements = require('./elements.json');

cytoscape.use(dagre);
cytoscape.use(avsdf);

export async function createGraph(layout) {
    return cytoscape({
        boxSelectionEnabled: false,
        autounselectify: true,
        layout,
        container: document.getElementById('container'),
        elements: [
            ...elements.map((el) => ({
                group: 'nodes',
                data: { id: `${el.name}` },
            })),
            ...elements.reduce((acc, el) => {
                el.deps.forEach((target) => {
                    acc.push({
                        group: 'edges',
                        data: {
                            id: `${el.name}->${target}`,
                            source: `${el.name}`,
                            target: `${target}`,
                        },
                    });
                });

                return acc;
            }, []),
        ],
        style: [
            {
                selector: 'node',
                style: {
                    content: 'data(id)',
                    color: 'white',
                    'text-valign': 'center',
                    'text-outline-width': 2,
                    'text-outline-color': '#888',
                    'background-color': '#888',
                },
            },
            {
                selector: 'edge',
                style: {
                    width: 3,
                    color: '#777',
                    'target-arrow-shape': 'triangle',
                    'target-arrow-color': '#26c288',
                    'curve-style': 'bezier',
                    'line-color': '#369',
                },
            },
        ],
    });
}
