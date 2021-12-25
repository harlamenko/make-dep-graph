import './style.css';
import { fromEvent, mapTo, merge } from 'rxjs';
import { createGraph } from './graph/create-graph';
import { layoutAvsdf, layoutDagre } from './graph/layouts';
const elements = require('./graph/elements.json');

async function main() {
    document.body.innerHTML = `
		<section id='container'></section>

		<section class='list'>
			<div>
				<p>topology:</p>
				<button id='${layoutAvsdf.name}'>${layoutAvsdf.name}</button>
				<button id='${layoutDagre.name}'>${layoutDagre.name}</button>
			</div>
			
			<div>
				<p>displayed nodes:</p>
				${elements
                    .sort((prev, curr) => prev.deps.length - curr.deps.length)
                    .map(
                        (el) =>
                            '<div>' +
                            `<input type='checkbox' checked class='show' data-name='${el.name}'>${el.name} (${el.deps.length} deps) ` +
                            '</div>',
                    )
                    .join('')}
			</div>
		</section>
	`;

    const chosenLayout$ = merge(
        ...[layoutAvsdf, layoutDagre].map((layout) =>
            fromEvent(document.getElementById(layout.name), 'click').pipe(
                mapTo(layout),
            ),
        ),
    );

    const g = await createGraph(layoutAvsdf);
    const deleted = {};

    fromEvent(document.getElementsByClassName('show'), 'change').subscribe(
        (el) => {
            const name = el.target.dataset.name;

            if (!el.target.checked) {
                deleted[name] = g.$(`#${name}`).remove();
            } else {
                deleted[name].restore();
            }
        },
    );

    chosenLayout$.subscribe((layout) => g.layout(layout).run());
}

main();
