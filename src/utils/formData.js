global.FormData = global.FormData || Map;

export function covertFormDataToObject (formData) {
  return Array.from(formData)
    .reduce((obj, [k, v]) => ({ ...obj, [k]: v }), {});
}

export function convertObjectToFormData (object) {
  return Object.keys(object)
    .reduce((formData, key) => {
      formData.set(key, object[key]);
      return formData;
    }, new FormData());
}

export function convertArrayToFormData (object) {
  return Object.keys(object).map(function (key) {
    return convertObjectToFormData(object[key]);
  });
}
