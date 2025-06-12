import { useSearchParams, useRouter } from "next/navigation";

const searchParamsToObject = (
  searchParams: URLSearchParams
): { [key: string]: string } => {
  const params: { [key: string]: any } = {};

  searchParams.forEach((value, key) => {
    const arrayMatch = key.match(/^(.+)\[(\d+)\]$/);
    if (arrayMatch) {
      const arrayKey = arrayMatch[1];
      const index = Number(arrayMatch[2]);

      if (!Array.isArray(params[arrayKey])) {
        params[arrayKey] = [];
      }

      // تبدیل به عدد برای brands
      if (arrayKey === 'brands') {
        params[arrayKey][index] = Number(value);
      } else {
        params[arrayKey][index] = value;
      }
    } else {
      if (params[key]) {
        if (Array.isArray(params[key])) {
          // تبدیل به عدد برای brands
          if (key === 'brands') {
            params[key].push(Number(value));
          } else {
            params[key].push(value);
          }
        } else {
          // تبدیل به عدد برای brands
          if (key === 'brands') {
            params[key] = [Number(params[key]), Number(value)];
          } else {
            params[key] = [params[key], value];
          }
        }
      } else {
        // تبدیل به عدد برای brands
        if (key === 'brands') {
          params[key] = Number(value);
        } else {
          params[key] = value;
        }
      }
    }
  });

  for (const key in params) {
    if (Array.isArray(params[key])) {
      params[key] = params[key].filter((item) => item !== undefined);
    }
  }

  return params;
};

const useQueryManager = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tempStates = searchParamsToObject(searchParams);

  const handleSetState = (params: Record<string, any>) => {
    const mergedParams = { ...tempStates, ...params };
  
    const filteredParams = Object.entries(mergedParams).reduce(
      (acc, [key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
          if (Array.isArray(value)) {
            // مقدار آرایه رو مستقیما به acc اضافه کن
            acc[key] = value.map(item => {
              if (key === 'brands') return Number(item);
              return item;
            });
          } else {
            acc[key] = key === 'brands' ? Number(value) : value;
          }
        }
        return acc;
      },
      {} as Record<string, string | number | Array<string | number>>
    );
  
    console.log('Filtered params:', filteredParams);
  
    const newParams = new URLSearchParams();
  
    Object.entries(filteredParams).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => {
          newParams.append(key, String(v));
        });
      } else {
        newParams.append(key, String(value));
      }
    });
  
    const queryString = newParams.toString();
    router.push(`?${queryString}`);
  };
  

  const handleDeleteParams = (keys: string[]) => {
    keys.forEach((key) => {
      delete tempStates[key];
    });

    const newParams = new URLSearchParams(tempStates);
    router.push(`?${newParams.toString()}`);
  };

  const handleResetParams = () => {
    router.push(window.location.pathname);
  };

  return {
    setState: handleSetState,
    deleteState: handleDeleteParams,
    resetStates: handleResetParams,
    state: tempStates,
  };
};

export default useQueryManager;