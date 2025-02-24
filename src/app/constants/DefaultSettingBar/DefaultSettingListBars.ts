import { ApplicationInterfaces, BarNames, BarTypes } from '#application';

const width = 415;
export const DefaultSettingListBars: ApplicationInterfaces.ISettingBar = {
  name: BarNames.SETTING_LIST_BARS,
  type: BarTypes.VERTICAL,
  title: 'Настройка отображения панелей',
  position: { x: window.innerWidth - width - 10, y: 625 },
  size: { width: width, height: 290 },
  isVisible: true,
  isClosed: true,
  isResizable: true,
  isDraggable: true,
};
