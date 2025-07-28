import { isBitType, type Bit, type MatchSpec, type OpLayerMapping } from "../dtypes";
import type { BitMatch, BitMatchRaw, LayerMatch, LayerMatchRaw, MatchDataNormed } from "../dtypes/internal";
import type { PreparedData } from "../dtypes/normed-spec";

export function normalizeMatches(
  match_data: MatchSpec[],
  operation_mapping: OpLayerMapping,
  qubits: Bit[],
  clbits: Bit[],
  data_to_match: { [key: string]: PreparedData }
): MatchDataNormed[] {
  let normed_matches: MatchDataNormed[] = [];
  for (const match of match_data) {
    normed_matches.push(normalizeSingleMatch(match, operation_mapping, qubits, clbits, data_to_match));
  }
  return normed_matches;
}

function normalizeSingleMatch(
  match: MatchSpec,
  operation_mapping: OpLayerMapping,
  qubits: Bit[],
  clbits: Bit[],
  data_to_match: { [key: string]: PreparedData }
): MatchDataNormed {
  let selector = match.selector;
  let bit_match_raw = match.data.bit,
    layer_match_raw = match.data.layer;

  let bit_match = normalizeBitMatch(bit_match_raw, qubits, clbits, data_to_match[selector]);
  let layer_match = normalizeLayerMatch(layer_match_raw, operation_mapping, data_to_match[selector]);

  return {
    selector,
    data: {
      bit: bit_match,
      layer: layer_match
    }
  };
}

function searchBit(n: number | Bit | null, qubits: Bit[]): Bit | null {
  if (n == null) return null;
  else if (isBitType(n)) return n;
  else return qubits.filter(d => d.index == n)[0];
}

function normalizeBitMatch(
  raw: BitMatch[] | BitMatchRaw[],
  qubits: Bit[],
  clbits: Bit[],
  data_to_match: PreparedData
): BitMatch[] {
  return raw.map((m) => {
    let src = searchBit(m.from, m.type === 'qubit' ? qubits : clbits)
    let tar = searchBit(m.to, m.type === 'qubit' ? data_to_match.qubits : data_to_match.clbits)
    return {
      type: m.type,
      from: src,
      to: tar,
      is_ancilla: m.is_ancilla ?? (src == null)
    } as BitMatch
  })
}

function normalizeLayerMatch(
  raw: LayerMatch[] | LayerMatchRaw[],
  operation_mapping: OpLayerMapping,
  data_to_match: PreparedData
): LayerMatch[] {
  return raw.map((m) => {
    let src: [number, number] = typeof m.from === 'number' ? operation_mapping[m.from] : m.from;
    let tar: Array<[number, number]> = m.to.matches.map((t) => typeof t === 'number' ? data_to_match.operation_mapping[t] : t);
    let complete = m.to.complete;
    return {
      from: src,
      to: {
        complete,
        matches: tar
      }
    } as LayerMatch;
  });
}
