import { expect, test } from 'vitest';
import { normalizeMatches, prepareData } from "../src/compile";
import { selector0, selector1, selector2, spec0, spec1, spec2 } from './prepTestData';
import { match_0_1, match_0_2, match_1_0, match_2_0 } from './matchAnswer';

test('prepare data', () => {

  let prep0 = prepareData(spec0);
  let prep1 = prepareData(spec1);
  let prep2 = prepareData(spec2);

  let circuit_set = {
    [selector0]: prep0,
    [selector1]: prep1,
    [selector2]: prep2,
  };

  if (prep0.match_data) {
    let match0 = normalizeMatches(
      prep0.match_data,
      prep0.operation_mapping,
      prep0.qubits,
      prep0.clbits,
      circuit_set
    );
    expect(match0[0]).toEqual(match_0_1);
    expect(match0[1]).toEqual(match_0_2);
  } else {
    throw new Error("No match found at 0");
  }

  if (prep1.match_data) {
    let match1 = normalizeMatches(
      prep1.match_data,
      prep1.operation_mapping,
      prep1.qubits,
      prep1.clbits,
      circuit_set
    );
    expect(match1[0]).toEqual(match_1_0);
  } else {
    throw new Error("No match found at 1");
  }

  if (prep2.match_data) {
    let match2 = normalizeMatches(
      prep2.match_data,
      prep2.operation_mapping,
      prep2.qubits,
      prep2.clbits,
      circuit_set
    );
    expect(match2[0]).toEqual(match_2_0);
  } else {
    throw new Error("No match found at 2");
  }
});