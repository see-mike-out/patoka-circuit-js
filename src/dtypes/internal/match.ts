import type { Bit } from "../bits";

export type MatchData = {
  layer: LayerMatch[] | LayerMatchRaw[],
  bit: BitMatch[] | BitMatchRaw[]
}

export type MatchDataNormed = {
  selector: string,
  data: {
    layer: LayerMatch[],
    bit: BitMatch[]
  }
}

export type LayerMatch = {
  from: [number, number], // layer index, operation index
  to: {
    complete: boolean,
    matches: Array<[number, number]>,
  }
}
export type LayerMatchRaw = {
  from: number | [number, number], // layer index, operation index
  to: {
    complete: boolean,
    matches: Array<[number, number]> | number[]
  }
}

export type BitMatch = {
  type: 'qubit' | 'clbit';
  from: Bit | null;
  to: Bit;
  is_ancilla: boolean;
};

export type BitMatchRaw = {
  type: 'qubit' | 'clbit';
  from: number | Bit | null,
  to: number | Bit,
  is_ancilla: boolean
};