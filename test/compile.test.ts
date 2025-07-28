import { expect, test } from 'vitest';
import { compileSpec, normalizeMatches, prepareData } from '../src';
import { selector0, selector1, selector2, spec0, spec1, spec2 } from './prepTestData';

test('compile test', () => {
  let prep0 = prepareData(spec0);
  let prep1 = prepareData(spec1);
  let prep2 = prepareData(spec2);

  let circuit_set = {
    [selector0]: prep0,
    [selector1]: prep1,
    [selector2]: prep2,
  };

  let compile_outcome = compileSpec(prep0, circuit_set);
  console.log(compile_outcome.draw_plan?.groups.qubit_group);
  console.log(compile_outcome.draw_plan?.groups.circuit_line_group);
  console.log(compile_outcome.draw_plan?.groups.circuit_group);
  console.log(compile_outcome.draw_plan?.groups.phase_marker);
});