import { ApplicationInterfaces, BarNames, BarTypes } from "@application";

export const DefaultUserProfileBar: ApplicationInterfaces.ISettingBar = {
  name: BarNames.USER_PROFILE_BAR,
  type: BarTypes.HORIZONTAL,
  title: "Панель пользователя",
  position: { x: -10, y: 5 },
  size: { width: 415, height: 40 },
  isVisible: true,
  isClosed: false
}
