# make-dep-graph

[![GitHub license](https://img.shields.io/github/license/harlamenko/make-dep-graph)](https://github.com/harlamenko/make-dep-graph/blob/main/LICENSE)

Script that allows you to create a dependency graph.

![alt text](./result.png)

## Usage

```shell
make-dep-graph ./path/to/file/file-with-data.json
```

## Data format

```json
[
	{ "name": "n1", "deps": ["n2", "n4", "n5"] },
	{ "name": "n2", "deps": ["n4", "n6"] },
	{ "name": "n3", "deps": ["n4", "n7"] },
	{ "name": "n4", "deps": ["n5", "n7"] },
	{ "name": "n5", "deps": ["n6"] },
	{ "name": "n6", "deps": ["n7"] },
	{ "name": "n7", "deps": [] }
]
```
