import { SearchType } from "../store/slices/settingsSlice";
import { NextRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

export default class Filter {
  search: SearchType;

  constructor(search: SearchType) {
    this.search = search;
    console.log("constructor called");
  }

  SearchSetter(search: SearchType) {
    this.search = search;
  }

  async quertAdder(search: SearchType) {}
  async queryRemover() {}

  async convertObjectToParam(query: object) {
    var keys: string[] = Object.keys(query);
    var values: string[] = Object.values(query);
    var uri: string = "?";
    keys.map((key, index) => {
      uri += key + "=" + values[index];
      if (keys.length > index + 1) {
        uri += "&";
      }
    });
    return uri;
  }

  addOrRemoveFromQuery(
    item: string,
    obj: ParsedUrlQuery,
    state: boolean
  ): ParsedUrlQuery {
    if (state === false) eval(`delete obj.${item?.toString()}`);
    else eval(`obj.${item?.toString()}='true'`);
    return obj;
  }

  async changeFilter(searchConf: SearchType, router: NextRouter) {
    // if (searchConf?.filter?.state === false) {
    //   delete router?.query?.pricelte;
    //   delete router?.query?.pricegte;

    //   const queryString: string = await this.convertObjectToParam(router.query);
    //   router.push(`${router.pathname}${queryString}`);
    // }
    if (
      searchConf.filter?.priceRange?.pricegte !== undefined &&
      searchConf.filter?.priceRange?.pricelte !== undefined
    ) {
      router.query["pricegte"] =
        searchConf.filter?.priceRange?.pricegte.toString();
      router.query["pricelte"] =
        searchConf.filter?.priceRange?.pricelte.toString();
      if (Number(router?.query?.pricelte) < 1) {
        delete router?.query?.pricelte;
        delete router?.query?.pricegte;
      }
      router.query = this.addOrRemoveFromQuery(
        "issale",
        router.query,
        searchConf.filter.isSale
      );

      router.query = this.addOrRemoveFromQuery(
        "available",
        router.query,
        searchConf.filter.justAvailable
      );

      router.query = this.addOrRemoveFromQuery(
        "unbleivable",
        router.query,
        searchConf.filter.unbleivable
      );

      router.query["page"] = "1";
      const queryString: string = await this.convertObjectToParam(router.query);
      router.push(`${router.pathname}${queryString}`);

      // var obj = filterEnableItems;
      // obj = {
      //   ...filterEnableItems,
      //   priceRange: { name: "قیمت" },
      // };
      // setFilterEnableItems(obj);
    }
  }
  ToggleUnbleivable(search: SearchType): SearchType {
    if (search?.filter?.unbleivable) {
      search = {
        ...search,
        filter: {
          ...search.filter,
          unbleivable: false,
        },
      };
    } else {
      search = {
        ...search,
        filter: {
          ...search.filter,
          unbleivable: true,
        },
      };
    }
    return search;
  }
  ToggleIsSale(search: SearchType): SearchType {
    if (search?.filter?.isSale) {
      search = {
        ...search,
        filter: {
          ...search.filter,
          isSale: false,
        },
      };
    } else {
      search = {
        ...search,
        filter: {
          ...search.filter,
          isSale: true,
        },
      };
    }
    return search;
  }
  ToggleAvailable(search: SearchType): SearchType {
    if (search?.filter?.justAvailable) {
      search = {
        ...search,
        filter: {
          ...search.filter,
          justAvailable: false,
        },
      };
    } else {
      search = {
        ...search,
        filter: {
          ...search.filter,
          justAvailable: true,
        },
      };
    }
    return search;
  }
  // greet() {
  //   return "Hello, " + this.greeting;
  // }
}

//   let greeter = new Greeter("world");
