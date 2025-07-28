# patoka-circuit-js

Patoka's Circuit Visualization for Pure JavaScript

## Pipeline

`prepare` --> `compile` --> `draw`

```javascript
let selector0 = 'circuit-0';
let selector1 = 'circuit-1';
let selector2 = 'circuit-2';

let prep0 = prepareData(spec0);
let prep1 = prepareData(spec1);
let prep2 = prepareData(spec2);

let circuit_set = {
  [selector0]: prep0,
  [selector1]: prep1,
  [selector2]: prep2,
}

compileSpec(prep0, circuit_set);
```
