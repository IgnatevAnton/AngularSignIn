import { ApplicationInterfaces, BarNames, BarTypes } from "@application";

export const DefaultSettingListBars: ApplicationInterfaces.ISettingBar = {
  name: BarNames.SETTING_LIST_BARS,
  type: BarTypes.VERTICAL,
  title: "Настройка отображения панелей",
  position: { x: -10, y: 50 },
  size: { width: 415, height: 300 },
  isVisible: true,
  isClosed: true
} 
