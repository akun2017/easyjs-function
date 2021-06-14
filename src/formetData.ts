
/**
 * @description 将json对象转换成 formdata对象
*/
export function JsonToForm(obj: any): FormData {
    let form = new FormData();
    Object.keys(obj).forEach((key: string) => {
        form.append(key, obj[key])
    })
    return form;
}