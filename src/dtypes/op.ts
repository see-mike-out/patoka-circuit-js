import { isBitType, type Bit } from "./bits";

// operation
export type Operation = Gate | Barrier | Measure;

export type Gate = {
  name: string;
  is_custom?: boolean;
  qubits: Bit[] | number[] | Bit | number;
  controls?: Bit[] | number[] | Bit | number;
  params?: OpParameter[];
  detail?: any;
};

export type Barrier = {
  name: 'barrier';
  is_custom?: false;
  qubits?: Bit[] | number[] | Bit | number;
  detail?: any;
}

export type Measure = {
  name: 'measure';
  is_custom?: false;
  qubits: Bit[] | number[] | Bit | number;
  clbits: Bit[] | number[] | Bit | number;
  detail?: any;
}

export type OpParameter = number | string;


export type GateNormed = {
  name: string;
  is_custom: boolean;
  num_qubits: number;
  num_clbits: number;
  qubits: Bit[];
  controls?: Bit[];
  params?: OpParameter[];
  detail?: any;
};

export type BarrierNormed = {
  name: 'barrier';
  is_custom: false;
  qubits: Bit[];
  num_qubits: number;
  num_clbits: number;
  detail?: any;
}

export type MeasureNormed = {
  name: 'measure';
  is_custom: false;
  qubits: Bit[];
  clbits: Bit[];
  num_qubits: number;
  num_clbits: number;
  detail?: any;
}

export type OperationNormed = GateNormed | BarrierNormed | MeasureNormed;

// layering
export type OperationLayer = {
  index: number;
  num_operations: number;
  operations: Array<OperationNormed>
}

export type OpLayerMapping = { [key: number]: [number, number] };

export function isMeasureNormed(op: any): op is MeasureNormed {
  if (op?.name === 'measure') return true;
  else return false;
}

export function isLayeredOperations(layer: any): layer is OperationLayer {
  return layer instanceof Object
    && layer.index !== undefined
    && typeof layer.index === 'number'
    && layer.num_operations !== undefined
    && typeof layer.num_operations === 'number'
    && layer.operations !== undefined
    && layer.operations.every((o: any) => isOperation(o));
}

export function isOperation(op: any): op is Operation {
  return op instanceof Object
    && op.name !== undefined
    && typeof op.name === 'string'
    && (op.qubits === undefined
      || typeof op.qubits === 'number'
      || isBitType(op.qubits)
      || (op.qubits instanceof Array
        && (op.qubits.every((d: any) => typeof d === 'number')
          || op.qubits.every((d: any) => isBitType(d)))))
    && (op.controls === undefined
      || typeof op.controls === 'number'
      || isBitType(op.controls)
      || (op.controls instanceof Array
        && (op.controls.every((d: any) => typeof d === 'number')
          || op.controls.every((d: any) => isBitType(d)))))
    && (op.clbits === undefined
      || typeof op.clbits === 'number'
      || isBitType(op.clbits)
      || (op.clbits instanceof Array
        && (op.clbits.every((d: any) => typeof d === 'number')
          || op.clbits.every((d: any) => isBitType(d)))))
    && (op.params === undefined
      || op.params.every((d: any) => typeof d === 'number' || typeof d === 'string')
    )
}
