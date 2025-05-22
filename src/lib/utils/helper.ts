
/* : شیء تو در تو را مسطح می‌کند و مقادیر موجود در آرایه‌ها (که کلید آنها keyName است) را استخراج کرده و در یک آرایه قرار می‌دهد.*/
//: برای مسطح کردن شیء‌های پیچیده و استخراج آرایه‌ها از داخل آن‌ها استفاده می‌شود.
export const flatter = (nestedObject: any, keyName: string): any[] => {
  const handleFlatter = (obj: any): any[] => {
    let result: any[] = [];

    if (Array.isArray(obj[keyName])) {
      result = result.concat(obj[keyName]);
    }

    //
    for (const key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        result = result.concat(handleFlatter(obj[key]));
      }
    }

    return result;
  };

  return handleFlatter(nestedObject);
};

/**
 * Converts null properties of an object to empty strings
 * @param {Record<string, any>} obj - The input object to convert
 * @returns {Record<string, any>} A new object with null properties converted to empty strings
 */
// ویژگی‌های نال (null) شیء را به رشته خالی تبدیل می‌کند تا از بروز مشکلاتی مانند دسترسی به مقادیر نال جلوگیری کند.
export const convertNullPropertiesToEmptyString = (obj: Record<string, any>): Record<string, any> => {
    const newObj: Record<string, any> = {};

    // Iterate over the properties of the input object
    for (const key in obj) {
        // Check if the property is a direct property of the object (not inherited)
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            // Convert null values to empty strings in the new object
            newObj[key] = obj[key] === null ? "" : obj[key];
        }
    }

    return newObj;
}
/*     هر ویژگی‌ای که مقدار null دارد را به یک رشته خالی تبدیل می‌کند.
این توابع می‌توانند در پروژه‌هایی که با داده‌های پیچیده و نال (null) کار می‌کنند، مفید باشند.*/