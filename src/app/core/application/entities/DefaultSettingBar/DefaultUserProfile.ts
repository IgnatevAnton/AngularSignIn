import { ApplicationInterfaces, BarNames } from "@application";

export const DefaultUserProfile: ApplicationInterfaces.ISettingBar = {
  name: BarNames.USER_PROFILE,
  title: "Информация о пользователе",
  position: {
    x: -10,
    y: 50
  },
  size: {
    width: 415,
    height: 300
  },
  isVisible: true,
  isClosed: true
} 
