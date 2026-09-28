type Filter = {
  [key: string]: {
    [operation: string]: string;
  };
};

type Input =
  | {
      and?: Filter[];
    }
  | Filter;

type Output = {
  filterBy: string[];
  filterType: string[];
  filterValue: string[];
};

export const buildDynamicFilters = (input: Input): Output => {
  const filterBy: string[] = [];
  const filterType: string[] = [];
  const filterValue: string[] = [];
  const processFilter = (filter: any) => {
    Object.keys(filter).forEach((key) => {
      filterBy.push(key);
      const operation = Object.keys(filter[key])[0];
      filterType.push(operation);
      filterValue.push(filter[key][operation]);
    });
  };
  if (Array.isArray(input.and)) {
    input.and.forEach((filter) => processFilter(filter));
  } else {
    processFilter(input);
  }

  return {
    filterBy,
    filterType,
    filterValue,
  };
};
