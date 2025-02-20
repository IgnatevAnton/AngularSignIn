import { ApplicationInterfaces, BarNames, BarTypes } from "@application";

export const DefaultFollowersBar: ApplicationInterfaces.ISettingBar = {
  name: BarNames.FOLLOWERS_BAR,
  type: BarTypes.VERTICAL,
  title: "Список польователей",
  position: { x: -10, y: 50 },
  size: { width: 415, height: 300 },
  isVisible: true,
  isClosed: true
} 
