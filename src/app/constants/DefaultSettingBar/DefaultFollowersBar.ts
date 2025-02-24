import { ApplicationInterfaces, BarNames, BarTypes } from "#application";

const width = 415;
export const DefaultFollowersBar: ApplicationInterfaces.ISettingBar = {
  name: BarNames.FOLLOWERS_BAR,
  type: BarTypes.VERTICAL,
  title: "Список польователей",
  position: { x: window.innerWidth - width - 10, y: 315 },
  size: { width: width, height: 300 },
  isVisible: true,
  isClosed: true,
  isResizable: true,
  isDraggable: true
} 
