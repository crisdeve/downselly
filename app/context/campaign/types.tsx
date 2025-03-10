export type PositionType = {
  x: number;
  y: number;
}

export type ActionsMap = {
  SET_NODES: any;
  SET_EDGES: any;
  ADD_NODE: any;
  ON_NODES_CHANGE: any;
  ON_EDGES_CHANGE: any;
  ON_CONNECT: any;
  SELECT_NODE: any;
  CLOSE_MODAL: any;
  UPDATE_NODE_DATA: any
};

export type UpdateNodeDataVoid = (id: string, data: any) => void;
export type SelectNodeVoid = (node: any) => void;
export type CloseModalVoid = () => void;
export type AddNodeVoid = (nodeType: string, position: PositionType) => void;

export type Actions = {
  [Key in keyof ActionsMap]: {
    type: Key;
    payload?: ActionsMap[Key];
  }
}[keyof ActionsMap];
