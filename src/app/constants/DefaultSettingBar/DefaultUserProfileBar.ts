import { ApplicationInterfaces, BarNames, BarTypes } from "#application";

const width = 415;
export const DefaultUserProfileBar: ApplicationInterfaces.ISettingBar = {
  name: BarNames.USER_PROFILE_BAR,
  type: BarTypes.HORIZONTAL,
  title: "Панель пользователя",
  position: { x: window.innerWidth - width - 10, y: 5 },
  size: { width: width, height: 40 },
  isVisible: true,
  isClosed: false,
  isResizable: false,
  isDraggable: false
}
