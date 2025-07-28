export type InteractionEnterFunction = (
  event: Event, role: string | undefined, content: string, clicked: boolean, priority: any
) => void;
export type InteractionMoveFunction = (
  event: Event, role: string | undefined
) => void;
export type InteractionExitFunction = (
  event: Event, role: string | undefined, force?: boolean
) => void;