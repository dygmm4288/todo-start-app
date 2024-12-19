import moment from "moment";
export const dateFormatting = (date, formatter = "YYYY년MM월DD일") => {
  return moment(date).format(formatter);
};
