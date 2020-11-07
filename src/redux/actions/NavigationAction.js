import { DRAWAR_MENU_SWITCHED } from "./ActionTypes";

export function drawerMenuSwitched(oldView: String, newView: String) {
  return {
    oldView,
    newView,
    type: DRAWAR_MENU_SWITCHED
  };
}